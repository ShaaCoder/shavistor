/**
 * Razorpay Order Creation API
 * 
 * POST /api/payments/razorpay/create-order
 * - Validates cart and shipping
 * - Creates pending Order in MongoDB
 * - Creates Razorpay order server-side
 */

import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/nextauth';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import Offer from '@/models/Offer';
import Category from '@/models/Category';
import { paymentGateway } from '@/lib/payment';
import { getShiprocketRates, computeHybridShipping } from '@/lib/shiprocket';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  rateLimit,
  getClientIP,
} from '@/lib/api-helpers';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return createErrorResponse('Authentication required', 401, 'Unauthorized');
    }

    const clientIP = getClientIP(request);
    const rl = rateLimit(`razorpay_create_order_${clientIP}`, 10, 60_000);
    if (!rl.allowed) {
      return createErrorResponse('Too many requests', 429, 'Rate limit exceeded');
    }

    const body = await request.json();
    const { items, shippingAddress, couponCode, selectedShippingRate } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return createErrorResponse('Items are required', 400, 'Validation Error');
    }

    if (!shippingAddress) {
      return createErrorResponse('Shipping address is required', 400, 'Validation Error');
    }

    const user = await User.findOne({ email: session.user.email }).select('-password');

    if (!user) {
      return createErrorResponse('User not found', 404, 'Not Found');
    }

    // Validate items and compute subtotal similar to Stripe checkout session route
    let subtotal = 0;
    const invalidProducts: Array<{ productId: string; name: string; reason: string }> = [];
    const validItems: typeof items = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        invalidProducts.push({
          productId: item.productId,
          name: item.name || 'Unknown Product',
          reason: 'Product no longer exists',
        });
        continue;
      }

      if (!product.isActive) {
        invalidProducts.push({
          productId: item.productId,
          name: product.name,
          reason: 'Product is no longer available',
        });
        continue;
      }

      if (product.stock < item.quantity) {
        invalidProducts.push({
          productId: item.productId,
          name: product.name,
          reason: `Only ${product.stock} items available, but ${item.quantity} requested`,
        });
        continue;
      }

      validItems.push(item);
    }

    if (invalidProducts.length > 0) {
      const details: Record<string, string[]> = {};
      invalidProducts.forEach((product, index) => {
        details[`product_${index}`] = [`${product.name}: ${product.reason}`];
      });

      return createErrorResponse(
        `Some products in your cart are no longer available: ${invalidProducts
          .map((p) => p.name)
          .join(', ')}. Please update your cart and try again.`,
        400,
        'Cart Validation Failed',
        details,
      );
    }

    if (validItems.length === 0) {
      return createErrorResponse(
        'No valid products found in cart. Please add products and try again.',
        400,
        'Empty Cart',
      );
    }

    // Compute subtotal from validated items using current product pricing
    for (const item of validItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        throw new Error(`Product ${item.productId} not found during subtotal calculation`);
      }
      subtotal += product.price * item.quantity;
    }

    // Shipping (hybrid with Shiprocket, mirroring Stripe flow)
    let shipping = subtotal > 999 ? 0 : 99;
    try {
      const threshold = parseInt(process.env.FREE_SHIPPING_THRESHOLD || '999', 10);
      const rates = await getShiprocketRates({
        delivery_postcode: shippingAddress.pincode,
        items: validItems.map((i: any) => ({ quantity: i.quantity, price: i.price, weight: i.weight })),
        cod: 0,
        declared_value: subtotal,
      });

      if (rates && rates.length > 0 && selectedShippingRate) {
        const { effectiveShipping } = computeHybridShipping({
          subtotal,
          selectedRate: selectedShippingRate,
          allRates: rates,
          threshold,
        });
        shipping = effectiveShipping;
      }
    } catch (err) {
      console.warn('Shiprocket hybrid shipping failed (Razorpay flow), using fallback:', err);
    }

    // Apply coupon/offer if provided (same rules as card flow)
    let discount = 0;
    let appliedOffer: any = null;

    if (couponCode) {
      const offer = await Offer.findOne({ code: String(couponCode).toUpperCase() });
      if (!offer) {
        return createErrorResponse('Invalid offer code', 404, 'Offer not found');
      }
      if (!(offer as any).isValid()) {
        return createErrorResponse(
          'Offer not available',
          400,
          'This offer is not active or has expired',
        );
      }
      if (subtotal < offer.minAmount) {
        return createErrorResponse(
          'Minimum amount not met',
          400,
          `Minimum order amount is ₹${offer.minAmount}`,
        );
      }

      let applicable = true;
      if (
        (offer.categories?.length || 0) > 0 ||
        (offer.brands?.length || 0) > 0 ||
        (offer.products?.length || 0) > 0
      ) {
        applicable = false;
        for (const item of validItems) {
          const product = await Product.findById(item.productId);
          if (!product) continue;

          if (offer.brands?.length && offer.brands.includes(product.brand)) {
            applicable = true;
            break;
          }

          if (
            offer.products?.length &&
            offer.products.includes(String(item.productId))
          ) {
            applicable = true;
            break;
          }

          if (offer.categories?.length && product.category) {
            try {
              const cat = await Category.findById(product.category).select('name slug');
              if (cat) {
                if (
                  offer.categories.includes(cat.slug) ||
                  offer.categories.includes(cat.name)
                ) {
                  applicable = true;
                  break;
                }
              }
            } catch {
              // ignore category lookup errors for offer applicability
            }
          }
        }
      }

      if (!applicable) {
        return createErrorResponse(
          'Offer not applicable',
          400,
          'This offer is not applicable to items in your cart',
        );
      }

      if (offer.type === 'shipping') {
        discount = shipping;
      } else {
        discount = (offer as any).calculateDiscount(subtotal, validItems);
      }

      appliedOffer = offer;
    }

    const total = Math.max(0, subtotal + shipping - discount);

    // Create pending order (payment via Razorpay, method marked as UPI by default)
    const order = new Order({
      userId: user._id,
      orderNumber: `NYK${Date.now()}`,
      items: validItems.map((item: any) => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),
      subtotal,
      shipping,
      discount,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      shippingAddress,
      paymentMethod: 'upi',
      couponCode,
    } as any);

    await order.save();

    // Create Razorpay order via unified payment gateway helper
    const paymentRequest = {
      amount: total,
      currency: 'INR',
      orderId: order.orderNumber,
      customerId: user._id.toString(),
      customerEmail: user.email,
      customerPhone: user.phone || shippingAddress.phone,
      description: `Order ${order.orderNumber}`,
      metadata: {
        mongoOrderId: order.id,
      },
    };

    const paymentResult = await paymentGateway.createPayment(paymentRequest, 'razorpay');

    if (!paymentResult.success) {
      console.error('Failed to create Razorpay order:', paymentResult.error);
      return createErrorResponse(
        paymentResult.error || 'Failed to create Razorpay order',
        502,
        'Payment Error',
      );
    }

    // Store Razorpay order ID on our order document
    (order as any).razorpayOrderId = paymentResult.paymentId;
    await order.save();

    const amountInPaise = Math.round(total * 100);

    return createSuccessResponse(
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        amount: total,
        amountInPaise,
        currency: 'INR',
        razorpayOrderId: paymentResult.paymentId,
      },
      'Razorpay order created successfully',
    );
  } catch (error) {
    return handleApiError(error, 'POST /api/payments/razorpay/create-order');
  }
}

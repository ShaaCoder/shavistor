/**
 * Razorpay Payment Verification API
 * 
 * POST /api/payments/razorpay/verify
 * - Verifies Razorpay Checkout signature (HMAC SHA256)
 * - Marks order as PAID only after successful verification
 */

import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import User from '@/models/User';
import Product from '@/models/Product';
import emailService from '@/lib/email-service';
import { paymentGateway } from '@/lib/payment';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  rateLimit,
  getClientIP,
  withAuth,
} from '@/lib/api-helpers';

export async function POST(request: NextRequest) {
  return withAuth(async (req, _user) => {
    try {
      await connectDB();

      const clientIP = getClientIP(req);
      const rl = rateLimit(`razorpay_verify_${clientIP}`, 20, 60_000);
      if (!rl.allowed) {
        return createErrorResponse('Too many requests', 429, 'Rate limit exceeded');
      }

      const body = await req.json();
      const {
        orderId,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      } = body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return createErrorResponse(
          'razorpay_order_id, razorpay_payment_id and razorpay_signature are required',
          400,
          'Validation Error',
        );
      }

      const isValid = paymentGateway.verifyRazorpaySignature(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      );

      if (!isValid) {
        return createErrorResponse('Invalid Razorpay signature', 400, 'Verification Failed');
      }

      // Locate order either by explicit ID or Razorpay order ID
      let order = null as any;
      if (orderId) {
        order = await Order.findById(orderId);
      }
      if (!order) {
        order = await Order.findOne({ razorpayOrderId: razorpay_order_id });
      }

      if (!order) {
        return createErrorResponse('Order not found', 404, 'Not Found');
      }

      // Idempotency: if already completed, just return success
      if (order.paymentStatus === 'completed') {
        return createSuccessResponse(
          {
            success: true,
            orderId: order.id,
            orderNumber: order.orderNumber,
            paymentStatus: order.paymentStatus,
            razorpayOrderId: order.razorpayOrderId,
            razorpayPaymentId: order.razorpayPaymentId,
          },
          'Payment already verified',
        );
      }

      // Update order payment details
      order.paymentStatus = 'completed';
      order.status = 'confirmed';
      order.paymentAt = new Date();
      order.confirmedAt = new Date();
      order.razorpayOrderId = razorpay_order_id;
      order.razorpayPaymentId = razorpay_payment_id;

      await order.save();

      // Update product stock once on successful payment
      try {
        for (const item of order.items) {
          await Product.findByIdAndUpdate(item.productId, {
            $inc: { stock: -item.quantity },
          });
        }
      } catch (stockError) {
        console.error('Error updating product stock for Razorpay payment:', stockError);
      }

      // Send order confirmation email (mirrors Stripe verify route behaviour)
      try {
        const customer = await User.findById(order.userId).select('name email');

        if (customer && customer.email && !order.confirmationEmailSent) {
          const emailSent = await emailService.sendOrderConfirmation({
            orderId: (order._id as any).toString(),
            orderNumber: order.orderNumber,
            orderDate: order.createdAt.toISOString(),
            customerEmail: customer.email,
            customerName: customer.name,
            items: order.items.map((item: any) => ({
              name: item.name,
              image: item.image,
              price: item.price,
              quantity: item.quantity,
              variant: item.variant,
            })),
            subtotal: order.subtotal,
            shipping: order.shipping,
            discount: order.discount,
            total: order.total,
            shippingAddress: order.shippingAddress,
          });

          if (emailSent) {
            order.confirmationEmailSent = true;
            order.confirmationEmailSentAt = new Date();
            await order.save();
          }
        }
      } catch (emailError) {
        console.error('Error sending Razorpay confirmation email:', emailError);
      }

      return createSuccessResponse(
        {
          success: true,
          orderId: order.id,
          orderNumber: order.orderNumber,
          paymentStatus: 'completed',
          razorpayOrderId: order.razorpayOrderId,
          razorpayPaymentId: order.razorpayPaymentId,
        },
        'Razorpay payment verified successfully',
      );
    } catch (error) {
      return handleApiError(error, 'POST /api/payments/razorpay/verify');
    }
  }, ['customer', 'admin'])(request);
}

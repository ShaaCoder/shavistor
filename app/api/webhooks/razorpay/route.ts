/**
 * Razorpay Webhook Handler (Optional)
 * 
 * POST /api/webhooks/razorpay
 * - Verifies webhook signature using RAZORPAY_WEBHOOK_SECRET
 * - Optionally updates order payment status on payment.captured / order.paid
 */

import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import Product from '@/models/Product';
import User from '@/models/User';
import emailService from '@/lib/email-service';
import { paymentGateway } from '@/lib/payment';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.text();
    const signature = request.headers.get('x-razorpay-signature') || '';

    if (!signature) {
      console.error('Missing Razorpay webhook signature');
      return new Response('Signature missing', { status: 400 });
    }

    const isValid = paymentGateway.verifyWebhookSignature(body, signature, 'razorpay');

    if (!isValid) {
      console.error('Invalid Razorpay webhook signature');
      return new Response('Invalid signature', { status: 400 });
    }

    const event = JSON.parse(body);
    const eventType: string = event.event;

    switch (eventType) {
      case 'payment.captured': {
        const payment = event.payload?.payment?.entity;
        if (!payment) break;

        const razorpayOrderId: string | undefined = payment.order_id;
        const razorpayPaymentId: string | undefined = payment.id;

        if (!razorpayOrderId || !razorpayPaymentId) break;

        const order = await Order.findOne({ razorpayOrderId });
        if (!order) break;

        if (order.paymentStatus === 'completed') {
          // Idempotent: already processed
          break;
        }

        order.paymentStatus = 'completed';
        order.status = 'confirmed';
        order.paymentAt = new Date();
        order.confirmedAt = new Date();
        order.razorpayOrderId = razorpayOrderId;
        order.razorpayPaymentId = razorpayPaymentId;
        await order.save();

        // Update stock once
        try {
          for (const item of order.items) {
            await Product.findByIdAndUpdate(item.productId, {
              $inc: { stock: -item.quantity },
            });
          }
        } catch (err) {
          console.error('Error updating stock from Razorpay webhook:', err);
        }

        // Send confirmation email if not already sent
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
          console.error('Error sending Razorpay webhook confirmation email:', emailError);
        }

        break;
      }
      case 'order.paid': {
        // Fallback: ensure order is marked paid if we receive order.paid events
        const razorpayOrder = event.payload?.order?.entity;
        if (!razorpayOrder) break;

        const razorpayOrderId: string | undefined = razorpayOrder.id;
        if (!razorpayOrderId) break;

        const order = await Order.findOne({ razorpayOrderId });
        if (!order) break;

        if (order.paymentStatus === 'completed') break;

        order.paymentStatus = 'completed';
        order.status = 'confirmed';
        order.paymentAt = new Date();
        order.confirmedAt = new Date();
        await order.save();

        break;
      }
      default: {
        console.log(`Unhandled Razorpay webhook event: ${eventType}`);
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Razorpay webhook error:', error);
    return new Response('Webhook error', { status: 500 });
  }
}

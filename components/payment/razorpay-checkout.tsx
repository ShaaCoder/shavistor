'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Zap } from 'lucide-react';

declare global {
  interface Window {
    Razorpay?: any;
  }
}

interface RazorpayCheckoutProps {
  items: Array<{
    productId: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }>;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  total: number;
  couponCode?: string;
  selectedShippingRate?: any; // Shiprocket shipping rate
  onSuccess: (orderId: string) => void;
  onError: (error: string) => void;
}

async function loadRazorpayScript(): Promise<void> {
  if (typeof window === 'undefined') return;
  if (window.Razorpay) return;

  await new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
    document.body.appendChild(script);
  });
}

export function RazorpayCheckout({
  items,
  shippingAddress,
  total,
  couponCode,
  selectedShippingRate,
  onSuccess,
  onError,
}: RazorpayCheckoutProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      setMessage(null);

      await loadRazorpayScript();

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK not available');
      }

      // Create order + Razorpay order server-side
      const response = await fetch('/api/payments/razorpay/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          shippingAddress,
          total,
          couponCode,
          selectedShippingRate,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Failed to create Razorpay order');
      }

      const {
        orderId,
        orderNumber,
        amount,
        amountInPaise,
        razorpayOrderId,
      } = data.data;

      const key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
      if (!key) {
        throw new Error('NEXT_PUBLIC_RAZORPAY_KEY_ID is not configured');
      }

      const options = {
        key,
        amount: amountInPaise,
        currency: 'INR',
        name: 'Shavi Store',
        description: `Order ${orderNumber}`,
        order_id: razorpayOrderId,
        prefill: {
          name: shippingAddress.name,
          email: '',
          contact: shippingAddress.phone,
        },
        notes: {
          orderId,
          orderNumber,
        },
        theme: {
          color: '#ec4899',
        },
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch('/api/payments/razorpay/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                orderId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData?.success) {
              throw new Error(
                verifyData?.message || 'Payment verification failed. Please contact support.',
              );
            }

            onSuccess(orderId);
          } catch (err) {
            const msg =
              err instanceof Error
                ? err.message
                : 'Payment completed but verification failed. Please contact support.';
            setMessage(msg);
            onError(msg);
          }
        },
        modal: {
          ondismiss: () => {
            setMessage('Payment popup closed before completion');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Razorpay checkout failed';
      setMessage(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Pay with Razorpay (Card / UPI / Wallet)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Amount</span>
            <span className="font-semibold">₹{total}</span>
          </div>
          <div className="text-xs text-gray-500">
            You will complete your payment securely via Razorpay Checkout.
          </div>
        </div>

        {message && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        <Button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Initializing Razorpay...
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Pay with Razorpay
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500 text-center">
          Powered by Razorpay • Secure & Encrypted
        </div>
      </CardContent>
    </Card>
  );
}

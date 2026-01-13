// app/returns/page.tsx
// Updated Refund & Cancellation Policy page for ShaviStore e-commerce platform
// Uses Tailwind CSS for modern, responsive design
// Integrates Header and Footer; expanded sections for clear refund guidelines
// Last updated: January 13, 2026

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from 'next';
import { Clock, Package, AlertTriangle, Shield } from 'lucide-react'; // Assuming lucide-react installed

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy - ShaviStore',
  description: 'Learn about ShaviStore\'s refund, return, and cancellation policies for hassle-free shopping.',
};

export default function RefundPolicy() {
  const lastUpdated = 'January 13, 2026';

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Refund & Cancellation Policy</h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              At <strong className="text-indigo-600">ShaviStore</strong>, customer satisfaction is our top priority. We strive to ensure a seamless shopping experience, but we understand that sometimes returns or cancellations are necessary. This policy outlines our guidelines for order cancellations, refunds, and returns to make the process as straightforward as possible. By placing an order, you agree to these terms.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-indigo-600" />
                1. Order Cancellation
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You can cancel your order at any time before it is shipped. To request a cancellation:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Contact us via email at <a href="mailto:support@shavistore.in" className="text-indigo-600 hover:underline">support@shavistore.in</a> or through your account dashboard.</li>
                <li>Provide your order number and reason for cancellation.</li>
                <li>Full refund will be issued if cancelled before processing (typically within 2 hours of placement).</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Once an order is shipped, it cannot be cancelled. In such cases, refer to our Returns Policy below.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2 text-indigo-600" />
                2. Returns Eligibility
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Returns are accepted within <strong>7 days</strong> of delivery for unused items in original packaging with tags intact. Eligible reasons include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Change of mind (size/color mismatch, etc.).</li>
                <li>Damaged or defective products.</li>
                <li>Incorrect item shipped.</li>
              </ul>
              <p className="text-sm text-gray-500">
                Shipping costs are non-refundable unless the return is due to our error.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                3. Refund Processing
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If your return is approved, refunds will be processed to the original payment method (e.g., Razorpay, bank transfer) within <strong>5–7 business days</strong> of receiving the returned item. Please note:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
                <li>Refunds exclude original shipping fees.</li>
                <li>Return shipping is at your expense unless due to our error.</li>
                <li>Partial refunds may apply for partial returns.</li>
              </ul>
              <p className="text-sm text-gray-500 mt-2">
                Track your refund status in your account dashboard.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-indigo-600" />
                4. Damaged or Incorrect Products
              </h2>
              <p className="text-gray-700 leading-relaxed">
                If you receive a damaged, defective, or incorrect product, please contact us within <strong>48 hours</strong> of delivery. Provide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-4">
                <li>Your order number.</li>
                <li>Clear photos/videos of the issue.</li>
                <li>Description of the problem.</li>
              </ul>
              <p className="text-gray-700 mt-2">
                We'll arrange a free replacement or full refund, including return shipping.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Non-Refundable Items</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Certain products are non-refundable due to hygiene, personalization, or usage reasons. These include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Underwear, swimwear, and inner garments.</li>
                <li>Personalized or custom-made items.</li>
                <li>Perishable goods (e.g., food items).</li>
                <li>Digital downloads or software.</li>
              </ul>
              <p className="text-sm text-gray-500">
                Non-refundable status will be clearly indicated on the product page.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Initiate a Return</h2>
              <p className="text-gray-700 leading-relaxed">
                1. Log in to your account and go to "My Orders."<br />
                2. Select the order and choose "Return Item."<br />
                3. Follow the prompts to generate a return label (if applicable).<br />
                4. Pack the item securely and ship it back using the provided instructions.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                For assistance, email us at support@shavistore.in.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-semibold mb-2">For refund or return queries:</p>
                <p className="text-indigo-600 hover:underline">Email: <a href="mailto:support@shavistore.in">support@shavistore.in</a></p>
                <p className="text-sm text-gray-600">ShaviStore, Bahadurgarh, Haryana, India</p>
              </div>
            </section>

            <footer className="border-t pt-6 text-center text-gray-500">
              <p>Last updated: {lastUpdated}</p>
            </footer>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
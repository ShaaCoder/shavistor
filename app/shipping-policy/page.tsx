// app/shipping/page.tsx
// Updated Shipping Policy page for ShaviStore e-commerce platform
// Uses Tailwind CSS for modern, responsive design
// Integrates Header and Footer; enhanced with icons and detailed guidelines
// Last updated: January 14, 2026

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from 'next';
import { Truck, Clock, MapPin, PackageCheck, AlertCircle, Phone, Mail } from 'lucide-react'; // Assuming lucide-react installed

export const metadata: Metadata = {
  title: 'Shipping Policy - ShaviStore',
  description: 'Understand ShaviStore\'s shipping process, timelines, charges, and delivery guidelines for orders in India.',
};

export default function ShippingPolicyPage() {
  const lastUpdated = 'January 14, 2026';

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Shipping Policy</h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              At <strong className="text-indigo-600">ShaviStore</strong>, we are committed to delivering your household utility and housekeeping products in a timely and reliable manner. This Shipping Policy outlines our processing, delivery timelines, charges, and guidelines to ensure a smooth experience. All shipments are handled with care, primarily within India.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2 text-indigo-600" />
                1. Shipping Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We partner with trusted couriers like Shiprocket to ship your orders securely. All packages are insured against loss or damage during transit.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                2. Order Processing Time
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Orders are typically processed and handed over to the courier within <strong>1–2 business days</strong>.</li>
                <li>Processing does not include weekends, Sundays, or public holidays in India.</li>
                <li>High-volume periods (e.g., festivals) may extend processing by 1 day.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <PackageCheck className="h-5 w-5 mr-2 text-indigo-600" />
                3. Shipping & Delivery Timeline
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Estimated delivery: <strong>3–7 business days</strong> from order placement, varying by location (metro cities: 2–4 days; remote areas: 5–7 days).</li>
                <li>Timelines may be affected by courier delays, adverse weather, or regional restrictions (e.g., during monsoons or strikes).</li>
                <li>Express shipping options may be available at checkout for faster delivery (additional fee).</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Shipping Charges</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Shipping fees are calculated at checkout based on order weight, dimensions, and destination. Flat rates apply for standard delivery:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Free shipping on orders over ₹999.</li>
                <li>Standard fee: ₹99 for orders under ₹999 (waived for select promotions).</li>
              </ul>
              <p className="text-sm text-gray-500">
                Fees are non-refundable once the order ships. Taxes (GST) are included where applicable.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                5. Delivery Locations
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We deliver <strong>within India only</strong>, covering all pin codes via standard ground shipping. International shipping is not currently available. Ensure your address is complete (including landmark and phone number) to avoid delays.
              </p>
              <p className="text-sm text-gray-500">
                Remote or difficult-to-access areas may incur additional surcharges.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Order Tracking</h2>
              <p className="text-gray-700 leading-relaxed">
                After shipment, you'll receive a tracking link via SMS or email. Monitor your order in real-time through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                <li>Your account dashboard under "My Orders."</li>
                <li>The courier's website using the provided tracking ID.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-indigo-600" />
                7. Delivery Issues
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Report any issues (damaged packaging, missing items) within <strong>48 hours</strong> of delivery. Provide:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mt-2">
                <li>Order number.</li>
                <li>Photos/videos of the issue.</li>
                <li>Detailed description.</li>
              </ul>
              <p className="text-gray-700 mt-2">
                We'll arrange a replacement or refund per our Returns Policy.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Undeliverable Packages</h2>
              <p className="text-gray-700 leading-relaxed">
                If an order is returned undelivered (e.g., incorrect address, recipient unavailable), it will be held for 7 days. Re-shipping requires new payment for fees; otherwise, a refund (minus original shipping) will be issued.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-indigo-600" />
                Contact Information
              </h2>
              <div className="bg-gray-50 p-6 rounded-md space-y-2">
                <p className="text-gray-700"><strong>Phone:</strong> <a href="tel:+918810524651" className="text-indigo-600 hover:underline">8810524651</a></p>
                <p className="text-gray-700"><strong>Email:</strong> <a href="mailto:shavi8810@gmail.com" className="text-indigo-600 hover:underline">shavi8810@gmail.com</a></p>
                <p className="text-gray-700"><strong>Address:</strong> Meer Vihar, MubarakPur Dabas, New Delhi – 110081, India</p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Important Note</h2>
              <p className="text-gray-700 leading-relaxed">
                As ShaviStore specializes in household utility and housekeeping products, delivery timelines and handling may vary by item type (e.g., fragile goods) and location. We recommend checking product pages for specific notes.
              </p>
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
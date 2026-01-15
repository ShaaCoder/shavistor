// app/terms/page.tsx
// Updated Terms & Conditions page for ShaviStore e-commerce platform
// Uses Tailwind CSS for modern, responsive design
// Integrates Header and Footer; expanded sections for legal completeness
// Added icons for visual consistency; updated contact info and date
// Last updated: January 14, 2026

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from 'next';
import { Scale, User, ShoppingCart, CreditCard, Truck, ArrowLeftRight, Copyright, Gavel, Edit3, Mail } from 'lucide-react'; // Assuming lucide-react installed

export const metadata: Metadata = {
  title: 'Terms & Conditions - ShaviStore',
  description: 'Read ShaviStore\'s Terms and Conditions for using our website and services.',
};

export default function TermsAndConditions() {
  const lastUpdated = 'January 14, 2026';

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Welcome to <strong className="text-indigo-600">ShaviStore</strong>. These Terms and Conditions ("Terms") govern your access to and use of our website, mobile application, and services (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms. If you do not agree, please do not use the Services.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Scale className="h-5 w-5 mr-2 text-indigo-600" />
                1. Use of Website
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You agree to use the Services only for lawful purposes and in a manner that does not infringe on the rights of, restrict, or inhibit anyone else's use and enjoyment of the Services. Prohibited activities include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Unauthorized access to our systems or accounts.</li>
                <li>Posting harmful, obscene, or illegal content.</li>
                <li>Interfering with the Services' functionality (e.g., via viruses or spam).</li>
              </ul>
              <p className="text-sm text-gray-500">
                We reserve the right to terminate or suspend access for violations.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2 text-indigo-600" />
                2. User Accounts
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To access certain features, you must create an account with accurate information. You are responsible for maintaining the confidentiality of your account credentials and all activities under your account. Notify us immediately of any unauthorized use.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2 text-indigo-600" />
                3. Products & Pricing
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                All product descriptions, images, specifications, and prices are for informational purposes only and subject to change without notice. We strive for accuracy but do not guarantee it. We reserve the right to refuse, cancel, or limit orders at our discretion, including for pricing errors or stock unavailability.
              </p>
              <p className="text-sm text-gray-500">
                Prices exclude taxes, shipping, and duties unless stated otherwise.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-indigo-600" />
                4. Orders and Payments
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Orders are subject to acceptance and availability. Payments are processed securely through third-party gateways like <strong className="text-indigo-600">Razorpay</strong>. We do not store full payment card details. All transactions are in INR.
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>You authorize us to charge your payment method for orders.</li>
                <li>Refunds follow our Returns Policy (see below).</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="h-5 w-5 mr-2 text-indigo-600" />
                5. Shipping and Delivery
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We ship via trusted partners like <strong>Shiprocket</strong>. Delivery times are estimates; delays due to unforeseen circumstances are not our liability. Risk of loss passes to you upon delivery. Inspect packages upon receipt and report issues promptly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <ArrowLeftRight className="h-5 w-5 mr-2 text-indigo-600" />
                6. Returns and Refunds
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Eligible returns must be initiated within 7 days of delivery for unused items in original packaging. Non-returnable items include personalized goods or perishables. Refunds process within 5-10 business days, minus shipping fees. See our full <a href="/returns" className="text-indigo-600 hover:underline">Returns Policy</a> for details.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Copyright className="h-5 w-5 mr-2 text-indigo-600" />
                7. Intellectual Property
              </h2>
              <p className="text-gray-700 leading-relaxed">
                All content on the Services, including text, graphics, logos, and software, is owned by ShaviStore or its licensors and protected by copyright, trademark, and other laws. You may not reproduce, distribute, or create derivative works without prior written consent.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Scale className="h-5 w-5 mr-2 text-indigo-600" />
                8. Limitation of Liability
              </h2>
              <p className="text-gray-700 leading-relaxed">
                To the fullest extent permitted by law, ShaviStore shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of the Services or products, even if advised of the possibility. Our total liability shall not exceed the amount paid by you in the past 12 months.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Gavel className="h-5 w-5 mr-2 text-indigo-600" />
                9. Governing Law
              </h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms are governed by the laws of India, with exclusive jurisdiction in the courts of New Delhi. Any disputes will be resolved through arbitration under the Arbitration and Conciliation Act, 1996.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Edit3 className="h-5 w-5 mr-2 text-indigo-600" />
                10. Changes to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We may update these Terms at any time. Significant changes will be posted here with the updated date. Continued use after changes constitutes acceptance. Check periodically for updates.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-indigo-600" />
                Contact Us
              </h2>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-semibold mb-2">For questions about these Terms:</p>
                <p className="text-indigo-600 hover:underline">Email: <a href="mailto:shavi8810@gmail.com">shavi8810@gmail.com</a></p>
                <p className="text-sm text-gray-600">ShaviStore, Meer Vihar, MubarakPur Dabas, New Delhi – 110081, India</p>
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
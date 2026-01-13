// app/privacy/page.tsx
// Updated Privacy Policy page with modern design using Tailwind CSS
// Integrates Header and Footer imports
// Enhanced layout: Card-based sections, better typography, responsive design
// Comprehensive content for compliance; dynamic date set to January 13, 2026

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - ShaviStore',
  description: 'Learn how ShaviStore collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  const lastUpdated = 'January 13, 2026'; // Fixed to current date

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              At <strong className="text-indigo-600">ShaviStore</strong>, we value your privacy and are committed to
              protecting your personal information. This Privacy Policy explains how
              we collect, use, disclose, and safeguard your data when you visit our website,
              make purchases, or interact with our services. By using ShaviStore, you consent
              to the practices described in this policy.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We collect information to provide and improve our services. This includes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>Personal Information:</strong> Name, email address, phone number, billing and shipping addresses provided during account creation, registration, or checkout.</li>
                <li><strong>Order Information:</strong> Purchase details, including product IDs, quantities, prices, order history, and transaction records.</li>
                <li><strong>Usage Data:</strong> Device information, IP address, browser type, pages visited, time spent on site, and interaction data (e.g., cart additions) collected via cookies and analytics tools.</li>
                <li><strong>Payment Information:</strong> Processed by third parties; we do not store full card details.</li>
              </ul>
              <p className="text-sm text-gray-500 italic">
                We only collect what is necessary and with your consent where required.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>To process and fulfill orders, including payment processing and shipping.</li>
                <li>To manage your account, provide customer support, and respond to inquiries.</li>
                <li>To send transactional emails (e.g., order confirmations, shipping updates) and promotional communications (with opt-out options).</li>
                <li>To analyze usage patterns, improve site functionality, and personalize recommendations.</li>
                <li>To prevent fraud, comply with legal obligations, and enforce our terms of service.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Payment Information</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                All payments on ShaviStore are processed securely through trusted
                third-party payment gateways such as <strong className="text-indigo-600">Razorpay</strong>. We do not
                store your debit card, credit card, UPI, net banking, or other sensitive payment details on our servers.
                Razorpay handles all payment data in compliance with PCI DSS standards.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures, including encryption (e.g., HTTPS, TLS), access controls,
                and regular audits, to protect your personal data from unauthorized access, alteration, disclosure, or destruction.
                However, no method of transmission over the internet is 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Sharing Your Information</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We do not sell your personal data. We may share it only as necessary:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>With service providers like payment gateways (<strong>Razorpay</strong>) and logistics partners (<strong>Shiprocket</strong>) for order fulfillment.</li>
                <li>With legal authorities if required by law or to protect our rights.</li>
                <li>In the event of a business transfer (e.g., merger), with notice to you.</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our website uses cookies, pixels, and similar technologies to enhance functionality, analyze traffic (via Google Analytics), and remember preferences.
                Essential cookies are required for core features like cart persistence. You can manage cookies via your browser settings or our cookie consent banner.
              </p>
              <p className="text-sm text-gray-500">
                For more details, see our <a href="/cookies-policy" className="text-indigo-600 hover:underline">Cookie Policy</a>.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Data Retention</h2>
              <p className="text-gray-700 leading-relaxed">
                We retain your personal data only as long as necessary for the purposes outlined (e.g., 7 years for order records per tax laws) or until you request deletion.
                Upon request, we will delete or anonymize your data, subject to legal retention requirements.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Your Rights and Choices</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Under applicable laws (e.g., DPDP Act in India), you have rights to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Access, correct, or update your information via your account dashboard.</li>
                <li>Request deletion or restriction of processing.</li>
                <li>Opt out of marketing emails or withdraw consent.</li>
                <li>File complaints with data protection authorities.</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, email us at support@shavistore.in.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700 leading-relaxed">
                As an India-based service, your data is primarily stored in India. If transferred internationally (e.g., to cloud providers), we ensure adequate protections via standard contractual clauses.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this policy periodically. Significant changes will be notified via email or site banner.
                Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 mb-2">
                If you have questions, concerns, or requests regarding this Privacy Policy or your data, please contact our Data Protection Officer:
              </p>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="font-semibold">Email: <a href="mailto:support@shavistore.in" className="text-indigo-600 hover:underline">support@shavistore.in</a></p>
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
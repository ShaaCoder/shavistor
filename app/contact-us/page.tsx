// app/contact/page.tsx
// Updated Contact Us page for ShaviStore e-commerce platform
// Uses Tailwind CSS for modern, responsive design
// Integrates Header and Footer; includes contact details, support info, and social links
// Last updated: January 13, 2026

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react'; // Assuming lucide-react installed

export const metadata: Metadata = {
  title: 'Contact Us - ShaviStore',
  description: 'Get in touch with ShaviStore for support, inquiries, or feedback. Email, phone, and address details.',
};

export default function ContactUs() {
  const lastUpdated = 'January 13, 2026';

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We're here to help! Whether you have questions about our products, need order support, or want to provide feedback, our team is ready to assist. Reach out via the details below, and we'll get back to you promptly.
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-indigo-600" />
                Customer Support
              </h2>
              <div className="bg-gray-50 p-6 rounded-md">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> <a href="mailto:support@shavistore.in" className="text-indigo-600 hover:underline">support@shavistore.in</a>
                </p>
                <p className="text-sm text-gray-600">
                  For general inquiries, order issues, or returns.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-indigo-600" />
                Phone Support
              </h2>
              <div className="bg-gray-50 p-6 rounded-md">
                <p className="text-gray-700 mb-2">
                  <strong>Phone:</strong> <a href="tel:+91-XXXX-XXXXXX" className="text-indigo-600 hover:underline">+91-XXXX-XXXXXX</a>
                </p>
                <p className="text-sm text-gray-600">
                  Available Monday–Friday, 9 AM–6 PM IST.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                Visit Us
              </h2>
              <div className="bg-gray-50 p-6 rounded-md">
                <p className="text-gray-700 mb-2">
                  <strong>Business Name:</strong> ShaviStore
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Address:</strong> [Your Street Address], Bahadurgarh, Haryana 124507, India
                </p>
                <p className="text-sm text-gray-600">
                  For in-person visits or local pickups (by appointment).
                </p>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                Support Hours & Response Time
              </h2>
              <p className="text-gray-700 leading-relaxed">
                We aim to respond to all queries within <strong>24–48 business hours</strong>. For urgent issues, use our live chat (coming soon) or phone support during hours.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-700 mt-4">
                <li>Email: 24/7 submission, responses Mon–Fri</li>
                <li>Phone: Mon–Fri, 9 AM–6 PM IST</li>
                <li>Social Media: Mon–Sun, variable response</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Connect on Social Media</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Follow us for updates, promotions, and quick tips:
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  <i className="fab fa-facebook text-2xl"></i> Facebook
                </a>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 ml-4">
                  <i className="fab fa-instagram text-2xl"></i> Instagram
                </a>
                <a href="#" className="text-indigo-600 hover:text-indigo-800 ml-4">
                  <i className="fab fa-twitter text-2xl"></i> Twitter
                </a>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Or message us directly on these platforms.
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
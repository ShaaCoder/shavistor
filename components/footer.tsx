'use client';

import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useCategories } from '@/hooks/use-categories';

export function Footer() {
  const { categories, loading: categoriesLoading } = useCategories();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">ShaviStore</h3>
            <p className="text-gray-300 text-sm">
              Your trusted store for home utility and housekeeping products designed
              for everyday household use.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              {categoriesLoading ? (
                [...Array(4)].map((_, i) => (
                  <li key={i} className="h-4 bg-gray-700 rounded w-24 animate-pulse"></li>
                ))
              ) : (
                categories.slice(0, 4).map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-gray-300 hover:text-white"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Support (ONLY IMPORTANT LINKS) */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-gray-300 hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-gray-300 hover:text-white">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-gray-300 hover:text-white">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal (GATEWAY REQUIRED) */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="text-gray-300 hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} ShaviStore. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Household Utility Products</span>
            <span className="text-gray-400 text-sm">Fast Delivery</span>
            <span className="text-gray-400 text-sm">Secure Payments</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

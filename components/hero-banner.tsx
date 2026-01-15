'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { useCategories } from '@/hooks/use-categories';

export function HeroBanner() {
  const { categories, loading: categoriesLoading } = useCategories();

  const firstCategory = categories[0];
  const secondCategory = categories[1];

  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[500px] py-12">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Shavi
                <span className="text-emerald-600"> Store</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Quality home utility and housekeeping products designed for
                everyday cleaning, hygiene, and household maintenance.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {categoriesLoading ? (
                <>
                  <div className="h-12 bg-gray-200 rounded-lg w-32 animate-pulse"></div>
                  <div className="h-12 bg-gray-200 rounded-lg w-36 animate-pulse"></div>
                </>
              ) : (
                <>
                  {firstCategory && (
                    <Link href={`/category/${firstCategory.slug}`}>
                      <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                        Shop {firstCategory.name}
                      </Button>
                    </Link>
                  )}
                  {secondCategory && (
                    <Link href={`/category/${secondCategory.slug}`}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                      >
                        Explore {secondCategory.name}
                      </Button>
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* Trust Features */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Household Use Products</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Fast & Reliable Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Secure Payments</span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <Image
                src="https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg"
                alt="Home Utility and Housekeeping Products"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover rounded-2xl shadow-2xl"
              />

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Everyday Essentials</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

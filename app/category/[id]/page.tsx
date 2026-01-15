import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import CategoryPageClient from './category-page-client';
import { generateCategoryMetadata } from '@/lib/seo-utils';

interface CategoryPageProps {
  params: {
    id: string;
  };
}

// Server-side metadata for category pages
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/categories/${params.id}`, { next: { revalidate: 1800 } });

    if (!res.ok) {
      return {
        title: 'Category Not Found | Home Utility Products',
        description: 'The requested category could not be found.'
      };
    }

    const { data } = await res.json();
    if (!data) {
      return {
        title: 'Category Not Found | Home Utility Products',
        description: 'The requested category could not be found.'
      };
    }

    // Use our SEO utils to build category metadata
    return generateCategoryMetadata(data.name, undefined, data.productCount);
  } catch (e) {
    return {
      title: 'Home Utility Products - Premium Categories',
      description: 'Explore categories of Housekeeping Essentialsat Home Utility Products.'
    };
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <div>
      <Header />
      <CategoryPageClient id={params.id} />
      <Footer />
    </div>
  );
}

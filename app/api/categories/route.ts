/**
 * Categories API Routes
 *
 * GET /api/categories  - List all categories
 * POST /api/categories - Create new category
 */

import { NextRequest } from 'next/server';
import connectDB from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import mongoose from 'mongoose';
import {
  createSuccessResponse,
  createErrorResponse,
  handleApiError,
  rateLimit,
  getClientIP,
  withAuth,
} from '@/lib/api-helpers';

/* ----------------------------- */
/* Helpers (SEO Safe)             */
/* ----------------------------- */
const safeSeoTitle = (title: string) =>
  title.length > 60 ? title.substring(0, 57) + '...' : title;

const safeSeoDescription = (desc: string) =>
  desc.length > 160 ? desc.substring(0, 157) + '...' : desc;

/* ----------------------------- */
/* GET /api/categories            */
/* ----------------------------- */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const clientIP = getClientIP(request);
    const rateLimitResult = rateLimit(`categories_get_${clientIP}`, 100, 60000);

    if (!rateLimitResult.allowed) {
      return createErrorResponse('Too many requests', 429, 'Rate limit exceeded');
    }

    const showAll = request.nextUrl.searchParams.get('all') === 'true';
    const query = showAll ? {} : { isActive: true };

    const categories = (await Category.find(query)
      .sort({ name: 1 })
      .lean()) as any[];

    const getCategoryAndDescendantIds = async (rootId: any) => {
      const seen = new Set<string>([String(rootId)]);
      let frontier: any[] = [rootId];

      while (frontier.length) {
        const children = await Category.find({
          parentCategory: { $in: frontier },
        })
          .select('_id')
          .lean();

        frontier = [];
        for (const child of children) {
          const idStr = String(child._id);
          if (!seen.has(idStr)) {
            seen.add(idStr);
            frontier.push(child._id);
          }
        }
      }

      return Array.from(seen).map((id) => new mongoose.Types.ObjectId(id));
    };

    const categoriesWithCounts: any[] = [];

    for (const category of categories) {
      const allIds = await getCategoryAndDescendantIds(category._id);
      const realCount = await Product.countDocuments({
        category: { $in: allIds },
        isActive: true,
      });

      if (category.productCount !== realCount) {
        Category.findByIdAndUpdate(category._id, {
          productCount: realCount,
        }).catch(() => {});
      }

      categoriesWithCounts.push({
        ...category,
        productCount: realCount,
      });
    }

    const formattedCategories = categoriesWithCounts.map((category) => ({
      id: category._id.toString(),
      name: category.name,
      slug: category.slug,
      description: category.description,
      image: category.image,
      subcategories: category.subcategories,
      isActive: category.isActive,
      isFeatured: category.isFeatured,
      sortOrder: category.sortOrder,
      productCount: category.productCount || 0,

      seoTitle: safeSeoTitle(
        category.seoTitle || `${category.name} | ShaviStore`
      ),
      seoDescription: safeSeoDescription(
        category.seoDescription ||
          `Shop ${category.name.toLowerCase()} products for household cleaning and utility use at ShaviStore.`
      ),
      seoKeywords:
        category.seoKeywords || [
          category.name.toLowerCase(),
          'home utility',
          'housekeeping products',
          'household cleaning',
        ],

      canonicalUrl: `/category/${category.slug}`,
      breadcrumbs: [
        { name: 'Home', url: '/' },
        { name: 'Categories', url: '/category' },
        { name: category.name, url: `/category/${category.slug}` },
      ],
    }));

    return createSuccessResponse(
      formattedCategories,
      `Retrieved ${formattedCategories.length} categories`
    );
  } catch (error) {
    return handleApiError(error, 'GET /api/categories');
  }
}

/* ----------------------------- */
/* POST /api/categories           */
/* ----------------------------- */
export async function POST(request: NextRequest) {
  return withAuth(
    async (req) => {
      try {
        await connectDB();

        const clientIP = getClientIP(req);
        const rateLimitResult = rateLimit(
          `categories_post_${clientIP}`,
          10,
          60000
        );

        if (!rateLimitResult.allowed) {
          return createErrorResponse(
            'Too many requests',
            429,
            'Rate limit exceeded'
          );
        }

        const body = await req.json();

        if (!body.name || !body.slug) {
          return createErrorResponse(
            'Name and slug are required',
            400,
            'Validation Error'
          );
        }

        const newCategory = new Category({
          name: body.name,
          slug: body.slug,
          description: body.description || '',
          image: Array.isArray(body.images)
            ? body.images[0]
            : body.image || '',
          parentCategory: body.parentCategory || null,
          subcategories: body.subcategories || [],
          isActive: body.isActive ?? true,
          isFeatured: body.isFeatured || false,
          sortOrder: body.sortOrder || 0,
          productCount: 0,

          seoTitle: safeSeoTitle(body.seoTitle || body.name),
          seoDescription: safeSeoDescription(
            body.seoDescription ||
              `Buy ${body.name.toLowerCase()} products for everyday household cleaning and utility use.`
          ),
          seoKeywords:
            body.seoKeywords || [
              body.name.toLowerCase(),
              'home utility',
              'housekeeping products',
              'household cleaning',
            ],
        });

        await newCategory.save();

        return createSuccessResponse(
          {
            id: newCategory._id.toString(),
            name: newCategory.name,
            slug: newCategory.slug,
            description: newCategory.description,
            image: newCategory.image,
            subcategories: newCategory.subcategories,
            isActive: newCategory.isActive,
            isFeatured: newCategory.isFeatured,
            sortOrder: newCategory.sortOrder,
            productCount: newCategory.productCount,

            seoTitle: newCategory.seoTitle,
            seoDescription: newCategory.seoDescription,
            seoKeywords: newCategory.seoKeywords,

            canonicalUrl: `/category/${newCategory.slug}`,
          },
          'Category created successfully'
        );
      } catch (error) {
        return handleApiError(error, 'POST /api/categories');
      }
    },
    ['admin'] // keep admin-only
  )(request);
}

/* ----------------------------- */
/* OPTIONS (CORS)                 */
/* ----------------------------- */
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

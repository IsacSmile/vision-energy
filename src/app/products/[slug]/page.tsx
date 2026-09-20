import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import CategoryDetailClient from '@/components/products/CategoryDetailClient';
import { FALLBACK_CATEGORIES } from '@/lib/fallback-categories';

interface SlugPageProps {
  params?: Promise<{ slug: string }> | { slug: string };
}

async function resolveParams(params: SlugPageProps['params']) {
  if (!params) return { slug: '' };
  try {
    if (typeof (params as any).then === 'function') {
      return (await params) || { slug: '' };
    }
    return (params as any) || { slug: '' };
  } catch (e) {
    return { slug: '' };
  }
}

export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await resolveParams(params);
  if (!slug) return { title: 'Category Not Found' };

  let category: any = null;
  try {
    category = await db.productCategory.findUnique({ where: { slug } });
  } catch (e) {
    // Fallback search
  }

  if (!category) {
    category = FALLBACK_CATEGORIES.find((c) => c.slug === slug) || null;
  }

  if (!category) return { title: 'Category Not Found' };

  return {
    title: `[${category.code}] ${category.title} | Technical Product Specifications`,
    description: category.description,
  };
}

export const revalidate = 60;

export default async function CategoryDetailPage({ params }: SlugPageProps) {
  const { slug } = await resolveParams(params);
  if (!slug) {
    notFound();
  }

  let category: any = null;
  let relatedCategories: any[] = [];

  try {
    category = await db.productCategory.findUnique({ where: { slug } });
  } catch (e) {
    console.error('Database query fallback triggered for category detail:', e);
  }

  // Fallback to static data if database is unseeded or connection failed
  if (!category) {
    const fb = FALLBACK_CATEGORIES.find((c) => c.slug === slug);
    if (fb) {
      category = {
        ...fb,
        id: fb.code,
        image: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }
  }

  if (!category) {
    notFound();
  }

  try {
    relatedCategories = await db.productCategory.findMany({
      where: {
        groupPrefix: category.groupPrefix,
        NOT: { slug: category.slug },
      },
      take: 6,
    });
  } catch (e) {
    console.error('Error fetching related categories from database:', e);
  }

  if (!relatedCategories || relatedCategories.length === 0) {
    relatedCategories = FALLBACK_CATEGORIES.filter(
      (c) => c.groupPrefix === category.groupPrefix && c.slug !== category.slug
    ).slice(0, 6).map((fb) => ({
      ...fb,
      id: fb.code,
      image: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <CategoryDetailClient category={category} relatedCategories={relatedCategories} />
    </div>
  );
}

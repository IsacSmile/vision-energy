import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import CategoryDetailClient from '@/components/products/CategoryDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await db.productCategory.findUnique({ where: { slug } });
  if (!category) return { title: 'Category Not Found' };

  return {
    title: `[${category.code}] ${category.title} | Technical Product Specifications`,
    description: category.description,
  };
}

export const revalidate = 60;

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await db.productCategory.findUnique({ where: { slug } });

  if (!category) {
    notFound();
  }

  const relatedCategories = await db.productCategory.findMany({
    where: {
      groupPrefix: category.groupPrefix,
      NOT: { id: category.id },
    },
    take: 6,
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
      <CategoryDetailClient category={category} relatedCategories={relatedCategories} />
    </div>
  );
}

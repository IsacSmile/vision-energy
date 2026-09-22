import React from "react";
import { notFound, redirect } from "next/navigation";
import { getPublishedCategoryBySlug, getPublishedProductCategories } from "@/lib/data/products";
import { db } from "@/lib/db";
import CategoryDetailClient from "@/components/products/CategoryDetailClient";

interface SlugPageProps {
  params?: Promise<{ slug: string }> | { slug: string };
}

async function resolveParams(params: SlugPageProps["params"]) {
  if (!params) return { slug: "" };
  try {
    if (typeof (params as any).then === "function") {
      return (await params) || { slug: "" };
    }
    return (params as any) || { slug: "" };
  } catch (e) {
    return { slug: "" };
  }
}

export async function generateStaticParams() {
  try {
    const categories = await getPublishedProductCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await resolveParams(params);
  if (!slug) return { title: "Category Not Found" };

  const category = await getPublishedCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: category.seoTitle || `[${category.code}] ${category.title} | Vision Energy`,
    description: category.seoDescription || category.description,
  };
}

export default async function CategoryDetailPage({ params }: SlugPageProps) {
  const { slug } = await resolveParams(params);
  if (!slug) {
    notFound();
  }

  const category = await getPublishedCategoryBySlug(slug);

  if (!category) {
    // Check if a 301 slug redirect exists for this old slug
    const fromPath = `/products/${slug}`;
    const redirectRow = await db.slugRedirect.findUnique({ where: { fromPath } });
    if (redirectRow) {
      redirect(redirectRow.toPath);
    }
    notFound();
  }

  // Fetch related categories in the same group
  const allCategories = await getPublishedProductCategories();
  const relatedCategories = allCategories
    .filter((c) => c.group === category.group && c.slug !== category.slug)
    .slice(0, 6);

  return <CategoryDetailClient category={category as any} relatedCategories={relatedCategories as any} />;
}

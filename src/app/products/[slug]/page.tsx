import { redirect } from "next/navigation";
import { getPublishedCategoryBySlug, getPublishedProductCategories } from "@/lib/data/products";

interface SlugPageProps {
  params?: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  try {
    const categories = await getPublishedProductCategories();
    return categories.map((c) => ({ slug: c.slug }));
  } catch {
    return [];
  }
}

export default async function CategoryDetailPage({ params }: SlugPageProps) {
  let slug = "";
  if (params) {
    try {
      const resolved = (await params) as { slug: string };
      slug = resolved?.slug || "";
    } catch {
      slug = "";
    }
  }

  if (slug) {
    const category = await getPublishedCategoryBySlug(slug);
    if (category) {
      const groupParam = category.group ? `group=${encodeURIComponent(category.group)}` : "";
      const codeParam = category.code ? `codes=${encodeURIComponent(category.code)}` : "";
      const query = [groupParam, codeParam].filter(Boolean).join("&");
      redirect(`/products${query ? `?${query}` : ""}`);
    }
  }

  redirect("/products");
}


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
    if (category?.group) {
      redirect(`/products?group=${category.group}`);
    }
  }

  redirect("/products");
}


import React, { Suspense } from "react";
import { Metadata } from "next";
import { getPublishedProductCategories } from "@/lib/data/products";
import ProductsExplorer, { CategoryExplorerItem } from "@/components/products/ProductsExplorer";
import ProductsLoading from "./loading";

interface PageProps {
  searchParams?: Promise<{
    q?: string;
    group?: string;
    codes?: string;
    sort?: string;
    view?: string;
  }> | {
    q?: string;
    group?: string;
    codes?: string;
    sort?: string;
    view?: string;
  };
}

async function resolveSearchParams(searchParams: PageProps["searchParams"]) {
  if (!searchParams) return {};
  try {
    if (typeof (searchParams as any).then === "function") {
      return (await searchParams) || {};
    }
    return (searchParams as any) || {};
  } catch (e) {
    return {};
  }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await resolveSearchParams(searchParams);
  let totalCount = 57;

  try {
    const items = await getPublishedProductCategories();
    if (items && items.length > 0) totalCount = items.length;
  } catch (e) {
    // Graceful fallback
  }

  const hasQueryParams = Boolean(
    params.q || params.group || params.codes || params.sort || params.view
  );

  return {
    title: "Products | Lightning Protection, Earthing, Electrical & Solar | Vision Energy International",
    description: `Browse ${totalCount} product categories from Vision Energy International: lightning protection, earthing, cables, lighting, electrical, mechanical and solar products across the UAE.`,
    alternates: {
      canonical: "/products",
    },
    robots: hasQueryParams
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

export const revalidate = 300;

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await resolveSearchParams(searchParams);

  let rawCategories: any[] = [];
  try {
    rawCategories = await getPublishedProductCategories();
  } catch (e) {
    console.error("Data query fallback for /products:", e);
  }

  const categories: CategoryExplorerItem[] = (rawCategories || []).map((cat) => {
    const group = (cat.group || "").toUpperCase();

    return {
      code: cat.code,
      slug: cat.slug,
      group,
      groupLabel: cat.groupLabel || group,
      sortOrder: cat.sortOrder,
      priority: cat.priority,
      title: cat.title,
      description: cat.description,
      productFamilies: Array.isArray(cat.productFamilies)
        ? cat.productFamilies
        : typeof cat.productFamilies === "string"
        ? (cat.productFamilies as string).split(";").map((f) => f.trim()).filter(Boolean)
        : [],
      imageUrl: cat.imageUrl || cat.image || null,
      imageAlt: cat.imageAlt || null,
      isPlaceholder: cat.isPlaceholder ?? (!cat.imageUrl && !cat.image),
    };
  });

  const initialQ = params.q ? params.q.slice(0, 80) : "";
  const initialGroup = params.group ? params.group.toUpperCase() : "ALL";
  const initialCodes = params.codes
    ? params.codes
        .split(",")
        .map((c: string) => c.trim().toUpperCase())
        .filter(Boolean)
    : [];
  const initialSort = params.sort === "az" ? "az" : "featured";
  const initialView = params.view === "list" ? "list" : "grid";

  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsExplorer
        categories={categories}
        initialQ={initialQ}
        initialGroup={initialGroup}
        initialCodes={initialCodes}
        initialSort={initialSort}
        initialView={initialView}
      />
    </Suspense>
  );
}

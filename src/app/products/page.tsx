import React, { Suspense } from "react";
import { Metadata } from "next";
import { getPublishedProductCategories } from "@/lib/data/products";
import { resolveProductTaxonomy } from "@/lib/product-taxonomy";
import ProductsExplorer, { CategoryExplorerItem } from "@/components/products/ProductsExplorer";
import ProductsLoading from "./loading";

interface SearchParamsShape {
  q?: string;
  group?: string;
  main?: string;
  sub?: string;
  codes?: string;
  sort?: string;
  view?: string;
}

interface PageProps {
  searchParams?: Promise<SearchParamsShape> | SearchParamsShape;
}

async function resolveSearchParams(
  searchParams: PageProps["searchParams"]
): Promise<SearchParamsShape> {
  if (!searchParams) return {};
  try {
    if ("then" in searchParams && typeof searchParams.then === "function") {
      return (await searchParams) || {};
    }
    return (searchParams as SearchParamsShape) || {};
  } catch {
    return {};
  }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await resolveSearchParams(searchParams);

  const hasQueryParams = Boolean(
    params.q || params.group || params.main || params.sub || params.codes || params.sort || params.view
  );

  return {
    title: 'Product Catalogue UAE | Lightning, Earthing & Lab Supply',
    description:
      'Explore 115 certified product categories in lightning protection, earthing, electrical, gym & laboratory equipment across Dubai, Abu Dhabi, RAK & Qatar.',
    keywords: [
      'Lightning Protection Products UAE',
      'Earthing Materials UAE',
      'Laboratory Equipment UAE',
      'Gym Equipment UAE',
      'Electrical Equipment Dubai',
      'Vision Energy Catalogue',
    ],
    alternates: {
      canonical: 'https://www.visionenergyme.com/products',
    },
    openGraph: {
      title: 'Product Catalogue UAE | Lightning, Earthing & Lab Supply',
      description:
        'Certified categories in lightning protection, earthing, electrical, gym & laboratory equipment across UAE & Qatar.',
      url: 'https://www.visionenergyme.com/products',
      type: 'website',
      locale: 'en_AE',
      images: [
        {
          url: 'https://www.visionenergyme.com/images/products-collage-banner.jpg',
          width: 1200,
          height: 630,
          alt: 'Vision Energy Product Catalogue UAE',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Product Catalogue UAE | Lightning, Earthing & Lab Supply',
      description:
        'Certified categories across lightning protection, earthing, electrical, gym & laboratory equipment in UAE & Qatar.',
      images: ['https://www.visionenergyme.com/images/products-collage-banner.jpg'],
    },
    robots: hasQueryParams
      ? {
          index: false,
          follow: true,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
          },
        },
  };
}

export const revalidate = 300;

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await resolveSearchParams(searchParams);

  let rawCategories: Awaited<ReturnType<typeof getPublishedProductCategories>> = [];
  try {
    rawCategories = await getPublishedProductCategories();
  } catch (e) {
    console.error("Data query fallback for /products:", e);
  }

  const categories: CategoryExplorerItem[] = (rawCategories || []).map((cat) => {
    const group = (cat.group || "").toUpperCase();
    const taxonomy = resolveProductTaxonomy(cat.code, group, cat.groupLabel || group);

    return {
      code: cat.code,
      slug: cat.slug,
      group,
      groupLabel: cat.groupLabel || group,
      mainCategoryId: taxonomy.mainId,
      mainCategoryLabel: taxonomy.mainLabel,
      subcategoryId: taxonomy.subId,
      subcategoryLabel: taxonomy.subLabel,
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

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Vision Energy Certified Engineering & Electrical Supplies",
    description: "Certified product categories for lightning protection, earthing, electrical cables, and machinery in Dubai and across the UAE.",
    numberOfItems: categories.length,
    itemListElement: categories.map((cat, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: `[${cat.code}] ${cat.title}`,
      url: `https://www.visionenergyme.com/products/${cat.slug}`,
      description: cat.description,
    })),
  };

  const initialQ = params.q ? params.q.slice(0, 80) : "";
  const initialGroup = params.group ? params.group.toUpperCase() : "ALL";
  const initialMain = params.main ? params.main.toLowerCase() : "";
  const initialSub = params.sub ? params.sub.toLowerCase() : "";
  const initialCodes = params.codes
    ? params.codes
        .split(",")
        .map((c: string) => c.trim().toUpperCase())
        .filter(Boolean)
    : [];
  const initialSort = params.sort === "az" ? "az" : "featured";
  const initialView = params.view === "list" ? "list" : "grid";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <Suspense fallback={<ProductsLoading />}>
        <ProductsExplorer
          categories={categories}
          initialQ={initialQ}
          initialGroup={initialGroup}
          initialMain={initialMain}
          initialSub={initialSub}
          initialCodes={initialCodes}
          initialSort={initialSort}
          initialView={initialView}
        />
      </Suspense>
    </>
  );
}

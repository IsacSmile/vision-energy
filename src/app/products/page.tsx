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

  const hasQueryParams = Boolean(
    params.q || params.group || params.codes || params.sort || params.view
  );

  return {
    title: "Engineering Supplies, Laboratory Equipment & Electrical Products Dubai UAE | Vision Energy",
    description:
      "Explore certified product categories across lightning protection, earthing, electrical cables, generator machinery, and laboratory equipment in Dubai & UAE. Compliant with DEWA, SEWA & Civil Defense.",
    keywords: [
      "Lightning Protection Products Dubai",
      "Earthing Materials UAE",
      "Electrical Equipment Dubai",
      "Laboratory Equipment Dubai UAE",
      "General Laboratory Equipment UAE",
      "Laboratory Glassware Dubai",
      "Exothermic Welding Supplies UAE",
      "Cable Trays and Supports Dubai",
      "Industrial Generator Equipment UAE",
      "Heavy Duty Clamps UAE",
      "Vision Energy Catalogue",
    ],
    alternates: {
      canonical: "https://www.visionenergyme.com/products",
    },
    openGraph: {
      title: "Engineering Supplies, Laboratory Equipment & Electrical Products Dubai UAE | Vision Energy",
      description:
        "Explore certified product categories across lightning protection, earthing, industrial electrical supplies, and comprehensive laboratory equipment in Dubai & UAE.",
      url: "https://www.visionenergyme.com/products",
      type: "website",
      images: [
        {
          url: "https://www.visionenergyme.com/images/products-collage-banner.jpg",
          width: 1200,
          height: 630,
          alt: "Vision Energy Product Catalogue Dubai UAE",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Engineering Supplies, Laboratory Equipment & Electrical Products Dubai UAE | Vision Energy",
      description:
        "Explore certified product categories across lightning protection, earthing, electrical supplies, and laboratory equipment in Dubai & UAE.",
      images: ["https://www.visionenergyme.com/images/products-collage-banner.jpg"],
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
            "max-image-preview": "large",
          },
        },
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
          initialCodes={initialCodes}
          initialSort={initialSort}
          initialView={initialView}
        />
      </Suspense>
    </>
  );
}

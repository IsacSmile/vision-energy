import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedCategoryBySlug, getPublishedProductCategories } from "@/lib/data/products";
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
  } catch {
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
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await resolveParams(params);
  if (!slug) return { title: "Category Not Found" };

  const category = await getPublishedCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };

  const title = `[${category.code}] ${category.title} Dubai UAE | Vision Energy`;
  const description = `${category.description} Certified engineering supplier in Dubai & across the UAE. Fully compliant with DEWA, SEWA & Civil Defense.`;
  const absoluteImageUrl = category.imageUrl?.startsWith("http")
    ? category.imageUrl
    : category.imageUrl
    ? `https://www.visionenergyme.com${category.imageUrl.startsWith("/") ? "" : "/"}${category.imageUrl}`
    : "https://www.visionenergyme.com/images/products-collage-banner.jpg";

  return {
    title,
    description,
    keywords: [
      category.title,
      `${category.title} Dubai`,
      `${category.title} UAE`,
      `[${category.code}] ${category.title}`,
      "Vision Energy Products",
      "UAE Electrical Engineering Supplies",
    ],
    alternates: {
      canonical: `https://www.visionenergyme.com/products/${category.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://www.visionenergyme.com/products/${category.slug}`,
      type: "article",
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: category.imageAlt || `${category.title} Dubai UAE`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImageUrl],
    },
  };
}

export default async function CategoryDetailPage({ params }: SlugPageProps) {
  const { slug } = await resolveParams(params);
  if (!slug) notFound();

  const category = await getPublishedCategoryBySlug(slug);
  if (!category) notFound();

  // Related categories in the same group
  const allCategories = await getPublishedProductCategories();
  const relatedCategories = allCategories
    .filter((c) => c.group === category.group && c.slug !== category.slug)
    .slice(0, 6)
    .map((c) => ({
      id: c.id,
      code: c.code,
      slug: c.slug,
      groupPrefix: c.group || "",
      title: c.title,
      description: c.description,
      families: Array.isArray(c.productFamilies) ? c.productFamilies.join("; ") : "",
      image: c.imageUrl || null,
    }));

  const categoryItem = {
    id: category.id,
    code: category.code,
    slug: category.slug,
    groupPrefix: category.group || "",
    title: category.title,
    description: category.description,
    families: Array.isArray(category.productFamilies) ? category.productFamilies.join("; ") : "",
    image: category.imageUrl || null,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.visionenergyme.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://www.visionenergyme.com/products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `[${category.code}] ${category.title}`,
        item: `https://www.visionenergyme.com/products/${category.slug}`,
      },
    ],
  };

  const absoluteImageUrl = category.imageUrl?.startsWith("http")
    ? category.imageUrl
    : category.imageUrl
    ? `https://www.visionenergyme.com${category.imageUrl.startsWith("/") ? "" : "/"}${category.imageUrl}`
    : "https://www.visionenergyme.com/images/products-collage-banner.jpg";

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `[${category.code}] ${category.title}`,
    description: category.description,
    sku: category.code,
    image: absoluteImageUrl,
    brand: {
      "@type": "Brand",
      name: "Vision Energy International",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AED",
      lowPrice: "100.00",
      offerCount: "1",
      availability: "https://schema.org/InStock",
      areaServed: {
        "@type": "Country",
        name: "United Arab Emirates",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <CategoryDetailClient
          category={categoryItem}
          relatedCategories={relatedCategories}
        />
      </div>
    </>
  );
}

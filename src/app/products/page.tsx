import React from 'react';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import ProductsExplorer, { CategoryExplorerItem } from '@/components/products/ProductsExplorer';
import { getGroupLabel } from '@/lib/group-icons';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    group?: string;
    codes?: string;
    sort?: string;
    view?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const totalCount = await db.productCategory.count();

  const hasQueryParams = Boolean(
    params.q || params.group || params.codes || params.sort || params.view
  );

  return {
    title: 'Products | Lightning Protection, Earthing, Electrical, Mechanical & Solar | Vision Energy International',
    description: `Browse ${totalCount} product categories from Vision Energy International: lightning protection, earthing, cables, lighting, electrical, mechanical and solar products across the UAE.`,
    alternates: {
      canonical: '/products',
    },
    robots: hasQueryParams
      ? {
          index: false,
          follow: true,
        }
      : undefined,
  };
}

export const revalidate = 60;

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const rawCategories = await db.productCategory.findMany({
    orderBy: { sortOrder: 'asc' },
    select: {
      code: true,
      slug: true,
      groupPrefix: true,
      sortOrder: true,
      title: true,
      description: true,
      families: true,
    },
  });

  const categories: CategoryExplorerItem[] = rawCategories.map((cat) => {
    const group = (cat.groupPrefix || '').toUpperCase();
    const isPriority = group === 'LP' || group === 'ER' || group === 'EB';
    const parsedFamilies = cat.families
      ? cat.families
          .split(';')
          .map((f) => f.trim())
          .filter(Boolean)
      : [];

    return {
      code: cat.code,
      slug: cat.slug,
      group,
      groupLabel: getGroupLabel(group),
      sortOrder: cat.sortOrder,
      priority: isPriority,
      title: cat.title,
      description: cat.description,
      productFamilies: parsedFamilies,
    };
  });

  // JSON-LD structured data for SEO (BreadcrumbList & CollectionPage with ItemList)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://visionenergy.ae',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Products',
            item: 'https://visionenergy.ae/products',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://visionenergy.ae/products',
        name: 'Product Catalogue - Vision Energy International',
        description: `Browse ${categories.length} product categories from Vision Energy International.`,
        url: 'https://visionenergy.ae/products',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: categories.length,
          itemListElement: categories.map((cat, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: cat.title,
            url: `https://visionenergy.ae/products/${cat.slug}`,
          })),
        },
      },
    ],
  };

  const initialQ = params.q ? params.q.slice(0, 80) : '';
  const initialGroup = params.group ? params.group.toUpperCase() : 'ALL';
  const initialCodes = params.codes
    ? params.codes
        .split(',')
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean)
    : [];
  const initialSort = params.sort === 'az' ? 'az' : 'featured';
  const initialView = params.view === 'list' ? 'list' : 'grid';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductsExplorer
        categories={categories}
        initialQ={initialQ}
        initialGroup={initialGroup}
        initialCodes={initialCodes}
        initialSort={initialSort}
        initialView={initialView}
      />
    </>
  );
}

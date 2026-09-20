import React from 'react';
import { Metadata } from 'next';
import { db } from '@/lib/db';
import ProductsExplorer, { CategoryExplorerItem } from '@/components/products/ProductsExplorer';
import { getGroupLabel } from '@/lib/group-icons';
import { FALLBACK_CATEGORIES } from '@/lib/fallback-categories';

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

async function resolveSearchParams(searchParams: PageProps['searchParams']) {
  if (!searchParams) return {};
  try {
    if (typeof (searchParams as any).then === 'function') {
      return (await searchParams) || {};
    }
    return (searchParams as any) || {};
  } catch (e) {
    return {};
  }
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await resolveSearchParams(searchParams);
  let totalCount = FALLBACK_CATEGORIES.length;

  try {
    const count = await db.productCategory.count();
    if (count > 0) totalCount = count;
  } catch (e) {
    // Graceful fallback if database connection is unavailable
  }

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
  const params = await resolveSearchParams(searchParams);

  let rawCategories: any[] = [];
  try {
    rawCategories = await db.productCategory.findMany({
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
  } catch (e) {
    console.error('Database query fallback triggered for /products:', e);
  }

  // Fallback to static catalog if DB returned 0 records or threw an exception
  const sourceData = rawCategories && rawCategories.length > 0 ? rawCategories : FALLBACK_CATEGORIES;

  const categories: CategoryExplorerItem[] = sourceData.map((cat) => {
    const group = (cat.groupPrefix || '').toUpperCase();
    const isPriority = group === 'LP' || group === 'ER' || group === 'EB';
    const parsedFamilies = cat.families
      ? cat.families
          .split(';')
          .map((f: string) => f.trim())
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

  // JSON-LD structured data for SEO
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
            item: 'https://www.visionenergyme.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Products',
            item: 'https://www.visionenergyme.com/products',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://www.visionenergyme.com/products',
        name: 'Product Catalogue - Vision Energy International',
        description: `Browse ${categories.length} product categories from Vision Energy International.`,
        url: 'https://www.visionenergyme.com/products',
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: categories.length,
          itemListElement: categories.map((cat, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: cat.title,
            url: `https://www.visionenergyme.com/products/${cat.slug}`,
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
        .map((c: string) => c.trim().toUpperCase())
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

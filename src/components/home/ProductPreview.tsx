import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import CatalogueIndex, { GroupData, CategoryData } from './CatalogueIndex';

const GROUP_LABELS: Record<string, string> = {
  LP: 'Lightning Protection',
  EB: 'Earthing & Bonding',
  ER: 'Earthing & Bonding',
  LT: 'Lighting & Signalling',
  CM: 'Cable Management',
  CB: 'Cables & Connectivity',
  CT: 'Conduit Systems',
  EL: 'Electrical Equipment',
  EN: 'Energy & Power',
  ME: 'Mechanical & HVAC',
  SG: 'Security, Alarm & Fire',
  HW: 'Hardware & Tools',
  SF: 'Safety Marking & PPE',
  PK: 'Packaging',
  ID: 'Identification & Engraving',
};

export default async function ProductPreview() {
  const categories = await db.productCategory.findMany({
    orderBy: { sortOrder: 'asc' },
  });

  // Group categories by groupPrefix
  const groupsMap = new Map<string, CategoryData[]>();
  categories.forEach((cat) => {
    const groupKey = cat.groupPrefix.toUpperCase();
    if (!groupsMap.has(groupKey)) {
      groupsMap.set(groupKey, []);
    }
    groupsMap.get(groupKey)!.push({
      id: cat.id,
      code: cat.code,
      slug: cat.slug,
      groupPrefix: cat.groupPrefix,
      title: cat.title,
      description: cat.description,
      families: cat.families,
      sortOrder: cat.sortOrder,
    });
  });

  // Sort groups with priority: LP first, EB/ER second, then remainder by min sortOrder
  const groupKeys = Array.from(groupsMap.keys());
  groupKeys.sort((a, b) => {
    if (a === 'LP') return -1;
    if (b === 'LP') return 1;
    if (a === 'EB' || a === 'ER') return -1;
    if (b === 'EB' || b === 'ER') return 1;
    const minSortA = Math.min(...groupsMap.get(a)!.map((c) => c.sortOrder));
    const minSortB = Math.min(...groupsMap.get(b)!.map((c) => c.sortOrder));
    return minSortA - minSortB;
  });

  const groups: GroupData[] = groupKeys.map((prefix) => ({
    prefix,
    label: GROUP_LABELS[prefix] || prefix,
    categories: groupsMap.get(prefix)!,
  }));

  // Hide section if there are fewer than 3 groups
  if (groups.length < 3) {
    return null;
  }

  return (
    <section
      aria-labelledby="product-range-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#050608] relative border-t border-b border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* HEADER BLOCK */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#8DC63F]" />
              <span className="text-xs uppercase tracking-widest text-[#8DC63F] font-semibold">
                Product Range
              </span>
            </div>
            <h2
              id="product-range-heading"
              className="text-[clamp(1.75rem,4.2vw,3rem)] font-semibold text-white leading-[1.15] tracking-[-0.02em] [text-wrap:balance]"
            >
              Everything Your Project Needs
            </h2>
            <p className="text-base md:text-[1.0625rem] text-[#A9B4C0] leading-[1.7]">
              Browse our range of electrical, mechanical and solar products, from lightning
              protection to cables, lighting and safety equipment.
            </p>
          </div>

          {/* DESKTOP VIEW ALL LINK */}
          <Link
            href="/products"
            className="hidden lg:inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 py-0.5 shrink-0"
          >
            <span>View all products</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* CATALOGUE INDEX (Client Component) */}
        <CatalogueIndex groups={groups} totalCategoryCount={categories.length} />
      </div>
    </section>
  );
}

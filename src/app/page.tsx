import React from 'react';
import { db } from '@/lib/db';
import HomeHeroClient from '@/components/home/HomeHeroClient';
import IntroStandards from '@/components/home/IntroStandards';
import SolutionPillars from '@/components/home/SolutionPillars';
import { PILLARS_CONFIG } from '@/config/pillars';

export const metadata = {
  title: 'Vision Energy International | Lightning Protection, Earthing and Electrical Solutions UAE',
  description:
    'Lightning protection, earthing, surge protection, electrical, mechanical and solar solutions for buildings and infrastructure across the UAE.',
};

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const productCategoryCount = await db.productCategory.count();

  // Compute category counts per pillar server-side
  const allCategories = await db.productCategory.findMany({
    select: { code: true },
  });

  const categoryCodesSet = new Set(allCategories.map((c) => c.code.toUpperCase()));

  const countsByPillarId: Record<string, number> = {};
  PILLARS_CONFIG.forEach((pillar) => {
    if (pillar.categoryCodes) {
      const count = pillar.categoryCodes.filter((code) =>
        categoryCodesSet.has(code.toUpperCase())
      ).length;
      countsByPillarId[pillar.id] = count;
    }
  });

  return (
    <div className="pb-16 bg-[#050608]">
      {/* SECTION 1: HERO SECTION */}
      <HomeHeroClient productCategoryCount={productCategoryCount} />

      {/* SECTION 2: INTRO & STANDARDS */}
      <IntroStandards productCategoryCount={productCategoryCount} />

      {/* Signature Blue-to-Lime Hairline Divider */}
      <div
        className="w-full max-w-[80rem] mx-auto h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(11,101,179,0.3)_35%,rgba(141,198,63,0.3)_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* SECTION 3: SOLUTION PILLARS */}
      <SolutionPillars countsByPillarId={countsByPillarId} />
    </div>
  );
}

import React from 'react';
import { db } from '@/lib/db';
import HomeHeroClient from '@/components/home/HomeHeroClient';
import IntroStandards from '@/components/home/IntroStandards';
import SolutionPillars from '@/components/home/SolutionPillars';
import FlagshipLightning from '@/components/home/FlagshipLightning';
import ProductPreview from '@/components/home/ProductPreview';
import ServicesPreview from '@/components/home/ServicesPreview';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import Industries from '@/components/home/Industries';
import LatestPosts from '@/components/home/LatestPosts';
import FinalCTA from '@/components/home/FinalCTA';
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

  // Hairline divider component
  const HairlineDivider = () => (
    <div
      className="w-full max-w-[80rem] mx-auto h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(11,101,179,0.3)_35%,rgba(141,198,63,0.3)_65%,transparent_100%)]"
      aria-hidden="true"
    />
  );

  return (
    <div className="bg-[#050608]">
      {/* 1. HERO SECTION */}
      <HomeHeroClient productCategoryCount={productCategoryCount} />

      <HairlineDivider />

      {/* 2. INTRO & STANDARDS (#0D1117) */}
      <IntroStandards productCategoryCount={productCategoryCount} />

      <HairlineDivider />

      {/* 3. SOLUTION PILLARS (#050608) */}
      <SolutionPillars countsByPillarId={countsByPillarId} />

      <HairlineDivider />

      {/* 4. FLAGSHIP LIGHTNING (#0D1117) */}
      <FlagshipLightning />

      <HairlineDivider />

      {/* 5. PRODUCT PREVIEW (#050608) */}
      <ProductPreview />

      <HairlineDivider />

      {/* 6. SERVICES PREVIEW (#0D1117) */}
      <ServicesPreview />

      <HairlineDivider />

      {/* 7. WHY CHOOSE US (#050608) */}
      <WhyChooseUs />

      <HairlineDivider />

      {/* 8. INDUSTRIES / SECTORS WE SERVE (#0D1117) */}
      <Industries />

      <HairlineDivider />

      {/* 9. LATEST POSTS (#050608) - CONDITIONAL (null if <3 posts) */}
      <LatestPosts />

      <HairlineDivider />

      {/* 10. FINAL CTA (#0D1117) */}
      <FinalCTA />
    </div>
  );
}

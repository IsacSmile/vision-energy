import React from 'react';
import { db } from '@/lib/db';
import HomeHeroClient from '@/components/home/HomeHeroClient';
import IntroStandards from '@/components/home/IntroStandards';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProductsWeOffer from '@/components/home/ProductsWeOffer';
import WhyVisionEnergy from '@/components/home/WhyVisionEnergy';
import OurPartners from '@/components/home/OurPartners';
import HowWeWork from '@/components/home/HowWeWork';
import FinalCTA from '@/components/home/FinalCTA';
import SmoothScroll from '@/components/common/SmoothScroll';
import { FALLBACK_CATEGORIES } from '@/lib/fallback-categories';

export const metadata = {
  title: 'Vision Energy International | Lightning Protection, Earthing and Electrical Solutions UAE',
  description:
    'Lightning protection, earthing, surge protection, electrical, mechanical and solar solutions for buildings and infrastructure across the UAE.',
};

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  let productCategoryCount = FALLBACK_CATEGORIES.length;

  try {
    const count = await db.productCategory.count();
    if (count > 0) productCategoryCount = count;
  } catch (e) {
    console.error('Database query fallback triggered for HomePage:', e);
  }

  // Hairline divider component
  const HairlineDivider = () => (
    <div
      className="w-full max-w-[80rem] mx-auto h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(11,101,179,0.3)_35%,rgba(141,198,63,0.3)_65%,transparent_100%)]"
      aria-hidden="true"
    />
  );

  return (
    <SmoothScroll>
      <div className="bg-[#050608]">
        {/* 1. HERO SECTION */}
        <HomeHeroClient productCategoryCount={productCategoryCount} />

        <HairlineDivider />

        {/* 2. INTRO & STANDARDS (#0D1117) */}
        <IntroStandards productCategoryCount={productCategoryCount} />

        <HairlineDivider />

        {/* 3. WHY VISION ENERGY (#06080D) */}
        <WhyVisionEnergy />

        <HairlineDivider />

        {/* 4. OUR PARTNERS (#050608) */}
        <OurPartners />

        <HairlineDivider />

        {/* 5. HOW WE WORK (#06080D) */}
        <HowWeWork />

        <HairlineDivider />

        {/* 5. SERVICES PREVIEW (#0D1117) */}
        <ServicesPreview />

        <HairlineDivider />

        {/* 6. PRODUCTS WE OFFER (#050608) */}
        <ProductsWeOffer />

        <HairlineDivider />

        {/* 7. FINAL CTA (#0D1117) */}
        <FinalCTA />
      </div>
    </SmoothScroll>
  );
}

import React from 'react';
import { db } from '@/lib/db';
import HomeHeroClient from '@/components/home/HomeHeroClient';
import IntroStandards from '@/components/home/IntroStandards';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProductsWeOffer from '@/components/home/ProductsWeOffer';
import OurPartners from '@/components/home/OurPartners';
import FinalCTA from '@/components/home/FinalCTA';
import SmoothScroll from '@/components/common/SmoothScroll';
import { FALLBACK_CATEGORIES } from '@/lib/fallback-categories';

export const metadata = {
  title: 'Lightning Protection & Earthing UAE | Vision Energy',
  description:
    'Vision Energy International: lightning protection, earthing systems, surge protection, gym & lab equipment across Dubai, Abu Dhabi, RAK, UAE & Qatar.',
  keywords: [
    'Lightning Protection Dubai',
    'Lightning Protection Abu Dhabi',
    'Lightning Protection Ras Al Khaimah',
    'Lightning Protection UAE',
    'Lightning Protection Qatar',
    'Earthing Systems UAE',
    'Laboratory Equipment Supplier UAE',
    'Gym Equipment Supplier UAE',
    'Vision Energy International',
  ],
  alternates: {
    canonical: 'https://www.visionenergyme.com',
  },
  openGraph: {
    title: 'Lightning Protection & Earthing UAE | Vision Energy',
    description:
      'Certified lightning protection, earthing networks, gym & laboratory equipment across Dubai, Abu Dhabi, Ras Al Khaimah, UAE & Qatar.',
    url: 'https://www.visionenergyme.com',
    siteName: 'Vision Energy International',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: 'https://www.visionenergyme.com/images/products-collage-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Vision Energy International UAE & Qatar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lightning Protection & Earthing UAE | Vision Energy',
    description:
      'Lightning protection, earthing networks, gym & laboratory equipment across Dubai, Abu Dhabi, RAK, UAE & Qatar.',
    images: ['https://www.visionenergyme.com/images/products-collage-banner.jpg'],
  },
};

export const revalidate = 300;

function HairlineDivider() {
  return (
    <div
      className="w-full max-w-[80rem] mx-auto h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(11,101,179,0.3)_35%,rgba(141,198,63,0.3)_65%,transparent_100%)]"
      aria-hidden="true"
    />
  );
}

export default async function HomePage() {
  let productCategoryCount = FALLBACK_CATEGORIES.length;

  try {
    const count = await db.productCategory.count();
    if (count > 0) productCategoryCount = count;
  } catch (e) {
    console.error('Database query fallback triggered for HomePage:', e);
  }

  return (
    <SmoothScroll>
      <div className="bg-[#050608]">
        {/* 1. HERO SECTION */}
        <HomeHeroClient />

        <HairlineDivider />

        {/* 2. ABOUT VISION ENERGY */}
        <IntroStandards productCategoryCount={productCategoryCount} />

        <HairlineDivider />

        {/* 3. SPECIALISED SERVICES PREVIEW (#0D1117) */}
        <ServicesPreview />

        <HairlineDivider />

        {/* 4. PRODUCTS WE OFFER */}
        <ProductsWeOffer />

        <HairlineDivider />

        {/* 5. OUR CLIENTS (#050608) */}
        <OurPartners />

        <HairlineDivider />

        {/* 6. FINAL CTA (#050608) */}
        <FinalCTA bgClass="bg-[#050608]" />
      </div>
    </SmoothScroll>
  );
}

import React from 'react';
import { db } from '@/lib/db';
import HomeHeroClient from '@/components/home/HomeHeroClient';
import IntroStandards from '@/components/home/IntroStandards';
import ServicesPreview from '@/components/home/ServicesPreview';
import ProductsWeOffer from '@/components/home/ProductsWeOffer';
import WhyVisionEnergy from '@/components/home/WhyVisionEnergy';
import OurPartners from '@/components/home/OurPartners';
import FinalCTA from '@/components/home/FinalCTA';
import SmoothScroll from '@/components/common/SmoothScroll';
import { FALLBACK_CATEGORIES } from '@/lib/fallback-categories';

export const metadata = {
  title: 'Lightning Protection, Earthing, Electrical & Equipment Supplier Dubai UAE | Vision Energy',
  description:
    'Leading Dubai & UAE supplier of certified lightning protection systems, low-impedance earthing networks, industrial electrical equipment, generator machinery, and heavy equipment support. Fully compliant with DEWA, SEWA & Civil Defense.',
  keywords: [
    'Lightning Protection Dubai',
    'Lightning Protection UAE',
    'Earthing Systems Dubai',
    'Electrical Equipment Supplier Dubai',
    'LED Lights Supplier Dubai UAE',
    'Industrial Automation Items UAE',
    'Controls and Switchgear Accessories Dubai',
    'Electrical Tools Supplier UAE',
    'Laboratory Equipment Supplier UAE',
    'Heavy Equipment Rental UAE',
    'Heavy Vehicle Rental Dubai',
    'Industrial Generator Equipment UAE',
    'DEWA Approved Earthing Material',
    'Civil Defense Approved Lightning Protection',
    'Exothermic Welding Dubai',
    'Vision Energy International',
  ],
  alternates: {
    canonical: 'https://www.visionenergyme.com',
  },
  openGraph: {
    title: 'Lightning Protection, Earthing & Electrical Equipment Supplier Dubai UAE | Vision Energy',
    description:
      'Certified UAE supplier of lightning protection, earthing networks, electrical equipment, generators, and heavy equipment support. DEWA & Civil Defense compliant.',
    url: 'https://www.visionenergyme.com',
    siteName: 'Vision Energy International',
    locale: 'en_AE',
    type: 'website',
    images: [
      {
        url: 'https://www.visionenergyme.com/images/products-collage-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Vision Energy International Dubai UAE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lightning Protection, Earthing & Electrical Equipment Supplier Dubai UAE | Vision Energy',
    description:
      'Certified UAE supplier of lightning protection, earthing networks, electrical equipment, and equipment support across Dubai and all Emirates.',
    images: ['https://www.visionenergyme.com/images/products-collage-banner.jpg'],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// FAQ Schema for Rich Snippets & Voice Search in Dubai / UAE
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What lightning protection standards and approvals are required in Dubai and the UAE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vision Energy supplies lightning protection systems compliant with BS EN / IEC 62305, NF C 17-102 (for Early Streamer Emission systems), and UAE Civil Defense approvals. Every installation includes full technical submittals, CAD layouts, and calculations required for consultant clearance and authority NOCs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Vision Energy supply DEWA and SEWA approved earthing and grounding materials?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We supply certified low-impedance earthing systems including high-conductivity pure copper tape, copper-bonded ground rods, exothermic welding moulds, and earth enhancement compounds engineered for the high-resistivity desert soils of Dubai, Abu Dhabi, and the Northern Emirates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you provide heavy equipment, machinery, and industrial generator solutions in the UAE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Vision Energy supplies heavy-duty industrial equipment, cable tray support systems, generator units, cable laying equipment, and site machinery solutions tailored for major infrastructure, commercial, and utility projects across Dubai and all Emirates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer specialist engineering manpower and on-site soil resistivity testing?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We provide certified electrical engineers and site technicians for turnkey installation supervision, along with on-site Wenner 4-pin soil resistivity testing and geological resistivity modeling to verify low earth resistance targets before construction.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the delivery turnaround time for MEP and electrical supplies in Dubai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We maintain extensive local inventory in the UAE, enabling rapid dispatch and same-day or 24-hour job site delivery across Dubai, Abu Dhabi, Sharjah, and all other Emirates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Vision Energy supply industrial automation, PLCs, and switchgear accessories in the UAE?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We supply cutting-edge automation solutions including PLCs, HMI touchscreen panels, variable frequency drives (VFDs), contactors, circuit breakers, and comprehensive switchgear accessories engineered for seamless industrial control and plant safety.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of energy-efficient LED lighting and luminaires do you supply?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We supply high-efficiency industrial high-bay LEDs, architectural floodlights, weatherproof luminaires, commercial panel lights, and street lighting from leading international and regional manufacturers, delivering high lumen output and substantial operational energy savings.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you provide professional electrical installation tools and calibrated test equipment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Our catalog includes 1000V insulated hand tools, hydraulic cable crimpers, heavy-duty cable cutters, digital multimeters, earth clamp testers, and voltage indicators built for rugged industrial site environments.',
      },
    },
  ],
};

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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

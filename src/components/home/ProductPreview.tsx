import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight, ChevronRight } from 'lucide-react';
import { getPublishedProductCategories } from '@/lib/data/products';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import LightningButton from '@/components/ui/LightningButton';

interface FeaturedProduct {
  code: string;
  slug: string;
  title: string;
  categoryName: string;
  description: string;
  imageUrl: string;
  tag: string;
}

const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    code: 'LP-01',
    slug: 'lp-01-conventional-lightning-protection-systems',
    title: 'Conventional Lightning Protection Systems',
    categoryName: 'Lightning Protection',
    description: 'Complete air terminals, conductors, and test joints for structural safety.',
    imageUrl: '/product-catalouge/LP-01.jpeg',
    tag: 'IEC 62305',
  },
  {
    code: 'LP-02',
    slug: 'lp-02-early-streamer-emission-ese-lightning-protection-systems',
    title: 'Early Streamer Emission (ESE) Systems',
    categoryName: 'Lightning Protection',
    description: 'Active ESE air terminals and masts for wide-radius protection zones.',
    imageUrl: '/product-catalouge/LP-02.jpeg',
    tag: 'NFC 17-102',
  },
  {
    code: 'ER-01',
    slug: 'er-01-earthing-enhancement-materials',
    title: 'Earthing Enhancement & Grounding Materials',
    categoryName: 'Earthing & Bonding',
    description: 'Conductive backfills and chemical compounds for low earth resistance.',
    imageUrl: '/product-catalouge/ER-01.jpeg',
    tag: 'IEEE 80',
  },
  {
    code: 'ER-02',
    slug: 'er-02-exothermic-welding-systems',
    title: 'Exothermic Welding Moulds & Powders',
    categoryName: 'Earthing & Bonding',
    description: 'Molecular-level copper bonding for permanent, corrosion-free connections.',
    imageUrl: '/product-catalouge/ER-02.jpeg',
    tag: 'UL 467',
  },
  {
    code: 'SP-01',
    slug: 'sp-01-surge-protection-devices-spd',
    title: 'Surge Protection Devices (SPD)',
    categoryName: 'Surge Protection',
    description: 'Type 1, 2 & 3 SPDs protecting critical power and telemetry networks.',
    imageUrl: '/product-catalouge/EL-06.jpeg',
    tag: 'IEC 61643',
  },
  {
    code: 'CB-01',
    slug: 'cb-01-power-cables-industrial-wiring',
    title: 'Power Cables & Industrial Connectivity',
    categoryName: 'Cables & Connectivity',
    description: 'Low-voltage power cables, earth wires, and high-conductivity conductors.',
    imageUrl: '/product-catalouge/CB-01.jpeg',
    tag: 'BS 5467',
  },
  {
    code: 'CM-01',
    slug: 'cm-01-cable-trays-trunking-systems',
    title: 'Cable Trays & Ladder Management',
    categoryName: 'Cable Management',
    description: 'Heavy-duty galvanized cable trays, trunking, and mounting accessories.',
    imageUrl: '/product-catalouge/CM-01.jpeg',
    tag: 'NEMA VE1',
  },
  {
    code: 'EN-01',
    slug: 'en-01-solar-energy-pv-infrastructure',
    title: 'Solar PV & Renewable Infrastructure',
    categoryName: 'Renewable Energy',
    description: 'Complete balance of system (BOS) components and solar power solutions.',
    imageUrl: '/product-catalouge/EN-01.jpeg',
    tag: 'Clean Energy',
  },
];

export default async function ProductPreview() {
  const categories = await getPublishedProductCategories();
  const totalCount = categories.length || 57;

  return (
    <section
      aria-labelledby="product-preview-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#050608] relative border-t border-b border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-8 md:space-y-12 lg:space-y-16">
        {/* Header with Direct Link & Mobile Swipe Prompt */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            id="product-preview-heading"
            eyebrow="Featured Products"
            title="Engineered Product Ranges"
            description="Explore flagship lightning protection, earthing, surge suppression, and MEP systems."
          />

          <div className="flex items-center justify-between sm:justify-end gap-4 w-full lg:w-auto">
            <span className="text-xs text-[#8DC63F] font-medium flex items-center gap-1 md:hidden">
              <span>Swipe to explore</span>
              <ChevronRight className="w-3.5 h-3.5 animate-pulse" />
            </span>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 py-0.5 shrink-0"
            >
              <span>View all products ({totalCount})</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 2 Products Per Row Layout with Prominent High-Resolution Images */}
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-6 px-5 sm:px-6 -mx-5 sm:-mx-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-8 lg:gap-8 pb-4 md:pb-0">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <Reveal
              key={product.code}
              staggerIndex={idx}
              className="w-[85vw] min-w-[300px] max-w-[420px] shrink-0 flex-none snap-start md:w-auto md:min-w-0 md:max-w-none md:shrink md:flex-1 flex flex-col"
            >
              <Link
                href={`/products`}
                className="group h-full rounded-[24px] bg-[#0D1117] border border-white/[0.08] hover:border-[#8DC63F]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#8DC63F]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] flex flex-col justify-between"
              >
                {/* Large Prominent Image Banner with Badge */}
                <div className="relative w-full h-60 sm:h-72 lg:h-80 overflow-hidden bg-[#050608] p-3 flex items-center justify-center">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-700 ease-out"
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 50vw, 600px"
                    quality={90}
                  />

                  {/* Subtle bottom blend for seamless transition */}
                  <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0D1117] to-transparent pointer-events-none" />

                  {/* Code Tag Top Left */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#050608]/90 backdrop-blur-md border border-white/20 text-xs font-bold text-[#8DC63F] tracking-wide shadow-lg">
                    {product.code}
                  </div>

                  {/* Standard Tag Top Right */}
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-[#0D1117]/85 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white/90 shadow-lg">
                    {product.tag}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#8DC63F] uppercase tracking-wider block mb-1.5">
                      {product.categoryName}
                    </span>

                    <h3 className="text-lg sm:text-xl lg:text-[22px] font-bold text-white leading-snug group-hover:text-[#8DC63F] transition-colors line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="mt-2.5 text-sm text-[#A9B4C0] leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {product.description}
                    </p>
                  </div>

                  {/* Card Footer Link */}
                  <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-sm font-semibold text-[#8DC63F] group-hover:underline">
                    <span>View Specifications</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Simple & Clean Bottom CTA */}
        <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-[#0D1117]/60 border border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-[#A9B4C0] text-center sm:text-left">
            Looking for full specifications? Access all <span className="text-white font-semibold">{totalCount} product categories</span> and datasheets.
          </p>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8DC63F] hover:bg-[#7cb332] text-[#050608] text-xs sm:text-sm font-bold shadow-md shadow-[#8DC63F]/20 transition-all shrink-0 group active:scale-[0.98]"
          >
            <span>View All Products</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
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
    imageUrl:
      'https://plus.unsplash.com/premium_photo-1664298006973-e98eb94d006c?q=80&w=800&auto=format&fit=crop',
    tag: 'IEC 62305',
  },
  {
    code: 'LP-02',
    slug: 'lp-02-early-streamer-emission-ese-lightning-protection-systems',
    title: 'Early Streamer Emission (ESE) Systems',
    categoryName: 'Lightning Protection',
    description: 'Active ESE air terminals and masts for wide-radius protection zones.',
    imageUrl:
      'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=800&auto=format&fit=crop',
    tag: 'NFC 17-102',
  },
  {
    code: 'ER-01',
    slug: 'er-01-earthing-enhancement-materials',
    title: 'Earthing Enhancement & Grounding Materials',
    categoryName: 'Earthing & Bonding',
    description: 'Conductive backfills and chemical compounds for low earth resistance.',
    imageUrl:
      'https://images.unsplash.com/photo-1565249167139-75006b429343?q=80&w=800&auto=format&fit=crop',
    tag: 'IEEE 80',
  },
  {
    code: 'ER-02',
    slug: 'er-02-exothermic-welding-systems',
    title: 'Exothermic Welding Moulds & Powders',
    categoryName: 'Earthing & Bonding',
    description: 'Molecular-level copper bonding for permanent, corrosion-free connections.',
    imageUrl:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&auto=format&fit=crop',
    tag: 'UL 467',
  },
  {
    code: 'SP-01',
    slug: 'sp-01-surge-protection-devices-spd',
    title: 'Surge Protection Devices (SPD)',
    categoryName: 'Surge Protection',
    description: 'Type 1, 2 & 3 SPDs protecting critical power and telemetry networks.',
    imageUrl:
      'https://images.unsplash.com/photo-1722666825118-02f3c12d4434?q=80&w=800&auto=format&fit=crop',
    tag: 'IEC 61643',
  },
  {
    code: 'EN-01',
    slug: 'en-01-solar-energy-pv-infrastructure',
    title: 'Solar PV & Renewable Infrastructure',
    categoryName: 'Renewable Energy',
    description: 'Complete balance of system (BOS) components and solar power solutions.',
    imageUrl:
      'https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=800&auto=format&fit=crop',
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
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Header with Direct Link */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            id="product-preview-heading"
            eyebrow="Featured Products"
            title="Engineered Product Ranges"
            description={`Explore flagship lightning protection, earthing, surge suppression, and MEP systems.`}
          />

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 py-0.5 shrink-0"
          >
            <span>View all products ({totalCount})</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* 3 Cards per Row on all Laptops & Desktops (md:grid-cols-3 lg:grid-cols-3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {FEATURED_PRODUCTS.map((product, idx) => (
            <Reveal key={product.code} staggerIndex={idx}>
              <Link
                href={`/products`}
                className="group block h-full rounded-[20px] bg-[#0D1117] border border-white/[0.08] hover:border-[#8DC63F]/50 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8DC63F]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] flex flex-col justify-between"
              >
                {/* Image Banner with Badge */}
                <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#050608]">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/40 to-transparent" />

                  {/* Code Tag Top Left */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-[#050608]/85 backdrop-blur-md border border-white/15 text-[11px] font-bold text-[#8DC63F] tracking-wide">
                    {product.code}
                  </div>

                  {/* Standard Tag Top Right */}
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-[#0D1117]/80 backdrop-blur-md border border-white/10 text-[10px] font-medium text-white/80">
                    {product.tag}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-medium text-[#8DC63F] uppercase tracking-wider block mb-1">
                      {product.categoryName}
                    </span>

                    <h3 className="text-base sm:text-lg font-semibold text-white leading-snug group-hover:text-[#8DC63F] transition-colors line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-[13px] text-[#A9B4C0] leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  {/* Card Footer Link */}
                  <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-[#8DC63F] group-hover:underline">
                    <span>View Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Big Bottom CTA to explore all products */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-[24px] bg-gradient-to-r from-[#0D1117] to-[#161B22] border border-white/10 shadow-2xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white">
              Looking for Complete Product Specifications?
            </h4>
            <p className="text-xs sm:text-sm text-[#A9B4C0] max-w-[50ch]">
              Access all {totalCount} engineering product categories, technical datasheets, and family ranges in our catalogue.
            </p>
          </div>

          <LightningButton
            variant="primary"
            size="lg"
            href="/products"
            iconRight={<ArrowRight className="w-4 h-4" />}
            className="w-full sm:w-auto shadow-[0_0_25px_rgba(141,198,63,0.3)] hover:shadow-[0_0_35px_rgba(141,198,63,0.5)] shrink-0"
          >
            Explore Complete Catalogue
          </LightningButton>
        </div>
      </div>
    </section>
  );
}

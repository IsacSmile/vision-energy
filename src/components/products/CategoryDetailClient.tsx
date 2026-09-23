'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Phone, MessageSquare, ArrowLeft, CheckCircle2, Package, ShieldCheck, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';

import { ProductItemCard } from './ProductItemCard';
import { ProductJsonLd } from './ProductJsonLd';
import type { ProductItem } from '@/lib/data/product-items';

interface CategoryItem {
  id: string;
  code: string;
  slug: string;
  groupPrefix: string;
  title: string;
  description: string;
  families: string;
  image: string | null;
}

interface CategoryDetailProps {
  category: CategoryItem;
  relatedCategories?: CategoryItem[];
  products?: ProductItem[];
}

export default function CategoryDetailClient({
  category,
  relatedCategories = [],
  products = [],
}: CategoryDetailProps) {
  const { openProductModal } = useEnquiryModal();
  const [expandedDesc, setExpandedDesc] = useState(false);

  const rawFamilies = category.families || (category as any).productFamilies || '';
  const familiesList = (
    Array.isArray(rawFamilies)
      ? rawFamilies
      : typeof rawFamilies === 'string'
      ? rawFamilies.split(';')
      : []
  )
    .map((f: string) => String(f).trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Sticky Mini Header (Mobile & Desktop) */}
      <div className="sticky top-[var(--mobile-header-h,56px)] lg:top-[var(--header-h,80px)] z-20 bg-[#050608]/90 backdrop-blur-md border-b border-[#1F2937] py-3 px-4 rounded-xl flex items-center justify-between gap-3">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white transition-colors active-press min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4 text-[#8DC63F]" />
          <span>Back to Catalogue</span>
        </Link>
        <span className="font-mono text-xs font-bold text-[#8DC63F] bg-[#8DC63F]/10 px-3 py-1 rounded-full border border-[#8DC63F]/30 truncate">
          [{category.code}]
        </span>
      </div>

      {/* Main Category Card */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs sm:text-sm font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/40 px-3.5 py-1.5 rounded-full pill-glow">
            Category Code: {category.code}
          </span>
          <span className="text-xs font-semibold text-gray-400 bg-[#050608] px-3 py-1 rounded-full border border-[#1F2937]">
            Group Prefix: {category.groupPrefix}
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {category.title}
        </h1>

        {/* Description with Read More / Read Less Toggle on Mobile */}
        <div className="space-y-2 border-l-4 border-[#0B65B3] pl-4">
          <p className={`text-sm sm:text-base text-gray-300 leading-relaxed ${expandedDesc ? '' : 'line-clamp-3 sm:line-clamp-none'}`}>
            {category.description}
          </p>
          <button
            onClick={() => setExpandedDesc(!expandedDesc)}
            className="sm:hidden text-xs font-bold text-[#8DC63F] flex items-center gap-1 active-press pt-1"
          >
            <span>{expandedDesc ? 'Read less' : 'Read more'}</span>
            {expandedDesc ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {/* Inline CTA Block (Near Top) */}
          <div className="bg-[#050608] border border-[#0B65B3]/40 rounded-2xl p-5 space-y-4 text-center mt-4">
            <h3 className="text-base font-bold text-white">Require Pricing or Submittals for [{category.code}]?</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${dictionary.company.primaryPhone}`}
                className="w-full sm:w-auto h-12 min-h-[48px] px-6 bg-white text-[#050608] font-bold text-sm rounded-xl flex items-center justify-center gap-2 active-press"
              >
                <Phone className="w-4 h-4 text-[#0B65B3]" />
                <span>Call Now</span>
              </a>

              <button
                onClick={() =>
                  openProductModal({
                    categoryCode: category.code,
                    categoryTitle: category.title,
                  })
                }
                className="w-full sm:w-auto h-12 min-h-[48px] px-6 bg-gradient-brand text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 active-press"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire About This Product</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Families Wrapping Chips */}
        <div className="space-y-3 pt-4 border-t border-[#1F2937]">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8DC63F]" />
            <span>Product Families & Component Groups</span>
          </h2>
          <div className="flex flex-wrap gap-2">
            {familiesList.map((family, idx) => (
              <span
                key={idx}
                className="bg-[#050608] border border-[#1F2937] px-3 py-2 rounded-xl text-xs text-gray-200 font-mono flex items-center gap-2"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" />
                <span>{family}</span>
              </span>
            ))}
          </div>
        </div>

        {/* TWO OPTIONS CTA BLOCK */}
        <div className="bg-[#050608] border border-[#0B65B3]/40 rounded-2xl p-6 sm:p-8 space-y-4 text-center mt-6">
          <h3 className="text-lg sm:text-xl font-bold text-white">
            Require Pricing, Datasheets or Availability for [{category.code}]?
          </h3>
          <p className="text-xs text-gray-300 max-w-xl mx-auto">
            Our engineering sales team in UAE can provide immediate quotations, material compliance certificates, and delivery timelines.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={`tel:${dictionary.company.primaryPhone}`}
              className="w-full sm:w-auto h-12 px-8 bg-white text-[#050608] font-bold text-sm rounded-full hover:bg-gray-100 transition-all flex items-center justify-center gap-2 pill-glow active-press"
            >
              <Phone className="w-4 h-4 text-[#0B65B3]" />
              <span>Call: {dictionary.company.primaryPhone}</span>
            </a>

            <button
              onClick={() =>
                openProductModal({
                  categoryCode: category.code,
                  categoryTitle: category.title,
                })
              }
              className="w-full sm:w-auto h-12 px-8 bg-gradient-brand text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 blue-glow active-press"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products Grid */}
      {products.length > 0 && (
        <div className="space-y-4 pt-6 border-t border-[#1F2937]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white">Available Product Models & SKUs</h2>
              <p className="text-xs text-gray-400">
                Explore engineering SKUs, specifications, and high-resolution photo galleries
              </p>
            </div>
            <span className="text-xs font-mono text-[#8DC63F] bg-[#8DC63F]/10 px-3 py-1 rounded-full border border-[#8DC63F]/30">
              {products.length} SKUs Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((prod) => (
              <React.Fragment key={prod.id}>
                <ProductItemCard product={prod} />
                <ProductJsonLd product={prod} />
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Related Categories Swipe Row */}
      {relatedCategories.length > 0 && (
        <div className="space-y-4 pt-6">
          <h2 className="text-lg font-bold text-white">Related Categories in [{category.groupPrefix}] Group</h2>
          <div className="flex overflow-x-auto no-scrollbar scroll-snap-x gap-4 pb-2">
            {relatedCategories.map((rel) => (
              <div
                key={rel.id}
                className="w-[75vw] max-w-[280px] shrink-0 scroll-snap-align-start bg-[#0D1117] border border-[#1F2937] rounded-2xl p-4 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className="font-mono text-[10px] font-bold text-[#8DC63F] bg-[#8DC63F]/10 px-2.5 py-0.5 rounded-full border border-[#8DC63F]/30">
                    [{rel.code}]
                  </span>
                  <h3 className="text-sm font-bold text-white line-clamp-2">{rel.title}</h3>
                </div>
                <Link
                  href={`/products/${rel.slug}`}
                  className="text-xs font-bold text-[#0B65B3] flex items-center gap-1 hover:underline active-press pt-2 border-t border-[#1F2937]"
                >
                  <span>View Category</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

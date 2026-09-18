'use client';

import React from 'react';
import Link from 'next/link';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Phone, MessageSquare, ArrowLeft, CheckCircle2, Package, ShieldCheck } from 'lucide-react';

interface CategoryDetailProps {
  category: {
    id: string;
    code: string;
    slug: string;
    groupPrefix: string;
    title: string;
    description: string;
    families: string;
    image: string | null;
  };
}

export default function CategoryDetailClient({ category }: CategoryDetailProps) {
  const { openProductModal } = useEnquiryModal();

  const familiesList = category.families
    .split(';')
    .map((f) => f.trim())
    .filter(Boolean);

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/products"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Product Categories Catalogue</span>
      </Link>

      {/* Main Header Box */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-3xl p-8 sm:p-10 space-y-6 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-sm font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/40 px-4 py-1.5 rounded-full pill-glow">
            Category Reference Code: {category.code}
          </span>
          <span className="text-xs font-semibold text-gray-400 bg-[#050608] px-3 py-1 rounded-full border border-[#1F2937]">
            Trading Family Prefix: {category.groupPrefix}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {category.title}
        </h1>

        <p className="text-base text-gray-300 leading-relaxed font-sans border-l-4 border-[#0B65B3] pl-4">
          {category.description}
        </p>

        {/* Neutral Placeholder Image Block */}
        <div className="bg-[#050608] border border-[#1F2937] rounded-2xl p-8 text-center space-y-3">
          <Package className="w-12 h-12 text-[#0B65B3] mx-auto opacity-80" />
          <span className="text-xs font-mono text-gray-400 block">
            [Neutral Technical Image Placeholder - Final High-Res Composite Photo to be Uploaded]
          </span>
        </div>

        {/* Available Product Families Section */}
        <div className="space-y-4 pt-4 border-t border-[#1F2937]">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#8DC63F]" />
            <span>Available Product Families & Components</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {familiesList.map((family, idx) => (
              <div
                key={idx}
                className="bg-[#050608] border border-[#1F2937] p-3.5 rounded-xl text-xs text-gray-200 flex items-center gap-3 font-mono"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                <span>{family}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TWO OPTIONS CTA BLOCK */}
        <div className="bg-[#050608] border-2 border-gradient-brand rounded-2xl p-6 sm:p-8 space-y-4 text-center mt-8">
          <h3 className="text-xl font-bold text-white">
            Require Pricing, Datasheets or Availability for [{category.code}]?
          </h3>
          <p className="text-xs text-gray-300 max-w-xl mx-auto">
            Our engineering sales team in UAE can provide immediate quotations, material compliance certificates, and delivery timelines.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {/* Option A: Call Now */}
            <a
              href={`tel:${dictionary.company.primaryPhone}`}
              className="px-8 py-3.5 bg-white text-[#050608] font-bold text-sm rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 pill-glow"
            >
              <Phone className="w-4 h-4 text-[#0B65B3]" />
              <span>Call Now: {dictionary.company.primaryPhone}</span>
            </a>

            {/* Option B: Enquire About This Product */}
            <button
              onClick={() =>
                openProductModal({
                  categoryCode: category.code,
                  categoryTitle: category.title,
                })
              }
              className="px-8 py-3.5 bg-gradient-brand text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 blue-glow"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Enquire About This Product</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

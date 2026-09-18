'use client';

import React from 'react';
import Link from 'next/link';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Phone, Calendar, ArrowLeft, CheckCircle2, ShieldCheck, ListOrdered } from 'lucide-react';

interface ServiceDetailProps {
  service: {
    id: string;
    slug: string;
    title: string;
    summary: string;
    content: string;
    whatsIncluded: string;
    processSteps: string;
    published: boolean;
  };
}

export default function ServiceDetailClient({ service }: ServiceDetailProps) {
  const { openServiceModal } = useEnquiryModal();

  const whatsIncluded: string[] = JSON.parse(service.whatsIncluded || '[]');
  const processSteps: string[] = JSON.parse(service.processSteps || '[]');

  return (
    <div className="space-y-8">
      {/* Back Link */}
      <Link
        href="/services"
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Engineering Services</span>
      </Link>

      {/* Main Content Box */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-3xl p-8 sm:p-10 space-y-8 shadow-2xl">
        <div className="space-y-4">
          <span className="inline-block text-xs font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/40 px-3.5 py-1 rounded-full pill-glow">
            Confirmed Engineering Scope
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="text-base text-gray-300 leading-relaxed font-sans border-l-4 border-[#8DC63F] pl-4">
            {service.summary}
          </p>
        </div>

        {/* Detailed Scope Narrative */}
        <div className="space-y-4 pt-4 border-t border-[#1F2937]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0B65B3]" />
            <span>Service Overview & Standards Compliance</span>
          </h2>
          <p className="text-sm text-[#A9B4C0] leading-relaxed whitespace-pre-line">
            {service.content}
          </p>
        </div>

        {/* What's Included Grid */}
        <div className="space-y-4 pt-4 border-t border-[#1F2937]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#8DC63F]" />
            <span>What&apos;s Included in Scope</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whatsIncluded.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#050608] border border-[#1F2937] p-4 rounded-xl text-xs text-gray-200 flex items-center gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-4 pt-4 border-t border-[#1F2937]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-[#F2C230]" />
            <span>Execution & Delivery Process Steps</span>
          </h2>
          <div className="space-y-3">
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                className="bg-[#050608] border border-[#1F2937] p-4 rounded-xl flex items-center gap-4 text-xs text-gray-200"
              >
                <span className="w-7 h-7 rounded-full bg-[#0B65B3] text-white font-bold font-mono flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-semibold">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* STICKY / VISIBLE CTA BLOCK WITH TWO OPTIONS */}
        <div className="bg-[#050608] border-2 border-gradient-brand rounded-2xl p-6 sm:p-8 space-y-4 text-center mt-8 shadow-2xl">
          <h3 className="text-2xl font-bold text-white">
            Schedule a Site Inspection or Request a Service Quote
          </h3>
          <p className="text-xs text-gray-300 max-w-xl mx-auto">
            Contact our engineering services team directly or submit your project details for formal technical review.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            {/* Option A: Call Now (with second alternative number shown) */}
            <div className="flex flex-col items-center gap-1">
              <a
                href={`tel:${dictionary.company.primaryPhone}`}
                className="px-8 py-3.5 bg-white text-[#050608] font-bold text-sm rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 pill-glow"
              >
                <Phone className="w-4 h-4 text-[#0B65B3]" />
                <span>Call Now: {dictionary.company.primaryPhone}</span>
              </a>
              <span className="text-[11px] text-gray-400 font-mono">
                Alt Direct: {dictionary.company.secondaryPhone}
              </span>
            </div>

            {/* Option B: Book Service */}
            <button
              onClick={() =>
                openServiceModal({
                  serviceSlug: service.slug,
                  serviceTitle: service.title,
                })
              }
              className="px-8 py-3.5 bg-gradient-brand text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 blue-glow"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Service Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

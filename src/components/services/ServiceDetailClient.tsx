'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Phone, Calendar, ArrowLeft, CheckCircle2, ShieldCheck, ListOrdered, ChevronDown, HelpCircle } from 'lucide-react';

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

const faqs = [
  {
    q: 'How long does site installation or manpower deployment take?',
    a: 'Site teams can be mobilized within 24–48 hours across Abu Dhabi, Dubai, Ras Al Khaimah, and Northern Emirates upon contract confirmation.',
  },
  {
    q: 'Are all lightning protection installations compliant with UAE authorities?',
    a: 'Yes, all installations comply fully with IEC 62305, NF C 17-102 standards, and Civil Defense requirements.',
  },
  {
    q: 'Do you provide testing and commissioning certificates?',
    a: 'Yes, full earth resistance testing, continuity logs, and as-built engineering documentation are provided upon completion.',
  },
];

export default function ServiceDetailClient({ service }: ServiceDetailProps) {
  const { openServiceModal } = useEnquiryModal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const whatsIncluded: string[] = JSON.parse(service.whatsIncluded || '[]');
  const processSteps: string[] = JSON.parse(service.processSteps || '[]');

  return (
    <div className="space-y-6">
      {/* Sticky Back Header */}
      <div className="sticky top-[var(--mobile-header-h,56px)] lg:top-[var(--header-h,80px)] z-20 bg-[#050608]/90 backdrop-blur-md border-b border-[#1F2937] py-3 px-4 rounded-xl flex items-center justify-between">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-300 hover:text-white transition-colors active-press min-h-[40px]"
        >
          <ArrowLeft className="w-4 h-4 text-[#8DC63F]" />
          <span>Back to All Engineering Services</span>
        </Link>
      </div>

      {/* Main Scope Box */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-2xl sm:rounded-3xl p-6 sm:p-10 space-y-8 shadow-2xl">
        <div className="space-y-4">
          <span className="inline-block text-xs font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/40 px-3.5 py-1 rounded-full pill-glow">
            Confirmed Engineering Scope
          </span>
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-sans border-l-4 border-[#8DC63F] pl-4">
            {service.summary}
          </p>
        </div>

        {/* Overview & Standards */}
        <div className="space-y-3 pt-4 border-t border-[#1F2937]">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0B65B3]" />
            <span>Service Overview & Standards Compliance</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A9B4C0] leading-relaxed whitespace-pre-line">
            {service.content}
          </p>
        </div>

        {/* What's Included Checklist */}
        <div className="space-y-3 pt-4 border-t border-[#1F2937]">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#8DC63F]" />
            <span>What&apos;s Included in Scope</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {whatsIncluded.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#050608] border border-[#1F2937] p-3.5 rounded-xl text-xs text-gray-200 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" />
                <span className="font-semibold leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps Vertical Timeline Stepper */}
        <div className="space-y-4 pt-4 border-t border-[#1F2937]">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <ListOrdered className="w-5 h-5 text-[#F2C230]" />
            <span>Execution & Delivery Process Timeline</span>
          </h2>
          <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#1F2937]">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative flex items-start gap-4">
                <span className="absolute -left-6 top-0 w-6 h-6 rounded-full bg-[#0B65B3] text-white font-bold font-mono text-xs flex items-center justify-center shrink-0 border-2 border-[#050608]">
                  {idx + 1}
                </span>
                <div className="bg-[#050608] border border-[#1F2937] p-3.5 rounded-xl text-xs text-gray-200 w-full font-semibold">
                  {step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div className="space-y-4 pt-4 border-t border-[#1F2937]">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#8DC63F]" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="bg-[#050608] border border-[#1F2937] rounded-xl p-4 cursor-pointer space-y-2 transition-all active-press"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xs sm:text-sm font-bold text-white">{faq.q}</h3>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-180 text-[#8DC63F]' : ''
                      }`}
                    />
                  </div>
                  {isOpen && <p className="text-xs text-[#A9B4C0] leading-relaxed pt-1 border-t border-[#1F2937]">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* STICKY / VISIBLE CTA BLOCK WITH TWO OPTIONS */}
        <div className="bg-[#050608] border border-[#8DC63F]/40 rounded-2xl p-6 sm:p-8 space-y-4 text-center mt-8 shadow-2xl">
          <h3 className="text-lg sm:text-2xl font-bold text-white">
            Schedule a Site Inspection or Request a Quote
          </h3>
          <p className="text-xs text-gray-300 max-w-xl mx-auto">
            Contact our engineering services team directly or submit your project details for formal technical review.
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
                openServiceModal({
                  serviceSlug: service.slug,
                  serviceTitle: service.title,
                })
              }
              className="w-full sm:w-auto h-12 px-8 bg-gradient-brand text-white font-bold text-sm rounded-full hover:opacity-90 transition-opacity flex items-center justify-center gap-2 blue-glow active-press"
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

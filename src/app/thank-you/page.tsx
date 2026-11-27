import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from 'lucide-react';
import ThankYouTracker from '@/components/common/ThankYouTracker';
import { COMPANY_FACTS, SITE_URL } from '@/lib/seo/company';

export const metadata: Metadata = {
  title: 'Enquiry Received | Vision Energy International',
  description:
    'Thank you for your engineering or product enquiry with Vision Energy International across the UAE and Qatar.',
  alternates: {
    canonical: `${SITE_URL}/thank-you`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; type?: string }> | { ref?: string; type?: string };
}) {
  const resolved = await Promise.resolve(searchParams);
  const refCode = resolved?.ref;
  const enquiryType = resolved?.type;

  return (
    <div className="min-h-[75vh] bg-[#050608] text-white flex items-center justify-center px-4 py-20">
      <ThankYouTracker reference={refCode} enquiryType={enquiryType} />

      <div className="max-w-xl w-full rounded-3xl bg-[#0D1117] border border-[#8DC63F]/35 p-8 sm:p-10 text-center space-y-6 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-[#8DC63F]/15 border border-[#8DC63F]/40 flex items-center justify-center mx-auto text-[#8DC63F]">
          <CheckCircle2 className="w-9 h-9" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
            Enquiry Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Thank You for Contacting Vision Energy
          </h1>
          <p className="text-sm text-[#A9B4C0] leading-relaxed">
            Your project details have been logged for our technical desk serving Dubai, Abu Dhabi, Ras Al Khaimah, the wider UAE, and Qatar.
          </p>
        </div>

        {refCode && (
          <div className="inline-block px-5 py-2.5 rounded-full bg-[#050608] border border-[#8DC63F]/50 text-base font-mono font-bold text-[#8DC63F]">
            Reference: {refCode}
          </div>
        )}

        <div className="p-4 rounded-2xl bg-[#050608] border border-white/10 space-y-3">
          <p className="text-xs font-semibold text-slate-300">
            Need urgent pricing or technical submittals right now?
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={COMPANY_FACTS.phones.landlineHref}
              className="h-11 rounded-xl bg-[#0B65B3] hover:bg-[#095292] text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors"
              style={{ color: '#FFFFFF' }}
            >
              <Phone className="w-4 h-4 text-[#8DC63F]" aria-hidden="true" />
              <span>Call {COMPANY_FACTS.phones.landline}</span>
            </a>
            <a
              href={COMPANY_FACTS.phones.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold inline-flex items-center justify-center gap-2 transition-colors"
              style={{ color: '#FFFFFF' }}
            >
              <MessageCircle className="w-4 h-4 text-white" aria-hidden="true" />
              <span>WhatsApp Technical Desk</span>
            </a>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
          <Link
            href="/products"
            className="text-[#8DC63F] hover:underline inline-flex items-center gap-1"
          >
            <span>Browse Product Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
          <Link
            href="/expertise"
            className="text-white/90 hover:text-[#8DC63F] hover:underline inline-flex items-center gap-1"
          >
            <span>Explore Engineering Guides</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}


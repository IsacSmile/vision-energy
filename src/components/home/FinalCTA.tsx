'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Building2, ExternalLink } from 'lucide-react';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import Reveal from '@/components/ui/Reveal';
import Chip from '@/components/ui/Chip';

export default function FinalCTA() {
  const { openProductModal } = useEnquiryModal();

  const handleOpenEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    openProductModal();
  };

  return (
    <section
      aria-labelledby="final-cta-heading"
      className="py-20 md:py-32 lg:py-40 bg-[#0D1117] relative overflow-hidden border-t border-b border-white/[0.08]"
    >
      {/* Soft Blue Radial Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-60"
        style={{
          background:
            'radial-gradient(800px circle at center, rgba(11,101,179,0.16), transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Decorative Static SVG Lightning Bolt Outline (lg and up) */}
      <div
        className="pointer-events-none absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block opacity-30 transition-opacity duration-1000"
        aria-hidden="true"
      >
        <svg
          width="240"
          height="420"
          viewBox="0 0 240 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M130 10L20 230H110L90 410L220 180H130L130 10Z"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 relative z-10 space-y-16 lg:space-y-24">
        {/* TOP CTA CONTENT: Eyebrow, H2, Paragraph, Buttons */}
        <div className="max-w-3xl space-y-6">
          <Reveal staggerIndex={0}>
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1.5px] bg-[#8DC63F]" />
              <span className="text-xs uppercase tracking-widest text-[#8DC63F] font-semibold">
                Get in touch
              </span>
            </div>
          </Reveal>

          <Reveal staggerIndex={1}>
            <h2
              id="final-cta-heading"
              className="text-[clamp(2rem,5.2vw,4.25rem)] font-semibold text-white leading-[1.08] tracking-[-0.02em] [text-wrap:balance] max-w-[14em]"
            >
              Tell Us About Your Project
            </h2>
          </Reveal>

          <Reveal staggerIndex={2}>
            <p className="text-lg md:text-xl text-[#A9B4C0] max-w-[46ch] leading-[1.7]">
              Call us or send an enquiry, and our team will get back to you.
            </p>
          </Reveal>

          <Reveal staggerIndex={3}>
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Primary White Pill Button: Send Enquiry */}
              <button
                type="button"
                onClick={handleOpenEnquiry}
                className="h-[52px] px-8 rounded-full bg-white text-[#050608] font-semibold text-base hover:bg-white/90 active:scale-[0.98] transition-all flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] w-full sm:w-auto max-w-[360px] sm:max-w-none mx-auto sm:mx-0 shadow-lg shadow-white/5"
              >
                Send Enquiry
              </button>

              {/* Secondary Glass Pill Button: Call Now */}
              <a
                href="tel:+97172042763"
                className="h-[52px] px-8 rounded-full bg-white/10 border border-white/15 text-white font-semibold text-base hover:bg-white/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] w-full sm:w-auto max-w-[360px] sm:max-w-none mx-auto sm:mx-0"
              >
                <Phone className="w-4 h-4 text-[#8DC63F]" />
                <span>Call Now</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* CONTACT DETAILS COLUMNS (No boxes, hairlines only) */}
        <div className="pt-8 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08]">
            {/* COLUMN 1: CALL */}
            <Reveal staggerIndex={4} className="py-4 lg:py-0 lg:pr-8">
              <div className="flex flex-col min-h-[72px] justify-center space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#A9B4C0] shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-[#A9B4C0] font-semibold">
                    Call
                  </span>
                </div>
                <div className="flex flex-col gap-1 pl-7">
                  <a
                    href="tel:+97172042763"
                    className="text-[17px] text-white font-medium hover:text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded py-1 inline-block"
                  >
                    +971 7 204 2763
                  </a>
                  <a
                    href="tel:+971547004616"
                    className="text-[17px] text-white font-medium hover:text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded py-1 inline-block"
                  >
                    +971 54 700 4616
                  </a>
                </div>
              </div>
            </Reveal>

            {/* COLUMN 2: EMAIL */}
            <Reveal staggerIndex={5} className="py-4 lg:py-0 lg:px-8">
              <div className="flex flex-col min-h-[72px] justify-center space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#A9B4C0] shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-[#A9B4C0] font-semibold">
                    Email
                  </span>
                </div>
                <div className="pl-7">
                  <a
                    href="mailto:info@visionenergyme.com"
                    className="text-[17px] text-white font-medium hover:text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded py-1 inline-block break-all"
                  >
                    info@visionenergyme.com
                  </a>
                </div>
              </div>
            </Reveal>

            {/* COLUMN 3: VISIT */}
            <Reveal staggerIndex={6} className="py-4 lg:py-0 lg:px-8">
              <div className="flex flex-col min-h-[72px] justify-center space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#A9B4C0] shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-[#A9B4C0] font-semibold">
                    Visit
                  </span>
                </div>
                <div className="pl-7 space-y-2">
                  <p className="text-sm text-[#A9B4C0] leading-[1.6]">
                    RAK Business Centre BC4, RAK Business Park, P.O Box 17111, Al Nakheel, Ras Al
                    Khaimah, United Arab Emirates
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=RAK+Business+Centre+BC4+RAK+Business+Park+Ras+Al+Khaimah"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8DC63F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                  >
                    <span>Get directions</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* COLUMN 4: LOCATIONS */}
            <Reveal staggerIndex={7} className="py-4 lg:py-0 lg:pl-8">
              <div className="flex flex-col min-h-[72px] justify-center space-y-2">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#A9B4C0] shrink-0" />
                  <span className="text-xs uppercase tracking-widest text-[#A9B4C0] font-semibold">
                    Locations
                  </span>
                </div>
                <div className="pl-7 flex flex-wrap gap-2 pt-1">
                  <Chip variant="lime">Abu Dhabi</Chip>
                  <Chip variant="lime">Dubai</Chip>
                  <Chip variant="lime">Ras Al Khaimah</Chip>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

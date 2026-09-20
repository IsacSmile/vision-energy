'use client';

import React, { useState, useEffect } from 'react';
import { Phone, ArrowRight, ArrowUpRight, Copy, Check } from 'lucide-react';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import Reveal from '@/components/ui/Reveal';
import LightningButton from '@/components/ui/LightningButton';

interface FinalCTAProps {
  bgClass?: string;
}

export default function FinalCTA({ bgClass = 'bg-[#0D1117]' }: FinalCTAProps) {
  const { openProductModal } = useEnquiryModal();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const handleOpenEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    openProductModal();
  };

  const copyToClipboard = async (text: string, type: 'phone' | 'email') => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (type === 'phone') {
        setCopiedPhone(true);
        setLiveAnnouncement('Phone number copied');
        setTimeout(() => setCopiedPhone(false), 1600);
      } else {
        setCopiedEmail(true);
        setLiveAnnouncement('Email address copied');
        setTimeout(() => setCopiedEmail(false), 1600);
      }
    } catch {
      // Fallback silent handle
    }
  };

  return (
    <section
      aria-labelledby="final-cta-heading"
      className={`py-20 md:py-32 lg:py-40 ${bgClass} relative overflow-hidden border-t border-b border-white/[0.08]`}
    >
      {/* Blue-to-Lime Hairline at Top */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(11,101,179,0.3)_35%,rgba(141,198,63,0.3)_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Screen Reader Live Announcement */}
      <span className="sr-only" role="status" aria-live="polite">
        {liveAnnouncement}
      </span>

      {/* Soft Blue Radial Glow Overlay at Top-Right with 24s Drift */}
      <div
        className={`pointer-events-none absolute -top-32 -right-32 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full opacity-70 ${
          prefersReducedMotion ? '' : 'animate-[glowDrift_24s_ease-in-out_infinite_alternate]'
        }`}
        style={{
          background:
            'radial-gradient(circle at center, rgba(11,101,179,0.18), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <style jsx global>{`
        @keyframes glowDrift {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-40px, 40px);
          }
        }
      `}</style>

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-24 items-start">
          {/* LEFT COLUMN: Eyebrow, H2, Paragraph, Buttons (lg:col-span-6) */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
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
                className="text-[clamp(2.25rem,5.4vw,5rem)] font-semibold text-white leading-[1.05] tracking-[-0.02em] [text-wrap:balance] max-w-[11em]"
              >
                Tell Us About Your Project
              </h2>
            </Reveal>

            <Reveal staggerIndex={2}>
              <p className="text-[1.125rem] lg:text-[1.25rem] text-[#A9B4C0] max-w-[38ch] [text-wrap:pretty] leading-[1.7]">
                Call us or send an enquiry, and our team will get back to you.
              </p>
            </Reveal>

            <Reveal staggerIndex={3}>
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
                {/* Primary White Pill Button: Send Enquiry */}
                <LightningButton
                  variant="primary"
                  size="lg"
                  onClick={handleOpenEnquiry}
                  iconRight={<ArrowRight className="w-4 h-4" />}
                  fullWidth
                  className="sm:w-auto shadow-lg"
                >
                  Send Enquiry
                </LightningButton>

                {/* Secondary Glass Pill Button: Call Now */}
                <LightningButton
                  variant="secondary"
                  size="lg"
                  href="tel:+97172042763"
                  iconLeft={<Phone className="w-4 h-4 text-[#8DC63F]" />}
                  fullWidth
                  className="sm:w-auto"
                >
                  Call Now
                </LightningButton>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: The Contact List (<dl>) (lg:col-span-6) */}
          <div className="lg:col-span-6 mt-16 lg:mt-0">
            <dl className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {/* ROW 1: CALL */}
              <Reveal staggerIndex={4}>
                <div className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-0 items-baseline group relative">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#A9B4C0] font-medium pt-0.5 select-none">
                    CALL
                  </dt>

                  <dd className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="relative inline-block group/item">
                        <a
                          href="tel:+97172042763"
                          className="relative text-[22px] lg:text-[clamp(1.5rem,2.2vw,2rem)] font-medium text-white tabular-nums hover:text-[#8DC63F] transition-colors inline-flex items-center gap-2 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 active:opacity-70"
                        >
                          +971 7 204 2763
                          <ArrowUpRight className="w-5 h-5 text-[#8DC63F] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all shrink-0" />
                        </a>
                      </div>

                      <div className="relative block group/item">
                        <a
                          href="tel:+971547004616"
                          className="relative text-[22px] lg:text-[clamp(1.5rem,2.2vw,2rem)] font-medium text-white tabular-nums hover:text-[#8DC63F] transition-colors inline-flex items-center gap-2 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 active:opacity-70"
                        >
                          +971 54 700 4616
                          <ArrowUpRight className="w-5 h-5 text-[#8DC63F] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all shrink-0" />
                        </a>
                      </div>
                    </div>

                    {/* 44px Copy Button */}
                    <button
                      type="button"
                      aria-label="Copy phone number"
                      onClick={() => copyToClipboard('+971 7 204 2763', 'phone')}
                      className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-[#8DC63F]/20 hover:border-[#8DC63F] text-white hover:text-[#8DC63F] flex items-center justify-center shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 mt-1"
                    >
                      {copiedPhone ? (
                        <Check className="w-4 h-4 text-[#8DC63F]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </dd>
                </div>
              </Reveal>

              {/* ROW 2: EMAIL */}
              <Reveal staggerIndex={5}>
                <div className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-0 items-baseline group relative">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#A9B4C0] font-medium pt-0.5 select-none">
                    EMAIL
                  </dt>

                  <dd className="flex items-start justify-between gap-4 min-w-0">
                    <div className="relative inline-block group/item min-w-0">
                      <a
                        href="mailto:info@visionenergyme.com"
                        className="relative text-[22px] lg:text-[clamp(1.5rem,2.2vw,2rem)] font-medium text-white hover:text-[#8DC63F] transition-colors break-all inline-flex items-center gap-2 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 active:opacity-70"
                      >
                        info@visionenergyme.com
                        <ArrowUpRight className="w-5 h-5 text-[#8DC63F] opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all shrink-0" />
                      </a>
                    </div>

                    {/* 44px Copy Button */}
                    <button
                      type="button"
                      aria-label="Copy email address"
                      onClick={() => copyToClipboard('info@visionenergyme.com', 'email')}
                      className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-[#8DC63F]/20 hover:border-[#8DC63F] text-white hover:text-[#8DC63F] flex items-center justify-center shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 mt-1"
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-[#8DC63F]" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </dd>
                </div>
              </Reveal>

              {/* ROW 3: VISIT */}
              <Reveal staggerIndex={6}>
                <div className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-0 items-baseline">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#A9B4C0] font-medium pt-0.5 select-none">
                    VISIT
                  </dt>

                  <dd className="space-y-3">
                    <p className="text-base lg:text-[1.0625rem] leading-[1.7] text-[#A9B4C0] max-w-[34ch]">
                      RAK Business Centre BC4, RAK Business Park, P.O Box 17111, Al Nakheel, Ras Al
                      Khaimah, United Arab Emirates
                    </p>

                    <a
                      href="https://www.google.com/maps/search/?api=1&query=RAK+Business+Centre+BC4+RAK+Business+Park+Ras+Al+Khaimah"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-base font-semibold text-[#8DC63F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded min-h-[48px] active:opacity-70"
                    >
                      <span>Get directions</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </dd>
                </div>
              </Reveal>

              {/* ROW 4: LOCATIONS */}
              <Reveal staggerIndex={7}>
                <div className="py-6 lg:py-8 grid grid-cols-1 md:grid-cols-[140px_1fr] gap-2 md:gap-0 items-baseline">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#A9B4C0] font-medium pt-0.5 select-none">
                    LOCATIONS
                  </dt>

                  <dd>
                    <p className="text-[18px] font-medium text-white">
                      Abu Dhabi <span className="text-[#A9B4C0] mx-2">·</span> Dubai{' '}
                      <span className="text-[#A9B4C0] mx-2">·</span> Ras Al Khaimah
                    </p>
                  </dd>
                </div>
              </Reveal>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

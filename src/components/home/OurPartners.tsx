'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

interface Partner {
  id: string;
  name: string;
  src: string;
}

const PARTNER_LOGOS: Partner[] = [
  { id: 'dubai-gov', name: 'Government of Dubai', src: '/images/partners/dubai-gov.webp' },
  { id: 'adnoc', name: 'ADNOC', src: '/images/partners/adnoc.webp' },
  { id: 'dubai-south', name: 'Dubai South', src: '/images/partners/dubai-south.webp' },
  { id: 'dubai-expo', name: 'Dubai Expo', src: '/images/partners/dubai-expo.webp' },
  { id: 'kizad', name: 'KIZAD Abu Dhabi', src: '/images/partners/kizad.webp' },
  { id: 'dubai-investments', name: 'Dubai Investments', src: '/images/partners/dubai-investments.webp' },
  { id: 'emirates-land', name: 'Emirates Land Group', src: '/images/partners/emirates-land.webp' },
  { id: 'maam-group', name: 'MAAM Group', src: '/images/partners/maam-group.webp' },
  { id: 'hct', name: 'Higher Colleges of Technology', src: '/images/partners/hct.webp' },
  { id: 'nmc-healthcare', name: 'NMC Healthcare', src: '/images/partners/nmc-healthcare.webp' },
  { id: 'sorouh', name: 'Sorouh Developments', src: '/images/partners/sorouh.webp' },
  { id: 'dubai-islamic-bank', name: 'Dubai Islamic Bank', src: '/images/partners/dubai-islamic-bank.webp' },
  { id: 'al-ain-university', name: 'Al Ain University', src: '/images/partners/al-ain-university.webp' },
  { id: 'manar-mall', name: 'Manar Mall', src: '/images/partners/manar-mall.webp' },
  { id: 'nesto', name: 'Nesto Group', src: '/images/partners/nesto.webp' },
  { id: 'abyaar', name: 'Abyaar Real Estate', src: '/images/partners/abyaar.webp' },
];

const PARTNER_TRACK = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

function PartnerLogoItem({ partner }: { partner: Partner }) {
  const [imgSrc, setImgSrc] = useState(partner.src);
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <div
      className="h-16 sm:h-[76px] lg:h-[96px] px-5 sm:px-7 lg:px-9 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-white border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 flex items-center justify-center shrink-0 shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300 select-none"
      title={partner.name}
    >
      {!hasFailed ? (
        <Image
          src={imgSrc}
          alt={partner.name}
          width={225}
          height={85}
          sizes="(max-width: 640px) 135px, (max-width: 1024px) 185px, 225px"
          loading="lazy"
          onError={() => {
            if (imgSrc.endsWith('.webp')) {
              setImgSrc(imgSrc.replace('.webp', '.png'));
            } else {
              setHasFailed(true);
            }
          }}
          className="h-10 sm:h-[50px] lg:h-[62px] w-auto max-w-[135px] sm:max-w-[185px] lg:max-w-[225px] object-contain"
        />
      ) : (
        <span className="text-xs sm:text-sm font-semibold text-gray-800 tracking-tight text-center px-1">
          {partner.name}
        </span>
      )}
    </div>
  );
}

export default function OurPartners() {
  return (
    <section aria-label="Our Trusted Partners" className="py-10 md:py-14 bg-[#050608] relative overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="partner-marquee-container rounded-2xl border border-dashed border-[#D4AF37]/25 bg-[#0D1117]/90 backdrop-blur-sm overflow-hidden flex flex-col md:flex-row items-stretch md:items-center hover:border-[#D4AF37]/50 hover:shadow-[0_0_25px_rgba(212,175,55,0.12)] transition-all duration-500 shadow-2xl group/marquee">
            {/* Partition: "Our Partners" - Top on mobile, Left on desktop */}
            <div className="partner-marquee-divider w-full md:w-auto px-4 py-3 sm:py-3.5 md:px-8 lg:px-12 md:py-6 lg:py-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-dashed border-[#D4AF37]/20 shrink-0 bg-[#0A0D14]/90 self-stretch">
              <span className="text-sm sm:text-base md:text-xl lg:text-3xl font-bold text-white whitespace-nowrap tracking-tight">
                Our Partners
              </span>
            </div>

            {/* Track: Continuous Auto-Scrolling Marquee - Full width underneath on mobile */}
            <div className="relative w-full flex-1 overflow-hidden py-3 sm:py-5 md:py-6 lg:py-7">
              {/* Left Edge Gradient Fade */}
              <div
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 sm:w-16 lg:w-24 bg-gradient-to-r from-[#0D1117] to-transparent z-10"
                aria-hidden="true"
              />
              {/* Right Edge Gradient Fade */}
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 sm:w-16 lg:w-24 bg-gradient-to-l from-[#0D1117] to-transparent z-10"
                aria-hidden="true"
              />

              {/* Infinite Moving Loop Track */}
              <div className="animate-marquee flex items-center gap-4 sm:gap-7 lg:gap-9 pl-3 sm:pl-8">
                {[...PARTNER_TRACK, ...PARTNER_TRACK].map((partner, idx) => (
                  <PartnerLogoItem
                    key={`${partner.id}-${idx}`}
                    partner={partner}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';

const PARTNER_LOGOS = [
  { id: 'dubai-gov', name: 'Government of Dubai', src: '/images/partners/dubgov.png' },
  { id: 'adnoc', name: 'ADNOC', src: '/images/partners/Adnoc.png' },
  { id: 'dubai-south', name: 'Dubai South', src: '/images/partners/Dubai%20South.png' },
  { id: 'dubai-expo', name: 'Dubai Expo', src: '/images/partners/Dubai_Expo.jpg' },
  { id: 'kizad', name: 'KIZAD Abu Dhabi', src: '/images/partners/Kizad.png' },
  { id: 'dubai-investments', name: 'Dubai Investments', src: '/images/partners/Dubai%20Investment.jfif' },
  { id: 'emirates-land', name: 'Emirates Land Group', src: '/images/partners/Emirates%20Land.jfif' },
  { id: 'maam-group', name: 'MAAM Group', src: '/images/partners/Maam-Group-Logo_Small.png' },
  { id: 'hct', name: 'Higher Colleges of Technology', src: '/images/partners/HCT1.png' },
  { id: 'nmc-healthcare', name: 'NMC Healthcare', src: '/images/partners/nmc_health_logo.png' },
  { id: 'sorouh', name: 'Sorouh Developments', src: '/images/partners/Sourouh.png' },
  { id: 'dubai-islamic-bank', name: 'Dubai Islamic Bank', src: '/images/partners/financial.png' },
  { id: 'al-ain-university', name: 'Al Ain University', src: '/images/partners/Al%20Ain%20University.png' },
  { id: 'manar-mall', name: 'Manar Mall', src: '/images/partners/Manar%20Mall%20(1).jfif' },
  { id: 'nesto', name: 'Nesto Group', src: '/images/partners/Nesto.jfif' },
  { id: 'abyaar', name: 'Abyaar Real Estate', src: '/images/partners/Abyaar.jfif' },
];

const PARTNER_TRACK = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

export default function OurPartners() {
  return (
    <section aria-label="Our Trusted Partners" className="py-10 md:py-14 bg-[#050608] relative overflow-hidden">
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="rounded-2xl border border-dashed border-white/20 bg-[#0D1117]/90 backdrop-blur-sm overflow-hidden flex flex-row items-center hover:border-[#8DC63F]/50 transition-colors duration-500 shadow-2xl group/marquee">
            {/* Left Partition: "Our Partners" - Compact on mobile to maximize visible logos */}
            <div className="px-3 sm:px-8 lg:px-12 py-3 sm:py-6 lg:py-8 flex items-center justify-center border-r border-dashed border-white/20 shrink-0 bg-[#0A0D14]/90">
              <span className="text-xs sm:text-xl lg:text-3xl font-bold text-white whitespace-nowrap tracking-tight">
                Our Partners
              </span>
            </div>

            {/* Right Track: Continuous Auto-Scrolling Marquee */}
            <div className="relative flex-1 overflow-hidden py-3 sm:py-6 lg:py-7">
              {/* Left Edge Gradient Fade */}
              <div
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 sm:w-16 lg:w-24 bg-gradient-to-r from-[#0D1117] to-transparent z-10"
                aria-hidden="true"
              />
              {/* Right Edge Gradient Fade */}
              <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 sm:w-16 lg:w-24 bg-gradient-to-l from-[#0D1117] to-transparent z-10"
                aria-hidden="true"
              />

              {/* Infinite Moving Loop Track */}
              <div className="animate-marquee flex items-center gap-3 sm:gap-6 lg:gap-8 pl-3 sm:pl-8">
                {[...PARTNER_TRACK, ...PARTNER_TRACK].map((partner, idx) => (
                  <div
                    key={`${partner.id}-${idx}`}
                    className="h-12 sm:h-16 lg:h-20 px-3.5 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-xl sm:rounded-2xl bg-white flex items-center justify-center shrink-0 shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
                    title={partner.name}
                  >
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      width={160}
                      height={60}
                      className="h-7 sm:h-9 lg:h-11 w-auto max-w-[95px] sm:max-w-[130px] lg:max-w-[160px] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

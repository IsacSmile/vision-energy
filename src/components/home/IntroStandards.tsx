import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Chip from '@/components/ui/Chip';
import Reveal from '@/components/ui/Reveal';

interface IntroStandardsProps {
  productCategoryCount?: number;
}

const STANDARDS = [
  'BS EN 62305',
  'IEC 62305',
  'IEC 62561',
  'IEC 60364',
  'NFC 17-102',
  'NFPA 780',
];

export default function IntroStandards({ productCategoryCount }: IntroStandardsProps) {
  return (
    <section
      aria-labelledby="intro-standards-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#050608]"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Main Intro: 2-Column Desktop Grid / Stacked Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (5/12 split on lg+) */}
          <div className="lg:col-span-5">
            <SectionHeader
              id="intro-standards-heading"
              eyebrow="About Vision Energy"
              title="Powering Progress with Innovation, Reliability, Safety & Sustainability"
            />
          </div>

          {/* Right Column (7/12 split on lg+) */}
          <div className="lg:col-span-7 space-y-6 pt-2 lg:pt-0">
            <Reveal staggerIndex={1}>
              <p className="text-base md:text-[1.0625rem] text-[#A9B4C0] leading-[1.7]">
                At VISION ENERGY INTERNATIONAL, we power progress through high-performance
                electrical, mechanical, and solar solutions engineered for reliability,
                efficiency, and long-term value. Our solutions are selected to meet the most
                demanding project requirements while maintaining the highest standards of quality,
                safety, technical compliance, and environmental responsibility.
              </p>
            </Reveal>

            <Reveal staggerIndex={2}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:underline active-press group"
              >
                <span>More about us</span>
                <ArrowRight className="w-4 h-4 text-[#8DC63F] transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>

            {/* Desktop-Only 3 Plain Facts (hidden on mobile since hero has facts strip) */}
            <div className="hidden lg:grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08]">
              <div className="space-y-1">
                <span className="block text-2xl font-semibold text-white">2018</span>
                <span className="block text-xs uppercase tracking-wider text-[#A9B4C0]">Established</span>
              </div>
              <div className="space-y-1 border-l border-white/[0.08] pl-6">
                <span className="block text-2xl font-semibold text-white">3</span>
                <span className="block text-xs uppercase tracking-wider text-[#A9B4C0]">UAE Locations</span>
              </div>
              {Boolean(productCategoryCount && productCategoryCount > 0) && (
                <div className="space-y-1 border-l border-white/[0.08] pl-6">
                  <span className="block text-2xl font-semibold text-white">{productCategoryCount}</span>
                  <span className="block text-xs uppercase tracking-wider text-[#A9B4C0]">Product categories</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Standards Strip */}
        <div className="pt-8 border-t border-white/[0.08] space-y-4">
          <Reveal staggerIndex={0}>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A9B4C0] uppercase tracking-[0.14em]">
              <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
              <span>Standards we work to</span>
            </div>
          </Reveal>

          {/* Chips Row: Horizontal scroll on mobile, flex-wrap on desktop */}
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory lg:flex-wrap lg:overflow-visible py-1">
            {STANDARDS.map((std, i) => (
              <Reveal key={std} staggerIndex={i}>
                <Chip variant="static" className="snap-start">
                  {std}
                </Chip>
              </Reveal>
            ))}
          </div>

          <Reveal staggerIndex={4}>
            <p className="text-[13px] text-[#A9B4C0]/80">
              System design and test criteria follow approved project requirements and site conditions.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

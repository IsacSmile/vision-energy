import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';

interface IntroStandardsProps {
  productCategoryCount?: number;
}

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
              title="Specialist Supply. Practical Engineering."
            />
          </div>

          {/* Right Column (7/12 split on lg+) */}
          <div className="lg:col-span-7 space-y-6 pt-2 lg:pt-0">
            <Reveal staggerIndex={1} className="space-y-4">
              <p className="text-base md:text-lg text-[#A9B4C0] leading-[1.7]">
                Founded in 2018, Vision Energy International supplies electrical, mechanical and renewable energy solutions to construction, MEP, oil and gas, and renewable energy projects across the GCC. Our portfolio also includes laboratory and gym equipment and specialize in lightning protection and earthing systems.
              </p>
              <p className="text-base md:text-lg text-[#A9B4C0] leading-[1.7]">
                As an authorised agent and distributor for specialist products in the UAE, we draw on over a decade of industry experience to help clients select equipment that meets project specifications, applicable international standards and local regulatory requirements.
              </p>
            </Reveal>

            {/* 3 Plain Facts (stacked cleanly on mobile and desktop) */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 border-t border-white/[0.08]">
              <div className="space-y-1">
                <span className="block text-xl sm:text-2xl font-bold text-white">2018</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-[#A9B4C0]">Established</span>
              </div>
              <div className="space-y-1 border-l border-white/[0.08] pl-3 sm:pl-6">
                <span className="block text-xl sm:text-2xl font-bold text-white">UAE and GCC</span>
              </div>
              <div className="space-y-1 border-l border-white/[0.08] pl-3 sm:pl-6">
                <span className="block text-xl sm:text-2xl font-bold text-white">Multiple</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-[#A9B4C0] truncate">Product categories</span>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

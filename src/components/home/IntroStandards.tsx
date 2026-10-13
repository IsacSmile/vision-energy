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
              title="Powering Progress Through Engineering Excellence"
            />
          </div>

          {/* Right Column (7/12 split on lg+) */}
          <div className="lg:col-span-7 space-y-6 pt-2 lg:pt-0">
            <Reveal staggerIndex={1}>
              <p className="text-base md:text-lg text-[#A9B4C0] leading-[1.7]">
                Founded in 2018, Vision Energy International has rapidly established itself in the GCC market as a leading supplier of mechanical, electrical, and solar solutions for a variety of industries, including construction, MEP, oil and gas and renewables. With over a decade of experience in the respective fields we must ensure that our dedication adhere to the international standards, local requirements, and regulatory guidelines for quality and safety.
              </p>
              <p className="text-[15px] sm:text-base text-[#8B949E] dark:text-[#94A3B8] leading-[1.7] mt-4">
                Vision Energy International enrolled as a authorized agent and distributor for numerous specialized products in the UAE, we combine integrated cutting edge technology with expertise to provide superior solutions that prioritize environmental sustainability. With a strong regional presence throughout the Middle East we continue to deliver high quality innovative solutions in every project we take on.
              </p>
            </Reveal>

            {/* 3 Plain Facts (stacked cleanly on mobile and desktop) */}
            <div
              className={`grid ${
                Boolean(productCategoryCount && productCategoryCount > 0)
                  ? 'grid-cols-3'
                  : 'grid-cols-2'
              } gap-3 sm:gap-6 pt-6 border-t border-white/[0.08]`}
            >
              <div className="space-y-1">
                <span className="block text-xl sm:text-2xl font-semibold text-white">2018</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-[#A9B4C0]">Established</span>
              </div>
              <div className="space-y-1 border-l border-white/[0.08] pl-3 sm:pl-6">
                <span className="block text-xl sm:text-2xl font-semibold text-white">3</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-[#A9B4C0]">UAE Locations</span>
              </div>
              {Boolean(productCategoryCount && productCategoryCount > 0) && (
                <div className="space-y-1 border-l border-white/[0.08] pl-3 sm:pl-6">
                  <span className="block text-xl sm:text-2xl font-semibold text-white">{productCategoryCount}</span>
                  <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-[#A9B4C0] truncate">Product categories</span>
                </div>
              )}
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}

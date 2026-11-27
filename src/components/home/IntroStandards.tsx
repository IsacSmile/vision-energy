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
      className="py-14 md:py-20 lg:py-24 bg-[#050608] relative overflow-hidden"
    >
      {/* Background Subtle Gradient Accents */}
      <div
        className="absolute top-1/4 left-0 w-96 h-96 bg-[#0B65B3]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#8DC63F]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          <div className="lg:col-span-7 space-y-5 pt-2 lg:pt-0">
            <Reveal staggerIndex={1} className="space-y-3.5">
              <p className="text-base md:text-lg text-slate-600 dark:text-[#A9B4C0] leading-[1.7]">
                Established in 2018 with more than 160 projects completed, Vision Energy International supplies electrical, mechanical, renewable energy, gym, and laboratory solutions—with specialist engineering capabilities in lightning protection, earthing, and surge protection systems across Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar.
              </p>
              <p className="text-base md:text-lg text-slate-600 dark:text-[#A9B4C0] leading-[1.7]">
                From our Ras Al Khaimah head office and branches in Dubai and Abu Dhabi, we help consultants and contractors select and deploy equipment aligned with applicable international standards and UAE utility requirements.
              </p>
            </Reveal>

            {/* Verified Company Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-5 border-t border-slate-200/80 dark:border-white/[0.08] max-w-lg">
              <div className="space-y-1">
                <span className="block text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">2018</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-[#A9B4C0]">Established</span>
              </div>
              <div className="space-y-1 border-l border-slate-200/80 dark:border-white/[0.08] pl-4 sm:pl-6">
                <span className="block text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">160+</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-[#A9B4C0]">Projects</span>
              </div>
              <div className="space-y-1 border-l border-slate-200/80 dark:border-white/[0.08] pl-4 sm:pl-6">
                <span className="block text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">UAE &amp; Qatar</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-[#A9B4C0]">Markets Served</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

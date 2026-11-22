import React from 'react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { ShieldCheck, Building2, CheckCircle2, Award, Zap, FileCheck } from 'lucide-react';

interface IntroStandardsProps {
  productCategoryCount?: number;
}

const LPS_STANDARDS = [
  {
    code: 'IEC 62305',
    title: 'Lightning Protection Benchmark',
  },
  {
    code: 'BS EN 62305',
    title: 'Structural & Surge Code',
  },
  {
    code: 'BS 7430',
    title: 'Earthing & Grounding Practice',
  },
  {
    code: 'BS 7671 / IEC 60364',
    title: 'Wiring Regs & Circuit Safety',
  },
  {
    code: 'NFC 17-102',
    title: 'Early Streamer Emission (ESE)',
  },
  {
    code: 'IEC 62561',
    title: 'LPS Components & Clamps',
  },
  {
    code: 'NFPA 780',
    title: 'Life Safety in Critical Facilities',
  },
];

const AUTHORITY_COMPLIANCE = [
  {
    code: 'TAQA (ADWEA)',
    name: 'Abu Dhabi National Energy',
  },
  {
    code: 'ADDC',
    name: 'Abu Dhabi Distribution',
  },
  {
    code: 'DoE',
    name: 'Department of Energy',
  },
  {
    code: 'ADCDA',
    name: 'Civil Defence Authority',
  },
  {
    code: 'Abu Dhabi Municipality',
    name: 'Municipal Town Planning',
  },
  {
    code: 'DEWA',
    name: 'Dubai Electricity & Water',
  },
  {
    code: 'SEWA',
    name: 'Sharjah Electricity & Water',
  },
  {
    code: 'Etihad WE',
    name: 'Federal Utility (FEWA)',
  },
];

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

      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 relative z-10">
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
                Founded in 2018, Vision Energy International supplies electrical, mechanical and renewable energy solutions to construction, MEP, oil and gas, and renewable energy projects across the GCC. Our portfolio also includes laboratory and gym equipment and specialize in lightning protection and earthing systems.
              </p>
              <p className="text-base md:text-lg text-slate-600 dark:text-[#A9B4C0] leading-[1.7]">
                As an authorised agent and distributor for specialist products in the UAE, we draw on over a decade of industry experience to help clients select equipment that meets project specifications, applicable international standards and local regulatory requirements.
              </p>
            </Reveal>

            {/* 2 Plain Facts */}
            <div className="grid grid-cols-2 gap-4 sm:gap-8 pt-5 border-t border-slate-200/80 dark:border-white/[0.08] max-w-sm sm:max-w-md">
              <div className="space-y-1">
                <span className="block text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">2018</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-[#A9B4C0]">Established</span>
              </div>
              <div className="space-y-1 border-l border-slate-200/80 dark:border-white/[0.08] pl-4 sm:pl-8">
                <span className="block text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">UAE and GCC</span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 dark:text-[#A9B4C0]">Coverage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compact, High-Visibility Standards & Authority Compliance Cards */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {/* Card 1: LPS Standards (Clean White Card with Lightweight Border & Smooth Shadow) */}
            <Reveal staggerIndex={2}>
              <div className="standards-clean-card group relative h-full rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#8DC63F]/50 transition-all duration-300 hover:-translate-y-1 p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
                <div className="relative z-10 space-y-3.5">
                  {/* Card Header (Without 7 Codes Badge) */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0B65B3]/10 dark:bg-[#0B65B3]/20 border border-[#0B65B3]/25 dark:border-[#0B65B3]/35 flex items-center justify-center text-[#0B65B3] dark:text-[#8DC63F] group-hover:bg-[#8DC63F] group-hover:text-black transition-colors duration-300">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                          LPS Standards
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-[#A9B4C0]">International Engineering Codes</p>
                      </div>
                    </div>
                  </div>

                  {/* Standards 2-Column Compact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {LPS_STANDARDS.map((std, idx) => {
                      const isLastOdd = idx === LPS_STANDARDS.length - 1;
                      return (
                        <div
                          key={idx}
                          className={`group/item flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50/80 hover:bg-slate-100/90 dark:bg-white/[0.025] dark:hover:bg-white/[0.07] border border-slate-200/70 dark:border-white/[0.06] hover:border-[#8DC63F]/50 transition-all duration-200 hover:scale-[1.01] cursor-default ${
                            isLastOdd ? 'sm:col-span-2' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-5 h-5 rounded bg-[#0B65B3]/10 dark:bg-[#0B65B3]/20 flex items-center justify-center shrink-0 text-[#0B65B3] dark:text-[#8DC63F] group-hover/item:text-[#8DC63F]">
                              <Zap className="w-3 h-3" />
                            </div>
                            <div className="min-w-0">
                              <span className="block text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover/item:text-[#0B65B3] dark:group-hover/item:text-[#8DC63F] transition-colors truncate">
                                {std.code}
                              </span>
                              <span className="block text-[10px] text-slate-500 dark:text-[#94A3B8] group-hover/item:text-slate-700 dark:group-hover/item:text-[#CBD5E1] transition-colors truncate">
                                {std.title}
                              </span>
                            </div>
                          </div>
                          <span className="shrink-0 text-[10px] font-semibold text-[#8DC63F] bg-[#8DC63F]/10 px-1.5 py-0.5 rounded border border-[#8DC63F]/20">
                            ✓
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Compact Assurance Strip */}
                <div className="relative z-10 mt-3.5 pt-2.5 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 dark:text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-white/80">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                    <span>Technical Submittals Included</span>
                  </span>
                  <span className="text-[#0B65B3] dark:text-[#8DC63F] font-medium">100% IEC / BS Adherent</span>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Authority Compliance (Clean White Card with Lightweight Border & Smooth Shadow) */}
            <Reveal staggerIndex={3}>
              <div className="standards-clean-card group relative h-full rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/90 dark:border-white/10 shadow-sm hover:shadow-md hover:border-[#0B65B3]/50 transition-all duration-300 hover:-translate-y-1 p-4 sm:p-5 flex flex-col justify-between overflow-hidden">
                <div className="relative z-10 space-y-3.5">
                  {/* Card Header (Without 8 Authorities Badge) */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-white/[0.08]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center text-[#8DC63F] group-hover:bg-[#8DC63F] group-hover:text-black transition-colors duration-300">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                          Authority Compliance
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-[#A9B4C0]">UAE Utility & Civil Defence Bodies</p>
                      </div>
                    </div>
                  </div>

                  {/* Authorities 2-Column Compact Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {AUTHORITY_COMPLIANCE.map((auth, idx) => (
                      <div
                        key={idx}
                        className="group/item flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-slate-50/80 hover:bg-slate-100/90 dark:bg-white/[0.025] dark:hover:bg-white/[0.07] border border-slate-200/70 dark:border-white/[0.06] hover:border-[#0B65B3]/50 transition-all duration-200 hover:scale-[1.01] cursor-default"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-5 h-5 rounded bg-[#8DC63F]/15 flex items-center justify-center shrink-0 text-[#8DC63F] group-hover/item:text-[#0B65B3]">
                            <FileCheck className="w-3 h-3" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-xs sm:text-[13px] font-bold text-slate-900 dark:text-white group-hover/item:text-[#0B65B3] dark:group-hover/item:text-[#8DC63F] transition-colors truncate">
                              {auth.code}
                            </span>
                            <span className="block text-[10px] text-slate-500 dark:text-[#94A3B8] group-hover/item:text-slate-700 dark:group-hover/item:text-[#CBD5E1] transition-colors truncate">
                              {auth.name}
                            </span>
                          </div>
                        </div>
                        <span className="shrink-0 text-[10px] font-semibold text-[#8DC63F] bg-[#8DC63F]/10 px-1.5 py-0.5 rounded border border-[#8DC63F]/20">
                          NOC
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Compact Assurance Strip */}
                <div className="relative z-10 mt-3.5 pt-2.5 border-t border-slate-200/80 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 dark:text-[#94A3B8]">
                  <span className="flex items-center gap-1.5 text-slate-700 dark:text-white/80">
                    <Award className="w-3.5 h-3.5 text-[#8DC63F]" />
                    <span>NOC Clearances Approved</span>
                  </span>
                  <span className="text-[#0B65B3] dark:text-[#8DC63F] font-medium">All UAE Emirates</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

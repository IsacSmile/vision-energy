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
    title: 'Protection Against Lightning',
    description: 'International benchmark for physical damage and life hazard protection',
  },
  {
    code: 'BS EN 62305',
    title: 'European & British Standard',
    description: 'Structural lightning protection, risk management & surge mitigation',
  },
  {
    code: 'BS 7430',
    title: 'Protective Earthing Code of Practice',
    description: 'Low-impedance grounding networks and soil resistivity dissipation',
  },
  {
    code: 'BS 7671 / IEC 60364',
    title: 'IET Wiring Regulations',
    description: 'Electrical installations safety, bonding, and circuit protection',
  },
  {
    code: 'NFC 17-102',
    title: 'Early Streamer Emission (ESE)',
    description: 'Active air terminal emission criteria & expanded protection radii',
  },
  {
    code: 'IEC 62561',
    title: 'LPS Components (LPSC)',
    description: 'Manufacturing & testing of conductors, clamps, earth pits & joints',
  },
  {
    code: 'NFPA 780',
    title: 'Installation of Lightning Protection',
    description: 'Standard for safety of life and property in critical facilities',
  },
];

const AUTHORITY_COMPLIANCE = [
  {
    code: 'TAQA (ADWEA)',
    name: 'Abu Dhabi National Energy Company',
    description: 'Water and electricity grid transmission & distribution standards',
  },
  {
    code: 'ADDC',
    name: 'Abu Dhabi Distribution Company',
    description: 'Commercial, industrial and residential utility compliance',
  },
  {
    code: 'DoE',
    name: 'Abu Dhabi Department of Energy',
    description: 'Energy sector governance, efficiency and infrastructure codes',
  },
  {
    code: 'ADCDA',
    name: 'Abu Dhabi Civil Defence Authority',
    description: 'Life safety certifications, fire prevention & lightning protection NOCs',
  },
  {
    code: 'Abu Dhabi Municipality',
    name: 'Municipal Engineering & Town Planning',
    description: 'Building codes, infrastructure permits and municipal clearance',
  },
  {
    code: 'DEWA',
    name: 'Dubai Electricity & Water Authority',
    description: 'Approved grounding materials, submittals & MEP power regulations',
  },
  {
    code: 'SEWA',
    name: 'Sharjah Electricity, Water & Gas Authority',
    description: 'Utility connection standards and regional authority guidelines',
  },
  {
    code: 'Etihad WE',
    name: 'Etihad Water & Electricity (FEWA)',
    description: 'Federal utility standards across the Northern Emirates',
  },
];

export default function IntroStandards({ productCategoryCount }: IntroStandardsProps) {
  return (
    <section
      aria-labelledby="intro-standards-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#050608] relative overflow-hidden"
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

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16 relative z-10">
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

        {/* Interactive Standards & Authority Compliance Cards (No Image, Pure Interactive Cards) */}
        <div className="pt-6 sm:pt-8 border-t border-white/[0.08]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 1: LPS Standards */}
            <Reveal staggerIndex={2}>
              <div className="group relative h-full rounded-2xl sm:rounded-3xl bg-[#0D1117] border border-white/10 hover:border-[#8DC63F]/50 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(11,101,179,0.18)] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                {/* Glowing Ambient Gradient on Card Hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#0B65B3]/5 via-transparent to-[#8DC63F]/5 group-hover:from-[#0B65B3]/15 group-hover:to-[#8DC63F]/15 transition-all duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-6">
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B65B3]/15 border border-[#0B65B3]/35 text-xs font-bold text-[#8DC63F] uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8DC63F]" />
                      <span>International Benchmarks</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-between">
                      <span>LPS Standards</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-[#A9B4C0] border border-white/10">
                        7 Codes
                      </span>
                    </h3>
                    <p className="text-sm text-[#A9B4C0] leading-relaxed">
                      Engineering, risk calculation, and installation criteria adhered to across all supplied lightning and surge protection solutions.
                    </p>
                  </div>

                  {/* Standards Interactive Items List */}
                  <div className="space-y-2.5">
                    {LPS_STANDARDS.map((std, idx) => (
                      <div
                        key={idx}
                        className="group/item relative flex items-start justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#8DC63F]/40 transition-all duration-300 hover:translate-x-1 cursor-default"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-6 h-6 rounded-md bg-[#0B65B3]/20 border border-[#0B65B3]/40 group-hover/item:border-[#8DC63F] group-hover/item:bg-[#8DC63F]/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                            <Zap className="w-3.5 h-3.5 text-[#8DC63F]" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-sm sm:text-[15px] font-bold text-white group-hover/item:text-[#8DC63F] transition-colors duration-300">
                              {std.code}
                            </span>
                            <span className="block text-xs text-[#94A3B8] group-hover/item:text-[#CBD5E1] transition-colors duration-300 truncate">
                              {std.description}
                            </span>
                          </div>
                        </div>
                        <span className="shrink-0 text-[11px] font-semibold text-[#8DC63F]/80 group-hover/item:text-[#8DC63F] px-2 py-0.5 rounded bg-[#8DC63F]/10 border border-[#8DC63F]/20 transition-all duration-300">
                          Verified
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Assurance Bar */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#8DC63F]" />
                    <span>Complete Technical Submittals Included</span>
                  </span>
                  <span className="text-white/40">100% IEC / BS Compliant</span>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Authority Compliance */}
            <Reveal staggerIndex={3}>
              <div className="group relative h-full rounded-2xl sm:rounded-3xl bg-[#0D1117] border border-white/10 hover:border-[#0B65B3]/60 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(141,198,63,0.18)] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
                {/* Glowing Ambient Gradient on Card Hover */}
                <div
                  className="absolute inset-0 bg-gradient-to-br from-[#8DC63F]/5 via-transparent to-[#0B65B3]/5 group-hover:from-[#8DC63F]/15 group-hover:to-[#0B65B3]/15 transition-all duration-500 pointer-events-none"
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-6">
                  {/* Card Header */}
                  <div className="space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8DC63F]/15 border border-[#8DC63F]/35 text-xs font-bold text-[#8DC63F] uppercase tracking-wider">
                      <Building2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                      <span>UAE Regulatory Clearance</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-between">
                      <span>Authority Compliance</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-white/5 text-[#A9B4C0] border border-white/10">
                        8 Authorities
                      </span>
                    </h3>
                    <p className="text-sm text-[#A9B4C0] leading-relaxed">
                      Products, engineering packages, and technical drawings approved across federal, emirate, and civil defense bodies.
                    </p>
                  </div>

                  {/* Authorities Interactive Items List */}
                  <div className="space-y-2.5">
                    {AUTHORITY_COMPLIANCE.map((auth, idx) => (
                      <div
                        key={idx}
                        className="group/item relative flex items-start justify-between gap-3 p-3 sm:p-3.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06] hover:border-[#0B65B3]/50 transition-all duration-300 hover:translate-x-1 cursor-default"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="w-6 h-6 rounded-md bg-[#8DC63F]/20 border border-[#8DC63F]/40 group-hover/item:border-[#0B65B3] group-hover/item:bg-[#0B65B3]/20 flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300">
                            <FileCheck className="w-3.5 h-3.5 text-[#8DC63F] group-hover/item:text-[#0B65B3] transition-colors duration-300" />
                          </div>
                          <div className="min-w-0">
                            <span className="block text-sm sm:text-[15px] font-bold text-white group-hover/item:text-[#8DC63F] transition-colors duration-300">
                              {auth.code}
                            </span>
                            <span className="block text-xs text-[#94A3B8] group-hover/item:text-[#CBD5E1] transition-colors duration-300 truncate">
                              {auth.name}
                            </span>
                          </div>
                        </div>
                        <span className="shrink-0 text-[11px] font-semibold text-[#0B65B3] group-hover/item:text-[#8DC63F] px-2 py-0.5 rounded bg-[#0B65B3]/10 border border-[#0B65B3]/25 transition-all duration-300">
                          NOC Approved
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Assurance Bar */}
                <div className="relative z-10 mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-[#94A3B8]">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#8DC63F]" />
                    <span>Civil Defense & Utility Approvals</span>
                  </span>
                  <span className="text-white/40">Dubai, Abu Dhabi & Northern Emirates</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

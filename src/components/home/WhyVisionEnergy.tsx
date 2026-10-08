'use client';

import React from 'react';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { CheckCircle2 } from 'lucide-react';

// Decent, authentic industrial engineering icons (designed specifically for UAE engineering & infrastructure sectors, avoiding generic AI template cliches)
function CommercialIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V6a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v15" />
      <path d="M14 11h5a1 1 0 0 1 1 1v9" />
      <path d="M8 9h3M8 13h3M8 17h3" />
      <path d="M17 14.5h.01M17 17.5h.01" />
    </svg>
  );
}

function HighRiseIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 21h16" />
      <path d="M7 21V8.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V21" />
      <path d="M13 21V4.5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1V21" />
      <path d="M15.5 3.5V1.5" />
      <path d="M10 11h.01M10 14h.01M10 17h.01" />
      <path d="M15.5 8h.01M15.5 12h.01M15.5 16h.01" />
    </svg>
  );
}

function WarehouseLogisticsIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 20h18" />
      <path d="M4 20V9l8-4 8 4v11" />
      <path d="M8 20v-5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v5" />
      <path d="M10.5 14v6M13.5 14v6" />
      <path d="M8 9.5l4-2 4 2" />
    </svg>
  );
}

function IndustrialPlantIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M4 21V7a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14" />
      <path d="M11 12h8a1 1 0 0 1 1 1v8" />
      <path d="M7 3v3M9 3v3" />
      <circle cx="7.5" cy="11.5" r="1.5" />
      <circle cx="7.5" cy="16.5" r="1.5" />
      <path d="M14 16h3M14 18.5h3" />
    </svg>
  );
}

function OilGasIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M7 21L11 4h2l4 17" />
      <path d="M8.5 15h7" />
      <path d="M10 10h4" />
      <path d="M11 4V2h2v2" />
      <path d="M8.8 15L13.8 10" />
      <path d="M15.2 15L10.2 10" />
    </svg>
  );
}

function SubstationUtilityIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 22h16" />
      <path d="M7.5 22L11 3h2l3.5 19" />
      <path d="M5 8h14" />
      <path d="M3.5 13.5h17" />
      <path d="M7 18h10" />
      <path d="M12 3V1.5" />
      <path d="M8.5 8l7 5.5" />
      <path d="M15.5 8l-7 5.5" />
    </svg>
  );
}

function HealthcareInstitutionalIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 21h18" />
      <path d="M5 21V5a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v16" />
      <path d="M12 7.5v5M9.5 10h5" />
      <path d="M9.5 21v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4" />
      <path d="M7.5 17h.01M16.5 17h.01" />
    </svg>
  );
}

function ModernVillaIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M2 20h20" />
      <path d="M4 20V10l4-3h10a1 1 0 0 1 1 1v12" />
      <path d="M8 7v13" />
      <path d="M2 10.5h6" />
      <path d="M12 11h4a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-4z" />
      <path d="M5.5 14h.01M5.5 17h.01" />
    </svg>
  );
}

function CriticalDataSecurityIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2l7 3.5v5.5c0 5-3.5 8.8-7 10.5-3.5-1.7-7-5.5-7-10.5V5.5L12 2z" />
      <path d="M8.5 8h7M8.5 11.5h7M8.5 15h7" />
      <circle cx="10" cy="8" r=".5" fill="currentColor" />
      <circle cx="10" cy="11.5" r=".5" fill="currentColor" />
      <circle cx="10" cy="15" r=".5" fill="currentColor" />
    </svg>
  );
}

const SECTORS = [
  { name: 'Commercial & Residential Developments', shortName: 'Commercial & Residential', icon: CommercialIcon },
  { name: 'High-Rise & Mixed-Use Buildings', shortName: 'High-Rise & Mixed-Use', icon: HighRiseIcon },
  { name: 'Warehouses & Logistics Facilities', shortName: 'Warehouses & Logistics', icon: WarehouseLogisticsIcon },
  { name: 'Industrial Plants & Manufacturing Facilities', shortName: 'Industrial & Manufacturing', icon: IndustrialPlantIcon },
  { name: 'Oil & Gas Support Facilities', shortName: 'Oil & Gas Facilities', icon: OilGasIcon },
  { name: 'Substations, Utility & Telecom Sites', shortName: 'Substations & Telecom', icon: SubstationUtilityIcon },
  { name: 'Hotels, Schools & Healthcare Facilities', shortName: 'Hotels & Healthcare', icon: HealthcareInstitutionalIcon },
  { name: 'Villas, Compounds & Community Facilities', shortName: 'Villas & Compounds', icon: ModernVillaIcon },
  { name: 'Data, Security & Critical Installations', shortName: 'Data & Critical Sites', icon: CriticalDataSecurityIcon },
];

const STATS = [
  { value: '500+', label: 'UAE Projects Protected' },
  { value: '2018', label: 'Established in UAE' },
  { value: '100%', label: 'Compliance & Safety Record' },
];

export default function WhyVisionEnergy() {
  return (
    <section
      aria-labelledby="why-vision-energy-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#06080D] relative border-t border-b border-white/[0.08] overflow-hidden"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle Ambient Radial Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#8DC63F]/[0.03] blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl space-y-4">
          <Reveal staggerIndex={0}>
            <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.14em]">
              <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
              <span>Why Vision Energy</span>
            </div>
          </Reveal>

          <Reveal staggerIndex={1}>
            <h2
              id="why-vision-energy-heading"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-white leading-[1.2] tracking-[-0.02em] text-balance"
            >
              Engineering that keeps people, buildings, and operations safe when reliability matters most.
            </h2>
          </Reveal>
        </div>

        {/* Feature Cards: 1 Horizontal Flagship Banner on Top + 4-Card Grid Below */}
        <div className="space-y-6 sm:space-y-8">
          {/* Flagship Horizontal Card: Specialist Engineering Approach */}
          <Reveal staggerIndex={2}>
            <div className="group rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-500 shadow-xl overflow-hidden p-6 sm:p-8 lg:p-10 relative">
              {/* Subtle Corner Glow on Hover */}
              <div
                className="absolute -top-24 -left-24 w-48 h-48 bg-[#8DC63F]/10 blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
                {/* Left/Content Column (7 cols on lg) */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <span className="text-xs sm:text-[13px] uppercase tracking-wider text-[#8DC63F] font-bold block mb-2">
                      Core Discipline
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-tight">
                      Specialist Engineering Approach
                    </h3>
                  </div>

                  <p className="text-[15px] sm:text-base lg:text-[17px] text-[#CBD5E1] group-hover:text-white transition-colors leading-relaxed">
                    Lightning protection and earthing aren't an afterthought or a side gig for us — it's our core engineering focus. We calculate, design, and verify every path to earth so you get proven safety, not guesswork.
                  </p>

                  {/* Verified Engineering Badges */}
                  <div className="pt-4 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#CBD5E1]">
                      <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                      <span>BS EN / IEC 62305</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#CBD5E1]">
                      <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                      <span>Soil Resistivity Testing</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-[13px] text-[#CBD5E1]">
                      <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                      <span>DEWA & Civil Defense NOCs</span>
                    </div>
                  </div>
                </div>

                {/* Right/Image Column (5 cols on lg) */}
                <div className="lg:col-span-5">
                  <div className="relative w-full h-[220px] sm:h-[260px] lg:h-[290px] rounded-lg overflow-hidden border border-white/10 group-hover:border-[#8DC63F]/40 transition-all duration-500 shadow-md bg-[#06080D]">
                    <Image
                      src="/images/specialist-engineering-approach.jpg"
                      alt="Specialist engineering earthing and lightning protection testing on site"
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 4 Feature Cards: Spacious 2x2 Grid (2 columns on md/lg, easy to read, humanized) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Card 1: UAE Project Experience */}
            <Reveal staggerIndex={3} className="h-full">
              <div className="group h-full flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                <div>
                  {/* Real UAE Site Construction Photo */}
                  <div className="relative w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden border border-white/10 group-hover:border-[#8DC63F]/40 transition-all duration-500 shadow-md mb-5 bg-[#06080D]">
                    <Image
                      src="/images/uae-project-experience.jpg"
                      alt="Vision Energy engineers on site coordinating electrical and protection installations in UAE"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block mb-1.5">
                    Local Site Realities
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug mb-3">
                    UAE Project Experience
                  </h3>
                  <p className="text-[15px] sm:text-base text-[#CBD5E1] group-hover:text-white transition-colors leading-relaxed">
                    Our engineers work directly on-site across the Emirates. We know how to navigate crowded rooftop plant rooms, coordinate hidden facade down-conductors with cladding teams, treat high-resistivity desert soil, and clear consultant inspections without delays.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center gap-2 text-xs sm:text-[13px] text-[#A9B4C0]">
                  <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <span>On-site coordination across Abu Dhabi, Dubai & Northern Emirates</span>
                </div>
              </div>
            </Reveal>

            {/* Card 2: Complete Project Support */}
            <Reveal staggerIndex={4} className="h-full">
              <div className="group h-full flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                <div>
                  {/* Real Technical Team Coordination Photo */}
                  <div className="relative w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden border border-white/10 group-hover:border-[#8DC63F]/40 transition-all duration-500 shadow-md mb-5 bg-[#06080D]">
                    <Image
                      src="/images/complete-project-support-vision-energy.jpg"
                      alt="Vision Energy engineers reviewing substation blueprints and testing documentation on site"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block mb-1.5">
                    Single Accountability
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug mb-3">
                    Complete Project Support
                  </h3>
                  <p className="text-[15px] sm:text-base text-[#CBD5E1] group-hover:text-white transition-colors leading-relaxed">
                    One accountable team from initial shop drawings to final testing. We handle calculations, supply certified materials, supervise on-site installation, and provide the complete test certificates your handover demands.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center gap-2 text-xs sm:text-[13px] text-[#A9B4C0]">
                  <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <span>Shop drawings, calculations, material submittals & final sign-off</span>
                </div>
              </div>
            </Reveal>

            {/* Card 3: Quality Materials */}
            <Reveal staggerIndex={5} className="h-full">
              <div className="group h-full flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                <div>
                  {/* Real Materials & Inspection Photo */}
                  <div className="relative w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden border border-white/10 group-hover:border-[#8DC63F]/40 transition-all duration-500 shadow-md mb-5 bg-[#06080D]">
                    <Image
                      src="/images/quality-materials-vision-energy.jpg"
                      alt="Vision Energy certified earthing materials, copper tape, rods, and inspection pits on project site"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block mb-1.5">
                    Gulf-Grade Durability
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug mb-3">
                    Quality Materials
                  </h3>
                  <p className="text-[15px] sm:text-base text-[#CBD5E1] group-hover:text-white transition-colors leading-relaxed">
                    We only supply tested, corrosion-resistant copper tapes, earth rods, exothermic welds, and SPDs built for harsh Gulf heat and salinity. No shortcuts, no substandard alloys — materials that outlast the structure.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center gap-2 text-xs sm:text-[13px] text-[#A9B4C0]">
                  <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <span>Pure copper conductors & tested alloys built for high thermal & saline soil</span>
                </div>
              </div>
            </Reveal>

            {/* Card 4: Built for Long-Term Reliability */}
            <Reveal staggerIndex={6} className="h-full">
              <div className="group h-full flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
                <div>
                  {/* Real Testing & Earth Pit Inspection Photo */}
                  <div className="relative w-full h-[210px] sm:h-[230px] rounded-lg overflow-hidden border border-white/10 group-hover:border-[#8DC63F]/40 transition-all duration-500 shadow-md mb-5 bg-[#06080D]">
                    <Image
                      src="/images/built-for-long-term-reliability.jpg"
                      alt="Vision Energy engineers testing earth inspection pit resistance with digital tester on site"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>

                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block mb-1.5">
                    Maintenance-Ready
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug mb-3">
                    Built for Long-Term Reliability
                  </h3>
                  <p className="text-[15px] sm:text-base text-[#CBD5E1] group-hover:text-white transition-colors leading-relaxed">
                    Buildings settle and weather shifts. We build systems with clearly tagged inspection pits, accessible test joints, and secure mechanical fixings so your maintenance team can test earth resistance safely for decades to come.
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center gap-2 text-xs sm:text-[13px] text-[#A9B4C0]">
                  <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <span>Accessible test disconnect joints & clearly marked earth inspection pits</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Real UAE Facts & Metrics Strip */}
        <Reveal staggerIndex={7}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8 border-y border-white/[0.08] divide-y sm:divide-y-0 sm:divide-x divide-white/[0.08]">
            {STATS.map((stat, idx) => (
              <div key={idx} className={`pt-4 sm:pt-0 ${idx > 0 ? 'sm:pl-8' : ''} space-y-1`}>
                <span className="block text-3xl sm:text-4xl lg:text-[40px] font-extrabold text-white tracking-tight">
                  <span className="text-[#8DC63F]">{stat.value}</span>
                </span>
                <span className="block text-xs sm:text-[13px] uppercase tracking-wider text-[#94A3B8] font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Industries We Serve */}
        <div className="space-y-6 pt-2">
          <Reveal staggerIndex={8}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Industries We Serve
              </h3>
              <span className="text-sm sm:text-base text-[#94A3B8]">
                Proven protection engineered across critical UAE infrastructures
              </span>
            </div>
          </Reveal>

          {/* Interactive Sectors Grid with Decent Engineering Icons */}
          <Reveal staggerIndex={9}>
            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {SECTORS.map((sector, i) => {
                const IconComponent = sector.icon;
                return (
                  <div
                    key={i}
                    className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#0D1117] border border-white/10 hover:border-[#8DC63F]/50 hover:bg-[#131924] text-white/90 hover:text-white transition-all duration-300 text-sm sm:text-[14.5px] font-medium shadow-sm group cursor-default"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-[#8DC63F]/40 group-hover:bg-[#8DC63F]/10 flex items-center justify-center shrink-0 transition-colors">
                      <IconComponent className="w-4 h-4 text-[#8DC63F] group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span>{sector.name}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

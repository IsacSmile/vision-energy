'use client';

import React from 'react';
import Reveal from '@/components/ui/Reveal';

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

function DefenceMilitaryIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2l7 3.5v5.5c0 5-3.5 8.8-7 10.5-3.5-1.7-7-5.5-7-10.5V5.5L12 2z" />
      <path d="M9 10l3-3 3 3" />
      <path d="M9 14l3-3 3 3" />
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
  { name: 'Defence & Military Facilities', shortName: 'Defence & Military', icon: DefenceMilitaryIcon },
  { name: 'Data, Security & Critical Installations', shortName: 'Data & Critical Sites', icon: CriticalDataSecurityIcon },
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
              Specialist Products and Technical Support Across the UAE and GCC
            </h2>
          </Reveal>
        </div>

        {/* Feature Cards: Unified Grid of 5 Standard Card Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Technical Expertise */}
          <Reveal staggerIndex={2} className="h-full md:col-span-1 lg:col-span-2">
            <div className="group h-full flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block mb-1.5">
                    1. Technical Expertise
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                    Product Selection for Your Project
                  </h3>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Broad Portfolio:</strong> Electrical, mechanical and renewable energy solutions, laboratory and gym equipment, and specialist lightning protection and earthing systems.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Specification Review:</strong> We review ratings, materials, dimensions and compatibility against project requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Practical Alternatives:</strong> Where suitable, we propose options based on performance, availability and budget.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Technical Submittals:</strong> We provide manufacturer datasheets and supporting documentation for consultant review.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Standards & Regulations */}
          <Reveal staggerIndex={3} className="h-full md:col-span-1 lg:col-span-2">
            <div className="group h-full flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block mb-1.5">
                    2. Standards &amp; Regulations
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                    Aligned with Project and Authority Requirements
                  </h3>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Applicable Standards:</strong> We reference the relevant project and product-specific standards for each scope where permitted by the relevant authority and project specifications.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Local Authority Requirements:</strong> We account for applicable regulations, technical circulars and notices issued by municipalities and Civil Defence authorities.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Utility and Energy Requirements:</strong> Where relevant, we support documentation for projects subject to requirements from TAQA, DEWA, DoE, EtihadWE, Sharjah Electricity, Water and Gas Authority, and the ADCDA Civil Defence Authorities.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Project Coordination */}
          <Reveal staggerIndex={4} className="h-full md:col-span-1 lg:col-span-2">
            <div className="group h-full flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block mb-1.5">
                    3. Project Coordination
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                    Support from Enquiry to Handover
                  </h3>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Single Point of Contact:</strong> One team coordinates technical queries, quotations, submittals and delivery.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Site and Design Coordination:</strong> We work with clients, consultants and contractors to address site constraints and installation requirements.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Installation Support:</strong> We coordinate specialist installation through qualified partners where included in the project scope.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Testing and Handover:</strong> Where included, we coordinate testing, commissioning and handover documentation.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Quality & Sourcing */}
          <Reveal staggerIndex={5} className="h-full md:col-span-1 lg:col-span-2 lg:col-start-2">
            <div className="group h-full flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block mb-1.5">
                    4. Quality &amp; Sourcing
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                    Products Suited to the Application
                  </h3>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Authorised Distribution:</strong> We represent specialist manufacturers in the UAE across selected product lines.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Application-Specific Selection:</strong> We consider operating conditions such as heat, dust, humidity and corrosion exposure.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Product Documentation:</strong> We provide available certificates, test reports and manufacturer warranty details as required.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Supply Planning:</strong> We confirm stock status, lead times and delivery requirements during procurement.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Card 5: Long-Term Performance */}
          <Reveal staggerIndex={6} className="h-full md:col-span-2 md:max-w-md md:mx-auto w-full lg:col-span-2 lg:col-start-4 lg:max-w-none lg:mx-0">
            <div className="group h-full flex flex-col justify-between p-6 sm:p-8 rounded-xl bg-[#0D1117] border border-white/[0.1] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden">
              <div className="space-y-4">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#8DC63F] font-bold block mb-1.5">
                    5. Long-Term Performance
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                    Equipment That’s Easier to Maintain
                  </h3>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 pt-2">
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Serviceability:</strong> We consider access for inspection, maintenance and replacement when recommending equipment.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Spares and Accessories:</strong> We assist with compatible consumables, accessories and replacement parts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">Operating Documentation:</strong> We provide available manufacturer operation and maintenance manuals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-[13.5px] lg:text-sm leading-relaxed text-[#CBD5E1] group-hover:text-white transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-2 shrink-0 shadow-[0_0_8px_rgba(141,198,63,0.6)]" aria-hidden="true" />
                    <span>
                      <strong className="text-white font-semibold">After-Sales Support:</strong> We assist with technical queries, warranty coordination and replacement sourcing.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Industries We Serve */}
        <div className="space-y-6 pt-2">
          <Reveal staggerIndex={8}>
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Industries We Serve
              </h3>
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
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#0B65B3]/15 border border-[#0B65B3]/40 group-hover:border-[#8DC63F] group-hover:bg-[#0B65B3] group-hover:shadow-[0_0_14px_rgba(141,198,63,0.45)] flex items-center justify-center shrink-0 transition-all duration-300">
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

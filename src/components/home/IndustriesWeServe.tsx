'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

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
  { name: 'Commercial & Residential Developments', icon: CommercialIcon },
  { name: 'High-Rise & Mixed-Use Buildings', icon: HighRiseIcon },
  { name: 'Warehouses & Logistics Facilities', icon: WarehouseLogisticsIcon },
  { name: 'Industrial Plants & Manufacturing Facilities', icon: IndustrialPlantIcon },
  { name: 'Oil & Gas Support Facilities', icon: OilGasIcon },
  { name: 'Substations, Utility & Telecom Sites', icon: SubstationUtilityIcon },
  { name: 'Hotels, Schools & Healthcare Facilities', icon: HealthcareInstitutionalIcon },
  { name: 'Villas, Compounds & Community Facilities', icon: ModernVillaIcon },
  { name: 'Defence & Military Facilities', icon: DefenceMilitaryIcon },
  { name: 'Data, Security & Critical Installations', icon: CriticalDataSecurityIcon },
];

/**
 * Shared 10-sector UAE & GCC Industries We Serve grid positioned below tabs.
 */
export default function IndustriesWeServe() {
  return (
    <section
      aria-labelledby="industries-we-serve-heading"
      className="py-12 md:py-16 lg:py-20 bg-[#F8FAFC] dark:bg-[#06080D] relative border-b border-slate-200 dark:border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Reveal staggerIndex={0}>
          <div className="text-left">
            <h2
              id="industries-we-serve-heading"
              className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight"
            >
              Industries We Serve
            </h2>
          </div>
        </Reveal>

        <Reveal staggerIndex={1}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 w-full">
            {SECTORS.map((sector, i) => {
              const IconComponent = sector.icon;
              return (
                <div
                  key={i}
                  className="group w-full flex items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/25 hover:-translate-y-[3px] motion-reduce:hover:translate-y-0 hover:shadow-md transition-all duration-200 ease-out shadow-sm cursor-default"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 transition-colors duration-150">
                      <IconComponent className="w-5 h-5 text-[#0B65B3] dark:text-[#8DC63F]" />
                    </div>
                    <span className="text-sm sm:text-[15px] font-semibold text-slate-900 dark:text-white leading-snug">
                      {sector.name}
                    </span>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center shrink-0 transition-colors duration-150">
                    <ArrowUpRight className="w-4 h-4 text-slate-500 dark:text-[#A9B4C0] group-hover:text-[#0B65B3] dark:group-hover:text-[#8DC63F]" />
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}


'use client';

import React from 'react';
import '@/app/expertise/expertise.css';

function CommercialIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

function HighRiseIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

function WarehouseLogisticsIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

function IndustrialPlantIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

function OilGasIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

function SubstationUtilityIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

function HealthcareInstitutionalIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

function ModernVillaIcon({ className = 'w-5 h-5' }: { className?: string }) {
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

function DefenceMilitaryIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2l7 3.5v5.5c0 5-3.5 8.8-7 10.5-3.5-1.7-7-5.5-7-10.5V5.5L12 2z" />
      <path d="M9 10l3-3 3 3" />
      <path d="M9 14l3-3 3 3" />
    </svg>
  );
}

function CriticalDataSecurityIcon({ className = 'w-5 h-5' }: { className?: string }) {
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
 * Compact 10-sector grid positioned at the top of /expertise presenting the
 * facility types Vision Energy supports across the UAE and GCC.
 */
export default function IndustriesWeServe() {
  return (
    <section
      id="industries-we-serve"
      aria-labelledby="industries-we-serve-heading"
      className="py-10 sm:py-12 lg:py-14 bg-[#F4F8FC] dark:bg-[#080C14] relative border-b border-slate-200/80 dark:border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-7">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
          <h2
            id="industries-we-serve-heading"
            className="text-2xl sm:text-3xl font-bold text-[#0A192F] dark:text-white tracking-[-0.02em]"
          >
            Industries We Serve
          </h2>
        </div>

        {/* Balanced 2x5 grid on desktop, 5x2 grid on mobile/tablet (no trailing orphan slots) */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4 items-stretch">
          {SECTORS.map((sector, idx) => {
            const IconComponent = sector.icon;
            const isBlue = idx % 2 === 0;
            return (
              <div
                key={sector.name}
                className={`expertise-card ${isBlue ? 'accent-blue' : ''} group p-4 sm:p-5 flex flex-col justify-between gap-4 h-full`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div
                    className={`expertise-icon-tile ${
                      isBlue ? 'expertise-icon-tile-blue' : 'expertise-icon-tile-green'
                    } w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isBlue
                        ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#0B65B3]/20 dark:text-[#60A5FA]'
                        : 'bg-[#8DC63F]/15 text-[#38700D] dark:text-[#8DC63F]'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full transition-transform duration-200 group-hover:scale-125 ${
                      isBlue ? 'bg-[#0B65B3]/35 dark:bg-[#60A5FA]/40' : 'bg-[#8DC63F]/60'
                    }`}
                  />
                </div>

                <span className="text-[13.5px] sm:text-[14.5px] font-semibold text-[#0A192F] dark:text-white leading-[1.4]">
                  {sector.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

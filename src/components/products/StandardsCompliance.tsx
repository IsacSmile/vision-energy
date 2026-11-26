'use client';

import React from 'react';
import { Building2, Check, FileCheck, ShieldCheck, type LucideIcon } from 'lucide-react';

interface ComplianceItem {
  code: string;
  description: string;
}

const LPS_STANDARDS: ComplianceItem[] = [
  {
    code: 'IEC 62305',
    description: 'Lightning Protection Benchmark',
  },
  {
    code: 'BS EN 62305',
    description: 'Structural & Surge Code',
  },
  {
    code: 'BS 7430',
    description: 'Earthing & Grounding Practice',
  },
  {
    code: 'BS 7671 / IEC 60364',
    description: 'Wiring Regs & Circuit Safety',
  },
  {
    code: 'NFC 17-102',
    description: 'Early Streamer Emission (ESE)',
  },
  {
    code: 'IEC 62561',
    description: 'LPS Components & Clamps',
  },
  {
    code: 'NFPA 780',
    description: 'Life Safety in Critical Facilities',
  },
];

const AUTHORITY_COMPLIANCE: ComplianceItem[] = [
  {
    code: 'ADDC',
    description: 'Abu Dhabi Distribution',
  },
  {
    code: 'DoE',
    description: 'Department of Energy',
  },
  {
    code: 'ADCDA',
    description: 'Civil Defence Authority',
  },
  {
    code: 'Abu Dhabi Municipality',
    description: 'Municipal Town Planning',
  },
  {
    code: 'DEWA',
    description: 'Dubai Electricity & Water',
  },
  {
    code: 'SEWA',
    description: 'Sharjah Electricity & Water',
  },
  {
    code: 'Etihad WE',
    description: 'Federal Utility (FEWA)',
  },
];

function ComplianceCard({
  title,
  subtitle,
  items,
  headerIcon: HeaderIcon,
  itemIcon: ItemIcon,
  accent,
}: {
  title: string;
  subtitle: string;
  items: ComplianceItem[];
  headerIcon: LucideIcon;
  itemIcon: LucideIcon;
  accent: 'blue' | 'green';
}) {
  const isBlue = accent === 'blue';

  return (
    <div className="relative overflow-hidden h-full rounded-2xl bg-white dark:bg-[#0D1117] border border-slate-200/90 dark:border-white/10 shadow-[0_4px_18px_-6px_rgba(10,25,47,0.08)] dark:shadow-[0_6px_22px_-8px_rgba(0,0,0,0.45)] p-5 sm:p-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_-10px_rgba(11,101,179,0.16)] motion-reduce:hover:translate-y-0 flex flex-col">
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute top-0 left-0 right-0 h-[3px] ${
          isBlue ? 'bg-[#0B65B3]' : 'bg-[#8DC63F]'
        }`}
      />

      {/* Header */}
      <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200/80 dark:border-white/[0.08]">
        <div
          className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${
            isBlue
              ? 'bg-[#0B65B3]/10 dark:bg-[#0B65B3]/20 border-[#0B65B3]/20 dark:border-[#0B65B3]/35 text-[#0B65B3] dark:text-[#60A5FA]'
              : 'bg-[#8DC63F]/15 border-[#8DC63F]/30 text-[#5B8C1E] dark:text-[#8DC63F]'
          }`}
        >
          <HeaderIcon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#0A192F] dark:text-white tracking-[-0.015em] leading-tight">
            {title}
          </h2>
          <p className="text-[13px] sm:text-sm font-normal text-[#475569] dark:text-[#A9B4C0] mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Symmetrical 2-Column Item Grid (odd final entry spans full width) */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 flex-1">
        {items.map((item, idx) => {
          const isLastOdd = idx === items.length - 1 && items.length % 2 === 1;
          return (
            <li
              key={item.code}
              className={`flex items-start gap-3 px-3.5 py-3 rounded-xl bg-[#F4F8FC]/85 hover:bg-[#EAF2FA] dark:bg-white/[0.03] dark:hover:bg-white/[0.06] border border-slate-200/75 dark:border-white/[0.07] transition-colors duration-150 ${
                isLastOdd ? 'sm:col-span-2' : ''
              }`}
            >
              <span
                className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                  isBlue
                    ? 'bg-[#0B65B3]/10 dark:bg-[#0B65B3]/20 text-[#0B65B3] dark:text-[#60A5FA]'
                    : 'bg-[#8DC63F]/15 text-[#5B8C1E] dark:text-[#8DC63F]'
                }`}
              >
                <ItemIcon className="w-3.5 h-3.5 stroke-[2.25]" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <span className="block text-[14.5px] sm:text-[15px] font-bold text-[#0A192F] dark:text-white leading-snug">
                  {item.code}
                </span>
                <span className="block text-[13px] font-normal text-[#475569] dark:text-[#CBD5E1] leading-snug mt-0.5">
                  {item.description}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * Shared top engineering credentials section displaying international LPS
 * standards and UAE utility / civil defence authority compliance bodies.
 */
export default function StandardsCompliance() {
  return (
    <section
      id="standards-compliance"
      aria-label="LPS Standards and Authority Compliance"
      className="py-8 sm:py-10 lg:py-12 bg-[#F4F8FC] dark:bg-[#080C14] border-b border-slate-200/80 dark:border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          <ComplianceCard
            title="100% LPS Standards Adherent"
            subtitle="International Engineering Codes"
            items={LPS_STANDARDS}
            headerIcon={ShieldCheck}
            itemIcon={Check}
            accent="blue"
          />

          <ComplianceCard
            title="Authority Compliance"
            subtitle="UAE Utility & Civil Defence Bodies"
            items={AUTHORITY_COMPLIANCE}
            headerIcon={Building2}
            itemIcon={FileCheck}
            accent="green"
          />
        </div>
      </div>
    </section>
  );
}


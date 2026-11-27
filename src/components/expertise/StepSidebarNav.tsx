'use client';

import React from 'react';
import type { ExpertiseStep } from '@/lib/data/expertise';

interface StepSidebarNavProps {
  title?: string;
  steps: ExpertiseStep[];
  activeStepIndex: number;
  onSelectStep: (index: number) => void;
}

/**
 * Generalized sticky desktop step index displaying overall section progress
 * and full non-truncated step titles across passed, active, and upcoming states.
 */
export default function StepSidebarNav({
  title = 'On this guide',
  steps,
  activeStepIndex,
  onSelectStep,
}: StepSidebarNavProps) {
  if (!steps.length) return null;

  const clampedIndex = Math.max(0, Math.min(activeStepIndex, steps.length - 1));
  const progressPct = Math.round(((clampedIndex + 1) / steps.length) * 100);

  return (
    <div className="pointer-events-none hidden lg:block absolute inset-0 z-20">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <aside
          aria-label="Step index"
          className="pointer-events-auto sticky top-[168px] w-[228px] py-6 lg:py-8"
        >
          <div className="relative overflow-hidden rounded-2xl bg-white/95 dark:bg-[#0D1117]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/10 shadow-[0_10px_28px_-10px_rgba(10,25,47,0.14)] dark:shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)]">
            {/* Top Brand Accent Bar */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0B65B3] via-[#0B65B3] to-[#8DC63F]"
            />

            {/* Header + Mini Progress Bar */}
            <div className="px-4 pt-4 pb-3 border-b border-slate-100 dark:border-white/[0.08] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5B8C1E] dark:text-[#8DC63F]">
                  <span
                    className="w-3.5 h-[2px] bg-[#8DC63F] rounded-full shrink-0"
                    aria-hidden="true"
                  />
                  <span>{title}</span>
                </div>
                <span className="font-mono text-[11px] font-semibold tabular-nums text-[#0B65B3] dark:text-[#60A5FA]">
                  {String(clampedIndex + 1).padStart(2, '0')}/{String(steps.length).padStart(2, '0')}
                </span>
              </div>

              <div
                aria-hidden="true"
                className="h-1 w-full rounded-full bg-slate-100 dark:bg-white/[0.07] overflow-hidden"
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#8DC63F] to-[#0B65B3] transition-[width] duration-300 ease-out motion-reduce:transition-none"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Step Links */}
            <nav
              aria-label="Steps"
              className="p-2.5 max-h-[calc(100vh-250px)] overflow-y-auto no-scrollbar"
            >
              <ul className="relative space-y-1">
                {steps.length > 1 && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-[21px] top-4 bottom-4 w-px bg-slate-200/80 dark:bg-white/10"
                  />
                )}

                {steps.map((step, idx) => {
                  const isActive = clampedIndex === idx;
                  const isPassed = idx < clampedIndex;

                  return (
                    <li key={step.id} className="relative">
                      <button
                        type="button"
                        onClick={() => onSelectStep(idx)}
                        aria-current={isActive ? 'step' : undefined}
                        className={`group/item relative w-full text-left px-2.5 py-2 rounded-xl text-[12.5px] leading-[1.35] flex items-start gap-2.5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] cursor-pointer ${
                          isActive
                            ? 'bg-[#EDF4FC] dark:bg-[#0B65B3]/25 text-[#0A192F] dark:text-white font-semibold shadow-[inset_3px_0_0_#0B65B3]'
                            : isPassed
                            ? 'text-[#334155] dark:text-[#CBD5E1] hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:text-[#0A192F] dark:hover:text-white font-medium'
                            : 'text-[#475569] dark:text-[#94A3B8] hover:bg-slate-50 dark:hover:bg-white/[0.04] hover:text-[#0A192F] dark:hover:text-white font-medium'
                        }`}
                      >
                        <span
                          data-preserve-contrast={isActive ? 'true' : undefined}
                          className={`relative z-10 w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10.5px] font-mono font-bold tabular-nums transition-colors duration-150 ${
                            isActive
                              ? 'bg-[#0B65B3] text-white shadow-[0_2px_8px_-2px_rgba(11,101,179,0.6)]'
                              : isPassed
                              ? 'bg-[#EAF5DC] dark:bg-[#172816] text-[#38700D] dark:text-[#8DC63F] border border-[#8DC63F]/35'
                              : 'bg-white dark:bg-[#131B29] text-[#475569] dark:text-[#94A3B8] border border-slate-200/90 dark:border-white/10 group-hover/item:border-[#0B65B3]/40 group-hover/item:text-[#0B65B3] dark:group-hover/item:text-white'
                          }`}
                        >
                          {String(step.stepNumber).padStart(2, '0')}
                        </span>

                        <span className="pt-0.5 break-words">{step.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
}


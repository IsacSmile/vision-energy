'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ExpertiseTabConfig } from '@/lib/data/expertise';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import LightningButton from '@/components/ui/LightningButton';
import StepCard from './StepCard';

interface ExpertisePanelProps {
  tab: ExpertiseTabConfig;
}

export default function ExpertisePanel({ tab }: ExpertisePanelProps) {
  const { openProductModal } = useEnquiryModal();
  const stepperRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!tab.steps || tab.steps.length === 0) return;

    let rafId: number | null = null;

    const updateProgress = () => {
      rafId = null;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setScrollProgress(1);
        return;
      }
      const el = stepperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const triggerY = window.innerHeight * 0.65;
      const raw = (triggerY - rect.top) / Math.max(rect.height, 1);
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    rafId = window.requestAnimationFrame(updateProgress);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [tab.id, tab.steps]);

  const handleEmptyEnquiry = () => {
    openProductModal({
      categoryCode: tab.id.toUpperCase(),
      categoryTitle: `${tab.label} Equipment & Solutions`,
    });
  };

  return (
    <div
      id="expertise-tabpanel"
      role="tabpanel"
      aria-labelledby={`expertise-tab-${tab.id}`}
      tabIndex={0}
      className="expertise-panel-enter focus:outline-none"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 space-y-10 lg:space-y-12">
        {/* Section Heading (Single H2 + Green Eyebrow with Leading Line) */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold text-[#5B8C1E] dark:text-[#8DC63F] uppercase tracking-[0.14em]">
            <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
            <span>{tab.eyebrow}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0F172A] dark:text-white leading-[1.2] tracking-[-0.02em]">
            {tab.heading}
          </h2>
          {tab.description && (
            <p className="text-sm sm:text-base font-normal text-slate-600 dark:text-[#A9B4C0] leading-relaxed">
              {tab.description}
            </p>
          )}
        </div>

        {/* Empty State (Gym / Laboratory when no source documents attached) */}
        {tab.emptyState && (
          <div className="expertise-card p-8 sm:p-10 max-w-2xl space-y-4">
            <h3 className="text-xl font-semibold text-[#0F172A] dark:text-white">
              {tab.emptyState.title}
            </h3>
            <p className="text-sm sm:text-base font-normal text-slate-600 dark:text-[#A9B4C0]">
              {tab.emptyState.message}
            </p>
            <div className="pt-2">
              <LightningButton
                variant="primary"
                size="md"
                onClick={handleEmptyEnquiry}
                iconRight={<ArrowRight className="w-4 h-4 text-[#8DC63F]" />}
              >
                {tab.emptyState.ctaLabel}
              </LightningButton>
            </div>
          </div>
        )}

        {/* Vertical Numbered Stepper */}
        {tab.steps && tab.steps.length > 0 && (
          <div ref={stepperRef} className="relative">
            {/* Vertical Track Rail (Left) */}
            <div
              className="absolute left-[15px] sm:left-[19px] top-6 bottom-6 w-[2px] bg-slate-200 dark:bg-white/10 overflow-hidden"
              aria-hidden="true"
            >
              <div
                className="w-full h-full bg-[#8DC63F] origin-top transition-transform duration-150 ease-out motion-reduce:transition-none"
                style={{ transform: `scaleY(${scrollProgress})` }}
              />
            </div>

            <ol className="space-y-6 sm:space-y-8">
              {tab.steps.map((step, index) => {
                const threshold =
                  tab.steps && tab.steps.length > 1
                    ? index / (tab.steps.length - 1)
                    : 0;
                const isReached = scrollProgress >= Math.max(0, threshold - 0.05);

                return (
                  <li key={step.id} className="relative flex items-start gap-3 sm:gap-6">
                    {/* Numbered Step Node */}
                    <div
                      data-preserve-contrast={isReached ? 'true' : undefined}
                      className={`relative z-10 mt-5 sm:mt-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 flex items-center justify-center text-xs sm:text-sm font-semibold tabular-nums shrink-0 transition-colors duration-200 ${
                        isReached
                          ? 'bg-[#0B65B3] border-[#0B65B3] text-white'
                          : 'bg-white dark:bg-[#0D1117] border-slate-300 dark:border-white/20 text-slate-600 dark:text-[#A9B4C0]'
                      }`}
                      aria-hidden="true"
                    >
                      {String(step.stepNumber).padStart(2, '0')}
                    </div>

                    {/* Step Card */}
                    <div className="flex-1 min-w-0">
                      <StepCard step={step} index={index} />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowRight, Dumbbell, FlaskConical, Phone } from 'lucide-react';
import type { ExpertiseTabConfig, ExpertiseTabId } from '@/lib/data/expertise';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import LightningButton from '@/components/ui/LightningButton';
import StepCard from './StepCard';

interface ExpertisePanelProps {
  tab: ExpertiseTabConfig;
}

const DARK_BAND_STEP_IDS = new Set(['uae-impact', 'safety-precautions']);

function CountUpStat({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(target);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimatedRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      hasAnimatedRef.current = true;
      return;
    }

    let rafId: number | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();
          const start = performance.now();
          const duration = 650;
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.max(1, Math.round(eased * target)));
            if (p < 1) {
              rafId = window.requestAnimationFrame(tick);
            } else {
              setValue(target);
            }
          };
          rafId = window.requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [target]);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-[#0B65B3]/15 dark:border-white/10 bg-white dark:bg-[#0D1117] px-5 py-3.5 shadow-[0_4px_16px_-6px_rgba(11,101,179,0.12)] flex items-baseline gap-2.5"
    >
      <span className="text-2xl sm:text-3xl font-bold text-[#0B65B3] dark:text-[#8DC63F] tabular-nums">
        {value}
      </span>
      <span className="text-sm font-semibold text-[#0A192F] dark:text-white">{label}</span>
    </div>
  );
}

function getFactCounters(tab: ExpertiseTabConfig): Array<{ target: number; label: string }> {
  if (tab.id !== 'lightning' || !tab.steps) return [];
  const counters: Array<{ target: number; label: string }> = [];

  const systemStep = tab.steps.find((s) => s.id === 'system-types');
  const conventionalSub = systemStep?.subTabs?.find((st) => st.id === 'conventional');
  const rollingLevels = conventionalSub?.methodologies?.[0]?.table?.rows.length;
  if (rollingLevels) {
    counters.push({ target: rollingLevels, label: 'Protection Levels' });
  }

  const componentsCount = tab.steps.find((s) => s.id === 'engineered-network')?.cards?.length;
  if (componentsCount) {
    counters.push({ target: componentsCount, label: 'System Components' });
  }

  const functionsCount = tab.steps.find((s) => s.id === 'functionality')?.cards?.length;
  if (functionsCount) {
    counters.push({ target: functionsCount, label: 'Core Functions' });
  }

  return counters;
}

function EmptyStateIcon({ id }: { id: ExpertiseTabId }) {
  if (id === 'gym') return <Dumbbell className="w-8 h-8" aria-hidden="true" />;
  return <FlaskConical className="w-8 h-8" aria-hidden="true" />;
}

export default function ExpertisePanel({ tab }: ExpertisePanelProps) {
  const { openProductModal } = useEnquiryModal();
  const stepperRef = useRef<HTMLDivElement>(null);
  const railMeasureRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const stepSectionRefs = useRef<Array<HTMLElement | null>>([]);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [railMetrics, setRailMetrics] = useState<{
    left: number;
    top: number;
    height: number;
    ready: boolean;
  }>({ left: 0, top: 0, height: 0, ready: false });

  // Measure exact 3px vertical track coordinates across all step bands
  useLayoutEffect(() => {
    if (!tab.steps || tab.steps.length === 0) return;

    const measureRail = () => {
      const container = railMeasureRef.current;
      const firstNode = nodeRefs.current[0];
      const lastNode = nodeRefs.current[tab.steps!.length - 1];
      if (!container || !firstNode || !lastNode) return;

      const cRect = container.getBoundingClientRect();
      const fRect = firstNode.getBoundingClientRect();
      const lRect = lastNode.getBoundingClientRect();

      const centerX = fRect.left - cRect.left + fRect.width / 2 - 1.5;
      const startY = fRect.top - cRect.top + fRect.height / 2;
      const endY = lRect.top - cRect.top + lRect.height / 2;

      setRailMetrics({
        left: centerX,
        top: startY,
        height: Math.max(0, endY - startY),
        ready: true,
      });
    };

    measureRail();
    const ro = new ResizeObserver(measureRail);
    if (stepperRef.current) ro.observe(stepperRef.current);
    window.addEventListener('resize', measureRail, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureRail);
    };
  }, [tab.id, tab.steps]);

  // Track scroll progress along full stepper height + active step highlight
  useEffect(() => {
    if (!tab.steps || tab.steps.length === 0) return;

    let rafId: number | null = null;

    const updateScrollState = () => {
      rafId = null;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setScrollProgress(1);
      } else if (railMeasureRef.current && railMetrics.height > 0) {
        const cRect = railMeasureRef.current.getBoundingClientRect();
        const railTopViewport = cRect.top + railMetrics.top;
        const triggerY = window.innerHeight * 0.58;
        const raw = (triggerY - railTopViewport) / railMetrics.height;
        setScrollProgress(Math.max(0, Math.min(1, raw)));
      }

      // Highlight the step currently closest to top reading zone
      const readingLine = window.innerHeight * 0.36;
      let currentIdx = 0;
      for (let i = 0; i < stepSectionRefs.current.length; i++) {
        const sec = stepSectionRefs.current[i];
        if (!sec) continue;
        if (sec.getBoundingClientRect().top <= readingLine) {
          currentIdx = i;
        }
      }
      setActiveStepIndex(currentIdx);
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateScrollState);
      }
    };

    rafId = window.requestAnimationFrame(updateScrollState);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [tab.id, tab.steps, railMetrics.height, railMetrics.top]);

  const scrollToStep = (index: number) => {
    const el = stepSectionRefs.current[index];
    if (!el) return;
    const header = document.querySelector('header');
    const headerH = header ? Math.ceil(header.getBoundingClientRect().height) : 106;
    const stickyBarOffset = 68;
    const y = window.scrollY + el.getBoundingClientRect().top - (headerH + stickyBarOffset);
    window.scrollTo({
      top: Math.max(0, y),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  const handleOpenEnquiry = () => {
    openProductModal({
      categoryCode: tab.id.toUpperCase(),
      categoryTitle: `${tab.label} Equipment & Solutions`,
    });
  };

  const hasSteps = Boolean(tab.steps && tab.steps.length > 0);
  const factCounters = getFactCounters(tab);

  return (
    <div
      id="expertise-tabpanel"
      role="tabpanel"
      aria-labelledby={`expertise-tab-${tab.id}`}
      tabIndex={0}
      className="expertise-panel-enter focus:outline-none"
    >
      {/* 1. PANEL INTRO + AUTHORITY STRIP + COUNTERS */}
      <div className="relative bg-white dark:bg-[#050608] overflow-hidden">
        {/* Desktop decorative soft brand-tint radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute -top-20 left-1/4 -translate-x-1/2 w-[680px] h-[340px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(11,101,179,0.09)_0%,rgba(141,198,63,0.06)_48%,transparent_75%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(11,101,179,0.18)_0%,rgba(141,198,63,0.08)_50%,transparent_75%)]"
        />

        <div className="relative z-10 max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 space-y-6">
          <div className="max-w-4xl space-y-3.5">
            <div className="inline-flex items-center gap-2.5 text-xs font-bold text-[#5B8C1E] dark:text-[#8DC63F] uppercase tracking-[0.14em]">
              <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
              <span>{tab.eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#0A192F] dark:text-white leading-[1.15] tracking-[-0.02em]">
              {tab.heading}
            </h2>

            {tab.description && (
              <p className="text-[15px] sm:text-base font-normal text-[#334155] dark:text-[#CBD5E1] leading-[1.6] max-w-3xl">
                {tab.description}
              </p>
            )}
          </div>

          {/* Fact Counters (only where directly verified from source structure) */}
          {hasSteps && factCounters.length > 0 && (
            <div className="pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl">
                {factCounters.map((stat) => (
                  <CountUpStat key={stat.label} target={stat.target} label={stat.label} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. EMPTY STATE (Gym / Laboratory) */}
      {tab.emptyState && (
        <div className="bg-[#F4F8FC] dark:bg-[#090E17] border-t border-slate-200/80 dark:border-white/[0.06] py-14 sm:py-20">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="expertise-card max-w-xl mx-auto p-10 sm:p-14 text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl mx-auto bg-[#0B65B3]/10 dark:bg-[#0B65B3]/20 border border-[#0B65B3]/20 dark:border-[#0B65B3]/35 flex items-center justify-center text-[#0B65B3] dark:text-[#8DC63F]">
                <EmptyStateIcon id={tab.id} />
              </div>
              <h3 className="text-2xl font-bold text-[#0A192F] dark:text-white">
                {tab.emptyState.title}
              </h3>
              <p className="text-[15px] sm:text-base font-normal text-[#475569] dark:text-[#A9B4C0] leading-[1.6]">
                {tab.emptyState.message}
              </p>
              <div className="pt-2 flex justify-center">
                <LightningButton
                  variant="primary"
                  size="md"
                  onClick={handleOpenEnquiry}
                  className="expertise-btn-lift"
                  iconRight={<ArrowRight className="w-4 h-4 text-[#8DC63F]" />}
                >
                  {tab.emptyState.ctaLabel}
                </LightningButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. FULL-WIDTH ALTERNATING STEPPER WITH STICKY INDEX & CONTINUOUS 3PX GRADIENT RAIL */}
      {hasSteps && tab.steps && (
        <div ref={stepperRef} className="relative">
          {/* Desktop Sticky Mini Progress Step Index */}
          <div className="pointer-events-none hidden lg:block absolute inset-0 z-20">
            <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 h-full">
              <aside
                aria-label="Step index"
                className="pointer-events-auto sticky top-[178px] w-[204px] py-12"
              >
                <div className="rounded-2xl bg-white/95 dark:bg-[#0D1117]/95 backdrop-blur-md border border-slate-200/90 dark:border-white/10 p-3.5 shadow-[0_8px_24px_-8px_rgba(10,25,47,0.12)]">
                  <span className="block px-2.5 pb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#5B8C1E] dark:text-[#8DC63F]">
                    On this guide
                  </span>
                  <nav aria-label="Steps">
                    <ul className="space-y-1">
                      {tab.steps.map((step, idx) => {
                        const isActive = activeStepIndex === idx;
                        return (
                          <li key={step.id}>
                            <button
                              type="button"
                              onClick={() => scrollToStep(idx)}
                              aria-current={isActive ? 'step' : undefined}
                              className={`w-full text-left px-2.5 py-2 rounded-xl text-xs leading-snug flex items-start gap-2 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] cursor-pointer ${
                                isActive
                                  ? 'bg-[#0B65B3]/10 dark:bg-[#0B65B3]/25 text-[#0B65B3] dark:text-[#8DC63F] font-semibold'
                                  : 'text-[#334155] dark:text-[#A9B4C0] hover:bg-slate-100 hover:text-[#0A192F] dark:hover:bg-white/[0.05] dark:hover:text-white font-medium'
                              }`}
                            >
                              <span className="tabular-nums shrink-0 font-mono text-[11px] mt-0.5">
                                {String(step.stepNumber).padStart(2, '0')}
                              </span>
                              <span className="line-clamp-2">{step.title}</span>
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

          {/* Continuous 3px Vertical Track spanning full height of stepper */}
          <div className="pointer-events-none absolute inset-0 z-10" aria-hidden="true">
            <div
              ref={railMeasureRef}
              className="relative max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 h-full"
            >
              {railMetrics.ready && railMetrics.height > 0 && (
                <div
                  className="absolute w-[3px] rounded-full bg-[#0B65B3]/15 dark:bg-white/10 overflow-hidden"
                  style={{
                    left: `${railMetrics.left}px`,
                    top: `${railMetrics.top}px`,
                    height: `${railMetrics.height}px`,
                  }}
                >
                  <div
                    className="w-full h-full bg-gradient-to-b from-[#8DC63F] to-[#0B65B3] origin-top transition-transform duration-150 ease-out motion-reduce:transition-none"
                    style={{ transform: `scaleY(${scrollProgress})` }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Alternating Step Bands */}
          {tab.steps.map((step, index) => {
            const isDarkBand = DARK_BAND_STEP_IDS.has(step.id);
            const isTintedBand = !isDarkBand && index % 2 === 1;
            const isActiveNode = activeStepIndex === index;
            const isPassedOrActive = index <= activeStepIndex;

            const bandClass = isDarkBand
              ? 'expertise-navy-band bg-[#0A192F] dark:bg-[#071122] text-white border-t border-white/10'
              : isTintedBand
              ? 'bg-[#F4F8FC] dark:bg-[#090E17] border-t border-slate-200/80 dark:border-white/[0.06]'
              : 'bg-white dark:bg-[#050608] border-t border-slate-200/80 dark:border-white/[0.06]';

            return (
              <section
                key={step.id}
                ref={(el) => {
                  stepSectionRefs.current[index] = el;
                }}
                id={`step-${step.id}`}
                data-preserve-contrast={isDarkBand ? 'true' : undefined}
                className={`w-full ${bandClass}`}
              >
                <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                  <div className="lg:pl-[228px] flex items-start gap-4 sm:gap-6">
                    {/* 44px Circular Step Node */}
                    <div
                      ref={(el) => {
                        nodeRefs.current[index] = el;
                      }}
                      data-preserve-contrast={isPassedOrActive || isDarkBand ? 'true' : undefined}
                      className={`relative z-20 mt-1 w-11 h-11 rounded-full border-2 flex items-center justify-center text-sm font-bold tabular-nums shrink-0 transition-all duration-200 ${
                        isPassedOrActive
                          ? `bg-[#0B65B3] border-[#0B65B3] text-white ${
                              isActiveNode ? 'expertise-node-active' : ''
                            }`
                          : isDarkBand
                          ? 'bg-[#0A192F] border-white/35 text-white'
                          : 'bg-white dark:bg-[#0D1117] border-[#0B65B3]/40 text-[#0A192F] dark:text-white'
                      }`}
                      aria-hidden="true"
                    >
                      {String(step.stepNumber).padStart(2, '0')}
                    </div>

                    {/* Full-Width Step Content */}
                    <div className="flex-1 min-w-0">
                      <StepCard step={step} index={index} isDarkBand={isDarkBand} />
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* 4. CLOSING CTA CARD (Full container width, brand-blue gradient, shown after stepped panels) */}
      {hasSteps && (
        <div className="bg-white dark:bg-[#050608] border-t border-slate-200/80 dark:border-white/[0.06]">
          <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div
              data-preserve-contrast="true"
              className="expertise-navy-band relative overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#0A192F_0%,#0B65B3_65%,#095292_100%)] border border-[#8DC63F]/30 p-8 sm:p-10 lg:p-12 shadow-[0_20px_45px_-12px_rgba(11,101,179,0.35)]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
                <div className="space-y-3 max-w-2xl">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-[#8DC63F]">
                    <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
                    <span>Get in touch</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-[1.2] tracking-[-0.02em]">
                    Tell Us About Your Project
                  </h3>
                  <p className="text-[15px] sm:text-base font-normal text-white/90 leading-[1.6]">
                    Call us or send an enquiry, and our team will get back to you.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
                  <LightningButton
                    variant="primary"
                    size="lg"
                    onClick={handleOpenEnquiry}
                    className="expertise-btn-lift"
                    iconRight={<ArrowRight className="w-4 h-4 text-[#8DC63F]" />}
                  >
                    Send Enquiry
                  </LightningButton>

                  <LightningButton
                    variant="secondary"
                    size="lg"
                    href="tel:+97172042763"
                    className="expertise-btn-lift"
                    iconLeft={<Phone className="w-4 h-4 text-[#8DC63F]" />}
                  >
                    Call Now
                  </LightningButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

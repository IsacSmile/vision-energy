'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import type { ExpertiseImage, ExpertiseStep, SubTabPanel } from '@/lib/data/expertise';
import InfoCard from './InfoCard';
import DataTable from './DataTable';
import SubTabs from './SubTabs';

interface StepCardProps {
  step: ExpertiseStep;
  index: number;
}

function StepFigure({ image, compact = false }: { image: ExpertiseImage; compact?: boolean }) {
  const frameBg =
    image.surface === 'dark'
      ? 'bg-[#0A101D]'
      : image.surface === 'light'
      ? 'bg-white'
      : 'bg-slate-50 dark:bg-[#050608]';

  return (
    <figure className="group space-y-2">
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-slate-200/80 dark:border-white/10 ${frameBg} ${
          image.surface === 'photo' ? '' : compact ? 'p-2 sm:p-3' : 'p-2.5 sm:p-4'
        }`}
        style={{ aspectRatio: `${image.width} / ${image.height}` }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          unoptimized
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 100vw, 720px"
          className={`expertise-card-img w-full h-full ${
            image.surface === 'photo' ? 'object-cover' : 'object-contain'
          }`}
        />
      </div>
      {image.caption && (
        <figcaption className="text-xs font-normal text-slate-500 dark:text-[#A9B4C0] leading-relaxed">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function SubTabContent({ stepId, panel }: { stepId: string; panel: SubTabPanel }) {
  return (
    <div
      key={panel.id}
      id={`${stepId}-subpanel`}
      role="tabpanel"
      aria-labelledby={`${stepId}-subtab-${panel.id}`}
      className="expertise-panel-enter space-y-6 pt-2"
    >
      {panel.paragraphs && panel.paragraphs.length > 0 && (
        <div className="space-y-3">
          {panel.paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-sm sm:text-base font-normal text-slate-600 dark:text-[#CBD5E1] leading-relaxed"
            >
              {p}
            </p>
          ))}
        </div>
      )}

      {panel.images && panel.images.length > 0 && (
        <div
          className={`grid gap-4 ${
            panel.images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-3xl'
          }`}
        >
          {panel.images.map((img, i) => (
            <StepFigure key={i} image={img} />
          ))}
        </div>
      )}

      {panel.formulaBlock && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#050608]/60 p-4 sm:p-5">
          {panel.methodologies?.[0]?.images?.[0] && (
            <div className="lg:col-span-5">
              <StepFigure image={panel.methodologies[0].images[0]} compact />
            </div>
          )}

          <div
            className={`${
              panel.methodologies?.[0]?.images?.[0] ? 'lg:col-span-7' : 'lg:col-span-12'
            } space-y-4`}
          >
            {panel.formulaBlock.title && (
              <h4 className="text-base font-semibold text-[#0F172A] dark:text-white">
                {panel.formulaBlock.title}
              </h4>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {panel.formulaBlock.formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1117] p-3 space-y-1"
                >
                  {f.condition && (
                    <span className="block text-xs font-normal text-[#5B8C1E] dark:text-[#8DC63F]">
                      {f.condition}
                    </span>
                  )}
                  <code className="block text-xs sm:text-sm font-semibold text-[#0F172A] dark:text-white font-mono break-words">
                    {f.expression}
                  </code>
                </div>
              ))}
            </div>

            {panel.formulaBlock.notes && (
              <ul className="space-y-1.5 text-xs sm:text-sm font-normal text-slate-600 dark:text-[#A9B4C0]">
                {panel.formulaBlock.notes.map((note, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {panel.methodologies && !panel.formulaBlock && (
        <div className="space-y-6">
          {panel.methodologies.map((method) => (
            <div
              key={method.id}
              className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-[#050608]/50 p-4 sm:p-6 space-y-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-base sm:text-lg font-semibold text-[#0F172A] dark:text-white">
                  {method.title}
                </h4>
                {method.formula && (
                  <code className="text-xs sm:text-sm font-semibold font-mono text-[#0B65B3] dark:text-[#8DC63F] bg-white dark:bg-[#0D1117] px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/10">
                    {method.formula}
                  </code>
                )}
              </div>

              {method.paragraphs && (
                <div className="space-y-2">
                  {method.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm font-normal text-slate-600 dark:text-[#CBD5E1] leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}

              {method.images && method.images.length > 0 && (
                <div
                  className={`grid gap-4 items-center ${
                    method.images.length > 1
                      ? 'grid-cols-1 md:grid-cols-2'
                      : 'grid-cols-1 max-w-md'
                  }`}
                >
                  {method.images.map((img, idx) => (
                    <StepFigure key={idx} image={img} compact />
                  ))}
                </div>
              )}

              {method.table && <DataTable table={method.table} />}
            </div>
          ))}
        </div>
      )}

      {panel.tables && panel.tables.length > 0 && (
        <div className="space-y-4">
          {panel.tables.map((table) => (
            <DataTable key={table.id} table={table} />
          ))}
        </div>
      )}

      {panel.iconItems && panel.iconItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {panel.iconItems.map((item) => (
            <InfoCard key={item.id} item={item} variant="icon" />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StepCard({ step, index }: StepCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [activeSubTabId, setActiveSubTabId] = useState<string>(step.subTabs?.[0]?.id || '');

  useEffect(() => {
    let rafId: number | null = null;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      rafId = window.requestAnimationFrame(() => setRevealed(true));
      return () => {
        if (rafId !== null) window.cancelAnimationFrame(rafId);
      };
    }

    const el = cardRef.current;
    if (!el) {
      rafId = window.requestAnimationFrame(() => setRevealed(true));
      return () => {
        if (rafId !== null) window.cancelAnimationFrame(rafId);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );

    observer.observe(el);
    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  const activeSubTab = step.subTabs?.find((st) => st.id === activeSubTabId) || step.subTabs?.[0];
  const cardGridClass =
    step.cardColumns === 2
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-4'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

  return (
    <article
      ref={cardRef}
      id={`step-${step.id}`}
      className={`expertise-step-reveal expertise-card p-5 sm:p-7 lg:p-8 space-y-5 ${
        revealed ? 'is-revealed' : ''
      }`}
      style={{ transitionDelay: `${Math.min(index * 60, 240)}ms` }}
    >
      {/* Header */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-semibold text-[#0F172A] dark:text-white tracking-tight leading-snug">
          {step.title}
        </h3>
        {step.intro && (
          <p className="text-sm sm:text-base font-normal text-slate-600 dark:text-[#CBD5E1] leading-relaxed max-w-4xl">
            {step.intro}
          </p>
        )}
      </div>

      {/* Extra Paragraphs */}
      {step.paragraphs && step.paragraphs.length > 0 && (
        <div className="space-y-3 max-w-4xl">
          {step.paragraphs.map((paragraph, pIdx) => (
            <p
              key={pIdx}
              className="text-sm sm:text-base font-normal text-slate-600 dark:text-[#A9B4C0] leading-relaxed"
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* Checklist */}
      {step.checklist && step.checklist.length > 0 && (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          {step.checklist.map((item, cIdx) => (
            <li
              key={cIdx}
              className="flex items-start gap-3 rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-white/[0.02] p-3.5"
            >
              <span className="mt-0.5 w-5 h-5 rounded-full bg-[#8DC63F]/15 text-[#5B8C1E] dark:text-[#8DC63F] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
              </span>
              <span className="text-xs sm:text-sm font-normal text-slate-700 dark:text-[#CBD5E1] leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Step Cards Grid (max 3 per row) */}
      {step.cards && step.cards.length > 0 && (
        <div className={cardGridClass}>
          {step.cards.map((card) => (
            <InfoCard key={card.id} item={card} />
          ))}
        </div>
      )}

      {/* Step Figures / Diagrams */}
      {step.images && step.images.length > 0 && (
        <div
          className={`grid gap-4 ${
            step.images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-3xl'
          }`}
        >
          {step.images.map((image, iIdx) => (
            <StepFigure key={iIdx} image={image} />
          ))}
        </div>
      )}

      {/* Sub-Tabs */}
      {step.subTabs && step.subTabs.length > 0 && activeSubTab && (
        <div className="space-y-4 pt-1">
          <SubTabs
            idPrefix={`step-${step.id}`}
            ariaLabel={`${step.title} views`}
            items={step.subTabs}
            activeId={activeSubTab.id}
            onChange={setActiveSubTabId}
          />
          <SubTabContent stepId={`step-${step.id}`} panel={activeSubTab} />
        </div>
      )}
    </article>
  );
}

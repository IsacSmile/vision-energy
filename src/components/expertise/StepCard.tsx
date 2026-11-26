'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Check } from 'lucide-react';
import type {
  ExpertiseImage,
  ExpertiseStep,
  MethodologyBlock,
  SubTabPanel,
} from '@/lib/data/expertise';
import InfoCard from './InfoCard';
import DataTable from './DataTable';
import SubTabs from './SubTabs';

interface StepCardProps {
  step: ExpertiseStep;
  index: number;
  isDarkBand?: boolean;
}

function isLoudGreenDiagram(src: string) {
  return src.includes('rolling-sphere-diagram') || src.includes('protection-angle-cone');
}

function FramedDiagram({ image, compact = false }: { image: ExpertiseImage; compact?: boolean }) {
  const needsNeutralFrame = isLoudGreenDiagram(image.src);
  const outerFrameBg =
    image.surface === 'dark'
      ? 'bg-[#0A101D] border-white/15'
      : 'bg-[#F4F8FC] dark:bg-[#0D1420] border-[#0B65B3]/15 dark:border-white/10';

  return (
    <figure className="group space-y-2.5">
      <div
        className={`relative w-full overflow-hidden rounded-2xl border ${outerFrameBg} ${
          compact ? 'p-3 sm:p-4' : 'p-4 sm:p-5'
        }`}
      >
        {needsNeutralFrame ? (
          <div
            className="mx-auto max-w-[320px] rounded-xl bg-slate-100/95 dark:bg-[#131924] p-3.5 border border-slate-200 dark:border-white/10 shadow-[inset_0_2px_8px_rgba(15,23,42,0.08)]"
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
              sizes="(max-width: 768px) 100vw, 360px"
              className="expertise-card-img w-full h-full object-contain rounded-lg"
            />
          </div>
        ) : (
          <div
            className="relative w-full overflow-hidden rounded-xl"
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
              sizes="(max-width: 768px) 100vw, 680px"
              className={`expertise-card-img w-full h-full ${
                image.surface === 'photo' ? 'object-cover' : 'object-contain'
              }`}
            />
          </div>
        )}
      </div>
      {image.caption && (
        <figcaption className="text-[13px] font-normal text-slate-600 dark:text-[#A9B4C0] leading-relaxed px-1">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}

function FormulaChip({ condition, expression }: { condition?: string; expression: string }) {
  return (
    <div className="bg-[#0B65B3]/[0.06] dark:bg-[#0B65B3]/15 border-l-4 border-[#0B65B3] px-4 py-2.5 rounded-r-xl space-y-0.5">
      {condition && (
        <span className="block text-xs font-semibold text-[#5B8C1E] dark:text-[#8DC63F]">
          {condition}
        </span>
      )}
      <code className="block text-sm sm:text-[15px] font-semibold font-mono text-[#0A192F] dark:text-white break-words">
        {expression}
      </code>
    </div>
  );
}

function TwoColumnMethodology({ method }: { method: MethodologyBlock }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0D1117] p-5 sm:p-7 shadow-[0_4px_18px_-6px_rgba(10,25,47,0.08)]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {method.images && method.images.length > 0 && (
          <div className="lg:col-span-5 space-y-4">
            {method.images.map((img, idx) => (
              <FramedDiagram key={idx} image={img} compact />
            ))}
          </div>
        )}

        <div
          className={`${
            method.images && method.images.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'
          } space-y-4`}
        >
          <h4 className="text-xl sm:text-2xl font-bold text-[#0A192F] dark:text-white tracking-tight">
            {method.title}
          </h4>

          {method.paragraphs && (
            <div className="space-y-2.5">
              {method.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-[15px] sm:text-base font-normal text-[#334155] dark:text-[#CBD5E1] leading-[1.6]"
                >
                  {p}
                </p>
              ))}
            </div>
          )}

          {method.formula && <FormulaChip expression={method.formula} />}

          {method.table && (
            <div className="pt-1">
              <DataTable table={method.table} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SubTabContent({
  stepId,
  panel,
  isDarkBand = false,
}: {
  stepId: string;
  panel: SubTabPanel;
  isDarkBand?: boolean;
}) {
  const isEsePanel = panel.id === 'ese';

  return (
    <div
      key={panel.id}
      id={`${stepId}-subpanel`}
      role="tabpanel"
      aria-labelledby={`${stepId}-subtab-${panel.id}`}
      className="expertise-panel-enter space-y-6 pt-3"
    >
      {/* ESE two-column intro + visual architecture */}
      {isEsePanel && panel.paragraphs && panel.images && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0D1117] p-5 sm:p-7 shadow-[0_4px_18px_-6px_rgba(10,25,47,0.08)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-6 space-y-4">
                {panel.images[0] && <FramedDiagram image={panel.images[0]} compact />}
                {panel.images[1] && <FramedDiagram image={panel.images[1]} compact />}
              </div>
              <div className="lg:col-span-6 space-y-4">
                <h4 className="text-xl sm:text-2xl font-bold text-[#0A192F] dark:text-white tracking-tight">
                  Early Streamer Emission (ESE) Concept
                </h4>
                {panel.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[15px] sm:text-base font-normal text-[#334155] dark:text-[#CBD5E1] leading-[1.6]"
                  >
                    {p}
                  </p>
                ))}
                {panel.images[2] && (
                  <div className="pt-2">
                    <FramedDiagram image={panel.images[2]} compact />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Non-ESE standard sub-tab intro & images (Conventional overview / Comparison) */}
      {!isEsePanel && panel.paragraphs && panel.paragraphs.length > 0 && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0D1117] p-5 sm:p-7 shadow-[0_4px_18px_-6px_rgba(10,25,47,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            {panel.images?.[0] && (
              <div className="lg:col-span-6">
                <FramedDiagram image={panel.images[0]} compact />
              </div>
            )}
            <div
              className={`${
                panel.images?.[0] ? 'lg:col-span-6' : 'lg:col-span-12'
              } space-y-3`}
            >
              {panel.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-[15px] sm:text-base font-normal leading-[1.6] ${
                    isDarkBand ? 'text-slate-200' : 'text-[#334155] dark:text-[#CBD5E1]'
                  }`}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      )}

      {!isEsePanel && (!panel.paragraphs || panel.paragraphs.length === 0) && panel.images && panel.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {panel.images.map((img, i) => (
            <FramedDiagram key={i} image={img} compact />
          ))}
        </div>
      )}

      {/* ESE two-column Protection Radius diagram + Formula chips */}
      {panel.formulaBlock && (
        <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0D1117] p-5 sm:p-7 shadow-[0_4px_18px_-6px_rgba(10,25,47,0.08)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {panel.methodologies?.[0]?.images?.[0] && (
              <div className="lg:col-span-5">
                <FramedDiagram image={panel.methodologies[0].images[0]} compact />
              </div>
            )}

            <div
              className={`${
                panel.methodologies?.[0]?.images?.[0] ? 'lg:col-span-7' : 'lg:col-span-12'
              } space-y-4`}
            >
              {panel.formulaBlock.title && (
                <h4 className="text-xl sm:text-2xl font-bold text-[#0A192F] dark:text-white tracking-tight">
                  {panel.formulaBlock.title}
                </h4>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {panel.formulaBlock.formulas.map((f, idx) => (
                  <FormulaChip key={idx} condition={f.condition} expression={f.expression} />
                ))}
              </div>

              {panel.formulaBlock.notes && (
                <ul className="space-y-2 text-[15px] font-normal text-[#334155] dark:text-[#CBD5E1]">
                  {panel.formulaBlock.notes.map((note, idx) => (
                    <li key={idx} className="leading-[1.6]">
                      {note}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Conventional two-column methodologies */}
      {panel.methodologies && !panel.formulaBlock && (
        <div className="space-y-6">
          {panel.methodologies.map((method) => (
            <TwoColumnMethodology key={method.id} method={method} />
          ))}
        </div>
      )}

      {/* Standalone tables */}
      {panel.tables && panel.tables.length > 0 && (
        <div className="space-y-5">
          {panel.tables.map((table) => (
            <DataTable key={table.id} table={table} />
          ))}
        </div>
      )}

      {/* Safety Icon Cards (Step 9) */}
      {panel.iconItems && panel.iconItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {panel.iconItems.map((item) => (
            <InfoCard key={item.id} item={item} variant="icon" />
          ))}
        </div>
      )}
    </div>
  );
}

export default function StepCard({ step, index, isDarkBand = false }: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
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
      { threshold: 0.06, rootMargin: '0px 0px -20px 0px' }
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
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-5'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5';

  const isBlueCards = step.id === 'functionality';
  const hasTwoColumnChecklist = Boolean(step.checklist?.length && step.images?.length === 1);
  const stepNumStr = String(step.stepNumber).padStart(2, '0');

  return (
    <div
      ref={cardRef}
      className={`expertise-step-reveal space-y-6 ${revealed ? 'is-revealed' : ''}`}
      style={{ transitionDelay: `${Math.min(index * 80, 320)}ms` }}
    >
      {/* Unboxed Step Heading with Big Faint Watermark Step Number */}
      <div className="relative pt-2 space-y-3">
        <span
          aria-hidden="true"
          className="expertise-watermark pointer-events-none select-none block font-extrabold text-[64px] sm:text-[84px] leading-none tracking-tighter tabular-nums -mb-4 sm:-mb-5"
        >
          {stepNumStr}
        </span>

        <h3
          className={`relative z-10 text-[26px] sm:text-[30px] lg:text-[32px] font-bold tracking-[-0.02em] leading-[1.2] ${
            isDarkBand ? 'text-white' : 'text-[#0A192F] dark:text-white'
          }`}
        >
          {step.title}
        </h3>

        {step.intro && (
          <p
            className={`relative z-10 text-[15px] sm:text-base font-normal leading-[1.6] max-w-4xl ${
              isDarkBand ? 'text-slate-200' : 'text-[#334155] dark:text-[#CBD5E1]'
            }`}
          >
            {step.intro}
          </p>
        )}
      </div>

      {/* Additional Paragraphs */}
      {step.paragraphs && step.paragraphs.length > 0 && !hasTwoColumnChecklist && (
        <div className="space-y-3 max-w-4xl">
          {step.paragraphs.map((paragraph, pIdx) => (
            <p
              key={pIdx}
              className={`text-[15px] sm:text-base font-normal leading-[1.6] ${
                isDarkBand ? 'text-slate-300' : 'text-[#475569] dark:text-[#A9B4C0]'
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {/* Two-Column Protection Levels Chart + Pill Checklist (Step 6) */}
      {hasTwoColumnChecklist && step.images?.[0] && step.checklist && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pt-1">
          <div className="lg:col-span-6">
            <FramedDiagram image={step.images[0]} />
          </div>

          <div className="lg:col-span-6 space-y-4">
            <ul className="space-y-2.5">
              {step.checklist.map((item, cIdx) => (
                <li
                  key={cIdx}
                  className="flex items-start gap-3 rounded-2xl sm:rounded-full border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0D1117] px-4 py-3 shadow-[0_2px_8px_-4px_rgba(10,25,47,0.06)] hover:-translate-y-0.5 hover:border-[#8DC63F] motion-reduce:hover:translate-y-0 transition-all duration-200"
                >
                  <span
                    data-preserve-contrast="true"
                    className="mt-0.5 w-6 h-6 rounded-full bg-[#8DC63F] text-white flex items-center justify-center shrink-0"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] font-normal text-[#334155] dark:text-[#CBD5E1] leading-[1.6]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {step.paragraphs && step.paragraphs.length > 0 && (
              <div className="space-y-2 pt-1">
                {step.paragraphs.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-[15px] font-normal text-[#475569] dark:text-[#A9B4C0] leading-[1.6]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Cards Grid (MediaCards & InfoCards, max 3 per row) */}
      {step.cards && step.cards.length > 0 && (
        <div className={cardGridClass}>
          {step.cards.map((card) => (
            <InfoCard
              key={card.id}
              item={card}
              accentTone={isBlueCards ? 'blue' : 'green'}
            />
          ))}
        </div>
      )}

      {/* Standalone Step Diagrams (e.g. Earthing steps 1-5) */}
      {!hasTwoColumnChecklist && step.images && step.images.length > 0 && (
        <div
          className={`grid gap-5 ${
            step.images.length > 1 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 max-w-4xl'
          }`}
        >
          {step.images.map((image, iIdx) => (
            <FramedDiagram key={iIdx} image={image} />
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
            tone={isDarkBand ? 'navy' : 'light'}
          />
          <SubTabContent
            stepId={`step-${step.id}`}
            panel={activeSubTab}
            isDarkBand={isDarkBand}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  Activity,
  ArrowDownToLine,
  Award,
  BadgeCheck,
  Building2,
  Check,
  ChevronRight,
  ClipboardCheck,
  CloudLightning,
  Compass,
  Cpu,
  DraftingCompass,
  FileCheck,
  FileText,
  Flame,
  FolderSearch,
  GitMerge,
  HardHat,
  HeartPulse,
  Landmark,
  MapPin,
  PawPrint,
  Radar,
  Server,
  Shield,
  ShieldCheck,
  Target,
  TrendingDown,
  Users,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import type {
  ExpertiseImage,
  ExpertiseStep,
  MethodologyBlock,
  ProcessFlowConfig,
  ProcessFlowStage,
  StandardsReferenceConfig,
  StepCardItem,
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

function StandardsReferenceShowcase({ config }: { config: StandardsReferenceConfig }) {
  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0D1117] shadow-[0_6px_24px_-8px_rgba(10,25,47,0.1)] dark:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Dark Navy Feature Header Strip */}
      <div
        data-preserve-contrast="true"
        className="expertise-navy-band relative overflow-hidden bg-[linear-gradient(135deg,#0A192F_0%,#0E2546_65%,#0B65B3_135%)] px-6 py-5 sm:px-7 sm:py-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 right-12 w-44 h-44 rounded-full bg-[#8DC63F]/15 blur-2xl"
        />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#8DC63F]/15 border border-[#8DC63F]/35 text-[#8DC63F] flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <ShieldCheck className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-[0.06em] text-white leading-tight">
              {config.heading}
            </h4>
            <p className="text-sm sm:text-[15px] font-normal text-slate-200 leading-snug mt-0.5">
              {config.subheading}
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative z-10 hidden sm:flex items-center gap-1.5 shrink-0"
        >
          {config.blocks.map((block, i) => (
            <span
              key={block.id}
              className={`h-1.5 rounded-full ${
                i % 2 === 0 ? 'w-5 bg-[#8DC63F]' : 'w-3 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* 2x2 Standard Body Reference Grid & Criteria Footnote */}
      <div className="p-5 sm:p-6 lg:p-7 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-stretch">
          {config.blocks.map((block, idx) => {
            const isBlue = idx % 2 === 0;
            return (
              <article
                key={block.id}
                className={`expertise-card ${isBlue ? 'accent-blue' : ''} group p-5 sm:p-6 flex flex-col justify-between gap-4 h-full`}
              >
                <div className="flex items-start gap-4 pb-4 border-b border-slate-100 dark:border-white/[0.08]">
                  <span
                    data-preserve-contrast="true"
                    className={`shrink-0 min-w-[74px] text-center font-mono text-xs sm:text-[13px] font-bold tracking-wider px-3 py-2 rounded-xl shadow-sm ${
                      isBlue
                        ? 'bg-[#0B65B3] text-white'
                        : 'bg-[#0A192F] dark:bg-[#13233A] border border-[#8DC63F]/45'
                    }`}
                  >
                    <span className={isBlue ? 'text-white' : 'text-[#8DC63F]'}>{block.badge}</span>
                  </span>

                  <ul className="space-y-1 flex-1 min-w-0">
                    {block.codes.map((code) => (
                      <li
                        key={code}
                        className="text-[15px] sm:text-base font-bold font-mono text-[#0A192F] dark:text-white tracking-tight leading-snug"
                      >
                        {code}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-[14px] sm:text-[14.5px] font-normal text-[#475569] dark:text-[#CBD5E1] leading-[1.55]">
                  {block.description}
                </p>
              </article>
            );
          })}
        </div>

        {config.footnote && (
          <div className="rounded-xl bg-[#F4F8FC] dark:bg-[#090F1A] border border-slate-200/80 dark:border-white/10 border-l-4 border-l-[#0B65B3] px-4 sm:px-5 py-3.5 flex items-start sm:items-center gap-3">
            <ShieldCheck
              className="w-4 h-4 text-[#0B65B3] dark:text-[#8DC63F] shrink-0 mt-0.5 sm:mt-0"
              aria-hidden="true"
            />
            <p className="text-[14px] sm:text-[14.5px] font-medium text-[#334155] dark:text-[#CBD5E1] leading-[1.55]">
              {config.footnote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const PROCESS_FLOW_ICONS: Record<ProcessFlowStage['iconKey'], LucideIcon> = {
  soil: Compass,
  electrode: ArrowDownToLine,
  bonding: GitMerge,
  test: ClipboardCheck,
  incoming: Zap,
  distribution: Server,
  circuit: Cpu,
  enquiry: FileText,
  documents: FolderSearch,
  survey: MapPin,
  earthing: Compass,
  risk: ClipboardCheck,
  design: DraftingCompass,
  approval: BadgeCheck,
  installation: HardHat,
  commissioning: Wrench,
  handover: Award,
};

function ProcessFlowStagesGrid({
  stages,
  layout = 'row',
}: {
  stages: ProcessFlowStage[];
  layout?: 'row' | 'paired';
}) {
  const isPaired = layout === 'paired' || stages.length > 4;

  if (isPaired) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-7 items-stretch">
        {stages.map((stage, idx) => {
          const Icon = PROCESS_FLOW_ICONS[stage.iconKey] || ShieldCheck;
          const isBlue = idx % 2 === 0;
          const hasPairConnector = idx % 2 === 0 && idx < stages.length - 1;

          return (
            <div key={stage.id} className="relative flex flex-col">
              <article
                className={`expertise-card ${isBlue ? 'accent-blue' : ''} group p-4 sm:p-5 flex items-start gap-4 h-full`}
              >
                <div
                  className={`expertise-icon-tile ${
                    isBlue ? 'expertise-icon-tile-blue' : 'expertise-icon-tile-green'
                  } w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    isBlue
                      ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#0B65B3]/20 dark:text-[#60A5FA]'
                      : 'bg-[#8DC63F]/15 text-[#38700D] dark:text-[#8DC63F]'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span
                      className={`font-mono text-xs font-bold tabular-nums px-2 py-0.5 rounded-md shrink-0 ${
                        isBlue
                          ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#0B65B3]/20 dark:text-[#60A5FA]'
                          : 'bg-[#8DC63F]/15 text-[#38700D] dark:text-[#8DC63F]'
                      }`}
                    >
                      {stage.stepCode}
                    </span>
                    <h5 className="text-[15.5px] sm:text-base font-bold text-[#0A192F] dark:text-white leading-snug tracking-tight">
                      {stage.title}
                    </h5>
                  </div>
                  <p className="text-[13.5px] sm:text-sm font-normal text-[#475569] dark:text-[#CBD5E1] leading-[1.55]">
                    {stage.description}
                  </p>
                </div>
              </article>

              {hasPairConnector && (
                <span
                  aria-hidden="true"
                  className="hidden md:flex absolute top-1/2 -right-[26px] -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white dark:bg-[#111827] border border-[#0B65B3]/25 dark:border-white/15 shadow-sm items-center justify-center text-[#0B65B3] dark:text-[#8DC63F]"
                >
                  <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7 items-stretch">
      {stages.map((stage, idx) => {
        const Icon = PROCESS_FLOW_ICONS[stage.iconKey] || ShieldCheck;
        const isBlue = idx % 2 === 0;
        const hasConnector = idx < stages.length - 1;

        return (
          <div key={stage.id} className="relative flex flex-col">
            <article
              className={`expertise-card ${isBlue ? 'accent-blue' : ''} group p-5 flex flex-col justify-between gap-4 h-full`}
            >
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-white/[0.08]">
                <div
                  className={`expertise-icon-tile ${
                    isBlue ? 'expertise-icon-tile-blue' : 'expertise-icon-tile-green'
                  } w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isBlue
                      ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#0B65B3]/20 dark:text-[#60A5FA]'
                      : 'bg-[#8DC63F]/15 text-[#38700D] dark:text-[#8DC63F]'
                  }`}
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>

                <span
                  className={`font-mono text-xs font-bold tabular-nums px-2.5 py-1 rounded-full ${
                    isBlue
                      ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#0B65B3]/20 dark:text-[#60A5FA]'
                      : 'bg-[#8DC63F]/15 text-[#38700D] dark:text-[#8DC63F]'
                  }`}
                >
                  {stage.stepCode}
                </span>
              </div>

              <div className="space-y-1.5 flex-1">
                <h5 className="text-[15.5px] sm:text-base font-bold text-[#0A192F] dark:text-white leading-snug tracking-tight">
                  {stage.title}
                </h5>
                <p className="text-[13.5px] sm:text-sm font-normal text-[#475569] dark:text-[#CBD5E1] leading-[1.55]">
                  {stage.description}
                </p>
              </div>
            </article>

            {hasConnector && (
              <span
                aria-hidden="true"
                className="hidden lg:flex absolute top-1/2 -right-[26px] -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white dark:bg-[#111827] border border-[#0B65B3]/25 dark:border-white/15 shadow-sm items-center justify-center text-[#0B65B3] dark:text-[#8DC63F]"
              >
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function ProcessFlowShowcase({
  processFlow,
  companionImage,
}: {
  processFlow: ProcessFlowConfig;
  companionImage?: ExpertiseImage;
}) {
  if (companionImage) {
    return (
      <div className="space-y-6 pt-1">
        {/* Top Split Bento: Deep Navy Process Brief + Footnote | Companion Engineering Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          <div
            data-preserve-contrast="true"
            className="expertise-navy-band lg:col-span-5 relative overflow-hidden rounded-2xl bg-[linear-gradient(150deg,#0A192F_0%,#0E2546_65%,#0B65B3_135%)] border border-[#8DC63F]/30 p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-[0_14px_34px_-12px_rgba(10,25,47,0.32)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-[#8DC63F]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#8DC63F]/15 blur-2xl"
            />

            <div className="relative z-10 flex items-center justify-between gap-3 pt-1">
              <div className="w-11 h-11 rounded-xl bg-[#8DC63F]/15 border border-[#8DC63F]/35 text-[#8DC63F] flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5" aria-hidden="true" />
              </div>
              <div aria-hidden="true" className="flex items-center gap-1.5">
                {processFlow.stages.map((st, i) => (
                  <span
                    key={st.id}
                    className={`h-1.5 rounded-full ${
                      i % 2 === 0 ? 'w-5 bg-[#8DC63F]' : 'w-2.5 bg-white/35'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative z-10 space-y-2.5">
              <h4 className="text-base sm:text-lg font-bold uppercase tracking-[0.05em] text-white leading-snug">
                {processFlow.heading}
              </h4>
              <p className="text-[14.5px] sm:text-[15px] font-normal text-slate-200 leading-[1.6]">
                {processFlow.subheading}
              </p>
            </div>

            {processFlow.footnote && (
              <div className="relative z-10 pt-4 border-t border-white/15 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-[13px] sm:text-[13.5px] font-normal text-slate-200 leading-[1.55]">
                  {processFlow.footnote}
                </p>
              </div>
            )}
          </div>

          <figure className="group expertise-card accent-blue lg:col-span-7 p-4 sm:p-5 flex flex-col justify-between">
            <div className="rounded-xl bg-[#F4F8FC] dark:bg-[#0B1220] border border-[#0B65B3]/15 dark:border-white/10 p-2.5 sm:p-3 flex-1 flex items-center justify-center">
              <div
                className="relative w-full overflow-hidden rounded-lg"
                style={{ aspectRatio: `${companionImage.width} / ${companionImage.height}` }}
              >
                <Image
                  src={companionImage.src}
                  alt={companionImage.alt}
                  width={companionImage.width}
                  height={companionImage.height}
                  unoptimized
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 620px"
                  className="expertise-card-img w-full h-full object-cover"
                />
              </div>
            </div>

            {companionImage.caption && (
              <figcaption className="mt-3.5 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center gap-2.5 text-[13px] font-medium text-[#334155] dark:text-[#CBD5E1] leading-snug px-1">
                <span className="w-2 h-2 rounded-full bg-[#0B65B3] shrink-0" aria-hidden="true" />
                <span>{companionImage.caption}</span>
              </figcaption>
            )}
          </figure>
        </div>

        {/* Full-Width Interactive Stage Pipeline */}
        <ProcessFlowStagesGrid stages={processFlow.stages} layout={processFlow.layout} />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0D1117] shadow-[0_6px_24px_-8px_rgba(10,25,47,0.1)] dark:shadow-[0_10px_28px_-10px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Dark Navy Feature Header Strip */}
      <div
        data-preserve-contrast="true"
        className="expertise-navy-band relative overflow-hidden bg-[linear-gradient(135deg,#0A192F_0%,#0E2546_65%,#0B65B3_135%)] px-6 py-5 sm:px-7 sm:py-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 right-12 w-44 h-44 rounded-full bg-[#8DC63F]/15 blur-2xl"
        />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-[#8DC63F]/15 border border-[#8DC63F]/35 text-[#8DC63F] flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
            <Zap className="w-5 h-5" aria-hidden="true" />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold uppercase tracking-[0.06em] text-white leading-tight">
              {processFlow.heading}
            </h4>
            <p className="text-sm sm:text-[15px] font-normal text-slate-200 leading-snug mt-0.5">
              {processFlow.subheading}
            </p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="relative z-10 hidden sm:flex items-center gap-1.5 shrink-0"
        >
          {processFlow.stages.map((st, i) => (
            <span
              key={st.id}
              className={`h-1.5 rounded-full ${
                i % 2 === 0 ? 'w-5 bg-[#8DC63F]' : 'w-3 bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Interactive Stage Flow Cards & Bottom Design Criteria Note */}
      <div className="p-5 sm:p-6 lg:p-7 space-y-5">
        <ProcessFlowStagesGrid stages={processFlow.stages} layout={processFlow.layout} />

        {processFlow.footnote && (
          <div className="rounded-xl bg-[#F4F8FC] dark:bg-[#090F1A] border border-slate-200/80 dark:border-white/10 border-l-4 border-l-[#0B65B3] px-4 sm:px-5 py-3.5 flex items-start sm:items-center gap-3">
            <ShieldCheck
              className="w-4 h-4 text-[#0B65B3] dark:text-[#8DC63F] shrink-0 mt-0.5 sm:mt-0"
              aria-hidden="true"
            />
            <p className="text-[14px] sm:text-[14.5px] font-medium text-[#334155] dark:text-[#CBD5E1] leading-[1.55]">
              {processFlow.footnote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const RISK_ITEM_ICONS: Record<string, LucideIcon> = {
  'human-safety': HeartPulse,
  'animals-wildlife': PawPrint,
  'buildings-infrastructure': Building2,
  'equipment-damages': Cpu,
  'cultural-heritage': Landmark,
  'economic-impacts': TrendingDown,
};

const EFFECT_ITEM_ICONS: Record<string, LucideIcon> = {
  'personnel-safety': HardHat,
  'direct-strike-protection': Zap,
  'fire-prevention': Flame,
  'structural-protection': Shield,
  'equipment-protection': Server,
};

const FUNCTION_ITEM_ICONS: Record<string, LucideIcon> = {
  detection: Radar,
  interception: Target,
  dissipation: ArrowDownToLine,
  prevention: ShieldCheck,
  continuity: Activity,
  compliance: FileCheck,
};

const UAE_IMPACT_ICONS: LucideIcon[] = [Building2, ShieldCheck, Radar];

function ArchitecturalInfoCard({
  card,
  icon: Icon,
  badge,
  isBlue = false,
  className = '',
}: {
  card: StepCardItem;
  icon: LucideIcon;
  badge?: string;
  isBlue?: boolean;
  className?: string;
}) {
  return (
    <article
      className={`expertise-card ${isBlue ? 'accent-blue' : ''} group p-6 flex flex-col gap-4 h-full ${className}`}
    >
      <div className="relative z-10 flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-white/[0.08]">
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className={`expertise-icon-tile ${
              isBlue ? 'expertise-icon-tile-blue' : 'expertise-icon-tile-green'
            } w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
              isBlue
                ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#0B65B3]/20 dark:text-[#60A5FA]'
                : 'bg-[#8DC63F]/15 text-[#38700D] dark:text-[#8DC63F]'
            }`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>

          <h4 className="text-lg sm:text-[19px] font-bold text-[#0A192F] dark:text-white leading-snug tracking-tight">
            {card.title}
          </h4>
        </div>

        {badge && (
          <span
            className={`font-mono text-xs font-bold tabular-nums px-2.5 py-1 rounded-full shrink-0 ${
              isBlue
                ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#0B65B3]/20 dark:text-[#60A5FA]'
                : 'bg-[#8DC63F]/15 text-[#38700D] dark:text-[#8DC63F]'
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      {card.description && (
        <p className="relative z-10 text-[15px] font-normal text-[#334155] dark:text-[#CBD5E1] leading-[1.65] pr-4">
          {card.description}
        </p>
      )}

      <Icon
        className="expertise-risk-ghost pointer-events-none absolute -bottom-4 -right-3 w-24 h-24"
        aria-hidden="true"
      />
    </article>
  );
}

function EffectsRequirementShowcase({ cards }: { cards: StepCardItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 items-stretch pt-1">
      {cards.map((card, idx) => {
        const Icon = EFFECT_ITEM_ICONS[card.id] || ShieldCheck;
        const isBottomWide = idx >= 3;
        const spanClass = isBottomWide
          ? idx === 4
            ? 'md:col-span-2 lg:col-span-3'
            : 'md:col-span-1 lg:col-span-3'
          : 'lg:col-span-2';
        return (
          <ArchitecturalInfoCard
            key={card.id}
            card={card}
            icon={Icon}
            badge={String(idx + 1).padStart(2, '0')}
            isBlue={idx % 2 === 1}
            className={spanClass}
          />
        );
      })}
    </div>
  );
}

function FunctionalitySequenceShowcase({ cards }: { cards: StepCardItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch pt-1">
      {cards.map((card, idx) => {
        const Icon = FUNCTION_ITEM_ICONS[card.id] || ShieldCheck;
        return (
          <ArchitecturalInfoCard
            key={card.id}
            card={card}
            icon={Icon}
            badge={String(idx + 1).padStart(2, '0')}
            isBlue
          />
        );
      })}
    </div>
  );
}

function UaeImpactShowcase({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch pt-2">
      {paragraphs.map((paragraph, idx) => {
        const Icon = UAE_IMPACT_ICONS[idx % UAE_IMPACT_ICONS.length];
        return (
          <article
            key={idx}
            data-preserve-contrast="true"
            className="expertise-card-navy group p-6 flex flex-col gap-5 h-full"
          >
            <div className="relative z-10 flex items-center justify-between gap-3 pb-3.5 border-b border-white/12">
              <div className="expertise-icon-tile expertise-icon-tile-green w-11 h-11 rounded-xl bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center shrink-0 text-[#8DC63F]">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>

              <span className="font-mono text-xs font-bold tabular-nums px-2.5 py-1 rounded-full bg-[#0B65B3]/30 border border-white/15 text-white">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>

            <p className="relative z-10 text-[15px] font-normal text-slate-200 leading-[1.65] flex-1 pr-3">
              {paragraph}
            </p>

            <Icon
              className="expertise-safety-ghost pointer-events-none absolute -bottom-3 -right-3 w-24 h-24"
              aria-hidden="true"
            />
          </article>
        );
      })}
    </div>
  );
}

function RisksBentoShowcase({ cards }: { cards: StepCardItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-5 items-stretch pt-1">
      {cards.map((card, idx) => {
        const Icon = RISK_ITEM_ICONS[card.id] || ShieldCheck;
        const isHeroNavy = idx === 0;
        const isClosingFull = idx === cards.length - 1;
        const isBlueAccent = idx === 2 || idx === 3 || isClosingFull;

        if (isHeroNavy) {
          return (
            <article
              key={card.id}
              data-preserve-contrast="true"
              className="expertise-navy-band expertise-card-navy group md:col-span-6 p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-7 shadow-[0_14px_34px_-12px_rgba(10,25,47,0.34)]"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-14 right-10 w-52 h-52 rounded-full bg-[#8DC63F]/15 blur-2xl"
              />

              <div className="relative z-10 flex items-center gap-4 shrink-0">
                <div className="expertise-icon-tile expertise-icon-tile-green w-14 h-14 rounded-2xl bg-[#8DC63F]/15 border border-[#8DC63F]/35 flex items-center justify-center text-[#8DC63F] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                  <Icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h4 className="md:hidden text-xl font-bold text-white leading-snug tracking-tight">
                  {card.title}
                </h4>
              </div>

              <div className="relative z-10 flex-1 space-y-2 md:border-l md:border-white/15 md:pl-7">
                <h4 className="hidden md:block text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                  {card.title}
                </h4>
                {card.description && (
                  <p className="text-[15px] sm:text-base font-normal text-slate-200 leading-[1.65] max-w-3xl">
                    {card.description}
                  </p>
                )}
              </div>

              <Icon
                className="expertise-safety-ghost pointer-events-none absolute -bottom-4 -right-3 w-28 h-28"
                aria-hidden="true"
              />
            </article>
          );
        }

        if (isClosingFull) {
          return (
            <article
              key={card.id}
              className="expertise-card accent-blue group md:col-span-6 p-6 sm:p-7 flex flex-col md:flex-row md:items-center gap-5 md:gap-7"
            >
              <div className="relative z-10 flex items-center gap-4 shrink-0">
                <div className="expertise-icon-tile expertise-icon-tile-blue w-12 h-12 rounded-xl bg-[#0B65B3]/10 dark:bg-[#0B65B3]/20 text-[#0B65B3] dark:text-[#60A5FA] flex items-center justify-center">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h4 className="md:hidden text-lg sm:text-[19px] font-bold text-[#0A192F] dark:text-white leading-snug tracking-tight">
                  {card.title}
                </h4>
              </div>

              <div className="relative z-10 flex-1 space-y-1.5 md:border-l md:border-slate-200/80 dark:md:border-white/10 md:pl-7">
                <h4 className="hidden md:block text-lg sm:text-xl font-bold text-[#0A192F] dark:text-white leading-snug tracking-tight">
                  {card.title}
                </h4>
                {card.description && (
                  <p className="text-[15px] font-normal text-[#334155] dark:text-[#CBD5E1] leading-[1.6] max-w-3xl">
                    {card.description}
                  </p>
                )}
              </div>

              <Icon
                className="expertise-risk-ghost pointer-events-none absolute -bottom-4 -right-3 w-24 h-24"
                aria-hidden="true"
              />
            </article>
          );
        }

        return (
          <ArchitecturalInfoCard
            key={card.id}
            card={card}
            icon={Icon}
            isBlue={isBlueAccent}
            className="md:col-span-3"
          />
        );
      })}
    </div>
  );
}

const RISK_CRITERIA_ICONS = [
  Users,
  CloudLightning,
  Landmark,
  Activity,
  Flame,
  Wrench,
  ShieldCheck,
];

function RiskAssessmentShowcase({
  chart,
  checklist,
  paragraphs,
}: {
  chart: ExpertiseImage;
  checklist: string[];
  paragraphs?: string[];
}) {
  return (
    <div className="space-y-6 pt-1">
      {/* Top Bento Row: Protection Levels Chart + Navy Compliance Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
        <figure className="group expertise-card accent-blue lg:col-span-7 p-4 sm:p-5 flex flex-col justify-between">
          <div className="rounded-xl bg-[#F4F8FC] dark:bg-[#0B1220] border border-[#0B65B3]/15 dark:border-white/10 p-3 sm:p-4 flex-1 flex items-center justify-center">
            <div className="w-full rounded-lg bg-white p-3 sm:p-4 border border-slate-200/75 shadow-[inset_0_1px_4px_rgba(10,25,47,0.05)] overflow-hidden">
              <div
                className="relative w-full"
                style={{ aspectRatio: `${chart.width} / ${chart.height}` }}
              >
                <Image
                  src={chart.src}
                  alt={chart.alt}
                  width={chart.width}
                  height={chart.height}
                  unoptimized
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="expertise-card-img w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {chart.caption && (
            <figcaption className="mt-3.5 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center gap-2.5 text-[13px] font-medium text-[#334155] dark:text-[#CBD5E1] leading-snug px-1">
              <span className="w-2 h-2 rounded-full bg-[#0B65B3] shrink-0" aria-hidden="true" />
              <span>{chart.caption}</span>
            </figcaption>
          )}
        </figure>

        {paragraphs && paragraphs.length > 0 && (
          <div
            data-preserve-contrast="true"
            className="expertise-navy-band lg:col-span-5 relative overflow-hidden rounded-2xl bg-[linear-gradient(155deg,#0A192F_0%,#0E2544_62%,#0B65B3_135%)] border border-[#8DC63F]/30 p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-[0_14px_34px_-12px_rgba(10,25,47,0.32)]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 right-0 h-[3px] bg-[#8DC63F]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#8DC63F]/15 blur-2xl"
            />

            <div className="relative z-10 flex items-center justify-between gap-3 pt-1">
              <div className="w-12 h-12 rounded-xl bg-[#8DC63F]/15 border border-[#8DC63F]/35 flex items-center justify-center text-[#8DC63F]">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-8 h-1.5 rounded-full bg-[#8DC63F]" />
                <span className="w-4 h-1.5 rounded-full bg-[#0B65B3]" />
                <span className="w-2 h-1.5 rounded-full bg-white/30" />
              </div>
            </div>

            <div className="relative z-10 space-y-3 my-auto">
              {paragraphs.map((paragraph, pIdx) => (
                <p
                  key={pIdx}
                  className="text-base sm:text-[17px] font-medium text-white/95 leading-[1.65]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div
              aria-hidden="true"
              className="relative z-10 pt-2 flex items-center"
            >
              <span className="h-1 w-full rounded-full bg-gradient-to-r from-[#8DC63F] via-[#0B65B3] to-[#0B65B3]/25" />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Structured Criteria Grid (2-col symmetrical bento; odd closing criterion spans full row) */}
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {checklist.map((item, cIdx) => {
          const CriterionIcon = RISK_CRITERIA_ICONS[cIdx % RISK_CRITERIA_ICONS.length];
          const isClosingCriterion = cIdx === checklist.length - 1 && checklist.length % 2 === 1;

          return (
            <li
              key={cIdx}
              className={`group expertise-card p-5 flex items-start gap-4 ${
                isClosingCriterion ? 'md:col-span-2 accent-blue' : ''
              }`}
            >
              <div
                className={`expertise-icon-tile shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  isClosingCriterion
                    ? 'expertise-icon-tile-blue bg-[#0B65B3]/10 dark:bg-[#0B65B3]/20 text-[#0B65B3] dark:text-[#60A5FA]'
                    : 'expertise-icon-tile-green bg-[#8DC63F]/15 text-[#5B8C1E] dark:text-[#8DC63F]'
                }`}
              >
                <CriterionIcon className="w-5 h-5" aria-hidden="true" />
              </div>

              <span className="flex-1 text-[15px] font-normal text-[#1E293B] dark:text-[#E2E8F0] leading-[1.6] pt-0.5">
                {item}
              </span>

              <span
                data-preserve-contrast="true"
                className="mt-1 w-6 h-6 rounded-full bg-[#8DC63F] text-white flex items-center justify-center shrink-0 shadow-[0_2px_8px_-2px_rgba(141,198,63,0.65)]"
                aria-hidden="true"
              >
                <Check className="w-3.5 h-3.5 stroke-[2.75]" />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
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
        ) : image.surface === 'light' ? (
          <div className="w-full rounded-xl bg-white p-3 sm:p-4 border border-slate-200/75 shadow-[inset_0_1px_4px_rgba(10,25,47,0.04)] overflow-hidden">
            <div
              className="relative w-full"
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
                className="expertise-card-img w-full h-full object-contain"
              />
            </div>
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

      {/* Safety Icon Cards (Step 9 Navy Protocol Console) */}
      {panel.iconItems && panel.iconItems.length > 0 && (() => {
        const isEightCardBento = panel.iconItems.length === 8;
        return (
          <div className="expertise-safety-shell rounded-2xl p-4 sm:p-5 lg:p-6">
            <div
              className={
                isEightCardBento
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4'
                  : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
              }
            >
              {panel.iconItems.map((item, itemIdx) => {
                const spanClass = isEightCardBento
                  ? itemIdx >= 6
                    ? 'lg:col-span-3'
                    : 'lg:col-span-2'
                  : '';
                return (
                  <InfoCard
                    key={item.id}
                    item={item}
                    variant="icon"
                    className={spanClass}
                  />
                );
              })}
            </div>
          </div>
        );
      })()}
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
      style={{ transitionDelay: index === 0 ? '0ms' : '40ms' }}
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
              step.id === 'uae-impact'
                ? 'border-l-4 border-[#8DC63F] pl-4 sm:pl-5 text-slate-100 text-base sm:text-[17px] leading-[1.65]'
                : isDarkBand
                ? 'text-slate-200'
                : 'text-[#334155] dark:text-[#CBD5E1]'
            }`}
          >
            {step.intro}
          </p>
        )}
      </div>

      {/* UAE Impact Structured Dark-Glass Pillars (Step 8) */}
      {step.id === 'uae-impact' && step.paragraphs && step.paragraphs.length > 0 && (
        <UaeImpactShowcase paragraphs={step.paragraphs} />
      )}

      {/* Additional Paragraphs */}
      {step.id !== 'uae-impact' &&
        step.paragraphs &&
        step.paragraphs.length > 0 &&
        !hasTwoColumnChecklist && (
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

      {/* Protection Levels Chart + Navy Compliance Callout + Structured Criteria Grid (Step 6) */}
      {hasTwoColumnChecklist && step.images?.[0] && step.checklist && (
        <RiskAssessmentShowcase
          chart={step.images[0]}
          checklist={step.checklist}
          paragraphs={step.paragraphs}
        />
      )}

      {/* Risks Associated with Lightning Architectural Bento (Step 2) */}
      {step.id === 'risks' && step.cards && step.cards.length === 6 && (
        <RisksBentoShowcase cards={step.cards} />
      )}

      {/* Effects & Requirement Asymmetric 3+2 Bento (Step 3) */}
      {step.id === 'effects-requirement' && step.cards && step.cards.length === 5 && (
        <EffectsRequirementShowcase cards={step.cards} />
      )}

      {/* Functionality 6-Stage Operational Sequence (Step 5) */}
      {step.id === 'functionality' && step.cards && step.cards.length === 6 && (
        <FunctionalitySequenceShowcase cards={step.cards} />
      )}

      {/* Cards Grid (MediaCards & default InfoCards, max 3 per row) */}
      {step.id !== 'risks' &&
        step.id !== 'effects-requirement' &&
        step.id !== 'functionality' &&
        step.cards &&
        step.cards.length > 0 && (
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

      {/* Technical Standards & References Blocks (Earthing Step 5) */}
      {step.standardsReference && (
        <StandardsReferenceShowcase config={step.standardsReference} />
      )}

      {/* Interactive Multi-Stage Process Flow (Earthing Steps 1, 3, 4, 5) */}
      {step.processFlow && (
        <ProcessFlowShowcase
          processFlow={step.processFlow}
          companionImage={step.images?.[0]}
        />
      )}

      {/* Standalone Step Diagrams (steps without dedicated showcase components) */}
      {!hasTwoColumnChecklist && !step.processFlow && step.images && step.images.length > 0 && (
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
          <div className={isDarkBand ? 'flex items-center justify-between gap-4 flex-wrap' : ''}>
            <SubTabs
              idPrefix={`step-${step.id}`}
              ariaLabel={`${step.title} views`}
              items={step.subTabs}
              activeId={activeSubTab.id}
              onChange={setActiveSubTabId}
              tone={isDarkBand ? 'navy' : 'light'}
            />

            {isDarkBand && (
              <div
                aria-hidden="true"
                className="expertise-phase-meter hidden sm:flex items-center gap-1.5 px-3.5 py-2.5 rounded-full"
              >
                {step.subTabs.map((st) => {
                  const active = st.id === activeSubTab.id;
                  return (
                    <span
                      key={st.id}
                      className={`h-1.5 rounded-full transition-all duration-250 motion-reduce:transition-none ${
                        active ? 'w-7 bg-[#8DC63F]' : 'w-2 bg-white/25'
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>
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

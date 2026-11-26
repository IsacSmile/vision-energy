import React from 'react';
import Image from 'next/image';
import {
  Trees,
  Scissors,
  Building2,
  AppWindow,
  Unplug,
  ShieldCheck,
  CarFront,
  Ban,
  ZapOff,
  BrickWall,
  Droplets,
  PhoneOff,
  Radio,
  Ambulance,
  Waves,
  AlertTriangle,
  Accessibility,
  UtilityPole,
  PawPrint,
  HeartPulse,
  Cpu,
  Landmark,
  TrendingDown,
  HardHat,
  Zap,
  Flame,
  Shield,
  Server,
  Radar,
  Target,
  ArrowDownToLine,
  Activity,
  FileCheck,
  FileText,
  FolderSearch,
  MapPin,
  Compass,
  ClipboardCheck,
  DraftingCompass,
  BadgeCheck,
  Wrench,
  Award,
  type LucideIcon,
} from 'lucide-react';
import type { SafetyIconKey, StepCardItem } from '@/lib/data/expertise';

const SAFETY_ICONS: Record<SafetyIconKey, LucideIcon> = {
  trees: Trees,
  axe: Scissors,
  building: Building2,
  window: AppWindow,
  unplug: Unplug,
  'shield-zap': ShieldCheck,
  car: CarFront,
  'ban-metal': Ban,
  'window-alert': AppWindow,
  'zap-off': ZapOff,
  'wall-ban': BrickWall,
  droplets: Droplets,
  'phone-off': PhoneOff,
  radio: Radio,
  ambulance: Ambulance,
  waves: Waves,
  'alert-triangle': AlertTriangle,
  accessibility: Accessibility,
  'utility-pole': UtilityPole,
  'paw-print': PawPrint,
};

const CARD_ID_ICONS: Record<string, LucideIcon> = {
  // Risks
  'human-safety': HeartPulse,
  'animals-wildlife': PawPrint,
  'buildings-infrastructure': Building2,
  'equipment-damages': Cpu,
  'cultural-heritage': Landmark,
  'economic-impacts': TrendingDown,
  // Effects & Requirement
  'personnel-safety': HardHat,
  'direct-strike-protection': Zap,
  'fire-prevention': Flame,
  'structural-protection': Shield,
  'equipment-protection': Server,
  // Functionality
  detection: Radar,
  interception: Target,
  dissipation: ArrowDownToLine,
  prevention: ShieldCheck,
  continuity: Activity,
  compliance: FileCheck,
  // Earthing 10-stage workflow
  'step-01': FileText,
  'step-02': FolderSearch,
  'step-03': MapPin,
  'step-04': Compass,
  'step-05': ClipboardCheck,
  'step-06': DraftingCompass,
  'step-07': BadgeCheck,
  'step-08': HardHat,
  'step-09': Wrench,
  'step-10': Award,
};

interface InfoCardProps {
  item: StepCardItem;
  variant?: 'default' | 'icon';
  accentTone?: 'green' | 'blue';
  className?: string;
}

export default function InfoCard({
  item,
  variant = 'default',
  accentTone = 'green',
  className = '',
}: InfoCardProps) {
  // Variant 1: Architectural Safety Module Card (inside Dark Navy Step 9 band)
  if (variant === 'icon') {
    const Icon = item.iconName ? SAFETY_ICONS[item.iconName] : AlertTriangle;
    return (
      <div
        data-preserve-contrast="true"
        className={`expertise-card-navy group p-5 sm:p-6 flex flex-col justify-between gap-5 min-h-[144px] h-full ${className}`}
      >
        <div className="relative z-10 flex items-center justify-between gap-3 pt-0.5">
          <div className="expertise-icon-tile expertise-icon-tile-green w-12 h-12 rounded-xl bg-[#8DC63F]/15 border border-[#8DC63F]/30 flex items-center justify-center shrink-0 text-[#8DC63F] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <span
            aria-hidden="true"
            className="w-6 h-1 rounded-full bg-white/15 group-hover:w-10 group-hover:bg-[#8DC63F] transition-all duration-300 motion-reduce:transition-none"
          />
        </div>

        <span className="relative z-10 text-[15.5px] sm:text-base font-semibold text-white leading-[1.45] pr-6">
          {item.title}
        </span>

        <Icon
          className="expertise-safety-ghost pointer-events-none absolute -bottom-3 -right-3 w-20 h-20"
          aria-hidden="true"
        />
      </div>
    );
  }

  // Variant 2: MediaCard (Formation stages 1-4, LPS components 1-6)
  if (item.image) {
    return (
      <div className="expertise-card group flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] overflow-hidden border-b border-slate-200/80 dark:border-white/10 bg-[#F4F8FC] dark:bg-[#0A111C] p-3 sm:p-4 flex items-center justify-center">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            unoptimized
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
            className="expertise-card-img max-w-full max-h-full w-auto h-auto object-contain"
          />
        </div>

        <div className="p-6 flex-1 flex flex-col gap-1.5">
          <h4 className="text-lg sm:text-[19px] font-semibold text-[#0A192F] dark:text-white leading-[1.35]">
            {item.title}
          </h4>
          {item.subtitle && (
            <p className="text-sm font-semibold text-[#5B8C1E] dark:text-[#8DC63F]">
              {item.subtitle}
            </p>
          )}
          {item.description && (
            <p className="text-[15px] font-normal text-[#334155] dark:text-[#CBD5E1] leading-[1.6]">
              {item.description}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Variant 3: InfoCard (Risks, Effects, Functions, Workflow stages)
  const Icon = CARD_ID_ICONS[item.id] || ShieldCheck;
  const isBlue = accentTone === 'blue';

  return (
    <div
      className={`expertise-card ${isBlue ? 'accent-blue' : ''} group p-6 flex flex-col gap-4 h-full`}
    >
      <div
        className={`expertise-icon-tile ${
          isBlue ? 'expertise-icon-tile-blue' : 'expertise-icon-tile-green'
        } w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
          isBlue
            ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#0B65B3]/20 dark:text-[#60A5FA]'
            : 'bg-[#8DC63F]/15 text-[#38700D] dark:bg-[#8DC63F]/15 dark:text-[#8DC63F]'
        }`}
      >
        <Icon className="w-5 h-5" aria-hidden="true" />
      </div>

      <div className="flex-1 flex flex-col gap-2">
        <h4 className="text-lg sm:text-[19px] font-semibold text-[#0A192F] dark:text-white leading-[1.35]">
          {item.title}
        </h4>
        {item.subtitle && (
          <p className="text-sm font-semibold text-[#5B8C1E] dark:text-[#8DC63F]">
            {item.subtitle}
          </p>
        )}
        {item.description && (
          <p className="text-[15px] font-normal text-[#334155] dark:text-[#CBD5E1] leading-[1.6]">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}

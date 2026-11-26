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

interface InfoCardProps {
  item: StepCardItem;
  variant?: 'default' | 'icon';
}

export default function InfoCard({ item, variant = 'default' }: InfoCardProps) {
  if (variant === 'icon') {
    const Icon = item.iconName ? SAFETY_ICONS[item.iconName] : AlertTriangle;
    return (
      <div className="expertise-card group p-4 flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-200 dark:border-white/10 flex items-center justify-center shrink-0 text-[#0B65B3] dark:text-[#8DC63F]">
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <span className="text-sm font-semibold text-[#0F172A] dark:text-white leading-snug">
          {item.title}
        </span>
      </div>
    );
  }

  const imageFrameClass =
    item.image?.surface === 'dark'
      ? 'bg-[#0A101D]'
      : item.image?.surface === 'light'
      ? 'bg-white'
      : 'bg-slate-50 dark:bg-[#050608]';

  return (
    <div className="expertise-card group overflow-hidden flex flex-col h-full">
      {item.image && (
        <div
          className={`relative w-full overflow-hidden border-b border-slate-200/80 dark:border-white/10 ${imageFrameClass} ${
            item.image.surface === 'photo' ? 'aspect-[4/3]' : 'aspect-[16/10] p-3 flex items-center justify-center'
          }`}
        >
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={item.image.width}
            height={item.image.height}
            unoptimized
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
            className={`expertise-card-img ${
              item.image.surface === 'photo'
                ? 'w-full h-full object-cover'
                : 'max-w-full max-h-full w-auto h-auto object-contain'
            }`}
          />
        </div>
      )}

      <div className="p-4 sm:p-5 flex-1 flex flex-col gap-1.5">
        <h4 className="text-sm sm:text-base font-semibold text-[#0F172A] dark:text-white leading-snug">
          {item.title}
        </h4>
        {item.subtitle && (
          <p className="text-xs font-normal text-[#5B8C1E] dark:text-[#8DC63F]">
            {item.subtitle}
          </p>
        )}
        {item.description && (
          <p className="text-xs sm:text-sm font-normal text-slate-600 dark:text-[#A9B4C0] leading-relaxed">
            {item.description}
          </p>
        )}
      </div>
    </div>
  );
}


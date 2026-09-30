'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Building2, Flame, Cpu, Phone } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Chip from '@/components/ui/Chip';
import ProtectionDiagram from './ProtectionDiagram';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import LightningButton from '@/components/ui/LightningButton';

const SAFETY_TILES = [
  {
    id: 'personnel',
    icon: Users,
    title: 'Personnel Safety',
    description: 'Safeguards lives by safely dispersing lightning currents.',
  },
  {
    id: 'structural',
    icon: Building2,
    title: 'Structural Protection',
    description: 'Shields building fabric from direct-strike damage.',
  },
  {
    id: 'fire',
    icon: Flame,
    title: 'Fire Prevention',
    description: 'Eliminates ignition risks and thermal hazards.',
  },
  {
    id: 'equipment',
    icon: Cpu,
    title: 'Equipment Protection',
    description: 'Protects critical electrical and electronic systems.',
  },
];

const POPULAR_CHIPS = [
  {
    code: 'LP-01',
    label: 'Conventional Lightning Protection',
    href: '/products/conventional-lightning-protection-systems',
  },
  {
    code: 'LP-02',
    label: 'ESE Lightning Protection',
    href: '/products/early-streamer-emission-lightning-protection-systems',
  },
  {
    code: 'ER-02',
    label: 'Exothermic Welding',
    href: '/products/exothermic-welding-systems',
  },
  {
    code: 'EL-06',
    label: 'Surge Protection Devices',
    href: '/products/surge-protection-devices',
  },
];

export default function FlagshipLightning() {
  const { openServiceModal } = useEnquiryModal();

  const handleBookInstallation = () => {
    openServiceModal({
      serviceSlug: 'external-lightning-protection-installation',
      serviceTitle: 'External Lightning Protection Installation',
    });
  };

  return (
    <section
      aria-labelledby="flagship-lightning-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#0D1117] relative overflow-hidden border-t border-b border-white/[0.08]"
    >
      {/* Top Hairline Divider Gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(11,101,179,0.3)_35%,rgba(141,198,63,0.3)_65%,transparent_100%)]"
        aria-hidden="true"
      />

      {/* Background Faint Blue Radial Glow & 48px Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background:
            'radial-gradient(800px circle at 70% 50%, rgba(11,101,179,0.14), transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: Content, Tiles, Actions, Chips (Sticky on lg+) */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 lg:sticky lg:top-32">
            
            {/* Header Block */}
            <div className="space-y-2.5 sm:space-y-3">
              <SectionHeader
                id="flagship-lightning-heading"
                eyebrow="Our Specialism"
                title="Lightning Protection and Earthing"
              />
            </div>

            {/* Concise Description */}
            <Reveal staggerIndex={1}>
              <p className="text-sm sm:text-base text-[#A9B4C0] leading-relaxed">
                Engineered protection networks of air terminals, down conductors, and earthing grids to safeguard lives, structures, and critical equipment.
              </p>
            </Reveal>

            {/* Minimal Safety Highlights */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-1">
              {SAFETY_TILES.map((tile, i) => {
                const IconComp = tile.icon;
                return (
                  <Reveal key={tile.id} staggerIndex={i}>
                    <div className="group bg-[#050608]/50 border border-white/[0.08] hover:border-[#8DC63F]/50 p-2.5 sm:p-3.5 rounded-xl transition-all duration-300 flex items-center sm:flex-col sm:items-start gap-2.5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#8DC63F]/10 text-[#8DC63F] flex items-center justify-center border border-[#8DC63F]/20 shrink-0">
                        <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.5]" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#8DC63F] transition-colors leading-tight">
                          {tile.title}
                        </h4>
                        <p className="hidden sm:block mt-1 text-xs text-[#A9B4C0] leading-snug">
                          {tile.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Popular in this range (Chips) */}
            <div className="space-y-2.5 pt-1">
              <span className="block text-[11px] sm:text-xs font-bold text-[#A9B4C0] uppercase tracking-[0.14em]">
                Popular in this range
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory lg:flex-wrap lg:overflow-visible py-1">
                {POPULAR_CHIPS.map((chip, i) => (
                  <Reveal key={chip.code} staggerIndex={i} className="shrink-0">
                    <Link href={chip.href}>
                      <Chip variant="default" className="snap-start hover:border-[#8DC63F] hover:text-[#8DC63F] text-xs">
                        {chip.label}
                      </Chip>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Action Buttons & Phone Link */}
            <div className="space-y-4 pt-2">
              <div className="flex flex-col gap-4 w-full max-w-[420px]">
                {/* Primary White Pill Button */}
                <LightningButton
                  variant="primary"
                  size="md"
                  href="/products?codes=LP-01,LP-02,LP-03,LP-04,ER-01,ER-02,ER-03,ER-04"
                  fullWidth
                >
                  Explore Lightning Protection Products
                </LightningButton>

                {/* Secondary Dark Glass Pill Button */}
                <LightningButton
                  variant="secondary"
                  size="md"
                  onClick={handleBookInstallation}
                  fullWidth
                >
                  Book Installation
                </LightningButton>
              </div>

              {/* Call Text Link */}
              <div className="flex items-center justify-center sm:justify-start pt-1">
                <a
                  href="tel:+97172042763"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#A9B4C0] hover:text-[#8DC63F] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#8DC63F]" />
                  <span>Call +971 7 204 2763</span>
                </a>
              </div>
            </div>

            {/* Compliance Note */}
            <p className="text-[13px] text-[#A9B4C0]/80 leading-relaxed pt-2">
              Final design and test criteria are confirmed against approved project requirements, actual site conditions and applicable authority requirements.
            </p>
          </div>

          {/* RIGHT COLUMN: Interactive ProtectionDiagram Component */}
          <div className="lg:col-span-7">
            <ProtectionDiagram />
          </div>

        </div>
      </div>

      {/* Bottom Hairline Divider Gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(11,101,179,0.3)_35%,rgba(141,198,63,0.3)_65%,transparent_100%)]"
        aria-hidden="true"
      />
    </section>
  );
}

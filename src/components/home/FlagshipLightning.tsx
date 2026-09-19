'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Building2, Flame, Cpu, Phone } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import Chip from '@/components/ui/Chip';
import ProtectionDiagram from './ProtectionDiagram';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';

const SAFETY_TILES = [
  {
    id: 'personnel',
    icon: Users,
    title: 'Personnel Safety',
    description: 'Gives lightning energy a controlled path, reducing risk to people.',
  },
  {
    id: 'structural',
    icon: Building2,
    title: 'Structural Protection',
    description: 'Helps protect the building fabric from lightning damage.',
  },
  {
    id: 'fire',
    icon: Flame,
    title: 'Fire Prevention',
    description: 'Reduces the risk of fires caused by lightning strikes.',
  },
  {
    id: 'equipment',
    icon: Cpu,
    title: 'Equipment Protection',
    description: 'Safeguards electrical and electronic equipment and operational continuity.',
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
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            
            {/* Header Block */}
            <div className="space-y-3">
              <SectionHeader
                id="flagship-lightning-heading"
                eyebrow="Our Specialism"
                title="Lightning Protection and Earthing"
              />
              <p className="text-[#8DC63F] font-semibold text-lg sm:text-xl">
                essential safety for your assets
              </p>
            </div>

            {/* Paragraph 1 */}
            <Reveal staggerIndex={1}>
              <p className="text-base text-[#A9B4C0] leading-[1.7]">
                Lightning is a powerful force of nature that can cause significant damage and pose
                threats to life and property. A lightning protection system is not simply a lightning
                rod on a roof. It is a complete engineered protection network comprising air terminals,
                down conductors, bonding connections, earth electrodes and, where required, surge
                protection devices.
              </p>
            </Reveal>

            {/* Four Safety Tiles (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {SAFETY_TILES.map((tile, i) => {
                const IconComp = tile.icon;
                return (
                  <Reveal key={tile.id} staggerIndex={i}>
                    <div className="group bg-[#050608]/60 border border-white/[0.08] hover:border-[#8DC63F]/50 p-3.5 rounded-xl transition-all duration-300 h-full flex flex-col justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-[#0B65B3]/10 text-[#0B65B3] group-hover:text-[#8DC63F] group-hover:bg-[#8DC63F]/10 flex items-center justify-center border border-[#0B65B3]/20 group-hover:border-[#8DC63F]/30 transition-colors shrink-0">
                          <IconComp className="w-4 h-4 stroke-[1.5]" />
                        </div>
                        <h4 className="text-xs font-semibold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                          {tile.title}
                        </h4>
                      </div>
                      <p className="mt-2 text-[13px] text-[#A9B4C0] leading-snug">
                        {tile.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            {/* Popular in this range (Chips) */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs font-bold text-[#A9B4C0] uppercase tracking-[0.14em]">
                Popular in this range
              </span>
              <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory lg:flex-wrap lg:overflow-visible py-1">
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
              <div className="flex flex-col sm:flex-row items-stretch gap-4 max-w-[360px] sm:max-w-none">
                {/* Primary White Pill Button */}
                <Link
                  href="/products?codes=LP-01,LP-02,LP-03,LP-04,ER-01,ER-02,ER-03,ER-04"
                  className="h-[52px] px-6 rounded-full bg-white text-[#050608] font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-all pill-glow active-press shadow-lg text-center"
                >
                  <span>Explore Lightning Protection Products</span>
                </Link>

                {/* Secondary Dark Glass Pill Button */}
                <button
                  type="button"
                  onClick={handleBookInstallation}
                  className="h-[52px] px-6 rounded-full bg-[#0D1117] border border-white/15 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-white/10 transition-all active-press text-center"
                >
                  <span>Book Installation</span>
                </button>
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

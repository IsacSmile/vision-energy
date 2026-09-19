'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import {
  HardHat,
  Wrench,
  Flame,
  Zap,
  Landmark,
  Sun,
  ArrowUpRight,
  LucideIcon,
} from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { INDUSTRIES, IndustrySector } from '@/config/industries';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';

const ICON_MAP: Record<string, LucideIcon> = {
  HardHat,
  Wrench,
  Flame,
  Zap,
  Landmark,
  Sun,
};

interface IndustryCellProps {
  sector: IndustrySector;
  index: number;
  isActive: boolean;
  onActivate: (index: number) => void;
}

function IndustryCell({ sector, index, isActive, onActivate }: IndustryCellProps) {
  const cellRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const IconComp = ICON_MAP[sector.iconName];

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cellRef.current) return;
    const rect = cellRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handlePointerEnter = () => {
    onActivate(index);
  };

  const handleFocus = () => {
    onActivate(index);
  };

  return (
    <Reveal staggerIndex={index} className="h-full">
      <Link
        href="/products"
        aria-label={`Explore products for ${sector.name}`}
        onFocus={handleFocus}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-lg"
      >
        <div
          ref={cellRef}
          onPointerMove={handlePointerMove}
          onPointerEnter={handlePointerEnter}
          style={
            {
              '--mx': `${mousePos.x}%`,
              '--my': `${mousePos.y}%`,
            } as React.CSSProperties
          }
          className={`relative group transition-colors duration-300 p-6 lg:p-8 min-h-[140px] lg:min-h-[200px] flex flex-col justify-between overflow-hidden active-press h-full ${
            isActive ? 'bg-white/[0.03]' : 'bg-[#0D1117]'
          }`}
        >
          {/* Spotlight Radial Overlay */}
          <div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
              isActive ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background:
                'radial-gradient(400px circle at var(--mx) var(--my), rgba(11,101,179,0.12), transparent 80%)',
            }}
            aria-hidden="true"
          />

          {/* Top Row: Icon top-left, Arrow top-right */}
          <div className="relative z-10 flex items-center justify-between">
            <div
              className={`transition-colors duration-300 ${
                isActive ? 'text-[#8DC63F]' : 'text-[#0B65B3]'
              }`}
            >
              <IconComp className="w-7 h-7 stroke-[1.5]" />
            </div>
            <ArrowUpRight
              className={`w-5 h-5 text-[#8DC63F] transition-all duration-300 ${
                isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
              }`}
            />
          </div>

          {/* Bottom-left: Sector Name */}
          <div className="relative z-10">
            <h3
              className={`text-lg lg:text-2xl font-medium transition-colors duration-300 ${
                isActive ? 'text-[#8DC63F]' : 'text-white'
              }`}
            >
              {sector.name}
            </h3>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

export default function Industries() {
  const { openProductModal } = useEnquiryModal();
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleOpenGeneralEnquiry = (e: React.MouseEvent) => {
    e.preventDefault();
    openProductModal();
  };

  const handleGridPointerLeave = () => {
    setActiveIndex(0);
  };

  const handleGridBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setActiveIndex(0);
    }
  };

  return (
    <section
      aria-labelledby="industries-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#0D1117] relative border-t border-b border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Section Header */}
        <SectionHeader
          id="industries-heading"
          eyebrow="Industries"
          title="Sectors We Serve"
          description="We serve the construction, MEP, oil and gas, utilities, infrastructure, and renewable-energy sectors with dependable products and technically sound solutions."
        />

        {/* SINGLE BORDERED CONTAINER: 2x3 Grid on Mobile, 3x2 Grid on Desktop */}
        <div
          onPointerLeave={handleGridPointerLeave}
          onBlur={handleGridBlur}
          className="rounded-[24px] border border-white/[0.08] overflow-hidden bg-white/[0.08] grid grid-cols-2 lg:grid-cols-3 gap-[1px]"
        >
          {INDUSTRIES.map((sector, i) => (
            <IndustryCell
              key={sector.id}
              sector={sector}
              index={i}
              isActive={activeIndex === i}
              onActivate={setActiveIndex}
            />
          ))}
        </div>

        {/* ENQUIRY LINE BELOW CONTAINER */}
        <Reveal staggerIndex={6}>
          <div className="text-center text-sm text-[#A9B4C0]">
            <span>Looking for something specific? Tell us about your project. </span>
            <button
              type="button"
              onClick={handleOpenGeneralEnquiry}
              className="font-semibold text-[#8DC63F] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
            >
              Send an enquiry
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

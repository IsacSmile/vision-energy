'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Zap, Wrench, Sun, Cpu, Layers, CheckCircle2, ArrowRight } from 'lucide-react';

const pillars = [
  {
    id: 'electrical',
    title: 'Electrical Solutions',
    icon: Zap,
    color: '#0B65B3',
    desc: 'Low and high voltage electrical components, distribution boards, industrial switches, cables, glands, and surge protection.',
    bullets: ['HV/LV Cables & Jointing Kits', 'Industrial Isolators & Panels'],
    link: '/products?group=EL',
  },
  {
    id: 'mechanical',
    title: 'Mechanical Solutions',
    icon: Wrench,
    color: '#8DC63F',
    desc: 'Industrial fluid handling pumps, HVAC components, ventilation systems, pneumatic compressors, and valves.',
    bullets: ['Industrial Pumps & Valves', 'Heavy-Duty Pipe Supports'],
    link: '/products?group=ME',
  },
  {
    id: 'renewable',
    title: 'Renewable Energy Solutions',
    icon: Sun,
    color: '#F2C230',
    desc: 'Solar PV components, solar street lighting poles, solar water heaters, high-efficiency inverters, and sustainable infrastructure.',
    bullets: ['Solar PV Cables & Connectors', 'Autonomous Solar Streetlights'],
    link: '/products?group=EN',
  },
  {
    id: 'technical',
    title: 'Technical Solutions',
    icon: Cpu,
    color: '#0B65B3',
    desc: 'Industrial automation sensors, explosion-proof electrical equipment, weather monitoring stations, and tagging.',
    bullets: ['ATEX/IECEx Explosion Proof Enclosures', 'Precision Sensors & Encoders'],
    link: '/products?group=SG',
  },
  {
    id: 'installation',
    title: 'Project Installation & Support',
    icon: Layers,
    color: '#8DC63F',
    desc: 'Turnkey site installation of lightning protection networks, earthing ground grids, exothermic welding, and specialist manpower.',
    bullets: ['Certified External Lightning Installation', 'Exothermic Welding & Earth Grids'],
    link: '/services',
  },
];

export default function HomeSolutionsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const index = Math.round(el.scrollLeft / (el.clientWidth * 0.85));
    setActiveIndex(Math.min(index, pillars.length - 1));
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block">
          Engineering Capabilities
        </span>
        <h2 className="text-[clamp(1.5rem,6vw,2.5rem)] font-bold text-white tracking-tight">
          Our Five Core Engineering Solution Pillars
        </h2>
        <p className="text-sm text-[#A9B4C0]">
          Comprehensive material supply, technical consultation, and project support across UAE.
        </p>
      </div>

      {/* Mobile Swipe Carousel (< sm) & Desktop Grid (sm+) */}
      <div
        onScroll={handleScroll}
        className="flex overflow-x-auto no-scrollbar scroll-snap-x gap-4 py-2 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible"
      >
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={`w-[85vw] max-w-[320px] shrink-0 scroll-snap-align-center sm:w-auto bg-[#0D1117] border border-white/10 p-6 rounded-xl space-y-4 hover:border-[#0B65B3] transition-all group flex flex-col justify-between ${
                idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="space-y-3">
                <div
                  className="w-12 h-12 bg-[#050608] border border-white/10 rounded-xl flex items-center justify-center group-hover:border-[#8DC63F]"
                  style={{ color: item.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-[#8DC63F] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A9B4C0] line-clamp-2 leading-relaxed">
                  {item.desc}
                </p>
                <ul className="space-y-1.5 text-xs text-gray-300 pt-1">
                  {item.bullets.map((b, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" />
                      <span className="truncate">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href={item.link}
                  className="text-xs font-bold text-[#8DC63F] hover:underline inline-flex items-center gap-1 active-press"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Dots (Mobile Only) */}
      <div className="flex sm:hidden items-center justify-center gap-2 pt-2">
        {pillars.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all ${
              activeIndex === i ? 'w-6 bg-[#8DC63F]' : 'w-2 bg-gray-700'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

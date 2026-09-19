'use client';

import React, { useState } from 'react';
import { Award, Building2, Users, Zap, Factory, CheckCircle2, ChevronDown } from 'lucide-react';

const strengths = [
  {
    id: 'quality',
    title: 'Quality Assured Products',
    icon: Award,
    color: '#8DC63F',
    desc: 'All trading materials adhere strictly to international IEC, BS EN, and NF C specifications with full quality certification.',
  },
  {
    id: 'presence',
    title: 'Triple UAE Presence',
    icon: Building2,
    color: '#0B65B3',
    desc: 'Established operations serving major infrastructure and industrial projects in Abu Dhabi, Dubai, Ras Al Khaimah, and Northern Emirates.',
  },
  {
    id: 'technical',
    title: 'Technical Support & BOQ Assistance',
    icon: Users,
    color: '#F2C230',
    desc: 'Our engineering sales team assists contractors in material sizing, BOQ optimization, and standard compliance verification.',
  },
  {
    id: 'stock',
    title: 'Priority Stock Commitment',
    icon: Zap,
    color: '#8DC63F',
    desc: 'Deep stock commitment in lightning air rods, down conductors, earth enhancement compounds, and exothermic welds.',
  },
  {
    id: 'manpower',
    title: 'Specialist Manpower Mobilisation',
    icon: Factory,
    color: '#0B65B3',
    desc: 'Trade-tested technicians and site supervisors ready for short-notice site deployment across the 7 Emirates.',
  },
  {
    id: 'legacy',
    title: 'Established UAE Legacy',
    icon: CheckCircle2,
    color: '#8DC63F',
    desc: 'Operating continuously since 2018 as a trusted engineering product trading vendor across commercial and energy sectors.',
  },
];

export default function HomeWhyChooseUsAccordion() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-8">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs font-bold text-[#0B65B3] uppercase tracking-widest bg-[#0B65B3]/10 border border-[#0B65B3]/30 px-3.5 py-1 rounded-full inline-block">
          Distributor Strengths
        </span>
        <h2 className="text-[clamp(1.5rem,6vw,2.5rem)] font-bold text-white tracking-tight leading-[1.2]">
          Why Partner with Vision Energy International
        </h2>
        <p className="text-sm text-[#A9B4C0] leading-[1.65]">
          Authorized trading distributor committed to quality assurance and technical excellence.
        </p>
      </div>

      {/* 2-Column Compact Grid with Interactive Inline Accordion Expansion */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {strengths.map((item) => {
          const Icon = item.icon;
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => toggleExpand(item.id)}
              className={`bg-[#0D1117] border border-white/10 p-5 sm:p-6 rounded-xl space-y-3 cursor-pointer transition-all active-press ${
                isExpanded ? 'border-[#8DC63F] bg-[#161B22]' : 'hover:border-[#0B65B3]'
              }`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8" style={{ color: item.color }} />
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform sm:hidden ${
                    isExpanded ? 'rotate-180 text-[#8DC63F]' : ''
                  }`}
                />
              </div>

              <h3 className="text-sm sm:text-lg font-bold text-white leading-[1.2]">
                {item.title}
              </h3>

              {/* Desktop always visible, Mobile expandable inline */}
              <p
                className={`text-xs text-[#A9B4C0] leading-[1.65] ${
                  isExpanded ? 'block' : 'hidden sm:block'
                }`}
              >
                {item.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

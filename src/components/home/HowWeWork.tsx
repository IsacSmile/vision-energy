import React from 'react';
import { ArrowRight } from 'lucide-react';

interface Step {
  num: string;
  title: string;
  desc: string;
}

const STEP_PAIRS: [Step, Step][] = [
  [
    {
      num: '01',
      title: 'Customer Enquiry & Project Brief',
      desc: 'Scope, location, building type and protection objective',
    },
    {
      num: '02',
      title: 'Documents & Initial Review',
      desc: 'Drawings, layouts, specifications and available records',
    },
  ],
  [
    {
      num: '03',
      title: 'Site Visit & Building Survey',
      desc: 'Roof, facade, access, services, structure and exposure',
    },
    {
      num: '04',
      title: 'New / Existing Earthing Survey',
      desc: 'New: mark earth pits. Existing: verify available earth network',
    },
  ],
  [
    {
      num: '05',
      title: 'Risk Assessment & Soil Study',
      desc: 'Lightning risk evaluation and soil-resistivity study',
    },
    {
      num: '06',
      title: 'Engineering Design Stage',
      desc: 'Air terminals, mesh, down conductors, bonding and earth system',
    },
  ],
  [
    {
      num: '07',
      title: 'Design / Consultant Approval',
      desc: 'Drawings, calculations, material schedule and method statement',
    },
    {
      num: '08',
      title: 'Installation & Supervision',
      desc: 'Approved routing, connections, earth pit execution and quality control',
    },
  ],
  [
    {
      num: '09',
      title: 'Testing & Commissioning',
      desc: 'Continuity, earth resistance and inspection verification',
    },
    {
      num: '10',
      title: 'Handover & Future Support',
      desc: 'Reports, photographs, completion records and maintenance support',
    },
  ],
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="py-16 lg:py-24 bg-[#050608] text-white">
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header matching Why Vision Energy style */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#8DC63F] uppercase tracking-[0.14em]">
            <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
            <span>How We Work</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold text-white leading-[1.2] tracking-[-0.02em] text-balance">
            From Customer Enquiry to Tested System Handover
          </h2>
        </div>

        {/* Flow Cards */}
        <div className="space-y-4">
          {STEP_PAIRS.map(([left, right], i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-4"
            >
              {/* Left Step Card */}
              <div className="relative bg-[#0D1117] border border-white/10 hover:border-[#8DC63F]/50 rounded-[10px] px-5 py-4 sm:px-6 sm:py-5 transition-colors duration-200">
                <div className="flex items-center gap-5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#8DC63F] shrink-0 leading-none select-none">
                    {left.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                      {left.title}
                    </h3>
                    <p className="text-xs text-[#A9B4C0] truncate mt-1">
                      {left.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Connecting Flow Arrow */}
              <div className="hidden md:flex items-center justify-center text-white/25">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Right Step Card */}
              <div className="relative bg-[#0D1117] border border-white/10 hover:border-[#8DC63F]/50 rounded-[10px] px-5 py-4 sm:px-6 sm:py-5 transition-colors duration-200">
                <div className="flex items-center gap-5">
                  <span className="text-2xl sm:text-3xl font-black font-mono text-[#8DC63F] shrink-0 leading-none select-none">
                    {right.num}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                      {right.title}
                    </h3>
                    <p className="text-xs text-[#A9B4C0] truncate mt-1">
                      {right.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-xs text-center text-[#8B949E] pt-2 font-mono">
          Project delivery process for new construction and existing-building projects.
        </p>
      </div>
    </section>
  );
}

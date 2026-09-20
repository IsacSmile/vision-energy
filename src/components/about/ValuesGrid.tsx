'use client';

import React, { useRef } from 'react';

{/* TODO: Client to provide one-line descriptions for each value. */}
{/* TODO: Client wording was 'Guaranteed Support' and 'Innovative Solution'. */}

const VALUES = [
  { num: '01', name: 'Choice & Respect' },
  { num: '02', name: 'Innovative Solutions' },
  { num: '03', name: 'Reliable Approach' },
  { num: '04', name: 'Trust Factor' },
  { num: '05', name: 'Responsible Actions' },
  { num: '06', name: 'Dependable Support' },
];

function ValueCell({ num, name }: { num: string; name: string }) {
  const cellRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cellRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      ref={cellRef}
      onMouseMove={handleMouseMove}
      className="group/val relative bg-[#050608] min-h-[160px] p-8 flex flex-col justify-between overflow-hidden transition-colors active-press select-none"
    >
      {/* Radial Lime Spotlight Glow on Mouse Hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover/val:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(141, 198, 63, 0.12), transparent 80%)',
        }}
        aria-hidden="true"
      />

      {/* Number on Top */}
      <div className="text-sm font-mono font-semibold text-[#A9B4C0] group-hover/val:text-[#8DC63F] transition-colors tabular-nums">
        {num}
      </div>

      {/* Name Below */}
      <h3 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold text-white leading-snug tracking-tight">
        {name}
      </h3>
    </div>
  );
}

export default function ValuesGrid() {
  return (
    <div>
      {/* Mobile View (< md): Single column of rows (min-h 64px, hairline dividers) */}
      <ol className="block md:hidden divide-y divide-[#1F2937] border-y border-[#1F2937]">
        {VALUES.map((v) => (
          <li
            key={v.num}
            className="min-h-[64px] py-4 flex items-center gap-4 active-press select-none"
          >
            <span className="text-sm font-mono font-semibold text-[#A9B4C0] tabular-nums shrink-0">
              {v.num}
            </span>
            <span className="text-[22px] font-medium text-white tracking-tight">
              {v.name}
            </span>
          </li>
        ))}
      </ol>

      {/* Desktop / Tablet View (>= md): 3 x 2 Grid inside rounded 24px container */}
      <ol className="hidden md:grid md:grid-cols-3 gap-[1px] bg-[#1F2937] rounded-[24px] overflow-hidden border border-[#1F2937]">
        {VALUES.map((v) => (
          <li key={v.num} className="list-none">
            <ValueCell num={v.num} name={v.name} />
          </li>
        ))}
      </ol>
    </div>
  );
}

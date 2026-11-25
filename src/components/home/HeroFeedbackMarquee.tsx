'use client';

import React from 'react';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export interface CustomerFeedbackItem {
  id: string;
  name: string;
  initials: string;
  role: string;
  emirate: string;
  niche: string;
  quote: string;
  rating: number;
}

const FEEDBACK_COLUMN_1: CustomerFeedbackItem[] = [
  {
    id: 'fb-1',
    name: 'Eng. Tariq Al Mansoori',
    initials: 'TM',
    role: 'MEP Manager · Al Noor',
    emirate: 'Dubai',
    niche: 'Lightning',
    quote: 'IEC 62305 submittals passed DEWA review first try.',
    rating: 5,
  },
  {
    id: 'fb-2',
    name: 'Rajesh Menon',
    initials: 'RM',
    role: 'Lead Eng · Emirates Infra',
    emirate: 'Abu Dhabi',
    niche: 'Earthing',
    quote: 'Hit <0.8 Ω earth resistance in coastal UAE soil.',
    rating: 5,
  },
  {
    id: 'fb-3',
    name: 'Khalid Al Mazrouei',
    initials: 'KM',
    role: 'Ops Head · Gulf Works',
    emirate: 'Sharjah',
    niche: 'Switchgear',
    quote: '18+ yrs UAE trust—fast 24h switchgear dispatch.',
    rating: 5,
  },
  {
    id: 'fb-4',
    name: 'Dr. Fatima Al Qasimi',
    initials: 'FQ',
    role: 'Lab Director · Horizon',
    emirate: 'RAK',
    niche: 'Lab Gear',
    quote: 'Balances & glassware arrived ISO 17025 audit-ready.',
    rating: 5,
  },
  {
    id: 'fb-5',
    name: 'Omar Haddad',
    initials: 'OH',
    role: 'HSE Lead · Desert Energy',
    emirate: 'KIZAD',
    niche: 'Safety PPE',
    quote: 'EN-certified PPE & 316 SS engraved asset tags.',
    rating: 5,
  },
];

const FEEDBACK_COLUMN_2: CustomerFeedbackItem[] = [
  {
    id: 'fb-6',
    name: 'Sandeep Kulkarni',
    initials: 'SK',
    role: 'MEP Lead · Crescent Eng',
    emirate: 'Jebel Ali',
    niche: 'ESE Systems',
    quote: 'NFC 17-102 ESE sizing cleared Civil Defense day one.',
    rating: 5,
  },
  {
    id: 'fb-7',
    name: 'Abdullah Al Suwaidi',
    initials: 'AS',
    role: 'Director · Marina Towers',
    emirate: 'Dubai',
    niche: 'Pumps & MEP',
    quote: 'Reliable booster pumps, valves & rapid support.',
    rating: 5,
  },
  {
    id: 'fb-8',
    name: 'Nadia Al Harthi',
    initials: 'NH',
    role: 'Procurement · Oasis Solar',
    emirate: 'Al Ain',
    niche: 'Solar Grid',
    quote: 'Solar PV grounding grids & exothermic weld kits.',
    rating: 5,
  },
  {
    id: 'fb-9',
    name: 'Vikram Sharma',
    initials: 'VS',
    role: 'Project Eng · Apex MEP',
    emirate: 'Abu Dhabi',
    niche: 'Manpower',
    quote: 'Certified crew finished soil testing ahead of plan.',
    rating: 5,
  },
  {
    id: 'fb-10',
    name: 'Hassan Al Blooshi',
    initials: 'HB',
    role: 'Ops Mgr · Coastal Club',
    emirate: 'Fujairah',
    niche: 'LED & Gym',
    quote: 'Commercial gym gear & waterproof LED floodlights.',
    rating: 5,
  },
];

/**
 * Compact UAE flag SVG emblem for customer feedback cards.
 */
function UAEFlagBadgeIcon() {
  return (
    <svg
      viewBox="0 0 20 14"
      className="w-3.5 h-2.5 rounded-[2px] shrink-0 shadow-[0_0_0_1px_rgba(15,23,42,0.14)]"
      aria-hidden="true"
    >
      <rect width="20" height="4.67" y="0" fill="#00732F" />
      <rect width="20" height="4.67" y="4.67" fill="#FFFFFF" />
      <rect width="20" height="4.66" y="9.34" fill="#000000" />
      <rect width="5.5" height="14" x="0" y="0" fill="#FF0000" />
    </svg>
  );
}

function FeedbackCard({ item }: { item: CustomerFeedbackItem }) {
  return (
    <article
      data-light-surface="true"
      className="group relative rounded-xl bg-white/[0.76] hover:bg-white/[0.88] backdrop-blur-md border border-white/70 hover:border-[#8DC63F] ring-1 ring-inset ring-white/50 p-2.5 shadow-[0_8px_24px_rgba(5,10,20,0.22)] transition-all duration-300"
    >
      {/* Top Row: Avatar, Client Name & Concise Role */}
      <div className="flex items-center gap-2 mb-1">
        <div
          className="w-6 h-6 rounded-full bg-gradient-to-br from-[#0B65B3] to-[#4D7C0F] flex items-center justify-center text-[9.5px] font-bold text-white shrink-0 shadow-sm"
          aria-hidden="true"
        >
          {item.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1">
            <span className="text-[11px] font-bold text-[#07111E] truncate block leading-tight">
              {item.name}
            </span>
            <CheckCircle2 className="w-2.5 h-2.5 text-[#3F6212] shrink-0" aria-hidden="true" />
          </div>
          <span className="text-[9px] font-medium text-[#334155] truncate block leading-tight">
            {item.role}
          </span>
        </div>
      </div>

      {/* Compact 5-Star Rating */}
      <div className="flex items-center gap-0.5 mb-1" aria-label={`${item.rating} out of 5 stars`}>
        {Array.from({ length: item.rating }).map((_, idx) => (
          <Star
            key={idx}
            className="w-2.5 h-2.5 fill-[#D97706] text-[#D97706]"
            aria-hidden="true"
          />
        ))}
        <span className="ml-1 text-[9px] font-bold text-[#92400E]">5.0</span>
      </div>

      {/* Concise, High-Contrast 2-Line Quote */}
      <div className="text-[10.5px] leading-[1.35] font-medium text-[#0F172A] line-clamp-2 mb-1.5">
        &ldquo;{item.quote}&rdquo;
      </div>

      {/* Bottom Location & Niche Pill */}
      <div className="flex items-center">
        <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-md bg-white/85 border border-slate-300/70 text-[#07111E] text-[9px] font-bold max-w-full shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
          <UAEFlagBadgeIcon />
          <span className="truncate text-[#07111E]">
            {item.emirate} · {item.niche}
          </span>
        </span>
      </div>
    </article>
  );
}

function MarqueeColumn({
  items,
  direction,
}: {
  items: CustomerFeedbackItem[];
  direction: 'up' | 'down';
}) {
  const animClass =
    direction === 'up' ? 'animate-vertical-marquee-up' : 'animate-vertical-marquee-down';

  return (
    <div className="relative h-full overflow-hidden">
      <div className={`flex flex-col ${animClass}`}>
        <div className="flex flex-col gap-2.5 pb-2.5">
          {items.map((item) => (
            <FeedbackCard key={`a-${item.id}`} item={item} />
          ))}
        </div>
        <div className="flex flex-col gap-2.5 pb-2.5" aria-hidden="true">
          {items.map((item) => (
            <FeedbackCard key={`b-${item.id}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Slim dual-column infinite vertical scrolling customer feedback showcase.
 * Narrow frosted-glass cards keep surrounding and underlying hero photography visible.
 */
export default function HeroFeedbackMarquee() {
  return (
    <div className="w-full max-w-[388px] lg:max-w-[372px] xl:max-w-[392px] mx-auto lg:mx-0 lg:ml-auto flex flex-col gap-2">
      {/* Compact Verified Feedback Header */}
      <div className="flex items-center justify-between gap-2 px-0.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A1426]/75 border border-white/20 backdrop-blur-md">
          <ShieldCheck className="w-3 h-3 text-[#8DC63F] shrink-0" aria-hidden="true" />
          <span className="text-[10.5px] font-semibold text-white tracking-wide">
            UAE Client Feedback
          </span>
        </div>

        <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0A1426]/75 border border-[#F2C230]/35 backdrop-blur-md">
          <Star className="w-2.5 h-2.5 fill-[#F2C230] text-[#F2C230] shrink-0" aria-hidden="true" />
          <span className="text-[10.5px] font-bold text-white">4.9/5</span>
          <span className="text-[9.5px] text-[#CBD5E1]">· 250+</span>
        </div>
      </div>

      {/* Masked Vertical Scrolling Viewport */}
      <div
        className="vertical-marquee-container relative w-full h-[235px] lg:h-[325px] xl:h-[350px] overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to bottom, transparent 0%, black 11%, black 89%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, black 11%, black 89%, transparent 100%)',
        }}
        aria-label="Infinite scrolling UAE customer feedback"
      >
        {/* Dual slim opposing vertical columns */}
        <div className="grid grid-cols-2 gap-2.5 h-full">
          <MarqueeColumn items={FEEDBACK_COLUMN_1} direction="up" />
          <MarqueeColumn items={FEEDBACK_COLUMN_2} direction="down" />
        </div>
      </div>
    </div>
  );
}

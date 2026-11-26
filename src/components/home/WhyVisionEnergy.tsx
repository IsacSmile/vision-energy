'use client';

import React from 'react';
import {
  BadgeCheck,
  Check,
  Compass,
  Layers,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import '@/app/expertise/expertise.css';

interface WhyCard {
  step: string;
  title: string;
  icon: LucideIcon;
  accent: 'green' | 'blue';
  points: Array<{ strong: string; text: string }>;
}

const WHY_FEATURE_CARDS: WhyCard[] = [
  {
    step: '1. Technical Expertise',
    title: 'Product Selection for Your Project',
    icon: Layers,
    accent: 'green',
    points: [
      {
        strong: 'Broad Portfolio:',
        text: 'Electrical, mechanical and renewable energy solutions, laboratory and gym equipment, and specialist lightning protection and earthing systems.',
      },
      {
        strong: 'Specification Review:',
        text: 'We review ratings, materials, dimensions and compatibility against project requirements.',
      },
      {
        strong: 'Practical Alternatives:',
        text: 'Where suitable, we propose options based on performance, availability and budget.',
      },
      {
        strong: 'Technical Submittals:',
        text: 'We provide manufacturer datasheets and supporting documentation for consultant review.',
      },
    ],
  },
  {
    step: '2. Standards & Regulations',
    title: 'Aligned with Project and Authority Requirements',
    icon: ShieldCheck,
    accent: 'blue',
    points: [
      {
        strong: 'Applicable Standards:',
        text: 'We reference the relevant project and product-specific standards for each scope where permitted by the relevant authority and project specifications.',
      },
      {
        strong: 'Local Authority Requirements:',
        text: 'We account for applicable regulations, technical circulars and notices issued by municipalities and Civil Defence authorities.',
      },
      {
        strong: 'Utility and Energy Requirements:',
        text: 'Where relevant, we support documentation for projects subject to requirements from TAQA, DEWA, DoE, EtihadWE, Sharjah Electricity, Water and Gas Authority, and the ADCDA Civil Defence Authorities.',
      },
    ],
  },
  {
    step: '3. Project Coordination',
    title: 'Support from Enquiry to Handover',
    icon: Compass,
    accent: 'green',
    points: [
      {
        strong: 'Single Point of Contact:',
        text: 'One team coordinates technical queries, quotations, submittals and delivery.',
      },
      {
        strong: 'Site and Design Coordination:',
        text: 'We work with clients, consultants and contractors to address site constraints and installation requirements.',
      },
      {
        strong: 'Installation Support:',
        text: 'We coordinate specialist installation through qualified partners where included in the project scope.',
      },
      {
        strong: 'Testing and Handover:',
        text: 'Where included, we coordinate testing, commissioning and handover documentation.',
      },
    ],
  },
  {
    step: '4. Quality & Sourcing',
    title: 'Products Suited to the Application',
    icon: BadgeCheck,
    accent: 'blue',
    points: [
      {
        strong: 'Authorised Distribution:',
        text: 'We represent specialist manufacturers in the UAE across selected product lines.',
      },
      {
        strong: 'Application-Specific Selection:',
        text: 'We consider operating conditions such as heat, dust, humidity and corrosion exposure.',
      },
      {
        strong: 'Product Documentation:',
        text: 'We provide available certificates, test reports and manufacturer warranty details as required.',
      },
      {
        strong: 'Supply Planning:',
        text: 'We confirm stock status, lead times and delivery requirements during procurement.',
      },
    ],
  },
  {
    step: '5. Long-Term Performance',
    title: 'Equipment That’s Easier to Maintain',
    icon: Wrench,
    accent: 'green',
    points: [
      {
        strong: 'Serviceability:',
        text: 'We consider access for inspection, maintenance and replacement when recommending equipment.',
      },
      {
        strong: 'Spares and Accessories:',
        text: 'We assist with compatible consumables, accessories and replacement parts.',
      },
      {
        strong: 'Operating Documentation:',
        text: 'We provide available manufacturer operation and maintenance manuals.',
      },
      {
        strong: 'After-Sales Support:',
        text: 'We assist with technical queries, warranty coordination and replacement sourcing.',
      },
    ],
  },
];

/**
 * Top capability showcase presenting Vision Energy's five engineering support
 * pillars in a balanced multi-column card bento grid without horizontal scrolling.
 */
export default function WhyVisionEnergy() {
  return (
    <section
      id="why-vision-energy"
      aria-labelledby="why-vision-energy-heading"
      className="py-10 sm:py-12 lg:py-14 bg-white dark:bg-[#050608] relative border-b border-slate-200/80 dark:border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2.5 text-xs sm:text-[13px] font-bold text-[#5B8C1E] dark:text-[#8DC63F] uppercase tracking-[0.14em]">
            <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
            <span>Why Vision Energy</span>
          </div>

          <h2
            id="why-vision-energy-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0A192F] dark:text-white leading-[1.18] tracking-[-0.02em]"
          >
            Specialist Products and Technical Support Across the UAE and GCC
          </h2>
        </div>

        {/* Balanced 5-Card Bento Grid (3 equal columns top row, 2 balanced wide columns bottom row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6 items-stretch">
          {WHY_FEATURE_CARDS.map((card, idx) => {
            const Icon = card.icon;
            const isBlue = card.accent === 'blue';
            const isBottomWide = idx >= 3;
            const gridSpanClass = isBottomWide
              ? idx === 4
                ? 'md:col-span-2 lg:col-span-3'
                : 'md:col-span-1 lg:col-span-3'
              : 'lg:col-span-2';

            return (
              <article
                key={card.step}
                className={`expertise-card ${isBlue ? 'accent-blue' : ''} group p-6 sm:p-7 flex flex-col gap-5 h-full ${gridSpanClass}`}
              >
                {/* Top Row: Icon Tile + Step Label */}
                <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100 dark:border-white/[0.08]">
                  <div
                    className={`expertise-icon-tile ${
                      isBlue ? 'expertise-icon-tile-blue' : 'expertise-icon-tile-green'
                    } w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      isBlue
                        ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#0B65B3]/20 dark:text-[#60A5FA]'
                        : 'bg-[#8DC63F]/15 text-[#38700D] dark:text-[#8DC63F]'
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <span
                      className={`block text-[11px] sm:text-xs font-bold uppercase tracking-[0.12em] ${
                        isBlue
                          ? 'text-[#0B65B3] dark:text-[#60A5FA]'
                          : 'text-[#5B8C1E] dark:text-[#8DC63F]'
                      }`}
                    >
                      {card.step}
                    </span>
                    <h3 className="text-lg sm:text-[19px] font-bold text-[#0A192F] dark:text-white leading-snug tracking-tight">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Feature Points (wide bottom cards render 2 balanced sub-columns) */}
                <ul
                  className={
                    isBottomWide
                      ? 'grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5'
                      : 'space-y-3.5'
                  }
                >
                  {card.points.map((pt, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-2.5 text-[14px] sm:text-[14.5px] leading-[1.6] text-[#475569] dark:text-[#CBD5E1]"
                    >
                      <span
                        className={`mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          isBlue
                            ? 'bg-[#0B65B3]/10 dark:bg-[#0B65B3]/20 text-[#0B65B3] dark:text-[#60A5FA]'
                            : 'bg-[#8DC63F]/15 text-[#5B8C1E] dark:text-[#8DC63F]'
                        }`}
                        aria-hidden="true"
                      >
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </span>
                      <span>
                        <strong className="text-[#0A192F] dark:text-white font-semibold">
                          {pt.strong}{' '}
                        </strong>
                        {pt.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { FileCode2, HelpCircle } from 'lucide-react';
import { EXPERTISE_FAQ_ITEMS } from '@/lib/data/expertise';

export default function ExpertiseFaqSection() {
  return (
    <section
      id="expertise-faq"
      aria-labelledby="expertise-faq-heading"
      className="bg-[#F8FAFC] dark:bg-[#080C12] border-b border-slate-200 dark:border-[#1F2937]/80 py-14 sm:py-16 lg:py-20"
    >
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2.5 text-xs font-bold text-[#5B8C1E] dark:text-[#8DC63F] uppercase tracking-[0.14em]">
              <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
              <span>Technical FAQ &amp; Standards Reference</span>
            </div>

            <h2
              id="expertise-faq-heading"
              className="text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#0A192F] dark:text-white leading-[1.2] tracking-[-0.02em]"
            >
              Engineering Answers on Lightning, Earthing, Gym &amp; Laboratory Solutions
            </h2>

            <p className="text-[15px] sm:text-base text-[#475569] dark:text-[#A9B4C0] leading-[1.6]">
              Direct answers covering UAE compliance standards, soil-resistivity design, surge coordination, and specialist facility procurement across the UAE and Qatar.
            </p>
          </div>

          <a
            href="/expertise.md"
            type="text/markdown"
            aria-label="Technical Spec (.md) — Machine-readable Markdown reference for /expertise"
            className="inline-flex items-center gap-2 self-start lg:self-auto px-4 py-2 rounded-full border border-slate-200/90 dark:border-white/15 bg-white dark:bg-[#0D1117] text-xs font-semibold text-[#0B65B3] dark:text-[#8DC63F] hover:border-[#0B65B3] dark:hover:border-[#8DC63F] shadow-sm transition-colors"
          >
            <FileCode2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Technical Spec (.md)</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {EXPERTISE_FAQ_ITEMS.map((item) => {
            const isPrimary = item.priority === 1;
            return (
              <article
                key={item.id}
                id={item.id}
                className="expertise-card p-6 sm:p-7 flex flex-col gap-3.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-[0.08em] ${
                      isPrimary
                        ? 'bg-[#0B65B3]/10 dark:bg-[#0B65B3]/25 text-[#0B65B3] dark:text-[#60A5FA]'
                        : 'bg-[#8DC63F]/15 dark:bg-[#8DC63F]/20 text-[#3F6E0C] dark:text-[#8DC63F]'
                    }`}
                  >
                    <HelpCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
                    <span>{item.topic}</span>
                  </span>

                  <span className="text-[11px] font-semibold text-[#64748B] dark:text-[#94A3B8]">
                    {isPrimary ? 'Core Engineering' : 'Specialist Supply'}
                  </span>
                </div>

                <h3 className="text-base sm:text-[17px] font-bold text-[#0A192F] dark:text-white leading-snug tracking-tight">
                  {item.question}
                </h3>

                <p
                  data-aeo-answer="true"
                  className="text-sm sm:text-[15px] text-[#475569] dark:text-[#CBD5E1] leading-[1.65]"
                >
                  {item.answer}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}


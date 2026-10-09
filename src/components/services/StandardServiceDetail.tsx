'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowDown, PhoneCall, ShieldCheck } from 'lucide-react';
import type { StandardServiceDetailPage } from '@/lib/data/service-detail-pages';

interface StandardServiceDetailProps {
  data: StandardServiceDetailPage;
}

export default function StandardServiceDetail({ data }: StandardServiceDetailProps) {
  const {
    badgeLabel,
    title,
    intro,
    sectionsBeforeProcess = [],
    processSection,
    sectionsAfterProcess = [],
    contactSection,
  } = data;

  return (
    <div className="w-full bg-[#F8FAFC] dark:bg-[#050608] text-slate-900 dark:text-white selection:bg-[#8DC63F]/20 selection:text-[#8DC63F] min-h-screen pb-20 lg:pb-24">
      {/* 1. TOP NAVIGATION / BREADCRUMB HEADER */}
      <header className="border-b border-slate-200 dark:border-white/10 bg-white/80 dark:bg-[#0A0E17]/80 backdrop-blur-md sticky top-0 z-30 pt-[calc(var(--header-offset,0px)+16px)] pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5B8C1E] dark:text-[#8DC63F] hover:text-slate-900 dark:hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded py-1"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>← Back to Services</span>
          </Link>

          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-slate-500 dark:text-[#A9B4C0]">
              <li>
                <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">/</li>
              <li>
                <Link href="/services" className="hover:text-slate-900 dark:hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">/</li>
              <li className="text-slate-800 dark:text-white font-semibold truncate max-w-[20ch]" aria-current="page">
                {badgeLabel}
              </li>
            </ol>
          </nav>
        </div>
      </header>

      {/* 2. MAIN EDITORIAL CONTENT CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12 lg:space-y-16">
        
        {/* HEADER SECTION: Green Badge + Big Title + Intro */}
        <div className="space-y-6">
          {/* Small Green Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/40 dark:border-[#8DC63F]/30 text-[#5B8C1E] dark:text-[#8DC63F] text-xs font-bold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shrink-0" />
            <span>{badgeLabel}</span>
          </div>

          {/* Big Page Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18]">
            {title}
          </h1>

          {/* Intro Paragraph with Accent Highlight */}
          <div className="border-l-4 border-[#8DC63F] pl-5 sm:pl-6 py-1">
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 dark:text-[#CBD5E1] leading-relaxed">
              {intro}
            </p>
          </div>
        </div>

        {/* 3. SECTIONS BEFORE PROCESS */}
        {sectionsBeforeProcess.map((sec, idx) => (
          <section
            key={sec.id || idx}
            id={sec.id}
            className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-xl space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F] shrink-0" aria-hidden="true" />
              <span>{sec.title}</span>
            </h2>
            {Array.isArray(sec.content) ? (
              sec.content.map((p, pIdx) => (
                <p key={pIdx} className="text-base sm:text-lg text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-base sm:text-lg text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                {sec.content}
              </p>
            )}
          </section>
        ))}

        {/* 4. OUR FOUR-STEP PROCESS */}
        {processSection && (
          <section id="process" className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8C1E] dark:text-[#8DC63F]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                <span>Workflow &amp; Methodology</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {processSection.title}
              </h2>
              {processSection.description && (
                <p className="text-sm sm:text-base text-slate-600 dark:text-[#A9B4C0]">
                  {processSection.description}
                </p>
              )}
            </div>

            {/* DESKTOP VIEW: 4 cards in a row with horizontal arrows between them */}
            <div className="hidden lg:grid grid-cols-4 gap-4 relative items-stretch">
              {processSection.steps.map((st, i) => {
                const isLast = i === processSection.steps.length - 1;
                return (
                  <div key={st.step} className="relative flex flex-col">
                    <div className="flex-1 p-6 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 hover:border-[#8DC63F]/70 transition-all duration-300 shadow-sm hover:shadow-md dark:shadow-md flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/40 dark:border-[#8DC63F]/30 text-[#5B8C1E] dark:text-[#8DC63F] text-xs font-mono font-bold">
                            {st.stepLabel || `Step ${st.step}`}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                            0{st.step}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                          {st.title}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                        {st.description}
                      </p>
                    </div>

                    {/* Desktop Horizontal Arrow to Next Step */}
                    {!isLast && (
                      <div
                        className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-white dark:bg-[#050608] border border-slate-200 dark:border-white/20 flex items-center justify-center text-[#5B8C1E] dark:text-[#8DC63F] shadow-sm pointer-events-none"
                        aria-hidden="true"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* MOBILE & TABLET VIEW: Stacked vertically with downward arrows between cards */}
            <div className="lg:hidden flex flex-col space-y-3">
              {processSection.steps.map((st, i) => {
                const isLast = i === processSection.steps.length - 1;
                return (
                  <React.Fragment key={st.step}>
                    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 shadow-sm space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/40 dark:border-[#8DC63F]/30 text-[#5B8C1E] dark:text-[#8DC63F] text-xs font-mono font-bold">
                          {st.stepLabel || `Step ${st.step}`}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                          0{st.step}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {st.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                        {st.description}
                      </p>
                    </div>

                    {/* Mobile Downward Arrow */}
                    {!isLast && (
                      <div className="flex justify-center py-1" aria-hidden="true">
                        <div className="w-7 h-7 rounded-full bg-white dark:bg-[#050608] border border-slate-200 dark:border-white/20 flex items-center justify-center text-[#5B8C1E] dark:text-[#8DC63F] shadow-sm">
                          <ArrowDown className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </section>
        )}

        {/* 5. SECTIONS AFTER PROCESS */}
        {sectionsAfterProcess.map((sec, idx) => (
          <section
            key={sec.id || idx}
            id={sec.id}
            className="p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-xl space-y-4"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#8DC63F] shrink-0" aria-hidden="true" />
              <span>{sec.title}</span>
            </h2>
            {Array.isArray(sec.content) ? (
              sec.content.map((p, pIdx) => (
                <p key={pIdx} className="text-base sm:text-lg text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                  {p}
                </p>
              ))
            ) : (
              <p className="text-base sm:text-lg text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                {sec.content}
              </p>
            )}
          </section>
        ))}

        {/* 6. CONTACT SECTION AT THE BOTTOM */}
        {contactSection && (
          <section id="contact" className="scroll-mt-28">
            <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 dark:from-[#0C1017] dark:via-[#050608] dark:to-[#0D1420] border border-slate-200 dark:border-[#8DC63F]/30 p-8 sm:p-10 lg:p-12 shadow-md dark:shadow-2xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
                <div className="max-w-2xl space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8C1E] dark:text-[#8DC63F]">
                    <ShieldCheck className="w-4 h-4 text-[#8DC63F]" />
                    <span>Expert Technical Consultation</span>
                  </div>
                  {contactSection.heading && (
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                      {contactSection.heading}
                    </h2>
                  )}
                  <p className="text-base sm:text-lg text-slate-700 dark:text-[#CBD5E1] leading-relaxed">
                    {contactSection.text}
                  </p>
                </div>

                <div className="shrink-0 flex flex-wrap sm:flex-nowrap items-center gap-3.5">
                  <Link
                    href={contactSection.buttonLink}
                    className="py-3.5 px-8 rounded-full bg-[#8DC63F] hover:bg-[#9ee047] text-[#050608] font-bold text-sm tracking-wide shadow-lg shadow-[#8DC63F]/25 hover:shadow-[#8DC63F]/40 transition-all duration-300 active:scale-95 inline-flex items-center gap-2"
                  >
                    <span>{contactSection.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="tel:+97172042763"
                    className="py-3.5 px-5 rounded-full bg-white dark:bg-[#050608] hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white font-bold text-sm border border-slate-300 dark:border-white/20 transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap shadow-sm dark:shadow-none"
                  >
                    <PhoneCall className="w-4 h-4 text-[#5B8C1E] dark:text-[#8DC63F]" />
                    <span>+971 7 204 2763</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}

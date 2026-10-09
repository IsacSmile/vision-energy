'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  ArrowDown,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Gauge,
  Activity,
  Award,
  Zap,
} from 'lucide-react';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import type { StandardServiceDetailPage } from '@/lib/data/service-detail-pages';

interface StandardServiceDetailProps {
  data: StandardServiceDetailPage;
}

export default function StandardServiceDetail({ data }: StandardServiceDetailProps) {
  const { openServiceModal } = useEnquiryModal();

  const {
    slug,
    badgeLabel = 'EARTHING & GROUNDING',
    title,
    intro,
    sectionsBeforeProcess = [],
    processSection,
    sectionsAfterProcess = [],
    contactSection,
  } = data;

  const handleRequestClick = () => {
    openServiceModal({
      serviceSlug: slug,
      serviceTitle: title || 'Earthing & Grounding System Design & Installation',
    });
  };

  const metaChips = [
    'Low-Impedance Grids',
    'Soil Resistivity Testing',
    'IEEE 80 · BS 7430',
    'Exothermic Bonding',
    'DEWA · SEWA · FEWA',
  ];

  const processSteps = processSection?.steps || [
    {
      step: 1,
      title: 'Soil Study',
      description:
        'Soil resistivity testing and site assessment, so the design is based on measured data, not assumptions.',
    },
    {
      step: 2,
      title: 'Earth Electrodes',
      description:
        'Earth rods, deep-driven electrodes and earth pits, with ground enhancement materials where the soil needs it.',
    },
    {
      step: 3,
      title: 'Bonding Network',
      description:
        'Earth bars, structural steel and metallic services connected into one network using exothermic welded joints.',
    },
    {
      step: 4,
      title: 'Test & Record',
      description:
        'Earth resistance and continuity testing, handed over with full documented records.',
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-[#050608] text-slate-900 dark:text-white selection:bg-[#8DC63F]/20 selection:text-[#8DC63F] pb-24 lg:pb-16">
      {/* ============================================================ */}
      {/* 1. TOP HEADER & BREADCRUMB HERO (Matches Image 2 & 3 UI) */}
      {/* ============================================================ */}
      <section
        data-dark-hero="true"
        data-preserve-contrast="true"
        className="service-detail-hero relative overflow-hidden bg-[#050608] pt-[calc(var(--header-offset,0px)+32px)] lg:pt-[calc(var(--header-offset,0px)+48px)] pb-10 lg:pb-14 border-b border-white/10"
      >
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#8DC63F_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Back to Services link & Breadcrumbs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded py-1"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back to Services</span>
            </Link>

            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-xs text-[#A9B4C0]">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">/</li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Services
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-40">/</li>
                <li
                  data-preserve-contrast="true"
                  className="text-white font-medium truncate max-w-[22ch]"
                  style={{ color: '#FFFFFF' }}
                  aria-current="page"
                >
                  {badgeLabel}
                </li>
              </ol>
            </nav>
          </div>

          {/* Badges / Meta Chips */}
          <div className="flex flex-wrap gap-2 pt-1">
            {metaChips.map((chip, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-[#8DC63F]/10 text-[#8DC63F] border border-[#8DC63F]/30 rounded-full text-xs font-semibold tracking-wide"
              >
                {chip}
              </span>
            ))}
          </div>

          {/* Header Title + Action Group */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pt-2">
            <div className="space-y-3 max-w-3xl">
              <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest block">
                VISION ENERGY INTERNATIONAL · EARTHING &amp; GROUNDING SPECIALISTS
              </span>
              <h1
                data-preserve-contrast="true"
                className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.12]"
                style={{ color: '#FFFFFF', textShadow: '0 2px 14px rgba(0,0,0,0.95)' }}
              >
                Earthing &amp; Grounding System Design &amp; Installation
              </h1>
              <p
                data-preserve-contrast="true"
                className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed"
                style={{ color: '#CBD5E1' }}
              >
                {intro}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-4">
              <button
                type="button"
                onClick={handleRequestClick}
                className="py-3 px-7 rounded-full bg-[#8DC63F] hover:bg-[#9ee047] text-[#050608] font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(141,198,63,0.3)] transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Request Site Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. MAIN CONTAINER - NUMBERED EDITORIAL SECTIONS (Image 2 style) */}
      {/* ============================================================ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16 lg:space-y-20">
        
        {/* SECTION 01: OVERVIEW (Side-by-Side with Real Site Photography) */}
        <section id="overview" className="scroll-mt-28">
          <div className="bg-slate-50/80 dark:bg-[#0C1017] border border-slate-200/80 dark:border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm dark:shadow-2xl space-y-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Left: Overview Text */}
              <div className="flex-1 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/35 dark:border-[#8DC63F]/30 text-[#5B8C1E] dark:text-[#8DC63F] text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                  <span>Section 01 · Overview</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Earthing That Holds Up in UAE Ground
                </h2>
                <p className="text-base sm:text-lg text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                  Certified low-resistance earthing networks engineered for critical infrastructure across UAE ground conditions.
                </p>
                <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#050608] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                    <p className="text-xs text-slate-500 dark:text-[#A9B4C0]">Target Resistance</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">&lt; 1.0 Ω Target</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#050608] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none">
                    <p className="text-xs text-slate-500 dark:text-[#A9B4C0]">Bonding Method</p>
                    <p className="text-sm font-bold text-[#5B8C1E] dark:text-[#8DC63F] mt-1">100% Exothermic</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-[#050608] border border-slate-200 dark:border-white/10 col-span-2 sm:col-span-1 shadow-sm dark:shadow-none">
                    <p className="text-xs text-slate-500 dark:text-[#A9B4C0]">Standards</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">BS 7430 · IEEE 80</p>
                  </div>
                </div>
              </div>

              {/* Right: Uploaded Real Site Photography */}
              <div className="w-full lg:w-[480px] shrink-0 space-y-2.5">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-[#050608] border border-slate-200 dark:border-white/10 shadow-xl group">
                  <Image
                    src="/images/earthing-grounding-hero.webp"
                    alt="Vision Energy specialist engineers installing rooftop earthing and lightning copper grid network on UAE site"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 bg-[#050608]/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                    <span className="font-semibold">Vision Energy Site Personnel</span>
                    <span className="text-[#8DC63F] font-mono text-[11px]">UAE Earthing Deployment</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A9B4C0] italic text-center">
                  Engineers reviewing installation schematics with copper earthing tape networks on site in the UAE.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 02: WHY UAE SOIL IS A CHALLENGE */}
        <section id="soil-challenges" className="scroll-mt-28 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8C1E] dark:text-[#8DC63F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>Section 02 · Soil Geology &amp; Challenges</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why UAE Soil Is a Challenge
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#A9B4C0]">
              UAE ground varies widely within a single site. A design that works on one site can fail on another, which is why we engineer tailored solutions for every terrain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Challenge 1: Desert Sand */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 hover:border-[#8DC63F]/70 transition-all duration-300 space-y-3 group shadow-sm hover:shadow-md dark:shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 flex items-center justify-center text-[#5B8C1E] dark:text-[#8DC63F] group-hover:scale-105 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#5B8C1E] dark:group-hover:text-[#8DC63F] transition-colors">
                High-Resistivity Desert Sand
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                Dry desert sand has extremely high resistivity and resists carrying fault current into the earth. We engineer deep-driven boreholes and conductive carbon enhancement materials.
              </p>
            </div>

            {/* Challenge 2: Rocky Strata */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 hover:border-[#8DC63F]/70 transition-all duration-300 space-y-3 group shadow-sm hover:shadow-md dark:shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 flex items-center justify-center text-[#5B8C1E] dark:text-[#8DC63F] group-hover:scale-105 transition-transform">
                <Gauge className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#5B8C1E] dark:group-hover:text-[#8DC63F] transition-colors">
                Rocky Ground &amp; Hard Sub-Strata
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                Rocky layers make it hard to drive electrodes deep. We use rotary core drilling, horizontal copper counterpoise grids, and low-resistance backfill to ensure dissipation.
              </p>
            </div>

            {/* Challenge 3: Coastal Sabkha */}
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 hover:border-[#8DC63F]/70 transition-all duration-300 space-y-3 group shadow-sm hover:shadow-md dark:shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 flex items-center justify-center text-[#5B8C1E] dark:text-[#8DC63F] group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-[#5B8C1E] dark:group-hover:text-[#8DC63F] transition-colors">
                Corrosive Saline Sabkha
              </h3>
              <p className="text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                Saline soil near the coast conducts well but corrodes buried metal quickly. We deploy high-purity electrolytic copper tapes and permanent molecular exothermic welded joints.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 03: OUR FOUR-STEP PROCESS (Numbered Stepper, identical to Manpower) */}
        <section id="process" className="scroll-mt-28 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8C1E] dark:text-[#8DC63F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>Section 03 · Workflow &amp; Methodology</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Our Four-Step Process
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#A9B4C0]">
              A systematic, engineering-led workflow ensuring low-resistance dissipation, permanent exothermic bonding, and full authority compliance.
            </p>
          </div>

          {/* DESKTOP VIEW: Numbered Horizontal Stepper */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Horizontal Line across the steps */}
              <div className="absolute top-7 left-12 right-12 h-[2px] bg-slate-200 dark:bg-white/10 z-0" />
              <div className="absolute top-7 left-12 w-3/4 h-[2px] bg-gradient-to-r from-[#8DC63F] via-[#8DC63F]/70 to-transparent z-0" />

              <div className="grid grid-cols-4 gap-6 relative z-10">
                {processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 hover:border-[#8DC63F]/70 transition-all duration-300 flex flex-col space-y-4 group shadow-sm hover:shadow-md dark:shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-[#050608] border-2 border-[#8DC63F] flex items-center justify-center text-slate-900 dark:text-[#8DC63F] font-mono font-bold text-lg shadow-[0_0_15px_rgba(141,198,63,0.15)] group-hover:bg-[#8DC63F] group-hover:text-black transition-colors">
                      0{step.step}
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-[#5B8C1E] dark:group-hover:text-[#8DC63F] transition-colors leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE VIEW: Vertical Stepper */}
          <div className="lg:hidden space-y-4 relative pl-6 border-l-2 border-[#8DC63F]/40 ml-4">
            {processSteps.map((step) => (
              <div key={step.step} className="relative space-y-2">
                {/* Stepper Dot */}
                <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-[#050608] border-2 border-[#8DC63F] flex items-center justify-center text-slate-900 dark:text-[#8DC63F] font-mono font-bold text-xs shadow-sm">
                  0{step.step}
                </div>
                <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 space-y-2 shadow-sm dark:shadow-none">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 04: WHY CLIENTS CHOOSE VISION ENERGY */}
        <section id="why-choose-us" className="scroll-mt-28 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#5B8C1E] dark:text-[#8DC63F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>Section 04 · Engineering Standards &amp; Quality</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Why Clients Choose Vision Energy
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-[#A9B4C0]">
              We cover the entire job, from soil resistivity testing to final authority certification, so you deal with one accountable contractor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 hover:border-[#8DC63F]/70 transition-all duration-300 space-y-2.5 shadow-sm hover:shadow-md dark:shadow-md">
              <div className="w-9 h-9 rounded-xl bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 flex items-center justify-center text-[#5B8C1E] dark:text-[#8DC63F]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Single Point Responsibility</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                From Wenner 4-point soil testing and CAD design through to site installation and final sign-off.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 hover:border-[#8DC63F]/70 transition-all duration-300 space-y-2.5 shadow-sm hover:shadow-md dark:shadow-md">
              <div className="w-9 h-9 rounded-xl bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 flex items-center justify-center text-[#5B8C1E] dark:text-[#8DC63F]">
                <Award className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">BS 7430 &amp; IEEE 80</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                Engineered calculations ensuring step-and-touch voltage safety for industrial substations and commercial towers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 hover:border-[#8DC63F]/70 transition-all duration-300 space-y-2.5 shadow-sm hover:shadow-md dark:shadow-md">
              <div className="w-9 h-9 rounded-xl bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 flex items-center justify-center text-[#5B8C1E] dark:text-[#8DC63F]">
                <Gauge className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Calibrated Test Equipment</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                Fall-of-potential testing with certified, calibrated 4-terminal meters and traceable test records.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#0C1017] border border-slate-200 dark:border-white/10 hover:border-[#8DC63F]/70 transition-all duration-300 space-y-2.5 shadow-sm hover:shadow-md dark:shadow-md">
              <div className="w-9 h-9 rounded-xl bg-[#8DC63F]/15 dark:bg-[#8DC63F]/10 border border-[#8DC63F]/30 flex items-center justify-center text-[#5B8C1E] dark:text-[#8DC63F]">
                <Zap className="w-4 h-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Authority Handover Dossier</h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                As-built CAD drawings, continuity verification records, and compliance files accepted by consultants and UAE utilities.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 05: BOTTOM CTA BANNER (Identical to Image 2 & 3) */}
        <section id="cta" className="scroll-mt-28">
          <div className="relative rounded-2xl sm:rounded-3xl bg-slate-50 dark:bg-gradient-to-br dark:from-[#0C1017] dark:via-[#050608] dark:to-[#0D1420] border border-slate-200 dark:border-[#8DC63F]/30 p-6 sm:p-10 lg:p-12 overflow-hidden shadow-md dark:shadow-2xl">
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-[#8DC63F]/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-[#0B65B3]/10 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-10">
              {/* Left Side: Title & Description */}
              <div className="max-w-2xl space-y-2.5 text-left">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
                  Request Earthing &amp; Grounding Assessment
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                  Planning a new installation or experiencing high earth impedance? Connect with our earthing engineers for on-site Wenner 4-point testing, grid simulation, and certified execution.
                </p>
              </div>

              {/* Right Side: CTA Actions */}
              <div className="shrink-0 flex flex-wrap sm:flex-nowrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={handleRequestClick}
                  className="py-3.5 px-8 rounded-full bg-[#8DC63F] hover:bg-[#9ee047] text-[#050608] font-bold text-sm tracking-wide shadow-lg shadow-[#8DC63F]/25 hover:shadow-[#8DC63F]/40 transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Request Site Assessment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
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

      </main>

      {/* ============================================================ */}
      {/* 3. STICKY BOTTOM ACTION BAR FOR MOBILE (Matches Image 2) */}
      {/* ============================================================ */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-white/95 dark:bg-[#0C1017]/95 backdrop-blur-lg border-t border-slate-200 dark:border-white/15 p-3.5 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Earthing &amp; Grounding</p>
          <p className="text-[11px] text-[#5B8C1E] dark:text-[#8DC63F] font-semibold truncate">BS 7430 · IEEE 80 · UAE Wide</p>
        </div>
        <button
          type="button"
          onClick={handleRequestClick}
          className="py-2.5 px-5 rounded-full bg-[#8DC63F] hover:bg-[#9ee047] text-[#050608] font-bold text-xs shadow-md active:scale-95 transition-all shrink-0 cursor-pointer"
        >
          Request Assessment
        </button>
      </div>
    </div>
  );
}

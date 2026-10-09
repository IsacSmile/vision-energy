'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Users,
  Clock,
  ShieldCheck,
  Wrench,
  FileCheck,
  HardHat,
  PhoneCall,
  Mail,
  Zap,
} from 'lucide-react';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { ServiceRecord } from '@/lib/services/get-services';
import { ServiceContentConfig } from '@/lib/services/content';

interface ManpowerServiceDetailProps {
  service: ServiceRecord;
  content: ServiceContentConfig;
}

export default function ManpowerServiceDetail({
  service,
  content,
}: ManpowerServiceDetailProps) {
  const { openServiceModal } = useEnquiryModal();

  const handleRequestClick = () => {
    openServiceModal({
      serviceSlug: service.slug,
      serviceTitle: service.title,
    });
  };

  const heroImage =
    content.hero?.image ||
    '/images/specialist-engineering-manpower-supply.jpg';
  const heroImageAlt =
    content.hero?.imageAlt ||
    'Specialist engineering manpower and certified technicians on site in UAE';

  const overviewText =
    content.overview ||
    'Skilled electrical, mechanical and solar manpower for projects across the UAE. We supply individual technicians or complete site teams, mobilized with their own tools, testing equipment and PPE, for short shutdowns or long-term contracts.';

  const manpowerList = content.manpowerWeSupply || [
    'Electrical technicians and electricians',
    'Lightning protection and earthing installers',
    'Solar PV installation technicians',
    'Mechanical and MEP technicians',
    'Site engineers and site supervisors',
    'QA/QC inspectors',
    'Skilled helpers and installers',
  ];

  const engagementOptions = content.engagementOptions || [
    {
      title: 'Emergency / shutdown support',
      description: 'Rapid mobilization for urgent repairs and planned shutdowns',
    },
    {
      title: 'Testing & commissioning',
      description: 'Short-term teams for earth resistance, insulation and system testing',
    },
    {
      title: 'Project-based',
      description: 'A full crew for the duration of your installation',
    },
    {
      title: 'Long-term contracts',
      description: 'Dedicated manpower for ongoing operations and maintenance',
    },
  ];

  const whatsIncluded = content.whatsIncluded || [
    'Calibrated testing meters with valid calibration certificates',
    'Specialized installation tooling',
    'Full PPE for every worker',
    'On-site supervision and QA/QC reporting',
  ];

  const complianceList = content.complianceAndSafety || [
    'Workers employed in line with UAE labour law and MOHRE regulations',
    'HSE-trained personnel following site safety requirements',
    'Midday work break rules observed during the summer months',
    'Third-party HSE cards and UAE authority approvals',
  ];

  const whyChooseUs = content.whyChooseUs || [
    '10+ years supplying technical manpower in the UAE',
    'Mobilization within 24-48 hours for urgent requests',
    'Specialists in lightning protection and earthing, not generic labour supply',
    'One point of contact from mobilization to handover',
  ];

  const howItWorks = content.howItWorks || [
    {
      step: 1,
      title: 'Share your requirement',
      description: 'Trades, headcount, location and duration',
    },
    {
      step: 2,
      title: 'Receive a quotation and CVs',
      description: 'Commercial proposal and CVs of the proposed team',
    },
    {
      step: 3,
      title: 'Mobilization to site',
      description: 'We mobilize the team to site with tools and PPE',
    },
    {
      step: 4,
      title: 'Supervised execution',
      description: 'Supervised execution with regular progress and QA/QC reports',
    },
  ];

  const metaChips = content.metaChips || [
    'Specialist Manpower',
    'Technical Support',
    'MOHRE Compliant',
    'Rapid Mobilization',
  ];

  return (
    <div className="w-full bg-[#050608] text-white selection:bg-[#8DC63F]/20 selection:text-[#8DC63F] pb-24 lg:pb-16">
      {/* 1. TOP HEADER & BREADCRUMB */}
      <section
        data-dark-hero="true"
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
                <li className="text-white font-medium truncate max-w-[22ch]" aria-current="page">
                  {service.title}
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
                VISION ENERGY INTERNATIONAL · SPECIALIST TECHNICAL MANPOWER
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-[1.12]">
                {service.title}
              </h1>
              <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
                {overviewText}
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-4">
              <button
                type="button"
                onClick={handleRequestClick}
                className="py-3 px-7 rounded-full bg-[#8DC63F] hover:bg-[#9ee047] text-[#050608] font-bold text-sm tracking-wide shadow-[0_10px_30px_rgba(141,198,63,0.3)] transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Request Manpower</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16 lg:space-y-20">
        
        {/* SECTION 1: OVERVIEW */}
        <section id="overview" className="scroll-mt-28">
          <div className="bg-[#0C1017] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl space-y-8">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              {/* Left: Overview Text */}
              <div className="flex-1 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#8DC63F]/10 border border-[#8DC63F]/30 text-[#8DC63F] text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                  <span>Section 01 · Overview</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Specialist Engineering &amp; Technical Teams on Demand
                </h2>
                <p className="text-base sm:text-lg text-[#CBD5E1] leading-relaxed">
                  {overviewText}
                </p>
                <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-[#050608] border border-white/10">
                    <p className="text-xs text-[#A9B4C0]">Coverage</p>
                    <p className="text-sm font-bold text-white mt-1">All 7 UAE Emirates</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#050608] border border-white/10">
                    <p className="text-xs text-[#A9B4C0]">Mobilization</p>
                    <p className="text-sm font-bold text-[#8DC63F] mt-1">Within 24–48 Hours</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#050608] border border-white/10 col-span-2 sm:col-span-1">
                    <p className="text-xs text-[#A9B4C0]">Compliance</p>
                    <p className="text-sm font-bold text-white mt-1">100% MOHRE &amp; HSE</p>
                  </div>
                </div>
              </div>

              {/* Right: Uploaded Real Site Photography */}
              <div className="w-full lg:w-[480px] shrink-0 space-y-2.5">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#050608] border border-white/10 shadow-xl group">
                  <Image
                    src={heroImage}
                    alt={heroImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90 bg-[#050608]/80 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10">
                    <span className="font-semibold">Vision Energy Site Personnel</span>
                    <span className="text-[#8DC63F] font-mono text-[11px]">UAE Substation Deployment</span>
                  </div>
                </div>
                <p className="text-xs text-[#A9B4C0] italic text-center">
                  Certified technicians equipped with PPE and calibrated testing tools during site safety briefing.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: MANPOWER WE SUPPLY */}
        <section id="manpower-we-supply" className="scroll-mt-28 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8DC63F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>Section 02 · Disciplines</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Manpower We Supply
            </h2>
            <p className="text-sm sm:text-base text-[#A9B4C0]">
              Certified personnel specialized in electrical infrastructure, earthing, lightning protection, and solar systems.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {manpowerList.map((trade, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#0C1017] border border-white/10 hover:border-[#8DC63F]/50 transition-all duration-300 flex items-center gap-3.5 group shadow-md"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-[#8DC63F] shrink-0 group-hover:scale-125 transition-transform shadow-[0_0_8px_#8DC63F]" />
                <span className="text-sm sm:text-[15px] font-semibold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                  {trade}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: ENGAGEMENT OPTIONS */}
        <section id="engagement-options" className="scroll-mt-28 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8DC63F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>Section 03 · Flexibility</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Engagement Options
            </h2>
            <p className="text-sm sm:text-base text-[#A9B4C0]">
              Custom staffing arrangements designed around your installation milestones, shifts, and shutdowns.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {engagementOptions.map((opt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#0C1017] border border-white/10 hover:border-[#8DC63F]/40 transition-all duration-300 space-y-3 group shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-2.5 py-1 rounded-full">
                    MODEL 0{idx + 1}
                  </span>
                  <Clock className="w-4 h-4 text-[#A9B4C0] group-hover:text-[#8DC63F] transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-[#8DC63F] transition-colors">
                  {opt.title}
                </h3>
                <p className="text-sm text-[#CBD5E1] leading-relaxed">
                  {opt.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: WHAT'S INCLUDED */}
        <section id="whats-included" className="scroll-mt-28 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8DC63F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>Section 04 · Equipment &amp; Support</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              What’s Included
            </h2>
            <p className="text-sm sm:text-base text-[#A9B4C0]">
              Every team arrives fully equipped with certified tooling, testing equipment, and supervisory backing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatsIncluded.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0C1017] border border-white/10 hover:border-[#8DC63F]/40 transition-all duration-300 space-y-3 flex flex-col justify-between shadow-md"
              >
                <div className="w-10 h-10 rounded-xl bg-[#8DC63F]/10 border border-[#8DC63F]/30 flex items-center justify-center text-[#8DC63F]">
                  <Wrench className="w-5 h-5" />
                </div>
                <p className="text-sm sm:text-[14.5px] font-semibold text-white leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: COMPLIANCE & SAFETY */}
        <section id="compliance-and-safety" className="scroll-mt-28 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8DC63F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>Section 05 · Standards</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Compliance &amp; Safety
            </h2>
            <p className="text-sm sm:text-base text-[#A9B4C0]">
              Strict compliance with UAE labor regulations, occupational health, and site-specific HSE mandates.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#0C1017] border border-white/10 space-y-6 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {complianceList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#050608] border border-white/10 flex items-start gap-3.5"
                >
                  <ShieldCheck className="w-5 h-5 text-[#8DC63F] shrink-0 mt-0.5" />
                  <span className="text-sm text-[#CBD5E1] font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-[#8DC63F]/5 border border-[#8DC63F]/20 flex items-center gap-3 text-xs sm:text-sm text-[#CBD5E1]">
              <CheckCircle2 className="w-5 h-5 text-[#8DC63F] shrink-0" />
              <span>
                All field staff are verified under valid UAE employment visas, medical insurance, and MOHRE registration.
              </span>
            </div>
          </div>
        </section>

        {/* SECTION 6: WHY CHOOSE US */}
        <section id="why-choose-us" className="scroll-mt-28 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8DC63F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>Section 06 · The Advantage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-sm sm:text-base text-[#A9B4C0]">
              Specialist engineering capability and dedicated technical supervision, not generic labor supply.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyChooseUs.map((point, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0C1017] border border-white/10 hover:border-[#8DC63F]/50 transition-all duration-300 space-y-3 group shadow-md"
              >
                <div className="flex items-center gap-2 text-[#8DC63F]">
                  <span className="w-2 h-2 rounded-full bg-[#8DC63F]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">
                    PROMISE 0{idx + 1}
                  </span>
                </div>
                <p className="text-sm sm:text-[15px] font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: HOW IT WORKS (Numbered Horizontal Stepper on Desktop, Vertical on Mobile) */}
        <section id="how-it-works" className="scroll-mt-28 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8DC63F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
              <span>Section 07 · Workflow</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-sm sm:text-base text-[#A9B4C0]">
              Simple, transparent 4-step deployment from requirement briefing to supervised handover.
            </p>
          </div>

          {/* DESKTOP VIEW: Numbered Horizontal Stepper */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting Horizontal Line across the steps */}
              <div className="absolute top-7 left-12 right-12 h-[2px] bg-white/10 z-0" />
              <div className="absolute top-7 left-12 w-3/4 h-[2px] bg-gradient-to-r from-[#8DC63F] via-[#8DC63F]/70 to-transparent z-0" />

              <div className="grid grid-cols-4 gap-6 relative z-10">
                {howItWorks.map((step) => (
                  <div
                    key={step.step}
                    className="p-6 rounded-2xl bg-[#0C1017] border border-white/10 hover:border-[#8DC63F]/50 transition-all duration-300 flex flex-col space-y-4 group shadow-lg"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#050608] border-2 border-[#8DC63F] flex items-center justify-center text-[#8DC63F] font-mono font-bold text-lg shadow-[0_0_15px_rgba(141,198,63,0.2)] group-hover:bg-[#8DC63F] group-hover:text-black transition-colors">
                      0{step.step}
                    </div>
                    <div className="space-y-2 flex-1">
                      <h3 className="text-base font-bold text-white group-hover:text-[#8DC63F] transition-colors leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* MOBILE VIEW: Vertical Stepper */}
          <div className="lg:hidden relative pl-6 border-l-2 border-[#8DC63F]/40 ml-4 space-y-8">
            {howItWorks.map((step) => (
              <div key={step.step} className="relative space-y-2">
                {/* Stepper Dot */}
                <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-[#050608] border-2 border-[#8DC63F] flex items-center justify-center text-[#8DC63F] font-mono font-bold text-xs shadow-md">
                  0{step.step}
                </div>
                <div className="p-5 rounded-2xl bg-[#0C1017] border border-white/10 space-y-2">
                  <h3 className="text-base font-bold text-white text-[#8DC63F]">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: CTA */}
        <section id="cta" className="scroll-mt-28">
          <div className="relative rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0C1017] via-[#050608] to-[#0D1420] border border-[#8DC63F]/30 p-8 sm:p-12 lg:p-16 text-center space-y-6 overflow-hidden shadow-2xl">
            <div className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-[#8DC63F]/10 rounded-full blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 bg-[#0B65B3]/10 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-4">
              <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest inline-block px-3 py-1 bg-[#8DC63F]/10 border border-[#8DC63F]/30 rounded-full">
                READY TO MOBILIZE
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
                Request Specialist Engineering Manpower
              </h2>
              <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed">
                Connect with our technical staffing desk. We will evaluate your trades, project location, and required duration to mobilize certified personnel with full tools and PPE.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleRequestClick}
                  className="py-3.5 px-8 rounded-full bg-[#8DC63F] hover:bg-[#9ee047] text-[#050608] font-bold text-sm tracking-wide shadow-[0_12px_36px_rgba(141,198,63,0.35)] transition-all duration-300 active:scale-95 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Request Manpower</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="tel:+97172042763"
                  className="py-3.5 px-6 rounded-full bg-[#050608] hover:bg-white/10 text-white font-bold text-sm border border-white/20 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <PhoneCall className="w-4 h-4 text-[#8DC63F]" />
                  <span>+971 7 204 2763</span>
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* STICKY "REQUEST MANPOWER" CTA ON MOBILE */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-[#0C1017]/95 backdrop-blur-lg border-t border-white/15 p-3.5 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-bold text-white truncate">Specialist Manpower</p>
          <p className="text-[11px] text-[#8DC63F] font-medium truncate">MOHRE Compliant · UAE Wide</p>
        </div>
        <button
          type="button"
          onClick={handleRequestClick}
          className="shrink-0 py-2.5 px-5 rounded-full bg-[#8DC63F] active:bg-[#9ee047] text-[#050608] font-bold text-xs tracking-wide shadow-md transition-all active:scale-95 cursor-pointer inline-flex items-center gap-1.5"
        >
          <span>Request Manpower</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

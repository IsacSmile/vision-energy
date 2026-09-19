import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dictionary } from '@/lib/dictionary';
import { MapPin, ShieldCheck, Building2, Award, Zap, Phone, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'About Us | VISION ENERGY INTERNATIONAL UAE',
  description:
    'Established in 2018, VISION ENERGY INTERNATIONAL is a UAE authorised trading distributor of electrical, mechanical, and solar engineering solutions across Abu Dhabi, Dubai, and Ras Al Khaimah.',
};

const values = [
  {
    icon: ShieldCheck,
    title: 'Certified Quality',
    desc: 'Products fully tested to IEC 62305 & NF C 17-102 international standards.',
  },
  {
    icon: Zap,
    title: 'Technical Precision',
    desc: 'Expert engineering support for BOQs, risk calculations, and earthing design.',
  },
  {
    icon: Award,
    title: 'UAE Compliance',
    desc: 'Approved vendor for Civil Defence and regional municipality requirements.',
  },
  {
    icon: Sparkles,
    title: 'Sustainable Focus',
    desc: 'Long-lasting earthing conductors & solar components built for harsh environments.',
  },
];

const timelineSteps = [
  {
    year: '2018',
    title: 'Company Foundation',
    desc: 'Established in Ras Al Khaimah as an authorized trading vendor for structural lightning protection.',
  },
  {
    year: '2020',
    title: 'Abu Dhabi Expansion',
    desc: 'Expanded technical sales coverage to Abu Dhabi industrial infrastructure and oil & gas sectors.',
  },
  {
    year: '2022',
    title: 'Dubai Commercial Division',
    desc: 'Opened Dubai branch specializing in commercial high-rise earthing grids and solar energy distribution.',
  },
  {
    year: '2024+',
    title: 'National Distribution Leader',
    desc: 'Serving 500+ major projects across all 7 Emirates with over 57 specialized product lines.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block">
          Company Profile & Values
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About VISION ENERGY
        </h1>
        <p className="text-sm text-[#8DC63F] font-semibold italic">
          &quot;{dictionary.company.tagline}&quot;
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        <div className="space-y-6 bg-[#0D1117] border border-white/10 p-6 sm:p-8 rounded-xl shadow-xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#050608] border border-[#0B65B3]/50 rounded-xl flex items-center justify-center">
                <Image src="/site-main-logo.png" alt="Logo" width={36} height={36} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Authorized Trading Distributor</h2>
                <span className="text-xs text-[#8DC63F] font-mono">Founded 2018 • United Arab Emirates</span>
              </div>
            </div>

            <p className="text-sm text-[#A9B4C0] leading-relaxed">
              VISION ENERGY INTERNATIONAL is a premier UAE-registered trading company and authorised distributor headquartered in Ras Al Khaimah, with active regional representation in Abu Dhabi and Dubai.
            </p>

            <p className="text-sm text-[#A9B4C0] leading-relaxed">
              Our primary focus is ensuring client satisfaction by delivering innovative, certified engineering product solutions coupled with expert technical BOQ support. We specialise in structural lightning protection networks, deep earthing ground grids, mechanical fittings, industrial cables, and solar energy components.
            </p>
          </div>

          <div className="bg-[#050608] p-4 rounded-xl border border-white/10 space-y-2 mt-4">
            <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-wider block">
              Trading Scope Notice
            </span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Vision Energy International acts strictly as an authorised trading vendor and distributor for certified global manufacturers, supplying tested equipment across all 7 Emirates.
            </p>
          </div>
        </div>

        {/* Vertical Stepper Timeline */}
        <div className="bg-[#0D1117] border border-white/10 p-6 sm:p-8 rounded-xl space-y-6 shadow-xl flex flex-col justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <Clock className="w-5 h-5 text-[#8DC63F]" />
            <span>Our Journey (Since 2018)</span>
          </h2>

          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#0B65B3]/40">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-6 top-1.5 w-5 h-5 rounded-full bg-[#050608] border-2 border-[#8DC63F] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#8DC63F] bg-[#8DC63F]/10 px-2 py-0.5 rounded">
                      {step.year}
                    </span>
                    <h3 className="text-sm font-bold text-white">{step.title}</h3>
                  </div>
                  <p className="text-xs text-[#A9B4C0] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Value Tiles */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Our Core Commitments</h2>
          <p className="text-xs text-[#A9B4C0]">Built on engineering excellence and client trust</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className="bg-[#0D1117] border border-white/10 p-5 rounded-xl space-y-3 hover:border-[#0B65B3] transition-all active:scale-[0.98]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#050608] border border-white/10 flex items-center justify-center text-[#8DC63F]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white">{v.title}</h3>
                <p className="text-xs text-[#A9B4C0] leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Locations Cards */}
      <div className="bg-[#0D1117] border border-white/10 p-6 sm:p-8 rounded-xl space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
          <MapPin className="w-5 h-5 text-[#0B65B3]" />
          <span>Strategic UAE Operations</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#050608] border border-white/10 rounded-xl space-y-1">
            <h4 className="font-bold text-white text-sm">Ras Al Khaimah HQ</h4>
            <p className="text-xs text-gray-400">{dictionary.company.headquarters}</p>
          </div>
          <div className="p-4 bg-[#050608] border border-white/10 rounded-xl space-y-1">
            <h4 className="font-bold text-white text-sm">Abu Dhabi Office</h4>
            <p className="text-xs text-gray-400">Technical Sales & Western Region Infrastructure Support</p>
          </div>
          <div className="p-4 bg-[#050608] border border-white/10 rounded-xl space-y-1">
            <h4 className="font-bold text-white text-sm">Dubai Regional Branch</h4>
            <p className="text-xs text-gray-400">Commercial High-Rises & Solar Energy Solutions</p>
          </div>
        </div>
      </div>

      {/* CTA Band */}
      <div className="bg-gradient-brand p-6 sm:p-10 rounded-xl text-center space-y-4 shadow-2xl">
        <h3 className="text-2xl font-extrabold text-white">
          Partner with Vision Energy International
        </h3>
        <p className="text-xs text-gray-100 max-w-xl mx-auto">
          Contact our technical sales engineers for product specifications, submittals, or project BOQ pricing.
        </p>
        <div className="pt-2 flex justify-center">
          <Link
            href="/contact"
            className="px-6 py-3 bg-[#050608] border border-white/30 text-white font-bold text-xs rounded-full hover:bg-black/60 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Contact Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

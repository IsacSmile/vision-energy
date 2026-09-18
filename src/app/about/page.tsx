import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { dictionary } from '@/lib/dictionary';
import { MapPin, ShieldCheck, Building2, Award, Zap, Phone, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'About Us | VISION ENERGY INTERNATIONAL UAE',
  description:
    'Established in 2018, VISION ENERGY INTERNATIONAL is a UAE authorised trading distributor of electrical, mechanical, and solar engineering solutions across Abu Dhabi, Dubai, and Ras Al Khaimah.',
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Banner */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block">
          Company History & Profile
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About VISION ENERGY INTERNATIONAL
        </h1>
        <p className="text-base text-[#8DC63F] font-semibold italic">
          &quot;{dictionary.company.tagline}&quot;
        </p>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 bg-[#0D1117] border border-[#1F2937] p-8 sm:p-10 rounded-3xl shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#050608] border border-[#0B65B3]/50 rounded-2xl flex items-center justify-center pill-glow">
              <Image src="/site-main-logo.png" alt="Logo" width={36} height={36} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Authorized Trading Distributor</h2>
              <span className="text-xs text-[#8DC63F] font-mono">Founded 2018 in United Arab Emirates</span>
            </div>
          </div>

          <p className="text-sm text-[#A9B4C0] leading-relaxed">
            VISION ENERGY INTERNATIONAL is a premier UAE-registered trading company and authorised distributor headquartered in Ras Al Khaimah, with active regional representation in Abu Dhabi and Dubai.
          </p>

          <p className="text-sm text-[#A9B4C0] leading-relaxed">
            Our primary focus is ensuring client satisfaction by delivering innovative, certified engineering product solutions coupled with expert technical BOQ support. We specialise in structural lightning protection networks, deep earthing ground grids, mechanical fittings, industrial cables, and solar energy components.
          </p>

          <div className="bg-[#050608] p-4 rounded-2xl border border-[#1F2937] space-y-2">
            <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-wider block">
              Trading Notice & Business Scope
            </span>
            <p className="text-xs text-gray-300 leading-relaxed">
              Vision Energy International acts strictly as an authorised trading vendor and distributor for certified global manufacturers, supplying tested equipment across the 7 Emirates.
            </p>
          </div>
        </div>

        {/* 3 Locations & Key Stats Box */}
        <div className="space-y-6">
          <div className="bg-[#0D1117] border border-[#1F2937] p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 border-b border-[#1F2937] pb-4">
              <MapPin className="w-5 h-5 text-[#8DC63F]" />
              <span>Three Core UAE Strategic Locations</span>
            </h3>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#0B65B3] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Ras Al Khaimah Headquarters</h4>
                  <p className="text-xs text-gray-400">{dictionary.company.headquarters}</p>
                </div>
              </div>

              <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#8DC63F] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Abu Dhabi Sales & Technical Support</h4>
                  <p className="text-xs text-gray-400">Serving Western Region & Industrial Infrastructure Projects</p>
                </div>
              </div>

              <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl flex items-start gap-3">
                <Building2 className="w-5 h-5 text-[#F2C230] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white">Dubai Regional Office</h4>
                  <p className="text-xs text-gray-400">Commercial Towers, High-Rises & Solar Distribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Band */}
      <div className="bg-gradient-brand p-8 sm:p-10 rounded-3xl text-center space-y-4 shadow-2xl">
        <h3 className="text-2xl font-extrabold text-white">
          Partner with Vision Energy International Today
        </h3>
        <p className="text-xs text-gray-100 max-w-xl mx-auto">
          Contact our technical sales engineers for product specifications, submittals, or project BOQ pricing.
        </p>
        <div className="pt-2 flex justify-center">
          <Link
            href="/contact"
            className="px-8 py-3 bg-[#050608] border border-white/30 text-white font-bold text-xs rounded-full hover:bg-black/60 transition-all flex items-center gap-2"
          >
            <span>Contact Our Team</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

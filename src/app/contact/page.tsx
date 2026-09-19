import React from 'react';
import { dictionary } from '@/lib/dictionary';
import { MapPin, Phone, Mail, Globe, Clock, Building2, ShieldCheck, ChevronRight, Navigation } from 'lucide-react';
import ContactFormClient from '@/components/contact/ContactFormClient';

export const metadata = {
  title: 'Contact Us | VISION ENERGY INTERNATIONAL UAE',
  description:
    'Contact VISION ENERGY INTERNATIONAL offices in Abu Dhabi, Dubai, and Ras Al Khaimah. Call +971 7 204 2763 or submit your technical enquiry.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block">
          Direct Communication & Sales
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact Vision Energy
        </h1>
        <p className="text-sm text-[#A9B4C0] leading-relaxed">
          Our technical sales team is available across Ras Al Khaimah, Abu Dhabi, and Dubai to assist with product submittals, pricing, and project installation scope.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Column: Mobile Tappable Cards & Office Info */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#8DC63F]" />
              <span>Instant Contact Channels</span>
            </h2>

            {/* Tappable Card 1: Call Primary */}
            <a
              href={`tel:${dictionary.company.primaryPhone}`}
              className="w-full bg-[#0D1117] border border-white/10 hover:border-[#8DC63F] p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] group shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#050608] border border-white/10 flex items-center justify-center text-[#8DC63F] group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Call Head Office</span>
                  <span className="text-base font-extrabold text-white group-hover:text-[#8DC63F] transition-colors">
                    {dictionary.company.primaryPhone}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>

            {/* Tappable Card 2: Call Secondary */}
            <a
              href={`tel:${dictionary.company.secondaryPhone}`}
              className="w-full bg-[#0D1117] border border-white/10 hover:border-[#0B65B3] p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] group shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#050608] border border-white/10 flex items-center justify-center text-[#0B65B3] group-hover:scale-105 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Call Sales Line</span>
                  <span className="text-base font-extrabold text-white group-hover:text-[#0B65B3] transition-colors">
                    {dictionary.company.secondaryPhone}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>

            {/* Tappable Card 3: Direct Email */}
            <a
              href={`mailto:${dictionary.company.email}`}
              className="w-full bg-[#0D1117] border border-white/10 hover:border-[#8DC63F] p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] group shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#050608] border border-white/10 flex items-center justify-center text-[#8DC63F] group-hover:scale-105 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Email Technical Team</span>
                  <span className="text-sm font-extrabold text-white group-hover:text-[#8DC63F] transition-colors">
                    {dictionary.company.email}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>

            {/* Tappable Card 4: Navigation / Directions */}
            <a
              href="https://maps.google.com/?q=Ras+Al+Khaimah+Business+Centre+BC4+UAE"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0D1117] border border-white/10 hover:border-[#F2C230] p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] group shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#050608] border border-white/10 flex items-center justify-center text-[#F2C230] group-hover:scale-105 transition-transform">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Get Driving Directions</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#F2C230] transition-colors">
                    RAK Business Centre BC4, Ras Al Khaimah
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* UAE Regional Cities Strip */}
          <div className="p-4 bg-[#0D1117] border border-white/10 rounded-xl space-y-2">
            <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-wider block">
              Active Regional Operations
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-[#050608] border border-white/10 rounded-full text-white font-medium">
                📍 Ras Al Khaimah (HQ)
              </span>
              <span className="px-3.5 py-1 bg-[#050608] border border-white/10 rounded-full text-white font-medium">
                📍 Abu Dhabi Office
              </span>
              <span className="px-3.5 py-1 bg-[#050608] border border-white/10 rounded-full text-white font-medium">
                📍 Dubai Commercial
              </span>
            </div>
          </div>

          {/* Lazy-loaded Interactive Map Container */}
          <div className="bg-[#0D1117] border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span className="font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8DC63F]" />
                HQ Coordinates & Map
              </span>
              <span className="text-[10px] text-gray-400">RAK, UAE</span>
            </div>
            
            <div className="w-full h-48 bg-[#050608] border border-white/10 rounded-lg relative overflow-hidden flex flex-col items-center justify-center text-center p-4">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(11,101,179,0.15),transparent_70%)]" />
              <MapPin className="w-8 h-8 text-[#8DC63F] mb-2 animate-bounce" />
              <p className="text-xs font-bold text-white z-10">Ras Al Khaimah Headquarters</p>
              <p className="text-[11px] text-gray-400 z-10 max-w-xs mt-0.5">
                Business Centre BC4, RAK Free Trade Zone
              </p>
              <a
                href="https://maps.google.com/?q=Ras+Al+Khaimah+Business+Centre+BC4+UAE"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-4 py-1.5 bg-[#0B65B3] hover:bg-[#0B65B3]/80 text-white text-[11px] font-bold rounded-full transition-all z-10 inline-flex items-center gap-1.5"
              >
                <span>Open in Google Maps</span>
                <Navigation className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Sales Message Form */}
        <div className="bg-[#0D1117] border border-white/10 p-6 sm:p-8 rounded-xl shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0B65B3] uppercase tracking-wider bg-[#0B65B3]/10 border border-[#0B65B3]/30 px-3 py-1 rounded-full inline-block mb-2">
              Direct Sales Enquiry
            </span>
            <h2 className="text-2xl font-bold text-white">Send Engineering Enquiry</h2>
            <p className="text-xs text-[#A9B4C0] mt-1">
              Fill in your contact information below for prompt BOQ feedback and technical submittals.
            </p>
          </div>

          <ContactFormClient />
        </div>
      </div>
    </div>
  );
}

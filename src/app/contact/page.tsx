import React from 'react';
import { dictionary } from '@/lib/dictionary';
import { MapPin, Phone, Mail, Globe, Clock, Building2, ShieldCheck, ChevronRight, Navigation } from 'lucide-react';
import ContactFormClient from '@/components/contact/ContactFormClient';

export const metadata = {
  title: 'Contact Vision Energy | RAK HQ, Dubai, Abu Dhabi & Qatar',
  description:
    'Contact Vision Energy International in RAK HQ, Dubai & Abu Dhabi (+971 7 204 2763, info@visionenergyme.com). Quotes for UAE & Qatar.',
  keywords: [
    'Contact Vision Energy Dubai',
    'Lightning Protection Supplier UAE Contact',
    'Earthing Supplier Abu Dhabi Phone',
    'Vision Energy Ras Al Khaimah HQ',
    'Vision Energy Qatar Enquiries',
  ],
  alternates: {
    canonical: 'https://www.visionenergyme.com/contact',
  },
  openGraph: {
    title: 'Contact Vision Energy | RAK HQ, Dubai, Abu Dhabi & Qatar',
    description:
      'Contact Vision Energy International in Ras Al Khaimah HQ, Dubai & Abu Dhabi for lightning protection, earthing, gym & lab equipment quotes.',
    url: 'https://www.visionenergyme.com/contact',
    type: 'website',
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact Vision Energy International',
  description:
    'Technical sales and project enquiry desk serving Dubai, Abu Dhabi, Ras Al Khaimah, the UAE, and Qatar from our Ras Al Khaimah head office.',
  url: 'https://www.visionenergyme.com/contact',
  mainEntity: {
    '@id': 'https://www.visionenergyme.com/#organization',
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
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
              href="https://maps.google.com/?q=RAK+Business+Centre+BC4+RAK+FTZ+Business+Park+Al+Nakheel+Ras+Al+Khaimah+UAE"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#0D1117] border border-white/10 hover:border-[#F2C230] p-4 rounded-xl flex items-center justify-between transition-all active:scale-[0.98] group shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#050608] border border-white/10 flex items-center justify-center text-[#F2C230] group-hover:scale-105 transition-transform">
                  <Navigation className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block uppercase tracking-wider">Head Office Address</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#F2C230] transition-colors">
                    RAK Business Centre BC4, RAK FTZ Business Park, P.O Box 17111, Al Nakheel, Ras Al Khaimah, UAE
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </a>
          </div>

          {/* Regional Coverage & Company Facts Block */}
          <div className="p-4 bg-[#0D1117] border border-white/10 rounded-xl space-y-3">
            <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-wider block">
              Offices &amp; Markets Served
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 bg-[#050608] border border-white/10 rounded-full text-white font-medium">
                Ras Al Khaimah (Head Office)
              </span>
              <span className="px-3.5 py-1 bg-[#050608] border border-white/10 rounded-full text-white font-medium">
                Dubai Branch
              </span>
              <span className="px-3.5 py-1 bg-[#050608] border border-white/10 rounded-full text-white font-medium">
                Abu Dhabi Branch
              </span>
              <span className="px-3.5 py-1 bg-[#050608] border border-white/10 rounded-full text-white font-medium">
                Qatar (Project Supply &amp; Technical Support)
              </span>
            </div>
            <p className="text-[11px] text-[#A9B4C0] leading-relaxed">
              Established 2018 · Over 160 projects completed · Operating Hours: Gulf Standard Time (GMT+4) — call +971 7 204 2763 or WhatsApp +971 54 700 4616 for immediate technical assistance.
            </p>
          </div>

          {/* Lazy-loaded Interactive Map Container */}
          <div className="bg-[#0D1117] border border-white/10 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-300">
              <span className="font-bold text-white flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#8DC63F]" />
                Head Office Location Map
              </span>
              <span className="text-[10px] text-gray-400">Al Nakheel, Ras Al Khaimah</span>
            </div>

            <div className="w-full h-56 bg-[#050608] border border-white/10 rounded-lg relative overflow-hidden">
              <iframe
                title="Vision Energy International Ras Al Khaimah Head Office Map"
                src="https://maps.google.com/maps?q=RAK%20FTZ%20Business%20Park%20Al%20Nakheel%20Ras%20Al%20Khaimah%20UAE&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 grayscale contrast-125 opacity-90"
              />
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <p className="text-[11px] text-[#A9B4C0]">
                RAK Business Centre BC4, RAK FTZ Business Park, P.O Box 17111
              </p>
              <a
                href="https://maps.google.com/?q=RAK+Business+Centre+BC4+RAK+FTZ+Business+Park+Al+Nakheel+Ras+Al+Khaimah+UAE"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 bg-[#0B65B3] hover:bg-[#0B65B3]/80 text-white text-[11px] font-bold rounded-full transition-all inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Open in Maps</span>
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
    </>
  );
}

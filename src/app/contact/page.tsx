import React from 'react';
import { dictionary } from '@/lib/dictionary';
import { MapPin, Phone, Mail, Globe, Clock, Building2, ShieldCheck } from 'lucide-react';
import ContactFormClient from '@/components/contact/ContactFormClient';

export const metadata = {
  title: 'Contact Us | VISION ENERGY INTERNATIONAL UAE',
  description:
    'Contact VISION ENERGY INTERNATIONAL offices in Abu Dhabi, Dubai, and Ras Al Khaimah. Call +971 7 204 2763 or submit your technical enquiry.',
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Contact Vision Energy International
        </h1>
        <p className="text-sm text-[#A9B4C0] leading-relaxed">
          Our technical sales team is available across Ras Al Khaimah, Abu Dhabi, and Dubai to assist with product submittals, pricing, and project installation scope.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left Column: Contact Cards & Office Info */}
        <div className="space-y-6">
          <div className="bg-[#0D1117] border border-[#1F2937] p-8 rounded-3xl space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white border-b border-[#1F2937] pb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#8DC63F]" />
              <span>Headquarters & Regional Offices</span>
            </h2>

            <div className="space-y-4 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8DC63F] shrink-0 mt-1" />
                <div>
                  <span className="font-bold text-white block">Ras Al Khaimah Headquarters</span>
                  <p className="text-xs text-gray-400 mt-0.5">{dictionary.company.headquarters}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#0B65B3] shrink-0" />
                <div>
                  <span className="font-bold text-white block">Telephone Contacts</span>
                  <div className="text-xs text-gray-400 space-x-3">
                    <a href={`tel:${dictionary.company.primaryPhone}`} className="hover:text-[#8DC63F]">
                      {dictionary.company.primaryPhone} (Primary)
                    </a>
                    <span>•</span>
                    <a href={`tel:${dictionary.company.secondaryPhone}`} className="hover:text-[#8DC63F]">
                      {dictionary.company.secondaryPhone} (Alt)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#8DC63F] shrink-0" />
                <div>
                  <span className="font-bold text-white block">Email Enquiry</span>
                  <a href={`mailto:${dictionary.company.email}`} className="text-xs text-[#0B65B3] hover:underline">
                    {dictionary.company.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-[#0B65B3] shrink-0" />
                <div>
                  <span className="font-bold text-white block">Website</span>
                  <span className="text-xs text-gray-400">{dictionary.company.website}</span>
                </div>
              </div>
            </div>

            {/* 3 UAE Regional Cities Strip */}
            <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-2xl flex items-center justify-between text-xs text-[#8DC63F]">
              <span className="font-bold text-white">Coverage:</span>
              <span>Abu Dhabi | Dubai | Ras Al Khaimah</span>
            </div>
          </div>

          {/* Interactive Map Placeholder */}
          <div className="bg-[#0D1117] border border-[#1F2937] rounded-3xl p-6 text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs text-[#0B65B3] font-bold">
              <MapPin className="w-4 h-4" />
              <span>Location Map (RAK Business Centre BC4, Ras Al Khaimah)</span>
            </div>
            <div className="w-full h-48 bg-[#050608] border border-[#1F2937] rounded-2xl flex items-center justify-center text-xs text-gray-500 font-mono">
              [Interactive Google Maps Frame Placeholder]
            </div>
          </div>
        </div>

        {/* Right Column: General Contact Enquiry Form */}
        <div className="bg-[#0D1117] border border-[#1F2937] p-8 sm:p-10 rounded-3xl shadow-xl space-y-6">
          <div>
            <span className="text-xs font-bold text-[#0B65B3] uppercase tracking-wider bg-[#0B65B3]/10 border border-[#0B65B3]/30 px-3 py-1 rounded-full inline-block mb-2">
              Direct Sales Message
            </span>
            <h2 className="text-2xl font-bold text-white">Send Us a Technical Message</h2>
            <p className="text-xs text-[#A9B4C0] mt-1">
              Fill in your contact information and requirements below for prompt engineering feedback.
            </p>
          </div>

          <ContactFormClient />
        </div>
      </div>
    </div>
  );
}

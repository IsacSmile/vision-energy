import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dictionary } from '@/lib/dictionary';
import { MapPin, Phone, Mail, Globe, ShieldCheck, Lock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050608] border-t border-[#1F2937] text-white pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#1F2937]">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0D1117] border border-[#0B65B3]/40 rounded-lg flex items-center justify-center">
                <Image src="/site-main-logo.png" alt="Logo" width={32} height={32} />
              </div>
              <span className="font-bold text-lg text-white tracking-wide">
                VISION ENERGY
              </span>
            </div>
            <p className="text-xs text-[#8DC63F] font-semibold italic">
              &quot;{dictionary.company.tagline}&quot;
            </p>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              VISION ENERGY INTERNATIONAL is a UAE-registered trading company and authorised distributor established in 2018. We specialize in external lightning protection, earthing networks, mechanical fittings, and solar solutions.
            </p>

            {/* UAE Locations Badge Bar */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-[#A9B4C0] tracking-wider block mb-1">
                Active UAE Regional Offices
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0D1117] border border-[#1F2937] text-xs text-[#8DC63F] font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#0B65B3]" />
                <span>Abu Dhabi | Dubai | Ras Al Khaimah</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#8DC63F] pl-3">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-sm text-[#A9B4C0]">
              <li>
                <Link href="/" className="hover:text-[#8DC63F] transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#8DC63F] transition-colors">Product Catalogue</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#8DC63F] transition-colors">Engineering Services</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8DC63F] transition-colors">Technical Blog & Insights</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8DC63F] transition-colors">About Our Company</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8DC63F] transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & HQ Address */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#0B65B3] pl-3">
              Contact & Headquarters
            </h3>
            <div className="space-y-2.5 text-xs text-[#A9B4C0]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" />
                <span>{dictionary.company.headquarters}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0B65B3] shrink-0" />
                <a href={`tel:${dictionary.company.primaryPhone}`} className="hover:text-white transition-colors">
                  {dictionary.company.primaryPhone}
                </a>
              </div>
              <div className="flex items-center gap-2 pl-6">
                <a href={`tel:${dictionary.company.secondaryPhone}`} className="hover:text-white transition-colors">
                  {dictionary.company.secondaryPhone} (Alt)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8DC63F] shrink-0" />
                <a href={`mailto:${dictionary.company.email}`} className="hover:text-white transition-colors">
                  {dictionary.company.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#0B65B3] shrink-0" />
                <span>{dictionary.company.website}</span>
              </div>
            </div>
          </div>

          {/* Column 4: Compliance Notice */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#F2C230] pl-3">
              Trading Notice & Standards
            </h3>
            <div className="bg-[#0D1117] p-4 rounded-xl border border-[#1F2937] text-xs text-[#A9B4C0] space-y-2">
              <div className="flex items-center gap-2 text-[#8DC63F] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Authorized Trading Distributor</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Vision Energy International supplies engineering components compliant with IEC 62305, NF C 17-102, and UAE Civil Defence technical requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A9B4C0] gap-4">
          <p>© {new Date().getFullYear()} VISION ENERGY INTERNATIONAL. All Rights Reserved. Founded 2018, UAE.</p>
          <div className="flex items-center gap-4">
            <span>Abu Dhabi</span>
            <span>•</span>
            <span>Dubai</span>
            <span>•</span>
            <span>Ras Al Khaimah</span>
            <span className="text-gray-600">|</span>
            <Link href="/admin/login" className="text-gray-500 hover:text-[#8DC63F] flex items-center gap-1 transition-colors">
              <Lock className="w-3 h-3" />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

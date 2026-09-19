'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { dictionary } from '@/lib/dictionary';
import { MapPin, Phone, Mail, Globe, ShieldCheck, Lock, ChevronDown } from 'lucide-react';

export default function Footer() {
  const [navOpen, setNavOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [noticeOpen, setNoticeOpen] = useState(false);

  return (
    <footer className="bg-[#050608] border-t border-white/10 text-white pt-16 pb-[calc(24px+env(safe-area-inset-bottom))]">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 space-y-8">
        
        {/* Brand Header & UAE Locations Chips */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0D1117] border border-[#0B65B3]/40 rounded-xl flex items-center justify-center shrink-0">
                <Image src="/site-main-logo.png" alt="Logo" width={32} height={32} />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-wide block leading-none">
                  VISION ENERGY
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-wider font-mono">
                  INTERNATIONAL UAE
                </span>
              </div>
            </div>
            <p className="text-xs text-[#8DC63F] font-semibold italic">
              &quot;{dictionary.company.tagline}&quot;
            </p>
          </div>

          {/* Three UAE Locations Chips */}
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider block">
              Authorized Regional Hubs & Offices
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0D1117] border border-white/10 text-xs text-[#8DC63F] font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#0B65B3]" />
                Abu Dhabi
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0D1117] border border-white/10 text-xs text-[#8DC63F] font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8DC63F]" />
                Dubai
              </span>
              <span className="px-3 py-1 rounded-full bg-[#0D1117] border border-white/10 text-xs text-[#8DC63F] font-medium flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#F2C230]" />
                Ras Al Khaimah (HQ)
              </span>
            </div>
          </div>
        </div>

        {/* Accordions & Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/10">
          
          {/* Column 1: ALWAYS VISIBLE Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#0B65B3] pl-3">
              Contact & Headquarters
            </h3>
            <div className="space-y-3 text-xs text-[#A9B4C0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" />
                <span>{dictionary.company.headquarters}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#0B65B3] shrink-0" />
                <div className="flex flex-wrap items-center gap-2">
                  <a href={`tel:${dictionary.company.primaryPhone}`} className="hover:text-white font-bold text-gray-200 transition-colors">
                    {dictionary.company.primaryPhone}
                  </a>
                  <span>•</span>
                  <a href={`tel:${dictionary.company.secondaryPhone}`} className="hover:text-white transition-colors">
                    {dictionary.company.secondaryPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8DC63F] shrink-0" />
                <a href={`mailto:${dictionary.company.email}`} className="hover:text-white font-bold text-[#8DC63F] transition-colors">
                  {dictionary.company.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#0B65B3] shrink-0" />
                <span>{dictionary.company.website}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Navigation (Accordion on Mobile) */}
          <div className="border-b md:border-b-0 border-white/10 pb-4 md:pb-0 space-y-3">
            <button
              type="button"
              onClick={() => setNavOpen(!navOpen)}
              className="w-full flex items-center justify-between text-left md:pointer-events-none"
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#8DC63F] pl-3">
                Quick Navigation
              </h3>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform md:hidden ${navOpen ? 'rotate-180' : ''}`} />
            </button>

            <ul className={`space-y-2 text-xs text-[#A9B4C0] ${navOpen ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link href="/" className="hover:text-[#8DC63F] transition-colors block py-1">Home Page</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-[#8DC63F] transition-colors block py-1">Product Catalogue</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#8DC63F] transition-colors block py-1">Engineering Services</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8DC63F] transition-colors block py-1">Technical Blog & Insights</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8DC63F] transition-colors block py-1">About Our Company</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#8DC63F] transition-colors block py-1">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Groups (Accordion on Mobile) */}
          <div className="border-b md:border-b-0 border-white/10 pb-4 md:pb-0 space-y-3">
            <button
              type="button"
              onClick={() => setProductsOpen(!productsOpen)}
              className="w-full flex items-center justify-between text-left md:pointer-events-none"
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#0B65B3] pl-3">
                Product Categories
              </h3>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform md:hidden ${productsOpen ? 'rotate-180' : ''}`} />
            </button>

            <ul className={`space-y-2 text-xs text-[#A9B4C0] ${productsOpen ? 'block' : 'hidden md:block'}`}>
              <li>
                <Link href="/products?group=LP" className="hover:text-[#8DC63F] transition-colors block py-1">Lightning Protection (LP-01 to LP-12)</Link>
              </li>
              <li>
                <Link href="/products?group=EB" className="hover:text-[#8DC63F] transition-colors block py-1">Earthing & Bonding (EB-01 to EB-15)</Link>
              </li>
              <li>
                <Link href="/products?group=MF" className="hover:text-[#8DC63F] transition-colors block py-1">Mechanical & Fixings (MF-01 to MF-10)</Link>
              </li>
              <li>
                <Link href="/products?group=IC" className="hover:text-[#8DC63F] transition-colors block py-1">Industrial Cables (IC-01 to IC-10)</Link>
              </li>
              <li>
                <Link href="/products?group=SE" className="hover:text-[#8DC63F] transition-colors block py-1">Solar Energy Components (SE-01 to SE-10)</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Trading Notice (Accordion on Mobile) */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setNoticeOpen(!noticeOpen)}
              className="w-full flex items-center justify-between text-left md:pointer-events-none"
            >
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#F2C230] pl-3">
                Trading Notice & Standards
              </h3>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform md:hidden ${noticeOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`bg-[#0D1117] p-4 rounded-xl border border-white/10 text-xs text-[#A9B4C0] space-y-2 ${noticeOpen ? 'block' : 'hidden md:block'}`}>
              <div className="flex items-center gap-2 text-[#8DC63F] font-semibold">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Authorized Trading Distributor</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Vision Energy International supplies engineering components compliant with IEC 62305, NF C 17-102, and UAE Civil Defence technical requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4 pt-2">
          <p>© {new Date().getFullYear()} VISION ENERGY INTERNATIONAL. All Rights Reserved. Founded 2018, UAE.</p>
          
          <div className="flex items-center gap-3">
            <Link href="/admin/login" className="text-gray-500 hover:text-[#8DC63F] flex items-center gap-1 transition-colors">
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

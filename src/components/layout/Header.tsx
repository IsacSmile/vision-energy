'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { dictionary } from '@/lib/dictionary';
import { Phone, Menu, X, Zap } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: dictionary.nav.home },
    { href: '/products', label: dictionary.nav.products },
    { href: '/services', label: dictionary.nav.services },
    { href: '/blog', label: dictionary.nav.blog },
    { href: '/about', label: dictionary.nav.about },
    { href: '/contact', label: dictionary.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050608]/90 backdrop-blur-md border-b border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group" id="header-logo-link">
          <div className="relative w-12 h-12 flex items-center justify-center bg-[#0D1117] border border-[#0B65B3]/40 rounded-xl group-hover:border-[#8DC63F] transition-colors pill-glow">
            <Image
              src="/site-main-logo.png"
              alt="VISION ENERGY INTERNATIONAL Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-white block leading-tight">
              VISION ENERGY
            </span>
            <span className="text-[10px] font-semibold tracking-widest text-[#8DC63F] uppercase block">
              INTERNATIONAL UAE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#8DC63F] bg-[#0B65B3]/20 border border-[#0B65B3]/40'
                    : 'text-[#A9B4C0] hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${dictionary.company.primaryPhone}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#050608] font-bold text-sm hover:bg-gray-100 transition-all pill-glow"
            id="header-call-button"
          >
            <Phone className="w-4 h-4 text-[#0B65B3]" />
            <span>{dictionary.nav.callNow}</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex sm:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0D1117] border-b border-[#1F2937] px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium ${
                  isActive ? 'bg-[#0B65B3] text-white font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <a
              href={`tel:${dictionary.company.primaryPhone}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white text-[#050608] font-bold text-sm"
            >
              <Phone className="w-4 h-4 text-[#0B65B3]" />
              <span>Call Us: {dictionary.company.primaryPhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

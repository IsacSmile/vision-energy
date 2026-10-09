'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Phone, Clock, Mail, Send } from 'lucide-react';
import LightningButton from '@/components/ui/LightningButton';
import ThemeToggle from '@/components/theme/ThemeToggle';

export default function Header() {
  const pathname = usePathname() || '';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [showTopNotch, setShowTopNotch] = useState(true);
  const lastScrollY = useRef(0);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { openProductModal, openServiceModal } = useEnquiryModal();
  const isHome = pathname === '/';
  const isAdmin = pathname.startsWith('/admin');

  // Manage overlay inert attribute imperatively to avoid React 18 DOM warnings and TS mismatches
  useEffect(() => {
    if (isAdmin) return;
    if (overlayRef.current) {
      overlayRef.current.inert = !mobileMenuOpen;
    }
  }, [mobileMenuOpen, isAdmin]);

  // Dispatch custom event for HeroLightning GPU pausing
  useEffect(() => {
    if (isAdmin) return;
    window.dispatchEvent(new CustomEvent('mobile-menu-state', { detail: { open: mobileMenuOpen } }));
  }, [mobileMenuOpen, isAdmin]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close on viewport resize >= 1024px (lg breakpoint)
  useEffect(() => {
    if (isAdmin) return;
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAdmin]);

  // Scroll detection:
  // Top notch bar is ONLY shown when at hero page (scrollY <= 80).
  // When scrolling down, or scrolling back up, do NOT show the header top notch until we get back to hero page.
  useEffect(() => {
    if (isAdmin) return;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);

      // Only show top notch when at hero section (top of page)
      const isAtHero = currentScrollY <= 80;
      setShowTopNotch(isAtHero);

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdmin]);

  // Update --header-offset CSS variable on document root for sticky elements
  useEffect(() => {
    if (isAdmin) return;
    if (typeof document !== 'undefined') {
      const updateHeaderOffset = () => {
        const isDesktop = window.innerWidth >= 1024;
        // When scrolled, main navbar is 80px desktop, 68px mobile
        const headerOffsetValue = isDesktop ? '80px' : '68px';
        document.documentElement.style.setProperty('--header-offset', headerOffsetValue);
      };
      updateHeaderOffset();
      window.addEventListener('resize', updateHeaderOffset);
      return () => window.removeEventListener('resize', updateHeaderOffset);
    }
  }, [isAdmin]);


  // Lock body scroll on open, focus management, and restore focus on close
  useEffect(() => {
    if (isAdmin) return;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        firstLinkRef.current?.focus();
      }, 100);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen, isAdmin]);

  // Keyboard navigation (ESC to close, Tab focus trap)
  useEffect(() => {
    if (isAdmin) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!mobileMenuOpen) return;

      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
      }

      if (e.key === 'Tab' && overlayRef.current) {
        const focusables = overlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        const focusableArray = Array.from(focusables);
        const first = focusableArray[0];
        const last = focusableArray[focusableArray.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, isAdmin]);

  if (isAdmin) {
    return null;
  }

  const navLinks = [
    { href: '/', label: dictionary.nav.home },
    { href: '/products', label: dictionary.nav.products },
    { href: '/services', label: dictionary.nav.services },
    { href: '/blog', label: dictionary.nav.blog },
    { href: '/contact', label: dictionary.nav.contact },
  ];

  const headerVisibilityClass = visible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full';

  // Header is solid with website background color (#050608), fully opaque and non-transparent
  const headerClasses = mobileMenuOpen
    ? `fixed top-0 left-0 right-0 z-50 w-full bg-[#050608] border-b border-transparent pt-safe transition-all duration-300 translate-y-0`
    : isHome
    ? `fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pt-safe translate-y-0 bg-[#050608] border-b border-[#0B65B3]/30 shadow-xl`
    : `sticky top-0 z-50 w-full bg-[#050608] border-b border-[#1F2937] pt-safe transition-all duration-300 translate-y-0 shadow-xl`;

  const handleMobileEnquiry = () => {
    setMobileMenuOpen(false);
    if (pathname.startsWith('/services')) {
      openServiceModal({ serviceSlug: 'general-service', serviceTitle: 'General Technical Service Booking' });
    } else {
      openProductModal({ categoryCode: 'LP-01', categoryTitle: 'Lightning Protection Products' });
    }
  };

  return (
    <>
      <header className={headerClasses}>
        {/* Top Notch / Sub-Header Utility Bar - Only shown at hero section, smoothly collapses on scroll away from hero */}
        <div
          className={`w-full bg-[#8DC63F] text-white z-50 border-b border-black/10 shadow-sm select-none transition-all duration-300 ease-in-out overflow-hidden ${
            showTopNotch
              ? 'max-h-[50px] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-full border-b-0 pointer-events-none'
          }`}
        >
          {/* Mobile View: Infinite Smooth Marquee (<md) */}
          <div className="md:hidden relative flex items-center h-[34px] overflow-hidden">
            {/* Subtle left/right fade gradients */}
            <div
              className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-[#8DC63F] to-transparent z-10"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-[#8DC63F] to-transparent z-10"
              aria-hidden="true"
            />

            {/* Seamless Infinite Marquee Track (2 identical copies) */}
            <div className="animate-marquee-fast flex items-center text-[11.5px] font-semibold py-1">
              {/* Copy 1 */}
              <div className="flex items-center divide-x divide-white/30 shrink-0">
                <div className="flex items-center gap-1.5 px-3.5 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] whitespace-nowrap">Sun-Thu 8:30AM-05:30PM</span>
                </div>
                <a
                  href="tel:+97172041010"
                  className="flex items-center gap-1.5 px-3.5 shrink-0 hover:text-black transition-colors"
                  title="Call Vision Energy"
                >
                  <Phone className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] whitespace-nowrap">+971 7 2041010</span>
                </a>
                <a
                  href="mailto:info@visionenergyme.com"
                  className="flex items-center gap-1.5 px-3.5 shrink-0 hover:text-black transition-colors"
                  title="Email Vision Energy"
                >
                  <Mail className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] whitespace-nowrap">info@visionenergyme.com</span>
                </a>
                <div className="flex items-center gap-1.5 px-3.5 shrink-0 text-white/95">
                  <span className="whitespace-nowrap">UAE Certified Specialist MEP & Earthing</span>
                </div>
              </div>

              {/* Copy 2 (identically repeated for seamless loop) */}
              <div className="flex items-center divide-x divide-white/30 shrink-0">
                <div className="flex items-center gap-1.5 px-3.5 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] whitespace-nowrap">Sun-Thu 8:30AM-05:30PM</span>
                </div>
                <a
                  href="tel:+97172041010"
                  className="flex items-center gap-1.5 px-3.5 shrink-0 hover:text-black transition-colors"
                  title="Call Vision Energy"
                >
                  <Phone className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] whitespace-nowrap">+971 7 2041010</span>
                </a>
                <a
                  href="mailto:info@visionenergyme.com"
                  className="flex items-center gap-1.5 px-3.5 shrink-0 hover:text-black transition-colors"
                  title="Email Vision Energy"
                >
                  <Mail className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)] whitespace-nowrap">info@visionenergyme.com</span>
                </a>
                <div className="flex items-center gap-1.5 px-3.5 shrink-0 text-white/95">
                  <span className="whitespace-nowrap">UAE Certified Specialist MEP & Earthing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Static View (md+) */}
          <div className="hidden md:block max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[36px] sm:h-[40px] text-xs sm:text-[13px] font-semibold">
              {/* Left Items with Vertical Divider Lines */}
              <div className="flex items-center divide-x divide-white/30 overflow-x-auto no-scrollbar py-1">
                {/* Working Hours */}
                <div className="flex items-center gap-2 pr-3.5 sm:pr-5 shrink-0">
                  <Clock className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">Sun-Thu 8:30AM-05:30PM</span>
                </div>

                {/* Telephone */}
                <a
                  href="tel:+97172041010"
                  className="flex items-center gap-2 px-3.5 sm:px-5 shrink-0 hover:text-black transition-colors"
                  title="Call Vision Energy"
                >
                  <Phone className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">+971 7 2041010</span>
                </a>

                {/* Email */}
                <a
                  href="mailto:info@visionenergyme.com"
                  className="flex items-center gap-2 pl-3.5 sm:px-5 shrink-0 hover:text-black transition-colors"
                  title="Email Vision Energy"
                >
                  <Mail className="w-3.5 h-3.5 text-white shrink-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  <span className="drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">info@visionenergyme.com</span>
                </a>
              </div>

              {/* Right Tag (desktop only) */}
              <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/30 text-[11px] sm:text-xs text-white/95 shrink-0 font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
                <span>UAE Certified Specialist MEP & Earthing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Navigation Bar */}
        <div className="max-w-[80rem] mx-auto px-3.5 sm:px-6 lg:px-8 h-[74px] sm:h-[78px] lg:h-[80px] flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo - Enlarged on Mobile & Desktop */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center group shrink-0 active-press py-0.5"
            id="header-logo-link"
          >
            {/* Dark Theme Logo (White 'ENERGY INTERNATIONAL' text) */}
            <Image
              src="/site-main-logo.png"
              alt="VISION ENERGY INTERNATIONAL UAE"
              width={380}
              height={95}
              className="dark-theme-logo h-[62px] sm:h-[68px] lg:h-[72px] w-auto max-h-[76px] object-contain transition-transform group-hover:scale-105"
              priority
            />
            {/* Light Theme Logo (Dark 'ENERGY INTERNATIONAL' text) */}
            <Image
              src="/site-main-logo-light.png"
              alt="VISION ENERGY INTERNATIONAL UAE"
              width={380}
              height={95}
              className="light-theme-logo h-[62px] sm:h-[68px] lg:h-[72px] w-auto max-h-[76px] object-contain transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation Links (lg+) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors active-press ${
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

          {/* Desktop Action Button & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle id="header-theme-toggle-desktop" />
            <LightningButton
              variant="primary"
              size="md"
              href={`tel:${dictionary.company.primaryPhone}`}
              iconLeft={<Phone className="w-4 h-4 text-[#0B65B3] [html.light_&]:text-white" />}
              id="header-call-button"
            >
              {dictionary.nav.callNow}
            </LightningButton>
          </div>

          {/* Mobile Actions: Theme Toggle, Call Icon Button & Single Animated Toggle Button (44x44px) */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle id="header-theme-toggle-mobile" />

            <a
              href={`tel:${dictionary.company.primaryPhone}`}
              className="w-[44px] h-[44px] flex items-center justify-center rounded-xl text-white bg-[#0D1117]/90 border border-white/12 hover:bg-[#0D1117] focus-visible:ring-2 focus-visible:ring-[#8DC63F] active-press shadow-md"
              aria-label="Call Vision Energy"
            >
              <Phone className="w-5 h-5 text-[#8DC63F]" />
            </a>

            {/* Single Toggle Button with Animated Hamburger-to-X */}
            <button
              ref={toggleBtnRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-overlay"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="w-[44px] h-[44px] flex items-center justify-center rounded-xl text-white bg-[#0D1117]/90 border border-white/12 hover:bg-[#0D1117] focus-visible:ring-2 focus-visible:ring-[#8DC63F] active-press shadow-md"
            >
              <div className="w-5 h-4 flex flex-col justify-between items-center relative">
                <span
                  className={`w-5 h-[2px] bg-white rounded-full transition-transform duration-250 ease-in-out ${
                    mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                  }`}
                />
                <span
                  className={`w-5 h-[2px] bg-white rounded-full transition-opacity duration-250 ease-in-out ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-5 h-[2px] bg-white rounded-full transition-transform duration-250 ease-in-out ${
                    mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* FULL-WIDTH, FULL-HEIGHT MOBILE OVERLAY (DOM PERSISTENT WITH inert ATTR) */}
      <div
        id="mobile-nav-overlay"
        ref={overlayRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
        aria-hidden={!mobileMenuOpen}
        suppressHydrationWarning
        className={`fixed inset-0 z-40 w-screen h-[100svh] min-h-[100vh] bg-[#050608] lg:hidden flex flex-col justify-between overflow-y-auto px-6 pt-[calc(var(--mobile-header-h,56px)+20px)] pb-[max(24px,env(safe-area-inset-bottom))] transition-all duration-320 ${
          mobileMenuOpen
            ? 'opacity-100 visible pointer-events-auto translate-y-0 ease-[cubic-bezier(0.22,1,0.36,1)]'
            : 'opacity-0 invisible pointer-events-none -translate-y-4 ease-in duration-220'
        }`}
      >
        {/* Nav Links List */}
        <nav className="w-full flex flex-col space-y-1 my-auto py-4" aria-label="Mobile Overlay Navigation">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

            return (
              <div
                key={link.href}
                style={{
                  transitionDelay: mobileMenuOpen ? `${60 + idx * 40}ms` : '0ms',
                }}
                className={`w-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                }`}
              >
                <Link
                  ref={idx === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full py-2.5 flex items-center gap-3 text-[26px] font-medium leading-tight text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-lg ${
                    isActive ? 'text-[#8DC63F]' : 'text-white/90 hover:text-white'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-6 rounded-full bg-[#8DC63F] shrink-0" />}
                  <span>{link.label}</span>
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Pinned Bottom Actions & Office Coverage */}
        <div
          style={{
            transitionDelay: mobileMenuOpen ? `${60 + navLinks.length * 40}ms` : '0ms',
          }}
          className={`w-full mt-auto pt-4 space-y-3 transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Mobile Theme Switcher Row */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#A9B4C0]">
              Theme Mode
            </span>
            <ThemeToggle id="mobile-drawer-theme-toggle" size="sm" />
          </div>

          {/* Side-by-Side Action Bar */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Button 1: Call Us (Secondary Variant) */}
            <LightningButton
              variant="secondary"
              size="md"
              href={`tel:${dictionary.company.primaryPhone}`}
              onClick={() => setMobileMenuOpen(false)}
              iconLeft={<Phone className="w-4 h-4 text-[#8DC63F]" />}
              fullWidth
            >
              Call Us
            </LightningButton>

            {/* Button 2: Enquire (Primary Variant) */}
            <LightningButton
              variant="primary"
              size="md"
              onClick={handleMobileEnquiry}
              iconLeft={<Send className="w-4 h-4" />}
              fullWidth
            >
              Enquire
            </LightningButton>
          </div>

          {/* Muted Office Coverage Line */}
          <p className="text-[11px] text-[#A9B4C0] text-center font-medium uppercase tracking-widest block pt-1">
            Abu Dhabi • Dubai • Ras Al Khaimah
          </p>
        </div>
      </div>
    </>
  );
}

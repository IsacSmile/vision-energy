'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Send } from 'lucide-react';
import { FaPhoneIcon, FaWhatsappIcon, FaEnvelopeIcon } from '@/components/ui/FaIcons';
import LightningButton from '@/components/ui/LightningButton';
import ThemeToggle from '@/components/theme/ThemeToggle';

const TOP_BAR_ACTIONS = [
  {
    key: 'landline',
    href: 'tel:+97172042763',
    external: false,
    title: 'Call Office Land Phone (+971 7 204 2763)',
    ariaLabel: 'Call Vision Energy office land phone +971 7 204 2763',
    icon: FaPhoneIcon,
    iconClass: 'w-3.5 h-3.5 sm:w-4 sm:h-4',
  },
  {
    key: 'whatsapp',
    href: 'https://wa.me/971547004616',
    external: true,
    title: 'Chat on WhatsApp (+971 54 700 4616)',
    ariaLabel: 'Chat with Vision Energy on WhatsApp +971 54 700 4616',
    icon: FaWhatsappIcon,
    iconClass: 'w-4 h-4 sm:w-[17px] sm:h-[17px]',
  },
] as const;

export default function Header() {
  const pathname = usePathname() || '';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTopNotch, setShowTopNotch] = useState(true);
  const lastScrollY = useRef(0);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);

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

  // Scroll detection: throttled with requestAnimationFrame to prevent main-thread layout thrashing
  useEffect(() => {
    if (isAdmin) return;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrolled = currentScrollY > 24;
          const isAtHero = currentScrollY <= 80;

          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));
          setShowTopNotch((prev) => (prev !== isAtHero ? isAtHero : prev));

          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
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
    { href: '/expertise', label: dictionary.nav.expertise || 'Expertise' },
    { href: '/services', label: dictionary.nav.services },
    { href: '/blog', label: dictionary.nav.blog },
    { href: '/contact', label: dictionary.nav.contact },
  ];

  // Header is solid with website background color (#050608), fully opaque and non-transparent
  const headerClasses = mobileMenuOpen
    ? `fixed top-0 left-0 right-0 z-50 w-full bg-[#050608] border-b border-transparent pt-safe transition-all duration-300 translate-y-0`
    : `sticky top-0 z-50 w-full transition-all duration-300 pt-safe translate-y-0 bg-[#050608] ${
        isHome ? 'border-b border-[#0B65B3]/30' : 'border-b border-[#1F2937]'
      } shadow-xl`;

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
      <header ref={headerRef} className={headerClasses}>
        {/* Top Notch / Sub-Header Utility Bar - Only shown at hero section, smoothly collapses on scroll away from hero */}
        <div
          className={`w-full bg-[#8DC63F] text-[#0A192F] z-50 border-b border-[#0A192F]/15 shadow-sm select-none transition-all duration-300 ease-in-out overflow-hidden ${
            showTopNotch
              ? 'max-h-[50px] opacity-100 translate-y-0'
              : 'max-h-0 opacity-0 -translate-y-full border-b-0 pointer-events-none'
          }`}
        >
          {/* Unified Static Bar Across All Screen Sizes: Icon-only Call & WhatsApp + Email */}
          <div className="max-w-[80rem] mx-auto px-3.5 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-[36px] sm:h-[40px] text-xs sm:text-[13px] font-semibold">
              {/* Left side: Phone & WhatsApp Icon Links */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {TOP_BAR_ACTIONS.map((action, idx) => {
                  const IconComponent = action.icon;
                  return (
                    <React.Fragment key={action.key}>
                      <a
                        href={action.href}
                        target={action.external ? '_blank' : undefined}
                        rel={action.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center justify-center w-8 h-7 sm:w-8 sm:h-8 rounded-md hover:bg-[#0A192F]/10 hover:text-black active:scale-95 transition-all shrink-0"
                        title={action.title}
                        aria-label={action.ariaLabel}
                      >
                        <IconComponent className={`${action.iconClass} text-[#0A192F] shrink-0`} />
                      </a>
                      {idx === 0 && (
                        <span className="h-3.5 w-px bg-[#0A192F]/25 shrink-0" aria-hidden="true" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Right side: Email */}
              <div className="flex items-center py-1 min-w-0">
                <a
                  href="mailto:info@visionenergyme.com"
                  className="flex items-center gap-1.5 sm:gap-2 hover:text-black transition-colors truncate"
                  title="Email Vision Energy (info@visionenergyme.com)"
                >
                  <FaEnvelopeIcon className="w-3.5 h-3.5 text-[#0A192F] shrink-0" />
                  <span className="truncate">info@visionenergyme.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header Navigation Bar */}
        <div className="max-w-[80rem] mx-auto px-3.5 sm:px-6 lg:px-8 h-[86px] sm:h-[94px] lg:h-[100px] xl:h-[104px] flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo - Enlarged on Mobile & Desktop */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center group shrink-0 active-press py-0.5"
            id="header-logo-link"
          >
            {/* Dark Theme Logo (White 'ENERGY INTERNATIONAL' text) */}
            <Image
              src="/main-logo-vision.png"
              alt="VISION ENERGY INTERNATIONAL UAE"
              width={490}
              height={188}
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
              quality={75}
              className="dark-theme-logo h-[75px] sm:h-[84px] lg:h-[91px] xl:h-[96px] w-auto max-h-[98px] object-contain transition-transform group-hover:scale-105"
            />
            {/* Light Theme Logo (Dark 'ENERGY INTERNATIONAL' text) */}
            <Image
              src="/main-logo-vision-light.png"
              alt="VISION ENERGY INTERNATIONAL UAE"
              width={490}
              height={188}
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
              quality={75}
              className="light-theme-logo h-[75px] sm:h-[84px] lg:h-[91px] xl:h-[96px] w-auto max-h-[98px] object-contain transition-transform group-hover:scale-105"
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
                  className={`px-3.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors active-press ${
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
              iconLeft={<FaPhoneIcon className="w-4 h-4 text-[#8DC63F]" />}
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
              data-preserve-contrast="true"
              className="w-[44px] h-[44px] flex items-center justify-center rounded-xl bg-[#0B65B3] hover:bg-[#095292] border border-[#8DC63F]/50 hover:border-[#8DC63F] hover:shadow-[0_0_16px_rgba(141,198,63,0.4)] focus-visible:ring-2 focus-visible:ring-[#8DC63F] active-press shadow-md transition-all"
              aria-label="Call Vision Energy"
            >
              <FaPhoneIcon className="w-4 h-4 text-[#8DC63F]" />
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
                  className={`w-full py-2.5 flex items-center gap-3 text-[26px] font-semibold leading-tight text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-lg ${
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
          {/* Side-by-Side Action Bar */}
          <div className="grid grid-cols-2 gap-3 w-full">
            {/* Button 1: Call Us (Secondary Variant) */}
            <LightningButton
              variant="secondary"
              size="md"
              href={`tel:${dictionary.company.primaryPhone}`}
              onClick={() => setMobileMenuOpen(false)}
              iconLeft={<FaPhoneIcon className="w-3.5 h-3.5 text-[#8DC63F]" />}
              fullWidth
            >
              Call Us
            </LightningButton>

            {/* Button 2: Enquire (Primary Variant) */}
            <LightningButton
              variant="primary"
              size="md"
              onClick={handleMobileEnquiry}
              iconLeft={<Send className="w-4 h-4 text-[#8DC63F]" />}
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

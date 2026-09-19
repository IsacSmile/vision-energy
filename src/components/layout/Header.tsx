'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Phone, Send } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const { openProductModal, openServiceModal } = useEnquiryModal();
  const isHome = pathname === '/';

  // Dispatch custom event for HeroLightning GPU pausing
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobile-menu-state', { detail: { open: mobileMenuOpen } }));
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Close on viewport resize >= 1024px (lg breakpoint)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll detection for background fade & auto-hide/reappear
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 24);

      if (currentScrollY > 100 && !mobileMenuOpen) {
        if (currentScrollY > lastScrollY.current + 5) {
          setVisible(false);
        } else if (currentScrollY < lastScrollY.current - 5) {
          setVisible(true);
        }
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Lock body scroll on open, focus management, and restore focus on close
  useEffect(() => {
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
  }, [mobileMenuOpen]);

  // Keyboard navigation (ESC to close, Tab focus trap)
  useEffect(() => {
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
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: '/', label: dictionary.nav.home },
    { href: '/products', label: dictionary.nav.products },
    { href: '/services', label: dictionary.nav.services },
    { href: '/blog', label: dictionary.nav.blog },
    { href: '/about', label: dictionary.nav.about },
    { href: '/contact', label: dictionary.nav.contact },
  ];

  const headerVisibilityClass = visible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full';

  // Header background becomes completely transparent when menu is open so header + overlay look like one screen
  const headerClasses = mobileMenuOpen
    ? `fixed top-0 left-0 right-0 z-50 w-full bg-transparent border-b border-transparent pt-safe transition-all duration-300 ${headerVisibilityClass}`
    : isHome
    ? `fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 pt-safe ${headerVisibilityClass} ${
        scrolled
          ? 'bg-[#050608]/85 backdrop-blur-md border-b border-[#0B65B3]/30 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`
    : `sticky top-0 z-50 w-full bg-[#050608]/90 backdrop-blur-md border-b border-[#1F2937] pt-safe transition-all duration-300 ${headerVisibilityClass}`;

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
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 h-14 lg:h-[80px] flex items-center justify-between">
          {/* Brand Logo - 40px on mobile (h-10), 48px on desktop (lg:h-12) */}
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center group py-1 active-press"
            id="header-logo-link"
          >
            <Image
              src="/site-main-logo.png"
              alt="VISION ENERGY INTERNATIONAL UAE"
              width={240}
              height={60}
              className="h-10 lg:h-12 w-auto object-contain transition-transform group-hover:scale-105"
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
                  className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors active-press ${
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

          {/* Desktop Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${dictionary.company.primaryPhone}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#050608] font-bold text-sm hover:bg-gray-100 transition-all pill-glow active-press"
              id="header-call-button"
            >
              <Phone className="w-4 h-4 text-[#0B65B3]" />
              <span>{dictionary.nav.callNow}</span>
            </a>
          </div>

          {/* Mobile Actions: Call Icon Button & Single Animated Toggle Button (44x44px) */}
          <div className="flex lg:hidden items-center gap-2">
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
        inert={!mobileMenuOpen ? true : undefined}
        className={`fixed inset-0 z-40 w-screen h-[100svh] min-h-[100vh] bg-[#050608] lg:hidden flex flex-col justify-between overflow-y-auto px-6 pt-[calc(var(--mobile-header-h,56px)+16px)] pb-[max(24px,env(safe-area-inset-bottom))] transition-all duration-320 ${
          mobileMenuOpen
            ? 'opacity-100 visible pointer-events-auto translate-y-0 ease-[cubic-bezier(0.22,1,0.36,1)]'
            : 'opacity-0 invisible pointer-events-none -translate-y-4 ease-in duration-220'
        }`}
      >
        {/* Nav Links List */}
        <nav className="w-full flex flex-col" aria-label="Mobile Overlay Navigation">
          {navLinks.map((link, idx) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            const isLast = idx === navLinks.length - 1;

            return (
              <div
                key={link.href}
                style={{
                  transitionDelay: mobileMenuOpen ? `${80 + idx * 50}ms` : '0ms',
                }}
                className={`w-full transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                } ${!isLast ? 'border-b border-white/[0.08]' : ''}`}
              >
                <Link
                  ref={idx === 0 ? firstLinkRef : undefined}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`w-full min-h-[56px] flex items-center gap-3 text-[28px] font-medium leading-[1.2] text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-lg py-2 ${
                    isActive ? 'text-[#8DC63F]' : 'text-white hover:text-[#8DC63F]'
                  }`}
                >
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shrink-0" />}
                  <span>{link.label}</span>
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Pinned Bottom Buttons & Office Line */}
        <div
          style={{
            transitionDelay: mobileMenuOpen ? `${80 + navLinks.length * 50}ms` : '0ms',
          }}
          className={`w-full mt-auto pt-4 space-y-2 transition-all duration-300 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          {/* Button 1: White Pill */}
          <a
            href={`tel:${dictionary.company.primaryPhone}`}
            onClick={() => setMobileMenuOpen(false)}
            className="w-full h-[44px] min-h-[44px] rounded-full bg-white text-[#050608] font-bold text-sm flex items-center justify-center gap-2 active-press shadow-md focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
          >
            <Phone className="w-4 h-4 text-[#0B65B3]" />
            <span>Call Us: {dictionary.company.primaryPhone}</span>
          </a>

          {/* Button 2: Gradient Blue-to-Lime Pill */}
          <button
            onClick={handleMobileEnquiry}
            className="w-full h-[44px] min-h-[44px] rounded-full bg-gradient-brand text-white font-bold text-sm flex items-center justify-center gap-2 active-press shadow-md focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Enquire</span>
          </button>

          {/* Muted Office Coverage Line */}
          <p className="text-xs text-[#A9B4C0] text-center font-normal block pt-1">
            Abu Dhabi | Dubai | Ras Al Khaimah
          </p>
        </div>
      </div>
    </>
  );
}

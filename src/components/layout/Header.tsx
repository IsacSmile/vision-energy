'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Phone, Menu, X, Zap } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { openProductModal, openServiceModal } = useEnquiryModal();

  const isHome = pathname === '/';

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Scroll detection for background fade & auto-hide/reappear
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Dark background fade after 24px
      setScrolled(currentScrollY > 24);

      // Auto-hide when scrolling down, reappear when scrolling up
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY.current + 5) {
          setVisible(false); // scrolling down
        } else if (currentScrollY < lastScrollY.current - 5) {
          setVisible(true); // scrolling up
        }
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // ESC key listener to close drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
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

  const headerClasses = isHome
    ? `fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 pt-safe ${headerVisibilityClass} ${
        scrolled
          ? 'bg-[#050608]/85 backdrop-blur-md border-b border-[#0B65B3]/30 shadow-lg'
          : 'bg-transparent border-b border-transparent'
      }`
    : `sticky top-0 z-40 w-full bg-[#050608]/90 backdrop-blur-md border-b border-[#1F2937] pt-safe transition-all duration-300 ${headerVisibilityClass}`;

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 lg:h-[80px] flex items-center justify-between">
          {/* Brand Logo - 40px on mobile (h-10), 48px on desktop (lg:h-12) */}
          <Link href="/" className="flex items-center group py-1 active-press" id="header-logo-link">
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

          {/* Mobile Hamburger Button (min 48x48px touch target, high contrast, focus ring) */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="min-w-[48px] min-h-[48px] flex items-center justify-center p-2.5 rounded-xl text-white bg-white/5 border border-white/10 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[#8DC63F] active-press"
              aria-label="Open Navigation Drawer"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Slide-in Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end" role="dialog" aria-modal="true" aria-label="Mobile Navigation Drawer">
          {/* Backdrop Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="relative w-full max-w-xs sm:w-80 bg-[#0D1117] border-l border-[#1F2937] h-full flex flex-col justify-between p-6 z-10 animate-in slide-in-from-right duration-300 shadow-2xl pt-safe pb-safe">
            {/* Drawer Top Bar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#1F2937]">
                <Image
                  src="/site-main-logo.png"
                  alt="VISION ENERGY Logo"
                  width={160}
                  height={40}
                  className="h-9 w-auto object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center p-2 rounded-xl text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 active-press"
                  aria-label="Close Navigation Drawer"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              {/* Drawer Links (18px font, 56px row height) */}
              <nav className="space-y-1 divide-y divide-[#1F2937]/50" aria-label="Mobile Drawer Navigation">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`min-h-[56px] flex items-center px-4 rounded-xl text-[18px] font-medium transition-colors active-press ${
                        isActive
                          ? 'bg-[#0B65B3]/20 text-[#8DC63F] border border-[#8DC63F]/40 font-bold'
                          : 'text-gray-200 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Action Buttons (Pinned) */}
            <div className="space-y-3 pt-6 border-t border-[#1F2937]">
              <a
                href={`tel:${dictionary.company.primaryPhone}`}
                className="min-h-[52px] w-full flex items-center justify-center gap-2 rounded-xl bg-white text-[#050608] font-bold text-base shadow-md active-press"
              >
                <Phone className="w-4 h-4 text-[#0B65B3]" />
                <span>Call Us: {dictionary.company.primaryPhone}</span>
              </a>

              <button
                onClick={handleMobileEnquiry}
                className="min-h-[52px] w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-brand text-white font-bold text-base shadow-md active-press"
              >
                <Zap className="w-4 h-4 text-[#8DC63F]" />
                <span>{pathname.startsWith('/services') ? 'Book Service' : 'Submit Enquiry'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

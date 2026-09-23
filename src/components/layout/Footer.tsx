'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { dictionary } from '@/lib/dictionary';
import { SOCIAL_LINKS } from '@/config/social';

export interface FooterServiceItem {
  slug: string;
  title: string;
}

interface FooterProps {
  services?: FooterServiceItem[];
}

export default function Footer({ services = [] }: FooterProps) {
  const pathname = usePathname();
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleAccordion = (name: string) => {
    setOpenAccordion((prev) => (prev === name ? null : name));
  };

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'instant' : 'smooth',
    });
  };

  const hasSocials =
    Boolean(SOCIAL_LINKS.facebook) ||
    Boolean(SOCIAL_LINKS.x) ||
    Boolean(SOCIAL_LINKS.linkedin) ||
    Boolean(SOCIAL_LINKS.instagram);

  const productGroupLinks = [
    { label: 'Lightning Protection & Earthing', href: '/products?group=LP' },
    { label: 'Earthing & Bonding', href: '/products?group=EB' },
    { label: 'Mechanical & Fixings', href: '/products?group=MF' },
    { label: 'Industrial Cables', href: '/products?group=IC' },
    { label: 'Solar Energy Components', href: '/products?group=SE' },
    { label: 'All Products', href: '/products' },
  ];

  const defaultServices: FooterServiceItem[] = [
    {
      slug: 'external-lightning-protection-installation',
      title: 'External Lightning Protection Installation',
    },
    {
      slug: 'manpower-supply',
      title: 'Manpower Services',
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  const companyLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Admin Panel', href: '/admin' },
  ];

  return (
    <footer aria-label="Site Footer" className="bg-[#050608] relative text-white border-t border-white/10">
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-8 lg:pt-20 lg:pb-10">
        {/* MAIN LAYOUT: 12 COLUMNS ON DESKTOP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* BRAND COLUMN (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
            >
              <Image
                src="/site-main-logo.png"
                alt="VISION ENERGY INTERNATIONAL"
                width={220}
                height={56}
                style={{ width: "auto", height: "auto" }}
                className="h-12 w-auto object-contain"
              />
            </Link>

            <div className="space-y-2 max-w-[34ch]">
              <p className="text-sm font-semibold text-white leading-snug">
                Redefined, Innovative And Quality Assured Engineering Product Solutions
              </p>
              <p className="text-xs text-[#A9B4C0] leading-relaxed">
                Electrical, mechanical and solar product solutions across the UAE.
              </p>
            </div>

            {hasSocials && (
              <div className="flex items-center gap-3 pt-2">
                {/* Social links placeholder if configured */}
              </div>
            )}
          </div>

          {/* NAV COLUMNS (lg:col-span-8) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* PRODUCTS */}
            <div className="border-b sm:border-b-0 border-white/10 pb-4 sm:pb-0">
              <button
                type="button"
                onClick={() => toggleAccordion('products')}
                aria-expanded={openAccordion === 'products'}
                aria-controls="footer-products-list"
                className="w-full py-2 flex items-center justify-between text-left lg:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
              >
                <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">
                  Products
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#A9B4C0] lg:hidden transition-transform duration-300 ${
                    openAccordion === 'products' ? 'rotate-180 text-[#8DC63F]' : ''
                  }`}
                />
              </button>

              <ul
                id="footer-products-list"
                className={`space-y-2.5 text-xs sm:text-sm text-[#A9B4C0] mt-3 ${
                  openAccordion === 'products' ? 'block' : 'hidden lg:block'
                }`}
              >
                {productGroupLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#8DC63F] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICES */}
            <div className="border-b sm:border-b-0 border-white/10 pb-4 sm:pb-0">
              <button
                type="button"
                onClick={() => toggleAccordion('services')}
                aria-expanded={openAccordion === 'services'}
                aria-controls="footer-services-list"
                className="w-full py-2 flex items-center justify-between text-left lg:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
              >
                <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">
                  Services
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#A9B4C0] lg:hidden transition-transform duration-300 ${
                    openAccordion === 'services' ? 'rotate-180 text-[#8DC63F]' : ''
                  }`}
                />
              </button>

              <ul
                id="footer-services-list"
                className={`space-y-2.5 text-xs sm:text-sm text-[#A9B4C0] mt-3 ${
                  openAccordion === 'services' ? 'block' : 'hidden lg:block'
                }`}
              >
                {displayServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="hover:text-[#8DC63F] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COMPANY */}
            <div className="border-b sm:border-b-0 border-white/10 pb-4 sm:pb-0">
              <button
                type="button"
                onClick={() => toggleAccordion('company')}
                aria-expanded={openAccordion === 'company'}
                aria-controls="footer-company-list"
                className="w-full py-2 flex items-center justify-between text-left lg:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
              >
                <span className="text-xs font-semibold text-white/90 uppercase tracking-widest">
                  Company
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#A9B4C0] lg:hidden transition-transform duration-300 ${
                    openAccordion === 'company' ? 'rotate-180 text-[#8DC63F]' : ''
                  }`}
                />
              </button>

              <ul
                id="footer-company-list"
                className={`space-y-2.5 text-xs sm:text-sm text-[#A9B4C0] mt-3 ${
                  openAccordion === 'company' ? 'block' : 'hidden lg:block'
                }`}
              >
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#8DC63F] transition-colors inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="space-y-3">
              <span className="text-xs font-semibold text-white/90 uppercase tracking-widest block py-2">
                Contact
              </span>

              <div className="space-y-3 text-xs sm:text-sm text-[#A9B4C0]">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#0B65B3] shrink-0" />
                  <a
                    href={`tel:${dictionary.company.primaryPhone}`}
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                  >
                    {dictionary.company.primaryPhone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#0B65B3] shrink-0" />
                  <a
                    href={`tel:${dictionary.company.secondaryPhone}`}
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                  >
                    {dictionary.company.secondaryPhone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <a
                    href={`mailto:${dictionary.company.email}`}
                    className="hover:text-white text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                  >
                    {dictionary.company.email}
                  </a>
                </div>

                <div className="flex items-start gap-2.5 pt-1 text-[#A9B4C0]">
                  <MapPin className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" />
                  <span>Abu Dhabi | Dubai | Ras Al Khaimah</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A9B4C0] gap-4">
          <p suppressHydrationWarning>© {new Date().getFullYear()} VISION ENERGY INTERNATIONAL. All rights reserved.</p>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 font-medium text-[#8DC63F] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

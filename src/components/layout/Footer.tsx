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
  const pathname = usePathname() || '';
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isAdmin = pathname.startsWith('/admin');

  useEffect(() => {
    if (isAdmin) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [isAdmin]);

  if (isAdmin) {
    return null;
  }

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
      title: 'Lightning Protection Installation',
    },
    {
      slug: 'manpower-supply',
      title: 'Manpower Supply',
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

  const companyLinks = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Admin Panel', href: '/admin' },
  ];

  return (
    <footer aria-label="Site Footer" className="bg-[#0A192F] relative text-white border-t border-[#8DC63F]/30 shadow-2xl">
      {/* Signature Lime Green Gradient Top Accent Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#8DC63F] to-transparent" />

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
                width={240}
                height={240}
                className="w-[230px] h-auto max-h-[230px] object-contain"
              />
            </Link>

            <div className="space-y-2 max-w-[34ch]">
              <p className="text-sm font-semibold !text-white leading-snug">
                Redefined, Innovative And Quality Assured Engineering Product Solutions
              </p>
              <p className="text-xs !text-white/80 leading-relaxed">
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
                <span className="text-xs font-bold !text-white uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                  Products
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/60 lg:hidden transition-transform duration-300 ${
                    openAccordion === 'products' ? 'rotate-180 text-[#8DC63F]' : ''
                  }`}
                />
              </button>

              <ul
                id="footer-products-list"
                className={`space-y-2.5 text-xs sm:text-sm !text-white/80 mt-3 ${
                  openAccordion === 'products' ? 'block' : 'hidden lg:block'
                }`}
              >
                {productGroupLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="!text-white/80 hover:!text-[#8DC63F] hover:translate-x-0.5 transition-all inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
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
                <span className="text-xs font-bold !text-white uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                  Services
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/60 lg:hidden transition-transform duration-300 ${
                    openAccordion === 'services' ? 'rotate-180 text-[#8DC63F]' : ''
                  }`}
                />
              </button>

              <ul
                id="footer-services-list"
                className={`space-y-2.5 text-xs sm:text-sm !text-white/80 mt-3 ${
                  openAccordion === 'services' ? 'block' : 'hidden lg:block'
                }`}
              >
                {displayServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="!text-white/80 hover:!text-[#8DC63F] hover:translate-x-0.5 transition-all inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
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
                <span className="text-xs font-bold !text-white uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                  Company
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/60 lg:hidden transition-transform duration-300 ${
                    openAccordion === 'company' ? 'rotate-180 text-[#8DC63F]' : ''
                  }`}
                />
              </button>

              <ul
                id="footer-company-list"
                className={`space-y-2.5 text-xs sm:text-sm !text-white/80 mt-3 ${
                  openAccordion === 'company' ? 'block' : 'hidden lg:block'
                }`}
              >
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="!text-white/80 hover:!text-[#8DC63F] hover:translate-x-0.5 transition-all inline-block py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div className="space-y-3">
              <span className="text-xs font-bold !text-white uppercase tracking-widest flex items-center gap-2 py-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F]" />
                Contact
              </span>

              <div className="space-y-3 text-xs sm:text-sm !text-white/85">
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <a
                    href={`tel:${dictionary.company.primaryPhone}`}
                    className="hover:!text-[#8DC63F] !text-white/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                  >
                    {dictionary.company.primaryPhone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <a
                    href={`tel:${dictionary.company.secondaryPhone}`}
                    className="hover:!text-[#8DC63F] !text-white/90 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                  >
                    {dictionary.company.secondaryPhone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#8DC63F] shrink-0" />
                  <a
                    href={`mailto:${dictionary.company.email}`}
                    className="hover:!text-white !text-[#8DC63F] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                  >
                    {dictionary.company.email}
                  </a>
                </div>

                <div className="flex items-start gap-2.5 pt-1 !text-white/80">
                  <MapPin className="w-4 h-4 text-[#8DC63F] shrink-0 mt-0.5" />
                  <span>Abu Dhabi | Dubai | Ras Al Khaimah</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs !text-white/70 gap-4">
          <p suppressHydrationWarning>© {new Date().getFullYear()} VISION ENERGY INTERNATIONAL. All rights reserved.</p>

          <button
            type="button"
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-2 font-semibold !text-[#8DC63F] hover:!text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

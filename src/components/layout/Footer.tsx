'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ArrowUp, Phone, Mail, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '@/config/social';

export interface FooterServiceItem {
  slug: string;
  title: string;
}

interface FooterProps {
  services?: FooterServiceItem[];
}

export default function Footer({ services = [] }: FooterProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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

  // Filter active social links
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

  const companyLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <footer aria-label="Site Footer" className="bg-[#050608] relative text-white">
      {/* Blue-to-Lime Hairline Divider on Top */}
      <div
        className="w-full h-[1px] bg-[linear-gradient(90deg,transparent_0%,rgba(11,101,179,0.3)_35%,rgba(141,198,63,0.3)_65%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 pt-16 pb-6 lg:pt-24 lg:pb-8">
        {/* MAIN DESKTOP 12-COLUMN / MOBILE STACKED LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/[0.08]">
          {/* BRAND BLOCK (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded">
              <Image
                src="/site-main-logo.png"
                alt="VISION ENERGY INTERNATIONAL"
                width={180}
                height={44}
                className="h-11 w-auto object-contain"
              />
            </Link>

            <div className="space-y-2">
              <p className="text-sm font-medium text-white max-w-[36ch] leading-[1.5]">
                Redefined, Innovative And Quality Assured Engineering Product Solutions
              </p>
              <p className="text-xs text-[#A9B4C0] leading-[1.6]">
                Electrical, mechanical and solar product solutions across the UAE.
              </p>
            </div>

            {/* Social Icons (only rendered if URLs exist in config) */}
            {hasSocials && (
              <div className="flex items-center gap-3 pt-2">
                {/* Social icons rendered if URLs populated */}
              </div>
            )}
          </div>

          {/* MOBILE ACCORDIONS / DESKTOP COLUMNS (lg:col-span-8) */}
          <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* PRODUCTS GROUP */}
            <div className="border-b lg:border-b-0 border-white/[0.08] pb-4 lg:pb-0">
              <button
                type="button"
                onClick={() => toggleAccordion('products')}
                aria-expanded={openAccordion === 'products'}
                aria-controls="footer-products-list"
                className="w-full min-h-[56px] flex items-center justify-between text-left lg:pointer-events-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
              >
                <span className="text-sm font-semibold text-white uppercase tracking-wider border-l-2 border-[#8DC63F] pl-3">
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
                className={`space-y-1 text-sm text-[#A9B4C0] ${
                  openAccordion === 'products' ? 'block' : 'hidden lg:block'
                }`}
              >
                {productGroupLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="min-h-[48px] flex items-center py-2 hover:text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* SERVICES GROUP */}
            <div className="border-b lg:border-b-0 border-white/[0.08] pb-4 lg:pb-0">
              <button
                type="button"
                onClick={() => toggleAccordion('services')}
                aria-expanded={openAccordion === 'services'}
                aria-controls="footer-services-list"
                className="w-full min-h-[56px] flex items-center justify-between text-left lg:pointer-events-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
              >
                <span className="text-sm font-semibold text-white uppercase tracking-wider border-l-2 border-[#0B65B3] pl-3">
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
                className={`space-y-1 text-sm text-[#A9B4C0] ${
                  openAccordion === 'services' ? 'block' : 'hidden lg:block'
                }`}
              >
                {services.length > 0 ? (
                  services.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services#${service.slug}`}
                        className="min-h-[48px] flex items-center py-2 hover:text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))
                ) : (
                  <>
                    <li>
                      <Link
                        href="/services"
                        className="min-h-[48px] flex items-center py-2 hover:text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                      >
                        External Lightning Protection
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/services"
                        className="min-h-[48px] flex items-center py-2 hover:text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                      >
                        Technical Consultation & Risk Assessment
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* COMPANY GROUP */}
            <div className="border-b lg:border-b-0 border-white/[0.08] pb-4 lg:pb-0">
              <button
                type="button"
                onClick={() => toggleAccordion('company')}
                aria-expanded={openAccordion === 'company'}
                aria-controls="footer-company-list"
                className="w-full min-h-[56px] flex items-center justify-between text-left lg:pointer-events-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
              >
                <span className="text-sm font-semibold text-white uppercase tracking-wider border-l-2 border-[#8DC63F] pl-3">
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
                className={`space-y-1 text-sm text-[#A9B4C0] ${
                  openAccordion === 'company' ? 'block' : 'hidden lg:block'
                }`}
              >
                {companyLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="min-h-[48px] flex items-center py-2 hover:text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT GROUP (Compact - Always Visible) */}
            <div className="space-y-4">
              <span className="text-sm font-semibold text-white uppercase tracking-wider border-l-2 border-[#0B65B3] pl-3 block">
                Contact
              </span>

              <div className="space-y-2.5 text-xs text-[#A9B4C0]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0B65B3] shrink-0" />
                  <a
                    href="tel:+97172042763"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                  >
                    +971 7 204 2763
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#0B65B3] shrink-0" />
                  <a
                    href="tel:+971547004616"
                    className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                  >
                    +971 54 700 4616
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" />
                  <a
                    href="mailto:info@visionenergyme.com"
                    className="hover:text-white text-[#8DC63F] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8DC63F] rounded"
                  >
                    info@visionenergyme.com
                  </a>
                </div>

                <div className="flex items-center gap-2 pt-1 text-[#A9B4C0] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#8DC63F] shrink-0" />
                  <span>Abu Dhabi | Dubai | Ras Al Khaimah</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[13px] text-[#A9B4C0] gap-4">
          <p>© {new Date().getFullYear()} VISION ENERGY INTERNATIONAL. All rights reserved.</p>

          {/* TODO Add Privacy Policy and Terms links once pages are created */}

          {/* BACK TO TOP BUTTON */}
          <button
            type="button"
            onClick={handleScrollToTop}
            className="inline-flex items-center gap-2 font-semibold text-[#8DC63F] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-2 py-1 min-h-[48px]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}

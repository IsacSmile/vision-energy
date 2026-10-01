'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Users, Wrench, ShieldAlert, Zap, ArrowRight } from 'lucide-react';
import LightningButton from '@/components/ui/LightningButton';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { ServiceRecord } from '@/lib/services/get-services';
import { SERVICES_CONTENT } from '@/lib/services/content';

const DEFAULT_SERVICE_IMAGES: Record<string, { url: string; alt: string }> = {
  'external-lightning-protection-installation': {
    url: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1200&q=85',
    alt: 'External lightning protection installation and engineering testing UAE',
  },
  'manpower-supply': {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
    alt: 'Specialist engineering manpower and certified technicians on site',
  },
  'specialist-engineering-manpower-supply': {
    url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85',
    alt: 'Specialist engineering manpower and certified technicians on site',
  },
  'earthing-grounding-system-design-installation': {
    url: 'https://plus.unsplash.com/premium_photo-1682148175448-8e418fcfbaa7?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Earthing and grounding system design and installation in UAE',
  },
  'earthing-and-grounding': {
    url: 'https://plus.unsplash.com/premium_photo-1682148175448-8e418fcfbaa7?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Earthing and grounding system design and installation in UAE',
  },
  'surge-protection-device-installation': {
    url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    alt: 'Surge protection devices and transient voltage suppression installation',
  },
};

const FALLBACK_SERVICE_IMAGE = {
  url: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=85',
  alt: 'Technical engineering services and industrial support',
};

interface ServicesListRowProps {
  service: ServiceRecord;
  index: number;
}

export default function ServicesListRow({ service, index }: ServicesListRowProps) {
  const { openServiceModal } = useEnquiryModal();
  const contentConfig = SERVICES_CONTENT[service.slug] || {};
  const metaChips = (service.content?.metaChips && service.content.metaChips.length > 0)
    ? service.content.metaChips
    : contentConfig.metaChips || [];

  const formattedIndex = String(index + 1).padStart(2, '0');

  const imageUrl =
    service.content?.image ||
    service.content?.hero?.imageUrl ||
    (service as any).image ||
    DEFAULT_SERVICE_IMAGES[service.slug]?.url ||
    FALLBACK_SERVICE_IMAGE.url;

  const imageAlt =
    service.content?.imageAlt ||
    service.content?.hero?.imageAlt ||
    (service as any).imageAlt ||
    DEFAULT_SERVICE_IMAGES[service.slug]?.alt ||
    service.title;

  const getIcon = () => {
    if (service.slug === 'external-lightning-protection-installation') {
      return <Building2 className="w-5 h-5 text-[#8DC63F]" />;
    }
    if (service.slug.includes('manpower')) {
      return <Users className="w-5 h-5 text-[#8DC63F]" />;
    }
    if (service.slug.includes('earthing') || service.slug.includes('grounding')) {
      return <ShieldAlert className="w-5 h-5 text-[#8DC63F]" />;
    }
    if (service.slug.includes('surge')) {
      return <Zap className="w-5 h-5 text-[#8DC63F]" />;
    }
    return <Wrench className="w-5 h-5 text-[#8DC63F]" />;
  };

  const handleBookClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openServiceModal({
      serviceSlug: service.slug,
      serviceTitle: service.title,
    });
  };

  return (
    <li className="relative group border-t border-white/10 transition-colors duration-300">
      {/* Top Hairline Gradient on Hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#0B65B3] to-[#8DC63F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[3]"
        aria-hidden="true"
      />

      <div className="py-8 sm:py-10 lg:py-12 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
        {/* Column 1: Image Thumbnail Card */}
        <div className="relative w-full sm:w-80 lg:w-96 h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#050608] border border-white/10 shrink-0 group-hover:border-[#8DC63F]/50 transition-all duration-500 shadow-xl">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 320px, 384px"
          />
          <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#050608] to-transparent pointer-events-none" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <span className="px-2.5 py-1 bg-[#050608]/85 backdrop-blur-md border border-white/15 rounded-lg text-xs font-mono font-bold text-white tracking-wider">
              {formattedIndex}
            </span>
            <div className="p-1.5 bg-[#050608]/85 backdrop-blur-md border border-white/15 rounded-lg">
              {getIcon()}
            </div>
          </div>
        </div>

        {/* Column 2: Title, Summary, Meta Chips */}
        <div className="space-y-3.5 flex-1 min-w-0">
          <h2 className="text-xl sm:text-2xl lg:text-[28px] font-semibold text-white tracking-tight leading-snug group-hover:text-white transition-colors">
            <Link
              href={`/services/${service.slug}`}
              className="before:absolute before:inset-0 before:z-[1] relative inline-block focus-visible:outline-none"
            >
              <span>{service.title}</span>
              {/* Title 1px gradient underline on hover */}
              <span
                className="block h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-[#0B65B3] to-[#8DC63F] transition-all duration-300 mt-1"
                aria-hidden="true"
              />
            </Link>
          </h2>

          <p className="text-sm sm:text-base text-[#A9B4C0] max-w-[58ch] leading-relaxed line-clamp-3">
            {service.summary}
          </p>

          {metaChips.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 z-[2] relative pointer-events-auto">
              {metaChips.map((chip: string, i: number) => (
                <span
                  key={i}
                  className="text-xs font-medium text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3 py-1 rounded-full"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Column 3: Actions (Book Service + Learn More) */}
        <div className="w-full sm:w-auto lg:w-48 flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3.5 pt-2 lg:pt-0 z-[2] relative pointer-events-auto shrink-0">
          <div className="w-full sm:w-44 lg:w-full">
            <LightningButton
              variant="primary"
              size="md"
              fullWidth
              onClick={handleBookClick}
            >
              Book Service
            </LightningButton>
          </div>

          <Link
            href={`/services/${service.slug}`}
            className="h-[44px] px-3 text-sm font-semibold text-white/80 hover:text-white inline-flex items-center justify-center lg:justify-end gap-2 group/link transition-colors"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 text-[#8DC63F] transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </li>
  );
}

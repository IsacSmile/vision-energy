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
    url: '/images/external-lightning-protection-installation.png',
    alt: 'External structural lightning protection and earthing building installation UAE',
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

const SERVICE_HIGHLIGHTS: Record<string, string[]> = {
  'external-lightning-protection-installation': [
    'IEC / BS EN 62305 & NFC 17-102 compliant external protection systems',
    'Conventional Faraday cage mesh & Early Streamer Emission (ESE) terminals',
    'Structural down-conductor routing and equipotential bonding networks',
    'Continuous earth resistance testing and dedicated low-impedance earth pits',
    'Complete engineering drawings, authority compliance, and handover records',
  ],
  'manpower-supply': [
    'UAE certified lightning protection, earthing, and MEP site technicians',
    'Full compliance with UAE labor regulations, HSE standards, and site safety',
    'Flexible mobilization: emergency shutdown, testing, or long-term contracts',
    'Experienced site supervisors ensuring engineering precision and QA/QC',
    'Mobilized with calibrated testing meters, specialized tooling, and certified PPE',
  ],
  'specialist-engineering-manpower-supply': [
    'UAE certified lightning protection, earthing, and MEP site technicians',
    'Full compliance with UAE labor regulations, HSE standards, and site safety',
    'Flexible mobilization: emergency shutdown, testing, or long-term contracts',
    'Experienced site supervisors ensuring engineering precision and QA/QC',
    'Mobilized with calibrated testing meters, specialized tooling, and certified PPE',
  ],
  'earthing-grounding-system-design-installation': [
    'Low-resistance earth grid design achieving target ohmic values (<1Ω / <5Ω)',
    'Exothermic welding (cadweld) molecular bonds and copper tape networks',
    'Chemical earthing compound and deep well electrode installation',
    'Soil resistivity testing, Wenner 4-point survey, and grid simulation',
    'Comprehensive earth pit inspection, testing, and authority certification',
  ],
  'earthing-and-grounding': [
    'Low-resistance earth grid design achieving target ohmic values (<1Ω / <5Ω)',
    'Exothermic welding (cadweld) molecular bonds and copper tape networks',
    'Chemical earthing compound and deep well electrode installation',
    'Soil resistivity testing, Wenner 4-point survey, and grid simulation',
    'Comprehensive earth pit inspection, testing, and authority certification',
  ],
  'surge-protection-device-installation': [
    'Type 1, Type 2, and Type 3 SPD coordination across electrical switchboards',
    'Transient voltage spike protection for critical automation and MEP panels',
    'Data, telecom, and CCTV signaling surge protection implementation',
    'Lightning impulse current discharge capacity up to 100kA (10/350µs)',
    'Pre-installation electrical audit and post-commissioning verification testing',
  ],
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

  const highlights =
    SERVICE_HIGHLIGHTS[service.slug] ||
    service.content?.systems?.[0]?.points || [
      'Engineered system design and compliant site execution',
      'High-grade certified materials and precision installation',
      'Testing, continuity verification, and inspection records',
      'Authority compliance and complete handover documentation',
    ];

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
    <li className="relative group list-none">
      <div className="relative rounded-2xl sm:rounded-3xl bg-[#0C1017] border border-white/[0.12] hover:border-[#8DC63F]/50 transition-all duration-300 shadow-[0_12px_36px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(11,101,179,0.18)] hover:-translate-y-1 p-5 sm:p-6 lg:p-7 flex flex-col lg:flex-row gap-6 lg:gap-8 items-start overflow-hidden">
        {/* Ambient Subtle Radial Glow on Hover */}
        <div
          className="pointer-events-none absolute -top-24 -right-24 w-80 h-80 bg-[#8DC63F]/[0.03] group-hover:bg-[#8DC63F]/[0.08] rounded-full blur-3xl transition-colors duration-500"
          aria-hidden="true"
        />

        {/* Left Side: Compact Framed Image Thumbnail (Clean & Small) */}
        <div className="relative w-full sm:w-72 lg:w-80 h-48 sm:h-52 lg:h-56 rounded-xl sm:rounded-2xl overflow-hidden bg-[#050608] border border-white/10 shrink-0 shadow-md group-hover:border-[#8DC63F]/40 transition-all duration-500">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 288px, 320px"
          />
          <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-[#050608]/90 to-transparent pointer-events-none" />

          {/* Floating Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
            <span className="px-2.5 py-1 bg-[#050608]/90 backdrop-blur-md border border-[#8DC63F]/40 rounded-full text-xs font-mono font-bold text-[#8DC63F] shadow-sm tracking-wider">
              {formattedIndex}
            </span>
            <div className="p-1.5 bg-[#050608]/90 backdrop-blur-md border border-white/15 rounded-xl shadow-sm">
              {getIcon()}
            </div>
          </div>
        </div>

        {/* Right Side: Content Area */}
        <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
          <div>
            {/* Service Title */}
            <h2 className="text-xl sm:text-2xl lg:text-[24px] font-bold text-white tracking-tight leading-snug group-hover:text-[#8DC63F] transition-colors">
              <Link
                href={`/services/${service.slug}`}
                className="hover:text-[#8DC63F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-lg"
              >
                {service.title}
              </Link>
            </h2>

            {/* Service Summary */}
            <p className="text-sm sm:text-[14.5px] text-[#A9B4C0] leading-relaxed mt-2">
              {service.summary}
            </p>

            {/* Key Highlights Section */}
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <h3 className="text-xs sm:text-sm font-bold text-[#8DC63F] uppercase tracking-wider flex items-center gap-2 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] shrink-0" />
                <span>Key Highlights</span>
              </h3>

              {/* Bullet Points List (Clean & Compact) */}
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs sm:text-[13px] text-[#CBD5E1]">
                {highlights.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8DC63F] mt-1.5 shrink-0" aria-hidden="true" />
                    <span className="leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Actions Row */}
          <div className="pt-4 mt-5 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
            <Link
              href={`/services/${service.slug}`}
              className="text-sm font-bold text-white group/link hover:text-[#8DC63F] inline-flex items-center gap-2 transition-colors py-1"
            >
              <span className="border-b border-transparent group-hover/link:border-[#8DC63F] pb-0.5 transition-all">
                View Details
              </span>
              <ArrowRight className="w-4 h-4 text-[#8DC63F] transition-transform duration-300 group-hover/link:translate-x-1.5" />
            </Link>

            <button
              type="button"
              onClick={handleBookClick}
              className="py-2 px-5 rounded-full bg-white hover:bg-[#8DC63F] text-[#050608] hover:text-black font-bold text-xs sm:text-sm tracking-wide shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
            >
              Book Service
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import { Building2, Users, Wrench, ArrowRight } from 'lucide-react';
import LightningButton from '@/components/ui/LightningButton';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { ServiceRecord } from '@/lib/services/get-services';
import { SERVICES_CONTENT } from '@/lib/services/content';

interface ServicesListRowProps {
  service: ServiceRecord;
  index: number;
}

export default function ServicesListRow({ service, index }: ServicesListRowProps) {
  const { openServiceModal } = useEnquiryModal();
  const contentConfig = SERVICES_CONTENT[service.slug] || {};
  const metaChips = contentConfig.metaChips || [];

  const formattedIndex = String(index + 1).padStart(2, '0');

  const getIcon = () => {
    if (service.slug === 'external-lightning-protection-installation') {
      return <Building2 className="w-7 h-7 text-[#0B65B3]" />;
    }
    if (service.slug === 'manpower-supply') {
      return <Users className="w-7 h-7 text-[#0B65B3]" />;
    }
    return <Wrench className="w-7 h-7 text-[#0B65B3]" />;
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
      {/* Top Hairline Gradient on Hover (desktop hover devices) */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-[#0B65B3] to-[#8DC63F] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-[3]"
        aria-hidden="true"
      />

      <div className="py-10 lg:py-16 lg:min-h-[200px] flex flex-col lg:grid lg:grid-cols-[96px_1fr_auto] gap-6 lg:gap-8 items-start">
        {/* Column 1: Number & Icon */}
        <div className="flex items-center gap-4 lg:flex-col lg:items-start lg:gap-3 shrink-0">
          <span className="tabular-nums text-[13px] text-white/40 font-mono tracking-wider">
            {formattedIndex}
          </span>
          <div className="p-2 bg-white/[0.03] border border-white/10 rounded-xl shrink-0">
            {getIcon()}
          </div>
        </div>

        {/* Column 2: Title, Summary, Meta Chips */}
        <div className="space-y-4 flex-1">
          <h2 className="text-[clamp(1.5rem,5vw,2.25rem)] font-semibold text-white tracking-tight leading-tight text-balance group-hover:text-white transition-colors">
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

          <p className="text-base text-[#A9B4C0] max-w-[56ch] leading-relaxed">
            {service.summary}
          </p>

          {metaChips.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 z-[2] relative pointer-events-auto">
              {metaChips.map((chip, i) => (
                <span
                  key={i}
                  className="text-[13px] font-medium text-[#8DC63F] bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3 py-1 rounded-full"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Column 3: Actions (stacked, sitting above stretched link at z-[2]) */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-4 pt-2 lg:pt-0 z-[2] relative pointer-events-auto shrink-0">
          <div className="w-full sm:max-w-[360px] lg:w-[200px]">
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
            className="h-[48px] px-4 text-sm font-medium text-white/80 hover:text-white inline-flex items-center justify-center lg:justify-end gap-2 group/link transition-colors"
          >
            <span>Learn more</span>
            <ArrowRight className="w-4 h-4 text-[#8DC63F] transition-transform duration-300 group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </li>
  );
}

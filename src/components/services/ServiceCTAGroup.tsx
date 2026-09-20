'use client';

import React from 'react';
import LightningButton from '@/components/ui/LightningButton';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Phone, Calendar } from 'lucide-react';

interface ServiceCTAGroupProps {
  serviceSlug: string;
  serviceTitle: string;
  className?: string;
  compact?: boolean;
}

export default function ServiceCTAGroup({
  serviceSlug,
  serviceTitle,
  className = '',
  compact = false,
}: ServiceCTAGroupProps) {
  const { openServiceModal } = useEnquiryModal();

  const handleBookClick = () => {
    openServiceModal({
      serviceSlug,
      serviceTitle,
    });
  };

  return (
    <div className={`flex flex-col space-y-2 ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className={compact ? 'w-full sm:w-auto' : 'w-full sm:w-auto min-w-[200px]'}>
          <LightningButton
            variant="primary"
            size={compact ? 'sm' : 'md'}
            fullWidth
            iconLeft={<Calendar className="w-4 h-4 text-[#050608]" />}
            onClick={handleBookClick}
          >
            Book Service
          </LightningButton>
        </div>

        <div className={compact ? 'w-full sm:w-auto' : 'w-full sm:w-auto min-w-[180px]'}>
          <LightningButton
            variant="secondary"
            size={compact ? 'sm' : 'md'}
            href={`tel:${dictionary.company.primaryPhone}`}
            fullWidth
            iconLeft={<Phone className="w-4 h-4 text-[#0B65B3]" />}
          >
            Call Now
          </LightningButton>
        </div>
      </div>

      {/* Alternative Phone Number Link */}
      <div className="pt-1">
        <span className="text-[14px] text-[#A9B4C0]">
          or{' '}
          <a
            href={`tel:${dictionary.company.secondaryPhone}`}
            className="hover:text-white transition-colors underline decoration-white/20 underline-offset-4"
          >
            {dictionary.company.secondaryPhone}
          </a>
        </span>
      </div>
    </div>
  );
}

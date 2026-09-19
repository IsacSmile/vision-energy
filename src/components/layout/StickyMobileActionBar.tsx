'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';
import { Phone, Send, Wrench } from 'lucide-react';

interface StickyMobileActionBarProps {
  drawerOpen?: boolean;
}

export default function StickyMobileActionBar({ drawerOpen }: StickyMobileActionBarProps) {
  const pathname = usePathname();
  const { modalType, openProductModal, openServiceModal } = useEnquiryModal();

  // Hide on admin routes or when modal or drawer is active
  if (pathname.startsWith('/admin') || modalType !== null || drawerOpen) {
    return null;
  }

  const isServicePage = pathname.startsWith('/services');

  const handleEnquiryClick = () => {
    if (isServicePage) {
      openServiceModal({
        serviceSlug: 'general-service',
        serviceTitle: 'General Technical Service Booking',
      });
    } else {
      openProductModal({
        categoryCode: 'LP-01',
        categoryTitle: 'Lightning Protection Products',
      });
    }
  };

  return (
    <aside
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#0D1117]/95 backdrop-blur-md border-t border-[#0B65B3]/40 pb-safe shadow-2xl"
      aria-label="Mobile Action Bar"
    >
      <div className="h-[56px] px-3 flex items-center gap-2 max-w-lg mx-auto">
        <a
          href={`tel:${dictionary.company.primaryPhone}`}
          className="flex-1 h-11 min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-white text-[#050608] font-bold text-sm active:bg-gray-200 transition-colors shadow-md"
        >
          <Phone className="w-4 h-4 text-[#0B65B3]" />
          <span>Call Now</span>
        </a>

        <button
          onClick={handleEnquiryClick}
          className="flex-1 h-11 min-h-[48px] flex items-center justify-center gap-2 rounded-xl bg-gradient-brand text-white font-bold text-sm active:opacity-90 transition-opacity shadow-md"
        >
          {isServicePage ? (
            <>
              <Wrench className="w-4 h-4 text-[#8DC63F]" />
              <span>Book Service</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 text-white" />
              <span>Enquire</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}

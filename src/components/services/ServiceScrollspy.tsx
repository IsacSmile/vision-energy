'use client';

import React, { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';
import LightningButton from '@/components/ui/LightningButton';
import { useEnquiryModal } from '@/components/modals/EnquiryModalProvider';
import { dictionary } from '@/lib/dictionary';

export interface NavSection {
  id: string;
  label: string;
}

interface ServiceScrollspyProps {
  sections: NavSection[];
  serviceSlug: string;
  serviceTitle: string;
}

export default function ServiceScrollspy({
  sections,
  serviceSlug,
  serviceTitle,
}: ServiceScrollspyProps) {
  const { openServiceModal } = useEnquiryModal();
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const handleBookClick = () => {
    openServiceModal({
      serviceSlug,
      serviceTitle,
    });
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <aside
      aria-label="On this page"
      className="hidden lg:block sticky top-[calc(var(--header-offset,0px)+32px)] self-start border-l border-white/10 pl-8 space-y-6 select-none"
    >
      <div>
        <span className="block text-[12px] font-bold text-[#8DC63F] uppercase tracking-[0.14em] mb-4">
          On this page
        </span>

        <nav aria-label="Table of contents">
          <ul className="space-y-3 text-sm relative">
            {sections.map(({ id, label }) => {
              const isActive = activeId === id;

              return (
                <li key={id} className="relative flex items-center">
                  {/* Sliding 2px Lime Bar */}
                  {isActive && (
                    <span
                      className="absolute -left-[33px] w-[2px] h-[20px] bg-[#8DC63F] transition-all duration-300"
                      aria-hidden="true"
                    />
                  )}

                  <a
                    href={`#${id}`}
                    onClick={(e) => handleLinkClick(e, id)}
                    className={`transition-colors duration-200 ${
                      isActive
                        ? 'text-white font-medium'
                        : 'text-white/65 hover:text-white'
                    }`}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      <div className="pt-6 border-t border-white/10 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-white mb-1">
            Book this service
          </h3>
          <p className="text-sm text-[#A9B4C0]">
            Send us your project details and we will get back to you.
          </p>
        </div>

        <LightningButton
          variant="primary"
          size="md"
          fullWidth
          onClick={handleBookClick}
        >
          Book Service
        </LightningButton>

        <a
          href={`tel:${dictionary.company.primaryPhone}`}
          className="inline-flex items-center gap-2 text-sm text-[#A9B4C0] hover:text-white transition-colors pt-1"
        >
          <Phone className="w-4 h-4 text-[#0B65B3]" />
          <span>Call {dictionary.company.primaryPhone}</span>
        </a>
      </div>
    </aside>
  );
}

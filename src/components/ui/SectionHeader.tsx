import React from 'react';
import Reveal from '@/components/ui/Reveal';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  id?: string;
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  id,
  className = '',
}: SectionHeaderProps) {
  const isCentered = align === 'center';

  return (
    <div
      className={`space-y-3 sm:space-y-4 ${
        isCentered ? 'text-center mx-auto max-w-3xl' : 'max-w-3xl'
      } ${className}`}
    >
      <Reveal staggerIndex={0}>
        <div
          className={`inline-flex items-center gap-2.5 text-xs font-bold text-[#8DC63F] uppercase tracking-[0.14em] ${
            isCentered ? 'justify-center' : ''
          }`}
        >
          <span className="w-6 h-[2px] bg-[#8DC63F] rounded-full shrink-0" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
      </Reveal>

      <Reveal staggerIndex={1}>
        <h2
          id={id}
          className="text-[clamp(1.75rem,4.2vw,3rem)] font-semibold text-white leading-[1.15] tracking-[-0.02em] text-balance"
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal staggerIndex={2}>
          <p
            className={`text-base md:text-[1.0625rem] text-[#A9B4C0] leading-[1.7] ${
              isCentered ? 'mx-auto' : ''
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}

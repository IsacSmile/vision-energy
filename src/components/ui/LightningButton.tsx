'use client';

import React, { forwardRef } from 'react';
import Link from 'next/link';

export interface LightningButtonProps {
  id?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  'aria-label'?: string;
  type?: 'button' | 'submit' | 'reset';
}

const LightningButton = forwardRef<HTMLElement, LightningButtonProps>(
  (
    {
      id,
      variant = 'primary',
      size = 'md',
      href,
      onClick,
      iconLeft,
      iconRight,
      fullWidth = false,
      children,
      className = '',
      disabled = false,
      'aria-label': ariaLabel,
      type = 'button',
    },
    ref
  ) => {
    // Size Specifications (sm: 40px, md: 44px, lg: 52px)
    const sizeClasses = {
      sm: 'h-10 px-4 text-xs font-semibold gap-2',
      md: 'h-11 px-5 text-sm font-semibold gap-[8px]',
      lg: 'h-[52px] px-[28px] text-base font-semibold gap-[10px]',
    };

    // Variant Styles (Logo Blue with Lime Green Highlights)
    const variantClasses = {
      primary:
        'lightning-btn-primary bg-[#0B65B3] hover:bg-[#095292] text-white border border-[#8DC63F]/50 hover:border-[#8DC63F] shadow-[0_0_20px_rgba(11,101,179,0.4)] hover:shadow-[0_0_32px_rgba(141,198,63,0.5)] focus-visible:bg-[#095292] focus-visible:border-[#8DC63F] transition-all duration-300',
      secondary:
        'lightning-btn-secondary bg-[#0B65B3]/15 border-2 border-[#0B65B3] text-white hover:bg-[#0B65B3] hover:border-[#8DC63F] hover:shadow-[0_0_28px_rgba(141,198,63,0.45)] focus-visible:bg-[#0B65B3] focus-visible:border-[#8DC63F] transition-all duration-300',
    };

    const widthClasses = fullWidth ? 'w-full' : 'w-auto';
    const disabledClasses = disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : '';

    const combinedClasses = `
      group relative isolate rounded-full overflow-hidden select-none inline-flex items-center justify-center whitespace-nowrap transition-all duration-250
      hover:shadow-[0_0_32px_rgba(141,198,63,0.4)]
      focus-visible:shadow-[0_0_32px_rgba(141,198,63,0.4)]
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050608]
      active:scale-[0.98]
      ${sizeClasses[size]}
      ${variantClasses[variant]}
      ${widthClasses}
      ${disabledClasses}
      ${className}
    `.trim();

    const innerContent = (
      <>
        {/* Layer 2: 1px Blue-to-Lime Gradient Border Overlay (Visible on Hover and Focus) */}
        <div
          className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-[#0B65B3] via-[#8DC63F] to-[#0B65B3] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 pointer-events-none z-[2]"
          aria-hidden="true"
        />

        {/* Content */}
        <span className="relative z-10 flex items-center justify-center gap-[8px] whitespace-nowrap font-bold">
          {iconLeft && (
            <span className="shrink-0 text-[#8DC63F] transition-transform group-hover:scale-110">{iconLeft}</span>
          )}
          <span>{children}</span>
          {iconRight && (
            <span className="shrink-0 text-[#8DC63F] group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-transform duration-300">
              {iconRight}
            </span>
          )}
        </span>
      </>
    );

    if (href) {
      const isExternal = href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http');

      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            id={id}
            href={href}
            aria-label={ariaLabel}
            onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
            className={combinedClasses}
          >
            {innerContent}
          </a>
        );
      }

      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          id={id}
          href={href}
          aria-label={ariaLabel}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          className={combinedClasses}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        id={id}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        className={combinedClasses}
      >
        {innerContent}
      </button>
    );
  }
);

LightningButton.displayName = 'LightningButton';

export default LightningButton;

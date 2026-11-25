'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { X } from 'lucide-react';

const OFFICE_LANDLINE_DISPLAY = '+971 7 204 2763';
const OFFICE_LANDLINE_TEL = '+97172042763';
const WHATSAPP_DISPLAY = '+971 50 768 6700';
const WHATSAPP_URL = 'https://wa.me/971507686700';

/**
 * Desk landline telephone SVG icon for the Office Land Phone action.
 */
function LandPhoneIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.85}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {/* Top curved handset */}
      <path d="M3.5 8.5C5.8 5.8 9 4.5 12 4.5s6.2 1.3 8.5 4c.6.7.5 1.7-.2 2.3l-1.4 1.1c-.6.5-1.5.4-2-.2l-.9-1.1a.8.8 0 0 0-.6-.3h-6.8a.8.8 0 0 0-.6.3l-.9 1.1c-.5.6-1.4.7-2 .2L3.7 10.8c-.7-.6-.8-1.6-.2-2.3Z" />
      {/* Desk cradle base */}
      <path d="M6.5 13h11l1.8 5.2a1.5 1.5 0 0 1-1.4 2H6.1a1.5 1.5 0 0 1-1.4-2L6.5 13Z" />
      {/* Receiver posts */}
      <path d="M8.5 10.5V13M15.5 10.5V13" />
      {/* Keypad indicator */}
      <circle cx="10" cy="16.2" r="0.65" fill="currentColor" stroke="none" />
      <circle cx="12" cy="16.2" r="0.65" fill="currentColor" stroke="none" />
      <circle cx="14" cy="16.2" r="0.65" fill="currentColor" stroke="none" />
    </svg>
  );
}

/**
 * Official WhatsApp brand vector mark.
 */
function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 3.2C8.947 3.2 3.2 8.945 3.2 16c0 2.26.59 4.467 1.71 6.41L3.09 29.06l6.81-1.786A12.74 12.74 0 0 0 16.004 28.8C23.06 28.8 28.8 23.055 28.8 16c0-7.055-5.74-12.8-12.796-12.8Zm7.46 18.088c-.312.88-1.812 1.682-2.502 1.786-.64.095-1.45.136-2.34-.148-.54-.172-1.233-.4-2.12-.783-3.73-1.61-6.166-5.36-6.353-5.61-.186-.25-1.515-2.015-1.515-3.844 0-1.83.958-2.73 1.298-3.102.34-.372.742-.465.99-.465.247 0 .495.002.712.013.228.011.535-.087.837.638.312.745 1.055 2.574 1.148 2.76.093.186.155.403.031.651-.124.248-.186.403-.372.62-.186.217-.392.485-.559.651-.186.185-.38.387-.163.76.217.372.966 1.593 2.075 2.581 1.425 1.27 2.627 1.664 2.999 1.85.372.186.589.155.806-.093.217-.248.93-1.085 1.178-1.457.248-.372.495-.31.836-.186.341.124 2.167 1.022 2.539 1.208.372.186.62.279.713.434.093.155.093.898-.219 1.778Z" />
    </svg>
  );
}

/**
 * Solid speech-bubble message icon matching the sticky contact launcher.
 */
function MessageLauncherIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#F2C230"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H8.4L4 21.6V18H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
    </svg>
  );
}

export default function StickyContactWidget() {
  const pathname = usePathname() || '';
  const [isOpen, setIsOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastTouchTimeRef = useRef<number>(0);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (isOpen) {
      setIsOpen(false);
    }
  }

  const isAdmin = pathname.startsWith('/admin');
  // Service detail pages render a fixed bottom mobile CTA bar (<lg), so lift the widget clear of it.
  const hasServiceMobileBar =
    pathname.startsWith('/services/') && pathname !== '/services/';

  // Close when clicking/tapping outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  if (isAdmin) {
    return null;
  }

  const handleTouchStart = () => {
    lastTouchTimeRef.current = Date.now();
  };

  const handleMouseEnter = () => {
    if (Date.now() - lastTouchTimeRef.current < 600) return;
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (Date.now() - lastTouchTimeRef.current < 600) return;
    setIsOpen(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node | null)) {
      setIsOpen(false);
    }
  };

  const handleToggleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const bottomPositionClass = hasServiceMobileBar
    ? 'bottom-[calc(5.25rem+env(safe-area-inset-bottom,0px))] lg:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]'
    : 'bottom-[calc(0.875rem+env(safe-area-inset-bottom,0px))] sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]';

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onBlur={handleBlur}
      className={`fixed right-[calc(0.875rem+env(safe-area-inset-right,0px))] sm:right-[calc(1.5rem+env(safe-area-inset-right,0px))] ${bottomPositionClass} z-40 flex flex-col items-end`}
    >
      {/* Expanded Action Stack (Office Land Phone + WhatsApp) */}
      <div
        id="sticky-contact-actions"
        aria-hidden={!isOpen}
        className={`flex flex-col items-end gap-3 pb-3 transition-all duration-300 ease-out motion-reduce:transition-none origin-bottom-right ${
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
        }`}
      >
        {/* 1. Office Land Phone Widget */}
        <a
          href={`tel:${OFFICE_LANDLINE_TEL}`}
          tabIndex={isOpen ? 0 : -1}
          aria-label={`Call Office Land Phone ${OFFICE_LANDLINE_DISPLAY}`}
          onClick={() => setIsOpen(false)}
          className={`group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-full transition-all duration-300 motion-reduce:transition-none ${
            isOpen ? 'translate-y-0 opacity-100 delay-[60ms]' : 'translate-y-2 opacity-0'
          }`}
        >
          <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/15 shadow-[0_10px_28px_rgba(15,23,42,0.22)] dark:shadow-[0_10px_28px_rgba(0,0,0,0.55)] flex flex-col items-end text-right max-w-[calc(100vw-6rem)] transition-transform duration-200 group-hover:-translate-x-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0B65B3] dark:text-[#60A5FA] leading-none">
              Office Land Phone
            </span>
            <span className="text-xs sm:text-[13px] font-bold text-[#0F172A] dark:text-white tabular-nums whitespace-nowrap leading-tight mt-0.5">
              {OFFICE_LANDLINE_DISPLAY}
            </span>
          </span>

          <span
            data-preserve-contrast="true"
            className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-gradient-to-br from-[#0B65B3] to-[#084C88] hover:from-[#0E74CE] hover:to-[#0B65B3] text-white border border-white/25 shadow-[0_10px_26px_rgba(11,101,179,0.42)] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
          >
            <LandPhoneIcon className="w-[22px] h-[22px] sm:w-6 sm:h-6 text-white" />
          </span>
        </a>

        {/* 2. Original WhatsApp Widget */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={isOpen ? 0 : -1}
          aria-label={`Chat on WhatsApp ${WHATSAPP_DISPLAY}`}
          onClick={() => setIsOpen(false)}
          className={`group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded-full transition-all duration-300 motion-reduce:transition-none ${
            isOpen ? 'translate-y-0 opacity-100 delay-[20ms]' : 'translate-y-2 opacity-0'
          }`}
        >
          <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-white/15 shadow-[0_10px_28px_rgba(15,23,42,0.22)] dark:shadow-[0_10px_28px_rgba(0,0,0,0.55)] flex flex-col items-end text-right max-w-[calc(100vw-6rem)] transition-transform duration-200 group-hover:-translate-x-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D] dark:text-[#25D366] leading-none">
              WhatsApp &amp; Mobile
            </span>
            <span className="text-xs sm:text-[13px] font-bold text-[#0F172A] dark:text-white tabular-nums whitespace-nowrap leading-tight mt-0.5">
              {WHATSAPP_DISPLAY}
            </span>
          </span>

          <span
            data-preserve-contrast="true"
            className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white border border-white/30 shadow-[0_10px_26px_rgba(37,211,102,0.44)] flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 group-active:scale-95"
          >
            <WhatsAppIcon className="w-[26px] h-[26px] sm:w-7 sm:h-7 text-white" />
          </span>
        </a>
      </div>

      {/* Main Sticky Message Launcher Button */}
      <button
        type="button"
        onClick={handleToggleClick}
        aria-expanded={isOpen}
        aria-controls="sticky-contact-actions"
        aria-label={isOpen ? 'Close quick contact options' : 'Open quick contact options'}
        data-preserve-contrast="true"
        className="relative w-[52px] h-[52px] sm:w-14 sm:h-14 rounded-full bg-[#0A192F] hover:bg-[#0F2442] border-2 border-[#F2C230] shadow-[0_12px_30px_rgba(5,10,20,0.38),0_0_0_1px_rgba(242,194,48,0.18)] hover:shadow-[0_14px_34px_rgba(5,10,20,0.48),0_0_20px_rgba(242,194,48,0.28)] flex items-center justify-center transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] focus-visible:ring-offset-2"
      >
        {/* Online Green Indicator Dot (visible when collapsed) */}
        <span
          aria-hidden="true"
          className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-[#22C55E] border-2 border-white dark:border-[#050608] shadow-sm transition-all duration-200 ${
            isOpen ? 'opacity-0 scale-50' : 'opacity-100 scale-100'
          }`}
        />

        {/* Message Icon (collapsed) */}
        <MessageLauncherIcon
          className={`w-6 h-6 text-[#F2C230] transition-all duration-200 ${
            isOpen ? 'opacity-0 scale-75 rotate-45 absolute' : 'opacity-100 scale-100 rotate-0'
          }`}
        />

        {/* Close X Icon (expanded) */}
        <X
          className={`w-6 h-6 text-white transition-all duration-200 ${
            isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-45 absolute'
          }`}
          aria-hidden="true"
        />
      </button>
    </div>
  );
}

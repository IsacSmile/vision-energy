'use client';

import React, { useRef, useEffect, useState, forwardRef } from 'react';
import Link from 'next/link';

export interface LightningButtonProps {
  id?: string;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
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
    const fxRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLElement | null>(null);
    const controllerRef = useRef<typeof import('@/lib/button-lightning/controller') | null>(null);
    const rafId = useRef<number | null>(null);
    const touchTimeout = useRef<NodeJS.Timeout | null>(null);
    const touchStartTime = useRef<number>(0);
    const isTouchActive = useRef<boolean>(false);
    const [shouldEnableFx, setShouldEnableFx] = useState(false);

    // Merge refs
    const setCombinedRef = (node: HTMLElement | null) => {
      buttonRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLElement | null>).current = node;
      }
    };

    // Check device capabilities on mount
    useEffect(() => {
      if (typeof window === 'undefined') return;

      const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaMotion.matches) return;

      // Check Save-Data or low-end device
      const nav = navigator as unknown as {
        connection?: { saveData?: boolean };
        hardwareConcurrency?: number;
      };
      if (nav.connection?.saveData || (nav.hardwareConcurrency && nav.hardwareConcurrency <= 2)) {
        return;
      }

      setShouldEnableFx(true);

      // Pre-warm controller on idle for fine-pointer desktop devices
      const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
      if (finePointer.matches && 'requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
          import('@/lib/button-lightning/controller').then((mod) => {
            controllerRef.current = mod;
            mod.prewarm();
          });
        });
      }

      return () => {
        if (rafId.current) cancelAnimationFrame(rafId.current);
        if (touchTimeout.current) clearTimeout(touchTimeout.current);
        if (controllerRef.current) controllerRef.current.detach();
      };
    }, []);

    // Helper to dynamically load controller if not loaded
    const getController = async () => {
      if (controllerRef.current) return controllerRef.current;
      const mod = await import('@/lib/button-lightning/controller');
      controllerRef.current = mod;
      return mod;
    };

    const getXNorm = (clientX: number): number => {
      if (!buttonRef.current) return 0.5;
      const rect = buttonRef.current.getBoundingClientRect();
      if (rect.width === 0) return 0.5;
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    };

    // Mouse & Pen Pointer Events
    const handlePointerEnter = (e: React.PointerEvent<HTMLElement>) => {
      if (!shouldEnableFx || disabled || e.pointerType === 'touch') return;
      const xNorm = getXNorm(e.clientX);
      getController().then((ctrl) => {
        if (fxRef.current) ctrl.attach(fxRef.current, xNorm);
      });
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
      if (!shouldEnableFx || disabled || e.pointerType === 'touch') return;
      if (rafId.current) return;
      const xNorm = getXNorm(e.clientX);
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (controllerRef.current) {
          controllerRef.current.setPointer(xNorm);
        }
      });
    };

    const handlePointerLeave = (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === 'touch') {
        handleTouchRelease();
        return;
      }
      if (!shouldEnableFx || disabled) return;
      if (controllerRef.current) {
        controllerRef.current.detach();
      }
    };

    // Keyboard Focus Events
    const handleFocus = () => {
      if (!shouldEnableFx || disabled) return;
      getController().then((ctrl) => {
        if (fxRef.current) ctrl.attach(fxRef.current, 0.5);
      });
    };

    const handleBlur = () => {
      if (controllerRef.current) {
        controllerRef.current.detach();
      }
    };

    // Touch Events (No navigation delay, minimum 450ms burst)
    const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
      if (!shouldEnableFx || disabled || e.pointerType !== 'touch') return;
      isTouchActive.current = true;
      touchStartTime.current = Date.now();
      const xNorm = getXNorm(e.clientX);
      getController().then((ctrl) => {
        if (fxRef.current) {
          ctrl.attach(fxRef.current, xNorm);
        }
      });
    };

    const handleTouchRelease = () => {
      if (!isTouchActive.current) return;
      isTouchActive.current = false;
      const elapsed = Date.now() - touchStartTime.current;
      const remaining = Math.max(0, 450 - elapsed);

      if (touchTimeout.current) clearTimeout(touchTimeout.current);
      touchTimeout.current = setTimeout(() => {
        if (controllerRef.current) {
          controllerRef.current.detach();
        }
      }, remaining);
    };

    // Size Specifications (md: 52px, lg: 56px)
    const sizeClasses = {
      md: 'h-[52px] px-[28px] text-base font-semibold gap-[10px]',
      lg: 'h-[56px] px-[32px] text-base font-semibold gap-[10px]',
    };

    // Variant Styles (Strictly solid backgrounds, no gradient fills)
    const variantClasses = {
      primary:
        'bg-white text-[#050608] border border-transparent hover:bg-[#0D1117] hover:text-white hover:border-[#0B65B3]/60 focus-visible:bg-[#0D1117] focus-visible:text-white focus-visible:border-[#0B65B3]/60 shadow-lg shadow-white/5',
      secondary:
        'bg-[#0D1117]/85 border border-white/12 text-white hover:bg-[#0D1117]/85 hover:border-[#0B65B3]/60 focus-visible:bg-[#0D1117]/85 focus-visible:border-[#0B65B3]/60 [text-shadow:0_0_12px_rgba(5,6,8,0.6)]',
    };

    const widthClasses = fullWidth ? 'w-full max-w-[360px]' : 'w-auto';
    const disabledClasses = disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : '';

    const combinedClasses = `
      group relative isolate rounded-full overflow-hidden select-none inline-flex items-center justify-center transition-all duration-250
      hover:shadow-[0_0_32px_rgba(11,101,179,0.4)]
      focus-visible:shadow-[0_0_32px_rgba(11,101,179,0.4)]
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
        {/* Layer 0 & 1: WebGL Canvas FX Layer */}
        <div ref={fxRef} className="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true" />

        {/* Layer 2: 1px Blue-to-Lime Gradient Border Overlay ONLY ON FOCUS-VISIBLE (Never on hover or rest) */}
        <div
          className="absolute inset-0 rounded-full p-[1px] bg-gradient-to-r from-[#0B65B3] to-[#8DC63F] opacity-0 group-focus-visible:opacity-100 transition-opacity duration-300 pointer-events-none z-[2]"
          aria-hidden="true"
        />

        {/* Layer 3: Content */}
        <span className="relative z-10 flex items-center justify-center gap-[10px]">
          {iconLeft && (
            <span className="shrink-0 transition-transform group-hover:scale-105">{iconLeft}</span>
          )}
          <span>{children}</span>
          {iconRight && (
            <span className="shrink-0 group-hover:translate-x-1 group-focus-visible:translate-x-1 transition-transform duration-300">
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
            ref={setCombinedRef as React.Ref<HTMLAnchorElement>}
            id={id}
            href={href}
            aria-label={ariaLabel}
            onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
            onPointerEnter={handlePointerEnter}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            onPointerDown={handlePointerDown}
            onPointerUp={handleTouchRelease}
            onPointerCancel={handleTouchRelease}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={combinedClasses}
          >
            {innerContent}
          </a>
        );
      }

      return (
        <Link
          ref={setCombinedRef as React.Ref<HTMLAnchorElement>}
          id={id}
          href={href}
          aria-label={ariaLabel}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          onPointerEnter={handlePointerEnter}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          onPointerUp={handleTouchRelease}
          onPointerCancel={handleTouchRelease}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={combinedClasses}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={setCombinedRef as React.Ref<HTMLButtonElement>}
        id={id}
        type={type}
        disabled={disabled}
        aria-label={ariaLabel}
        onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onPointerUp={handleTouchRelease}
        onPointerCancel={handleTouchRelease}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={combinedClasses}
      >
        {innerContent}
      </button>
    );
  }
);

LightningButton.displayName = 'LightningButton';

export default LightningButton;

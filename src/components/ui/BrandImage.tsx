'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image, { type ImageProps } from 'next/image';

export type BrandSurface = 'auto' | 'light' | 'dark';
export type BrandLogoSize = 'xs' | 'sm' | 'md' | 'lg';

interface BrandLogoPlaceholderProps {
  /** Surface appearance behind the Vision logo while loading. */
  surface?: BrandSurface;
  /** Responsive logo sizing tier matching container size. */
  logoSize?: BrandLogoSize;
  /** Disables pulsing/shimmer motion (e.g. when image failed and static fallback stays visible). */
  animate?: boolean;
  className?: string;
}

const LOGO_SIZE_CLASSES: Record<BrandLogoSize, string> = {
  xs: 'w-14 max-w-[78%]',
  sm: 'w-24 sm:w-28 max-w-[74%]',
  md: 'w-32 sm:w-40 max-w-[66%]',
  lg: 'w-40 sm:w-52 max-w-[62%]',
};

/**
 * Centered Vision Energy International brand logo backdrop used while images or routes load.
 */
export function BrandLogoPlaceholder({
  surface = 'auto',
  logoSize = 'md',
  animate = true,
  className = '',
}: BrandLogoPlaceholderProps) {
  const surfaceBgClass =
    surface === 'dark'
      ? 'bg-gradient-to-br from-[#0B1220] via-[#070B14] to-[#05080F]'
      : surface === 'light'
      ? 'bg-gradient-to-br from-slate-50 via-white to-slate-100'
      : 'bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-[#0B1220] dark:via-[#070B14] dark:to-[#05080F]';

  const barTrackClass =
    surface === 'dark'
      ? 'bg-white/10'
      : surface === 'light'
      ? 'bg-slate-200'
      : 'bg-slate-200 dark:bg-white/10';

  const logoWidthClass = LOGO_SIZE_CLASSES[logoSize];
  const showProgressBar = logoSize !== 'xs';

  return (
    <div
      aria-hidden="true"
      className={`flex flex-col items-center justify-center overflow-hidden select-none ${surfaceBgClass} ${className}`}
    >
      {/* Subtle Brand Radial Ambient Accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(11,101,179,0.08), transparent 55%), radial-gradient(circle at 80% 80%, rgba(141,198,63,0.08), transparent 55%)',
        }}
      />

      {/* Subtle Loading Sheen */}
      {animate && (
        <div
          className="absolute inset-0 pointer-events-none animate-brand-sheen opacity-60"
          style={{
            background:
              surface === 'dark'
                ? 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.05) 50%, transparent 80%)'
                : 'linear-gradient(105deg, transparent 20%, rgba(11,101,179,0.05) 50%, transparent 80%)',
          }}
        />
      )}

      {/* Centered Vision Energy Logo (Theme-aware or surface-locked) */}
      <div className="relative z-[1] flex flex-col items-center justify-center gap-2.5 px-3 w-full">
        {surface === 'dark' ? (
          <Image
            src="/main-logo-vision.png"
            alt=""
            width={490}
            height={188}
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
            quality={75}
            loading="eager"
            className={`${logoWidthClass} h-auto object-contain opacity-90 drop-shadow-sm`}
          />
        ) : surface === 'light' ? (
          <Image
            src="/main-logo-vision-light.png"
            alt=""
            width={490}
            height={188}
            sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
            quality={75}
            loading="eager"
            className={`${logoWidthClass} h-auto object-contain opacity-90`}
          />
        ) : (
          <>
            <Image
              src="/main-logo-vision.png"
              alt=""
              width={490}
              height={188}
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
              quality={75}
              loading="eager"
              className={`dark-theme-logo ${logoWidthClass} h-auto object-contain opacity-90 drop-shadow-sm`}
            />
            <Image
              src="/main-logo-vision-light.png"
              alt=""
              width={490}
              height={188}
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 240px, 320px"
              quality={75}
              loading="eager"
              className={`light-theme-logo ${logoWidthClass} h-auto object-contain opacity-90`}
            />
          </>
        )}

        {showProgressBar && animate && (
          <div className={`w-14 sm:w-16 h-[2.5px] rounded-full overflow-hidden ${barTrackClass}`}>
            <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-[#0B65B3] via-[#8DC63F] to-[#0B65B3] animate-brand-progress" />
          </div>
        )}
      </div>
    </div>
  );
}

export interface BrandImageProps extends ImageProps {
  /** Surface styling behind the Vision placeholder logo while loading. */
  surface?: BrandSurface;
  /** Controls placeholder Vision logo dimensions relative to container size. */
  logoSize?: BrandLogoSize;
  /** Optional overlay (such as a dark gradient scrim) revealed smoothly only after the image loads. */
  afterOverlay?: React.ReactNode;
}

/**
 * Drop-in Next.js Image wrapper that displays the Vision Energy International logo cleanly
 * until the image finishes loading (or if loading fails), then crossfades to reveal the actual media.
 */
export default function BrandImage({
  src,
  alt,
  surface = 'auto',
  logoSize = 'md',
  afterOverlay,
  className = '',
  onLoad,
  onError,
  ...rest
}: BrandImageProps) {
  const srcKey = typeof src === 'string' ? src : JSON.stringify(src);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  const isLoaded = loadedSrc === srcKey;
  const hasError = errorSrc === srcKey;
  const showPlaceholder = !isLoaded || hasError;

  // Catch images that finish loading from browser cache before hydration attaches handlers.
  useEffect(() => {
    const el = imgRef.current;
    if (!el || !el.complete) return;

    const rafId = requestAnimationFrame(() => {
      if (el.naturalWidth > 0) {
        setLoadedSrc(srcKey);
      } else {
        setErrorSrc(srcKey);
      }
    });

    return () => cancelAnimationFrame(rafId);
  }, [srcKey]);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setLoadedSrc(srcKey);
    onLoad?.(e);
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    setErrorSrc(srcKey);
    onError?.(e);
  };

  return (
    <>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${hasError ? 'opacity-0' : ''}`}
        {...rest}
      />

      {/* Revealed only after the underlying image loads cleanly */}
      {afterOverlay && (
        <div
          aria-hidden="true"
          className={`absolute inset-0 z-[2] pointer-events-none transition-opacity duration-500 ease-out motion-reduce:transition-none ${
            showPlaceholder ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {afterOverlay}
        </div>
      )}

      {/* Branded Vision Logo Backdrop: opaque until image finishes decoding, then fades out */}
      <BrandLogoPlaceholder
        surface={surface}
        logoSize={logoSize}
        animate={!hasError}
        className={`absolute inset-0 z-[5] pointer-events-none transition-opacity duration-500 ease-out motion-reduce:transition-none ${
          showPlaceholder ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  );
}


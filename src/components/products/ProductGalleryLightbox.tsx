"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxImage {
  id: string;
  blobUrl: string;
  altText: string;
}

interface ProductGalleryLightboxProps {
  images: LightboxImage[];
  title: string;
  initialIndex?: number;
  onClose: () => void;
}

export function ProductGalleryLightbox({
  images,
  title,
  initialIndex = 0,
  onClose,
}: ProductGalleryLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    // Disable background scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, handleNext, handlePrev]);

  if (!images || images.length === 0) return null;

  const activeImage = images[currentIndex];

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black/90 p-4 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Top Bar */}
      <div className="flex w-full max-w-6xl items-center justify-between py-2 text-white border-b border-slate-800">
        <div>
          <h4 className="font-semibold text-sm md:text-base text-slate-100">{title}</h4>
          <span className="text-xs text-slate-400">
            Image {currentIndex + 1} of {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          aria-label="Close Lightbox"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Main Image Container */}
      <div
        className="relative flex h-full max-h-[75vh] w-full max-w-5xl items-center justify-center py-4"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 z-20 rounded-full bg-slate-900/80 p-3 text-white backdrop-blur hover:bg-slate-800 border border-slate-700 transition"
              aria-label="Previous Image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 z-20 rounded-full bg-slate-900/80 p-3 text-white backdrop-blur hover:bg-slate-800 border border-slate-700 transition"
              aria-label="Next Image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        <div className="relative h-full w-full">
          <Image
            src={activeImage.blobUrl}
            alt={activeImage.altText || title}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex w-full max-w-4xl items-center justify-center gap-2 overflow-x-auto py-2">
          {images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setCurrentIndex(idx)}
              className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                idx === currentIndex
                  ? "border-emerald-500 ring-2 ring-emerald-500/30 scale-105"
                  : "border-slate-800 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.blobUrl}
                alt={img.altText || `${title} thumbnail ${idx + 1}`}
                fill
                sizes="56px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

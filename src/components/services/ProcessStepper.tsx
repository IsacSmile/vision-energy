'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ProcessStep } from '@/lib/services/content';

interface ProcessStepperProps {
  steps: ProcessStep[];
}

export default function ProcessStepper({ steps }: ProcessStepperProps) {
  // Filter visible steps (confirmed !== false)
  const visibleSteps = steps.filter((step) => step.confirmed !== false);

  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate relative scroll progress through this section
      const totalHeight = rect.height;
      const visibleTop = windowHeight - rect.top;

      let progress = visibleTop / (totalHeight + windowHeight * 0.3);
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (visibleSteps.length === 0) return null;

  return (
    <div ref={containerRef} className="relative pl-8 space-y-8 my-4">
      {/* Background Track Line */}
      <div className="absolute left-[7px] top-[12px] bottom-[12px] w-[2px] bg-white/10 overflow-hidden">
        {/* Animated Progress Line */}
        <div
          className="w-full bg-[#8DC63F] origin-top transition-transform duration-150 ease-out motion-reduce:transition-none"
          style={{ transform: `scaleY(${scrollProgress})` }}
        />
      </div>

      {visibleSteps.map((step, idx) => {
        const stepNumberStr = String(idx + 1).padStart(2, '0');
        const stepRatio = (idx + 0.5) / visibleSteps.length;
        const isReached = scrollProgress >= stepRatio;

        return (
          <div key={idx} className="relative flex items-start gap-4">
            {/* Lime Dot Indicator */}
            <div
              className={`absolute -left-[32px] top-[6px] w-[16px] h-[16px] rounded-full bg-[#050608] border-2 transition-all duration-300 ${
                isReached
                  ? 'border-[#8DC63F] bg-[#8DC63F] scale-100 opacity-100'
                  : 'border-white/20 scale-75 opacity-60'
              }`}
            />

            <div className="space-y-1.5">
              <div className="flex items-center gap-2.5">
                <span className="tabular-nums text-[13px] font-mono font-semibold text-[#8DC63F]">
                  {stepNumberStr}
                </span>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm text-[#A9B4C0] leading-relaxed max-w-[60ch]">
                {step.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

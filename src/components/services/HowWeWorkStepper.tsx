'use client';

import React, { useEffect, useRef, useState } from 'react';

const WORK_STEPS = [
  {
    step: '01',
    title: 'Product selection',
    description: 'We help you select the right products for the project.',
  },
  {
    step: '02',
    title: 'Technical coordination',
    description: 'We coordinate with the project team and trusted partners.',
  },
  {
    step: '03',
    title: 'Installation support',
    description: 'Installation guidance and support on site.',
  },
  {
    step: '04',
    title: 'After-sales support',
    description: 'Support after delivery so every solution stays in service.',
  },
];

export default function HowWeWorkStepper() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      {/* DESKTOP HORIZONTAL STEPPER (lg and up) */}
      <div className="hidden lg:block relative">
        {/* Track Line */}
        <div className="absolute top-[28px] left-[32px] right-[32px] h-[1px] bg-white/10 overflow-hidden">
          <div
            className="h-full bg-[#8DC63F] origin-left transition-transform duration-[1200ms] ease-out motion-reduce:transition-none"
            style={{ transform: inView ? 'scaleX(1)' : 'scaleX(0)' }}
          />
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-4 gap-8 relative z-10">
          {WORK_STEPS.map((stepItem, index) => (
            <div key={stepItem.step} className="flex flex-col space-y-4">
              {/* Dot & Step Badge */}
              <div className="flex items-center gap-3">
                <div
                  className={`w-[14px] h-[14px] rounded-full bg-[#050608] border-2 transition-all duration-700 delay-[${index * 250}ms] ${
                    inView
                      ? 'border-[#8DC63F] bg-[#8DC63F] scale-100 opacity-100'
                      : 'border-white/20 scale-75 opacity-60'
                  }`}
                />
                <span className="tabular-nums text-[13px] font-mono font-semibold text-[#8DC63F]">
                  {stepItem.step}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  {stepItem.title}
                </h3>
                <p className="text-sm text-[#A9B4C0] leading-relaxed">
                  {stepItem.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE / TABLET VERTICAL STEPPER (below lg) */}
      <div className="lg:hidden relative pl-8 space-y-8">
        {/* Track Line */}
        <div className="absolute left-[7px] top-[8px] bottom-[8px] w-[2px] bg-white/10 overflow-hidden">
          <div
            className="w-full bg-[#8DC63F] origin-top transition-transform duration-[1200ms] ease-out motion-reduce:transition-none"
            style={{ transform: inView ? 'scaleY(1)' : 'scaleY(0)' }}
          />
        </div>

        {WORK_STEPS.map((stepItem, index) => (
          <div key={stepItem.step} className="relative flex items-start gap-4">
            {/* Dot Indicator */}
            <div
              className={`absolute -left-[32px] top-[4px] w-[16px] h-[16px] rounded-full bg-[#050608] border-2 transition-all duration-700 ${
                inView
                  ? 'border-[#8DC63F] bg-[#8DC63F] scale-100 opacity-100'
                  : 'border-white/20 scale-75 opacity-60'
              }`}
            />

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="tabular-nums text-[13px] font-mono font-semibold text-[#8DC63F]">
                  {stepItem.step}
                </span>
                <h3 className="text-base font-semibold text-white tracking-tight">
                  {stepItem.title}
                </h3>
              </div>
              <p className="text-sm text-[#A9B4C0] leading-relaxed">
                {stepItem.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';

export interface StepItem {
  id: number;
  title: string;
  description: string;
}

export const DIAGRAM_STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Intercept',
    description: 'Air terminals or roof mesh capture the strike.',
  },
  {
    id: 2,
    title: 'Conduct',
    description: 'Down conductors route the energy safely.',
  },
  {
    id: 3,
    title: 'Dissipate',
    description: 'Dedicated earth electrodes disperse the energy.',
  },
  {
    id: 4,
    title: 'Bond',
    description: 'Equipotential bonding reduces dangerous potential differences.',
  },
  {
    id: 5,
    title: 'Protect',
    description: 'Surge protection safeguards sensitive equipment.',
  },
];

// SVG Hotspot Coordinates (x, y inside 640x520 viewBox)
const HOTSPOT_COORDS = [
  { id: 1, x: 150, y: 100, label: 'Step 1: Intercept - Air Terminal' },
  { id: 2, x: 150, y: 270, label: 'Step 2: Conduct - Down Conductor' },
  { id: 3, x: 150, y: 460, label: 'Step 3: Dissipate - Earth Pit' },
  { id: 4, x: 300, y: 380, label: 'Step 4: Bond - Bonding Bar' },
  { id: 5, x: 390, y: 320, label: 'Step 5: Protect - Surge Protection Device' },
];

export default function ProtectionDiagram() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [inView, setInView] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Intersection Observer for triggering in-view animation
  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Auto-advance timer (every 3.5s when in view and user has not interacted)
  useEffect(() => {
    if (!inView || hasInteracted || prefersReducedMotion) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveStep((prev) => (prev >= 5 ? 1 : prev + 1));
    }, 3500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [inView, hasInteracted, prefersReducedMotion]);

  const handleSelectStep = (stepId: number) => {
    setHasInteracted(true);
    setActiveStep(stepId);
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={() => setHasInteracted(true)}
      className="w-full flex flex-col space-y-8"
    >
      {/* SECTION HEADER ABOVE DIAGRAM */}
      <div className="flex flex-col space-y-1">
        <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-[0.14em]">
          Interactive Schematic
        </span>
        <h3 className="text-lg sm:text-xl font-semibold text-white">
          How a protection network works
        </h3>
      </div>

      {/* SVG SCHEMATIC CARD */}
      <div className="relative w-full bg-[#050608]/80 border border-white/[0.08] rounded-[20px] p-4 sm:p-6 overflow-hidden shadow-2xl">
        {/* SVG Drawing */}
        <div className="relative w-full aspect-[640/520]">
          <svg
            viewBox="0 0 640 520"
            className="w-full h-full select-none"
            role="img"
            aria-label="Schematic diagram illustrating the 5 key steps of a lightning protection network: 1. Intercept air terminal, 2. Conduct down conductor, 3. Dissipate earth electrode, 4. Equipotential bonding bar, 5. Surge protection device."
          >
            <defs>
              {/* Blue to Lime Gradient for Conductor Path */}
              <linearGradient id="conductorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0B65B3" />
                <stop offset="60%" stopColor="#0B65B3" />
                <stop offset="100%" stopColor="#8DC63F" />
              </linearGradient>

              {/* Glow Filter for Active Conductors */}
              <filter id="pathGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Ground Hatch Pattern */}
              <pattern id="groundHatch" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* 1. SOIL AREA & GROUND LINE */}
            <rect x="0" y="400" width="640" height="120" fill="url(#groundHatch)" />
            <rect x="0" y="400" width="640" height="120" fill="rgba(11,101,179,0.03)" />
            <line x1="20" y1="400" x2="620" y2="400" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeDasharray="6 4" />

            {/* 2. BUILDING CROSS-SECTION (White 1.5px outlines) */}
            <g opacity={activeStep === 1 || activeStep === 2 ? 0.9 : 0.6} className="transition-opacity duration-300">
              {/* Outer Walls & Floor */}
              <path
                d="M 120 400 V 180 H 520 V 400"
                fill="none"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.5"
              />
              {/* Floor Line */}
              <line x1="120" y1="400" x2="520" y2="400" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" />
              {/* Rooftop HVAC Unit */}
              <rect
                x="380"
                y="145"
                width="80"
                height="35"
                rx="4"
                fill="rgba(13,17,23,0.8)"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="1.5"
              />
              {/* Window outlines */}
              <rect x="170" y="220" width="60" height="50" rx="2" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="270" y="220" width="60" height="50" rx="2" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <rect x="170" y="300" width="60" height="50" rx="2" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
            </g>

            {/* 3. LIGHTNING GLYPH & STRIKE IMPACT AT AIR TERMINAL */}
            <g
              transform="translate(150, 60)"
              className={`transition-opacity duration-300 ${activeStep === 1 ? 'opacity-100' : 'opacity-40'}`}
            >
              <path
                d="M -6 -20 L 4 -4 L -2 2 L 8 18 L -4 4 L 2 -2 Z"
                fill="#8DC63F"
                stroke="#FFFFFF"
                strokeWidth="1"
              />
              <circle cx="0" cy="20" r="12" fill="none" stroke="#8DC63F" strokeWidth="1" opacity="0.4" className="animate-ping" />
            </g>

            {/* 4. MAIN CONDUCTOR PATH (Steps 1, 2, 3) */}
            {/* Air Rod -> Down Conductor -> Test Joint -> Earth Pit 1 -> Buried Tape -> Earth Pit 2 */}
            <path
              d="M 150 90 V 180 V 360 V 460 H 490 V 400"
              fill="none"
              stroke="url(#conductorGrad)"
              strokeWidth="2.5"
              filter="url(#pathGlow)"
              className="transition-all duration-300"
              style={{
                strokeDasharray: inView && !prefersReducedMotion ? '1000' : 'none',
                strokeDashoffset: inView && !prefersReducedMotion ? '0' : '0',
                opacity: activeStep <= 3 ? 1 : 0.65,
              }}
            />

            {/* Test Joint Box on Down Conductor (y=360) */}
            <rect
              x="143"
              y="352"
              width="14"
              height="16"
              rx="3"
              fill="#0D1117"
              stroke={activeStep === 2 ? '#8DC63F' : '#0B65B3'}
              strokeWidth="1.5"
            />

            {/* Earth Electrodes / Pits (y=460) */}
            <g opacity={activeStep === 3 ? 1 : 0.6}>
              {/* Pit 1 */}
              <rect x="135" y="440" width="30" height="30" rx="4" fill="#0D1117" stroke="#0B65B3" strokeWidth="1.5" />
              <line x1="150" y1="460" x2="150" y2="495" stroke="#8DC63F" strokeWidth="2" />
              <line x1="142" y1="480" x2="158" y2="480" stroke="#8DC63F" strokeWidth="1.5" />
              <line x1="145" y1="488" x2="155" y2="488" stroke="#8DC63F" strokeWidth="1.5" />

              {/* Pit 2 */}
              <rect x="475" y="440" width="30" height="30" rx="4" fill="#0D1117" stroke="#0B65B3" strokeWidth="1.5" />
              <line x1="490" y1="440" x2="490" y2="495" stroke="#8DC63F" strokeWidth="2" />
              <line x1="482" y1="480" x2="498" y2="480" stroke="#8DC63F" strokeWidth="1.5" />
              <line x1="485" y1="488" x2="495" y2="488" stroke="#8DC63F" strokeWidth="1.5" />
            </g>

            {/* 5. BONDING BAR & LINE (Step 4) */}
            <g opacity={activeStep === 4 ? 1 : 0.55} className="transition-opacity duration-300">
              {/* Bonding Bar */}
              <rect x="260" y="375" width="80" height="12" rx="3" fill="#0D1117" stroke={activeStep === 4 ? '#8DC63F' : '#0B65B3'} strokeWidth="1.5" />
              <circle cx="275" cy="381" r="2" fill="#8DC63F" />
              <circle cx="300" cy="381" r="2" fill="#8DC63F" />
              <circle cx="325" cy="381" r="2" fill="#8DC63F" />
              {/* Conductor to Down Conductor */}
              <path d="M 150 381 H 260" fill="none" stroke="#8DC63F" strokeWidth="1.5" strokeDasharray="4 2" />
            </g>

            {/* 6. SURGE PROTECTION DEVICE & MDB (Step 5) */}
            <g opacity={activeStep === 5 ? 1 : 0.55} className="transition-opacity duration-300">
              {/* Distribution Board Enclosure */}
              <rect x="360" y="295" width="60" height="50" rx="4" fill="#0D1117" stroke={activeStep === 5 ? '#8DC63F' : '#0B65B3'} strokeWidth="1.5" />
              {/* SPD Symbol inside DB */}
              <path d="M 375 320 H 405 M 390 310 V 330" fill="none" stroke="#8DC63F" strokeWidth="1.5" />
              {/* Bonding Line from DB to Bonding Bar */}
              <path d="M 390 345 V 381 H 340" fill="none" stroke="#8DC63F" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>

            {/* 7. ANIMATED TRAVELING PULSE DOT */}
            {inView && !prefersReducedMotion && (
              <circle r="4" fill="#8DC63F" filter="url(#pathGlow)">
                <animateMotion
                  path="M 150 90 V 180 V 360 V 460 H 490 V 400"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
            )}

            {/* 8. INTERACTIVE SVG HOTSPOTS (32px circles with 44px hit areas) */}
            {HOTSPOT_COORDS.map((spot) => {
              const isActive = activeStep === spot.id;
              return (
                <g key={spot.id} transform={`translate(${spot.x}, ${spot.y})`}>
                  {/* Pulsing Outer Ring for Active Hotspot */}
                  {isActive && !prefersReducedMotion && (
                    <circle cx="0" cy="0" r="22" fill="none" stroke="#8DC63F" strokeWidth="1.5" opacity="0.6" className="animate-ping" />
                  )}

                  {/* 44px Transparent Hit Area */}
                  <circle
                    cx="0"
                    cy="0"
                    r="22"
                    fill="transparent"
                    className="cursor-pointer"
                    onClick={() => handleSelectStep(spot.id)}
                    tabIndex={0}
                    role="button"
                    aria-label={spot.label}
                    aria-pressed={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleSelectStep(spot.id);
                      }
                    }}
                  />

                  {/* 32px Hotspot Circle */}
                  <circle
                    cx="0"
                    cy="0"
                    r="16"
                    fill={isActive ? '#0B65B3' : '#0D1117'}
                    stroke={isActive ? '#8DC63F' : '#0B65B3'}
                    strokeWidth="2"
                    className="transition-colors duration-300 pointer-events-none"
                  />

                  {/* Step Number */}
                  <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="13"
                    fontWeight="700"
                    className="pointer-events-none"
                  >
                    {spot.id}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Diagram Caption */}
        <p className="mt-4 text-xs text-[#A9B4C0]/90 text-center italic">
          A coordinated system helps protect people, structure, electrical installations and critical equipment.
        </p>
      </div>

      {/* 5-STEPPER (Synced Vertical List / Grid) */}
      <div className="w-full flex flex-col space-y-3">
        {DIAGRAM_STEPS.map((step) => {
          const isActive = activeStep === step.id;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => handleSelectStep(step.id)}
              aria-expanded={isActive}
              className={`w-full min-h-[48px] text-left p-4 rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] ${
                isActive
                  ? 'bg-[#0B65B3]/10 border-[#8DC63F]/50 shadow-md'
                  : 'bg-[#050608]/50 border-white/[0.08] hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Step Number Circle */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors duration-300 ${
                    isActive
                      ? 'bg-[#8DC63F] text-[#050608]'
                      : 'bg-white/10 text-white/70'
                  }`}
                >
                  {step.id}
                </div>

                {/* Content Block */}
                <div className="flex-1 flex flex-col justify-center">
                  <span
                    className={`text-base font-semibold leading-snug transition-colors duration-300 ${
                      isActive ? 'text-white' : 'text-white/80'
                    }`}
                  >
                    {step.title}
                  </span>

                  {/* Smooth Collapsible Description */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isActive ? 'grid-rows-[1fr] opacity-100 mt-1.5' : 'grid-rows-[0fr] opacity-0 mt-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm text-[#A9B4C0] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

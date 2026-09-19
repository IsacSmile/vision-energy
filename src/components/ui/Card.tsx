'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  highlightBorder?: boolean;
}

export default function Card({
  children,
  href,
  className = '',
  highlightBorder = false,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const rafId = useRef<number | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      setMousePos({ x, y });
    });
  };

  const handlePointerEnter = () => setIsHovered(true);
  const handlePointerLeave = () => setIsHovered(false);

  const borderBgClass = highlightBorder
    ? 'bg-gradient-to-r from-[#0B65B3] to-[#8DC63F]'
    : 'bg-white/[0.08] group-hover:bg-[#0B65B3]/50 transition-colors duration-300';

  const baseContent = (
    <div
      className={`p-[1px] rounded-[20px] h-full transition-all duration-300 ${borderBgClass} ${className}`}
    >
      <div
        ref={cardRef}
        onPointerMove={href ? handlePointerMove : undefined}
        onPointerEnter={href ? handlePointerEnter : undefined}
        onPointerLeave={href ? handlePointerLeave : undefined}
        style={
          {
            '--mx': `${mousePos.x}%`,
            '--my': `${mousePos.y}%`,
          } as React.CSSProperties
        }
        className={`relative group bg-[#0D1117] rounded-[19px] p-6 lg:p-8 h-full flex flex-col overflow-hidden ${
          href
            ? 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] active-press hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(11,101,179,0.15)]'
            : ''
        }`}
      >
        {/* Spotlight Radial Overlay (interactive hover effect) */}
        {href && (
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-[19px]"
            style={{
              background:
                'radial-gradient(400px circle at var(--mx) var(--my), rgba(11,101,179,0.12), transparent 80%)',
            }}
            aria-hidden="true"
          />
        )}

        <div className="relative z-10 h-full flex flex-col flex-1">{children}</div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full focus-visible:outline-none rounded-[20px]">
        {baseContent}
      </Link>
    );
  }

  return baseContent;
}

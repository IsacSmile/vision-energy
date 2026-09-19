import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'active' | 'static';
  className?: string;
  onClick?: () => void;
}

export default function Chip({
  children,
  variant = 'default',
  className = '',
  onClick,
}: ChipProps) {
  const variantStyles = {
    default: 'text-white border-white/15 bg-transparent hover:border-white/30',
    active: 'text-[#8DC63F] border-[#8DC63F] bg-transparent font-medium',
    static: 'text-white/80 border-white/10 bg-[#050608]/50 cursor-default',
  };

  const baseClasses =
    'h-[40px] px-4 rounded-full text-sm font-medium shrink-0 inline-flex items-center justify-center border transition-colors select-none';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${variantStyles[variant]} ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <div className={`${baseClasses} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
}

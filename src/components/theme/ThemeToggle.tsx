'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md';
  id?: string;
}

export default function ThemeToggle({
  className = '',
  size = 'md',
  id = 'theme-toggle-button',
}: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = !mounted || theme === 'dark';

  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative inline-flex items-center justify-center rounded-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] active:scale-95 select-none ${
        size === 'sm' ? 'w-9 h-9' : 'w-[44px] h-[44px]'
      } ${
        isDark
          ? 'bg-[#0D1117]/90 text-white border border-white/12 hover:border-[#8DC63F]/60 hover:bg-[#161B22] hover:text-[#F2C230] shadow-md'
          : 'bg-slate-100 text-slate-800 border border-slate-300 hover:border-[#0B65B3] hover:bg-slate-200 hover:text-[#0B65B3] shadow-sm'
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {/* Sun Icon (Visible in dark mode, prompts switch to light mode) */}
        <Sun
          className={`w-[18px] h-[18px] transition-all duration-300 transform absolute ${
            isDark
              ? 'opacity-100 rotate-0 scale-100 text-[#F2C230]'
              : 'opacity-0 -rotate-90 scale-0 text-amber-500'
          }`}
          aria-hidden="true"
        />

        {/* Moon Icon (Visible in light mode, prompts switch to dark mode) */}
        <Moon
          className={`w-[18px] h-[18px] transition-all duration-300 transform absolute ${
            isDark
              ? 'opacity-0 rotate-90 scale-0 text-slate-400'
              : 'opacity-100 rotate-0 scale-100 text-[#0B65B3]'
          }`}
          aria-hidden="true"
        />
      </div>
    </button>
  );
}

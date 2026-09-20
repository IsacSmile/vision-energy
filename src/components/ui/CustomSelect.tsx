'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  ariaLabel?: string;
  className?: string;
  buttonClassName?: string;
  size?: 'sm' | 'md';
  align?: 'left' | 'right';
}

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select option...',
  id,
  ariaLabel,
  className = '',
  buttonClassName = '',
  size = 'md',
  align = 'right',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  const sizeClasses =
    size === 'sm'
      ? 'h-9 px-3 text-xs gap-1.5'
      : 'h-11 px-4 text-sm gap-2';

  const alignClasses = align === 'right' ? 'right-0' : 'left-0';

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || selectedOption?.label || placeholder}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-full bg-[#050608] border border-[#1F2937] hover:border-[#8DC63F]/50 text-white font-medium flex items-center justify-between transition-colors select-none focus:outline-none focus:ring-2 focus:ring-[#8DC63F] focus:border-[#8DC63F] ${sizeClasses} ${buttonClassName}`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#8DC63F] shrink-0 transition-transform duration-250 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Custom Dropdown Popover Panel */}
      {isOpen && (
        <div
          role="listbox"
          tabIndex={-1}
          className={`absolute top-full mt-2 min-w-[180px] w-full max-h-60 overflow-y-auto z-50 bg-[#0D1117] border border-[#1F2937] rounded-2xl shadow-2xl p-1.5 space-y-0.5 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 ${alignClasses}`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <div
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(opt.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer transition-colors select-none ${
                  isSelected
                    ? 'bg-[#8DC63F]/15 text-[#8DC63F] font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-4 h-4 text-[#8DC63F] shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

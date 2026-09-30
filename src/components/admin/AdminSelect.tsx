'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface AdminSelectOption {
  value: string;
  label: string;
}

interface AdminSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: AdminSelectOption[];
  icon?: any;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function AdminSelect({
  value,
  onChange,
  options,
  icon: Icon,
  placeholder = 'Select...',
  className = '',
  disabled = false,
}: AdminSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`w-full bg-[#050608] border ${
          open ? 'border-[#8DC63F]' : 'border-[#1F2937] hover:border-gray-600'
        } rounded-xl px-3 py-2.5 text-xs text-white flex items-center justify-between gap-2 transition-colors min-h-[42px] disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-4 h-4 text-gray-400 shrink-0" />}
          <span className={selectedOption && selectedOption.value !== '' ? 'text-white font-medium truncate' : 'text-gray-400 truncate'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 shrink-0 ${
            open ? 'rotate-180 text-[#8DC63F]' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0D1117] border border-[#1F2937] rounded-xl shadow-2xl py-1 z-40 max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-150">
          {options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs flex items-center justify-between text-left transition-colors ${
                  isSelected
                    ? 'bg-[#8DC63F]/10 text-[#8DC63F] font-semibold'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#8DC63F]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminSelect;

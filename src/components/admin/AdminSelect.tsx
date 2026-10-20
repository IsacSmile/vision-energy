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
        className={`w-full bg-white dark:bg-[#050608] border ${
          open ? 'border-[#0B65B3] dark:border-[#8DC63F]' : 'border-slate-200 dark:border-[#1F2937] hover:border-slate-400 dark:hover:border-gray-600'
        } rounded-xl px-3 py-2.5 text-xs text-slate-800 dark:text-white flex items-center justify-between gap-2 transition-colors min-h-[42px] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm dark:shadow-none`}
      >
        <div className="flex items-center gap-2 truncate">
          {Icon && <Icon className="w-4 h-4 text-slate-400 dark:text-gray-400 shrink-0" />}
          <span className={selectedOption && selectedOption.value !== '' ? 'text-slate-900 dark:text-white font-medium truncate' : 'text-slate-500 dark:text-gray-400 truncate'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 dark:text-gray-400 transition-transform duration-200 shrink-0 ${
            open ? 'rotate-180 text-[#0B65B3] dark:text-[#8DC63F]' : ''
          }`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-[#0D1117] border border-slate-200 dark:border-[#1F2937] rounded-xl shadow-xl py-1 z-40 max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in zoom-in-95 duration-150">
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
                    ? 'bg-[#0B65B3]/10 text-[#0B65B3] dark:bg-[#8DC63F]/10 dark:text-[#8DC63F] font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#0B65B3] dark:text-[#8DC63F]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AdminSelect;

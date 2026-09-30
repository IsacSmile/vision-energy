'use client';

import React, { useRef } from 'react';
import { Calendar, X } from 'lucide-react';

interface AdminDatePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function AdminDatePicker({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
  disabled = false,
}: AdminDatePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (disabled) return;
    if (inputRef.current) {
      if ('showPicker' in HTMLInputElement.prototype && typeof inputRef.current.showPicker === 'function') {
        try {
          inputRef.current.showPicker();
        } catch {
          inputRef.current.focus();
        }
      } else {
        inputRef.current.focus();
      }
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
  };

  return (
    <div
      onClick={handleClick}
      className={`relative w-full bg-[#050608] border ${
        value ? 'border-[#8DC63F]/60' : 'border-[#1F2937] hover:border-gray-600'
      } rounded-xl px-3 py-2 text-xs text-white flex items-center justify-between gap-2 cursor-pointer transition-colors min-h-[42px] group ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      <div className="flex items-center gap-2 truncate pointer-events-none">
        <Calendar className="w-4 h-4 text-gray-400 group-hover:text-[#8DC63F] transition-colors shrink-0" />
        <span className={value ? 'text-white font-medium' : 'text-gray-400'}>
          {value ? new Date(value).toLocaleDateString('en-GB') : placeholder}
        </span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {value && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            title="Clear date"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="date"
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 opacity-0 pointer-events-none w-full h-full [color-scheme:dark]"
        tabIndex={-1}
      />
    </div>
  );
}

export default AdminDatePicker;

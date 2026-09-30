'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function AdminClock() {
  const [mounted, setMounted] = useState(false);
  const [timeStr, setTimeStr] = useState('');
  const [secondsStr, setSecondsStr] = useState('');
  const [periodStr, setPeriodStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    setMounted(true);

    const updateClock = () => {
      const now = new Date();

      // Format time for UAE timezone (Asia/Dubai: Abu Dhabi, Dubai, Ras Al Khaimah)
      const timeParts = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dubai',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).formatToParts(now);

      const hour = timeParts.find((p) => p.type === 'hour')?.value || '00';
      const minute = timeParts.find((p) => p.type === 'minute')?.value || '00';
      const second = timeParts.find((p) => p.type === 'second')?.value || '00';
      const dayPeriod = timeParts.find((p) => p.type === 'dayPeriod')?.value || 'AM';

      setTimeStr(`${hour}:${minute}`);
      setSecondsStr(second);
      setPeriodStr(dayPeriod);

      // Format Date in UAE timezone
      const formattedDate = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dubai',
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(now);

      setDateStr(formattedDate);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0D1117] border border-[#1F2937] rounded-xl text-xs text-gray-500 animate-pulse">
        <Clock className="w-3.5 h-3.5 text-gray-500" />
        <span>Loading UAE time...</span>
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#0D1117]/90 hover:bg-[#0D1117] border border-[#1F2937] hover:border-[#8DC63F]/40 rounded-xl shadow-lg shadow-black/40 backdrop-blur-md transition-all select-none group"
      title="UAE Standard Time (Abu Dhabi | Dubai | Ras Al Khaimah) • UTC+4"
    >
      {/* Live Pulse Indicator & Clock Icon */}
      <div className="relative flex items-center justify-center shrink-0">
        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-[#8DC63F] rounded-full animate-ping opacity-75" />
        <span className="w-1.5 h-1.5 bg-[#8DC63F] rounded-full absolute -top-0.5 -right-0.5" />
        <Clock className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#8DC63F] transition-colors" />
      </div>

      {/* Clock Details */}
      <div className="flex flex-col text-left leading-tight">
        {/* Time with Seconds */}
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-xs font-bold text-white tracking-wider">{timeStr}</span>
          <span className="text-[11px] font-semibold text-[#8DC63F]">{secondsStr}</span>
          <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tight ml-0.5">
            {periodStr}
          </span>
          <span className="text-[9px] font-medium text-gray-500 ml-1">GST</span>
        </div>

        {/* Date & Location Subtitle */}
        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
          <span className="font-medium text-gray-300">{dateStr}</span>
          <span className="text-gray-600">•</span>
          <span className="text-[9px] text-gray-400 group-hover:text-[#8DC63F]/90 transition-colors truncate max-w-[140px] sm:max-w-none">
            Abu Dhabi | Dubai | RAK
          </span>
        </div>
      </div>
    </div>
  );
}

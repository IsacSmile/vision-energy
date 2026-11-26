import React from 'react';
import type { DataTableConfig, TableCellValue } from '@/lib/data/expertise';

interface DataTableProps {
  table: DataTableConfig;
}

function renderCell(cell: TableCellValue, isFirstCol = false) {
  if (typeof cell !== 'string') {
    return (
      <span className="inline-flex items-center gap-1.5" aria-label={cell.label} title={cell.label}>
        {Array.from({ length: cell.count }).map((_, i) => (
          <span
            key={i}
            className={`inline-block w-2.5 h-2.5 rounded-full ${
              cell.tone === 'positive'
                ? 'bg-[#16A34A] dark:bg-[#8DC63F]'
                : 'bg-rose-400/90 dark:bg-rose-400/80'
            }`}
            aria-hidden="true"
          />
        ))}
      </span>
    );
  }

  if (isFirstCol) {
    const trimmed = cell.trim();
    if (/^(level\s*1|i)$/i.test(trimmed)) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#8DC63F]/15 text-[#38700D] dark:text-[#8DC63F] border border-[#8DC63F]/35">
          {trimmed}
        </span>
      );
    }
    if (/^(level\s*4|iv)$/i.test(trimmed)) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0B65B3]/12 text-[#0B65B3] dark:text-[#60A5FA] border border-[#0B65B3]/30">
          {trimmed}
        </span>
      );
    }
  }

  return cell;
}

export default function DataTable({ table }: DataTableProps) {
  const hasGroupedHeader = Boolean(table.columnGroups && table.columnGroups.length > 0);

  return (
    <div className="space-y-2.5">
      <div className="overflow-x-auto rounded-[12px] border border-slate-200/90 dark:border-white/10 bg-white dark:bg-[#0D1117] shadow-[0_4px_18px_-4px_rgba(10,25,47,0.08)]">
        <table className="expertise-table w-full border-collapse text-left text-sm sm:text-[15px]">
          <caption className="px-4 py-3 text-left text-xs sm:text-[13px] font-semibold text-[#0A192F] dark:text-white bg-[#F4F8FC] dark:bg-[#111824] border-b border-slate-200 dark:border-white/10">
            {table.caption}
          </caption>

          <thead data-preserve-contrast="true">
            {hasGroupedHeader && table.columnGroups && (
              <tr className="bg-[#0A192F] dark:bg-[#071121] border-b border-white/15">
                {table.columnGroups.map((group, gIdx) => {
                  const isFirst = gIdx === 0;
                  return (
                    <th
                      key={gIdx}
                      scope={group.colSpan > 1 ? 'colgroup' : 'col'}
                      colSpan={group.colSpan}
                      className={`px-3.5 py-3 text-xs uppercase tracking-wider font-semibold text-white whitespace-nowrap ${
                        isFirst
                          ? 'sticky left-0 z-20 bg-[#0A192F] dark:bg-[#071121] border-r border-white/15'
                          : 'text-center border-l border-white/15'
                      }`}
                    >
                      {group.label}
                    </th>
                  );
                })}
              </tr>
            )}

            <tr className="bg-[#0A192F] dark:bg-[#071121] border-b border-white/15">
              {table.headers.map((header, hIdx) => {
                const isFirst = hIdx === 0;
                return (
                  <th
                    key={hIdx}
                    scope="col"
                    className={`px-3.5 py-3 text-xs uppercase tracking-wider font-semibold text-white whitespace-nowrap ${
                      isFirst
                        ? 'sticky left-0 z-20 bg-[#0A192F] dark:bg-[#071121] border-r border-white/15 text-left'
                        : 'text-center'
                    }`}
                  >
                    {header}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-200/80 dark:divide-white/10">
            {table.rows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => {
                  const isFirst = cIdx === 0;
                  if (isFirst) {
                    return (
                      <th
                        key={cIdx}
                        scope="row"
                        className="sticky left-0 z-10 px-3.5 py-3 font-bold text-[#0A192F] dark:text-white border-r border-slate-200/80 dark:border-white/10 whitespace-nowrap text-left"
                      >
                        {renderCell(cell, true)}
                      </th>
                    );
                  }
                  return (
                    <td
                      key={cIdx}
                      className={`px-3.5 py-3 font-normal text-[#334155] dark:text-[#CBD5E1] ${
                        typeof cell === 'string' && cell.length > 24
                          ? 'min-w-[190px] text-left leading-[1.55]'
                          : 'whitespace-nowrap text-center tabular-nums'
                      }`}
                    >
                      {renderCell(cell)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.footnote && (
        <p className="text-[13px] font-normal text-slate-600 dark:text-[#A9B4C0] leading-relaxed">
          {table.footnote}
        </p>
      )}
    </div>
  );
}

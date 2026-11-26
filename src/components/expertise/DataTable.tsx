import React from 'react';
import type { DataTableConfig, TableCellValue } from '@/lib/data/expertise';

interface DataTableProps {
  table: DataTableConfig;
}

function renderCell(cell: TableCellValue) {
  if (typeof cell === 'string') {
    return cell;
  }

  return (
    <span className="inline-flex items-center gap-1" aria-label={cell.label} title={cell.label}>
      {Array.from({ length: cell.count }).map((_, i) => (
        <span
          key={i}
          className={`inline-block w-2.5 h-2.5 rounded-full ${
            cell.tone === 'positive'
              ? 'bg-emerald-600 dark:bg-[#8DC63F]'
              : 'bg-rose-500 dark:bg-rose-400'
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function DataTable({ table }: DataTableProps) {
  const hasGroupedHeader = Boolean(table.columnGroups && table.columnGroups.length > 0);

  return (
    <div className="space-y-2">
      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#0D1117]">
        <table className="w-full border-collapse text-left text-xs sm:text-sm">
          <caption className="px-4 py-2.5 text-left text-xs font-semibold text-[#0F172A] dark:text-white bg-slate-50 dark:bg-[#131924] border-b border-slate-200 dark:border-white/10">
            {table.caption}
          </caption>

          <thead>
            {hasGroupedHeader && table.columnGroups && (
              <tr className="bg-slate-50 dark:bg-[#131924] border-b border-slate-200 dark:border-white/10">
                {table.columnGroups.map((group, gIdx) => {
                  const isFirst = gIdx === 0;
                  return (
                    <th
                      key={gIdx}
                      scope={group.colSpan > 1 ? 'colgroup' : 'col'}
                      colSpan={group.colSpan}
                      className={`px-3 py-2.5 font-semibold text-[#0F172A] dark:text-white whitespace-nowrap ${
                        isFirst
                          ? 'sticky left-0 z-20 bg-slate-50 dark:bg-[#131924] border-r border-slate-200 dark:border-white/10'
                          : 'text-center border-l border-slate-200 dark:border-white/10'
                      }`}
                    >
                      {group.label}
                    </th>
                  );
                })}
              </tr>
            )}

            <tr className="bg-slate-50/80 dark:bg-[#131924]/90 border-b border-slate-200 dark:border-white/10">
              {table.headers.map((header, hIdx) => {
                const isFirst = hIdx === 0;
                return (
                  <th
                    key={hIdx}
                    scope="col"
                    className={`px-3 py-2.5 font-semibold text-[#0F172A] dark:text-white whitespace-nowrap ${
                      isFirst
                        ? 'sticky left-0 z-20 bg-slate-50 dark:bg-[#131924] border-r border-slate-200 dark:border-white/10 text-left'
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
              <tr
                key={rIdx}
                className="bg-white dark:bg-[#0D1117] hover:bg-slate-50/70 dark:hover:bg-white/[0.02] transition-colors"
              >
                {row.map((cell, cIdx) => {
                  const isFirst = cIdx === 0;
                  if (isFirst) {
                    return (
                      <th
                        key={cIdx}
                        scope="row"
                        className="sticky left-0 z-10 bg-white dark:bg-[#0D1117] px-3 py-2.5 font-semibold text-[#0F172A] dark:text-white border-r border-slate-200 dark:border-white/10 whitespace-nowrap text-left"
                      >
                        {renderCell(cell)}
                      </th>
                    );
                  }
                  return (
                    <td
                      key={cIdx}
                      className={`px-3 py-2.5 font-normal text-slate-600 dark:text-[#CBD5E1] ${
                        typeof cell === 'string' && cell.length > 24
                          ? 'min-w-[180px] text-left'
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
        <p className="text-xs font-normal text-slate-500 dark:text-[#A9B4C0] leading-relaxed">
          {table.footnote}
        </p>
      )}
    </div>
  );
}


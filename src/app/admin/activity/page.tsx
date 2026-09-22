"use client";

import React, { useState, useEffect } from "react";
import { Activity, Filter, RefreshCw, Loader2 } from "lucide-react";

export default function AdminActivityPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionFilter, setActionFilter] = useState("");
  const [entityFilter, setEntityFilter] = useState("");

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (actionFilter) params.set("action", actionFilter);
      if (entityFilter) params.set("entity", entityFilter);

      const res = await fetch(`/api/admin/activity?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (err) {
      console.error("Failed to load audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [actionFilter, entityFilter]);

  const actionBadgeColor = (action: string) => {
    switch (action) {
      case "CREATE":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "UPDATE":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "DELETE":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "RESTORE":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
      case "PUBLISH":
        return "bg-[#A3E635]/10 text-[#A3E635] border-[#A3E635]/30";
      case "UNPUBLISH":
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
      case "LOGIN":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      case "LOGOUT":
        return "bg-gray-700/20 text-gray-400 border-gray-700";
      default:
        return "bg-gray-800 text-gray-300 border-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1F2937] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Activity className="w-6 h-6 text-[#A3E635]" />
            <span>Activity Log</span>
          </h1>
          <p className="text-xs text-[#A9B4C0] mt-1">
            Read-only audit history of administrative changes, publish events, and security logins.
          </p>
        </div>

        <button
          onClick={fetchLogs}
          className="p-2.5 text-gray-400 hover:text-white bg-[#0D1117] border border-[#1F2937] rounded-xl hover:bg-white/5 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center self-start sm:self-auto"
          title="Refresh Log"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-[#0D1117] border border-[#1F2937] rounded-xl">
        <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
          <Filter className="w-4 h-4" />
          <span>Filters:</span>
        </div>

        {/* Action Filter */}
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value)}
          className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
        >
          <option value="">All Actions</option>
          <option value="CREATE">CREATE</option>
          <option value="UPDATE">UPDATE</option>
          <option value="DELETE">DELETE</option>
          <option value="RESTORE">RESTORE</option>
          <option value="PUBLISH">PUBLISH</option>
          <option value="UNPUBLISH">UNPUBLISH</option>
          <option value="LOGIN">LOGIN</option>
          <option value="LOGOUT">LOGOUT</option>
        </select>

        {/* Entity Filter */}
        <select
          value={entityFilter}
          onChange={(e) => setEntityFilter(e.target.value)}
          className="bg-[#050608] border border-[#1F2937] text-white text-xs rounded-xl px-3 py-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-[#A3E635]"
        >
          <option value="">All Entities</option>
          <option value="PRODUCT_CATEGORY">PRODUCT_CATEGORY</option>
          <option value="SERVICE">SERVICE</option>
          <option value="BLOG_POST">BLOG_POST</option>
          <option value="ADMIN_AUTH">ADMIN_AUTH</option>
        </select>

        {(actionFilter || entityFilter) && (
          <button
            onClick={() => {
              setActionFilter("");
              setEntityFilter("");
            }}
            className="text-xs text-gray-400 hover:text-white underline px-2 py-1"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Audit Log Table */}
      <div className="bg-[#0D1117] border border-[#1F2937] rounded-xl overflow-hidden shadow-xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 gap-3">
            <Loader2 className="w-6 h-6 text-[#A3E635] animate-spin" />
            <p className="text-xs text-gray-400 font-mono">Loading activity entries...</p>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <p className="text-sm font-semibold text-white">No activity records found.</p>
            <p className="text-xs text-gray-400">Events will appear here as items are created, modified, or published.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#050608] border-b border-[#1F2937] text-gray-400 text-[11px] font-semibold uppercase tracking-wider">
                  <th scope="col" className="p-4">Timestamp</th>
                  <th scope="col" className="p-4">Actor</th>
                  <th scope="col" className="p-4">Action</th>
                  <th scope="col" className="p-4">Entity</th>
                  <th scope="col" className="p-4">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937] text-xs">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-mono text-gray-400 whitespace-nowrap">
                      {new Date(log.at).toLocaleString("en-GB")}
                    </td>
                    <td className="p-4 font-mono text-gray-200">{log.actor}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded-md border ${actionBadgeColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-gray-400">{log.entity}</td>
                    <td className="p-4 text-gray-300 max-w-md truncate">{log.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Inbox,
  Package,
  Wrench,
  FileText,
  Activity,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { ToastContainer } from "./Toast";
import AdminClock from "./AdminClock";

interface AdminShellProps {
  children: React.ReactNode;
  userEmail?: string;
}

export default function AdminShell({ children, userEmail = "admin@visionenergyme.com" }: AdminShellProps) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If preview route or login route, render children without shell
  if (pathname === "/admin/login" || pathname.startsWith("/admin/preview/")) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Enquiries", href: "/admin/enquiries", icon: Inbox },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Services", href: "/admin/services", icon: Wrench },
    { label: "Blog", href: "/admin/blog", icon: FileText },
    { label: "Activity", href: "/admin/activity", icon: Activity },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const isNavActive = (item: typeof navItems[0]) => {
    if (!pathname) return false;
    if (item.exact) return pathname === item.href;
    return pathname.startsWith(item.href);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#050608] text-slate-900 dark:text-white flex flex-col lg:flex-row antialiased">
      <ToastContainer />
      {/* MOBILE TOP BAR (below lg) */}
      <header className="lg:hidden sticky top-0 z-40 bg-white dark:bg-[#0D1117] border-b border-slate-200 dark:border-[#1F2937] px-4 py-2.5 flex items-center justify-between gap-2 shadow-sm dark:shadow-none">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 relative rounded-lg overflow-hidden bg-slate-50 dark:bg-[#050608] border border-slate-200 dark:border-[#1F2937] flex items-center justify-center p-1">
            <Image src="/main-logo-vision.png" alt="Vision Energy" width={24} height={24} className="dark-theme-logo object-contain" style={{ width: "auto", height: "auto" }} />
            <Image src="/main-logo-vision-light.png" alt="Vision Energy" width={24} height={24} className="light-theme-logo object-contain" style={{ width: "auto", height: "auto" }} />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-tight text-slate-900 dark:text-white">VISION CMS</span>
        </div>
        <div className="flex items-center gap-2">
          <AdminClock />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#050608] border border-slate-200 dark:border-[#1F2937] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0B65B3] dark:focus:ring-[#A3E635]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE FULL-SCREEN NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-white/95 dark:bg-[#050608]/95 backdrop-blur-md">
          <div className="p-4 border-b border-slate-200 dark:border-[#1F2937] flex items-center justify-between bg-slate-50 dark:bg-[#0D1117]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative rounded-lg overflow-hidden bg-white dark:bg-[#050608] border border-slate-200 dark:border-[#1F2937] flex items-center justify-center p-1">
                <Image src="/main-logo-vision.png" alt="Vision Energy" width={24} height={24} className="dark-theme-logo object-contain" style={{ width: "auto", height: "auto" }} />
                <Image src="/main-logo-vision-light.png" alt="Vision Energy" width={24} height={24} className="light-theme-logo object-contain" style={{ width: "auto", height: "auto" }} />
              </div>
              <span className="font-bold text-sm text-slate-900 dark:text-white">VISION CMS</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-[#050608] border border-slate-200 dark:border-[#1F2937] rounded-xl"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const active = isNavActive(item);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all min-h-[44px] ${
                    active
                      ? "bg-[#0B65B3]/10 text-[#0B65B3] border-l-4 border-[#0B65B3] font-bold dark:bg-[#A3E635]/10 dark:text-[#A3E635] dark:border-[#A3E635]"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-[#0D1117]"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? "text-[#0B65B3] dark:text-[#A3E635]" : "text-slate-500 dark:text-gray-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-200 dark:border-[#1F2937] bg-slate-50 dark:bg-[#0D1117] space-y-3">
            <div className="text-xs text-slate-600 dark:text-gray-400 font-mono truncate px-1">
              Signed in: <span className="text-slate-900 dark:text-white font-semibold">{userEmail}</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-3 py-2.5 bg-white dark:bg-[#050608] border border-slate-200 dark:border-[#1F2937] hover:border-slate-300 dark:hover:border-gray-600 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white flex items-center justify-center gap-2 min-h-[44px] shadow-sm dark:shadow-none"
              >
                <ExternalLink className="w-4 h-4 text-slate-500 dark:text-gray-400" />
                <span>View site</span>
              </a>
              <button
                onClick={handleLogout}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 border border-rose-200 dark:border-red-500/30 text-rose-600 dark:text-red-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 min-h-[44px]"
              >
                <LogOut className="w-4 h-4" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP FIXED LEFT SIDEBAR (lg: 240px wide) */}
      <aside className="hidden lg:flex lg:flex-col lg:w-[240px] lg:fixed lg:inset-y-0 bg-[#F8FAFC] dark:bg-[#0D1117] border-r border-slate-200 dark:border-[#1F2937] z-30">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-200 dark:border-[#1F2937] flex items-center gap-3">
          <div className="w-9 h-9 relative rounded-xl overflow-hidden bg-white dark:bg-[#050608] border border-slate-200 dark:border-[#1F2937] flex items-center justify-center shrink-0 p-1 shadow-sm dark:shadow-none">
            <Image src="/main-logo-vision.png" alt="Vision Energy" width={26} height={26} className="dark-theme-logo object-contain" style={{ width: "auto", height: "auto" }} />
            <Image src="/main-logo-vision-light.png" alt="Vision Energy" width={26} height={26} className="light-theme-logo object-contain" style={{ width: "auto", height: "auto" }} />
          </div>
          <div>
            <h2 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white leading-tight">VISION ENERGY</h2>
            <span className="text-[10px] font-bold text-[#0B65B3] dark:text-[#A3E635] tracking-wider uppercase">CMS Admin</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const active = isNavActive(item);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group min-h-[44px] ${
                  active
                    ? "bg-[#0B65B3]/10 text-[#0B65B3] font-bold dark:bg-[#A3E635]/10 dark:text-[#A3E635]"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 dark:text-gray-400 dark:hover:text-white dark:hover:bg-[#050608]"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#0B65B3] dark:bg-[#A3E635] rounded-r" />
                )}
                <Icon className={`w-4 h-4 transition-colors ${active ? "text-[#0B65B3] dark:text-[#A3E635]" : "text-slate-500 group-hover:text-slate-900 dark:text-gray-400 dark:group-hover:text-white"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Sidebar Info & Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-[#1F2937] space-y-3 bg-[#F8FAFC] dark:bg-[#080B10]">
          <div className="text-[11px] font-mono truncate px-1">
            <span className="block text-[10px] text-slate-500 dark:text-gray-500 uppercase font-sans font-semibold">Account</span>
            <span className="text-slate-800 dark:text-gray-300 font-semibold truncate block" title={userEmail}>
              {userEmail}
            </span>
          </div>

          <div className="pt-1 flex flex-col gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full px-3 py-2 bg-white dark:bg-[#050608] border border-slate-200 dark:border-[#1F2937] hover:border-slate-300 dark:hover:border-gray-600 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-gray-300 dark:hover:text-white flex items-center justify-center gap-2 transition-colors min-h-[44px] shadow-sm dark:shadow-none"
            >
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 dark:text-gray-400" />
              <span>View site</span>
            </a>
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 bg-rose-50 hover:bg-rose-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 border border-rose-200 dark:border-red-500/30 text-rose-600 dark:text-red-400 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors min-h-[44px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT CONTAINER */}
      <main className="flex-1 lg:pl-[240px] min-h-screen flex flex-col">
        {/* DESKTOP TOP HEADER BAR */}
        <header className="hidden lg:flex items-center justify-between px-8 py-3.5 border-b border-slate-200 dark:border-[#1F2937] bg-white/90 dark:bg-[#050608]/90 backdrop-blur-md sticky top-0 z-30 shadow-sm dark:shadow-none">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 dark:bg-[#8DC63F]" />
            <span className="font-semibold text-slate-800 dark:text-gray-200">Vision Energy CMS</span>
            <span className="text-slate-400 dark:text-gray-600">/</span>
            <span className="text-slate-600 dark:text-gray-400 capitalize">
              {!pathname || pathname === "/admin"
                ? "Dashboard"
                : pathname.replace("/admin/", "").split("/")[0]}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <AdminClock />
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}

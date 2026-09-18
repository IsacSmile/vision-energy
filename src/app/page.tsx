import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { dictionary } from '@/lib/dictionary';
import {
  Zap,
  ShieldAlert,
  Sun,
  Wrench,
  CheckCircle2,
  Phone,
  ArrowRight,
  Building2,
  Factory,
  Cpu,
  Layers,
  Award,
  Users,
} from 'lucide-react';
import HomeHeroClient from '@/components/home/HomeHeroClient';

export const revalidate = 60; // ISR revalidation

export default async function HomePage() {
  const latestPosts = await db.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });

  return (
    <div className="space-y-20 pb-20">
      {/* SECTION 1: HERO SECTION */}
      <HomeHeroClient />

      {/* SECTION 2: FIVE SOLUTION BLOCKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block">
            Engineering Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Five Core Engineering Solution Pillars
          </h2>
          <p className="text-sm text-[#A9B4C0] max-w-2xl mx-auto">
            Comprehensive material supply, technical consultation, and project support tailored for the Middle East market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Electrical Solutions */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-8 rounded-2xl space-y-4 hover:border-[#0B65B3] transition-all group hover:bg-[#161B22]">
            <div className="w-12 h-12 bg-[#050608] border border-[#0B65B3]/40 rounded-xl flex items-center justify-center text-[#0B65B3] group-hover:border-[#0B65B3] group-hover:bg-[#0B65B3]/10">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#0B65B3] transition-colors">
              Electrical Solutions
            </h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              Complete low and high voltage electrical components, distribution boards, industrial switches, cables, glands, conduits, and surge protective devices.
            </p>
            <ul className="space-y-1.5 text-xs text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>HV/LV Cables & Jointing Kits</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Industrial Isolators & Panel Components</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Mechanical Solutions */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-8 rounded-2xl space-y-4 hover:border-[#8DC63F] transition-all group hover:bg-[#161B22]">
            <div className="w-12 h-12 bg-[#050608] border border-[#8DC63F]/40 rounded-xl flex items-center justify-center text-[#8DC63F] group-hover:border-[#8DC63F] group-hover:bg-[#8DC63F]/10">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#8DC63F] transition-colors">
              Mechanical Solutions
            </h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              Industrial fluid handling pumps, HVAC components, ventilation systems, pneumatic compressors, valves, and electric water heating systems.
            </p>
            <ul className="space-y-1.5 text-xs text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Industrial Pumps & Valves</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Heavy-Duty Pipe Supports & Clamps</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Renewable Energy Solutions */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-8 rounded-2xl space-y-4 hover:border-[#F2C230] transition-all group hover:bg-[#161B22]">
            <div className="w-12 h-12 bg-[#050608] border border-[#F2C230]/40 rounded-xl flex items-center justify-center text-[#F2C230] group-hover:border-[#F2C230] group-hover:bg-[#F2C230]/10">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#F2C230] transition-colors">
              Renewable Energy Solutions
            </h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              Solar PV components, solar street lighting poles, solar water heaters, high-efficiency inverters, and sustainable energy infrastructure.
            </p>
            <ul className="space-y-1.5 text-xs text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Solar PV Cables & Connectors</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Autonomous Solar Streetlights</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4: Technical Solutions */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-8 rounded-2xl space-y-4 hover:border-[#0B65B3] transition-all group hover:bg-[#161B22]">
            <div className="w-12 h-12 bg-[#050608] border border-[#0B65B3]/40 rounded-xl flex items-center justify-center text-[#0B65B3] group-hover:border-[#0B65B3]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#0B65B3] transition-colors">
              Technical Solutions
            </h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              Industrial automation sensors, explosion-proof electrical equipment, weather monitoring stations, and specialized equipment identification tags.
            </p>
            <ul className="space-y-1.5 text-xs text-gray-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>ATEX/IECEx Explosion Proof Enclosures</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Precision Sensors & Encoders</span>
              </li>
            </ul>
          </div>

          {/* Pillar 5: Project Installation & Support */}
          <div className="bg-[#0D1117] border border-[#1F2937] p-8 rounded-2xl space-y-4 hover:border-[#8DC63F] transition-all group hover:bg-[#161B22] md:col-span-2 lg:col-span-2">
            <div className="w-12 h-12 bg-[#050608] border border-[#8DC63F]/40 rounded-xl flex items-center justify-center text-[#8DC63F]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-[#8DC63F] transition-colors">
              Project Installation & Support Services
            </h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              Turnkey site installation of external lightning protection networks, deep earthing ground grids, exothermic welding, and certified specialist engineering manpower supply across the 7 Emirates.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-300 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Certified External Lightning Installation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Exothermic Welding & Earth Grid Setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Specialist Engineering Manpower Supply</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8DC63F]" />
                <span>Testing, Commissioning & As-Built Docs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED HIGHLIGHT BAND (LIGHTNING PROTECTION & EARTHING) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden bg-linear-to-r from-[#0B65B3]/20 via-[#0D1117] to-[#8DC63F]/20 border-2 border-gradient-brand p-8 sm:p-12 rounded-3xl shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8DC63F]/20 border border-[#8DC63F]/50 text-xs font-bold text-[#8DC63F]">
                <ShieldAlert className="w-4 h-4" />
                <span>Priority Focus Area</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Lightning Protection & Earthing System Solutions
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
                Protecting UAE critical infrastructure, commercial towers, and industrial plants against direct lightning strikes and transient ground faults. Full compliance with IEC 62305 and NF C 17-102 standards.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-300">
                <span className="bg-[#050608] px-3 py-1.5 rounded-lg border border-[#1F2937]">
                  • Franklin Rod Air Terminals
                </span>
                <span className="bg-[#050608] px-3 py-1.5 rounded-lg border border-[#1F2937]">
                  • ESE Lightning Protection
                </span>
                <span className="bg-[#050608] px-3 py-1.5 rounded-lg border border-[#1F2937]">
                  • Exothermic Welding Kits
                </span>
                <span className="bg-[#050608] px-3 py-1.5 rounded-lg border border-[#1F2937]">
                  • Chemical Earth Rods
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/services/external-lightning-protection-installation"
                className="w-full py-3.5 px-6 bg-[#8DC63F] hover:bg-[#8DC63F]/90 text-[#050608] font-bold text-sm rounded-full text-center transition-all flex items-center justify-center gap-2 pill-glow"
              >
                <span>View Lightning Installation Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products/lp-01-conventional-lightning-protection-systems"
                className="w-full py-3.5 px-6 bg-[#0B65B3] hover:bg-[#0B65B3]/90 text-white font-bold text-sm rounded-full text-center transition-all flex items-center justify-center gap-2 blue-glow"
              >
                <span>Browse Protection Catalogue (LP-01)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHY CHOOSE US GRID (6 ITEMS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <span className="text-xs font-bold text-[#0B65B3] uppercase tracking-widest bg-[#0B65B3]/10 border border-[#0B65B3]/30 px-3.5 py-1 rounded-full inline-block">
            Distributor Strengths
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Partner with Vision Energy International
          </h2>
          <p className="text-sm text-[#A9B4C0] max-w-2xl mx-auto">
            Authorized trading distributor committed to quality assurance and technical excellence across UAE.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0D1117] border border-[#1F2937] p-6 rounded-2xl space-y-3">
            <Award className="w-8 h-8 text-[#8DC63F]" />
            <h3 className="text-lg font-bold text-white">Quality Assured Products</h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              [Content placeholder] All trading materials adhere strictly to international IEC, BS EN, and NF C specifications.
            </p>
          </div>

          <div className="bg-[#0D1117] border border-[#1F2937] p-6 rounded-2xl space-y-3">
            <Building2 className="w-8 h-8 text-[#0B65B3]" />
            <h3 className="text-lg font-bold text-white">Triple UAE Presence</h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              Established operations serving projects in Abu Dhabi, Dubai, Ras Al Khaimah, and Northern Emirates.
            </p>
          </div>

          <div className="bg-[#0D1117] border border-[#1F2937] p-6 rounded-2xl space-y-3">
            <Users className="w-8 h-8 text-[#F2C230]" />
            <h3 className="text-lg font-bold text-white">Technical Support & BOQ Assistance</h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              [Content placeholder] Our engineering sales team assists contractors in material sizing and standard compliance.
            </p>
          </div>

          <div className="bg-[#0D1117] border border-[#1F2937] p-6 rounded-2xl space-y-3">
            <Zap className="w-8 h-8 text-[#8DC63F]" />
            <h3 className="text-lg font-bold text-white">Priority Focus & Stock Availability</h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              Deep stock commitment in lightning air rods, down conductors, earth enhancement compounds, and exothermic welds.
            </p>
          </div>

          <div className="bg-[#0D1117] border border-[#1F2937] p-6 rounded-2xl space-y-3">
            <Factory className="w-8 h-8 text-[#0B65B3]" />
            <h3 className="text-lg font-bold text-white">Specialist Manpower Mobilisation</h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              [Content placeholder] Trade-tested technicians and site supervisors ready for short-notice site deployment.
            </p>
          </div>

          <div className="bg-[#0D1117] border border-[#1F2937] p-6 rounded-2xl space-y-3">
            <CheckCircle2 className="w-8 h-8 text-[#8DC63F]" />
            <h3 className="text-lg font-bold text-white">Established UAE Legacy</h3>
            <p className="text-xs text-[#A9B4C0] leading-relaxed">
              Operating continuously since 2018 as a trusted engineering product trading vendor in the UAE.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRIES WE SERVE STRIP */}
      <section className="bg-[#0D1117] border-y border-[#1F2937] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold text-[#A9B4C0] uppercase tracking-widest block">
            Target Industries & Sector Expertise
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl text-center space-y-2">
              <Building2 className="w-6 h-6 mx-auto text-[#0B65B3]" />
              <span className="text-xs font-semibold text-white block">Commercial High-Rises</span>
            </div>
            <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl text-center space-y-2">
              <Factory className="w-6 h-6 mx-auto text-[#8DC63F]" />
              <span className="text-xs font-semibold text-white block">Oil & Gas / Chemical</span>
            </div>
            <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl text-center space-y-2">
              <Zap className="w-6 h-6 mx-auto text-[#F2C230]" />
              <span className="text-xs font-semibold text-white block">Power Substations</span>
            </div>
            <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl text-center space-y-2">
              <Sun className="w-6 h-6 mx-auto text-[#8DC63F]" />
              <span className="text-xs font-semibold text-white block">Solar PV Farms</span>
            </div>
            <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl text-center space-y-2">
              <Wrench className="w-6 h-6 mx-auto text-[#0B65B3]" />
              <span className="text-xs font-semibold text-white block">Water Infrastructure</span>
            </div>
            <div className="p-4 bg-[#050608] border border-[#1F2937] rounded-xl text-center space-y-2">
              <ShieldAlert className="w-6 h-6 mx-auto text-[#8DC63F]" />
              <span className="text-xs font-semibold text-white block">Defense & Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: LATEST BLOG POSTS (3 CARDS FROM DB) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block mb-2">
              Technical Insights
            </span>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Latest Engineering Articles & Guides
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-bold text-[#8DC63F] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestPosts.map((post) => (
            <div
              key={post.id}
              className="bg-[#0D1117] border border-[#1F2937] rounded-2xl p-6 flex flex-col justify-between hover:border-[#0B65B3] transition-colors group"
            >
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-[#8DC63F] uppercase tracking-wider bg-[#8DC63F]/10 px-2.5 py-1 rounded-full inline-block">
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-[#0B65B3] transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-xs text-[#A9B4C0] line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 border-t border-[#1F2937] mt-6 flex items-center justify-between text-xs text-gray-400">
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="font-bold text-[#0B65B3] group-hover:text-[#8DC63F] flex items-center gap-1 transition-colors"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: FINAL CTA BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-brand p-8 sm:p-12 rounded-3xl text-center space-y-6 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Discuss Your Technical Product Requirements?
          </h2>
          <p className="text-sm text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Contact our engineering sales team in Abu Dhabi, Dubai, or Ras Al Khaimah for immediate product availability and BOQ support.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={`tel:${dictionary.company.primaryPhone}`}
              className="px-8 py-3.5 bg-white text-[#050608] font-bold text-sm rounded-full hover:bg-gray-100 transition-all flex items-center gap-2 pill-glow"
            >
              <Phone className="w-4 h-4 text-[#0B65B3]" />
              <span>Call Now: {dictionary.company.primaryPhone}</span>
            </a>
            <Link
              href="/contact"
              className="px-8 py-3.5 bg-[#050608] border border-white/30 text-white font-bold text-sm rounded-full hover:bg-black/60 transition-all flex items-center gap-2"
            >
              <span>Submit General Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

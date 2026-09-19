import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Zap, Shield, Cpu, Sun } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import Reveal from '@/components/ui/Reveal';
import { db } from '@/lib/db';

const FEATURED_CODES = ['LP-01', 'EB-01', 'MF-01', 'SE-01'];

const CODE_ICONS: Record<string, React.ReactNode> = {
  'LP-01': <Zap className="w-6 h-6 text-[#0B65B3] group-hover:text-[#8DC63F] transition-colors stroke-[1.5]" />,
  'EB-01': <Shield className="w-6 h-6 text-[#0B65B3] group-hover:text-[#8DC63F] transition-colors stroke-[1.5]" />,
  'MF-01': <Cpu className="w-6 h-6 text-[#0B65B3] group-hover:text-[#8DC63F] transition-colors stroke-[1.5]" />,
  'SE-01': <Sun className="w-6 h-6 text-[#0B65B3] group-hover:text-[#8DC63F] transition-colors stroke-[1.5]" />,
};

export default async function ProductPreview() {
  const categories = await db.productCategory.findMany({
    where: {
      code: { in: FEATURED_CODES },
    },
    take: 4,
  });

  return (
    <section
      aria-labelledby="product-preview-heading"
      className="py-16 md:py-24 lg:py-32 bg-[#050608] relative border-t border-b border-white/[0.08]"
    >
      <div className="max-w-[80rem] mx-auto px-5 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <SectionHeader
            id="product-preview-heading"
            eyebrow="Product Range"
            title="Certified Engineering Components"
            description="Explore our extensive catalogue of lightning protection, earthing, mechanical, and solar energy products."
          />

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8DC63F] hover:text-white transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F] rounded px-1 py-0.5 shrink-0"
          >
            <span>Browse full catalogue</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid (2x2 on md+) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} staggerIndex={i}>
              <Link
                href={`/products?group=${cat.groupPrefix}`}
                className="group block h-full p-6 lg:p-8 rounded-[24px] bg-[#0D1117] border border-white/[0.08] hover:border-[#8DC63F]/40 transition-colors duration-300 relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8DC63F]"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#0B65B3]/10 border border-[#0B65B3]/20 flex items-center justify-center shrink-0 group-hover:bg-[#8DC63F]/10 group-hover:border-[#8DC63F]/30 transition-colors">
                      {CODE_ICONS[cat.code] || <Zap className="w-6 h-6 text-[#0B65B3] stroke-[1.5]" />}
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#8DC63F] uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#8DC63F]/10 border border-[#8DC63F]/20">
                      {cat.code}
                    </span>
                  </div>

                  <ArrowUpRight className="w-5 h-5 text-[#A9B4C0] group-hover:text-[#8DC63F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="text-xl lg:text-2xl font-semibold text-white group-hover:text-[#8DC63F] transition-colors mb-2">
                  {cat.title}
                </h3>

                <p className="text-sm lg:text-base text-[#A9B4C0] leading-[1.6] line-clamp-2">
                  {cat.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

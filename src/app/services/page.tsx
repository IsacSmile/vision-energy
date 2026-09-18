import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import { Wrench, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Engineering Services | External Lightning Protection & Manpower Supply',
  description:
    'Vision Energy International engineering installation services in UAE: External Lightning Protection System Installation compliant with IEC 62305 & Specialist Manpower Supply.',
};

export const revalidate = 60;

export default async function ServicesPage() {
  const publishedServices = await db.service.findMany({
    where: { published: true },
    orderBy: { createdAt: 'asc' },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-bold text-[#8DC63F] uppercase tracking-widest bg-[#8DC63F]/10 border border-[#8DC63F]/30 px-3.5 py-1 rounded-full inline-block">
          Installation & Field Engineering
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Specialist Engineering Services
        </h1>
        <p className="text-sm text-[#A9B4C0] leading-relaxed">
          Expert execution, standards-compliant structural lightning protection installation, and trade-certified engineering manpower across Abu Dhabi, Dubai, and Ras Al Khaimah.
        </p>
      </div>

      {/* Grid of Published Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {publishedServices.map((service) => {
          const whatsIncluded: string[] = JSON.parse(service.whatsIncluded || '[]');
          return (
            <div
              key={service.id}
              className="bg-[#0D1117] border border-[#1F2937] hover:border-[#8DC63F] rounded-3xl p-8 flex flex-col justify-between space-y-6 transition-all group hover:bg-[#161B22] shadow-xl"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#050608] border border-[#8DC63F]/40 rounded-2xl flex items-center justify-center text-[#8DC63F] group-hover:border-[#8DC63F] pill-glow">
                  <Wrench className="w-6 h-6" />
                </div>

                <h2 className="text-2xl font-bold text-white group-hover:text-[#8DC63F] transition-colors">
                  <Link href={`/services/${service.slug}`}>{service.title}</Link>
                </h2>

                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {service.summary}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#1F2937]">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                    Scope Inclusions:
                  </span>
                  <div className="grid grid-cols-1 gap-2 text-xs text-gray-200">
                    {whatsIncluded.slice(0, 4).map((inc, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#8DC63F] shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#1F2937]">
                <Link
                  href={`/services/${service.slug}`}
                  className="w-full py-3.5 px-6 bg-[#0B65B3] hover:bg-[#0B65B3]/90 text-white font-bold text-sm rounded-full transition-all flex items-center justify-center gap-2 blue-glow"
                >
                  <span>View Full Service Scope & Book</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

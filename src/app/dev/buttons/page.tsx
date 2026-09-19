import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { ArrowRight, Phone, Send, Wrench, Zap } from 'lucide-react';
import LightningButton from '@/components/ui/LightningButton';

export const metadata: Metadata = {
  title: 'LightningButton Component Preview | Dev Tools',
  robots: {
    index: false,
    follow: false,
  },
};

export default function DevButtonsPage() {
  // Return 404 in production
  if (process.env.NODE_ENV === 'production') {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#050608] text-white p-6 md:p-12 space-y-16">
      <div className="max-w-6xl mx-auto space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          LightningButton Interactive Showcase
        </h1>
        <p className="text-[#A9B4C0] text-base max-w-2xl">
          Development preview displaying primary &amp; secondary variants, sizes, icon combinations,
          and interactive states on both <code className="text-[#8DC63F]">#050608</code> and{' '}
          <code className="text-[#8DC63F]">#0D1117</code> surfaces.
        </p>
      </div>

      {/* SECTION 1: ON #050608 BACKGROUND */}
      <section className="max-w-6xl mx-auto p-8 rounded-[24px] bg-[#050608] border border-white/10 space-y-10">
        <h2 className="text-xl font-semibold text-[#8DC63F] border-b border-white/10 pb-3">
          Surface 1: #050608 Canvas
        </h2>

        {/* PRIMARY VARIANTS */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider text-[#A9B4C0] font-semibold">
            Primary Variant (White Pill with Black Text to Dark Transition)
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <LightningButton variant="primary" size="md" iconRight={<ArrowRight className="w-4 h-4" />}>
              Primary Medium (52px)
            </LightningButton>

            <LightningButton variant="primary" size="lg" iconLeft={<Zap className="w-4 h-4" />} iconRight={<ArrowRight className="w-4 h-4" />}>
              Primary Large (56px)
            </LightningButton>

            <LightningButton variant="primary" size="md" disabled>
              Primary Disabled
            </LightningButton>
          </div>
        </div>

        {/* SECONDARY VARIANTS */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase tracking-wider text-[#A9B4C0] font-semibold">
            Secondary Variant (Dark Glass Pill with White Text)
          </h3>
          <div className="flex flex-wrap items-center gap-6">
            <LightningButton variant="secondary" size="md" iconLeft={<Phone className="w-4 h-4 text-[#8DC63F]" />}>
              Secondary Medium (52px)
            </LightningButton>

            <LightningButton variant="secondary" size="lg" iconLeft={<Wrench className="w-4 h-4 text-[#8DC63F]" />} iconRight={<ArrowRight className="w-4 h-4" />}>
              Secondary Large (56px)
            </LightningButton>

            <LightningButton variant="secondary" size="md" disabled>
              Secondary Disabled
            </LightningButton>
          </div>
        </div>

        {/* FULL WIDTH */}
        <div className="space-y-4 max-w-sm">
          <h3 className="text-sm uppercase tracking-wider text-[#A9B4C0] font-semibold">
            Full Width (max 360px on mobile)
          </h3>
          <LightningButton variant="primary" size="lg" fullWidth iconRight={<Send className="w-4 h-4" />}>
            Full Width Primary Button
          </LightningButton>
        </div>
      </section>

      {/* SECTION 2: ON #0D1117 BACKGROUND */}
      <section className="max-w-6xl mx-auto p-8 rounded-[24px] bg-[#0D1117] border border-white/10 space-y-10">
        <h2 className="text-xl font-semibold text-[#8DC63F] border-b border-white/10 pb-3">
          Surface 2: #0D1117 Surface
        </h2>

        <div className="flex flex-wrap items-center gap-6">
          <LightningButton variant="primary" size="lg" href="/products" iconRight={<ArrowRight className="w-4 h-4" />}>
            Explore Products (Link)
          </LightningButton>

          <LightningButton variant="secondary" size="lg" href="tel:+97172042763" iconLeft={<Phone className="w-4 h-4 text-[#8DC63F]" />}>
            Call Now (tel: link)
          </LightningButton>
        </div>
      </section>
    </div>
  );
}

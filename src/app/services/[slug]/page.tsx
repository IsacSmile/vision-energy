import React from 'react';
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import ServiceDetailClient from '@/components/services/ServiceDetailClient';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } });

  if (!service || !service.published) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.title} | Engineering Services UAE`,
    description: service.summary,
  };
}

export const revalidate = 60;

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await db.service.findUnique({ where: { slug } });

  // STRICT RULE: Unpublished services (earthing & surge protection) must return 404
  if (!service || !service.published) {
    notFound();
  }

  // JSON-LD Service Schema for SEO
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.summary,
    provider: {
      '@type': 'Organization',
      name: 'VISION ENERGY INTERNATIONAL',
      url: 'https://www.visionenergyme.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'United Arab Emirates',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ServiceDetailClient service={service} />
      </div>
    </>
  );
}

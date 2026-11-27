import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LocationServicePageView from '@/components/locations/LocationServicePageView';
import { getWave1Page, WAVE1_QATAR_ROUTES } from '@/lib/data/locations';
import { SITE_URL } from '@/lib/seo/company';

interface QatarPageProps {
  params: Promise<{ service: string }> | { service: string };
}

async function resolveQatarParams(params: QatarPageProps['params']) {
  const resolved = await Promise.resolve(params);
  return {
    service: resolved?.service || '',
  };
}

export async function generateStaticParams() {
  return WAVE1_QATAR_ROUTES;
}

export const dynamicParams = false;
export const dynamic = 'force-static';
export const revalidate = 3600;

export async function generateMetadata({ params }: QatarPageProps): Promise<Metadata> {
  const { service } = await resolveQatarParams(params);
  const page = getWave1Page('qatar', service);
  if (!page || page.isUae) {
    return { title: 'Service Not Found | Vision Energy' };
  }

  const canonicalUrl = `${SITE_URL}${page.canonicalPath}`;
  const ogImageUrl = `${SITE_URL}${page.heroImage}`;

  return {
    title: page.seoTitle,
    description: page.seoDescription,
    keywords: page.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.seoTitle,
      description: page.seoDescription,
      url: canonicalUrl,
      siteName: 'Vision Energy International',
      locale: 'en_AE',
      type: 'article',
      images: [{ url: ogImageUrl, width: 1920, height: 1080, alt: page.heroImageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.seoTitle,
      description: page.seoDescription,
      images: [ogImageUrl],
    },
  };
}

export default async function QatarServicePage({ params }: QatarPageProps) {
  const { service } = await resolveQatarParams(params);
  const page = getWave1Page('qatar', service);
  if (!page || page.isUae) {
    notFound();
  }

  return <LocationServicePageView page={page} />;
}


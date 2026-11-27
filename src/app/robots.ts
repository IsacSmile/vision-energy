import { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { SITE_URL } from '@/lib/seo/company';

export const dynamic = 'force-dynamic';

const SEARCH_AND_AI_CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'GPTBot',
  'PerplexityBot',
  'ClaudeBot',
  'Anthropic-ai',
  'Google-Extended',
  'Applebot-Extended',
];

export default async function robots(): Promise<MetadataRoute.Robots> {
  const hdrs = await headers();
  const host = (hdrs.get('x-forwarded-host') || hdrs.get('host') || '').toLowerCase();
  const isPreviewEnv = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production');
  const isStagingHost = host.endsWith('.vercel.app') || host.includes('nihatechsolutions.online');
  if (isPreviewEnv || isStagingHost) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  const baseUrl = SITE_URL;
  const disallow = ['/admin', '/admin/*', '/api/*', '/thank-you', '/dev/*'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      ...SEARCH_AND_AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: [
          '/',
          '/expertise',
          '/expertise/*',
          '/products',
          '/products/*',
          '/services',
          '/services/*',
          '/about',
          '/glossary',
          '/blog',
          '/blog/*',
          '/contact',
          '/llms.txt',
          '/expertise.md',
        ],
        disallow,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

import { MetadataRoute } from 'next';

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

export default function robots(): MetadataRoute.Robots {
  const isPreview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production');
  if (isPreview) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.visionenergyme.com').replace(/\/$/, '');
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

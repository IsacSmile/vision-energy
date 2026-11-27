import { MetadataRoute } from 'next';

const AI_CRAWLER_AGENTS = [
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
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.visionenergyme.com').replace(/\/$/, '');
  const disallow = ['/admin', '/admin/*', '/api/*'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow,
      },
      ...AI_CRAWLER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: ['/', '/expertise', '/expertise.md', '/llms.txt', '/products', '/services', '/blog', '/contact'],
        disallow,
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

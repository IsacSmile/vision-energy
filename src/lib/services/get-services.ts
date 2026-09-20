import { db } from '@/lib/db';

export interface ServiceRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  published: boolean;
  sortOrder?: number;
}

export const FALLBACK_PUBLISHED_SERVICES: ServiceRecord[] = [
  {
    id: 'srv-ext-lp',
    slug: 'external-lightning-protection-installation',
    title: 'External Lightning Protection Installation',
    summary:
      'Installation of external lightning protection systems using conventional mesh systems and ESE terminals for commercial, industrial and infrastructure projects across the UAE.',
    published: true,
    sortOrder: 1,
  },
  {
    id: 'srv-manpower',
    slug: 'manpower-supply',
    title: 'Manpower Services',
    summary:
      'Specialist manpower services for electrical, earthing and lightning protection project execution and site installation support.',
    published: true,
    sortOrder: 2,
  },
];

export async function getPublishedServices(): Promise<ServiceRecord[]> {
  try {
    const services = await db.service.findMany({
      where: { published: true },
      orderBy: { createdAt: 'asc' },
    });
    if (services.length > 0) {
      return services.map((s, i) => ({
        id: s.id,
        slug: s.slug,
        title: s.title,
        summary: s.summary,
        published: s.published,
        sortOrder: i + 1,
      }));
    }
  } catch (error) {
    console.warn('Failed to fetch services from DB, using fallback published services:', error);
  }

  return FALLBACK_PUBLISHED_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<ServiceRecord | null> {
  try {
    const service = await db.service.findUnique({
      where: { slug },
    });
    if (service) {
      if (!service.published) return null;
      return {
        id: service.id,
        slug: service.slug,
        title: service.title,
        summary: service.summary,
        published: service.published,
      };
    }
  } catch (error) {
    console.warn(`Failed to fetch service ${slug} from DB:`, error);
  }

  // Fallback check
  const fallback = FALLBACK_PUBLISHED_SERVICES.find((s) => s.slug === slug);
  if (fallback && fallback.published) {
    return fallback;
  }

  return null;
}

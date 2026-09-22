import { getPublishedServices as getDbPublishedServices, getPublishedServiceBySlug as getDbPublishedServiceBySlug } from "@/lib/data/services";

export interface ServiceRecord {
  id: string;
  slug: string;
  title: string;
  summary: string;
  published: boolean;
  sortOrder?: number;
  content?: any;
}

export async function getPublishedServices(): Promise<ServiceRecord[]> {
  try {
    const services = await getDbPublishedServices();
    return services.map((s, i) => ({
      id: s.id,
      slug: s.slug,
      title: s.title,
      summary: s.summary,
      published: s.status === "PUBLISHED",
      sortOrder: s.sortOrder || i + 1,
      content: s.content,
    }));
  } catch (error) {
    console.error("Failed to fetch published services:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceRecord | null> {
  try {
    const service = await getDbPublishedServiceBySlug(slug);
    if (!service) return null;
    return {
      id: service.id,
      slug: service.slug,
      title: service.title,
      summary: service.summary,
      published: service.status === "PUBLISHED",
      sortOrder: service.sortOrder,
      content: service.content,
    };
  } catch (error) {
    console.error(`Failed to fetch service ${slug}:`, error);
    return null;
  }
}

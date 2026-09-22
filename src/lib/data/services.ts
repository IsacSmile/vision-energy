import "server-only";
import { db, withDbRetry } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getPublishedServices = unstable_cache(
  async () => {
    try {
      const services = await withDbRetry(() =>
        db.service.findMany({
          where: {
            status: "PUBLISHED",
            deletedAt: null,
          },
          orderBy: { sortOrder: "asc" },
        })
      );

      return services.map((service) => {
        const content = service.content as any;
        if (content && Array.isArray(content.process)) {
          content.process = content.process.filter((p: any) => p.confirmed === true);
        }
        return {
          ...service,
          content,
        };
      });
    } catch (err) {
      console.error("Failed to fetch published services:", err);
      return [];
    }
  },
  ["published-services"],
  { tags: ["services"], revalidate: 300 }
);

export const getPublishedServiceBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const service = await withDbRetry(() =>
        db.service.findFirst({
          where: {
            slug,
            status: "PUBLISHED",
            deletedAt: null,
          },
        })
      );

      if (!service) return null;

      const content = service.content as any;
      if (content && Array.isArray(content.process)) {
        content.process = content.process.filter((p: any) => p.confirmed === true);
      }

      return {
        ...service,
        content,
      };
    } catch (err) {
      console.error(`Failed to fetch published service by slug ${slug}:`, err);
      return null;
    }
  },
  ["published-service-by-slug"],
  { tags: ["services"], revalidate: 300 }
);

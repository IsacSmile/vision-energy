import "server-only";
import { db, withDbRetry } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { SERVICES_CONTENT } from "@/lib/services/content";

const FALLBACK_SERVICES_LIST = [
  {
    id: "ext-lp-inst",
    slug: "external-lightning-protection-installation",
    title: "External Lightning Protection Installation",
    summary: SERVICES_CONTENT["external-lightning-protection-installation"]?.hero?.lead || "Installation of external lightning protection systems for commercial buildings, industrial plants, warehouses, and critical installations.",
    icon: "zap",
    metaChips: SERVICES_CONTENT["external-lightning-protection-installation"]?.metaChips || ["Conventional mesh systems", "ESE systems"],
    content: SERVICES_CONTENT["external-lightning-protection-installation"],
    status: "PUBLISHED",
    sortOrder: 1,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "manpower-sup",
    slug: "manpower-supply",
    title: "Manpower Supply Services",
    summary: SERVICES_CONTENT["manpower-supply"]?.hero?.lead || "Manpower services for engineering and installation projects across the UAE.",
    icon: "users",
    metaChips: SERVICES_CONTENT["manpower-supply"]?.metaChips || ["Specialist Manpower", "Technical Support"],
    content: SERVICES_CONTENT["manpower-supply"],
    status: "PUBLISHED",
    sortOrder: 2,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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

      if (services && services.length > 0) {
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
      }
    } catch (err) {
      console.error("Failed to fetch published services from DB, using fallbacks:", err);
    }

    return FALLBACK_SERVICES_LIST;
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

      if (service) {
        const content = service.content as any;
        if (content && Array.isArray(content.process)) {
          content.process = content.process.filter((p: any) => p.confirmed === true);
        }

        return {
          ...service,
          content,
        };
      }
    } catch (err) {
      console.error(`Failed to fetch published service by slug ${slug} from DB, checking fallbacks:`, err);
    }

    const fallback = FALLBACK_SERVICES_LIST.find((s) => s.slug === slug);
    return fallback || null;
  },
  ["published-service-by-slug"],
  { tags: ["services"], revalidate: 300 }
);


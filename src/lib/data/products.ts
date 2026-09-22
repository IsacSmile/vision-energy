import "server-only";
import { db, withDbRetry } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { FALLBACK_CATEGORIES } from "@/lib/fallback-categories";

const FORMATTED_FALLBACK_CATEGORIES = FALLBACK_CATEGORIES.map((c) => ({
  id: `fallback-${c.code.toLowerCase()}`,
  code: c.code,
  slug: c.slug,
  group: c.groupPrefix,
  groupLabel:
    c.groupPrefix === "LP"
      ? "Lightning Protection"
      : c.groupPrefix === "ER"
      ? "Earthing & Grounding"
      : c.groupPrefix === "LT"
      ? "Specialized Lighting"
      : c.groupPrefix === "CM"
      ? "Cable Management"
      : c.groupPrefix === "CB"
      ? "Cables & Connectivity"
      : c.groupPrefix === "CT"
      ? "Conduits & Trunking"
      : c.groupPrefix === "EL"
      ? "Electrical Components"
      : c.groupPrefix === "EN"
      ? "Solar & Energy"
      : c.groupPrefix === "ME"
      ? "Mechanical & HVAC"
      : c.groupPrefix === "SG"
      ? "Safety & Security"
      : c.groupPrefix === "HW"
      ? "Hardware & Fasteners"
      : c.groupPrefix === "SF"
      ? "Safety Marking"
      : c.groupPrefix === "PK"
      ? "Packaging Supplies"
      : "Equipment Identification",
  sortOrder: c.sortOrder,
  priority: c.groupPrefix === "LP" || c.groupPrefix === "ER",
  title: c.title,
  description: c.description,
  productFamilies: c.families.split(";").map((f) => f.trim()),
  image: null,
  imageAlt: null,
  status: "PUBLISHED",
  reviewNote: null,
  seoTitle: null,
  seoDescription: null,
  deletedAt: null,
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export const getPublishedProductCategories = unstable_cache(
  async () => {
    try {
      const categories = await withDbRetry(() =>
        db.productCategory.findMany({
          where: {
            status: "PUBLISHED",
            deletedAt: null,
          },
          orderBy: [{ priority: "desc" }, { sortOrder: "asc" }],
        })
      );
      if (categories && categories.length > 0) {
        return categories;
      }
    } catch (err) {
      console.error("Failed to fetch published product categories from DB, using fallbacks:", err);
    }
    return FORMATTED_FALLBACK_CATEGORIES as any[];
  },
  ["published-product-categories"],
  { tags: ["products"], revalidate: 300 }
);

export const getPublishedCategoryBySlug = unstable_cache(
  async (slug: string) => {
    try {
      const category = await withDbRetry(() =>
        db.productCategory.findFirst({
          where: {
            slug,
            status: "PUBLISHED",
            deletedAt: null,
          },
        })
      );
      if (category) return category;
    } catch (err) {
      console.error(`Failed to fetch published category by slug ${slug} from DB, checking fallbacks:`, err);
    }

    const fallback = FORMATTED_FALLBACK_CATEGORIES.find((c) => c.slug === slug);
    return (fallback as any) || null;
  },
  ["published-product-category-by-slug"],
  { tags: ["products"], revalidate: 300 }
);

export const getPublishedCategoryByCode = unstable_cache(
  async (code: string) => {
    try {
      const category = await withDbRetry(() =>
        db.productCategory.findFirst({
          where: {
            code,
            status: "PUBLISHED",
            deletedAt: null,
          },
        })
      );
      if (category) return category;
    } catch (err) {
      console.error(`Failed to fetch published category by code ${code} from DB, checking fallbacks:`, err);
    }

    const fallback = FORMATTED_FALLBACK_CATEGORIES.find((c) => c.code === code);
    return (fallback as any) || null;
  },
  ["published-product-category-by-code"],
  { tags: ["products"], revalidate: 300 }
);


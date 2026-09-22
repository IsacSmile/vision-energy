import "server-only";
import { db, withDbRetry } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getPublishedProductCategories = unstable_cache(
  async () => {
    try {
      return await withDbRetry(() =>
        db.productCategory.findMany({
          where: {
            status: "PUBLISHED",
            deletedAt: null,
          },
          orderBy: [{ priority: "desc" }, { sortOrder: "asc" }],
        })
      );
    } catch (err) {
      console.error("Failed to fetch published product categories:", err);
      return [];
    }
  },
  ["published-product-categories"],
  { tags: ["products"], revalidate: 300 }
);

export const getPublishedCategoryBySlug = unstable_cache(
  async (slug: string) => {
    try {
      return await withDbRetry(() =>
        db.productCategory.findFirst({
          where: {
            slug,
            status: "PUBLISHED",
            deletedAt: null,
          },
        })
      );
    } catch (err) {
      console.error(`Failed to fetch published category by slug ${slug}:`, err);
      return null;
    }
  },
  ["published-product-category-by-slug"],
  { tags: ["products"], revalidate: 300 }
);

export const getPublishedCategoryByCode = unstable_cache(
  async (code: string) => {
    try {
      return await withDbRetry(() =>
        db.productCategory.findFirst({
          where: {
            code,
            status: "PUBLISHED",
            deletedAt: null,
          },
        })
      );
    } catch (err) {
      console.error(`Failed to fetch published category by code ${code}:`, err);
      return null;
    }
  },
  ["published-product-category-by-code"],
  { tags: ["products"], revalidate: 300 }
);

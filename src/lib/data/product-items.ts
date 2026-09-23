import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

export type ProductItem = {
  id: string;
  code: string;
  title: string;
  description: string;
  includes: string[];
  category: string;
  subcategoryGroup: string;
  sortOrder: number;
  status: "PUBLISHED" | "ARCHIVED";
  imageUrl: string | null;
  imageAlt: string | null;
  isPlaceholder: boolean;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Public cached query: Fetch all published products.
 */
export const getPublishedProducts = unstable_cache(
  async (): Promise<ProductItem[]> => {
    const products = await (db as any).product.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
    });
    return products as ProductItem[];
  },
  ["published-products-list"],
  {
    revalidate: 3600,
    tags: ["products"],
  }
);

/**
 * Public cached query: Fetch a published product by its code (e.g., LP-01).
 */
export const getPublishedProductByCode = (code: string) =>
  unstable_cache(
    async (): Promise<ProductItem | null> => {
      const product = await (db as any).product.findUnique({
        where: {
          code: code.toUpperCase(),
        },
      });

      if (!product || product.status !== "PUBLISHED") {
        return null;
      }

      return product as ProductItem;
    },
    [`product-by-code-${code.toUpperCase()}`],
    {
      revalidate: 3600,
      tags: ["products", `product-${code.toUpperCase()}`],
    }
  )();

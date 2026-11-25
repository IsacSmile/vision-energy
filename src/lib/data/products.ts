import "server-only";
import { db, withDbRetry } from "@/lib/db";
import { unstable_cache } from "next/cache";
import { FALLBACK_CATEGORIES } from "@/lib/fallback-categories";
import { getGroupLabel } from "@/lib/group-icons";

const CATALOGUE_IMAGE_OVERRIDES: Record<string, string> = {
  "LP-03": "/product-catalouge/LP-03.webp",
  "LT-02": "/product-catalouge/LT-02.webp",
  "EL-05": "/product-catalouge/EL-05.webp",
  "EL-08": "/product-catalouge/EL-08.webp",
  "HW-03": "/product-catalouge/HW-03.webp",
  "SP-01": "/images/sports-equipment-solutions-hero.webp",
  "SP-02": "/images/gym-equipment-maintenance-hero.webp",
  "LPE-01": "/product-catalouge/LPE-01.png",
  "LPE-03": "/product-catalouge/LPE-03.png",
  "LPE-06": "/product-catalouge/LPE-06.png",
  "LG-01": "/product-catalouge/LG-01.png",
  "LH-01": "/product-catalouge/LH-01.png",
  "LM-02": "/product-catalouge/LM-02.png",
  "LM-04": "/product-catalouge/LM-04.png",
  "LF-01": "/product-catalouge/LF-01.png",
  "LF-03": "/product-catalouge/LF-03.png",
  "TS-04": "/product-catalouge/TS-04.png",
  "LS-04": "/product-catalouge/LS-04.png",
  "WS-03": "/product-catalouge/WS-03.png",
  "AT-01": "/product-catalouge/AT-01.png",
  "AT-02": "/product-catalouge/AT-02.png",
  "AT-03": "/product-catalouge/AT-03.png",
  "AT-04": "/product-catalouge/AT-04.png",
  "AT-05": "/product-catalouge/AT-05.png",
  "AT-06": "/product-catalouge/AT-06.png",
  "AT-07": "/product-catalouge/AT-07.png",
};

function resolveFallbackCatalogueImage(code?: string): string | null {
  if (!code) return null;
  return CATALOGUE_IMAGE_OVERRIDES[code] || `/product-catalouge/${code}.jpeg`;
}

function formatCategoryRecord(cat: any) {
  if (!cat) return null;
  const familiesArr = Array.isArray(cat.productFamilies)
    ? cat.productFamilies
    : typeof cat.productFamilies === "string"
    ? cat.productFamilies.split(";").map((f: string) => f.trim()).filter(Boolean)
    : typeof cat.families === "string"
    ? cat.families.split(";").map((f: string) => f.trim()).filter(Boolean)
    : Array.isArray(cat.families)
    ? cat.families
    : [];

  const familiesStr = typeof cat.families === "string"
    ? cat.families
    : familiesArr.join("; ");

  const image =
    cat.image ||
    cat.imageUrl ||
    resolveFallbackCatalogueImage(cat.code);

  const groupPrefix = cat.groupPrefix || cat.group || "";
  const groupLabel = getGroupLabel(groupPrefix, cat.groupLabel);

  return {
    ...cat,
    group: groupPrefix,
    groupPrefix,
    groupLabel,
    image,
    imageUrl: image,
    imageAlt: cat.imageAlt || `${cat.title} (${cat.code})`,
    productFamilies: familiesArr,
    families: familiesStr,
  };
}

const FORMATTED_FALLBACK_CATEGORIES = FALLBACK_CATEGORIES.map((c) => {
  const fallbackImage = resolveFallbackCatalogueImage(c.code);
  return formatCategoryRecord({
    id: `fallback-${c.code.toLowerCase()}`,
    code: c.code,
    slug: c.slug,
    group: c.groupPrefix,
    groupPrefix: c.groupPrefix,
    groupLabel: getGroupLabel(c.groupPrefix),
    sortOrder: c.sortOrder,
    priority: c.groupPrefix === "LP" || c.groupPrefix === "ER",
    title: c.title,
    description: c.description,
    families: c.families,
    productFamilies: c.families.split(";").map((f) => f.trim()),
    image: fallbackImage,
    imageUrl: fallbackImage,
    imageAlt: `${c.title} (${c.code})`,
    isPlaceholder: false,
    status: "PUBLISHED",
    reviewNote: null,
    seoTitle: null,
    seoDescription: null,
    deletedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
});

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
        return categories.map(formatCategoryRecord);
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
      if (category) return formatCategoryRecord(category);
    } catch (err) {
      console.error(`Failed to fetch published category by slug ${slug} from DB, checking fallbacks:`, err);
    }

    const fallback = FORMATTED_FALLBACK_CATEGORIES.find((c) => c?.slug === slug);
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
      if (category) return formatCategoryRecord(category);
    } catch (err) {
      console.error(`Failed to fetch published category by code ${code} from DB, checking fallbacks:`, err);
    }

    const fallback = FORMATTED_FALLBACK_CATEGORIES.find((c) => c?.code === code);
    return (fallback as any) || null;
  },
  ["published-product-category-by-code"],
  { tags: ["products"], revalidate: 300 }
);


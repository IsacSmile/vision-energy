import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getPublishedProductCategories } from "@/lib/data/products";
import CatalogueIndex, { GroupData, CategoryData } from "./CatalogueIndex";
import SectionHeader from "@/components/ui/SectionHeader";

const GROUP_LABELS: Record<string, string> = {
  LP: "Lightning Protection",
  EB: "Earthing & Bonding",
  ER: "Earthing & Bonding",
  LT: "Lighting & Signalling",
  CM: "Cable Management",
  CB: "Cables & Connectivity",
  CT: "Conduit Systems",
  EL: "Electrical Equipment",
  EN: "Energy & Power",
  ME: "Mechanical & HVAC",
  SG: "Security, Alarm & Fire",
  HW: "Hardware & Tools",
  SF: "Safety Marking & PPE",
  PK: "Packaging",
  ID: "Identification & Engraving",
};

export default async function ProductPreview() {
  const categories = await getPublishedProductCategories();

  if (!categories || categories.length === 0) {
    return (
      <section aria-labelledby="product-preview-heading" className="py-16 md:py-24 lg:py-32 bg-[#050608] relative">
        <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <CatalogueIndex groups={[]} totalCategoryCount={0} />
        </div>
      </section>
    );
  }
  const groupsMap = new Map<string, CategoryData[]>();
  categories.forEach((cat) => {
    const groupKey = (cat.group || "").toUpperCase();
    if (!groupsMap.has(groupKey)) {
      groupsMap.set(groupKey, []);
    }
    groupsMap.get(groupKey)!.push({
      id: cat.id,
      code: cat.code,
      slug: cat.slug,
      groupPrefix: cat.group,
      title: cat.title,
      description: cat.description,
      families: Array.isArray(cat.productFamilies) ? cat.productFamilies.join("; ") : cat.productFamilies,
      sortOrder: cat.sortOrder,
    });
  });

  const groupKeys = Array.from(groupsMap.keys());
  groupKeys.sort((a, b) => {
    if (a === "LP") return -1;
    if (b === "LP") return 1;
    if (a === "ER" || a === "EB") return -1;
    if (b === "ER" || b === "EB") return 1;
    const minA = Math.min(...(groupsMap.get(a)?.map((c) => c.sortOrder) || [999]));
    const minB = Math.min(...(groupsMap.get(b)?.map((c) => c.sortOrder) || [999]));
    return minA - minB;
  });

  const groupsData: GroupData[] = groupKeys.map((key) => {
    const groupCategories = groupsMap.get(key) || [];
    groupCategories.sort((a, b) => a.sortOrder - b.sortOrder);
    return {
      prefix: key,
      label: GROUP_LABELS[key] || key,
      categories: groupCategories,
    };
  });

  return (
    <section aria-labelledby="product-preview-heading" className="py-16 md:py-24 lg:py-32 bg-[#050608] relative">
      <div className="max-w-[80rem] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        <SectionHeader
          id="product-preview-heading"
          eyebrow="Product Catalogue"
          title="Explore Our Product Engineering Ranges"
          description={`Browse ${categories.length} product categories across lightning protection, earthing, electrical, mechanical and solar.`}
        />

        <CatalogueIndex groups={groupsData} totalCategoryCount={categories.length} />

        {/* Catalog Footer Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white">Full Product Catalogue</p>
            <p className="text-xs text-[#A9B4C0]">
              Browse all {categories.length} product categories, specifications and family ranges.
            </p>
          </div>

          <Link
            href="/products"
            className="px-6 py-3 bg-[#8DC63F] text-[#050608] font-bold text-xs rounded-full hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shrink-0"
          >
            <span>View Complete Catalogue ({categories.length} Categories)</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

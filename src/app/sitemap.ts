import { MetadataRoute } from "next";
import { getPublishedProductCategories } from "@/lib/data/products";
import { getPublishedServices } from "@/lib/data/services";
import { getPublishedBlogPosts } from "@/lib/data/posts";
import { EXPERTISE_TAB_IDS } from "@/lib/data/expertise";
import { ALL_WAVE1_PAGES } from "@/lib/data/locations";
import { SITE_URL } from "@/lib/seo/company";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const lastUpdated = new Date("2026-11-27T00:00:00Z");

  // Static public & trust routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: lastUpdated, changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: lastUpdated, changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/expertise`, lastModified: lastUpdated, changeFrequency: "weekly", priority: 0.9 },
    ...EXPERTISE_TAB_IDS.map((tab) => ({
      url: `${baseUrl}/expertise/${tab}`,
      lastModified: lastUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
    { url: `${baseUrl}/services`, lastModified: lastUpdated, changeFrequency: "weekly", priority: 0.9 },
    ...ALL_WAVE1_PAGES.map((loc) => ({
      url: `${baseUrl}${loc.canonicalPath}`,
      lastModified: lastUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    { url: `${baseUrl}/about`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/glossary`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: lastUpdated, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: lastUpdated, changeFrequency: "monthly", priority: 0.8 },
  ];

  let categoryRoutes: MetadataRoute.Sitemap = [];
  const serviceRoutes: MetadataRoute.Sitemap = [];
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const categories = await getPublishedProductCategories();
    categoryRoutes = categories.map((c) => ({
      url: `${baseUrl}/products/${c.slug}`,
      lastModified: c.updatedAt || lastUpdated,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Sitemap categories error:", e);
  }

  try {
    const services = await getPublishedServices();
    const seen = new Set<string>();
    for (const s of services) {
      // Avoid emitting aliased /services/earthing-grounding which 301-redirects to /services/earthing-and-grounding
      const canonicalSlug = s.slug === "earthing-grounding" ? "earthing-and-grounding" : s.slug;
      if (seen.has(canonicalSlug)) continue;
      seen.add(canonicalSlug);
      serviceRoutes.push({
        url: `${baseUrl}/services/${canonicalSlug}`,
        lastModified: s.updatedAt || lastUpdated,
        changeFrequency: "weekly",
        priority: 0.8,
      });
    }
  } catch (e) {
    console.error("Sitemap services error:", e);
  }

  try {
    const posts = await getPublishedBlogPosts();
    blogRoutes = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.updatedAt || lastUpdated,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap posts error:", e);
  }

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes, ...blogRoutes];
}

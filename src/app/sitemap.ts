import { MetadataRoute } from "next";
import { getPublishedProductCategories } from "@/lib/data/products";
import { getPublishedServices } from "@/lib/data/services";
import { getPublishedBlogPosts } from "@/lib/data/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vision-energy.nihatechsolutions.online";

  // Static public routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/services`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  let categoryRoutes: MetadataRoute.Sitemap = [];
  let serviceRoutes: MetadataRoute.Sitemap = [];
  let blogRoutes: MetadataRoute.Sitemap = [];

  try {
    const categories = await getPublishedProductCategories();
    categoryRoutes = categories.map((c) => ({
      url: `${baseUrl}/products/${c.slug}`,
      lastModified: c.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Sitemap categories error:", e);
  }

  try {
    const services = await getPublishedServices();
    serviceRoutes = services.map((s) => ({
      url: `${baseUrl}/services/${s.slug}`,
      lastModified: s.updatedAt,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  } catch (e) {
    console.error("Sitemap services error:", e);
  }

  try {
    const posts = await getPublishedBlogPosts();
    blogRoutes = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Sitemap posts error:", e);
  }

  return [...staticRoutes, ...categoryRoutes, ...serviceRoutes, ...blogRoutes];
}

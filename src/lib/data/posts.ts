import "server-only";
import { db, withDbRetry } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getPublishedBlogPosts = unstable_cache(
  async () => {
    const now = new Date();
    const isProd = process.env.NODE_ENV === "production";

    try {
      return await withDbRetry(() =>
        db.blogPost.findMany({
          where: {
            status: "PUBLISHED",
            deletedAt: null,
            publishedAt: { lte: now },
            ...(isProd ? { isPlaceholder: false } : {}),
          },
          orderBy: { publishedAt: "desc" },
        })
      );
    } catch (err) {
      console.error("Failed to fetch published blog posts:", err);
      return [];
    }
  },
  ["published-blog-posts"],
  { tags: ["posts"], revalidate: 300 }
);

export const getPublishedBlogPostBySlug = unstable_cache(
  async (slug: string) => {
    const now = new Date();
    const isProd = process.env.NODE_ENV === "production";

    try {
      return await withDbRetry(() =>
        db.blogPost.findFirst({
          where: {
            slug,
            status: "PUBLISHED",
            deletedAt: null,
            publishedAt: { lte: now },
            ...(isProd ? { isPlaceholder: false } : {}),
          },
        })
      );
    } catch (err) {
      console.error(`Failed to fetch published blog post by slug ${slug}:`, err);
      return null;
    }
  },
  ["published-blog-post-by-slug"],
  { tags: ["posts"], revalidate: 300 }
);

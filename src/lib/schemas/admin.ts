import { z } from 'zod';

export const RESERVED_SLUGS = [
  'new',
  'admin',
  'api',
  'edit',
  'feed',
  'tag',
  'category',
  'services',
  'products',
  'blog',
  'about',
  'contact',
  'sitemap',
  'robots',
];

export const slugSchema = z
  .string()
  .min(3, 'Slug must be at least 3 characters')
  .max(80, 'Slug must be at most 80 characters')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase alphanumeric with hyphens only')
  .refine((val) => !RESERVED_SLUGS.includes(val.toLowerCase()), {
    message: 'This slug is reserved and cannot be used',
  });

export const productCategorySchema = z
  .object({
    code: z
      .string()
      .min(2, 'Code is required')
      .regex(/^[A-Z]{2}-\d{2,3}$/, 'Code must follow pattern like LP-01 or ER-02'),
    slug: slugSchema,
    group: z.string().min(1, 'Group prefix is required'),
    groupLabel: z.string().min(1, 'Group label is required'),
    sortOrder: z.number().int().default(0),
    priority: z.boolean().default(false),
    title: z.string().min(2, 'Title must be at least 2 characters'),
    description: z
      .string()
      .min(20, 'Description must be at least 20 characters')
      .max(600, 'Description must be at most 600 characters'),
    productFamilies: z.array(z.string()).max(20, 'Maximum 20 families allowed').default([]),
    image: z.string().nullable().optional(),
    imageAlt: z.string().nullable().optional(),
    status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
    reviewNote: z.string().nullable().optional(),
    seoTitle: z.string().max(60, 'SEO Title max 60 characters').nullable().optional(),
    seoDescription: z.string().max(155, 'SEO Description max 155 characters').nullable().optional(),
  })
  .refine(
    (data) => {
      if (data.image && data.image.trim().length > 0) {
        return Boolean(data.imageAlt && data.imageAlt.trim().length > 0);
      }
      return true;
    },
    {
      message: 'Alt text is required when an image URL is provided',
      path: ['imageAlt'],
    }
  );

export const blogPostSchema = z
  .object({
    title: z.string().min(3, 'Title must be at least 3 characters'),
    slug: slugSchema,
    subheading: z.string().min(3, 'Subheading must be at least 3 characters'),
    content: z.string().min(10, 'Body content must be at least 10 characters'),
    coverImage: z.string().nullable().optional(),
    coverAlt: z.string().nullable().optional(),
    bodyImage: z.string().nullable().optional(),
    bodyAlt: z.string().nullable().optional(),
    category: z.string().min(1, 'Category is required'),
    status: z.enum(['DRAFT', 'PUBLISHED']).default('PUBLISHED'),
    publishedAt: z.string().datetime({ offset: true }).or(z.date()).optional(),
  })
  .refine(
    (data) => {
      if (data.coverImage && data.coverImage.trim().length > 0) {
        return Boolean(data.coverAlt && data.coverAlt.trim().length > 0);
      }
      return true;
    },
    {
      message: 'Alt text is required when a cover image is provided',
      path: ['coverAlt'],
    }
  );

export const serviceFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: slugSchema,
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  icon: z.string().min(1, 'Icon key is required').default('Wrench'),
  metaChips: z.array(z.string()).default([]),
  sortOrder: z.number().int().default(0),
  status: z.enum(['DRAFT', 'PUBLISHED']).default('DRAFT'),
  publishedAt: z.string().datetime({ offset: true }).or(z.date()).optional(),
  seoTitle: z.string().max(60, 'SEO Title max 60 characters').nullable().optional(),
  seoDescription: z.string().max(155, 'SEO Description max 155 characters').nullable().optional(),
});

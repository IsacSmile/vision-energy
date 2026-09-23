import { z } from "zod";

export const PRODUCT_CATEGORIES = ["Electrical", "Mechanical", "Solar"] as const;
export type ProductCategoryType = (typeof PRODUCT_CATEGORIES)[number];

export const productSchema = z
  .object({
    code: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-Z]{2,3}-\d{2}$/, "Code must be in format LP-01 or GEN-01 (2-3 uppercase letters, hyphen, 2 digits)"),
    title: z
      .string()
      .trim()
      .min(1, "Title is required")
      .max(120, "Title must be at most 120 characters"),
    description: z
      .string()
      .trim()
      .min(1, "Description is required")
      .max(2000, "Description must be at most 2000 characters"),
    includes: z
      .array(
        z
          .string()
          .trim()
          .min(1, "Include item cannot be empty")
          .max(60, "Include item must be at most 60 characters")
      )
      .min(1, "At least 1 included item is required")
      .max(15, "At most 15 included items allowed"),
    category: z.enum(PRODUCT_CATEGORIES, {
      message: "Category must be Electrical, Mechanical, or Solar",
    }),
    subcategoryGroup: z
      .string()
      .trim()
      .min(1, "Subcategory group is required")
      .max(80, "Subcategory group must be at most 80 characters"),
    sortOrder: z.coerce.number().int().default(0),
    imageUrl: z.string().trim().optional().nullable(),
    imageAlt: z.string().trim().optional().nullable(),
  })
  .refine(
    (data) => {
      if (data.imageUrl && data.imageUrl.length > 0) {
        return Boolean(data.imageAlt && data.imageAlt.trim().length >= 3);
      }
      return true;
    },
    {
      message: "Image Alt Text (at least 3 characters) is required when an image is set",
      path: ["imageAlt"],
    }
  );

export type ProductFormValues = z.infer<typeof productSchema>;

import { revalidateTag, revalidatePath } from "next/cache";

export function triggerCmsRevalidation(type: "product" | "service" | "blog", slug?: string) {
  try {
    if (type === "product") {
      revalidateTag("products");
      revalidatePath("/products");
      revalidatePath("/");
      if (slug) revalidatePath(`/products/${slug}`);
    } else if (type === "service") {
      revalidateTag("services");
      revalidatePath("/services");
      revalidatePath("/");
      if (slug) revalidatePath(`/services/${slug}`);
    } else if (type === "blog") {
      revalidateTag("posts");
      revalidatePath("/blog");
      revalidatePath("/");
      if (slug) revalidatePath(`/blog/${slug}`);
    }
    revalidatePath("/sitemap.xml");
  } catch (err) {
    console.error("Revalidation error:", err);
  }
}

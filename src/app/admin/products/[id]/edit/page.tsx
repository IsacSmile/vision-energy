import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const product = await (db as any).product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="p-6 md:p-8">
      <ProductForm
        isEdit
        initialData={{
          id: product.id,
          code: product.code,
          title: product.title,
          description: product.description,
          includes: product.includes,
          category: product.category,
          subcategoryGroup: product.subcategoryGroup,
          sortOrder: product.sortOrder,
          status: product.status,
          imageUrl: product.imageUrl,
          imageAlt: product.imageAlt,
          isPlaceholder: product.isPlaceholder,
        }}
      />
    </div>
  );
}

import React from "react";
import ProductForm from "@/components/admin/ProductForm";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Product Category - Vision Energy Admin",
};

export default async function EditProductCategoryPage({ params }: { params: { id: string } }) {
  const item = await db.productCategory.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    notFound();
  }

  return <ProductForm initialData={item} id={item.id} />;
}

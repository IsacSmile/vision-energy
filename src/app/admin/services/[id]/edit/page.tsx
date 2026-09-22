import React from "react";
import ServiceForm from "@/components/admin/ServiceForm";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Service Scope - Vision Energy Admin",
};

export default async function EditServicePage({ params }: { params: { id: string } }) {
  const item = await db.service.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    notFound();
  }

  return <ServiceForm initialData={item} id={item.id} />;
}

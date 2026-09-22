import React from "react";
import BlogForm from "@/components/admin/BlogForm";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Blog Article - Vision Energy Admin",
};

export default async function EditBlogPostPage({ params }: { params: { id: string } }) {
  const item = await db.blogPost.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    notFound();
  }

  return <BlogForm initialData={item} id={item.id} />;
}

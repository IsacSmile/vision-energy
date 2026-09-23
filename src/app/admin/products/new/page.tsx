import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProductForm } from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="p-6 md:p-8">
      <ProductForm />
    </div>
  );
}

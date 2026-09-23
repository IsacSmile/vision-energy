import { db } from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProductListTable } from "@/components/admin/ProductListTable";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: {
    search?: string;
    status?: string;
    category?: string;
    subcategoryGroup?: string;
    page?: string;
  };
}) {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }

  const search = searchParams.search || "";
  const status = searchParams.status || "";
  const category = searchParams.category || "";
  const subcategoryGroup = searchParams.subcategoryGroup || "";
  const page = parseInt(searchParams.page || "1", 10);
  const limit = 100;

  const where: any = {};

  if (status === "PUBLISHED" || status === "ARCHIVED") {
    where.status = status;
  }

  if (category) {
    where.category = category;
  }

  if (subcategoryGroup) {
    where.subcategoryGroup = subcategoryGroup;
  }

  if (search) {
    where.OR = [
      { code: { contains: search, mode: "insensitive" } },
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { subcategoryGroup: { contains: search, mode: "insensitive" } },
    ];
  }

  const [total, itemsRaw, categoriesRaw, subcategoriesRaw] = await Promise.all([
    (db as any).product.count({ where }),
    (db as any).product.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
    }),
    (db as any).product.findMany({
      select: { category: true },
      distinct: ["category"],
    }),
    (db as any).product.findMany({
      select: { subcategoryGroup: true },
      distinct: ["subcategoryGroup"],
    }),
  ]);

  const items = itemsRaw.map((p: any) => ({
    id: p.id,
    code: p.code,
    title: p.title,
    description: p.description,
    category: p.category,
    subcategoryGroup: p.subcategoryGroup,
    status: p.status,
    imageUrl: p.imageUrl,
    imageAlt: p.imageAlt,
    isPlaceholder: p.isPlaceholder,
    updatedAt: p.updatedAt.toISOString(),
  }));

  const categories = categoriesRaw.map((c: any) => c.category).filter(Boolean);
  const subcategories = subcategoriesRaw.map((s: any) => s.subcategoryGroup).filter(Boolean);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <ProductListTable
        initialItems={items}
        pagination={{
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        }}
        categories={categories}
        subcategories={subcategories}
      />
    </div>
  );
}

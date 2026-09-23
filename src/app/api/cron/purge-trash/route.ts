import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { recordAuditLog } from "@/lib/audit";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized cron execution" }, { status: 401 });
  }

  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const [deletedProducts, deletedServices] = await Promise.all([
      db.productCategory.deleteMany({
        where: { deletedAt: { lt: thirtyDaysAgo } },
      }),
      db.service.deleteMany({
        where: { deletedAt: { lt: thirtyDaysAgo } },
      }),
    ]);

    const totalPurged = deletedProducts.count + deletedServices.count;

    if (totalPurged > 0) {
      await recordAuditLog({
        actor: "system@cron",
        action: "DELETE",
        entity: "TRASH_PURGE",
        summary: `Daily cron purged ${totalPurged} items in trash for >30 days`,
      });
    }

    return NextResponse.json({ ok: true, totalPurged });
  } catch (error) {
    console.error("Purge trash cron error:", error);
    return NextResponse.json({ error: "Cron purge failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  return GET(request);
}

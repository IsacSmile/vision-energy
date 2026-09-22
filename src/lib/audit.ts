import "server-only";
import { db } from "./db";

export type AuditAction =
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "RESTORE"
  | "PUBLISH"
  | "UNPUBLISH"
  | "LOGIN"
  | "LOGOUT";

export interface LogAuditParams {
  actor: string;
  action: AuditAction;
  entity: string;
  entityId?: string;
  summary: string;
}

export async function recordAuditLog(params: LogAuditParams) {
  try {
    await db.auditLog.create({
      data: {
        actor: params.actor || "system@visionenergy.ae",
        action: params.action,
        entity: params.entity,
        entityId: params.entityId || null,
        summary: params.summary.substring(0, 255), // short summary, never full content or secrets
      },
    });
  } catch (error) {
    console.error("Failed to write AuditLog entry:", error);
  }
}

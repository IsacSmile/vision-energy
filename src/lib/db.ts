import "server-only";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

/**
 * Retry helper for DB queries to handle Neon cold starts / temporary connection drops.
 * Performs up to 2 attempts with a 300ms backoff between attempts.
 */
export async function withDbRetry<T>(fn: () => Promise<T>, attempts = 2, delayMs = 300): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;
      // If network / connection error or P1001 / P1002 (Prisma connection error codes), wait and retry
      const isConnError =
        error?.code === "P1001" ||
        error?.code === "P1002" ||
        error?.message?.includes("Can't reach database server") ||
        error?.message?.includes("Connection refused") ||
        error?.message?.includes("connection attempt failed") ||
        error?.message?.includes("ETIMEDOUT");

      if (isConnError && i < attempts - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
      throw error;
    }
  }
  throw lastError;
}

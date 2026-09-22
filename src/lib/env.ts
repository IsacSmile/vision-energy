import 'server-only';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, 'DATABASE_URL environment variable is missing'),
  DIRECT_URL: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional().default('admin@visionenergyme.com'),
  ADMIN_PASSWORD_HASH: z.string().optional(),
  SESSION_SECRET: z.string().optional().default('vision-energy-32-character-session-secret-key!'),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().optional().default('https://www.visionenergyme.com'),
});

function validateEnv() {
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const missingKeys = parsed.error.issues.map((issue) => issue.path.join('.')).join(', ');
    throw new Error(`Environment validation failed. Missing or invalid keys: ${missingKeys}`);
  }
  return parsed.data;
}

export const env = validateEnv();

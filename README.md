# Vision Energy International

Web application, Content Management System (CMS), and client enquiry management platform for Vision Energy International, a UAE-based engineering trading company specializing in lightning protection, earthing networks, mechanical fittings, and renewable energy solutions.

---

## Technical Overview

The application is built using Next.js (App Router), TypeScript, Tailwind CSS, PostgreSQL, and Prisma ORM.

- **Frontend & Server Infrastructure**: Next.js (App Router), React, TypeScript, Tailwind CSS
- **Database & Persistence**: PostgreSQL (Neon Serverless) via Prisma ORM
- **Authentication & Security**: HTTP-only signed session cookies, bcrypt password hashing (cost 12), rate-limited authentication endpoints, CSRF origin verification, content sanitization via rehype-sanitize
- **Storage & Assets**: Support for Vercel Blob storage (`@vercel/blob`) with automatic fallback to hosted image URLs
- **SEO & Search**: Dynamic XML sitemap generation (`/sitemap.xml`), structured JSON-LD Organization/Product/Article data, configurable `robots.txt`

---

## Environment Setup

Configure environment variables in `.env` or your hosting configuration settings:

```env
# Database Connections (Neon Serverless PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-pooler.region.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-direct.region.neon.tech/neondb?sslmode=require"

# Security Credentials
ADMIN_EMAIL="admin@visionenergyme.com"
ADMIN_PASSWORD_HASH="$2b$12$YourBcryptPasswordHashHere"
SESSION_SECRET="your_secure_32_character_session_secret_key"
NEXT_PUBLIC_SITE_URL="https://www.visionenergyme.com"

# Object Storage (Optional)
BLOB_READ_WRITE_TOKEN=""
```

---

## Database Management

Commands for schema migrations and data seeding:

- **Generate Prisma Client**: `npx prisma generate`
- **Apply Schema Migrations (Development)**: `npm run db:migrate`
- **Deploy Schema Migrations (Production)**: `npm run db:deploy`
- **Seed Initial Data (Standalone)**: `npm run db:seed`
- **Database GUI**: `npm run db:studio`

---

## Application Structure & Routing

| Route | Description | Access Level |
|---|---|---|
| `/` | Corporate homepage and key engineering pillars | Public |
| `/products` | Catalog of engineering product categories | Public |
| `/products/[slug]` | Product category detail and technical specifications | Public |
| `/services` | Engineering services and execution scope listing | Public |
| `/services/[slug]` | Detailed service scope narrative and process steps | Public |
| `/blog` | Technical insights and industry articles | Public |
| `/blog/[slug]` | Individual article editorial view | Public |
| `/about` | Company background and certification details | Public |
| `/contact` | Contact information and enquiry forms | Public |
| `/admin/login` | Secure administrator authentication portal | Public (Rate-limited) |
| `/admin` | CMS administration dashboard and metrics | Protected |
| `/admin/enquiries` | Management portal for client product and service enquiries | Protected |
| `/admin/products` | Management interface for product categories | Protected |
| `/admin/services` | Content management editor for service scopes | Protected |
| `/admin/blog` | Content management editor for technical articles | Protected |
| `/admin/trash` | Soft-deleted content recovery container | Protected |
| `/admin/activity` | Audit log record of administration actions | Protected |

---

## Production Deployment

1. **Build Process**:
   Running `npm run build` compiles the Next.js application and applies database migrations (`prisma migrate deploy`). Data seeding is intentionally executed separately to ensure existing production records are preserved.

2. **Storage Credentials**:
   If `BLOB_READ_WRITE_TOKEN` is configured, file uploads in the CMS will upload directly to Vercel Blob storage. If omitted, the system falls back to direct URL links.

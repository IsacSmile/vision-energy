# VISION ENERGY INTERNATIONAL - Next.js Full-Stack Application & CMS Admin

Web application, CMS administration panel, and enquiry management system for **VISION ENERGY INTERNATIONAL**, a UAE electrical, mechanical, and solar product trading company with a priority focus on **Lightning Protection & Earthing**.

---

## Connect Neon (PostgreSQL Setup)

The application uses **Neon Serverless PostgreSQL** for production data persistence, session storage, audit logging, and content management.

### Environment Variables
Configure the database connection strings in `.env`:

```env
# Neon Pooled Connection String (Used by runtime queries, contains "-pooler")
DATABASE_URL="postgresql://user:password@ep-cool-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Neon Direct Connection String (Used for migrations & seeding, without "-pooler")
DIRECT_URL="postgresql://user:password@ep-cool.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Security & Secrets
ADMIN_EMAIL="admin@visionenergyme.com"
ADMIN_PASSWORD_HASH="$2b$12$YourBcryptHashHere"
SESSION_SECRET="random_32_byte_string_secret_key_2026_vision"
NEXT_PUBLIC_SITE_URL="https://vision-energy.nihatechsolutions.online"

# Optional Vercel Blob Token for Image Uploads
BLOB_READ_WRITE_TOKEN=""
```

> **Note on Neon Connection Options**:
> - If connection to Neon fails with a `channel_binding` error in local Prisma execution, remove `channel_binding=gssapi-channel-binding` from your connection URL string.
> - If connection pool timeouts occur, append `&pgbouncer=true` to your `DATABASE_URL`.

### Database Scripts
- **Migrations (Dev)**: `npm run db:migrate` (`npx prisma migrate dev`)
- **Deploy Migrations (Prod/Vercel)**: `npm run db:deploy` (`npx prisma migrate deploy`)
- **Seed Database**: `npm run db:seed` (`npx tsx prisma/seed.ts`)
- **Prisma Studio GUI**: `npm run db:studio` (`npx prisma studio`)

---

## Technical Architecture

- **Framework**: Next.js (App Router) + TypeScript
- **Styling**: Vanilla CSS + Tailwind CSS dark technical theme tokens (`#050608`, `#0D1117`, `#0B65B3`, `#A3E635`)
- **Database & ORM**: PostgreSQL (Neon) with Prisma ORM singleton and 2-attempt connection retry resilience
- **Security & Auth**: Bcrypt cost 12 password verification, 5 attempts / 15 min rate limiter, signed `admin_session` cookie (8h absolute, 60m sliding idle), CSRF origin verification, `rehype-sanitize` HTML sanitization, noindex headers on admin
- **Image Storage**: Vercel Blob `@vercel/blob` with signature verification & fallback to direct URL input

---

## Client Hand-Over Checklist

1. **Admin Email & Password Setup**:
   - Generate a cost 12 bcrypt password hash:
     ```bash
     node -e "const b = require('bcryptjs'); console.log(b.hashSync('YourSecurePasswordHere', 12));"
     ```
   - Set `ADMIN_EMAIL` and `ADMIN_PASSWORD_HASH` in environment variables.

2. **Enabling Vercel Blob Uploads**:
   - In your Vercel project settings, attach a Vercel Blob store.
   - `BLOB_READ_WRITE_TOKEN` will automatically populate. If token is omitted, the CMS gracefully falls back to direct image URLs.

3. **How to Publish a Service Safely**:
   - When editing a service scope, clicking **Publish** triggers the mandatory client approval confirmation modal.
   - You must check *"I confirm this service scope has been approved by the client"* before the confirm button enables.
   - Unconfirmed process steps (`confirmed: false`) remain hidden from the public website automatically.

---

## Route Map

| Path | Description | Access |
|---|---|---|
| `/` | Home Page with Hero, Pillars, Lightning Highlight, Latest Posts | Public |
| `/products` | Filterable Product Categories (57 categories) | Public |
| `/products/[slug]` | Product Category Detail | Public |
| `/services` | Engineering Services Listing | Public |
| `/services/[slug]` | Service Scope Detail (Unconfirmed process steps hidden) | Public |
| `/blog` | Technical Articles Listing | Public |
| `/blog/[slug]` | Blog Article Detail | Public |
| `/admin/login` | Secure Admin Login Portal | Public (Rate-limited) |
| `/admin` | Admin Operations Dashboard | Protected |
| `/admin/enquiries` | Client Enquiries Management (Products & Services tabs) | Protected |
| `/admin/products` | Product Categories List, Reorder & JSON Import/Export | Protected |
| `/admin/services` | Service Scopes List & Accordion Form Editor | Protected |
| `/admin/blog` | Blog Articles List & Markdown Editor | Protected |
| `/admin/trash` | Trash Bin & 30-Day Recovery | Protected |
| `/admin/activity` | Audit Log Read-Only History | Protected |
| `/admin/preview/[type]/[id]` | Live Draft Preview Banner Mode | Protected |

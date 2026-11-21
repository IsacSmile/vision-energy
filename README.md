# Vision Energy International

> Enterprise Web Application, Product Catalog, and Content Management System (CMS) for **Vision Energy International** — a premier UAE-based supplier of engineering, industrial, electrical, lightning protection, earthing systems, laboratory equipment, safety PPE, and turnkey technical solutions across the UAE and GCC.

---

## ⚡ Technical Overview & Architecture

Built with a high-performance modern web stack leveraging **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL (Neon Serverless)** with **Prisma ORM**.

- **Frontend & App Framework**: Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons, GSAP & Lenis smooth scrolling.
- **Database & ORM**: PostgreSQL via Prisma ORM with connection pooling support.
- **Authentication & Security**: HTTP-only signed session cookies (`jose`), bcrypt password hashing (cost 12), rate-limited authentication endpoints, origin verification, and HTML sanitization (`rehype-sanitize`).
- **Interactive CRM & Enquiries**: Live enquiry modal with direct database persistence, lead status tracking (`NEW`, `IN_REVIEW`, `RESPONDED`, `CLOSED`), and instant admin review.
- **SEO & Core Web Vitals**: Full Schema.org JSON-LD structured data (`Organization`, `WebSite`, `Product`, `Service`, `Article`), dynamic XML sitemap (`/sitemap.xml`), robots.txt, semantic HTML5, and eager LCP WebP image optimization.
- **Storage & Assets**: Support for Vercel Blob storage (`@vercel/blob`) with automatic fallback to static asset hosting.

---

## 🏢 Platform Features

### 1. Multi-Sector Hero Showcase & Navigation
- **10 Curated Sector Slides**:
  1. *A Trusted Supplier of Quality Industrial & Technical Products* (Primary / LCP Slide)
  2. *Advanced Lightning Protection Systems* (`LP`)
  3. *Precision Earthing & Grounding Solutions* (`ER`)
  4. *Advanced Electrical & Mechanical Solutions* (`ME`)
  5. *Complete Laboratory Equipment for Better Tomorrow* (`LE`)
  6. *Gym Equipment Maintenance Services* (`SP`)
  7. *Safety Equipment Supply & Workplace Protection* (`SF`)
  8. *Safety Equipment & Commercial Packaging Solutions* (`PK`)
  9. *Sports Equipment & Accessories* (`SP`)
  10. *Delivering Excellence Across Multiple Sectors* (`EN`)
- **Direct Deep Linking**: Every slide CTA button (`Explore Products`, `Explore Lightning`, etc.) links directly to its filtered product group (`/products?group=...`).
- **Story-Style Indicators & Touch Controls**: Mobile progress indicators, smooth cross-fading background, keyboard navigation, and swipe gesture support.

### 2. Comprehensive Product & Service Catalog
- **23+ Product Categories**: Structured across international codes (`LP`, `ER`, `EL`, `ME`, `LE`, `SF`, `PK`, `SP`, `EN`) with downloadable submittals, technical specs, and interactive quote request triggers.
- **Turnkey Engineering Carousel**: Clean, interactive engineering cards covering site execution, transient defense, geological surveys, and preventive AMC maintenance.

### 3. Standards & Authority Compliance
- **International Engineering Standards**: IEC 62305, BS EN 62305, BS 7430, BS 7671 / IEC 60364, NFC 17-102, IEC 62561, and NFPA 780.
- **UAE Authority NOC Approvals**: TAQA (ADWEA), ADDC, DoE, ADCDA (Civil Defence), Abu Dhabi Municipality, DEWA, SEWA, and Etihad WE (FEWA).
- **Clean Card Architecture**: Clean white cards with lightweight borders (`border-slate-200/90`) and smooth soft box shadows for maximum readability.

### 4. Client Enquiry & Lead Management System
- Accessible site-wide through quick quote buttons, consultation triggers, and product detail forms.
- Submissions are validated with **Zod** and persisted directly to the PostgreSQL `Enquiry` database table.
- Accessible within the admin portal with search, status workflows, and audit logging.

### 5. Enterprise Content Management System (CMS)
- Secure, rate-limited administrator authentication portal (`/admin/login`).
- Full CRUD workflows for **Products**, **Services**, and **Blog Articles**.
- Drag-and-drop sortable lists (`@dnd-kit`).
- Soft-delete **Trash container** (`/admin/trash`) for content recovery.
- Full audit activity trail (`/admin/activity`).

---

## 🗂️ Application Structure & Routes

| Route | Description | Access Level |
|---|---|---|
| `/` | Homepage (Hero slider, About, Standards, Services, Partners, CTA) | Public |
| `/products` | Product catalog with group filtering (`?group=LP`, `?group=ER`, etc.) | Public |
| `/products/[slug]` | Product category detail and technical specifications | Public |
| `/services` | Turnkey engineering solutions listing | Public |
| `/services/[slug]` | Detailed service scope, execution methodology, and standards | Public |
| `/blog` | Technical articles, engineering whitepapers, and industry news | Public |
| `/blog/[slug]` | Individual article editorial view | Public |
| `/contact` | Corporate contact details, location map, and enquiry form | Public |
| `/admin/login` | Secure administrator authentication portal | Public (Rate-limited) |
| `/admin` | CMS administration dashboard, metrics, and quick actions | Protected |
| `/admin/enquiries` | Lead management portal for client product/service enquiries | Protected |
| `/admin/products` | Content management editor for product categories & items | Protected |
| `/admin/services` | Content management editor for engineering service scopes | Protected |
| `/admin/blog` | Editorial management for technical insights and articles | Protected |
| `/admin/trash` | Soft-deleted content recovery and permanent cleanup | Protected |
| `/admin/activity` | System audit log of administrator actions | Protected |

---

## 🛠️ Tech Stack & Key Libraries

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Actions, Route Handlers)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI & Styling**: [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/)
- **Database**: [PostgreSQL (Neon)](https://neon.tech/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Security**: [jose](https://github.com/panva/jose) (JWT sessions), [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- **Motion & Smooth Scrolling**: [GSAP](https://greensock.com/gsap/), [Lenis](https://lenis.darkroom.engineering/)
- **Drag & Drop**: [@dnd-kit](https://dndkit.com/)

---

## ⚙️ Environment Configuration

Create a `.env` file in the root directory:

```env
# Database Connections (Neon Serverless PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-pooler.region.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://user:password@ep-direct.region.neon.tech/neondb?sslmode=require"

# Security & Admin Authentication
ADMIN_EMAIL="admin@visionenergy.ae"
ADMIN_PASSWORD_HASH="$2b$12$YourBcryptPasswordHashHere"
SESSION_SECRET="your_secure_32_character_session_secret_key"
NEXT_PUBLIC_SITE_URL="https://vision-energy.nihatechsolutions.online"

# Storage & File Uploads (Optional - Vercel Blob)
BLOB_READ_WRITE_TOKEN=""

# Mailer / Contact Notifications (Optional)
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
CONTACT_EMAIL="info@visionenergy.ae"
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client & Migrate Database
```bash
# Generate Prisma Client
npx prisma generate

# Apply pending migrations to your database
npm run db:deploy
# or for local development:
npm run db:migrate
```

### 3. Seed Initial Categories & Data
```bash
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Database Scripts

| Command | Action |
|---|---|
| `npm run db:migrate` | Create and apply migration in development |
| `npm run db:deploy` | Apply migrations to production database |
| `npm run db:seed` | Seed product categories, services, and default records |
| `npm run db:studio` | Open interactive Prisma Studio GUI |

---

## 🚢 Production Build & Deployment

Run the production build:
```bash
npm run build
```

This executes:
1. `prisma generate` to compile the type-safe client.
2. `prisma migrate deploy` to safely apply database schema updates.
3. `next build` to generate optimized production artifacts.

Start the production server:
```bash
npm run start
```

---

## 📄 License & Ownership

Copyright © 2018–2026 **Vision Energy International**. All rights reserved.  
Private enterprise repository — strictly for authorized deployment and internal operations.

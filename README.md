# VISION ENERGY INTERNATIONAL - Next.js Full-Stack Application

Web application, enquiry management system, and administration panel for **VISION ENERGY INTERNATIONAL**, a UAE electrical, mechanical, and solar product trading company with a priority focus on **Lightning Protection & Earthing**.

---

## Technical Architecture

- **Framework**: Next.js 16+ (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 with custom dark technical theme tokens (`#050608`, `#0D1117`, `#0B65B3`, `#8DC63F`, `#F2C230`)
- **Database & ORM**: Prisma ORM with SQLite for local development (`prisma/dev.db`), engineered with PostgreSQL-compatible schema
- **Validation**: React Hook Form + Zod (supporting UAE phone number formats)
- **Admin Auth**: Single admin email + bcrypt password hash from `.env`, signed HttpOnly session cookies, middleware protection for `/admin` and `/api/admin/*`
- **Email Notifications**: Safe SMTP dispatch via `nodemailer` (fails gracefully if SMTP is not configured)

---

## Local Development & Setup Instructions

### 1. Prerequisites
- Node.js (v18.19+ or v20.9+)
- npm (v9.2+)

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Environment variables in `.env`:
```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@visionenergyme.com"
ADMIN_PASSWORD_HASH="$2b$10$M7s..l3utzhcA28N8hy2seQ25r981w5yOsd3NZTpYLTUSI./HdIga"
JWT_SECRET="vision-energy-super-secret-jwt-key-2026-change-this"

# Optional SMTP Configuration
SMTP_HOST=""
SMTP_PORT="587"
SMTP_USER=""
SMTP_PASS=""
SMTP_FROM="Vision Energy System <noreply@visionenergyme.com>"
NOTIFICATION_EMAIL="info@visionenergyme.com"
```

### 4. How to Generate a Custom Admin Password Hash
To create a new bcrypt hash for your chosen admin password, run:
```bash
node -e "const b = require('bcryptjs'); console.log(b.hashSync('YourSuperSecretPasswordHere', 10));"
```
Copy the output hash string into `ADMIN_PASSWORD_HASH` in `.env`.

*Default Login Credentials seeded in `.env`:*
- **Email**: `admin@visionenergyme.com`
- **Password**: `Admin@Vision2026!`

### 5. Database Setup & Seeding
Initialize the SQLite database and seed services, 57 product categories, and technical blog posts:
```bash
npx prisma db push
npx prisma db seed
```

### 6. Running Local Development Server
Start the local server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Route Map

| Path | Description | Access |
|---|---|---|
| `/` | Home Page with Hero, 5 Solution Pillars, Lightning Highlight Band, Why Choose Us, Latest Blog | Public |
| `/products` | Filterable Product Categories Catalogue (57 categories, LP/ER ordered first) | Public |
| `/products/[slug]` | Product Category Detail with catalogue code, title, description, families & CTAs | Public |
| `/services` | Engineering Services Listing (Published services) | Public |
| `/services/[slug]` | Service Detail Page (Unpublished services return 404) | Public |
| `/blog` | Technical Blog Listing | Public |
| `/blog/[slug]` | Blog Post Article | Public |
| `/about` | Company Profile, History (est. 2018), 3 Locations, Trading Model Notice | Public |
| `/contact` | Office details, RAK address, phone numbers, map placeholder, contact form | Public |
| `/admin/login` | Single Admin Login Portal | Public |
| `/admin` | Admin Dashboard (Separate tabs for Product & Service enquiries, CSV Export, Notes editor) | Protected (HttpOnly Cookie) |

---

## How to Add New Content to the Database

### Adding a New Service
Run `npx prisma studio` or create a new entry in `prisma/seed.ts`:
```ts
await prisma.service.create({
  data: {
    slug: 'new-service-slug',
    title: 'New Engineering Service Title',
    summary: 'Short service summary...',
    content: 'Full service narrative...',
    whatsIncluded: JSON.stringify(['Inclusion 1', 'Inclusion 2']),
    processSteps: JSON.stringify(['Step 1', 'Step 2']),
    published: true // Set to false to keep unpublished
  }
});
```

### Adding a New Product Category
```ts
await prisma.productCategory.create({
  data: {
    code: 'LP-05',
    slug: 'lp-05-[#category-title]',
    groupPrefix: 'LP',
    title: 'New Category Title',
    description: 'Detailed description...',
    families: 'Family 1; Family 2; Family 3',
    image: '/images/products/placeholder.jpg',
    sortOrder: 5
  }
});
```

### Adding a New Blog Post
```ts
await prisma.blogPost.create({
  data: {
    slug: 'new-article-slug',
    title: 'New Technical Article Title',
    excerpt: 'Short excerpt...',
    content: 'Full article markdown/text...',
    author: 'Vision Energy Technical Team',
    category: 'Technical Insights',
    published: true,
    publishedAt: new Date()
  }
});
```

---

## Production Build Verification
To test production compilation:
```bash
npm run build
npm start
```

# Schema.org & Knowledge Graph Entity Map — Vision Energy International

> **Last updated:** November 27, 2026
> **Rule:** Every schema node must mirror visible on-page HTML verbatim. Zero fabricated reviews, ratings, certifications, addresses, prices, or `HowTo` blocks.

## 1. Root Entity Graph (`src/app/layout.tsx`)

| Entity ID | `@type` | Key Verified Attributes | Cross-References |
| --- | --- | --- | --- |
| `https://www.visionenergyme.com/#organization` | `ProfessionalService` | Legal Name: `VISION ENERGY INTERNATIONAL`, Founding: `2018`, Slogan/Facts: `160+ projects`, HQ PostalAddress: `RAK Business Centre BC4, RAK FTZ Business Park, P.O Box 17111, Al Nakheel, Ras Al Khaimah, AE`, Telephones: `+971 7 204 2763`, `+971 54 700 4616`, Email: `info@visionenergyme.com`, `areaServed`: Dubai, Abu Dhabi, Ras Al Khaimah, United Arab Emirates, Qatar, `knowsAbout`: 7 standards (`IEC 62305`, `BS EN 62305`, `BS 7430`, `BS 7671 / IEC 60364`, `NF C 17-102`, `IEC 62561`, `NFPA 780`), UAE authorities, LPS, Earthing, SPDs, Gym & Lab equipment. | Referenced by `@id` across ALL subpages (`WebPage.publisher`, `Service.provider`, `BlogPosting.publisher`). `sameAs`: populated dynamically from `SOCIAL_LINKS` (`TODO`: supply verified corporate profile URLs). |
| `https://www.visionenergyme.com/#website` | `WebSite` | `name`: `Vision Energy International`, `url`: `https://www.visionenergyme.com`, `inLanguage`: `en-AE`, `publisher`: `@id #organization`. | Referenced by `WebPage.isPartOf` on all structured pages. |

---

## 2. Page-Type Schema Extensions

- **`/` Home**: Uses root `#organization` + `#website` graph. Removed unrendered `FAQPage` block (rule compliance: schema must match visible page text).
- **`/about`**: `AboutPage` (`datePublished`, `dateModified`, `about: #organization`, `publisher: #organization`) + `BreadcrumbList`.
- **`/glossary`**: `WebPage` (`speakable`) + `BreadcrumbList` + `DefinedTermSet` mapping 12 verified engineering definitions (`DefinedTerm` array).
- **`/expertise`**: `WebPage` (`speakable`, `primaryImageOfPage`, `about` standards & services) + `BreadcrumbList` + `OfferCatalog` (4 main disciplines, `areaServed` UAE + Qatar) + `FAQPage` (matches visible 7 FAQ cards). `HowTo` removed per policy.
- **`/expertise/[category]`** (`lightning`, `earthing`, `gym`, `laboratory`): `WebPage` (`datePublished`, `dateModified`, `speakable`) + `BreadcrumbList` + `Service` (`@id #organization`, `areaServed` UAE + Qatar) + `FAQPage` matching strictly visible FAQs on that discipline route.
- **`/uae/[city]/[service]` & `/qatar/[service]`**: `WebPage` (`speakable`, `dateModified`) + `BreadcrumbList` + `Service` (`areaServed` scoped accurately to that Emirates city + UAE, or Qatar) + `FAQPage` matching the 3 visible location FAQs.
- **`/services/[slug]`**: `BreadcrumbList` + `Service` (`provider: @id #organization`, `areaServed`: Dubai, Abu Dhabi, Ras Al Khaimah, UAE, Qatar).
- **`/products/[slug]`**: `Product` (`name`, `description`, `sku`, `category`, `image`, `brand`, `url` — removed ungrounded fake `100.00 AED AggregateOffer` & `InStock`).
- **`/blog/[slug]`**: `BlogPosting` (`headline`, `description`, `image`, `datePublished`, `dateModified`, `author`/`publisher`: `@id #organization`) + `BreadcrumbList`.
- **`/contact`**: `ContactPage` (`mainEntity: @id #organization`) — removed inaccurate Dubai `GeoCoordinates`.

---

## 3. Entity TODOs Requiring User Confirmation
- Confirm official operating hours (`openingHoursSpecification`) -> update `src/lib/seo/company.ts`, `layout.tsx`, `contact/page.tsx`.
- Supply exact verified LinkedIn, Instagram, Facebook, YouTube URLs -> update `src/config/social.ts` to activate `sameAs`.
- Confirm verified Ras Al Khaimah office entrance lat/lng -> optional addition of exact `GeoCoordinates` on `organizationSchema`.
- If Dubai & Abu Dhabi branches gain dedicated street addresses and local licenses -> add as separate `subOrganization` / `department` nodes with distinct `PostalAddress`.


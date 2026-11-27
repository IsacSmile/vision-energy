# 6-Month Implementation Roadmap & Engineering/Owner Action Checklist

> **Last updated:** November 27, 2026

## 1. Completed in Engineering Sprints (This Session)
- **Phase 0 Audit:** `seo/00-audit.md` documenting baseline scores, bottlenecks, DB anomalies, and security/preview risks.
- **Technical & CWV Foundations:** Removed `Clear-Site-Data` & global `no-store`, enforced `https://www.visionenergyme.com` host redirect & `trailingSlash: false`, noindexed preview/staging (`VERCEL_ENV !== 'production'` / `*.vercel.app`), consent-gated Clarity + conversion analytics, enabled SSG/ISR (`revalidate = 300/3600`), trimmed heavy hero preloads & `/services` RSC payload.
- **NAP & Regional Normalization:** Unified RAK HQ address, `+971 7 204 2763` / `+971 54 700 4616`, branches Dubai/Abu Dhabi, UAE & Qatar markets (purged legacy `GCC` and `+971 50 768 6700`).
- **Schema Compliance:** Linked `#organization` & `#website` graph cleanly; removed unrendered homepage `FAQPage`, removed `HowTo`, removed fake `100.00 AED` `Product.offers`, switched blog to `BlogPosting`, removed fabricated Dubai `GeoCoordinates`.
- **Indexable Expertise, Trust & Wave 1 Routes:** Built SSG `/expertise/lightning`, `/expertise/earthing`, `/expertise/gym`, `/expertise/laboratory`, `/about`, `/glossary`, `/uae/[city]/[service]` (6 UAE pages), `/qatar/[service]` (2 Qatar pages), `/thank-you` (`noindex`), updated `/sitemap.xml`, `llms.txt`, and `expertise.md`.

---

## 2. CRITICAL ITEMS REQUIRING ENGINEER / OWNER REVIEW (`FLAGGED`)

### A. Electrical Engineer Safety & Compliance Review (YMYL Flag — Rule 5)
1. **`"100% LPS Standards Adherent"` wording:** Verify on `/expertise` components (`FlagshipLightning.tsx` / `LightningHero`) whether a softer phrasing such as `"Engineered to Applicable LPS Standards"` is legally safer; left UI untouched per Rule 2, flagged here for engineer/legal approval.
2. **ESE Standards Claim Audit (`NF C 17-102` vs `IEC 62305`):** Confirm whether any internal copy or `LP-02` datasheet references imply `IEC 62305` endorses ESE terminals (strictly, ESE falls under `NF C 17-102` / `UNE 21186` where accepted locally, NOT `IEC 62305`). Inspect and confirm wording with Lead Electrical Engineer.
3. **Removed YMYL Phrases Confirmed:** `"cloud seeding increased thunderstorms"` and `"authorities mandated LPS for all constructions"` were purged from FAQs, `public/expertise.md`, `services/content.ts`, and `lightning.data.ts` until you supply verified UAE regulatory decrees.
4. **Qatar Regulatory Authorities (`TODO`):** Verify which Qatari utility / civil defense authorities (`Kahramaa`, `Qatar Civil Defence / QCDD`, etc.) and QCS codes apply to your actual Qatar tender approvals before adding any Qatar regulatory names to `/qatar/*`.

### B. Owner Data `TODO`s (Unconfirmed Business Facts)
- **Official Operating Hours:** e.g., Mon–Fri / Sat hours (`GST`) -> add to `src/lib/seo/company.ts`, `/contact`, `/about`, and JSON-LD `openingHoursSpecification`.
- **Verified Ras Al Khaimah HQ Entrance Lat/Lng (`GeoCoordinates`):** Confirm exact GPS coordinates at `RAK Business Centre BC4` before enabling schema `GeoCoordinates`.
- **Verified Dubai & Abu Dhabi Branch Street Addresses / Licenses:** Required before creating separate GBP profiles or `subOrganization` schema entities.
- **Official Social Profile URLs:** Populate `src/config/social.ts` (`LinkedIn`, `Instagram`, etc.) to populate `Organization.sameAs`.
- **Database Service Record Bug:** In Prisma DB `Service` table, row `slug: 'surge-protection-and-bonding'` currently carries `title: 'Heavy Equipment Rentals'`. Update the DB row in `/admin/services` cleanly (`heavy-equipment-rental` vs dedicated surge service) + configure `SlugRedirect` if needed.
- **Google Search Console Search Volumes:** Validate every keyword target in `seo/keyword-map.csv` inside GSC & Google Keyword Planner once live traffic collects.

---

## 3. Month 1–6 Execution Roadmap

| Window | Priorities | Success Metric |
| --- | --- | --- |
| **Month 1 (Launch & Indexing)** | Submit updated `sitemap.xml` in Google Search Console & Bing Webmaster Tools; verify production `robots.txt` & confirm AI bot policy approval; claim/verify RAK GBP; add owner TODOs (hours, social links, DB service fix) | 100% core & Wave 1 URLs indexed cleanly; zero `vercel.app` indexing |
| **Month 2 (Local Authority & Content Depth)** | Resolve YMYL/ESE engineer sign-off; upload authentic RAK office, warehouse, and site-testing photos to GBP; add Dubai/Abu Dhabi local photos; submit top 8 UAE citations (`seo/local-citations.csv`); launch GBP review workflow | First 10 genuine GBP reviews; top 10 UAE citations live with clean NAP |
| **Month 3 (GSC Calibration & CRO Tuning)** | Review Search Console country filters (United Arab Emirates vs Qatar) and query CTRs in `keyword-map.csv`; tune meta titles on low-CTR pages; publish 2 technical blog guides backed by real site case data | Top-20 impressions across Dubai/AD/RAK LPS & earthing core terms |
| **Month 4–5 (Wave 2 Expansion)** | If Wave 1 pages convert and hold strong indexing, launch Wave 2 (`/uae/dubai/surge-protection`, `/uae/dubai/gym-equipment`, `/uae/abu-dhabi/laboratory-equipment`, `/qatar/laboratory-equipment`) with real Qatar code notes & case photos | Qualified enquiry uplift (Calls + WhatsApp + `/thank-you` completions) |
| **Month 6 (AI Answer & Authority Consolidation)** | Audit Perplexity, ChatGPT Search, Google AI Overviews, and Gemini citations for primary commercial queries; secure manufacturer "Authorized Distributor" backlinks; publish commissioned project dossier pages | Repeatable visibility across Google Local Pack, Organic UAE/Qatar SERPs & AI answers |


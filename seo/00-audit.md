# Phase 0 — Complete Technical, On-Page, Local, AEO/GEO & CRO Audit (`visionenergyme.com`)

**Audit Date:** 2026-11-27  
**Auditor Role:** Senior Technical SEO Engineer, Next.js Developer, Local/International SEO, AEO/GEO & CRO Audit  
**Baseline Git Commit:** `0913683` (`origin/main`)  
**Stack Detected:** Next.js `14.2.35` (App Router), React `18.3.1`, TypeScript `5`, Tailwind CSS `3.4.19`, Prisma `5.22.0` (PostgreSQL), `lucide-react`, Microsoft Clarity (`yktp18a9bf`), WhatsApp click-to-chat (`wa.me`). No GA4 or `@vercel/analytics` installed.

---

## 1. Executive Audit Verdict

The application has a strong visual UI foundation (`Accessibility: 96–100`, `SEO (Lighthouse heuristic): 100`), a working database catalog (`115` published product categories across `27` groups, `4` published services, `3` blog posts), and rich SSR tab markup on `/expertise`. However, **six high-impact technical, canonical, NAP, schema, and Core Web Vitals defects** currently suppress real search visibility and conversions:

1. **`next.config.js` wipes HTTP cache on every request** (`Clear-Site-Data: "cache"` + `Cache-Control: no-store` on all HTML routes), driving mobile Lighthouse Performance to **46–66** (`LCP 5.2s–10.3s`).
2. **Microsoft Clarity fires unconditionally on `lazyOnload`** without a consent mechanism, triggering third-party cookies and dropping Chrome Best Practices from `100` to **`77`** across every route.
3. **Every inner page has double-branded `<title>` tags (`93–128` chars)** because `src/app/layout.tsx` appends `| Vision Energy International UAE` on top of route titles that already include `| Vision Energy`.
4. **Severe routing/canonical defects on `/services`**:
   - `/services/earthing-and-grounding` renders content from `SERVICE_DETAIL_PAGES['earthing-grounding']` whose `<link rel="canonical">` points to `/services/earthing-grounding` (canonical mismatch with the `sitemap.xml` URL `/services/earthing-and-grounding`).
   - Database service row `slug: 'surge-protection-and-bonding'` has `title: 'Heavy Equipment Rentals'` and renders mismatched content.
5. **Fake `Product` schema offer (`lowPrice: "100.00"` AED, `InStock`)** on `/products/[slug]`, plus **`HowTo` schema** on `/expertise` and `Article` instead of `BlogPosting` on `/blog/[slug]`.
6. **Global NAP & Contact Mismatches**:
   - Wrong secondary mobile/WhatsApp number (`+971 50 768 6700`) used in `src/lib/dictionary.ts`, `src/app/layout.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/StickyContactWidget.tsx`, `public/llms.txt`, and `public/expertise.md`, conflicting with the verified `+971 54 700 4616` used in `FinalCTA.tsx` and the Lightning catalogue PDF.
   - Incomplete head office address (`RAK Business Centre BC4, Ras Al Khaimah` / `RAK Free Trade Zone`) missing `RAK FTZ Business Park, P.O Box 17111, Al Nakheel`.
   - Incorrect Dubai `GeoCoordinates` (`25.2048, 55.2708`) attached to the Ras Al Khaimah head office schema in `layout.tsx` and `contact/page.tsx`.
   - `/expertise` subtopics (`lightning`, `earthing`, `gym`, `laboratory`) exist only as client hash tabs rather than dedicated indexable App Router URLs; `/about` returns `404`; Qatar is missing from `Service.areaServed` and contact Emirate/location options.

---

## 2. Stack & Rendering Mode Inventory

| Route Pattern | Source File | Rendering Mode | DB / Cache Behavior | Target Status |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | **Dynamic (`force-dynamic`, `revalidate = 0`)** | Prisma query per request | Switch to ISR (`revalidate = 3600` or `300`) |
| `/products` | `src/app/products/page.tsx` | **Dynamic (`force-dynamic`, `revalidate = 0`)** | Cached catalog query inside `unstable_cache` | Convert to static/ISR where query-less, `noindex` on query filters |
| `/products/[slug]` | `src/app/products/[slug]/page.tsx` | **`generateStaticParams` + `force-dynamic`** | Overrides SSG with `force-dynamic`! | Restore clean **ISR (`revalidate = 3600`)** |
| `/expertise` | `src/app/expertise/page.tsx` | **SSG (`force-static`, `revalidate = 3600`)** | Static data modules | Keep SSG; add dedicated sub-routes `/expertise/*` |
| `/expertise/{lightning,earthing,gym,laboratory}` | *(Missing)* | *404 / Hash only* | N/A | **Create static routes (`generateStaticParams`)** |
| `/services` | `src/app/services/page.tsx` | **Dynamic (`force-dynamic`, `revalidate = 0`)** | `getPublishedServices()` + 664 KB HTML payload | Switch to ISR + trim unused serialized `content` |
| `/services/[slug]` | `src/app/services/[slug]/page.tsx` | **`generateStaticParams` + `force-dynamic`** | Overrides SSG with `force-dynamic` | Switch to **ISR (`revalidate = 3600`)** |
| `/blog` | `src/app/blog/page.tsx` | **ISR (`revalidate = 300`)** | `getPublishedBlogPosts()` | Keep ISR; enrich metadata & links |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | **SSG/ISR (`generateStaticParams`, `revalidate = 300`)** | Prisma lookup | Fix heading hierarchy (`h2` missing in DB content) + `BlogPosting` schema |
| `/contact` | `src/app/contact/page.tsx` | Static/Default App Route | Static | Enforce verified NAP, map embed, consent/CRO improvements |
| `/about` | *(Missing)* | **`404 Not Found`** | N/A | **Create SSG `/about` with verified Company Facts & E-E-A-T** |
| `/glossary` | *(Missing)* | **`404 Not Found`** | N/A | **Create SSG `/glossary` with source-grounded definitions** |
| `/thank-you` | *(Missing)* | *(Missing conversion page)* | N/A | **Create `/thank-you` (`noindex`) for clean enquiry conversion tracking** |
| `/robots.txt` | `src/app/robots.ts` | Metadata Route | Missing `VERCEL_ENV !== 'production'` preview gate | Add preview/staging disallow + production AI/search allow |
| `/sitemap.xml` | `src/app/sitemap.ts` | Metadata Route (`128` URLs) | Missing `/about`, `/glossary`, `/expertise/*`, Wave 1 local pages | Expand cleanly with accurate `lastModified` |

---

## 3. Live Crawl Inventory (Sampled Production Build on `localhost:3199`)

Full sitemap contains **128 URLs**: `6` static routes (`/`, `/products`, `/expertise`, `/services`, `/blog`, `/contact`), `115` `/products/[slug]`, `4` `/services/[slug]`, and `3` `/blog/[slug]`.

| URL | Status | Title (`Chars`) | Desc (`Chars`) | H1 Count & Exact Text | H2s | Canonical |
|---|---:|---:|---:|---|---:|---|
| `/` | `200` | `93` | `244` | `1` — *"Advanced LightningProtection Systems"* *(spacing bug!)* | `4` | `https://www.visionenergyme.com` |
| `/products` | `200` | `128` | `273` | `1` — *"Product Catalogue"* | `29` | `https://www.visionenergyme.com/products` |
| `/expertise` | `200` | `100` | `231` | `1` — *"Lightning & Earthing Engineering Expertise"* | `10` | `https://www.visionenergyme.com/expertise` |
| `/services` | `200` | `117` | `225` | `1` — *"Installation and Support Services"* | `8` | `https://www.visionenergyme.com/services` |
| `/blog` | `200` | `115` | `177` | `1` — *"Engineering Insights & Standards"* | `3` | `https://www.visionenergyme.com/blog` |
| `/contact` | `200` | `105` | `233` | `1` — *"Contact Vision Energy"* | `2` | `https://www.visionenergyme.com/contact` |
| `/about` | `404` | — | — | — | — | Missing |
| `/services/external-lightning-protection-installation` | `200` | `107` | `207` | `1` — *"Lightning Protection Installation"* | `3` | `.../services/external-lightning-protection-installation` |
| `/services/earthing-and-grounding` | `200` | `126` | `179` | `1` — *"Earthing & Grounding System Design & Installation"* | `5` | **`.../services/earthing-grounding` *(MISMATCH!)*** |
| `/services/manpower-supply` | `200` | `108` | `128` | `1` — *"Manpower Supply"* | `8` | `.../services/manpower-supply` |
| `/services/surge-protection-and-bonding` | `200` | `97` | `127` | `1` — **"Heavy Equipment Rentals" *(WRONG SERVICE!)*** | `5` | `.../services/surge-protection-and-bonding` |
| `/blog/transient-overvoltage-protection-surge-arrester-placement` | `200` | `124` | `118` | `1` | **`0`** | Self |
| `/blog/earthing-and-grounding-fundamentals-high-resistivity-soil` | `200` | `128` | `142` | `1` | **`0`** | Self |
| `/blog/conventional-mesh-vs-ese-lightning-protection` | `200` | `122` | `134` | `1` | **`0`** | Self |
| `/products/conventional-lightning-protection-systems` | `200` | `109` | `331` | `1` — *"Conventional Lightning Protection Systems"* | `2` | Self |

### Key Content, Link Graph & Thin/Orphan Issues
- **Footer broken product group links** (`src/components/layout/Footer.tsx:58-63`): Links to `/products?group=EB`, `/products?group=MF`, `/products?group=IC`, `/products?group=SE` — none of these codes exist in the `115`-category database (actual codes are `ER`, `ME`, `CB`, `EN`, `EL`, `CM`, `CT`, `SG`, `HW`, `SF`, `PK`, `ID`, `SP`, and `LE`–`AT` laboratory groups).
- **Public footer exposes `/admin`** (`Footer.tsx:100`): Waste of PageRank/crawl priority and inappropriate public nav target.
- **Thin / Placeholder Sections**:
  - `gym.data.ts` (`345 B`) and `laboratory.data.ts` (`387 B`) have only empty-state placeholders (~20 words). However, the database already contains **2 Gym/Sports categories (`SP-01`, `SP-02`)** and **57 Laboratory categories (`LE`, `LPE`, `LG`, `LH`, `LC`, `LM`, `MO`, `LF`, `TS`, `LS`, `WS`, `AT`)** — giving real verified catalog scope to expand `/expertise/gym` and `/expertise/laboratory`.
  - Blog posts (`1,098–1,378` chars each, ~170–220 words) contain `0` `<h2>` headings (`^## ` = 0).

---

## 4. Core Web Vitals, Media & Infrastructure Audit

### Baseline Mobile Lighthouse Scores (`http://localhost:3199`)

| Route | Perf | A11y | Best Practices | SEO | LCP | TBT | CLS |
|---|---:|---:|---:|---:|---:|---:|---:|
| `/` | **49** | 96 | **77** | 100 | **9.0 s** | 570 ms | 0.001 |
| `/expertise` | **66** | 100 | **77** | 100 | **5.6 s** | 370 ms | 0 |
| `/products` | **61** | 100 | **77** | 100 | **5.2 s** | 570 ms | 0 |
| `/services` | **46** | 96 | **77** | 100 | **10.3 s** | 700 ms | 0 |

### Measured Root Causes
1. **Cache & Header Poisoning (`next.config.js:73-91`)**: Sends `Clear-Site-Data: "cache"` and `Cache-Control: no-store` on HTML responses, plus `max-age=0` on `/images/(.*)`.
2. **Document & RSC Bloat (`/services` = `664 KB` HTML, global prefetch = `663 KB`)**: `/services` passes full serialized `content` objects into `<ServicesListRow>`, and navigation `<Link>` elements prefetch `/expertise`, `/contact`, and `/blog` concurrently on mobile startup.
3. **Hero Paint Delay via `<Reveal>`**: `src/components/ui/Reveal.tsx` mounts at `opacity: 0` (`isVisible = false`) until JS hydration and `IntersectionObserver` run. Used directly around the hero `<h1>` and `<p>` on `/services` (`LCP 10.3 s`).
4. **Heavy Raw Assets in `public/product-catalouge/`**: Laboratory category PNGs (`LPE-06.png`, `LPE-01.png`, `LPE-03.png`, `AT-03.png`, etc.) range from `950 KB` to `1.14 MB` each (`next/image` handles resizing when used, except where `unoptimized` or raw `<img>` is used).
5. **Best Practices (`77`)**: Microsoft Clarity (`layout.tsx:289`) unconditionally executes `clarity.js`, creating third-party cookies and inspector issues without user consent.
6. **Hosting / Preview & Host Canonical Risks**:
   - No `redirects()` in `next.config.js` enforcing `https://www.visionenergyme.com` canonical host (non-`www` -> `www` redirect missing at Next.js level).
   - No `X-Robots-Tag: noindex, nofollow` header on Vercel preview/staging deployments (`VERCEL_ENV !== 'production'`).
   - `robots.ts` currently returns `allow: '/'` regardless of `VERCEL_ENV`.

---

## 5. NAP, Claims & YMYL Audit (Ground Rules 1, 5, 7, 8)

### NAP Mismatches Found
| Element | Verified Canonical Value | Current Mismatches Found |
|---|---|---|
| **Company Name** | `Vision Energy International` (`VISION ENERGY INTERNATIONAL`) | Matches (some schemas write `Vision Energy International UAE`) |
| **Established** | `2018` (`More than 160 projects completed`) | `IntroStandards.tsx` mentions `over a decade of industry experience` (`2018` vs "decade"); `160+ projects` missing |
| **Head Office Address** | `RAK Business Centre BC4, RAK FTZ Business Park, P.O Box 17111, Al Nakheel, Ras Al Khaimah, UAE` | `layout.tsx`, `dictionary.ts`, `contact/page.tsx`: omits `RAK FTZ Business Park, P.O Box 17111, Al Nakheel`; `contact/page.tsx:197` says `RAK Free Trade Zone` |
| **Branches** | `Dubai` and `Abu Dhabi` (no street addresses supplied) | Consistent, must stay branch labels + `areaServed` only (no fake street addresses or Dubai lat/lng on RAK!) |
| **GeoCoordinates** | *RAK coordinates TODO unless supplied* | `layout.tsx:163` and `contact/page.tsx:48` incorrectly use **Dubai (`25.2048, 55.2708`)** for RAK HQ! |
| **Phones** | `+971 7 204 2763`, `+971 54 700 4616` | `dictionary.ts`, `layout.tsx`, `Header.tsx`, `StickyContactWidget.tsx`, `llms.txt`, `expertise.md` use wrong secondary number **`+971 50 768 6700`** |
| **Markets Served** | `Abu Dhabi`, `Dubai`, `Ras Al Khaimah`, `UAE`, `Qatar` (No office in Qatar; exclude KSA/Kuwait/Bahrain/Oman) | Site copies widely say `UAE & GCC` (`HomeHeroClient`, `IntroStandards`, `Footer`, `WhyVisionEnergy`, `expertise/*`, `faq.data.ts`, `llms.txt`, `expertise.md`); `/contact` dropdown lacks `Qatar` |

### YMYL & Standards Flags Requiring Engineer Verification (Ground Rule 5)
- **Catalog claims flagged (DO NOT repeat in FAQs, schema, AI markdown, or new copy until client confirms)**:
  - *"the recent adoption of cloud seeding technology has led to an increase in thunderstorms"* (`src/lib/data/expertise/lightning.data.ts:640`, also currently echoed in `public/expertise.md:106`).
  - *"authorities have mandated the implementation of Lightning Protection Systems (LPS) for all constructions"* (`lightning.data.ts:642`, also in `public/expertise.md:106`).
- **Wordings flagged for Qualified Engineer Review**:
  - `"100% LPS Standards Adherent"` (`src/components/products/StandardsCompliance.tsx:170`) — verify absolute phrasing with compliance engineer.
  - Clarification of **which specific standards govern ESE terminals** (`NF C 17-102` covers Early Streamer Emission terminals, whereas `IEC / BS EN 62305` covers conventional Rolling Sphere / Protection Angle / Faraday Mesh systems — must never be blurred as covered by the same mechanism under `IEC 62305`).
- **Qatar Regulations (`Rule 7`)**: No Qatar-specific authorities or approvals (e.g., Kahramaa / Qatar Civil Defence) exist on site or are verified — **TODO before claiming any Qatari authority acceptance**.

---

## 6. Analytics, Clarity & Consent Audit

- **Installed Analytics**: Only Microsoft Clarity (`yktp18a9bf`) in `src/app/layout.tsx:289-297`.
- **Consent Banner**: None present. Database forms store explicit checkbox consent, while analytics script runs un-gated.
- **Conversion Tracking**: `0` conversion events fired on phone clicks, WhatsApp clicks, email clicks, brochure downloads, or form submissions; no `/thank-you` conversion route exists.

---

## 7. Prioritized Implementation Roadmap (Impact × Effort)

| Priority | Category | Issue & Target Fix | Impact | Effort |
|---:|---|---|---:|---:|
| **P0** | Tech / CWV | Fix `next.config.js` (`Clear-Site-Data`, cache headers, preview `X-Robots-Tag: noindex, nofollow`, canonical `www` host redirect) & `robots.ts` env guard | **Critical** | Low |
| **P0** | CWV / CRO | Gate & defer Microsoft Clarity cleanly via reusable Consent Banner (`vision_consent`) + interaction triggers; fix `Reveal` hero rendering (`instant`/`no initial opacity-0` in hero); remove `force-dynamic` on SSG/ISR catalog & marketing pages; stop preloading offscreen RSC prefetches | **Critical** | Medium |
| **P0** | Local / NAP | Fix phone (`+971 54 700 4616`), full RAK head office address, wrong Dubai `GeoCoordinates`, `Qatar` in location lists/schemas, and replace misleading `GCC` leakage with `UAE & Qatar` | **Critical** | Low |
| **P0** | Schema / Bugs | Remove fake `100.00 AED` `AggregateOffer` on `/products/[slug]`; remove `HowTo` schema from `/expertise`; change `Article` -> `BlogPosting`; fix `/services/earthing-and-grounding` canonical mismatch; fix `Advanced LightningProtection Systems` H1 spacing; inspect/fix DB/service routing for `surge-protection-and-bonding` | **Critical** | Low |
| **P1** | Tech / Content | Split `/expertise` tabs into real indexable SSG routes (`/expertise/lightning`, `/expertise/earthing`, `/expertise/gym`, `/expertise/laboratory`) with unique H1s/titles/descriptions/canonicals & cross-links while preserving UI; expand Gym & Lab pages using verified catalog categories | **High** | Medium |
| **P1** | On-Page SEO | Eliminate double-branded `title` suffixes across all routes (`<= 60` chars), tighten meta descriptions (`<= 155` chars), fix `Footer` dead group links & `/admin` link, convert blog markdown headings cleanly | **High** | Medium |
| **P1** | Semantic / GEO | Build `/about` (verified Company Facts block), `/glossary` (source-grounded definitions + `DefinedTermSet`), add visible `Last updated` + `datePublished`/`dateModified` schema stamps, strip YMYL catalog claims from AI-targeted copy/FAQs (`expertise.md`, FAQs) | **High** | Medium |
| **P1** | Programmatic (Wave 1) | Launch Wave 1 city service pages (`/solutions/[service]/[city]` or clean flat routes for **Dubai, Abu Dhabi, Ras Al Khaimah × Lightning & Earthing** — 6 high-utility `>=400`-word unique pages, plus UAE Gym & Lab / Qatar compliant scoped pages if passing gate) | **High** | High |
| **P2** | AEO & CRO | Add `40–60`-word `"Quick answer"` blocks on key landing pages, wire Clarity/DOM conversion event tracking (`tel`, `WhatsApp`, `email`, enquiry, brochure), add `/thank-you` conversion confirmation route & sticky mobile Call/WhatsApp accessibility | **High** | Medium |
| **P2** | Strategy Docs | Produce complete `/seo/*` CSV/Markdown playbook deliverables & run final multi-template mobile Lighthouse QA (`>= 90` target across Perf, A11y, BP, SEO) | **High** | Low |


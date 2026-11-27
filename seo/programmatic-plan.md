# Programmatic SEO Plan (UAE & Qatar) — Vision Energy International

> **Last updated:** November 27, 2026
> **Scope Gate:** STRICTLY Dubai, Abu Dhabi, Ras Al Khaimah / UAE, and Qatar. Zero pages for Saudi Arabia, Kuwait, Bahrain, or Oman.

## 1. URL Architecture & Quality Thresholds
- **UAE Location Pattern:** `/uae/[city]/[service]` (`generateStaticParams`, `dynamicParams = false`, `revalidate = 3600`)
- **Qatar Location Pattern:** `/qatar/[service]` (`generateStaticParams`, `dynamicParams = false`, `revalidate = 3600`)
- **Anti-Doorway / Value Gate:**
  - Minimum **400+ unique, city- or country-specific engineering words** per page (unique local soil/building profile, relevant regulatory bodies, verified product categories `LP`/`ER`/`EL`, and 3 non-duplicated location-specific FAQs).
  - Shared design system component (`src/components/locations/LocationServicePageView.tsx`) backed by verified structured records (`src/lib/data/locations.ts`).
  - **Zero fabrication rule:** Qatar pages cite ONLY international codes (`IEC 62305`, `BS EN 62305`, `IEC 62561`, `BS 7430`, `BS 7671 / IEC 60364`, `NF C 17-102`, `NFPA 780`), explicitly clarify **no local Qatar office**, and make zero unauthorized Kahramaa / Qatar Civil Defence claims (`TODO`).

---

## 2. Implemented Wave 1 (8 Pages Live Now)

| Wave | URL | City / Country | Discipline | Branch / Logistics Context |
| --- | --- | --- | --- | --- |
| Wave 1 | `/uae/dubai/lightning-protection` | Dubai, UAE | Lightning Protection | Dubai Branch + RAK HQ; references DEWA & Civil Defence context |
| Wave 1 | `/uae/dubai/earthing-grounding` | Dubai, UAE | Earthing & SPDs | Coastal/reclaimed fill soil profile, Wenner survey, DEWA |
| Wave 1 | `/uae/abu-dhabi/lightning-protection` | Abu Dhabi, UAE | Lightning Protection | Abu Dhabi Branch + RAK HQ; references ADDC, DoE, ADCDA, AD Municipality |
| Wave 1 | `/uae/abu-dhabi/earthing-grounding` | Abu Dhabi, UAE | Earthing & SPDs | Coastal sabkha/rock strata, deep-bore grids, ADDC, DoE, ADCDA |
| Wave 1 | `/uae/ras-al-khaimah/lightning-protection` | Ras Al Khaimah, UAE | Lightning Protection | RAK Head Office (RAK FTZ BC4); Etihad WE & SEWA alignment |
| Wave 1 | `/uae/ras-al-khaimah/earthing-grounding` | Ras Al Khaimah, UAE | Earthing & SPDs | Limestone/foothill gravel & coastal soil, Wenner test, Etihad WE/SEWA |
| Wave 1 | `/qatar/lightning-protection` | Qatar (Export/Project Supply) | Lightning Protection | Coordinated from UAE HQ; NO Qatar office; IEC/BS/NF C/NFPA only |
| Wave 1 | `/qatar/earthing-grounding` | Qatar (Export/Project Supply) | Earthing & SPDs | Export & BOQ supply from UAE HQ; NO Qatar office; BS 7430/IEC 60364 |

---

## 3. Wave 2 & Wave 3 Rollout Schedule (Gated Until Performance Verification)

### Wave 2 (Hold until Wave 1 reaches GSC indexing & `>= 500` monthly impressions across UAE/Qatar)
- Add **Surge Protection (SPDs)** and **Gym / Laboratory Equipment** local pages ONLY for Dubai, Abu Dhabi, Ras Al Khaimah, Sharjah, and Qatar once verified Sharjah project examples or Qatar regulator references are supplied by client (`[TODO]`).
  - `/uae/dubai/surge-protection`
  - `/uae/abu-dhabi/surge-protection`
  - `/uae/dubai/gym-equipment`
  - `/uae/abu-dhabi/gym-equipment`
  - `/uae/dubai/laboratory-equipment`
  - `/uae/abu-dhabi/laboratory-equipment`
  - `/qatar/laboratory-equipment`

### Wave 3 (Gated on Confirmed UAE Project Case Studies & Remaining Northern Emirates)
- Sharjah (`/uae/sharjah/lightning-protection`, `/uae/sharjah/earthing-grounding`) leveraging verified `SEWA` scope ONLY if Sharjah local projects/photos are supplied.
- Never publish Ajman/UAQ/Fujairah pages unless distinct project proof & >400 words of authentic non-repetitive content are supplied.

---

## 4. Internal Linking & Sitemap Policy
- Every Wave 1 page is emitted in `/sitemap.xml` (`src/app/sitemap.ts`) with `priority: 0.85` and `lastModified: 2026-11-27`.
- Cross-linked from `/services`, `/expertise/lightning`, `/expertise/earthing`, `public/llms.txt`, and sibling location navigation strips.


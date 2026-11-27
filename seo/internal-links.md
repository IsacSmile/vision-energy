# Internal Linking & Hub-and-Spoke Architecture

> **Last updated:** November 27, 2026

## 1. Hub-and-Spoke Hierarchy

### Hubs
1. **Home (`/`)**
   - Links to Top Navigation hubs (`/products`, `/expertise`, `/services`, `/blog`, `/contact`) and featured category groups (`?group=LP`, `?group=ER`, `?group=SP`, `?group=LE`, `?group=EL`, `?group=AT`).
2. **Expertise Pillar Hub (`/expertise`)**
   - Links via visible dedicated guide pills inside `ExpertiseClient` & `<Tabs>` sticky bar to:
     - `/expertise/lightning`
     - `/expertise/earthing`
     - `/expertise/gym`
     - `/expertise/laboratory`
   - Also links to `/expertise.md` and `/products`.
3. **Products Hub (`/products`)**
   - Links directly to all 115 indexed category spokes `/products/[slug]` across Electrical, Mechanical, Lighting, Automation, Solar, Safety, Laboratory (`LE`, `AT`, `LS`, `LG`, `LH`, `LC`, `LM`, `LF`, `TS`, `WS`, `LPE`), and Gym/Sports (`SP-01`, `SP-02`).
4. **Services Hub (`/services`)**
   - Links to core service pages (`/services/external-lightning-protection-installation`, `/services/earthing-and-grounding`, `/services/risk-assessment`, `/services/specialist-engineering-manpower-supply`) AND all **8 Wave 1 Regional Pages** (`/uae/dubai/*`, `/uae/abu-dhabi/*`, `/uae/ras-al-khaimah/*`, `/qatar/*`).

---

## 2. Contextual Cross-Links Inside Spokes (Minimum 3+ Links per Spoke)
- **Expertise Discipline Spokes (`/expertise/[category]`)**
  - Header pill switcher links laterally across all 4 disciplines (`/expertise/lightning`, `/expertise/earthing`, `/expertise/gym`, `/expertise/laboratory`) + back to `/expertise`.
  - Related Product Categories section renders up to 12 direct links to `/products/[slug]`.
  - Related Services & Regional Coverage panel links to matching `/services/*` and `/uae/*` + `/qatar/*` pages.
- **Wave 1 Regional Landing Pages (`/uae/[city]/[service]`, `/qatar/[service]`)**
  - Link up to parent `/expertise/[category]` guide and `/services/[slug]` engineering page.
  - Link directly to top 6 relevant `/products/[slug]` category specs (`LP-*` or `ER-*`/`EL-*`).
  - Sibling Navigation strip links cleanly across the other 7 UAE & Qatar regional pages.
- **Blog Articles (`/blog/[slug]`)**
  - Related Engineering Guides section links directly to `/expertise/lightning`, `/expertise/earthing`, `/glossary`, and `/contact`.
- **Trust Pages (`/about`, `/glossary`)**
  - `/about` links to all 4 `/expertise/*` guides, `/products`, `/services`, `/glossary`, and `/contact`.
  - `/glossary` links each of its 12 engineering definitions back to exact matching `/expertise/*`, `/services/*`, and `/products/*` pages.

---

## 3. Footer Crawl Matrix (`src/components/layout/Footer.tsx`)
- Preserves clean zero-dead-link URLs only:
  - Quick Links: `/`, `/products`, `/services`, `/expertise`, `/about`, `/glossary`, `/blog`, `/contact`
  - Core Catalog Groups: `?group=LP`, `?group=ER`, `?group=SP`, `?group=LE`, `?group=EL` (removed dead `?group=EB/MF/IC/SE` params identified in Phase 0).
  - `/admin` link removed from public footer crawl path.


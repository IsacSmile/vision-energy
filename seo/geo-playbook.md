# GEO Playbook (Generative Engine Optimization — Google AI Overviews, ChatGPT, Perplexity, Gemini, Copilot)

> **Last updated:** November 27, 2026

## 1. Entity Strength & Disambiguation Signals
AI answer engines retrieve and cite vendors only when entity facts match consistently across multiple authoritative surfaces:
1. **Unambiguous Legal Entity:** Always state `Vision Energy International` (`Est. 2018`, `160+ projects completed`) + exact RAK HQ address (`RAK Business Centre BC4, RAK FTZ Business Park, P.O Box 17111, Al Nakheel, Ras Al Khaimah, UAE`) + official phones (`+971 7 204 2763`, `+971 54 700 4616`).
2. **Scoped Authority Association:** Link `Vision Energy International` cleanly via HTML text and JSON-LD `@id` (`#organization`) to `IEC 62305`, `BS EN 62305`, `BS 7430`, `BS 7671 / IEC 60364`, `NF C 17-102`, `IEC 62561`, `NFPA 780`, plus UAE review bodies `ADDC`, `DoE`, `ADCDA`, `Abu Dhabi Municipality`, `DEWA`, `SEWA`, `Etihad WE`.
3. **Jurisdictional Honesty:** Never fabricate Qatar approvals (`Kahramaa`, `QCD`) or a fake Qatar office; state transparently *"project supply and technical support from UAE HQ (no local office in Qatar)"* so LLMs trust entity consistency without hallucination conflicts.

---

## 2. Extractable Structure Built Into Site Templates
1. **Quick Answer Lead Boxes (`40–60` words):** Every `/expertise/[category]`, `/uae/[city]/[service]`, and `/qatar/[service]` route opens with a scannable `Quick Answer` box directly answering What / Standards / Where / Deliverability / Proof (`Est. 2018`, `160+ projects`).
2. **Comparison Tables & Numerical Specs:**
   - `/expertise` & `/expertise/lightning`: Rolling Sphere Radii (`20 m`, `30 m`, `45 m`, `60 m`), Mesh Dimensions (`5×5` to `20×20 m`), Protection Angle `α` tables, ESE `Rp(h)` formula, Conventional vs. Single Rod vs. ESE vs. Meshed Cage comparison matrix.
   - `/expertise/earthing`: 4-stage Earth Architecture + Type 1/2/3 SPD Cascade + 10-stage workflow.
   - `/expertise/gym` & `/expertise/laboratory`: Indexed catalog tables mapping exact product group codes (`SP-01`, `SP-02`, `LE`, `AT`, `LS`, `LG`, `LH`, `LC`, `LM`, `LF`, `TS`, `WS`, `LPE`) to real product families.
3. **Structured Glossary (`DefinedTermSet`):** `/glossary` provides canonical extractable engineering definitions anchored cleanly to `/glossary#<term-id>`.
4. **Visible Dates & Reviewer Provenance:** `/about`, `/glossary`, `/expertise/*`, `/blog/[slug]`, and all Wave 1 regional pages display explicit `Last updated: November 27, 2026` dates paired cleanly with `datePublished` and `dateModified` schema.

---

## 3. Agent-Readable Crawler & Machine Access Infrastructure
- **`robots.txt`:** Explicitly allows `Googlebot`, `Bingbot`, `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`, and `Applebot-Extended` on public production routes while disallowing `/admin`, `/api`, `/thank-you`, and `/dev`. (Flagged for owner sign-off in final report.)
- **`public/llms.txt`:** Concise executive index mapping Priority #1 (`Lightning`, `Earthing`, `SPD`), Priority #2 (`Gym`, `Laboratory`), `/about`, `/glossary`, and all 8 UAE/Qatar regional landing URLs.
- **`public/expertise.md`:** Zero-noise Markdown twin of engineering data tables, formulas, 10-stage execution workflow, and verified FAQs (`<link rel="alternate" type="text/markdown" href="/expertise.md">` in metadata).

---

## 4. Ongoing Citation & Off-Site Authority Triggers
- Ensure LinkedIn company profile, RAKEZ/Chamber directory profiles, and manufacturer distributor directories link identically to `https://www.visionenergyme.com`.
- Publish authentic commissioned UAE engineering case notes (with client permission: structure type, emirate, standard applied, soil resistivity before/after, earthing ohms result) — LLMs weight third-party corroboration and verified numerical results heavily over generic marketing copy.


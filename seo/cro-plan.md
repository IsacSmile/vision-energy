# Conversion Rate Optimization (CRO) Plan — Vision Energy International

> **Last updated:** November 27, 2026
> **Primary Conversion Goal:** Qualified engineering enquiries via Phone Call (`+971 7 204 2763`), WhatsApp (`+971 54 700 4616`), or Structured Quote Forms (`/contact`, Product & Service Modals) across UAE & Qatar.

## 1. Conversion Friction Fixes Implemented

| Surface | Issue Found in Phase 0 | Fix Implemented |
| --- | --- | --- |
| Sticky WhatsApp & Phone | Header/Sticky widget cited wrong mobile `+971 50 768 6700`; mobile users scrolled past CTAs | Normalized to `+971 54 700 4616` (`wa.me/971547004616`) & added persistent `<sm` **Call Office** + **WhatsApp** bottom bar in `StickyContactWidget.tsx` |
| Location Dropdowns | Forms excluded Qatar (`Emirate` select had UAE Emirates only; labels said `UAE *`) | Added `'Qatar'` in `dictionary.emirates` (feeds `ContactFormClient`, `EnquiryModal`, `ProductPreviewModal`) & updated labels to `Phone / WhatsApp *` |
| Post-Submit Funnel & Analytics | Forms displayed only an inline box without destination URL or conversion analytics | Created `/thank-you` (`noindex, nofollow`) showing Reference ID + instant Call/WhatsApp escalations; wired `trackConversion('enquiry_submit')` + `thank_you_view` across all forms |
| Global Call / Mail / Spec Click Tracking | No click event attribution | Added global delegated event tracking (`phone_click`, `whatsapp_click`, `email_click`, `brochure_click`) inside `src/components/common/AnalyticsAndConsent.tsx` firing via `window.clarity` and `window.dataLayer` upon consent |
| Product Preview & Submittal Confidence | Modal zoomed or truncated highlights cleanly | Preserved verbatim bullet points (`international standards`, `datasheets & CAD drawings`, `ex-stock subject to prior sale`, `customisation subject to lead times`) + direct quote flow |

---

## 2. Trust Signals Grounded Strictly in Verified Facts
- **Hero, Footer, `/about`, `/expertise/*`, Wave 1 pages** prominently display ONLY verified credentials:
  - `Est. 2018`
  - `160+ Projects Completed`
  - `Ras Al Khaimah Head Office (RAK FTZ Business Park)` + `Dubai & Abu Dhabi Branches` + `Qatar Supply`
  - Zero fabricated star ratings, client logos, or response SLA promises unless confirmed by business owner.

---

## 3. Recommended CRO Experiments (Post-Launch Backlog)
1. **Quote Form Field Reduction Test (A/B via Clarity + GA4):** Test hiding non-essential optional company/date fields behind `+ Optional details` on `/contact` (already implemented on `EnquiryModal`!) to benchmark mobile completion uplift.
2. **Hero Primary CTA Split (`/` & `/expertise`):** Monitor `Explore Products` vs `Request Engineering Submittal` click-through rates per landing page using Microsoft Clarity heatmaps once consented sessions accumulate.
3. **BOQ File Upload (`TODO`):** Add optional PDF/DWG/XLSX BOQ attachment field inside `/contact` & `EnquiryModal` (requires secure object-storage virus/size validation) so MEP estimators can upload schedules directly.


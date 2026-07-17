# Conversion Analytics Phase 3D - Funnel Reporting and Monthly Dashboard

Date: 2026-07-17 (Asia/Shanghai)

## Scope

This phase established the first repeatable GA4 inquiry-funnel reporting baseline for DualCoreLink. It reviewed current event availability, created a funnel exploration, defined monthly reporting views, and documented the minimum evidence needed before drawing conversion conclusions.

No website code, GA4 property, data stream, measurement identifier, consent behavior, advertising setting, infrastructure, CMS content, or DNS configuration was changed.

## Data Availability

GA4 was checked in Realtime, standard Events reporting, Key events, and Explore.

| Reporting window | Users | Event count | Key events | Interpretation |
| --- | ---: | ---: | ---: | --- |
| Realtime, past 30 minutes | 0 | 0 | 0 | No active production traffic during the review window |
| Past 7 days | 0 | 0 | 0 | Early baseline; insufficient for analysis |
| Past 28 days | 0 | 0 | 0 | Early baseline; insufficient for analysis |
| Since GA4 launch | 0 processed rows currently visible | 0 processed rows currently visible | 0 processed rows currently visible | Reporting processing and new-site traffic volume must be rechecked |

The standard Events report for 2026-06-19 through 2026-07-16 contained no event rows. Therefore no page, source type, slug, CTA location, device, or channel was ranked, and no stable conversion rate was calculated.

The earlier Phase 3C controlled QA confirmed that production collection can emit `page_view`, `inquiry_cta_click`, `form_start`, `scroll`, and `inquiry_form_submit`. Those QA events are not treated as customer behavior or used to manufacture a performance baseline.

`whatsapp_quote_click` and `email_inquiry_click` were not present in the current reporting window. They remain optional channel metrics only after processed rows appear.

## Funnel Exploration

A GA4 Funnel Exploration was created with the name:

`DualCoreLink Inquiry Funnel`

Configuration:

| Step | Event condition | Purpose |
| --- | --- | --- |
| Inquiry CTA Click | `inquiry_cta_click` | A visitor selects a tracked inquiry CTA |
| Contact Page View | `page_view` following the CTA step | The visitor reaches the next page in the inquiry journey |
| Form Start | `form_start` | The visitor begins the Contact form |
| Inquiry Form Submit | `inquiry_form_submit` | The internal inquiry draft flow completes |

- Funnel type: closed, standard funnel.
- Step relationship: indirect following, allowing normal navigation between steps.
- Breakdown: Device category, supporting mobile, desktop, and tablet comparison.
- Date range at creation: past 28 days.
- Result at creation: no data.

The Contact Page View step currently uses the page-view event that follows the inquiry CTA. When processed traffic is available, the next monthly review should confirm whether adding a Contact path constraint improves accuracy without fragmenting the low-volume dataset.

## Monthly Dashboard

The monthly dashboard should contain five views.

### 1. Funnel Overview

- Inquiry CTA clicks
- Contact page views after CTA clicks
- Form starts
- Inquiry form submissions
- CTA click to form-start progression
- Form-start to submission progression
- CTA click to submission progression

Rates must display `N/A` when their denominator is zero. Early results should be described as directional until there is enough non-QA traffic to avoid conclusions from one or two actions.

### 2. Source Performance

Primary dimension: `source_type`

Expected groups:

- Product
- Resource
- Solution
- Global

Metrics:

- `inquiry_cta_click`
- `form_start`
- `inquiry_form_submit`
- Users
- Sessions

### 3. Content and CTA Performance

Dimensions:

- `source_slug`
- `cta_location`
- `category`

Use this view to identify pages and CTA placements that generate qualified movement toward Contact. Do not rank a slug from internal QA traffic or from a single isolated event.

### 4. Device Performance

Dimension: Device category

Compare:

- CTA clicks
- Form starts
- Form submissions
- Funnel completion

Mobile and desktop differences should be reviewed together with the Contact page's responsive QA and traffic mix, rather than interpreted as a UX defect from conversion rate alone.

### 5. Inquiry Channel Mix

Events, when available:

- `inquiry_form_submit`
- `whatsapp_quote_click`
- `email_inquiry_click`

The events represent entry or draft actions, not confirmed sales leads or sent messages. Channel totals must not be described as revenue, orders, or delivered inquiries without a separate CRM or mailbox confirmation process.

## KPI Definitions

| KPI | Definition |
| --- | --- |
| CTA-to-form-start rate | `form_start` users divided by `inquiry_cta_click` users in the funnel |
| Form completion rate | `inquiry_form_submit` users divided by `form_start` users |
| CTA-to-submit rate | `inquiry_form_submit` users divided by `inquiry_cta_click` users |
| Source contribution | Share of inquiry CTA clicks or submissions attributed to each `source_type` |
| CTA placement contribution | Share of inquiry CTA clicks or submissions attributed to each `cta_location` |
| Channel mix | Relative counts of form-draft, WhatsApp, and email inquiry entry events |

Use users for progression rates to reduce distortion from repeated clicks. Event count remains useful for detecting repeat interaction or accidental duplicate dispatch.

## Privacy Controls

Only the approved attribution and page context fields may be used:

- `source_type`
- `source_slug`
- `cta_location`
- `category`
- `page_path`

Reports must not include or request name, email, phone, WhatsApp number, company, message, file name, source title, or user-entered project content. Consent denial continues to prevent Google Tag loading; no consent or advertising setting was changed during this phase.

## Monthly Operating Rule

- Reporting period: previous calendar month, with a comparison to the preceding month when both contain real traffic.
- First recheck: 2026-08-17, or after 30 days of processed consented traffic, whichever is later.
- Exclude or annotate known internal QA dates.
- Record the exact date range and GA4 processing status.
- Use `N/A`, not `0%`, when a denominator is zero.
- Separate observations from recommendations.
- Require supporting page QA before describing a device difference as a design issue.
- Do not claim lead quality, revenue, or ROI from GA4 interaction events alone.

The repeatable procedure is documented in `docs/runbooks/ga4-monthly-inquiry-funnel-reporting.md`.

## Findings

Current processed data is insufficient to answer which page, source type, slug, CTA location, device, or inquiry channel performs best. This is the correct early-baseline conclusion, not a tracking failure diagnosis: Phase 3C already established controlled collection evidence, while standard reporting currently has no rows available for behavioral analysis.

The immediate operational priority is to let consented production traffic accumulate, confirm processed custom-dimension values, and run the same dashboard after the first complete reporting period.

## Unchanged Items

- GA4 property and Web Data Stream
- Measurement identifier
- Consent implementation
- Google Signals and advertising personalization
- Google Ads linkage and enhanced conversions
- Website code and content
- AWS, DNS, Cloudflare, Nginx, and WordPress
- Product, Solution, and Resource URLs

## Final Status

Phase 3D has an operational reporting structure and a saved inquiry funnel. It remains an early baseline because GA4 standard reporting currently contains no processed production rows. The phase should be considered reporting-ready, with performance conclusions deferred until the scheduled data recheck.

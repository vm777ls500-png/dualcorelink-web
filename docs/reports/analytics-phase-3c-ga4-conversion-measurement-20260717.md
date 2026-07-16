# Analytics Phase 3C - GA4 Conversion Measurement

Date: 2026-07-17 (Asia/Shanghai)

## Scope

Phase 3C connected the existing Phase 3A/3B inquiry event model to GA4, added explicit analytics consent, preserved B2B source attribution, and verified the AWS production deployment. No product, Resource, Solution, WordPress, DNS, Cloudflare, Nginx, sitemap, or schema data was changed.

## Files Changed

- `.github/workflows/aws-production-deploy.yml`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/analytics/ga4-consent.tsx`
- `src/lib/analytics/ga4.ts`
- `src/lib/inquiry/events.ts`
- `tests/ga4-analytics.test.ts`

## Configuration

- The public GA4 measurement identifier is supplied at build time through `NEXT_PUBLIC_GA4_MEASUREMENT_ID`.
- The identifier has no repository default and its value is not stored in Git or this report.
- The AWS build environment file remains mode `0640`, owned by `deploy:dualcorelink-deploy`.
- The workflow validates the identifier format, masks the value in Actions logs, and exports it only for the build.
- The final static release contains the build-time value; the repository does not.

## Consent and Privacy

- Default consent is `denied` for analytics storage, ad storage, ad user data, and ad personalization.
- Google Tag is not loaded until the visitor chooses **Allow analytics**.
- **Continue without analytics** leaves the Google Tag script unloaded.
- Visitors can reopen **Analytics preferences** and change the choice.
- The choice persists across reloads when browser storage is available.
- Google Signals and ad personalization signals are disabled.
- Page-view URLs omit query strings to avoid transmitting inquiry attribution query values.

## Event Mapping

The existing event flow remains available through `window.dataLayer` and `dualcorelink:inquiry`. With consent granted, one matching GA4 event is emitted:

- `inquiry_cta_click`
- `inquiry_form_submit`

Allowed application parameters:

- `source_type`
- `source_slug`
- `cta_location`
- `category`
- `page_path`

No name, email, phone, WhatsApp number, company, message, file name, source title, or form contents are sent. Google Tag may append its own internal `gtm.uniqueEventId`; this is Google runtime metadata, not an application payload field.

## Local Validation

- `npm.cmd run lint`: passed.
- `npm.cmd run test:data`: 47/47 passed.
- `npm.cmd run build`: passed.
- Static pages: 155.
- Products: 36.
- Resources: 14.
- Sitemap URLs: 75.
- Product JSON-LD: 36/36.
- Article JSON-LD: 14/14.
- Resource BreadcrumbList: 14/14.
- `git diff --check`: passed.
- The real measurement identifier occurred zero times in the tracked worktree.

Automated tests confirm that denied consent sends zero GA4 inquiry events, granted consent sends exactly one event, and only the approved non-PII parameter set is mapped.

## Deployment

Implementation commit:

- `4b8f0b3a02215dab5fede93f895d0bb195d8a431` - `feat: add consent-aware ga4 conversion tracking`

Production network QA found that copied JavaScript arrays were not accepted as native Google Tag commands. This was corrected without changing the analytics model:

- `9ebcb17ae05d0b630f6f398fca42e8c6b58be819` - `fix: queue native gtag commands`

Final deployment:

- GitHub Actions run: `29517162611`
- Run URL: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29517162611`
- Runner: `dualcorelink-production`
- Attempt: 1
- Result: success
- Exact source SHA: `9ebcb17ae05d0b630f6f398fca42e8c6b58be819`
- Release: `/srv/dualcorelink/frontend/releases/9ebcb17ae05d-20260717-005050`
- Previous release: `/srv/dualcorelink/frontend/releases/4b8f0b3a0221-20260717-003713`
- Atomic symlink switch: passed
- Health check: passed
- Rollback: not required

## Production QA

- Initial page: consent dialog visible, Google Tag script count 0.
- Denied choice: Google Tag script count 0.
- Granted choice: Google Tag script count 1; script HTTP 200.
- Consent default command was queued before GA4 config.
- Page view emitted once and excluded the URL query string.
- One tracked CTA produced one internal event and one GA4 event.
- A product-attributed Email CTA preserved `source_type`, `source_slug`, `cta_location`, and `category` in the GA collect request.
- A synthetic, non-PII `inquiry_form_submit` collect returned HTTP 204.
- PII keys found in event payloads: 0.
- Browser runtime exceptions: 0.
- Responsive consent QA at 375, 390, 430, 768, and 1280 px: 5/5 passed.
- Horizontal overflow: 0.
- Consent action buttons: 44 px minimum height; preferences button: 40 px.

Full sitemap regression:

- URLs checked: 75/75.
- HTTP failures: 0.
- HTTP 5xx: 0.
- Products: 36.
- Resources: 14.
- Product JSON-LD: 36/36.
- Article JSON-LD: 14/14.
- Resource BreadcrumbList: 14/14.
- Empty `href="#"`: 0.
- Localhost, SiteGround, `pages.dev`, and `cms-aws` leakage: 0.
- Production `noindex`: 0.

## GA4 Administration Status

The signed-in GA4 property was confirmed to match the configured website measurement identifier. At the time of acceptance, the new property home screen still reported that no website data had been received, despite production GA collect requests returning successfully. GA4 Realtime/DebugView display and the following administration actions therefore remain pending until Google finishes processing the first events:

1. Mark `inquiry_form_submit` as the primary key event.
2. Keep `inquiry_cta_click` as a supporting funnel event, not a key event.
3. Register event-scoped custom dimensions for `source_type`, `source_slug`, `cta_location`, and `category`.
4. Recheck Realtime and DebugView after processing; do not use real customer details for the check.

This pending Google-side administration state does not block production collection, but Phase 3C should not be described as fully closed until the key event and custom dimensions are visible and confirmed.

## Monthly Measurement Baseline

Review monthly:

- `inquiry_form_submit` key events.
- `inquiry_cta_click` by category (`form`, `whatsapp`, `email`).
- CTA clicks and form submits by source type and source slug.
- CTA-to-form-submit ratio by Product, Resource, and Solution source.
- Landing pages that contribute to inquiry actions.

Use only aggregated analytics data. Never join GA4 event data to contact-form PII.

## Known Observation

The existing development-only nested Layout hydration warning was not introduced by Phase 3C. It does not affect the static production build. It remains a separate technical-debt item.

## Final Status

Application implementation, AWS deployment, consent behavior, event delivery, privacy validation, responsive QA, and production regression passed. GA4 management-side Realtime/DebugView visibility, key-event marking, and custom-dimension registration remain pending Google processing and must be confirmed before declaring Phase 3C fully complete.

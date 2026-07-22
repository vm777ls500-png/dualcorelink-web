# Conversion Reliability Phase 6A - Inquiry Delivery Audit

## Scope

This phase audited and corrected the English Contact inquiry flow from CTA attribution through local email-draft handoff. It did not add a server submission API, SMTP provider, CRM, database write, or attachment upload. Production QA was read-only and did not submit a form, send email, open WhatsApp, or use customer data.

Implementation commit: `dbc6ed4b0c8759fb276cbad5e3c09cf68843521d` (`fix: improve inquiry delivery reliability`).

## Submission Architecture

- Entry point: `/en/contact/#get-a-quote` with optional Product, Resource, Solution, or global CTA attribution.
- Frontend component: `src/components/contact/get-quote-form.tsx`.
- Validation and draft construction: `src/lib/inquiry/email-draft.ts`.
- Transport: the browser opens a local `mailto:` draft after client-side validation.
- HTTP request, server action, API endpoint, SMTP service, and backend receipt: none.
- Mailbox delivery and final receipt therefore cannot be inferred from the website state.

The lifecycle is deliberately distinguished as follows:

1. Frontend validation can pass or fail.
2. Email-draft handoff can open or fail locally.
3. Server acceptance does not exist in the current architecture.
4. Email delivery is controlled by the user's mail client and provider.
5. Mailbox receipt remains unverified until a safe internal end-to-end test is authorized.

## Field Rules

The form keeps the existing business fields. Five controls remain required and optional values are omitted from the generated draft when blank. Production inspection confirmed 21 controls, all associated through wrapping labels, and no file input.

## Success Semantics

The primary command is now `Prepare Email Draft`. The UI no longer claims that an inquiry has been sent, delivered, or will receive a reply within a fixed period. Draft-ready feedback explains that the user must review and send the message in their email application.

The `inquiry_form_submit` action remains reserved for a future server-accepted submission. The current flow emits `email_draft_open` only after the browser handoff is attempted.

## Error Handling

Draft preparation and browser handoff are guarded with recoverable UI states: `idle`, `preparing`, `draft_ready`, and `error`. A handoff error does not clear entered fields. The button returns to an enabled state so the user can retry manually. Direct email and WhatsApp links remain available as fallbacks.

Backend-specific HTTP 400, 413, 429, 500, malformed JSON, SMTP failure, and network timeout cases are not applicable because this phase does not send an HTTP submission request. They must be implemented and tested if a server endpoint is added later.

## Timeout

No submission timeout is configured because there is no network request. Adding a synthetic timeout would misrepresent the current local handoff architecture.

## Duplicate Prevention

A single-flight gate prevents repeated click or Enter activation while draft preparation is in progress. The button is disabled during that interval and becomes available again after success or failure. No automatic retry is performed.

## Attachment Handling

The previous file input was nonfunctional because no upload transport existed. It has been removed. The production page now states that the website does not upload files and instructs the user to attach drawings or schedules manually in the email application. No attachment bytes, names, MIME data, or local paths are processed or logged.

## PII Review

Analytics payloads remain limited to approved attribution metadata: source type, source slug, CTA location, category, and page path. Tests verify that name, email, phone, company, message, filename, source title, and WhatsApp number are not emitted. Form contents are not placed in URL query parameters, console output, or a server log by this implementation.

## GA4 Review

The existing consent-aware analytics behavior is unchanged. The current draft flow uses the PII-safe `email_draft_open` action. It does not falsely emit a server submission event. No Measurement ID or consent default was changed.

## Attribution Review

Production read-only checks confirmed:

- A real Product CTA carries the correct product slug and `product_hero` location to Contact.
- Contact displays a readable Product source notice and pre-fills the project message.
- Missing or invalid source data falls back to a direct contact inquiry.
- The fallback does not display technical parameter names or invalid source content.
- The `#get-a-quote` target is present and reached by the attributed URL.

## WhatsApp

HTTPS WhatsApp fallback links remain present on Contact and Product pages. Their attribution payload is generated without form PII. No WhatsApp link was opened and no message was sent during production QA.

## Email

The production Contact page exposes the new draft command and direct email fallback. Draft subject/body generation, optional-field omission, encoding, and readable attribution are covered by automated tests. No mail client was opened and no email was sent during production QA.

## End-to-End Delivery

End-to-end mailbox delivery is **pending**. No safe internal test mailbox was supplied, and the phase rules prohibit sending a real test inquiry. The audit therefore makes no claim of server acceptance, email-provider delivery, or mailbox receipt.

## Accessibility

- All 21 production form controls are label-associated.
- The command has a stable 50 px height at the tested responsive widths.
- Dynamic success and error states use accessible status/alert semantics in the implementation.
- Enter and click share the same duplicate-prevention path.
- Error recovery retains the form values.
- Five responsive production checks found no horizontal overflow.

## Issues Found

1. The old interface presented a submission-style success promise without a server acceptance signal.
2. `inquiry_form_submit` could be emitted for a local mailto handoff.
3. The file control implied an upload that did not exist.
4. Repeated activation was not explicitly single-flight guarded.
5. Failure and recovery semantics were not clearly separated from delivery.

## Code Changes

- Added `src/lib/inquiry/email-draft.ts` for validation, draft construction, optional-field omission, and duplicate gating.
- Updated `src/components/contact/get-quote-form.tsx` with truthful states, draft handoff, retained values, attachment guidance, and fallbacks.
- Updated `src/lib/inquiry/events.ts` with `email_draft_open` while reserving `form_submit` for a future real submission.
- Added `tests/inquiry-delivery.test.ts` for validation, attribution, duplicate prevention, event privacy, attachment guidance, and fallback URL behavior.

## Tests

- `npm ci`: passed.
- Product media audit: 36 products, 132 full images, 132 thumbnails, 264 WebP assets, 0 errors, 1 pre-existing reshoot warning.
- Lint: passed.
- Data tests: 76/76 passed.
- Build: passed; static generation 156/156 and export cleanup completed.
- Sitemap: 76 URLs.
- Product JSON-LD: 36/36.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.
- Export leakage: localhost, `127.0.0.1`, SiteGround, `pages.dev`, `cms-aws`, `aws.dualcorelink.com`, and empty `href="#"` all 0.

## Deployment

- GitHub Actions run: [29761156515](https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29761156515).
- Exact source SHA: `dbc6ed4b0c8759fb276cbad5e3c09cf68843521d`.
- Result: successful.
- Checkout, environment preparation, `npm ci`, lint, data validation, media audit, static build, atomic release deployment, and test-domain indexing protection all passed.
- Internal and external health checks passed in the atomic deployment step.
- Rollback was not triggered.
- A new release was created and activated; the exact server release path was not exposed by the available read-only Actions summary and is not guessed here.

## Production QA

Read-only QA used the Codex in-app browser on the public production site.

- Contact loaded with the expected title, self-canonical, and no production `noindex`.
- `Prepare Email Draft`, manual attachment guidance, direct email fallback, and WhatsApp fallback were present.
- The fixed reply-time promise and file input were absent.
- Product listing exposed 36 unique Product detail links.
- Resource listing exposed 15 unique Resource detail links.
- The representative Product page loaded with Product JSON-LD, self-canonical, no `noindex`, valid inquiry attribution links, no broken images, and no horizontal overflow.
- Real Product attribution and invalid/missing-source fallback both behaved correctly.
- Contact QA at 375, 390, 430, 768, and 1280 CSS viewport targets found the form, header, footer, source notice, and 50 px draft button present; horizontal overflow and broken images were 0 at every width.
- Production browser console warnings/errors attributable to the site: 0.
- The in-app browser client blocked direct XML-tab navigation to `/sitemap.xml`; the 76-URL sitemap baseline is instead supported by the successful build and deployment validation and is not represented as an XML-browser inspection.
- No form submission, mail client launch, WhatsApp launch, or external message occurred.

## Pending Items

1. Decide whether local email-draft handoff remains the intended business workflow or whether a server-accepted inquiry endpoint is required.
2. If server submission is added, define authenticated transport, timeout, non-2xx handling, idempotency, attachment limits, privacy-safe logs, delivery monitoring, and mailbox-level verification.
3. Run one non-PII end-to-end test only after a dedicated internal mailbox and explicit sending authorization are available.
4. Record the exact activated release path from authenticated server or Actions logs if operational traceability requires it.

## Risks

- A prepared draft can still be closed without being sent.
- The website cannot currently know whether the user's mail client opened, sent, delivered, or reached the business mailbox.
- Browser or OS mail-handler configuration can block the handoff; direct email and WhatsApp fallbacks reduce but do not eliminate that risk.
- There is no server-side failure alert or delivery monitoring because there is no server-side submission.

## Final Status

The Phase 6A code correction, automated validation, AWS deployment, and read-only public production QA passed. The phase is accepted as a truthful and recoverable email-draft workflow. It is not accepted as a verified server-side inquiry delivery system; mailbox receipt remains an explicit pending item.

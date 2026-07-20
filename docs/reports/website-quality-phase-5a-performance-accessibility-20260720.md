# Website Quality Phase 5A - Performance and Accessibility Audit

Date: 2026-07-20

## Scope

Phase 5A audited the English production site across performance, Core Web Vitals laboratory proxies, accessibility, keyboard use, responsive behavior, product galleries, the contact form, cookie consent, navigation, footer links, and inquiry calls to action. The review covered 15 representative page types, 30 page-and-viewport browser checks, and 60 product-gallery viewport combinations.

The audit found a small set of evidence-backed accessibility issues. The implementation made only the corresponding semantic and CSS cascade fixes. It did not change URLs, slugs, canonical URLs, redirects, the sitemap, product content, image ownership, gallery ordering, analytics consent behavior, infrastructure, dependencies, or production data.

## Lab vs Field Data

- Lighthouse results in this report are laboratory measurements, not real-user Core Web Vitals.
- Lighthouse version: 13.4.0.
- Production runs used the installed Google Chrome in headless mode.
- Three independent runs were completed for each representative page and form factor; reported baseline values are medians rather than the best run.
- The representative Lighthouse pages were the homepage, an RCU product detail page, and Contact.
- A post-deployment Lighthouse run was repeated for every page/form-factor combination to verify the accessibility fixes.
- GSC or CrUX field Core Web Vitals were not available to this audit and are recorded as unavailable. No lab value is presented as field data.

## Pages Tested

The browser audit covered these 15 page types at 390 px and 1280 px:

1. Homepage
2. Products listing
3. RCU product
4. AI Display product
5. Smart Panel product
6. Sensor product
7. Robot product
8. Resources listing
9. Resource detail
10. Solutions listing
11. Solution detail
12. Region detail
13. Case Study detail
14. Contact
15. FAQ

All 30 page checks returned HTTP 200 and passed the audited language, H1, heading-order, landmark, control-name, image-alt, duplicate-ID, overflow, and layout-shift checks.

## Lighthouse Method

The initial production baseline comprised 18 Lighthouse runs: three pages multiplied by mobile and desktop, with three independent runs for each combination. Network requests, transfer sizes, JavaScript and image transfer, FCP, LCP, TBT, CLS, Speed Index, Accessibility, Best Practices, and SEO were extracted from the JSON reports. The implementation was then deployed and six production runs confirmed the corrected accessibility behavior.

## Performance Results

Initial production medians:

| Page | Form | Performance | Accessibility | Best Practices | SEO | FCP | LCP | TBT | CLS | Speed Index | Requests | Transfer | JS | Images |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Homepage | Mobile | 97 | 96 | 100 | 100 | 1.84 s | 2.14 s | 67 ms | 0 | 2.83 s | 25 | 257 KB | 147 KB | 0 KB* |
| Homepage | Desktop | 93 | 96 | 100 | 100 | 1.07 s | 1.34 s | 0 ms | 0 | 1.32 s | 36 | 622 KB | 148 KB | 350 KB |
| RCU product | Mobile | 98 | 96 | 100 | 100 | 1.84 s | 1.99 s | 26 ms | 0 | 2.74 s | 31 | 279 KB | 146 KB | 27 KB |
| RCU product | Desktop | 95 | 96 | 100 | 100 | 1.06 s | 1.10 s | 0 ms | 0 | 1.27 s | 34 | 294 KB | 146 KB | 27 KB |
| Contact | Mobile | 98 | 97 | 100 | 100 | 1.85 s | 2.00 s | 25 ms | 0 | 2.47 s | 25 | 696 KB | 147 KB | 446 KB |
| Contact | Desktop | 96 | 97 | 100 | 100 | 1.07 s | 1.11 s | 0 ms | 0 | 1.21 s | 27 | 711 KB | 147 KB | 446 KB |

`*` The mobile homepage run did not scroll far enough to load below-fold lazy images; this is expected and is not a statement that the page contains no images.

Post-deployment production confirmation:

| Page | Form | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS | Contrast |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| Homepage | Mobile | 99 | 100 | 100 | 100 | 1.41 s | 28 ms | 0 | Passed |
| Homepage | Desktop | 92 | 100 | 100 | 100 | 1.20 s | 0 ms | 0 | Passed |
| RCU product | Mobile | 97 | 100 | 100 | 100 | 1.99 s | 24 ms | 0 | Passed |
| RCU product | Desktop | 99 | 100 | 100 | 100 | 0.38 s | 0 ms | 0 | Passed |
| Contact | Mobile | 99 | 100 | 100 | 100 | 1.26 s | 23 ms | 0 | Passed |
| Contact | Desktop | 94 | 100 | 100 | 100 | 1.11 s | 0 ms | 0 | Passed |

Performance score variation between runs is expected laboratory variance. No post-deployment result showed a Core Web Vitals laboratory regression.

## Core Web Vitals

- LCP: initial production medians were 1.10-2.14 seconds; post-deployment observations were 0.38-1.99 seconds.
- CLS: 0 in every Lighthouse median, all 30 page checks, and all 60 gallery combinations.
- INP: unavailable from Lighthouse lab runs and unavailable as field data.
- TBT laboratory proxy: 0-67 ms in baseline medians and 0-28 ms after deployment.
- Product hero images retain eager loading, high fetch priority, and explicit dimensions.
- Gallery image containers retain a stable 4:3 aspect ratio, preventing shifts when the active image changes.

## Image Performance

- Product media audit: passed with 0 errors and the existing 1 warning.
- Production WebP verification: 264/264 returned HTTP 200 with `image/webp` MIME.
- Full images: 132; thumbnails: 132.
- Product hero images use eager loading and high fetch priority.
- Noninitial active gallery images and thumbnail files use lazy loading.
- Thumbnails use dedicated thumbnail assets rather than hidden full-size originals.
- Images use explicit width and height values; gallery presentation uses `object-fit: contain` and a stable aspect ratio.
- The browser audit found 0 broken images and 0 duplicate or failed image requests in the audited interactions.
- Lighthouse found no modern-image, offscreen-image, or responsive-image savings in the representative baseline.
- The Contact page's larger transfer is primarily its existing image content. The evidence did not justify recompressing the complete image library in this phase.

## JavaScript Review

- Representative JavaScript transfer was approximately 146-148 KB.
- TBT remained low, and gallery, menu, consent, CTA, and contact interactions remained responsive.
- Lighthouse estimated approximately 43-44 KB of potentially unused JavaScript on the homepage. This is a future code-splitting opportunity, not a current release blocker.
- No JavaScript feature was disabled, and no new dependency was introduced.

## Accessibility Automation

The initial Lighthouse runs consistently identified one automated failure class: insufficient text contrast on inherited-color CTA links. The custom page audit also verified page language, a unique H1, heading order, landmarks, labels, accessible names, image alternatives, duplicate IDs, horizontal overflow, and CLS.

After deployment:

- Lighthouse Accessibility: 100 on all six representative production checks.
- Color contrast: passed on all six checks.
- Page audit failures: 0/30.
- Skip-link coverage: 30/30.
- Console errors: 0.
- Network failures: 0.

## Keyboard Review

- The first Tab stop is now `Skip to main content`, targeting `#main-content`.
- Visible focus styles remain defined across navigation, CTA, card, gallery, form, and footer controls.
- The consent region is nonmodal and does not claim a focus trap.
- Gallery keyboard activation passed for 12/12 representative products.
- Space activation changed the active image, preserved exactly one `aria-pressed="true"` thumbnail, and caused no measurable layout shift.
- No keyboard trap was observed.

## Gallery Review

Twelve representative products were tested at 375, 390, 430, 768, and 1280 px, producing 60/60 successful combinations. The set covered RCU, AI display, smart panel, sensor, doorplate, and robot products.

- Gallery present: 60/60.
- Stable main image: 60/60.
- Horizontal page overflow: 0.
- Broken images: 0.
- Console errors: 0.
- Network failures: 0.
- Active thumbnail count: exactly one in every check.
- Accessible thumbnail name: present in every check.
- Gallery CLS: 0 in the production matrix.

One local long-session viewport-transition run initially produced an isolated CLS reading for an AI display at 768 px. Five isolated repeats and the full production run measured zero. This was classified as a test-harness observation rather than a production defect.

## Contact Form Review

- Controls: 22; associated labels: 22.
- Required fields: 5, including Email.
- Multi-select choices: 11 keyboard-operable checkboxes in a fieldset with a legend.
- File control: named, keyboard accessible, multiple-file capable, and restricted to the existing accepted file types.
- Source notice: present.
- Mail draft behavior and PII-safe attribution logic: unchanged.
- The rendered mailto feedback is now a polite live status so assistive technology can announce it when it appears.
- No test inquiry was sent.

## Color Contrast

The initial Lighthouse audit measured CTA text at approximately 2.25:1 where a normal-text ratio of 4.5:1 was required. The affected links had the correct white-text utility class, but the unlayered global `a { color: inherit; }` rule overrode layered utility CSS.

The fix moved the global anchor defaults into the CSS base layer. This restored the intended white CTA text without page-specific overrides. Post-deployment Lighthouse contrast audits passed with no failing items.

## Issues Found

Automated failure classes: 1.

1. Insufficient CTA link text contrast caused by CSS cascade-layer ordering.

Manual or semantic issues: 3.

1. No skip link before the repeated header navigation.
2. A nonblocking cookie-consent panel claimed modal-dialog semantics without modal focus behavior.
3. Contact mail-draft feedback was not exposed as an assistive-technology status message.

## Code Changes

- `src/app/globals.css`: layered global anchor defaults and added a focus-visible skip link.
- `src/app/[locale]/layout.tsx`: added the skip link and stable `main-content` target.
- `src/components/analytics/ga4-consent.tsx`: represented the nonblocking consent UI as a named region rather than a modal dialog. Consent loading, storage, and analytics behavior were not changed.
- `src/components/contact/get-quote-form.tsx`: exposed mail-draft feedback through a polite status region.
- `tests/accessibility-baseline.test.ts`: added four regression tests for the corrected semantics and CSS behavior.

## Validation

- `npm ci`: passed; existing npm audit findings were not automatically modified.
- `npm run media:audit`: passed, errors 0, warnings 1.
- `npm run lint`: passed.
- `npm run test:data`: 67/67 passed with the public CMS environment configured.
- `npm run build`: passed, including compile, type checking, page data, static generation, export, and export cleanup.
- Static pages: 156/156.
- Products: 36.
- Resources: 15.
- Sitemap: 76.
- Product JSON-LD: 36/36.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.
- `git diff --check`: passed.

The first local test invocation omitted the required public CMS environment and correctly failed five data-fetch tests by falling back to localhost. Repeating the workflow-equivalent command with the public CMS root passed 67/67. This was an invocation observation, not a source regression, and localhost was not present in production output.

## Deployment

- Implementation commit: `dd3e7696d713284984bc63cded68f543a158f50b`.
- Commit message: `a11y: improve navigation and control semantics`.
- GitHub Actions run: `29754187478`.
- Run URL: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29754187478`.
- Runner version: 2.335.1.
- Exact source checkout: verified.
- Tests: 67/67.
- Static generation: 156/156.
- Previous release: `/srv/dualcorelink/frontend/releases/ad4b29bdff3d-20260720-215033`.
- New/current release: `/srv/dualcorelink/frontend/releases/dd3e7696d713-20260720-231528`.
- Atomic activation: succeeded.
- Local HTTPS health check: passed on attempt 1.
- External HTTPS health check: passed on attempt 1.
- Rollback: not triggered.

## Production Regression

- Sitemap: HTTP 200, 76 unique URLs.
- Sitemap URL health: 76/76 HTTP 200.
- Product pages and Product JSON-LD: 36/36.
- Resource pages, Article, and BreadcrumbList: 15/15.
- Product WebP assets: 264/264 HTTP 200 with correct MIME.
- HTTP 4xx: 0; HTTP 5xx: 0.
- Broken images: 0.
- Empty `href="#"`: 0.
- Mixed content: 0.
- Production noindex: 0.
- Localhost, SiteGround, Pages, CMS test-host, and AWS test-host leakage: 0.
- Browser console errors: 0.
- Browser network failures: 0.

## Deferred Items

- CrUX/GSC field Core Web Vitals are unavailable; review when sufficient real-user consented traffic exists.
- Homepage unused-JavaScript savings of approximately 43-44 KB can be evaluated in a separate code-splitting phase.
- A general `prefers-reduced-motion` override is not present. Current motion is limited to short 120-180 ms state transitions with no autoplay animation; a broader motion policy can be added as a separate low-risk enhancement.
- Existing nested-layout development hydration diagnostics were not introduced by this phase. Static production output had no console errors; structural cleanup remains separate technical debt.
- The existing `rotary-knob-smart-control-display` same-model reshoot warning remains unchanged.

## Risks

Laboratory Lighthouse results vary with network and CPU conditions and must not be interpreted as field performance. The audit exercised representative pages rather than running Lighthouse against all 76 sitemap URLs. Full URL health, schema, media, and environment checks compensate for coverage breadth, while field CWV monitoring remains necessary.

## Next Review

Recommended review date: 2026-08-20, or earlier if GSC/CrUX exposes sufficient field data or a production template changes materially.

## Git Record

- Implementation commit: `dd3e7696d713284984bc63cded68f543a158f50b` (`a11y: improve navigation and control semantics`).
- Implementation push: succeeded.
- Report commit: recorded after this report is committed.

## Final Status

Phase 5A passed. Evidence-backed accessibility defects were corrected with a narrow implementation, all local quality gates passed, the exact source deployed successfully through the existing atomic AWS workflow, health checks passed on the first attempt, production accessibility reached 100 on all representative Lighthouse checks, and the production SEO, schema, media, gallery, responsive, and security baselines remained intact.

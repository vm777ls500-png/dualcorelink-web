# Website Quality Phase 5B - Homepage JavaScript, Reduced Motion, and Layout Review

Date: 2026-07-20

## Scope

Phase 5B reviewed the approximately 43-44 KB Lighthouse unused-JavaScript estimate on the production homepage, audited all Client Component boundaries that can reach the homepage, added a global reduced-motion policy, and resolved the existing nested document-layout hydration warning. The phase used evidence-based changes only and did not pursue a Lighthouse score through broad refactoring.

No URL, slug, canonical, redirect, sitemap, content, product gallery, image asset, Contact attribution, analytics consent behavior, AWS, DNS, Cloudflare, Nginx, CMS, dependency, or production-data change was made.

## Starting Baseline

- Production release: `/srv/dualcorelink/frontend/releases/dd3e7696d713-20260720-231528`
- Static pages: 156
- Products: 36
- Resources: 15
- Solutions: 6
- Sitemap: 76
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- Product WebP assets: 264
- Tests: 67/67
- Working tree: clean and synchronized with `origin/main`

## Next.js Layout Rule

The installed Next.js package does not include the `node_modules/next/dist/docs` directory referenced by the repository guidance. The implementation was checked against the official Next.js 15 layout documentation instead. That documentation requires a root layout to own the document `<html>` and `<body>` elements and treats descendant layouts as nested wrappers. It also documents that a root layout may live under a dynamic locale segment when no parent root layout exists.

This repository retains the top-level root layout because it also serves the nonlocalized root redirect page. Therefore the localized layout must be a descendant layout and must not render a second document root.

Reference: `https://nextjs.org/docs/15/app/api-reference/file-conventions/layout`

## Homepage JavaScript Audit

The production-equivalent build reported:

- Homepage First Load JS: 111 KB
- Shared First Load JS: 103 KB
- Homepage route size: 173 B
- Shared chunk 1: 46.3 KB
- Shared chunk 2: 54.2 KB
- Other shared chunks: 1.99 KB

The route client-reference manifest and generated chunks showed:

- Root layout client chunk: 4,465 raw bytes
- Locale layout client chunk: 10,134 raw bytes
- Homepage route chunk: 231 raw bytes
- The same three JavaScript hashes and sizes were emitted before and after the implementation.

The 103 KB shared baseline is primarily the required Next.js and React App Router runtime. The homepage itself is an async Server Component. Its Product, Resource, Solution, Region, case-study, category, series, and FAQ content remains server-rendered static HTML.

## Client Component Boundaries

Eight project Client Components were identified:

- `Ga4Consent`: globally required to enforce default-denied analytics consent and conditionally load GA4.
- `Header`: uses the current path for active navigation and PII-safe inquiry attribution.
- `Footer`: uses the current path for PII-safe email, form, and WhatsApp attribution.
- `TrackedInquiryLink`: emits the approved inquiry event on user interaction.
- `GetQuoteForm`: loaded only on Contact.
- `WhatsAppButton`: loaded only where the dedicated interactive control is rendered.
- `ProductFilteredList`: loaded only on the Products listing.
- `ProductGallery`: loaded only on product detail pages.

The homepage did not import Product filtering, Product Gallery, Contact form, or Contact-only JavaScript. Its server-rendered cards did not become client-rendered islands. The global client code is tied to navigation, consent, and conversion measurement that must remain available on the homepage.

## JavaScript Decision

No JavaScript reduction was implemented in this phase because the audit found no safe homepage-only client code to remove or defer:

- Homepage-specific JavaScript is only 173 B in the build summary.
- Header and Footer behavior depends on the current path for active state and attribution.
- Consent must remain visible before analytics can be granted and cannot be delayed behind interaction.
- CTA tracking is already isolated in a minimal client link component.
- The large shared chunks are framework runtime, not accidentally imported Gallery, filter, or Contact code.

Splitting Header or Footer further would add boundary complexity while retaining the same navigation and tracking runtime. Deferring consent would alter privacy behavior. Both options were rejected as disproportionate and potentially regressive.

## Bundle and Lighthouse Comparison

Build output before and after:

| Metric | Before | After | Result |
| --- | ---: | ---: | --- |
| Homepage First Load JS | 111 KB | 111 KB | Unchanged |
| Shared JS | 103 KB | 103 KB | Unchanged |
| Homepage route size | 173 B | 173 B | Unchanged |
| Root layout JS raw size | 4,465 B | 4,465 B | Unchanged |
| Locale layout JS raw size | 10,134 B | 10,134 B | Unchanged |
| Homepage route JS raw size | 231 B | 231 B | Unchanged |

Production Lighthouse medians, three independent runs per form factor:

| Metric | Phase 5A Mobile | Phase 5B Mobile | Phase 5A Desktop | Phase 5B Desktop |
| --- | ---: | ---: | ---: | ---: |
| Performance | 97 | 97 | 93 | 95 |
| Accessibility | 100 post-fix | 100 | 100 post-fix | 100 |
| Best Practices | 100 | 100 | 100 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| LCP | 2.14 s | 2.16 s | 1.34 s | 1.16 s |
| TBT | 67 ms | 22.5 ms | 0 ms | 0 ms |
| CLS | 0 | 0 | 0 | 0 |
| JS transfer | 150,762 B | 150,777 B | 151,379 B | 151,394 B |
| Unused-JS estimate | about 44.3 KB | 44,575 B | 44,106 B | 44,106 B |
| Requests | 25 | 26 | 36 | 37 |

The 15-byte JavaScript transfer difference is measurement/build metadata noise rather than an added functional bundle. Image and request totals varied because Lighthouse lazy-loading coverage differed between runs. No meaningful JavaScript regression or reduction was measured.

## Reduced Motion

Global CSS now honors `prefers-reduced-motion: reduce` by:

- disabling smooth scroll behavior;
- reducing animation duration to 0.01 ms;
- limiting animation iteration to one;
- reducing transition duration to 0.01 ms.

The strategy preserves end states and interaction behavior rather than using `display: none`, disabling controls, or removing JavaScript. The site currently has no autoplay carousel or continuous keyframe animation, so this is a conservative policy for the existing 120-180 ms interface transitions.

Browser verification with reduced motion emulated recorded:

- media query matched: true;
- computed document scroll behavior: `auto`;
- computed CTA transition duration: `0.00001s`;
- console or hydration entries: 0.

## Nested Layout Warning

Before the fix, local development hydration reported that server-rendered document attributes did not match client properties. The trace showed a top-level `<html>/<body>` wrapping another localized `<html>/<body>`, with `lang`, `dir`, and body class attributes redistributed by browser HTML parsing.

The localized layout is now a normal descendant wrapper:

- only `src/app/layout.tsx` renders `<html>` and `<body>`;
- the localized wrapper retains `lang` and `dir` semantics on its outer `div`;
- Header, skip link, main focus target, children, and Footer retain their order and behavior.

Post-fix development and static-output verification recorded:

- document `<html>` count: 1;
- document `<body>` count: 1;
- document language: `en`;
- hydration warnings: 0;
- console errors: 0.

## Code Changes

- `src/app/[locale]/layout.tsx`: removed nested document elements while retaining locale/direction semantics and page structure.
- `src/app/globals.css`: added the global reduced-motion media query.
- `tests/accessibility-baseline.test.ts`: added regressions for single document ownership and reduced-motion policy.

No client component, analytics event, consent branch, business field, gallery component, or image mapping was changed.

## Local Validation

- `npm ci`: passed; existing 2 moderate audit findings were not force-fixed.
- `npm run media:audit`: passed.
- Media errors: 0.
- Media warnings: 1, the existing Rotary Knob same-model reshoot warning.
- `npm run lint`: passed.
- `npm run test:data`: 69/69 passed.
- `npm run build`: passed.
- Static generation: 156/156.
- Export and export cleanup: passed.
- Products: 36.
- Resources: 15.
- Sitemap: 76.
- Product JSON-LD: 36/36.
- Article JSON-LD: 15/15.
- Resource BreadcrumbList: 15/15.
- Exported reduced-motion CSS: present.
- `git diff --check`: passed.

## Deployment

- Implementation commit: `1da74eb8e3d8d5a0e48d8b1916ff15c77cabf8a7`.
- Commit message: `a11y: add reduced motion and fix nested layout`.
- GitHub Actions run: `29756940331`.
- Run URL: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29756940331`.
- Runner version: 2.335.1.
- Exact source SHA: verified.
- Workflow attempt: 1.
- Tests: 69/69.
- Media audit errors: 0.
- Static generation: 156/156.
- Previous release: `/srv/dualcorelink/frontend/releases/dd3e7696d713-20260720-231528`.
- New/current release: `/srv/dualcorelink/frontend/releases/1da74eb8e3d8-20260720-235157`.
- Atomic switch: succeeded.
- Local HTTPS health check: passed on attempt 1.
- External HTTPS health check: passed on attempt 1.
- Rollback: not triggered.

## Production Regression

- Sitemap: 76 unique URLs, 76/76 HTTP 200.
- Product pages and Product JSON-LD: 36/36.
- Resource pages, Article, and BreadcrumbList: 15/15.
- Product WebP assets: 264/264 HTTP 200 with correct MIME.
- Page/view matrix: 30/30 passed.
- Gallery matrix: 60/60 passed.
- Gallery keyboard activation: 12/12 passed.
- Gallery CLS: 0.
- Broken images: 0.
- Horizontal overflow: 0.
- Console errors and hydration warnings: 0.
- Network failures: 0.
- HTTP 4xx/5xx: 0.
- Empty `href="#"`: 0.
- Mixed content: 0.
- Production noindex: 0.
- Localhost, SiteGround, Pages, CMS test-host, and AWS test-host leakage: 0.
- Production reduced-motion computed styles: verified.

## Deferred Items

- The approximately 44 KB Lighthouse unused-JavaScript estimate remains. Evidence indicates it is dominated by shared framework/navigation runtime and is not a safe deletion target in the current architecture.
- Field INP and CrUX remain unavailable; laboratory TBT stays low.
- A future framework upgrade can reassess App Router runtime size, but Next.js or React upgrades are outside this phase.
- The localized wrapper preserves `lang` and `dir`; if non-English production locales are re-enabled, document-level locale architecture should be reviewed before publication.
- The existing Rotary Knob media warning remains unchanged.

## Risks

Lighthouse's unused-JavaScript estimate is heuristic and varies with the interactions exercised during a run. Removing shared runtime or privacy/conversion code solely to lower that number would create greater functional risk than the measured transfer cost. The reduced-motion policy intentionally shortens transitions globally; all audited controls retained their final states and keyboard behavior.

## Git Record

- Implementation commit: `1da74eb8e3d8d5a0e48d8b1916ff15c77cabf8a7`.
- Implementation push: succeeded.
- Report commit: recorded after this report is committed.

## Final Status

Phase 5B passed. The nested document-layout hydration warning is resolved, reduced-motion preferences are honored globally, the homepage's JavaScript composition is documented with no unsafe or cosmetic reduction, all local quality gates passed, the exact implementation deployed successfully on the first workflow attempt, and production performance, accessibility, SEO, schema, gallery, Contact, Consent, and media baselines remain intact.

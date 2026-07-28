# SEO Growth Phase 3B-3 — Implementation Approval

Last reviewed: 2026-07-28

## Decision

**Approved for the minimal Phase 3B-3 implementation scope defined in
`seo-growth-phase-3b-3-implementation-plan-20260727.md`.**

The plan contains exactly four approved pages. It separates commercial,
category, product-conversion, and information intent; limits the first pass to
small visible-copy and internal-link changes; and keeps metadata, Schema, URL,
and crawl controls unchanged.

An uncommitted candidate implementation for these four pages is already
present in the current worktree from the immediately preceding task. This
approval records the plan gate only. This review did not modify production
code and does not authorize commit, push, or deployment.

## Approved pages

| URL | Page role |
|---|---|
| `/en/solutions/` | Commercial Authority |
| `/en/products/` | Product Category Authority |
| `/en/products/rcu-controller-cabinet/` | Conversion Authority |
| `/en/resources/what-is-hotel-rcu-room-control-system/` | Information Authority |

No other page is admitted. Smart Hotel Guide, AI Smart Display, Saudi Arabia,
and UAE remain under observation.

## Approved changes

### `/en/solutions/`

- Role: commercial system selection, supplier evaluation, integration scope,
  and B2B project planning.
- Target queries:
  - `hotel room automation`
  - `hotel room control system supplier`
  - `hotel room automation system supplier`
  - supporting system-intent variants already disclosed in GSC
- Approved area: existing hero/support copy or existing application-scenario
  context only.
- Approved link: one contextual path from the RCU solution context to
  `/en/resources/what-is-hotel-rcu-room-control-system/`.
- Anchor direction: `hotel RCU room control fundamentals`.
- Title: keep.
- Meta description: keep.
- Schema: keep CollectionPage, BreadcrumbList, Organization references, IDs,
  and graph behavior unchanged.

### `/en/products/`

- Role: product and category discovery across panels, RCU hosts, sensors,
  displays, sockets, thermostats, and related devices.
- Target queries:
  - `bedside control panel`
  - `hotel room control panel`
  - supporting product-category queries represented by existing categories
- Approved area: existing introduction or project-mix explanation only.
- Approved link: one contextual path to `/en/solutions/` for buyers requiring
  system-level planning.
- Anchor direction: `compare hotel room automation solutions`.
- Title: keep.
- Meta description: keep.
- Schema: keep CollectionPage, BreadcrumbList, Organization references, IDs,
  and listing behavior unchanged.

### `/en/products/rcu-controller-cabinet/`

- Role: product evaluation, project fit, quotation preparation, and inquiry.
- Target queries:
  - `rcu controller`
  - `hotel room control unit`
  - supporting `controller cabinet` intent
- Approved area: slug-scoped product overview, procurement summary, buying
  guidance, or link configuration. The shared product template is excluded.
- Approved link: one contextual path to
  `/en/resources/what-is-hotel-rcu-room-control-system/`.
- Existing RCU Solution and buying-guide links must be preserved.
- Title: no first-pass change. Any later proposal is conditional on a separate
  product-name and evidence review.
- Meta description: keep.
- Schema: keep Product, BreadcrumbList, Organization references, product name,
  IDs, and structured facts unchanged.

### `/en/resources/what-is-hotel-rcu-room-control-system/`

- Role: RCU definitions, room control unit education, technical planning, and
  device-relationship explanation.
- Target queries:
  - `room control unit`
  - `room control unit hotel`
  - supporting `hotel rcu` and `rcu hotel` information intent
- Approved area: one existing transition near product selection or quotation
  planning; no new long section.
- Approved link treatment: preserve the existing RCU Product and RCU Solution
  paths, clarify their distinct roles, and avoid duplicate exact-match links.
- Title: keep.
- Meta description: keep.
- Schema: keep Article, BreadcrumbList, Organization references, IDs, dates,
  and graph behavior unchanged.

## Keyword ownership and conflict review

The plan passes the ownership review with no unresolved implementation
conflict:

- Solutions owns commercial system and integration intent.
- Products owns category and device discovery.
- RCU Controller Cabinet owns product/procurement intent.
- Hotel RCU Resource owns definition and education intent.

Query overlap exists, especially for `hotel room control unit` and broad room
control terms, but overlap is not treated as proof of cannibalization. The
approved changes reinforce distinct roles and destination-led anchors instead
of repeating exact-match phrases. No page deletion, redirect, or metadata
change is approved.

## Protected boundaries

The implementation must not affect:

- Phase 3A observation pages or their configuration;
- Smart Hotel Guide;
- AI Smart Display;
- Saudi Arabia or UAE Region pages;
- ContactPoint or Organization entities;
- Product, Article, BreadcrumbList, or CollectionPage Schema;
- inquiry attribution parameters or CTA behavior;
- canonical, hreflang, robots, sitemap, URLs, or redirect logic;
- product names or unverified technical facts.

## Not allowed changes

- No page outside the four approved URLs.
- No new page, large section, shared component, dependency, or `llms.txt`.
- No first-pass Title or meta description change.
- No Schema addition, removal, or repurposing.
- No URL, canonical, hreflang, robots, sitemap, redirect, or crawl-policy
  change.
- No Organization, ContactPoint, telephone, WhatsApp, address, Logo, sameAs,
  or entity change.
- No unsupported protocol, compatibility, certification, customer, case
  study, energy-saving, performance, market, or supplier claim.
- No repeated exact-match anchors or keyword stuffing.
- No commit, push, deployment, or indexing request without separate approval.

## Expected implementation files

Production:

- `src/app/[locale]/solutions/page.tsx`
- `src/app/[locale]/products/page.tsx`
- `src/config/product-conversion.ts`
- `src/config/resources.ts`

Focused validation:

- `tests/seo-growth-phase-3b-3.test.ts`

The shared product page template is not approved for modification. If the
scope cannot be implemented through the listed page/configuration surfaces,
implementation must stop for a new scope review.

## Validation requirements

Required commands:

```text
npm run lint
npm run test:data
npm run media:audit
npm run build
git diff --check
```

Required focused and output checks:

- Phase 3B-3 focused tests pass.
- The four target static pages exist.
- Title and meta description remain unchanged.
- Canonical, hreflang, robots, and sitemap behavior remain unchanged.
- Product, Article, CollectionPage, BreadcrumbList, Organization, and
  ContactPoint output show no regression.
- New visible copy and approved links exist in static HTML.
- Phase 3A observation pages have no content or metadata diff.
- Inquiry attribution remains present and unchanged.
- Filters, cards, gallery, sticky navigation, related modules, and CTAs remain
  functional.
- No horizontal scrolling at 375 px, 768 px, and 1280 px.
- No localhost, noindex, credential, or private-key leakage.

## Approval status

Plan review: **Passed**

Ready for minimal implementation: **Yes**

Commit, push, and deployment approval: **No**

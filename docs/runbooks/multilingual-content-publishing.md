# Multilingual Content Publishing Runbook

Last updated: 2026-07-28

## Purpose and scope

This runbook governs Arabic (`ar`), Chinese (`zh`), German (`de`), Spanish
(`es`), Vietnamese (`vi`), and Persian (`fa`) content. It prevents incomplete,
unreviewed, or English-duplicate content from becoming publicly accessible.

The multilingual publication manifest contains the 69 English source pages for
each of the six target locales. New records begin as `missing`,
`publishReady=false`, `nativeReviewStatus=pending`, and
`productionReleaseReady=false`. The manifest is a control plane, not
translated content.

## Source responsibilities

| Content family | Source of truth | Required relationship |
|---|---|---|
| Products | CMS | Stable English content ID, locale, localized content ID, source slug, translation and review status |
| Solutions | CMS | Stable English content ID, locale, localized content ID, source slug, translation and review status |
| Resources | Repository locale content | English source URL, matching locale/slug, content hashes, translation and review status |
| Regions | Repository locale content | English source URL, matching locale/slug, content hashes, translation and review status |
| About, FAQs, Contact, listings, and shared UI | Repository locale content | Matching locale/page identity, localized metadata, content hashes, translation and review status |
| Publication state | `src/lib/multilingual-publication-manifest.ts` | One unique locale + slug record for every target page |

Verified product specifications, model names, entity facts, ContactPoint data,
and other factual claims remain controlled source fields. Translators must not
invent or infer technical, legal, certification, customer, performance, or
market claims.

## Translation workflow

1. Select an existing manifest record and confirm its English source URL.
2. Lock the English source revision or content hash used for translation.
3. Create the translated CMS record or locale content record.
4. Keep `translationStatus=draft` while translation and terminology work is in
   progress.
5. Move to `reviewed` only after a qualified language reviewer has checked the
   complete visible content.
6. Move to `approved` only after factual review, terminology review, and
   resolution of all comments.
7. Prepare localized SEO title and meta description without keyword stuffing.
8. Obtain independent SEO metadata approval and content-review approval.
9. Set `publishReady=true` only after route, links, metadata, canonical,
   hreflang, sitemap, structured data, responsive layout, and conversion paths
   pass pre-release QA.
10. Run the automated audit and full project validation before any release.
11. Keep `nativeReviewStatus=pending`, reviewer/date empty, and
    `productionReleaseReady=false` until a real native-language reviewer
    completes the page-specific review pack.
12. After native approval, record the real reviewer name, an ISO `YYYY-MM-DD`
    date, and review notes. Product/Solution evidence must match in the
    manifest and CMS payload.
13. Set `productionReleaseReady=true` only after every technical validation
    passes, then run `npm run multilingual:release-check`.

Machine translation may assist a human workflow, but machine-translated output
must never be published without native-language editorial review and factual
approval.

## CMS requirements for Products and Solutions

Each translated Product or Solution must provide:

- translated title;
- translated description;
- translated specifications;
- translated SEO title;
- translated meta description;
- translated structured content;
- source English content ID;
- source English slug;
- localized content ID;
- locale;
- translation status;
- review status.
- native-review status, reviewer, review date, and review notes.

The CMS adapter rejects incomplete records. A Product or Solution manifest
entry cannot become eligible without a matching CMS translation association.
Do not create fabricated records to satisfy the validator.

## Repository content requirements

File-backed translations live under:

```text
src/content/locales/
  ar/
  zh/
  de/
  es/
  vi/
  fa/
```

Each entry must include complete visible content, SEO metadata, its English
source hash, and a different localized-content hash. Empty strings, placeholder
text, English body copies, or an unreviewed translation are ineligible.

Arabic and Persian require RTL QA. Chinese uses the `zh` path. German,
Spanish, and Vietnamese remain LTR.

## Page review process

Every page requires four separate checks:

1. **Language review** — grammar, terminology, local clarity, and natural
   buyer-facing phrasing.
2. **Fact review** — product facts, specifications, company facts, links,
   compliance wording, and supported claims.
3. **SEO review** — search intent, title, meta description, headings,
   canonical target, internal links, and avoidance of keyword cannibalization.
4. **Release QA** — static HTML, one H1, structured data, breadcrumb, CTA,
   inquiry attribution, responsive layout, and correct language direction.

Review evidence should identify the reviewer, source revision, review date,
and any limitations. Approval is page-specific; approval of one locale or page
does not approve another.

The prepared page review packs live under `docs/reviews/multilingual/`. A blank
reviewer or date means the page remains pending. Automated language checks
identify structural and consistency risks but never substitute for a native
reviewer.

## Publication conditions

A record may become locally publication-eligible for build and editorial QA
only when all conditions are true:

```text
translationStatus = approved
seoMetadataStatus = approved
contentReviewStatus = approved
publishReady = true
complete matching localized content evidence exists
```

The eligibility functions for static export, sitemap, and hreflang use the same
local candidate gate. A record failing any condition must remain excluded.

A locally eligible record may enter a production release only when the
additional production conditions are true:

```text
nativeReviewStatus = approved
nativeReviewer = real non-empty reviewer identity
nativeReviewDate = valid ISO date
nativeReviewNotes = completed review record
all technical validation = passed
productionReleaseReady = true
```

Do not copy a placeholder reviewer or date across records. If any one of these
conditions is missing, `npm run multilingual:release-check` must exit nonzero
and the production workflow must stop before build or deployment.

Before a locale is made visible or indexable:

- every released URL must return the intended localized content;
- no page may fall back to English under a non-English URL;
- listing pages must not expose empty categories;
- all internal links must resolve to approved localized pages or be explicitly
  labeled English alternatives;
- locale navigation, forms, CTA text, consent, validation, 404 behavior, and
  inquiry attribution must be complete;
- existing legacy redirects must remain for every unreleased path;
- static export must contain no unapproved locale artifact.

## Sitemap and hreflang entry conditions

A non-English URL can enter the sitemap only when it is publication-eligible,
returns HTTP 200, has the correct localized canonical, and exists in the final
static artifact.

A non-English URL can enter hreflang only when:

- it is publication-eligible;
- its localized canonical is valid;
- the English source and localized page are true equivalents;
- reciprocal language links can be emitted;
- every referenced URL returns HTTP 200.

Do not add a whole locale to `indexableLocales` merely because one page is
translated. Publication must be driven by eligible page records and an
approved locale rollout.

## Required validation

Run:

```text
npm run multilingual:audit
npm run multilingual:release-check
npm test
npm run lint
npm run build
git diff --check
git status --short
```

Use the approved public CMS REST root when the local WordPress service is not
running. Do not store that runtime setting or any credential in Git.

The multilingual audit fails with a nonzero exit when it finds an incomplete
manifest, duplicate locale/slug or URL, unknown English source, incomplete
publish-ready content, English-content duplication, missing CMS association,
or missing legacy redirect policy.

The release check is intentionally stricter. It requires every production
candidate and matching CMS payload to contain real native-review evidence and
requires `productionReleaseReady=true`. A controlled failure that lists
pending URLs is the correct result before human review is complete.

## Release and rollback

Release must continue through:

```text
Codex change
→ Git diff and human review
→ scoped commit
→ GitHub Actions
→ atomic AWS deployment
→ production verification
```

If a localized release fails:

1. stop further locale publication;
2. restore the previous manifest and content source revision;
3. rebuild the static export;
4. restore the previous sitemap/hreflang output;
5. restore the known-good Nginx configuration and validate with `nginx -t`;
6. atomically redeploy the previous release;
7. verify that affected legacy URLs again use the approved English redirect;
8. record the affected locale, URLs, source revision, and root cause.

Never delete the English source page as a multilingual rollback step. Never
change canonical, robots, sitemap, or redirects manually outside the reviewed
Git and deployment workflow.

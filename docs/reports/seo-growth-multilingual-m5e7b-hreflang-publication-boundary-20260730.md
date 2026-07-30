# DualCoreLink SEO Growth — Multilingual Phase M5E-7B

## Hreflang Publication Boundary Audit and Gate Correction

Date: 2026-07-30

Decision:

**PASS — 当前缺少 zh hreflang 属于正确的预发布行为，允许进入 M5F Frontend Release Preparation**

Frontend deployment is not authorized.

## 1. Scope and Safety Boundary

This phase audited repository code, an archived copy of the production content
architecture plugin, public read-only CMS REST responses, the public frontend,
and a local production-style static build.

It performed no CMS write, apply, publish, rollback, revision deletion,
database repair, plugin installation or update, frontend deployment, `main`
push, or GSC request. The frozen M5D worktree was not modified.

## 2. Precise Cause of the Missing REST zh Hreflang

The archived `smart-home-b2b-content-architecture` plugin implements five
read-only REST fields:

- `language`
- `translations`
- `translation_group`
- `hreflang`
- `direction`

Its `smart_home_b2b_rest_hreflang()` implementation starts with only the
published English frontend path. It can be extended only through the separate
`smart_home_b2b_rest_hreflang` filter.

The installed multilingual importer source adds filters only for:

- `smart_home_b2b_rest_language`
- `smart_home_b2b_rest_translation_group`
- `smart_home_b2b_rest_translations`

It deliberately does not register an hreflang filter. Consequently:

- public REST exposes the complete en/zh translation relation for all seven
  Product/Solution pairs;
- public REST hreflang continues to contain the English path only;
- the absence of REST `zh` is deterministic and does not mean the translation
  relation is incomplete.

The production behavior exactly matches this source path: translation
relations are 7/7 complete, while REST `zh` hreflang entries are 0.

## 3. CMS-to-Frontend Data Chain

The data chain is intentionally split:

1. **CMS identity and content**
   - WordPress posts and translation meta establish locale, source ID,
     translation group, and bidirectional translation paths.
   - The importer exposes those relations through read-only REST filters.
2. **Frontend release eligibility**
   - `multilingual-publication-manifest.ts` records native-review and
     `productionReleaseReady` evidence.
   - `multilingual-publication-control.ts` admits only entries satisfying the
     approved publication gate and production release gate.
3. **Frontend HTML hreflang**
   - `localized-publication.ts` builds hreflang from the gated manifest
     entries.
   - It always emits English and x-default, and adds only approved localized
     URLs sharing the same path.
   - `metadata.ts` writes those values into HTML.
4. **Sitemap and static output**
   - `sitemap.ts` uses the same gated entries.
   - `clean-static-export.ts` removes every non-approved localized artifact.
   - the static export audit verifies reciprocal hreflang and the exact
     localized-page count.
5. **Nginx publication boundary**
   - only the exact 12-page Chinese P0 allowlist is served from static files;
   - all other Chinese paths and all ar/de/es/vi/fa paths retain legacy
     redirects.

CMS REST hreflang is therefore not the source for Next.js HTML hreflang.

## 4. SEO Correctness by Release Stage

### Before frontend publication

- CMS translation relation must be complete: **7/7 pass**.
- Chinese public frontend pages are 0.
- all 12 approved Chinese paths still return HTTP 301.
- production sitemap remains 76.
- production English pages correctly emit no `zh` hreflang.

Advertising a Chinese URL that currently redirects would be incorrect. The
current omission is therefore the correct pre-release behavior.

### Frontend release candidate

Only the approved 12-page Chinese P0 batch may enter the candidate:

- reciprocal English/Chinese hreflang;
- x-default points to English;
- self-referencing Chinese canonical;
- no reference to the remaining 57 Chinese pending pages;
- no ar/de/es/vi/fa output;
- sitemap 88.

### After a separately authorized frontend deployment

Production acceptance must then verify:

- 12 Chinese URLs return HTTP 200;
- the 12 Chinese pages and 12 English counterparts contain reciprocal
  en/zh/x-default hreflang;
- sitemap contains 88 URLs;
- no hreflang points to a 301, 404, pending, or query URL.

## 5. Local Candidate Verification

Build environment:

`WORDPRESS_REST_ROOT=https://cms.dualcorelink.com/wp-json`

| Check | Result |
|---|---:|
| Chinese static files | 12/12 |
| Self-referencing canonical | 12/12 |
| `lang=zh`, `dir=ltr` | 12/12 |
| Chinese self hreflang | 12/12 |
| x-default to English | 12/12 |
| English reciprocal zh hreflang | 12/12 |
| Candidate sitemap | 88 |
| Internal query href | 0 |
| Canonical/hreflang query URL | 0 |
| Other Chinese pages in output | 0 |
| ar/de/es/vi/fa pages in output | 0 |

The static export audit passed all 12 localized pages. The build generated
163/163 static pages before cleanup; cleanup retained only the approved batch.

## 6. Production Read-Only Verification

| Check | Result |
|---|---:|
| CMS translation relations | 7/7 |
| REST zh hreflang entries | 0, expected pre-release |
| English pages checked | 12/12 HTTP 200 |
| Production English zh hreflang | 0 |
| Chinese paths checked | 12/12 HTTP 301 |
| Public non-English frontend pages | 0 |
| Production sitemap | 76 |
| Sitemap query URL | 0 |
| Chinese CMS publish/draft | 7 / 0 |
| Posts/Postmeta accepted baseline | 208 / 2558 |

Posts and Postmeta were proven stable by the immediately preceding M5E-7A
start/end fingerprints. M5E-7B executed no authenticated database mutation or
CMS write operation.

## 7. Corrected Release Gate

The M5E-7A REST hreflang blocker is removed.

The corrected gate is:

1. CMS stage: validate locale, translation group, and bidirectional
   translations; do not require a production hreflang to an unreleased URL.
2. Candidate stage: validate exactly 12 Chinese pages, reciprocal
   en/zh/x-default hreflang, Nginx allowlist alignment, sitemap 88, and no
   pending locale.
3. Production stage after deployment: validate HTTP 200 for all 12 Chinese
   URLs and the final public HTML/sitemap hreflang.

A new automated test cross-checks every emitted localized hreflang URL against
the exact Nginx Chinese P0 release allowlist and rejects every manifest entry
that remains on the legacy redirect.

## 8. Validation Results

| Command | Result |
|---|---|
| `npm run multilingual:audit` | Pass; 414 manifest, 12 eligible |
| `npm run multilingual:release-check -- --locale=zh --batch=p0` | Pass; pages 12/12, CMS 7/7 |
| `npm test` | Pass; 185/185 |
| `npm run lint` | Pass; 0 errors |
| `npm run media:audit` | Pass; 0 errors, 1 existing warning |
| `npm run build` | Pass; 163/163, export audit 12, sitemap 88 |
| `npm run multilingual:static-export-audit` | Pass |
| `git diff --check` | Pass |

## 9. Final Decision

**PASS — 当前缺少 zh hreflang 属于正确的预发布行为，允许进入 M5F Frontend Release Preparation**

This decision authorizes preparation only. It does not authorize a frontend
deployment, `main` push, production CMS change, plugin update, or GSC action.

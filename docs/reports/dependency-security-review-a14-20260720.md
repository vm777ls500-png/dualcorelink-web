# Dependency Security Review Phase A14

Date: 2026-07-20

## Scope

Phase A14 classified the seven package-level findings reported by `npm audit`, evaluated production and development exposure, applied one controlled same-major development-tool upgrade, and documented the two findings that cannot currently be remediated through a supported Next.js release. No website content, product data, gallery mapping, image asset, SEO behavior, schema policy, deployment workflow, runner, CMS, AWS, DNS, Cloudflare, Nginx, or GA4 configuration was changed.

## Baseline

- Node.js: `24.16.0`
- npm: `11.13.0`
- Direct production dependencies: `next`, `react`, `react-dom`
- Direct development dependency in the affected tool chain: `wrangler`
- Initial audit result: 7 package findings
- Initial severity: 1 low, 2 moderate, 4 high, 0 critical
- Initial production-only audit: 2 moderate, 0 high, 0 critical
- Tests: 63/63
- Static pages: 156
- Products: 36
- Resources: 15
- Sitemap: 76

The known `rotary-knob-smart-control-display` reshoot warning is a product media governance warning and is unrelated to npm security findings.

## Audit Method

The review used:

- `npm audit --json`
- `npm audit --omit=dev --json`
- `npm explain` for each affected dependency chain
- `npm outdated --json`
- `npm view` against the official npm registry for candidate package metadata
- `npm audit fix --dry-run --json`
- explicit package installation at the reviewed version
- a clean `npm ci` followed by the full project validation suite

No unrestricted `npm update`, `npm audit fix`, `npm audit fix --force`, peer-dependency bypass, registry change, lockfile deletion, or dependency override was used.

## Finding Classification

| Package finding | Severity | Dependency path | Scope | Production release exposure | Decision |
| --- | --- | --- | --- | --- | --- |
| `esbuild 0.27.3` | Low | `wrangler -> esbuild` | Transitive dev dependency | Not included in the static release; affected behavior concerns a Windows development server | Fixed through Wrangler 4.112.0, which uses esbuild 0.28.1 |
| `miniflare 4.20260611.0` | High aggregate | `wrangler -> miniflare` | Transitive dev dependency | Local Cloudflare emulation only; not used by the AWS production workflow or served static output | Fixed through Wrangler 4.112.0, which uses Miniflare 4.20260714.0 |
| `undici 7.24.8` | High aggregate | `wrangler -> miniflare -> undici` | Transitive dev dependency | Miniflare network client; not included in the Nginx static production release | Fixed through Miniflare, now undici 7.28.0 |
| `ws 8.20.1` | High | `wrangler -> miniflare -> ws` | Transitive dev dependency | Miniflare WebSocket support; not used by the deployed static site | Fixed through Miniflare, now ws 8.21.0 |
| `wrangler 4.100.0` | High aggregate | Root dev dependency | Direct dev dependency | Cloudflare Pages tooling only; the AWS workflow does not execute Wrangler | Fixed by exact upgrade to Wrangler 4.112.0 |
| `postcss 8.4.31` | Moderate | `next -> postcss` | Transitive dependency of a direct production dependency | Used during the trusted static build; the package is not run as a production server or copied into the Nginx static release | Deferred pending a supported Next.js package containing PostCSS 8.5.10 or newer |
| `next 15.5.19` | Moderate aggregate | Root production dependency, via bundled PostCSS | Direct production dependency | Next.js is used to create the static export; no Next.js server runs in production | Deferred because npm's offered remediation is an unsafe downgrade to Next 9.3.3 |

The seven package-level findings include aggregate parent findings. The `next` finding is propagated from PostCSS, while the `wrangler` and `miniflare` findings are propagated from their vulnerable transitive dependencies.

## Exploitability Review

### Wrangler development chain

The affected Wrangler, Miniflare, esbuild, undici, and ws packages were development tooling. They were installed on the build host but were not invoked by the AWS production workflow and were not emitted into `out/`. Their relevant attack surfaces require Wrangler development or emulation features, proxy agents, WebSocket clients, or the esbuild development server. Those paths are absent from the deployed Nginx static site.

The findings were still remediated because build-host dependencies are part of the software supply chain even when they are not browser runtime code.

### Next and bundled PostCSS

The remaining advisory concerns PostCSS stringification of an unescaped `</style>` sequence. The project builds CSS from repository-controlled source and does not pass WordPress content or other user-controlled values into PostCSS as CSS source. Production serves a static export through Nginx and does not run a Next.js server or PostCSS process.

This evidence reduces the practical production exploit path but does not erase the finding. It remains tracked until an upstream-supported Next.js release replaces the bundled PostCSS 8.4.31.

## Safe Upgrade Decision

Wrangler was upgraded from `4.100.0` to the exact reviewed version `4.112.0`. This is a same-major development-tool update and required no new direct dependency.

The updated dependency chain is:

- Wrangler: `4.112.0`
- Miniflare: `4.20260714.0`
- esbuild: `0.28.1`
- undici: `7.28.0`
- ws: `8.21.0`
- workerd platform packages: `1.20260714.1`

The package manifest and existing lockfile were updated in place. The lockfile was not deleted or regenerated from scratch.

## Rejected Remediation

`npm audit` suggested `npm audit fix --force`, which would install `next@9.3.3`. That is a breaking and security-regressive downgrade and was rejected.

Registry metadata showed:

- Next 15.5.20 still depends on PostCSS 8.4.31.
- Next 16.2.10 still depends on PostCSS 8.4.31.
- The advisory requires PostCSS 8.5.10 or newer.

Therefore neither a Next 15 patch nor the current Next 16 major provides an upstream-supported remediation. A package override was also rejected because it would replace an internal dependency outside Next.js's published dependency contract without upstream validation.

## Post-Remediation Audit

- Total package findings: 2
- Low: 0
- Moderate: 2
- High: 0
- Critical: 0
- Production-only findings: 2 moderate
- `npm audit --audit-level=high`: exit code 0
- `npm audit --omit=dev --audit-level=high`: exit code 0

The five Wrangler-chain package findings were removed. The two remaining entries are the Next/PostCSS parent-child pair for one unresolved advisory path.

## Validation

- Clean `npm ci`: passed, 353 packages audited
- Wrangler version: 4.112.0
- Wrangler Pages command surface: available
- Product media audit: passed
- Product media errors: 0
- Product media warnings: 1 known non-blocking reshoot warning
- Lint: passed
- Data tests with the production REST root: 63/63 passed
- Static production build: passed
- Static generation: 156/156
- Export: 2/2
- Static export cleanup: passed
- Products: 36
- Resources: 15
- Sitemap: 76
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- `git diff --check`: passed

An initial data-test invocation without `WORDPRESS_REST_ROOT` attempted the local fallback and failed five CMS-backed tests with connection refused. Re-running with the documented public production REST root passed 63/63. This was an environment-selection issue, not a dependency regression.

## Deployment

- Implementation commit: `ad4b29bdff3d68420a629eb6b4ce69adde896268`
- GitHub Actions run: [AWS static production deploy #25](https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29747849646)
- Run ID: `29747849646`
- Exact source SHA: `ad4b29bdff3d68420a629eb6b4ce69adde896268`
- Runner version: 2.335.1
- Checkout action: `actions/checkout@v5`
- Dependency install, lint, 63 data tests, product media audit, build, and expected-baseline validation: passed
- Previous release: `/srv/dualcorelink/frontend/releases/8f58232c6910-20260720-204754`
- New release: `/srv/dualcorelink/frontend/releases/ad4b29bdff3d-20260720-215033`
- Current symlink: `/srv/dualcorelink/frontend/current` points to the new release
- Atomic switch: passed
- Local HTTPS health check: passed on the first attempt
- External HTTPS health check: passed on the first attempt
- Rollback: not triggered

## Production Regression

- Sitemap and indexed-route audit: 76/76 HTTP 200
- Product pages: 36/36 HTTP 200 with Product JSON-LD 36/36
- Resource pages: 15/15 HTTP 200 with Article JSON-LD 15/15 and BreadcrumbList 15/15
- Product gallery WebP assets: 264/264 HTTP 200 with WebP content type
- Representative gallery viewport checks: 52/52 passed
- Gallery image-switch checks: 12/12 passed
- HTTP 4xx / 5xx: 0 / 0
- Broken gallery images: 0
- Browser console errors: 0
- Browser network failures: 0
- Empty `href="#"`: 0
- Production `noindex`: 0
- Mixed content: 0
- Environment leakage (`localhost`, `127.0.0.1`, SiteGround, `pages.dev`, `cms-aws`, test AWS host): 0

The post-deployment audit reproduced the same two moderate Next/PostCSS findings. `npm audit --audit-level=low` returned nonzero as expected, while `npm audit --audit-level=high` returned 0. The installed top-level dependency tree was valid (`npm ls --depth=0` exit code 0).

## Upgrade Plan for Remaining Findings

1. Monitor official Next.js package metadata and security advisories for a release that bundles PostCSS 8.5.10 or newer.
2. Prefer a supported patch release in the current Next 15 line if one becomes available.
3. If remediation requires a Next major upgrade, handle it in a separate compatibility phase after reading the installed Next.js migration documentation and validating React compatibility.
4. Re-run full and production-only audit, lint, 63 data tests, media audit, static build, sitemap, schema, and production QA before deployment.
5. Do not use an override unless Next.js publishes or validates that dependency substitution and the project passes a dedicated compatibility review.

## Files Changed

- `package.json`
- `package-lock.json`
- `docs/reports/dependency-security-review-a14-20260720.md`

No source, content, image, workflow, infrastructure, secret, or environment file was changed.

## Risks and Observations

- Two moderate package findings remain until the Next.js dependency chain is corrected upstream.
- The current static architecture materially limits the runtime path because Next.js and PostCSS do not run on the production server, but build-time supply-chain exposure remains in scope.
- Wrangler is retained for legacy Cloudflare Pages tooling even though AWS serves production. Removing it should be a separate dependency-usage decision, not a security-number shortcut.
- The known product reshoot warning remains unchanged and is not related to dependency security.

## Git Record

- Baseline commit: `56f1bb701ffdfc889991c3bcf6cb7e6cafcb81dd`
- Remediation commit: `ad4b29bdff3d68420a629eb6b4ce69adde896268`
- Report commit: recorded after report commit

## Final Status

Phase A14 controlled remediation is validated in production. All high and low findings were removed through a reviewed same-major dev-tool upgrade, deployment and production regression checks passed without rollback, and the remaining two moderate Next/PostCSS findings have a documented bounded exposure and an evidence-based upstream upgrade plan. The next scheduled review is 2026-08-20, or earlier if Next.js publishes a supported package that upgrades the bundled PostCSS dependency.

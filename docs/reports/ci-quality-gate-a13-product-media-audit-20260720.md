# CI Quality Gate Phase A13 - Product Media Audit Gate

Date: 2026-07-20

## Scope

Phase A13 added the existing product media inventory audit to the AWS static production deployment workflow as an independent quality gate. The change ensures that invalid published product media stops deployment before the static build, release creation, Nginx reload, or current symlink activation. It did not change website pages, product content, gallery behavior, image mappings, image assets, dependencies, runner configuration, deployment permissions, secrets, or infrastructure.

## Previous Workflow

Before Phase A13, the production workflow ran exact-source checkout, validated environment loading, dependency installation, lint, data validation, static build, expected-baseline validation, atomic deployment, health checks, and test-domain indexing verification. Product media governance was covered by local validation and data tests, but `npm run media:audit` was not an independent deployment step.

## Media Audit Command

The workflow now executes:

```text
npm run media:audit
```

The command uses the existing product media manifest and audit implementation. No dependency or audit behavior was changed.

## Gate Placement

The independent step is named `Audit product media`. Its verified workflow position is:

1. `Lint`
2. `Validate data`
3. `Audit product media`
4. `Build static export`
5. `Deploy atomic release`

The audit therefore runs after data tests and before build, release creation, Nginx reload, and current symlink activation.

## Error Semantics

- Audit errors produce a non-zero process exit code.
- A non-zero audit result stops the GitHub Actions job under the existing shell failure behavior.
- The workflow does not use `continue-on-error` for the audit step.
- The workflow does not use `|| true` or any equivalent exit-code suppression.
- Build and deployment cannot proceed after an audit error.

## Warning Semantics

- Warning-only audit results return exit code 0.
- Warnings remain visible in the step output.
- A warning does not conceal an error or weaken the audit's failure policy.
- The current single warning is the known reshoot requirement for `rotary-knob-smart-control-display`.

## Workflow Change

The implementation changed only:

- `.github/workflows/aws-production-deploy.yml`
- `tests/static-export.test.ts`

The workflow addition is:

```yaml
- name: Audit product media
  run: npm run media:audit
```

Checkout v5, runner labels, workflow permissions, environment validation, lint, data tests, build, expected-count checks, atomic deployment, health checks, indexing protection, and rollback behavior remained unchanged.

## Test Coverage

The deployment workflow test verifies that:

- `Validate data` precedes `Audit product media`.
- `Audit product media` precedes `Build static export`.
- The build precedes `Deploy atomic release`.
- The audit command is exactly `npm run media:audit`.
- The audit step does not contain `continue-on-error` or `|| true`.

Existing product media governance tests continue to verify that audit errors return non-zero and that warning-only results do not fail.

## Local Validation

- `npm run media:audit`: passed, exit code 0
- `npm run lint`: passed
- `npm run test:data`: 63/63 passed
- `npm run build`: passed
- Static generation: 156/156 pages
- Products: 36
- Resources: 15
- Sitemap: 76 URLs
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- `git diff --check`: passed

## Actions Verification

- Workflow run: `29743460186` (`AWS static production deploy #24`)
- Run URL: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29743460186`
- Exact source SHA: `8f58232c691012824dbe4d2fbaaf457af3410920`
- Runner version: `2.335.1`
- Checkout: `actions/checkout@v5`
- Result: succeeded
- `Audit product media`: completed successfully as independent step 7
- Data tests: 63/63 passed
- Static build: 156/156 passed

The audit completed before the build began. Its one warning did not block the successful build or deployment, while its zero-error result satisfied the release gate.

## Media Audit Output

- Products: 36
- Manifest entries: 132
- Full images: 132
- Thumbnails: 132
- WebP assets: 264
- Multi-image products: 35
- Single-image products: 1
- Complete products: 31
- Basic products: 4
- Duplicate full-image hashes: 0
- Orphan files: 0
- Pending or rejected published media: 0
- Audit errors: 0
- Audit warnings: 1

## Deployment

- Previous release: `/srv/dualcorelink/frontend/releases/f1d1f8802db1-20260720-201800`
- New release: `/srv/dualcorelink/frontend/releases/8f58232c6910-20260720-204754`
- Current symlink resolves to the new release.
- Atomic release activation: succeeded.
- Local HTTPS health check: passed on attempt 1.
- External HTTPS health check: passed on attempt 1.
- Test-domain indexing protection verification: succeeded.
- Rollback: not triggered.

## Production Regression

Read-only verification after deployment recorded:

- Sitemap: HTTP 200 with 76 unique URLs
- Sitemap URLs returning HTTP 200: 76/76
- HTTP 4xx: 0
- HTTP 5xx: 0
- Product pages and Product JSON-LD: 36/36
- Resource pages and Article JSON-LD: 15/15
- Resource BreadcrumbList JSON-LD: 15/15
- Duplicate sitemap URLs: 0
- Production noindex: 0
- Empty `href="#"`: 0
- Mixed content: 0
- Localhost, SiteGround, Pages, CMS test-host, and AWS test-host leakage: 0

No website, content, gallery, image, CMS, AWS, DNS, Cloudflare, Nginx, GA4, runner, secret, or environment configuration was modified by Phase A13.

## Remaining Warning

`rotary-knob-smart-control-display` remains a valid single-image product with one non-blocking media governance warning: a verified same-model reshoot is still required. The warning remains visible and does not affect current production output.

## Git Record

- Implementation commit: `8f58232c691012824dbe4d2fbaaf457af3410920`
- Implementation message: `ci: add product media audit quality gate`
- Implementation push: succeeded
- Report commit: recorded after this report is committed

## Risks

The workflow change has a narrow scope and uses an already validated command. The principal remaining content-operation risk is the known Rotary Knob reshoot requirement. Intermittent outbound GitHub connectivity has occurred during read-only fetch operations, but it did not affect implementation push, Actions run #24, release activation, or production availability.

## Final Status

Phase A13 passed. Product media integrity is now an explicit production deployment gate: errors stop deployment before build and release creation, warnings remain observable without blocking, the exact implementation commit deployed successfully, health checks passed on the first attempt, and the production baseline remains intact.

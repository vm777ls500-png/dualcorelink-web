# GitHub Actions Maintenance Phase A12 - Node 24 Runtime Acceptance

Date: 2026-07-20

## Scope

Phase A12 removed the checkout action's Node 20 deprecation warning while preserving the existing AWS self-hosted production deployment, atomic release activation, health checks, and rollback behavior. No website content, application feature, CMS data, DNS, Cloudflare, Nginx routing, deployment secret, IAM policy, runner registration, or runner label was changed.

## Original Warning

The production workflow used `actions/checkout@v4`. A prior successful run recorded that its Node 20 action runtime was deprecated and was being forced onto Node 24 by the runner.

## Runner Version Audit

- Runner version before and after maintenance: `2.335.1`
- Required minimum for `actions/checkout@v5`: `2.327.1`
- Service state: enabled, active, online
- Service account and work configuration: unchanged
- Labels: default self-hosted Linux/x64 labels plus `dualcorelink-production`, unchanged
- Available runner action runtimes included Node 24
- Disk use during the audit was 36%, with approximately 50 GB available

The runner exceeded the minimum compatible version before the workflow edit.

## Compatibility Decision

`actions/checkout@v5` uses the Node 24 action runtime and requires runner `2.327.1` or newer. Runner `2.335.1` was therefore compatible without maintenance downtime.

Action runtime Node 24 is separate from the Node.js version used by the application build. Phase A12 did not change the project's dependency versions or build runtime policy.

## Runner Upgrade Decision

No runner upgrade, service stop, package download, re-registration, label update, token rotation, or configuration migration was required.

## Workflow Change

File changed:

- `.github/workflows/aws-production-deploy.yml`

The only implementation change was:

```yaml
uses: actions/checkout@v5
```

The exact-SHA checkout and existing parameters were retained:

- `ref: ${{ github.sha }}`
- `fetch-depth: 1`
- `persist-credentials: false`

Concurrency, environment validation, build commands, release directories, atomic symlink activation, health checks, indexing protection, and rollback logic were unchanged.

## Checkout v5 Verification

GitHub Actions run:

- Run: `29724089954` (`AWS static production deploy #18`)
- URL: `https://github.com/vm777ls500-png/dualcorelink-web/actions/runs/29724089954`
- Source SHA: `2a4f5fe451b214420010e32cc5c20721fac98f73`
- Result: succeeded

Runner diagnostics confirmed:

- The action reference was `actions/checkout@v5`
- The resolved action revision was `93cb6efe18208431cddfb8368fd83d5badbf9bfd`
- Main and post steps used the runner's Node 24 runtime
- Checkout main and post steps both exited successfully
- No runner compatibility warning was emitted

## Node 20 Warning Verification

The run contained no `Node.js 20 is deprecated` warning and no message that checkout was being forced from Node 20 to Node 24. It also contained no new Node 24 runtime or runner compatibility warning.

## Other Actions Audit

The workflow contains no `actions/setup-node`, artifact upload/download, cache action, third-party action, or repository-local composite action. No unrelated action major version was changed.

## Permissions Review

The workflow retains the top-level minimum permission:

```yaml
permissions:
  contents: read
```

It does not request `id-token`, `packages`, write access, or additional Actions permissions.

## Local Validation

- `npm run lint`: passed
- `npm run test:data`: 60/60 passed
- `npm run media:audit`: passed with 0 errors and 1 known non-blocking reshoot warning
- `npm run build`: passed
- Static generation: 156/156 pages
- Products: 36
- Resources: 15
- Sitemap: 76 URLs
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- `git diff --check`: passed

The repository has no workflow lint dependency installed, so no new lint tool or dependency was added.

## Actions Run

The self-hosted runner completed checkout, validated build environment loading, `npm ci`, lint, data tests, build, static-page count validation, deployment, test-domain indexing protection, and checkout cleanup successfully.

The dedicated `npm run media:audit` command is not a separate workflow step. Its 0-error result above is from the required local validation; media governance is also covered by the passing data-test suite. This phase did not expand workflow scope beyond the runtime warning fix.

## Deployment

- Previous release: `/srv/dualcorelink/frontend/releases/8fde0dc54049-20260720-145521`
- New release: `/srv/dualcorelink/frontend/releases/2a4f5fe451b2-20260720-151816`
- Current symlink resolves to the new release
- Atomic activation step: succeeded
- Local HTTPS health check: HTTP 200
- External HTTPS health check: HTTP 200
- Test-domain indexing protection verification: succeeded
- Rollback: not triggered

Nginx, MariaDB, PHP 8.3 FPM, Fail2ban, and the runner service remained active. Failed services were 0. No new PHP or Nginx service warning was recorded after deployment. Two older oversized-body requests in the generic Nginx error log predated this deployment and were unrelated internet traffic.

## Production Regression

- Homepage: HTTP 200
- Products listing: HTTP 200
- Representative product detail: HTTP 200
- Resources listing: HTTP 200
- Contact page: HTTP 200
- Sitemap: HTTP 200, 76 unique URLs
- Sitemap URLs returning HTTP 200: 76/76
- Product pages and Product JSON-LD: 36/36
- Resource Article JSON-LD: 15/15
- Resource BreadcrumbList JSON-LD: 15/15
- Product WebP assets: 264/264 HTTP 200 with expected MIME type and matching content
- Broken product media: 0
- HTTP 4xx: 0
- HTTP 5xx: 0
- Empty `href="#"`: 0
- Mixed content: 0
- Localhost, SiteGround, Pages, test-host, and AWS test-host leakage: 0
- Production noindex: 0
- Known private path, credential filename, private notification address, or private-key marker leakage in sampled entry pages: 0

## Remaining Warnings

- Product media governance retains one known non-blocking warning: `rotary-knob-smart-control-display` requires a verified same-model reshoot.
- Runner logs showed temporary GitHub SSL reconnect events before this maintenance run. The runner recovered automatically and completed subsequent deployments. No reconnect or runtime compatibility failure affected run #18.
- The production workflow does not run the dedicated media audit command as a separate step; local media audit and data-test coverage passed. Adding a separate deployment gate should be evaluated independently rather than bundled into this runtime-only change.

## Git Record

- Implementation commit: `2a4f5fe451b214420010e32cc5c20721fac98f73`
- Implementation message: `chore: upgrade github actions runtime`
- Report commit: recorded after this report is committed

## Risks

The checkout major-version change has a narrow blast radius and was validated on the actual production runner. Existing deployment safety mechanisms remained unchanged. The main operational observation is intermittent outbound GitHub connectivity, not checkout v5 compatibility.

## Final Status

Phase A12 passed. Checkout now runs on the official v5 Node 24 runtime without the previous Node 20 warning, production deployment completed without rollback, and the production regression baseline remains intact.

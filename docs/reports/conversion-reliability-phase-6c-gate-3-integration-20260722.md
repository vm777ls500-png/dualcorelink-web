# Conversion Reliability Phase 6C Gate 3 Integration

Date: 2026-07-22
Environment: AWS production account, non-production inquiry path
Status: Implementation and AWS dry-run verification complete; GitHub Actions pending network recovery

## Scope

Gate 3 implemented the inquiry submission backend, a disabled-by-default frontend integration, PII-safe analytics events, reliability tests, and a pending Nginx location template. The production Contact experience remains on the existing mailto workflow. Production Nginx was not changed or reloaded, and no real email was sent.

## Backend Implementation

The Lambda handler now enforces an exact request schema and rejects unknown fields. Validation covers required and valid email, per-field length limits, a 16 KiB body limit, control characters and header injection, honeypot submissions, minimum completion time, allowed Origin, content type, HTTP method, and idempotency key format.

The DynamoDB flow uses a conditional claim for duplicate protection and records `processing`, `accepted`, or `failed` states with TTL. Persisted records contain only:

- `idempotencyKey`
- `submissionId`
- `status`
- `createdAt`
- `expiresAt`

No form body, email address, phone number, company, message, or other inquiry content is stored.

## Logging

Application logs are restricted to the approved operational fields:

- `submissionId`
- `requestId`
- `status`
- `durationMs`
- `errorCategory`
- `sourceType`
- `sourceSlug`
- `ctaLocation`

The controlled AWS invocation confirmed that the emitted log record followed this allowlist and did not include the request body or contact fields.

## SES And Dry Run

The real SES code path uses UTF-8 content, strict Reply-To validation, header-safe subjects, and no attachments. A `202` response means accepted for processing and does not claim inbox delivery.

The deployed Lambda remains configured with `DRY_RUN=true`. The controlled request returned HTTP `202` with status `dry_run`; the handler did not call SES. SES remains in Sandbox (`ProductionAccessEnabled=false`). Sending is enabled at the account level, but no message was sent during Gate 3.

## Idempotency Verification

The first controlled request returned HTTP `202`. Repeating the same request with the same idempotency key returned HTTP `409` with `duplicate_submission`. The corresponding DynamoDB record reached `accepted` and contained only the approved metadata fields.

## Frontend Integration

The Contact form has a testable server-submission path with:

- an explicit feature flag and exact same-origin `/api/inquiry` endpoint requirement;
- a 10-second `AbortController` timeout;
- single-flight submission protection;
- stable idempotency keys across failed retries;
- status-specific handling for 400, 403, 409, 413, 429, 500, 502, 503, 504, timeout, and network failures;
- field retention on failure;
- form reset only after a valid HTTP `202` response;
- retained WhatsApp and mailto fallbacks.

The production build does not define the server-submission flag or endpoint. Exported Contact HTML continues to show `Prepare Email Draft`, retains the mailto notice, and contains no `/api/inquiry` reference. The formal Contact path therefore did not switch in Gate 3.

## Analytics

The implementation adds:

- `inquiry_form_submit_attempt`
- `inquiry_form_submit_success`
- `inquiry_form_submit_failure`

Event payloads are restricted to `source_type`, `source_slug`, `cta_location`, `category`, `error_category`, and `page_path`. Tests reject PII fields from analytics payloads.

## Pending Nginx Configuration

Created `deploy/nginx/inquiry-api.location.conf.template` for the exact `/api/inquiry` path. It provides POST-only access, a 16 KiB body limit, bounded proxy timeouts, disabled buffering and caching, explicit forwarded headers, and no body logging.

The snippet is intentionally not included by the production Nginx template. No server file was changed, `nginx -t` was not required for production, and Nginx was not reloaded.

## AWS Deployment Verification

The CloudFormation change set was reviewed before execution. It contained only in-place modifications to the Lambda function and API Gateway integration; both reported `Replacement=False`. The stack completed with `UPDATE_COMPLETE`.

The staged template was verified before use:

- Size: 29,311 bytes
- SHA-256: `AC5FA9F2209AE82EF06F857378D0DA8E3073488F4D0A0DC98CA01465B0882B04`

Post-update checks confirmed:

- Lambda state: active
- Lambda last update: successful
- Runtime: Node.js 24.x
- `DRY_RUN=true`
- Controlled request: HTTP 202, `dry_run`
- Duplicate request: HTTP 409
- DynamoDB persisted fields: metadata only
- SES production access: disabled
- Real email sends: zero

## Validation

- `npm ci`: passed
- `npm run media:audit`: passed, 0 errors and the existing single reshoot warning
- `npm run lint`: passed
- `npm run test:data`: 91/91 passed
- `npm run test:inquiry-infra`: 23/23 passed
- `npm run build`: passed
- Static generation: 156/156
- Products: 36
- Resources: 15
- Sitemap URLs: 76
- Product JSON-LD: 36/36
- Article JSON-LD: 15/15
- Resource BreadcrumbList: 15/15
- `git diff --check`: passed

Backend coverage includes valid, invalid, oversized, honeypot, too-fast, origin, unknown-field, idempotency, SES failure, DynamoDB failure, header injection, log redaction, and dry-run behavior. Frontend coverage includes 202, 400, 403, 409, 413, 429, 500, 502, timeout, duplicate, retention, fallback, analytics redaction, feature-flag defaults, and pending Nginx semantics.

## Git Record

- `d6fd747cab4ab0465b8daca62401303f3eb190d7` - `feat: add inquiry submission integration`
- `f0a6ec635bec214a4008dd9ff3ccbae33d019b90` - `test: cover inquiry backend reliability`

Both commits are local because GitHub HTTPS connectivity was unavailable during this Gate. Read-only remote checks and controlled push attempts failed before reaching GitHub on TCP 443. No proxy, force push, rebase, amend, or remote change was used.

## Actions Status

GitHub Actions has not run for these commits because they have not reached `origin/main`. The workflow includes a new independent `Validate inquiry infrastructure` step, but its exact-SHA execution remains pending. No Actions result, production frontend release, or symlink switch is claimed.

## Unchanged Production State

- SES remains in Sandbox.
- `DRY_RUN` remains enabled.
- No real email was sent.
- Production Contact remains on mailto.
- Production Nginx was not changed or reloaded.
- The pending Nginx template was not activated.
- No DNS, Cloudflare, WordPress, CMS, or GA4 setting was changed.

## Gate 4 Readiness

The code and AWS dry-run backend are ready for Gate 4 review. Gate 4 must not start until both implementation commits and this report are pushed, the exact-SHA GitHub Actions run passes, and the user separately authorizes production feature activation and Nginx activation. SES production access and any real delivery test remain separate controlled decisions.

## Risks And Observations

- GitHub network connectivity is the only current archival blocker.
- The production server-submission route remains inactive, so no customer-facing behavior changed.
- The existing product-media reshoot warning is unrelated and remains non-blocking.
- A successful dry-run confirms acceptance and duplicate protection, not inbox delivery.

## Final Status

Gate 3 implementation and AWS dry-run validation are complete. Remote Git/Actions closure is pending; Gate 4 is not yet authorized or started.

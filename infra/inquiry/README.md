# DualCoreLink Inquiry Backend

This directory defines the dry-run AWS backend for server-side inquiry submission.
Gate 3 implements the production code path but keeps `DRY_RUN=true`; it does not
activate the production Contact form or Nginx routing.

## Resources

- Lambda `dualcorelink-inquiry-submit` on the supported `nodejs24.x` runtime
- API Gateway HTTP API with only `POST /api/inquiry`
- DynamoDB idempotency table with TTL and retained data
- Least-privilege Lambda execution role
- Retained Lambda and API access log groups with 14-day retention
- SES Easy DKIM domain identity

The Lambda remains in `DRY_RUN=true` through Gate 3. It strictly validates controlled
payloads, rejects unknown or oversized input, uses the idempotency table, and emits
metadata-only logs. The real SES path is covered by dependency-injected tests, but
dry-run execution returns before that path and does not send email.

## Request contract

- Same-origin `POST /api/inquiry` only
- JSON body maximum: 16 KiB
- Strict top-level and attribution fields; unknown fields fail closed
- Required valid email, bounded strings, honeypot, and minimum completion time
- `X-Idempotency-Key` required; conditional conflicts return HTTP 409
- HTTP 202 means accepted by the service, not delivered to an inbox

DynamoDB stores only a hashed idempotency key, submission ID, status timestamps,
TTL, and a non-sensitive error category. It never stores inquiry fields or message text.

## Mail routing parameters

The template stores only the names of two SSM SecureString parameters:

- `/dualcorelink/inquiry/sender-address`
- `/dualcorelink/inquiry/recipient-address`

Create their values through an authorized AWS console or CLI session. Do not commit
the values, deployment parameter files, credentials, or CloudFormation outputs.

## Local checks

```text
node infra/inquiry/scripts/sync-inline-handler.mjs --check
node --test infra/inquiry/test/*.test.mjs
```

Run the sync command without `--check` after changing `src/handler.cjs`.

The pending Nginx snippet is maintained at
`deploy/nginx/inquiry-api.location.conf.template`. It contains an unresolved host
placeholder and must not be included or activated before Gate 4 approval.

## Deployment controls

1. Validate `template.yaml` with CloudFormation in `ap-southeast-1`.
2. Create and inspect a change set for stack `dualcorelink-inquiry`.
3. Acknowledge named IAM capabilities only after policy review.
4. Execute the reviewed change set.
5. Add only the three generated Easy DKIM CNAME records to authoritative DNS.
6. Keep the API disconnected from production Nginx and Contact until later gates.

The example parameter file contains no mailbox values, AWS identifiers, endpoint URLs,
credentials, or tokens.

## Rollback

The website needs no Gate 2 rollback because its request path is unchanged. The API
route can be disabled independently. Stack deletion retains the DynamoDB table and log
groups; retained resources require explicit later review. Remove DKIM records only after
confirming the SES identity will no longer be used.

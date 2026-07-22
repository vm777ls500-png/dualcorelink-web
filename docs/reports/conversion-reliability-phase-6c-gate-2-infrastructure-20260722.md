# Conversion Reliability Phase 6C - Gate 2 Infrastructure

## Gate 1 Recap

Gate 1 confirmed `ap-southeast-1`, an SES sandbox account, and no pre-existing inquiry API, Lambda, DynamoDB table, execution role, or inquiry log group. The production Contact flow remained the existing mail-client and WhatsApp fallback.

## Scope

Gate 2 established a minimal, dry-run server-side inquiry foundation without connecting it to production Nginx or the Contact form. No customer data was used, no message was sent, and no production request path changed.

## Infrastructure as Code

The implementation is maintained under `infra/inquiry/`:

- `template.yaml`: CloudFormation resources and least-privilege policies
- `parameters.example.json`: non-sensitive example parameters
- `src/handler.cjs`: testable inquiry handler
- `scripts/sync-inline-handler.mjs`: deterministic inline Lambda synchronization
- `test/handler.test.mjs`: validation, origin, anti-spam, idempotency, logging, and dry-run tests
- `test/template.test.mjs`: CloudFormation security and inline JavaScript tests
- `README.md`: deployment controls and rollback notes

CloudFormation template validation and change-set review completed before execution. The reviewed creation change set contained 11 additive resources and no replacement. A subsequent reviewed update fixed the generated inline-handler comment markers; it modified only the Lambda and integration without replacement.

## AWS Resources

- Stack: `dualcorelink-inquiry`
- Region: `ap-southeast-1`
- Stack status: `CREATE_COMPLETE`, followed by successful non-replacement handler update
- Managed resources: 11
- Lambda: `dualcorelink-inquiry-submit`
- HTTP API: `dualcorelink-inquiry-api`
- DynamoDB: `dualcorelink-inquiry-idempotency`
- IAM role: `dualcorelink-inquiry-submit-role`
- SES identity: `dualcorelink.com`

AWS account identifiers, API identifiers, and the full invoke URL are intentionally omitted.

## Lambda

- Runtime: `nodejs24.x`
- Architecture: `x86_64`
- Memory: 128 MB
- Timeout: 10 seconds
- Mode: `DRY_RUN=true`
- Production form integration: disabled
- Real email delivery: disabled

The handler enforces the allowed origin, JSON/body limits, required fields, attribution shape, a honeypot, minimum completion time, and a hashed idempotency key. Dry-run submissions claim the idempotency record and return an accepted dry-run result without calling SES.

Logs contain only submission/request identifiers, approved attribution fields, status, duration, and an error category. Request bodies, email addresses, phone numbers, company names, messages, authorization values, and full IP addresses are not logged.

## API Gateway

- Protocol: HTTP API
- Stage: `$default`, auto-deploy enabled
- Route: `POST /api/inquiry`
- Other application routes: none
- CORS origin: only `https://dualcorelink.com`
- CORS methods: `POST`, `OPTIONS`
- Allowed headers: `content-type`, `x-idempotency-key`
- Credentials: disabled
- Rate limit: 2 requests/second
- Burst limit: 5
- Integration timeout: 10 seconds
- Production Nginx proxy: not configured

Access logs contain only request ID, route key, status, and response latency.

## DynamoDB

- Billing: `PAY_PER_REQUEST`
- Partition key: `idempotencyKey`
- TTL: enabled on `expiresAt`
- Server-side encryption: enabled with the AWS-owned service key
- Point-in-time recovery: not enabled for this short-lived idempotency-only dataset
- Deletion and replacement policy: `Retain`

The application writes only idempotency metadata. It does not store inquiry PII or message content in DynamoDB.

## IAM

The Lambda role is limited to:

- create streams and write events only in the target Lambda log group
- get, put, and update items only in the target DynamoDB table
- read only the two named inquiry SSM parameters
- send email only from the regional SES domain identity

Deployed-policy inspection found zero wildcard actions and zero wildcard resources. The role has no IAM administration, Route 53, S3, DynamoDB scan/delete, SES identity management, or infrastructure mutation permissions.

## CloudWatch

- Lambda log group: `/aws/lambda/dualcorelink-inquiry-submit`
- API access log group: `/aws/apigateway/dualcorelink-inquiry-api`
- Retention: 14 days
- Deletion and replacement policy: `Retain`
- Request body and authorization logging: disabled

## SES Identity and DNS

- Identity type: domain
- Domain: `dualcorelink.com`
- DKIM: Easy DKIM, RSA 2048-bit, signing enabled
- SES account mode: sandbox
- Verification status at initial deployment: pending
- DKIM status at initial deployment: pending
- DKIM records added: 3 CNAME records
- DNS mode: DNS only
- TTL: Cloudflare automatic default
- Same-name conflicts: 0
- Public recursive DNS: 3/3 CNAMEs resolve to their SES-generated targets
- Current SES verification: pending AWS detection after successful public DNS publication

Only the three generated DKIM CNAMEs were added. Existing A, AAAA, CNAME, MX, SPF, DMARC, validation, and mail-routing records were not removed, overwritten, or otherwise modified. Full DKIM tokens and targets are intentionally omitted.

Custom MAIL FROM was not enabled. The existing SPF and DMARC posture was left unchanged.

## SSM Parameter Storage

Sender and recipient routing values are stored as two Standard `SecureString` parameters. Git contains only their parameter names:

- `/dualcorelink/inquiry/sender-address`
- `/dualcorelink/inquiry/recipient-address`

The values were entered through an authorized AWS session and were not printed, copied into deployment artifacts, or committed.

## Dry-Run Validation

The deployed endpoint was tested only with synthetic `example.invalid` data:

- allowed-origin preflight: HTTP 204
- disallowed origin: HTTP 403
- valid synthetic submission: HTTP 202 with `dry_run`
- real email sent: no
- customer data used: no

The first deployment exposed an invalid JavaScript comment marker at the start of the generated inline handler. CloudWatch identified the syntax error. The generator and template were corrected, a JavaScript-compilation regression test was added, and a reviewed non-replacement CloudFormation update restored the dry-run endpoint.

## Cost Controls

- DynamoDB on-demand billing
- Lambda without provisioned concurrency
- one `$default` HTTP API stage
- finite 14-day log retention
- no NAT Gateway
- no VPC attachment
- no WAF
- no additional fixed-cost service

Low-volume cost is expected to remain small, but is not represented as guaranteed zero.

## Security Checks

- wildcard IAM actions/resources: 0
- wildcard CORS origins: 0
- public debug route: 0
- request-body logging: 0
- PII in test payloads/logs: 0
- DynamoDB TTL: enabled
- production Nginx changes: 0
- production Contact changes: 0
- real SES sends: 0

## Local Validation

- Inquiry infrastructure tests: 12/12 passed
- Product media audit: passed with 0 errors and the existing single non-blocking reshoot warning
- Lint: passed
- Data tests: 76/76 passed
- Production build: passed
- Static generation: 156/156
- Export cleanup: passed
- `git diff --check`: passed

## Rollback

No website rollback is required because the production request path was not changed. The API can remain disconnected or be disabled independently. Stack deletion would retain the DynamoDB table and log groups for deliberate later review. The SES identity and its three DKIM records should be removed only after confirming they are no longer needed.

## Git Record

- Intended implementation commit: `infra: add inquiry submission backend foundation`
- Scope: `infra/inquiry/**`, the infrastructure test command, and this non-sensitive Gate 2 checkpoint
- Credentials, mailbox values, AWS identifiers, API invoke URL, and deployment outputs: excluded

## Gate 3 Readiness

The backend foundation, security controls, and synthetic dry-run path are ready. Gate 3 must not connect production traffic until SES identity and DKIM verification report success and the next gate separately reviews activation, monitoring, failure behavior, and rollback.

## Final Status

Gate 2 infrastructure deployment and DNS publication are complete. SES verification remains pending AWS detection, so Gate 2 is not yet fully closed and production activation remains blocked.

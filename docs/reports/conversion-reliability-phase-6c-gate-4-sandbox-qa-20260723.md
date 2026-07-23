# Conversion Reliability Phase 6C Gate 4 Sandbox QA

Date: 2026-07-23
Environment: AWS production account, inactive production inquiry path
Status: Sandbox delivery and privacy/logging verification passed; production activation not performed

## Scope

Gate 4 performed one explicitly authorized SES Sandbox delivery test through the
inactive inquiry backend, restored dry-run mode, and completed a read-only
privacy audit of Lambda logs, API Gateway access logs, DynamoDB metadata, and SES
metrics.

The production Contact experience remained on mailto. The production Nginx
`/api/inquiry` location was not activated or reloaded. No second API request or
email was sent during the privacy verification.

## Sandbox API Result

- API calls: 1
- Automatic retries: 0
- HTTP response: 202
- Response status: `accepted`
- SES accepted calls: 1
- DynamoDB status at acceptance: `accepted`
- Duplicate responses: 0
- Inbox result: one matching message received
- Spam result: no matching message observed
- Bounce result: 0
- Complaint result: 0
- Attachment: none
- UTF-8 rendering: passed
- Attribution: product source, expected product slug, and `product_hero` CTA

HTTP 202 and SES acceptance are recorded separately from inbox delivery. Inbox
delivery was independently observed for the single matching test message.

## Restored Safety State

- CloudFormation stack: `UPDATE_COMPLETE`
- Lambda: `DRY_RUN=true`
- SES production access: disabled; account remains in Sandbox
- SES send count for the verification date: 1
- Production Contact: HTTP 200 and mailto remains present
- Production Contact HTML reference to `/api/inquiry`: absent
- Production Nginx `/api/inquiry`: not activated
- Production feature flag: not enabled

## Lambda Log Visibility

Log group: `/aws/lambda/dualcorelink-inquiry-submit`

- Log group exists: yes
- Retention: 14 days
- Log streams present: 4
- Events in the QA window: 5
- Events matching the unique submission: 1
- Matching log streams: 1
- Lambda platform START records: 1
- Lambda platform END records: 1
- Lambda platform REPORT records: 1

The application event contained only:

- `submissionId`
- `requestId`
- `status`
- `durationMs`
- `errorCategory`
- `sourceType`
- `sourceSlug`
- `ctaLocation`

## Lambda Log Privacy Scan

The QA-window log scan returned:

- Prohibited field-key matches: 0
- Email-pattern matches: 0
- IPv4-pattern matches: 0
- Authorization, bearer-token, or Cookie-pattern matches: 0

No request body, contact value, complete headers, credentials, message content,
or attachment metadata was observed.

## API Gateway Access Log

Log group: `/aws/apigateway/dualcorelink-inquiry-api`

- Log group exists: yes
- Retention: 14 days
- Log streams present: 5
- Events in the QA window: 1
- `POST /api/inquiry` events: 1
- HTTP 202 events: 1

The access-log event contained only:

- `requestId`
- `routeKey`
- `status`
- `latency`

Privacy scan results:

- Prohibited field-key matches: 0
- Email-pattern matches: 0
- IPv4-pattern matches: 0
- Authorization, bearer-token, or Cookie-pattern matches: 0

The access log did not contain a request body, contact fields, complete headers,
or a complete client IP.

## DynamoDB Field Audit

The pre-expiry AWS response captured for the accepted item contained only:

- `idempotencyKey`
- `submissionId`
- `status`
- `createdAt`
- `expiresAt`

Results:

- Status: `accepted`
- TTL field present: yes
- Table TTL status: enabled
- TTL attribute: `expiresAt`
- Configured TTL duration: 900 seconds
- Prohibited fields: 0
- Attribution fields persisted: 0

The current table scan no longer returned the item because the 900-second TTL had
elapsed. This is expected retention behavior, not a failed write. The
pre-expiry response confirms the accepted status, TTL, and actual persisted field
set without exposing the idempotency key or submission values.

## SES Metrics

- SES environment: Sandbox
- Production access: not enabled
- Send count: 1
- Bounce count: 0
- Complaint count: 0
- Additional sends during privacy verification: 0

## Changes And Privacy

This verification was read-only. It did not modify Lambda, API Gateway,
DynamoDB, SES, IAM, DNS, Nginx, Contact, Cloudflare, WordPress, or any production
feature flag. No AWS account identifier, API invoke URL, email address, request
body, complete IP, credential, SSM value, or message body is included in this
report.

## Gate 4C Readiness

The Gate 4C prerequisites covered by this audit passed:

- Lambda execution log visible
- Lambda log PII matches: 0
- API Gateway access log visible
- API access-log body/PII matches: 0
- DynamoDB accepted status confirmed from pre-expiry evidence
- DynamoDB prohibited fields: 0
- DynamoDB TTL enabled and present
- Additional SES sends: 0
- `DRY_RUN=true`
- Production Contact remains mailto
- Production Nginx route remains inactive

Gate 4C may proceed only under a separate explicit activation authorization. This
report does not authorize or perform Nginx activation, Contact feature-flag
activation, additional email delivery, or SES production use.

## Risks And Observations

- Idempotency records use a short 900-second TTL. Operational audits that need
  item-level evidence must capture field metadata promptly and without retaining
  form content.
- SES remains in Sandbox. Production sending remains unavailable until AWS
  approves production access and a later gate explicitly authorizes activation.
- A 202 response proves accepted processing, not final inbox delivery; inbox
  delivery must remain a separately observed result.

## Final Status

Gate 4 Sandbox delivery and the Gate 4C privacy/logging prerequisites are
verified. Production inquiry activation remains unchanged and requires a
separate controlled gate.

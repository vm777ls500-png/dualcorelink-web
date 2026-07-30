# Conversion Reliability Phase 6C Final Acceptance

Date: 2026-07-30
Region: `ap-southeast-1`
Status: PASS

## Executive Summary

Conversion Reliability Phase 6C progressed through controlled, separately
authorized gates:

- Gate 1: Architecture Review - complete
- Gate 2: Infrastructure Provisioning - complete
- Gate 3: Implementation - complete
- Gate 4: Sandbox QA - complete
- Gate 4C: Activation Review - complete
- Gate 4D: SES Final Read-Only Verification - complete
- Gate 5: Production Activation - complete
- Final Acceptance: PASS

The server-side inquiry path is active in production. One authorized production
QA submission completed the full delivery chain, the business inbox receipt was
observed, privacy controls passed, fallback paths remain available, and no
rollback occurred.

## Final Read-Only State

The final read-only review confirmed:

- SES production access: enabled
- SES account sending: enabled
- SES review status: `GRANTED`
- daily quota: 50,000 messages
- maximum send rate: 14 messages per second
- domain identity: `SUCCESS`
- Easy DKIM: `SUCCESS`
- DKIM signing: enabled
- DKIM records: 3 of 3
- account suppression: `BOUNCE` and `COMPLAINT`
- observed QA statistics point: 1 attempt, 0 bounce, 0 complaint, 0 reject
- CloudFormation stack: `UPDATE_COMPLETE`
- Lambda state: `Active`
- Lambda `DRY_RUN`: `false`
- API route: only `POST /api/inquiry`
- DynamoDB table: `ACTIVE`
- DynamoDB TTL: `ENABLED`
- Lambda log retention: 14 days
- inquiry parameters: two `SecureString` parameters; values were not read
- Nginx configuration test: passed
- failed system services: 0
- public `GET /api/inquiry`: HTTP 404
- production release:
  `/srv/dualcorelink/frontend/releases/1d3cbb296321-20260730-133155`

No AWS resource, Nginx configuration, Contact behavior, feature flag, email,
form submission, or deployment was changed during final acceptance.

## Production Architecture

```text
Browser
  -> Nginx
  -> API Gateway
  -> Lambda
  -> DynamoDB
  -> Amazon SES
  -> Business Inbox
```

- Nginx exposes the same-origin, exact inquiry route.
- API Gateway provides the controlled POST route and throttling.
- Lambda validates the request and performs delivery orchestration.
- DynamoDB stores idempotency metadata only.
- SSM stores sender and recipient configuration as `SecureString`.
- CloudWatch application logging uses a PII-safe allowlist.
- Amazon SES provides authenticated transactional delivery.
- Mailto and WhatsApp remain visible fallbacks.

## Production Evidence

The single authorized production QA produced:

- `POST /api/inquiry`: HTTP 202
- public `GET /api/inquiry`: HTTP 404
- Lambda status: `accepted`
- DynamoDB status: `accepted`
- DynamoDB TTL: present
- SES accepted attempt: 1
- Inbox: 1 matching message observed
- Spam: 0 matching messages observed
- Bounce: 0
- Complaint: 0
- Reject: 0
- duplicate send: 0
- Lambda application-log prohibited-field matches: 0
- API access-log body/PII matches: 0
- DynamoDB prohibited-field matches: 0
- deployment: successful
- rollback: not triggered

HTTP 202 and SES acceptance are not treated as inbox-delivery guarantees. Inbox
delivery was verified independently.

## Security Controls

The accepted production controls include:

- exact request schema and unknown-field rejection
- required-field, length, content-type, and body-size validation
- CRLF and header-injection rejection
- Origin restriction
- honeypot and minimum-completion-time checks
- API throttling
- single-flight frontend submission
- idempotency-key validation
- DynamoDB conditional writes and TTL
- verified SES domain identity
- Easy DKIM with signing enabled
- bounce and complaint suppression
- UTF-8 transactional messages
- no attachment handling
- PII-safe Lambda and API logs
- no form body or inquiry PII in DynamoDB
- least-privilege IAM without global action or resource wildcards
- SSM `SecureString` configuration
- no public GET inquiry endpoint
- mailto and WhatsApp fallbacks

## Local Validation

Final acceptance ran only local or read-only checks:

| Check | Result |
|---|---|
| `npm test` | Not defined in `package.json`; command returned `Missing script` |
| `npm run test:data` | Passed `122/122` using the read-only production CMS endpoint |
| `npm run test:inquiry-infra` | Passed `23/23`; inline Lambda synchronized |
| `npm run lint` | Passed |
| `npm run media:audit` | Passed; 0 errors, 1 existing warning |
| `npm run build` | Passed; static generation `163/163`, export cleanup passed |
| Public content baseline | 156 pages, sitemap 76 |
| Media baseline | 132 full images, 132 thumbnails, 264 WebP assets |
| `git diff --check` | Passed before commit |

The first data-test invocation used the default inactive local CMS address and
failed 5 CMS-dependent cases. The same unchanged suite passed 122/122 when
rerun against the approved read-only production CMS endpoint.

## Deployment Record

- successful GitHub Actions run: `30516771066`
- exact deployed source: `1d3cbb296321e089665b866a6e1dce82efb7c59e`
- release:
  `/srv/dualcorelink/frontend/releases/1d3cbb296321-20260730-133155`
- current symlink: `/srv/dualcorelink/frontend/current`
- internal HTTPS health check: passed
- external HTTPS health check: passed
- production rollback: not triggered
- Gate 5 report baseline commit:
  `4f3d4c301413cc4c8476cd83e3774b5a2ba77187`

This final acceptance commit is documentation-only and must not trigger a new
production release.

## Rollback

The approved rollback order is documented but was not executed:

1. Turn off the frontend server-submission feature flag.
2. Restore Contact to the mailto-primary path.
3. Disable the exact Nginx `/api/inquiry` location.
4. Restore CloudFormation `DryRunMode` to `true`.
5. Retain AWS resources and existing data; do not delete evidence.
6. Verify Contact mailto and WhatsApp fallbacks.
7. Run `nginx -t` before any reload.
8. Check Nginx, API Gateway, Lambda, DynamoDB, SES, and inbox status.
9. Record the incident and rollback evidence.

Every rollback change requires separate production authorization.

## Monitoring

Daily monitoring:

- Contact submission availability
- Lambda errors and duration
- API Gateway 4xx and 5xx
- SES sends, rejects, bounces, and complaints
- business inbox receipt
- Nginx access and error logs

Weekly monitoring:

- DynamoDB conditional failures and TTL state
- CloudWatch retention and PII-safe log sample
- SES identity, DKIM, and suppression settings
- Nginx configuration test
- failed services
- disk, memory, and general AWS service health

## Known Nonblocking Items

1. Production did not replay the same idempotency key because Gate 5 limited
   production QA to one send.
2. Idempotency remains covered by automated tests, DynamoDB conditional writes,
   and the single production request/send evidence.
3. Custom MAIL FROM is not configured; SES default MAIL FROM is used.
4. The Rotary Knob product still requires a genuine same-model reshoot.
5. Existing dependency audit findings remain governed by the separate
   dependency security review.
6. The repository has no generic `npm test` alias; the defined data and inquiry
   infrastructure suites were run explicitly.

## Git Record

Final acceptance modifies documentation only:

- this report
- `docs/runbooks/server-side-inquiry-operations.md`
- `docs/reports/latest-status.md`

No production workflow, source, infrastructure, configuration, or asset file
is part of the final acceptance commit.

## Final Conclusion

Conversion Reliability Phase 6C is completed, deployed, verified,
operationally handed over, and sealed.

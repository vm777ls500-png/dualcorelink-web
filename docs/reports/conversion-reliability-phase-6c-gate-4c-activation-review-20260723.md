# Conversion Reliability Phase 6C - Gate 4C Activation Review

Date: 2026-07-23

## Scope

This checkpoint is a read-only review of Amazon SES production access and the
controls required before enabling server-side inquiry submission. It does not
activate the production Contact form, Nginx API routing, Lambda sending, or any
other AWS resource.

## SES Production Access

The SES account was checked in `ap-southeast-1` at
`2026-07-23T10:26:25Z`.

- Classification: `additional-information-required`
- Production access enabled: false
- Account sending enabled: true
- Current daily quota: 200 messages
- Current maximum send rate: 1 message per second
- Messages sent in the current 24-hour quota window: 1
- Enforcement status: healthy
- SES environment: Sandbox

The production-access request is neither approved nor rejected. AWS requested
additional use-case, recipient-management, frequency, bounce, complaint,
unsubscribe, example-message, and identity details. The reviewed response was
submitted once through the Support Center at
`2026-07-23 18:52:06 +08:00`, without attachments. The case then reported
customer action complete and is waiting for AWS review.

## Identity And Deliverability

- Domain identity verification: success
- Easy DKIM status: success
- DKIM signing: enabled
- Verified DKIM records: 3 of 3
- Account-level suppression reasons: bounce and complaint
- Observed SES send count for the controlled Sandbox QA: 1
- Observed bounce count: 0
- Observed complaint count: 0

SES acceptance remains distinct from inbox delivery. The preceding controlled
Sandbox QA separately observed one inbox delivery.

## Current Safety Gates

The infrastructure safety state was checked at `2026-07-23T10:39:01Z`.

- CloudFormation stack: `UPDATE_COMPLETE`
- Lambda `DRY_RUN`: true
- API routes: only `POST /api/inquiry`
- CORS origin: only `https://dualcorelink.com`
- CORS methods: `POST`, `OPTIONS`
- API throttling: 2 requests per second, burst 5
- DynamoDB TTL: enabled on `expiresAt`
- Lambda log retention: 14 days
- API access-log retention: 14 days
- Global IAM action wildcard: none
- Global IAM resource wildcard: none
- Scoped wildcard: one Lambda log-stream ARN suffix required for log writes
- Production Contact behavior: mailto
- WhatsApp fallback: present
- Server-submission feature flag: disabled
- Public `/api/inquiry` Nginx route: inactive; a read-only GET returned 404
- Production Nginx reload or restart: not performed

No AWS resource, DNS record, Nginx configuration, Contact behavior, feature
flag, or SES setting was modified. No API submission or email was sent.

## Activation Plan

The plan below is prepared only. It must not be executed until SES production
access is approved and the user explicitly authorizes production activation.

### Step A - Nginx

1. Record and back up the active Nginx configuration.
2. Add an exact `location = /api/inquiry` route.
3. Permit only the required `POST` and controlled `OPTIONS` behavior.
4. Apply the reviewed request-body limit, short upstream timeouts, and no-cache
   behavior without logging request bodies.
5. Run `nginx -t`.
6. Reload Nginx only after validation succeeds; do not restart it.
7. Verify that static routes and existing production health checks are
   unchanged.

### Step B - Internal QA

1. Keep the production Contact feature flag disabled and preserve mailto.
2. Exercise the same-origin route through a controlled internal QA path.
3. Verify the expected `202`, `400`, `403`, `409`, `413`, `429`, and `502`
   handling without using customer data.
4. Do not send a real email without a separate explicit send confirmation.
5. Recheck Lambda and API logs for prohibited fields, DynamoDB state, SES
   metrics, and duplicate protection.

### Step C - Production Switch

Only after the exact authorization
`确认正式启用 Server-Side Inquiry Submission`:

1. Review a CloudFormation change set that changes `DRY_RUN` to false without
   resource replacement or permission expansion.
2. Activate the reviewed Nginx route.
3. Enable the restricted frontend build flag and `/api/inquiry` endpoint.
4. Build and deploy an exact Git source revision through the existing
   production workflow.
5. Complete production Contact, fallback, analytics, privacy, and error-state
   QA.
6. Perform any real delivery test only after separate explicit confirmation.

## Rollback Plan

The rollback sequence is prepared but was not executed:

1. Disable the frontend feature flag and restore mailto-only behavior.
2. Restore Lambda `DRY_RUN=true` through CloudFormation.
3. Restore the saved Nginx configuration.
4. Run `nginx -t`, then reload Nginx without restarting it.
5. Disable the API route if required by the incident scope and separately
   reviewed.
6. Pause SES account sending if required by a mail-delivery incident.
7. Verify Contact fallbacks, static-site health, logs, and production status.
8. Preserve evidence; do not delete logs or state records to conceal failures.

## Pending Authorization

Production activation remains blocked while AWS reviews the submitted SES
Support response. After AWS approves the request and
`ProductionAccessEnabled` becomes true, the quota, send rate, identity, DKIM,
suppression, metrics, and safety gates must be checked again.

Only after that successful review should the project request the separate
production activation authorization.

## Final Status

Gate 4C activation review: complete.

Production activation readiness: blocked pending AWS approval. The requested
additional information has been submitted, the activation and rollback plans
are prepared, and all production safety gates remain closed.

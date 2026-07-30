# Conversion Reliability Phase 6C Gate 5 Production Activation

## Scope

Gate 5 formally activated the existing server-side inquiry submission path:

`Contact -> same-origin Nginx route -> API Gateway -> Lambda -> DynamoDB -> Amazon SES`

The deployment retained the mailto fallback and WhatsApp CTA. No unrelated website,
DNS, CMS, database, analytics, product, or content change was included.

## Activation Time

- Lambda production mode activated through CloudFormation at
  `2026-07-30 13:02:14 +08:00`.
- Nginx and frontend activation first completed at
  `2026-07-30 13:25 +08:00`.
- The final production contact-copy release completed at
  `2026-07-30 13:31 +08:00`.
- The single production delivery QA was accepted at
  `2026-07-30 13:44:13 +08:00`.

## Verification

- CloudFormation stack status: `UPDATE_COMPLETE`.
- Lambda `DRY_RUN`: `false`.
- Contact form: server-side submission enabled.
- Product hero CTA preserved the expected attribution:
  `product / hotel-smart-room-rcu-host-1 / product_hero`.
- Exactly one production QA submit action was executed.
- API Gateway access log recorded one `POST /api/inquiry` with HTTP `202`.
- Lambda recorded one `accepted` execution.
- The form cleared only after acceptance and displayed the server-acceptance notice.
- Homepage, Contact, Products, Resources, and a representative Product page returned
  HTTP `200`.
- Public `GET /api/inquiry` returned `404`.
- Mailto fallback and WhatsApp CTA remain visible and usable.

Idempotency was not live-replayed because Gate 5 authorized only one production QA
submission. The conditional DynamoDB claim, duplicate `409` behavior, and no-second-send
semantics remain covered by the backend and frontend automated tests. The production
request produced one idempotency record and one SES delivery attempt.

## Mail Delivery

- API response: HTTP `202`, status `accepted`.
- SES delivery attempt: `1`.
- Inbox: one matching internal QA message observed.
- Spam: no matching message observed.
- Bounce: `0`.
- Complaint: `0`.
- Reject: `0`.
- Attachment: none.
- UTF-8 content: passed.
- Attribution: passed.

HTTP `202` and SES acceptance were treated as transport acceptance only. Inbox delivery
was verified independently in the authorized internal mailbox.

## CloudWatch

The Lambda log stream contained one matching accepted event. Application logging was
limited to:

- `submissionId`
- `requestId`
- `status`
- `durationMs`
- `errorCategory`
- `sourceType`
- `sourceSlug`
- `ctaLocation`

The prohibited-field scan found `0` matches in the Lambda application event and `0`
matches in the API Gateway access-log event. No request body, email address, phone
number, company, message, attachment name, authorization value, cookie, or API key was
logged.

## SES

- Production access: enabled.
- Account sending: enabled.
- Production QA delivery attempts in the matching statistics point: `1`.
- Bounces: `0`.
- Complaints: `0`.
- Rejects: `0`.
- No automatic retry or second QA send was performed.

## DynamoDB

The matching record had status `accepted` and contained only:

- `idempotencyKey`
- `submissionId`
- `status`
- `createdAt`
- `expiresAt`

TTL was present. Prohibited form or message fields: `0`.

## Nginx

- The exact `/api/inquiry` location is active.
- `POST /api/inquiry` is proxied to the approved restricted upstream.
- Non-POST requests are rejected by the exact location.
- Public `GET /api/inquiry` returned `404`.
- Request bodies are not logged.
- `nginx -t` passed.
- Failed system services: `0`.
- No Nginx rollback was triggered.

## Feature Flag

The production build uses the restricted server-submission configuration:

- server-side inquiry submission: enabled
- public endpoint: same-origin `/api/inquiry`
- mailto fallback: retained
- WhatsApp CTA: retained

The production Contact page no longer describes the backend as unconfigured. It
explains secure server submission and keeps the fallback visible.

## Validation

Local validation completed before deployment:

- Product media audit: passed, errors `0`
- Lint: passed
- Data tests: `122/122`
- Inquiry backend tests: `23/23`
- Production build: passed
- Next static generation: `163/163`
- Public content baseline: `156` pages
- Sitemap: `76`
- Product JSON-LD: `36/36`
- Article JSON-LD: `15/15`
- Resource BreadcrumbList: `15/15`
- `git diff --check`: passed

The repository has no generic `npm test` script. All defined data, backend, media,
lint, and production-build validations were executed.

## Deployment

Implementation commits:

- `faf40fb696b21977fad4f923820a343ec9e7eb25`
  `feat: activate server-side inquiry submission`
- `3b0b50f90af5d9a00252f1fd5cc1610a9ebdcf4d`
  `fix: align production static generation gate`
- `3a50ff723f352681420280c771b2b116dce0ed0a`
  `fix: preserve inquiry get 404 at nginx gate`
- `1d3cbb296321e089665b866a6e1dce82efb7c59e`
  `fix: update active inquiry contact guidance`

Successful production Actions runs:

- `30516454367`: infrastructure activation and release
- `30516771066`: final Contact guidance release

Final release:

`/srv/dualcorelink/frontend/releases/1d3cbb296321-20260730-133155`

Current symlink:

`/srv/dualcorelink/frontend/current`

Internal and external HTTPS health checks passed on the first attempt. No deployment
rollback was triggered.

## Rollback

The rollback order is:

1. Disable the frontend server-submission feature and deploy the mailto-first build.
2. Change the CloudFormation `DryRunMode` parameter back to `true`.
3. Restore the recorded pre-activation Nginx site configuration.
4. Run `nginx -t`, then reload Nginx only after a successful test.
5. Confirm Contact uses mailto, `GET /api/inquiry` remains `404`, and no new Lambda or
   SES traffic is present.

The mailto and WhatsApp paths remain available, so a client-side fallback does not
depend on an emergency code change.

## Risk

- The DynamoDB evidence TTL is intentionally short, so production incident evidence
  should be collected promptly.
- A live duplicate replay was intentionally not performed because the authorization
  limited production QA to one submission. Automated tests cover the duplicate path.
- The existing product-media warning for the rotary-knob display still requires a
  genuine same-model reshoot and is unrelated to inquiry delivery.
- Existing dependency audit findings remain governed by the separate dependency
  security review; no forced dependency upgrade was performed in Gate 5.

## Conclusion

Gate 5 passed. Server-side inquiry submission is active on the production Contact
form, the single controlled QA request completed the API-to-Inbox path, privacy scans
passed, fallback paths remain available, and no rollback was required.

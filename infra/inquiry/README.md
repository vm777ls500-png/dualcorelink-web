# DualCoreLink Inquiry Backend Foundation

This directory defines the dry-run AWS foundation for server-side inquiry submission.
It does not change the production Contact form or Nginx routing.

## Resources

- Lambda `dualcorelink-inquiry-submit` on the supported `nodejs24.x` runtime
- API Gateway HTTP API with only `POST /api/inquiry`
- DynamoDB idempotency table with TTL and retained data
- Least-privilege Lambda execution role
- Retained Lambda and API access log groups with 14-day retention
- SES Easy DKIM domain identity

The Lambda remains in `DRY_RUN=true` during Gate 2. It validates controlled payloads,
uses the idempotency table, and emits metadata-only logs. It does not send email.

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

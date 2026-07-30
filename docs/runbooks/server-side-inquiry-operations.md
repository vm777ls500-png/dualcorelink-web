# Server-Side Inquiry Operations

## Purpose

This runbook covers routine monitoring, incident triage, and authorized
rollback preparation for the DualCoreLink production inquiry path. It does not
grant permission to change production resources.

## Current Production State

| Component | Production state |
|---|---|
| Region | `ap-southeast-1` |
| CloudFormation stack | `dualcorelink-inquiry` / `UPDATE_COMPLETE` |
| Lambda | `dualcorelink-inquiry-submit` / `Active` |
| Lambda mode | `DRY_RUN=false` |
| API route | `POST /api/inquiry` |
| Public GET behavior | `GET /api/inquiry` returns 404 |
| DynamoDB | idempotency table active; TTL enabled |
| SES | production access enabled; review `GRANTED` |
| Frontend | server-side inquiry feature enabled |
| Nginx | exact inquiry location active; POST only |
| Fallbacks | mailto and WhatsApp retained |
| Log retention | 14 days |
| Configuration storage | SSM `SecureString` |

## Daily Checks

1. Confirm the Contact page loads and displays the server-submission action.
2. Confirm mailto and WhatsApp fallback links remain visible.
3. Review Lambda `Errors`, `Throttles`, and duration trends.
4. Review API Gateway 4xx and 5xx counts.
5. Review SES send, reject, bounce, and complaint metrics.
6. Confirm legitimate inquiry notifications are reaching the business inbox.
7. Check the Nginx inquiry access/error-log window for unexpected 4xx or 5xx.

Do not submit a test inquiry or send a test message without explicit,
single-send authorization.

## Weekly Checks

1. Confirm DynamoDB TTL remains `ENABLED`.
2. Confirm CloudWatch log retention remains 14 days.
3. Confirm Lambda and API logs remain PII-safe.
4. Confirm SES suppression includes bounce and complaint.
5. Confirm SES domain identity and DKIM remain `SUCCESS`.
6. Run `nginx -t`; do not reload unless an approved change requires it.
7. Confirm failed services are 0.
8. Review disk, memory, swap, and core service health.
9. Review AWS service-health notices for the active region.

## Incident Triage

### API Returns 4xx

Check:

- required fields and field lengths
- exact JSON schema and unknown fields
- `Content-Type`
- Origin
- request body size
- idempotency-key format
- honeypot and completion-time rules
- rate-limit response

Do not weaken validation to make a malformed request pass.

### API Returns 5xx

Check in order:

1. Nginx error log and upstream reachability
2. API Gateway integration status
3. Lambda errors and timeout
4. IAM denial events
5. SSM access errors without reading parameter values
6. DynamoDB availability and conditional-write results
7. SES account sending and identity status

Keep the mailto and WhatsApp fallbacks available while investigating.

### API Returns 202 but Inbox Does Not Receive

Check:

- Lambda accepted status
- SES accepted versus rejected status
- account suppression
- bounce and complaint metrics
- recipient Spam/Junk folder
- business inbox routing
- CloudWatch status and error category
- matching DynamoDB status and TTL

An HTTP 202 or SES accepted response is not proof of inbox delivery.

### Duplicate Email

Check:

- whether the frontend reused the original idempotency key
- DynamoDB conditional-write conflicts
- frontend single-flight behavior
- browser or proxy retries
- API Gateway request count
- Lambda accepted count
- SES delivery attempts

Do not reproduce a duplicate in production without explicit authorization.

### PII Appears in Logs

Immediately:

1. Disable the frontend server-submission feature through approved change
   control.
2. Keep the mailto and WhatsApp fallbacks available.
3. Restrict access to the affected logs.
4. Preserve evidence; do not delete logs to hide the issue.
5. Correct the logging allowlist and add regression coverage.
6. Apply retention or removal actions only through the approved AWS compliance
   process.
7. Re-enable server submission only after privacy verification and separate
   authorization.

## Emergency Rollback

Prepare and obtain authorization before execution:

1. Set the frontend feature flag off.
2. Restore Contact to mailto-primary behavior.
3. Disable the exact Nginx inquiry location.
4. Restore CloudFormation `DryRunMode=true`.
5. Run `nginx -t`, then reload only after it passes.
6. Validate mailto and WhatsApp fallbacks.
7. Monitor API Gateway, Lambda, DynamoDB, and SES for residual traffic.
8. Document the incident, change set, timestamps, and verification results.

Do not delete the stack, Lambda, table, log groups, SSM parameters, or evidence
as part of an emergency rollback.

## Safe AWS Read-Only Commands

Set the region for each shell session:

```bash
REGION=ap-southeast-1
```

SES account state:

```bash
aws sesv2 get-account \
  --region "$REGION" \
  --query '{ProductionAccessEnabled:ProductionAccessEnabled,SendingEnabled:SendingEnabled,ReviewStatus:Details.ReviewDetails.Status,DailyQuota:SendQuota.Max24HourSend,SendRate:SendQuota.MaxSendRate}'
```

CloudFormation status:

```bash
aws cloudformation describe-stacks \
  --stack-name dualcorelink-inquiry \
  --region "$REGION" \
  --query 'Stacks[0].StackStatus' \
  --output text
```

Lambda state and dry-run mode:

```bash
aws lambda get-function-configuration \
  --function-name dualcorelink-inquiry-submit \
  --region "$REGION" \
  --query '{State:State,DryRun:Environment.Variables.DRY_RUN}'
```

API route inventory:

```bash
API_ID="$(aws cloudformation describe-stacks \
  --stack-name dualcorelink-inquiry \
  --region "$REGION" \
  --query "Stacks[0].Outputs[?OutputKey=='HttpApiId'].OutputValue|[0]" \
  --output text)"

aws apigatewayv2 get-routes \
  --api-id "$API_ID" \
  --region "$REGION" \
  --query 'Items[].RouteKey'
```

DynamoDB and TTL status:

```bash
aws dynamodb describe-table \
  --table-name dualcorelink-inquiry-idempotency \
  --region "$REGION" \
  --query 'Table.TableStatus' \
  --output text

aws dynamodb describe-time-to-live \
  --table-name dualcorelink-inquiry-idempotency \
  --region "$REGION" \
  --query 'TimeToLiveDescription.TimeToLiveStatus' \
  --output text
```

CloudWatch log-group metadata:

```bash
aws logs describe-log-groups \
  --region "$REGION" \
  --log-group-name-prefix /aws/lambda/dualcorelink-inquiry-submit \
  --query 'logGroups[].{Name:logGroupName,Retention:retentionInDays}'
```

SSM parameter metadata only:

```bash
aws ssm describe-parameters \
  --region "$REGION" \
  --parameter-filters \
    'Key=Name,Option=BeginsWith,Values=/dualcorelink/inquiry' \
  --query 'Parameters[].{Name:Name,Type:Type}'
```

Never add `--with-decryption`, call `get-parameter`, or otherwise read
`SecureString` values during routine checks.

## Change Control

Each of the following requires explicit production authorization, scoped
review, validation, and rollback planning:

- Lambda `DRY_RUN`
- frontend server-submission feature flag
- Nginx `/api/inquiry` route
- SES identity, DKIM, suppression, or MAIL FROM
- IAM policies or execution role
- SSM parameter names, values, or access
- sender or recipient configuration
- Lambda code or runtime
- API route, CORS, throttling, or access logs
- DynamoDB schema, TTL, retention, or encryption

All IaC-managed changes must use the reviewed CloudFormation path. Do not make
manual console changes that bypass IaC.

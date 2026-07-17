# GA4 Monthly Inquiry Funnel Reporting

## Purpose

Use this checklist to produce a consistent monthly DualCoreLink inquiry-funnel report without exposing personal information or overstating low-volume data.

## Reporting Window

1. Select the previous complete calendar month.
2. Compare with the preceding complete month only when both periods contain processed events.
3. Record the date range and report-generation date.
4. Annotate known internal QA dates; do not present QA events as customer behavior.

## Data Readiness

Check Realtime, Engagement Events, Key events, and Explore.

Record event count, users, and sessions for:

- `page_view`
- `inquiry_cta_click`
- `form_start`
- `inquiry_form_submit`
- `scroll`
- `whatsapp_quote_click`, when present
- `email_inquiry_click`, when present

If a denominator is zero, display `N/A` for the related rate. If activity is limited to a handful of events, label the report as an early directional baseline.

## Funnel Review

Open the saved exploration:

`DualCoreLink Inquiry Funnel`

Confirm the four steps:

1. Inquiry CTA Click
2. Contact Page View
3. Form Start
4. Inquiry Form Submit

Review total progression and Device category breakdown. Confirm that the Contact step still represents the intended path; add a Contact path constraint only after enough processed data exists to validate the change.

## Source Tables

Create or update tables using these event-scoped dimensions:

- `source_type`
- `source_slug`
- `cta_location`
- `category`

Use event count, users, sessions, and key events. Sort by inquiry CTA users first, then submissions. Keep Global traffic separate from Product, Resource, and Solution sources.

## Monthly Dashboard Template

### Executive Summary

- Reporting window:
- Data status: early baseline / directional / established
- Inquiry CTA users:
- Form-start users:
- Inquiry-submit users:
- Main observation:
- Recommended action:

### Funnel

| Step | Users | Step progression | Overall progression |
| --- | ---: | ---: | ---: |
| Inquiry CTA Click |  | N/A | N/A |
| Contact Page View |  |  |  |
| Form Start |  |  |  |
| Inquiry Form Submit |  |  |  |

### Source Type

| Source type | CTA users | Form-start users | Submit users | Observation |
| --- | ---: | ---: | ---: | --- |
| Product |  |  |  |  |
| Resource |  |  |  |  |
| Solution |  |  |  |  |
| Global |  |  |  |  |

### Top Content Sources

| Source slug | Source type | CTA users | Submit users | CTA location | Action |
| --- | --- | ---: | ---: | --- | --- |
|  |  |  |  |  |  |

### CTA Placement

| CTA location | CTA users | Submit users | Observation |
| --- | ---: | ---: | --- |
|  |  |  |  |

### Device Category

| Device | CTA users | Form-start users | Submit users | Observation |
| --- | ---: | ---: | ---: | --- |
| Mobile |  |  |  |  |
| Desktop |  |  |  |  |
| Tablet |  |  |  |  |

### Inquiry Channel Mix

| Event | Users | Event count | Interpretation |
| --- | ---: | ---: | --- |
| Form draft submit |  |  | Draft action, not confirmed delivery |
| WhatsApp quote click |  |  | Entry click, not confirmed message |
| Email inquiry click |  |  | Draft action, not confirmed send |

## Interpretation Guardrails

- Do not identify a winner from internal QA or one isolated event.
- Do not treat clicks or drafts as leads, orders, or revenue.
- Investigate duplicate dispatch when event count materially exceeds users.
- Validate page layout and CTA behavior before attributing device differences to UX.
- Check custom-dimension population before ranking `(not set)` rows.
- Record missing or delayed GA4 data as a limitation, not as zero customer intent.

## Privacy Review

Confirm that exported tables and screenshots contain none of the following:

- Name
- Email
- Phone or WhatsApp number
- Company
- Message or project description
- File name
- Source title
- User-entered form content

Do not record the complete measurement identifier, property identifier, account information, or test-user details in reports or Git.

## Closeout

1. Save the exploration date range.
2. Export only aggregate, non-PII tables when needed.
3. Record observations, limitations, and one to three actions.
4. Set the next review date one calendar month later.
5. Keep changes to GA4 administration separate from monthly reporting unless explicitly approved.

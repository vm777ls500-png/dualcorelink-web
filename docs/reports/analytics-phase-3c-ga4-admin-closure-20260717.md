# Analytics Phase 3C - GA4 Admin Closure

Date: 2026-07-17 (Asia/Shanghai)

## Scope

This checkpoint completed the GA4 administration tasks for the existing DualCoreLink website property. It covered production Realtime evidence, DebugView status, key-event registration, event-scoped custom dimensions, privacy review, and consent behavior. No website code, data stream, measurement identifier, Google account access, advertising integration, or unrelated GA4 setting was changed.

## Realtime

A single controlled production QA flow used synthetic, non-customer data. The flow opened a real Product detail page, followed its project-quote CTA to Contact, exercised the internal form flow, and did not send an email or WhatsApp message.

Realtime showed:

- `page_view`
- `inquiry_cta_click`
- `inquiry_form_submit`
- Google-collected supporting events such as `form_start` and `scroll`

The `inquiry_form_submit` event exposed the approved attribution parameter keys:

- `source_type`
- `source_slug`
- `cta_location`
- `category`
- `page_path`

`whatsapp_quote_click` and `email_inquiry_click` were not observed in the Realtime window and were not artificially created or repeatedly triggered.

## DebugView

DebugView showed zero debug devices and no debug events. This is expected because the production implementation does not set `debug_mode`. No production code or property-wide debug setting was changed. Realtime visibility and the previously verified successful GA collect request remain the production collection evidence.

## Key Events

- `inquiry_form_submit`: registered using its existing event name and marked as a key event.
- Counting method: once per event.
- Default monetary value: not set.
- `inquiry_cta_click`: intentionally not marked as the primary key event.
- `whatsapp_quote_click`: not marked because it was not observed as an existing processed event in this QA window.
- `email_inquiry_click`: not marked because it was not observed as an existing processed event in this QA window.

The newly registered key event may require normal Google processing time before reporting data appears in all administration views. Realtime collection was already visible.

## Custom Dimensions

The Custom definitions list was checked first and contained no existing matching definitions. Four event-scoped custom dimensions were created, with no duplicates:

| Dimension name | Scope | Event parameter |
| --- | --- | --- |
| Inquiry source type | Event | `source_type` |
| Inquiry source slug | Event | `source_slug` |
| Inquiry CTA location | Event | `cta_location` |
| Inquiry category | Event | `category` |

No custom dimension was created for `page_path`.

## PII Review

Realtime event parameter keys and the existing production event mapping were reviewed. No application payload contained name, email, phone, WhatsApp number, company, message, file name, source title, or user-entered project content. The QA used synthetic data and sent no message to a third party.

## Consent Behavior

The existing production validation remains unchanged:

- Declining analytics consent leaves Google Tag unloaded.
- Granting analytics consent loads one Google Tag instance.
- A tracked action emits one corresponding GA4 event without duplicate dispatch.
- Query strings are excluded from the GA4 page-view URL.
- Advertising storage, ad user data, ad personalization, and Google Signals remain disabled by the implemented consent policy.

## Unchanged Administration

The following were not created, enabled, deleted, or modified:

- GA4 property or Web Data Stream
- Measurement identifier
- Google account permissions
- Google Ads linkage
- Google Signals or advertising personalization
- Enhanced conversions
- Data retention or attribution model
- Existing events, streams, custom definitions, or key events
- Website code, AWS configuration, WordPress, DNS, Cloudflare, or Nginx

## Final Conclusion

Realtime production events were visible, `inquiry_form_submit` was marked as the key event, and all four required event-scoped custom dimensions were created. DebugView remained empty by design because production debug mode is disabled. No PII was detected and no unrelated GA4 setting was changed. Analytics Phase 3C is administratively complete, subject only to normal GA4 reporting-processing latency.

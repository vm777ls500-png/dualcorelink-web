# Chinese P0 CMS Field Mapping

Date: 2026-07-29
Scope: exactly seven Allan-approved Chinese P0 Product/Solution payloads.

This mapping is the only mapping accepted by the M5E-2 import tool. Fields
that do not appear below are rejected rather than silently discarded. The
tool never modifies an English source record.

## Payload envelope

| Payload field | Validation or storage target |
|---|---|
| `contentType` | WordPress `post_type`: `product` or `solution` |
| `sourceEnglishContentId` | `_dualcorelink_translation_source_id` |
| `sourceEnglishSlug` | Must equal the live English source `post_name`; retained in the run request |
| `localizedSlug` | WordPress `post_name`; must equal the approved source-derived Chinese slug |
| `localizedContentId` | Must be `null` before import; the created/located CMS ID is written to run operations |
| `importKey` | Immutable request/audit identity; retained in the run request |
| `deliveryMode` | Must be `validated-import-payload`; retained in the run request |
| `locale` | Must be `zh`; stored in `_dualcorelink_translation_locale` |
| `batch` | Must be `p0`; stored in `_dualcorelink_translation_batch` |
| `productionReleaseReady` | Must be `true`; validation-only release gate |
| `translationStatus` | Must be `approved`; validation-only release gate |
| `reviewStatus` | Must be `approved`; validation-only release gate |
| `nativeReviewStatus` | Must be `approved`; validation-only release gate |
| `nativeReviewer` | Must be `Allan`; stored in `_dualcorelink_translation_reviewer` |
| `nativeReviewDate` | Must be `2026-07-29`; stored in `_dualcorelink_translation_review_date` |
| `nativeReviewNotes` | Non-empty audit evidence retained in the run request |

## WordPress core mapping

| Payload field | WordPress target |
|---|---|
| `translatedTitle` | `post_title` |
| `localizedSlug` | `post_name` |
| `translatedDescription` | `post_excerpt` |
| `translatedStructuredContent` plus `translatedSpecifications` | Deterministically rendered `post_content` |
| Apply status | `post_status=draft` only |
| Publish command | Changes only the seven run-owned records to `publish` |

The renderer emits the same HTML for the same canonical payload. It renders
the eyebrow, H1, introduction, specifications, sections, bullets, FAQs,
related links and CTA in a fixed order. Text and attributes are escaped.

## Product ACF mapping

| Payload source | Confirmed ACF target |
|---|---|
| `translatedDescription` | `product_short_description` |
| `translatedSpecifications` | `product_technical_specs` as deterministic label/value lines |
| `translatedStructuredContent.faqs` | `product_faqs_text` as deterministic question/answer blocks |
| `translatedSeoTitle` | `product_seo_title` |
| `translatedMetaDescription` | `product_meta_description` |
| `translatedStructuredContent.breadcrumbLabel` | `product_breadcrumb_label` |
| `translatedStructuredContent.imageAlt` when present | `product_image_alt_text` |

The payload has no unambiguous, dedicated values for
`product_core_functions`, `product_features`,
`product_application_scenarios`, `product_installation_position`,
`product_customization_options`, product image IDs, OEM/ODM/MOQ/lead-time or
warranty fields. The tool does not guess or write those fields. Their
information remains represented in deterministic `post_content` where it is
present in the approved structured content.

## Solution ACF mapping

| Payload source | Confirmed ACF target |
|---|---|
| `translatedDescription` | `solution_summary` |
| `translatedSeoTitle` | `solution_seo_title` |
| `translatedMetaDescription` | `solution_meta_description` |
| `translatedStructuredContent.breadcrumbLabel` | `solution_breadcrumb_label` |

The generic `translatedSpecifications` array is rendered into a labelled
specification section in `post_content`. It is deliberately **not** guessed
into `solution_architecture` or another semantic ACF field. The payload does
not expose unique fields for customer challenges, architecture, benefits,
deployment process, protocols, integration, compatibility, limitations,
related records or media IDs, so the importer does not write them.

## Translation relationship metadata

| Meta key | Value |
|---|---|
| `_dualcorelink_translation_schema_version` | `1` |
| `_dualcorelink_translation_locale` | `zh` |
| `_dualcorelink_translation_source_id` | Approved English source ID |
| `_dualcorelink_translation_group` | `shb2b-{post_type}-{source_id}` |
| `_dualcorelink_translation_batch` | `p0` |
| `_dualcorelink_translation_payload_hash` | Canonical payload SHA-256 |
| `_dualcorelink_translation_reviewer` | `Allan` |
| `_dualcorelink_translation_review_date` | `2026-07-29` |

The English source is never updated. Reciprocal REST `translations` and
`hreflang` output must be derived dynamically by querying localized records
with the source ID and locale metadata.

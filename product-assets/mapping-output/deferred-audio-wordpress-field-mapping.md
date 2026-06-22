# Hotel Ceiling Background Speaker WordPress Field Mapping

## Mapping Summary

| Product Title | Slug | Category | Category Required | Featured Image | Gallery Images | Status Suggestion | Missing Info Count | Risk |
| --- | --- | --- | --- | --- | ---: | --- | ---: | --- |
| Hotel Ceiling Background Speaker | `hotel-ceiling-background-speaker` | Hotel Audio & Communication Devices | Yes | `1.png` | 2 | `draft` | 13 | New category required; back-label parameters remain unverified |

## WordPress Post Fields

| Field | Mapping |
| --- | --- |
| `post_title` | Hotel Ceiling Background Speaker |
| `post_name` | `hotel-ceiling-background-speaker` |
| `post_status` | `draft` |
| `post_type` | `product` |
| `post_excerpt` | A ceiling-mounted background speaker for hotel guest rooms, public areas, serviced apartments, and commercial interiors, available for B2B project matching. |
| `series_text` | Empty / no series |
| Product JSON-LD | Disabled |
| `product_series` taxonomy | Do not write |

## Product Content Structure

The mapped `post_content` contains the approved English overview followed by Key Features, Application Scenarios, B2B Project Value, and OEM / ODM Project Support sections. It does not publish unconfirmed size, power, impedance, cut-out, material, compatibility, or certification details.

## Category Mapping

| Field | Value |
| --- | --- |
| Category Name | Hotel Audio & Communication Devices |
| Category Slug | `hotel-audio-communication-devices` |
| Category Description | Ceiling speakers, background music controls, intercom interfaces, and room communication devices for hotel and commercial projects. |
| Current Term Status | `needs_creation_before_import` |
| Term ID | Not assigned |
| Category Creation Performed | No |

The product must not be assigned to Sensors or Smart Panels & Switches. Create the new category only in the later authorized import stage, then record its WordPress term ID before importing this product.

## Image Mapping

| Image | WordPress Use | Public Upload | Notes |
| --- | --- | --- | --- |
| `product-assets/raw-images/产品列表/产品列表/传感器/背景音箱/1.png` | Featured image | Yes | Clean complete angled view |
| `product-assets/raw-images/产品列表/产品列表/传感器/背景音箱/2.png` | Gallery image | Yes | Clean front view |
| `product-assets/raw-images/产品列表/产品列表/传感器/背景音箱/4.png` | Gallery image | Yes | Alternate clean front view |
| `product-assets/raw-images/产品列表/产品列表/传感器/背景音箱/5.png` | Internal reference only | No | Back label contains unverified technical markings |

Only three public images should be uploaded during a later authorized import. The back image must not be used as the featured image or public gallery media.

## ACF / Meta Field Suggestions

| Field | Suggested Value | Policy |
| --- | --- | --- |
| `product_model` | Empty | Write only if field exists |
| `product_short_description` | Approved short description | Existing / previously used |
| `product_status` | `available` | Existing / previously used |
| `is_featured_product` | `false` | Existing / previously used |
| `is_new_product` | `true` | Existing / previously used |
| `country_of_origin` | Empty | Write only if field exists |
| `oem_available` | `true` | Write only if field exists |
| `odm_available` | `true` | Write only if field exists |
| `sample_available` | `true` | Write only if field exists |
| `inquiry_cta_label` | Request Project Quote | Existing / previously used |
| `minimum_order_quantity` | Empty | Write only if field exists |
| `lead_time` | Depends on order quantity and customization requirements | Write only if text field exists |
| `warranty` | Generally one year, subject to product and order terms | Write only if text field exists |
| `internal_sku` | Empty | Write only if field exists |
| `product_internal_notes` | Import restrictions and missing-information summary | Write only if field exists |
| `product_schema_enabled` | `false` | Existing / previously used |

Do not create missing ACF or meta fields during import.

## Missing Information

1. Confirmed speaker size
2. Rated power
3. Impedance
4. Installation cut-out size
5. Frequency response
6. Material specification
7. Fire rating
8. Ceiling installation requirements
9. Compatible audio system
10. Certification details
11. MOQ
12. Lead time
13. Customization scope

## Import Notes

1. Create `Hotel Audio & Communication Devices` before import and record its term ID.
2. Import the product as `draft`; do not publish directly.
3. Upload only `1.png`, `2.png`, and `4.png` as public media.
4. Keep `5.png` as an internal reference and out of the public gallery.
5. Do not assign the product to Sensors or Smart Panels & Switches.
6. Do not write `product_series` taxonomy.
7. Keep Product JSON-LD disabled.
8. Do not populate price, stock, offers, review, rating, or aggregateRating fields.

## Risk Notes

- Back label image contains unverified technical parameters and is excluded from public gallery.
- Do not publish `6.5-inch`, `8-ohm`, `10 W`, or `165 mm` as confirmed public specifications unless the user confirms them later.
- The new category must be created before import.
- Public candidates contain no customer name, hotel brand, room number, or project environment information.

## WordPress Import Readiness Check

| Check Item | Result | Notes | Blocking |
| --- | --- | --- | --- |
| Existing published products | Pass | REST reports 35 published products. | No |
| Slug uniqueness | Pass | No published product matches `hotel-ceiling-background-speaker`. | No |
| Recommended category | Pending creation | `hotel-audio-communication-devices` does not currently exist. | Yes, before import |
| Incorrect fallback category | Pass | No Sensors or Smart Panels assignment is mapped. | No |
| `product_series` taxonomy | Pass | Taxonomy is not registered and will not be written. | No |
| Product JSON-LD | Pass | `product_schema_enabled` is mapped to `false`. | No |
| Unverified specifications | Pass | Values visible on the back image are excluded from public fields and content. | No |
| Commerce/rating fields | Pass | No price, stock, offers, review, rating, or aggregateRating value is mapped. | No |
| Featured image | Pass | `1.png` is a clean public candidate. | No |
| Back-label image | Pass | `5.png` is internal only and excluded from public upload/gallery. | No |
| Missing information | Pass | All 13 unresolved items are retained. | No |
| Risk notes | Pass | Required category and image restrictions are retained. | No |

## Readiness Decision

- `ready_for_pre_import_backup`: `true`
- `import_ready`: `false`
- Remaining import blocker: create the new product category and record its term ID.
- No WordPress write, category creation, media upload, product import, frontend change, build, deployment, or Git operation was performed in this stage.

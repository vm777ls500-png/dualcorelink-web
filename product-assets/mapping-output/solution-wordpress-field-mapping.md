# Solution WordPress Field Mapping

Generated: 2026-06-17

## Read-only Check Summary

| Item | Result |
| --- | --- |
| WordPress local service | Running at http://127.0.0.1:8080 |
| Solution REST base | `solutions` |
| Solution endpoint | `http://127.0.0.1:8080/wp-json/wp/v2/solutions` |
| Singular endpoint | `/wp-json/wp/v2/solution` returns 404 |
| Solution CPT REST support | Yes |
| Published same-slug solutions | None found by anonymous REST |
| Product records checked | 17 products |
| Recommended product matching | All matched to real product IDs |
| WordPress data modified | No |

Note: anonymous REST can confirm published duplicates only. Draft/private duplicate slugs should be checked again during authenticated single-solution test import.

## Field Import Strategy

Direct post fields: `title`, `slug`, `status`, `content`, `excerpt`.

Direct ACF fields:
- `solution_summary`
- `customer_challenges`
- `solution_architecture`
- `key_benefits_text`
- `deployment_process`
- `solution_inquiry_cta_label`
- `integration_notes`
- `compatibility_notes`
- `known_limitations`
- `recommended_products`
- `solution_seo_title`
- `solution_meta_description`
- `solution_breadcrumb_label`
- `solution_schema_enabled`
- `solution_geo_direct_answer`
- `solution_geo_entity_summary`
- `solution_geo_key_facts`
- `solution_geo_buyer_questions`
- `solution_geo_known_limitations`

Fallback fields without dedicated current ACF field:
- `target_customers` -> post_content/content_sections
- `recommended_product_categories` -> post_content/content_sections
- `application_scenarios` -> post_content/content_sections
- `typical_project_types` -> post_content/content_sections
- `customization_options` -> post_content/content_sections
- `faq_items` -> post_content/content_sections
- `full inquiry_cta_text` -> post_content/content_sections

Field missing markers:
- `target_customers`
- `recommended_product_categories`
- `application_scenarios`
- `typical_project_types`
- `customization_options`
- `faq_items_inline`

## Mapping Summary

| Solution | Slug | Status | Product IDs | Duplicate Check | Import Readiness |
| --- | --- | --- | --- | --- | --- |
| Hotel Guest Room Control Solution | `hotel-guest-room-control-solution` | draft | 6, 47, 43, 49, 51, 52 | no_published_duplicate_found | Ready for draft test import |
| Smart Hotel Automation Solution | `smart-hotel-automation-solution` | draft | 8, 48, 44, 12, 13 | no_published_duplicate_found | Ready for draft test import |
| AI Smart Display Solution | `ai-smart-display-solution` | draft | 6, 8, 9, 10, 11 | no_published_duplicate_found | Ready for draft test import |
| RCU Room Control Solution | `rcu-room-control-solution` | draft | 47, 48, 43, 51, 50 | no_published_duplicate_found | Ready for draft test import |
| Hotel Delivery Robot Solution | `hotel-delivery-robot-solution` | draft | 12, 13 | no_published_duplicate_found | Ready for draft test import |
| OEM / ODM Custom Panel Solution | `oem-odm-custom-panel-solution` | draft | 49, 50, 51, 52 | no_published_duplicate_found | Ready for draft test import |

## Product ID Reference

| ID | Product | Slug | Status |
| --- | --- | --- | --- |
| 6 | 86-Type AI Smart Control Display | `86-type-ai-smart-control-display` | publish |
| 8 | AI Large Smart Display | `ai-large-smart-display` | publish |
| 9 | Rotary Knob Smart Control Display | `rotary-knob-smart-control-display` | publish |
| 10 | Thermostat HVAC Control Panel | `thermostat-hvac-control-panel` | publish |
| 11 | AI Music Control Panel | `ai-music-control-panel` | publish |
| 12 | Hotel Delivery Robot | `hotel-delivery-robot` | publish |
| 13 | Hotel Smart Delivery Cabinet | `hotel-smart-delivery-cabinet` | publish |
| 43 | Embedded Human Presence Sensor | `embedded-human-presence-sensor` | publish |
| 44 | Infrared Repeater | `infrared-repeater` | publish |
| 45 | Hotel Room Door Magnetic Sensor | `hotel-room-door-magnetic-sensor` | publish |
| 46 | Hotel Guest Room Doorbell | `hotel-guest-room-doorbell` | publish |
| 47 | RCU Controller Cabinet | `rcu-controller-cabinet` | publish |
| 48 | Hotel Smart Room RCU Host 1 | `hotel-smart-room-rcu-host-1` | publish |
| 49 | Smart USB Five-Hole Socket | `smart-usb-five-hole-socket` | publish |
| 50 | Smart Key Card Energy Saver Panel | `smart-key-card-energy-saver-panel` | publish |
| 51 | Smart Four-Key Curtain Control Panel | `smart-four-key-curtain-control-panel` | publish |
| 52 | Brushed Aluminum 86-Base Doorbell Panel | `brushed-aluminum-86-base-doorbell-panel` | publish |

## Per-solution Details

### 1. Hotel Guest Room Control Solution

- Slug: `hotel-guest-room-control-solution`
- Status: `draft`
- Excerpt / solution_summary: A smart guest room control solution for hotels, serviced apartments, and renovation projects that need coordinated room control hardware for lighting, HVAC, curtains, sensing, power, and service panels.
- Recommended product IDs: 6, 47, 43, 49, 51, 52
- Recommended products:
  - 86-Type AI Smart Control Display -> ID 6 (`86-type-ai-smart-control-display`)
  - RCU Controller Cabinet -> ID 47 (`rcu-controller-cabinet`)
  - Embedded Human Presence Sensor -> ID 43 (`embedded-human-presence-sensor`)
  - Smart USB Five-Hole Socket -> ID 49 (`smart-usb-five-hole-socket`)
  - Smart Four-Key Curtain Control Panel -> ID 51 (`smart-four-key-curtain-control-panel`)
  - Brushed Aluminum 86-Base Doorbell Panel -> ID 52 (`brushed-aluminum-86-base-doorbell-panel`)
- Direct ACF mapping:
  - `solution_summary`
  - `customer_challenges`
  - `solution_architecture`
  - `key_benefits_text`
  - `deployment_process`
  - `solution_inquiry_cta_label`
  - `integration_notes`
  - `compatibility_notes`
  - `known_limitations`
  - `recommended_products`
  - `solution_seo_title`
  - `solution_meta_description`
  - `solution_breadcrumb_label`
  - `solution_schema_enabled`
  - `solution_geo_direct_answer`
  - `solution_geo_entity_summary`
  - `solution_geo_key_facts`
  - `solution_geo_buyer_questions`
  - `solution_geo_known_limitations`
- Fallback to post_content/content_sections:
  - `target_customers`
  - `recommended_product_categories`
  - `application_scenarios`
  - `typical_project_types`
  - `customization_options`
  - `faq_items`
  - `full inquiry_cta_text`
- Missing information: Final wiring plan and room control logic by project; Confirmed communication method and device compatibility; Detailed RCU configuration and electrical parameters; Final panel finish and labeling requirements; Project quantity, room type, and target delivery schedule
- Internal notes: Source: product-assets/mapping-output/solution-content-draft.json. Import as draft first. Do not create products or media during solution import. Product IDs were matched from current WordPress REST products on 2026-06-17.

### 2. Smart Hotel Automation Solution

- Slug: `smart-hotel-automation-solution`
- Status: `draft`
- Excerpt / solution_summary: A broader smart hotel automation solution direction for projects that need room control, public area service workflows, smart displays, RCU hardware, infrared control accessories, delivery robots, and delivery cabinets.
- Recommended product IDs: 8, 48, 44, 12, 13
- Recommended products:
  - AI Large Smart Display -> ID 8 (`ai-large-smart-display`)
  - Hotel Smart Room RCU Host 1 -> ID 48 (`hotel-smart-room-rcu-host-1`)
  - Infrared Repeater -> ID 44 (`infrared-repeater`)
  - Hotel Delivery Robot -> ID 12 (`hotel-delivery-robot`)
  - Hotel Smart Delivery Cabinet -> ID 13 (`hotel-smart-delivery-cabinet`)
- Direct ACF mapping:
  - `solution_summary`
  - `customer_challenges`
  - `solution_architecture`
  - `key_benefits_text`
  - `deployment_process`
  - `solution_inquiry_cta_label`
  - `integration_notes`
  - `compatibility_notes`
  - `known_limitations`
  - `recommended_products`
  - `solution_seo_title`
  - `solution_meta_description`
  - `solution_breadcrumb_label`
  - `solution_schema_enabled`
  - `solution_geo_direct_answer`
  - `solution_geo_entity_summary`
  - `solution_geo_key_facts`
  - `solution_geo_buyer_questions`
  - `solution_geo_known_limitations`
- Fallback to post_content/content_sections:
  - `target_customers`
  - `recommended_product_categories`
  - `application_scenarios`
  - `typical_project_types`
  - `customization_options`
  - `faq_items`
  - `full inquiry_cta_text`
- Missing information: Confirmed hotel floor plans and robot route conditions; Network and integration architecture; Detailed RCU and control device parameters; Smart cabinet product channel requirements; Project phase, quantity, and delivery schedule
- Internal notes: Source: product-assets/mapping-output/solution-content-draft.json. Import as draft first. Do not create products or media during solution import. Product IDs were matched from current WordPress REST products on 2026-06-17.

### 3. AI Smart Display Solution

- Slug: `ai-smart-display-solution`
- Status: `draft`
- Excerpt / solution_summary: A display-centered control solution for hotel rooms, apartments, villas, and smart spaces that need wall-mounted interfaces for room scenes, HVAC, music, and smart device control.
- Recommended product IDs: 6, 8, 9, 10, 11
- Recommended products:
  - 86-Type AI Smart Control Display -> ID 6 (`86-type-ai-smart-control-display`)
  - AI Large Smart Display -> ID 8 (`ai-large-smart-display`)
  - Rotary Knob Smart Control Display -> ID 9 (`rotary-knob-smart-control-display`)
  - Thermostat HVAC Control Panel -> ID 10 (`thermostat-hvac-control-panel`)
  - AI Music Control Panel -> ID 11 (`ai-music-control-panel`)
- Direct ACF mapping:
  - `solution_summary`
  - `customer_challenges`
  - `solution_architecture`
  - `key_benefits_text`
  - `deployment_process`
  - `solution_inquiry_cta_label`
  - `integration_notes`
  - `compatibility_notes`
  - `known_limitations`
  - `recommended_products`
  - `solution_seo_title`
  - `solution_meta_description`
  - `solution_breadcrumb_label`
  - `solution_schema_enabled`
  - `solution_geo_direct_answer`
  - `solution_geo_entity_summary`
  - `solution_geo_key_facts`
  - `solution_geo_buyer_questions`
  - `solution_geo_known_limitations`
- Fallback to post_content/content_sections:
  - `target_customers`
  - `recommended_product_categories`
  - `application_scenarios`
  - `typical_project_types`
  - `customization_options`
  - `faq_items`
  - `full inquiry_cta_text`
- Missing information: Final display model selection by project; Wall box and installation requirements; Confirmed HVAC and music control requirements; Device compatibility and control workflow; Branding, packaging, and quantity requirements
- Internal notes: Source: product-assets/mapping-output/solution-content-draft.json. Import as draft first. Do not create products or media during solution import. Product IDs were matched from current WordPress REST products on 2026-06-17.

### 4. RCU Room Control Solution

- Slug: `rcu-room-control-solution`
- Status: `draft`
- Excerpt / solution_summary: An RCU-centered room control solution for hotel guest rooms that require a control host or cabinet, sensing devices, curtain control, and power-related room accessories.
- Recommended product IDs: 47, 48, 43, 51, 50
- Recommended products:
  - RCU Controller Cabinet -> ID 47 (`rcu-controller-cabinet`)
  - Hotel Smart Room RCU Host 1 -> ID 48 (`hotel-smart-room-rcu-host-1`)
  - Embedded Human Presence Sensor -> ID 43 (`embedded-human-presence-sensor`)
  - Smart Four-Key Curtain Control Panel -> ID 51 (`smart-four-key-curtain-control-panel`)
  - Smart Key Card Energy Saver Panel -> ID 50 (`smart-key-card-energy-saver-panel`)
- Direct ACF mapping:
  - `solution_summary`
  - `customer_challenges`
  - `solution_architecture`
  - `key_benefits_text`
  - `deployment_process`
  - `solution_inquiry_cta_label`
  - `integration_notes`
  - `compatibility_notes`
  - `known_limitations`
  - `recommended_products`
  - `solution_seo_title`
  - `solution_meta_description`
  - `solution_breadcrumb_label`
  - `solution_schema_enabled`
  - `solution_geo_direct_answer`
  - `solution_geo_entity_summary`
  - `solution_geo_key_facts`
  - `solution_geo_buyer_questions`
  - `solution_geo_known_limitations`
- Fallback to post_content/content_sections:
  - `target_customers`
  - `recommended_product_categories`
  - `application_scenarios`
  - `typical_project_types`
  - `customization_options`
  - `faq_items`
  - `full inquiry_cta_text`
- Missing information: Room drawings and device point schedule; Confirmed RCU circuit and I/O requirements; Electrical ratings and wiring method; Communication method and integration scope; Final product models and project quantity
- Internal notes: Source: product-assets/mapping-output/solution-content-draft.json. Import as draft first. Do not create products or media during solution import. Product IDs were matched from current WordPress REST products on 2026-06-17.

### 5. Hotel Delivery Robot Solution

- Slug: `hotel-delivery-robot-solution`
- Status: `draft`
- Excerpt / solution_summary: A hotel service automation solution direction combining delivery robot and smart delivery cabinet products for guest supply workflows and hotel retail item delivery.
- Recommended product IDs: 12, 13
- Recommended products:
  - Hotel Delivery Robot -> ID 12 (`hotel-delivery-robot`)
  - Hotel Smart Delivery Cabinet -> ID 13 (`hotel-smart-delivery-cabinet`)
- Direct ACF mapping:
  - `solution_summary`
  - `customer_challenges`
  - `solution_architecture`
  - `key_benefits_text`
  - `deployment_process`
  - `solution_inquiry_cta_label`
  - `integration_notes`
  - `compatibility_notes`
  - `known_limitations`
  - `recommended_products`
  - `solution_seo_title`
  - `solution_meta_description`
  - `solution_breadcrumb_label`
  - `solution_schema_enabled`
  - `solution_geo_direct_answer`
  - `solution_geo_entity_summary`
  - `solution_geo_key_facts`
  - `solution_geo_buyer_questions`
  - `solution_geo_known_limitations`
- Fallback to post_content/content_sections:
  - `target_customers`
  - `recommended_product_categories`
  - `application_scenarios`
  - `typical_project_types`
  - `customization_options`
  - `faq_items`
  - `full inquiry_cta_text`
- Missing information: Hotel layout and operation route conditions; Cabinet placement and item channel requirements; Robot access requirements and site restrictions; Operation workflow responsibilities; Final quantity and delivery schedule
- Internal notes: Source: product-assets/mapping-output/solution-content-draft.json. Import as draft first. Do not create products or media during solution import. Product IDs were matched from current WordPress REST products on 2026-06-17.

### 6. OEM / ODM Custom Panel Solution

- Slug: `oem-odm-custom-panel-solution`
- Status: `draft`
- Excerpt / solution_summary: An OEM/ODM panel customization solution direction for distributors, wholesalers, contractors, and private-label buyers who need coordinated smart panel, socket, curtain control, and service panel options.
- Recommended product IDs: 49, 50, 51, 52
- Recommended products:
  - Smart USB Five-Hole Socket -> ID 49 (`smart-usb-five-hole-socket`)
  - Smart Key Card Energy Saver Panel -> ID 50 (`smart-key-card-energy-saver-panel`)
  - Smart Four-Key Curtain Control Panel -> ID 51 (`smart-four-key-curtain-control-panel`)
  - Brushed Aluminum 86-Base Doorbell Panel -> ID 52 (`brushed-aluminum-86-base-doorbell-panel`)
- Direct ACF mapping:
  - `solution_summary`
  - `customer_challenges`
  - `solution_architecture`
  - `key_benefits_text`
  - `deployment_process`
  - `solution_inquiry_cta_label`
  - `integration_notes`
  - `compatibility_notes`
  - `known_limitations`
  - `recommended_products`
  - `solution_seo_title`
  - `solution_meta_description`
  - `solution_breadcrumb_label`
  - `solution_schema_enabled`
  - `solution_geo_direct_answer`
  - `solution_geo_entity_summary`
  - `solution_geo_key_facts`
  - `solution_geo_buyer_questions`
  - `solution_geo_known_limitations`
- Fallback to post_content/content_sections:
  - `target_customers`
  - `recommended_product_categories`
  - `application_scenarios`
  - `typical_project_types`
  - `customization_options`
  - `faq_items`
  - `full inquiry_cta_text`
- Missing information: Final customization scope; Target market certification requirements; Quantity and packaging requirements; Approved product finish and labeling design; Production and delivery schedule
- Internal notes: Source: product-assets/mapping-output/solution-content-draft.json. Import as draft first. Do not create products or media during solution import. Product IDs were matched from current WordPress REST products on 2026-06-17.

## Import Guardrails For Next Stage

- Import one solution first as `draft`.
- Do not create products, media, or unrelated taxonomy terms during solution import.
- Use `recommended_products` as ID array only.
- Re-check draft/private duplicate slug during authenticated import.
- If any product ID cannot be matched at import time, stop and report instead of guessing.

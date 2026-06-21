# Fourth Batch WordPress Field Mapping

Source files: `fourth-batch-product-content-draft.json` and `fourth-batch-image-mapping.json`.

This mapping is import preparation only. It does not modify WordPress, upload media, create products or terms, change frontend code, deploy, or commit to Git.

## Summary

| # | Product Title | Slug | Category | Featured Image | Gallery | Status | Missing | Risk |
| --: | --- | --- | --- | --- | --: | --- | --: | --- |
| 1 | Hotel Smart Room RCU Host 3 | `hotel-smart-room-rcu-host-3` | RCU Room Control Host | `258f46b8592c7779378baf731fbfee4.png` | 3 | `draft` | 9 | Unconfirmed technical fields retained |
| 2 | Smart Single-Key Switch Panel | `smart-single-key-switch-panel` | Smart Panels & Switches | `25.png` | 1 | `draft` | 9 | Unconfirmed technical fields retained |
| 3 | Smart Three-Key Music Control Panel | `smart-three-key-music-control-panel` | Smart Panels & Switches | `1.png` | 2 | `draft` | 9 | Unconfirmed technical fields retained |
| 4 | Smart Four-Key Scene Control Panel | `smart-four-key-scene-control-panel` | Smart Panels & Switches | `1.png` | 1 | `draft` | 9 | Unconfirmed technical fields retained |
| 5 | Smart Footlight and Night Light Panel | `smart-footlight-night-light-panel` | Smart Panels & Switches | `1.png` | 2 | `draft` | 10 | Unconfirmed technical fields retained |
| 6 | Smart Series Dual Vertical Socket Panel | `smart-series-dual-vertical-socket-panel` | Smart Sockets & Power Modules | `1.png` | 1 | `draft` | 9 | Unconfirmed technical fields retained |
| 7 | Borui Red Matte Triple Socket Panel | `borui-red-matte-triple-socket-panel` | Smart Sockets & Power Modules | `1.png` | 1 | `draft` | 9 | USB label confirmed by user |
| 8 | Brushed Aluminum Voice and Telephone Information Panel | `brushed-aluminum-voice-telephone-information-panel` | Smart Sockets & Power Modules | `_INK4398_pixian_ai.png` | 2 | `draft` | 9 | Appearance variant overlap |

## Import Policy

- Post type: `product`
- Status: `draft` for all 8 products
- Use existing category terms only; no term creation
- Keep series only as `series_text`; do not write `product_series` taxonomy
- Write optional ACF/meta values only when the target field already exists
- Do not create missing ACF/meta fields
- Product JSON-LD remains disabled
- Do not populate price, offer, inventory, review, rating, or aggregate rating fields

## 1. Hotel Smart Room RCU Host 3

- **post_name:** `hotel-smart-room-rcu-host-3`
- **post_status:** `draft`
- **post_type:** `product`
- **post_excerpt:** A hotel room control host for project-based integration of guest room lighting, curtains, panels, sensors, HVAC, and service controls.
- **product_category:** RCU Room Control Host (`rcu-room-control-host`, term ID 5)
- **series_text:** null
- **featured_image_candidate:** `product-assets/raw-images/产品列表/产品列表/客控主机/酒店客房 强电主机控制器网关 客控主机3/258f46b8592c7779378baf731fbfee4.png`
- **gallery_image_candidates:** `product-assets/raw-images/产品列表/产品列表/客控主机/酒店客房 强电主机控制器网关 客控主机3/a91fa4136246a31c7f78c18beb20f42.png`, `product-assets/raw-images/产品列表/产品列表/客控主机/酒店客房 强电主机控制器网关 客控主机3/a7e408cba5f85bc1d5fbdcc39a67bdd.png`, `product-assets/raw-images/产品列表/产品列表/客控主机/酒店客房 强电主机控制器网关 客控主机3/e71801ec9f829a663de8a2f45a96617.png`
- **seo_title:** Hotel Smart Room RCU Host 3 | DualCoreLink
- **seo_description:** Hotel smart room RCU host for project-based guest room control planning, serving hotel owners, contractors, system integrators, and OEM/ODM buyers worldwide.
- **post_content sections:** Overview; Key Features; Application Scenarios; B2B Project Value; OEM / ODM Project Support.
- **missing_information (9):** Confirmed I/O configuration; Communication protocol; Power input; Wiring diagram; Supported load type; Installation environment; Certification details; Product dimensions; MOQ and lead time
- **risk_notes:** General source presentation contains technical details that have not been independently confirmed; No confirmed electrical specification; No confirmed protocol; No confirmed certification; Conservative copy required
- **import_notes:** Import as draft; use existing category; do not write product series taxonomy; do not enable Product JSON-LD; do not populate commerce or rating fields.

## 2. Smart Single-Key Switch Panel

- **post_name:** `smart-single-key-switch-panel`
- **post_status:** `draft`
- **post_type:** `product`
- **post_excerpt:** A single-key smart switch panel for configurable control functions in hotel rooms, serviced apartments, villas, and residential automation projects.
- **product_category:** Smart Panels & Switches (`smart-panels-switches`, term ID 9)
- **series_text:** Smart Series
- **featured_image_candidate:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/单键智能面板/25.png`
- **gallery_image_candidates:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/单键智能面板/1.png`
- **seo_title:** Smart Single-Key Switch Panel | DualCoreLink
- **seo_description:** Smart single-key switch panel for configurable hotel room, apartment, and residential control projects, serving integrators and OEM/ODM buyers worldwide.
- **post_content sections:** Overview; Key Features; Application Scenarios; B2B Project Value; OEM / ODM Project Support.
- **missing_information (9):** Electrical rating; Communication protocol; Product dimensions; Material specification; Installation box compatibility; Supported control functions; Certification details; MOQ and lead time; Customization scope
- **risk_notes:** Image-only source; No fixed control function confirmed; No confirmed electrical specification; No confirmed protocol; Conservative copy required
- **import_notes:** Import as draft; use existing category; do not write product series taxonomy; do not enable Product JSON-LD; do not populate commerce or rating fields.

## 3. Smart Three-Key Music Control Panel

- **post_name:** `smart-three-key-music-control-panel`
- **post_status:** `draft`
- **post_type:** `product`
- **post_excerpt:** A three-key smart panel for music control, scene operation, or other project-assigned functions in hotel rooms and residential automation projects.
- **product_category:** Smart Panels & Switches (`smart-panels-switches`, term ID 9)
- **series_text:** Smart Series
- **featured_image_candidate:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/三键智能面板/1.png`
- **gallery_image_candidates:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/三键智能面板/2.png`, `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/三键智能面板/3.png`
- **seo_title:** Smart Three-Key Music Control Panel | DualCoreLink
- **seo_description:** Three-key smart panel for music, scene, or assigned room controls in hotel and residential projects, with project-based OEM/ODM options available worldwide.
- **post_content sections:** Overview; Key Features; Application Scenarios; B2B Project Value; OEM / ODM Project Support.
- **missing_information (9):** Electrical rating; Communication protocol; Audio system compatibility; Supported control functions; Product dimensions; Material specification; Installation box compatibility; Certification details; MOQ and lead time
- **risk_notes:** Image-only source; Visible music labels are treated as examples rather than a confirmed fixed interface; No confirmed audio protocol; No confirmed wireless function; Conservative copy required
- **import_notes:** Import as draft; use existing category; do not write product series taxonomy; do not enable Product JSON-LD; do not populate commerce or rating fields.

## 4. Smart Four-Key Scene Control Panel

- **post_name:** `smart-four-key-scene-control-panel`
- **post_status:** `draft`
- **post_type:** `product`
- **post_excerpt:** A four-key smart scene control panel for configurable lighting, curtain, room mode, and other switch-control functions in B2B automation projects.
- **product_category:** Smart Panels & Switches (`smart-panels-switches`, term ID 9)
- **series_text:** Smart Series
- **featured_image_candidate:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/四键智能面板智能开关场景模式面板/1.png`
- **gallery_image_candidates:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/四键智能面板智能开关场景模式面板/3.png`
- **seo_title:** Smart Four-Key Scene Control Panel | DualCoreLink
- **seo_description:** Four-key smart scene panel for lighting, curtain, room mode, and assigned controls in hotel, apartment, villa, and OEM/ODM automation projects worldwide.
- **post_content sections:** Overview; Key Features; Application Scenarios; B2B Project Value; OEM / ODM Project Support.
- **missing_information (9):** Electrical rating; Communication protocol; Supported control functions; Product dimensions; Material specification; Installation box compatibility; Certification details; MOQ and lead time; Customization scope
- **risk_notes:** Image-only source; Visible scene labels are examples and may not represent every project configuration; No confirmed electrical specification; No confirmed protocol; Conservative copy required
- **import_notes:** Import as draft; use existing category; do not write product series taxonomy; do not enable Product JSON-LD; do not populate commerce or rating fields.

## 5. Smart Footlight and Night Light Panel

- **post_name:** `smart-footlight-night-light-panel`
- **post_status:** `draft`
- **post_type:** `product`
- **post_excerpt:** A wall-mounted footlight and night light panel for low-level guidance lighting in hotel rooms, corridors, bedside areas, and residential projects.
- **product_category:** Smart Panels & Switches (`smart-panels-switches`, term ID 9)
- **series_text:** Smart Series
- **featured_image_candidate:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/地脚灯小夜灯/1.png`
- **gallery_image_candidates:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/地脚灯小夜灯/3.png`, `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/地脚灯小夜灯/5.png`
- **seo_title:** Smart Footlight and Night Light Panel | DualCoreLink
- **seo_description:** Wall-mounted footlight and night light panel for hotel rooms, bedside areas, corridors, apartments, and coordinated smart panel projects, with OEM/ODM options.
- **post_content sections:** Overview; Key Features; Application Scenarios; B2B Project Value; OEM / ODM Project Support.
- **missing_information (10):** Electrical rating; Light source specification; Light output; Color temperature; Activation method; Product dimensions; Material specification; Installation box compatibility; Certification details; MOQ and lead time
- **risk_notes:** Image-only source; No confirmed light source specification; No confirmed sensor or activation method; No confirmed electrical specification; Conservative copy required
- **import_notes:** Import as draft; use existing category; do not write product series taxonomy; do not enable Product JSON-LD; do not populate commerce or rating fields.

## 6. Smart Series Dual Vertical Socket Panel

- **post_name:** `smart-series-dual-vertical-socket-panel`
- **post_status:** `draft`
- **post_type:** `product`
- **post_excerpt:** A dual vertical socket panel from the Smart Series for coordinated power access in hotel rooms, apartments, villas, and residential projects.
- **product_category:** Smart Sockets & Power Modules (`smart-sockets-power-modules`, term ID 6)
- **series_text:** Smart Series
- **featured_image_candidate:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/二联排竖孔插座/1.png`
- **gallery_image_candidates:** `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/二联排竖孔插座/3.png`
- **seo_title:** Smart Series Dual Vertical Socket Panel | DualCoreLink
- **seo_description:** Dual vertical socket panel for coordinated hotel room, apartment, villa, and residential projects, with project-based OEM/ODM discussion available worldwide.
- **post_content sections:** Overview; Key Features; Application Scenarios; B2B Project Value; OEM / ODM Project Support.
- **missing_information (9):** Socket standard and target market; Electrical rating; Power and load requirements; Product dimensions; Material specification; Installation box compatibility; Certification details; MOQ and lead time; Customization scope
- **risk_notes:** Image-only source; Regional socket standard not confirmed; No confirmed electrical specification; No confirmed certification; Conservative copy required
- **import_notes:** Import as draft; use existing category; do not write product series taxonomy; do not enable Product JSON-LD; do not populate commerce or rating fields.

## 7. Borui Red Matte Triple Socket Panel

- **post_name:** `borui-red-matte-triple-socket-panel`
- **post_status:** `draft`
- **post_type:** `product`
- **post_excerpt:** A Borui Series red matte triple socket panel for coordinated power access and a consistent visual finish in hotel and residential projects.
- **product_category:** Smart Sockets & Power Modules (`smart-sockets-power-modules`, term ID 6)
- **series_text:** Borui Series
- **featured_image_candidate:** `product-assets/raw-images/产品列表/产品列表/铂智系列智能面板/红色磨砂三联排USB五孔插座/1.png`
- **gallery_image_candidates:** `product-assets/raw-images/产品列表/产品列表/铂智系列智能面板/红色磨砂三联排USB五孔插座/4.png`
- **seo_title:** Borui Red Matte Triple Socket Panel | DualCoreLink
- **seo_description:** Borui Series red matte triple socket panel for coordinated hotel room, serviced apartment, villa, and OEM/ODM electrical product projects for overseas buyers.
- **post_content sections:** Overview; Key Features; Application Scenarios; B2B Project Value; OEM / ODM Project Support.
- **missing_information (9):** Socket standard and target market; Electrical rating; Power and load requirements; Internal socket configuration; Product dimensions; Material specification; Installation requirements; Certification details; MOQ and lead time
- **risk_notes:** Image-only source; No confirmed electrical specification; No confirmed certification; Conservative copy required; Visible USB output label is confirmed by user as real and public.; Do not expand the visible label into additional unconfirmed technical specifications.
- **import_notes:** Import as draft; use existing category; do not write product series taxonomy; do not enable Product JSON-LD; do not populate commerce or rating fields.

## 8. Brushed Aluminum Voice and Telephone Information Panel

- **post_name:** `brushed-aluminum-voice-telephone-information-panel`
- **post_status:** `draft`
- **post_type:** `product`
- **post_excerpt:** A brushed aluminum voice and telephone information panel for coordinated low-voltage connection points in hotel rooms, offices, and project interiors.
- **product_category:** Smart Sockets & Power Modules (`smart-sockets-power-modules`, term ID 6)
- **series_text:** Brushed Aluminum Series
- **featured_image_candidate:** `product-assets/raw-images/产品列表/产品列表/铝拉丝系列智能面板/金属拉丝语音信息面板电话插座/_INK4398_pixian_ai.png`
- **gallery_image_candidates:** `product-assets/raw-images/产品列表/产品列表/铝拉丝系列智能面板/金属拉丝语音信息面板电话插座/_INK4399_pixian_ai.png`, `product-assets/raw-images/产品列表/产品列表/铝拉丝系列智能面板/金属拉丝语音信息面板电话插座/_INK4400_pixian_ai.png`
- **seo_title:** Brushed Aluminum Voice and Telephone Information Panel | DualCoreLink
- **seo_description:** Brushed aluminum voice and telephone information panel for coordinated hotel room, apartment, office, and OEM/ODM low-voltage projects for overseas buyers.
- **post_content sections:** Overview; Key Features; Application Scenarios; B2B Project Value; OEM / ODM Project Support.
- **missing_information (9):** Connector type and interface standard; Supported signal type; Wiring requirements; Product dimensions; Material specification; Installation box compatibility; Certification details; MOQ and lead time; Customization scope
- **risk_notes:** Image-only source; Functional overlap with Smart Voice and Telephone Information Socket; retained as a Brushed Aluminum Series appearance variant; No confirmed connector standard; No confirmed electrical or signal specification; Conservative copy required
- **import_notes:** Import as draft; use existing category; do not write product series taxonomy; do not enable Product JSON-LD; do not populate commerce or rating fields.

## WordPress Import Readiness

| Check | Result | Notes | Blocking |
| --- | --- | --- | --- |
| Eight slugs unique | Pass | All 8 mapping slugs are unique | No |
| Duplicate against 27 products | Pass | No exact slug match found through read-only REST | No |
| Categories exist | Pass | RCU term 5, Smart Panels term 9, Smart Sockets term 6 | No |
| New taxonomy or term required | No | Existing terms only | No |
| product_series taxonomy write | Disabled | Series retained as text only | No |
| Product JSON-LD | Disabled | `product_schema_enabled: false` | No |
| Price, inventory, reviews, ratings | Not mapped | No fabricated commerce data | No |
| Featured images | Pass | 8 of 8 source files exist | No |
| Gallery images | Pass | 13 of 13 source files exist | No |
| Missing information retained | Pass | 73 total items retained | No |
| Borui USB output label | Confirmed | User confirmed visible label is real and public | No |

## Conclusion

**A. Fourth-batch WordPress field mapping is complete and can proceed to the pre-import backup stage.**

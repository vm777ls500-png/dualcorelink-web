# Third-Batch WordPress Field Mapping

This mapping is generated from the approved third-batch content and image mapping files. It does not modify WordPress, upload media, create terms or products, change frontend code, deploy, or commit files.

## Import Policy

- Post type: `product`
- Post status: `publish`
- Product status field: `available`
- Product series taxonomy: not registered; do not write taxonomy values
- Series handling: retain as `series_text` metadata or source text only
- Product JSON-LD: keep disabled
- Missing technical details: retain in `missing_information`; do not infer values
- All ten mappings use `import_ready: true`; missing terms remain mandatory pre-import actions.

## Category Term Plan

| Category | Slug | Status | Required action |
| --- | --- | --- | --- |
| Smart Panels & Switches | `smart-panels-switches` | needs_creation_before_import | Create before importing the affected product |
| HVAC & Thermostat Control | `hvac-thermostat-control` | needs_creation_before_import | Create before importing the affected product |

## Mapping Summary

| No. | Product | Slug | Category | Category status | Images | Import ready | Pre-import note |
| --: | --- | --- | --- | --- | --: | --- | --- |
| 1 | Smart Curtain Motor | `smart-curtain-motor` | Curtain Control Panels | exists | 5 | true | Use existing category term |
| 2 | Hotel Smart Room RCU Host 2 | `hotel-smart-room-rcu-host-2` | RCU Room Control Host | exists | 3 | true | Use existing category term |
| 3 | Hotel Delivery Robot Charging Dock | `hotel-delivery-robot-charging-dock` | Hotel Delivery Robot System | exists | 5 | true | Use existing category term |
| 4 | Borui Red Matte USB Five-Hole Socket | `borui-red-matte-usb-five-hole-socket` | Smart Sockets & Power Modules | exists | 3 | true | Use existing category term |
| 5 | Borui Red Matte Room Status and Four-Key Switch Panel | `borui-red-matte-room-status-four-key-switch-panel` | Room Status & Hotel Service Panels | exists | 3 | true | Use existing category term |
| 6 | Vintage Gold Key Card Energy Saver Panel | `vintage-gold-key-card-energy-saver-panel` | Smart Sockets & Power Modules | exists | 3 | true | Use existing category term |
| 7 | Vintage Gold Four-Key Smart Switch Panel | `vintage-gold-four-key-smart-switch-panel` | Smart Panels & Switches | needs_creation_before_import | 4 | true | Create `smart-panels-switches` term first |
| 8 | Brushed Aluminum SOS Alarm Panel | `brushed-aluminum-sos-alarm-panel` | Room Status & Hotel Service Panels | exists | 4 | true | Use existing category term |
| 9 | Brushed Aluminum Thermostat Control Panel | `brushed-aluminum-thermostat-control-panel` | HVAC & Thermostat Control | needs_creation_before_import | 4 | true | Create `hvac-thermostat-control` term first |
| 10 | Smart Voice and Telephone Information Socket | `smart-voice-telephone-information-socket` | Smart Sockets & Power Modules | exists | 3 | true | Use existing category term |

## Product Field Details

### 1. Smart Curtain Motor

- **title / post_title:** Smart Curtain Motor
- **slug / post_name:** `smart-curtain-motor`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A smart curtain motor for hotel rooms, serviced apartments, and smart home automation projects that need motorized curtain control as part of a room control system.
- **product_category:** Curtain Control Panels (`curtain-control-panels`; exists)
- **series_text:** null
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `smart-curtain-motor-1.png`
- **gallery_image_filenames:** `smart-curtain-motor-2.png`, `smart-curtain-motor-3.png`, `smart-curtain-motor-4.png`, `smart-curtain-motor-5.png`
- **product_short_description:** A smart curtain motor for hotel rooms, serviced apartments, and smart home automation projects that need motorized curtain control as part of a room control system.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/hotel-guest-room-control-solution/`, `/en/solutions/smart-hotel-automation-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`, `/en/case-studies/southeast-asia-serviced-apartment-residential-automation-project/`
- **seo_title:** Smart Curtain Motor for Hotel Room Automation
- **seo_description:** Smart curtain motor for hotel rooms, apartments, villas, and smart room automation. Request details for B2B integration and OEM/ODM projects.
- **post_content_sections:** overview, 5 key features, 5 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.

### 2. Hotel Smart Room RCU Host 2

- **title / post_title:** Hotel Smart Room RCU Host 2
- **slug / post_name:** `hotel-smart-room-rcu-host-2`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A room control host option for smart hotel guest rooms and integrated RCU projects where lighting, curtain, socket, and room status devices need coordinated control.
- **product_category:** RCU Room Control Host (`rcu-room-control-host`; exists)
- **series_text:** null
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `hotel-smart-room-rcu-host-2-1.png`
- **gallery_image_filenames:** `hotel-smart-room-rcu-host-2-2.png`, `hotel-smart-room-rcu-host-2-3.png`
- **product_short_description:** A room control host option for smart hotel guest rooms and integrated RCU projects where lighting, curtain, socket, and room status devices need coordinated control.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/rcu-room-control-solution/`, `/en/solutions/hotel-guest-room-control-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`, `/en/case-studies/southeast-asia-serviced-apartment-residential-automation-project/`
- **seo_title:** Hotel Smart Room RCU Host 2 for Room Control Projects
- **seo_description:** Hotel Smart Room RCU Host 2 for guest room automation, apartment projects, and smart room control system integration. Request project details.
- **post_content_sections:** overview, 5 key features, 5 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.

### 3. Hotel Delivery Robot Charging Dock

- **title / post_title:** Hotel Delivery Robot Charging Dock
- **slug / post_name:** `hotel-delivery-robot-charging-dock`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A charging dock accessory for hotel delivery robot projects, suitable for hospitality automation planning and robot system support.
- **product_category:** Hotel Delivery Robot System (`hotel-delivery-robot-system`; exists)
- **series_text:** null
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `hotel-delivery-robot-charging-dock-1.png`
- **gallery_image_filenames:** `hotel-delivery-robot-charging-dock-2.png`, `hotel-delivery-robot-charging-dock-3.png`, `hotel-delivery-robot-charging-dock-4.png`, `hotel-delivery-robot-charging-dock-5.png`
- **product_short_description:** A charging dock accessory for hotel delivery robot projects, suitable for hospitality automation planning and robot system support.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/hotel-delivery-robot-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`
- **seo_title:** Hotel Delivery Robot Charging Dock for Hospitality Projects
- **seo_description:** Charging dock support product for hotel delivery robot systems, smart hospitality automation, and B2B robot project planning.
- **post_content_sections:** overview, 5 key features, 5 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.

### 4. Borui Red Matte USB Five-Hole Socket

- **title / post_title:** Borui Red Matte USB Five-Hole Socket
- **slug / post_name:** `borui-red-matte-usb-five-hole-socket`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A red matte USB five-hole socket panel from the Borui Series for hotel rooms, apartments, and OEM/ODM smart panel projects.
- **product_category:** Smart Sockets & Power Modules (`smart-sockets-power-modules`; exists)
- **series_text:** Borui Series
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `borui-red-matte-usb-five-hole-socket-1.png`
- **gallery_image_filenames:** `borui-red-matte-usb-five-hole-socket-2.png`, `borui-red-matte-usb-five-hole-socket-3.png`
- **product_short_description:** A red matte USB five-hole socket panel from the Borui Series for hotel rooms, apartments, and OEM/ODM smart panel projects.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/oem-odm-custom-panel-solution/`, `/en/solutions/hotel-guest-room-control-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`, `/en/case-studies/southeast-asia-serviced-apartment-residential-automation-project/`, `/en/case-studies/overseas-oem-odm-smart-panel-customization-project/`
- **seo_title:** Borui Red Matte USB Five-Hole Socket Panel
- **seo_description:** Borui Series red matte USB five-hole socket panel for hotel rooms, apartments, residential automation, and OEM/ODM smart panel projects.
- **post_content_sections:** overview, 5 key features, 5 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.
  - USB output label confirmed by user; do not add unverified parameters to product copy.

### 5. Borui Red Matte Room Status and Four-Key Switch Panel

- **title / post_title:** Borui Red Matte Room Status and Four-Key Switch Panel
- **slug / post_name:** `borui-red-matte-room-status-four-key-switch-panel`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A Borui Series red matte combined room status and four-key switch panel for hotel guest room control and custom panel projects.
- **product_category:** Room Status & Hotel Service Panels (`room-status-hotel-service-panels`; exists)
- **series_text:** Borui Series
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `borui-red-matte-room-status-four-key-switch-panel-1.png`
- **gallery_image_filenames:** `borui-red-matte-room-status-four-key-switch-panel-2.png`, `borui-red-matte-room-status-four-key-switch-panel-3.png`
- **product_short_description:** A Borui Series red matte combined room status and four-key switch panel for hotel guest room control and custom panel projects.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/hotel-guest-room-control-solution/`, `/en/solutions/oem-odm-custom-panel-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`, `/en/case-studies/southeast-asia-serviced-apartment-residential-automation-project/`, `/en/case-studies/overseas-oem-odm-smart-panel-customization-project/`
- **seo_title:** Borui Red Matte Room Status and Four-Key Switch Panel
- **seo_description:** Borui Series red matte room status and four-key switch panel for smart hotel rooms, serviced apartments, and OEM/ODM panel projects.
- **post_content_sections:** overview, 5 key features, 5 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.

### 6. Vintage Gold Key Card Energy Saver Panel

- **title / post_title:** Vintage Gold Key Card Energy Saver Panel
- **slug / post_name:** `vintage-gold-key-card-energy-saver-panel`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A Vintage Series gold key card energy saver panel for hotel guest rooms, serviced apartments, and project-based smart room upgrades.
- **product_category:** Smart Sockets & Power Modules (`smart-sockets-power-modules`; exists)
- **series_text:** Vintage Series
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `vintage-gold-key-card-energy-saver-panel-1.png`
- **gallery_image_filenames:** `vintage-gold-key-card-energy-saver-panel-2.png`, `vintage-gold-key-card-energy-saver-panel-3.png`
- **product_short_description:** A Vintage Series gold key card energy saver panel for hotel guest rooms, serviced apartments, and project-based smart room upgrades.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/hotel-guest-room-control-solution/`, `/en/solutions/oem-odm-custom-panel-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`, `/en/case-studies/southeast-asia-serviced-apartment-residential-automation-project/`, `/en/case-studies/overseas-oem-odm-smart-panel-customization-project/`
- **seo_title:** Vintage Gold Key Card Energy Saver Panel
- **seo_description:** Vintage Series gold key card energy saver panel for hotel rooms, serviced apartments, and OEM/ODM smart panel projects.
- **post_content_sections:** overview, 5 key features, 5 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.
  - ELITE mark confirmed by user.

### 7. Vintage Gold Four-Key Smart Switch Panel

- **title / post_title:** Vintage Gold Four-Key Smart Switch Panel
- **slug / post_name:** `vintage-gold-four-key-smart-switch-panel`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A Vintage Series gold four-key smart switch panel for hotel rooms, serviced apartments, and decorative automation projects.
- **product_category:** Smart Panels & Switches (`smart-panels-switches`; needs_creation_before_import)
- **series_text:** Vintage Series
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `vintage-gold-four-key-smart-switch-panel-1.png`
- **gallery_image_filenames:** `vintage-gold-four-key-smart-switch-panel-2.png`, `vintage-gold-four-key-smart-switch-panel-3.png`, `vintage-gold-four-key-smart-switch-panel-4.png`
- **product_short_description:** A Vintage Series gold four-key smart switch panel for hotel rooms, serviced apartments, and decorative automation projects.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/hotel-guest-room-control-solution/`, `/en/solutions/oem-odm-custom-panel-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`, `/en/case-studies/southeast-asia-serviced-apartment-residential-automation-project/`, `/en/case-studies/overseas-oem-odm-smart-panel-customization-project/`
- **seo_title:** Vintage Gold Four-Key Smart Switch Panel
- **seo_description:** Vintage Series gold four-key smart switch panel for lighting, curtain, screen, and configurable room control projects.
- **post_content_sections:** overview, 6 key features, 6 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.
  - Create product_category term Smart Panels & Switches (smart-panels-switches) before importing this product.
  - ELITE mark confirmed by user; four-key functions confirmed for general switch-control use including lighting, curtains, and screens.

### 8. Brushed Aluminum SOS Alarm Panel

- **title / post_title:** Brushed Aluminum SOS Alarm Panel
- **slug / post_name:** `brushed-aluminum-sos-alarm-panel`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A Brushed Aluminum Series SOS alarm panel for hotel room service areas, guest room safety planning, and customized smart panel projects.
- **product_category:** Room Status & Hotel Service Panels (`room-status-hotel-service-panels`; exists)
- **series_text:** Brushed Aluminum Series
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `brushed-aluminum-sos-alarm-panel-1.png`
- **gallery_image_filenames:** `brushed-aluminum-sos-alarm-panel-2.png`, `brushed-aluminum-sos-alarm-panel-3.png`, `brushed-aluminum-sos-alarm-panel-4.png`
- **product_short_description:** A Brushed Aluminum Series SOS alarm panel for hotel room service areas, guest room safety planning, and customized smart panel projects.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/hotel-guest-room-control-solution/`, `/en/solutions/oem-odm-custom-panel-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`, `/en/case-studies/southeast-asia-serviced-apartment-residential-automation-project/`, `/en/case-studies/overseas-oem-odm-smart-panel-customization-project/`
- **seo_title:** Brushed Aluminum SOS Alarm Panel for Hotel Rooms
- **seo_description:** Brushed Aluminum Series SOS alarm panel for hotel rooms, serviced apartments, service call projects, and OEM/ODM smart panel programs.
- **post_content_sections:** overview, 5 key features, 5 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.

### 9. Brushed Aluminum Thermostat Control Panel

- **title / post_title:** Brushed Aluminum Thermostat Control Panel
- **slug / post_name:** `brushed-aluminum-thermostat-control-panel`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A Brushed Aluminum Series thermostat control panel for hotel rooms, serviced apartments, and smart room HVAC control projects.
- **product_category:** HVAC & Thermostat Control (`hvac-thermostat-control`; needs_creation_before_import)
- **series_text:** Brushed Aluminum Series
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `brushed-aluminum-thermostat-control-panel-1.png`
- **gallery_image_filenames:** `brushed-aluminum-thermostat-control-panel-2.png`, `brushed-aluminum-thermostat-control-panel-3.png`, `brushed-aluminum-thermostat-control-panel-4.png`
- **product_short_description:** A Brushed Aluminum Series thermostat control panel for hotel rooms, serviced apartments, and smart room HVAC control projects.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/hotel-guest-room-control-solution/`, `/en/solutions/ai-smart-display-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`, `/en/case-studies/southeast-asia-serviced-apartment-residential-automation-project/`, `/en/case-studies/overseas-oem-odm-smart-panel-customization-project/`
- **seo_title:** Brushed Aluminum Thermostat Control Panel
- **seo_description:** Brushed Aluminum Series thermostat control panel for hotel rooms, serviced apartments, smart homes, and OEM/ODM HVAC control projects.
- **post_content_sections:** overview, 5 key features, 5 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.
  - Create product_category term HVAC & Thermostat Control (hvac-thermostat-control) before importing this product.

### 10. Smart Voice and Telephone Information Socket

- **title / post_title:** Smart Voice and Telephone Information Socket
- **slug / post_name:** `smart-voice-telephone-information-socket`
- **post_type:** `product`
- **status:** `publish`
- **post_excerpt:** A Smart Series voice and telephone information socket panel for hotel rooms, serviced apartments, and smart room infrastructure projects.
- **product_category:** Smart Sockets & Power Modules (`smart-sockets-power-modules`; exists)
- **series_text:** Smart Series
- **do_not_write_product_series_taxonomy:** true
- **featured_image_filename:** `smart-voice-telephone-information-socket-1.png`
- **gallery_image_filenames:** `smart-voice-telephone-information-socket-2.png`, `smart-voice-telephone-information-socket-3.png`
- **product_short_description:** A Smart Series voice and telephone information socket panel for hotel rooms, serviced apartments, and smart room infrastructure projects.
- **product_status:** `available`
- **is_featured_product:** false
- **is_new_product:** true
- **inquiry_cta_label:** Request Product Details
- **product_schema_enabled:** false
- **related_solutions:** `/en/solutions/hotel-guest-room-control-solution/`, `/en/solutions/smart-hotel-automation-solution/`
- **related_case_studies:** `/en/case-studies/middle-east-smart-hotel-guest-room-control-project/`, `/en/case-studies/southeast-asia-serviced-apartment-residential-automation-project/`
- **seo_title:** Smart Voice and Telephone Information Socket
- **seo_description:** Smart Series voice and telephone information socket panel for hotel rooms, serviced apartments, and smart room infrastructure projects.
- **post_content_sections:** overview, 5 key features, 5 application scenarios, 4 B2B value points, OEM/ODM notes, and 6 missing-information items
- **import_ready:** true
- **import_notes:**
  - Do not write product_series taxonomy; retain series_text as source metadata only.
  - Do not enable Product JSON-LD.

## Safety Notes

- Do not create or infer voltage, power, load, protocol, dimensions, material, IP rating, app, or certification values.
- Do not write `product_series` taxonomy.
- Do not enable Product JSON-LD.
- Create only the two approved missing category terms before importing the affected products.
- Build `post_content` from the structured sections in the JSON mapping without removing `missing_information`.


# OEM/ODM Configuration Display Plan

Generated: 2026-06-22

## Scope and Decision

Multi-gang panel combinations should be presented as configurable OEM/ODM project examples. They must not be imported as standard products, assigned individual product URLs, treated as stock SKUs, or added to product taxonomies.

Recommended primary placement: the existing OEM/ODM Custom Panel Solution page.

Recommended secondary placement: a compact configuration teaser on the Hotel Guest Room Control Solution page, linking to the OEM/ODM solution and Contact page.

## 1. Source Material Groups

| Series | Source Image Count | Group Count | Typical Modules | Notes |
| --- | ---: | ---: | --- | --- |
| Smart Series | 42 | 13 | Lighting switches, USB sockets, key-card power, room-status controls, curtain controls, thermostat controls, display modules | Broadest range; use five representative configurations and avoid repeated angles. Some USB labels show electrical markings. |
| Vintage Gold Series | 16 | 4 | USB and power sockets, lighting/curtain switches, smart display combinations | `ELITE` series mark is visible and was previously confirmed by the user. Exclude the display example that exposes date, location, and music-screen content. |
| Borui Series | 13 | 4 | Room-status panels, switches, USB/power sockets, thermostat controls | Red matte finish provides a distinct OEM/ODM appearance option. Some USB labels show confirmed markings, but the values should not be converted into general specifications. |
| Brushed Aluminum Series | 8 | 2 | Key-card power, service/lighting switches, USB/Type-C and socket combinations | Two clear configuration groups with front and angled views. Avoid repetitive angles and do not publish visible electrical markings as universal specifications. |

No `product_series` taxonomy should be created or written.

## 2. Recommended Display Locations

| Display Location | Recommended | Advantages | Risks | Recommendation |
| --- | --- | --- | --- | --- |
| OEM/ODM page / OEM/ODM Custom Panel Solution | Yes, primary | Directly supports customization enquiries and explains selectable modules, finishes, and layouts | Can be mistaken for an order catalogue | Add a clear configuration-example badge and disclaimer; link every CTA to project consultation |
| Hotel Guest Room Solution page | Yes, secondary | Shows how panels can be combined around a room-control plan | Too many images may distract from the solution narrative | Use three or four examples and link to the full OEM/ODM section |
| Products category page | No | High traffic and product context | Blurs the boundary between products and project configurations | Keep the Products page limited to published products |
| Homepage | Later, lightweight teaser only | Communicates customization capability early | Adds visual density and may compete with products, solutions, and case studies | Consider one compact strip after the primary OEM/ODM module is live |
| Separate Configuration Gallery page | Not initially | Provides space for future filtering and a larger library | Thin standalone page, extra navigation, SEO maintenance, and stronger SKU confusion | Reconsider only after at least 25 curated, renamed, optimized images are ready |
| Related product detail pages | No | Could show compatible appearance options | Implies tested compatibility or product-specific availability | Do not distribute the combinations across product detail pages |

## 3. Recommended Frontend Module

- **section_title:** Custom Room Panel Configuration Options
- **section_subtitle:** Select panel finishes and module combinations for hotel guest room and OEM/ODM projects.
- **intro_text:** DualCoreLink supports project-based panel configuration for lighting, curtain control, room status, key-card power, thermostat control, USB, socket, and low-voltage modules. The examples below illustrate possible layouts for project discussion rather than fixed stock SKUs.
- **series_tabs:** Smart Series; Vintage Gold Series; Borui Series; Brushed Aluminum Series.
- **configuration_cards:** Each card should contain a representative image, series name, configuration-example badge, short module list, suitable project context, and a `Discuss This Configuration` action.
- **inquiry_cta:** Primary: `Send Your Room Layout`; secondary: `Request OEM/ODM Configuration`; tertiary: `Get a Quote on WhatsApp`.
- **disclaimer_text:** Configuration images are for project reference. Module compatibility, electrical requirements, labels, finishes, dimensions, production scope, MOQ, and lead time must be confirmed for each project. Displayed combinations are not presented as standard stock SKUs.

### Card Data Model

| Field | Purpose |
| --- | --- |
| `series` | One of the four approved display series |
| `configuration_label` | Neutral description such as `Key Card + Room Status + Lighting` |
| `modules` | Visible module types without unverified technical specifications |
| `application` | Hotel guest room, serviced apartment, villa, or commercial project |
| `image` | Curated and optimized public media path |
| `is_configuration_example` | Always `true` |
| `cta_label` | `Discuss This Configuration` |

## 4. Representative Image Recommendations

### Smart Series

Recommended first release: 5 images.

1. `智慧系列智能面板/二联排USB五孔插座+四键智能面板/1.png`
2. `智慧系列智能面板/二联排插卡取电+四键智能面板/1.png`
3. `智慧系列智能面板/三联排插卡取电+房态四键智能面板+卫生间四键智能面板/1.png`
4. `智慧系列智能面板/三联排四键智能开关+空调控制器+USB不间断电源五孔插座/1.png`
5. `智慧系列智能面板/四联排USB五孔插座+空调控制器+四键智能面板/1.png`

Why: Covers two-, three-, and four-gang layouts; lighting, room status, key-card power, curtain, thermostat/display, USB, and socket examples.

Exclude initially: repeated side/rear angles; the dual vertical socket group already represented by an existing published product; images dominated by visible electrical labels when an equivalent cleaner configuration exists.

Risk: Chinese function labels and some USB output markings are visible. Treat labels as configuration examples and do not transcribe electrical values into marketing copy.

### Vintage Gold Series

Recommended first release: 3 images.

1. `复古系列智能面板/复古金色二联排USB五孔插座/08.png`
2. `复古系列智能面板/复古金色四联排USB五孔插座+智能开关面板/22.png`
3. `复古系列智能面板/复古金色智能开关面板+USB五孔插座/22.png`

Why: Shows a coherent gold finish across dual, triple, and four-module arrangements.

Exclude initially: `三联排复古金色智能面板+五孔插座+中控屏/11.png` and related display images because the screen contains date, location, weather, and music-interface content; repeated close angles; low-value duplicates.

Risk: The visible `ELITE` mark was confirmed by the user, but it should remain an appearance mark rather than a separate brand claim in page copy.

### Borui Series

Recommended first release: 3 images.

1. `铂智系列智能面板/红色磨砂二联排房态+四键智能开关面板/1.png`
2. `铂智系列智能面板/红色磨砂三联排USB五孔插座/1.png`
3. `铂智系列智能面板/红色磨砂三联排USB五孔插座  四键智能面板 六键智能面板/1.png`

Why: Demonstrates room-status, switch, socket, USB, lighting, curtain, and scene-control combinations in the distinctive red matte finish.

Exclude initially: repeated angles and the thermostat combination until the dark display and surrounding labels are reviewed for presentation clarity.

Risk: USB markings are visible and were previously confirmed by the user. They may remain in the image, but must not be generalized into project specifications.

### Brushed Aluminum Series

Recommended first release: 3 images.

1. `铝拉丝系列智能面板/金属拉丝三联排插卡取电+四键智能面板/1.png`
2. `铝拉丝系列智能面板/金属拉丝三联排插卡取电+四键智能面板/3.png`
3. `铝拉丝系列智能面板/拉丝银二联排智能四键+USB Type-c五孔插座/1.png`

Why: Shows both front and controlled perspective views of key-card, service, lighting, USB/Type-C, and socket arrangements while keeping the brushed finish visible.

Exclude initially: additional near-duplicate angles and the strongest close-up of the USB electrical marking.

Risk: The USB combination includes visible electrical text. Do not repeat it as a confirmed specification without product-level validation.

## 5. English B2B Copy Draft

### Section Title

Custom Room Panel Configuration Options

### Short Intro

Configure coordinated room panels for hotel guest rooms, serviced apartments, villas, and OEM/ODM projects. Select the panel series and discuss suitable combinations for lighting, curtain control, room status, key-card power, thermostat control, sockets, USB, and low-voltage modules.

### Series Descriptions

**Smart Series**  
A restrained black panel direction for coordinated room-control layouts. It can support project discussions covering switches, room status, key-card power, curtain control, thermostat interfaces, sockets, USB, and display modules.

**Vintage Gold Series**  
A decorative gold-tone option for hospitality and residential interiors that require a more distinctive panel appearance. Module combinations can be reviewed according to the room layout and project requirements.

**Borui Series**  
A red matte panel direction for projects seeking a stronger visual identity across room-status, switch, socket, USB, thermostat, and curtain-control arrangements.

**Brushed Aluminum Series**  
A brushed metal appearance for coordinated hotel room and commercial interior projects. Typical discussions may include key-card power, service controls, lighting switches, sockets, USB/Type-C, and low-voltage modules.

### Configuration Examples

- Lighting + USB + Curtain Control
- Key Card + Room Status + Socket
- Thermostat + Service Panel + Lighting
- Multi-gang Socket and Low-voltage Combinations

### Calls to Action

- Send Your Room Layout
- Request OEM/ODM Configuration
- Get a Quote on WhatsApp

### Disclaimer

Configuration images are provided for project reference. Final module selection, compatibility, labels, electrical requirements, finish, dimensions, MOQ, lead time, and production scope must be confirmed for each project. Displayed combinations are not standard stock SKUs.

## 6. Risk Control

| Risk | Exists | Handling | Blocking |
| --- | --- | --- | --- |
| Misunderstood as standard SKU | Yes | Use `Configuration Example` badges, no product URLs, no prices or stock, and display the disclaimer near the gallery | No after controls |
| Customer or hotel brand | Not found in sampled recommended images | Perform a final full-resolution review before media preparation | Conditional |
| Room number | Not found in sampled recommended images | Exclude any later-discovered project-specific image | Conditional |
| Unconfirmed electrical parameters | Yes | Do not transcribe visible labels; prefer cleaner images; confirm any specification separately | No after controls |
| Duplicate content with product pages | Yes | Present combinations only in OEM/ODM context and avoid reusing single-product hero images as configuration cards | No |
| Product-category confusion | Possible | Do not add products, categories, taxonomy terms, product schema, or sitemap URLs | No after controls |
| Disclaimer required | Yes | Place it directly below the module and repeat a shorter note near the enquiry CTA | No after controls |
| Image compression and SEO naming | Yes | Prepare 14 selected images in a later media stage, with unique English filenames and neutral ALT text | No for planning |
| Visible series mark | Yes, Vintage Gold | `ELITE` was user-confirmed; do not turn it into an unsupported brand claim | No |
| Screen UI, location, date, or music content | Yes, one Vintage group | Exclude the display group from the first public release | No after exclusion |

## 7. Implementation Routes

| Route | Description | Pros | Risks | Recommendation |
| --- | --- | --- | --- | --- |
| A | Add the full module to the OEM/ODM Custom Panel Solution page | Best alignment with project customization and enquiry intent; no new URL required | Requires careful disclaimer and curated media | **Recommended primary route** |
| B | Add a compact teaser to the Hotel Guest Room Control Solution page | Connects configurations to a practical room-control context | Can distract if too large | **Recommended secondary route** |
| C | Create a standalone Configuration Gallery page | Supports a larger future library and filters | Thin page risk, navigation overhead, stronger SKU confusion | Defer |
| D | Keep the images only as internal sales material | Lowest public risk | No website value or organic discovery | Fallback only |
| E | Import every combination as a product | Creates individual searchable records | Duplicates products, confuses categories and availability, expands sitemap without true SKUs | **Not recommended** |

## 8. Recommended Next Stage

1. Confirm the 14-image first-release shortlist.
2. Perform full-resolution risk review and remove near duplicates.
3. Create SEO filenames and neutral ALT text.
4. Prepare optimized static copies; keep source images unchanged.
5. Draft the OEM/ODM page module implementation and secondary Solution teaser.
6. Build locally and verify that no product, taxonomy, sitemap, or Product JSON-LD behavior changes.

## Final Conclusion

**A. Multi-gang combinations are suitable for an OEM/ODM configuration display module.**


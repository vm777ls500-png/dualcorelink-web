# OEM/ODM Custom Panel Configuration Frontend Implementation Plan

Generated: 2026-06-22  
Source: `product-assets/mapping-output/oem-odm-configuration-image-placement.json`

## Scope

This stage is planning only. No WordPress data, frontend source, static images, sitemap logic, build output, deployment, or Git state was changed.

## 1. Current Page and Route Review

The site already has the correct destination: `/en/solutions/oem-odm-custom-panel-solution/`. It is rendered by the shared Solution detail template and populated through the WordPress Solution repository. A separate OEM/ODM route is unnecessary.

| Page / File | Related | Current Role | Insert Module | Reason |
| --- | --- | --- | --- | --- |
| `src/app/[locale]/solutions/[slug]/page.tsx` | Yes | Shared Solution detail template | Yes | Renders the existing OEM/ODM Solution URL and already contains product context, planning details, and the final CTA. |
| `src/app/[locale]/solutions/page.tsx` | Yes | Solution index with an OEM/ODM entry | No | The existing entry already links to the target detail page. |
| `src/app/[locale]/page.tsx` | Indirectly | Homepage and B2B entry points | No | Defer homepage promotion to avoid first-release scope growth and image weight. |
| `src/app/[locale]/products/page.tsx` | No | Product listing and taxonomy display | No | Configuration examples are not standard SKUs. |
| `src/components/content/contact-cta.tsx` | Yes | Existing page-level inquiry CTA | Reuse pattern only | The new module should use the established contact and WhatsApp behavior without modifying the shared CTA. |
| `src/components/content/media-frame.tsx` | Yes | Existing `next/image` media treatment | Reuse pattern only | The gallery needs repeated cards but should follow the same stable image-frame approach. |
| `src/app/sitemap.ts` | No | Sitemap generation | No | No new route is introduced. |

Existing OEM/ODM page capabilities:

- Solution hero or snapshot
- Customer challenges and architecture
- Benefits, deployment, compatibility, and limitations
- Recommended Products
- Project planning details
- B2B project support CTA
- Existing Service and BreadcrumbList schema

## 2. Recommended Insertion Point

| Insertion Position | Recommendation | Benefits | Risk | Guidance |
| --- | --- | --- | --- | --- |
| Existing OEM/ODM Solution detail page | Primary | Correct intent, existing indexed URL, clean separation from SKUs | Shared-template regression if the condition is broad | Render after `RecommendedProducts` and before `FallbackContent`, guarded by `locale === "en" && slug === "oem-odm-custom-panel-solution"`. |
| Hotel Guest Room Control Solution | Later | Strong project-use context | Duplicates content in the first release | Add only a small future entry link if needed. |
| Homepage customization section | Later | High visibility | Nine images add homepage density and weight | Consider after engagement review. |
| Products page lower section | Not recommended | Product visitors may notice customization | Can be mistaken for a product/SKU list | Keep the gallery out of Products in the first release. |

Recommended exact order:

1. Existing Recommended Products
2. New Custom Panel Configuration module
3. Existing Project planning details
4. Existing page-level Contact CTA

## 3. Component Design

| Component | Suggested Path | New | Reuse Existing Style | Risk |
| --- | --- | --- | --- | --- |
| `CustomPanelConfigurationSection` | `src/components/content/custom-panel-configuration-section.tsx` | Yes | Yes | Must remain slug-scoped and responsive. |
| `OemOdmConfigurationGallery` | Same role under a less direct name | Alternative | Yes | The name is less explicit about the complete section. |
| `PanelConfigurationShowcase` | Same role under a broader name | Alternative | Yes | Could be reused too broadly and lose the OEM/ODM boundary. |

Recommended implementation:

- Use `CustomPanelConfigurationSection` as a Server Component with no `use client` directive.
- Present four visible series groups rather than interactive tabs in the first release.
- Use one column on mobile, two on tablet, and three on desktop.
- Give every image a fixed aspect-ratio frame and use `object-contain`.
- Use `next/image` with default lazy loading; no gallery image needs `priority`.
- Suggested `sizes`: `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw`.
- Reuse `border-line`, `bg-surface`, brand text, button, and container conventions.
- Do not introduce a UI library or a standalone stylesheet; existing Tailwind utilities are sufficient.
- Use an H2 for the section and H3 headings for cards.
- Keep “Configuration example” visible on every card.

The project uses `output: "export"` and `images.unoptimized: true`. Public images can therefore use root-relative paths with the existing `next/image` component without an image optimization service.

## 4. Static Data Design

Recommended file: `src/config/static-oem-odm-configurations.ts`

This matches the repository’s existing curated static-content pattern. The data should not be page-local and should not create a new `src/data` convention.

```ts
type PanelConfigurationSeries =
  | "Smart Series"
  | "Vintage Gold Series"
  | "Borui Series"
  | "Brushed Aluminum Series";

type PanelConfigurationImage = {
  id: string;
  series: PanelConfigurationSeries;
  title: string;
  image: string;
  alt: string;
  modules: readonly string[];
  useCase: string;
};
```

### Module Copy

- **Section title:** Custom Room Panel Configuration Options
- **Section subtitle:** Coordinate panel finishes and selectable modules for hotel guest room and OEM/ODM projects.
- **Intro:** Review representative panel layouts for lighting, curtain control, room status, key-card power, thermostat control, sockets, USB, and low-voltage functions. Each layout is a project configuration example rather than a fixed stock SKU.
- **Primary CTA:** Request OEM/ODM Configuration
- **Secondary CTA:** Send Your Room Layout
- **WhatsApp CTA:** Get a Quote on WhatsApp
- **Card note:** Configuration example. Final module selection and production scope require project confirmation.
- **Disclaimer:** Images show OEM/ODM configuration examples, not standard stock SKUs. Modules, colors, panel layouts, functions, and quantities can be adapted to project requirements. Final configuration, compatibility, MOQ, lead time, and quotation are subject to project review and written confirmation.

### Nine-card Data Draft

| Series | Card Title | Modules | Use Case |
| --- | --- | --- | --- |
| Smart Series | Key Card and Room Service Controls | Key-card power; room service status; guest controls | Hotel guest room entry and service panel planning |
| Smart Series | Key Card, Room Status and Lighting Controls | Key-card power; room status; lighting and service controls | Coordinated guest room control layouts |
| Vintage Gold Series | Dual Socket Configuration | Power socket; USB connection; Vintage Gold finish | Bedside and work-area power layouts |
| Vintage Gold Series | Four-gang Socket and Switch Configuration | Lighting controls; USB sockets; curtain controls | Coordinated multi-gang room panel layouts |
| Vintage Gold Series | Lighting, USB and Curtain Configuration | Lighting scenes; USB socket; curtain controls | Guest room bedside and control panel planning |
| Borui Series | Room Status and Lighting Configuration | Room status; lighting controls; service controls | Hotel service and lighting panel coordination |
| Borui Series | Multi-gang Socket Configuration | Power sockets; USB connection; Borui finish | Project-specific power access layouts |
| Borui Series | Lighting, Curtain and Socket Configuration | Lighting scenes; curtain controls; power and USB | Mixed control and power panel planning |
| Brushed Aluminum Series | Key Card, Service and Lighting Configuration | Key-card power; service controls; lighting controls | Brushed metal guest room panel coordination |

## 5. Static Image Preparation

Recommended directory: `public/media/oem-odm-configurations/`  
Public URL prefix: `/media/oem-odm-configurations/`

These are frontend-owned static assets. They should not enter the WordPress media library or the WordPress static media manifest.

| Source Image | Recommended Static Path | ALT Text | Use | Risk |
| --- | --- | --- | --- | --- |
| `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/二联排插卡取电+四键智能面板/1.png` | `/media/oem-odm-configurations/smart-series-key-card-room-service-configuration.png` | Smart Series key card and room service panel configuration for hotel projects | OEM/ODM primary gallery | Function labels are examples; disclaimer required. |
| `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/三联排插卡取电+房态四键智能面板+卫生间四键智能面板/1.png` | `/media/oem-odm-configurations/smart-series-key-card-room-status-lighting-configuration.png` | Smart Series key card room status and lighting control configuration | OEM/ODM primary gallery | Avoid fixed-SKU interpretation. |
| `product-assets/raw-images/产品列表/产品列表/复古系列智能面板/复古金色二联排USB五孔插座/08.png` | `/media/oem-odm-configurations/vintage-gold-dual-usb-socket-configuration.png` | Vintage Gold Series dual socket configuration for hospitality projects | OEM/ODM primary gallery | Visible ELITE mark was previously confirmed. |
| `product-assets/raw-images/产品列表/产品列表/复古系列智能面板/复古金色四联排USB五孔插座+智能开关面板/22.png` | `/media/oem-odm-configurations/vintage-gold-four-gang-socket-switch-configuration.png` | Vintage Gold Series multi-gang socket and switch configuration | OEM/ODM primary gallery | Do not generalize visible labels into specifications. |
| `product-assets/raw-images/产品列表/产品列表/复古系列智能面板/复古金色智能开关面板+USB五孔插座/22.png` | `/media/oem-odm-configurations/vintage-gold-lighting-usb-curtain-configuration.png` | Vintage Gold Series lighting USB and curtain control configuration | OEM/ODM primary gallery | Final functions require project confirmation. |
| `product-assets/raw-images/产品列表/产品列表/铂智系列智能面板/红色磨砂二联排房态+四键智能开关面板/1.png` | `/media/oem-odm-configurations/borui-series-room-status-lighting-configuration.png` | Borui Series room status and lighting control configuration | OEM/ODM primary gallery | Avoid fixed-SKU interpretation. |
| `product-assets/raw-images/产品列表/产品列表/铂智系列智能面板/红色磨砂三联排USB五孔插座/1.png` | `/media/oem-odm-configurations/borui-series-multi-gang-socket-configuration.png` | Borui Series multi-gang socket configuration for room projects | OEM/ODM primary gallery | Visible USB label was confirmed; do not transcribe it as a specification. |
| `product-assets/raw-images/产品列表/产品列表/铂智系列智能面板/红色磨砂三联排USB五孔插座  四键智能面板 六键智能面板/1.png` | `/media/oem-odm-configurations/borui-series-lighting-curtain-socket-configuration.png` | Borui Series lighting curtain and socket panel configuration | OEM/ODM primary gallery | Do not generalize visible labels into technical data. |
| `product-assets/raw-images/产品列表/产品列表/铝拉丝系列智能面板/金属拉丝三联排插卡取电+四键智能面板/1.png` | `/media/oem-odm-configurations/brushed-aluminum-key-card-service-lighting-configuration.png` | Brushed Aluminum Series key card service and lighting configuration | OEM/ODM primary gallery | Function labels are configuration examples. |

Before implementation, create optimized copies only. Do not move, rename, or delete any source image.

## 6. SEO and Schema Impact

| SEO / Schema Item | Needed | Reason | Risk |
| --- | --- | --- | --- |
| Existing page metadata and canonical | Yes, unchanged | The module enriches the existing Solution URL. | None if untouched. |
| Existing Service schema | Yes, unchanged | The page remains a service/solution page. | Do not alter the graph. |
| Existing BreadcrumbList | Yes, unchanged | Navigation structure is unchanged. | None. |
| Product schema | No | Images are configuration examples, not products. | Would misclassify content and revive rich-result requirements. |
| Offer, Review, or Rating schema | No | No public price, inventory, or review data exists. | Unsupported structured data would be misleading. |
| ImageObject schema | No | The project has no unified gallery ImageObject convention. | Complexity without a clear benefit. |
| Sitemap entry | No | No new route is created. | Sitemap logic changes would be unrelated. |

Use an H2 section heading, descriptive ALT text, and normal internal contact links. The module does not need dedicated structured data.

## 7. Implementation File Boundary

| File | Change Type | Reason | Required |
| --- | --- | --- | --- |
| `src/app/[locale]/solutions/[slug]/page.tsx` | Exact locale-and-slug-guarded render | Add the module only to the English OEM/ODM Solution page. | Yes |
| `src/components/content/custom-panel-configuration-section.tsx` | New Server Component | Isolate gallery, disclaimer, and CTAs from the shared template. | Yes |
| `src/config/static-oem-odm-configurations.ts` | New typed static data | Keep configuration content outside WordPress and product models. | Yes |
| `public/media/oem-odm-configurations/*.png` | Nine optimized static copies | Use stable English public URLs. | Yes |
| `tests/oem-odm-configuration.test.ts` | Focused static-data validation | Validate unique paths, series coverage, and disclaimer presence. | Optional |

Explicit exclusions:

- WordPress and product CPT data
- Product taxonomy
- `src/app/sitemap.ts`
- Schema builders
- Product detail template
- Existing product content
- Hotel Guest Room Solution in the first release
- Homepage in the first release
- WordPress media sync script and manifest

## 8. Risk Controls

| Risk | Exists | Handling | Blocking |
| --- | --- | --- | --- |
| Configuration examples may look like stocked SKUs | Yes | Show “Configuration example” on every card and the full disclaimer near CTAs. | No, if disclaimer is present |
| Customer names, hotel brands, or room numbers | No in selected images | Recheck the nine copied assets before implementation. | No |
| Unconfirmed electrical labels are visible | Yes in some images | Never transcribe them into copy, ALT, modules, specifications, or schema. | No |
| Product page SEO impact | No | Render only on the OEM/ODM Solution route. | No |
| Sitemap impact | No | Do not create a route or change sitemap logic. | No |
| Overlap with product imagery | Yes | Frame every card as a multi-module project configuration and do not link it as a product. | No |
| Mobile performance from nine images | Yes | Compress copies, use responsive sizes, stable aspect ratios, and lazy loading. | No |
| Accessible tabs would require client logic | Yes | Use visible grouped series sections for the first release. | No |
| Missing disclaimer | Yes | Treat both the card note and full disclaimer as required content. | Yes |

## 9. Implementation-stage Verification

1. Confirm exactly nine public images with unique paths.
2. Confirm all four series are represented.
3. Confirm the module appears only on `/en/solutions/oem-odm-custom-panel-solution/`.
4. Confirm no new route or sitemap URL appears.
5. Confirm no Product, Offer, Review, Rating, or ImageObject schema is added.
6. Confirm all image URLs begin with `/media/oem-odm-configurations/`.
7. Confirm one-, two-, and three-column layouts do not overflow.
8. Confirm every gallery image lazy loads and has a stable aspect-ratio frame.
9. Confirm the card note, full disclaimer, and project-confirmation wording are visible.
10. Run lint, data tests, static export build, and focused output scans only in the implementation stage.

## Conclusion

**A. Frontend implementation preparation is complete and can proceed to local implementation of the OEM/ODM configuration module.**

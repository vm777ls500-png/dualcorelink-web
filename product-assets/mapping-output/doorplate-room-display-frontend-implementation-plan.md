# Doorplate / Room Display Frontend Implementation Plan

Generated: 2026-06-22
Source: `product-assets/mapping-output/doorplate-room-display-project-display-plan.json`

## Scope

This stage is implementation planning only. No WordPress data, public media, frontend source, route, sitemap logic, schema, build output, deployment, or Git state was changed.

## 1. Current Hotel Guest Room Solution Structure

The target URL already exists: `/en/solutions/hotel-guest-room-control-solution/`. It is rendered through the shared Solution detail template and populated by the WordPress Solution repository. No new page is needed.

| File / Page | Related | Current Role | Insert Module | Reason |
| --- | --- | --- | --- | --- |
| `src/app/[locale]/solutions/[slug]/page.tsx` | Yes | Shared detail template for all Solution pages | Yes | Add an exact English-locale and Hotel Guest Room Solution slug guard. |
| `src/app/[locale]/solutions/page.tsx` | Yes | Solution index with an existing Hotel Guest Room entry | No | The existing entry already links to the target page. |
| `src/components/content/custom-panel-configuration-section.tsx` | Yes | Existing grouped static gallery pattern | Reference only | Reuse layout and CTA conventions without mixing OEM/ODM and room-display semantics. |
| `src/config/static-oem-odm-configurations.ts` | Yes | Existing typed static module data pattern | No | Follow the same `src/config` ownership pattern in a separate file. |
| `src/components/content/contact-cta.tsx` | Yes | Existing page-level B2B contact CTA | Reference only | Reuse contact and WhatsApp behavior while preserving the final CTA. |
| `src/components/content/media-frame.tsx` | Yes | Existing `next/image` frame | Reference only | Reuse stable aspect ratio and `object-contain` behavior. |
| `src/app/sitemap.ts` | No | Existing sitemap generation | No | No route or sitemap URL is introduced. |
| Case Studies pages and data | No | Anonymous project-reference content | No | The doorplate images have no authorized Case Study narrative. |

Current detail-page order:

1. Solution hero or snapshot
2. Customer challenges
3. Solution architecture
4. Key benefits
5. Deployment process
6. Protocol, integration, compatibility, and limitation sections
7. Recommended Products
8. Conditional OEM/ODM module on a different slug
9. Project planning details
10. Final B2B project support CTA

## 2. Recommended Insertion Position

| Position | Recommendation | Benefits | Risk | Guidance |
| --- | --- | --- | --- | --- |
| After Solution Overview | Low | High visibility | Branded imagery appears before project context and can dominate the page early | Do not use for the first release. |
| After Recommended Products | Primary | Visitors understand the product mix before seeing project-format examples | Requires an exact guard in the shared template | Recommended. |
| After System Architecture | Medium | Strong system association | Interrupts the technical content sequence | Keep technical sections together. |
| Before Project Process / Planning Details | Primary | Smooth transition from products to visual references to planning details | Only guard accuracy | This is the same final location as after Recommended Products in the current template. |
| Immediately before final CTA | Secondary | Close to inquiry action | Separates references from products and creates adjacent CTA treatments | Keep the module before planning details. |

Recommended exact order:

1. Existing Recommended Products
2. New Room Display Project References module
3. Existing Project planning details
4. Existing page-level Contact CTA

Recommended guard:

```tsx
locale === "en" && slug === "hotel-guest-room-control-solution"
```

## 3. Component Design

| Component | Suggested Path | New | Reuse Existing Style | Risk |
| --- | --- | --- | --- | --- |
| `RoomDisplayProjectReferencesSection` | `src/components/content/room-display-project-references-section.tsx` | Yes | Yes | Must remain route-scoped and keep the disclaimer visible. |
| `DoorplateRoomDisplayShowcase` | Alternative | Yes | Yes | Less explicit about project-reference status. |
| `HotelRoomSignageProjectDisplay` | Alternative | Yes | Yes | Tighter hotel naming but less aligned with existing section naming. |

Recommended implementation:

- Use `RoomDisplayProjectReferencesSection` as a Server Component.
- Use four visible groups with two cards each; do not add tabs or a carousel.
- Use one column on mobile and two columns from the small breakpoint upward.
- Use a stable 16:9 image frame with `object-contain`.
- Use `next/image` default lazy loading for all eight images; no image needs `priority`.
- Suggested `sizes`: `(max-width: 640px) 100vw, 50vw`.
- Reuse `border-line`, `bg-surface`, `bg-background`, brand text, CTA, and content-width conventions.
- Use an H2 for the module, H3 for groups, and H4 for cards.
- Display **Project display reference** on every card.
- Do not introduce a UI library, client state, or a separate stylesheet.

The project uses static export with `images.unoptimized: true`, so public image paths work with the existing `next/image` component without an image optimization service.

## 4. Static Data Design

Recommended file: `src/config/static-room-display-projects.ts`

The data should not be page-local and should not create a new `src/data` convention. `src/config` already owns curated FAQ, Case Study, and OEM/ODM module data.

```ts
type RoomDisplayGroup =
  | "86-Base Wide Display References"
  | "Brushed Silver Doorplate References"
  | "Dark Glass Room Status Display References"
  | "Brushed Aluminum Doorplate References";

type RoomDisplayProjectReference = {
  id: string;
  group: RoomDisplayGroup;
  title: string;
  image: string;
  alt: string;
  displayType: string;
  visibleContext: string;
};
```

### Module Copy

- **Eyebrow:** Project display references
- **Title:** Room Signage & Door Display Project References
- **Subtitle:** Reference formats for hotel room identification, doorbell, service status, and guest-facing display planning.
- **Intro:** Review representative hospitality room-signage formats across dark glass, brushed silver, and brushed aluminum finishes. These images illustrate project-style layouts and visible interface treatments for discussion; they are not standardized product models or customer endorsements.
- **Card label:** Project display reference
- **Primary CTA:** Discuss Your Hotel Room Display Requirements
- **Secondary CTA:** Request Room Signage Customization
- **WhatsApp CTA:** Get a Quote on WhatsApp
- **WhatsApp:** `https://wa.me/85270390436`

### Eight-card Data Draft

| Group | Title | Image | Display Type | Visible Context |
| --- | --- | --- | --- | --- |
| 86-Base Wide Display References | Wide Room Number and Service Display | `/media/room-display-projects/hotel-room-door-display-project-reference-01.png` | Room identification, doorbell, and service-status display | Project-style room door display reference |
| 86-Base Wide Display References | Angled Wide Door Display | `/media/room-display-projects/hotel-room-door-display-angle-reference-02.png` | Wide room signage and service interface | Project-style room door display reference |
| Brushed Silver Doorplate References | Brushed Silver Recessed Number Display | `/media/room-display-projects/brushed-silver-room-signage-display-reference-01.png` | Recessed room-number and service-status display | Project-style brushed metal room signage reference |
| Brushed Silver Doorplate References | Angled Brushed Silver Doorplate | `/media/room-display-projects/brushed-silver-room-signage-angle-reference-02.png` | Brushed silver room identification display | Project-style brushed metal room signage reference |
| Dark Glass Room Status Display References | Dark Glass Room Status Display | `/media/room-display-projects/hotel-room-status-doorplate-display-reference-01.png` | Guest-service, room-status, and doorbell interface | Project-style hotel room status display reference |
| Dark Glass Room Status Display References | Angled Dark Glass Door Display | `/media/room-display-projects/hotel-room-status-doorplate-angle-reference-02.png` | Dark glass guest-service display interface | Project-style hotel room status display reference |
| Brushed Aluminum Doorplate References | Wide Brushed Aluminum Doorplate | `/media/room-display-projects/brushed-aluminum-room-signage-display-reference-01.png` | Room identification, doorbell, and service-control display | Project-style brushed aluminum door display reference |
| Brushed Aluminum Doorplate References | Angled Brushed Aluminum Room Signage | `/media/room-display-projects/brushed-aluminum-room-signage-angle-reference-02.png` | Wide brushed-metal room signage display | Project-style brushed aluminum door display reference |

No title, image path, ALT text, display type, or visible-context string contains a visible hotel brand, customer name, or specific room number.

## 5. Static Image Preparation

Recommended future directory: `public/media/room-display-projects/`
Public prefix: `/media/room-display-projects/`

The selected source images total 27,074,351 bytes. Implementation should create optimized copies, retain enough clarity for display inspection, and target a longest dimension near 1800 pixels where appropriate.

| Source Image | Recommended Static Path | ALT Text | Use | Risk |
| --- | --- | --- | --- | --- |
| `86底座智能门显/2.png` | `/media/room-display-projects/hotel-room-door-display-project-reference-01.png` | Wide black hotel room door display with room number and service status icons | 86-base front reference | Brand and specific room number remain visible inside the image only. |
| `86底座智能门显/4.png` | `/media/room-display-projects/hotel-room-door-display-angle-reference-02.png` | Angled black room signage display with doorbell and service icons | 86-base angle | Brand and specific room number remain visible inside the image only. |
| `拉丝银智能门牌门显/2.png` | `/media/room-display-projects/brushed-silver-room-signage-display-reference-01.png` | Brushed silver hotel room signage reference with number window and status icons | Brushed silver perspective | Brand and specific room number remain visible inside the image only. |
| `拉丝银智能门牌门显/4.png` | `/media/room-display-projects/brushed-silver-room-signage-angle-reference-02.png` | Angled brushed silver room display housing for hospitality projects | Brushed silver alternate angle | Brand and specific room number remain visible inside the image only. |
| `酒店客房智能门牌门显/1.png` | `/media/room-display-projects/hotel-room-status-doorplate-display-reference-01.png` | Dark glass hotel room status display with service and doorbell icons | Dark glass front | Prominent brand and room number remain inside the image; do not use as hero. |
| `酒店客房智能门牌门显/3.png` | `/media/room-display-projects/hotel-room-status-doorplate-angle-reference-02.png` | Angled hotel room display reference with status icon layout | Dark glass angle | Prominent brand and room number remain inside the image; do not use as hero. |
| `金属拉丝智能门牌门显/1 - 副本.png` | `/media/room-display-projects/brushed-aluminum-room-signage-display-reference-01.png` | Brushed aluminum hotel room door display with number window and service controls | Brushed aluminum front | Brand and specific room number remain visible inside the image only. |
| `金属拉丝智能门牌门显/3 - 副本.png` | `/media/room-display-projects/brushed-aluminum-room-signage-angle-reference-02.png` | Angled brushed aluminum room signage project reference | Brushed aluminum angle | Brand and specific room number remain visible inside the image only. |

Implementation must not move, delete, or rename source images. The ten unselected images remain internal and must not be copied into public media.

## 6. Disclaimer

> Images are project-style references for hotel room signage and door display configurations. Visible room numbers, hotel names, interface labels, and other project-style details are shown only to illustrate application context and configuration form. They do not indicate public endorsement, a fixed SKU, stock availability, or a standardized product model. Actual appearance, text, icons, functions, materials, dimensions, networking method, MOQ, lead time, compatibility, and production scope must be confirmed for each project and quotation.

The full disclaimer is mandatory. The card label alone does not replace it.

## 7. SEO and Schema Impact

| SEO / Schema Item | Needed | Reason | Risk |
| --- | --- | --- | --- |
| Existing Solution metadata and canonical | Yes, unchanged | The module enhances an existing Solution URL. | None if untouched. |
| Existing Service and BreadcrumbList schema | Yes, unchanged | The page remains a Solution page. | Do not add brand identities or project claims. |
| Product schema | No | References are not products or SKUs. | Would misclassify display material. |
| Offer schema | No | No price or inventory state exists. | Would imply unsupported availability. |
| Review / Rating schema | No | Visible hotel names are not reviews or endorsements. | Could imply a customer relationship. |
| CaseStudy schema | No | No authorized Case Study narrative or route exists. | Would overstate project provenance. |
| Sitemap URL | No | No page is being created. | Sitemap changes are unrelated scope. |

## 8. Implementation File Boundary

| File | Change Type | Reason | Required |
| --- | --- | --- | --- |
| `src/app/[locale]/solutions/[slug]/page.tsx` | Exact locale-and-slug-guarded render | Add only to the English Hotel Guest Room Solution. | Yes |
| `src/components/content/room-display-project-references-section.tsx` | New Server Component | Isolate grouped cards, CTAs, labels, and disclaimer. | Yes |
| `src/config/static-room-display-projects.ts` | New typed static data | Keep project display content outside WordPress, products, Case Studies, and OEM/ODM data. | Yes |
| `public/media/room-display-projects/*.png` | Eight optimized static image copies | Use stable English public paths. | Yes |
| `tests/room-display-projects.test.ts` | Focused data validation | Validate eight paths, four groups, neutral text, and disclaimer. | Optional |
| Separate stylesheet | None expected | Existing Tailwind utilities cover the module. | No |

Explicit exclusions:

- WordPress and product CPT
- Product taxonomy
- `src/app/sitemap.ts`
- Schema builders
- Products page
- Product detail template
- Existing product data
- Case Studies pages and schema
- Existing OEM/ODM component and data
- WordPress media sync script and manifest

## 9. Risk Controls

| Risk | Exists | Handling | Blocking |
| --- | --- | --- | --- |
| Hotel brands visible inside images | Yes | Exclude identities from filenames, ALT, titles, captions, metadata, and schema; show disclaimer. | No |
| Room numbers visible inside images | Yes | Treat as visual context and do not repeat specific numbers in public text. | No |
| Customer endorsement misunderstanding | Yes | Project display reference label and explicit no-endorsement wording. | No |
| Standard SKU or stock interpretation | Yes | No product links or SKU controls; retain project-confirmation wording. | No |
| Unconfirmed parameters | Yes | Use front/angle images only and publish no unconfirmed specifications. | No |
| Low-quality or repetitive source images | Yes | Copy only the eight selected images. | No |
| Product-page confusion | Yes | Render only on Hotel Guest Room Control Solution. | No |
| Mobile performance | Yes | Optimize copies, use 16:9 stable frames, responsive sizes, and lazy loading. | No |
| Lazy loading required | Yes | Use `next/image` defaults and verify all images during scroll testing. | Yes |
| Disclaimer required | Yes | Keep card labels and full disclaimer visible. | Yes |

## 10. Implementation-stage Verification

1. Confirm exactly eight optimized public images and unique paths.
2. Confirm all four groups contain two cards.
3. Confirm no public filename, ALT, title, caption, or metadata contains a visible brand, customer name, or specific room number.
4. Confirm the module appears only on `/en/solutions/hotel-guest-room-control-solution/`.
5. Confirm the module is after Recommended Products and before Project planning details.
6. Confirm no route or sitemap URL is added.
7. Confirm no Product, Offer, Review, Rating, or CaseStudy schema is added.
8. Confirm all public images use `/media/room-display-projects/` and no WordPress upload path.
9. Confirm desktop and mobile layouts have no overflow, overlap, or broken images.
10. Confirm all eight images lazy load and CTAs and the disclaimer remain visible.
11. Run lint, data tests, static export build, and focused risk scans only during the implementation stage.

## Final Result

**A. Frontend implementation preparation is complete and can proceed to local implementation of the Doorplate / Room Display project display module.**

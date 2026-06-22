# Doorplate / Room Display Project Display Materials Plan

Generated: 2026-06-22

## Scope

This stage is planning only. Eighteen source images were reviewed across four groups. No WordPress data, product, taxonomy, route, sitemap logic, frontend source, public media, build output, deployment, or Git state was changed.

## 1. Source Image Groups

| Group | Source Image Count | Visible Text / Brand | Room Number | Product Type | Notes |
| --- | ---: | --- | --- | --- | --- |
| 86-Base Doorplate / Room Display Group | 4 | Visible hotel branding | Visible room number | Wide black room-number, doorbell, and service-status display | Three front/angled views and one rear construction view. Isolated product photography rather than an installed hotel scene. |
| Brushed Silver Doorplate / Room Display Group | 5 | Visible hotel branding | Visible room number | Brushed silver recessed room-number and service-status doorplate display | Four front/angled views and one rear view. One front image has a visible top-edge artifact. |
| Hotel Guest Room Display Group | 4 | Visible hotel branding | Visible room number | Dark glass room-status display with guest-service and doorbell interface examples | Three front/angled views and one rear view. Branding is visually prominent. |
| Brushed Aluminum Doorplate / Room Display Group | 5 | Visible hotel branding | Visible room number | Wide brushed aluminum room-number, doorbell, and service-status display | Four front/angled views and one rear construction view. |

Inventory result:

- Total source images: 18
- Unique SHA-256 hashes: 18
- Exact duplicate files: 0
- Recommended first-release images: 8
- Internal or excluded images: 10

## 2. Public Display Suitability

| Group | Public Suitable | Reason | Risk | Handling |
| --- | --- | --- | --- | --- |
| 86-Base Doorplate / Room Display Group | Yes | Clear long-format front and angled views | Brand and room number may imply a customer reference or fixed SKU | Use only in a Project Display Reference module, exclude the rear image, and keep brand text out of copy and ALT. |
| Brushed Silver Doorplate / Room Display Group | Yes | Adds a distinct recessed number-window format and finish | Brand, room number, one image artifact, and rear construction details | Select two cleaner angled views and retain the other three internally. |
| Hotel Guest Room Display Group | Yes | Clearly communicates room-status and guest-service interface formats | Prominent brand may be interpreted as endorsement | Never use as hero media; use neutral captions and the mandatory no-endorsement disclaimer. |
| Brushed Aluminum Doorplate / Room Display Group | Yes | Adds a wide brushed-metal layout with separate controls | Brand, room number, and similar angles | Use one front and one angle; omit duplicates and rear view. |

The selected images are project-style product photographs, not installed hotel-environment photographs. This reduces location and privacy exposure, but the visible brands and room numbers still require careful framing.

## 3. Display Location Assessment

| Display Location | Recommended | Pros | Risks | Notes |
| --- | --- | --- | --- | --- |
| Hotel Guest Room Control Solution page | Primary | Direct room-control context; existing indexed URL; avoids product-catalog framing | Brand and room numbers require disclaimer | Recommended first-release location. |
| OEM/ODM Custom Panel Solution page | Later, secondary | Supports customization discussion | Duplicates the full gallery | Consider a future text link or two-image teaser only. |
| Case Studies page | No | Could add project visuals | No authorized project narrative or confirmed customer relationship | Do not present as a Case Study without authorization. |
| Homepage | No for first release | High visibility | Brand imagery may imply endorsement and adds weight | Do not use these images as homepage or hero media. |
| Products page | No | Capability visibility | High standard-SKU interpretation risk | Keep outside product listing and detail templates. |
| Standalone Project Display Gallery page | No for first release | Could organize future media | New URL, sitemap scope, thin content, authorization questions | Not justified for eight images. |
| Internal sales materials only | Fallback | Lowest public interpretation risk | No website benefit | Use for rear, artifact-heavy, and duplicate views. |

## 4. Recommended Module Structure

```json
{
  "module_id": "room-signage-door-display-project-references",
  "section_title": "Room Signage & Door Display Project References",
  "section_subtitle": "Reference formats for hotel room identification, doorbell, service status, and guest-facing display planning.",
  "intro_text": "Review representative hospitality room-signage formats across dark glass, brushed silver, and brushed aluminum finishes. These images illustrate project-style layouts and visible interface treatments for discussion; they are not standard stocked SKUs or customer endorsements.",
  "display_groups": [
    "86-Base Wide Display References",
    "Brushed Silver Doorplate References",
    "Dark Glass Room Status Display References",
    "Brushed Aluminum Doorplate References"
  ],
  "recommended_images": 8,
  "cta_primary": "Discuss Your Hotel Room Display Requirements",
  "cta_secondary": "Request Room Signage Customization",
  "cta_whatsapp": "Get a Quote on WhatsApp",
  "disclaimer_text": "Images are presented as hotel room signage and door display project references. Any visible brand names, room numbers, or interface content appear only to illustrate application context and configuration format and do not indicate endorsement, authorization, or a customer relationship. Actual appearance, text, icons, functions, material, dimensions, connectivity, MOQ, lead time, compatibility, and production scope are subject to project review and written confirmation. Displayed configurations are not representations of standard in-stock SKUs."
}
```

CTA targets:

- `Discuss Your Hotel Room Display Requirements` -> `/en/contact/#get-a-quote`
- `Request Room Signage Customization` -> `sales@dualcorelink.com`
- `Get a Quote on WhatsApp` -> `https://wa.me/85270390436`

Every card should display the label **Project display reference**. No card should link to a product detail page.

## 5. Recommended First-release Images

| Image | Group | Recommended Use | Visible Brand / Room No. | Public Suitable | Risk | Handling |
| --- | --- | --- | --- | --- | --- | --- |
| `86底座智能门显/2.png` | 86-Base | Front-view reference | Visible hotel branding and room number | Yes | Customer or SKU interpretation | Use neutral copy and mandatory disclaimer. |
| `86底座智能门显/4.png` | 86-Base | Angled reference | Visible hotel branding and room number | Yes | Brand, room number, black background | Use consistent neutral image frame. |
| `拉丝银智能门牌门显/2.png` | Brushed Silver | Material perspective | Visible hotel branding and room number | Yes | Brand and room number | Present as finish and layout reference. |
| `拉丝银智能门牌门显/4.png` | Brushed Silver | Alternate angle | Visible hotel branding and room number | Yes | Similar angle | Retain only if responsive crop remains distinct. |
| `酒店客房智能门牌门显/1.png` | Hotel Guest Room Display | Front room-status reference | Visible hotel branding and room number | Yes | Prominent branding | Do not use as hero; keep caption neutral. |
| `酒店客房智能门牌门显/3.png` | Hotel Guest Room Display | Angled dark-glass reference | Visible hotel branding and room number | Yes | Prominent branding and room number | Use only inside grouped project-reference gallery. |
| `金属拉丝智能门牌门显/1 - 副本.png` | Brushed Aluminum | Front brushed-metal reference | Visible hotel branding and room number | Yes | Brand and room number | Do not repeat visible identity in public copy. |
| `金属拉丝智能门牌门显/3 - 副本.png` | Brushed Aluminum | Angled brushed-metal reference | Visible hotel branding and room number | Yes | Brand and room number | Use inside module only. |

### Internal or Excluded Images

| Source Image | Reason |
| --- | --- |
| `86底座智能门显/3.png` | Near-duplicate angle. |
| `86底座智能门显/5.png` | Rear construction and terminal view. |
| `拉丝银智能门牌门显/1.png` | Top-edge image artifact. |
| `拉丝银智能门牌门显/3.png` | Less clean cutout treatment. |
| `拉丝银智能门牌门显/5.png` | Rear construction and wiring view. |
| `酒店客房智能门牌门显/4.png` | More prominent cutout background artifact. |
| `酒店客房智能门牌门显/5.png` | Rear terminal and electrical-label view. |
| `金属拉丝智能门牌门显/2 - 副本.png` | Near-duplicate front perspective. |
| `金属拉丝智能门牌门显/4 - 副本.png` | Near-duplicate angled view. |
| `金属拉丝智能门牌门显/5 - 副本.png` | Rear construction and wiring view. |

## 6. Static Naming and ALT Plan

Recommended future directory: `public/media/project-displays/room-signage/`
Public prefix: `/media/project-displays/room-signage/`

| Source Image | Recommended Static Name | ALT Text | Use | Risk |
| --- | --- | --- | --- | --- |
| `86底座智能门显/2.png` | `hotel-room-door-display-project-reference-01.png` | Wide black hotel room door display with room number and service status icons | 86-base front reference | Visible brand and room number remain inside image. |
| `86底座智能门显/4.png` | `hotel-room-door-display-angle-reference-02.png` | Angled black room signage display with doorbell and service icons | 86-base angle | Visible brand and room number remain inside image. |
| `拉丝银智能门牌门显/2.png` | `brushed-silver-room-signage-display-reference-01.png` | Brushed silver hotel room signage reference with number window and status icons | Brushed silver perspective | Visible brand and room number remain inside image. |
| `拉丝银智能门牌门显/4.png` | `brushed-silver-room-signage-angle-reference-02.png` | Angled brushed silver room display housing for hospitality projects | Brushed silver alternate angle | Visible brand and room number remain inside image. |
| `酒店客房智能门牌门显/1.png` | `hotel-room-status-doorplate-display-reference-01.png` | Dark glass hotel room status display with service and doorbell icons | Dark glass front | Prominent brand and room number remain inside image. |
| `酒店客房智能门牌门显/3.png` | `hotel-room-status-doorplate-angle-reference-02.png` | Angled hotel room display reference with status icon layout | Dark glass angle | Prominent brand and room number remain inside image. |
| `金属拉丝智能门牌门显/1 - 副本.png` | `brushed-aluminum-room-signage-display-reference-01.png` | Brushed aluminum hotel room door display with number window and service controls | Brushed aluminum front | Visible brand and room number remain inside image. |
| `金属拉丝智能门牌门显/3 - 副本.png` | `brushed-aluminum-room-signage-angle-reference-02.png` | Angled brushed aluminum room signage project reference | Brushed aluminum angle | Visible brand and room number remain inside image. |

Public filenames, ALT text, headings, metadata, and captions must not contain a visible hotel brand, customer name, or specific room number.

## 7. Disclaimer

> Images are presented as hotel room signage and door display project references. Any visible brand names, room numbers, or interface content appear only to illustrate application context and configuration format and do not indicate endorsement, authorization, or a customer relationship. Actual appearance, text, icons, functions, material, dimensions, connectivity, MOQ, lead time, compatibility, and production scope are subject to project review and written confirmation. Displayed configurations are not representations of standard in-stock SKUs.

This disclaimer is mandatory. A shorter card-level label does not replace it.

## 8. SEO and Schema Impact

| SEO / Schema Item | Needed | Reason | Risk |
| --- | --- | --- | --- |
| Existing Solution metadata and canonical | Yes, unchanged | The module enhances an existing Solution URL. | None if untouched. |
| Existing Service and BreadcrumbList schema | Yes, unchanged | The page remains a Solution page. | Do not add branded project claims. |
| Product schema | No | The images are not products or SKUs. | Would misclassify project references. |
| Offer schema | No | No price or inventory state is provided. | Unsupported commercial data. |
| Review / Rating schema | No | Visible brands are not endorsements or testimonials. | Could imply unsupported customer relationships. |
| CaseStudy schema | No | There is no authorized project narrative or new Case Study page. | Would overstate provenance. |
| Sitemap URL | No | The module belongs on an existing page. | A new gallery page adds unnecessary scope. |

## 9. Risk Assessment

| Risk | Exists | Handling | Blocking |
| --- | --- | --- | --- |
| Hotel brands visible | Yes | Keep in imagery only; exclude from filenames, ALT, headings, metadata, and claims. | No |
| Room numbers visible | Yes | Treat as visual context; do not repeat specific numbers in copy. | No |
| Customer endorsement misunderstanding | Yes | No customer claims; use explicit no-endorsement disclaimer. | No |
| Standard SKU or ready-stock misunderstanding | Yes | Project-reference label, no product links, project-confirmation wording. | No |
| Unconfirmed parameters | Yes in source set | Exclude rear/electrical views and publish no technical specifications. | No |
| Low-quality or repetitive images | Yes | Use eight selected views; retain ten images internally. | No |
| Product-page confusion | Yes | Place only on Hotel Guest Room Control Solution. | No |
| Disclaimer required | Yes | Mandatory card label and full disclaimer. | Yes |
| Suitable for first release | Yes | Eight selected images provide sufficient finish and format coverage. | No |
| Final user confirmation | Yes | Confirm the eight branded images before copying or implementation. | Implementation gate |

## 10. Recommended Implementation Direction

- Target existing page: `/en/solutions/hotel-guest-room-control-solution/`
- Module type: Solution-page content enhancement
- Public images: 8
- New products: 0
- New product pages: 0
- New taxonomy terms: 0
- New sitemap URLs: 0
- WordPress changes: 0
- Required gate: user confirms the selected eight branded reference images and mandatory disclaimer before implementation

## Final Result

**A. Doorplate and room-display materials are suitable for a project display module on the Hotel Guest Room Control Solution page.**

# SEO Operations - Priority Action Recovery

Date: 2026-08-21 (Asia/Shanghai)

## Scope

This review is limited to the 11 Priority Action URLs identified by the current Google Search Console coverage audit: one historical locale-less 404 and ten long-term English URLs. It does not repeat the 490-URL production audit and does not request indexing.

The ten English URLs were checked for HTTP status, sitemap membership, self-canonical, robots directives, indexability, JSON-LD validity, current English-page internal links, and verified Googlebot evidence. The internal-link graph used the 76 current English sitemap pages only. Server-log analysis used the retained production frontend log window from 2026-08-07 00:23:10 through 2026-08-21 20:46:34 +08:00. Candidate crawler sources were counted as verified only after reverse and forward DNS agreement with an official Google domain.

## Legacy 404

- Old URL: `https://dualcorelink.com/resources/hotel-doorplate-room-display-buying-guide/`
- Current status before recovery: HTTP 404; not in the sitemap.
- Confirmed destination: `https://dualcorelink.com/en/resources/hotel-doorplate-room-display-buying-guide/`
- Destination status: HTTP 200 with the current Hotel Doorplate and Room Display Buying Guide content.
- Rejected candidate: `/en/resources/doorplate-room-display-buying/` is HTTP 404 and is not the repository resource slug.
- Action: add one exact, target-existence-gated permanent 301. No broad `/resources/*` rule is introduced.
- Deployment guard: require the exact destination artifact before activation, then verify one-hop HTTP 301, exact `Location`, and final HTTP 200 after Nginx reload.
- Canonical, sitemap, robots, and current localized routes are unchanged.

## 10 Long-Term English URLs

All ten URLs are HTTP 200, present in the 490-URL sitemap, self-canonical, `index, follow`, allowed by `robots.txt`, and contain parseable page-type-appropriate JSON-LD. Technical anomalies: 0.

| URL | Type | HTTP | Sitemap | Canonical / indexability / robots | Schema | Internal links and major sources | Last verified Googlebot crawl | Action |
| --- | --- | ---: | --- | --- | --- | --- | --- | --- |
| `/en/case-studies/overseas-oem-odm-smart-panel-customization-project/` | Case Study | 200 | Included | Self / indexable / allowed | `CreativeWork`, `BreadcrumbList` | 2: homepage, Case Studies listing | Not observed in retained window or the earlier Phase 4E window | Index Request Candidate |
| `/en/products/ai-large-smart-display/` | Product | 200 | Included | Self / indexable / allowed | `Product`, `BreadcrumbList` | 5: Products, Solutions, AI Display solution, Smart Hotel solution, case study | 2026-08-19 00:16:46 +08:00, HTTP 200 | Normal Waiting |
| `/en/products/ai-music-control-panel/` | Product | 200 | Included | Self / indexable / allowed | `Product`, `BreadcrumbList` | 3: Products, Solutions, AI Display solution | 2026-08-19 21:25:23 +08:00, HTTP 200 | Normal Waiting |
| `/en/products/brushed-aluminum-sos-alarm-panel/` | Product | 200 | Included | Self / indexable / allowed | `Product`, `BreadcrumbList` | 1: Products listing | 2026-08-19 20:15:36 +08:00, HTTP 200 | Normal Waiting; monitor the single listing source, but do not change a page Googlebot just fetched successfully |
| `/en/products/hotel-delivery-robot-charging-dock/` | Product | 200 | Included | Self / indexable / allowed | `Product`, `BreadcrumbList` | 2: Products and Solutions listings | 2026-08-19 18:40:23 +08:00, HTTP 200 | Normal Waiting |
| `/en/products/hotel-smart-room-rcu-host-1/` | Product | 200 | Included | Self / indexable / allowed | `Product`, `BreadcrumbList` | 75: listings, product pages, solutions, resources, cases, regions, and static pages | Not observed in the retained August window; verified on 2026-07-20 16:47:39 +08:00 in Phase 4E | Normal Waiting |
| `/en/products/smart-four-key-curtain-control-panel/` | Product | 200 | Included | Self / indexable / allowed | `Product`, `BreadcrumbList` | 11: homepage, Products, Solutions, three solutions, cases, and resources | 2026-08-20 00:27:23 +08:00, HTTP 200 | Normal Waiting |
| `/en/products/smart-three-key-music-control-panel/` | Product | 200 | Included | Self / indexable / allowed | `Product`, `BreadcrumbList` | 2: Products listing and AI Display solution entry | Not observed in retained window or the earlier Phase 4E target evidence | Index Request Candidate |
| `/en/products/smart-usb-five-hole-socket/` | Product | 200 | Included | Self / indexable / allowed | `Product`, `BreadcrumbList` | 8: homepage, Products, Solutions, solution details, and case studies | 2026-08-19 19:42:53 +08:00, HTTP 200 | Normal Waiting |
| `/en/solutions/smart-hotel-automation-solution/` | Solution | 200 | Included | Self / indexable / allowed | `Service`, `BreadcrumbList` | 16: Solutions listing, product pages, and resources | 2026-08-21 18:42:53 +08:00, HTTP 200 | Normal Waiting |

The retained server window contained three Candidate sources relevant to these targets; all three passed bidirectional DNS verification. Seven target URLs had recent verified HTTP 200 fetches. The older Phase 4E evidence supplies the prior verified fetch for `hotel-smart-room-rcu-host-1`. No target Googlebot error was observed.

## Fixed

1. The historical locale-less doorplate buying guide URL receives one exact permanent redirect to its verified English resource.

## Index Request Candidate

1. `/en/case-studies/overseas-oem-odm-smart-panel-customization-project/`
2. `/en/products/smart-three-key-music-control-panel/`

Both candidates are technically healthy, have two independent and relevant static entry pages, and have no observed verified Googlebot request in the available current or earlier target evidence. They are candidates only; no Request Indexing action was submitted.

## Normal Waiting

The other eight English URLs are classified as Normal Waiting. Seven were fetched successfully by verified Googlebot between 2026-08-19 and 2026-08-21. The remaining RCU Host 1 URL has prior verified crawl evidence and extensive internal coverage. Rewriting metadata, schema, canonical, sitemap, robots, or page content would not address the observed delay.

## Internal Link Decision

- Weak internal-link URLs: 1 (`brushed-aluminum-sos-alarm-panel`, one Products listing source).
- Internal-link production changes: 0.
- Reason: the weak-link URL was fetched successfully by verified Googlebot on 2026-08-19. Adding a link solely to stimulate recrawl would be unnecessary. The two never-observed candidates already have two independent, semantically relevant entry pages.

## Validation Plan

- Run the targeted static-export redirect test.
- Run the targeted Nginx activation test.
- Run lint and `git diff --check`.
- Let GitHub Actions perform the only full build and deployment.
- After deployment, verify the historical URL returns exactly one HTTP 301, the `Location` is exact, the destination returns HTTP 200, and the destination remains self-canonical.

## Final Classification

- Priority Action URLs reviewed: 11/11
- Technical anomalies among the ten English URLs: 0
- Weak internal-link URLs: 1
- Never-observed verified Googlebot URLs: 2
- Production URL behavior changed: 1 historical URL
- Index Request Candidates: 2
- Normal Waiting: 8
- New systemic SEO regression: none

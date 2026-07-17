# SEO Growth Phase 2F - Resource Cluster Audit and Content Roadmap

Date: 2026-07-17 (Asia/Shanghai)

## Scope

This phase audited all 14 published English Resource guides against their configured search intent, title and description, heading structure, Resource-to-Resource links, Product and Solution relationships, Region and Downloads links, and inquiry paths. It also reviewed the available Google Search Console and GA4 evidence before defining the next content priorities.

The phase did not change any Resource, Product, Solution, or Region slug. It did not add or remove a public page, change WordPress data, alter sitemap or schema policy, or modify AWS, DNS, Cloudflare, Nginx, or GA4 configuration.

## Data Window and Limits

Google Search Console was reviewed with the **3 months** selector. The property currently exposes data from 2026-06-18 through 2026-07-15:

- Clicks: 0
- Impressions: 601
- CTR: 0%
- Average position: 63
- Query rows: 77
- Page rows with performance data: 30

GA4 consent-aware tracking became available only at the end of Phase 3C. Realtime event delivery is confirmed, but there is not yet enough historical organic Resource engagement or inquiry conversion data to rank the 14 guides by GA4 performance. For this phase, GSC provides the directional demand signal and GA4 provides measurement readiness, not a mature performance sample.

## GSC Query Evidence

The strongest current query themes are:

| Query | Impressions | Recommended cluster |
| --- | ---: | --- |
| guestroom remote control | 70 | Guest room control interfaces |
| digital control hotel room | 43 | Guest room control interfaces |
| room control tablet hotel | 40 | Guest room control interfaces |
| replace remote control in hotel | 33 | Renovation and control interfaces |
| hotel room automation | 30 | Guest room automation |
| hotel room control unit | 20 | RCU definition and buying |
| digital remote control hotel room | 16 | Guest room control interfaces |
| hotel room control panel | 15 | Smart switch panel and RCU |
| tablet-controlled room service | 15 | Guest room control interfaces |
| bedside control panel | 13 | Smart panel selection |
| smart room control | 12 | Smart room control system |
| oem control panel support | 9 | OEM/ODM panel customization |
| industrial panel odm | 8 | OEM/ODM development |
| smart room control system | 7 | Smart room control system |
| hotel room control system supplier | 7 | Supplier evaluation |
| hotel room control system | 7 | Smart room control system |

The query set confirms demand around room control interfaces, RCU terminology, hotel automation, smart panels, and OEM/ODM supplier intent. It does not yet provide evidence for deleting or merging an existing Resource.

## GSC Page Evidence

The early pilot is the only Resource currently present in the 30-page GSC performance table:

- URL: `/en/resources/what-is-hotel-rcu-room-control-system/`
- Impressions: 31
- Clicks: 0
- CTR: 0%
- Average position: 21.9
- Visible queries: `hotel room control panel`, `hotel rcu`, `rcu hotel`, `room control unit hotel`, `room control unit`, `rcu control`, and `hotel room control unit`

This is a keep-and-strengthen page. Its average position is materially better than the site average, while 31 impressions remain too small a sample for a title rewrite. The other 13 Resources were published recently and do not yet appear in the GSC page table. Absence from the performance table is not treated as proof of an indexing issue.

## Geographic Evidence

Top visible countries by impressions are:

- United States: 320
- United Kingdom: 78
- Ireland: 26
- United Arab Emirates: 24
- India: 18
- Thailand: 16
- Indonesia: 13
- Philippines: 11
- Netherlands: 8
- China: 6

The current evidence favors globally applicable English B2B guides first. Existing Middle East and Southeast Asia links remain useful, but the sample does not justify another Region-specific Resource ahead of the core interface and supplier topics.

## Resource Inventory

Word counts cover the configured summary and article body. Inbound and outbound counts refer to the structured Continue Reading graph after the Phase 2F correction.

| Resource slug | Primary intent | Words | In / out | Decision |
| --- | --- | ---: | ---: | --- |
| `what-is-hotel-rcu-room-control-system` | RCU definition and early planning | 1,540 | 1 / 3 | Keep; strengthen cluster and conversion path |
| `hotel-rcu-wiring-system-architecture-guide` | Technical architecture and wiring | 2,655 | 5 / 3 | Keep as technical authority page |
| `hotel-rcu-buying-guide` | Commercial product selection | 664 | 4 / 3 | Update depth after data matures |
| `smart-hotel-room-control-system-guide` | System components and project specification | 603 | 2 / 3 | Priority update; sharpen system-spec intent |
| `hotel-smart-switch-panel-guide` | Panel buying and room-function selection | 556 | 3 / 3 | Priority update from control-panel demand |
| `oem-odm-smart-panel-customization-guide` | Customization scope and quote preparation | 542 | 3 / 3 | Priority update from OEM/ODM demand |
| `hotel-guest-room-automation-guide` | Room workflow and automation use cases | 553 | 2 / 3 | Priority update from automation demand |
| `hotel-room-control-system-cost-factors` | Budget and quotation comparison | 2,577 | 2 / 3 | Keep; commercial decision support |
| `hotel-occupancy-sensor-selection-guide` | Sensor technology and placement | 2,522 | 2 / 3 | Keep; distinct technical intent |
| `hotel-doorplate-room-display-buying-guide` | Doorplate, DND/MUR, and display buying | 2,626 | 3 / 3 | Keep; distinct product category |
| `oem-odm-hotel-control-panel-development-process` | OEM/ODM development lifecycle | 3,105 | 3 / 3 | Keep; process intent |
| `hotel-renovation-smart-room-upgrade-guide` | Existing hotel retrofit planning | 3,054 | 5 / 3 | Keep; strong supporting hub |
| `smart-panel-material-finish-selection-guide` | Material, finish, and sample approval | 3,111 | 4 / 3 | Keep; design specification intent |
| `knx-vs-rcu-hotel-room-control` | Architecture comparison | 3,106 | 3 / 3 | Keep; comparison intent |

All 14 SEO titles are unique and measure 33-58 characters. All 14 meta descriptions are unique and measure 144-155 characters. H1 values are unique and aligned with their configured primary keyword. No immediate title, description, or H1 rewrite is recommended before more page-level GSC evidence exists.

## Search Intent and Cannibalization

### RCU and System Cluster

The cluster is valid but needs strict intent boundaries:

- `what-is-hotel-rcu-room-control-system`: definition, role, and early project orientation.
- `hotel-rcu-buying-guide`: shortlist criteria, supplier questions, and quote inputs.
- `hotel-rcu-wiring-system-architecture-guide`: architecture, wiring responsibilities, and engineering documents.
- `hotel-room-control-system-cost-factors`: budget drivers and quotation comparison.
- `knx-vs-rcu-hotel-room-control`: architecture comparison.
- `smart-hotel-room-control-system-guide`: complete system components and project specification.

Risk is moderate between the early RCU pilot and the broad Smart Hotel Room Control System guide. They should not be merged now. Future updates must preserve definition intent on the pilot and system-specification intent on the broad guide.

### Automation Cluster

The largest overlap risk is between `smart-hotel-room-control-system-guide` and `hotel-guest-room-automation-guide`. The first should own device architecture and specification; the second should own room workflows, operational use cases, and guest interaction. The renovation and occupancy-sensor pages remain distinct.

### Smart Panel and OEM/ODM Cluster

The four pages are complementary:

- Smart switch panel guide: buying and function selection.
- Smart panel customization guide: customization scope and quotation inputs.
- Hotel control panel development process: prototype, tooling, pilot production, and delivery lifecycle.
- Material and finish guide: appearance, durability, color, icons, and sample approval.

No merge is recommended. The older Smart Panel and Customization guides need deeper procurement detail so that they do not compete through similarly broad copy.

### Door and Room Status Cluster

The Doorplate and Room Display guide has distinct DND/MUR, doorbell, room-number, mounting, and integration intent. It should remain standalone.

## Internal Link Audit

Before Phase 2F, the early RCU pilot was listed on `/en/resources/` but had no Continue Reading map, no rich Product/Solution conversion sections, and zero inbound links from the structured Resource graph. It was not a true site orphan, but it was a topic-cluster and conversion outlier.

After the correction:

- All 14 Resources have a valid conversion map.
- Every Resource has exactly three Continue Reading targets.
- Every Resource has at least one structured Resource inbound link.
- The early RCU pilot links to the RCU Buying, RCU Wiring, and Smart Hotel Room Control System guides.
- The Smart Hotel Room Control System guide links back to the early RCU pilot.
- Existing required Phase 2E bidirectional relationships remain intact.

Each Resource also retains:

- 4 related Product links.
- 2-3 related Solution links for the newer guides; the pilot retains 2.
- At least 1 Region link.
- `/en/downloads/`.
- Form and WhatsApp inquiry paths.

Detail pages do not currently expose a dedicated FAQ relationship block. This is a real but non-urgent gap. It should be evaluated as a reusable data-model enhancement rather than added ad hoc to one article.

## Conversion Audit

The 13 Phase 2C-2E Resources already included hero inquiry actions, a mid-article CTA, Recommended Products, Relevant Solutions, Continue Reading, and a final Project Inquiry CTA. Phase 2F extends the same established conversion pattern to the early RCU pilot.

No Product, Solution, Region, Downloads, Contact, or WhatsApp target was invented. Product descriptions added for the pilot are neutral selection summaries and do not add price, stock, certification, protocol, availability, review, or rating claims.

## Low-Risk Correction Implemented

Files changed:

- `src/config/resources.ts`
- `tests/seo-schema.test.ts`
- `docs/reports/seo-growth-phase-2f-resource-cluster-audit-roadmap-20260717.md`

Implementation:

1. Added neutral descriptions to the pilot's four existing Product relationships so they work with the established conversion cards.
2. Added a mid-article CTA after `product-selection`.
3. Added three Continue Reading targets: RCU Buying, RCU Wiring, and Smart Hotel Room Control System.
4. Added one structured inbound relationship from the Smart Hotel Room Control System guide to the pilot while preserving the required KNX relationship.
5. Updated the conversion-map test to require conversion coverage for every published Resource rather than a historical hard-coded count of 13.

No title, description, H1, slug, sitemap entry, schema type, or public page count changed.

## Update Priorities

### Priority 1: Strengthen Existing Demand-Matched Guides

1. `smart-hotel-room-control-system-guide`
   Expand system architecture, specification inputs, room interfaces, commissioning boundaries, and supplier evaluation. Keep it distinct from operational automation.
2. `hotel-guest-room-automation-guide`
   Expand workflow scenarios for arrival, occupancy, sleep, housekeeping, DND/MUR, HVAC, curtains, and checkout. This directly supports the 30-impression `hotel room automation` query family.
3. `hotel-smart-switch-panel-guide`
   Expand bedside, scene, curtain, HVAC, socket, touch-screen, and room-status interface selection. This supports `hotel room control panel` and `bedside control panel` demand.
4. `oem-odm-smart-panel-customization-guide`
   Expand requirement files, sample approval, tooling decisions, firmware/UI boundaries, packaging, and quotation inputs. This supports existing OEM/ODM queries.
5. `hotel-rcu-buying-guide`
   Expand comparison criteria, I/O scope, room schedule inputs, wiring responsibilities, sample review, and supplier document checklist.

These five are 542-664 words, while newer cluster pages are approximately 2,500-3,100 words. Updates should add decision-useful procurement information, not generic length.

### Priority 2: One New Guide After Existing Updates

Recommended first new guide:

**Hotel Guest Room Control Interfaces: Wall Panels, Touchscreens, Bedside Controls, and Mobile Control**

Target intent:

- guestroom remote control
- digital control hotel room
- room control tablet hotel
- replace remote control in hotel
- tablet-controlled room service
- bedside control panel

The guide should compare interface roles without claiming that every product supports every protocol or mobile integration. It should link to the Smart Switch Panel guide, Smart Hotel Room Control System guide, Renovation guide, AI display products, panel products, the Guest Room Control Solution, and Contact.

### Priority 3: Conditional Commercial Guide

Create only if supplier/manufacturer queries continue to grow over the next 28-30 days:

**How to Evaluate a Hotel Room Control System Supplier for a B2B Project**

It should focus on scope confirmation, documents, samples, wiring responsibility, OEM/ODM capability, quality review, lead-time confirmation, and quotation comparability. It must not invent certifications, customers, prices, delivery guarantees, or local support claims.

### Hold

Delay standalone Resources for curtain automation, low-voltage design, or new country topics until GSC shows sustained demand or buyer inquiries support them. Existing Product, Solution, and Region pages can serve the current low-volume queries.

## 30-Day Measurement Roadmap

### Week 1

- Deploy the pilot conversion-map correction.
- Submit or inspect the pilot and the five priority Resource URLs in GSC if needed.
- Record the 601-impression, 0-click, position-63 baseline.

### Week 2

- Update the Smart Hotel Room Control System and Guest Room Automation guides.
- Preserve their separate intent maps.
- Add FAQ relationships only if a reusable, tested model is approved.

### Week 3

- Update Smart Switch Panel, OEM/ODM Customization, and RCU Buying guides.
- Review GSC query-to-page mapping for signs of cross-ranking.

### Week 4

- Compare GSC impressions, query breadth, average position, and indexed Resource pages.
- Compare GA4 `page_view`, `inquiry_cta_click`, and `inquiry_form_submit` by `source_type=resource` and `source_slug`.
- Create the Control Interfaces guide only if the remote-control/tablet/bedside query family remains visible.
- Defer the Supplier Evaluation guide unless commercial supplier queries persist.

## Decision Rules

- **Keep** a page when its intent is distinct, even if current impressions are low.
- **Update** when demand exists but the page is materially thinner than the cluster standard.
- **Merge** only after at least 60-90 days of query-to-page evidence shows two URLs repeatedly ranking for the same intent with no distinct conversion role.
- **Retitle** only when a page receives meaningful impressions at competitive positions and its CTR remains weak.
- **Add content** only when query evidence and a real Product/Solution/Contact path both exist.

## Validation

- `npm.cmd run lint`: passed.
- `WORDPRESS_REST_ROOT=https://cms.dualcorelink.com/wp-json npm.cmd run test:data`: 47/47 passed.
- `WORDPRESS_REST_ROOT=https://cms.dualcorelink.com/wp-json npm.cmd run build`: passed.
- Static pages: 155.
- Resources: 14.
- Sitemap URLs: 75.
- Product JSON-LD: 36/36.
- Article JSON-LD: 14/14.
- Resource BreadcrumbList: 14/14.
- Pilot conversion sections present in static HTML: 5/5.
- Empty `href="#"`: 0.
- Environment leakage in exported HTML/XML/TXT: 0.

The first data-test attempt without the public CMS environment variable fell back to the local WordPress endpoint and failed. A sandboxed public-CMS attempt was also blocked from network access. The approved read-only public-CMS run then passed all 47 tests. These were environment conditions, not application regressions.

## Final Recommendation

Keep all 14 Resources. Do not merge, delete, or retitle them in Phase 2F. Deploy the single pilot conversion correction, deepen the five older demand-matched guides, and wait for 28-30 days of GSC and GA4 data before adding more than one new page. The best next content opportunity is the hotel guest room control-interface topic because it is supported by several of the highest-impression queries and can connect directly to existing panels, AI displays, room-control solutions, renovation planning, and inquiry paths.

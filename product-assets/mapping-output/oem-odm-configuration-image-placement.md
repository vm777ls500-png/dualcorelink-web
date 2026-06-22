# OEM/ODM Custom Panel Configuration Image Placement

Generated: 2026-06-22

## Decision Summary

- Reviewed shortlist: 14 images across four series.
- OEM/ODM primary module: 9 images.
- Hotel Guest Room Control Solution teaser: 3 images.
- Archive only for first release: 2 images.
- No products, product pages, categories, taxonomies, WordPress records, or sitemap URLs should be added.
- Images should be published as configuration examples, not as standard stock SKUs.

## 1. Review of the 14 Recommended Images

| Image | Series | Group | Recommended Use | Risk | Public Suitable |
| --- | --- | --- | --- | --- | --- |
| `智慧系列智能面板/二联排USB五孔插座+四键智能面板/1.png` | Smart Series | USB socket + four-key controls | Archive reference | Prominent unconfirmed `5V / 2.1A` label; close to existing socket/switch product imagery | No for first release |
| `智慧系列智能面板/二联排插卡取电+四键智能面板/1.png` | Smart Series | Key card + room service controls | OEM/ODM primary module | No hotel, customer, room number, or technical parameter; visible function labels are examples | Yes |
| `智慧系列智能面板/三联排插卡取电+房态四键智能面板+卫生间四键智能面板/1.png` | Smart Series | Key card + room status + lighting/service controls | OEM/ODM primary module | No sensitive identity; broad hotel-room configuration could be mistaken for a SKU without disclaimer | Yes with configuration badge |
| `智慧系列智能面板/三联排四键智能开关+空调控制器+USB不间断电源五孔插座/1.png` | Smart Series | Curtain + thermostat/display + USB socket | Hotel Guest Room Solution teaser | Visible USB electrical marking; do not transcribe it as a specification | Yes with disclaimer |
| `智慧系列智能面板/四联排USB五孔插座+空调控制器+四键智能面板/1.png` | Smart Series | Socket + USB + thermostat/display + scene controls | Hotel Guest Room Solution teaser | Visible USB electrical marking and broad module mix | Yes with disclaimer |
| `复古系列智能面板/复古金色二联排USB五孔插座/08.png` | Vintage Gold Series | Dual socket configuration | OEM/ODM primary module | Visible `ELITE` mark was confirmed by the user; no customer or hotel identity | Yes |
| `复古系列智能面板/复古金色四联排USB五孔插座+智能开关面板/22.png` | Vintage Gold Series | Switch + dual USB sockets + curtain controls | OEM/ODM primary module | Visible `ELITE` mark; no date, location, room number, or music interface | Yes |
| `复古系列智能面板/复古金色智能开关面板+USB五孔插座/22.png` | Vintage Gold Series | Lighting/scene + USB socket + curtain controls | OEM/ODM primary module | Visible `ELITE` mark; function labels must remain examples | Yes |
| `铂智系列智能面板/红色磨砂二联排房态+四键智能开关面板/1.png` | Borui Series | Room status + lighting/service controls | OEM/ODM primary module | No customer, hotel, room number, or technical parameter | Yes |
| `铂智系列智能面板/红色磨砂三联排USB五孔插座/1.png` | Borui Series | Multi-gang socket configuration | OEM/ODM primary module | Visible USB label was previously confirmed; do not generalize it into project specifications | Yes with disclaimer |
| `铂智系列智能面板/红色磨砂三联排USB五孔插座  四键智能面板 六键智能面板/1.png` | Borui Series | Scene/lighting + curtain + USB socket | OEM/ODM primary module | Visible USB label was previously confirmed; configuration may look like a catalogue SKU | Yes with configuration badge |
| `铝拉丝系列智能面板/金属拉丝三联排插卡取电+四键智能面板/1.png` | Brushed Aluminum Series | Key card + service/lighting controls | OEM/ODM primary module | Clean front view; no customer, hotel, room number, or electrical parameter | Yes |
| `铝拉丝系列智能面板/金属拉丝三联排插卡取电+四键智能面板/3.png` | Brushed Aluminum Series | Key card + service/lighting controls, angled view | Hotel Guest Room Solution teaser | Same configuration as the front view, but useful as a material/finish perspective | Yes as secondary image |
| `铝拉丝系列智能面板/拉丝银二联排智能四键+USB Type-c五孔插座/1.png` | Brushed Aluminum Series | Lighting/scene + USB/Type-C socket | Archive reference | Prominent unconfirmed electrical label and strong similarity to existing panel/socket product imagery | No for first release |

### Review Findings

- No hotel brand, customer name, or room number was found in the 14-image shortlist.
- No date, location, weather, or music-interface screen appears in the shortlist. The previously identified Vintage display image remains excluded.
- Image clarity is adequate for planning. All public candidates still need compression, output sizing, and final full-resolution checks.
- Visible electrical labels remain the main risk. They must not be repeated in copy or ALT text.
- Every public image requires a `Configuration Example` treatment to prevent stock-SKU interpretation.

## 2. Page Placement

| Image | Placement | Reason | Public | Notes |
| --- | --- | --- | --- | --- |
| Smart key card + room service controls | OEM/ODM primary module | Clean Smart Series configuration with hotel-room relevance | Yes | Use under Smart Series tab |
| Smart key card + room status + lighting/service controls | OEM/ODM primary module | Broad guest-room module coordination example | Yes | Configuration badge required |
| Vintage dual socket configuration | OEM/ODM primary module | Shows Vintage Gold finish and socket layout | Yes | `ELITE` mark user-confirmed |
| Vintage four-gang switch/socket/curtain configuration | OEM/ODM primary module | Strong multi-gang example across module types | Yes | Do not claim fixed availability |
| Vintage lighting/USB/curtain configuration | OEM/ODM primary module | Compact coordinated configuration | Yes | Function labels are examples |
| Borui room status + lighting/service controls | OEM/ODM primary module | Clean Borui Series application | Yes | No parameter label risk |
| Borui multi-gang socket configuration | OEM/ODM primary module | Demonstrates socket layout flexibility | Yes | Visible label not used as copy |
| Borui scene/lighting + curtain + USB configuration | OEM/ODM primary module | Demonstrates mixed control and power modules | Yes | Configuration badge required |
| Brushed Aluminum key card + service/lighting front view | OEM/ODM primary module | Represents the fourth series with a clean finish view | Yes | Use front view only in main module |
| Smart curtain + thermostat/display + USB configuration | Hotel Guest Room Solution teaser | Strong room-control planning context | Yes | Disclaimer required |
| Smart four-gang socket + thermostat/display + scene controls | Hotel Guest Room Solution teaser | Shows project-level module coordination | Yes | Avoid parameter claims |
| Brushed Aluminum key card + service/lighting angled view | Hotel Guest Room Solution teaser | More contextual material/finish view than a catalogue card | Yes | Do not repeat in main module |
| Smart USB socket + four-key controls | Archive only | Electrical label is unusually prominent | No | Reconsider after crop or parameter-specific review |
| Brushed Aluminum lighting/scene + USB/Type-C socket | Archive only | Prominent unconfirmed electrical label and product-image overlap | No | Reconsider after crop or replacement |

## 3. First-release Module Content

```json
{
  "module_id": "custom-panel-configuration-options",
  "section_title": "Custom Room Panel Configuration Options",
  "section_subtitle": "Coordinate panel finishes and selectable modules for hotel guest room and OEM/ODM projects.",
  "intro_text": "Review representative panel layouts for lighting, curtain control, room status, key-card power, thermostat control, sockets, USB, and low-voltage functions. Each layout is a project configuration example rather than a fixed stock SKU.",
  "series_tabs": [
    "Smart Series",
    "Vintage Gold Series",
    "Borui Series",
    "Brushed Aluminum Series"
  ],
  "configuration_examples": [
    "Lighting + USB + Curtain Control",
    "Key Card + Room Status + Socket",
    "Thermostat + Service Panel + Lighting",
    "Multi-gang Socket and Low-voltage Combinations"
  ],
  "display_images": [
    "smart-series-key-card-room-service-configuration.png",
    "smart-series-key-card-room-status-lighting-configuration.png",
    "vintage-gold-dual-usb-socket-configuration.png",
    "vintage-gold-four-gang-socket-switch-configuration.png",
    "vintage-gold-lighting-usb-curtain-configuration.png",
    "borui-series-room-status-lighting-configuration.png",
    "borui-series-multi-gang-socket-configuration.png",
    "borui-series-lighting-curtain-socket-configuration.png",
    "brushed-aluminum-key-card-service-lighting-configuration.png"
  ],
  "cta_primary": "Request OEM/ODM Configuration",
  "cta_secondary": "Send Your Room Layout",
  "disclaimer_text": "Images show OEM/ODM configuration examples, not standard stock SKUs. Modules, colors, panel layouts, functions, and quantities can be adapted to project requirements. Final configuration, compatibility, MOQ, lead time, and quotation are subject to project review and written confirmation.",
  "risk_notes": [
    "Do not transcribe visible electrical labels into copy or ALT text.",
    "Do not create product URLs, prices, stock states, Product schema, or taxonomy terms for configurations.",
    "Keep the Configuration Example badge visible on every image card."
  ]
}
```

Optional tertiary CTA: `Get a Quote on WhatsApp`.

## 4. Frontend Implementation Impact

| File / Module | Recommended Change | Reason | Risk |
| --- | --- | --- | --- |
| `src/app/[locale]/solutions/[slug]/page.tsx` | Yes, small conditional render | Render the module only when `slug === "oem-odm-custom-panel-solution"` | Shared template regression if the condition is too broad; keep exact slug guard |
| New `src/components/content/custom-panel-configuration-options.tsx` | Yes | Isolates tabs, cards, disclaimer, and CTAs from the shared Solution template | Responsive gallery and tab accessibility require testing |
| New `src/config/static-oem-odm-configurations.ts` | Yes | Holds the curated static image metadata without changing WordPress or product models | Must remain configuration-only data |
| `public/media/oem-odm-configurations/` | Yes, later media preparation | Stores optimized configuration assets outside WordPress media | Requires unique names, compression, and hash review |
| WordPress static media sync script/manifest | No | These assets are not WordPress media and should not require WordPress upload | Mixing origins would confuse ownership |
| Hotel Guest Room Control Solution page | No in first release | Keep phase one limited to the OEM/ODM page | Add the three-image teaser only in a later phase |
| Homepage customization section | No in first release | Avoid expanding scope and first-viewport density | Reconsider after the primary module is validated |
| Products page | No | Configurations are not products | Changing it would create SKU/category confusion |
| Product detail template/data model | No | No configuration should imply product-specific compatibility | None if untouched |
| `src/app/sitemap.ts` | No | No new route is created | Sitemap must remain unchanged |
| WordPress | No | Configuration data and media remain static frontend assets | None if untouched |

## 5. Static Media Naming and ALT Text

Recommended public directory: `/media/oem-odm-configurations/`.

| Source Image | Recommended Static Name | Alt Text | Use |
| --- | --- | --- | --- |
| `智慧系列智能面板/二联排插卡取电+四键智能面板/1.png` | `smart-series-key-card-room-service-configuration.png` | Smart Series key card and room service panel configuration for hotel projects | OEM/ODM primary |
| `智慧系列智能面板/三联排插卡取电+房态四键智能面板+卫生间四键智能面板/1.png` | `smart-series-key-card-room-status-lighting-configuration.png` | Smart Series key card room status and lighting control configuration | OEM/ODM primary |
| `复古系列智能面板/复古金色二联排USB五孔插座/08.png` | `vintage-gold-dual-usb-socket-configuration.png` | Vintage Gold Series dual socket configuration for hospitality projects | OEM/ODM primary |
| `复古系列智能面板/复古金色四联排USB五孔插座+智能开关面板/22.png` | `vintage-gold-four-gang-socket-switch-configuration.png` | Vintage Gold Series multi-gang socket and switch configuration | OEM/ODM primary |
| `复古系列智能面板/复古金色智能开关面板+USB五孔插座/22.png` | `vintage-gold-lighting-usb-curtain-configuration.png` | Vintage Gold Series lighting USB and curtain control configuration | OEM/ODM primary |
| `铂智系列智能面板/红色磨砂二联排房态+四键智能开关面板/1.png` | `borui-series-room-status-lighting-configuration.png` | Borui Series room status and lighting control configuration | OEM/ODM primary |
| `铂智系列智能面板/红色磨砂三联排USB五孔插座/1.png` | `borui-series-multi-gang-socket-configuration.png` | Borui Series multi-gang socket configuration for room projects | OEM/ODM primary |
| `铂智系列智能面板/红色磨砂三联排USB五孔插座  四键智能面板 六键智能面板/1.png` | `borui-series-lighting-curtain-socket-configuration.png` | Borui Series lighting curtain and socket panel configuration | OEM/ODM primary |
| `铝拉丝系列智能面板/金属拉丝三联排插卡取电+四键智能面板/1.png` | `brushed-aluminum-key-card-service-lighting-configuration.png` | Brushed Aluminum Series key card service and lighting configuration | OEM/ODM primary |
| `智慧系列智能面板/三联排四键智能开关+空调控制器+USB不间断电源五孔插座/1.png` | `smart-series-curtain-thermostat-usb-configuration.png` | Smart Series curtain thermostat and USB panel configuration for guest rooms | Solution teaser |
| `智慧系列智能面板/四联排USB五孔插座+空调控制器+四键智能面板/1.png` | `smart-series-four-gang-display-socket-configuration.png` | Smart Series multi-gang display socket and scene control configuration | Solution teaser |
| `铝拉丝系列智能面板/金属拉丝三联排插卡取电+四键智能面板/3.png` | `brushed-aluminum-key-card-service-lighting-angle.png` | Angled view of a Brushed Aluminum Series key card and service panel configuration | Solution teaser |
| `智慧系列智能面板/二联排USB五孔插座+四键智能面板/1.png` | Not assigned for first release | Not assigned | Archive only |
| `铝拉丝系列智能面板/拉丝银二联排智能四键+USB Type-c五孔插座/1.png` | Not assigned for first release | Not assigned | Archive only |

Naming rules:

- English lowercase kebab-case.
- Include the approved series and a neutral configuration description.
- Do not include customer names, hotel names, room numbers, electrical values, or claims of compatibility.
- Do not reuse product SEO filenames.

## 6. Risk-control Copy

**Disclaimer text**

Images show OEM/ODM configuration examples, not standard stock SKUs. Modules, colors, panel layouts, functions, and quantities can be adapted to project requirements. Final configuration, compatibility, MOQ, lead time, and quotation are subject to project review and written confirmation.

**Short card note**

Configuration example. Final module selection and production scope require project confirmation.

## 7. Recommended Implementation Sequence

1. Confirm the 12 public images and two archive-only decisions.
2. Create optimized static copies with the approved filenames; preserve source files unchanged.
3. Add the static configuration data file and isolated frontend component.
4. Render the component only on `oem-odm-custom-panel-solution`.
5. Keep Products, product detail pages, WordPress, taxonomy, and sitemap unchanged.
6. Run responsive layout, link, risk-word, and image-path checks before deployment.
7. Consider the three-image Hotel Guest Room Solution teaser as a later, separate phase.

## Final Conclusion

**A. Image selection and page placement are complete and can proceed to OEM/ODM module implementation preparation.**


# Third-Batch Product Image Mapping

This report maps the approved third-batch product drafts to local source images. It does not upload media, create products or terms, write taxonomy values, modify frontend code, deploy, or commit files.

## Read-Only Import Checks

- WordPress product category REST endpoint: `http://127.0.0.1:8080/wp-json/wp/v2/product-category`
- Category endpoint status: 200
- Existing category term count: 7
- Required existing terms confirmed: Curtain Control Panels, RCU Room Control Host, Hotel Delivery Robot System, Smart Sockets & Power Modules, Room Status & Hotel Service Panels
- Missing required terms: HVAC & Thermostat Control; Smart Panels & Switches
- Required action before importing either affected product: `Needs category creation before import`
- `product_series` taxonomy is not registered. Series values below are mapping metadata only and must not be written as taxonomy values.
- Candidate source images reviewed: 41
- Recommended product images: 37
- Excluded scene or installed-room images: 4
- Missing source files: 0
- Exact duplicate candidate files: 0

## Image Mapping Table

| No. | Product | Slug | Source image path | Recommended count | Featured image | Recommended SEO filenames | ALT text suggestions | Risk | Ready for import |
| --: | --- | --- | --- | --: | --- | --- | --- | --- | --- |
| 1 | Smart Curtain Motor | `smart-curtain-motor` | `product-assets/raw-images/产品列表/产品列表/窗帘电机/` | 5 | `电机+轨道.png` | `smart-curtain-motor-1.png` through `smart-curtain-motor-5.png` | Smart curtain motor and rail product views for room automation projects | Four installed-room/full-curtain images excluded; no branding or watermark observed | Yes |
| 2 | Hotel Smart Room RCU Host 2 | `hotel-smart-room-rcu-host-2` | `product-assets/raw-images/产品列表/产品列表/客控主机/酒店智能客控控制器 客房中枢 RCU主机2/` | 3 | `2.png` | `hotel-smart-room-rcu-host-2-1.png` through `hotel-smart-room-rcu-host-2-3.png` | Hotel smart room RCU host controller front, angled, and enclosure views | Available views expose the controller board; no closed front cover image | Yes |
| 3 | Hotel Delivery Robot Charging Dock | `hotel-delivery-robot-charging-dock` | `product-assets/raw-images/产品列表/产品列表/酒店送货智能机器人/机器人充电底座/` | 5 | `1.png` | `hotel-delivery-robot-charging-dock-1.png` through `hotel-delivery-robot-charging-dock-5.png` | Hotel delivery robot charging dock product and connection views | No branding, QR code, watermark, or duplicate observed | Yes |
| 4 | Borui Red Matte USB Five-Hole Socket | `borui-red-matte-usb-five-hole-socket` | `product-assets/raw-images/产品列表/产品列表/铂智系列智能面板/红色磨砂USB五孔/` | 3 | `1.png` | `borui-red-matte-usb-five-hole-socket-1.png` through `borui-red-matte-usb-five-hole-socket-3.png` | Borui red matte USB five-hole socket front, angled, and rear views | USB output label confirmed by user | Yes |
| 5 | Borui Red Matte Room Status and Four-Key Switch Panel | `borui-red-matte-room-status-four-key-switch-panel` | `product-assets/raw-images/产品列表/产品列表/铂智系列智能面板/红色磨砂二联排房态+四键智能开关面板/` | 3 | `1.png` | `borui-red-matte-room-status-four-key-switch-panel-1.png` through `borui-red-matte-room-status-four-key-switch-panel-3.png` | Borui red matte room status and four-key switch panel views | Bilingual function labels are embedded; no customer or hotel brand observed | Yes |
| 6 | Vintage Gold Key Card Energy Saver Panel | `vintage-gold-key-card-energy-saver-panel` | `product-assets/raw-images/产品列表/产品列表/复古系列智能面板/复古金色插卡取电/` | 3 | `1.png` | `vintage-gold-key-card-energy-saver-panel-1.png` through `vintage-gold-key-card-energy-saver-panel-3.png` | Vintage gold key card energy saver panel front, angled, and rear views | `ELITE` mark confirmed by user | Yes |
| 7 | Vintage Gold Four-Key Smart Switch Panel | `vintage-gold-four-key-smart-switch-panel` | `product-assets/raw-images/产品列表/产品列表/复古系列智能面板/复古金色窗帘四键智能开关/` | 4 | `2.png` | `vintage-gold-four-key-smart-switch-panel-1.png` through `vintage-gold-four-key-smart-switch-panel-4.png` | Vintage gold four-key smart switch panel for lighting, curtain, and screen control | `ELITE` mark and general switch-control use confirmed; category term is missing | Yes, after category creation |
| 8 | Brushed Aluminum SOS Alarm Panel | `brushed-aluminum-sos-alarm-panel` | `product-assets/raw-images/产品列表/产品列表/铝拉丝系列智能面板/金属拉丝SOS报警面板/` | 4 | `1.png` | `brushed-aluminum-sos-alarm-panel-1.png` through `brushed-aluminum-sos-alarm-panel-4.png` | Brushed aluminum SOS alarm panel front, angled, detail, and rear views | Bilingual SOS label; two angled views are similar but not duplicates | Yes |
| 9 | Brushed Aluminum Thermostat Control Panel | `brushed-aluminum-thermostat-control-panel` | `product-assets/raw-images/产品列表/产品列表/铝拉丝系列智能面板/金属拉丝空调控制智能面板/` | 4 | `1.png` | `brushed-aluminum-thermostat-control-panel-1.png` through `brushed-aluminum-thermostat-control-panel-4.png` | Brushed aluminum thermostat control panel front, angled, product, and rear views | Images are suitable; category term is missing | No, needs category creation before import |
| 10 | Smart Voice and Telephone Information Socket | `smart-voice-telephone-information-socket` | `product-assets/raw-images/产品列表/产品列表/智慧系列智能面板/语音信息插座 电话插座/` | 3 | `1.png` | `smart-voice-telephone-information-socket-1.png` through `smart-voice-telephone-information-socket-3.png` | Smart voice and telephone information socket front, angled, and rear views | Interface type remains unconfirmed and is not claimed in ALT text | Yes |

## Detailed Recommended Order

### 1. Smart Curtain Motor

1. `电机+轨道.png` -> `smart-curtain-motor-1.png` (featured)  
   ALT: Smart curtain motor with rail components for room automation projects
2. `窗帘套装.png` -> `smart-curtain-motor-2.png`  
   ALT: Smart curtain motor set for hotel and residential automation
3. `窗帘电机.png` -> `smart-curtain-motor-3.png`  
   ALT: Smart curtain motor product view for motorized curtain systems
4. `导轨.png` -> `smart-curtain-motor-4.png`  
   ALT: Curtain motor and guide rail assembly for smart room projects
5. `轨道.png` -> `smart-curtain-motor-5.png`  
   ALT: Curtain rail detail for a smart curtain motor system

Excluded from the initial product gallery: `IMG_20250905_105848.jpg`, `IMG_20250905_110000.jpg`, `IMG_20250905_110036.jpg`, and `电动窗帘.png`. These are installed-room or full-curtain scene images rather than focused product views.

### 2. Hotel Smart Room RCU Host 2

1. `2.png` -> `hotel-smart-room-rcu-host-2-1.png` (featured)  
   ALT: Hotel smart room RCU host controller front view
2. `4.png` -> `hotel-smart-room-rcu-host-2-2.png`  
   ALT: Hotel smart room RCU host controller angled view
3. `5.png` -> `hotel-smart-room-rcu-host-2-3.png`  
   ALT: Hotel smart room RCU host enclosure rear view

### 3. Hotel Delivery Robot Charging Dock

1. `1.png` -> `hotel-delivery-robot-charging-dock-1.png` (featured)  
   ALT: Hotel delivery robot charging dock front view
2. `2.png` -> `hotel-delivery-robot-charging-dock-2.png`  
   ALT: Hotel delivery robot charging dock product view
3. `3.png` -> `hotel-delivery-robot-charging-dock-3.png`  
   ALT: Hotel delivery robot charging dock angled view
4. `4.png` -> `hotel-delivery-robot-charging-dock-4.png`  
   ALT: Charging dock detail for a hotel delivery robot system
5. `5.png` -> `hotel-delivery-robot-charging-dock-5.png`  
   ALT: Hotel delivery robot charging dock connection area

### 4. Borui Red Matte USB Five-Hole Socket

1. `1.png` -> `borui-red-matte-usb-five-hole-socket-1.png` (featured)  
   ALT: Borui red matte USB five-hole socket front view
2. `3.png` -> `borui-red-matte-usb-five-hole-socket-2.png`  
   ALT: Borui red matte USB five-hole socket angled view
3. `5.png` -> `borui-red-matte-usb-five-hole-socket-3.png`  
   ALT: Borui red matte USB five-hole socket rear view

Confirmation: the USB output marking visible on the front product image was confirmed by the user. It remains omitted from ALT text and is not expanded into additional technical claims.

### 5. Borui Red Matte Room Status and Four-Key Switch Panel

1. `1.png` -> `borui-red-matte-room-status-four-key-switch-panel-1.png` (featured)  
   ALT: Borui red matte room status and four-key switch panel front view
2. `3.png` -> `borui-red-matte-room-status-four-key-switch-panel-2.png`  
   ALT: Borui red matte room status and four-key switch panel angled view
3. `5.png` -> `borui-red-matte-room-status-four-key-switch-panel-3.png`  
   ALT: Borui red matte room status and four-key switch panel rear view

### 6. Vintage Gold Key Card Energy Saver Panel

1. `1.png` -> `vintage-gold-key-card-energy-saver-panel-1.png` (featured)  
   ALT: Vintage gold key card energy saver panel front view
2. `5.png` -> `vintage-gold-key-card-energy-saver-panel-2.png`  
   ALT: Vintage gold key card energy saver panel angled view
3. `3.png` -> `vintage-gold-key-card-energy-saver-panel-3.png`  
   ALT: Vintage gold key card energy saver panel rear connection view

Confirmation: the visible `ELITE` mark was confirmed by the user. The image set is cleared for import preparation without adding unverified technical claims.

### 7. Vintage Gold Four-Key Smart Switch Panel

1. `2.png` -> `vintage-gold-four-key-smart-switch-panel-1.png` (featured)  
   ALT: Vintage gold four-key smart switch panel for lighting curtain and screen control
2. `3.png` -> `vintage-gold-four-key-smart-switch-panel-2.png`  
   ALT: Vintage gold four-key smart switch panel angled view
3. `5.png` -> `vintage-gold-four-key-smart-switch-panel-3.png`  
   ALT: Vintage gold four-key smart switch panel product view
4. `4.png` -> `vintage-gold-four-key-smart-switch-panel-4.png`  
   ALT: Vintage gold four-key smart switch panel rear view

Confirmation: the visible `ELITE` mark was confirmed by the user. The screen and curtain labels are accepted application examples, and the four keys were confirmed for general switch-control use. The `Smart Panels & Switches` category term still needs creation before import.

### 8. Brushed Aluminum SOS Alarm Panel

1. `1.png` -> `brushed-aluminum-sos-alarm-panel-1.png` (featured)  
   ALT: Brushed aluminum SOS alarm panel front view
2. `3.png` -> `brushed-aluminum-sos-alarm-panel-2.png`  
   ALT: Brushed aluminum SOS alarm panel angled view
3. `4.png` -> `brushed-aluminum-sos-alarm-panel-3.png`  
   ALT: Brushed aluminum SOS alarm panel detail view
4. `5.png` -> `brushed-aluminum-sos-alarm-panel-4.png`  
   ALT: Brushed aluminum SOS alarm panel rear connection view

### 9. Brushed Aluminum Thermostat Control Panel

1. `1.png` -> `brushed-aluminum-thermostat-control-panel-1.png` (featured)  
   ALT: Brushed aluminum thermostat control panel front view
2. `3.png` -> `brushed-aluminum-thermostat-control-panel-2.png`  
   ALT: Brushed aluminum thermostat control panel angled view
3. `4.png` -> `brushed-aluminum-thermostat-control-panel-3.png`  
   ALT: Brushed aluminum thermostat control panel product view
4. `5.png` -> `brushed-aluminum-thermostat-control-panel-4.png`  
   ALT: Brushed aluminum thermostat control panel rear connection view

Import blocker: `HVAC & Thermostat Control` is not present in the current WordPress product categories. `Needs category creation before import`.

### 10. Smart Voice and Telephone Information Socket

1. `1.png` -> `smart-voice-telephone-information-socket-1.png` (featured)  
   ALT: Smart voice and telephone information socket front view
2. `3.png` -> `smart-voice-telephone-information-socket-2.png`  
   ALT: Smart voice and telephone information socket angled view
3. `5.png` -> `smart-voice-telephone-information-socket-3.png`  
   ALT: Smart voice and telephone information socket rear view

The interface type remains a technical confirmation item and is not stated in the ALT text.

## Risk Summary

| Product | Risk | Required action before upload or import |
| --- | --- | --- |
| Borui Red Matte USB Five-Hole Socket | USB output label confirmed by user | Cleared for import preparation; do not add unverified parameters to copy or ALT text |
| Vintage Gold Key Card Energy Saver Panel | `ELITE` mark confirmed by user | Cleared for import preparation |
| Vintage Gold Four-Key Smart Switch Panel | `ELITE` mark and general switch-control use confirmed by user; required category term is missing | Cleared for image preparation; create `Smart Panels & Switches` in a later authorized stage |
| Brushed Aluminum Thermostat Control Panel | Required category term is missing | Create only the approved `HVAC & Thermostat Control` term in a later authorized import stage |

No QR codes, customer names, hotel brands, watermarks, or exact duplicate files were observed in the remaining recommended image sets. No images were copied, renamed, uploaded, or modified during this mapping stage.

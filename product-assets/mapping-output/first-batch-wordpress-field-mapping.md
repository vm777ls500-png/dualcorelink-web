# First Batch WordPress Field Mapping

生成日期：2026-06-17  
状态：WordPress 导入前字段映射审核  
来源文件：

- `product-assets/mapping-output/first-batch-product-content-v2.md`
- `product-assets/mapping-output/first-batch-product-content-v2.json`

执行边界：

- 未写入 WordPress
- 未修改网站代码
- 未部署
- 未移动、删除、重命名原始图片和文档
- `product_series` 未确认时导入为 `null`，前端不显示该字段
- `AI大屏` 与 `旋钮式多功能智慧中控屏` 图片归属继续标记为待确认

## 分类映射

| WordPress Taxonomy | Label | Suggested Slug |
|---|---|---|
| product_category | AI Smart Displays / AI智能屏 | ai-smart-displays |
| product_category | Hotel Delivery Robot System / 酒店送货智能机器人 | hotel-delivery-robot-system |

## 字段映射总览

| 序号 | title | slug | product_category | product_series | product_model | 图片归属 | 导入状态 |
|---:|---|---|---|---|---|---|---|
| 1 | 86-Type AI Smart Control Display | 86-type-ai-smart-control-display | AI Smart Displays / AI智能屏 | null | null | 明确 | 可导入，型号待确认 |
| 2 | AI Large Smart Display | ai-large-smart-display | AI Smart Displays / AI智能屏 | null | null | 待确认 | 内容可导入，图片需人工确认 |
| 3 | Rotary Knob Smart Control Display | rotary-knob-smart-control-display | AI Smart Displays / AI智能屏 | null | null | 待确认 | 内容可导入，图片需人工确认 |
| 4 | Thermostat HVAC Control Panel | thermostat-hvac-control-panel | AI Smart Displays / AI智能屏 | null | null | 明确 | 可导入，温控参数待确认 |
| 5 | AI Music Control Panel | ai-music-control-panel | AI Smart Displays / AI智能屏 | null | null | 明确 | 可导入，音频/语音参数待确认 |
| 6 | Hotel Delivery Robot | hotel-delivery-robot | Hotel Delivery Robot System / 酒店送货智能机器人 | null | null | 明确 | 可导入，接口和性能参数待确认 |
| 7 | Hotel Smart Delivery Cabinet | hotel-smart-delivery-cabinet | Hotel Delivery Robot System / 酒店送货智能机器人 | null | null | 明确 | 可导入，系统接口和运营规则待确认 |

## 1. 86-Type AI Smart Control Display

| WordPress 字段 | 映射值 |
|---|---|
| title | 86-Type AI Smart Control Display |
| slug | 86-type-ai-smart-control-display |
| product_model | null |
| product_series | null |
| product_category | AI Smart Displays / AI智能屏 |
| product_short_description | An 86-box AI smart control display combining touch control, voice interaction, lighting control, background music, and multi-protocol smart device integration for hotel rooms, apartments, and smart home projects. |
| product_long_description | The 86-Type AI Smart Control Display is designed for hotel guest rooms, apartments, and smart space retrofit projects. It provides a compact wall-mounted control interface for lighting, HVAC, curtains, audio, sensors, and custom scenes. The device supports touch control, voice interaction, mobile control, and multi-protocol device integration, making it a practical control hub for room automation. |
| application_scenarios | Smart hotel guest room control; Apartment and residential smart home retrofits; Smart showroom demonstrations; Commercial low-voltage control projects; OEM/ODM smart panel programs |
| key_features | Standard 86-box wall-mounted installation; Touch-based smart control interface; Voice interaction support; Centralized control for lighting, HVAC, curtains, audio, and sensors; Multi-protocol smart device integration; Preset and customizable scene automation |
| technical_specs | installation_box: Standard 86 wall box; communication: to be confirmed; model: null; certification: null |
| installation_position | Wall-mounted 86-box positions such as hotel bedside, entrance, living area, showroom control point, or project-defined control location. |
| control_type | Touch control; Voice interaction; Scene control; Room automation control |
| power_module_type | null |
| protocol | To be confirmed; multi-protocol integration planned |
| hotel_use_case | Guest room control; Bedside control; Lighting and HVAC scene control; Smart room retrofit |
| oem_available | true |
| odm_available | true |
| seo_title | 86-Type AI Smart Control Display for Smart Hotel Rooms \| DualcoreLink |
| seo_description | 86-box AI smart control display with touch, voice, lighting, HVAC, curtain, audio, and smart device integration for hotel rooms and B2B automation projects. |
| image_alt_text | 86-type AI smart control display front view; 86-box smart hotel room control display with touch interface; AI smart control panel for lighting HVAC curtain and scene control |
| image_file_names | `product-assets/raw-images/产品列表/产品列表/AI智能屏/86型AI智能屏中控屏1/1.png`; `2.png`; `3.png`; `4.png`; `6.png` |
| faq | 3 条，见 JSON 映射文件 |
| missing_information | Formal product model; Complete certification information; Project wiring and protocol combination |
| internal_notes | Product series is not confirmed. Import `product_series` as null and do not display it until confirmed. |

## 2. AI Large Smart Display

| WordPress 字段 | 映射值 |
|---|---|
| title | AI Large Smart Display |
| slug | ai-large-smart-display |
| product_model | null |
| product_series | null |
| product_category | AI Smart Displays / AI智能屏 |
| product_short_description | A large AI smart display terminal for hotels, apartments, and smart spaces, designed for device status display, scene control, voice interaction, and multi-device integration. |
| product_long_description | The AI Large Smart Display is intended for hotel rooms, public spaces, showrooms, and smart demonstration areas where a larger visual control interface is required. It can present room device status, scene modes, and service entries while integrating with smart panels, sensors, HVAC, curtain control, and room control systems. Final screen size, hardware configuration, interfaces, and protocol combinations should be confirmed by project documentation. |
| application_scenarios | Smart hotel room control; Hotel public area control display; Apartment smart control; Showroom and demo room display; Commercial smart-space control interface |
| key_features | Large-format smart interaction interface; Device status and scene mode display; Voice interaction support; Integration with lighting, HVAC, curtains, and sensors; Suitable for hotel and commercial smart-space control |
| technical_specs | screen_size: null; communication: null; interfaces: null; model: null; certification: null |
| installation_position | Wall-mounted, desktop, or project-defined installation position. Final installation method needs confirmation. |
| control_type | Touch control; Voice interaction; Scene display; Smart room control |
| power_module_type | null |
| protocol | To be confirmed |
| hotel_use_case | Guest room control; Public area control display; Showroom demonstration; Smart apartment control |
| oem_available | true |
| odm_available | true |
| seo_title | AI Large Smart Display for Hotel Automation \| DualcoreLink |
| seo_description | Large AI smart display for hotel automation, smart room control, scene display, and B2B smart space projects. |
| image_alt_text | AI large smart display for hotel room automation; large smart control display for lighting HVAC and scene control; hotel smart display interface for room automation |
| image_file_names | `product-assets/raw-images/产品列表/产品列表/AI智能屏/AI大屏/微信图片_20250723143151.png`; `微信图片_20250723143155.png`; `智能屏大1.png`; `智能屏大2.png` |
| faq | 3 条，见 JSON 映射文件 |
| missing_information | Image ownership needs confirmation; Screen size; Hardware configuration; Protocol and interface details |
| internal_notes | Split from original AI large display package. Image ownership remains unconfirmed; do not force image assignment before manual confirmation. |

## 3. Rotary Knob Smart Control Display

| WordPress 字段 | 映射值 |
|---|---|
| title | Rotary Knob Smart Control Display |
| slug | rotary-knob-smart-control-display |
| product_model | null |
| product_series | null |
| product_category | AI Smart Displays / AI智能屏 |
| product_short_description | A multifunction smart control display with rotary knob interaction for lighting, HVAC, curtains, music, and scene control in hotel rooms and smart spaces. |
| product_long_description | The Rotary Knob Smart Control Display combines a touch interface with rotary knob interaction for hotel rooms, apartments, and smart spaces. The knob can be configured for functions such as volume, temperature, brightness, or scene switching, depending on the project setup. It can work as a room control entry point and integrate with lighting, HVAC, curtains, background music, and sensor systems. |
| application_scenarios | Hotel bedside or entrance control positions; Smart apartment and residential control; Showroom and demo room display; Premium room HVAC and scene control; OEM/ODM smart control projects |
| key_features | Combined touch display and rotary knob interaction; Control for lighting, HVAC, curtains, music, and scenes; Intuitive adjustment for temperature, brightness, or volume; Room control entry point for hotel guest rooms; Project-based function mapping support |
| technical_specs | screen_size: null; rotary_knob_function: configurable by project; communication: null; model: null; certification: null |
| installation_position | Wall-mounted control position, commonly near hotel bedside, entrance, or a primary smart-space control point. Final installation method needs confirmation. |
| control_type | Touch control; Rotary knob control; Scene control; HVAC and music control |
| power_module_type | null |
| protocol | To be confirmed |
| hotel_use_case | Bedside control; Entrance control; HVAC adjustment; Scene switching; Music control |
| oem_available | true |
| odm_available | true |
| seo_title | Rotary Knob Smart Control Display for Hotel Rooms \| DualcoreLink |
| seo_description | Rotary knob smart control display for hotel room lighting, HVAC, music, curtain, and scene control in smart automation projects. |
| image_alt_text | rotary knob smart control display for hotel room automation; smart hotel control display with knob interaction; wall-mounted rotary smart control panel for HVAC and scene control |
| image_file_names | `product-assets/raw-images/产品列表/产品列表/AI智能屏/AI大屏/微信图片_20250723143151.png`; `微信图片_20250723143155.png`; `智能屏大1.png`; `智能屏大2.png` |
| faq | 3 条，见 JSON 映射文件 |
| missing_information | Image ownership needs confirmation; Formal model; Screen size; Rotary knob function mapping |
| internal_notes | Split from original AI large display package. Shared image folder should not be assigned permanently until manual image confirmation is complete. |

## 4. Thermostat HVAC Control Panel

| WordPress 字段 | 映射值 |
|---|---|
| title | Thermostat HVAC Control Panel |
| slug | thermostat-hvac-control-panel |
| product_model | null |
| product_series | null |
| product_category | AI Smart Displays / AI智能屏 |
| functional_tags | HVAC Control; Thermostat; Hotel Room Temperature Control |
| product_short_description | A thermostat HVAC control panel for hotel rooms and smart spaces, designed for air-conditioning, temperature, and comfort control within the AI Smart Displays category. |
| product_long_description | The Thermostat HVAC Control Panel remains under the AI Smart Displays category and is intended for temperature control in hotel rooms, apartments, and commercial smart spaces. It can work as an HVAC control terminal within a room automation system and integrate with RCU hosts, smart panels, sensors, and scene logic. Supported HVAC types, wiring methods, control protocols, and temperature ranges should be confirmed by project documentation. |
| application_scenarios | Hotel guest room temperature control; Apartment and residential HVAC control; Commercial HVAC control; Temperature management in room control systems; OEM/ODM thermostat panel projects |
| key_features | Room HVAC and temperature control; Suitable for hotel room comfort management; Integration with RCU hosts and sensors; Scene-control logic support; Project-based wiring and protocol confirmation |
| technical_specs | controlled_system: HVAC / air conditioning, exact type to be confirmed; temperature_range: null; wiring_method: null; communication_protocol: null; model: null; certification: null |
| installation_position | Hotel room wall thermostat position, near bedside, entrance control zone, or project-defined HVAC control point. |
| control_type | HVAC control; Thermostat control; Scene integration |
| power_module_type | null |
| protocol | To be confirmed |
| hotel_use_case | Guest room temperature control; HVAC control; Room comfort management |
| oem_available | true |
| odm_available | true |
| seo_title | Thermostat HVAC Control Panel for Smart Hotel Rooms \| DualcoreLink |
| seo_description | Thermostat HVAC control panel for hotel room temperature control, smart room automation, and AI smart display system integration. |
| image_alt_text | thermostat HVAC control panel for hotel room temperature control; smart hotel thermostat panel for air conditioning control; AI smart display category thermostat control panel |
| image_file_names | `product-assets/raw-images/产品列表/产品列表/AI智能屏/温控面板空调控制器/1.png`; `2.png`; `3.png`; `4.png`; `5.png` |
| faq | 3 条，见 JSON 映射文件 |
| missing_information | Temperature range; Wiring method; Supported HVAC types; Certification |
| internal_notes | Keep this product under AI Smart Displays. Use functional tags for HVAC Control, Thermostat, and Hotel Room Temperature Control. |

## 5. AI Music Control Panel

| WordPress 字段 | 映射值 |
|---|---|
| title | AI Music Control Panel |
| slug | ai-music-control-panel |
| product_model | null |
| product_series | null |
| product_category | AI Smart Displays / AI智能屏 |
| product_short_description | A music control panel for hotel rooms and smart spaces, designed for background music, volume control, playback control, and scene integration. |
| product_long_description | The AI Music Control Panel is designed for background music control in hotel rooms, apartments, clubs, and showroom spaces. It can work with smart control displays, scene panels, audio systems, and room automation systems to provide local music control and scene integration. Voice interaction performance may vary depending on installation environment, noise level, distance, and system configuration. |
| application_scenarios | Hotel guest room background music; Apartment and residential music control; Club and commercial spaces; Showroom music scene demonstration; OEM/ODM music control panel projects |
| key_features | Background music control; Volume and playback control; Smart scene integration; Suitable for hotel rooms and commercial spaces; Project-based integration with audio and room control systems |
| technical_specs | voice_distance: null; voice_wake_up_rate: null; audio_interface: null; communication: null; model: null |
| installation_position | Hotel room bedside, entrance, entertainment area, club, or project-defined music control position. |
| control_type | Music control; Volume control; Playback control; Scene integration |
| power_module_type | null |
| protocol | To be confirmed |
| hotel_use_case | Guest room background music; Audio scene control; Showroom music scene |
| oem_available | true |
| odm_available | true |
| seo_title | AI Music Control Panel for Smart Hotel Rooms \| DualcoreLink |
| seo_description | Music control panel for hotel room background music, scene integration, and smart room automation projects. |
| image_alt_text | AI music control panel for smart hotel rooms; hotel background music control panel; smart music control interface for room automation |
| image_file_names | `product-assets/raw-images/产品列表/产品列表/AI智能屏/音乐控制器/1.png`; `2.png`; `3.png`; `4.png`; `5.png` |
| faq | 3 条，见 JSON 映射文件 |
| missing_information | Audio interface; Voice performance; Communication method; Certification |
| internal_notes | Voice performance claims remain unset. Do not import fixed voice distance or wake-up rate until verified. |

## 6. Hotel Delivery Robot

| WordPress 字段 | 映射值 |
|---|---|
| title | Hotel Delivery Robot |
| slug | hotel-delivery-robot |
| product_model | null |
| product_series | null |
| product_category | Hotel Delivery Robot System / 酒店送货智能机器人 |
| product_short_description | A hotel delivery robot for guest-room delivery, item transport, and service workflow automation. Delivery efficiency may vary depending on hotel layout and project configuration. |
| product_long_description | The Hotel Delivery Robot is designed for hotel guest-room service and internal delivery workflows. It can work with smart delivery cabinets, front-desk systems, elevator integration, and room service processes. The system is designed to support autonomous navigation, route planning, obstacle avoidance, and safe operation, while actual performance may vary depending on hotel layout, elevator integration, network conditions, operating workflow, and project configuration. |
| application_scenarios | Hotel guest-room item delivery; Front desk to guest room service workflows; Smart delivery cabinet integration; Hotel operation automation showcase; Service upgrade for hotels and serviced apartments |
| key_features | Hotel guest-room delivery support; Autonomous navigation and route planning; Designed for obstacle detection and avoidance; Can work with smart delivery cabinets and service workflows; Project-based elevator and management system integration |
| technical_specs | delivery_efficiency: requires project validation; navigation: null; payload: null; battery_life: null; charging_method: null; elevator_integration: null; certification: null |
| installation_position | Hotel front desk, service area, floor delivery point, beside smart delivery cabinet, or project-defined robot docking position. |
| control_type | Autonomous delivery; Route planning; Robot workflow control |
| power_module_type | null |
| protocol | To be confirmed; elevator integration interface to be confirmed |
| hotel_use_case | Guest-room delivery; Front desk delivery workflow; Smart cabinet pickup and delivery; Service automation |
| oem_available | true |
| odm_available | true |
| seo_title | Hotel Delivery Robot System for Smart Hotels \| DualcoreLink |
| seo_description | Hotel delivery robot for guest-room delivery, service automation, smart cabinet integration, and B2B hotel automation projects. |
| image_alt_text | hotel delivery robot for smart hotel service automation; smart delivery robot for guest room item transport; hotel robot system for delivery workflow automation |
| image_file_names | `product-assets/raw-images/产品列表/产品列表/酒店送货智能机器人/智能机器人/1.png`; `11.png`; `12.png`; `2.png`; `4.png`; `8.png` |
| faq | 3 条，见 JSON 映射文件 |
| missing_information | Payload; Battery life; Navigation plan; Elevator integration interface; Safety certification |
| internal_notes | Do not import fixed delivery-rate claims, absolute safety claims, or unverified performance promises. |

## 7. Hotel Smart Delivery Cabinet

| WordPress 字段 | 映射值 |
|---|---|
| title | Hotel Smart Delivery Cabinet |
| slug | hotel-smart-delivery-cabinet |
| product_model | null |
| product_series | null |
| product_category | Hotel Delivery Robot System / 酒店送货智能机器人 |
| product_short_description | A smart hotel delivery cabinet for guest supplies and hotel retail items, designed to work with hotel delivery robots through automated ordering, room delivery, room-temperature or refrigerated versions, and flexible multi-layer product channels. |
| product_long_description | The Hotel Smart Delivery Cabinet is designed to solve labor shortages during hotel service peaks, improve guest supply delivery, and support optional hotel retail services. It can store beverages, snacks, guest supplies, hotel retail items, and optional retail products. When paired with a hotel delivery robot, it forms an automated workflow: guest order, cabinet dispensing, and robot room delivery. According to the source document, the cabinet occupies less than 1 m² and can be placed in the lobby, service room, or back-of-house area. |
| application_scenarios | Hotel guest supply replenishment; Beverages, snacks, and guest supplies delivery; Hotel retail items and optional retail products management; Lobby or service-room smart storage; Robot-assisted pickup and room delivery |
| key_features | Storage for guest supplies and optional hotel retail products; Automated workflow with hotel delivery robots; In-room QR ordering and on-site purchase support; Room-temperature and refrigerated versions; Four-layer flexible product channels; 145-220 item capacity described in the document, depending on product size; Refrigerated compartment with adjustable temperature and room-temperature switching; Compact footprint for limited hotel spaces |
| technical_specs | overall_dimensions: 1950 × 835 × 840mm; footprint: less than 1 m²; versions: room-temperature cabinet / refrigerated cabinet; working_voltage: 220VAC 50Hz; room_temperature_power: less than 35W; refrigeration_compressor_power: less than 600W; channel_layers: 4; item_capacity: 145-220 items depending on product size |
| installation_position | Hotel lobby, service room, back-of-house area, floor public area, or near the robot pickup route. |
| control_type | Smart cabinet control; QR ordering workflow; Robot delivery workflow; Access and inventory workflow |
| power_module_type | Room-temperature / refrigerated cabinet power system |
| protocol | To be confirmed; robot integration interface to be confirmed; ordering/payment interface to be confirmed |
| hotel_use_case | Guest supply replenishment; Hotel retail service; Robot pickup and delivery; Front desk or service-room storage |
| oem_available | true |
| odm_available | true |
| seo_title | Hotel Smart Delivery Cabinet for Robot Delivery Systems \| DualcoreLink |
| seo_description | Smart hotel delivery cabinet with room-temperature or refrigerated options, four-layer channels, QR ordering, and robot delivery workflow for guest supplies and hotel retail items. |
| image_alt_text | Hotel smart delivery cabinet front view; Smart hotel cabinet for guest supplies; Hotel robot delivery cabinet with flexible product channels; Compact smart cabinet for hotel retail items and guest supply delivery; DualcoreLink hotel smart delivery cabinet product image |
| image_file_names | `product-assets/raw-images/产品列表/产品列表/酒店送货智能机器人/酒店智能货柜/1.jpg`; `1.png`; `2.png`; `3.jpg`; `3.png`; `4.jpg`; `4.png`; `5.jpg`; `6.jpg`; `8.jpg` |
| faq | 4 条，见 JSON 映射文件 |
| missing_information | Formal model; Payment method; Robot integration interface; Temperature range; Certification; Warranty policy; MOQ; Product compliance boundaries |
| internal_notes | Chinese public copy was revised to avoid mixed English commodity terms. Sensitive or regulated goods are not emphasized in public copy, SEO, or FAQ. |

## 可直接导入字段

- `title`
- `slug`
- `product_category`
- `product_short_description`
- `product_long_description`
- `application_scenarios`
- `key_features`
- `installation_position`
- `control_type`
- `hotel_use_case`
- `oem_available`
- `odm_available`
- `seo_title`
- `seo_description`
- `image_alt_text`
- `faq`
- `missing_information`
- `internal_notes`

## 需条件导入或人工确认字段

- `product_model`：7 个产品均待确认，当前为 `null`
- `product_series`：7 个产品均未确认，当前为 `null`
- `technical_specs`：只导入来源文档已明确的参数；未知项保持 `null` 或待确认
- `protocol`：多数产品仍需项目接口确认
- `power_module_type`：仅酒店智能货柜有明确方向，其余为 `null`
- `image_file_names`：AI大屏与旋钮式多功能智慧中控屏共用图片目录，归属需人工确认

## 图片归属不确定产品

- AI Large Smart Display / AI大屏
- Rotary Knob Smart Control Display / 旋钮式多功能智慧中控屏

## 导入前审核结论

- 共映射产品：7 个
- 分类规则：已按用户确认规则映射
- Product Series：未确认项全部按 `null` 处理，不写入任何占位字符串
- 第三方品牌、平台、商标、公司名：继续保持清理
- 技术参数：未虚构；未知项保留为 `null` 或人工确认项
- 当前状态：可以进入 WordPress 测试导入前审核

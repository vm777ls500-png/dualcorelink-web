export type M3aProductKind =
  | "audio"
  | "socket"
  | "lighting"
  | "scene-panel"
  | "music-panel"
  | "switch-panel"
  | "rcu"
  | "data-socket"
  | "thermostat"
  | "safety-panel"
  | "energy-panel"
  | "status-panel"
  | "robot-accessory"
  | "curtain"
  | "door-interface"
  | "sensor"
  | "infrared"
  | "service-equipment"
  | "display";

export type M3aProductCatalogEntry = {
  id: number;
  slug: string;
  englishTitle: string;
  kind: M3aProductKind;
  arTitle: string;
  arFaqQuestion?: string;
  arKindLabel?: string;
  arApplication?: string;
  zhTitle: string;
  arDetail: string;
  zhDetail: string;
};

export const m3aProductCatalog: readonly M3aProductCatalogEntry[] = [
  {
    id: 238,
    slug: "hotel-ceiling-background-speaker",
    englishTitle: "Hotel Ceiling Background Speaker",
    kind: "audio",
    arTitle: "مكبر صوت سقفي للموسيقى الخلفية في الفنادق",
    zhTitle: "酒店吸顶背景音乐扬声器",
    arDetail: "مكبر صوت مخصص للتخطيط الصوتي في غرف الفندق أو المساحات التي يحددها المشروع.",
    zhDetail: "用于酒店客房或项目指定空间的吸顶背景音乐扬声器，需结合音频系统和安装条件选型。",
  },
  {
    id: 226,
    slug: "brushed-aluminum-voice-telephone-information-panel",
    englishTitle: "Brushed Aluminum Voice and Telephone Information Panel",
    kind: "data-socket",
    arTitle: "لوحة معلومات صوت وهاتف من الألومنيوم المصقول",
    zhTitle: "拉丝铝语音与电话信息面板",
    arDetail: "لوحة تشطيب معدني لتنظيم نقاط الصوت والهاتف ضمن برنامج واجهات الغرفة.",
    zhDetail: "采用拉丝铝外观的信息面板，用于酒店客房语音与电话点位的统一规划。",
  },
  {
    id: 225,
    slug: "borui-red-matte-triple-socket-panel",
    englishTitle: "Borui Red Matte Triple Socket Panel",
    kind: "socket",
    arTitle: "لوحة مقابس ثلاثية Borui حمراء مطفية",
    zhTitle: "博睿红哑光三联插座面板",
    arDetail: "لوحة مقابس ثلاثية بلمسة حمراء مطفية لمشروعات الغرف التي تعتمد سلسلة تشطيب موحدة.",
    zhDetail: "博睿红哑光外观的三联插座面板，适合纳入统一的酒店客房面板系列。",
  },
  {
    id: 224,
    slug: "smart-series-dual-vertical-socket-panel",
    englishTitle: "Smart Series Dual Vertical Socket Panel",
    kind: "socket",
    arTitle: "لوحة مقابس عمودية مزدوجة من السلسلة الذكية",
    zhTitle: "智能系列双位竖装插座面板",
    arDetail: "تكوين عمودي مزدوج لنقاط الطاقة ضمن تخطيط مقابس الغرفة المعتمد.",
    zhDetail: "双位竖装结构的插座面板，用于按客房点位表配置电源接口。",
  },
  {
    id: 223,
    slug: "smart-footlight-night-light-panel",
    englishTitle: "Smart Footlight and Night Light Panel",
    kind: "lighting",
    arTitle: "لوحة إضاءة قدم وإضاءة ليلية ذكية",
    zhTitle: "智能地脚灯与夜灯面板",
    arDetail: "واجهة إضاءة منخفضة المستوى لدعم حركة النزيل ليلاً وفق منطق الغرفة المعتمد.",
    zhDetail: "用于酒店夜间低位照明和通行动线的地脚灯与夜灯面板。",
  },
  {
    id: 222,
    slug: "smart-four-key-scene-control-panel",
    englishTitle: "Smart Four-Key Scene Control Panel",
    kind: "scene-panel",
    arTitle: "لوحة ذكية بأربعة مفاتيح للتحكم في المشاهد",
    arFaqQuestion: "ما الاستخدام الأساسي للوحة الذكية ذات المفاتيح الأربعة للتحكم في المشاهد؟",
    zhTitle: "智能四键场景控制面板",
    arDetail: "لوحة بأربعة مفاتيح مخصصة لأوامر المشاهد التي يعتمدها مشروع الغرفة.",
    zhDetail: "四键场景控制面板，用于执行项目确认的客房灯光或综合场景。",
  },
  {
    id: 221,
    slug: "smart-three-key-music-control-panel",
    englishTitle: "Smart Three-Key Music Control Panel",
    kind: "music-panel",
    arTitle: "لوحة ذكية بثلاثة مفاتيح للتحكم في الموسيقى",
    zhTitle: "智能三键音乐控制面板",
    arDetail: "واجهة بثلاثة مفاتيح للتحكم في وظائف موسيقية محددة ضمن نظام صوت متوافق.",
    zhDetail: "三键音乐控制面板，用于已确认音频系统中的常用音乐操作。",
  },
  {
    id: 220,
    slug: "smart-single-key-switch-panel",
    englishTitle: "Smart Single-Key Switch Panel",
    kind: "switch-panel",
    arTitle: "لوحة مفتاح ذكي أحادي",
    zhTitle: "智能单键开关面板",
    arDetail: "لوحة أحادية الأمر لوظيفة غرفة محددة مع تسمية ومنطق واضحين.",
    zhDetail: "用于单一客房控制功能的智能单键开关面板。",
  },
  {
    id: 219,
    slug: "hotel-smart-room-rcu-host-3",
    englishTitle: "Hotel Smart Room RCU Host 3",
    kind: "rcu",
    arTitle: "مضيف RCU ذكي لغرف الفنادق 3",
    zhTitle: "酒店智能客房 RCU 控制主机 3",
    arDetail: "خيار مضيف RCU يجب مطابقته مع جدول نقاط الغرفة والدوائر والواجهات المطلوبة.",
    zhDetail: "RCU 客房控制主机型号 3，需依据房型点位、回路和接口要求进行匹配。",
  },
  {
    id: 197,
    slug: "smart-voice-telephone-information-socket",
    englishTitle: "Smart Voice and Telephone Information Socket",
    kind: "data-socket",
    arTitle: "مقبس معلومات ذكي للصوت والهاتف",
    zhTitle: "智能语音与电话信息插座",
    arDetail: "واجهة معلومات لتنظيم توصيلات الصوت والهاتف في موقع الغرفة المحدد.",
    zhDetail: "用于酒店客房语音和电话信息点位的智能信息插座。",
  },
  {
    id: 196,
    slug: "brushed-aluminum-thermostat-control-panel",
    englishTitle: "Brushed Aluminum Thermostat Control Panel",
    kind: "thermostat",
    arTitle: "لوحة تحكم بمنظّم حرارة من الألومنيوم المصقول",
    zhTitle: "拉丝铝温控器面板",
    arDetail: "واجهة تحكم من الألومنيوم المصقول لوظائف HVAC التي يحددها تصميم المشروع.",
    zhDetail: "拉丝铝外观的温控器面板，用于项目确认的 HVAC 操作与状态显示。",
  },
  {
    id: 195,
    slug: "brushed-aluminum-sos-alarm-panel",
    englishTitle: "Brushed Aluminum SOS Alarm Panel",
    kind: "safety-panel",
    arTitle: "لوحة إنذار SOS من الألومنيوم المصقول",
    zhTitle: "拉丝铝 SOS 紧急报警面板",
    arDetail: "لوحة SOS لواجهة طلب الطوارئ ضمن نظام إنذار ومسؤولية تشغيل معتمدين.",
    zhDetail: "用于酒店项目紧急求助入口的拉丝铝 SOS 报警面板。",
  },
  {
    id: 194,
    slug: "vintage-gold-four-key-smart-switch-panel",
    englishTitle: "Vintage Gold Four-Key Smart Switch Panel",
    kind: "switch-panel",
    arTitle: "لوحة مفاتيح ذكية رباعية بلون ذهبي كلاسيكي",
    zhTitle: "复古金四键智能开关面板",
    arDetail: "لوحة رباعية بلمسة ذهبية كلاسيكية لتنظيم أوامر الغرفة المتكررة.",
    zhDetail: "复古金外观的四键智能开关面板，用于客房常用控制功能。",
  },
  {
    id: 193,
    slug: "vintage-gold-key-card-energy-saver-panel",
    englishTitle: "Vintage Gold Key Card Energy Saver Panel",
    kind: "energy-panel",
    arTitle: "لوحة موفّر طاقة ببطاقة مفتاح بلون ذهبي كلاسيكي",
    zhTitle: "复古金插卡取电节能面板",
    arDetail: "لوحة بطاقة لضبط منطق طاقة الغرفة وفق مخطط الدوائر وسياسة التشغيل.",
    zhDetail: "复古金外观的插卡取电面板，用于按项目回路和运营逻辑管理客房用电。",
  },
  {
    id: 192,
    slug: "borui-red-matte-room-status-four-key-switch-panel",
    englishTitle: "Borui Red Matte Room Status and Four-Key Switch Panel",
    kind: "status-panel",
    arTitle: "لوحة حالة غرفة ومفاتيح رباعية Borui حمراء مطفية",
    zhTitle: "博睿红哑光房态与四键开关面板",
    arDetail: "تجمع بين عرض أوامر حالة الغرفة وأربعة مفاتيح ضمن واجهة واحدة.",
    zhDetail: "在统一面板中组合房态功能与四键客房控制，采用博睿红哑光外观。",
  },
  {
    id: 191,
    slug: "borui-red-matte-usb-five-hole-socket",
    englishTitle: "Borui Red Matte USB Five-Hole Socket",
    kind: "socket",
    arTitle: "مقبس USB خماسي الفتحات Borui أحمر مطفي",
    zhTitle: "博睿红哑光 USB 五孔插座",
    arDetail: "مقبس بخمس فتحات وواجهة USB ضمن سلسلة Borui الحمراء المطفية.",
    zhDetail: "博睿红哑光系列的 USB 五孔插座，用于酒店客房电源点位。",
  },
  {
    id: 190,
    slug: "hotel-delivery-robot-charging-dock",
    englishTitle: "Hotel Delivery Robot Charging Dock",
    kind: "robot-accessory",
    arTitle: "قاعدة شحن روبوت التوصيل الفندقي",
    zhTitle: "酒店配送机器人充电桩",
    arDetail: "قاعدة شحن مرتبطة بطراز روبوت التوصيل وبموقع الخدمة والطاقة المعتمدين.",
    zhDetail: "与酒店配送机器人型号、供电及服务区域规划配套的充电桩。",
  },
  {
    id: 189,
    slug: "hotel-smart-room-rcu-host-2",
    englishTitle: "Hotel Smart Room RCU Host 2",
    kind: "rcu",
    arTitle: "مضيف RCU ذكي لغرف الفنادق 2",
    zhTitle: "酒店智能客房 RCU 控制主机 2",
    arDetail: "خيار مضيف RCU ثانٍ للمقارنة وفق نقاط التحكم والأسلاك ومتطلبات الغرفة.",
    zhDetail: "RCU 客房控制主机型号 2，用于根据点位、布线和房型要求进行方案比较。",
  },
  {
    id: 188,
    slug: "smart-curtain-motor",
    englishTitle: "Smart Curtain Motor",
    kind: "curtain",
    arTitle: "محرك ستائر ذكي",
    arKindLabel: "محرك للستائر الآلية",
    zhTitle: "智能窗帘电机",
    arDetail: "محرك للستائر الآلية يجب تنسيقه مع مسار الستارة والطاقة وواجهة التحكم.",
    zhDetail: "用于酒店电动窗帘的智能电机，需与轨道、供电及控制接口协同确认。",
  },
  {
    id: 52,
    slug: "brushed-aluminum-86-base-doorbell-panel",
    englishTitle: "Brushed Aluminum 86-Base Doorbell Panel",
    kind: "door-interface",
    arTitle: "لوحة جرس باب لعلبة تركيب من نوع 86 من الألومنيوم المصقول",
    zhTitle: "拉丝铝 86 型底盒门铃面板",
    arDetail: "لوحة جرس بواجهة ألومنيوم مصقول مخصصة لفئة علبة الحائط 86.",
    zhDetail: "适配 86 型底盒的拉丝铝门铃面板，用于酒店客房入口。",
  },
  {
    id: 51,
    slug: "smart-four-key-curtain-control-panel",
    englishTitle: "Smart Four-Key Curtain Control Panel",
    kind: "curtain",
    arTitle: "لوحة ذكية بأربعة مفاتيح للتحكم في الستائر",
    zhTitle: "智能四键窗帘控制面板",
    arDetail: "واجهة رباعية لأوامر الستائر التي يعتمدها منطق الغرفة والمحرك المختار.",
    zhDetail: "四键窗帘控制面板，用于执行项目确认的开、合及相关窗帘操作。",
  },
  {
    id: 50,
    slug: "smart-key-card-energy-saver-panel",
    englishTitle: "Smart Key Card Energy Saver Panel",
    kind: "energy-panel",
    arTitle: "لوحة ذكية موفّرة للطاقة ببطاقة مفتاح",
    zhTitle: "智能插卡取电节能面板",
    arDetail: "واجهة بطاقة لتطبيق منطق تشغيل دوائر الغرفة وفق تصميم الطاقة المعتمد.",
    zhDetail: "用于按照酒店客房回路策略执行插卡取电逻辑的智能面板。",
  },
  {
    id: 49,
    slug: "smart-usb-five-hole-socket",
    englishTitle: "Smart USB Five-Hole Socket",
    kind: "socket",
    arTitle: "مقبس ذكي USB خماسي الفتحات",
    zhTitle: "智能 USB 五孔插座",
    arDetail: "واجهة طاقة تجمع مقبساً خماسي الفتحات مع USB ضمن نقطة الغرفة.",
    zhDetail: "在一个客房点位组合 USB 与五孔电源接口的智能插座。",
  },
  {
    id: 48,
    slug: "hotel-smart-room-rcu-host-1",
    englishTitle: "Hotel Smart Room RCU Host 1",
    kind: "rcu",
    arTitle: "مضيف RCU ذكي للتحكم في غرفة الفندق",
    zhTitle: "酒店智能客房 RCU 控制主机 1",
    arDetail: "مضيف RCU لمشروعات التحكم في الإضاءة وHVAC والستائر والمستشعرات.",
    zhDetail: "用于酒店客房灯光、HVAC、窗帘和传感器协同控制的 RCU 主机。",
  },
  {
    id: 47,
    slug: "rcu-controller-cabinet",
    englishTitle: "RCU Controller Cabinet",
    kind: "rcu",
    arTitle: "خزانة تحكم RCU لغرف الفنادق",
    zhTitle: "酒店客房 RCU 控制箱",
    arDetail: "خزانة لتنظيم أجهزة تحكم RCU والأطراف والتوصيلات في الغرفة.",
    zhDetail: "用于集中组织 RCU 控制设备、端子和客房接线的控制箱。",
  },
  {
    id: 46,
    slug: "hotel-guest-room-doorbell",
    englishTitle: "Hotel Guest Room Doorbell",
    kind: "door-interface",
    arTitle: "جرس باب غرفة الفندق",
    zhTitle: "酒店客房门铃",
    arDetail: "جرس لمدخل غرفة النزيل يجب تنسيقه مع لوحة الباب ومنطق الخدمة.",
    zhDetail: "用于酒店客房入口的门铃，需与门牌、房态及服务逻辑协调。",
  },
  {
    id: 45,
    slug: "hotel-room-door-magnetic-sensor",
    englishTitle: "Hotel Room Door Magnetic Sensor",
    kind: "sensor",
    arTitle: "مستشعر مغناطيسي لباب غرفة الفندق",
    arApplication: "توفير حالة فتح وإغلاق الباب لمنطق الغرفة المعتمد",
    zhTitle: "酒店客房门磁传感器",
    arDetail: "مستشعر لحالة فتح وإغلاق الباب ضمن منطق RCU المعتمد للمشروع.",
    zhDetail: "用于检测客房门开合状态，并接入项目确认的 RCU 控制逻辑。",
  },
  {
    id: 44,
    slug: "infrared-repeater",
    englishTitle: "Infrared Repeater",
    kind: "infrared",
    arTitle: "مكرّر إشارة بالأشعة تحت الحمراء",
    zhTitle: "红外转发器",
    arDetail: "ملحق لنقل أوامر الأشعة تحت الحمراء إلى جهاز متوافق ضمن نطاق التركيب.",
    zhDetail: "用于把红外控制指令转发至兼容设备的项目配件。",
  },
  {
    id: 43,
    slug: "embedded-human-presence-sensor",
    englishTitle: "Embedded Human Presence Sensor",
    kind: "sensor",
    arTitle: "مستشعر وجود بشري مدمج",
    arKindLabel: "مستشعر وجود لغرفة الفندق",
    arApplication: "استشعار وجود الأشخاص لدعم منطق إشغال الغرفة المعتمد",
    zhTitle: "嵌入式人体存在传感器",
    arDetail: "مستشعر مدمج لدعم منطق إشغال الغرفة بعد اعتماد موقعه ونطاقه.",
    zhDetail: "嵌入安装的人体存在传感器，用于项目确认的客房占用逻辑。",
  },
  {
    id: 13,
    slug: "hotel-smart-delivery-cabinet",
    englishTitle: "Hotel Smart Delivery Cabinet",
    kind: "service-equipment",
    arTitle: "خزانة توصيل ذكية للفنادق",
    arKindLabel: "خزانة تسليم ذكية للفنادق",
    zhTitle: "酒店智能配送柜",
    arDetail: "معدات خدمة لتسليم المواد في نقطة تشغيل يحددها الفندق والمشروع.",
    zhDetail: "用于酒店物品交接流程的智能配送柜，需结合运营位置和服务责任规划。",
  },
  {
    id: 12,
    slug: "hotel-delivery-robot",
    englishTitle: "Hotel Delivery Robot",
    kind: "service-equipment",
    arTitle: "روبوت توصيل للفنادق",
    arKindLabel: "روبوت خدمة فندقي",
    zhTitle: "酒店配送机器人",
    arDetail: "معدات أتمتة لخدمة التوصيل داخل الفندق وفق مسار وتشغيل وتكامل معتمد.",
    zhDetail: "用于酒店内部物品配送流程的服务机器人，需确认路线、运营和接口条件。",
  },
  {
    id: 11,
    slug: "ai-music-control-panel",
    englishTitle: "AI Music Control Panel",
    kind: "music-panel",
    arTitle: "لوحة تحكم موسيقية بالذكاء الاصطناعي",
    zhTitle: "AI 音乐控制面板",
    arDetail: "واجهة موسيقية للتحكم في وظائف صوتية يعتمدها النظام والمشروع.",
    zhDetail: "用于已确认音频系统和客房场景的 AI 音乐控制面板。",
  },
  {
    id: 10,
    slug: "thermostat-hvac-control-panel",
    englishTitle: "Thermostat HVAC Control Panel",
    kind: "thermostat",
    arTitle: "لوحة منظّم حرارة للتحكم في HVAC",
    zhTitle: "HVAC 温控器控制面板",
    arDetail: "واجهة مخصصة لضبط وظائف HVAC وفق نوع النظام الميكانيكي والتحكم المعتمد.",
    zhDetail: "用于项目指定 HVAC 系统的温度与运行控制界面。",
  },
  {
    id: 9,
    slug: "rotary-knob-smart-control-display",
    englishTitle: "Rotary Knob Smart Control Display",
    kind: "display",
    arTitle: "شاشة تحكم ذكية بمقبض دوّار",
    zhTitle: "旋钮式智能控制屏",
    arDetail: "واجهة تجمع شاشة ومقبضاً دواراً لتشغيل الوظائف التي يحددها المشروع.",
    zhDetail: "结合显示界面与旋钮操作的智能控制屏，用于项目确认的客房功能。",
  },
  {
    id: 8,
    slug: "ai-large-smart-display",
    englishTitle: "AI Large Smart Display",
    kind: "display",
    arTitle: "شاشة ذكية كبيرة بالذكاء الاصطناعي",
    zhTitle: "AI 大屏智能控制终端",
    arDetail: "واجهة عرض كبيرة لتنظيم وظائف الغرفة أو المساحة الذكية ضمن نطاق تكامل واضح.",
    zhDetail: "用于酒店客房或智能空间多功能操作的 AI 大屏控制终端。",
  },
  {
    id: 6,
    slug: "86-type-ai-smart-control-display",
    englishTitle: "86-Type AI Smart Control Display",
    kind: "display",
    arTitle: "شاشة تحكم ذكية بالذكاء الاصطناعي من نوع 86",
    zhTitle: "86 型 AI 智能控制屏",
    arDetail: "واجهة لمس وصوت تناسب علبة الحائط القياسية مقاس 86.",
    zhDetail: "适配 86 型墙盒的 AI 智能控制屏，可作为酒店客房集中操作界面。",
  },
] as const;

export type M3aSolutionCatalogEntry = {
  id: number;
  slug: string;
  englishTitle: string;
  arTitle: string;
  zhTitle: string;
  arSummary: string;
  zhSummary: string;
};

export const m3aSolutionCatalog: readonly M3aSolutionCatalogEntry[] = [
  {
    id: 142,
    slug: "oem-odm-custom-panel-solution",
    englishTitle: "OEM / ODM Custom Panel Solution",
    arTitle: "حل OEM/ODM لتخصيص لوحات التحكم",
    zhTitle: "OEM/ODM 定制面板解决方案",
    arSummary: "مسار مشروع لتحديد وظائف اللوحة وتخطيطها وتشطيبها وعلامتها ووثائقها قبل أخذ العينة والإنتاج.",
    zhSummary: "面向酒店面板项目的 OEM/ODM 流程，明确功能、布局、表面、品牌、样品和批量交付要求。",
  },
  {
    id: 141,
    slug: "hotel-delivery-robot-solution",
    englishTitle: "Hotel Delivery Robot Solution",
    arTitle: "حل روبوت التوصيل للفنادق",
    zhTitle: "酒店配送机器人解决方案",
    arSummary: "تخطيط روبوت التوصيل وخزانة الاستلام والشحن ومسار الخدمة وحدود التكامل وفق تشغيل الفندق.",
    zhSummary: "围绕配送机器人、配送柜、充电、路线和酒店服务流程规划可执行的项目范围。",
  },
  {
    id: 140,
    slug: "rcu-room-control-solution",
    englishTitle: "RCU Room Control Solution",
    arTitle: "حل RCU للتحكم في غرف الفنادق",
    zhTitle: "RCU 酒店客房控制解决方案",
    arSummary: "تخطيط RCU والمضيف والخزانة واللوحات والمستشعرات وHVAC والستائر وفق جدول نقاط الغرفة.",
    zhSummary: "依据房型点位组织 RCU 主机、控制箱、面板、传感器、HVAC 和窗帘接口。",
  },
  {
    id: 139,
    slug: "ai-smart-display-solution",
    englishTitle: "AI Smart Display Solution",
    arTitle: "حل شاشات التحكم الذكية بالذكاء الاصطناعي",
    zhTitle: "AI 智能控制屏解决方案",
    arSummary: "تخطيط واجهات العرض واللمس والصوت وعلاقتها بـ RCU والأجهزة والنظام وفق احتياجات المساحة.",
    zhSummary: "规划显示、触控、语音界面与 RCU、客房设备及系统接口之间的关系。",
  },
  {
    id: 138,
    slug: "smart-hotel-automation-solution",
    englishTitle: "Smart Hotel Automation Solution",
    arTitle: "حل أتمتة الفندق الذكي",
    zhTitle: "智能酒店自动化解决方案",
    arSummary: "نطاق أتمتة يربط أجهزة الغرف وخدمات الفندق وحدود الشبكات والواجهات ومسؤوليات التسليم.",
    zhSummary: "从客房设备、酒店服务、网络接口和交付责任出发规划智能酒店自动化范围。",
  },
  {
    id: 137,
    slug: "hotel-guest-room-control-solution",
    englishTitle: "Hotel Guest Room Control Solution",
    arTitle: "حل التحكم في غرف نزلاء الفندق",
    zhTitle: "酒店客房控制解决方案",
    arSummary: "حل هندسي لتنسيق الإضاءة وHVAC والستائر والاستشعار والطاقة وواجهات الخدمة داخل الغرفة.",
    zhSummary: "协调酒店客房灯光、HVAC、窗帘、传感、用电和服务界面的工程方案。",
  },
] as const;

export type M3aResourceCatalogEntry = {
  slug: string;
  englishTitle: string;
  arTitle: string;
  arAudienceQuestion?: string;
  zhTitle: string;
  arSummary: string;
  zhSummary: string;
  arFocus: readonly [string, string, string, string];
  zhFocus: readonly [string, string, string, string];
};

export const m3aResourceCatalog: readonly M3aResourceCatalogEntry[] = [
  {
    slug: "what-is-hotel-rcu-room-control-system",
    englishTitle: "What Is a Hotel RCU Room Control System?",
    arTitle: "ما نظام RCU للتحكم في غرف الفنادق؟",
    arAudienceQuestion: "لمن يناسب هذا الدليل عن نظام RCU للتحكم في غرف الفنادق؟",
    zhTitle: "什么是酒店 RCU 客房控制系统？",
    arSummary: "دليل يشرح دور RCU والأجهزة والأسلاك وحدود الشراء في مشروع غرفة الفندق.",
    zhSummary: "解释酒店 RCU 客控系统的设备关系、布线边界和采购准备。",
    arFocus: ["دور RCU في الغرفة", "علاقة اللوحات والمستشعرات", "الأسلاك والبروتوكول", "بيانات طلب العرض"],
    zhFocus: ["RCU 在客房中的职责", "面板与传感器关系", "布线和协议确认", "询价资料准备"],
  },
  {
    slug: "hotel-rcu-wiring-system-architecture-guide",
    englishTitle: "Hotel RCU Wiring and System Architecture Guide",
    arTitle: "دليل توصيلات RCU وبنية نظام الفندق",
    zhTitle: "酒店 RCU 布线与系统架构指南",
    arSummary: "مرجع لتقسيم أجهزة الغرفة والتيار القوي والضعيف ونقاط التكامل ومسؤوليات التنفيذ.",
    zhSummary: "梳理客房设备、强弱电布线、系统接口和工程责任的技术指南。",
    arFocus: ["طبقات بنية RCU", "فصل التيار القوي والضعيف", "جدول I/O", "حدود التكامل والاختبار"],
    zhFocus: ["RCU 架构层级", "强弱电边界", "I/O 点表", "接口与测试责任"],
  },
  {
    slug: "hotel-rcu-buying-guide",
    englishTitle: "Hotel RCU Buying Guide",
    arTitle: "دليل شراء RCU لمشروعات الفنادق",
    zhTitle: "酒店 RCU 项目采购指南",
    arSummary: "دليل شراء يربط اختيار RCU بأنواع الغرف والنقاط والدوائر والواجهات والتسليم.",
    zhSummary: "从房型、点位、回路、接口和交付资料出发选择酒店 RCU。",
    arFocus: ["تحديد أنواع الغرف", "مقارنة المضيف والخزانة", "مراجعة الوثائق والعينة", "تجهيز BOQ والكمية"],
    zhFocus: ["确认房型", "比较主机与控制箱", "审核资料和样品", "准备 BOQ 与数量"],
  },
  {
    slug: "smart-hotel-room-control-system-guide",
    englishTitle: "Smart Hotel Room Control System Guide",
    arTitle: "دليل نظام التحكم الذكي في غرف الفنادق",
    zhTitle: "智能酒店客房控制系统指南",
    arSummary: "يشرح تخطيط الإضاءة وHVAC والستائر والطاقة والاستشعار وواجهات النزيل في نظام واحد.",
    zhSummary: "规划灯光、HVAC、窗帘、用电、传感和住客界面的智能客房系统。",
    arFocus: ["سيناريو النزيل", "أجهزة الغرفة", "حدود RCU وHVAC", "الغرفة النموذجية"],
    zhFocus: ["住客场景", "客房设备组合", "RCU 与 HVAC 边界", "样板间验证"],
  },
  {
    slug: "hotel-smart-switch-panel-guide",
    englishTitle: "Hotel Smart Switch Panel Guide",
    arTitle: "دليل لوحات المفاتيح الذكية للفنادق",
    zhTitle: "酒店智能开关面板选型指南",
    arSummary: "دليل لاختيار وظيفة المفاتيح وتخطيطها وتسميتها وتشطيبها وعلاقتها بنظام الغرفة.",
    zhSummary: "围绕按键功能、布局、标识、表面和客控系统关系选择酒店智能面板。",
    arFocus: ["وظائف كل موضع", "وضوح الأيقونات", "علبة الجدار والأسلاك", "اعتماد العينة والتشطيب"],
    zhFocus: ["各位置功能", "图标与标识", "底盒和接线", "样品与表面确认"],
  },
  {
    slug: "oem-odm-smart-panel-customization-guide",
    englishTitle: "OEM/ODM Smart Panel Customization Guide",
    arTitle: "دليل تخصيص اللوحات الذكية بنظام OEM/ODM",
    zhTitle: "OEM/ODM 智能面板定制指南",
    arSummary: "ينظم متطلبات الوظيفة والمظهر والعلامة والتقنية والعينة قبل الإنتاج.",
    zhSummary: "明确智能面板 OEM/ODM 的功能、外观、品牌、技术和样品流程。",
    arFocus: ["مصفوفة الوظائف", "التخطيط والرموز", "الخامة والتشطيب", "العينة والتجميد"],
    zhFocus: ["功能矩阵", "布局与图标", "材料和表面", "样品与封样"],
  },
  {
    slug: "hotel-guest-room-automation-guide",
    englishTitle: "Hotel Guest Room Automation Guide",
    arTitle: "دليل أتمتة غرف نزلاء الفندق",
    zhTitle: "酒店客房自动化指南",
    arSummary: "يربط رحلة النزيل بمنطق الغرفة والأجهزة والتكامل والتشغيل والصيانة.",
    zhSummary: "把住客旅程与客房逻辑、设备、系统集成、运营和维护关联起来。",
    arFocus: ["رحلة الوصول والإقامة", "المشاهد والتحكم", "الاستشعار وحالة الغرفة", "التشغيل والصيانة"],
    zhFocus: ["入住与居停流程", "场景和控制", "传感与房态", "运营维护"],
  },
  {
    slug: "hotel-room-control-system-cost-factors",
    englishTitle: "Hotel Room Control System Cost Factors",
    arTitle: "عوامل تكلفة نظام التحكم في غرف الفنادق",
    zhTitle: "酒店客房控制系统成本因素",
    arSummary: "يوضح كيف تؤثر الأجهزة والأسلاك والتخصيص والتكامل والاختبار في هيكل التكلفة دون تقديم سعر وهمي.",
    zhSummary: "说明设备、布线、定制、集成和调试如何构成成本，不提供虚构报价。",
    arFocus: ["نطاق الأجهزة", "الأسلاك والتركيب", "التخصيص والعينات", "البرمجيات والتشغيل"],
    zhFocus: ["设备范围", "布线与安装", "定制和样品", "软件与调试"],
  },
  {
    slug: "hotel-occupancy-sensor-selection-guide",
    englishTitle: "Hotel Occupancy Sensor Selection Guide",
    arTitle: "دليل اختيار مستشعر إشغال غرف الفنادق",
    zhTitle: "酒店客房占用传感器选型指南",
    arSummary: "دليل لتحديد هدف الاستشعار والموقع والتغطية والمنطق والخصوصية قبل اختيار المستشعر.",
    zhSummary: "在选型前确认占用检测目标、位置、覆盖、控制逻辑和隐私边界。",
    arFocus: ["هدف الاستشعار", "الموقع والتغطية", "منطق الإشغال", "الاختبار ومنع الإنذارات الخاطئة"],
    zhFocus: ["检测目标", "位置与覆盖", "占用逻辑", "测试与误判控制"],
  },
  {
    slug: "hotel-doorplate-room-display-buying-guide",
    englishTitle: "Hotel Doorplate and Room Display Buying Guide",
    arTitle: "دليل شراء لوحة الباب وشاشة رقم الغرفة للفندق",
    zhTitle: "酒店门牌与房号显示屏采购指南",
    arSummary: "يحدد معلومات المدخل وحالة الغرفة والخدمة والتركيب والواجهة قبل شراء لوحة الباب.",
    zhSummary: "采购门牌或房号显示屏前确认入口信息、房态、服务、安装和接口。",
    arFocus: ["معلومات المدخل", "حالة الغرفة والخدمة", "المقاس والتركيب", "الربط مع RCU"],
    zhFocus: ["入口信息", "房态与服务显示", "尺寸和安装", "与 RCU 的关系"],
  },
  {
    slug: "oem-odm-hotel-control-panel-development-process",
    englishTitle: "OEM/ODM Hotel Control Panel Development Process",
    arTitle: "عملية تطوير لوحة تحكم فندقية بنظام OEM/ODM",
    zhTitle: "OEM/ODM 酒店控制面板开发流程",
    arSummary: "مسار من متطلبات المشروع إلى التصميم والعينة والتحقق وتجميد مواصفات الإنتاج.",
    zhSummary: "从项目需求、设计、样品验证到量产规格冻结的面板开发流程。",
    arFocus: ["تجميع المتطلبات", "التصميم والمراجعة", "العينة والتحقق", "تجميد الإنتاج والتسليم"],
    zhFocus: ["需求收集", "设计评审", "样品验证", "量产冻结与交付"],
  },
  {
    slug: "hotel-renovation-smart-room-upgrade-guide",
    englishTitle: "Hotel Renovation Smart Room Upgrade Guide",
    arTitle: "دليل ترقية الغرف الذكية في تجديد الفنادق",
    zhTitle: "酒店改造智能客房升级指南",
    arSummary: "يبدأ من مسح الأسلاك والعلب والأحمال وHVAC قبل تحديد نطاق ترقية الغرفة.",
    zhSummary: "从现有布线、底盒、负载和 HVAC 调查开始确定智能客房改造范围。",
    arFocus: ["مسح الموقع", "إعادة استخدام الأسلاك", "توافق الأجهزة", "التنفيذ على مراحل"],
    zhFocus: ["现场勘查", "现有布线利用", "设备兼容", "分阶段施工"],
  },
  {
    slug: "smart-panel-material-finish-selection-guide",
    englishTitle: "Smart Panel Material and Finish Selection Guide",
    arTitle: "دليل اختيار خامة وتشطيب اللوحات الذكية",
    zhTitle: "智能面板材料与表面选型指南",
    arSummary: "يقارن اتجاهات الخامة واللون والملمس والتنظيف والعينة ضمن متطلبات التصميم والاستخدام.",
    zhSummary: "结合设计、触感、清洁和样品确认选择智能面板材料与表面。",
    arFocus: ["الخامة والملمس", "اللون والاتساق", "التنظيف والاستخدام", "عينة الحد والتفاوت"],
    zhFocus: ["材料与触感", "颜色一致性", "清洁和使用", "限度样与色差"],
  },
  {
    slug: "knx-vs-rcu-hotel-room-control",
    englishTitle: "KNX vs RCU for Hotel Room Control",
    arTitle: "مقارنة KNX وRCU للتحكم في غرف الفنادق",
    zhTitle: "酒店客房控制中的 KNX 与 RCU 对比",
    arSummary: "يقارن دور KNX وRCU من حيث بنية المشروع والتكامل والتشغيل دون إعلان فائز مطلق.",
    zhSummary: "从架构、集成和运维角度比较 KNX 与 RCU，不作脱离项目的优劣结论。",
    arFocus: ["بنية النظام", "الأجهزة والواجهات", "التشغيل والصيانة", "معايير قرار المشروع"],
    zhFocus: ["系统架构", "设备与接口", "运维方式", "项目决策条件"],
  },
  {
    slug: "hotel-guest-room-control-interfaces-guide",
    englishTitle: "Hotel Guest Room Control Interfaces Guide",
    arTitle: "دليل واجهات التحكم في غرف نزلاء الفندق",
    zhTitle: "酒店客房控制界面规划指南",
    arSummary: "ينظم دور لوحات الجدار والشاشات والتحكم بجانب السرير ومنظّم الحرارة والتحكم المحمول.",
    zhSummary: "规划墙面板、触控屏、床头控制、温控器和移动控制的不同职责。",
    arFocus: ["لوحات الجدار", "الشاشات واللمس", "التحكم بجانب السرير", "HVAC والتحكم المحمول"],
    zhFocus: ["墙面板", "触控显示", "床头控制", "HVAC 与移动控制"],
  },
] as const;

export type M3aRegionCatalogEntry = {
  slug: string;
  englishTitle: string;
  arTitle: string;
  zhTitle: string;
  arSummary: string;
  zhSummary: string;
  arFocus: readonly [string, string, string];
  zhFocus: readonly [string, string, string];
};

export const m3aRegionCatalog: readonly M3aRegionCatalogEntry[] = [
  {
    slug: "middle-east",
    englishTitle: "Smart Hotel Room Control Products for Middle East Projects",
    arTitle: "منتجات التحكم الذكي في غرف الفنادق لمشروعات الشرق الأوسط",
    zhTitle: "面向中东项目的智能酒店客房控制产品",
    arSummary: "دعم شراء وتكامل RCU واللوحات والمستشعرات لمشروعات الفنادق في الشرق الأوسط.",
    zhSummary: "面向中东酒店项目规划 RCU、控制面板、传感器、定制和交付资料。",
    arFocus: ["الفنادق الجديدة والتجديد", "متطلبات الكهرباء والواجهات", "OEM/ODM والوثائق"],
    zhFocus: ["新建与改造酒店", "电气和接口要求", "OEM/ODM 与项目资料"],
  },
  {
    slug: "saudi-arabia",
    englishTitle: "Smart Hotel RCU & Room Control Products for Saudi Arabia",
    arTitle: "منتجات RCU والتحكم الذكي في الغرف لمشروعات السعودية",
    zhTitle: "面向沙特项目的酒店 RCU 与客房控制产品",
    arSummary: "سياق B2B لاختيار أجهزة الغرفة والتكامل والتخصيص والتوريد لمشروعات السعودية.",
    zhSummary: "面向沙特酒店工程采购，规划 RCU、面板、传感器、定制和交付。",
    arFocus: ["أنواع الغرف والنقاط", "مراجعة الجهد والواجهات", "العينة والتوريد"],
    zhFocus: ["房型与点位", "电压和接口审核", "样品与交付"],
  },
  {
    slug: "uae",
    englishTitle: "Smart Hotel & Apartment Automation Products for UAE",
    arTitle: "منتجات أتمتة الفنادق والشقق الذكية لمشروعات الإمارات",
    zhTitle: "面向阿联酋的酒店与公寓自动化产品",
    arSummary: "تخطيط أجهزة التحكم والواجهات والتخصيص لمشروعات الفنادق والشقق في الإمارات.",
    zhSummary: "为阿联酋酒店和服务式公寓项目规划客控设备、接口、定制和交付。",
    arFocus: ["الفنادق والشقق الفندقية", "تنسيق الواجهات والتشطيب", "التسليم والدعم"],
    zhFocus: ["酒店与服务式公寓", "接口与表面协调", "交付与支持"],
  },
  {
    slug: "southeast-asia",
    englishTitle: "Smart Hotel Products for Southeast Asia",
    arTitle: "منتجات الفنادق الذكية لمشروعات جنوب شرق آسيا",
    zhTitle: "面向东南亚项目的智能酒店产品",
    arSummary: "دعم مشروعات الغرف الذكية في جنوب شرق آسيا مع تأكيد الجهد والتركيب والتكامل حسب السوق.",
    zhSummary: "面向东南亚酒店项目，按当地电气、安装和系统条件选择智能客房产品。",
    arFocus: ["اختلاف الأسواق والجهد", "الفنادق والشقق", "التكامل والتسليم"],
    zhFocus: ["市场与电气差异", "酒店和公寓场景", "系统集成与交付"],
  },
  {
    slug: "vietnam",
    englishTitle: "Smart Hotel Room Control Products for Vietnam",
    arTitle: "منتجات التحكم الذكي في غرف الفنادق لمشروعات فيتنام",
    zhTitle: "面向越南项目的智能酒店客房控制产品",
    arSummary: "سياق مشروع لاختيار RCU واللوحات والمستشعرات للفنادق والتجديد في فيتنام.",
    zhSummary: "面向越南酒店新建和改造项目选择 RCU、控制面板与传感器。",
    arFocus: ["الجديد والتجديد", "المخططات ونقاط الغرفة", "الكمية والوثائق"],
    zhFocus: ["新建与改造", "图纸和客房点位", "数量与资料"],
  },
] as const;

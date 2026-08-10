import { defineCmsImportPayload } from "./types";
import {
  m3aProductCatalog,
  m3aSolutionCatalog,
  type M3aProductKind,
} from "../m3a-catalog";

type ProductKindCopy = {
  label: string;
  application: string;
  checks: string;
  integration: string;
};

const arKindCopy: Readonly<Record<M3aProductKind, ProductKindCopy>> = {
  audio: {
    label: "جهاز صوت فندقي",
    application: "الموسيقى الخلفية أو الصوت في المساحة التي يحددها المشروع",
    checks: "موقع التركيب ونظام الصوت والطاقة والكابلات ومستوى التشغيل المطلوب",
    integration: "يُعتمد الارتباط مع مصدر الصوت والمضخم والتحكم وفق تصميم النظام",
  },
  socket: {
    label: "مقبس ولوحة طاقة",
    application: "نقاط الطاقة والخدمة في غرف الفنادق أو الشقق",
    checks: "الجهد ونوع المقبس وعلبة الجدار والكابلات واللون والكمية",
    integration: "لا تُفترض وظيفة تحكم أو توافق كهربائي قبل مراجعة الطراز والمشروع",
  },
  lighting: {
    label: "واجهة إضاءة فندقية",
    application: "الإضاءة الليلية أو منخفضة المستوى وفق رحلة النزيل",
    checks: "موضع التركيب والطاقة وشدة الإضاءة ومنطق التشغيل والتشطيب",
    integration: "تُراجع العلاقة مع RCU أو دوائر الإضاءة وفق مخطط الغرفة",
  },
  "scene-panel": {
    label: "لوحة تحكم في المشاهد",
    application: "تنفيذ مشاهد الغرفة المعتمدة من موضع ثابت",
    checks: "عدد الأوامر وتسميتها ومنطق المشهد والعلبة والأسلاك والتشطيب",
    integration: "تُبرمج العلاقة مع RCU أو نظام الغرفة وفق جدول الوظائف",
  },
  "music-panel": {
    label: "لوحة تحكم موسيقية",
    application: "الوصول إلى وظائف الصوت أو الموسيقى المعتمدة",
    checks: "وظائف المفاتيح ونظام الصوت والطاقة والاتصال وموقع الاستخدام",
    integration: "يلزم تأكيد واجهة النظام الصوتي ولا يُفترض التوافق من اسم المنتج",
  },
  "switch-panel": {
    label: "لوحة مفاتيح ذكية",
    application: "أوامر الإضاءة أو المشاهد أو وظائف الغرفة المحددة",
    checks: "توزيع المفاتيح والرموز والعلبة والأسلاك والتشطيب والمنطق",
    integration: "تُحدد كل وظيفة وعلاقتها بوحدة التحكم في جدول نقاط المشروع",
  },
  rcu: {
    label: "جهاز RCU للتحكم في الغرفة",
    application: "تنظيم منطق الإضاءة وHVAC والستائر والمستشعرات والواجهات",
    checks: "أنواع الغرف وجدول I/O والدوائر والطاقة والاتصال ومكان التركيب",
    integration: "تُعتمد البروتوكولات والأطراف والبرمجة وفق وثائق الطراز والمشروع",
  },
  "data-socket": {
    label: "واجهة معلومات واتصالات",
    application: "نقاط الهاتف أو الصوت أو المعلومات في الغرفة",
    checks: "نوع الموصل والكابلات والعلبة والتسمية والتشطيب والكمية",
    integration: "تُراجع العلاقة مع شبكة الهاتف أو الصوت بواسطة المقاول المختص",
  },
  thermostat: {
    label: "واجهة منظّم حرارة HVAC",
    application: "تحكم النزيل في وظائف المناخ المعتمدة",
    checks: "نوع HVAC والصمامات والمراوح والطاقة والحساس والأسلاك ومكان التركيب",
    integration: "لا يُعتمد توافق HVAC أو البروتوكول إلا بعد مراجعة النظام الحقيقي",
  },
  "safety-panel": {
    label: "واجهة طلب طوارئ",
    application: "إرسال طلب SOS ضمن إجراء تشغيل واضح",
    checks: "موضع اللوحة والإشارة المستقبلة والطاقة والأسلاك ومسؤولية الاستجابة",
    integration: "يجب توثيق مسار الإنذار والاختبار ولا تُفترض جهة استجابة تلقائية",
  },
  "energy-panel": {
    label: "لوحة منطق طاقة ببطاقة",
    application: "تشغيل دوائر مختارة وفق سياسة إشغال الغرفة",
    checks: "نوع البطاقة والدوائر المؤخرة والطاقة والأسلاك ومنطق RCU",
    integration: "تُراجع الأحمال والحماية ومنطق التشغيل مع التصميم الكهربائي",
  },
  "status-panel": {
    label: "لوحة حالة وتحكم للغرفة",
    application: "عرض أو إرسال حالات الخدمة مع أوامر غرفة محددة",
    checks: "معاني الحالات والمفاتيح والرموز والعلبة والأسلاك والتشطيب",
    integration: "تُحدد نقاط الحالة وعلاقتها بلوحة الباب أو RCU أو نظام الخدمة",
  },
  "robot-accessory": {
    label: "ملحق روبوت خدمة فندقي",
    application: "دعم تشغيل وشحن روبوت التوصيل في منطقة الخدمة",
    checks: "طراز الروبوت والطاقة والموقع ومساحة الحركة ومسؤولية التشغيل",
    integration: "يجب تأكيد التوافق مع الروبوت ولا يُستخدم الملحق كمنتج مستقل عام",
  },
  curtain: {
    label: "جهاز تحكم في الستائر",
    application: "تشغيل الستائر الآلية داخل الغرفة",
    checks: "الستارة والمسار والمحرك والطاقة والاتجاه والمفاتيح وحدود الحركة",
    integration: "تُعتمد العلاقة مع RCU أو لوحة التحكم وفق النظام المختار",
  },
  "door-interface": {
    label: "واجهة مدخل غرفة الفندق",
    application: "خدمة الجرس أو الاتصال عند باب الغرفة",
    checks: "العلبة والجهد والأسلاك ولوحة الباب وحالة الغرفة والتشطيب",
    integration: "تُحدد علاقة الجرس أو الإشارة مع RCU ونظام الخدمة حسب المشروع",
  },
  sensor: {
    label: "مستشعر لغرفة الفندق",
    application: "توفير حالة باب أو وجود لمنطق الغرفة المعتمد",
    checks: "هدف الكشف والموقع والتغطية والطاقة والأسلاك ومنطق الاستجابة",
    integration: "يجب اختبار الإشارة مع RCU ولا تُفترض تقنية أو دقة غير موثقة",
  },
  infrared: {
    label: "ملحق تحكم بالأشعة تحت الحمراء",
    application: "نقل أوامر الأشعة تحت الحمراء إلى جهاز متوافق",
    checks: "الجهاز المستهدف وموقع الباعث والطاقة والكابل وطريقة البرمجة",
    integration: "تُؤكد مكتبة الأوامر والتوافق والاختبار مع الجهاز الحقيقي",
  },
  "service-equipment": {
    label: "معدات خدمة وأتمتة فندقية",
    application: "دعم سير عمل التوصيل أو تسليم المواد داخل الفندق",
    checks: "مسار التشغيل والموقع والطاقة والشبكة والسلامة ومسؤولية الموظفين",
    integration: "أي اتصال بالمصاعد أو الأبواب أو المنصة يحتاج إلى نطاق مؤكد",
  },
  display: {
    label: "شاشة تحكم ذكية",
    application: "عرض وتشغيل وظائف الغرفة أو المساحة الذكية المعتمدة",
    checks: "الواجهة واللغة والطاقة والعلبة والاتصال والأجهزة المتحكم بها",
    integration: "تُراجع العلاقة مع RCU وHVAC والصوت والستائر وفق الطراز والمشروع",
  },
};

const zhKindCopy: Readonly<Record<M3aProductKind, ProductKindCopy>> = {
  audio: {
    label: "酒店音频设备",
    application: "项目指定客房或空间的背景音乐与音频播放",
    checks: "安装位置、音频系统、供电、线缆和所需声场",
    integration: "与音源、功放及控制系统的关系按实际音频方案确认",
  },
  socket: {
    label: "客房电源插座面板",
    application: "酒店客房或公寓的电源与服务点位",
    checks: "电压、插座制式、底盒、线缆、颜色和数量",
    integration: "不得仅凭名称推断控制功能或电气兼容性",
  },
  lighting: {
    label: "酒店照明界面",
    application: "住客夜间通行或项目指定的低位照明",
    checks: "安装位置、供电、亮度、控制逻辑和表面",
    integration: "与 RCU 或照明回路的关系按客房图纸确认",
  },
  "scene-panel": {
    label: "客房场景控制面板",
    application: "从固定位置执行项目确认的客房场景",
    checks: "指令数量、文字图标、场景逻辑、底盒、接线和表面",
    integration: "与 RCU 或客控系统的场景关系按功能表配置",
  },
  "music-panel": {
    label: "音乐控制面板",
    application: "操作项目批准的音频或音乐功能",
    checks: "按键功能、音频系统、供电、通信和使用位置",
    integration: "必须确认音频接口，不得根据产品名称假定兼容",
  },
  "switch-panel": {
    label: "智能开关面板",
    application: "执行灯光、场景或指定客房控制功能",
    checks: "按键布局、图标、底盒、布线、表面和控制逻辑",
    integration: "每个按键与控制单元的关系应写入项目点表",
  },
  rcu: {
    label: "RCU 客房控制设备",
    application: "组织灯光、HVAC、窗帘、传感器和操作界面的控制逻辑",
    checks: "房型、I/O 点表、回路、供电、通信和安装位置",
    integration: "协议、端子和程序按具体型号及项目技术资料确认",
  },
  "data-socket": {
    label: "客房信息接口",
    application: "酒店客房电话、语音或信息点位",
    checks: "接口类型、线缆、底盒、标识、表面和数量",
    integration: "与电话或音频网络的连接由相关专业根据图纸确认",
  },
  thermostat: {
    label: "HVAC 温控界面",
    application: "为住客提供项目批准的空调操作",
    checks: "HVAC 类型、阀门、风机、供电、传感、接线和安装位置",
    integration: "必须依据真实机电系统确认 HVAC 兼容和协议",
  },
  "safety-panel": {
    label: "紧急求助界面",
    application: "在明确的酒店响应流程中发送 SOS 请求",
    checks: "安装位置、接收端、供电、布线和响应责任",
    integration: "应记录报警路径与测试要求，不假定自动响应主体",
  },
  "energy-panel": {
    label: "插卡取电面板",
    application: "按照客房占用策略控制选定用电回路",
    checks: "卡片类型、延时回路、供电、接线和 RCU 逻辑",
    integration: "负载、保护和运行逻辑必须与电气设计共同审核",
  },
  "status-panel": {
    label: "房态与客房控制面板",
    application: "显示或发送服务房态并操作指定客房功能",
    checks: "房态含义、按键、图标、底盒、接线和表面",
    integration: "与门牌、RCU 或服务系统的点位关系按项目确认",
  },
  "robot-accessory": {
    label: "酒店服务机器人配件",
    application: "在服务区域支持配送机器人充电和运行",
    checks: "机器人型号、供电、位置、通行空间和运营责任",
    integration: "必须确认机器人兼容性，不作为通用独立设备采购",
  },
  curtain: {
    label: "酒店窗帘控制设备",
    application: "控制客房电动窗帘",
    checks: "窗帘、轨道、电机、供电、方向、按键和限位",
    integration: "与 RCU 或窗帘面板的关系按所选系统确认",
  },
  "door-interface": {
    label: "酒店客房入口界面",
    application: "支持客房门口的门铃或服务交互",
    checks: "底盒、电压、接线、门牌、房态和表面",
    integration: "门铃或信号与 RCU、服务系统的关系按项目定义",
  },
  sensor: {
    label: "酒店客房传感器",
    application: "向项目确认的客控逻辑提供门状态或存在状态",
    checks: "检测目标、位置、覆盖、供电、接线和响应逻辑",
    integration: "必须与 RCU 联调，不虚构传感技术或精度",
  },
  infrared: {
    label: "红外控制配件",
    application: "向兼容设备转发红外控制指令",
    checks: "目标设备、发射位置、供电、线缆和学习方式",
    integration: "指令库、兼容性和测试必须以真实设备为准",
  },
  "service-equipment": {
    label: "酒店服务自动化设备",
    application: "支持酒店内部配送或物品交接流程",
    checks: "运营路线、位置、供电、网络、安全和人员责任",
    integration: "涉及电梯、门禁或平台的连接必须单独确认范围",
  },
  display: {
    label: "智能控制显示终端",
    application: "显示和操作项目批准的客房或智能空间功能",
    checks: "界面、语言、供电、底盒、通信和受控设备",
    integration: "与 RCU、HVAC、音频和窗帘的关系按型号及项目确认",
  },
};

const zhP1ProductSlugs = new Set([
  "hotel-smart-room-rcu-host-3",
  "hotel-delivery-robot-charging-dock",
  "hotel-smart-room-rcu-host-2",
  "smart-curtain-motor",
  "smart-four-key-curtain-control-panel",
  "smart-key-card-energy-saver-panel",
  "hotel-guest-room-doorbell",
  "hotel-room-door-magnetic-sensor",
  "embedded-human-presence-sensor",
  "hotel-smart-delivery-cabinet",
  "hotel-delivery-robot",
  "ai-music-control-panel",
  "thermostat-hvac-control-panel",
  "rotary-knob-smart-control-display",
  "ai-large-smart-display",
]);

const zhRemainingProductSlugs = new Set([
  "hotel-ceiling-background-speaker",
  "brushed-aluminum-voice-telephone-information-panel",
  "borui-red-matte-triple-socket-panel",
  "smart-series-dual-vertical-socket-panel",
  "smart-footlight-night-light-panel",
  "smart-three-key-music-control-panel",
  "smart-single-key-switch-panel",
  "smart-voice-telephone-information-socket",
  "brushed-aluminum-thermostat-control-panel",
  "brushed-aluminum-sos-alarm-panel",
  "vintage-gold-four-key-smart-switch-panel",
  "vintage-gold-key-card-energy-saver-panel",
  "borui-red-matte-room-status-four-key-switch-panel",
  "borui-red-matte-usb-five-hole-socket",
  "brushed-aluminum-86-base-doorbell-panel",
  "smart-usb-five-hole-socket",
  "infrared-repeater",
]);

const zhP1SolutionSlugs = new Set([
  "hotel-delivery-robot-solution",
  "ai-smart-display-solution",
]);

const zhRemainingSolutionSlugs = new Set([
  "hotel-guest-room-control-solution",
]);

const arP1ProductReviewSlugs = new Set([
  "hotel-smart-room-rcu-host-3",
  "hotel-delivery-robot-charging-dock",
  "hotel-smart-room-rcu-host-2",
  "smart-curtain-motor",
  "smart-four-key-curtain-control-panel",
  "smart-key-card-energy-saver-panel",
  "hotel-guest-room-doorbell",
  "hotel-room-door-magnetic-sensor",
  "embedded-human-presence-sensor",
  "hotel-smart-delivery-cabinet",
  "hotel-delivery-robot",
  "ai-music-control-panel",
  "thermostat-hvac-control-panel",
  "rotary-knob-smart-control-display",
  "ai-large-smart-display",
]);

function productPayload(
  locale: "ar" | "zh",
  product: (typeof m3aProductCatalog)[number],
) {
  const baseCopy =
    locale === "ar" ? arKindCopy[product.kind] : zhKindCopy[product.kind];
  const copy =
    locale === "ar"
      ? {
          ...baseCopy,
          label: product.arKindLabel ?? baseCopy.label,
          application: product.arApplication ?? baseCopy.application,
        }
      : baseCopy;
  const title = locale === "ar" ? product.arTitle : product.zhTitle;
  const detail = locale === "ar" ? product.arDetail : product.zhDetail;
  const productsHref = `/${locale}/products/`;
  const solutionsHref = `/${locale}/solutions/`;
  const contactHref = `/${locale}/contact/`;
  const usesZhRemainingReviewCopy =
    locale === "zh" && zhRemainingProductSlugs.has(product.slug);
  const usesZhReviewedCopy =
    locale === "zh" &&
    (zhP1ProductSlugs.has(product.slug) || usesZhRemainingReviewCopy);
  const usesArP1ReviewCopy =
    locale === "ar" && arP1ProductReviewSlugs.has(product.slug);
  const zhProductKindLabel = /^[A-Za-z0-9]/.test(copy.label)
    ? ` ${copy.label}`
    : copy.label;
  const zhReviewedChecks = usesZhRemainingReviewCopy
    ? `${/^[A-Za-z0-9]/.test(copy.checks) ? " " : ""}${copy.checks.replace(/([\u3400-\u9fff])((?:HVAC|RCU|GRMS|KNX|RS485|OEM|ODM)\b)/g, "$1 $2")}`
    : copy.checks;

  if (locale === "ar") {
    return defineCmsImportPayload({
      contentType: "product",
      sourceEnglishContentId: product.id,
      sourceEnglishSlug: product.slug,
      locale,
      translatedTitle: title,
      translatedDescription: `${detail} يجب تأكيد المواصفات الكهربائية والاتصال والتركيب وفق الطراز ووثائق المشروع.`,
      translatedSpecifications: [
        { label: "نوع المنتج", value: copy.label },
        { label: "الاستخدام المقصود", value: copy.application },
        { label: "بيانات التحقق", value: copy.checks },
        { label: "التكامل", value: copy.integration },
      ],
      translatedSeoTitle: `${title} | شراء وتجهيز مشروعات الفنادق`,
      translatedMetaDescription: `${detail} راجع متطلبات التركيب والتكامل والكمية والتخصيص قبل طلب عرض السعر.`,
      translatedStructuredContent: {
        eyebrow: copy.label,
        h1: title,
        introduction: `${detail} تُستخدم هذه الصفحة لتقييم المنتج نفسه ضمن مشروع فندقي أو سكني ذكي، وليس لاستنتاج نظام كامل من اسم الطراز. قبل الاختيار، يجب مطابقة المنتج مع وظيفة الموقع والرسومات والطاقة والأسلاك والواجهات والكمية والتسليم.`,
        breadcrumbLabel: title,
        parentBreadcrumb: { label: "المنتجات", href: productsHref },
        sections: [
          {
            heading: "دور المنتج في المشروع",
            paragraphs: [
              usesArP1ReviewCopy
                ? `يندرج هذا المنتج ضمن فئة ${copy.label}، ويُستخدم في ${copy.application}. يجب تحديد دوره في جدول الغرفة أو قائمة الأجهزة حتى تتضح للمقاول ومتكامل الأنظمة حدود التوريد والتركيب والاختبار.`
                : `${title} هو ${copy.label} يخدم ${copy.application}. يجب تعريف وظيفته في جدول الغرفة أو قائمة الأجهزة حتى يعرف المقاول ومتكامل الأنظمة حدود التوريد والتركيب والاختبار.`,
            ],
          },
          {
            heading: "ما يجب تأكيده قبل الاختيار",
            paragraphs: [
              `راجع ${copy.checks}. لا تستخدم مواصفات منتج آخر أو صورة الواجهة كدليل على الجهد أو البروتوكول أو السعة أو التوافق.`,
            ],
          },
          {
            heading: "التركيب والتكامل",
            paragraphs: [
              `${copy.integration}. يجب أن توضح الرسومات موقع الجهاز والطاقة والكابلات والأطراف ومسؤولية التهيئة والاختبار والصيانة.`,
            ],
          },
          {
            heading: "الشراء والتخصيص والوثائق",
            paragraphs: [
              "أرسل الكمية ونوع المشروع والرسومات والوظائف والجهد والواجهات والتشطيب والموعد. يمكن مناقشة الملصقات والتغليف والعلامة وOEM/ODM حسب فئة المنتج، بينما تُراجع العينة والوثائق والشروط قبل الإنتاج.",
            ],
          },
        ],
        faqs: [
          {
            question:
              product.arFaqQuestion ??
              (usesArP1ReviewCopy
                ? "ما الاستخدام الأساسي لهذا المنتج؟"
                : `ما الاستخدام الأساسي لـ${title}؟`),
            answer: detail,
          },
          {
            question: "هل يمكن تأكيد الجهد أو البروتوكول من اسم المنتج؟",
            answer: "لا. تُعتمد المواصفات الكهربائية والاتصال والسعة من وثائق الطراز ومتطلبات المشروع فقط.",
          },
          {
            question: "ما المعلومات المطلوبة لطلب عرض سعر؟",
            answer: `أرسل الكمية ونوع المشروع والرسومات والوظيفة المطلوبة، إضافة إلى ${copy.checks}.`,
          },
        ],
        relatedLinks: [
          {
            label: "جميع منتجات الفنادق",
            description: "قارن المنتج مع فئات الأجهزة الأخرى المتاحة للمشروع.",
            href: productsHref,
          },
          {
            label: "حلول الفندق والتحكم",
            description: "ضع المنتج داخل نطاق نظام ومشروع واضح.",
            href: solutionsHref,
          },
          {
            label: "إرسال متطلبات المنتج",
            description: "شارك الكمية والرسومات والتكامل والتخصيص.",
            href: contactHref,
          },
        ],
        cta: {
          heading: `تحقق من ${title} لمشروعك`,
          description: "أرسل الوظيفة والموقع والكمية والجهد والواجهات والتشطيب والموعد لمراجعة المنتج.",
          label: "طلب مراجعة وشراء المنتج",
          href: `${contactHref}#get-a-quote`,
          secondaryLabel: "عرض الحلول",
          secondaryHref: solutionsHref,
        },
        imageAlt: `${title} لمشروع غرفة فندق`,
      },
    });
  }

  return defineCmsImportPayload({
    contentType: "product",
    sourceEnglishContentId: product.id,
    sourceEnglishSlug: product.slug,
    locale,
    translatedTitle: title,
    translatedDescription: `${detail}具体电气、通信和安装条件应依据型号及项目资料确认。`,
    translatedSpecifications: [
      { label: "产品类型", value: copy.label },
      { label: "适用场景", value: copy.application },
      { label: "选型核对", value: copy.checks },
      { label: "系统集成", value: copy.integration },
    ],
    translatedSeoTitle: `${title}｜酒店工程选型与采购`,
    translatedMetaDescription: `${detail}采购前核对安装、接口、数量、定制和交付要求。`,
    translatedStructuredContent: {
      eyebrow: copy.label,
      h1: title,
      introduction: `${detail}本页用于评估具体产品在酒店或智能空间项目中的采购与应用，不把一个型号描述成完整系统。选型前应把产品与安装位置、功能表、图纸、供电、布线、接口、数量和交付要求逐项对应。`,
      breadcrumbLabel: title,
      parentBreadcrumb: { label: "产品", href: productsHref },
      sections: [
        {
          heading: "产品在项目中的职责",
          paragraphs: [
            usesZhReviewedCopy
              ? `本产品属于${zhProductKindLabel}，主要面向${copy.application}。应在客房功能表或设备清单中写明其职责，便于业主、承包商和系统集成商确认供货、安装和测试边界。`
              : `${title} 属于${copy.label}，主要面向${copy.application}。应在客房功能表或设备清单中写明其职责，便于业主、承包商和系统集成商确认供货、安装和测试边界。`,
          ],
        },
        {
          heading: "选型前需要确认",
          paragraphs: [
            `重点核对${zhReviewedChecks}。不能用其他型号参数或产品外观推断本产品的电压、协议、容量或兼容性。`,
          ],
        },
        {
          heading: "安装与系统关系",
          paragraphs: [
            `${copy.integration}。工程图纸应标明设备位置、供电、线缆、端子以及配置、联调和维护责任。`,
          ],
        },
        {
          heading: "采购、定制与资料",
          paragraphs: [
            "询价时请提供数量、项目类型、图纸、功能、电压、接口、表面和交期。标识、包装、品牌及 OEM/ODM 可根据产品类别讨论，样品、技术资料和商务条件应在量产前确认。",
          ],
        },
      ],
      faqs: [
        {
          question: usesZhReviewedCopy
            ? "这款产品的主要用途是什么？"
            : `${title} 的主要用途是什么？`,
          answer: detail,
        },
        {
          question: "能否从产品名称判断电压或通信协议？",
          answer: "不能。电气规格、协议、容量和兼容性必须依据具体型号资料及项目要求确认。",
        },
        {
          question: "询价需要提供哪些资料？",
          answer: `请提供数量、项目类型、图纸、目标功能，并说明${zhReviewedChecks}。`,
        },
      ],
      relatedLinks: [
        {
          label: "全部酒店产品",
          description: "将本产品与其他客房设备类别进行比较。",
          href: productsHref,
        },
        {
          label: "酒店控制解决方案",
          description: "在明确的系统和项目范围内规划产品。",
          href: solutionsHref,
        },
        {
          label: "提交产品需求",
          description: "发送数量、图纸、接口和定制要求。",
          href: contactHref,
        },
      ],
      cta: {
        heading: usesZhReviewedCopy
          ? "核对本产品的项目条件"
          : `核对${title}的项目条件`,
        description: "请提供功能、位置、数量、电压、接口、表面和交期，以便进行产品审核。",
        label: "咨询产品选型与采购",
        href: `${contactHref}#get-a-quote`,
        secondaryLabel: "查看解决方案",
        secondaryHref: solutionsHref,
      },
      imageAlt: usesZhReviewedCopy
        ? `用于酒店工程的${title}`
        : `酒店工程用${title}`,
    },
  });
}

function solutionPayload(
  locale: "ar" | "zh",
  solution: (typeof m3aSolutionCatalog)[number],
) {
  const title = locale === "ar" ? solution.arTitle : solution.zhTitle;
  const summary = locale === "ar" ? solution.arSummary : solution.zhSummary;
  const solutionsHref = `/${locale}/solutions/`;
  const productsHref = `/${locale}/products/`;
  const contactHref = `/${locale}/contact/`;
  const usesZhReviewedCopy =
    locale === "zh" &&
    (zhP1SolutionSlugs.has(solution.slug) ||
      zhRemainingSolutionSlugs.has(solution.slug));

  if (locale === "ar") {
    return defineCmsImportPayload({
      contentType: "solution",
      sourceEnglishContentId: solution.id,
      sourceEnglishSlug: solution.slug,
      locale,
      translatedTitle: title,
      translatedDescription: summary,
      translatedSpecifications: [
        { label: "نوع الحل", value: title },
        { label: "مدخلات التخطيط", value: "السيناريو والرسومات والأجهزة والواجهات والكمية" },
        { label: "المخرجات", value: "نطاق أجهزة ومسؤوليات وتحقق متفق عليه" },
        { label: "التكامل", value: "يُؤكد حسب المشروع والأنظمة الفعلية" },
      ],
      translatedSeoTitle: `${title} | تخطيط مشروعات الفنادق`,
      translatedMetaDescription: `${summary} راجع الأجهزة والواجهات والمسؤوليات والتسليم قبل الشراء.`,
      translatedStructuredContent: {
        eyebrow: "حل هندسي لمشروعات الفنادق",
        h1: title,
        introduction: `${summary} يبدأ الحل من متطلبات المشروع الحقيقية، ثم يحدد الأجهزة والواجهات والأسلاك والبرمجيات ومسؤولية التركيب والاختبار. لا تُضاف وظيفة أو بروتوكول أو نتيجة أداء من دون وثيقة أو تحقق خاص بالمشروع.`,
        breadcrumbLabel: title,
        parentBreadcrumb: { label: "الحلول", href: solutionsHref },
        sections: [
          {
            heading: "هدف الحل ونطاقه",
            paragraphs: [
              "حدّد نوع الفندق أو المساحة وسيناريو التشغيل والوظائف الإلزامية والأفكار الاختيارية. يساعد هذا الفصل على منع شراء أجهزة لا تخدم رحلة النزيل أو تشغيل الفندق.",
            ],
          },
          {
            heading: "الأجهزة والواجهات",
            paragraphs: [
              "أنشئ قائمة بالأجهزة ومصدر كل إشارة ووجهتها، ثم وثّق الطاقة والكابلات والشبكة والبروتوكول والبوابة والمسؤول عن كل واجهة. لا يعني وجود منتجين في الحل أنهما متوافقان تلقائياً.",
            ],
          },
          {
            heading: "التصميم والتحقق",
            paragraphs: [
              "استخدم الرسومات وجدول النقاط ومصفوفة الوظائف وعينة أو منطقة نموذجية للتحقق من التركيب والمنطق وتجربة الاستخدام قبل تجميد التكوين للكميات.",
            ],
          },
          {
            heading: "الشراء والتسليم",
            paragraphs: [
              "يجب أن يوضح طلب العرض الكمية والمراحل والمنتجات والتخصيص والوثائق والاختبار والتدريب والدعم. تعتمد المدة والشروط على النطاق الفعلي ولا تُفترض من صفحة عامة.",
            ],
          },
        ],
        faqs: [
          {
            question: `ما الذي يشمله ${title}؟`,
            answer: "يشمل فقط الأجهزة والواجهات والخدمات التي يعتمدها نطاق المشروع بعد مراجعة المتطلبات والرسومات.",
          },
          {
            question: "هل جميع الأجهزة والأنظمة متوافقة تلقائياً؟",
            answer: "لا. يجب توثيق كل واجهة وبروتوكول وبوابة ومسؤولية واختبارها مع الأنظمة الفعلية.",
          },
          {
            question: "ما المطلوب لبدء مراجعة الحل؟",
            answer: "أرسل نوع المشروع والرسومات والسيناريوهات والأجهزة والواجهات والكمية والموعد ونطاق التخصيص.",
          },
        ],
        relatedLinks: [
          { label: "كل الحلول", description: "قارن مسارات المشروع المتاحة.", href: solutionsHref },
          { label: "منتجات الفندق", description: "راجع الأجهزة التي قد تدخل في النطاق.", href: productsHref },
          { label: "إرسال بيانات المشروع", description: "شارك الرسومات والمتطلبات والكمية.", href: contactHref },
        ],
        cta: {
          heading: `حدّد نطاق ${title}`,
          description: "أرسل السيناريوهات والرسومات والأجهزة والواجهات والكمية لتكوين مراجعة قابلة للتحقق.",
          label: "مناقشة الحل",
          href: `${contactHref}#get-a-quote`,
          secondaryLabel: "عرض المنتجات",
          secondaryHref: productsHref,
        },
      },
    });
  }

  return defineCmsImportPayload({
    contentType: "solution",
    sourceEnglishContentId: solution.id,
    sourceEnglishSlug: solution.slug,
    locale,
    translatedTitle: title,
    translatedDescription: summary,
    translatedSpecifications: [
      { label: "方案类型", value: title },
      { label: "规划输入", value: "场景、图纸、设备、接口、数量" },
      { label: "方案输出", value: "经确认的设备范围、责任边界与验证计划" },
      { label: "系统集成", value: "依据项目和真实系统逐项确认" },
    ],
    translatedSeoTitle: `${title}｜酒店工程规划与采购`,
    translatedMetaDescription: `${summary} 采购前明确设备、接口、工程责任和交付范围。`,
    translatedStructuredContent: {
      eyebrow: "酒店工程解决方案",
      h1: title,
      introduction: `${summary} 方案应从真实项目需求出发，再界定设备、接口、布线、软件以及安装和测试责任。没有项目资料支持时，不增加协议、功能或性能结论。`,
      breadcrumbLabel: title,
      parentBreadcrumb: { label: "解决方案", href: solutionsHref },
      sections: [
        {
          heading: "方案目标与边界",
          paragraphs: [
            "先明确酒店或空间类型、运营场景、必需功能和可选设想，避免采购与住客旅程或酒店运营无关的设备。",
          ],
        },
        {
          heading: "设备和系统接口",
          paragraphs: [
            "建立设备清单，标明每个信号的来源和去向，并记录供电、线缆、网络、协议、网关及责任方。出现在同一方案中的产品不代表天然兼容。",
          ],
        },
        {
          heading: "设计与验证",
          paragraphs: [
            "使用图纸、点表、功能矩阵和样品或样板区域验证安装、控制逻辑和使用体验，再冻结批量配置。",
          ],
        },
        {
          heading: "采购与交付",
          paragraphs: [
            "询价文件应说明数量、阶段、产品、定制、资料、测试、培训和支持范围。周期与商务条件取决于真实范围，不能从通用页面推断。",
          ],
        },
      ],
      faqs: [
        {
          question: usesZhReviewedCopy
            ? `${title}包含哪些内容？`
            : `${title} 包含哪些内容？`,
          answer: "仅包含在审核需求和图纸后由项目范围明确批准的设备、接口和服务。",
        },
        {
          question: "方案内的设备和系统是否自动兼容？",
          answer: "不是。每个接口、协议、网关和责任都需要记录，并使用真实系统进行验证。",
        },
        {
          question: "开始方案审核需要什么资料？",
          answer: "请提供项目类型、图纸、场景、设备、接口、数量、时间和定制范围。",
        },
      ],
      relatedLinks: [
        { label: "全部解决方案", description: "比较不同项目路径。", href: solutionsHref },
        { label: "酒店产品", description: "查看可能纳入方案的设备。", href: productsHref },
        { label: "提交项目资料", description: "发送图纸、需求和数量。", href: contactHref },
      ],
      cta: {
        heading: usesZhReviewedCopy
          ? "明确该解决方案的项目范围"
          : `明确${title}的项目范围`,
        description: "提供场景、图纸、设备、接口和数量，形成可验证的方案审核。",
        label: "咨询解决方案",
        href: `${contactHref}#get-a-quote`,
        secondaryLabel: "浏览产品",
        secondaryHref: productsHref,
      },
    },
  });
}

const existingArProducts = new Set([
  "hotel-smart-room-rcu-host-1",
  "rcu-controller-cabinet",
  "86-type-ai-smart-control-display",
]);
const existingZhProducts = new Set([
  "hotel-smart-room-rcu-host-1",
  "rcu-controller-cabinet",
  "86-type-ai-smart-control-display",
  "smart-four-key-scene-control-panel",
]);
const existingArSolutions = new Set([
  "rcu-room-control-solution",
  "smart-hotel-automation-solution",
  "hotel-guest-room-control-solution",
]);
const existingZhSolutions = new Set([
  "oem-odm-custom-panel-solution",
  "rcu-room-control-solution",
  "smart-hotel-automation-solution",
]);

export const arM3aCmsImportPayload = [
  ...m3aProductCatalog
    .filter((entry) => !existingArProducts.has(entry.slug))
    .map((entry) => productPayload("ar", entry)),
  ...m3aSolutionCatalog
    .filter((entry) => !existingArSolutions.has(entry.slug))
    .map((entry) => solutionPayload("ar", entry)),
] as const;

export const zhM3aCmsImportPayload = [
  ...m3aProductCatalog
    .filter((entry) => !existingZhProducts.has(entry.slug))
    .map((entry) => productPayload("zh", entry)),
  ...m3aSolutionCatalog
    .filter((entry) => !existingZhSolutions.has(entry.slug))
    .map((entry) => solutionPayload("zh", entry)),
] as const;

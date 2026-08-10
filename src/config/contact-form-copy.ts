import {
  customerTypeOptions,
  productInterestOptions,
} from "@/config/brand";

const projectStageOptions = [
  "Early research",
  "Specification and design",
  "Quotation and supplier selection",
  "Sample evaluation",
  "Procurement",
  "Renovation or replacement",
] as const;

const chineseCustomerTypeLabels = [
  "酒店业主 / 开发商",
  "承包商",
  "系统集成商",
  "分销商 / 批发商",
  "OEM / ODM 买家",
  "智能家居安装商",
  "其他",
] as const;

const chineseProductInterestLabels = [
  "智能面板与开关",
  "AI 智能显示屏",
  "RCU 客房控制主机",
  "传感器",
  "智能插座与电源模块",
  "HVAC 与温控器",
  "窗帘控制面板",
  "房态与酒店服务面板",
  "酒店配送机器人系统",
  "OEM / ODM 定制产品",
  "其他",
] as const;

const chineseProjectStageLabels = [
  "前期调研",
  "规格与设计",
  "报价与供应商选择",
  "样品评估",
  "采购",
  "改造或更换",
] as const;

const arabicCustomerTypeLabels = [
  "مالك فندق / مطور",
  "مقاول",
  "متكامل أنظمة",
  "موزع / تاجر جملة",
  "مشتري OEM / ODM",
  "فني منزل ذكي",
  "أخرى",
] as const;

const arabicProductInterestLabels = [
  "اللوحات والمفاتيح الذكية",
  "شاشات التحكم الذكية",
  "مضيفات التحكم بالغرفة RCU",
  "المستشعرات",
  "المقابس الذكية ووحدات الطاقة",
  "HVAC والثرموستات",
  "لوحات التحكم في الستائر",
  "لوحات حالة الغرفة وخدمات الفندق",
  "نظام روبوت التوصيل الفندقي",
  "منتجات OEM / ODM المخصصة",
  "أخرى",
] as const;

const arabicProjectStageLabels = [
  "بحث أولي",
  "المواصفات والتصميم",
  "عرض السعر واختيار المورد",
  "تقييم العينة",
  "الشراء",
  "التجديد أو الاستبدال",
] as const;

export const contactFormOptions = {
  customerTypes: customerTypeOptions.map((value, index) => ({
    value,
    zhLabel: chineseCustomerTypeLabels[index],
    arLabel: arabicCustomerTypeLabels[index],
  })),
  productInterests: productInterestOptions.map((value, index) => ({
    value,
    zhLabel: chineseProductInterestLabels[index],
    arLabel: arabicProductInterestLabels[index],
  })),
  projectStages: projectStageOptions.map((value, index) => ({
    value,
    zhLabel: chineseProjectStageLabels[index],
    arLabel: arabicProjectStageLabels[index],
  })),
} as const;

export const chineseContactFormCopy = {
  contextEyebrow: "询盘来源",
  directContext: "直接联系询盘",
  sourceLabel: "来源",
  name: "姓名 *",
  company: "公司",
  email: "电子邮箱 *",
  phone: "WhatsApp / 电话",
  country: "国家 / 地区 *",
  customerType: "客户类型 *",
  selectCustomerType: "请选择客户类型",
  projectStage: "项目阶段",
  selectProjectStage: "请选择项目阶段",
  targetDelivery: "目标交付时间",
  targetDeliveryPlaceholder: "例如：2026 年 10 月",
  productInterest: "关注产品 *",
  selectProductInterest: "请至少选择一个关注产品。",
  quantity: "预计数量",
  quantityPlaceholder: "例如：100 套 / 300 间客房 / 1 个酒店项目",
  website: "网站",
  message: "留言 *",
  filesTitle: "项目文件（可选）",
  filesHelp:
    "本网站不上传文件。邮件草稿打开后，请在邮件应用中手动添加图纸、产品清单、BOM 或项目要求；文件类型和大小限制由您的邮件服务商决定。",
  submitting: "正在提交询盘...",
  preparing: "正在准备邮件草稿...",
  submit: "提交项目询盘",
  prepare: "准备邮件草稿",
  fallbackServer: "如果服务器提交暂时不可用，请使用",
  fallbackMailto: "邮件发送尚未配置。本表单会打开发送至以下地址的邮件草稿：",
  fallbackReview:
    "。请自行检查并发送草稿；如有需要，请在邮件应用中手动添加项目文件，或使用",
  draftReady:
    "已请求打开邮件草稿。请检查内容、添加所需文件，并在邮件应用中点击发送。本网站尚未发送或投递您的询盘。",
  accepted:
    "您的询盘已被系统接受并进入投递流程。这表示服务器已接受，不代表收件箱已送达；我们将通过您提供的联系方式跟进。",
  genericError:
    "无法打开邮件应用。您填写的内容仍保留在页面上；请使用上方销售邮箱或 WhatsApp，或再次准备邮件草稿。",
  productMessage: (productName: string) =>
    `我对 ${productName} 感兴趣，请提供报价资料。`,
  attributedMessage: (sourceTitle: string) =>
    `我想咨询与 ${sourceTitle} 相关的项目。`,
  whatsappMessage: "您好 DUALCORE LINK，我想讨论一个 B2B 项目。",
  whatsappLabel: "WhatsApp",
} as const;

export const arabicContactFormCopy = {
  contextEyebrow: "سياق الاستفسار",
  directContext: "استفسار اتصال مباشر",
  sourceLabel: "المصدر",
  name: "الاسم *",
  company: "الشركة",
  email: "البريد الإلكتروني *",
  phone: "WhatsApp / الهاتف",
  country: "الدولة / المنطقة *",
  customerType: "نوع العميل *",
  selectCustomerType: "اختر نوع العميل",
  projectStage: "مرحلة المشروع",
  selectProjectStage: "اختر مرحلة المشروع",
  targetDelivery: "موعد التسليم المستهدف",
  targetDeliveryPlaceholder: "مثال: أكتوبر 2026",
  productInterest: "المنتجات المطلوبة *",
  selectProductInterest: "اختر منتجاً واحداً على الأقل.",
  quantity: "الكمية التقديرية",
  quantityPlaceholder: "مثال: 100 مجموعة / 300 غرفة / مشروع فندق واحد",
  website: "الموقع",
  message: "الرسالة *",
  filesTitle: "ملفات المشروع (اختياري)",
  filesHelp: "لا يرفع الموقع الملفات. بعد فتح مسودة البريد، أرفق الرسومات أو قائمة المنتجات أو BOM يدوياً في تطبيق البريد.",
  submitting: "جارٍ إرسال الاستفسار...",
  preparing: "جارٍ تجهيز مسودة البريد...",
  submit: "إرسال استفسار المشروع",
  prepare: "تجهيز مسودة البريد",
  fallbackServer: "إذا تعذر الإرسال عبر الخادم، استخدم",
  fallbackMailto: "يفتح هذا النموذج مسودة بريد إلى",
  fallbackReview: ". راجع المسودة وأرسلها بنفسك أو استخدم",
  draftReady: "طُلب فتح مسودة البريد. راجعها وأرفق الملفات ثم اضغط إرسال؛ لم يرسل الموقع الاستفسار بعد.",
  accepted: "قَبِل الخادم الاستفسار للتسليم، وهذا لا يضمن وصوله إلى صندوق الوارد.",
  genericError: "تعذر فتح تطبيق البريد. بقيت البيانات في النموذج؛ استخدم البريد أو WhatsApp أو حاول مرة أخرى.",
  productMessage: (productName: string) => `أرغب في الحصول على عرض سعر للمنتج ${productName}.`,
  attributedMessage: (sourceTitle: string) => `أود مناقشة مشروع متعلق بـ ${sourceTitle}.`,
  whatsappMessage: "مرحباً DUALCORE LINK، أود مناقشة مشروع B2B.",
  whatsappLabel: "WhatsApp",
} as const;

export { projectStageOptions };

import {
  customerTypeOptions,
  productInterestOptions,
} from "@/config/brand";
import { isFinalReviewLocale, type FinalReviewLocale } from "@/content/locales/m4a-specialized-ui";

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

const vietnameseCustomerTypeLabels = [
  "Chủ đầu tư / nhà phát triển khách sạn",
  "Nhà thầu",
  "Đơn vị tích hợp hệ thống",
  "Nhà phân phối / bán buôn",
  "Bên mua OEM / ODM",
  "Đơn vị lắp đặt nhà thông minh",
  "Khác",
] as const;

const vietnameseProductInterestLabels = [
  "Bảng điều khiển và công tắc thông minh",
  "Màn hình điều khiển thông minh AI",
  "Bộ điều khiển phòng RCU",
  "Cảm biến",
  "Ổ cắm thông minh và mô-đun nguồn",
  "Điều khiển HVAC và bộ điều nhiệt",
  "Bảng điều khiển rèm",
  "Bảng trạng thái phòng và dịch vụ khách sạn",
  "Hệ thống robot giao hàng khách sạn",
  "Sản phẩm tùy chỉnh OEM / ODM",
  "Khác",
] as const;

const vietnameseProjectStageLabels = [
  "Nghiên cứu ban đầu",
  "Đặc tả và thiết kế",
  "Báo giá và lựa chọn nhà cung cấp",
  "Đánh giá mẫu",
  "Mua sắm",
  "Cải tạo hoặc thay thế",
] as const;

type FinalReviewOptionGroup = "customerTypes" | "productInterests" | "projectStages";

const finalReviewOptionLabels: Record<
  FinalReviewLocale,
  Record<FinalReviewOptionGroup, readonly string[]>
> = {
  de: {
    customerTypes: ["Hotelbetreiber / Entwickler", "Auftragnehmer", "Systemintegrator", "Distributor / Großhändler", "OEM / ODM-Einkäufer", "Smart-Home-Installateur", "Andere"],
    productInterests: ["Intelligente Panels und Schalter", "AI-Displays", "RCU-Raumsteuerungen", "Sensoren", "Steckdosen und Leistungsmodule", "HVAC und Thermostate", "Vorhangsteuerung", "Zimmerstatus- und Service-Panels", "Hotel-Servicerobotersystem", "OEM / ODM-Produkte", "Andere"],
    projectStages: ["Erste Recherche", "Spezifikation und Planung", "Angebot und Lieferantenauswahl", "Musterbewertung", "Beschaffung", "Renovierung oder Austausch"],
  },
  es: {
    customerTypes: ["Propietario / promotor hotelero", "Contratista", "Integrador de sistemas", "Distribuidor / mayorista", "Comprador OEM / ODM", "Instalador de hogar inteligente", "Otro"],
    productInterests: ["Paneles e interruptores inteligentes", "Pantallas inteligentes con IA", "Controladores RCU", "Sensores", "Tomas y módulos de potencia", "HVAC y termostatos", "Control de cortinas", "Paneles de estado y servicio", "Robot de servicio hotelero", "Productos OEM / ODM", "Otro"],
    projectStages: ["Investigación inicial", "Especificación y diseño", "Cotización y selección", "Evaluación de muestras", "Compra", "Renovación o sustitución"],
  },
  fa: {
    customerTypes: ["مالک / توسعه‌دهنده هتل", "پیمانکار", "یکپارچه‌ساز سیستم", "توزیع‌کننده / عمده‌فروش", "خریدار OEM / ODM", "نصاب خانه هوشمند", "سایر"],
    productInterests: ["پنل و کلید هوشمند", "نمایشگر هوشمند AI", "کنترلر اتاق RCU", "حسگر", "پریز و ماژول توان", "HVAC و ترموستات", "کنترل پرده", "پنل وضعیت و خدمات", "ربات خدمات هتل", "محصول OEM / ODM", "سایر"],
    projectStages: ["بررسی اولیه", "مشخصات و طراحی", "پیش‌فاکتور و انتخاب تأمین‌کننده", "ارزیابی نمونه", "خرید", "بازسازی یا جایگزینی"],
  },
};

export const contactFormOptions = {
  customerTypes: customerTypeOptions.map((value, index) => ({
    value,
    zhLabel: chineseCustomerTypeLabels[index],
    arLabel: arabicCustomerTypeLabels[index],
    viLabel: vietnameseCustomerTypeLabels[index],
  })),
  productInterests: productInterestOptions.map((value, index) => ({
    value,
    zhLabel: chineseProductInterestLabels[index],
    arLabel: arabicProductInterestLabels[index],
    viLabel: vietnameseProductInterestLabels[index],
  })),
  projectStages: projectStageOptions.map((value, index) => ({
    value,
    zhLabel: chineseProjectStageLabels[index],
    arLabel: arabicProjectStageLabels[index],
    viLabel: vietnameseProjectStageLabels[index],
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
  quantityPlaceholder: "مثال: 100 وحدة / 300 غرفة / مشروع فندقي واحد",
  website: "الموقع",
  message: "الرسالة *",
  filesTitle: "ملفات المشروع (اختياري)",
  filesHelp: "لا تُرفع الملفات عبر الموقع. بعد فتح مسودة البريد، أرفق الرسومات أو قائمة المنتجات أو BOM يدوياً في تطبيق البريد.",
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

export const vietnameseContactFormCopy = {
  contextEyebrow: "Nguồn yêu cầu",
  directContext: "Liên hệ trực tiếp",
  sourceLabel: "Nguồn",
  name: "Họ và tên *",
  company: "Công ty",
  email: "Email *",
  phone: "WhatsApp / Điện thoại",
  country: "Quốc gia / Khu vực *",
  customerType: "Loại khách hàng *",
  selectCustomerType: "Chọn loại khách hàng",
  projectStage: "Giai đoạn dự án",
  selectProjectStage: "Chọn giai đoạn dự án",
  targetDelivery: "Thời gian giao hàng mục tiêu",
  targetDeliveryPlaceholder: "Ví dụ: tháng 10 năm 2026",
  productInterest: "Sản phẩm quan tâm *",
  selectProductInterest: "Chọn ít nhất một nhóm sản phẩm.",
  quantity: "Số lượng dự kiến",
  quantityPlaceholder: "Ví dụ: 100 bộ / 300 phòng / 1 dự án khách sạn",
  website: "Website",
  message: "Nội dung yêu cầu *",
  filesTitle: "Tệp dự án (không bắt buộc)",
  filesHelp:
    "Website không tải tệp lên. Sau khi bản nháp email mở, hãy đính kèm bản vẽ, danh mục sản phẩm, BOM hoặc yêu cầu dự án trong ứng dụng email.",
  submitting: "Đang gửi yêu cầu...",
  preparing: "Đang chuẩn bị bản nháp email...",
  submit: "Gửi yêu cầu dự án",
  prepare: "Chuẩn bị bản nháp email",
  fallbackServer: "Nếu gửi qua máy chủ tạm thời không khả dụng, hãy dùng",
  fallbackMailto: "Biểu mẫu sẽ mở bản nháp email gửi đến",
  fallbackReview:
    ". Hãy kiểm tra và tự gửi bản nháp, đính kèm tệp dự án nếu cần hoặc dùng",
  draftReady:
    "Đã yêu cầu mở bản nháp email. Hãy kiểm tra nội dung, đính kèm tệp cần thiết và nhấn gửi trong ứng dụng email; website chưa gửi yêu cầu của bạn.",
  accepted:
    "Hệ thống đã tiếp nhận yêu cầu để chuyển tiếp. Trạng thái này không bảo đảm email đã vào hộp thư; chúng tôi sẽ liên hệ qua thông tin bạn cung cấp.",
  genericError:
    "Không thể mở ứng dụng email. Nội dung bạn nhập vẫn được giữ lại; hãy dùng email kinh doanh hoặc WhatsApp ở trên, hoặc thử chuẩn bị lại bản nháp.",
  productMessage: (productName: string) =>
    `Tôi quan tâm đến ${productName} và muốn nhận thông tin báo giá.`,
  attributedMessage: (sourceTitle: string) =>
    `Tôi muốn trao đổi về dự án liên quan đến ${sourceTitle}.`,
  whatsappMessage:
    "Xin chào DUALCORE LINK, tôi muốn trao đổi về một dự án B2B.",
  whatsappLabel: "WhatsApp",
} as const;

const finalReviewContactFormCopy = {
  de: { contextEyebrow: "Anfragequelle", directContext: "Direkte Kontaktanfrage", sourceLabel: "Quelle", name: "Name *", company: "Unternehmen", email: "E-Mail *", phone: "WhatsApp / Telefon", country: "Land / Region *", customerType: "Kundentyp *", selectCustomerType: "Kundentyp auswählen", projectStage: "Projektphase", selectProjectStage: "Projektphase auswählen", targetDelivery: "Gewünschter Liefertermin", targetDeliveryPlaceholder: "Beispiel: Oktober 2026", productInterest: "Produktinteresse *", selectProductInterest: "Mindestens eine Produktgruppe auswählen.", quantity: "Geschätzte Menge", quantityPlaceholder: "Beispiel: 100 Stück / 300 Zimmer", website: "Website", message: "Nachricht *", filesTitle: "Projektdateien (optional)", filesHelp: "Dateien werden nicht hochgeladen. Fügen Sie Zeichnungen, BOM oder Anforderungen im E-Mail-Programm hinzu.", submitting: "Anfrage wird gesendet...", preparing: "E-Mail-Entwurf wird vorbereitet...", submit: "Projektanfrage senden", prepare: "E-Mail-Entwurf vorbereiten", fallbackServer: "Falls die Serverübermittlung nicht verfügbar ist, nutzen Sie", fallbackMailto: "Dieses Formular öffnet einen E-Mail-Entwurf an", fallbackReview: ". Prüfen und senden Sie den Entwurf selbst oder nutzen Sie", draftReady: "Der E-Mail-Entwurf wurde angefordert. Die Website hat die Anfrage noch nicht versendet.", accepted: "Die Anfrage wurde vom Server angenommen; dies garantiert keine Zustellung im Posteingang.", genericError: "Die E-Mail-Anwendung konnte nicht geöffnet werden. Ihre Eingaben bleiben erhalten.", productMessage: (name: string) => `Ich interessiere mich für ${name} und bitte um Angebotsinformationen.`, attributedMessage: (title: string) => `Ich möchte ein Projekt zu ${title} besprechen.`, whatsappMessage: "Hallo DUALCORE LINK, ich möchte ein B2B-Projekt besprechen.", whatsappLabel: "WhatsApp" },
  es: { contextEyebrow: "Origen de la consulta", directContext: "Consulta de contacto directa", sourceLabel: "Origen", name: "Nombre *", company: "Empresa", email: "Correo electrónico *", phone: "WhatsApp / Teléfono", country: "País / Región *", customerType: "Tipo de cliente *", selectCustomerType: "Seleccione el tipo de cliente", projectStage: "Fase del proyecto", selectProjectStage: "Seleccione la fase", targetDelivery: "Entrega objetivo", targetDeliveryPlaceholder: "Ejemplo: octubre de 2026", productInterest: "Productos de interés *", selectProductInterest: "Seleccione al menos un grupo.", quantity: "Cantidad estimada", quantityPlaceholder: "Ejemplo: 100 unidades / 300 habitaciones", website: "Sitio web", message: "Mensaje *", filesTitle: "Archivos del proyecto (opcional)", filesHelp: "No se cargan archivos. Adjunte planos, BOM o requisitos en su aplicación de correo.", submitting: "Enviando consulta...", preparing: "Preparando borrador...", submit: "Enviar consulta del proyecto", prepare: "Preparar borrador de correo", fallbackServer: "Si el envío por servidor no está disponible, utilice", fallbackMailto: "Este formulario abre un borrador para", fallbackReview: ". Revise y envíe el borrador o utilice", draftReady: "Se solicitó el borrador. El sitio aún no ha enviado la consulta.", accepted: "El servidor aceptó la consulta; esto no garantiza su llegada al buzón.", genericError: "No se pudo abrir el correo. Los datos permanecen en el formulario.", productMessage: (name: string) => `Me interesa ${name} y deseo información de cotización.`, attributedMessage: (title: string) => `Quisiera consultar un proyecto relacionado con ${title}.`, whatsappMessage: "Hola DUALCORE LINK, quisiera consultar un proyecto B2B.", whatsappLabel: "WhatsApp" },
  fa: { contextEyebrow: "منبع درخواست", directContext: "درخواست تماس مستقیم", sourceLabel: "منبع", name: "نام *", company: "شرکت", email: "ایمیل *", phone: "واتساپ / تلفن", country: "کشور / منطقه *", customerType: "نوع مشتری *", selectCustomerType: "نوع مشتری را انتخاب کنید", projectStage: "مرحله پروژه", selectProjectStage: "مرحله پروژه را انتخاب کنید", targetDelivery: "زمان تحویل هدف", targetDeliveryPlaceholder: "نمونه: اکتبر ۲۰۲۶", productInterest: "محصول مورد نظر *", selectProductInterest: "حداقل یک گروه محصول انتخاب کنید.", quantity: "تعداد تقریبی", quantityPlaceholder: "نمونه: ۱۰۰ عدد / ۳۰۰ اتاق", website: "وب‌سایت", message: "پیام *", filesTitle: "فایل پروژه (اختیاری)", filesHelp: "فایلی بارگذاری نمی‌شود. نقشه، BOM یا نیازمندی را در برنامه ایمیل پیوست کنید.", submitting: "در حال ارسال...", preparing: "در حال آماده‌سازی پیش‌نویس...", submit: "ارسال درخواست پروژه", prepare: "آماده‌سازی پیش‌نویس ایمیل", fallbackServer: "اگر ارسال سرور در دسترس نبود، استفاده کنید از", fallbackMailto: "این فرم پیش‌نویس ایمیل را برای این نشانی باز می‌کند", fallbackReview: ". پیش‌نویس را بررسی و ارسال کنید یا استفاده کنید از", draftReady: "پیش‌نویس درخواست شد. وب‌سایت هنوز درخواست را ارسال نکرده است.", accepted: "سرور درخواست را پذیرفت؛ این به معنای تضمین تحویل در صندوق ورودی نیست.", genericError: "برنامه ایمیل باز نشد. اطلاعات فرم حفظ شده است.", productMessage: (name: string) => `به ${name} علاقه‌مندم و اطلاعات پیش‌فاکتور می‌خواهم.`, attributedMessage: (title: string) => `می‌خواهم درباره پروژه مرتبط با ${title} گفت‌وگو کنم.`, whatsappMessage: "سلام DUALCORE LINK، می‌خواهم درباره یک پروژه B2B گفت‌وگو کنم.", whatsappLabel: "واتساپ" },
} as const;

export function getFinalReviewContactFormCopy(locale: string) {
  return isFinalReviewLocale(locale) ? finalReviewContactFormCopy[locale] : null;
}

export function getFinalReviewContactOptionLabel(
  locale: string,
  group: FinalReviewOptionGroup,
  index: number,
  fallback: string,
): string {
  return isFinalReviewLocale(locale)
    ? finalReviewOptionLabels[locale][group][index] ?? fallback
    : fallback;
}

export { projectStageOptions };

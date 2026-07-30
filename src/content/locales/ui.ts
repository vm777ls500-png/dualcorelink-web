import type { Locale } from "@/config/i18n";

type UiMessages = {
  skipLink: string;
  homeLabel: string;
  primaryNavigationLabel: string;
  languageNavigationLabel: string;
  quote: string;
  navigation: {
    products: string;
    solutions: string;
    regions: string;
    faqs: string;
    about: string;
  };
  footer: {
    company: string;
    navigation: string;
    contact: string;
    whatsapp: string;
    projectInquiry: string;
    office: string;
    wechat: string;
    phone: string;
  };
};

const english: UiMessages = {
  skipLink: "Skip to main content",
  homeLabel: "DUALCORE LINK home",
  primaryNavigationLabel: "Primary",
  languageNavigationLabel: "Language",
  quote: "Get a Quote",
  navigation: {
    products: "Products",
    solutions: "Solutions",
    regions: "Regions",
    faqs: "FAQ",
    about: "About",
  },
  footer: {
    company: "Company",
    navigation: "Product Navigation",
    contact: "Get a Quote",
    whatsapp: "WhatsApp",
    projectInquiry: "Send Project Inquiry",
    office: "Office",
    wechat: "WeChat",
    phone: "Phone",
  },
};

const messages: Partial<Record<Locale, UiMessages>> = {
  ar: {
    skipLink: "الانتقال إلى المحتوى الرئيسي",
    homeLabel: "الصفحة التعريفية لـ DUALCORE LINK",
    primaryNavigationLabel: "التنقل الرئيسي",
    languageNavigationLabel: "اللغة",
    quote: "اطلب عرض سعر",
    navigation: {
      products: "المنتجات",
      solutions: "الحلول",
      regions: "الأسواق الإقليمية",
      faqs: "الأسئلة الشائعة",
      about: "من نحن",
    },
    footer: {
      company: "الشركة",
      navigation: "روابط المشروع",
      contact: "التواصل التجاري",
      whatsapp: "واتساب",
      projectInquiry: "إرسال استفسار مشروع",
      office: "المكتب",
      wechat: "WeChat",
      phone: "الهاتف",
    },
  },
  zh: {
    skipLink: "跳到主要内容",
    homeLabel: "DUALCORE LINK 公司介绍",
    primaryNavigationLabel: "主导航",
    languageNavigationLabel: "语言",
    quote: "获取项目报价",
    navigation: {
      products: "产品",
      solutions: "解决方案",
      regions: "区域市场",
      faqs: "常见问题",
      about: "关于我们",
    },
    footer: {
      company: "公司",
      navigation: "项目导航",
      contact: "商务联系",
      whatsapp: "WhatsApp",
      projectInquiry: "提交项目询盘",
      office: "办公地点",
      wechat: "微信",
      phone: "电话",
    },
  },
  de: {
    skipLink: "Zum Hauptinhalt springen",
    homeLabel: "Startseite von DUALCORE LINK",
    primaryNavigationLabel: "Hauptnavigation",
    languageNavigationLabel: "Sprache",
    quote: "Projektangebot anfragen",
    navigation: {
      products: "Produkte",
      solutions: "Lösungen",
      regions: "Regionale Projekte",
      faqs: "Häufige Fragen",
      about: "Über uns",
    },
    footer: {
      company: "Unternehmen",
      navigation: "Projektnavigation",
      contact: "Vertriebskontakt",
      whatsapp: "WhatsApp",
      projectInquiry: "Projektanfrage senden",
      office: "Büro",
      wechat: "WeChat",
      phone: "Telefon",
    },
  },
  es: {
    skipLink: "Saltar al contenido principal",
    homeLabel: "Inicio de DUALCORE LINK",
    primaryNavigationLabel: "Navegación principal",
    languageNavigationLabel: "Idioma",
    quote: "Solicitar cotización",
    navigation: {
      products: "Productos",
      solutions: "Soluciones",
      regions: "Proyectos regionales",
      faqs: "Preguntas frecuentes",
      about: "Quiénes somos",
    },
    footer: {
      company: "Empresa",
      navigation: "Navegación del proyecto",
      contact: "Contacto comercial",
      whatsapp: "WhatsApp",
      projectInquiry: "Enviar consulta del proyecto",
      office: "Oficina",
      wechat: "WeChat",
      phone: "Teléfono",
    },
  },
  vi: {
    skipLink: "Chuyển đến nội dung chính",
    homeLabel: "Trang chủ DUALCORE LINK",
    primaryNavigationLabel: "Điều hướng chính",
    languageNavigationLabel: "Ngôn ngữ",
    quote: "Yêu cầu báo giá",
    navigation: {
      products: "Sản phẩm",
      solutions: "Giải pháp",
      regions: "Dự án khu vực",
      faqs: "Câu hỏi thường gặp",
      about: "Giới thiệu",
    },
    footer: {
      company: "Công ty",
      navigation: "Điều hướng dự án",
      contact: "Liên hệ kinh doanh",
      whatsapp: "WhatsApp",
      projectInquiry: "Gửi yêu cầu dự án",
      office: "Văn phòng",
      wechat: "WeChat",
      phone: "Điện thoại",
    },
  },
  fa: {
    skipLink: "رفتن به محتوای اصلی",
    homeLabel: "صفحه اصلی DUALCORE LINK",
    primaryNavigationLabel: "پیمایش اصلی",
    languageNavigationLabel: "زبان",
    quote: "درخواست پیش‌فاکتور",
    navigation: {
      products: "محصولات",
      solutions: "راهکارها",
      regions: "پروژه‌های منطقه‌ای",
      faqs: "پرسش‌های متداول",
      about: "درباره ما",
    },
    footer: {
      company: "شرکت",
      navigation: "پیمایش پروژه",
      contact: "تماس فروش",
      whatsapp: "واتساپ",
      projectInquiry: "ارسال درخواست پروژه",
      office: "دفتر",
      wechat: "WeChat",
      phone: "تلفن",
    },
  },
};

export function getUiMessages(locale: Locale): UiMessages {
  return messages[locale] ?? english;
}

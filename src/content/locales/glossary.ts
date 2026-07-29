export type MultilingualGlossaryEntry = {
  english: string;
  ar: string;
  zh: string;
  de: string;
  es: string;
  vi: string;
  fa: string;
  usage: string;
};

export const multilingualGlossary: readonly MultilingualGlossaryEntry[] = [
  {
    english: "Hotel Room Control Unit",
    ar: "وحدة التحكم في غرفة الفندق (RCU)",
    zh: "酒店客房控制单元（RCU）",
    de: "Hotelzimmer-Steuereinheit (RCU)",
    es: "Unidad de control de habitación (RCU)",
    vi: "Bộ điều khiển phòng khách sạn (RCU)",
    fa: "واحد کنترل اتاق هتل (RCU)",
    usage: "Keep RCU in Latin letters after the localized term.",
  },
  {
    english: "Guest Room Management System",
    ar: "نظام إدارة غرف النزلاء (GRMS)",
    zh: "客房管理系统（GRMS）",
    de: "Gästezimmer-Managementsystem (GRMS)",
    es: "Sistema de gestión de habitaciones (GRMS)",
    vi: "Hệ thống quản lý phòng khách sạn (GRMS)",
    fa: "سامانه مدیریت اتاق مهمان (GRMS)",
    usage: "Use GRMS only when the source explicitly refers to the management system.",
  },
  {
    english: "Room Control System",
    ar: "نظام التحكم في الغرفة",
    zh: "客房控制系统",
    de: "Zimmersteuerungssystem",
    es: "Sistema de control de habitaciones",
    vi: "Hệ thống điều khiển phòng",
    fa: "سامانه کنترل اتاق",
    usage: "Use for the complete room-level control architecture.",
  },
  {
    english: "Smart Switch Panel",
    ar: "لوحة مفاتيح ذكية",
    zh: "智能开关面板",
    de: "Intelligentes Schaltpanel",
    es: "Panel de interruptores inteligente",
    vi: "Bảng công tắc thông minh",
    fa: "پنل کلید هوشمند",
    usage: "Use panel terminology, not a generic consumer smart switch term.",
  },
  {
    english: "Touch Panel",
    ar: "لوحة تحكم باللمس",
    zh: "触控面板",
    de: "Touch-Bedienfeld",
    es: "Panel táctil",
    vi: "Bảng điều khiển cảm ứng",
    fa: "پنل لمسی",
    usage: "Use for a wall interface operated through touch.",
  },
  {
    english: "Thermostat",
    ar: "منظّم حرارة",
    zh: "温控器",
    de: "Thermostat",
    es: "Termostato",
    vi: "Bộ điều nhiệt",
    fa: "ترموستات",
    usage: "Use HVAC context when the source relates it to room air conditioning.",
  },
  {
    english: "Occupancy Sensor",
    ar: "مستشعر إشغال الغرفة",
    zh: "客房占用传感器",
    de: "Belegungssensor",
    es: "Sensor de ocupación",
    vi: "Cảm biến hiện diện",
    fa: "حسگر اشغال اتاق",
    usage: "Do not imply a sensing technology that the source does not confirm.",
  },
  {
    english: "Doorplate / Room Display",
    ar: "لوحة الباب / شاشة رقم الغرفة",
    zh: "门牌／房号显示屏",
    de: "Türschild / Zimmeranzeige",
    es: "Placa de puerta / pantalla de habitación",
    vi: "Bảng cửa / màn hình số phòng",
    fa: "پلاک در / نمایشگر شماره اتاق",
    usage: "Choose the term that matches the actual entrance product.",
  },
  {
    english: "Hotel Renovation",
    ar: "تجديد الفندق",
    zh: "酒店改造",
    de: "Hotelmodernisierung",
    es: "Reforma hotelera",
    vi: "Cải tạo khách sạn",
    fa: "بازسازی هتل",
    usage: "Use for renovation and room-upgrade project contexts.",
  },
  {
    english: "OEM",
    ar: "OEM (تصنيع وفق متطلبات العلامة)",
    zh: "OEM（按品牌要求生产）",
    de: "OEM (Fertigung nach Markenanforderung)",
    es: "OEM (fabricación según requisitos de marca)",
    vi: "OEM (sản xuất theo yêu cầu thương hiệu)",
    fa: "OEM (تولید طبق نیاز برند)",
    usage: "Keep OEM in Latin letters.",
  },
  {
    english: "ODM",
    ar: "ODM (تصميم وتصنيع)",
    zh: "ODM（设计与制造）",
    de: "ODM (Entwicklung und Fertigung)",
    es: "ODM (diseño y fabricación)",
    vi: "ODM (thiết kế và sản xuất)",
    fa: "ODM (طراحی و تولید)",
    usage: "Keep ODM in Latin letters.",
  },
  {
    english: "Wiring Architecture",
    ar: "بنية التوصيلات",
    zh: "布线架构",
    de: "Verkabelungsarchitektur",
    es: "Arquitectura de cableado",
    vi: "Kiến trúc dây dẫn",
    fa: "معماری سیم‌کشی",
    usage: "Do not treat conceptual architecture as an installation drawing.",
  },
  {
    english: "Energy Management",
    ar: "إدارة الطاقة",
    zh: "能源管理",
    de: "Energiemanagement",
    es: "Gestión de energía",
    vi: "Quản lý năng lượng",
    fa: "مدیریت انرژی",
    usage: "Do not add savings percentages without verified evidence.",
  },
  {
    english: "System Integrator",
    ar: "متكامل الأنظمة",
    zh: "系统集成商",
    de: "Systemintegrator",
    es: "Integrador de sistemas",
    vi: "Đơn vị tích hợp hệ thống",
    fa: "یکپارچه‌ساز سامانه",
    usage: "Use for the B2B party responsible for system integration.",
  },
  {
    english: "Hotel Owner",
    ar: "مالك الفندق",
    zh: "酒店业主",
    de: "Hotelbetreiber",
    es: "Propietario del hotel",
    vi: "Chủ khách sạn",
    fa: "مالک هتل",
    usage: "Use for the project owner or hotel ownership representative.",
  },
  {
    english: "Project Contractor",
    ar: "مقاول المشروع",
    zh: "项目承包商",
    de: "Projektauftragnehmer",
    es: "Contratista del proyecto",
    vi: "Nhà thầu dự án",
    fa: "پیمانکار پروژه",
    usage: "Use for construction, MEP, or low-voltage project procurement context.",
  },
] as const;

export function getGlossaryTerm(
  english: string,
  locale: "ar" | "zh" | "de" | "es" | "vi" | "fa",
): string | undefined {
  return multilingualGlossary.find((entry) => entry.english === english)?.[
    locale
  ];
}

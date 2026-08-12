import type { Locale } from "@/config/i18n";
import type { M4aLocale } from "@/content/locales/m4a-locale-data";

export type FinalReviewLocale = Extract<M4aLocale, "de" | "es" | "fa">;

const finalReviewLocales: readonly FinalReviewLocale[] = ["de", "es", "fa"];

export function isFinalReviewLocale(locale: string): locale is FinalReviewLocale {
  return finalReviewLocales.includes(locale as FinalReviewLocale);
}

const categoryNames: Record<FinalReviewLocale, Record<string, string>> = {
  de: {
    "smart-panels-switches": "Intelligente Bedienfelder und Schalter",
    "ai-smart-displays": "Intelligente AI-Displays",
    "rcu-room-control-host": "RCU-Raumsteuerungen",
    sensors: "Sensoren",
    "smart-sockets-power-modules": "Intelligente Steckdosen und Leistungsmodule",
    "hvac-thermostat-control": "HVAC- und Thermostatsteuerung",
    "curtain-control-panels": "Vorhangsteuerungen",
    "room-status-hotel-service-panels": "Zimmerstatus- und Hotelservice-Panels",
    "hotel-audio-communication-devices": "Hotel-Audio- und Kommunikationsgeräte",
    "hotel-delivery-robot-system": "Hotel-Servicerobotersysteme",
  },
  es: {
    "smart-panels-switches": "Paneles e interruptores inteligentes",
    "ai-smart-displays": "Pantallas inteligentes con IA",
    "rcu-room-control-host": "Controladores de habitación RCU",
    sensors: "Sensores",
    "smart-sockets-power-modules": "Tomas inteligentes y módulos de potencia",
    "hvac-thermostat-control": "Control HVAC y termostatos",
    "curtain-control-panels": "Control de cortinas",
    "room-status-hotel-service-panels": "Paneles de estado y servicio hotelero",
    "hotel-audio-communication-devices": "Audio y comunicación para hoteles",
    "hotel-delivery-robot-system": "Sistemas de robots de servicio hotelero",
  },
  fa: {
    "smart-panels-switches": "پنل‌ها و کلیدهای هوشمند",
    "ai-smart-displays": "نمایشگرهای هوشمند مبتنی بر AI",
    "rcu-room-control-host": "کنترلرهای اتاق RCU",
    sensors: "حسگرها",
    "smart-sockets-power-modules": "پریزهای هوشمند و ماژول‌های توان",
    "hvac-thermostat-control": "کنترل HVAC و ترموستات",
    "curtain-control-panels": "کنترل پرده",
    "room-status-hotel-service-panels": "پنل‌های وضعیت اتاق و خدمات هتل",
    "hotel-audio-communication-devices": "تجهیزات صوتی و ارتباطی هتل",
    "hotel-delivery-robot-system": "سامانه ربات خدمات هتل",
  },
};

const seriesNames: Record<FinalReviewLocale, Record<string, string>> = {
  de: {
    "borui-series": "Borui-Serie",
    "vintage-series": "Vintage-Serie",
    "brushed-aluminum-series": "Serie aus gebürstetem Aluminium",
    "smart-series": "Smart-Serie",
  },
  es: {
    "borui-series": "Serie Borui",
    "vintage-series": "Serie Vintage",
    "brushed-aluminum-series": "Serie de aluminio cepillado",
    "smart-series": "Serie Smart",
  },
  fa: {
    "borui-series": "سری Borui",
    "vintage-series": "سری Vintage",
    "brushed-aluminum-series": "سری آلومینیوم برس‌خورده",
    "smart-series": "سری Smart",
  },
};

const labels: Record<FinalReviewLocale, Record<string, string>> = {
  de: {
    Home: "Startseite", Products: "Produkte", Product: "Produkt", Solutions: "Lösungen",
    Solution: "Lösung", Resources: "Fachratgeber", Regions: "Regionen", Contact: "Kontakt",
    New: "Neu", "Get a Quote": "Angebot anfragen", "Send Inquiry": "Anfrage senden",
    "Get a Quote on WhatsApp": "Angebot über WhatsApp anfragen", "View Details": "Details ansehen",
    "View Product": "Produkt ansehen", "View Solution": "Lösung ansehen", "Read Guide": "Ratgeber lesen",
    "Recommended Products": "Empfohlene Produkte", "Relevant Solutions": "Passende Lösungen",
    "Continue Reading": "Weiterlesen", "Project inquiry": "Projektanfrage",
    "Project consultation": "Projektberatung", "Contact Sales": "Vertrieb kontaktieren",
    "Product overview": "Produktübersicht", "Core functions": "Kernfunktionen",
    "Product features": "Produkteigenschaften", "Application scenarios": "Anwendungsszenarien",
    "Installation position": "Einbauposition", "Customization options": "Anpassungsoptionen",
    "Technical specifications": "Technische Spezifikationen", "Related products": "Ähnliche Produkte",
    "Frequently asked questions": "Häufige Fragen", "Commercial options": "Kaufoptionen",
    "Lead time": "Lieferzeit", "On request": "Auf Anfrage", Available: "Verfügbar",
    "Ask our team": "Unser Team fragen", Sample: "Muster", Warranty: "Garantie",
    "Private label": "Eigenmarke", Category: "Kategorie", Series: "Serie",
    "All Products": "Alle Produkte", "Product Categories": "Produktkategorien",
    "Product Series": "Produktserien", "Featured Products": "Ausgewählte Produkte",
    "Quick Access": "Schnellzugriff", Language: "Sprache", "Toggle Products menu": "Produktmenü öffnen",
    About: "Über uns", "New Products": "Neue Produkte", "OEM / ODM Products": "OEM-/ODM-Produkte",
    "View All Categories": "Alle Kategorien ansehen", "View All Products": "Alle Produkte ansehen",
    "Media ready": "Medien verfügbar", "Media preview unavailable": "Medienvorschau nicht verfügbar",
    "Image unavailable": "Bild nicht verfügbar", "Choose a product image": "Produktbild auswählen",
    "image gallery": "Bildergalerie", View: "Ansehen", Unavailable: "Nicht verfügbar",
    "Filtered product results": "Gefilterte Produktergebnisse", "View all products": "Alle Produkte ansehen",
    "No products found": "Keine Produkte gefunden",
    "Browse by Category": "Nach Kategorie filtern", "Browse by Series": "Nach Serie filtern",
    "Need a project product mix?": "Benötigen Sie eine Produktauswahl für Ihr Projekt?",
    "Explore Products": "Produkte entdecken", "View Solutions": "Lösungen ansehen",
    "Target markets": "Zielmärkte", "Regional Project Inquiry Support": "Unterstützung für regionale Projektanfragen",
    "Discuss Regional Project": "Regionales Projekt besprechen", "View Catalogs": "Fachratgeber ansehen",
    "Buyer FAQs": "Häufige Käuferfragen", "Featured guides": "Ausgewählte Ratgeber",
    "Request Datasheets": "Datenblätter anfordern", "Browse by project need": "Nach Projektbedarf filtern",
    Region: "Region", "Project market": "Projektmarkt", FAQ: "Häufige Fragen",
    Units: "Stück",
  },
  es: {
    Home: "Inicio", Products: "Productos", Product: "Producto", Solutions: "Soluciones",
    Solution: "Solución", Resources: "Guías técnicas", Regions: "Regiones", Contact: "Contacto",
    New: "Nuevo", "Get a Quote": "Solicitar cotización", "Send Inquiry": "Enviar consulta",
    "Get a Quote on WhatsApp": "Solicitar cotización por WhatsApp", "View Details": "Ver detalles",
    "View Product": "Ver producto", "View Solution": "Ver solución", "Read Guide": "Leer guía",
    "Recommended Products": "Productos recomendados", "Relevant Solutions": "Soluciones relacionadas",
    "Continue Reading": "Seguir leyendo", "Project inquiry": "Consulta del proyecto",
    "Project consultation": "Consultoría de proyecto", "Contact Sales": "Contactar con ventas",
    "Product overview": "Descripción del producto", "Core functions": "Funciones principales",
    "Product features": "Características del producto", "Application scenarios": "Escenarios de aplicación",
    "Installation position": "Posición de instalación", "Customization options": "Opciones de personalización",
    "Technical specifications": "Especificaciones técnicas", "Related products": "Productos relacionados",
    "Frequently asked questions": "Preguntas frecuentes", "Commercial options": "Opciones comerciales",
    "Lead time": "Plazo de entrega", "On request": "Bajo consulta", Available: "Disponible",
    "Ask our team": "Consultar al equipo", Sample: "Muestra", Warranty: "Garantía",
    "Private label": "Marca privada", Category: "Categoría", Series: "Serie",
    "All Products": "Todos los productos", "Product Categories": "Categorías de producto",
    "Product Series": "Series de producto", "Featured Products": "Productos destacados",
    "Quick Access": "Acceso rápido", Language: "Idioma", "Toggle Products menu": "Abrir menú de productos",
    About: "Quiénes somos", "New Products": "Productos nuevos", "OEM / ODM Products": "Productos OEM / ODM",
    "View All Categories": "Ver todas las categorías", "View All Products": "Ver todos los productos",
    "Media ready": "Imágenes disponibles", "Media preview unavailable": "Vista previa no disponible",
    "Image unavailable": "Imagen no disponible", "Choose a product image": "Elegir imagen del producto",
    "image gallery": "galería de imágenes", View: "Ver", Unavailable: "No disponible",
    "Filtered product results": "Resultados de productos filtrados", "View all products": "Ver todos los productos",
    "No products found": "No se encontraron productos",
    "Browse by Category": "Explorar por categoría", "Browse by Series": "Explorar por serie",
    "Need a project product mix?": "¿Necesita una combinación de productos para su proyecto?",
    "Explore Products": "Explorar productos", "View Solutions": "Ver soluciones",
    "Target markets": "Mercados objetivo", "Regional Project Inquiry Support": "Asistencia para consultas de proyectos regionales",
    "Discuss Regional Project": "Consultar un proyecto regional", "View Catalogs": "Ver guías técnicas",
    "Buyer FAQs": "Preguntas frecuentes de compradores", "Featured guides": "Guías destacadas",
    "Request Datasheets": "Solicitar fichas técnicas", "Browse by project need": "Explorar por necesidad del proyecto",
    Region: "Región", "Project market": "Mercado de proyectos", FAQ: "Preguntas frecuentes",
    Units: "unidades",
  },
  fa: {
    Home: "صفحه اصلی", Products: "محصولات", Product: "محصول", Solutions: "راهکارها",
    Solution: "راهکار", Resources: "راهنماهای فنی", Regions: "مناطق", Contact: "تماس",
    New: "جدید", "Get a Quote": "درخواست پیش‌فاکتور", "Send Inquiry": "ارسال درخواست",
    "Get a Quote on WhatsApp": "درخواست پیش‌فاکتور در واتساپ", "View Details": "مشاهده جزئیات",
    "View Product": "مشاهده محصول", "View Solution": "مشاهده راهکار", "Read Guide": "مطالعه راهنما",
    "Recommended Products": "محصولات پیشنهادی", "Relevant Solutions": "راهکارهای مرتبط",
    "Continue Reading": "ادامه مطالعه", "Project inquiry": "درخواست پروژه",
    "Project consultation": "مشاوره پروژه", "Contact Sales": "تماس با فروش",
    "Product overview": "معرفی محصول", "Core functions": "عملکردهای اصلی",
    "Product features": "ویژگی‌های محصول", "Application scenarios": "سناریوهای کاربرد",
    "Installation position": "محل نصب", "Customization options": "گزینه‌های سفارشی‌سازی",
    "Technical specifications": "مشخصات فنی", "Related products": "محصولات مرتبط",
    "Frequently asked questions": "پرسش‌های متداول", "Commercial options": "گزینه‌های تجاری",
    "Lead time": "زمان تحویل", "On request": "بنا بر درخواست", Available: "موجود برای سفارش",
    "Ask our team": "از تیم ما بپرسید", Sample: "نمونه", Warranty: "ضمانت",
    "Private label": "برند اختصاصی", Category: "دسته‌بندی", Series: "سری",
    "All Products": "همه محصولات", "Product Categories": "دسته‌بندی محصولات",
    "Product Series": "سری‌های محصول", "Featured Products": "محصولات منتخب",
    "Quick Access": "دسترسی سریع", Language: "زبان", "Toggle Products menu": "باز کردن منوی محصولات",
    About: "درباره ما", "New Products": "محصولات جدید", "OEM / ODM Products": "محصولات OEM / ODM",
    "View All Categories": "مشاهده همه دسته‌ها", "View All Products": "مشاهده همه محصولات",
    "Media ready": "تصاویر موجود است", "Media preview unavailable": "پیش‌نمایش تصویر موجود نیست",
    "Image unavailable": "تصویر موجود نیست", "Choose a product image": "انتخاب تصویر محصول",
    "image gallery": "گالری تصاویر", View: "مشاهده", Unavailable: "موجود نیست",
    "Filtered product results": "نتایج فیلترشده محصولات", "View all products": "مشاهده همه محصولات",
    "No products found": "محصولی یافت نشد",
    "Browse by Category": "مرور بر اساس دسته", "Browse by Series": "مرور بر اساس سری",
    "Need a project product mix?": "به ترکیب محصولات برای پروژه نیاز دارید؟",
    "Explore Products": "مشاهده محصولات", "View Solutions": "مشاهده راهکارها",
    "Target markets": "بازارهای هدف", "Regional Project Inquiry Support": "پشتیبانی درخواست پروژه منطقه‌ای",
    "Discuss Regional Project": "گفت‌وگو درباره پروژه منطقه‌ای", "View Catalogs": "مشاهده راهنماهای فنی",
    "Buyer FAQs": "پرسش‌های متداول خریداران", "Featured guides": "راهنماهای منتخب",
    "Request Datasheets": "درخواست دیتاشیت", "Browse by project need": "مرور بر اساس نیاز پروژه",
    Region: "منطقه", "Project market": "بازار پروژه", FAQ: "پرسش‌های متداول",
    Units: "عدد",
  },
};

const productFilterCopy: Record<FinalReviewLocale, {
  showing: (shown: number, total: number) => string;
  emptyDescription: string;
}> = {
  de: {
    showing: (shown, total) => `${shown} von ${total} Produkten werden angezeigt.`,
    emptyDescription: "Keine veröffentlichten Produkte entsprechen diesem Filter. Zeigen Sie alle Produkte an oder kontaktieren Sie unser Team für die Projektabstimmung.",
  },
  es: {
    showing: (shown, total) => `Se muestran ${shown} de ${total} productos.`,
    emptyDescription: "Ningún producto publicado coincide con este filtro. Consulte todos los productos o contacte con nuestro equipo para ajustar el proyecto.",
  },
  fa: {
    showing: (shown, total) => `${shown} مورد از ${total} محصول نمایش داده می‌شود.`,
    emptyDescription: "هیچ محصول منتشرشده‌ای با این فیلتر مطابقت ندارد. همه محصولات را ببینید یا برای تطبیق پروژه با تیم ما تماس بگیرید.",
  },
};

export function getM4aCategoryName(locale: Locale, slug: string, fallback: string): string {
  return isFinalReviewLocale(locale) ? categoryNames[locale][slug] ?? fallback : fallback;
}

export function getM4aSeriesName(locale: Locale, slug: string, fallback: string): string {
  return isFinalReviewLocale(locale) ? seriesNames[locale][slug] ?? fallback : fallback;
}

export function getSpecializedLabel(locale: Locale, english: string): string {
  return isFinalReviewLocale(locale) ? labels[locale][english] ?? english : english;
}

export function getFinalReviewProductFilterCopy(locale: Locale) {
  return isFinalReviewLocale(locale) ? productFilterCopy[locale] : undefined;
}

const finalReviewDynamicCopy: Record<FinalReviewLocale, {
  featuredImageAlt: (title: string) => string;
  galleryImageAlt: (title: string, position: number) => string;
  productProfileLabel: string;
  productWhatsApp: (title: string) => string;
  resourceWhatsApp: (title: string) => string;
  readingTimeSuffix: string;
  contactWhatsApp: (brandName: string) => string;
}> = {
  de: {
    featuredImageAlt: (title) => `Hauptansicht von ${title}`,
    galleryImageAlt: (title, position) => `Produktansicht ${position} von ${title}`,
    productProfileLabel: "Projektbeschaffung",
    productWhatsApp: (title) => `Hallo DUALCORE LINK, ich möchte ${title} für ein Hotelprojekt auswählen.`,
    resourceWhatsApp: (title) => `Hallo DUALCORE LINK, ich möchte ein Hotelprojekt zu ${title} besprechen.`,
    readingTimeSuffix: "Min. Lesezeit",
    contactWhatsApp: (brandName) => `Hallo ${brandName}, ich möchte ein B2B-Projekt für ein intelligentes Hotel oder Smart Home besprechen.`,
  },
  es: {
    featuredImageAlt: (title) => `Vista principal de ${title}`,
    galleryImageAlt: (title, position) => `Vista de producto ${position} de ${title}`,
    productProfileLabel: "Compra para el proyecto",
    productWhatsApp: (title) => `Hola DUALCORE LINK, quisiera evaluar ${title} para un proyecto hotelero.`,
    resourceWhatsApp: (title) => `Hola DUALCORE LINK, quisiera consultar un proyecto hotelero relacionado con ${title}.`,
    readingTimeSuffix: "min de lectura",
    contactWhatsApp: (brandName) => `Hola ${brandName}, quisiera consultar un proyecto B2B de hotel inteligente o vivienda inteligente.`,
  },
  fa: {
    featuredImageAlt: (title) => `نمای اصلی ${title}`,
    galleryImageAlt: (title, position) => `نمای محصول ${position} از ${title}`,
    productProfileLabel: "خرید پروژه",
    productWhatsApp: (title) => `سلام DUALCORE LINK، می‌خواهم ${title} را برای یک پروژه هتل بررسی کنم.`,
    resourceWhatsApp: (title) => `سلام DUALCORE LINK، می‌خواهم درباره پروژه هتلی مرتبط با ${title} گفت‌وگو کنم.`,
    readingTimeSuffix: "دقیقه مطالعه",
    contactWhatsApp: (brandName) => `سلام ${brandName}، می‌خواهم درباره یک پروژه B2B هتل یا خانه هوشمند گفت‌وگو کنم.`,
  },
};

export function getFinalReviewDynamicCopy(locale: Locale) {
  return isFinalReviewLocale(locale) ? finalReviewDynamicCopy[locale] : undefined;
}

import {
  defineLocalizedFileContent,
  type LocalizedFileContent,
  type LocalizedStructuredContent,
} from "./types";
import {
  m3aRegionCatalog,
  m3aResourceCatalog,
} from "./m3a-catalog";
import {
  getM4aRegionTitle,
  getM4aResourceTitle,
  m4aLocales,
  m4aSharedCopy,
  type M4aLocale,
} from "./m4a-locale-data";

type EditorialCopy = {
  productListingTitle: string;
  productListingDescription: string;
  solutionListingTitle: string;
  solutionListingDescription: string;
  resourceListingTitle: string;
  resourceListingDescription: string;
  regionListingTitle: string;
  regionListingDescription: string;
  aboutTitle: string;
  aboutDescription: string;
  contactTitle: string;
  contactDescription: string;
  faqTitle: string;
  faqDescription: string;
  pagePurpose: string;
  requirementsHeading: string;
  requirementsText: string;
  engineeringHeading: string;
  engineeringText: string;
  procurementHeading: string;
  procurementText: string;
  documentationHeading: string;
  documentationText: string;
  faqAudienceQuestion: string;
  faqAudienceAnswer: string;
  faqEvidenceQuestion: string;
  faqEvidenceAnswer: string;
  faqStartQuestion: string;
  faqStartAnswer: string;
  guideSummary: (title: string) => string;
  regionSummary: (title: string) => string;
  imageSuffix: string;
};

const editorialCopy: Record<M4aLocale, EditorialCopy> = {
  de: {
    productListingTitle: "Produkte für intelligente Hotelzimmer und Gebäudeautomation",
    productListingDescription: "RCU-Steuerungen, Bedienfelder, Sensoren, Thermostate, Türschnittstellen und Servicegeräte für B2B-Hotelprojekte.",
    solutionListingTitle: "Lösungen für Hotelzimmersteuerung und Automatisierung",
    solutionListingDescription: "Projektorientierte Lösungswege für RCU, Gästezimmer, intelligente Displays, OEM/ODM und Hotelservice.",
    resourceListingTitle: "Technische Ratgeber für Hotelsteuerung und Beschaffung",
    resourceListingDescription: "Entscheidungshilfen für RCU, Verkabelung, Bedienfelder, Sensorik, Modernisierung und Systemintegration.",
    regionListingTitle: "Regionale Unterstützung für Smart-Hotel-Projekte",
    regionListingDescription: "B2B-Projektkontext für Nahost, Saudi-Arabien, VAE, Südostasien und Vietnam.",
    aboutTitle: "DUALCORE LINK als Partner für Hotelsteuerungsprodukte",
    aboutDescription: "Unterstützung für Hotelbetreiber, Planer, Auftragnehmer und Systemintegratoren bei Produktauswahl, OEM/ODM, Bemusterung und Lieferung.",
    contactTitle: "Projektanforderungen an DUALCORE LINK senden",
    contactDescription: "Vertriebskontakt für RCU, intelligente Bedienfelder, Sensorik, Hotelautomation sowie OEM/ODM-Anfragen.",
    faqTitle: "Häufige Fragen zu Hotelprodukten und Projektbeschaffung",
    faqDescription: "Antworten zu Produktwahl, Mustern, OEM/ODM, technischen Unterlagen, Lieferumfang und Support.",
    pagePurpose: "Diese Seite ordnet das Thema in einen überprüfbaren B2B-Prozess ein und trennt Produktfakten, Systemplanung und Einkaufsentscheidung.",
    requirementsHeading: "Projektanforderungen festlegen",
    requirementsText: "Dokumentieren Sie Hoteltyp, Zimmerarten, Funktionen, Mengen, Einbauorte, Elektrobedingungen, Schnittstellen und Termin. Nur bestätigte Modell- und Projektdaten dürfen als technische Grundlage dienen.",
    engineeringHeading: "Engineering und Schnittstellen prüfen",
    engineeringText: "Planer, Elektroauftragnehmer und Systemintegrator müssen Versorgung, Verkabelung, RCU, HVAC, Sensorik, Protokolle und Verantwortlichkeiten anhand der realen Architektur abstimmen.",
    procurementHeading: "Bemusterung und Beschaffung",
    procurementText: "Fordern Sie bei Bedarf Muster oder ein Musterzimmer an. Vor der Serie sind Funktion, Einbau, Bedienung, Oberfläche, Dokumentation, Verpackung und Abnahmekriterien schriftlich festzuhalten.",
    documentationHeading: "Lieferung und Nachweise",
    documentationText: "Die Anfrage sollte Stückliste, Zeichnungen, Anpassung, Prüfumfang, Dokumente und Lieferort enthalten. Preise, Zertifizierungen, Kompatibilität und Leistungswerte werden nicht ohne belegte Produktdaten zugesagt.",
    faqAudienceQuestion: "Für wen ist diese Seite gedacht?",
    faqAudienceAnswer: "Für Hotelbetreiber, Entwickler, Auftragnehmer, Systemintegratoren, Distributoren und B2B-Einkäufer mit einem konkreten Projekt.",
    faqEvidenceQuestion: "Bestätigt die Seite ein bestimmtes Protokoll oder eine Zertifizierung?",
    faqEvidenceAnswer: "Nein. Protokolle, elektrische Werte, Zertifizierungen und Kompatibilität sind für das konkrete Modell und Projekt zu prüfen.",
    faqStartQuestion: "Welche Angaben werden für eine Prüfung benötigt?",
    faqStartAnswer: "Projektland, Zimmerarten, Zeichnungen, Funktionen, Produkte, Menge, Schnittstellen, Anpassung und gewünschter Liefertermin.",
    guideSummary: (title) => `${title} unterstützt eine dokumentierte technische und kaufmännische Entscheidung für Hotelprojekte.`,
    regionSummary: (title) => `${title} beschreibt Beschaffung, Integration, Anpassung und Lieferung im regionalen B2B-Projektkontext.`,
    imageSuffix: "für ein Hotelprojekt",
  },
  es: {
    productListingTitle: "Productos para habitaciones inteligentes y automatización hotelera",
    productListingDescription: "RCU, paneles, sensores, termostatos, interfaces de puerta y equipos de servicio para proyectos hoteleros B2B.",
    solutionListingTitle: "Soluciones de control y automatización para hoteles",
    solutionListingDescription: "Rutas de proyecto para RCU, habitaciones, pantallas inteligentes, OEM/ODM y servicios hoteleros.",
    resourceListingTitle: "Guías técnicas para control hotelero y compras",
    resourceListingDescription: "Criterios de decisión para RCU, cableado, paneles, sensores, reformas e integración de sistemas.",
    regionListingTitle: "Apoyo regional para proyectos de hoteles inteligentes",
    regionListingDescription: "Contexto B2B para Oriente Medio, Arabia Saudí, EAU, Sudeste Asiático y Vietnam.",
    aboutTitle: "DUALCORE LINK, socio de productos de control hotelero",
    aboutDescription: "Apoyo a propietarios, contratistas e integradores en selección, OEM/ODM, muestras y suministro.",
    contactTitle: "Enviar los requisitos del proyecto a DUALCORE LINK",
    contactDescription: "Contacto comercial para RCU, paneles inteligentes, sensores, automatización hotelera y OEM/ODM.",
    faqTitle: "Preguntas frecuentes sobre productos y compras hoteleras",
    faqDescription: "Respuestas sobre selección, muestras, OEM/ODM, documentación, suministro y soporte.",
    pagePurpose: "Esta página sitúa el tema en un proceso B2B verificable y separa los hechos del producto, la ingeniería del sistema y la decisión de compra.",
    requirementsHeading: "Definir los requisitos del proyecto",
    requirementsText: "Documente tipo de hotel, habitaciones, funciones, cantidades, ubicaciones, condiciones eléctricas, interfaces y calendario. Solo deben usarse datos confirmados del modelo y del proyecto.",
    engineeringHeading: "Revisar ingeniería e interfaces",
    engineeringText: "El proyectista, contratista eléctrico e integrador deben coordinar alimentación, cableado, RCU, HVAC, sensores, protocolos y responsabilidades según la arquitectura real.",
    procurementHeading: "Muestras y proceso de compra",
    procurementText: "Cuando proceda, use una muestra o habitación piloto. Antes de la serie deben aprobarse función, montaje, uso, acabado, documentos, embalaje y criterios de aceptación.",
    documentationHeading: "Entrega y documentación",
    documentationText: "La consulta debe incluir cantidades, planos, personalización, pruebas, documentos y destino. No se prometen precios, certificados, compatibilidad ni rendimiento sin evidencia del producto.",
    faqAudienceQuestion: "¿A quién se dirige esta página?",
    faqAudienceAnswer: "A propietarios, promotores, contratistas, integradores, distribuidores y compradores B2B con un proyecto concreto.",
    faqEvidenceQuestion: "¿Confirma esta página un protocolo o certificado?",
    faqEvidenceAnswer: "No. Los protocolos, valores eléctricos, certificados y compatibilidad se verifican para el modelo y el proyecto reales.",
    faqStartQuestion: "¿Qué información hace falta para revisar el proyecto?",
    faqStartAnswer: "País, tipos de habitación, planos, funciones, productos, cantidad, interfaces, personalización y fecha prevista.",
    guideSummary: (title) => `${title} ofrece un marco técnico y comercial para tomar decisiones documentadas en proyectos hoteleros.`,
    regionSummary: (title) => `${title} trata compras, integración, personalización y entrega en un contexto regional B2B.`,
    imageSuffix: "para un proyecto hotelero",
  },
  vi: {
    productListingTitle: "Sản phẩm phòng thông minh và tự động hóa khách sạn",
    productListingDescription: "RCU, bảng điều khiển, cảm biến, bộ điều nhiệt, giao diện cửa và thiết bị dịch vụ cho dự án B2B.",
    solutionListingTitle: "Giải pháp điều khiển và tự động hóa khách sạn",
    solutionListingDescription: "Phương án dự án cho RCU, phòng khách, màn hình thông minh, OEM/ODM và dịch vụ khách sạn.",
    resourceListingTitle: "Hướng dẫn kỹ thuật về điều khiển và mua sắm khách sạn",
    resourceListingDescription: "Khung quyết định cho RCU, dây dẫn, bảng điều khiển, cảm biến, cải tạo và tích hợp hệ thống.",
    regionListingTitle: "Hỗ trợ dự án khách sạn thông minh theo khu vực",
    regionListingDescription: "Bối cảnh dự án B2B tại Trung Đông, Ả Rập Xê Út, UAE, Đông Nam Á và Việt Nam.",
    aboutTitle: "DUALCORE LINK, đối tác sản phẩm điều khiển khách sạn",
    aboutDescription: "Hỗ trợ chủ đầu tư, nhà thầu và đơn vị tích hợp trong lựa chọn, OEM/ODM, mẫu và cung ứng.",
    contactTitle: "Gửi yêu cầu dự án đến DUALCORE LINK",
    contactDescription: "Liên hệ kinh doanh về RCU, bảng thông minh, cảm biến, tự động hóa khách sạn và OEM/ODM.",
    faqTitle: "Câu hỏi thường gặp về sản phẩm và mua sắm khách sạn",
    faqDescription: "Thông tin về lựa chọn, mẫu, OEM/ODM, tài liệu, phạm vi cung ứng và hỗ trợ.",
    pagePurpose: "Trang này đặt chủ đề trong quy trình B2B có thể kiểm chứng, tách biệt dữ liệu sản phẩm, kỹ thuật hệ thống và quyết định mua sắm.",
    requirementsHeading: "Xác định yêu cầu dự án",
    requirementsText: "Ghi rõ loại khách sạn, loại phòng, chức năng, số lượng, vị trí, điều kiện điện, giao diện và tiến độ. Chỉ dùng dữ liệu mẫu sản phẩm và hồ sơ dự án đã xác nhận.",
    engineeringHeading: "Rà soát kỹ thuật và giao diện",
    engineeringText: "Tư vấn, nhà thầu điện và đơn vị tích hợp cần phối hợp nguồn, dây dẫn, RCU, HVAC, cảm biến, giao thức và trách nhiệm theo kiến trúc thực tế.",
    procurementHeading: "Mẫu và quy trình mua sắm",
    procurementText: "Khi cần, sử dụng mẫu hoặc phòng mẫu. Trước sản xuất hàng loạt phải phê duyệt chức năng, lắp đặt, thao tác, bề mặt, tài liệu, bao bì và tiêu chí nghiệm thu.",
    documentationHeading: "Giao hàng và hồ sơ",
    documentationText: "Yêu cầu báo giá cần có số lượng, bản vẽ, tùy chỉnh, thử nghiệm, tài liệu và điểm giao. Không cam kết giá, chứng nhận, tương thích hoặc hiệu suất khi chưa có dữ liệu xác thực.",
    faqAudienceQuestion: "Trang này dành cho ai?",
    faqAudienceAnswer: "Dành cho chủ khách sạn, chủ đầu tư, nhà thầu, đơn vị tích hợp, nhà phân phối và người mua B2B có dự án cụ thể.",
    faqEvidenceQuestion: "Trang có xác nhận giao thức hoặc chứng nhận không?",
    faqEvidenceAnswer: "Không. Giao thức, thông số điện, chứng nhận và tương thích phải được xác minh cho đúng mẫu và dự án.",
    faqStartQuestion: "Cần thông tin gì để bắt đầu rà soát?",
    faqStartAnswer: "Quốc gia, loại phòng, bản vẽ, chức năng, sản phẩm, số lượng, giao diện, tùy chỉnh và thời gian giao.",
    guideSummary: (title) => `${title} cung cấp khung kỹ thuật và thương mại để đưa ra quyết định có hồ sơ cho dự án khách sạn.`,
    regionSummary: (title) => `${title} tập trung vào mua sắm, tích hợp, tùy chỉnh và giao hàng trong bối cảnh dự án B2B.`,
    imageSuffix: "cho dự án khách sạn",
  },
  fa: {
    productListingTitle: "محصولات اتاق هوشمند و اتوماسیون هتل",
    productListingDescription: "RCU، پنل‌ها، حسگرها، ترموستات‌ها، رابط‌های در و تجهیزات خدماتی برای پروژه‌های B2B هتل.",
    solutionListingTitle: "راهکارهای کنترل و اتوماسیون هتل",
    solutionListingDescription: "مسیرهای پروژه برای RCU، اتاق مهمان، نمایشگر هوشمند، OEM/ODM و خدمات هتل.",
    resourceListingTitle: "راهنماهای فنی کنترل و خرید تجهیزات هتل",
    resourceListingDescription: "چارچوب تصمیم برای RCU، سیم‌کشی، پنل، حسگر، بازسازی و یکپارچه‌سازی سامانه.",
    regionListingTitle: "پشتیبانی منطقه‌ای پروژه‌های هتل هوشمند",
    regionListingDescription: "زمینه B2B پروژه‌های خاورمیانه، عربستان، امارات، جنوب شرق آسیا و ویتنام.",
    aboutTitle: "DUALCORE LINK، شریک محصولات کنترل هتل",
    aboutDescription: "پشتیبانی از مالکان، پیمانکاران و یکپارچه‌سازان در انتخاب، OEM/ODM، نمونه و تأمین.",
    contactTitle: "ارسال نیازمندی پروژه به DUALCORE LINK",
    contactDescription: "تماس فروش برای RCU، پنل هوشمند، حسگر، اتوماسیون هتل و درخواست‌های OEM/ODM.",
    faqTitle: "پرسش‌های متداول محصولات و خرید پروژه هتل",
    faqDescription: "پاسخ درباره انتخاب، نمونه، OEM/ODM، مدارک، دامنه تأمین و پشتیبانی.",
    pagePurpose: "این صفحه موضوع را در یک فرایند B2B قابل‌بررسی قرار می‌دهد و واقعیت محصول، مهندسی سامانه و تصمیم خرید را از هم جدا می‌کند.",
    requirementsHeading: "تعریف نیازمندی‌های پروژه",
    requirementsText: "نوع هتل، تیپ اتاق، عملکرد، تعداد، محل نصب، شرایط برق، رابط‌ها و زمان‌بندی را ثبت کنید. تنها داده تأییدشده مدل و پروژه باید مبنای فنی باشد.",
    engineeringHeading: "بررسی مهندسی و رابط‌ها",
    engineeringText: "مشاور، پیمانکار برق و یکپارچه‌ساز باید تغذیه، سیم‌کشی، RCU، HVAC، حسگر، پروتکل و مسئولیت‌ها را با معماری واقعی هماهنگ کنند.",
    procurementHeading: "نمونه و فرایند خرید",
    procurementText: "در صورت نیاز از نمونه یا اتاق نمونه استفاده کنید. پیش از تولید انبوه، عملکرد، نصب، کاربری، سطح، مدارک، بسته‌بندی و معیار پذیرش باید تصویب شود.",
    documentationHeading: "تحویل و مدارک",
    documentationText: "درخواست باید تعداد، نقشه، سفارشی‌سازی، آزمون، مدارک و مقصد را مشخص کند. قیمت، گواهی، سازگاری یا عملکرد بدون مدرک محصول وعده داده نمی‌شود.",
    faqAudienceQuestion: "این صفحه برای چه کسانی است؟",
    faqAudienceAnswer: "برای مالک هتل، توسعه‌دهنده، پیمانکار، یکپارچه‌ساز، توزیع‌کننده و خریدار B2B دارای پروژه مشخص.",
    faqEvidenceQuestion: "آیا صفحه پروتکل یا گواهی مشخصی را تأیید می‌کند؟",
    faqEvidenceAnswer: "خیر. پروتکل، مقادیر الکتریکی، گواهی و سازگاری باید برای مدل و پروژه واقعی بررسی شود.",
    faqStartQuestion: "برای شروع بررسی چه اطلاعاتی لازم است؟",
    faqStartAnswer: "کشور، تیپ اتاق، نقشه، عملکرد، محصول، تعداد، رابط، سفارشی‌سازی و زمان تحویل.",
    guideSummary: (title) => `${title} چارچوب فنی و تجاری لازم برای تصمیم مستند در پروژه هتل را فراهم می‌کند.`,
    regionSummary: (title) => `${title} خرید، یکپارچه‌سازی، سفارشی‌سازی و تحویل را در زمینه منطقه‌ای B2B بررسی می‌کند.`,
    imageSuffix: "برای پروژه هتل",
  },
};

function filePage(
  locale: M4aLocale,
  input: {
    pageType: LocalizedFileContent["pageType"];
    slug: string;
    sourceUrl: string;
    title: string;
    seoTitle: string;
    metaDescription: string;
    structuredContent: LocalizedStructuredContent;
  },
): LocalizedFileContent {
  return defineLocalizedFileContent({
    ...input,
    locale,
    translationStatus: "approved",
    reviewStatus: "approved",
  });
}

function baseContent(
  locale: M4aLocale,
  title: string,
  introduction: string,
  parent?: { label: string; href: string },
): LocalizedStructuredContent {
  const shared = m4aSharedCopy[locale];
  const text = editorialCopy[locale];
  return {
    eyebrow: shared.projectEyebrow,
    h1: title,
    introduction: `${introduction} ${text.pagePurpose}`,
    breadcrumbLabel: title,
    parentBreadcrumb: parent,
    sections: [
      { heading: text.requirementsHeading, paragraphs: [text.requirementsText] },
      { heading: text.engineeringHeading, paragraphs: [text.engineeringText] },
      { heading: text.procurementHeading, paragraphs: [text.procurementText] },
      { heading: text.documentationHeading, paragraphs: [text.documentationText] },
    ],
    faqs: [
      { question: text.faqAudienceQuestion, answer: text.faqAudienceAnswer },
      { question: text.faqEvidenceQuestion, answer: text.faqEvidenceAnswer },
      { question: text.faqStartQuestion, answer: text.faqStartAnswer },
    ],
    relatedLinks: [
      { label: shared.products, description: text.productListingDescription, href: `/${locale}/products/` },
      { label: shared.solutions, description: text.solutionListingDescription, href: `/${locale}/solutions/` },
      { label: shared.contact, description: text.contactDescription, href: `/${locale}/contact/` },
    ],
    cta: {
      heading: shared.sendRequirements,
      description: text.faqStartAnswer,
      label: shared.requestQuote,
      href: `/${locale}/contact/#get-a-quote`,
      secondaryLabel: shared.viewProducts,
      secondaryHref: `/${locale}/products/`,
    },
    imageAlt: `${title} ${text.imageSuffix}`,
  };
}

function listingPages(locale: M4aLocale): readonly LocalizedFileContent[] {
  const text = editorialCopy[locale];
  const shared = m4aSharedCopy[locale];
  return [
    filePage(locale, {
      pageType: "product-listing",
      slug: "products",
      sourceUrl: "https://dualcorelink.com/en/products/",
      title: text.productListingTitle,
      seoTitle: text.productListingTitle,
      metaDescription: text.productListingDescription,
      structuredContent: baseContent(locale, text.productListingTitle, text.productListingDescription),
    }),
    filePage(locale, {
      pageType: "solution-listing",
      slug: "solutions",
      sourceUrl: "https://dualcorelink.com/en/solutions/",
      title: text.solutionListingTitle,
      seoTitle: text.solutionListingTitle,
      metaDescription: text.solutionListingDescription,
      structuredContent: baseContent(locale, text.solutionListingTitle, text.solutionListingDescription),
    }),
    filePage(locale, {
      pageType: "resource-listing",
      slug: "resources",
      sourceUrl: "https://dualcorelink.com/en/resources/",
      title: text.resourceListingTitle,
      seoTitle: text.resourceListingTitle,
      metaDescription: text.resourceListingDescription,
      structuredContent: baseContent(locale, text.resourceListingTitle, text.resourceListingDescription),
    }),
    filePage(locale, {
      pageType: "region-listing",
      slug: "regions",
      sourceUrl: "https://dualcorelink.com/en/regions/",
      title: text.regionListingTitle,
      seoTitle: text.regionListingTitle,
      metaDescription: text.regionListingDescription,
      structuredContent: baseContent(locale, text.regionListingTitle, text.regionListingDescription),
    }),
  ].map((page) => ({
    ...page,
    structuredContent: {
      ...page.structuredContent,
      eyebrow:
        page.slug === "products"
          ? shared.productEyebrow
          : page.slug === "solutions"
            ? shared.solutionEyebrow
            : page.slug === "resources"
              ? shared.guideEyebrow
              : shared.regionEyebrow,
    },
  }));
}

function staticPages(locale: M4aLocale): readonly LocalizedFileContent[] {
  const text = editorialCopy[locale];
  const shared = m4aSharedCopy[locale];
  const contactChannels: Record<M4aLocale, string> = {
    de: "E-Mail: sales@dualcorelink.com. Telefon: +86 13703333750. WhatsApp: +852 7039 0436.",
    es: "Correo: sales@dualcorelink.com. Teléfono: +86 13703333750. WhatsApp: +852 7039 0436.",
    vi: "Email: sales@dualcorelink.com. Điện thoại: +86 13703333750. WhatsApp: +852 7039 0436.",
    fa: "ایمیل: sales@dualcorelink.com. تلفن: +86 13703333750. واتساپ: +852 7039 0436.",
  };
  return [
    filePage(locale, {
      pageType: "static",
      slug: "about",
      sourceUrl: "https://dualcorelink.com/en/about/",
      title: text.aboutTitle,
      seoTitle: text.aboutTitle,
      metaDescription: text.aboutDescription,
      structuredContent: baseContent(locale, text.aboutTitle, text.aboutDescription),
    }),
    filePage(locale, {
      pageType: "static",
      slug: "contact",
      sourceUrl: "https://dualcorelink.com/en/contact/",
      title: text.contactTitle,
      seoTitle: text.contactTitle,
      metaDescription: text.contactDescription,
      structuredContent: {
        ...baseContent(locale, text.contactTitle, text.contactDescription),
        sections: [
          {
            heading: shared.requestQuote,
            paragraphs: [
              `${text.requirementsText} ${contactChannels[locale]}`,
            ],
          },
          { heading: text.engineeringHeading, paragraphs: [text.engineeringText] },
          { heading: text.procurementHeading, paragraphs: [text.procurementText] },
          { heading: text.documentationHeading, paragraphs: [text.documentationText] },
        ],
      },
    }),
    filePage(locale, {
      pageType: "static",
      slug: "faqs",
      sourceUrl: "https://dualcorelink.com/en/faqs/",
      title: text.faqTitle,
      seoTitle: text.faqTitle,
      metaDescription: text.faqDescription,
      structuredContent: baseContent(locale, text.faqTitle, text.faqDescription),
    }),
  ];
}

function resourcePages(locale: M4aLocale): readonly LocalizedFileContent[] {
  const text = editorialCopy[locale];
  const shared = m4aSharedCopy[locale];
  return m3aResourceCatalog.map((resource, index) => {
    const title = getM4aResourceTitle(locale, index);
    const summary = text.guideSummary(title);
    return filePage(locale, {
      pageType: "resource",
      slug: resource.slug,
      sourceUrl: `https://dualcorelink.com/en/resources/${resource.slug}/`,
      title,
      seoTitle: `${title} | ${shared.guideEyebrow}`,
      metaDescription: summary,
      structuredContent: {
        ...baseContent(locale, title, summary, {
          label: shared.resources,
          href: `/${locale}/resources/`,
        }),
        eyebrow: shared.guideEyebrow,
        sections: baseContent(locale, title, summary).sections.map(
          (section, sectionIndex) => ({
            ...section,
            paragraphs: [
              `${section.paragraphs[0]} ${sectionIndex === 0 ? `${title}: ${summary}` : ""}`.trim(),
            ],
          }),
        ),
      },
    });
  });
}

function regionPages(locale: M4aLocale): readonly LocalizedFileContent[] {
  const text = editorialCopy[locale];
  const shared = m4aSharedCopy[locale];
  return m3aRegionCatalog.map((region, index) => {
    const title = getM4aRegionTitle(locale, index);
    const summary = text.regionSummary(title);
    return filePage(locale, {
      pageType: "region",
      slug: region.slug,
      sourceUrl: `https://dualcorelink.com/en/regions/${region.slug}/`,
      title,
      seoTitle: `${title} | ${shared.regionEyebrow}`,
      metaDescription: summary,
      structuredContent: {
        ...baseContent(locale, title, summary, {
          label: shared.regions,
          href: `/${locale}/regions/`,
        }),
        eyebrow: shared.regionEyebrow,
      },
    });
  });
}

export function buildM4aLocaleFileContent(locale: M4aLocale): {
  resources: readonly LocalizedFileContent[];
  regions: readonly LocalizedFileContent[];
  staticPages: readonly LocalizedFileContent[];
} {
  const listings = listingPages(locale);
  return {
    resources: [
      listings.find((entry) => entry.pageType === "resource-listing")!,
      ...resourcePages(locale),
    ],
    regions: [
      listings.find((entry) => entry.pageType === "region-listing")!,
      ...regionPages(locale),
    ],
    staticPages: [
      listings.find((entry) => entry.pageType === "product-listing")!,
      listings.find((entry) => entry.pageType === "solution-listing")!,
      ...staticPages(locale),
    ],
  };
}

export const m4aFileContentByLocale = Object.fromEntries(
  m4aLocales.map((locale) => [locale, buildM4aLocaleFileContent(locale)]),
) as Record<M4aLocale, ReturnType<typeof buildM4aLocaleFileContent>>;

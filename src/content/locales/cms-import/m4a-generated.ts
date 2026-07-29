import {
  m3aProductCatalog,
  m3aSolutionCatalog,
} from "../m3a-catalog";
import {
  getM4aProductTitle,
  getM4aSolutionTitle,
  m4aLocales,
  m4aSharedCopy,
  type M4aLocale,
} from "../m4a-locale-data";
import { defineCmsImportPayload } from "./types";

type CmsEditorialCopy = {
  productDescription: (title: string, application: string) => string;
  solutionDescription: (title: string) => string;
  seoSuffix: string;
  specificationLabels: readonly [string, string, string, string];
  productSectionHeadings: readonly [string, string, string, string];
  productSectionParagraphs: (
    title: string,
    application: string,
    checks: string,
    integration: string,
  ) => readonly [string, string, string, string];
  solutionSectionHeadings: readonly [string, string, string, string];
  solutionSectionParagraphs: (title: string) => readonly [string, string, string, string];
  productFaqs: (
    title: string,
    application: string,
    checks: string,
  ) => readonly { question: string; answer: string }[];
  solutionFaqs: (title: string) => readonly { question: string; answer: string }[];
  breadcrumbProducts: string;
  breadcrumbSolutions: string;
  quoteHeading: (title: string) => string;
  quoteDescription: string;
  quoteLabel: string;
  relatedProductLabel: string;
  relatedProductDescription: string;
  relatedSolutionLabel: string;
  relatedSolutionDescription: string;
  imageAlt: (title: string) => string;
};

const cmsCopy: Record<M4aLocale, CmsEditorialCopy> = {
  de: {
    productDescription: (title, application) => `${title} für ${application}. Die Auswahl erfolgt anhand der realen Projektunterlagen und des konkreten Modells.`,
    solutionDescription: (title) => `${title} strukturiert Geräte, Schnittstellen, Verantwortlichkeiten und Abnahme für ein überprüfbares Hotelprojekt.`,
    seoSuffix: "Auswahl und Beschaffung für Hotelprojekte",
    specificationLabels: ["Produktkategorie", "Anwendung", "Auswahlprüfung", "Systemintegration"],
    productSectionHeadings: ["Aufgabe im Projekt", "Auswahl vor der Bestellung", "Einbau und Systembezug", "Beschaffung und Anpassung"],
    productSectionParagraphs: (title, application, checks, integration) => [
      `Die Aufgabe des Produkts muss in der Zimmerfunktionsliste oder Geräteliste stehen, damit Betreiber, Auftragnehmer und Systemintegrator die Anforderungen für ${application} sowie Liefer-, Einbau- und Prüfgrenzen abstimmen können.`,
      `Vor der Freigabe sind ${checks} zu prüfen. Spannung, Protokoll, Leistung oder Kompatibilität dürfen nicht aus dem Namen oder der Optik abgeleitet werden; maßgeblich sind Modellunterlagen und Projektplanung.`,
      `${integration}. Zeichnungen müssen Position, Versorgung, Leitungen, Klemmen sowie Zuständigkeiten für Konfiguration, Inbetriebnahme und Wartung ausweisen.`,
      "Die Anfrage enthält Menge, Projekttyp, Zeichnungen, Funktion, Elektrobedingungen, Schnittstellen, Oberfläche und Termin. Logo, Verpackung oder OEM/ODM werden nur für geeignete Produktgruppen und nach Musterfreigabe vereinbart.",
    ],
    solutionSectionHeadings: ["Ziel und Projektumfang", "Geräte und Schnittstellen", "Planung und Verifikation", "Beschaffung und Übergabe"],
    solutionSectionParagraphs: () => [
      "Die Planung beginnt mit Hoteltyp, Zimmerarten, Betriebsablauf, Pflichtfunktionen und optionalen Funktionen. Der Umfang darf nur bestätigte Geräte und Leistungen enthalten.",
      "Für jedes Gerät werden Signalquelle, Ziel, Versorgung, Leitung, Netzwerk, Protokoll, Gateway und verantwortliche Partei dokumentiert. Produkte innerhalb einer Lösung sind nicht automatisch kompatibel.",
      "Zeichnungen, Punktelisten, Funktionsmatrix sowie Muster oder Musterzimmer dienen zur Prüfung von Einbau, Logik und Bedienung vor der Serienfreigabe.",
      "Das Angebot nennt Mengen, Phasen, Produkte, Anpassung, Unterlagen, Prüfung, Schulung und Support. Termine und Bedingungen ergeben sich aus dem bestätigten Umfang.",
    ],
    productFaqs: (title, application, checks) => [
      { question: `Wofür wird ${title} eingesetzt?`, answer: `Für ${application}; die endgültige Eignung hängt vom Modell und vom Projekt ab.` },
      { question: "Lassen sich Protokoll oder elektrische Werte aus dem Produktnamen ableiten?", answer: "Nein. Diese Angaben werden ausschließlich anhand der Modellunterlagen und des realen Projekts bestätigt." },
      { question: "Welche Informationen sind für ein Angebot erforderlich?", answer: `Menge, Projekttyp, Zeichnungen, Funktion und Angaben zu ${checks}.` },
    ],
    solutionFaqs: (title) => [
      { question: `Was umfasst ${title}?`, answer: "Nur die Geräte, Schnittstellen und Leistungen, die nach Prüfung von Anforderungen und Zeichnungen ausdrücklich freigegeben wurden." },
      { question: "Sind alle genannten Geräte automatisch kompatibel?", answer: "Nein. Jede Schnittstelle, jedes Protokoll und jede Zuständigkeit muss dokumentiert und getestet werden." },
      { question: "Was wird für die Lösungsprüfung benötigt?", answer: "Projekttyp, Grundrisse, Szenarien, Geräteliste, Schnittstellen, Mengen, Termin und Anpassungsumfang." },
    ],
    breadcrumbProducts: "Produkte",
    breadcrumbSolutions: "Lösungen",
    quoteHeading: (title) => `${title} für das Projekt prüfen`,
    quoteDescription: "Senden Sie Funktionen, Einbauorte, Mengen, Elektrobedingungen, Schnittstellen, Oberflächen und Termin.",
    quoteLabel: "Produkt- und Projektprüfung anfragen",
    relatedProductLabel: "Hotelprodukte",
    relatedProductDescription: "Vergleichen Sie RCU, Bedienfelder, Sensoren und weitere Geräte.",
    relatedSolutionLabel: "Projektlösungen",
    relatedSolutionDescription: "Ordnen Sie das Produkt in einen verifizierbaren Systemumfang ein.",
    imageAlt: (title) => `${title} für ein Hotelprojekt`,
  },
  es: {
    productDescription: (title, application) => `${title} para ${application}. La selección debe basarse en el modelo y en la documentación real del proyecto.`,
    solutionDescription: (title) => `${title} organiza equipos, interfaces, responsabilidades y aceptación para un proyecto hotelero verificable.`,
    seoSuffix: "selección y compra para proyectos hoteleros",
    specificationLabels: ["Categoría de producto", "Aplicación", "Comprobación de selección", "Integración del sistema"],
    productSectionHeadings: ["Función en el proyecto", "Selección antes del pedido", "Instalación y relación con el sistema", "Compra y personalización"],
    productSectionParagraphs: (title, application, checks, integration) => [
      `La función del producto debe figurar en la lista de habitaciones o equipos para que propietario, contratista e integrador coordinen los requisitos de ${application}, el suministro, la instalación y las pruebas.`,
      `Antes de aprobarlo hay que revisar ${checks}. No deben deducirse tensión, protocolo, capacidad o compatibilidad a partir del nombre o del aspecto; mandan la ficha del modelo y el diseño del proyecto.`,
      `${integration}. Los planos deben indicar posición, alimentación, cables, bornes y responsables de configuración, puesta en marcha y mantenimiento.`,
      "La consulta debe incluir cantidad, tipo de proyecto, planos, función, condiciones eléctricas, interfaces, acabado y plazo. Logotipo, embalaje u OEM/ODM se acuerdan solo cuando la categoría lo permita y tras aprobar la muestra.",
    ],
    solutionSectionHeadings: ["Objetivo y alcance", "Equipos e interfaces", "Diseño y verificación", "Compra y entrega"],
    solutionSectionParagraphs: () => [
      "La planificación empieza por el tipo de hotel, las habitaciones, la operación, las funciones obligatorias y las opciones. El alcance solo puede contener equipos y servicios confirmados.",
      "Para cada equipo se documentan origen y destino de la señal, alimentación, cable, red, protocolo, pasarela y responsable. Compartir una solución no implica compatibilidad automática.",
      "Planos, listas de puntos, matriz funcional y una muestra o habitación piloto permiten comprobar montaje, lógica y experiencia antes de congelar la serie.",
      "La oferta debe definir cantidades, fases, productos, personalización, documentos, pruebas, formación y soporte. Plazos y condiciones dependen del alcance aprobado.",
    ],
    productFaqs: (title, application, checks) => [
      { question: `¿Para qué se utiliza ${title}?`, answer: `Para ${application}; la idoneidad final depende del modelo y del proyecto.` },
      { question: "¿Se puede deducir el protocolo o la tensión por el nombre?", answer: "No. Los datos eléctricos, protocolos y compatibilidad se confirman con la ficha del modelo y el proyecto real." },
      { question: "¿Qué información hace falta para cotizar?", answer: `Cantidad, tipo de proyecto, planos, función y datos sobre ${checks}.` },
    ],
    solutionFaqs: (title) => [
      { question: `¿Qué incluye ${title}?`, answer: "Solo los equipos, interfaces y servicios aprobados tras revisar requisitos y planos." },
      { question: "¿Son compatibles automáticamente todos los equipos?", answer: "No. Cada interfaz, protocolo y responsabilidad debe documentarse y probarse." },
      { question: "¿Qué se necesita para revisar la solución?", answer: "Tipo de proyecto, planos, escenarios, equipos, interfaces, cantidades, plazo y personalización." },
    ],
    breadcrumbProducts: "Productos",
    breadcrumbSolutions: "Soluciones",
    quoteHeading: (title) => `Revisar ${title} para el proyecto`,
    quoteDescription: "Envíe funciones, ubicaciones, cantidades, condiciones eléctricas, interfaces, acabados y plazo.",
    quoteLabel: "Solicitar revisión de producto y proyecto",
    relatedProductLabel: "Productos hoteleros",
    relatedProductDescription: "Compare RCU, paneles, sensores y otros equipos.",
    relatedSolutionLabel: "Soluciones de proyecto",
    relatedSolutionDescription: "Sitúe el producto dentro de un alcance de sistema verificable.",
    imageAlt: (title) => `${title} para un proyecto hotelero`,
  },
  vi: {
    productDescription: (title, application) => `${title} dùng cho ${application}. Việc lựa chọn phải dựa trên đúng mẫu và hồ sơ dự án thực tế.`,
    solutionDescription: (title) => `${title} tổ chức thiết bị, giao diện, trách nhiệm và nghiệm thu cho dự án khách sạn có thể kiểm chứng.`,
    seoSuffix: "lựa chọn và mua sắm cho dự án khách sạn",
    specificationLabels: ["Nhóm sản phẩm", "Ứng dụng", "Nội dung kiểm tra", "Tích hợp hệ thống"],
    productSectionHeadings: ["Vai trò trong dự án", "Lựa chọn trước khi đặt hàng", "Lắp đặt và quan hệ hệ thống", "Mua sắm và tùy chỉnh"],
    productSectionParagraphs: (title, application, checks, integration) => [
      `Vai trò của sản phẩm phải có trong bảng chức năng phòng hoặc danh mục thiết bị để chủ đầu tư, nhà thầu và đơn vị tích hợp thống nhất yêu cầu cho ${application} cùng phạm vi cung ứng, lắp đặt và thử nghiệm.`,
      `Trước khi phê duyệt cần kiểm tra ${checks}. Không suy đoán điện áp, giao thức, dung lượng hoặc tương thích từ tên hay hình thức; phải dùng hồ sơ mẫu và thiết kế dự án.`,
      `${integration}. Bản vẽ cần chỉ rõ vị trí, nguồn, cáp, đầu nối và trách nhiệm cấu hình, chạy thử, bảo trì.`,
      "Yêu cầu báo giá cần có số lượng, loại dự án, bản vẽ, chức năng, điều kiện điện, giao diện, bề mặt và tiến độ. Logo, bao bì hoặc OEM/ODM chỉ được thống nhất với nhóm sản phẩm phù hợp và sau khi duyệt mẫu.",
    ],
    solutionSectionHeadings: ["Mục tiêu và phạm vi", "Thiết bị và giao diện", "Thiết kế và xác minh", "Mua sắm và bàn giao"],
    solutionSectionParagraphs: () => [
      "Việc lập kế hoạch bắt đầu từ loại khách sạn, loại phòng, quy trình vận hành, chức năng bắt buộc và tùy chọn. Phạm vi chỉ gồm thiết bị và dịch vụ đã xác nhận.",
      "Với từng thiết bị, cần ghi nguồn và đích tín hiệu, nguồn điện, cáp, mạng, giao thức, gateway và bên chịu trách nhiệm. Cùng xuất hiện trong giải pháp không có nghĩa tự động tương thích.",
      "Bản vẽ, bảng điểm, ma trận chức năng cùng mẫu hoặc phòng mẫu giúp xác minh lắp đặt, logic và trải nghiệm trước khi chốt hàng loạt.",
      "Báo giá phải nêu số lượng, giai đoạn, sản phẩm, tùy chỉnh, tài liệu, thử nghiệm, đào tạo và hỗ trợ. Thời gian và điều kiện theo phạm vi đã duyệt.",
    ],
    productFaqs: (title, application, checks) => [
      { question: `${title} dùng để làm gì?`, answer: `Dùng cho ${application}; tính phù hợp cuối cùng phụ thuộc đúng mẫu và dự án.` },
      { question: "Có thể suy ra giao thức hoặc điện áp từ tên sản phẩm không?", answer: "Không. Dữ liệu điện, giao thức và tương thích phải xác nhận bằng hồ sơ mẫu và dự án thực tế." },
      { question: "Cần thông tin gì để báo giá?", answer: `Số lượng, loại dự án, bản vẽ, chức năng và dữ liệu về ${checks}.` },
    ],
    solutionFaqs: (title) => [
      { question: `${title} bao gồm những gì?`, answer: "Chỉ gồm thiết bị, giao diện và dịch vụ được phê duyệt sau khi rà soát yêu cầu và bản vẽ." },
      { question: "Mọi thiết bị trong giải pháp có tự động tương thích không?", answer: "Không. Từng giao diện, giao thức và trách nhiệm phải được ghi nhận và thử nghiệm." },
      { question: "Cần gì để rà soát giải pháp?", answer: "Loại dự án, bản vẽ, kịch bản, thiết bị, giao diện, số lượng, thời gian và phạm vi tùy chỉnh." },
    ],
    breadcrumbProducts: "Sản phẩm",
    breadcrumbSolutions: "Giải pháp",
    quoteHeading: (title) => `Rà soát ${title} cho dự án`,
    quoteDescription: "Gửi chức năng, vị trí, số lượng, điều kiện điện, giao diện, bề mặt và thời gian.",
    quoteLabel: "Yêu cầu rà soát sản phẩm và dự án",
    relatedProductLabel: "Sản phẩm khách sạn",
    relatedProductDescription: "So sánh RCU, bảng điều khiển, cảm biến và thiết bị khác.",
    relatedSolutionLabel: "Giải pháp dự án",
    relatedSolutionDescription: "Đặt sản phẩm trong phạm vi hệ thống có thể xác minh.",
    imageAlt: (title) => `${title} cho dự án khách sạn`,
  },
  fa: {
    productDescription: (title, application) => `${title} برای ${application} طراحی شده است. انتخاب باید بر پایه مدل و مدارک واقعی پروژه انجام شود.`,
    solutionDescription: (title) => `${title} تجهیزات، رابط‌ها، مسئولیت‌ها و پذیرش را برای یک پروژه هتل قابل‌بررسی سازمان می‌دهد.`,
    seoSuffix: "انتخاب و خرید برای پروژه هتل",
    specificationLabels: ["رده محصول", "کاربرد", "کنترل انتخاب", "یکپارچه‌سازی سامانه"],
    productSectionHeadings: ["نقش در پروژه", "انتخاب پیش از سفارش", "نصب و ارتباط سامانه", "خرید و سفارشی‌سازی"],
    productSectionParagraphs: (title, application, checks, integration) => [
      `نقش محصول باید در جدول عملکرد اتاق یا فهرست تجهیزات ثبت شود تا مالک، پیمانکار و یکپارچه‌ساز الزامات ${application} و حدود تأمین، نصب و آزمون را هماهنگ کنند.`,
      `پیش از تصویب باید ${checks} بررسی شود. ولتاژ، پروتکل، ظرفیت یا سازگاری را نمی‌توان از نام یا ظاهر نتیجه گرفت؛ مدارک مدل و طراحی پروژه ملاک است.`,
      `${integration}. نقشه‌ها باید محل، تغذیه، کابل، ترمینال و مسئولیت پیکربندی، راه‌اندازی و نگهداری را نشان دهند.`,
      "درخواست باید تعداد، نوع پروژه، نقشه، عملکرد، شرایط برق، رابط، سطح و زمان را مشخص کند. لوگو، بسته‌بندی یا OEM/ODM تنها برای گروه مناسب و پس از تأیید نمونه توافق می‌شود.",
    ],
    solutionSectionHeadings: ["هدف و دامنه پروژه", "تجهیزات و رابط‌ها", "طراحی و اعتبارسنجی", "خرید و تحویل"],
    solutionSectionParagraphs: () => [
      "برنامه‌ریزی از نوع هتل، تیپ اتاق، روند بهره‌برداری، عملکرد اجباری و گزینه‌ها آغاز می‌شود. دامنه فقط شامل تجهیزات و خدمات تأییدشده است.",
      "برای هر تجهیز، مبدأ و مقصد سیگنال، تغذیه، کابل، شبکه، پروتکل، درگاه و مسئول ثبت می‌شود. حضور در یک راهکار به معنای سازگاری خودکار نیست.",
      "نقشه، فهرست نقاط، ماتریس عملکرد و نمونه یا اتاق نمونه برای بررسی نصب، منطق و تجربه کاربر پیش از تثبیت تولید به‌کار می‌رود.",
      "پیشنهاد باید تعداد، مرحله، محصول، سفارشی‌سازی، مدارک، آزمون، آموزش و پشتیبانی را روشن کند. زمان و شرایط تابع دامنه تصویب‌شده است.",
    ],
    productFaqs: (title, application, checks) => [
      { question: `${title} چه کاربردی دارد؟`, answer: `برای ${application}؛ مناسب‌بودن نهایی به مدل و پروژه وابسته است.` },
      { question: "آیا پروتکل یا ولتاژ از نام محصول مشخص می‌شود؟", answer: "خیر. اطلاعات برق، پروتکل و سازگاری باید با مدارک مدل و پروژه واقعی تأیید شود." },
      { question: "برای پیش‌فاکتور چه اطلاعاتی لازم است؟", answer: `تعداد، نوع پروژه، نقشه، عملکرد و اطلاعات مربوط به ${checks}.` },
    ],
    solutionFaqs: (title) => [
      { question: `${title} شامل چه مواردی است؟`, answer: "فقط تجهیزات، رابط‌ها و خدماتی که پس از بررسی نیاز و نقشه تصویب شده‌اند." },
      { question: "آیا همه تجهیزات راهکار خودکار سازگارند؟", answer: "خیر. هر رابط، پروتکل و مسئولیت باید مستند و آزموده شود." },
      { question: "برای بررسی راهکار چه چیزهایی لازم است؟", answer: "نوع پروژه، نقشه، سناریو، تجهیزات، رابط‌ها، تعداد، زمان و دامنه سفارشی‌سازی." },
    ],
    breadcrumbProducts: "محصولات",
    breadcrumbSolutions: "راهکارها",
    quoteHeading: (title) => `بررسی ${title} برای پروژه`,
    quoteDescription: "عملکرد، محل، تعداد، شرایط برق، رابط‌ها، سطح و زمان را ارسال کنید.",
    quoteLabel: "درخواست بررسی محصول و پروژه",
    relatedProductLabel: "محصولات هتل",
    relatedProductDescription: "RCU، پنل‌ها، حسگرها و تجهیزات دیگر را مقایسه کنید.",
    relatedSolutionLabel: "راهکارهای پروژه",
    relatedSolutionDescription: "محصول را در دامنه سامانه قابل‌بررسی قرار دهید.",
    imageAlt: (title) => `${title} برای پروژه هتل`,
  },
};

function productPayload(
  locale: M4aLocale,
  product: (typeof m3aProductCatalog)[number],
  index: number,
) {
  const title = getM4aProductTitle(locale, index);
  const shared = m4aSharedCopy[locale];
  const text = cmsCopy[locale];
  const kind = shared.productKinds[product.kind];
  const description = text.productDescription(title, kind.application);
  const sectionParagraphs = text.productSectionParagraphs(
    title,
    kind.application,
    kind.checks,
    kind.integration,
  );
  return defineCmsImportPayload({
    contentType: "product",
    sourceEnglishContentId: product.id,
    sourceEnglishSlug: product.slug,
    locale,
    translatedTitle: title,
    translatedDescription: description,
    translatedSpecifications: [
      { label: text.specificationLabels[0], value: kind.label },
      { label: text.specificationLabels[1], value: kind.application },
      { label: text.specificationLabels[2], value: kind.checks },
      { label: text.specificationLabels[3], value: kind.integration },
    ],
    translatedSeoTitle: `${title} | ${text.seoSuffix}`,
    translatedMetaDescription: description,
    translatedStructuredContent: {
      eyebrow: shared.productEyebrow,
      h1: title,
      introduction: `${description} ${sectionParagraphs[0]}`,
      breadcrumbLabel: title,
      parentBreadcrumb: {
        label: text.breadcrumbProducts,
        href: `/${locale}/products/`,
      },
      sections: text.productSectionHeadings.map((heading, sectionIndex) => ({
        heading,
        paragraphs: [sectionParagraphs[sectionIndex]],
      })),
      faqs: text.productFaqs(title, kind.application, kind.checks),
      relatedLinks: [
        { label: text.relatedProductLabel, description: text.relatedProductDescription, href: `/${locale}/products/` },
        { label: text.relatedSolutionLabel, description: text.relatedSolutionDescription, href: `/${locale}/solutions/` },
        { label: shared.contact, description: text.quoteDescription, href: `/${locale}/contact/` },
      ],
      cta: {
        heading: text.quoteHeading(title),
        description: text.quoteDescription,
        label: text.quoteLabel,
        href: `/${locale}/contact/#get-a-quote`,
        secondaryLabel: shared.viewSolutions,
        secondaryHref: `/${locale}/solutions/`,
      },
      imageAlt: text.imageAlt(title),
    },
  });
}

function solutionPayload(
  locale: M4aLocale,
  solution: (typeof m3aSolutionCatalog)[number],
  index: number,
) {
  const title = getM4aSolutionTitle(locale, index);
  const shared = m4aSharedCopy[locale];
  const text = cmsCopy[locale];
  const description = text.solutionDescription(title);
  const sectionParagraphs = text.solutionSectionParagraphs(title);
  return defineCmsImportPayload({
    contentType: "solution",
    sourceEnglishContentId: solution.id,
    sourceEnglishSlug: solution.slug,
    locale,
    translatedTitle: title,
    translatedDescription: description,
    translatedSpecifications: [
      { label: text.specificationLabels[0], value: title },
      { label: text.specificationLabels[1], value: sectionParagraphs[0] },
      { label: text.specificationLabels[2], value: sectionParagraphs[2] },
      { label: text.specificationLabels[3], value: sectionParagraphs[1] },
    ],
    translatedSeoTitle: `${title} | ${text.seoSuffix}`,
    translatedMetaDescription: description,
    translatedStructuredContent: {
      eyebrow: shared.solutionEyebrow,
      h1: title,
      introduction: `${description} ${sectionParagraphs[0]}`,
      breadcrumbLabel: title,
      parentBreadcrumb: {
        label: text.breadcrumbSolutions,
        href: `/${locale}/solutions/`,
      },
      sections: text.solutionSectionHeadings.map((heading, sectionIndex) => ({
        heading,
        paragraphs: [sectionParagraphs[sectionIndex]],
      })),
      faqs: text.solutionFaqs(title),
      relatedLinks: [
        { label: text.relatedSolutionLabel, description: text.relatedSolutionDescription, href: `/${locale}/solutions/` },
        { label: text.relatedProductLabel, description: text.relatedProductDescription, href: `/${locale}/products/` },
        { label: shared.contact, description: text.quoteDescription, href: `/${locale}/contact/` },
      ],
      cta: {
        heading: text.quoteHeading(title),
        description: text.quoteDescription,
        label: shared.requestQuote,
        href: `/${locale}/contact/#get-a-quote`,
        secondaryLabel: shared.viewProducts,
        secondaryHref: `/${locale}/products/`,
      },
      imageAlt: text.imageAlt(title),
    },
  });
}

function payloadsForLocale(locale: M4aLocale) {
  return [
    ...m3aProductCatalog.map((product, index) =>
      productPayload(locale, product, index),
    ),
    ...m3aSolutionCatalog.map((solution, index) =>
      solutionPayload(locale, solution, index),
    ),
  ];
}

export const m4aCmsImportPayloadByLocale = {
  de: payloadsForLocale("de"),
  es: payloadsForLocale("es"),
  vi: payloadsForLocale("vi"),
  fa: payloadsForLocale("fa"),
} as const satisfies Record<
  M4aLocale,
  readonly ReturnType<typeof productPayload>[]
>;

export const m4aCmsImportPayload = m4aLocales.flatMap(
  (locale) => m4aCmsImportPayloadByLocale[locale],
);

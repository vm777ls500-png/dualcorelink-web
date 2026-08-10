import { getDirection, type Locale } from "@/config/i18n";
import { productCategories } from "@/config/product-taxonomy";
import type { RegionLandingPage } from "@/config/region-landing-pages";
import type {
  ResourceGuide,
  ResourceLink,
  ResourceSection,
} from "@/config/resources";
import {
  getLocalizedPublicationPage,
  getPublicationHreflang,
  type LocalizedPublicationPage,
} from "@/lib/localized-publication";
import type {
  RelatedContentModel,
  SolutionDetailModel,
} from "@/types/content";

const chineseCategoryNames = new Map(
  productCategories.map((category) => [
    category.title,
    category.chineseTitle,
  ]),
);

const chineseSafeClaims = [
  "支持酒店工程类 B2B 项目询盘。",
  "可为酒店业主、承包商、系统集成商、分销商和 OEM/ODM 买家提供选型支持。",
  "产品资料可按具体型号和项目需求提供。",
  "电压、协议与接口条件需按项目书面确认。",
  "OEM/ODM 可行范围取决于产品系列与项目要求。",
  "常规产品不设置统一固定起订量，具体以书面报价为准。",
  "常规交期通常为 7 至 15 天，实际时间取决于产品、数量与定制范围。",
];

const chineseAudience = [
  "酒店业主",
  "承包商",
  "系统集成商",
  "分销商",
  "OEM/ODM 买家",
];

const arabicSafeClaims = [
  "ندعم استفسارات مشروعات الفنادق B2B.",
  "يمكن دعم المالك والمقاول ومتكامل الأنظمة والموزع ومشتري OEM/ODM في اختيار المنتجات.",
  "تتوفر وثائق المنتج وفق الطراز ومتطلبات المشروع.",
  "يجب تأكيد الجهد والبروتوكول والواجهات كتابةً لكل مشروع.",
  "يعتمد نطاق OEM/ODM على سلسلة المنتج ومتطلبات المشروع.",
  "لا يوجد حد أدنى موحد للمنتجات القياسية؛ ويُعتمد الشرط من العرض المكتوب.",
  "تكون مدة التسليم المعتادة 7 إلى 15 يوماً، وفق المنتج والكمية ونطاق التخصيص.",
];

const arabicAudience = [
  "مالكو الفنادق",
  "المقاولون",
  "متكاملو الأنظمة",
  "الموزعون",
  "مشترو OEM/ODM",
];

const arabicCategoryNames = new Map<string, string>([
  ["Smart Panels & Switches", "اللوحات والمفاتيح الذكية"],
  ["AI Smart Displays", "شاشات التحكم الذكية"],
  ["RCU Room Control Host", "مضيف التحكم بالغرفة RCU"],
  ["Sensors", "المستشعرات"],
  ["Smart Sockets & Power Modules", "المقابس الذكية ووحدات الطاقة"],
  ["HVAC & Thermostat Control", "التحكم في HVAC والثرموستات"],
  ["Curtain Control Panels", "لوحات التحكم في الستائر"],
  ["Room Status & Hotel Service Panels", "لوحات حالة الغرفة وخدمات الفندق"],
  ["Hotel Audio & Communication Devices", "أجهزة الصوت والاتصال الفندقية"],
  ["Hotel Delivery Robot System", "نظام روبوت التوصيل الفندقي"],
]);

export function localizeProductCategoryName(
  category: string,
  locale: Locale,
): string {
  if (locale === "zh") return chineseCategoryNames.get(category) ?? category;
  if (locale === "ar") return arabicCategoryNames.get(category) ?? category;
  return category;
}

export function getLocalizedContentTitle(
  locale: Locale,
  pageType: "product" | "solution" | "resource" | "region",
  slug: string,
  fallback: string,
): string {
  return locale === "zh" || locale === "ar"
    ? getLocalizedPublicationPage(locale, pageType, slug)?.title ?? fallback
    : fallback;
}

function sectionText(
  page: LocalizedPublicationPage,
  index: number,
): string {
  const section = page.content.sections[index];
  if (!section) return page.content.introduction;
  return [...section.paragraphs, ...(section.bullets ?? [])].join("\n");
}

function localizedPageForHref(
  href: string,
  locale: Locale,
): LocalizedPublicationPage | undefined {
  const match = href.match(
    /^\/en\/(products|solutions|resources|regions)\/([^/?#]+)\/?/,
  );
  if (!match || (locale !== "zh" && locale !== "ar")) return undefined;
  const pageType = match[1].slice(0, -1) as
    | "product"
    | "solution"
    | "resource"
    | "region";
  return getLocalizedPublicationPage(locale, pageType, match[2]);
}

export function localizeReleasedHref(href: string, locale: Locale): string {
  if ((locale !== "zh" && locale !== "ar") || !href.startsWith("/en/")) {
    return href;
  }
  const [pathname, hash = ""] = href.split("#", 2);
  const normalized = pathname.replace(/^\/en\//, "").replace(/^\/+|\/+$/g, "");
  if (locale === "ar" && normalized === "downloads") {
    return "/ar/resources/";
  }
  const localizedUrl = getPublicationHreflang(normalized)[locale];
  if (!localizedUrl) return href;
  return `${new URL(localizedUrl).pathname}${hash ? `#${hash}` : ""}`;
}

export function localizeResourceLink(
  link: ResourceLink,
  locale: Locale,
): ResourceLink {
  if (locale !== "zh" && locale !== "ar") return { ...link };
  if (locale === "ar" && /^\/en\/downloads\/?(?:#.*)?$/.test(link.href)) {
    return {
      ...link,
      title: "مركز الأدلة الفنية",
      description: "راجع أدلة الاختيار والتخطيط الفني المتاحة باللغة العربية.",
      href: "/ar/resources/",
    };
  }
  const localizedPage = localizedPageForHref(link.href, locale);
  return {
    ...link,
    title: localizedPage?.title ?? link.title,
    description: localizedPage?.description ?? link.description,
    href: localizeReleasedHref(link.href, locale),
  };
}

function localizedResourceSections(
  page: LocalizedPublicationPage,
): ResourceSection[] {
  return page.content.sections.map((section, index) => ({
    id: `${page.locale}-section-${index + 1}`,
    heading: section.heading,
    body: [...section.paragraphs, ...(section.bullets ?? [])],
  }));
}

export function localizeResourceGuide(
  source: ResourceGuide,
  page: LocalizedPublicationPage,
): ResourceGuide {
  return {
    ...source,
    title: page.title,
    h1: page.content.h1,
    seoTitle: page.seoTitle,
    metaDescription: page.metaDescription,
    summary: page.content.introduction,
    answerCapsule: {
      heading: page.content.sections[0]?.heading ?? page.content.h1,
      body: sectionText(page, 0),
      links: page.content.relatedLinks.slice(0, 2).map((link) => ({
        title: link.label,
        href: link.href,
        description: link.description,
      })),
    },
    topic: page.content.eyebrow,
    listingGroup: source.listingGroup,
    readingTime:
      page.locale === "ar"
        ? source.readingTime.replace("min read", "دقائق قراءة")
        : source.readingTime.replace("min read", "分钟阅读"),
    audience: page.locale === "ar" ? arabicAudience : chineseAudience,
    sections: localizedResourceSections(page),
    conversion: source.conversion
      ? {
          ...source.conversion,
          midCtaAfterSectionId: `${page.locale}-section-2`,
        }
      : undefined,
    relatedSolutions: source.relatedSolutions.map((link) =>
      localizeResourceLink(link, page.locale),
    ),
    relatedProducts: source.relatedProducts.map((link) =>
      localizeResourceLink(link, page.locale),
    ),
    relatedRegions: source.relatedRegions.map((link) =>
      localizeResourceLink(link, page.locale),
    ),
    relatedDownloads: source.relatedDownloads.map((link) =>
      localizeResourceLink(link, page.locale),
    ),
    cta: {
      ...source.cta,
      title: page.content.cta.heading,
      body: page.content.cta.description,
      primaryLabel: page.content.cta.label,
      primaryHref: page.content.cta.href,
      secondaryLabel:
        page.content.cta.secondaryLabel ??
        (page.locale === "ar" ? "عرض الحلول ذات الصلة" : "查看相关解决方案"),
      secondaryHref:
        page.content.cta.secondaryHref ?? `/${page.locale}/solutions/`,
      whatsappLabel:
        page.locale === "ar" ? "الاستفسار عبر WhatsApp" : "WhatsApp 咨询",
      whatsappMessage:
        page.locale === "ar"
          ? `مرحباً DUALCORE LINK، أود مناقشة مشروع فندقي متعلق بـ ${page.content.h1}.`
          : `您好，DUALCORE LINK。我想咨询《${page.content.h1}》相关的酒店项目。`,
    },
    safeClaims: page.locale === "ar" ? arabicSafeClaims : chineseSafeClaims,
  };
}

function localizeRelatedProduct(
  product: RelatedContentModel,
  locale: Locale,
): RelatedContentModel {
  const page = getLocalizedPublicationPage(locale, "product", product.slug);
  if (!page) return product;
  return {
    ...product,
    language: locale,
    direction: getDirection(locale),
    title: page.title,
    excerpt: page.description,
  };
}

export function localizeSolutionDetail(
  source: SolutionDetailModel,
  page: LocalizedPublicationPage,
): SolutionDetailModel {
  const specifications = page.specifications
    .map((item) => `${item.label}：${item.value}`)
    .join("\n");

  return {
    ...source,
    language: page.locale,
    direction: getDirection(page.locale),
    title: page.title,
    excerpt: page.description,
    summary: page.content.introduction,
    customerChallenges: sectionText(page, 0),
    architecture: sectionText(page, 1),
    keyBenefitsText: sectionText(page, 2),
    deploymentProcess: sectionText(page, 3),
    supportedProtocolsSummary: specifications || sectionText(page, 1),
    integrationNotes: sectionText(page, 1),
    compatibilityNotes: sectionText(page, 2),
    knownLimitations: sectionText(page, 3),
    inquiryCtaLabel: page.content.cta.label,
    relatedProducts: source.relatedProducts.map((product) =>
      localizeRelatedProduct(product, page.locale),
    ),
    seo: {
      ...source.seo,
      title: page.seoTitle,
      description: page.metaDescription,
      breadcrumbLabel: page.content.breadcrumbLabel,
    },
    schema: {
      ...source.schema,
      nameOverride: page.title,
      descriptionOverride: page.description,
    },
  };
}

export function localizeRegionLandingPage(
  source: RegionLandingPage,
  page: LocalizedPublicationPage,
): RegionLandingPage {
  const localizedSolutions = source.recommendedSolutions.map((title) => {
    const slug = title
      .toLowerCase()
      .replace(/\s*&\s*/g, "-")
      .replace(/\s*\/\s*/g, "-")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    return getLocalizedPublicationPage(page.locale, "solution", slug)?.title ?? title;
  });
  const bullets = page.content.sections.flatMap((section) => section.bullets ?? []);

  return {
    ...source,
    seoTitle: page.seoTitle,
    metaDescription: page.metaDescription,
    h1: page.content.h1,
    heroSubtitle: page.content.introduction,
    buyerTypes: page.locale === "ar" ? arabicAudience : chineseAudience,
    regionalNeeds: sectionText(page, 0),
    catalogNote: sectionText(page, 2),
    documentSupport: sectionText(page, 2),
    recommendedCategories: source.recommendedCategories.map(
      (category) => localizeProductCategoryName(category, page.locale),
    ),
    recommendedSolutions: localizedSolutions,
    inquiryChecklist: bullets.length > 0 ? bullets.slice(0, 6) : source.inquiryChecklist,
    productSelection: sectionText(page, 0),
    solutionPlanning: sectionText(page, 1),
    customization: sectionText(page, 2),
    faqs: page.content.faqs.map((faq) => ({ ...faq })),
    primaryCta: page.content.cta.label,
    secondaryCta:
      page.locale === "ar"
        ? "مراجعة الأدلة الفنية"
        : page.content.cta.secondaryLabel ?? "查看产品资料",
    finalCtaTitle: page.content.cta.heading,
    finalCtaText: page.content.cta.description,
    safeClaims: page.locale === "ar" ? arabicSafeClaims : chineseSafeClaims,
    answerCapsule: source.answerCapsule
      ? {
          ...source.answerCapsule,
          heading: page.content.sections[0]?.heading ?? page.content.h1,
          body: sectionText(page, 0),
          links: source.answerCapsule.links.map((link) => ({
            ...link,
            href: localizeReleasedHref(link.href, page.locale),
          })),
        }
      : undefined,
  };
}

export const localizedNonProductSemanticModules = {
  solution: [
    "hero",
    "overview",
    "challenges",
    "architecture",
    "capabilities",
    "recommendedProducts",
    "applications",
    "implementation",
    "purchasing",
    "faq",
    "cta",
    "breadcrumb",
    "schema",
  ],
  resource: [
    "hero",
    "body",
    "structuredContent",
    "faq",
    "recommendedProducts",
    "relevantSolutions",
    "continueReading",
    "midCta",
    "bottomCta",
    "breadcrumb",
    "schema",
  ],
  region: [
    "hero",
    "marketOverview",
    "productCoverage",
    "projectConsiderations",
    "customization",
    "recommendations",
    "cta",
    "breadcrumb",
    "schema",
  ],
} as const;

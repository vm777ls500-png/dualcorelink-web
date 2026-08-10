import { getDirection } from "@/config/i18n";
import { productCategories } from "@/config/product-taxonomy";
import type { ProductGallery } from "@/config/product-galleries";
import type { ProductConversionProfile } from "@/config/product-conversion";
import type { LocalizedPublicationPage } from "@/lib/localized-publication";
import { getLocalizedPublicationPage } from "@/lib/localized-publication";
import type { ProductDetailModel } from "@/types/content";

export const productDetailSectionKeys = [
  "overview",
  "coreFunctions",
  "features",
  "applications",
  "buyingGuide",
  "installation",
  "customization",
  "specifications",
  "relatedProducts",
  "faq",
  "commercialOptions",
  "quote",
] as const;

export type LocalizedProductDetailCopy = {
  overview: string;
  coreFunctions: string;
  features: string;
  applications: string;
  installation: string;
  customization: string;
  faqs: LocalizedPublicationPage["content"]["faqs"];
};

function sectionText(page: LocalizedPublicationPage, index: number): string {
  const section = page.content.sections[index];
  if (!section) return "";
  return [...section.paragraphs, ...(section.bullets ?? [])].join("\n");
}

function matchingSectionText(
  page: LocalizedPublicationPage,
  pattern: RegExp,
): string {
  const section = page.content.sections.find((item) =>
    pattern.test(item.heading),
  );
  return section
    ? [...section.paragraphs, ...(section.bullets ?? [])].join("\n")
    : "";
}

function matchingSpecificationValue(
  page: LocalizedPublicationPage,
  pattern: RegExp,
): string {
  return (
    page.specifications.find((item) => pattern.test(item.label))?.value ?? ""
  );
}

export function createLocalizedProductDetailCopy(
  page: LocalizedPublicationPage,
): LocalizedProductDetailCopy {
  const applications =
    matchingSectionText(page, /适用|应用|场景|مشروع|تطبيق|استخدام/) ||
    matchingSpecificationValue(page, /适用|应用|场景|مشروع|تطبيق|استخدام/) ||
    sectionText(page, 0);

  return {
    overview: page.content.introduction,
    coreFunctions: sectionText(page, 0),
    features: sectionText(page, 1),
    applications,
    installation: sectionText(page, 2),
    customization: sectionText(page, 3),
    faqs: page.content.faqs,
  };
}

export function localizeProductDetailModel(
  source: ProductDetailModel,
  page: LocalizedPublicationPage,
): ProductDetailModel {
  const copy = createLocalizedProductDetailCopy(page);
  const localizedCategoryNames = new Map(
    productCategories.map((category) => [
      category.slug,
      page.locale === "ar"
        ? ({
            "smart-panels-switches": "اللوحات والمفاتيح الذكية",
            "ai-smart-displays": "شاشات التحكم الذكية",
            "rcu-room-control-host": "مضيف التحكم بالغرفة RCU",
            sensors: "المستشعرات",
            "smart-sockets-power-modules": "المقابس الذكية ووحدات الطاقة",
            "hvac-thermostat-control": "التحكم في HVAC والثرموستات",
            "curtain-control-panels": "لوحات التحكم في الستائر",
            "room-status-hotel-service-panels": "لوحات حالة الغرفة وخدمات الفندق",
            "hotel-audio-communication-devices": "أجهزة الصوت والاتصال الفندقية",
            "hotel-delivery-robot-system": "نظام روبوت التوصيل الفندقي",
          } as Record<string, string>)[category.slug] ?? category.title
        : category.chineseTitle,
    ]),
  );

  return {
    ...source,
    language: page.locale,
    direction: getDirection(page.locale),
    title: page.title,
    excerpt: page.description,
    shortDescription: page.description,
    content: copy.overview,
    coreFunctions: copy.coreFunctions,
    productFeatures: copy.features,
    applicationScenarios: copy.applications,
    installationPosition: copy.installation,
    customizationOptions: copy.customization,
    technicalSpecsText: "",
    faqsText: "",
    categoryNames: source.categorySlugs.map(
      (slug) => localizedCategoryNames.get(slug) ?? slug,
    ),
    specifications: [...page.specifications],
    relatedProducts: source.relatedProducts.map((item) => {
      const localized = getLocalizedPublicationPage(
        page.locale,
        "product",
        item.slug,
      );
      return localized
        ? {
            ...item,
            language: page.locale,
            direction: getDirection(page.locale),
            title: localized.title,
            excerpt: localized.description,
          }
        : item;
    }),
    relatedFaqs: [],
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

export function localizeProductGallery(
  gallery: ProductGallery,
  page: LocalizedPublicationPage,
): ProductGallery {
  return {
    featuredImage: {
      ...gallery.featuredImage,
      alt:
        page.content.imageAlt ||
        (page.locale === "ar"
          ? `الصورة الرئيسية لمنتج ${page.title}`
          : `${page.title}产品主图`),
    },
    gallery: gallery.gallery.map((image, index) => ({
      ...image,
      alt:
        page.locale === "ar"
          ? `صورة المنتج ${page.title} ${index + 2}`
          : `${page.title}产品图 ${index + 2}`,
    })),
  };
}

export function localizeProductConversionProfile(
  profile: ProductConversionProfile | null | undefined,
  page: LocalizedPublicationPage,
): ProductConversionProfile | undefined {
  if (!profile) return undefined;

  if (page.locale === "ar") {
    return {
      ...profile,
      label: "تخطيط مشتريات المشروع",
      summary: page.content.introduction,
      highlights: [
        { label: "دور المشروع", value: page.content.eyebrow },
        {
          label: "المشترون المناسبون",
          value: "مالكو الفنادق والمقاولون ومتكاملو الأنظمة",
        },
        {
          label: "ما يجب تأكيده",
          value: "التركيب والواجهات والكمية وشروط التسليم",
        },
      ],
      whatsappPrompt: `مرحباً DUALCORE LINK، أود مناقشة اختيار ${page.title} لمشروع فندقي.`,
    };
  }

  return {
    ...profile,
    label: "项目采购规划",
    summary: page.content.introduction,
    highlights: [
      { label: "项目职责", value: page.content.eyebrow },
      { label: "适用买方", value: "酒店业主、承包商与系统集成商" },
      { label: "优先确认", value: "安装、接口、数量与交付条件" },
    ],
    whatsappPrompt: `您好，DUALCORE LINK。我想咨询${page.title}的酒店项目选型。`,
  };
}

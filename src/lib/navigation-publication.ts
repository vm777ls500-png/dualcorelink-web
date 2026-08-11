import type { Locale } from "@/config/i18n";
import { productSeries } from "@/config/product-series";
import { productCategories } from "@/config/product-taxonomy";
import {
  buildPublishedNavigationHref,
  isReleasedLocalizedPath,
} from "@/lib/multilingual-release-batches";
import { isReviewPreviewLocale } from "@/lib/multilingual-review-preview";
import { getPublicationHreflang } from "@/lib/localized-publication";

export type HeaderNavigationLink = {
  key: string;
  label: string;
  href: string;
};

export type HeaderProductLink = HeaderNavigationLink & {
  description?: string;
};

export type HeaderProductsMenu = {
  quickLinks: HeaderProductLink[];
  categories: HeaderProductLink[];
  series: HeaderProductLink[];
  featured: HeaderProductLink[];
  viewAllCategories: HeaderProductLink;
  viewAllProducts: HeaderProductLink;
};

export type HeaderLanguageOption = {
  locale: "en" | "zh" | "ar" | "vi";
  label: string;
  active: boolean;
  available: boolean;
  href?: string;
  unavailableMessage?: string;
};

const categoryPriority = [
  "rcu-room-control-host",
  "ai-smart-displays",
  "smart-panels-switches",
  "hvac-thermostat-control",
  "sensors",
  "room-status-hotel-service-panels",
  "hotel-audio-communication-devices",
  "hotel-delivery-robot-system",
  "smart-sockets-power-modules",
  "curtain-control-panels",
] as const;

const seriesPriority = [
  "borui-series",
  "vintage-series",
  "brushed-aluminum-series",
  "smart-series",
] as const;

const featuredProducts = [
  {
    slug: "hotel-smart-room-rcu-host-1",
    en: "Hotel Smart Room RCU Host",
    zh: "酒店智能客房 RCU 控制主机",
    ar: "مضيف RCU ذكي لغرفة الفندق",
    vi: "Bộ điều khiển RCU phòng khách sạn thông minh",
  },
  {
    slug: "rcu-controller-cabinet",
    en: "RCU Controller Cabinet",
    zh: "酒店客房 RCU 控制箱",
    ar: "خزانة تحكم RCU لغرفة الفندق",
    vi: "Tủ điều khiển RCU phòng khách sạn",
  },
  {
    slug: "86-type-ai-smart-control-display",
    en: "86-Type AI Smart Control Display",
    zh: "86 型 AI 智能控制屏",
    ar: "شاشة تحكم ذكية AI من نوع 86",
    vi: "Màn hình điều khiển thông minh AI loại 86",
  },
  {
    slug: "smart-four-key-scene-control-panel",
    en: "Smart Four-Key Scene Control Panel",
    zh: "四键酒店场景控制面板",
    ar: "لوحة تحكم ذكية بأربعة مفاتيح للمشاهد",
    vi: "Bảng điều khiển ngữ cảnh thông minh bốn phím",
  },
] as const;

function normalizedContentPath(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, "");
}

function localizedPath(locale: "en" | "zh" | "ar" | "vi", contentPath: string): string {
  const normalized = normalizedContentPath(contentPath);
  return normalized ? `/${locale}/${normalized}/` : `/${locale}/`;
}

function releasedHref(locale: Locale, contentPath: string): string {
  const normalized = normalizedContentPath(contentPath);
  if (!normalized) {
    if (locale === "zh") return "/zh/about/";
    if (locale === "ar") return "/ar/about/";
    if (locale === "vi" && isReviewPreviewLocale(locale)) return "/vi/about/";
    return "/en/";
  }
  if (locale === "ar") return localizedPath("ar", normalized);
  if (locale === "vi" && isReviewPreviewLocale(locale)) return localizedPath("vi", normalized);
  return buildPublishedNavigationHref(locale, normalized);
}

export function buildHeaderPrimaryNavigation(
  locale: Locale,
): HeaderNavigationLink[] {
  const chinese = locale === "zh";
  const arabic = locale === "ar";
  const vietnamese = locale === "vi" && isReviewPreviewLocale(locale);
  const items = chinese
    ? [
        ["home", "首页", ""],
        ["products", "产品中心", "products"],
        ["solutions", "解决方案", "solutions"],
        ["resources", "资源中心", "resources"],
        ["regions", "服务地区", "regions"],
        ["about", "关于我们", "about"],
        ["contact", "联系我们", "contact"],
      ]
    : arabic
      ? [
          ["home", "الرئيسية", ""],
          ["products", "المنتجات", "products"],
          ["solutions", "الحلول", "solutions"],
          ["resources", "الموارد", "resources"],
          ["regions", "المناطق", "regions"],
          ["about", "من نحن", "about"],
          ["contact", "اتصل بنا", "contact"],
        ]
      : vietnamese
        ? [
          ["home", "Giới thiệu", "about"],
          ["products", "Sản phẩm", "products"],
          ["solutions", "Giải pháp", "solutions"],
          ["resources", "Tài nguyên", "resources"],
          ["regions", "Khu vực", "regions"],
          ["about", "Về chúng tôi", "about"],
          ["contact", "Liên hệ", "contact"],
        ]
      : [
        ["home", "Home", ""],
        ["products", "Products", "products"],
        ["solutions", "Solutions", "solutions"],
        ["resources", "Resources", "resources"],
        ["regions", "Regions", "regions"],
        ["about", "About", "about"],
        ["contact", "Contact", "contact"],
      ];

  return items.map(([key, label, route]) => ({
    key,
    label,
    href: releasedHref(locale, route),
  }));
}

export function buildHeaderProductsMenu(locale: Locale): HeaderProductsMenu {
  const chinese = locale === "zh";
  const arabic = locale === "ar";
  const vietnamese = locale === "vi" && isReviewPreviewLocale(locale);
  const targetLocale: "en" | "zh" | "ar" | "vi" = chinese
    ? "zh"
    : arabic
      ? "ar"
      : vietnamese
        ? "vi"
      : "en";
  const productsHref = localizedPath(targetLocale, "products");
  const productHref = (slug: string) =>
    releasedHref(locale, `products/${slug}`);
  const solutionHref = (slug: string) =>
    releasedHref(locale, `solutions/${slug}`);

  const categories = [...productCategories]
    .sort(
      (left, right) =>
        categoryPriority.indexOf(
          left.slug as (typeof categoryPriority)[number],
        ) -
        categoryPriority.indexOf(
          right.slug as (typeof categoryPriority)[number],
        ),
    )
    .map((category) => ({
      key: category.slug,
      label: chinese
        ? category.chineseTitle
        : arabic
          ? ({
              "smart-panels-switches": "اللوحات والمفاتيح الذكية",
              "ai-smart-displays": "شاشات التحكم الذكية",
              "rcu-room-control-host": "وحدات تحكم RCU",
              sensors: "المستشعرات",
              "smart-sockets-power-modules": "المقابس ووحدات الطاقة",
              "hvac-thermostat-control": "HVAC والثرموستات",
              "curtain-control-panels": "لوحات الستائر",
              "room-status-hotel-service-panels": "حالة الغرفة وخدمات الفندق",
              "hotel-audio-communication-devices": "الصوت والاتصال الفندقي",
              "hotel-delivery-robot-system": "روبوتات التوصيل الفندقية",
            } as Record<string, string>)[category.slug] ?? category.title
          : vietnamese
            ? ({
              "smart-panels-switches": "Bảng điều khiển và công tắc thông minh",
              "ai-smart-displays": "Màn hình điều khiển thông minh",
              "rcu-room-control-host": "Bộ điều khiển phòng RCU",
              sensors: "Cảm biến",
              "smart-sockets-power-modules": "Ổ cắm và mô-đun nguồn",
              "hvac-thermostat-control": "Điều khiển HVAC và bộ điều nhiệt",
              "curtain-control-panels": "Bảng điều khiển rèm",
              "room-status-hotel-service-panels": "Trạng thái phòng và dịch vụ khách sạn",
              "hotel-audio-communication-devices": "Âm thanh và liên lạc khách sạn",
              "hotel-delivery-robot-system": "Robot giao hàng khách sạn",
            } as Record<string, string>)[category.slug] ?? category.title
          : category.title,
      href: chinese || arabic || vietnamese
        ? productsHref
        : `${productsHref}#category-${category.slug}`,
      description: category.description,
    }));

  const series = [...productSeries]
    .sort(
      (left, right) =>
        seriesPriority.indexOf(left.slug as (typeof seriesPriority)[number]) -
        seriesPriority.indexOf(right.slug as (typeof seriesPriority)[number]),
    )
    .map((seriesItem) => ({
      key: seriesItem.slug,
      label: chinese ? seriesItem.chineseTitle : seriesItem.title,
      href: chinese || arabic || vietnamese
        ? productsHref
        : `/en/product-series/#${seriesItem.slug}`,
      description: seriesItem.description,
    }));

  return {
    quickLinks: [
      {
        key: "all-products",
        label: arabic ? "كل المنتجات" : chinese ? "全部产品" : vietnamese ? "Tất cả sản phẩm" : "All Products",
        href: productsHref,
      },
      {
        key: "new-products",
        label: arabic ? "منتجات جديدة" : chinese ? "新产品" : vietnamese ? "Sản phẩm mới" : "New Products",
        href: productHref("86-type-ai-smart-control-display"),
      },
      {
        key: "oem-odm-products",
        label: arabic ? "منتجات OEM / ODM" : chinese ? "OEM / ODM 产品" : vietnamese ? "Sản phẩm OEM / ODM" : "OEM / ODM Products",
        href: solutionHref("oem-odm-custom-panel-solution"),
      },
    ],
    categories,
    series,
    featured: featuredProducts.map((product) => ({
      key: product.slug,
      label: arabic ? product.ar : chinese ? product.zh : vietnamese ? product.vi : product.en,
      href: productHref(product.slug),
    })),
    viewAllCategories: {
      key: "view-all-categories",
      label: arabic ? "عرض كل الفئات" : chinese ? "查看全部分类" : vietnamese ? "Xem tất cả danh mục" : "View All Categories",
      href: productsHref,
    },
    viewAllProducts: {
      key: "view-all-products",
      label: arabic ? "عرض كل المنتجات" : chinese ? "查看全部产品" : vietnamese ? "Xem tất cả sản phẩm" : "View All Products",
      href: productsHref,
    },
  };
}

export function buildHeaderLanguageOptions(
  locale: Locale,
  contentPath: string,
): HeaderLanguageOption[] {
  const normalized = normalizedContentPath(contentPath);
  const chineseAvailable = isReleasedLocalizedPath("zh", normalized);
  const arabicAvailable = isReleasedLocalizedPath("ar", normalized);
  const vietnameseAvailable =
    isReviewPreviewLocale("vi") &&
    Boolean(getPublicationHreflang(normalized).vi);
  const englishHref = localizedPath("en", normalized);
  const chineseHref = localizedPath("zh", normalized);
  const arabicHref = localizedPath("ar", normalized);
  const vietnameseHref = localizedPath("vi", normalized);

  const options: HeaderLanguageOption[] = [
    {
      locale: "en",
      label: "English",
      active: locale === "en",
      available: true,
      href: locale === "en" ? undefined : englishHref,
    },
    {
      locale: "zh",
      label: "简体中文",
      active: locale === "zh",
      available: locale === "zh" || chineseAvailable,
      href:
        locale === "zh" || !chineseAvailable ? undefined : chineseHref,
      unavailableMessage: chineseAvailable
        ? undefined
        : "当前页面暂未提供",
    },
  ];
  options.push({
    locale: "ar",
    label: "العربية",
    active: locale === "ar",
    available: locale === "ar" || arabicAvailable,
    href: locale === "ar" || !arabicAvailable ? undefined : arabicHref,
    unavailableMessage: arabicAvailable
      ? undefined
      : "This page is not available yet.",
  });
  if (vietnameseAvailable || locale === "vi") {
    options.push({
      locale: "vi",
      label: "Tiếng Việt",
      active: locale === "vi",
      available: true,
      href: locale === "vi" ? undefined : vietnameseHref,
    });
  }
  return options;
}

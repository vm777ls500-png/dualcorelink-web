import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import {
  getLocalizedCompositionHomePath,
  supportsSpecializedLocalizedComposition,
} from "@/lib/multilingual-review-preview";
import { brand } from "@/config/brand";
import { isLocale } from "@/config/i18n";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
} from "@/lib/localized-publication";
import {
  getLocalizedContentTitle,
  localizeProductCategoryName,
  localizeReleasedHref,
} from "@/lib/localized-nonproduct";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createSchemaGraph,
} from "@/lib/schema";

type SolutionsPageProps = {
  params: Promise<{ locale: string }>;
};

const solutionEntries = [
  {
    slug: "hotel-guest-room-control-solution",
    title: "Hotel Guest Room Control Solution",
    description:
      "A guest room control package for lighting, HVAC, curtains, service status, sensing, and room power workflows.",
    projectType: "Hotel guest rooms, serviced apartments, and smart room upgrades",
    categories: [
      "AI Smart Displays",
      "RCU Room Control Host",
      "Sensors",
      "Smart Sockets & Power Modules",
      "Curtain Control Panels",
      "Room Status & Hotel Service Panels",
    ],
    products: [
      ["86-Type AI Smart Control Display", "86-type-ai-smart-control-display"],
      ["RCU Controller Cabinet", "rcu-controller-cabinet"],
      ["Embedded Human Presence Sensor", "embedded-human-presence-sensor"],
      ["Smart USB Five-Hole Socket", "smart-usb-five-hole-socket"],
      [
        "Smart Four-Key Curtain Control Panel",
        "smart-four-key-curtain-control-panel",
      ],
      [
        "Brushed Aluminum 86-Base Doorbell Panel",
        "brushed-aluminum-86-base-doorbell-panel",
      ],
    ],
  },
  {
    slug: "smart-hotel-automation-solution",
    title: "Smart Hotel Automation Solution",
    description:
      "Integrated automation planning for guest rooms, public areas, service delivery, and hotel operations.",
    projectType: "New hotel projects, renovation projects, and multi-area automation",
    categories: [
      "AI Smart Displays",
      "RCU Room Control Host",
      "Sensors",
      "Hotel Delivery Robot System",
    ],
    products: [
      ["AI Large Smart Display", "ai-large-smart-display"],
      ["Hotel Smart Room RCU Host 1", "hotel-smart-room-rcu-host-1"],
      ["Infrared Repeater", "infrared-repeater"],
      ["Hotel Delivery Robot", "hotel-delivery-robot"],
      ["Hotel Smart Delivery Cabinet", "hotel-smart-delivery-cabinet"],
    ],
  },
  {
    slug: "ai-smart-display-solution",
    title: "AI Smart Display Solution",
    description:
      "Display-based control interfaces for room scenes, HVAC, music, services, and smart device control.",
    projectType: "Hotel rooms, apartments, villas, and smart space control panels",
    categories: ["AI Smart Displays", "HVAC & Thermostat Control"],
    products: [
      ["86-Type AI Smart Control Display", "86-type-ai-smart-control-display"],
      ["AI Large Smart Display", "ai-large-smart-display"],
      [
        "Rotary Knob Smart Control Display",
        "rotary-knob-smart-control-display",
      ],
      ["Thermostat HVAC Control Panel", "thermostat-hvac-control-panel"],
      ["AI Music Control Panel", "ai-music-control-panel"],
      [
        "Smart Three-Key Music Control Panel",
        "smart-three-key-music-control-panel",
      ],
    ],
  },
  {
    slug: "rcu-room-control-solution",
    title: "RCU Room Control Solution",
    description:
      "RCU host, cabinet, sensor, socket, and panel coordination for hotel room control systems.",
    projectType: "Hotel guest room control systems and system integrator packages",
    categories: [
      "RCU Room Control Host",
      "Sensors",
      "Curtain Control Panels",
      "Smart Sockets & Power Modules",
    ],
    products: [
      ["RCU Controller Cabinet", "rcu-controller-cabinet"],
      ["Hotel Smart Room RCU Host 1", "hotel-smart-room-rcu-host-1"],
      ["Embedded Human Presence Sensor", "embedded-human-presence-sensor"],
      [
        "Smart Four-Key Curtain Control Panel",
        "smart-four-key-curtain-control-panel",
      ],
      [
        "Smart Key Card Energy Saver Panel",
        "smart-key-card-energy-saver-panel",
      ],
    ],
  },
  {
    slug: "hotel-delivery-robot-solution",
    title: "Hotel Delivery Robot Solution",
    description:
      "Robot and smart cabinet workflows for guest supplies, service delivery, and hotel retail operations.",
    projectType: "Hotel service automation, guest supply delivery, and public area operations",
    categories: ["Hotel Delivery Robot System"],
    products: [
      ["Hotel Delivery Robot", "hotel-delivery-robot"],
      [
        "Hotel Delivery Robot Charging Dock",
        "hotel-delivery-robot-charging-dock",
      ],
      ["Hotel Smart Delivery Cabinet", "hotel-smart-delivery-cabinet"],
    ],
  },
  {
    slug: "oem-odm-custom-panel-solution",
    title: "OEM / ODM Custom Panel Solution",
    description:
      "Custom panel appearance, labeling, product mix planning, and B2B project supply support.",
    projectType: "Distributors, wholesalers, contractors, and private-label buyers",
    categories: [
      "Smart Series",
      "Brushed Aluminum Series",
      "Smart Sockets & Power Modules",
      "Curtain Control Panels",
    ],
    products: [
      ["Smart USB Five-Hole Socket", "smart-usb-five-hole-socket"],
      [
        "Smart Key Card Energy Saver Panel",
        "smart-key-card-energy-saver-panel",
      ],
      [
        "Vintage Gold Key Card Energy Saver Panel",
        "vintage-gold-key-card-energy-saver-panel",
      ],
      [
        "Smart Four-Key Curtain Control Panel",
        "smart-four-key-curtain-control-panel",
      ],
      [
        "Brushed Aluminum 86-Base Doorbell Panel",
        "brushed-aluminum-86-base-doorbell-panel",
      ],
    ],
  },
] as const;

export async function generateMetadata({
  params,
}: SolutionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(
    locale,
    "solution-listing",
    "solutions",
  );
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
  const path = buildLocalizedPath(locale, "solutions");
  return createMetadata({
    locale,
    path,
    title: "Smart Hotel Room Control & Automation Solutions",
    description:
      "Smart hotel room control, automation, RCU, display, delivery robot, and OEM/ODM solution directions for B2B projects.",
    hreflang: getPublicationHreflang("solutions"),
  });
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }
  const localizedPage = getLocalizedPublicationPage(
    locale,
    "solution-listing",
    "solutions",
  );
  if (
    localizedPage &&
    !supportsSpecializedLocalizedComposition(locale)
  ) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }

  const isChinese = locale === "zh" && Boolean(localizedPage);
  const isArabic = locale === "ar" && Boolean(localizedPage);
  const isVietnamese = locale === "vi" && Boolean(localizedPage);
  const listingEntries = solutionEntries.map((entry) => ({
    ...entry,
    title: getLocalizedContentTitle(
      locale,
      "solution",
      entry.slug,
      entry.title,
    ),
    description:
      getLocalizedPublicationPage(locale, "solution", entry.slug)?.description ??
      entry.description,
    categories: entry.categories.map((category) =>
      localizeProductCategoryName(category, locale),
    ),
    products: entry.products.map(([name, slug]) => [
      getLocalizedContentTitle(locale, "product", slug, name),
      slug,
    ] as const),
  }));

  const path = buildLocalizedPath(locale, "solutions");
  const url = buildSiteUrl(path);
  const whatsappUrl = `https://wa.me/${brand.whatsapp.international}?text=${encodeURIComponent(
    isVietnamese
      ? "Xin chào DUALCORE LINK, tôi muốn trao đổi về giải pháp tự động hóa khách sạn thông minh."
      : "Hello DUALCORE LINK, I would like to discuss a smart hotel automation solution.",
  )}`;
  const graph = createSchemaGraph([
    createCollectionPageSchema({
      id: `${url}#collection`,
      url,
      name: localizedPage?.title ?? "DUALCORE LINK Smart Hotel Solutions",
      description:
        localizedPage?.metaDescription ??
        "Smart hotel room control, automation, RCU, display, delivery robot, and OEM/ODM solution directions for B2B projects.",
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: isVietnamese ? "Trang chủ" : "Home", url: buildSiteUrl(getLocalizedCompositionHomePath(locale)) },
      { name: localizedPage?.content.breadcrumbLabel ?? "Solutions", url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <section className="solutions-page-shell mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <header className="solutions-system-hero mb-10 flex flex-col justify-between gap-5 border border-line p-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand">
              {localizedPage?.content.eyebrow ?? "B2B solution planning"}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground">
              {localizedPage?.content.h1 ??
                "Smart Hotel Room Control & Automation Solutions"}
            </h1>
            <p className="mt-4 leading-7 text-muted">
              {localizedPage?.content.introduction ??
                "Compare system-level paths for hotel room control, automation, RCU planning, smart displays, service workflows, and OEM/ODM programs. Each solution helps hotel owners, contractors, and integrators move from project requirements to an appropriate product mix and inquiry."}
            </p>
          </div>
          <div className="solutions-hero-actions flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact/#get-a-quote`}
              className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
            >
              {isArabic ? "إرسال استفسار المشروع" : isChinese ? "提交项目询盘" : isVietnamese ? "Gửi yêu cầu dự án" : "Send Inquiry"}
            </Link>
            <a
              href={whatsappUrl}
              className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
            >
              {brand.whatsapp.label}
            </a>
          </div>
        </header>

        <div className="solutions-audience-strip mb-10 grid gap-3 border-y border-line py-5 text-sm font-semibold text-muted sm:grid-cols-2 lg:grid-cols-5">
          <p>{isArabic ? "مالكو الفنادق" : isChinese ? "酒店业主" : isVietnamese ? "Chủ đầu tư khách sạn" : "Hotel owners"}</p>
          <p>{isArabic ? "المقاولون" : isChinese ? "承包商" : isVietnamese ? "Nhà thầu" : "Contractors"}</p>
          <p>{isArabic ? "متكاملو الأنظمة" : isChinese ? "系统集成商" : isVietnamese ? "Đơn vị tích hợp hệ thống" : "System integrators"}</p>
          <p>{isArabic ? "الموزعون" : isChinese ? "分销商" : isVietnamese ? "Nhà phân phối" : "Distributors"}</p>
          <p>{isArabic ? "مشترو OEM/ODM" : isChinese ? "OEM/ODM 买家" : isVietnamese ? "Bên mua OEM/ODM" : "OEM/ODM buyers"}</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {listingEntries.map((entry) => (
            <section
              key={entry.slug}
              id={entry.slug}
              className="solution-list-card border border-line bg-surface p-6"
            >
              <p className="text-xs font-semibold uppercase text-brand">
                {isArabic ? "الحل" : isChinese ? "解决方案" : isVietnamese ? "Giải pháp" : "Solution"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                {entry.title}
              </h2>
              <p className="mt-3 leading-7 text-muted">{entry.description}</p>

              <div className="mt-5 border-t border-line pt-5">
                <p className="text-sm font-semibold text-foreground">
                  {isArabic ? "نوع المشروع المناسب" : isChinese ? "适用项目类型" : isVietnamese ? "Loại dự án phù hợp" : "Suitable project type"}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {entry.projectType}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground">
                  {isArabic ? "فئات المنتجات الموصى بها" : isChinese ? "推荐产品类别" : isVietnamese ? "Nhóm sản phẩm đề xuất" : "Recommended product categories"}
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {entry.categories.map((category) => (
                    <li
                      key={category}
                      className="solution-filter-chip border border-line bg-background px-3 py-2 text-xs font-semibold text-brand"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground">
                  {isArabic ? "المنتجات الموصى بها" : isChinese ? "推荐产品" : isVietnamese ? "Sản phẩm đề xuất" : "Recommended products"}
                </p>
                <ul className="mt-3 grid gap-2 text-sm text-muted">
                  {entry.products.map(([name, slug]) => (
                    <li key={slug}>
                      <Link
                        href={`/${locale}/products/${slug}/`}
                        className="solution-product-link hover:text-brand"
                      >
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {entry.slug === "rcu-room-control-solution" ? (
                <p className="mt-5 border-s-2 border-brand ps-4 text-sm leading-6 text-muted">
                  {isArabic ? "هل تحتاج الأساسيات التقنية أولاً؟ اقرأ" : isChinese ? "需要先了解技术基础？请阅读" : isVietnamese ? "Cần nắm kiến thức kỹ thuật trước? Xem" : "Need the technical basics first? Review"}{" "}
                  <Link
                    href={`/${locale}/resources/what-is-hotel-rcu-room-control-system/`}
                    className="font-semibold text-brand underline decoration-brand/40 underline-offset-4"
                  >
                    {isArabic ? "أساسيات التحكم في غرف الفنادق عبر RCU" : isChinese ? "酒店 RCU 客房控制基础指南" : isVietnamese ? "kiến thức cơ bản về điều khiển phòng khách sạn bằng RCU" : "hotel RCU room control fundamentals"}
                  </Link>{" "}
                  {isArabic ? " قبل تحديد نطاق المنتجات والتكامل." : isChinese ? "，再确定产品和集成范围。" : isVietnamese ? " trước khi xác định phạm vi sản phẩm và tích hợp." : "before defining the product and integration scope."}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/solutions/${entry.slug}/`}
                  className="solution-card-link inline-flex min-h-10 items-center justify-center border border-line px-4 py-2 text-sm font-semibold text-brand"
                >
                  {isArabic ? "عرض الحل" : isChinese ? "查看解决方案" : isVietnamese ? "Xem giải pháp" : "View Solution"}
                </Link>
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-10 items-center justify-center border border-brand bg-brand px-4 py-2 text-sm font-semibold text-white"
                >
                  {isArabic ? "طلب عرض سعر" : isChinese ? "获取报价" : isVietnamese ? "Yêu cầu báo giá" : "Get a Quote"}
                </Link>
              </div>
            </section>
          ))}
        </div>

        <section className="solutions-entry-panel mt-12 border border-line bg-background p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-brand">
                {isArabic ? "سيناريوهات الاستخدام" : isChinese ? "应用场景" : isVietnamese ? "Tình huống ứng dụng" : "Application scenarios"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                {isArabic ? "اربط تخطيط الحل بمساحات المشروع الفعلية" : isChinese ? "让解决方案规划对应真实项目空间" : isVietnamese ? "Gắn kế hoạch giải pháp với không gian dự án thực tế" : "Match solution planning with real project spaces"}
              </h2>
              <p className="mt-3 leading-7 text-muted">
                {isChinese
                  ? "查看酒店客房自动化、智能公寓控制、酒店公共区域自动化和系统集成场景。"
                  : isVietnamese
                    ? "Xem các tình huống tự động hóa phòng khách sạn, điều khiển căn hộ thông minh, khu vực công cộng và tích hợp hệ thống."
                    : "Explore hotel guest room automation, smart apartment control, hotel public area automation, and system integration scenarios."}
              </p>
            </div>
            <Link
              href={isVietnamese ? "/vi/resources/hotel-guest-room-automation-guide/" : localizeReleasedHref("/en/application-scenarios/", locale)}
              className="inline-flex min-h-11 shrink-0 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
            >
              {isArabic ? "عرض سيناريوهات الاستخدام" : isChinese ? "查看应用场景" : isVietnamese ? "Xem hướng dẫn tự động hóa phòng" : "View Application Scenarios"}
            </Link>
          </div>
        </section>

        <section className="solutions-entry-panel mt-8 border border-line bg-surface p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-brand">
                {isArabic ? "مراجع المشروعات" : isChinese ? "案例参考" : isVietnamese ? "Tham khảo dự án" : "Case studies"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                {isArabic ? "عرض مراجع مشروعات مجهولة الهوية" : isChinese ? "查看匿名项目参考" : isVietnamese ? "Xem bối cảnh dự án theo khu vực" : "See Anonymous Project References"}
              </h2>
              <p className="mt-3 leading-7 text-muted">
                {isChinese
                  ? "查看酒店客房控制、服务式公寓自动化和 OEM/ODM 智能面板定制的项目参考。"
                  : isVietnamese
                    ? "Tham khảo yêu cầu điều khiển phòng, tự động hóa căn hộ dịch vụ và tùy chỉnh bảng điều khiển OEM/ODM theo thị trường."
                    : "Review practical project examples for hotel room control, serviced apartment automation, and OEM/ODM smart panel customization."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={isVietnamese ? "/vi/regions/" : localizeReleasedHref("/en/case-studies/", locale)}
                className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                {isArabic ? "عرض دراسات الحالة" : isChinese ? "查看案例" : isVietnamese ? "Xem khu vực dự án" : "View Case Studies"}
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
              >
                {isArabic ? "ناقش مشروعك" : isChinese ? "讨论项目" : isVietnamese ? "Trao đổi về dự án" : "Discuss Your Project"}
              </Link>
            </div>
          </div>
        </section>

        <section className="solutions-quote-panel mt-8 bg-brand p-6 text-white">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-white/70">
                {isArabic ? "استشارة المشروع" : isChinese ? "项目咨询" : isVietnamese ? "Tư vấn dự án" : "Project consultation"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {isArabic ? "خطط لمزيج المنتجات المناسب لمشروع أتمتة الفندق." : isChinese ? "为酒店自动化项目规划产品组合。" : isVietnamese ? "Lập danh mục sản phẩm phù hợp cho dự án tự động hóa khách sạn." : "Build a product mix for your hotel automation project."}
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/products/`}
                className="cta-button-light inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold"
              >
                {isArabic ? "استكشاف المنتجات" : isChinese ? "浏览产品" : isVietnamese ? "Xem sản phẩm" : "Explore Products"}
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
              >
                {isArabic ? "إرسال استفسار" : isChinese ? "提交询盘" : isVietnamese ? "Gửi yêu cầu" : "Send Inquiry"}
              </Link>
              <a
                href={whatsappUrl}
                className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
              >
                {brand.whatsapp.label}
              </a>
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

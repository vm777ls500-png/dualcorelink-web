import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resources } from "@/config/resources";
import { isLocale, type Locale } from "@/config/i18n";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createItemListSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { JsonLd } from "@/components/seo/json-ld";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import {
  getLocalizedCompositionHomePath,
  supportsSpecializedLocalizedComposition,
} from "@/lib/multilingual-review-preview";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
} from "@/lib/localized-publication";
import {
  localizeReleasedHref,
  localizeResourceGuide,
} from "@/lib/localized-nonproduct";

type ResourcesPageProps = {
  params: Promise<{ locale: string }>;
};

const resourcesDescription =
  "B2B resources for hotel owners, contractors, system integrators, distributors, and OEM/ODM buyers planning smart hotel automation projects.";

const listingGroups = [
  "Buying Guides",
  "Hotel Automation Guides",
  "OEM/ODM Guides",
  "Technical Resources",
] as const;

function ResourceCard({
  locale,
  resource,
  compact = false,
}: {
  locale: Locale;
  resource: (typeof resources)[number];
  compact?: boolean;
}) {
  const isChinese = locale === "zh";
  const isArabic = locale === "ar";
  const isVietnamese = locale === "vi";
  const primarySolution = resource.relatedSolutions[0];
  const primaryProduct = resource.relatedProducts[0];

  return (
    <article className="border border-line bg-surface p-6">
      <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-brand">
        <span className="border border-line bg-background px-2 py-1">
          {resource.category}
        </span>
        <span className="border border-line bg-background px-2 py-1">
          {resource.listingGroup}
        </span>
        <span className="border border-line bg-background px-2 py-1">
          {resource.readingTime}
        </span>
      </div>

      <h3
        className={
          compact
            ? "mt-4 text-xl font-semibold leading-7 text-foreground"
            : "mt-4 text-2xl font-semibold leading-8 text-foreground"
        }
      >
        <Link
          href={`/${locale}/resources/${resource.slug}/`}
          className="hover:text-brand"
        >
          {resource.title}
        </Link>
      </h3>

      <p className="mt-3 leading-7 text-muted">{resource.summary}</p>

      <div className="mt-5 grid gap-3 border-t border-line pt-5 text-sm">
        {primarySolution ? (
          <p>
            <span className="font-semibold text-foreground">
              {isArabic ? "الحل: " : isChinese ? "解决方案：" : isVietnamese ? "Giải pháp: " : "Solution: "}
            </span>
            <Link href={primarySolution.href} className="text-brand">
              {primarySolution.title}
            </Link>
          </p>
        ) : null}
        {primaryProduct ? (
          <p>
            <span className="font-semibold text-foreground">
              {isArabic ? "المنتج: " : isChinese ? "产品：" : isVietnamese ? "Sản phẩm: " : "Product: "}
            </span>
            <Link href={primaryProduct.href} className="text-brand">
              {primaryProduct.title}
            </Link>
          </p>
        ) : null}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {resource.audience.slice(0, 4).map((item) => (
          <span
            key={item}
            className="border border-line bg-background px-3 py-2 text-xs font-semibold text-muted"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`/${locale}/resources/${resource.slug}/`}
          className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 text-sm font-semibold text-white"
        >
          {isArabic ? "قراءة الدليل" : isChinese ? "阅读指南" : isVietnamese ? "Đọc hướng dẫn" : "Read Guide"}
        </Link>
        <Link
          href={`/${locale}/contact/#get-a-quote`}
          className="inline-flex min-h-11 items-center justify-center border border-line bg-background px-5 py-3 text-sm font-semibold text-brand"
        >
          {isArabic ? "طلب عرض سعر" : isChinese ? "获取报价" : isVietnamese ? "Yêu cầu báo giá" : "Request a Quote"}
        </Link>
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(
    locale,
    "resource-listing",
    "resources",
  );
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
  if (locale !== "en") return {};
  const path = buildLocalizedPath(locale, "resources");

  return createMetadata({
    locale,
    path,
    title: "Resources",
    description: resourcesDescription,
    hreflang: getPublicationHreflang("resources"),
  });
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const localizedPage = getLocalizedPublicationPage(
    locale,
    "resource-listing",
    "resources",
  );
  if (
    localizedPage &&
    !supportsSpecializedLocalizedComposition(locale)
  ) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }
  if (locale !== "en" && !localizedPage) notFound();
  const isChinese = locale === "zh" && Boolean(localizedPage);
  const isArabic = locale === "ar" && Boolean(localizedPage);
  const isVietnamese = locale === "vi" && Boolean(localizedPage);
  const listingResources = resources.map((resource) => {
    const page = getLocalizedPublicationPage(locale, "resource", resource.slug);
    return page ? localizeResourceGuide(resource, page) : resource;
  });

  const path = buildLocalizedPath(locale, "resources");
  const url = buildSiteUrl(path);
  const featuredResources = listingResources
    .filter((resource) => resource.featuredPriority)
    .sort((a, b) => (a.featuredPriority ?? 99) - (b.featuredPriority ?? 99));
  const graph = createSchemaGraph([
    createCollectionPageSchema({
      id: `${url}#collection`,
      url,
      name: localizedPage?.title ?? "DUALCORE LINK Resources",
      description: localizedPage?.metaDescription ?? resourcesDescription,
    }),
    createItemListSchema({
      id: `${url}#itemlist`,
      items: listingResources.map((resource) => ({
        name: resource.title,
        url: buildSiteUrl(
          buildLocalizedPath(locale, `resources/${resource.slug}`),
        ),
        description: resource.summary,
      })),
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(getLocalizedCompositionHomePath(locale)) },
      { name: localizedPage?.content.breadcrumbLabel ?? "Resources", url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <section className="border border-line bg-surface p-6 sm:p-8">
          <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-brand">
                {localizedPage?.content.eyebrow ?? "B2B knowledge library"}
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
                {localizedPage?.content.h1 ?? "Resources"}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                {localizedPage?.content.introduction ??
                  "Compare hotel RCU systems, smart room control devices, OEM/ODM smart panels, and guest room automation planning before preparing a quotation request."}
              </p>
            </div>
            <div className="border-s-0 border-line pt-0 text-sm leading-7 text-muted lg:border-s lg:ps-6">
              <p>
                {isArabic
                  ? "كُتبت هذه الأدلة لمشتري B2B الذين يحتاجون اتجاهاً عملياً للمنتج ومسار طلب الوثائق وروابط داخلية قبل مناقشة مشروع أتمتة الفندق."
                  : isChinese
                  ? "这些指南面向需要在酒店自动化项目讨论前明确产品方向、资料路径和采购要点的 B2B 买家。"
                  : isVietnamese
                  ? "Các hướng dẫn này dành cho bên mua B2B cần định hướng sản phẩm thực tế, quy trình yêu cầu tài liệu và liên kết nội bộ trước khi trao đổi về dự án tự động hóa khách sạn."
                  : "These guides are written for overseas B2B buyers who need a practical product direction, document request path, and internal link map before discussing a hotel automation project."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
                >
                  {isArabic ? "طلب عرض سعر" : isChinese ? "获取报价" : isVietnamese ? "Yêu cầu báo giá" : "Get a Quote"}
                </Link>
                <Link
                  href={`/${locale}/faqs/`}
                  className="inline-flex min-h-11 items-center justify-center border border-line bg-background px-5 py-3 font-semibold text-brand"
                >
                  {isArabic ? "أسئلة المشترين الشائعة" : isChinese ? "采购常见问题" : isVietnamese ? "Câu hỏi thường gặp của bên mua" : "Buyer FAQs"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="flex flex-col justify-between gap-4 border-b border-line pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-brand">
                {isArabic ? "أدلة مميزة" : isChinese ? "重点指南" : isVietnamese ? "Hướng dẫn nổi bật" : "Featured guides"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                {isArabic ? "ابدأ بموضوعات مشروعات B2B ذات النية العالية" : isChinese ? "从高意向 B2B 项目主题开始" : isVietnamese ? "Bắt đầu với các chủ đề dự án B2B có nhu cầu rõ ràng" : "Start with high-intent B2B project topics"}
              </h2>
              <p className="mt-2 max-w-3xl leading-7 text-muted">
                {isArabic
                  ? "ابدأ بهذه الأدلة عند مقارنة RCU للفنادق أو أتمتة الغرف الكاملة أو تخصيص لوحات OEM/ODM."
                  : isChinese
                  ? "适合正在比较酒店 RCU、完整客房自动化或 OEM/ODM 智能面板定制的买家优先阅读。"
                  : isVietnamese
                  ? "Đây là các tài liệu nên đọc trước khi so sánh RCU khách sạn, tự động hóa phòng toàn diện hoặc tùy chỉnh bảng điều khiển thông minh OEM/ODM."
                  : "These guides are the best first reads for buyers comparing hotel RCU control, complete room automation, or OEM/ODM smart panel customization."}
              </p>
            </div>
            <Link
              href={localizeReleasedHref("/en/downloads/", locale)}
              className="inline-flex min-h-11 w-fit items-center justify-center border border-line px-5 py-3 text-sm font-semibold text-brand"
            >
              {isArabic ? "طلب أوراق البيانات" : isChinese ? "索取资料" : isVietnamese ? "Yêu cầu tài liệu kỹ thuật" : "Request Datasheets"}
            </Link>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {featuredResources.map((resource) => (
              <ResourceCard key={resource.slug} locale={locale} resource={resource} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="border-b border-line pb-5">
            <p className="text-sm font-semibold uppercase text-brand">
              {isArabic ? "التصفح حسب احتياج المشروع" : isChinese ? "按项目需求浏览" : isVietnamese ? "Duyệt theo nhu cầu dự án" : "Browse by project need"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              {isArabic
                ? "مجموعات موارد للشراء والأتمتة وOEM/ODM والتخطيط التقني"
                  : isChinese
                    ? "采购、自动化、OEM/ODM 与技术规划资源分类"
                    : isVietnamese
                      ? "Nhóm tài nguyên cho mua hàng, tự động hóa, OEM/ODM và lập kế hoạch kỹ thuật"
                    : "Resource groups for buying, automation, OEM/ODM, and technical planning"}
            </h2>
          </div>

          <div className="mt-6 grid gap-8">
            {listingGroups.map((group) => {
              const groupResources = listingResources.filter(
                (resource) => resource.listingGroup === group,
              );
              if (groupResources.length === 0) return null;

              return (
                <section key={group} className="border-t border-line pt-6">
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div>
                      <h2 className="text-2xl font-semibold text-foreground">
                        {isArabic
                          ? {
                              "Buying Guides": "أدلة الشراء",
                              "Hotel Automation Guides": "أدلة أتمتة الفنادق",
                              "OEM/ODM Guides": "أدلة OEM/ODM",
                              "Technical Resources": "موارد تقنية",
                            }[group]
                          : isChinese
                            ? {
                              "Buying Guides": "采购指南",
                              "Hotel Automation Guides": "酒店自动化指南",
                              "OEM/ODM Guides": "OEM/ODM 指南",
                              "Technical Resources": "技术资料",
                            }[group]
                            : isVietnamese
                              ? {
                                "Buying Guides": "Hướng dẫn mua hàng",
                                "Hotel Automation Guides": "Hướng dẫn tự động hóa khách sạn",
                                "OEM/ODM Guides": "Hướng dẫn OEM/ODM",
                                "Technical Resources": "Tài nguyên kỹ thuật",
                              }[group]
                          : group}
                      </h2>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {isArabic
                          ? {
                              "Buying Guides": "قارن عوامل اختيار المنتج قبل حصر الأجهزة وبنود عرض السعر.",
                              "Hotel Automation Guides": "خطط لتدفقات غرف الفندق وأنظمة التحكم ومجموعات الأجهزة.",
                              "OEM/ODM Guides": "راجع نطاق التخصيص والعينات والوثائق ومدخلات عرض السعر.",
                              "Technical Resources": "افهم مفاهيم التحكم بالغرف والتوصيلات ووثائق المنتج والمراجعة الهندسية المبكرة.",
                            }[group]
                          : isChinese
                            ? {
                              "Buying Guides": "在筛选设备和报价项前比较产品选型因素。",
                              "Hotel Automation Guides": "规划酒店客房流程、控制系统与设备组合。",
                              "OEM/ODM Guides": "核对智能面板定制范围、样品、资料和报价输入。",
                              "Technical Resources": "了解客房控制概念、布线问题、产品资料与前期工程审核。",
                            }[group]
                            : isVietnamese
                              ? {
                                "Buying Guides": "So sánh các yếu tố lựa chọn sản phẩm trước khi lập danh sách thiết bị và hạng mục báo giá.",
                                "Hotel Automation Guides": "Lập kế hoạch quy trình phòng khách, hệ thống điều khiển và tổ hợp thiết bị cho dự án khách sạn.",
                                "OEM/ODM Guides": "Rà soát phạm vi tùy chỉnh, mẫu, tài liệu và dữ liệu đầu vào báo giá cho chương trình bảng điều khiển thông minh.",
                                "Technical Resources": "Tìm hiểu điều khiển phòng, hệ thống dây, tài liệu sản phẩm và rà soát kỹ thuật giai đoạn đầu.",
                              }[group]
                          : {
                              "Buying Guides": "Compare product selection factors before shortlisting devices and quote items.",
                              "Hotel Automation Guides": "Plan guest room workflows, control systems, and device combinations for hotel projects.",
                              "OEM/ODM Guides": "Review customization scope, samples, documents, and quote inputs for smart panel programs.",
                              "Technical Resources": "Understand room control concepts, wiring questions, product documents, and early engineering review.",
                            }[group]}
                      </p>
                    </div>
                    <Link
                      href={`/${locale}/contact/#get-a-quote`}
                      className="inline-flex min-h-10 w-fit items-center justify-center border border-line px-4 py-2 text-sm font-semibold text-brand"
                    >
                      {isArabic ? "ناقش هذا الموضوع" : isChinese ? "讨论该主题" : isVietnamese ? "Trao đổi về chủ đề này" : "Discuss This Topic"}
                    </Link>
                  </div>

                  <div className="mt-5 grid gap-5 lg:grid-cols-2">
                    {groupResources.map((resource) => (
                      <ResourceCard
                        key={resource.slug}
                        locale={locale}
                        resource={resource}
                        compact
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </section>

        <section className="mt-12 border border-line bg-foreground p-6 text-white sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase text-white/70">
                {isArabic ? "دعم المشروع" : isChinese ? "项目支持" : isVietnamese ? "Hỗ trợ dự án" : "Project support"}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {isArabic
                  ? "هل تحتاج مساعدة لربط الأدلة بالمنتجات والحلول؟"
                  : isChinese
                    ? "需要协助把指南对应到产品和解决方案？"
                    : isVietnamese
                      ? "Bạn cần hỗ trợ đối chiếu hướng dẫn với sản phẩm và giải pháp?"
                    : "Need help matching guides to products and solutions?"}
              </h2>
              <p className="mt-3 leading-8 text-white/75">
                {isArabic
                  ? "أرسل نوع الغرفة والسوق المستهدف والأجهزة والجهد والبروتوكول والكمية والوثائق المطلوبة لمراجعة المنتجات والحلول ومدخلات عرض السعر."
                  : isChinese
                    ? "请提供房型、目标市场、关注设备、电压、协议偏好、数量与资料需求，团队可按项目核对相关产品、解决方案和报价输入。"
                    : isVietnamese
                      ? "Cung cấp loại phòng, thị trường mục tiêu, thiết bị quan tâm, điện áp, giao thức ưu tiên, số lượng và tài liệu cần thiết để đội ngũ rà soát sản phẩm, giải pháp và dữ liệu báo giá phù hợp."
                    : "Send your room type, target market, device interests, voltage, protocol preference, quantity, and document needs. The team can review relevant products, solutions, catalogs, and quote inputs by project request."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/products/`}
                className="cta-button-light inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold"
              >
                {isArabic ? "استكشاف المنتجات" : isChinese ? "浏览产品" : isVietnamese ? "Xem sản phẩm" : "Explore Products"}
              </Link>
              <Link
                href={`/${locale}/solutions/`}
                className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
              >
                {isArabic ? "عرض الحلول" : isChinese ? "查看解决方案" : isVietnamese ? "Xem giải pháp" : "View Solutions"}
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
              >
                {isArabic ? "إرسال استفسار" : isChinese ? "提交询盘" : isVietnamese ? "Gửi yêu cầu" : "Send Inquiry"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

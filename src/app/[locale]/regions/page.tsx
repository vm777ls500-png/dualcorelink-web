import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/content/empty-state";
import { PageHeading } from "@/components/content/page-heading";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import {
  getLocalizedCompositionHomePath,
  supportsSpecializedLocalizedComposition,
} from "@/lib/multilingual-review-preview";
import { isLocale } from "@/config/i18n";
import {
  getRegionLandingPage,
  regionLandingPages,
} from "@/config/region-landing-pages";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import { stripHtml } from "@/lib/text";
import { regionRepository } from "@/lib/wordpress/repositories";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
} from "@/lib/localized-publication";
import { localizeReleasedHref } from "@/lib/localized-nonproduct";
import { JsonLd } from "@/components/seo/json-ld";
import {
  createBreadcrumbSchema,
  createCollectionPageSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { getSpecializedLabel } from "@/content/locales/m4a-specialized-ui";

type RegionsPageProps = { params: Promise<{ locale: string }> };

const plannedMarkets = [
  { title: "Middle East", slug: "middle-east" },
  { title: "Saudi Arabia", slug: "saudi-arabia" },
  { title: "United Arab Emirates", slug: "uae" },
  { title: "Southeast Asia", slug: "southeast-asia" },
  { title: "Vietnam", slug: "vietnam" },
  { title: "Indonesia", slug: "indonesia" },
  { title: "Thailand", slug: "thailand" },
  { title: "Malaysia", slug: "malaysia" },
];

export async function generateMetadata({
  params,
}: RegionsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(
    locale,
    "region-listing",
    "regions",
  );
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
  return createMetadata({
    locale,
    path: buildLocalizedPath(locale, "regions"),
    title: "Regional Smart Home Markets",
    description:
      "Smart home requirements, certifications, and project priorities across the Middle East and Southeast Asia.",
    hreflang: getPublicationHreflang("regions"),
  });
}

export default async function RegionsPage({ params }: RegionsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const localizedPage = getLocalizedPublicationPage(
    locale,
    "region-listing",
    "regions",
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
  const isLocalized =
    Boolean(localizedPage) && supportsSpecializedLocalizedComposition(locale);
  const label = (english: string) => getSpecializedLabel(locale, english);
  const regions = isLocalized
    ? regionLandingPages.map((region, index) => {
        const page = getLocalizedPublicationPage(
          locale,
          "region",
          region.slug,
        );
        return {
          id: -(index + 1),
          slug: region.slug,
          regionType: locale === "ar" ? "المنطقة" : locale === "zh" ? "区域" : locale === "vi" ? "Khu vực" : label("Region"),
          marketMaturity: locale === "ar" ? "سوق المشروع" : locale === "zh" ? "项目市场" : locale === "vi" ? "Thị trường dự án" : label("Project market"),
          title: page?.title ?? region.h1,
          marketSummary: page?.description ?? region.metaDescription,
          excerpt: page?.description ?? region.metaDescription,
        };
      })
    : await regionRepository.list(locale);
  const path = buildLocalizedPath(locale, "regions");
  const url = buildSiteUrl(path);
  const graph = createSchemaGraph([
    createCollectionPageSchema({
      id: `${url}#collection`,
      url,
      name: localizedPage?.title ?? "DUALCORE LINK Regional Markets",
      description:
        localizedPage?.metaDescription ??
        "Smart home requirements, certifications, and project priorities across the Middle East and Southeast Asia.",
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: label("Home"), url: buildSiteUrl(getLocalizedCompositionHomePath(locale)) },
      { name: localizedPage?.content.breadcrumbLabel ?? label("Regions"), url },
    ]),
  ]);
  return (
    <>
      <JsonLd graph={graph} />
      <main className="regions-page-shell mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <div className="region-market-hero border border-line p-6">
        <PageHeading
          eyebrow={localizedPage?.content.eyebrow ?? "Markets"}
          title={localizedPage?.content.h1 ?? "Regional smart home intelligence"}
          description={
            localizedPage?.content.introduction ??
            "Local demand, technical conditions, certification context, and recommended product strategies."
          }
        />
      </div>
      {regions.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="Regional pages are being prepared"
            description="We currently support regional inquiries through the contact form, WhatsApp, and multilingual catalogs while dedicated market pages are prepared."
          />
        </div>
      ) : (
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {regions.map((region) => (
            <li
              key={region.id}
              className="region-market-card border border-line bg-surface p-6"
            >
              <p className="text-xs font-semibold uppercase text-brand">
                {region.regionType} · {region.marketMaturity || "market"}
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                <Link
                  href={`/${locale}/regions/${region.slug}/`}
                  className="region-card-title-link"
                >
                  {stripHtml(region.title)}
                </Link>
              </h2>
              <p className="mt-4 leading-7 text-muted">
                {stripHtml(region.marketSummary || region.excerpt)}
              </p>
            </li>
          ))}
        </ul>
      )}
      <section className="region-market-quote mt-10 border border-line bg-surface p-6">
        <p className="text-sm font-semibold uppercase text-brand">
          {isArabic ? "الأسواق المستهدفة" : isChinese ? "目标市场" : isVietnamese ? "Thị trường mục tiêu" : label("Target markets")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          {isArabic ? "دعم استفسارات المشروعات الإقليمية" : isChinese ? "区域项目询盘支持" : isVietnamese ? "Hỗ trợ yêu cầu dự án theo khu vực" : label("Regional Project Inquiry Support")}
        </h2>
        <p className="mt-3 max-w-4xl leading-7 text-muted">
          {isArabic
            ? "ندعم استفسارات مشروعات الفنادق الذكية وOEM/ODM في الشرق الأوسط وجنوب شرق آسيا، بما يشمل اختيار المنتجات وتخصيص اللوحات والكتالوجات والوثائق الخاضعة للضبط."
            : isChinese
            ? "我们支持来自中东和东南亚的智能酒店及 OEM/ODM 项目询盘，包括产品选型、面板定制、目录共享与受控资料申请。"
            : isVietnamese
            ? "Chúng tôi hỗ trợ yêu cầu dự án khách sạn thông minh và OEM/ODM tại Trung Đông và Đông Nam Á, gồm lựa chọn sản phẩm, tùy chỉnh bảng điều khiển, chia sẻ danh mục và yêu cầu tài liệu có kiểm soát."
            : "We support smart hotel and OEM/ODM project inquiries from the Middle East and Southeast Asia, including product selection, panel customization, catalog sharing, and controlled document requests."}
        </p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {plannedMarkets.map((market) => (
            <li key={market.slug}>
              {getRegionLandingPage(market.slug) ? (
                <Link
                  href={`/${locale}/regions/${market.slug}/`}
                  className="region-entry-card inline-flex min-h-10 items-center border border-line bg-background px-3 py-2 text-sm font-semibold text-brand hover:border-brand"
                >
                  {getLocalizedPublicationPage(locale, "region", market.slug)
                    ?.title ?? market.title}
                </Link>
              ) : (
                <span className="region-entry-card region-entry-card-muted inline-flex min-h-10 items-center border border-line bg-background px-3 py-2 text-sm font-semibold text-muted">
                  {market.title}
                </span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-4xl text-sm leading-6 text-muted">
          {isArabic
            ? "للمشروعات الإقليمية، أرسل الدولة ونوع غرفة الفندق ومتطلبات الجهد والتردد والبروتوكول والكمية المتوقعة والوثائق المطلوبة."
            : isChinese
            ? "区域项目请提供国家、酒店房型、电压与频率、协议偏好、预计数量和所需资料，以便团队准备合适的产品方向。"
            : isVietnamese
            ? "Với dự án theo khu vực, hãy cung cấp quốc gia, loại phòng khách sạn, yêu cầu điện áp và tần số, giao thức ưu tiên, số lượng dự kiến và tài liệu cần thiết."
            : "For regional projects, share your country, hotel room type, voltage and frequency requirements, protocol preference, estimated quantity, and required documents so our team can prepare the right product direction."}
        </p>
        <div className="region-market-actions mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contact/#get-a-quote`}
            className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
          >
            {isArabic ? "ناقش مشروعاً إقليمياً" : isChinese ? "讨论区域项目" : isVietnamese ? "Trao đổi về dự án khu vực" : label("Discuss Regional Project")}
          </Link>
          <Link
            href={isVietnamese ? "/vi/resources/" : localizeReleasedHref("/en/downloads/", locale)}
            className="inline-flex min-h-11 items-center justify-center border border-line bg-background px-5 py-3 font-semibold text-brand"
          >
            {isArabic ? "عرض الكتالوجات" : isChinese ? "查看产品目录" : isVietnamese ? "Xem tài nguyên" : label("View Catalogs")}
          </Link>
        </div>
      </section>
      </main>
    </>
  );
}

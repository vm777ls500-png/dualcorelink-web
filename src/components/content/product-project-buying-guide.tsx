import Link from "next/link";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import type { Locale } from "@/config/i18n";
import {
  getPriorityProductReinforcement,
  type ProductConversionLink,
  type ProductConversionProfile,
} from "@/config/product-conversion";
import { buildQuoteHref } from "@/lib/inquiry/attribution";
import { getLocalizedPublicationPage } from "@/lib/localized-publication";

type ProductProjectBuyingGuideProps = {
  locale: Locale;
  productSlug: string;
  productTitle: string;
  profile: ProductConversionProfile;
};

export function ProductProjectBuyingGuide({
  locale,
  productSlug,
  productTitle,
  profile,
}: ProductProjectBuyingGuideProps) {
  const baseAttribution = {
    sourcePage: `/${locale}/products/${productSlug}/`,
    contentType: "product" as const,
    contentSlug: productSlug,
    sourceTitle: productTitle,
  };
  const guideAttribution = {
    ...baseAttribution,
    ctaPosition: "product_buying_guide",
  };
  const priorityReinforcement =
    getPriorityProductReinforcement(productSlug);
  const localizedPage =
    locale === "zh" || locale === "ar" || locale === "vi"
      ? getLocalizedPublicationPage(locale, "product", productSlug)
      : undefined;
  const isLocalized = Boolean(localizedPage);
  const isArabic = locale === "ar" && isLocalized;
  const isVietnamese = locale === "vi" && isLocalized;
  const label = (english: string, chinese: string, arabic: string, vietnamese: string) =>
    isArabic ? arabic : isVietnamese ? vietnamese : isLocalized ? chinese : english;
  const localizedSections = localizedPage?.content.sections ?? [];
  const projectFit = isLocalized
    ? localizedSections[0]?.paragraphs ?? []
    : profile.projectFit;
  const selectionChecks = isLocalized
    ? [
        ...(localizedSections[1]?.paragraphs ?? []),
        ...(localizedPage?.specifications.map(
          (item) => `${item.label}：${item.value}`,
        ) ?? []),
      ]
    : profile.selectionChecks;
  const quoteChecklist = isLocalized
    ? localizedSections[3]?.paragraphs ?? []
    : profile.quoteChecklist;
  const solutions = localizeLinks(locale, profile.solutions);
  const resources = localizeLinks(locale, profile.resources);

  return (
    <section
      id="project-buying-guide"
      className="product-project-guide border-t border-line pt-8"
    >
      <header className="max-w-4xl">
        <p className="text-sm font-semibold uppercase text-brand">
          {label("B2B buying guidance", "B2B 采购指引", "إرشادات شراء B2B", "Hướng dẫn mua hàng B2B")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          {label("Plan this product for a real project", "按真实项目条件规划本产品", "خطط المنتج وفق ظروف المشروع الفعلية", "Lập kế hoạch sản phẩm theo điều kiện dự án thực tế")}
        </h2>
        <p className="mt-4 leading-8 text-muted">
          {localizedPage?.content.introduction ?? profile.summary}
        </p>
      </header>

      {priorityReinforcement ? (
        <div className="mt-7 border border-line bg-background p-6">
          <p className="text-sm font-semibold uppercase text-brand">
            {label("Direct product answer", "产品选型要点", "نقاط اختيار المنتج", "Điểm chính khi lựa chọn sản phẩm")}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-7 text-foreground">
            {isArabic
              ? `نقاط اختيار ${productTitle} للمشروع`
              : isVietnamese
                ? `Điểm lựa chọn ${productTitle} cho dự án`
              : isLocalized
                ? `${productTitle}项目选型要点`
              : priorityReinforcement.heading}
          </h3>
          <p className="mt-4 leading-8 text-muted">
            {isLocalized
              ? localizedSections[1]?.paragraphs.join("\n")
              : priorityReinforcement.answer}
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <GuideList
              title={label("Project decision points", "项目决策要点", "نقاط قرار المشروع", "Các điểm quyết định của dự án")}
              items={
                isLocalized
                  ? selectionChecks
                  : priorityReinforcement.decisionPoints
              }
            />
            <RelatedLinks
              locale={locale}
              title={label("Continue project planning", "继续规划项目", "متابعة تخطيط المشروع", "Tiếp tục lập kế hoạch dự án")}
              links={localizeLinks(locale, priorityReinforcement.links)}
            />
          </div>
        </div>
      ) : null}

      <div className="product-project-guide-grid mt-7 grid gap-6 lg:grid-cols-3">
        <GuideList
          title={label("Typical project fit", "典型项目适用范围", "ملاءمة المشروع المعتادة", "Phạm vi dự án phù hợp")}
          items={projectFit}
        />
        <GuideList
          title={label("Confirm before selection", "选型前确认", "ما يجب تأكيده قبل الاختيار", "Xác nhận trước khi lựa chọn")}
          items={selectionChecks}
        />
        <GuideList
          title={label("Prepare for quotation", "询价资料准备", "التحضير لطلب السعر", "Chuẩn bị yêu cầu báo giá")}
          items={quoteChecklist}
        />
      </div>

      <div className="product-project-guide-links mt-8 grid gap-7 border-t border-line pt-7 lg:grid-cols-2">
        <RelatedLinks
          locale={locale}
          title={label("Relevant solutions", "相关解决方案", "حلول ذات صلة", "Giải pháp liên quan")}
          links={solutions}
        />
        <RelatedLinks
          locale={locale}
          title={label("Buyer guides", "采购指南", "أدلة الشراء", "Hướng dẫn mua hàng")}
          links={resources}
        />
      </div>

      <div className="product-project-guide-cta mt-8 border-y border-line bg-background px-5 py-6 sm:px-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="font-semibold text-foreground">
              {label("Request a model and project review", "申请型号与项目审核", "اطلب مراجعة الطراز والمشروع", "Yêu cầu rà soát model và dự án")}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {isArabic
                ? "أرسل الكمية والدولة ونوع الغرفة والمتطلبات الفنية والوثائق والتخصيص وموعد التسليم."
                : isVietnamese
                  ? "Cung cấp số lượng, quốc gia hoặc khu vực dự án, loại phòng, yêu cầu kỹ thuật, tài liệu, phạm vi tùy chỉnh và thời gian giao hàng dự kiến."
                : isLocalized
                  ? "请提供数量、项目国家或地区、房型、技术要求、资料、定制范围和目标交付时间。"
                : "Share quantity, project country, room type, technical requirements, documents, customization scope, and target delivery timing."}
            </p>
          </div>
          <div className="product-project-guide-actions flex flex-wrap gap-3">
            <TrackedInquiryLink
              href={buildQuoteHref(locale, guideAttribution)}
              channel="form"
              attribution={guideAttribution}
              className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
            >
              {label("Request Project Review", "申请项目审核", "طلب مراجعة المشروع", "Yêu cầu rà soát dự án")}
            </TrackedInquiryLink>
            <WhatsAppButton
              message={
                isArabic
                  ? `مرحباً DUALCORE LINK، أود مناقشة اختيار ${productTitle} لمشروع فندقي.`
                  : isVietnamese
                    ? `Xin chào DUALCORE LINK, tôi muốn trao đổi về việc lựa chọn ${productTitle} cho một dự án khách sạn.`
                  : isLocalized
                    ? `您好，DUALCORE LINK。我想咨询${productTitle}的酒店项目选型。`
                  : `${profile.whatsappPrompt} Product: ${productTitle}.`
              }
              attribution={{
                ...baseAttribution,
                ctaPosition: "product_buying_guide_whatsapp",
              }}
              label={isArabic ? "استفسار عبر WhatsApp" : isVietnamese ? "Trao đổi qua WhatsApp" : isLocalized ? "通过 WhatsApp 咨询" : undefined}
              className="inline-flex min-h-11 items-center justify-center border border-line bg-surface px-5 py-3 font-semibold text-brand"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function localizeLinks(
  locale: Locale,
  links: ProductConversionLink[],
): ProductConversionLink[] {
  if (locale !== "zh" && locale !== "ar" && locale !== "vi") return links;

  return links.map((link) => {
    const match = link.href.match(/^\/(solutions|resources)\/([^/]+)\/$/);
    if (!match) return link;
    const [, segment, slug] = match;
    const localized = getLocalizedPublicationPage(
      locale,
      segment === "solutions" ? "solution" : "resource",
      slug,
    );
    return localized
      ? {
          ...link,
          title: localized.title,
          description: localized.description,
        }
      : link;
  });
}

function GuideList({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="product-project-guide-column">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RelatedLinks({
  locale,
  title,
  links,
}: {
  locale: Locale;
  title: string;
  links: ProductConversionProfile["solutions"];
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={`/${locale}${link.href}`}
            className="product-project-guide-link border-s-2 border-brand ps-4"
          >
            <span className="font-semibold text-brand">{link.title}</span>
            <span className="mt-1 block text-sm leading-6 text-muted">
              {link.description}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

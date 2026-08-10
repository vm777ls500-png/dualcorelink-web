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
    locale === "zh"
      ? getLocalizedPublicationPage(locale, "product", productSlug)
      : undefined;
  const isChinese = Boolean(localizedPage);
  const localizedSections = localizedPage?.content.sections ?? [];
  const projectFit = isChinese
    ? localizedSections[0]?.paragraphs ?? []
    : profile.projectFit;
  const selectionChecks = isChinese
    ? [
        ...(localizedSections[1]?.paragraphs ?? []),
        ...(localizedPage?.specifications.map(
          (item) => `${item.label}：${item.value}`,
        ) ?? []),
      ]
    : profile.selectionChecks;
  const quoteChecklist = isChinese
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
          {isChinese ? "B2B 采购指引" : "B2B buying guidance"}
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">
          {isChinese ? "按真实项目条件规划本产品" : "Plan this product for a real project"}
        </h2>
        <p className="mt-4 leading-8 text-muted">
          {localizedPage?.content.introduction ?? profile.summary}
        </p>
      </header>

      {priorityReinforcement ? (
        <div className="mt-7 border border-line bg-background p-6">
          <p className="text-sm font-semibold uppercase text-brand">
            {isChinese ? "产品选型要点" : "Direct product answer"}
          </p>
          <h3 className="mt-2 text-xl font-semibold leading-7 text-foreground">
            {isChinese
              ? `${productTitle}项目选型要点`
              : priorityReinforcement.heading}
          </h3>
          <p className="mt-4 leading-8 text-muted">
            {isChinese
              ? localizedSections[1]?.paragraphs.join("\n")
              : priorityReinforcement.answer}
          </p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <GuideList
              title={isChinese ? "项目决策要点" : "Project decision points"}
              items={
                isChinese
                  ? selectionChecks
                  : priorityReinforcement.decisionPoints
              }
            />
            <RelatedLinks
              locale={locale}
              title={isChinese ? "继续规划项目" : "Continue project planning"}
              links={localizeLinks(locale, priorityReinforcement.links)}
            />
          </div>
        </div>
      ) : null}

      <div className="product-project-guide-grid mt-7 grid gap-6 lg:grid-cols-3">
        <GuideList
          title={isChinese ? "典型项目适用范围" : "Typical project fit"}
          items={projectFit}
        />
        <GuideList
          title={isChinese ? "选型前确认" : "Confirm before selection"}
          items={selectionChecks}
        />
        <GuideList
          title={isChinese ? "询价资料准备" : "Prepare for quotation"}
          items={quoteChecklist}
        />
      </div>

      <div className="product-project-guide-links mt-8 grid gap-7 border-t border-line pt-7 lg:grid-cols-2">
        <RelatedLinks
          locale={locale}
          title={isChinese ? "相关解决方案" : "Relevant solutions"}
          links={solutions}
        />
        <RelatedLinks
          locale={locale}
          title={isChinese ? "采购指南" : "Buyer guides"}
          links={resources}
        />
      </div>

      <div className="product-project-guide-cta mt-8 border-y border-line bg-background px-5 py-6 sm:px-6">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <p className="font-semibold text-foreground">
              {isChinese ? "申请型号与项目审核" : "Request a model and project review"}
            </p>
            <p className="mt-2 text-sm leading-6 text-muted">
              {isChinese
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
              {isChinese ? "申请项目审核" : "Request Project Review"}
            </TrackedInquiryLink>
            <WhatsAppButton
              message={
                isChinese
                  ? `您好，DUALCORE LINK。我想咨询${productTitle}的酒店项目选型。`
                  : `${profile.whatsappPrompt} Product: ${productTitle}.`
              }
              attribution={{
                ...baseAttribution,
                ctaPosition: "product_buying_guide_whatsapp",
              }}
              label={isChinese ? "通过 WhatsApp 咨询" : undefined}
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
  if (locale !== "zh") return links;

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

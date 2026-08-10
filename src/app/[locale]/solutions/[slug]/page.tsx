import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import { BidiTechnicalText } from "@/components/i18n/bidi-technical-text";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactCta } from "@/components/content/contact-cta";
import { ContentSection } from "@/components/content/content-section";
import { CustomPanelConfigurationSection } from "@/components/content/custom-panel-configuration-section";
import { MediaFrame } from "@/components/content/media-frame";
import { RoomDisplayProjectReferencesSection } from "@/components/content/room-display-project-references-section";
import { LocalizedPublicationPageView } from "@/components/content/localized-publication-page";
import { isLocale, locales } from "@/config/i18n";
import { ensureStaticExportParams } from "@/lib/routing/static-export";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createSchemaGraph,
  createServiceSchema,
} from "@/lib/schema";
import { stripHtml } from "@/lib/text";
import { buildQuoteHref } from "@/lib/inquiry/attribution";
import { solutionRepository } from "@/lib/wordpress/repositories";
import type { Locale } from "@/config/i18n";
import type { RelatedContentModel } from "@/types/content";
import {
  createLocalizedPublicationMetadata,
  getLocalizedPublicationPage,
  getPublicationHreflang,
  localizedRenderablePublicationPages,
} from "@/lib/localized-publication";
import {
  getLocalizedCompositionHomePath,
  supportsSpecializedLocalizedComposition,
} from "@/lib/multilingual-review-preview";
import type { LocalizedPublicationPage } from "@/lib/localized-publication";
import { localizeSolutionDetail } from "@/lib/localized-nonproduct";

type SolutionPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

const solutionMetaOverrides: Record<
  string,
  { title?: string; description?: string }
> = {
  "oem-odm-custom-panel-solution": {
    title: "OEM/ODM Smart Panel Solution",
    description:
      "OEM/ODM smart panel solution for distributors and B2B buyers planning sockets, energy saver panels, curtain controls, and brushed aluminum service panels.",
  },
  "hotel-delivery-robot-solution": {
    title: "Hotel Delivery Robot Solution",
  },
  "rcu-room-control-solution": {
    title: "RCU Room Control Solution",
  },
  "smart-hotel-automation-solution": {
    title: "Smart Hotel Automation Solution",
    description:
      "Smart hotel automation solution combining smart displays, RCU room control hardware, infrared accessories, delivery robots, and smart delivery cabinets.",
  },
  "hotel-guest-room-control-solution": {
    title: "Hotel Guest Room Control Solution",
    description:
      "Smart hotel guest room control solution with AI displays, RCU cabinet planning, sensors, sockets, curtain panels, and service panels for B2B projects.",
  },
  "ai-smart-display-solution": {
    description:
      "AI smart display solution with wall control displays, rotary controls, thermostat panels, and music panels for smart hotel and B2B automation projects.",
  },
};

export const dynamicParams = false;

function solutionLabel(locale: Locale, english: string, chinese: string, arabic: string) {
  if (locale === "ar") return arabic;
  if (locale === "zh") return chinese;
  return english;
}

function cleanDisplayText(value?: string) {
  return stripHtml(value ?? "")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8217;|&rsquo;/g, "'")
    .replace(/&#038;/g, "&")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !/to be confirmed/i.test(line))
    .join("\n");
}

function parsePlanningSections(content?: string) {
  const text = cleanDisplayText(content);
  const sections = new Map<string, string>();
  const matches = text.matchAll(/##\s+([^#]+?)\s+([\s\S]*?)(?=\s+##\s+|$)/g);

  for (const match of matches) {
    sections.set(match[1].trim(), match[2].trim());
  }

  return sections;
}

function splitBulletText(value?: string, limit = 6) {
  if (!value) return [];

  return value
    .split(/\s+–\s+/)
    .map((item) => item.replace(/^–\s*/, "").trim())
    .filter(Boolean)
    .slice(0, limit);
}

function parseFaqItems(value?: string) {
  if (!value) return [];

  return Array.from(value.matchAll(/###\s+(.+?)\s+([\s\S]*?)(?=\s+###\s+|$)/g))
    .map((match) => ({
      question: match[1].trim(),
      answer: match[2].trim(),
    }))
    .filter((item) => item.question && item.answer)
    .slice(0, 4);
}

function FallbackContent({ content }: { content?: string }) {
  const sections = parsePlanningSections(content);
  const targetCustomers = splitBulletText(sections.get("Target Customers"), 6);
  const scenarios = splitBulletText(sections.get("Application Scenarios"), 5);
  const customization = splitBulletText(sections.get("Customization Options"), 5);
  const faqs = parseFaqItems(sections.get("FAQ"));

  if (
    !targetCustomers.length &&
    !scenarios.length &&
    !customization.length &&
    !faqs.length
  ) {
    return null;
  }

  return (
    <section className="solution-planning-panel border-t border-line pt-8">
      <h2 className="text-2xl font-semibold text-foreground">
        Project planning details
      </h2>
      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        {targetCustomers.length ? (
          <PlanningList title="Target customers" items={targetCustomers} />
        ) : null}
        {scenarios.length ? (
          <PlanningList title="Application scenarios" items={scenarios} />
        ) : null}
        {customization.length ? (
          <PlanningList title="Customization options" items={customization} />
        ) : null}
      </div>
      {faqs.length ? (
        <div className="solution-detail-system-card mt-5 border border-line bg-surface p-5">
          <p className="text-sm font-semibold uppercase text-brand">FAQ</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.question}>
                <h3 className="font-semibold leading-7 text-foreground">
                  {item.question}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

function PlanningList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="solution-detail-system-card border border-line bg-surface p-5">
      <p className="text-sm font-semibold uppercase text-brand">{title}</p>
      <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function RecommendedProducts({
  locale,
  products,
}: {
  locale: Locale;
  products: RelatedContentModel[];
}) {
  if (!products.length) return null;
  return (
    <section className="solution-recommended-panel border-t border-line pt-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-brand">
            {solutionLabel(locale, "Product mix", "产品组合", "مزيج المنتجات")}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            {solutionLabel(locale, "Recommended Products", "推荐产品", "المنتجات الموصى بها")}
          </h2>
        </div>
        <Link
          href={`/${locale}/products/`}
          className="solution-card-link inline-flex min-h-10 w-fit items-center border border-line px-4 py-2 text-sm font-semibold text-brand"
        >
          {solutionLabel(locale, "Explore Products", "浏览产品", "استكشاف المنتجات")}
        </Link>
      </div>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <li key={product.id} className="solution-related-product-card border border-line bg-surface p-5">
            <h3 className="text-lg font-semibold leading-7 text-foreground">
              {stripHtml(product.title)}
            </h3>
            {cleanDisplayText(product.excerpt) ? (
              <p className="mt-3 line-clamp-3 leading-7 text-muted">
                <BidiTechnicalText text={cleanDisplayText(product.excerpt)} />
              </p>
            ) : null}
            <Link
              href={`/${locale}/products/${product.slug}/`}
              className="solution-card-link mt-5 inline-flex min-h-10 items-center border border-brand bg-brand px-4 py-2 text-sm font-semibold text-white"
            >
              {solutionLabel(locale, "View Product", "查看产品", "عرض المنتج")}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SolutionSnapshot({
  productCount,
  summary,
  locale,
}: {
  productCount: number;
  summary: string;
  locale: Locale;
}) {
  const suitableFor =
    summary.split(/[.;]/)[0]?.trim() || "B2B hotel projects";

  return (
    <aside className="solution-snapshot-panel border border-line bg-surface p-6">
      <p className="text-sm font-semibold uppercase text-brand">
        {solutionLabel(locale, "Solution snapshot", "方案概览", "ملخص الحل")}
      </p>
      <dl className="mt-5 grid gap-4">
        <div>
          <dt className="text-xs font-semibold uppercase text-muted">
            {solutionLabel(locale, "Suitable for", "适用范围", "مناسب لـ")}
          </dt>
          <dd className="mt-1 leading-7 text-foreground"><BidiTechnicalText text={suitableFor} /></dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-muted">
            {solutionLabel(locale, "Product mix", "产品组合", "مزيج المنتجات")}
          </dt>
          <dd className="mt-1 leading-7 text-foreground">
            {locale === "ar"
              ? `${productCount} منتجات موصى بها لتخطيط الحل`
              : locale === "zh"
                ? `${productCount} 项推荐产品用于方案规划`
                : `${productCount} recommended products for solution planning`}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-muted">
            {solutionLabel(locale, "Inquiry focus", "询盘重点", "محور الاستفسار")}
          </dt>
          <dd className="mt-1 leading-7 text-foreground">
            {solutionLabel(
              locale,
              "Room type, target market, quantity, integration needs, and OEM/ODM options",
              "房型、目标市场、数量、集成需求与 OEM/ODM 选项",
              "نوع الغرفة والسوق المستهدف والكمية واحتياجات التكامل وخيارات OEM/ODM",
            )}
          </dd>
        </div>
      </dl>
    </aside>
  );
}

function LocalizedSolutionEvidence({
  page,
  locale,
}: {
  page: LocalizedPublicationPage;
  locale: Locale;
}) {
  return (
    <>
      {page.specifications.length > 0 ? (
        <section className="solution-localized-specifications border-t border-line pt-8">
          <h2 className="text-2xl font-semibold text-foreground">
            {solutionLabel(locale, "Project specifications", "项目规格说明", "مواصفات المشروع")}
          </h2>
          <dl className="mt-5 grid gap-4 sm:grid-cols-2">
            {page.specifications.map((item) => (
              <div key={item.label} className="border border-line bg-surface p-5">
                <dt className="text-sm font-semibold text-brand">
                  <BidiTechnicalText text={item.label} />
                </dt>
                <dd className="mt-2 leading-7 text-muted"><BidiTechnicalText text={item.value} /></dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
      <section className="solution-localized-faq border-t border-line pt-8">
        <h2 className="text-2xl font-semibold text-foreground">
          {solutionLabel(locale, "Frequently asked questions", "常见问题", "الأسئلة الشائعة")}
        </h2>
        <div className="mt-5 space-y-3">
          {page.content.faqs.map((faq) => (
            <details key={faq.question} className="border border-line bg-surface p-5">
              <summary className="cursor-pointer font-semibold text-foreground">
                {faq.question}
              </summary>
              <p className="mt-4 leading-7 text-muted"><BidiTechnicalText text={faq.answer} /></p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const paths = await Promise.all(
    locales.map(async (locale) =>
      (await solutionRepository.getStaticParams(locale)).map(({ slug }) => ({
        locale,
        slug,
      })),
    ),
  );

  const localizedPaths = localizedRenderablePublicationPages
    .filter((page) => page.pageType === "solution")
    .map((page) => ({ locale: page.locale, slug: page.slug }));

  return ensureStaticExportParams([...paths.flat(), ...localizedPaths]);
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const localizedPage = getLocalizedPublicationPage(locale, "solution", slug);
  if (localizedPage) return createLocalizedPublicationMetadata(localizedPage);
  const solution = await solutionRepository.getBySlug(locale, slug);
  if (!solution) return {};
  const path = buildLocalizedPath(locale, `solutions/${slug}`);
  const metaOverride = solutionMetaOverrides[slug];
  const seo = metaOverride
    ? {
        ...solution.seo,
        title: metaOverride.title ?? solution.seo.title,
        description: metaOverride.description ?? solution.seo.description,
      }
    : solution.seo;

  return createMetadata({
    locale,
    path,
    title: stripHtml(solution.title),
    description: stripHtml(solution.summary || solution.excerpt),
    seo,
    hreflang: getPublicationHreflang(`solutions/${slug}`),
    openGraphImage: solution.seoOpenGraphImage ?? solution.heroImage,
    twitterImage:
      solution.seoTwitterImage ??
      solution.seoOpenGraphImage ??
      solution.heroImage,
  });
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }
  const localizedPage = getLocalizedPublicationPage(locale, "solution", slug);
  if (
    localizedPage &&
    !supportsSpecializedLocalizedComposition(locale)
  ) {
    return <LocalizedPublicationPageView page={localizedPage} />;
  }

  const sourceSolution = await solutionRepository.getBySlug(
    localizedPage ? "en" : locale,
    slug,
  );

  if (!sourceSolution) {
    notFound();
  }
  const solution = localizedPage
    ? localizeSolutionDetail(sourceSolution, localizedPage)
    : sourceSolution;
  const path = buildLocalizedPath(locale, `solutions/${slug}`);
  const url = buildSiteUrl(path);
  const solutionTitle = stripHtml(solution.title);
  const solutionAttribution = {
    sourcePage: `/${locale}/solutions/${slug}/`,
    contentType: "solution" as const,
    contentSlug: slug,
    sourceTitle: solutionTitle,
  };
  const heroQuoteAttribution = {
    ...solutionAttribution,
    ctaPosition: "solution_hero",
  };
  const pageNodes = [
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: solutionLabel(locale, "Home", "首页", "الرئيسية"), url: buildSiteUrl(getLocalizedCompositionHomePath(locale)) },
      {
        name: solutionLabel(locale, "Solutions", "解决方案", "الحلول"),
        url: buildSiteUrl(buildLocalizedPath(locale, "solutions")),
      },
      { name: solution.seo.breadcrumbLabel || stripHtml(solution.title), url },
    ]),
  ];
  if (solution.schema.enabled) {
    pageNodes.unshift(createServiceSchema(solution, url));
  }

  return (
    <>
      <JsonLd graph={createSchemaGraph(pageNodes)} />
      <article className="solution-detail-page">
        <div
          className={`solution-detail-hero mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:px-12 ${
            solution.heroImage
              ? "lg:grid-cols-[1.1fr_0.9fr]"
              : "lg:grid-cols-[minmax(0,0.85fr)_minmax(18rem,0.45fr)]"
          }`}
        >
          <header className="solution-detail-summary self-center">
            <Link
              href={`/${locale}/solutions/`}
              className="solution-back-link text-sm font-semibold text-brand"
            >
                {solutionLabel(locale, "Back to Solutions", "返回解决方案", "العودة إلى الحلول")}
            </Link>
            <p className="text-sm font-semibold uppercase text-brand">
              {solutionLabel(locale, "Solution", "解决方案", "الحل")}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {stripHtml(solution.title)}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {stripHtml(solution.summary || solution.excerpt)}
            </p>
            {solution.typicalDeploymentTime ? (
              <p className="mt-6 border-s-4 border-accent ps-4 text-sm">
                {solutionLabel(locale, "Typical deployment", "典型部署", "مدة التنفيذ المعتادة")}: <strong><BidiTechnicalText text={solution.typicalDeploymentTime} /></strong>
              </p>
            ) : null}
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedInquiryLink
                href={buildQuoteHref(locale, heroQuoteAttribution)}
                channel="form"
                attribution={heroQuoteAttribution}
                className="solution-detail-primary-link inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                {solutionLabel(locale, "Discuss This Project", "讨论该项目", "ناقش هذا المشروع")}
              </TrackedInquiryLink>
              <Link
                href={`/${locale}/products/`}
                className="solution-detail-primary-link inline-flex min-h-11 items-center border border-line bg-surface px-5 py-3 font-semibold text-brand"
              >
                {solutionLabel(locale, "Explore Products", "浏览产品", "استكشاف المنتجات")}
              </Link>
            </div>
          </header>
          {solution.heroImage ? (
            <div className="solution-detail-media-panel">
              <MediaFrame
                src={solution.heroImage.sourceUrl}
                alt={solution.heroImage.altText || stripHtml(solution.title)}
              />
            </div>
          ) : (
            <SolutionSnapshot
              productCount={solution.relatedProducts.length}
              summary={stripHtml(solution.summary || solution.excerpt)}
              locale={locale}
            />
          )}
        </div>
        <div className="solution-detail-content mx-auto max-w-7xl space-y-10 px-5 pb-14 sm:px-8 lg:px-12">
          <ContentSection title={solutionLabel(locale, "Customer challenges", "客户挑战", "تحديات العميل")} content={solution.customerChallenges} />
          <ContentSection title={solutionLabel(locale, "Solution architecture", "解决方案架构", "بنية الحل")} content={solution.architecture} />
          <ContentSection title={solutionLabel(locale, "Key benefits", "核心能力与价值", "الفوائد الرئيسية")} content={solution.keyBenefitsText} />
          <ContentSection title={solutionLabel(locale, "Deployment process", "实施流程", "عملية التنفيذ")} content={solution.deploymentProcess} />
          <ContentSection title={solutionLabel(locale, "Supported protocols", "协议与项目条件", "البروتوكولات المدعومة")} content={solution.supportedProtocolsSummary} />
          <ContentSection title={solutionLabel(locale, "Integration notes", "集成说明", "ملاحظات التكامل")} content={solution.integrationNotes} />
          <ContentSection title={solutionLabel(locale, "Compatibility", "兼容与验证", "التوافق والتحقق")} content={solution.compatibilityNotes} />
          <ContentSection title={solutionLabel(locale, "Known limitations", "已知边界", "الحدود المعروفة")} content={solution.knownLimitations} />
          <RecommendedProducts
            locale={locale}
            products={solution.relatedProducts}
          />
          {slug === "hotel-guest-room-control-solution" ? (
            <RoomDisplayProjectReferencesSection locale={locale} />
          ) : null}
          {slug === "oem-odm-custom-panel-solution" ? (
            <CustomPanelConfigurationSection locale={locale} />
          ) : null}
          {localizedPage ? (
            <LocalizedSolutionEvidence page={localizedPage} locale={locale} />
          ) : (
            <FallbackContent content={solution.content} />
          )}
        </div>
        <div className="solution-detail-quote">
          <ContactCta
            locale={locale}
            label={solution.inquiryCtaLabel || "Contact Sales"}
            attribution={solutionAttribution}
          />
        </div>
      </article>
    </>
  );
}

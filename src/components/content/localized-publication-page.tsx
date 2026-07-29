import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { productDisplayImages } from "@/config/product-display-images";
import type { LocalizedPublicationPage } from "@/lib/localized-publication";
import { buildSiteUrl } from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createFaqPageSchema,
  createSchemaGraph,
  organizationId,
  websiteId,
  type JsonLdNode,
} from "@/lib/schema";
import type { MultilingualLocale } from "@/lib/multilingual-publication-manifest";

const sectionLabels: Record<
  MultilingualLocale,
  { specifications: string; faqs: string; related: string; breadcrumb: string }
> = {
  ar: {
    specifications: "مواصفات مؤكدة للمشروع",
    faqs: "الأسئلة الشائعة",
    related: "خطوات وصفحات مرتبطة",
    breadcrumb: "مسار الصفحة",
  },
  zh: {
    specifications: "项目规格说明",
    faqs: "常见问题",
    related: "相关页面与下一步",
    breadcrumb: "页面路径",
  },
  de: {
    specifications: "Projektbezogene Spezifikationen",
    faqs: "Häufige Fragen",
    related: "Verwandte Seiten und nächste Schritte",
    breadcrumb: "Seitennavigation",
  },
  es: {
    specifications: "Especificaciones del proyecto",
    faqs: "Preguntas frecuentes",
    related: "Páginas relacionadas y próximos pasos",
    breadcrumb: "Ruta de la página",
  },
  vi: {
    specifications: "Thông số theo dự án",
    faqs: "Câu hỏi thường gặp",
    related: "Trang liên quan và bước tiếp theo",
    breadcrumb: "Đường dẫn trang",
  },
  fa: {
    specifications: "مشخصات پروژه",
    faqs: "پرسش‌های متداول",
    related: "صفحه‌های مرتبط و گام بعد",
    breadcrumb: "مسیر صفحه",
  },
};

function schemaType(page: LocalizedPublicationPage): string {
  if (page.pageType === "product") return "Product";
  if (page.pageType === "solution") return "Service";
  if (page.pageType === "resource") return "Article";
  if (page.pageType === "static" && page.slug === "about") return "AboutPage";
  if (page.pageType === "static" && page.slug === "contact") return "ContactPage";
  if (page.pageType === "static" && page.slug === "faqs") return "FAQPage";
  return "CollectionPage";
}

function createPageSchema(page: LocalizedPublicationPage): JsonLdNode {
  const type = schemaType(page);
  const base: JsonLdNode = {
    "@type": type,
    "@id": `${page.localizedUrl}#${type.toLowerCase()}`,
    url: page.localizedUrl,
    name: page.title,
    description: page.metaDescription,
    inLanguage: page.locale,
    mainEntityOfPage: page.localizedUrl,
  };

  if (type === "Product") {
    base.brand = { "@id": "https://dualcorelink.com/#brand" };
  } else if (type === "Service") {
    base.provider = { "@id": organizationId };
  } else {
    base.isPartOf = { "@id": websiteId };
  }
  return base;
}

function isExternalHref(href: string): boolean {
  return /^(?:https?:|mailto:|tel:)/.test(href);
}

function ActionLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className: string;
}) {
  return isExternalHref(href) ? (
    <a href={href} className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function LocalizedPublicationPageView({
  page,
}: {
  page: LocalizedPublicationPage;
}) {
  const content = page.content;
  const labels = sectionLabels[page.locale];
  const breadcrumbItems = [
    ...(content.parentBreadcrumb
      ? [
          {
            name: content.parentBreadcrumb.label,
            url: buildSiteUrl(content.parentBreadcrumb.href),
          },
        ]
      : []),
    { name: content.breadcrumbLabel, url: page.localizedUrl },
  ];
  const nodes: JsonLdNode[] = [
    createPageSchema(page),
    createBreadcrumbSchema(
      `${page.localizedUrl}#breadcrumb`,
      breadcrumbItems,
    ),
  ];
  if (content.faqs.length > 0 && schemaType(page) !== "FAQPage") {
    nodes.push(
      createFaqPageSchema(
        `${page.localizedUrl}#faq`,
        page.localizedUrl,
        [...content.faqs],
      ),
    );
  } else if (schemaType(page) === "FAQPage") {
    nodes[0] = createFaqPageSchema(
      `${page.localizedUrl}#faq`,
      page.localizedUrl,
      [...content.faqs],
    );
    nodes[0].name = page.title;
    nodes[0].description = page.metaDescription;
    nodes[0].inLanguage = page.locale;
  }
  const productImage =
    page.pageType === "product" ? productDisplayImages[page.slug] : undefined;

  return (
    <>
      <JsonLd graph={createSchemaGraph(nodes)} />
      <article
        className="localized-publication-page min-w-0 overflow-x-clip bg-background"
        lang={page.locale}
        dir={page.locale === "ar" || page.locale === "fa" ? "rtl" : "ltr"}
      >
        <header className="border-b border-line bg-foreground text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,30rem)] lg:px-12 lg:py-18">
            <div className="min-w-0 self-center">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {content.eyebrow}
              </p>
              <h1 className="mt-4 break-words text-4xl font-semibold leading-tight sm:text-5xl">
                {content.h1}
              </h1>
              <p className="mt-6 max-w-4xl text-lg leading-8 text-white/80">
                {content.introduction}
              </p>
            </div>
            {productImage ? (
              <div className="relative aspect-[3/2] overflow-hidden border border-white/20 bg-white">
                <Image
                  src={productImage.src}
                  alt={content.imageAlt || page.title}
                  fill
                  priority
                  sizes="(min-width: 1024px) 30rem, 100vw"
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="self-end border-s-4 border-accent bg-white/5 p-6">
                <p className="text-sm leading-7 text-white/75">
                  {page.metaDescription}
                </p>
              </div>
            )}
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
          <nav aria-label={labels.breadcrumb} className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              {content.parentBreadcrumb ? (
                <>
                  <li>
                    <Link
                      href={content.parentBreadcrumb.href}
                      className="underline decoration-line underline-offset-4"
                    >
                      {content.parentBreadcrumb.label}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                </>
              ) : null}
              <li aria-current="page" className="text-foreground">
                {content.breadcrumbLabel}
              </li>
            </ol>
          </nav>

          <div className="mt-10 grid min-w-0 gap-8 lg:grid-cols-2">
            {content.sections.map((section) => (
              <section
                key={section.heading}
                className="min-w-0 border border-line bg-surface p-6 sm:p-7"
              >
                <h2 className="break-words text-2xl font-semibold leading-tight text-foreground">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base leading-8 text-muted">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                {section.bullets?.length ? (
                  <ul className="mt-5 space-y-3 ps-5 text-base leading-7 text-muted marker:text-brand">
                    {section.bullets.map((item) => (
                      <li key={item} className="list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          {page.specifications.length > 0 ? (
            <section className="mt-10 border border-line bg-background">
              <h2 className="border-b border-line p-6 text-2xl font-semibold">
                {labels.specifications}
              </h2>
              <dl className="grid sm:grid-cols-2">
                {page.specifications.map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-line p-5 odd:sm:border-e"
                  >
                    <dt className="text-sm font-semibold text-brand">
                      {item.label}
                    </dt>
                    <dd className="mt-2 leading-7 text-muted">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {content.faqs.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-3xl font-semibold text-foreground">
                {labels.faqs}
              </h2>
              <div className="mt-6 space-y-4">
                {content.faqs.map((faq) => (
                  <details
                    key={faq.question}
                    className="group border border-line bg-surface p-5"
                  >
                    <summary className="cursor-pointer break-words font-semibold text-foreground">
                      {faq.question}
                    </summary>
                    <p className="mt-4 leading-8 text-muted">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ) : null}

          {content.relatedLinks.length > 0 ? (
            <section className="mt-12">
              <h2 className="text-3xl font-semibold text-foreground">
                {labels.related}
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {content.relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="min-w-0 border border-line bg-surface p-5 hover:border-brand"
                  >
                    <h3 className="break-words font-semibold text-foreground">
                      {link.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {link.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}
        </div>

        <section id="get-a-quote" className="bg-brand text-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
            <h2 className="break-words text-3xl font-semibold">
              {content.cta.heading}
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-white/80">
              {content.cta.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink
                href={content.cta.href}
                className="inline-flex min-h-11 items-center justify-center bg-white px-5 py-3 font-semibold text-brand"
              >
                {content.cta.label}
              </ActionLink>
              {content.cta.secondaryHref && content.cta.secondaryLabel ? (
                <ActionLink
                  href={content.cta.secondaryHref}
                  className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
                >
                  {content.cta.secondaryLabel}
                </ActionLink>
              ) : null}
            </div>
          </div>
        </section>
      </article>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import {
  ResourceConversionSections,
  ResourceMidArticleCta,
} from "@/components/content/resource-conversion-sections";
import { JsonLd } from "@/components/seo/json-ld";
import { brand, createWhatsAppUrl } from "@/config/brand";
import { isLocale } from "@/config/i18n";
import {
  getResourceBySlug,
  resources,
  type ResourceGuide,
  type ResourceLink,
} from "@/config/resources";
import { ensureStaticExportParams } from "@/lib/routing/static-export";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createContentHreflang,
  createMetadata,
} from "@/lib/seo";
import {
  createArticleSchema,
  createBreadcrumbSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { buildQuoteHref } from "@/lib/inquiry/attribution";

type ResourcePageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return ensureStaticExportParams(
    resources.map((resource) => ({
      locale: "en",
      slug: resource.slug,
    })),
  );
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale !== "en") return {};
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  const path = buildLocalizedPath(locale, `resources/${resource.slug}`);

  return createMetadata({
    locale,
    path,
    title: resource.seoTitle,
    description: resource.metaDescription,
    hreflang: createContentHreflang({
      locale,
      currentPath: path,
      published: {},
    }),
  });
}

function LinkList({
  title,
  links,
}: {
  title: string;
  links: ResourceLink[];
}) {
  return (
    <section className="border border-line bg-surface p-5">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <ul className="mt-4 grid gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-semibold text-brand hover:text-foreground"
            >
              {link.title}
            </Link>
            {link.description ? (
              <p className="mt-1 text-sm leading-6 text-muted">
                {link.description}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

function ResourceJsonLd({
  locale,
  resource,
}: {
  locale: "en";
  resource: ResourceGuide;
}) {
  const path = buildLocalizedPath(locale, `resources/${resource.slug}`);
  const url = buildSiteUrl(path);

  return (
    <JsonLd
      graph={createSchemaGraph([
        createArticleSchema({
          id: `${url}#article`,
          url,
          headline: resource.title,
          description: resource.metaDescription,
          datePublished: resource.lastReviewed,
          dateModified: resource.lastReviewed,
        }),
        createBreadcrumbSchema(`${url}#breadcrumb`, [
          { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
          {
            name: "Resources",
            url: buildSiteUrl(buildLocalizedPath(locale, "resources")),
          },
          { name: resource.title, url },
        ]),
      ])}
    />
  );
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || locale !== "en") notFound();
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const whatsappUrl = createWhatsAppUrl(resource.cta.whatsappMessage);
  const resourceAttribution = {
    sourcePage: `/en/resources/${resource.slug}/`,
    contentType: "resource" as const,
    contentSlug: resource.slug,
    sourceTitle: resource.h1,
  };
  const heroQuoteAttribution = {
    ...resourceAttribution,
    ctaPosition: "resource_hero",
  };
  const continueReading =
    resource.conversion?.continueReadingSlugs
      .map((relatedSlug) => getResourceBySlug(relatedSlug))
      .filter(
        (relatedResource): relatedResource is ResourceGuide =>
          relatedResource !== undefined && relatedResource.slug !== resource.slug,
      ) ?? [];

  return (
    <>
      <ResourceJsonLd locale="en" resource={resource} />
      <article className="resource-detail-page">
        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
            <Link
              href="/en/resources/"
              className="text-sm font-semibold text-brand hover:text-foreground"
            >
              Back to Resources
            </Link>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold uppercase text-brand">
              <span className="border border-line bg-background px-2 py-1">
                {resource.category}
              </span>
              <span className="border border-line bg-background px-2 py-1">
                {resource.topic}
              </span>
              <span className="border border-line bg-background px-2 py-1">
                {resource.readingTime}
              </span>
              <span className="border border-line bg-background px-2 py-1">
                Last reviewed {resource.lastReviewed}
              </span>
            </div>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {resource.h1}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              {resource.summary}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedInquiryLink
                href={buildQuoteHref("en", heroQuoteAttribution)}
                channel="form"
                attribution={heroQuoteAttribution}
                className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                {resource.cta.primaryLabel}
              </TrackedInquiryLink>
              <TrackedInquiryLink
                href={whatsappUrl}
                channel="whatsapp"
                attribution={{
                  ...resourceAttribution,
                  ctaPosition: "resource_hero_whatsapp",
                }}
                className="inline-flex min-h-11 items-center justify-center border border-line bg-background px-5 py-3 font-semibold text-brand"
              >
                {resource.cta.whatsappLabel}
              </TrackedInquiryLink>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-12">
          <div className="space-y-10">
            <section className="border border-line bg-surface p-6">
              <p className="text-sm font-semibold uppercase text-brand">
                Overview
              </p>
              <p className="mt-3 leading-8 text-muted">
                This guide is designed for {resource.audience.join(", ")} teams
                preparing early product selection, project quotation, and
                document review for hotel room control and automation projects.
              </p>
            </section>

            <nav
              aria-label="Table of contents"
              className="border border-line bg-background p-6"
            >
              <p className="text-sm font-semibold uppercase text-brand">
                Table of contents
              </p>
              <ol className="mt-4 grid gap-2 text-sm leading-6">
                {resource.sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="font-semibold text-foreground hover:text-brand"
                    >
                      {index + 1}. {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {resource.sections.map((section) => (
              <Fragment key={section.id}>
                <section
                  id={section.id}
                  className="border-t border-line pt-8"
                >
                  <h2 className="text-2xl font-semibold leading-8 text-foreground">
                    {section.heading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-8 text-muted">
                    {section.body.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.subsections?.map((subsection) => (
                      <section key={subsection.id} id={subsection.id}>
                        <h3 className="pt-2 text-xl font-semibold leading-7 text-foreground">
                          {subsection.heading}
                        </h3>
                        <div className="mt-3 space-y-4">
                          {subsection.body.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                          ))}
                        </div>
                      </section>
                    ))}
                    {section.relatedLinks?.length ? (
                      <p className="border-l-2 border-brand pl-4 text-sm leading-7">
                        Related planning reference:{" "}
                        {section.relatedLinks.map((link, index) => (
                          <Fragment key={link.href}>
                            {index > 0 ? ", " : null}
                            <Link
                              href={link.href}
                              className="font-semibold text-brand hover:text-foreground"
                            >
                              {link.title}
                            </Link>
                          </Fragment>
                        ))}
                        .
                      </p>
                    ) : null}
                  </div>
                </section>
                {resource.conversion?.midCtaAfterSectionId === section.id ? (
                  <ResourceMidArticleCta
                    resource={resource}
                    continueReading={continueReading}
                  />
                ) : null}
              </Fragment>
            ))}

            <section className="border border-line bg-surface p-6">
              <h2 className="text-2xl font-semibold text-foreground">
                Safe B2B scope
              </h2>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-muted sm:grid-cols-2">
                {resource.safeClaims.map((claim) => (
                  <li key={claim}>{claim}</li>
                ))}
              </ul>
            </section>

            {resource.conversion ? (
              <ResourceConversionSections
                resource={resource}
                continueReading={continueReading}
              />
            ) : (
              <section className="border border-line bg-foreground p-7 text-white sm:p-8">
                <p className="text-sm font-semibold uppercase text-white/70">
                  Project quotation
                </p>
                <h2 className="mt-2 text-2xl font-semibold">
                  {resource.cta.title}
                </h2>
                <p className="mt-3 max-w-3xl leading-8 text-white/75">
                  {resource.cta.body}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <TrackedInquiryLink
                    href={buildQuoteHref("en", {
                      ...resourceAttribution,
                      ctaPosition: "resource_fallback_bottom",
                    })}
                    channel="form"
                    attribution={{
                      ...resourceAttribution,
                      ctaPosition: "resource_fallback_bottom",
                    }}
                    className="cta-button-light inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold"
                  >
                    {resource.cta.primaryLabel}
                  </TrackedInquiryLink>
                  <Link
                    href={resource.cta.secondaryHref}
                    className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
                  >
                    {resource.cta.secondaryLabel}
                  </Link>
                  <TrackedInquiryLink
                    href={whatsappUrl}
                    channel="whatsapp"
                    attribution={{
                      ...resourceAttribution,
                      ctaPosition: "resource_fallback_whatsapp",
                    }}
                    className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
                  >
                    {brand.whatsapp.label}
                  </TrackedInquiryLink>
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-5">
            <section className="border border-line bg-surface p-5">
              <h2 className="text-xl font-semibold text-foreground">
                Guide focus
              </h2>
              <dl className="mt-4 space-y-4 text-sm">
                <div>
                  <dt className="font-semibold text-muted">Topic</dt>
                  <dd className="mt-1 text-foreground">{resource.topic}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">Reading time</dt>
                  <dd className="mt-1 text-foreground">
                    {resource.readingTime}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">Primary keyword</dt>
                  <dd className="mt-1 text-foreground">
                    {resource.primaryKeyword}
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-muted">Secondary topics</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {resource.secondaryKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="border border-line bg-background px-2 py-1 text-xs font-semibold text-muted"
                      >
                        {keyword}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </section>

            {!resource.conversion ? (
              <>
                <LinkList
                  title="Related solutions"
                  links={resource.relatedSolutions}
                />
                <LinkList
                  title="Related products"
                  links={resource.relatedProducts}
                />
              </>
            ) : null}
            <LinkList
              title="Related regions"
              links={resource.relatedRegions}
            />
            <LinkList
              title="Downloads and documents"
              links={resource.relatedDownloads}
            />
          </aside>
        </div>
      </article>
    </>
  );
}

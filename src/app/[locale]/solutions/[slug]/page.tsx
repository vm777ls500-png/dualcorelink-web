import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactCta } from "@/components/content/contact-cta";
import { ContentSection } from "@/components/content/content-section";
import { CustomPanelConfigurationSection } from "@/components/content/custom-panel-configuration-section";
import { MediaFrame } from "@/components/content/media-frame";
import { RoomDisplayProjectReferencesSection } from "@/components/content/room-display-project-references-section";
import { isLocale, locales } from "@/config/i18n";
import { ensureStaticExportParams } from "@/lib/routing/static-export";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createContentHreflang,
  createMetadata,
} from "@/lib/seo";
import {
  createBreadcrumbSchema,
  createSchemaGraph,
  createServiceSchema,
} from "@/lib/schema";
import { stripHtml } from "@/lib/text";
import { solutionRepository } from "@/lib/wordpress/repositories";
import type { Locale } from "@/config/i18n";
import type { RelatedContentModel } from "@/types/content";

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
    <section className="border-t border-line pt-8">
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
        <div className="mt-5 border border-line bg-surface p-5">
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
    <div className="border border-line bg-surface p-5">
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
    <section className="border-t border-line pt-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-brand">
            Product mix
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">
            Recommended Products
          </h2>
        </div>
        <Link
          href={`/${locale}/products/`}
          className="inline-flex min-h-10 w-fit items-center border border-line px-4 py-2 text-sm font-semibold text-brand"
        >
          Explore Products
        </Link>
      </div>
      <ul className="mt-5 grid gap-4 md:grid-cols-2">
        {products.map((product) => (
          <li key={product.id} className="border border-line bg-surface p-5">
            <h3 className="text-lg font-semibold leading-7 text-foreground">
              {stripHtml(product.title)}
            </h3>
            {cleanDisplayText(product.excerpt) ? (
              <p className="mt-3 line-clamp-3 leading-7 text-muted">
                {cleanDisplayText(product.excerpt)}
              </p>
            ) : null}
            <Link
              href={`/${locale}/products/${product.slug}/`}
              className="mt-5 inline-flex min-h-10 items-center border border-brand bg-brand px-4 py-2 text-sm font-semibold text-white"
            >
              View Product
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
}: {
  productCount: number;
  summary: string;
}) {
  const suitableFor =
    summary.split(/[.;]/)[0]?.trim() || "B2B hotel projects";

  return (
    <aside className="border border-line bg-surface p-6">
      <p className="text-sm font-semibold uppercase text-brand">
        Solution snapshot
      </p>
      <dl className="mt-5 grid gap-4">
        <div>
          <dt className="text-xs font-semibold uppercase text-muted">
            Suitable for
          </dt>
          <dd className="mt-1 leading-7 text-foreground">{suitableFor}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-muted">
            Product mix
          </dt>
          <dd className="mt-1 leading-7 text-foreground">
            {productCount} recommended products for solution planning
          </dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase text-muted">
            Inquiry focus
          </dt>
          <dd className="mt-1 leading-7 text-foreground">
            Room type, target market, quantity, integration needs, and OEM/ODM
            options
          </dd>
        </div>
      </dl>
    </aside>
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

  return ensureStaticExportParams(paths.flat());
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
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
    hreflang: createContentHreflang({
      locale,
      currentPath: path,
      published: solution.hreflang,
    }),
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

  const solution = await solutionRepository.getBySlug(locale, slug);

  if (!solution) {
    notFound();
  }
  const path = buildLocalizedPath(locale, `solutions/${slug}`);
  const url = buildSiteUrl(path);
  const pageNodes = [
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
      {
        name: "Solutions",
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
      <article>
        <div
          className={`mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:px-12 ${
            solution.heroImage
              ? "lg:grid-cols-[1.1fr_0.9fr]"
              : "lg:grid-cols-[minmax(0,0.85fr)_minmax(18rem,0.45fr)]"
          }`}
        >
          <header className="self-center">
            <Link
              href={`/${locale}/solutions/`}
              className="text-sm font-semibold text-brand"
            >
              Back to Solutions
            </Link>
            <p className="text-sm font-semibold uppercase text-brand">Solution</p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              {stripHtml(solution.title)}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted">
              {stripHtml(solution.summary || solution.excerpt)}
            </p>
            {solution.typicalDeploymentTime ? (
              <p className="mt-6 border-s-4 border-accent ps-4 text-sm">
                Typical deployment: <strong>{solution.typicalDeploymentTime}</strong>
              </p>
            ) : null}
            <Link
              href={`/${locale}/products/`}
              className="mt-7 inline-flex min-h-11 items-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
            >
              Explore Products
            </Link>
          </header>
          {solution.heroImage ? (
            <MediaFrame
              src={solution.heroImage.sourceUrl}
              alt={solution.heroImage.altText || stripHtml(solution.title)}
            />
          ) : (
            <SolutionSnapshot
              productCount={solution.relatedProducts.length}
              summary={stripHtml(solution.summary || solution.excerpt)}
            />
          )}
        </div>
        <div className="mx-auto max-w-7xl space-y-10 px-5 pb-14 sm:px-8 lg:px-12">
          <ContentSection title="Customer challenges" content={solution.customerChallenges} />
          <ContentSection title="Solution architecture" content={solution.architecture} />
          <ContentSection title="Key benefits" content={solution.keyBenefitsText} />
          <ContentSection title="Deployment process" content={solution.deploymentProcess} />
          <ContentSection title="Supported protocols" content={solution.supportedProtocolsSummary} />
          <ContentSection title="Integration notes" content={solution.integrationNotes} />
          <ContentSection title="Compatibility" content={solution.compatibilityNotes} />
          <ContentSection title="Known limitations" content={solution.knownLimitations} />
          <RecommendedProducts
            locale={locale}
            products={solution.relatedProducts}
          />
          {locale === "en" && slug === "hotel-guest-room-control-solution" ? (
            <RoomDisplayProjectReferencesSection locale={locale} />
          ) : null}
          {locale === "en" && slug === "oem-odm-custom-panel-solution" ? (
            <CustomPanelConfigurationSection locale={locale} />
          ) : null}
          <FallbackContent content={solution.content} />
        </div>
        <ContactCta
          locale={locale}
          label={solution.inquiryCtaLabel || "Contact Sales"}
        />
      </article>
    </>
  );
}

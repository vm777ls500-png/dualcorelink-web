import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqPreview } from "@/components/home/faq-preview";
import { PreviewGrid } from "@/components/home/preview-grid";
import { SectionHeading } from "@/components/home/section-heading";
import { JsonLd } from "@/components/seo/json-ld";
import { applicationScenarios } from "@/config/application-scenarios";
import { brand } from "@/config/brand";
import { isLocale, locales } from "@/config/i18n";
import { productCategories } from "@/config/product-taxonomy";
import { productSeries } from "@/config/product-series";
import { staticCaseStudies } from "@/config/static-case-studies";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import {
  createCollectionPageSchema,
  createSchemaGraph,
} from "@/lib/schema";
import { stripHtml } from "@/lib/text";
import {
  faqRepository,
  productRepository,
  regionRepository,
  solutionRepository,
} from "@/lib/wordpress/repositories";

type LocaleHomeProps = {
  params: Promise<{ locale: string }>;
};

const title = "Smart Hotel Control Systems & OEM Smart Home Solutions";
const description =
  "DUALCORE LINK supplies hotel room control systems, smart switches, sockets, thermostats, automation panels, and OEM/ODM smart home solutions.";
const representativeProductSlugs = [
  "86-type-ai-smart-control-display",
  "embedded-human-presence-sensor",
  "rcu-controller-cabinet",
  "smart-usb-five-hole-socket",
  "smart-four-key-curtain-control-panel",
  "hotel-delivery-robot",
  "hotel-smart-delivery-cabinet",
  "brushed-aluminum-86-base-doorbell-panel",
];
const homeCategorySlugs = [
  "ai-smart-displays",
  "sensors",
  "rcu-room-control-host",
  "smart-sockets-power-modules",
  "hotel-delivery-robot-system",
  "curtain-control-panels",
  "room-status-hotel-service-panels",
];

export async function generateMetadata({
  params,
}: LocaleHomeProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return createMetadata({
    locale,
    path: buildLocalizedPath(locale),
    title,
    description,
    hreflang: createStaticHreflang(locales, ""),
  });
}

export default async function LocaleHome({ params }: LocaleHomeProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [products, solutions, regions, faqs] = await Promise.all([
    productRepository.list(locale),
    solutionRepository.list(locale),
    regionRepository.list(locale),
    faqRepository.list(locale),
  ]);
  const featuredProducts = [...products]
    .filter((product) => product.primaryImage?.sourceUrl)
    .sort((a, b) => {
      const aIndex = representativeProductSlugs.indexOf(a.slug);
      const bIndex = representativeProductSlugs.indexOf(b.slug);
      const aRank = aIndex === -1 ? 100 : aIndex;
      const bRank = bIndex === -1 ? 100 : bIndex;

      return (
        aRank - bRank ||
        Number(b.isFeatured) - Number(a.isFeatured) ||
        Number(b.isNew) - Number(a.isNew)
      );
    })
    .slice(0, 8);
  const featuredSolutions = solutions.slice(0, 3);
  const featuredRegions = regions.slice(0, 3);
  const productCountsByCategory = new Map<string, number>();
  const publishedSlugs = new Set(products.map((product) => product.slug));

  for (const product of products) {
    for (const categorySlug of product.categorySlugs) {
      productCountsByCategory.set(
        categorySlug,
        (productCountsByCategory.get(categorySlug) ?? 0) + 1,
      );
    }
  }

  const homeCategories = productCategories.filter((category) =>
    homeCategorySlugs.includes(category.slug),
  );
  const homeUrl = buildSiteUrl(buildLocalizedPath(locale));
  const whatsappUrl = `https://wa.me/${brand.whatsapp.international}?text=${encodeURIComponent(
    "Hello DUALCORE LINK, I would like to discuss a smart hotel or smart home B2B project.",
  )}`;

  return (
    <>
      <JsonLd
        graph={createSchemaGraph([
          createCollectionPageSchema({
            id: `${homeUrl}#home`,
            url: homeUrl,
            name: title,
            description,
          }),
        ])}
      />
      <main>
        <section className="relative overflow-hidden border-b border-line bg-[#101820] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(233,185,73,0.24),transparent_28%),radial-gradient(circle_at_80%_8%,rgba(0,95,115,0.52),transparent_34%),linear-gradient(135deg,#101820_0%,#0a2530_48%,#111827_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.055)_1px,transparent_1px)] bg-[size:48px_48px] opacity-45" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#101820] to-transparent" />
          <div className="absolute right-0 top-10 hidden h-[30rem] w-[42rem] border-y border-l border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0)),linear-gradient(90deg,rgba(233,185,73,0.16)_1px,transparent_1px)] bg-[size:auto,72px_72px] lg:block" />
          <div className="relative mx-auto min-h-[42rem] max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <div className="flex min-h-[34rem] flex-col justify-between gap-12">
              <div className="max-w-4xl">
                <p className="text-sm font-semibold uppercase text-accent">
                  Smart hotel infrastructure
                </p>
                <h1 className="mt-5 text-4xl font-semibold leading-tight sm:text-6xl">
                  Smart hotel control systems built for global B2B projects.
                </h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/75">
                  {brand.business}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href={`/${locale}/products/`}
                    className="inline-flex min-h-11 items-center border border-accent bg-accent px-5 py-3 font-semibold text-foreground"
                  >
                    View Products
                  </Link>
                  <Link
                    href={`/${locale}/contact/#get-a-quote`}
                    className="inline-flex min-h-11 items-center border border-white/40 px-5 py-3 font-semibold text-white"
                  >
                    Get a Quote
                  </Link>
                  <a
                    href={whatsappUrl}
                    className="inline-flex min-h-11 items-center border border-white/55 bg-white/10 px-5 py-3 font-semibold text-white backdrop-blur hover:bg-white/15"
                  >
                    Contact Sales
                  </a>
                </div>
              </div>

              <dl className="grid gap-px border border-white/20 bg-white/20 sm:grid-cols-3">
                <div className="bg-[#101820]/85 p-5 backdrop-blur">
                  <dt className="text-xs font-semibold uppercase text-white/55">
                    Product systems
                  </dt>
                  <dd className="mt-2 text-lg font-semibold">
                    Room control, panels, sensors, gateways
                  </dd>
                </div>
                <div className="bg-[#101820]/85 p-5 backdrop-blur">
                  <dt className="text-xs font-semibold uppercase text-white/55">
                    Commercial support
                  </dt>
                  <dd className="mt-2 text-lg font-semibold">
                    OEM, ODM, private label, project supply
                  </dd>
                </div>
                <div className="bg-[#101820]/85 p-5 backdrop-blur">
                  <dt className="text-xs font-semibold uppercase text-white/55">
                    Priority markets
                  </dt>
                  <dd className="mt-2 text-lg font-semibold">
                    Middle East and Southeast Asia
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Product categories"
              title="Find the right hardware group for your project"
              description="Browse key product categories for hotel guest rooms, smart apartments, system integration packages, and B2B project supply."
              href={`/${locale}/products/`}
              actionLabel="Explore Products"
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {homeCategories.map((category) => {
                const count = productCountsByCategory.get(category.slug) ?? 0;

                return (
                  <Link
                    key={category.slug}
                    href={`/${locale}/products/#category-${category.slug}`}
                    className="border border-line bg-background p-5 hover:border-brand"
                  >
                    <h3 className="text-lg font-semibold text-foreground">
                      {category.title}
                    </h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted">
                      {category.description}
                    </p>
                    <p className="mt-4 text-xs font-semibold uppercase text-brand">
                      {count} {count === 1 ? "product" : "products"}
                    </p>
                  </Link>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
              <Link
                href={`/${locale}/products/`}
                className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                Explore Products
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
              >
                Send Inquiry
              </Link>
              <a
                href={whatsappUrl}
                className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
              >
                {brand.whatsapp.label}
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-background">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Product portfolio"
              title="Representative products for hotel automation buyers"
              description="A selection of verified products with real images from the current catalog, covering displays, sensors, RCU hosts, sockets, curtain control, service panels, and delivery systems."
              href={`/${locale}/products/`}
              actionLabel="View all products"
            />
            <PreviewGrid
              items={featuredProducts.map((product) => ({
                id: product.id,
                title: stripHtml(product.title),
                description: stripHtml(
                  product.shortDescription || product.excerpt,
                ),
                href: `/${locale}/products/${product.slug}/`,
                categoryLabel: product.categoryNames[0],
                imageUrl: product.primaryImage?.sourceUrl,
              }))}
              emptyTitle="Our first hotel control products are being prepared."
              emptyDescription="Technical specifications and project options will be available here after verification."
            />
            <div className="mt-8 flex flex-wrap gap-3 border-t border-line pt-6">
              <Link
                href={`/${locale}/products/`}
                className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                Explore Products
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
              >
                Send Inquiry
              </Link>
              <a
                href={whatsappUrl}
                className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
              >
                {brand.whatsapp.label}
              </a>
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-background">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Product series"
              title="Choose panel style and finish for the project"
              description="Series navigation helps buyers compare product finish, panel style, and design direction for hotel and smart home projects."
              href={`/${locale}/product-series/`}
              actionLabel="View Product Series"
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {productSeries.map((series) => {
                const count = series.productSlugs.filter((slug) =>
                  publishedSlugs.has(slug),
                ).length;
                const hasProducts = count > 0;

                return (
                  <Link
                    key={series.slug}
                    href={`/${locale}/product-series/#${series.slug}`}
                    className={
                      hasProducts
                        ? "border border-line bg-surface p-5 hover:border-brand"
                        : "border border-line bg-surface/50 p-5 text-muted"
                    }
                  >
                    <h3
                      className={
                        hasProducts
                          ? "text-lg font-semibold text-foreground"
                          : "text-lg font-semibold text-muted"
                      }
                    >
                      {series.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-muted">
                      {series.description}
                    </p>
                    <p
                      className={
                        hasProducts
                          ? "mt-4 text-xs font-semibold uppercase text-brand"
                          : "mt-4 text-xs font-semibold uppercase text-muted"
                      }
                    >
                      {hasProducts
                        ? `Available now - ${count} ${count === 1 ? "product" : "products"}`
                        : "Upcoming series"}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Solutions"
              title="From room devices to integrated hotel automation"
              description="Connect product groups to practical hotel, apartment, and property automation scenarios."
              href={`/${locale}/solutions/`}
              actionLabel="View all solutions"
            />
            <PreviewGrid
              items={featuredSolutions.map((solution) => ({
                id: solution.id,
                title: stripHtml(solution.title),
                description: stripHtml(solution.summary || solution.excerpt),
                href: `/${locale}/solutions/${solution.slug}/`,
                meta: solution.typicalDeploymentTime || "Smart building solution",
                imageUrl: solution.heroImage?.sourceUrl,
              }))}
              emptyTitle="Solution portfolios are being prepared."
              emptyDescription="Hotel room control, energy management, and property automation solutions will appear here."
            />
          </div>
        </section>

        <section className="border-b border-line bg-background">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Case studies"
              title="Anonymous Project References"
              description="Explore how DualCoreLink supports smart hotel room control, residential automation, and OEM/ODM smart panel customization for overseas B2B projects."
              href={`/${locale}/case-studies/`}
              actionLabel="View All Case Studies"
            />
            <div className="mt-8 grid gap-5 lg:grid-cols-3">
              {staticCaseStudies.map((caseStudy) => (
                <Link
                  key={caseStudy.slug}
                  href={`/${locale}/case-studies/${caseStudy.slug}/`}
                  className="border border-line bg-surface p-5 hover:border-brand"
                >
                  <p className="text-xs font-semibold uppercase text-brand">
                    {caseStudy.region}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold leading-7 text-foreground">
                    {caseStudy.title}
                  </h3>
                  <p className="mt-3 text-sm font-semibold text-muted">
                    {caseStudy.projectType}
                  </p>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
                    {caseStudy.summary}
                  </p>
                  <span className="mt-5 inline-flex min-h-10 items-center border border-brand bg-brand px-4 py-2 text-sm font-semibold text-white">
                    View Case Study
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-background">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Application scenarios"
              title="See how products fit into real project spaces"
              description="Explore hotel guest room automation, smart apartment control, hotel public area automation, and system integration scenarios. These scenarios stay independent from product categories."
              href={`/${locale}/application-scenarios/`}
              actionLabel="View scenarios"
            />
            <div className="grid gap-5 md:grid-cols-3">
              {applicationScenarios.map((scenario) => (
                <Link
                  key={scenario.slug}
                  href={`/${locale}/application-scenarios/#${scenario.slug}`}
                  className="border border-line bg-surface p-5 hover:border-brand"
                >
                  <h3 className="text-lg font-semibold">{scenario.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {scenario.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-line bg-background">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Regional markets"
              title="Local requirements shape every project"
              description="Regional pages combine buyer needs, certification context, recommended products, cases, FAQs, and local contact paths."
              href={`/${locale}/regions/`}
              actionLabel="Explore regions"
            />
            <PreviewGrid
              items={featuredRegions.map((region) => ({
                id: region.id,
                title: stripHtml(region.title),
                description: stripHtml(
                  region.marketSummary || region.excerpt,
                ),
                href: `/${locale}/regions/${region.slug}/`,
                meta: region.marketMaturity || region.regionType,
                imageUrl: region.heroImage?.sourceUrl,
              }))}
              emptyTitle="Regional market guides are being prepared."
              emptyDescription={`Initial coverage will focus on ${brand.targetMarkets.join(", ")}.`}
            />
            <ul className="mt-8 flex flex-wrap gap-2">
              {brand.targetMarkets.map((market) => (
                <li
                  key={market}
                  className="border border-line bg-surface px-3 py-2 text-sm font-semibold"
                >
                  {market}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-12">
            <SectionHeading
              eyebrow="Buyer knowledge"
              title="Technical and commercial questions, answered clearly"
              description="Featured FAQs surface approved answers for buyers, integrators, hotel operators, and distributors."
            />
            <FaqPreview locale={locale} faqs={faqs} />
          </div>
        </section>

        <section className="border-b border-line bg-background">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div>
              <p className="text-sm font-semibold uppercase text-brand">
                Company
              </p>
              <h2 className="mt-2 text-3xl font-semibold">{brand.name}</h2>
              <p className="mt-4 leading-8 text-muted">
                {brand.legalEntity} manages the global brand and B2B customer
                relationship.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
                <Link
                  href={`/${locale}/about/`}
                  className="font-semibold text-brand"
                >
                  Learn About DualCoreLink -&gt;
                </Link>
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="font-semibold text-brand"
                >
                  Contact Sales -&gt;
                </Link>
              </div>
            </div>
            <div className="border-s-4 border-accent ps-6">
              <p className="text-sm font-semibold uppercase text-brand">
                Production coordination
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Qualified OEM manufacturing partners
              </h2>
              <p className="mt-4 leading-8 text-muted">
                Products are produced according to our design requirements and
                confirmed project needs, with product matching and project
                communication coordinated by DualCoreLink.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-brand text-white">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:px-12">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-white/65">
                Project contact
              </p>
              <h2 className="mt-2 text-3xl font-semibold">
                Plan your hotel automation product mix with our B2B team.
              </h2>
              <p className="mt-4 leading-7 text-white/75">
                Share your market, room type, protocol requirements, estimated
                quantity, and target delivery schedule.
              </p>
            </div>
            <a
              href={whatsappUrl}
              className="inline-flex min-h-11 shrink-0 items-center justify-center border border-white bg-white px-5 py-3 font-semibold text-brand"
            >
              {brand.whatsapp.label}
            </a>
          </div>
        </section>
      </main>
    </>
  );
}

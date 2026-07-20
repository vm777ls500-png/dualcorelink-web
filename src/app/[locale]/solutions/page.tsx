import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { brand } from "@/config/brand";
import { isLocale, locales } from "@/config/i18n";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
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
  const path = buildLocalizedPath(locale, "solutions");
  return createMetadata({
    locale,
    path,
    title: "Smart Hotel Room Control & Automation Solutions",
    description:
      "Smart hotel room control, automation, RCU, display, delivery robot, and OEM/ODM solution directions for B2B projects.",
    hreflang: createStaticHreflang(locales, "solutions"),
  });
}

export default async function SolutionsPage({ params }: SolutionsPageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const path = buildLocalizedPath(locale, "solutions");
  const url = buildSiteUrl(path);
  const whatsappUrl = `https://wa.me/${brand.whatsapp.international}?text=${encodeURIComponent(
    "Hello DUALCORE LINK, I would like to discuss a smart hotel automation solution.",
  )}`;
  const graph = createSchemaGraph([
    createCollectionPageSchema({
      id: `${url}#collection`,
      url,
      name: "DUALCORE LINK Smart Hotel Solutions",
      description:
        "Smart hotel room control, automation, RCU, display, delivery robot, and OEM/ODM solution directions for B2B projects.",
    }),
    createBreadcrumbSchema(`${url}#breadcrumb`, [
      { name: "Home", url: buildSiteUrl(buildLocalizedPath(locale)) },
      { name: "Solutions", url },
    ]),
  ]);

  return (
    <>
      <JsonLd graph={graph} />
      <section className="solutions-page-shell mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <header className="solutions-system-hero mb-10 flex flex-col justify-between gap-5 border border-line p-6 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-brand">
              B2B solution planning
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-foreground">
              Smart Hotel Room Control & Automation Solutions
            </h1>
            <p className="mt-4 leading-7 text-muted">
              Solution directions for hotel owners, contractors, system
              integrators, distributors, and OEM/ODM buyers planning smart
              hotel room control and automation projects.
            </p>
          </div>
          <div className="solutions-hero-actions flex flex-wrap gap-3">
            <Link
              href={`/${locale}/contact/#get-a-quote`}
              className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
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
        </header>

        <div className="solutions-audience-strip mb-10 grid gap-3 border-y border-line py-5 text-sm font-semibold text-muted sm:grid-cols-2 lg:grid-cols-5">
          <p>Hotel owners</p>
          <p>Contractors</p>
          <p>System integrators</p>
          <p>Distributors</p>
          <p>OEM/ODM buyers</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {solutionEntries.map((entry) => (
            <section
              key={entry.slug}
              id={entry.slug}
              className="solution-list-card border border-line bg-surface p-6"
            >
              <p className="text-xs font-semibold uppercase text-brand">
                Solution
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                {entry.title}
              </h2>
              <p className="mt-3 leading-7 text-muted">{entry.description}</p>

              <div className="mt-5 border-t border-line pt-5">
                <p className="text-sm font-semibold text-foreground">
                  Suitable project type
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {entry.projectType}
                </p>
              </div>

              <div className="mt-5">
                <p className="text-sm font-semibold text-foreground">
                  Recommended product categories
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
                  Recommended products
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

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/solutions/${entry.slug}/`}
                  className="solution-card-link inline-flex min-h-10 items-center justify-center border border-line px-4 py-2 text-sm font-semibold text-brand"
                >
                  View Solution
                </Link>
                <Link
                  href={`/${locale}/contact/#get-a-quote`}
                  className="inline-flex min-h-10 items-center justify-center border border-brand bg-brand px-4 py-2 text-sm font-semibold text-white"
                >
                  Get a Quote
                </Link>
              </div>
            </section>
          ))}
        </div>

        <section className="solutions-entry-panel mt-12 border border-line bg-background p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-brand">
                Application scenarios
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                Match solution planning with real project spaces
              </h2>
              <p className="mt-3 leading-7 text-muted">
                Explore hotel guest room automation, smart apartment control,
                hotel public area automation, and system integration scenarios.
              </p>
            </div>
            <Link
              href={`/${locale}/application-scenarios/`}
              className="inline-flex min-h-11 shrink-0 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
            >
              View Application Scenarios
            </Link>
          </div>
        </section>

        <section className="solutions-entry-panel mt-8 border border-line bg-surface p-6">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-brand">
                Case studies
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">
                See Anonymous Project References
              </h2>
              <p className="mt-3 leading-7 text-muted">
                Review practical project examples for hotel room control,
                serviced apartment automation, and OEM/ODM smart panel
                customization.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/case-studies/`}
                className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
              >
                View Case Studies
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
              >
                Discuss Your Project
              </Link>
            </div>
          </div>
        </section>

        <section className="solutions-quote-panel mt-8 bg-brand p-6 text-white">
          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-white/70">
                Project consultation
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Build a product mix for your hotel automation project.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/products/`}
                className="cta-button-light inline-flex min-h-11 items-center justify-center px-5 py-3 font-semibold"
              >
                Explore Products
              </Link>
              <Link
                href={`/${locale}/contact/#get-a-quote`}
                className="inline-flex min-h-11 items-center justify-center border border-white/60 px-5 py-3 font-semibold text-white"
              >
                Send Inquiry
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

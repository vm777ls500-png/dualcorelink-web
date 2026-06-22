import Image from "next/image";
import Link from "next/link";
import { WhatsAppButton } from "@/components/contact/whatsapp-button";
import { brand } from "@/config/brand";
import type { Locale } from "@/config/i18n";
import {
  panelConfigurationCopy,
  panelConfigurations,
  panelConfigurationSeries,
} from "@/config/static-oem-odm-configurations";

type CustomPanelConfigurationSectionProps = {
  locale: Locale;
};

export function CustomPanelConfigurationSection({
  locale,
}: CustomPanelConfigurationSectionProps) {
  const emailUrl = `mailto:${brand.emails.sales}?subject=${encodeURIComponent(
    "OEM/ODM room panel configuration",
  )}`;

  return (
    <section
      id={panelConfigurationCopy.moduleId}
      className="border-t border-line pt-10"
    >
      <header className="max-w-4xl">
        <p className="text-sm font-semibold uppercase text-brand">
          {panelConfigurationCopy.eyebrow}
        </p>
        <h2 className="mt-2 text-3xl font-semibold leading-tight text-foreground">
          {panelConfigurationCopy.title}
        </h2>
        <p className="mt-3 text-lg leading-8 text-foreground">
          {panelConfigurationCopy.subtitle}
        </p>
        <p className="mt-3 leading-7 text-muted">
          {panelConfigurationCopy.intro}
        </p>
      </header>

      <div className="mt-10 space-y-10">
        {panelConfigurationSeries.map((series) => {
          const configurations = panelConfigurations.filter(
            (configuration) => configuration.series === series,
          );
          const seriesHeadingId = `${series
            .toLowerCase()
            .replaceAll(" ", "-")}-heading`;

          return (
            <section key={series} aria-labelledby={seriesHeadingId}>
              <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                <h3
                  id={seriesHeadingId}
                  className="text-xl font-semibold text-foreground"
                >
                  {series}
                </h3>
                <p className="text-sm text-muted">
                  {configurations.length} configuration
                  {configurations.length === 1 ? "" : "s"}
                </p>
              </div>

              <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {configurations.map((configuration) => (
                  <li
                    key={configuration.id}
                    className="border border-line bg-surface"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden border-b border-line bg-background">
                      <Image
                        src={configuration.image}
                        alt={configuration.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain p-4"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs font-semibold uppercase text-brand">
                        Configuration example
                      </p>
                      <h4 className="mt-2 text-lg font-semibold leading-7 text-foreground">
                        {configuration.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-muted">
                        {configuration.useCase}
                      </p>
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {configuration.modules.map((module) => (
                          <li
                            key={module}
                            className="border border-line bg-background px-3 py-2 text-xs font-medium text-foreground"
                          >
                            {module}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 border-t border-line pt-4 text-xs leading-5 text-muted">
                        {panelConfigurationCopy.cardNote}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>

      <div className="mt-10 border-y border-line bg-background px-5 py-6 sm:px-6">
        <p className="max-w-5xl text-sm leading-6 text-muted">
          {panelConfigurationCopy.disclaimer}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/contact/#get-a-quote`}
            className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
          >
            {panelConfigurationCopy.primaryCta}
          </Link>
          <a
            href={emailUrl}
            className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
          >
            {panelConfigurationCopy.secondaryCta}
          </a>
          <WhatsAppButton
            className="inline-flex min-h-11 items-center justify-center border border-line px-5 py-3 font-semibold text-brand"
            message="Hello DUALCORE LINK, I would like to discuss an OEM/ODM room panel configuration."
          />
        </div>
      </div>
    </section>
  );
}

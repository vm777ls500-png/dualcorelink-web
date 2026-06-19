import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EmptyState } from "@/components/content/empty-state";
import { PageHeading } from "@/components/content/page-heading";
import { isLocale, locales } from "@/config/i18n";
import {
  buildLocalizedPath,
  createMetadata,
  createStaticHreflang,
} from "@/lib/seo";
import { stripHtml } from "@/lib/text";
import { downloadRepository } from "@/lib/wordpress/repositories";

type DownloadsPageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({
  params,
}: DownloadsPageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return createMetadata({
    locale,
    path: buildLocalizedPath(locale, "downloads"),
    title: "Download Center",
    description:
      "Product datasheets, manuals, certificates, catalogs, and technical files.",
    hreflang: createStaticHreflang(locales, "downloads"),
  });
}

export default async function DownloadsPage({ params }: DownloadsPageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const downloads = await downloadRepository.list(locale);

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
      <PageHeading
        eyebrow="Technical library"
        title="Download Center"
        description="Access public technical files or contact our team for controlled project documents."
      />
      {downloads.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title="No downloads published"
            description="Published WordPress downloads will appear here automatically."
          />
        </div>
      ) : (
        <ul className="mt-10 divide-y divide-line border-y border-line">
          {downloads.map((download) => (
            <li
              key={download.id}
              className="grid gap-5 py-6 sm:grid-cols-[1fr_auto] sm:items-center"
            >
              <div>
                <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase text-brand">
                  <span>{download.fileType.replaceAll("_", " ")}</span>
                  <span>{download.fileLanguage}</span>
                  {download.fileVersion ? <span>v{download.fileVersion}</span> : null}
                </div>
                <h2 className="mt-2 text-xl font-semibold">
                  {stripHtml(download.fileName)}
                </h2>
                <p className="mt-2 max-w-3xl leading-7 text-muted">
                  {stripHtml(download.description)}
                </p>
              </div>
              {download.access.exposeFile && download.publicFileUrl ? (
                <a
                  href={download.publicFileUrl}
                  className="inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
                >
                  Download
                </a>
              ) : (
                <Link
                  href={`/${locale}/contact/`}
                  className="inline-flex min-h-11 items-center justify-center border border-line bg-surface px-5 py-3 font-semibold"
                >
                  Request access
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

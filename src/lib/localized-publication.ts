import type { Metadata } from "next";
import { localizedFileContent } from "@/content/locales";
import { cmsTranslationImportPayload } from "@/content/locales/cms-import";
import type {
  LocalizedStructuredContent,
} from "@/content/locales/types";
import type {
  CmsTranslatedSpecification,
} from "./multilingual-cms";
import {
  multilingualPublicationManifest,
  type MultilingualPublicationEntry,
  type MultilingualPageType,
} from "./multilingual-publication-manifest";
import {
  getCandidatePublicationEntries,
  getHreflangEligibleEntries,
} from "./multilingual-publication-control";
import {
  getReviewPreviewLocales,
  type ReviewPreviewLocale,
} from "./multilingual-review-preview";
import type { Locale } from "@/config/i18n";
import {
  buildLocalizedPath,
  buildSiteUrl,
  createMetadata,
} from "@/lib/seo";
import type { HreflangMap } from "@/lib/seo/hreflang";

export type LocalizedPublicationPage = {
  locale: Exclude<Locale, "en">;
  pageType: MultilingualPageType;
  slug: string;
  path: string;
  sourceUrl: string;
  localizedUrl: string;
  title: string;
  description: string;
  seoTitle: string;
  metaDescription: string;
  content: LocalizedStructuredContent;
  specifications: readonly CmsTranslatedSpecification[];
  sourceEnglishContentId?: number;
  deliveryMode: "file" | "validated-import-payload";
};

const eligibleEntries = getHreflangEligibleEntries(
  multilingualPublicationManifest,
);
const reviewPreviewLocales = getReviewPreviewLocales();
const reviewPreviewEntries = reviewPreviewLocales.length > 0
  ? getCandidatePublicationEntries(multilingualPublicationManifest).filter(
      (entry) => reviewPreviewLocales.includes(entry.locale as ReviewPreviewLocale),
    )
  : [];
const renderableEntries = [...eligibleEntries, ...reviewPreviewEntries].filter(
  (entry, index, entries) =>
    entries.findIndex(
      (candidate) =>
        candidate.locale === entry.locale &&
        candidate.pageType === entry.pageType &&
        candidate.slug === entry.slug,
    ) === index,
);

function entryPath(entry: { localizedUrl: string; locale: string }): string {
  const pathname = new URL(entry.localizedUrl).pathname;
  return pathname.replace(new RegExp(`^/${entry.locale}/|/$`, "g"), "");
}

export function getPublicationHreflang(path: string): HreflangMap {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  const result: HreflangMap = {
    en: buildSiteUrl(buildLocalizedPath("en", normalizedPath)),
  };

  for (const entry of renderableEntries) {
    if (entryPath(entry) === normalizedPath) {
      result[entry.locale as Locale] = entry.localizedUrl;
    }
  }
  result["x-default"] = result.en;
  return result;
}

export function getLocalizedPublicationPage(
  locale: string,
  pageType: MultilingualPageType,
  slug: string,
): LocalizedPublicationPage | undefined {
  if (!["ar", "zh", "de", "es", "vi", "fa"].includes(locale)) {
    return undefined;
  }

  const manifestEntry = renderableEntries.find(
    (entry) =>
      entry.locale === locale &&
      entry.pageType === pageType &&
      entry.slug === slug,
  );
  if (!manifestEntry) return undefined;
  return createLocalizedPageFromEntry(manifestEntry);
}

function createLocalizedPageFromEntry(
  manifestEntry: MultilingualPublicationEntry,
): LocalizedPublicationPage | undefined {
  const { locale, pageType, slug } = manifestEntry;

  const path = entryPath(manifestEntry);
  if (pageType === "product" || pageType === "solution") {
    const payload = cmsTranslationImportPayload.find(
      (record) =>
        record.locale === locale &&
        record.contentType === pageType &&
        record.sourceEnglishSlug === slug,
    );
    if (!payload) return undefined;

    return {
      locale: locale as Exclude<Locale, "en">,
      pageType,
      slug,
      path,
      sourceUrl: manifestEntry.sourceUrl,
      localizedUrl: manifestEntry.localizedUrl,
      title: payload.translatedTitle,
      description: payload.translatedDescription,
      seoTitle: payload.translatedSeoTitle,
      metaDescription: payload.translatedMetaDescription,
      content: payload.translatedStructuredContent,
      specifications: payload.translatedSpecifications,
      sourceEnglishContentId: payload.sourceEnglishContentId,
      deliveryMode: "validated-import-payload",
    };
  }

  const fileContent = localizedFileContent.find(
    (content) =>
      content.locale === locale &&
      content.pageType === pageType &&
      content.slug === slug,
  );
  if (!fileContent) return undefined;

  return {
    locale: locale as Exclude<Locale, "en">,
    pageType,
    slug,
    path,
    sourceUrl: manifestEntry.sourceUrl,
    localizedUrl: manifestEntry.localizedUrl,
    title: fileContent.title,
    description: fileContent.structuredContent.introduction,
    seoTitle: fileContent.seoTitle,
    metaDescription: fileContent.metaDescription,
    content: fileContent.structuredContent,
    specifications: [],
    deliveryMode: "file",
  };
}

export function getReviewPreviewPublicationPages(
  locale: ReviewPreviewLocale,
): LocalizedPublicationPage[] {
  return getCandidatePublicationEntries(multilingualPublicationManifest)
    .filter((entry) => entry.locale === locale)
    .map(createLocalizedPageFromEntry)
    .filter((page): page is LocalizedPublicationPage => Boolean(page));
}

export function createLocalizedPublicationMetadata(
  page: LocalizedPublicationPage,
): Metadata {
  return createMetadata({
    locale: page.locale,
    path: buildLocalizedPath(page.locale, page.path),
    title: page.seoTitle,
    description: page.metaDescription,
    hreflang: getPublicationHreflang(page.path),
  });
}

export const localizedPublicationPages = eligibleEntries
  .map((entry) =>
    getLocalizedPublicationPage(entry.locale, entry.pageType, entry.slug),
  )
  .filter((page): page is LocalizedPublicationPage => Boolean(page));

export const localizedRenderablePublicationPages = renderableEntries
  .map((entry) =>
    getLocalizedPublicationPage(entry.locale, entry.pageType, entry.slug),
  )
  .filter((page): page is LocalizedPublicationPage => Boolean(page));

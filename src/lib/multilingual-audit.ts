import type { Locale } from "@/config/i18n";
import type { LocalizedFileContent } from "@/content/locales";
import { multilingualGlossary } from "@/content/locales/glossary";
import { getUiMessages } from "@/content/locales/ui";
import type { LocalizedStructuredContent } from "@/content/locales/types";
import {
  validateCmsTranslation,
  type CmsTranslationRecord,
} from "./multilingual-cms";
import {
  englishContentMaster,
  hasApprovedPublicationGate,
  hasProductionReleaseGate,
  isValidNativeReviewDate,
  multilingualLocales,
  nativeReviewStatuses,
  sixLanguageFullCoveragePaths,
  type MultilingualLocale,
  type MultilingualPublicationEntry,
} from "./multilingual-publication-manifest";
import {
  findPublicationEvidence,
  getCandidatePublicationEntries,
  getHreflangEligibleEntries,
  getSitemapEligibleEntries,
  getStaticExportEligibleEntries,
  validatePublicationEvidence,
  type PublicationEvidenceSource,
} from "./multilingual-publication-control";
import {
  hasApprovedOwnerReviewWaiver,
  ownerReviewWaiverStatuses,
} from "./owner-review-waiver";

export type MultilingualAuditInput = {
  manifest: readonly MultilingualPublicationEntry[];
  localContent: readonly LocalizedFileContent[];
  cmsTranslations: readonly CmsTranslationRecord[];
  configuredLocales: readonly Locale[];
  visibleLocales: readonly Locale[];
  indexableLocales: readonly Locale[];
  nginxConfig: string;
};

export type MultilingualAuditResult = {
  errors: string[];
  warnings: string[];
  manifestCount: number;
  perLocaleCount: Record<MultilingualLocale, number>;
  staticExportEligibleCount: number;
  sitemapEligibleCount: number;
  hreflangEligibleCount: number;
  nativeReviewPendingCount: number;
  ownerReviewWaiverApprovedCount: number;
  productionReleaseReadyCount: number;
};

const expectedManifestCount =
  englishContentMaster.length * multilingualLocales.length;
const expectedFullCoverageCount =
  englishContentMaster.length * multilingualLocales.length;

function contentLanguageErrors(
  locale: MultilingualLocale,
  text: string,
): string[] {
  const compact = text.replace(/\s+/g, "");
  if (compact.length < 400) return ["localized content is too short"];
  const targetCharacters = (() => {
    if (locale === "ar" || locale === "fa") {
      return compact.match(/[\u0600-\u06ff]/g)?.length ?? 0;
    }
    if (locale === "zh") {
      return compact.match(/[\u3400-\u9fff]/g)?.length ?? 0;
    }
    if (locale === "vi") {
      return compact.match(/[ăâđêôơưà-ỹ]/gi)?.length ?? 0;
    }
    const wordPattern =
      locale === "de"
        ? /\b(?:der|die|das|den|dem|und|für|mit|Projekt|Zimmer|muss|werden)\b/gi
        : /\b(?:el|la|los|las|de|del|para|con|proyecto|habitación|debe)\b/gi;
    return text.match(wordPattern)?.length ?? 0;
  })();
  const minimumTargetCharacters =
    locale === "de" || locale === "es" ? 20 : locale === "vi" ? 35 : 120;
  if (targetCharacters < minimumTargetCharacters) {
    return [`content does not contain enough ${locale} language evidence`];
  }
  const latinCharacters = compact.match(/[A-Za-z]/g)?.length ?? 0;
  const errors =
    (locale === "ar" || locale === "fa" || locale === "zh") &&
    latinCharacters > targetCharacters
      ? ["possible English body leakage"]
      : [];
  if (/\b(?:lorem ipsum|placeholder|todo|tbd|coming soon)\b/i.test(text)) {
    errors.push("placeholder text detected");
  }
  if (
    /\b(?:the|and|with|for|from|this|that|your|our|hotel|room|control|system|product|solution)(?:\s+(?:the|and|with|for|from|this|that|your|our|hotel|room|control|system|product|solution)){4,}\b/i.test(
      text,
    )
  ) {
    errors.push("possible untranslated English sentence detected");
  }
  for (const acronym of ["RCU", "OEM", "ODM", "KNX", "HVAC", "RS485"]) {
    const incorrectCase = new RegExp(`\\b${acronym}\\b`, "i");
    if (
      incorrectCase.test(text) &&
      !new RegExp(`\\b${acronym}\\b`).test(text)
    ) {
      errors.push(`${acronym} must retain its approved uppercase form`);
    }
  }
  if (/[$€£]\s*\d|\bUSD\s*\d|\b(?:rating|in stock)\b/i.test(text)) {
    errors.push("unverified commercial or inventory claim marker detected");
  }
  if (/[\u0590-\u05ff\u202a-\u202e\u2066-\u2069]/u.test(text)) {
    errors.push("unexpected bidirectional-control or Hebrew character detected");
  }
  return errors;
}

function structuredText(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.map(structuredText).join(" ");
  if (value && typeof value === "object") {
    return Object.values(value).map(structuredText).join(" ");
  }
  return "";
}

function duplicateValues(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function structuredContentQualityErrors(
  locale: MultilingualLocale,
  content: LocalizedStructuredContent,
): string[] {
  const errors: string[] = [];
  const expectedQuestionMark =
    locale === "ar" || locale === "fa"
      ? "؟"
      : locale === "zh"
        ? "？"
        : "?";
  for (const faq of content.faqs) {
    if (!faq.question.trim().endsWith(expectedQuestionMark)) {
      errors.push(
        `FAQ question must use the ${locale} question mark: ${faq.question}`,
      );
    }
  }
  const prohibitedUiLabels = [
    "Get a Quote",
    "Learn more",
    "Contact us",
    "Products",
    "Solutions",
  ];
  const contentText = structuredText(content);
  for (const label of prohibitedUiLabels) {
    if (contentText.includes(label)) {
      errors.push(`untranslated UI label detected: ${label}`);
    }
  }
  return errors;
}

function terminologyConfigurationErrors(): string[] {
  const errors: string[] = [];
  const required = [
    "Hotel Room Control Unit",
    "Guest Room Management System",
    "Room Control System",
    "Smart Switch Panel",
    "Touch Panel",
    "Thermostat",
    "Occupancy Sensor",
    "Doorplate / Room Display",
    "Hotel Renovation",
    "OEM",
    "ODM",
    "Wiring Architecture",
    "Energy Management",
    "System Integrator",
    "Hotel Owner",
    "Project Contractor",
  ];
  for (const term of required) {
    const entry = multilingualGlossary.find((item) => item.english === term);
    if (
      !entry ||
      multilingualLocales.some((locale) => !entry[locale].trim())
    ) {
      errors.push(`multilingual glossary is missing ${term}`);
    }
  }
  for (const acronym of ["OEM", "ODM"]) {
    const entry = multilingualGlossary.find((item) => item.english === acronym);
    if (
      !entry ||
      multilingualLocales.some((locale) => !entry[locale].includes(acronym))
    ) {
      errors.push(`${acronym} must remain visible in all glossary languages`);
    }
  }
  return errors;
}

export function auditMultilingualFoundation(
  input: MultilingualAuditInput,
): MultilingualAuditResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const evidenceSource: PublicationEvidenceSource = {
    localContent: input.localContent,
    cmsTranslations: input.cmsTranslations,
  };
  const perLocaleCount = Object.fromEntries(
    multilingualLocales.map((locale) => [
      locale,
      input.manifest.filter((entry) => entry.locale === locale).length,
    ]),
  ) as Record<MultilingualLocale, number>;

  errors.push(...terminologyConfigurationErrors());
  for (const locale of multilingualLocales) {
    const uiText = structuredText(getUiMessages(locale));
    for (const issue of contentLanguageErrors(locale, uiText.repeat(32))) {
      if (
        issue !== "localized content is too short" &&
        !issue.startsWith("content does not contain enough")
      ) {
        errors.push(`${locale} UI: ${issue}`);
      }
    }
  }

  if (englishContentMaster.length !== 69) {
    errors.push(
      `English content master must contain 69 entries; found ${englishContentMaster.length}`,
    );
  }
  if (input.manifest.length !== expectedManifestCount) {
    errors.push(
      `Publication manifest must contain ${expectedManifestCount} entries; found ${input.manifest.length}`,
    );
  }

  for (const locale of multilingualLocales) {
    if (!input.configuredLocales.includes(locale)) {
      errors.push(`Configured locales are missing ${locale}`);
    }
    if (perLocaleCount[locale] !== englishContentMaster.length) {
      errors.push(
        `${locale} must contain ${englishContentMaster.length} entries; found ${perLocaleCount[locale]}`,
      );
    }
  }

  for (const duplicate of duplicateValues(
    input.manifest.map((entry) => `${entry.locale}:${entry.slug}`),
  )) {
    errors.push(`Duplicate locale + slug: ${duplicate}`);
  }
  for (const duplicate of duplicateValues(
    input.manifest.map((entry) => entry.localizedUrl),
  )) {
    errors.push(`Duplicate localized URL: ${duplicate}`);
  }

  const expectedSourceUrls = new Set(
    englishContentMaster.map(
      (source) => `https://dualcorelink.com/en/${source.path}/`,
    ),
  );
  for (const entry of input.manifest) {
    if (!expectedSourceUrls.has(entry.sourceUrl)) {
      errors.push(
        `${entry.locale}:${entry.slug} has a missing or unknown English source URL`,
      );
    }
    if (
      !entry.localizedUrl.startsWith(
        `https://dualcorelink.com/${entry.locale}/`,
      )
    ) {
      errors.push(
        `${entry.locale}:${entry.slug} has an invalid localized URL`,
      );
    }
    if (entry.publishReady && !hasApprovedPublicationGate(entry)) {
      errors.push(
        `${entry.locale}:${entry.slug} is publishReady without all approvals`,
      );
    }
    if (!nativeReviewStatuses.includes(entry.nativeReviewStatus)) {
      errors.push(`${entry.locale}:${entry.slug} has an invalid nativeReviewStatus`);
    }
    if (!entry.nativeReviewNotes.trim()) {
      errors.push(`${entry.locale}:${entry.slug} requires nativeReviewNotes`);
    }
    if (
      !ownerReviewWaiverStatuses.includes(entry.ownerReviewWaiverStatus)
    ) {
      errors.push(
        `${entry.locale}:${entry.slug} has an invalid ownerReviewWaiverStatus`,
      );
    }
    if (entry.ownerReviewWaiverStatus === "approved") {
      if (!hasApprovedOwnerReviewWaiver(entry)) {
        errors.push(
          `${entry.locale}:${entry.slug} has incomplete owner review waiver evidence`,
        );
      }
      if (
        entry.nativeReviewStatus !== "pending" ||
        entry.nativeReviewer !== null ||
        entry.nativeReviewDate !== null ||
        entry.productionReleaseReady
      ) {
        errors.push(
          `${entry.locale}:${entry.slug} owner waiver must remain independent from native approval`,
        );
      }
    } else if (
      entry.ownerReviewWaiverBy !== null ||
      entry.ownerReviewWaiverDate !== null ||
      entry.ownerReviewWaiverReason !== ""
    ) {
      errors.push(
        `${entry.locale}:${entry.slug} must not claim owner waiver evidence`,
      );
    }
    if (entry.nativeReviewStatus !== "pending") {
      if (!entry.nativeReviewer?.trim()) {
        errors.push(`${entry.locale}:${entry.slug} requires a nativeReviewer`);
      }
      if (!isValidNativeReviewDate(entry.nativeReviewDate)) {
        errors.push(`${entry.locale}:${entry.slug} requires a valid nativeReviewDate`);
      }
    } else if (
      entry.nativeReviewer !== null ||
      entry.nativeReviewDate !== null
    ) {
      errors.push(
        `${entry.locale}:${entry.slug} must not claim native reviewer evidence while pending`,
      );
    }
    if (
      entry.productionReleaseReady &&
      !hasProductionReleaseGate(entry, true)
    ) {
      errors.push(
        `${entry.locale}:${entry.slug} is productionReleaseReady without the complete release gate`,
      );
    }
    if (hasApprovedPublicationGate(entry)) {
      const evidence = findPublicationEvidence(entry, evidenceSource);
      for (const issue of validatePublicationEvidence(entry, evidence)) {
        errors.push(`${entry.locale}:${entry.slug}: ${issue}`);
      }
    }
  }

  for (const duplicate of duplicateValues(
    input.localContent.map(
      (entry) => `${entry.locale}:${entry.pageType}:${entry.slug}`,
    ),
  )) {
    errors.push(`Duplicate localized file content: ${duplicate}`);
  }
  for (const duplicate of duplicateValues(
    input.localContent.map(
      (entry) => `${entry.locale}:${entry.localizedContentHash}`,
    ),
  )) {
    errors.push(`Duplicate localized file body: ${duplicate}`);
  }
  for (const entry of input.localContent) {
    if (entry.sourceEnglishContentHash === entry.localizedContentHash) {
      errors.push(
        `${entry.locale}:${entry.slug} duplicates the English content hash`,
      );
    }
    for (const issue of contentLanguageErrors(entry.locale, entry.body)) {
      errors.push(`${entry.locale}:${entry.slug}: ${issue}`);
    }
    for (const issue of structuredContentQualityErrors(
      entry.locale,
      entry.structuredContent,
    )) {
      errors.push(`${entry.locale}:${entry.slug}: ${issue}`);
    }
  }

  for (const duplicate of duplicateValues(
    input.cmsTranslations.map(
      (entry) => `${entry.locale}:${entry.contentType}:${entry.sourceEnglishSlug}`,
    ),
  )) {
    errors.push(`Duplicate CMS translation association: ${duplicate}`);
  }
  for (const duplicate of duplicateValues(
    input.cmsTranslations.map(
      (entry) =>
        `${entry.locale}:${JSON.stringify(entry.translatedStructuredContent)}`,
    ),
  )) {
    errors.push(`Duplicate CMS localized body: ${duplicate.slice(0, 120)}`);
  }
  for (const translation of input.cmsTranslations) {
    for (const issue of validateCmsTranslation(translation)) {
      errors.push(
        `${translation.locale}:${translation.sourceEnglishSlug}: ${issue}`,
      );
    }
    const translatedText = structuredText(
      translation.translatedStructuredContent,
    );
    for (const issue of contentLanguageErrors(
      translation.locale,
      translatedText,
    )) {
      errors.push(
        `${translation.locale}:${translation.sourceEnglishSlug}: ${issue}`,
      );
    }
    for (const issue of structuredContentQualityErrors(
      translation.locale,
      translation.translatedStructuredContent,
    )) {
      errors.push(
        `${translation.locale}:${translation.sourceEnglishSlug}: ${issue}`,
      );
    }
    if (
      translation.deliveryMode !== "validated-import-payload" ||
      translation.localizedContentId !== null
    ) {
      errors.push(
        `${translation.locale}:${translation.sourceEnglishSlug}: multilingual candidates must use a non-production validated import payload`,
      );
    }
  }

  const candidateEligible = getCandidatePublicationEntries(
    input.manifest,
    evidenceSource,
  );
  const staticExportEligible = getStaticExportEligibleEntries(
    input.manifest,
    evidenceSource,
  );
  const sitemapEligible = getSitemapEligibleEntries(
    input.manifest,
    evidenceSource,
  );
  const hreflangEligible = getHreflangEligibleEntries(
    input.manifest,
    evidenceSource,
  );

  const approvedEntries = input.manifest.filter(hasApprovedPublicationGate);
  if (approvedEntries.length !== expectedFullCoverageCount) {
    errors.push(
      `M4A must approve exactly ${expectedFullCoverageCount} localized pages; found ${approvedEntries.length}`,
    );
  }
  for (const locale of multilingualLocales) {
    const actualPaths = approvedEntries
      .filter((entry) => entry.locale === locale)
      .map((entry) =>
        new URL(entry.localizedUrl).pathname
          .replace(new RegExp(`^/${locale}/|/$`, "g"), ""),
      )
      .sort();
    const expectedPaths = [...sixLanguageFullCoveragePaths[locale]].sort();
    if (JSON.stringify(actualPaths) !== JSON.stringify(expectedPaths)) {
      errors.push(`${locale} approved paths do not match the M4A full-coverage scope`);
    }
  }
  if (candidateEligible.length !== expectedFullCoverageCount) {
    errors.push(
      "candidate eligibility must equal the approved M4A page count",
    );
  }
  const declaredProductionReady = approvedEntries.filter((entry) =>
    hasProductionReleaseGate(entry, true),
  );
  if (
    staticExportEligible.length !== declaredProductionReady.length ||
    sitemapEligible.length !== declaredProductionReady.length ||
    hreflangEligible.length !== declaredProductionReady.length
  ) {
    errors.push(
      "static export, sitemap, and hreflang eligibility must equal the production-release-ready page count",
    );
  }

  const eligibleUrls = new Set(
    staticExportEligible.map((entry) => new URL(entry.localizedUrl).pathname),
  );
  const eligibleIdentities = new Set(
    staticExportEligible.map(
      (entry) => `${entry.locale}:${entry.pageType}:${entry.slug}`,
    ),
  );
  for (const content of input.localContent) {
    if (
      !eligibleIdentities.has(
        `${content.locale}:${content.pageType}:${content.slug}`,
      )
    ) {
      continue;
    }
    for (const link of content.structuredContent.relatedLinks) {
      if (
        link.href.startsWith("/") &&
        !eligibleUrls.has(link.href.split("#")[0])
      ) {
        errors.push(
          `${content.locale}:${content.slug} links to unpublished localized path ${link.href}`,
        );
      }
    }
  }
  for (const translation of input.cmsTranslations) {
    if (
      !eligibleIdentities.has(
        `${translation.locale}:${translation.contentType}:${translation.sourceEnglishSlug}`,
      )
    ) {
      continue;
    }
    for (const link of translation.translatedStructuredContent.relatedLinks) {
      if (
        link.href.startsWith("/") &&
        !eligibleUrls.has(link.href.split("#")[0])
      ) {
        errors.push(
          `${translation.locale}:${translation.sourceEnglishSlug} links to unpublished localized path ${link.href}`,
        );
      }
    }
  }

  for (const locale of multilingualLocales) {
    const eligible = staticExportEligible.filter(
      (entry) => entry.locale === locale,
    );
    if (
      (input.visibleLocales.includes(locale) ||
        input.indexableLocales.includes(locale)) &&
      eligible.length === 0
    ) {
      errors.push(
        `${locale} is visible or indexable without an eligible publication`,
      );
    }
  }

  const localePattern = multilingualLocales.join("|");
  if (
    !new RegExp(`\\(\\?:${localePattern}\\)`).test(input.nginxConfig) ||
    !input.nginxConfig.includes(
      "return 301 https://dualcorelink.com/en$legacy_path/;",
    )
  ) {
    errors.push("Existing legacy-locale English redirect policy is missing");
  }
  for (const marker of [
    "(?:ar|zh|de|es|vi|fa)",
    "Native-reviewed multilingual release batch: zh P0 (12 URLs).",
    "hotel-smart-room-rcu-host-1",
    "smart-hotel-automation-solution",
    "try_files $uri $uri/ $uri/index.html =404",
  ]) {
    if (!input.nginxConfig.includes(marker)) {
      errors.push(`Nginx reviewed-batch publication exception is missing ${marker}`);
    }
  }
  const publicationLocation = input.nginxConfig
    .split(/\r?\n/)
    .map((line) => line.trim())
    .find(
      (line) =>
        line.startsWith("location ~ ^/zh/") &&
        line.includes("hotel-smart-room-rcu-host-1") &&
        line.includes("smart-hotel-automation-solution"),
    );
  if (!publicationLocation) {
    errors.push("Nginx Chinese P0 approved-batch location is missing");
  } else {
    const nginxPattern = publicationLocation
      .replace(/^location ~ /, "")
      .replace(/ \{$/, "");
    const approvedPathPattern = new RegExp(nginxPattern);
    const readyEntries = input.manifest.filter((entry) =>
      hasProductionReleaseGate(entry, true),
    );
    for (const entry of readyEntries) {
      if (!approvedPathPattern.test(new URL(entry.localizedUrl).pathname)) {
        errors.push(
          `Nginx reviewed-batch exception does not cover ${entry.localizedUrl}`,
        );
      }
    }
    for (const entry of input.manifest.filter(
      (candidate) => !hasProductionReleaseGate(candidate, true),
    )) {
      if (approvedPathPattern.test(new URL(entry.localizedUrl).pathname)) {
        errors.push(
          `Nginx reviewed-batch exception over-publishes ${entry.localizedUrl}`,
        );
      }
    }
  }

  const persianBySlug = new Map(
    input.localContent
      .filter((entry) => entry.locale === "fa")
      .map((entry) => [`${entry.pageType}:${entry.slug}`, entry.body]),
  );
  for (const arabic of input.localContent.filter(
    (entry) => entry.locale === "ar",
  )) {
    const persian = persianBySlug.get(`${arabic.pageType}:${arabic.slug}`);
    if (persian && persian === arabic.body) {
      errors.push(`fa:${arabic.slug} duplicates the Arabic body`);
    }
  }
  for (const arabic of input.cmsTranslations.filter(
    (entry) => entry.locale === "ar",
  )) {
    const persian = input.cmsTranslations.find(
      (entry) =>
        entry.locale === "fa" &&
        entry.contentType === arabic.contentType &&
        entry.sourceEnglishSlug === arabic.sourceEnglishSlug,
    );
    if (
      persian &&
      JSON.stringify(persian.translatedStructuredContent) ===
        JSON.stringify(arabic.translatedStructuredContent)
    ) {
      errors.push(
        `fa:${arabic.sourceEnglishSlug} duplicates the Arabic CMS body`,
      );
    }
  }

  const missingTranslations = input.manifest.filter(
    (entry) => entry.translationStatus === "missing",
  ).length;
  const nativeReviewPendingCount = approvedEntries.filter(
    (entry) => entry.nativeReviewStatus === "pending",
  ).length;
  const ownerReviewWaiverApprovedCount = approvedEntries.filter(
    hasApprovedOwnerReviewWaiver,
  ).length;
  const productionReleaseReadyCount = approvedEntries.filter((entry) =>
    hasProductionReleaseGate(entry, errors.length === 0),
  ).length;
  if (missingTranslations > 0) {
    warnings.push(
      `${missingTranslations} records are intentionally blocked with missing translations`,
    );
  }

  return {
    errors,
    warnings,
    manifestCount: input.manifest.length,
    perLocaleCount,
    staticExportEligibleCount: staticExportEligible.length,
    sitemapEligibleCount: sitemapEligible.length,
    hreflangEligibleCount: hreflangEligible.length,
    nativeReviewPendingCount,
    ownerReviewWaiverApprovedCount,
    productionReleaseReadyCount,
  };
}

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { localizedPublicationPages } from "../src/lib/localized-publication";
import { cmsTranslationImportPayload } from "../src/content/locales/cms-import";
import {
  m3aProductCatalog,
  m3aRegionCatalog,
  m3aResourceCatalog,
  m3aSolutionCatalog,
} from "../src/content/locales/m3a-catalog";
import {
  multilingualPublicationManifest,
  multilingualLocales,
  sixLanguageFullCoveragePaths,
  type MultilingualLocale,
} from "../src/lib/multilingual-publication-manifest";

const englishTitleByPath: Readonly<Record<string, string>> = {
  about: "Smart Hotel & Smart Home Solution Provider",
  contact: "Talk to our B2B team",
  faqs: "Frequently Asked Questions",
  products: "Smart Hotel & Smart Home Automation Products",
  solutions: "Smart Hotel Room Control & Automation Solutions",
  resources: "Smart Hotel Guides and Technical Resources",
  regions: "Regional smart home intelligence",
  ...Object.fromEntries(
    m3aProductCatalog.map((item) => [
      `products/${item.slug}`,
      item.englishTitle,
    ]),
  ),
  ...Object.fromEntries(
    m3aSolutionCatalog.map((item) => [
      `solutions/${item.slug}`,
      item.englishTitle,
    ]),
  ),
  ...Object.fromEntries(
    m3aResourceCatalog.map((item) => [
      `resources/${item.slug}`,
      item.englishTitle,
    ]),
  ),
  ...Object.fromEntries(
    m3aRegionCatalog.map((item) => [
      `regions/${item.slug}`,
      item.englishTitle,
    ]),
  ),
};

const technicalTerms = [
  "OEM",
  "ODM",
  "RCU",
  "GRMS",
  "KNX",
  "HVAC",
  "RS485",
  "I/O",
  "B2B",
] as const;

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
}

function pageReviewBlock(
  page: (typeof localizedPublicationPages)[number],
  index: number,
): string {
  const englishTitle = englishTitleByPath[page.path];
  if (!englishTitle) {
    throw new Error(`Missing verified English title for ${page.path}`);
  }
  const contentText = JSON.stringify(page.content);
  const terms = technicalTerms.filter((term) => contentText.includes(term));
  const breadcrumb = [
    page.content.parentBreadcrumb?.label,
    page.content.breadcrumbLabel,
  ]
    .filter(Boolean)
    .join(" → ");
  const faqAndProcurement = [
    ...page.content.faqs.map((faq) => `FAQ: ${faq.question}`),
    ...page.specifications.map(
      (item) => `${item.label}: ${item.value}`,
    ),
  ];
  const cta = [
    page.content.cta.heading,
    page.content.cta.label,
    page.content.cta.secondaryLabel,
  ]
    .filter(Boolean)
    .join(" / ");

  return [
    `## ${index + 1}. ${page.localizedUrl}`,
    "",
    "| Review field | Evidence |",
    "|---|---|",
    `| English source URL | ${page.sourceUrl} |`,
    `| Localized URL | ${page.localizedUrl} |`,
    `| Page type | ${page.pageType} |`,
    `| English title | ${escapeCell(englishTitle)} |`,
    `| Translated title | ${escapeCell(page.title)} |`,
    `| SEO title | ${escapeCell(page.seoTitle)} |`,
    `| Meta description | ${escapeCell(page.metaDescription)} |`,
    `| H1 | ${escapeCell(page.content.h1)} |`,
    `| Main H2/H3 | ${escapeCell(page.content.sections.map((section) => section.heading).join(" / "))} |`,
    `| CTA copy | ${escapeCell(cta)} |`,
    `| Image alt | ${escapeCell(page.content.imageAlt ?? "Not applicable to this page type")} |`,
    `| Breadcrumb | ${escapeCell(breadcrumb)} |`,
    `| FAQ / procurement information | ${escapeCell(faqAndProcurement.join(" / "))} |`,
    `| Translatable schema fields | name/title, description, breadcrumb labels, FAQ questions and answers${page.content.imageAlt ? ", image alt/name" : ""} |`,
    `| Professional terms detected | ${terms.length > 0 ? terms.join(", ") : "Localized hotel-project terminology; no controlled acronym required"} |`,
    "| Automated technical conclusion | Passed M4A structural checks; automated checks do not approve language quality |",
    "| Native review conclusion | **PENDING** |",
    "| Requested changes | _Native reviewer to complete; do not leave blank when changes are required._ |",
    "| Native reviewer | — |",
    "| Native review date | — |",
    "",
    "### Native reviewer checklist",
    "",
    "- [ ] Meaning and factual scope match the English source.",
    "- [ ] Title, metadata, H1, headings, CTA, alt text, breadcrumb, and FAQ read naturally.",
    "- [ ] Hotel engineering, procurement, RCU, OEM/ODM, and system-integration terminology is correct.",
    "- [ ] No unsupported specification, certification, price, performance, customer, or inventory claim was introduced.",
    "- [ ] Mark `approved` only after entering the real reviewer name, ISO date, and review notes in the manifest and matching CMS payload where applicable.",
    "",
  ].join("\n");
}

function reviewDocument(locale: MultilingualLocale): string {
  const approvedOrder: readonly string[] = sixLanguageFullCoveragePaths[locale];
  const pages = localizedPublicationPages
    .filter((page) => page.locale === locale)
    .sort(
      (left, right) =>
        approvedOrder.indexOf(left.path) - approvedOrder.indexOf(right.path),
    );
  const expected = sixLanguageFullCoveragePaths[locale].length;
  if (pages.length !== expected) {
    throw new Error(
      `${locale} review pack requires ${expected} pages; found ${pages.length}`,
    );
  }

  const languageNames: Record<MultilingualLocale, string> = {
    ar: "Arabic",
    zh: "Chinese",
    de: "German",
    es: "Spanish",
    vi: "Vietnamese",
    fa: "Persian",
  };
  const languageName = languageNames[locale];
  return [
    `# ${languageName} P0 Native Review Pack`,
    "",
    "Date prepared: 2026-07-28",
    "",
    `Scope: ${pages.length} complete M4A pages (P0, P1, and P2).`,
    "",
    "Status: **awaiting real native-language human review**. Reviewer names and dates are deliberately blank. This document is an evidence pack, not an approval record.",
    "",
    "Review decisions:",
    "",
    "- `pending`: review has not been completed.",
    "- `changes_required`: record exact language/factual changes before approval.",
    "- `approved`: allowed only with a real reviewer name, valid ISO date, and review notes.",
    "",
    ...pages.map(pageReviewBlock),
  ].join("\n");
}

function cmsReadinessDocument(): string {
  const approvedCmsManifest = multilingualPublicationManifest.filter(
    (entry) =>
      entry.publishReady &&
      (entry.pageType === "product" || entry.pageType === "solution"),
  );
  if (
    cmsTranslationImportPayload.length !== 252 ||
    approvedCmsManifest.length !== 252
  ) {
    throw new Error(
      `CMS readiness requires 252 payloads and manifest entries; found ${cmsTranslationImportPayload.length}/${approvedCmsManifest.length}`,
    );
  }

  const rows = cmsTranslationImportPayload
    .map((payload) => {
      const manifest = approvedCmsManifest.find(
        (entry) =>
          entry.locale === payload.locale &&
          entry.pageType === payload.contentType &&
          entry.slug === payload.sourceEnglishSlug,
      );
      if (!manifest) {
        throw new Error(
          `Missing CMS manifest relation for ${payload.locale}:${payload.sourceEnglishSlug}`,
        );
      }
      return `| ${payload.locale} | ${payload.contentType} | ${payload.sourceEnglishSlug} | ${payload.sourceEnglishContentId} | ${payload.importKey} | Complete | Matched | ${payload.nativeReviewStatus} | No |`;
    })
    .join("\n");

  return [
    "# Multilingual CMS Import Readiness",
    "",
    "Date prepared: 2026-07-28",
    "",
    "The 252 Product and Solution records across six locales are deterministic, structurally valid import payloads. They are **not approved for production import** because native-language review is pending. No CMS connection or write is performed by this review.",
    "",
    "| Locale | Type | English slug | English source ID | Import key | Metadata | Manifest relation | Native review | Production import |",
    "|---|---|---|---:|---|---|---|---|---|",
    rows,
    "",
    "## Readiness summary",
    "",
    ...multilingualLocales.map(
      (locale) =>
        `- ${locale} payloads: 42/42 structurally ready; 0/42 native-approved.`,
    ),
    "- Source English IDs are positive, verified against the English Product/Solution source map, and never replaced by localized IDs.",
    "- `localizedContentId` remains `null`; the import package cannot overwrite an English CMS record.",
    "- Locale, content type, slug, import key, metadata, specifications, structured content, and manifest relation are complete.",
    "- Production import remains prohibited until the matching manifest and payload contain the same documented native review evidence.",
    "",
    "## Import reviewer checklist",
    "",
    "1. Complete the page-level native review pack.",
    "2. Record the real reviewer name, ISO review date, decision, and notes.",
    "3. Apply identical native-review evidence to the manifest entry and CMS payload.",
    "4. Run `npm run multilingual:audit` and `npm run multilingual:release-check`.",
    "5. Review the generated CMS diff in a non-production import workflow before any separately approved production write.",
  ].join("\n");
}

async function main() {
  const directory = path.resolve("docs/reviews/multilingual");
  await mkdir(directory, { recursive: true });
  const reviewFiles: Record<MultilingualLocale, string> = {
    ar: "ar-p0-native-review-20260728.md",
    zh: "zh-p0-native-review-20260728.md",
    de: "de-full-native-review-20260728.md",
    es: "es-full-native-review-20260728.md",
    vi: "vi-full-native-review-20260728.md",
    fa: "fa-full-native-review-20260728.md",
  };
  await Promise.all([
    ...multilingualLocales.map((locale) =>
      writeFile(
        path.join(directory, reviewFiles[locale]),
        `${reviewDocument(locale).replace(
          `${locale === "ar" ? "# Arabic" : locale === "zh" ? "# Chinese" : locale === "de" ? "# German" : locale === "es" ? "# Spanish" : locale === "vi" ? "# Vietnamese" : "# Persian"} P0 Native Review Pack`,
          `${locale === "ar" ? "# Arabic" : locale === "zh" ? "# Chinese" : locale === "de" ? "# German" : locale === "es" ? "# Spanish" : locale === "vi" ? "# Vietnamese" : "# Persian"} Full-Coverage Native Review Pack`,
        )}\n`,
        "utf8",
      ),
    ),
    writeFile(
      path.join(directory, "cms-import-readiness-20260728.md"),
      `${cmsReadinessDocument()}\n`,
      "utf8",
    ),
  ]);
  console.log(
    "[multilingual:review-pack] wrote six language packs of 69 pages and CMS 252 review materials",
  );
}

main().catch((error: unknown) => {
  console.error("[multilingual:review-pack] failed", error);
  process.exitCode = 1;
});

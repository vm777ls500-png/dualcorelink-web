import { access, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  m3aProductCatalog,
  m3aRegionCatalog,
  m3aResourceCatalog,
  m3aSolutionCatalog,
} from "../src/content/locales/m3a-catalog";
import {
  localizedPublicationPages,
  type LocalizedPublicationPage,
} from "../src/lib/localized-publication";
import {
  sixLanguageFullCoveragePaths,
  type MultilingualLocale,
} from "../src/lib/multilingual-publication-manifest";

const reviewLocales = ["ar", "de", "es", "vi", "fa"] as const;
type ReviewLocale = (typeof reviewLocales)[number];

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

const languageNames: Record<ReviewLocale, string> = {
  ar: "Arabic",
  de: "German",
  es: "Spanish",
  vi: "Vietnamese",
  fa: "Persian",
};

const technicalTerms = [
  "OEM",
  "ODM",
  "RCU",
  "GRMS",
  "KNX",
  "HVAC",
  "RS485",
] as const;

const titleRevisionPaths: Readonly<
  Partial<Record<ReviewLocale, ReadonlySet<string>>>
> = {
  ar: new Set([
    "products/brushed-aluminum-86-base-doorbell-panel",
    "products/86-type-ai-smart-control-display",
  ]),
  de: new Set([
    "products/borui-red-matte-triple-socket-panel",
    "products/smart-series-dual-vertical-socket-panel",
    "products/brushed-aluminum-86-base-doorbell-panel",
    "products/86-type-ai-smart-control-display",
  ]),
  es: new Set([
    "products/vintage-gold-key-card-energy-saver-panel",
    "products/brushed-aluminum-86-base-doorbell-panel",
    "products/smart-key-card-energy-saver-panel",
  ]),
  vi: new Set([
    "products/brushed-aluminum-86-base-doorbell-panel",
    "resources/hotel-rcu-wiring-system-architecture-guide",
  ]),
  fa: new Set([
    "products/brushed-aluminum-86-base-doorbell-panel",
  ]),
};

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
}

function isCmsIntroRevision(page: LocalizedPublicationPage): boolean {
  return (
    page.locale !== "ar" &&
    (page.pageType === "product" || page.pageType === "solution")
  );
}

function wasAutomaticallyRevised(page: LocalizedPublicationPage): boolean {
  const locale = page.locale as ReviewLocale;
  return (
    isCmsIntroRevision(page) ||
    titleRevisionPaths[locale]?.has(page.path) === true
  );
}

function automaticFinding(page: LocalizedPublicationPage): string {
  const locale = page.locale as ReviewLocale;
  const findings: string[] = [];
  if (isCmsIntroRevision(page)) {
    findings.push(
      "The generated CMS introduction repeated the localized title and application or solution scope immediately before the first section.",
    );
  }
  if (titleRevisionPaths[locale]?.has(page.path)) {
    findings.push(
      "The localized title used a literal or ambiguous construction for a verified English source term.",
    );
  }
  if (locale === "ar" && /products\/hotel-room-rcu-host-[123]$/.test(page.path)) {
    findings.push(
      'The formal English product name contains "Host"; the current Arabic rendering is retained pending a native reviewer and product-owner terminology decision.',
    );
  }
  if (findings.length === 0) {
    return "Automated checks found no unambiguous correction. Native fluency, terminology and factual fidelity still require human review.";
  }
  return findings.join(" ");
}

function automaticRevision(page: LocalizedPublicationPage): string {
  const revisions: string[] = [];
  if (isCmsIntroRevision(page)) {
    revisions.push(
      "Removed the immediate title/scope repetition while preserving the verified application, procurement and integration facts.",
    );
  }
  if (
    titleRevisionPaths[page.locale as ReviewLocale]?.has(page.path) === true
  ) {
    revisions.push(
      "Replaced the literal title wording with a natural target-language expression that preserves the English source meaning and model designation.",
    );
  }
  return revisions.length > 0
    ? revisions.join(" ")
    : "No automatic content rewrite was made.";
}

function evidenceRow(page: LocalizedPublicationPage, index: number): string {
  const englishTitle = englishTitleByPath[page.path];
  if (!englishTitle) throw new Error(`Missing English title: ${page.path}`);
  const breadcrumb = [
    page.content.parentBreadcrumb?.label,
    page.content.breadcrumbLabel,
  ]
    .filter(Boolean)
    .join(" → ");
  const cta = [
    page.content.cta.heading,
    page.content.cta.label,
    page.content.cta.secondaryLabel,
  ]
    .filter(Boolean)
    .join(" / ");
  const faq = page.content.faqs
    .map((item) => `${item.question} ${item.answer}`)
    .join(" / ");
  const procurement =
    page.specifications.length > 0
      ? page.specifications
          .map((item) => `${item.label}: ${item.value}`)
          .join(" / ")
      : page.content.sections
          .slice(-2)
          .flatMap((section) => [
            section.heading,
            ...section.paragraphs,
            ...(section.bullets ?? []),
          ])
          .join(" / ");
  const serialized = JSON.stringify(page);
  const terms = technicalTerms.filter((term) => serialized.includes(term));

  return [
    `## ${index + 1}. ${page.localizedUrl}`,
    "",
    "| Review field | Page evidence |",
    "|---|---|",
    `| English source URL | ${page.sourceUrl} |`,
    `| Localized URL | ${page.localizedUrl} |`,
    `| Page type | ${page.pageType} |`,
    `| English title | ${escapeCell(englishTitle)} |`,
    `| Localized title | ${escapeCell(page.title)} |`,
    `| SEO title | ${escapeCell(page.seoTitle)} |`,
    `| Meta description | ${escapeCell(page.metaDescription)} |`,
    `| H1 | ${escapeCell(page.content.h1)} |`,
    `| Main H2/H3 | ${escapeCell(page.content.sections.map((section) => section.heading).join(" / "))} |`,
    `| CTA | ${escapeCell(cta)} |`,
    `| Image alt | ${escapeCell(page.content.imageAlt ?? "No standalone image alt is defined for this page type")} |`,
    `| Breadcrumb | ${escapeCell(breadcrumb)} |`,
    `| FAQ | ${escapeCell(faq)} |`,
    `| Specifications or procurement content | ${escapeCell(procurement)} |`,
    `| Translatable schema fields | name/title, description, Breadcrumb labels, FAQ questions and answers${page.content.imageAlt ? ", image/alt name" : ""} |`,
    `| Controlled technical terms | ${terms.length > 0 ? terms.join(", ") : "No controlled English abbreviation required on this page"} |`,
    `| Automatically discovered issue | ${escapeCell(automaticFinding(page))} |`,
    `| Automatic revision | ${escapeCell(automaticRevision(page))} |`,
    "| Human review decision |  |",
    "| Reviewer |  |",
    "| Review date |  |",
    "",
  ].join("\n");
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function writeReviewFiles(locale: ReviewLocale) {
  const order = sixLanguageFullCoveragePaths[locale];
  const pages = localizedPublicationPages
    .filter((page) => page.locale === locale)
    .sort(
      (left, right) =>
        order.indexOf(left.path) - order.indexOf(right.path),
    );
  if (pages.length !== 69) {
    throw new Error(`${languageNames[locale]} workbook requires 69 pages; found ${pages.length}`);
  }

  const workbookPath = path.resolve(
    `docs/reviews/multilingual/${locale}-native-review-workbook-20260729.md`,
  );
  const decisionsPath = path.resolve(
    `docs/reviews/multilingual/${locale}-native-review-decisions-20260729.md`,
  );
  const revisedCount = pages.filter(wasAutomaticallyRevised).length;
  const workbook = [
    `# ${languageNames[locale]} Native Review Workbook`,
    "",
    "Prepared: 2026-07-29",
    "",
    `Scope: 69/69 ${languageNames[locale]} localized candidate pages. This workbook supports genuine native review; it does not indicate that any page has received human approval.`,
    "",
    `Automated review covered 69 pages and applied unambiguous language or repetition corrections to ${revisedCount} pages. All 69 pages still require a real reviewer, decision and date.`,
    "",
    "The reviewer must verify natural language, hotel-engineering terminology, source fidelity, localized metadata, CTA, breadcrumbs, image alt, FAQ, schema text and bidirectional rendering where applicable.",
    "",
    ...pages.map(evidenceRow),
  ].join("\n");
  await writeFile(workbookPath, `${workbook}\n`, "utf8");

  if (!(await fileExists(decisionsPath))) {
    const decisions = [
      `# ${languageNames[locale]} Native Review Decisions`,
      "",
      "Allowed `Decision` values: `approved`, `changes_required`, `pending`. An `approved` or `changes_required` row must include a real reviewer, a valid ISO date (YYYY-MM-DD) and Notes. A `pending` row must leave Reviewer and Review Date blank.",
      "",
      "| Localized URL | Decision | Reviewer | Review Date | Notes |",
      "|---|---|---|---|---|",
      ...pages.map(
        (page) => `| ${page.localizedUrl} | pending |  |  |  |`,
      ),
      "",
    ].join("\n");
    await writeFile(decisionsPath, decisions, "utf8");
  }
  return revisedCount;
}

async function main() {
  const counts = new Map<MultilingualLocale, number>();
  for (const locale of reviewLocales) {
    counts.set(locale, await writeReviewFiles(locale));
  }
  console.log(
    `[multilingual:five-language-review-workbooks] wrote 5 workbooks and preserved or initialized 345 decision rows; automatically revised pages=${[...counts.entries()].map(([locale, count]) => `${locale}:${count}`).join(",")}`,
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(
    `[multilingual:five-language-review-workbooks] failed: ${message}`,
  );
  process.exitCode = 1;
});

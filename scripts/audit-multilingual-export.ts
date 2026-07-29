import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { localizedPublicationPages } from "../src/lib/localized-publication";

const outputRoot = path.resolve("out");
const errors: string[] = [];

function fail(page: string, message: string) {
  errors.push(`${page}: ${message}`);
}

function countMatches(value: string, pattern: RegExp): number {
  return value.match(pattern)?.length ?? 0;
}

async function collectIndexPages(directory: string): Promise<string[]> {
  const result: string[] = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      result.push(...(await collectIndexPages(absolutePath)));
    } else if (entry.name === "index.html") {
      result.push(absolutePath);
    }
  }
  return result;
}

async function main() {
const allStaticPages = await collectIndexPages(outputRoot);
for (const htmlPath of allStaticPages) {
  const html = await readFile(htmlPath, "utf8");
  const label = path.relative(outputRoot, htmlPath);
  if (
    /href="[^"]*(?:source_page|content_type|content_slug|cta_position)=[^"]*"/i.test(
      html,
    )
  ) {
    fail(label, "Contact attribution query href is present");
  }
  if (/href="[^"]*[?&](?:category|series)=[^"]*"/i.test(html)) {
    fail(label, "Products filter query href is present");
  }
  if (
    /<link rel="canonical" href="[^"]*\?[^"]*"/i.test(html)
  ) {
    fail(label, "canonical contains a query string");
  }
  if (
    /<link rel="alternate"[^>]*href="[^"]*\?[^"]*"/i.test(html)
  ) {
    fail(label, "hreflang contains a query string");
  }
}

for (const page of localizedPublicationPages) {
  const label = `${page.locale}/${page.path}`;
  const htmlPath = path.join(
    outputRoot,
    page.locale,
    ...page.path.split("/"),
    "index.html",
  );
  let html = "";
  try {
    html = await readFile(htmlPath, "utf8");
  } catch {
    fail(label, "static HTML is missing");
    continue;
  }

  const direction =
    page.locale === "ar" || page.locale === "fa" ? "rtl" : "ltr";
  if (!html.includes(`<html lang="${page.locale}" dir="${direction}"`)) {
    fail(label, "root lang/dir is incorrect");
  }
  if (!/<title>[^<]+<\/title>/.test(html)) fail(label, "title is missing");
  if (!/<meta name="description" content="[^"]+"/.test(html)) {
    fail(label, "meta description is missing");
  }
  if (
    !html.includes(
      `<link rel="canonical" href="${page.localizedUrl}"/>`,
    )
  ) {
    fail(label, "self-referencing canonical is missing");
  }
  for (const [locale, url] of [
    ["en", page.sourceUrl],
    [page.locale, page.localizedUrl],
    ["x-default", page.sourceUrl],
  ]) {
    if (
      !html.includes(
        `<link rel="alternate" hrefLang="${locale}" href="${url}"/>`,
      )
    ) {
      fail(label, `hreflang ${locale} is missing`);
    }
  }
  if (countMatches(html, /<h1[ >]/g) !== 1) {
    fail(label, "page must contain exactly one H1");
  }
  if (/name="robots" content="noindex/i.test(html)) {
    fail(label, "published page contains noindex");
  }

  const schemas = [...html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
  )];
  if (schemas.length === 0) {
    fail(label, "JSON-LD is missing");
  }
  for (const schema of schemas) {
    try {
      JSON.parse(schema[1]);
    } catch {
      fail(label, "JSON-LD is not parseable");
    }
  }
  const schemaText = schemas.map((schema) => schema[1]).join("\n");
  const expectedSchema =
    page.pageType === "product"
      ? "Product"
      : page.pageType === "solution"
        ? "Service"
        : page.pageType === "resource"
          ? "Article"
        : page.slug === "faqs"
          ? "FAQPage"
          : page.slug === "about"
            ? "AboutPage"
            : page.slug === "contact"
              ? "ContactPage"
              : "CollectionPage";
  if (!schemaText.includes(`"@type":"${expectedSchema}"`)) {
    fail(label, `${expectedSchema} schema is missing`);
  }
  if (!schemaText.includes('"@type":"BreadcrumbList"')) {
    fail(label, "BreadcrumbList schema is missing");
  }

  const languageEvidence =
    page.locale === "ar" || page.locale === "fa"
      ? countMatches(html, /[\u0600-\u06ff]/g)
      : page.locale === "zh"
        ? countMatches(html, /[\u3400-\u9fff]/g)
        : page.locale === "vi"
          ? countMatches(html, /[ăâđêôơưà-ỹ]/gi)
          : countMatches(
              html,
              page.locale === "de"
                ? /\b(?:der|die|das|und|für|mit|Projekt|Zimmer)\b/gi
                : /\b(?:el|la|los|las|de|para|con|proyecto|habitación)\b/gi,
            );
  const minimumEvidence =
    page.locale === "de" || page.locale === "es"
      ? 20
      : page.locale === "vi"
        ? 35
        : 120;
  if (languageEvidence < minimumEvidence) {
    fail(label, "target-language body is too thin");
  }
}

for (const locale of ["ar", "zh", "de", "es", "vi", "fa"] as const) {
  const exportedPages = await collectIndexPages(path.join(outputRoot, locale));
  const expected = localizedPublicationPages.filter(
    (page) => page.locale === locale,
  ).length;
  if (exportedPages.length !== expected) {
    fail(locale, `exported ${exportedPages.length} pages; expected ${expected}`);
  }
}

const sitemap = await readFile(path.join(outputRoot, "sitemap.xml"), "utf8");
if (/<loc>[^<]*\?[^<]*<\/loc>/i.test(sitemap)) {
  fail("sitemap", "contains a query URL");
}
if (countMatches(sitemap, /<url>/g) !== 490) {
  fail("sitemap", "must contain 490 URLs");
}
for (const page of localizedPublicationPages) {
  if (!sitemap.includes(`<loc>${page.localizedUrl}</loc>`)) {
    fail("sitemap", `missing ${page.localizedUrl}`);
  }
  const englishHtmlPath = path.join(
    outputRoot,
    "en",
    ...page.path.split("/"),
    "index.html",
  );
  const englishHtml = await readFile(englishHtmlPath, "utf8");
  if (
    !englishHtml.includes(
      `<link rel="alternate" hrefLang="${page.locale}" href="${page.localizedUrl}"/>`,
    )
  ) {
    fail(page.sourceUrl, `missing reciprocal ${page.locale} hreflang`);
  }
}

if (errors.length > 0) {
  for (const error of errors) console.error(`[multilingual:export-audit] ${error}`);
  process.exitCode = 1;
} else {
  console.log(
    `[multilingual:export-audit] passed ${localizedPublicationPages.length} localized pages; sitemap=490`,
  );
}
}

main().catch((error: unknown) => {
  console.error("[multilingual:export-audit] failed", error);
  process.exitCode = 1;
});

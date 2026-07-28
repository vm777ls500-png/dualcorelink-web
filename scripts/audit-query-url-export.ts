import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const productionOrigin = "https://dualcorelink.com";
const contactKeys = [
  "source_page",
  "content_type",
  "content_slug",
  "cta_position",
] as const;
const productFilterKeys = ["category", "series"] as const;

export type QueryUrlAuditResult = {
  pages: number;
  sourcePageHref: number;
  contentTypeHref: number;
  contentSlugHref: number;
  ctaPositionHref: number;
  categoryHref: number;
  seriesHref: number;
  internalQueryHref: number;
  sitemapQueryUrl: number;
  canonicalQueryUrl: number;
  hreflangQueryUrl: number;
  errors: string[];
};

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

function tags(html: string, name: string) {
  return html.match(new RegExp(`<${name}\\b[^>]*>`, "gi")) ?? [];
}

function attribute(tag: string, name: string) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1] ?? "";
}

function internalUrl(href: string) {
  if (!href.startsWith("/") && !href.startsWith(productionOrigin)) {
    return undefined;
  }
  try {
    const url = new URL(href.replaceAll("&amp;", "&"), productionOrigin);
    return url.origin === productionOrigin ? url : undefined;
  } catch {
    return undefined;
  }
}

export async function auditQueryUrlExport(
  outputRoot = path.resolve("out"),
): Promise<QueryUrlAuditResult> {
  const result: QueryUrlAuditResult = {
    pages: 0,
    sourcePageHref: 0,
    contentTypeHref: 0,
    contentSlugHref: 0,
    ctaPositionHref: 0,
    categoryHref: 0,
    seriesHref: 0,
    internalQueryHref: 0,
    sitemapQueryUrl: 0,
    canonicalQueryUrl: 0,
    hreflangQueryUrl: 0,
    errors: [],
  };
  const contactCounts = {
    source_page: "sourcePageHref",
    content_type: "contentTypeHref",
    content_slug: "contentSlugHref",
    cta_position: "ctaPositionHref",
  } as const;
  const productCounts = {
    category: "categoryHref",
    series: "seriesHref",
  } as const;

  const pages = await collectIndexPages(outputRoot);
  result.pages = pages.length;
  for (const htmlPath of pages) {
    const html = await readFile(htmlPath, "utf8");
    const label = path.relative(outputRoot, htmlPath);

    for (const anchor of tags(html, "a")) {
      const href = attribute(anchor, "href");
      const url = internalUrl(href);
      if (!url || !url.search) continue;
      result.internalQueryHref += 1;
      result.errors.push(`${label}: internal query href ${url.pathname}${url.search}`);
      for (const key of contactKeys) {
        if (url.searchParams.has(key)) result[contactCounts[key]] += 1;
      }
      for (const key of productFilterKeys) {
        if (url.searchParams.has(key)) result[productCounts[key]] += 1;
      }
    }

    for (const link of tags(html, "link")) {
      const href = attribute(link, "href");
      const url = internalUrl(href);
      if (!url?.search) continue;
      const rel = attribute(link, "rel").toLowerCase();
      if (rel === "canonical") {
        result.canonicalQueryUrl += 1;
        result.errors.push(`${label}: canonical query URL ${href}`);
      }
      if (rel === "alternate" && attribute(link, "hreflang")) {
        result.hreflangQueryUrl += 1;
        result.errors.push(`${label}: hreflang query URL ${href}`);
      }
    }
  }

  const sitemapPath = path.join(outputRoot, "sitemap.xml");
  const sitemap = await readFile(sitemapPath, "utf8");
  for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
    const url = internalUrl(match[1]);
    if (!url?.search) continue;
    result.sitemapQueryUrl += 1;
    result.errors.push(`sitemap.xml: query URL ${match[1]}`);
  }

  return result;
}

async function main() {
  const result = await auditQueryUrlExport(
    path.resolve(process.argv[2] ?? "out"),
  );
  console.log(JSON.stringify(result, null, 2));
  if (result.errors.length > 0) process.exitCode = 1;
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  void main().catch((error: unknown) => {
    console.error("[query-url-audit] failed", error);
    process.exitCode = 1;
  });
}

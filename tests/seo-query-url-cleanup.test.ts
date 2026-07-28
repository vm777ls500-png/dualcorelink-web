import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { auditQueryUrlExport } from "../scripts/audit-query-url-export";
import { createInquiryEvent } from "../src/lib/inquiry/events";

const projectRoot = path.resolve(process.cwd());

test("Products filters use client state and never render query links", async () => {
  const page = await readFile(
    path.join(projectRoot, "src/app/[locale]/products/page.tsx"),
    "utf8",
  );
  const component = await readFile(
    path.join(
      projectRoot,
      "src/components/content/product-filtered-list.tsx",
    ),
    "utf8",
  );

  assert.doesNotMatch(page, /\?(?:category|series)=/);
  assert.match(page, /ProductFilterControl/);
  assert.match(component, /<button/);
  assert.match(component, /window\.history\.pushState/);
  assert.match(component, /window\.history\.replaceState/);
  assert.match(component, /popstate/);
  assert.match(component, /#product-results/);
});

test("Contact keeps complete GA4 and form attribution without query hrefs", async () => {
  const link = await readFile(
    path.join(
      projectRoot,
      "src/components/contact/tracked-inquiry-link.tsx",
    ),
    "utf8",
  );
  const form = await readFile(
    path.join(projectRoot, "src/components/contact/get-quote-form.tsx"),
    "utf8",
  );
  const attribution = {
    sourcePage: "/en/products/rcu-controller-cabinet/",
    contentType: "product" as const,
    contentSlug: "rcu-controller-cabinet",
    sourceTitle: "Hotel RCU Controller Cabinet",
    ctaPosition: "product_hero",
  };

  assert.deepEqual(createInquiryEvent("cta_click", "form", attribution), {
    event: "inquiry_cta_click",
    source_type: "product",
    source_slug: "rcu-controller-cabinet",
    cta_location: "product_hero",
    category: "form",
    page_path: "/en/products/rcu-controller-cabinet/",
  });
  assert.match(link, /writeInquiryAttributionToSession/);
  assert.match(form, /readInquiryAttributionFromSession/);
  assert.match(form, /createInquirySubmissionPayload\(\s*fields,\s*attribution/s);
  assert.match(form, /window\.history\.replaceState/);
});

test("static export audit returns errors and nonzero-ready evidence for query URLs", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "dualcorelink-query-audit-"));
  const pageDirectory = path.join(root, "en", "products");
  await mkdir(pageDirectory, { recursive: true });
  try {
    await writeFile(
      path.join(pageDirectory, "index.html"),
      [
        '<a href="/en/contact/#get-a-quote">Contact</a>',
        '<link rel="canonical" href="https://dualcorelink.com/en/products/"/>',
      ].join(""),
      "utf8",
    );
    await writeFile(
      path.join(root, "sitemap.xml"),
      "<urlset><url><loc>https://dualcorelink.com/en/products/</loc></url></urlset>",
      "utf8",
    );
    const clean = await auditQueryUrlExport(root);
    assert.equal(clean.errors.length, 0);

    await writeFile(
      path.join(pageDirectory, "index.html"),
      [
        '<a href="/en/contact/?source_page=%2Fen%2Fproducts%2F&content_type=site&cta_position=header">Contact</a>',
        '<a href="/en/products/?category=sensors">Sensors</a>',
        '<link rel="canonical" href="https://dualcorelink.com/en/products/?category=sensors"/>',
        '<link rel="alternate" hreflang="en" href="https://dualcorelink.com/en/products/?series=smart"/>',
      ].join(""),
      "utf8",
    );
    await writeFile(
      path.join(root, "sitemap.xml"),
      "<urlset><url><loc>https://dualcorelink.com/en/products/?category=sensors</loc></url></urlset>",
      "utf8",
    );
    const unsafe = await auditQueryUrlExport(root);
    assert.equal(unsafe.internalQueryHref, 2);
    assert.equal(unsafe.sourcePageHref, 1);
    assert.equal(unsafe.contentTypeHref, 1);
    assert.equal(unsafe.ctaPositionHref, 1);
    assert.equal(unsafe.categoryHref, 1);
    assert.equal(unsafe.canonicalQueryUrl, 1);
    assert.equal(unsafe.hreflangQueryUrl, 1);
    assert.equal(unsafe.sitemapQueryUrl, 1);
    assert.ok(unsafe.errors.length > 0);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});

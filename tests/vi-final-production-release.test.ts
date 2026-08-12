import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productGalleries } from "../src/config/product-galleries";
import { vietnameseStaticFaqItems } from "../src/config/static-faqs";
import { viFinalReviewedCmsImportPayload } from "../src/content/locales/cms-import";
import { buildHeaderLanguageOptions } from "../src/lib/navigation-publication";
import {
  getPublicationHreflang,
  localizedPublicationPages,
} from "../src/lib/localized-publication";
import { multilingualPublicationManifest } from "../src/lib/multilingual-publication-manifest";
import { getSitemapEligibleEntries } from "../src/lib/multilingual-publication-control";
import { viReviewedReleaseUrls } from "../src/lib/multilingual-release-batches";

const vietnameseEntries = multilingualPublicationManifest.filter(
  (entry) => entry.locale === "vi",
);
const vietnamesePages = localizedPublicationPages.filter(
  (entry) => entry.locale === "vi",
);

test("Vietnamese final release inventory and CMS scope are exact", () => {
  assert.equal(vietnameseEntries.length, 69);
  assert.equal(vietnameseEntries.filter((entry) => entry.nativeReviewStatus === "approved").length, 69);
  assert.equal(vietnameseEntries.filter((entry) => entry.productionReleaseReady).length, 69);
  assert.equal(vietnamesePages.length, 69);
  assert.deepEqual(
    new Set(vietnamesePages.map((entry) => entry.localizedUrl)),
    new Set(viReviewedReleaseUrls),
  );
  assert.deepEqual(
    Object.fromEntries(
      ["product", "solution", "resource", "region", "static", "product-listing", "solution-listing", "resource-listing", "region-listing"].map(
        (pageType) => [pageType, vietnameseEntries.filter((entry) => entry.pageType === pageType).length],
      ),
    ),
    {
      product: 36,
      solution: 6,
      resource: 15,
      region: 5,
      static: 3,
      "product-listing": 1,
      "solution-listing": 1,
      "resource-listing": 1,
      "region-listing": 1,
    },
  );
  assert.equal(viFinalReviewedCmsImportPayload.length, 42);
  assert.equal(viFinalReviewedCmsImportPayload.filter((entry) => entry.contentType === "product").length, 36);
  assert.equal(viFinalReviewedCmsImportPayload.filter((entry) => entry.contentType === "solution").length, 6);
});

test("Vietnamese media, FAQ, links, and publication metadata stay complete", () => {
  const fullImages = Object.values(productGalleries).reduce(
    (count, gallery) => count + 1 + gallery.gallery.length,
    0,
  );
  assert.equal(fullImages, 132);
  assert.equal(vietnameseStaticFaqItems.length, 30);
  assert.equal(/\/vi\/[^"\s]*\?/.test(JSON.stringify(vietnamesePages)), false);

  for (const entry of vietnameseEntries) {
    const contentPath = new URL(entry.localizedUrl).pathname.replace(/^\/vi\/|\/$/g, "");
    const hreflang = getPublicationHreflang(contentPath);
    assert.equal(hreflang.vi, entry.localizedUrl);
    assert.match(hreflang.en, /^https:\/\/dualcorelink\.com\/en\//);
    assert.match(hreflang.zh, /^https:\/\/dualcorelink\.com\/zh\//);
    assert.match(hreflang.ar, /^https:\/\/dualcorelink\.com\/ar\//);
    assert.equal(hreflang["x-default"], hreflang.en);
    assert.deepEqual(
      buildHeaderLanguageOptions("en", contentPath).map((option) => option.locale),
      ["en", "zh", "ar", "vi", "de", "es", "fa"],
    );
  }

  const finalThree = multilingualPublicationManifest.filter(
    (entry) => ["de", "es", "fa"].includes(entry.locale),
  );
  assert.equal(finalThree.length, 207);
  assert.equal(finalThree.filter((entry) => entry.productionReleaseReady).length, 207);
});

test("Vietnamese sitemap and production routing are exact", () => {
  const localizedSitemapEntries = getSitemapEligibleEntries(
    multilingualPublicationManifest,
  );
  const urls = localizedSitemapEntries.map((entry) => entry.localizedUrl);
  const nginx = readFileSync("deploy/nginx/dualcorelink.com.conf.template", "utf8");
  const workflow = readFileSync(".github/workflows/aws-production-deploy.yml", "utf8");
  const deploy = readFileSync("deploy/scripts/deploy-static.sh", "utf8");

  assert.equal(76 + urls.length, 490);
  assert.equal(urls.filter((url) => /\/vi\//.test(url)).length, 69);
  assert.equal(urls.filter((url) => /\/(de|es|fa)\//.test(url)).length, 207);
  assert.match(nginx, /\(\?<reviewed_locale>zh\|ar\|vi\|de\|es\|fa\)/);
  assert.match(nginx, /\(\?<reviewed_rsc_locale>zh\|ar\|vi\|de\|es\|fa\)/);
  assert.doesNotMatch(nginx, /location\s+(?:\^~\s+)?\/vi\//);
  assert.match(workflow, /multilingual:release-check -- --locale=vi --batch=remaining-final/);
  assert.match(workflow, /Generating static pages\.\*560\/560/);
  assert.match(deploy, /EXPECTED_SITEMAP_URLS:-490/);
  assert.match(deploy, /EXPECTED_VI_PAGES:-69/);
});

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { productGalleries } from "../src/config/product-galleries";
import { staticFaqItems } from "../src/config/static-faqs";
import { arFinalReviewedCmsImportPayload } from "../src/content/locales/cms-import";
import { buildHeaderLanguageOptions } from "../src/lib/navigation-publication";
import {
  getPublicationHreflang,
  localizedPublicationPages,
} from "../src/lib/localized-publication";
import {
  multilingualPublicationManifest,
} from "../src/lib/multilingual-publication-manifest";
import { arReviewedReleaseUrls } from "../src/lib/multilingual-release-batches";

const arabicEntries = multilingualPublicationManifest.filter(
  (entry) => entry.locale === "ar",
);
const arabicPages = localizedPublicationPages.filter(
  (entry) => entry.locale === "ar",
);

test("Arabic final release publishes exactly the approved 69-page inventory", () => {
  assert.equal(arabicEntries.length, 69);
  assert.equal(arabicEntries.filter((entry) => entry.nativeReviewStatus === "approved").length, 69);
  assert.equal(arabicEntries.filter((entry) => entry.productionReleaseReady).length, 69);
  assert.equal(arabicPages.length, 69);
  assert.deepEqual(
    new Set(arabicPages.map((entry) => entry.localizedUrl)),
    new Set(arReviewedReleaseUrls),
  );
  assert.deepEqual(
    Object.fromEntries(
      ["product", "solution", "resource", "region", "static", "product-listing", "solution-listing", "resource-listing", "region-listing"].map(
        (pageType) => [pageType, arabicEntries.filter((entry) => entry.pageType === pageType).length],
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
});

test("Arabic CMS scope and immutable product media baselines remain exact", () => {
  assert.equal(arFinalReviewedCmsImportPayload.length, 42);
  assert.equal(arFinalReviewedCmsImportPayload.filter((entry) => entry.contentType === "product").length, 36);
  assert.equal(arFinalReviewedCmsImportPayload.filter((entry) => entry.contentType === "solution").length, 6);
  const fullImages = Object.values(productGalleries).reduce(
    (count, gallery) => count + 1 + gallery.gallery.length,
    0,
  );
  assert.equal(fullImages, 132);
  assert.equal(staticFaqItems.length, 30);
});

test("Arabic hreflang, switcher, and pending-locale boundaries are exact", () => {
  for (const entry of arabicEntries) {
    const contentPath = new URL(entry.localizedUrl).pathname.replace(/^\/ar\/|\/$/g, "");
    const hreflang = getPublicationHreflang(contentPath);
    assert.equal(hreflang.ar, entry.localizedUrl);
    assert.match(hreflang.en, /^https:\/\/dualcorelink\.com\/en\//);
    assert.match(hreflang.zh, /^https:\/\/dualcorelink\.com\/zh\//);
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
  assert.equal(/\/ar\/[^"\s]*\?/.test(JSON.stringify(arabicPages)), false);
});

test("production Nginx and workflow expose only the exact Arabic release", () => {
  const nginx = readFileSync("deploy/nginx/dualcorelink.com.conf.template", "utf8");
  const workflow = readFileSync(".github/workflows/aws-production-deploy.yml", "utf8");
  const deploy = readFileSync("deploy/scripts/deploy-static.sh", "utf8");

  assert.match(nginx, /\(\?<reviewed_locale>zh\|ar\|vi\|de\|es\|fa\)/);
  assert.match(nginx, /\(\?<reviewed_rsc_locale>zh\|ar\|vi\|de\|es\|fa\)/);
  assert.match(nginx, /try_files \/\$reviewed_locale\/\$reviewed_path\/index\.html =404/);
  assert.match(nginx, /try_files \/\$reviewed_rsc_locale\/\$reviewed_rsc_path\/index\.txt =404/);
  assert.doesNotMatch(nginx, /location\s+(?:\^~\s+)?\/ar\//);
  assert.match(workflow, /multilingual:release-check -- --locale=ar --batch=remaining-final/);
  assert.match(workflow, /Generating static pages\.\*560\/560/);
  assert.match(deploy, /EXPECTED_SITEMAP_URLS:-490/);
  assert.match(deploy, /EXPECTED_AR_PAGES:-69/);
  assert.match(deploy, /EXPECTED_VI_PAGES:-69/);
});

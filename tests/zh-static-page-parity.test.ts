import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import {
  customerTypeOptions,
  productInterestOptions,
} from "../src/config/brand";
import { contactFormOptions } from "../src/config/contact-form-copy";
import {
  chineseStaticFaqCategories,
  chineseStaticFaqItems,
  staticFaqCategories,
  staticFaqItems,
} from "../src/config/static-faqs";
import {
  chineseAboutCopy,
  chineseContactCopy,
} from "../src/config/static-page-localization";
import { localizedPublicationPages } from "../src/lib/localized-publication";

const routeSources = {
  about: readFileSync("src/app/[locale]/about/page.tsx", "utf8"),
  contact: readFileSync("src/app/[locale]/contact/page.tsx", "utf8"),
  faqs: readFileSync("src/app/[locale]/faqs/page.tsx", "utf8"),
  form: readFileSync(
    "src/components/contact/get-quote-form.tsx",
    "utf8",
  ),
};

test("Chinese About retains the specialized company renderer and all core modules", () => {
  assert.match(routeSources.about, /supportsSpecializedLocalizedComposition\(locale\)/);
  assert.match(routeSources.about, /about-company-hero/);
  assert.match(routeSources.about, /about-step-card/);
  assert.match(routeSources.about, /about-capability-card/);
  assert.match(routeSources.about, /about-final-cta/);
  assert.match(routeSources.about, /"@type": "AboutPage"/);
  assert.match(routeSources.about, /createBreadcrumbSchema/);
  assert.equal(chineseAboutCopy.capabilities.length, 9);
  assert.equal(chineseAboutCopy.customerTypes.length, 6);
  assert.equal(chineseAboutCopy.commercialItems.length, 4);
});

test("Chinese Contact uses the complete inquiry form without changing submission values", () => {
  assert.match(routeSources.contact, /supportsSpecializedLocalizedComposition\(locale\)/);
  assert.match(routeSources.contact, /<GetQuoteForm locale=\{locale\}/);
  assert.match(routeSources.contact, /wechat-allan-qr\.png/);
  assert.match(routeSources.form, /contact-inquiry-form/);
  assert.match(routeSources.contact, /"@type": "ContactPage"/);
  assert.match(routeSources.contact, /createBreadcrumbSchema/);
  assert.equal(chineseContactCopy.reviewItems.length, 3);
  assert.deepEqual(
    contactFormOptions.customerTypes.map((option) => option.value),
    [...customerTypeOptions],
  );
  assert.deepEqual(
    contactFormOptions.productInterests.map((option) => option.value),
    [...productInterestOptions],
  );
  assert.equal(contactFormOptions.projectStages.length, 6);
  assert.ok(
    contactFormOptions.customerTypes.every((option) => option.zhLabel),
  );
  assert.ok(
    contactFormOptions.productInterests.every((option) => option.zhLabel),
  );
});

test("Chinese Contact preserves attribution, GA4 bindings, fallback, and form fields", () => {
  for (const field of [
    "name",
    "company",
    "email",
    "phone",
    "country",
    "customerType",
    "projectStage",
    "targetDelivery",
    "productInterest",
    "quantity",
    "message",
    "website",
  ]) {
    assert.match(routeSources.form, new RegExp(`name=\\"${field}\\"`));
  }
  assert.match(routeSources.form, /trackInquiryEvent\("form_submit_attempt"/);
  assert.match(routeSources.form, /trackInquiryEvent\("form_submit_success"/);
  assert.match(routeSources.form, /"form_submit_failure"/);
  assert.match(routeSources.form, /contentType: "contact"/);
  assert.match(routeSources.form, /form_email_fallback/);
  assert.match(routeSources.form, /form_whatsapp_fallback/);
  assert.match(routeSources.form, /This website does not upload files/);
});

test("Chinese FAQ supplies the complete 30-question purchasing set and schema", () => {
  assert.equal(staticFaqCategories.length, 6);
  assert.equal(chineseStaticFaqCategories.length, 6);
  assert.equal(staticFaqItems.length, 30);
  assert.equal(chineseStaticFaqItems.length, 30);
  assert.match(routeSources.faqs, /supportsSpecializedLocalizedComposition\(locale\)/);
  assert.match(routeSources.faqs, /getStaticFaqCategories\(locale\)/);
  assert.match(routeSources.faqs, /createFaqPageSchema/);
  assert.match(routeSources.faqs, /createBreadcrumbSchema/);
  assert.match(routeSources.faqs, /href="\/en\/downloads\/"/);

  const serialized = JSON.stringify(chineseStaticFaqItems);
  for (const required of [
    "最低起订量",
    "模具",
    "仅改变颜色",
    "7–15 天",
    "OEM/ODM",
    "RCU",
    "数据表",
    "证书",
    "接线图",
  ]) {
    assert.ok(serialized.includes(required), required);
  }
});

test("only released Chinese static pages use specialized composition", () => {
  for (const route of [routeSources.about, routeSources.contact, routeSources.faqs]) {
    assert.match(route, /supportsSpecializedLocalizedComposition\(locale\)/);
  }
  for (const locale of ["de", "es", "ar", "vi", "fa"] as const) {
    assert.equal(
      localizedPublicationPages.some(
        (page) =>
          page.locale === locale &&
          page.pageType === "static" &&
          ["about", "contact", "faqs"].includes(page.slug),
      ),
      false,
      locale,
    );
  }
});

import { createHash } from "node:crypto";

export const approvedSourceIds = [48, 47, 6, 222, 142, 140, 138] as const;
export const approvedLocale = "zh";
export const approvedBatch = "p0";
export const approvedReviewer = "Allan";
export const approvedReviewDate = "2026-07-29";
export const zhP1ApprovedReviewer = "Allan";
export const zhP1ApprovedReviewDate = "2026-08-02";
export const zhRemainingFinalApprovedReviewer = "Allan";
export const zhRemainingFinalApprovedReviewDate = "2026-08-03";
export const arFinalApprovedReviewer = "Allan";
export const arFinalApprovedReviewDate = "2026-08-11";
export const viFinalApprovedReviewer = "Allan";
export const viFinalApprovedReviewDate = "2026-08-11";
export const finalThreeApprovedReviewer = "Allan";
export const finalThreeApprovedReviewDate = "2026-08-12";
export const translationSchemaVersion = 1;
export const ownerWaiverSchemaVersion = 1;
export const ownerWaiverReason =
  "Business owner explicitly waived Arabic native-language review and accepted localization risk.";
export const ownerWaiverBy = "Allan";
export const ownerWaiverDate = "2026-07-31";
export const ownerWaiverScopeCount = 15;
export const ownerWaiverScopeSha256 =
  "92eae81730ac445455385ff5f3811394dbb866d6f333dc6a290f5df60e4dc193";

export const exitCodes = {
  success: 0,
  arguments: 10,
  preflight: 20,
  conflict: 30,
  lock: 40,
  apply: 50,
  verify: 60,
  publish: 70,
  rollback: 80,
  safety: 90,
} as const;

export type ContentType = "product" | "solution";
export type SupportedImportLocale = "zh" | "ar" | "vi" | "de" | "es" | "fa";

export type StructuredContent = {
  eyebrow: string;
  h1: string;
  introduction: string;
  breadcrumbLabel: string;
  parentBreadcrumb?: { label: string; href: string };
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  faqs: Array<{ question: string; answer: string }>;
  relatedLinks: Array<{ label: string; description: string; href: string }>;
  cta: {
    heading: string;
    description: string;
    label: string;
    href: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
  imageAlt?: string;
};

export type ImportPayloadRecord = {
  contentType: ContentType;
  sourceEnglishContentId: number;
  sourceEnglishSlug: string;
  localizedSlug: string;
  localizedContentId: null;
  importKey: string;
  deliveryMode: "validated-import-payload";
  locale: string;
  batch: string;
  priority?: "P0" | "P1" | "P2";
  translationGroup?: string;
  translatedTitle: string;
  translatedDescription: string;
  translatedSpecifications: Array<{ label: string; value: string }>;
  translatedSeoTitle: string;
  translatedMetaDescription: string;
  translatedStructuredContent: StructuredContent;
  translationStatus: "approved";
  reviewStatus: "approved";
  nativeReviewStatus: "approved" | "pending";
  nativeReviewer: string | null;
  nativeReviewDate: string | null;
  nativeReviewNotes: string;
  productionReleaseReady: boolean;
  ownerReviewWaiverSchemaVersion?: 1;
  ownerReviewWaiverStatus?: "approved";
  ownerReviewWaiverBy?: string;
  ownerReviewWaiverDate?: string;
  ownerReviewWaiverReason?: string;
  ownerReviewWaiverScopeCount?: number;
  ownerReviewWaiverScopeSha256?: string;
};

export type SourceRecord = {
  id: number;
  postType: ContentType;
  slug: string;
  status: string;
  language: string;
  core: Record<string, unknown>;
  acf: Record<string, unknown>;
};

export type LocalizedRecord = {
  id: number;
  postType: ContentType;
  slug: string;
  status: string;
  core: Record<string, unknown>;
  acf: Record<string, unknown>;
  meta: Record<string, string | number>;
};

export type MappedRecord = Omit<LocalizedRecord, "id"> & {
  sourceId: number;
  identity: string;
};

export type Operation = {
  sourceId: number;
  localizedId: number;
  operation: "created" | "updated" | "unchanged";
  diff: Record<string, { before: unknown; after: unknown }>;
};

export type RunRecord = {
  runId: string;
  payloadHash: string;
  request: ImportPayloadRecord[];
  sourceHashes: Record<string, string>;
  preImages: Record<string, LocalizedRecord>;
  operations: Operation[];
  preflightPassed: boolean;
  applyCompleted: boolean;
  verifyPassed: boolean;
  published: boolean;
  rolledBack: boolean;
  locale: SupportedImportLocale;
  batch: "p0" | "p1" | "remaining-final";
  allowOwnerWaiver: boolean;
};

export interface CmsRepository {
  getSource(postType: ContentType, id: number): SourceRecord | undefined;
  sourceHash(postType: ContentType, id: number): string;
  findBySlug(postType: ContentType, slug: string): Array<SourceRecord | LocalizedRecord>;
  findLocalized(
    postType: ContentType,
    sourceId: number,
    locale: string,
    slug: string,
  ): LocalizedRecord | undefined;
  listLocalized(locale: string, batch: string): LocalizedRecord[];
  create(record: MappedRecord): LocalizedRecord;
  update(id: number, record: MappedRecord): LocalizedRecord;
  setStatus(id: number, status: string): void;
  restore(record: LocalizedRecord): void;
  getLocalized(id: number): LocalizedRecord | undefined;
}
const payloadKeys = new Set([
  "contentType",
  "sourceEnglishContentId",
  "sourceEnglishSlug",
  "localizedSlug",
  "localizedContentId",
  "importKey",
  "deliveryMode",
  "locale",
  "batch",
  "priority",
  "translationGroup",
  "translatedTitle",
  "translatedDescription",
  "translatedSpecifications",
  "translatedSeoTitle",
  "translatedMetaDescription",
  "translatedStructuredContent",
  "translationStatus",
  "reviewStatus",
  "nativeReviewStatus",
  "nativeReviewer",
  "nativeReviewDate",
  "nativeReviewNotes",
  "productionReleaseReady",
  "ownerReviewWaiverSchemaVersion",
  "ownerReviewWaiverStatus",
  "ownerReviewWaiverBy",
  "ownerReviewWaiverDate",
  "ownerReviewWaiverReason",
  "ownerReviewWaiverScopeCount",
  "ownerReviewWaiverScopeSha256",
]);

const expected = new Map<number, { postType: ContentType; slug: string }>([
  [48, { postType: "product", slug: "hotel-smart-room-rcu-host-1" }],
  [47, { postType: "product", slug: "rcu-controller-cabinet" }],
  [6, { postType: "product", slug: "86-type-ai-smart-control-display" }],
  [222, { postType: "product", slug: "smart-four-key-scene-control-panel" }],
  [142, { postType: "solution", slug: "oem-odm-custom-panel-solution" }],
  [140, { postType: "solution", slug: "rcu-room-control-solution" }],
  [138, { postType: "solution", slug: "smart-hotel-automation-solution" }],
]);

const arabicExpected = new Map<number, { postType: ContentType; slug: string }>([
  [48, { postType: "product", slug: "hotel-smart-room-rcu-host-1" }],
  [47, { postType: "product", slug: "rcu-controller-cabinet" }],
  [6, { postType: "product", slug: "86-type-ai-smart-control-display" }],
  [140, { postType: "solution", slug: "rcu-room-control-solution" }],
  [138, { postType: "solution", slug: "smart-hotel-automation-solution" }],
  [137, { postType: "solution", slug: "hotel-guest-room-control-solution" }],
]);

const arFinalExpected = new Map<
  number,
  { postType: ContentType; slug: string; priority: "P0" | "P1" | "P2" }
>([
  [6, { postType: "product", slug: "86-type-ai-smart-control-display", priority: "P0" }],
  [8, { postType: "product", slug: "ai-large-smart-display", priority: "P1" }],
  [9, { postType: "product", slug: "rotary-knob-smart-control-display", priority: "P1" }],
  [10, { postType: "product", slug: "thermostat-hvac-control-panel", priority: "P1" }],
  [11, { postType: "product", slug: "ai-music-control-panel", priority: "P1" }],
  [12, { postType: "product", slug: "hotel-delivery-robot", priority: "P1" }],
  [13, { postType: "product", slug: "hotel-smart-delivery-cabinet", priority: "P1" }],
  [43, { postType: "product", slug: "embedded-human-presence-sensor", priority: "P1" }],
  [44, { postType: "product", slug: "infrared-repeater", priority: "P2" }],
  [45, { postType: "product", slug: "hotel-room-door-magnetic-sensor", priority: "P1" }],
  [46, { postType: "product", slug: "hotel-guest-room-doorbell", priority: "P1" }],
  [47, { postType: "product", slug: "rcu-controller-cabinet", priority: "P0" }],
  [48, { postType: "product", slug: "hotel-smart-room-rcu-host-1", priority: "P0" }],
  [49, { postType: "product", slug: "smart-usb-five-hole-socket", priority: "P2" }],
  [50, { postType: "product", slug: "smart-key-card-energy-saver-panel", priority: "P1" }],
  [51, { postType: "product", slug: "smart-four-key-curtain-control-panel", priority: "P1" }],
  [52, { postType: "product", slug: "brushed-aluminum-86-base-doorbell-panel", priority: "P2" }],
  [137, { postType: "solution", slug: "hotel-guest-room-control-solution", priority: "P0" }],
  [138, { postType: "solution", slug: "smart-hotel-automation-solution", priority: "P0" }],
  [139, { postType: "solution", slug: "ai-smart-display-solution", priority: "P1" }],
  [140, { postType: "solution", slug: "rcu-room-control-solution", priority: "P0" }],
  [141, { postType: "solution", slug: "hotel-delivery-robot-solution", priority: "P1" }],
  [142, { postType: "solution", slug: "oem-odm-custom-panel-solution", priority: "P0" }],
  [188, { postType: "product", slug: "smart-curtain-motor", priority: "P1" }],
  [189, { postType: "product", slug: "hotel-smart-room-rcu-host-2", priority: "P1" }],
  [190, { postType: "product", slug: "hotel-delivery-robot-charging-dock", priority: "P1" }],
  [191, { postType: "product", slug: "borui-red-matte-usb-five-hole-socket", priority: "P2" }],
  [192, { postType: "product", slug: "borui-red-matte-room-status-four-key-switch-panel", priority: "P2" }],
  [193, { postType: "product", slug: "vintage-gold-key-card-energy-saver-panel", priority: "P2" }],
  [194, { postType: "product", slug: "vintage-gold-four-key-smart-switch-panel", priority: "P2" }],
  [195, { postType: "product", slug: "brushed-aluminum-sos-alarm-panel", priority: "P2" }],
  [196, { postType: "product", slug: "brushed-aluminum-thermostat-control-panel", priority: "P2" }],
  [197, { postType: "product", slug: "smart-voice-telephone-information-socket", priority: "P2" }],
  [219, { postType: "product", slug: "hotel-smart-room-rcu-host-3", priority: "P1" }],
  [220, { postType: "product", slug: "smart-single-key-switch-panel", priority: "P2" }],
  [221, { postType: "product", slug: "smart-three-key-music-control-panel", priority: "P2" }],
  [222, { postType: "product", slug: "smart-four-key-scene-control-panel", priority: "P0" }],
  [223, { postType: "product", slug: "smart-footlight-night-light-panel", priority: "P2" }],
  [224, { postType: "product", slug: "smart-series-dual-vertical-socket-panel", priority: "P2" }],
  [225, { postType: "product", slug: "borui-red-matte-triple-socket-panel", priority: "P2" }],
  [226, { postType: "product", slug: "brushed-aluminum-voice-telephone-information-panel", priority: "P2" }],
  [238, { postType: "product", slug: "hotel-ceiling-background-speaker", priority: "P2" }],
]);

const viFinalExpected = arFinalExpected;
const finalThreeExpected = arFinalExpected;

const zhP1Expected = new Map<number, { postType: ContentType; slug: string }>([
  [219, { postType: "product", slug: "hotel-smart-room-rcu-host-3" }],
  [190, { postType: "product", slug: "hotel-delivery-robot-charging-dock" }],
  [189, { postType: "product", slug: "hotel-smart-room-rcu-host-2" }],
  [188, { postType: "product", slug: "smart-curtain-motor" }],
  [51, { postType: "product", slug: "smart-four-key-curtain-control-panel" }],
  [50, { postType: "product", slug: "smart-key-card-energy-saver-panel" }],
  [46, { postType: "product", slug: "hotel-guest-room-doorbell" }],
  [45, { postType: "product", slug: "hotel-room-door-magnetic-sensor" }],
  [43, { postType: "product", slug: "embedded-human-presence-sensor" }],
  [13, { postType: "product", slug: "hotel-smart-delivery-cabinet" }],
  [12, { postType: "product", slug: "hotel-delivery-robot" }],
  [11, { postType: "product", slug: "ai-music-control-panel" }],
  [10, { postType: "product", slug: "thermostat-hvac-control-panel" }],
  [9, { postType: "product", slug: "rotary-knob-smart-control-display" }],
  [8, { postType: "product", slug: "ai-large-smart-display" }],
  [141, { postType: "solution", slug: "hotel-delivery-robot-solution" }],
  [139, { postType: "solution", slug: "ai-smart-display-solution" }],
]);

const zhRemainingFinalExpected = new Map<
  number,
  { postType: ContentType; slug: string; priority: "P0" | "P2" }
>([
  [238, { postType: "product", slug: "hotel-ceiling-background-speaker", priority: "P2" }],
  [226, { postType: "product", slug: "brushed-aluminum-voice-telephone-information-panel", priority: "P2" }],
  [225, { postType: "product", slug: "borui-red-matte-triple-socket-panel", priority: "P2" }],
  [224, { postType: "product", slug: "smart-series-dual-vertical-socket-panel", priority: "P2" }],
  [223, { postType: "product", slug: "smart-footlight-night-light-panel", priority: "P2" }],
  [221, { postType: "product", slug: "smart-three-key-music-control-panel", priority: "P2" }],
  [220, { postType: "product", slug: "smart-single-key-switch-panel", priority: "P2" }],
  [197, { postType: "product", slug: "smart-voice-telephone-information-socket", priority: "P2" }],
  [196, { postType: "product", slug: "brushed-aluminum-thermostat-control-panel", priority: "P2" }],
  [195, { postType: "product", slug: "brushed-aluminum-sos-alarm-panel", priority: "P2" }],
  [194, { postType: "product", slug: "vintage-gold-four-key-smart-switch-panel", priority: "P2" }],
  [193, { postType: "product", slug: "vintage-gold-key-card-energy-saver-panel", priority: "P2" }],
  [192, { postType: "product", slug: "borui-red-matte-room-status-four-key-switch-panel", priority: "P2" }],
  [191, { postType: "product", slug: "borui-red-matte-usb-five-hole-socket", priority: "P2" }],
  [52, { postType: "product", slug: "brushed-aluminum-86-base-doorbell-panel", priority: "P2" }],
  [49, { postType: "product", slug: "smart-usb-five-hole-socket", priority: "P2" }],
  [44, { postType: "product", slug: "infrared-repeater", priority: "P2" }],
  [137, { postType: "solution", slug: "hotel-guest-room-control-solution", priority: "P0" }],
]);

type BatchPolicy = {
  locale: SupportedImportLocale;
  batch: "p0" | "p1" | "remaining-final";
  expected: Map<number, { postType: ContentType; slug: string; priority?: "P0" | "P1" | "P2" }>;
  count: number;
  allowOwnerWaiver: boolean;
  reviewer: string | null;
  reviewDate: string | null;
};

function batchPolicy(
  locale: string,
  batch: string,
  allowOwnerWaiver: boolean,
): BatchPolicy | undefined {
  if (locale === "zh" && batch === "p0" && !allowOwnerWaiver) {
    return {
      locale,
      batch,
      expected,
      count: 7,
      allowOwnerWaiver: false,
      reviewer: approvedReviewer,
      reviewDate: approvedReviewDate,
    };
  }
  if (locale === "zh" && batch === "p1" && !allowOwnerWaiver) {
    return {
      locale,
      batch,
      expected: zhP1Expected,
      count: 17,
      allowOwnerWaiver: false,
      reviewer: zhP1ApprovedReviewer,
      reviewDate: zhP1ApprovedReviewDate,
    };
  }
  if (
    locale === "zh" &&
    batch === "remaining-final" &&
    !allowOwnerWaiver
  ) {
    return {
      locale,
      batch,
      expected: zhRemainingFinalExpected,
      count: 18,
      allowOwnerWaiver: false,
      reviewer: zhRemainingFinalApprovedReviewer,
      reviewDate: zhRemainingFinalApprovedReviewDate,
    };
  }
  if (locale === "ar" && batch === "p0" && allowOwnerWaiver) {
    return {
      locale,
      batch,
      expected: arabicExpected,
      count: 6,
      allowOwnerWaiver: true,
      reviewer: null,
      reviewDate: null,
    };
  }
  if (
    locale === "ar" &&
    batch === "remaining-final" &&
    !allowOwnerWaiver
  ) {
    return {
      locale,
      batch,
      expected: arFinalExpected,
      count: 42,
      allowOwnerWaiver: false,
      reviewer: arFinalApprovedReviewer,
      reviewDate: arFinalApprovedReviewDate,
    };
  }
  if (
    locale === "vi" &&
    batch === "remaining-final" &&
    !allowOwnerWaiver
  ) {
    return {
      locale,
      batch,
      expected: viFinalExpected,
      count: 42,
      allowOwnerWaiver: false,
      reviewer: viFinalApprovedReviewer,
      reviewDate: viFinalApprovedReviewDate,
    };
  }
  if (
    (locale === "de" || locale === "es" || locale === "fa") &&
    batch === "remaining-final" &&
    !allowOwnerWaiver
  ) {
    return {
      locale,
      batch,
      expected: finalThreeExpected,
      count: 42,
      allowOwnerWaiver: false,
      reviewer: finalThreeApprovedReviewer,
      reviewDate: finalThreeApprovedReviewDate,
    };
  }
  return undefined;
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, child]) => [key, canonicalize(child)]),
    );
  }
  return value;
}

export function canonicalJson(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

export function sha256(value: unknown): string {
  return createHash("sha256").update(canonicalJson(value)).digest("hex");
}

function html(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeHref(value: string, locale: SupportedImportLocale): string {
  if (
    !new RegExp(
      `^/${locale}/[a-z0-9/_-]*(?:#[a-z0-9_-]+)?$`,
      "i",
    ).test(value)
  ) {
    throw new Error(`unsafe localized href: ${value}`);
  }
  return html(value);
}

export function renderStructuredContent(record: ImportPayloadRecord): string {
  const content = record.translatedStructuredContent;
  const headings =
    record.locale === "ar"
      ? {
          specifications: "المواصفات ومعلومات الشراء",
          faq: "الأسئلة الشائعة",
          related: "صفحات ذات صلة",
        }
      : record.locale === "vi"
        ? {
            specifications: "Thông số và thông tin mua hàng",
            faq: "Câu hỏi thường gặp",
            related: "Trang liên quan",
          }
        : {
          specifications: "规格与采购信息",
          faq: "常见问题",
          related: "相关页面",
        };
  const output = [
    `<p class="content-eyebrow">${html(content.eyebrow)}</p>`,
    `<h1>${html(content.h1)}</h1>`,
    `<p>${html(content.introduction)}</p>`,
    `<section><h2>${headings.specifications}</h2><dl>`,
    ...record.translatedSpecifications.flatMap((specification) => [
      `<dt>${html(specification.label)}</dt>`,
      `<dd>${html(specification.value)}</dd>`,
    ]),
    `</dl></section>`,
  ];
  for (const section of content.sections) {
    output.push(`<section><h2>${html(section.heading)}</h2>`);
    for (const paragraph of section.paragraphs) {
      output.push(`<p>${html(paragraph)}</p>`);
    }
    if (section.bullets?.length) {
      output.push("<ul>");
      for (const bullet of section.bullets) output.push(`<li>${html(bullet)}</li>`);
      output.push("</ul>");
    }
    output.push("</section>");
  }
  output.push(`<section><h2>${headings.faq}</h2>`);
  for (const faq of content.faqs) {
    output.push(`<h3>${html(faq.question)}</h3>`, `<p>${html(faq.answer)}</p>`);
  }
  output.push("</section>", `<section><h2>${headings.related}</h2><ul>`);
  for (const link of content.relatedLinks) {
    output.push(
      `<li><a href="${safeHref(link.href, record.locale as SupportedImportLocale)}">${html(link.label)}</a><p>${html(link.description)}</p></li>`,
    );
  }
  output.push(
    "</ul></section>",
    `<section class="content-cta"><h2>${html(content.cta.heading)}</h2>`,
    `<p>${html(content.cta.description)}</p>`,
    `<p><a href="${safeHref(content.cta.href, record.locale as SupportedImportLocale)}">${html(content.cta.label)}</a></p>`,
  );
  if (content.cta.secondaryLabel && content.cta.secondaryHref) {
    output.push(
      `<p><a href="${safeHref(content.cta.secondaryHref, record.locale as SupportedImportLocale)}">${html(content.cta.secondaryLabel)}</a></p>`,
    );
  }
  output.push("</section>");
  return output.join("\n");
}

function specificationText(record: ImportPayloadRecord): string {
  return record.translatedSpecifications
    .map((item) => `${item.label}: ${item.value}`)
    .join("\n");
}

function faqText(record: ImportPayloadRecord): string {
  return record.translatedStructuredContent.faqs
    .map((item) => `${item.question}\n${item.answer}`)
    .join("\n\n");
}

export function mapPayloadRecord(
  record: ImportPayloadRecord,
  payloadHash: string,
  allowOwnerWaiver = false,
): MappedRecord {
  const group = `shb2b-${record.contentType}-${record.sourceEnglishContentId}`;
  const core: Record<string, unknown> = {
    post_title: record.translatedTitle,
    post_name: record.localizedSlug,
    post_excerpt: record.translatedDescription,
    post_content: renderStructuredContent(record),
    post_status: "draft",
  };
  const acf: Record<string, unknown> =
    record.contentType === "product"
      ? {
          product_short_description: record.translatedDescription,
          product_technical_specs: specificationText(record),
          product_faqs_text: faqText(record),
          product_seo_title: record.translatedSeoTitle,
          product_meta_description: record.translatedMetaDescription,
          product_breadcrumb_label:
            record.translatedStructuredContent.breadcrumbLabel,
          ...(record.translatedStructuredContent.imageAlt
            ? {
                product_image_alt_text:
                  record.translatedStructuredContent.imageAlt,
              }
            : {}),
        }
      : {
          solution_summary: record.translatedDescription,
          solution_seo_title: record.translatedSeoTitle,
          solution_meta_description: record.translatedMetaDescription,
          solution_breadcrumb_label:
            record.translatedStructuredContent.breadcrumbLabel,
        };
  const meta: Record<string, string | number> = {
    _dualcorelink_translation_schema_version: translationSchemaVersion,
    _dualcorelink_translation_locale: record.locale,
    _dualcorelink_translation_source_id: record.sourceEnglishContentId,
    _dualcorelink_translation_group: group,
    _dualcorelink_translation_batch: record.batch,
    _dualcorelink_translation_payload_hash: payloadHash,
    _dualcorelink_translation_reviewer: record.nativeReviewer ?? "",
    _dualcorelink_translation_review_date: record.nativeReviewDate ?? "",
  };
  if (record.locale === "ar" && allowOwnerWaiver) {
    Object.assign(meta, {
      _dualcorelink_owner_review_waiver_schema_version:
        ownerWaiverSchemaVersion,
      _dualcorelink_owner_review_waiver_status: record.ownerReviewWaiverStatus!,
      _dualcorelink_owner_review_waiver_by: record.ownerReviewWaiverBy!,
      _dualcorelink_owner_review_waiver_date: record.ownerReviewWaiverDate!,
      _dualcorelink_owner_review_waiver_reason:
        record.ownerReviewWaiverReason!,
    });
  }
  return {
    sourceId: record.sourceEnglishContentId,
    identity: `${record.contentType}:${record.sourceEnglishContentId}:${record.locale}:${record.localizedSlug}`,
    postType: record.contentType,
    slug: record.localizedSlug,
    status: "draft",
    core,
    acf,
    meta,
  };
}

function nonEmpty(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export class ImportFailure extends Error {
  constructor(
    message: string,
    readonly exitCode: number,
  ) {
    super(message);
  }
}

export type PreflightResult = {
  payloadHash: string;
  mapped: MappedRecord[];
  sourceHashes: Record<string, string>;
};

export function preflight(
  payload: ImportPayloadRecord[],
  repository: CmsRepository,
  options: {
    locale?: SupportedImportLocale;
    batch?: "p0" | "p1" | "remaining-final";
    allowOwnerWaiver?: boolean;
  } = {},
): PreflightResult {
  const errors: string[] = [];
  const locale = options.locale ?? "zh";
  const batch = options.batch ?? "p0";
  const allowOwnerWaiver = options.allowOwnerWaiver ?? false;
  const policy = batchPolicy(locale, batch, allowOwnerWaiver);
  if (!policy) {
    throw new ImportFailure(
      "locale/batch/owner-waiver whitelist mismatch",
      exitCodes.preflight,
    );
  }
  if (!Array.isArray(payload) || payload.length !== policy.count) {
    errors.push(`payload must contain exactly ${policy.count} records`);
  }
  const ids = payload.map((record) => record.sourceEnglishContentId);
  if (new Set(ids).size !== ids.length) errors.push("duplicate source ID");
  const slugs = payload.map((record) => `${record.contentType}:${record.localizedSlug}`);
  if (new Set(slugs).size !== slugs.length) errors.push("duplicate localized slug");
  const sortedIds = [...ids].sort((a, b) => a - b);
  if (
    canonicalJson(sortedIds) !==
    canonicalJson([...policy.expected.keys()].sort((a, b) => a - b))
  ) {
    errors.push("source ID whitelist mismatch");
  }
  for (const record of payload) {
    const unknownKeys = Object.keys(record).filter((key) => !payloadKeys.has(key));
    if (unknownKeys.length) errors.push(`unmapped fields: ${unknownKeys.join(",")}`);
    const approval = policy.expected.get(record.sourceEnglishContentId);
    if (
      !approval ||
      approval.postType !== record.contentType ||
      approval.slug !== record.sourceEnglishSlug ||
      approval.slug !== record.localizedSlug
    ) {
      errors.push(`unapproved identity: ${record.sourceEnglishContentId}`);
    }
    if (
      policy.batch === "remaining-final" &&
      record.priority !== approval?.priority
    ) {
      errors.push(`priority whitelist mismatch: ${record.sourceEnglishContentId}`);
    }
    const expectedGroup = `shb2b-${record.contentType}-${record.sourceEnglishContentId}`;
    if (
      record.translationGroup !== undefined &&
      record.translationGroup !== expectedGroup
    ) {
      errors.push(`translation group mismatch: ${record.sourceEnglishContentId}`);
    }
    if (
      record.locale !== policy.locale ||
      record.batch !== policy.batch ||
      record.translationStatus !== "approved" ||
      record.reviewStatus !== "approved" ||
      record.productionReleaseReady !== true
    ) {
      errors.push(`release evidence mismatch: ${record.sourceEnglishContentId}`);
    }
    if (!policy.allowOwnerWaiver) {
      if (
        record.nativeReviewStatus !== "approved" ||
        record.nativeReviewer !== policy.reviewer ||
        record.nativeReviewDate !== policy.reviewDate ||
        record.ownerReviewWaiverStatus !== undefined
      ) {
        errors.push(
          `Native review evidence mismatch: ${record.sourceEnglishContentId}`,
        );
      }
    } else if (
      record.nativeReviewStatus !== "pending" ||
      record.nativeReviewer !== null ||
      record.nativeReviewDate !== null ||
      record.ownerReviewWaiverSchemaVersion !== ownerWaiverSchemaVersion ||
      record.ownerReviewWaiverStatus !== "approved" ||
      record.ownerReviewWaiverBy !== ownerWaiverBy ||
      record.ownerReviewWaiverDate !== ownerWaiverDate ||
      record.ownerReviewWaiverReason !== ownerWaiverReason ||
      record.ownerReviewWaiverScopeCount !== ownerWaiverScopeCount ||
      record.ownerReviewWaiverScopeSha256 !== ownerWaiverScopeSha256
    ) {
      errors.push(
        `Arabic owner-waiver evidence mismatch: ${record.sourceEnglishContentId}`,
      );
    }
    if (policy.locale === "ar") {
      const arabicText = [
        record.translatedTitle,
        record.translatedDescription,
        record.translatedSeoTitle,
        record.translatedMetaDescription,
        record.translatedStructuredContent?.h1,
        record.translatedStructuredContent?.introduction,
      ].join("\n");
      if (!/[\u0600-\u06ff]/u.test(arabicText)) {
        errors.push(`Arabic content is missing: ${record.sourceEnglishContentId}`);
      }
      if (/[پچژگک]/u.test(arabicText)) {
        errors.push(
          `Persian-specific content is not valid for Arabic: ${record.sourceEnglishContentId}`,
        );
      }
      if (
        record.sourceEnglishContentId === 48 &&
        !record.translatedTitle.includes(
          "وحدة RCU رئيسية للتحكم (RCU Host)",
        )
      ) {
        errors.push("RCU Host first-use terminology mismatch");
      }
    }
    if (
      record.deliveryMode !== "validated-import-payload" ||
      record.localizedContentId !== null ||
      !nonEmpty(record.importKey) ||
      !nonEmpty(record.translatedTitle) ||
      !nonEmpty(record.translatedDescription) ||
      !nonEmpty(record.translatedSeoTitle) ||
      !nonEmpty(record.translatedMetaDescription) ||
      !nonEmpty(record.nativeReviewNotes) ||
      !record.translatedSpecifications?.length ||
      !record.translatedStructuredContent?.sections?.length ||
      !record.translatedStructuredContent?.faqs?.length
    ) {
      errors.push(`incomplete mapped payload: ${record.sourceEnglishContentId}`);
    }
    const source = repository.getSource(
      record.contentType,
      record.sourceEnglishContentId,
    );
    if (!source) {
      errors.push(`missing source: ${record.sourceEnglishContentId}`);
    } else if (
      source.status !== "publish" ||
      source.language !== "en" ||
      source.slug !== record.sourceEnglishSlug ||
      source.postType !== record.contentType
    ) {
      errors.push(`invalid English source: ${record.sourceEnglishContentId}`);
    }
    for (const collision of repository.findBySlug(
      record.contentType,
      record.localizedSlug,
    )) {
      if ("language" in collision && collision.id === record.sourceEnglishContentId) {
        continue;
      }
      const relationSource = Number(
        "meta" in collision
          ? collision.meta._dualcorelink_translation_source_id
          : 0,
      );
      const relationLocale =
        "meta" in collision
          ? collision.meta._dualcorelink_translation_locale
          : "";
      if (
        relationSource !== record.sourceEnglishContentId ||
        !["zh", "ar"].includes(String(relationLocale))
      ) {
        errors.push(`localized slug conflict: ${record.localizedSlug}`);
      }
    }
  }
  if (errors.length) {
    throw new ImportFailure(errors.join("; "), exitCodes.preflight);
  }
  const payloadHash = sha256(payload);
  const mapped = payload.map((record) =>
    mapPayloadRecord(record, payloadHash, policy.allowOwnerWaiver),
  );
  const sourceHashes = Object.fromEntries(
    payload.map((record) => [
      String(record.sourceEnglishContentId),
      repository.sourceHash(record.contentType, record.sourceEnglishContentId),
    ]),
  );
  return { payloadHash, mapped, sourceHashes };
}

function flattened(value: unknown, prefix = ""): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return { [prefix]: value };
  }
  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>).flatMap(([key, child]) =>
      Object.entries(flattened(child, prefix ? `${prefix}.${key}` : key)),
    ),
  );
}

export function fieldDiff(
  before: unknown,
  after: unknown,
): Record<string, { before: unknown; after: unknown }> {
  const left = flattened(before);
  const right = flattened(after);
  return Object.fromEntries(
    [...new Set([...Object.keys(left), ...Object.keys(right)])]
      .sort()
      .filter((key) => canonicalJson(left[key]) !== canonicalJson(right[key]))
      .map((key) => [key, { before: left[key], after: right[key] }]),
  );
}

export class MemoryRunStore {
  readonly runs = new Map<string, RunRecord>();
  locked = false;

  withLock<T>(action: () => T): T {
    if (this.locked) throw new ImportFailure("lock unavailable", exitCodes.lock);
    this.locked = true;
    try {
      return action();
    } finally {
      this.locked = false;
    }
  }
}

export class ImportEngine {
  constructor(
    private readonly repository: CmsRepository,
    private readonly runs: MemoryRunStore,
  ) {}

  apply(
    payload: ImportPayloadRecord[],
    runId: string,
    options: {
      confirmRunId: string;
      allowUpdate?: boolean;
      locale?: SupportedImportLocale;
      batch?: "p0" | "p1" | "remaining-final";
      allowOwnerWaiver?: boolean;
    },
  ): RunRecord {
    if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]{2,63}$/.test(runId)) {
      throw new ImportFailure("invalid run ID", exitCodes.arguments);
    }
    if (options.confirmRunId !== runId) {
      throw new ImportFailure("run confirmation mismatch", exitCodes.safety);
    }
    return this.runs.withLock(() => {
      if (this.runs.runs.has(runId)) {
        throw new ImportFailure("run ID already exists", exitCodes.conflict);
      }
      const locale = options.locale ?? "zh";
      const batch = options.batch ?? "p0";
      const allowOwnerWaiver = options.allowOwnerWaiver ?? false;
      const checked = preflight(payload, this.repository, {
        locale,
        batch,
        allowOwnerWaiver,
      });
      const run: RunRecord = {
        runId,
        payloadHash: checked.payloadHash,
        request: structuredClone(payload),
        sourceHashes: checked.sourceHashes,
        preImages: {},
        operations: [],
        preflightPassed: true,
        applyCompleted: false,
        verifyPassed: false,
        published: false,
        rolledBack: false,
        locale,
        batch,
        allowOwnerWaiver,
      };
      this.runs.runs.set(runId, run);
      for (const mapped of checked.mapped) {
        const existing = this.repository.findLocalized(
          mapped.postType,
          mapped.sourceId,
          locale,
          mapped.slug,
        );
        if (!existing) {
          const created = this.repository.create(mapped);
          run.operations.push({
            sourceId: mapped.sourceId,
            localizedId: created.id,
            operation: "created",
            diff: fieldDiff({}, mapped),
          });
          continue;
        }
        const diff = fieldDiff(
          {
            core: existing.core,
            acf: existing.acf,
            meta: existing.meta,
            status: existing.status,
          },
          {
            core: mapped.core,
            acf: mapped.acf,
            meta: mapped.meta,
            status: mapped.status,
          },
        );
        if (Object.keys(diff).length === 0) {
          run.operations.push({
            sourceId: mapped.sourceId,
            localizedId: existing.id,
            operation: "unchanged",
            diff: {},
          });
        } else if (!options.allowUpdate) {
          throw new ImportFailure(
            `existing localized content differs: ${mapped.slug}`,
            exitCodes.conflict,
          );
        } else {
          run.preImages[String(existing.id)] = structuredClone(existing);
          const updated = this.repository.update(existing.id, mapped);
          run.operations.push({
            sourceId: mapped.sourceId,
            localizedId: updated.id,
            operation: "updated",
            diff,
          });
        }
      }
      run.applyCompleted = true;
      return run;
    });
  }

  verify(runId: string): RunRecord {
    const run = this.requireRun(runId);
    if (!run.applyCompleted) {
      throw new ImportFailure("apply is incomplete", exitCodes.verify);
    }
    if (sha256(run.request) !== run.payloadHash) {
      throw new ImportFailure("payload hash changed", exitCodes.verify);
    }
    const checked = preflight(run.request, this.repository, {
      locale: run.locale,
      batch: run.batch,
      allowOwnerWaiver: run.allowOwnerWaiver,
    });
    if (checked.payloadHash !== run.payloadHash) {
      throw new ImportFailure("payload drift", exitCodes.verify);
    }
    for (const [id, sourceHash] of Object.entries(run.sourceHashes)) {
      const record = run.request.find(
        (candidate) => candidate.sourceEnglishContentId === Number(id),
      );
      if (
        !record ||
        this.repository.sourceHash(record.contentType, Number(id)) !== sourceHash
      ) {
        throw new ImportFailure("English source drift", exitCodes.verify);
      }
    }
    const mappedBySource = new Map(
      checked.mapped.map((record) => [record.sourceId, record]),
    );
    for (const operation of run.operations) {
      const actual = this.repository.getLocalized(operation.localizedId);
      const mapped = mappedBySource.get(operation.sourceId);
      if (
        !actual ||
        !mapped ||
        Object.keys(
          fieldDiff(
            {
              core: actual.core,
              acf: actual.acf,
              meta: actual.meta,
              status: actual.status,
            },
            {
              core: mapped.core,
              acf: mapped.acf,
              meta: mapped.meta,
              status: mapped.status,
            },
          ),
        ).length
      ) {
        throw new ImportFailure("localized field drift", exitCodes.verify);
      }
    }
    const policy = batchPolicy(run.locale, run.batch, run.allowOwnerWaiver);
    if (
      !policy ||
      this.repository.listLocalized(run.locale, run.batch).length !== policy.count
    ) {
      throw new ImportFailure(
        "localized batch record count mismatch",
        exitCodes.verify,
      );
    }
    run.verifyPassed = true;
    return run;
  }

  publish(
    runId: string,
    confirmRunId: string,
    options: { allowOwnerWaiver?: boolean } = {},
  ): RunRecord {
    if (runId !== confirmRunId) {
      throw new ImportFailure("run confirmation mismatch", exitCodes.safety);
    }
    return this.runs.withLock(() => {
      const run = this.requireRun(runId);
      const policy = batchPolicy(run.locale, run.batch, run.allowOwnerWaiver);
      if (
        !policy ||
        !run.verifyPassed ||
        run.operations.length !== policy.count ||
        (run.allowOwnerWaiver && options.allowOwnerWaiver !== true)
      ) {
        throw new ImportFailure(
          "verified approved-batch run and explicit waiver flag required",
          exitCodes.publish,
        );
      }
      this.verify(runId);
      for (const operation of run.operations) {
        this.repository.setStatus(operation.localizedId, "publish");
      }
      run.published = true;
      return run;
    });
  }

  rollback(runId: string, confirmRunId: string): RunRecord {
    if (runId !== confirmRunId) {
      throw new ImportFailure("run confirmation mismatch", exitCodes.safety);
    }
    return this.runs.withLock(() => {
      const run = this.requireRun(runId);
      if (run.rolledBack) return run;
      for (const operation of run.operations) {
        if (operation.operation === "updated") {
          const preImage = run.preImages[String(operation.localizedId)];
          if (!preImage) {
            throw new ImportFailure("missing pre-image", exitCodes.rollback);
          }
          this.repository.restore(preImage);
        } else if (operation.operation === "created") {
          this.repository.setStatus(operation.localizedId, "draft");
        }
      }
      run.rolledBack = true;
      return run;
    });
  }

  private requireRun(runId: string): RunRecord {
    const run = this.runs.runs.get(runId);
    if (!run) throw new ImportFailure("unknown run ID", exitCodes.arguments);
    return run;
  }
}

export class InMemoryRepository implements CmsRepository {
  readonly sources = new Map<number, SourceRecord>();
  readonly localized = new Map<number, LocalizedRecord>();
  private nextId = 1000;

  getSource(postType: ContentType, id: number): SourceRecord | undefined {
    const source = this.sources.get(id);
    return source?.postType === postType ? structuredClone(source) : undefined;
  }

  sourceHash(postType: ContentType, id: number): string {
    const source = this.getSource(postType, id);
    if (!source) return "";
    return sha256(source);
  }

  findBySlug(
    postType: ContentType,
    slug: string,
  ): Array<SourceRecord | LocalizedRecord> {
    return [
      ...[...this.sources.values()].filter(
        (record) => record.postType === postType && record.slug === slug,
      ),
      ...[...this.localized.values()].filter(
        (record) => record.postType === postType && record.slug === slug,
      ),
    ].map((record) => structuredClone(record));
  }

  findLocalized(
    postType: ContentType,
    sourceId: number,
    locale: string,
    slug: string,
  ): LocalizedRecord | undefined {
    const match = [...this.localized.values()].find(
      (record) =>
        record.postType === postType &&
        record.slug === slug &&
        Number(record.meta._dualcorelink_translation_source_id) === sourceId &&
        record.meta._dualcorelink_translation_locale === locale,
    );
    return match ? structuredClone(match) : undefined;
  }

  listLocalized(locale: string, batch: string): LocalizedRecord[] {
    return [...this.localized.values()]
      .filter(
        (record) =>
          record.meta._dualcorelink_translation_locale === locale &&
          record.meta._dualcorelink_translation_batch === batch,
      )
      .map((record) => structuredClone(record));
  }

  create(record: MappedRecord): LocalizedRecord {
    const created: LocalizedRecord = {
      id: this.nextId++,
      postType: record.postType,
      slug: record.slug,
      status: "draft",
      core: structuredClone(record.core),
      acf: structuredClone(record.acf),
      meta: structuredClone(record.meta),
    };
    this.localized.set(created.id, created);
    return structuredClone(created);
  }

  update(id: number, record: MappedRecord): LocalizedRecord {
    const current = this.localized.get(id);
    if (!current) throw new Error("localized record not found");
    const updated: LocalizedRecord = {
      id,
      postType: record.postType,
      slug: record.slug,
      status: record.status,
      core: structuredClone(record.core),
      acf: structuredClone(record.acf),
      meta: structuredClone(record.meta),
    };
    this.localized.set(id, updated);
    return structuredClone(updated);
  }

  setStatus(id: number, status: string): void {
    const current = this.localized.get(id);
    if (!current) throw new Error("localized record not found");
    current.status = status;
    current.core.post_status = status;
  }

  restore(record: LocalizedRecord): void {
    this.localized.set(record.id, structuredClone(record));
  }

  getLocalized(id: number): LocalizedRecord | undefined {
    const record = this.localized.get(id);
    return record ? structuredClone(record) : undefined;
  }
}

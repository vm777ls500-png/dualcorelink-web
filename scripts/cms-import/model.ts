import { createHash } from "node:crypto";

export const approvedSourceIds = [48, 47, 6, 222, 142, 140, 138] as const;
export const approvedLocale = "zh";
export const approvedBatch = "p0";
export const approvedReviewer = "Allan";
export const approvedReviewDate = "2026-07-29";
export const translationSchemaVersion = 1;

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
  translatedTitle: string;
  translatedDescription: string;
  translatedSpecifications: Array<{ label: string; value: string }>;
  translatedSeoTitle: string;
  translatedMetaDescription: string;
  translatedStructuredContent: StructuredContent;
  translationStatus: "approved";
  reviewStatus: "approved";
  nativeReviewStatus: "approved";
  nativeReviewer: string;
  nativeReviewDate: string;
  nativeReviewNotes: string;
  productionReleaseReady: boolean;
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

function safeHref(value: string): string {
  if (!/^\/zh\/[a-z0-9/_-]*(?:#[a-z0-9_-]+)?$/i.test(value)) {
    throw new Error(`unsafe localized href: ${value}`);
  }
  return html(value);
}

export function renderStructuredContent(record: ImportPayloadRecord): string {
  const content = record.translatedStructuredContent;
  const output = [
    `<p class="content-eyebrow">${html(content.eyebrow)}</p>`,
    `<h1>${html(content.h1)}</h1>`,
    `<p>${html(content.introduction)}</p>`,
    `<section><h2>规格与采购信息</h2><dl>`,
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
  output.push(`<section><h2>常见问题</h2>`);
  for (const faq of content.faqs) {
    output.push(`<h3>${html(faq.question)}</h3>`, `<p>${html(faq.answer)}</p>`);
  }
  output.push("</section>", `<section><h2>相关页面</h2><ul>`);
  for (const link of content.relatedLinks) {
    output.push(
      `<li><a href="${safeHref(link.href)}">${html(link.label)}</a><p>${html(link.description)}</p></li>`,
    );
  }
  output.push(
    "</ul></section>",
    `<section class="content-cta"><h2>${html(content.cta.heading)}</h2>`,
    `<p>${html(content.cta.description)}</p>`,
    `<p><a href="${safeHref(content.cta.href)}">${html(content.cta.label)}</a></p>`,
  );
  if (content.cta.secondaryLabel && content.cta.secondaryHref) {
    output.push(
      `<p><a href="${safeHref(content.cta.secondaryHref)}">${html(content.cta.secondaryLabel)}</a></p>`,
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
  const meta = {
    _dualcorelink_translation_schema_version: translationSchemaVersion,
    _dualcorelink_translation_locale: approvedLocale,
    _dualcorelink_translation_source_id: record.sourceEnglishContentId,
    _dualcorelink_translation_group: group,
    _dualcorelink_translation_batch: approvedBatch,
    _dualcorelink_translation_payload_hash: payloadHash,
    _dualcorelink_translation_reviewer: approvedReviewer,
    _dualcorelink_translation_review_date: approvedReviewDate,
  };
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
): PreflightResult {
  const errors: string[] = [];
  if (!Array.isArray(payload) || payload.length !== 7) {
    errors.push("payload must contain exactly seven records");
  }
  const ids = payload.map((record) => record.sourceEnglishContentId);
  if (new Set(ids).size !== ids.length) errors.push("duplicate source ID");
  const slugs = payload.map((record) => `${record.contentType}:${record.localizedSlug}`);
  if (new Set(slugs).size !== slugs.length) errors.push("duplicate localized slug");
  const sortedIds = [...ids].sort((a, b) => a - b);
  if (
    canonicalJson(sortedIds) !==
    canonicalJson([...approvedSourceIds].sort((a, b) => a - b))
  ) {
    errors.push("source ID whitelist mismatch");
  }
  for (const record of payload) {
    const unknownKeys = Object.keys(record).filter((key) => !payloadKeys.has(key));
    if (unknownKeys.length) errors.push(`unmapped fields: ${unknownKeys.join(",")}`);
    const approval = expected.get(record.sourceEnglishContentId);
    if (
      !approval ||
      approval.postType !== record.contentType ||
      approval.slug !== record.sourceEnglishSlug ||
      approval.slug !== record.localizedSlug
    ) {
      errors.push(`unapproved identity: ${record.sourceEnglishContentId}`);
    }
    if (
      record.locale !== approvedLocale ||
      record.batch !== approvedBatch ||
      record.nativeReviewer !== approvedReviewer ||
      record.nativeReviewDate !== approvedReviewDate ||
      record.translationStatus !== "approved" ||
      record.reviewStatus !== "approved" ||
      record.nativeReviewStatus !== "approved" ||
      record.productionReleaseReady !== true
    ) {
      errors.push(`release evidence mismatch: ${record.sourceEnglishContentId}`);
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
        relationLocale !== approvedLocale
      ) {
        errors.push(`localized slug conflict: ${record.localizedSlug}`);
      }
    }
  }
  if (errors.length) {
    throw new ImportFailure(errors.join("; "), exitCodes.preflight);
  }
  const payloadHash = sha256(payload);
  const mapped = payload.map((record) => mapPayloadRecord(record, payloadHash));
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
    options: { confirmRunId: string; allowUpdate?: boolean },
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
      const checked = preflight(payload, this.repository);
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
      };
      this.runs.runs.set(runId, run);
      for (const mapped of checked.mapped) {
        const existing = this.repository.findLocalized(
          mapped.postType,
          mapped.sourceId,
          approvedLocale,
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
    const checked = preflight(run.request, this.repository);
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
    if (this.repository.listLocalized(approvedLocale, approvedBatch).length !== 7) {
      throw new ImportFailure("localized batch is not exactly seven", exitCodes.verify);
    }
    run.verifyPassed = true;
    return run;
  }

  publish(runId: string, confirmRunId: string): RunRecord {
    if (runId !== confirmRunId) {
      throw new ImportFailure("run confirmation mismatch", exitCodes.safety);
    }
    return this.runs.withLock(() => {
      const run = this.requireRun(runId);
      if (!run.verifyPassed || run.operations.length !== 7) {
        throw new ImportFailure("verified seven-record run required", exitCodes.publish);
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

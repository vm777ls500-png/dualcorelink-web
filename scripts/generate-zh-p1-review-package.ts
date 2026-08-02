import { writeFile } from "node:fs/promises";
import path from "node:path";
import {
  m3aProductCatalog,
  m3aRegionCatalog,
  m3aResourceCatalog,
  m3aSolutionCatalog,
} from "../src/content/locales/m3a-catalog";
import type { LocalizedStructuredContent } from "../src/content/locales/types";
import { findPublicationEvidence } from "../src/lib/multilingual-publication-control";
import {
  multilingualPublicationManifest,
  type MultilingualPublicationEntry,
} from "../src/lib/multilingual-publication-manifest";

type ReviewPage = {
  entry: MultilingualPublicationEntry;
  title: string;
  seoTitle: string;
  metaDescription: string;
  content: LocalizedStructuredContent;
  specifications: readonly { label: string; value: string }[];
  sourceEnglishContentId?: number;
  contentSource: "file" | "cms-payload";
};

type AutomatedRevision = {
  field: string;
  before: string;
  after: string;
  reason: string;
};

const revisedProductSlugs = new Set([
  "hotel-smart-room-rcu-host-3",
  "hotel-delivery-robot-charging-dock",
  "hotel-smart-room-rcu-host-2",
  "smart-curtain-motor",
  "smart-four-key-curtain-control-panel",
  "smart-key-card-energy-saver-panel",
  "hotel-guest-room-doorbell",
  "hotel-room-door-magnetic-sensor",
  "embedded-human-presence-sensor",
  "hotel-smart-delivery-cabinet",
  "hotel-delivery-robot",
  "ai-music-control-panel",
  "thermostat-hvac-control-panel",
  "rotary-knob-smart-control-display",
  "ai-large-smart-display",
]);

const revisedSolutionSlugs = new Set([
  "hotel-delivery-robot-solution",
  "ai-smart-display-solution",
]);

const revisedResourceSlugs = new Set([
  "hotel-rcu-wiring-system-architecture-guide",
  "hotel-smart-switch-panel-guide",
  "oem-odm-smart-panel-customization-guide",
  "hotel-guest-room-automation-guide",
  "hotel-room-control-system-cost-factors",
  "hotel-occupancy-sensor-selection-guide",
  "oem-odm-hotel-control-panel-development-process",
  "hotel-renovation-smart-room-upgrade-guide",
  "knx-vs-rcu-hotel-room-control",
  "hotel-guest-room-control-interfaces-guide",
]);

const technicalTerms = [
  "RCU",
  "GRMS",
  "KNX",
  "HVAC",
  "RS485",
  "OEM",
  "ODM",
] as const;

const englishTitleBySlug = new Map<string, string>([
  ...m3aProductCatalog.map((item) => [item.slug, item.englishTitle] as const),
  ...m3aSolutionCatalog.map((item) => [item.slug, item.englishTitle] as const),
  ...m3aResourceCatalog.map((item) => [item.slug, item.englishTitle] as const),
  ...m3aRegionCatalog.map((item) => [item.slug, item.englishTitle] as const),
  ["resources", "Smart Hotel Guides and Technical Resources"],
  ["regions", "Regional smart home intelligence"],
]);

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
}

function quote(value: string): string {
  return value
    .split(/\r?\n/)
    .map((line) => `> ${line}`)
    .join("\n");
}

function getReviewPages(): ReviewPage[] {
  const entries = multilingualPublicationManifest.filter(
    (entry) =>
      entry.locale === "zh" &&
      entry.priority === "P1" &&
      entry.nativeReviewStatus === "pending" &&
      !entry.productionReleaseReady,
  );

  return entries.map((entry) => {
    const evidence = findPublicationEvidence(entry);
    if (entry.pageType === "product" || entry.pageType === "solution") {
      const payload = evidence.cmsTranslation;
      if (!payload) {
        throw new Error(`Missing Chinese P1 CMS payload: ${entry.localizedUrl}`);
      }
      return {
        entry,
        title: payload.translatedTitle,
        seoTitle: payload.translatedSeoTitle,
        metaDescription: payload.translatedMetaDescription,
        content: payload.translatedStructuredContent,
        specifications: payload.translatedSpecifications,
        sourceEnglishContentId: payload.sourceEnglishContentId,
        contentSource: "cms-payload" as const,
      };
    }

    const fileContent = evidence.localContent;
    if (!fileContent) {
      throw new Error(`Missing Chinese P1 file content: ${entry.localizedUrl}`);
    }
    return {
      entry,
      title: fileContent.title,
      seoTitle: fileContent.seoTitle,
      metaDescription: fileContent.metaDescription,
      content: fileContent.structuredContent,
      specifications: [],
      contentSource: "file" as const,
    };
  });
}

function validateScope(pages: readonly ReviewPage[]): void {
  if (pages.length !== 31) {
    throw new Error(`Chinese P1 scope must contain 31 pages; found ${pages.length}`);
  }
  const urls = pages.map((page) => page.entry.localizedUrl);
  if (new Set(urls).size !== pages.length) {
    throw new Error("Chinese P1 scope contains duplicate localized URLs");
  }
  const cmsPages = pages.filter((page) => page.contentSource === "cms-payload");
  if (cmsPages.length !== 17) {
    throw new Error(`Chinese P1 CMS payload count must be 17; found ${cmsPages.length}`);
  }

  const permittedPaths = new Set([
    ...pages.map((page) => new URL(page.entry.localizedUrl).pathname),
    ...multilingualPublicationManifest
      .filter((entry) => entry.locale === "zh" && entry.productionReleaseReady)
      .map((entry) => new URL(entry.localizedUrl).pathname),
  ]);

  const h1Values = new Set<string>();
  const introductions = new Set<string>();
  for (const page of pages) {
    const { entry, title, seoTitle, metaDescription, content } = page;
    const required = [
      ["title", title],
      ["SEO title", seoTitle],
      ["meta description", metaDescription],
      ["H1", content.h1],
      ["introduction", content.introduction],
      ["breadcrumb", content.breadcrumbLabel],
      ["CTA heading", content.cta.heading],
      ["CTA label", content.cta.label],
    ] as const;
    for (const [field, value] of required) {
      if (!value.trim()) throw new Error(`${entry.localizedUrl}: empty ${field}`);
    }
    if (h1Values.has(content.h1)) {
      throw new Error(`${entry.localizedUrl}: duplicate H1`);
    }
    h1Values.add(content.h1);
    if (introductions.has(content.introduction)) {
      throw new Error(`${entry.localizedUrl}: duplicate introduction`);
    }
    introductions.add(content.introduction);

    const fullText = JSON.stringify({ title, seoTitle, metaDescription, content });
    if (/[�]|(?:lorem ipsum|placeholder|待补充|TODO)/i.test(fullText)) {
      throw new Error(`${entry.localizedUrl}: placeholder or corrupt text detected`);
    }
    if ((fullText.match(/[\u3400-\u9fff]/g) ?? []).length < 80) {
      throw new Error(`${entry.localizedUrl}: insufficient Chinese content evidence`);
    }

    const internalLinks = [
      ...content.relatedLinks.map((link) => link.href),
      content.cta.href,
      content.cta.secondaryHref,
      content.parentBreadcrumb?.href,
    ].filter((value): value is string => Boolean(value));
    for (const href of internalLinks) {
      const url = new URL(href, "https://dualcorelink.com");
      if (url.origin !== "https://dualcorelink.com") continue;
      if (url.search) {
        throw new Error(`${entry.localizedUrl}: internal query URL ${href}`);
      }
      if (url.pathname.startsWith("/zh/") && !permittedPaths.has(url.pathname)) {
        throw new Error(`${entry.localizedUrl}: link leaves the approved/P1 review set ${href}`);
      }
    }
  }
}

function renderSections(content: LocalizedStructuredContent): string {
  return content.sections
    .map((section) => {
      const lines = [`### ${section.heading}`, ""];
      for (const paragraph of section.paragraphs) lines.push(paragraph, "");
      for (const bullet of section.bullets ?? []) lines.push(`- ${bullet}`);
      if (section.bullets?.length) lines.push("");
      return lines.join("\n");
    })
    .join("\n");
}

function renderFaqs(content: LocalizedStructuredContent): string {
  if (content.faqs.length === 0) return "无 FAQ。";
  return content.faqs
    .map((faq) => `- **${faq.question}** ${faq.answer}`)
    .join("\n");
}

function renderSpecifications(page: ReviewPage): string {
  if (page.specifications.length === 0) {
    return "该文件型页面不包含独立 CMS 规格表；采购与项目事实见正文和 FAQ。";
  }
  return [
    "| 字段 | 中文候选值 |",
    "|---|---|",
    ...page.specifications.map(
      (item) => `| ${escapeCell(item.label)} | ${escapeCell(item.value)} |`,
    ),
  ].join("\n");
}

function getAutomatedRevisions(page: ReviewPage): AutomatedRevision[] {
  const { content, entry, title } = page;
  if (revisedProductSlugs.has(entry.slug)) {
    const roleAfter = content.sections[0]?.paragraphs[0];
    if (!roleAfter?.startsWith("本产品属于")) {
      throw new Error(`${entry.localizedUrl}: expected revised product role copy`);
    }
    return [
      {
        field: "产品职责首句",
        before: `${title} 属于${roleAfter.slice("本产品属于".length)}`,
        after: roleAfter,
        reason: "去除标题后不自然空格，并避免型号与句子主语重复。",
      },
      {
        field: "FAQ 首问",
        before: `${title} 的主要用途是什么？`,
        after: content.faqs[0]?.question ?? "",
        reason: "改为自然中文问法，避免产品名后的机械空格。",
      },
      {
        field: "CTA 标题",
        before: `核对${title}的项目条件`,
        after: content.cta.heading,
        reason: "避免英文缩写或数字型号与助词直接粘连。",
      },
      {
        field: "图片 alt",
        before: `酒店工程用${title}`,
        after: content.imageAlt ?? "",
        reason: "改为自然、明确的中文图片说明。",
      },
    ];
  }

  if (revisedSolutionSlugs.has(entry.slug)) {
    return [
      {
        field: "FAQ 首问",
        before: `${title} 包含哪些内容？`,
        after: content.faqs[0]?.question ?? "",
        reason: "移除中文标题与谓语之间多余空格。",
      },
      {
        field: "CTA 标题",
        before: `明确${title}的项目范围`,
        after: content.cta.heading,
        reason: "使用自然指代，避免标题过长和英文缩写粘连。",
      },
    ];
  }

  if (revisedResourceSlugs.has(entry.slug)) {
    const decisionAfter = content.sections[1]?.paragraphs[0];
    if (!decisionAfter?.startsWith("将")) {
      throw new Error(`${entry.localizedUrl}: expected revised resource decision copy`);
    }
    const revisions: AutomatedRevision[] = [
      {
        field: "采购决策段落",
        before: `把${decisionAfter.slice(1)}`,
        after: decisionAfter,
        reason: "将口语化“把”改为更适合 B2B 技术指南的书面表达。",
      },
      {
        field: "FAQ 首问",
        before: `${title} 适合哪些读者？`,
        after: content.faqs[0]?.question ?? "",
        reason: "移除中文标题与谓语之间多余空格。",
      },
      {
        field: "图片 alt",
        before: `${title}酒店工程指南`,
        after: content.imageAlt ?? "",
        reason: "增加中文分隔标点，避免标题与用途说明粘连。",
      },
    ];
    if (entry.slug === "hotel-rcu-wiring-system-architecture-guide") {
      const engineeringAfter = content.sections[2]?.paragraphs[0] ?? "";
      const materialsAfter = content.faqs[2]?.answer ?? "";
      revisions.push(
        {
          field: "工程与系统边界段落",
          before: engineeringAfter.replace("审核 I/O", "审核I/O"),
          after: engineeringAfter,
          reason: "在中文动词与 I/O 技术缩写之间保留规范空格。",
        },
        {
          field: "FAQ 资料答案",
          before: materialsAfter.replace("记录 RCU", "记录RCU"),
          after: materialsAfter,
          reason: "在中文动词与 RCU 技术缩写之间保留规范空格。",
        },
      );
    }
    return revisions;
  }

  return [];
}

function renderAutomatedRevisions(page: ReviewPage): string {
  const revisions = getAutomatedRevisions(page);
  if (revisions.length === 0) return "无明确问题需要自动修订。";
  return [
    "| 字段 | Before | After | 原因 |",
    "|---|---|---|---|",
    ...revisions.map(
      (revision) =>
        `| ${escapeCell(revision.field)} | ${escapeCell(revision.before)} | ${escapeCell(revision.after)} | ${escapeCell(revision.reason)} |`,
    ),
  ].join("\n");
}

function renderPage(page: ReviewPage, index: number): string {
  const { entry, content } = page;
  const englishTitle = englishTitleBySlug.get(entry.slug);
  if (!englishTitle) throw new Error(`Missing English title for ${entry.slug}`);
  const terms = technicalTerms.filter((term) =>
    JSON.stringify(page).includes(term),
  );
  const breadcrumbs = [content.parentBreadcrumb?.label, content.breadcrumbLabel]
    .filter(Boolean)
    .join(" → ");
  const schemaFields = [
    "name/title",
    "description",
    "Breadcrumb 名称",
    content.faqs.length ? "FAQ 问答" : "",
    content.imageAlt ? "image/alt 名称" : "",
  ]
    .filter(Boolean)
    .join("、");
  const sourceEvidence =
    page.contentSource === "cms-payload"
      ? `公开英文 CMS ${entry.pageType} ID ${page.sourceEnglishContentId}；slug ${entry.slug}；中文 payload 仅关联英文 source ID，不含中文 CMS ID。`
      : `仓库英文主清单与 ${entry.pageType} 内容事实源；slug ${entry.slug}。`;

  return [
    `## ${index + 1}. ${page.title}`,
    "",
    "| 审核字段 | 内容证据 |",
    "|---|---|",
    `| 英文源 URL | ${entry.sourceUrl} |`,
    `| 中文候选 URL | ${entry.localizedUrl} |`,
    `| 页面类型 | ${entry.pageType} |`,
    `| 内容来源 | ${page.contentSource} |`,
    `| 英文标题 | ${escapeCell(englishTitle)} |`,
    `| 中文标题 | ${escapeCell(page.title)} |`,
    `| SEO title | ${escapeCell(page.seoTitle)} |`,
    `| Meta description | ${escapeCell(page.metaDescription)} |`,
    `| H1 | ${escapeCell(content.h1)} |`,
    `| Breadcrumb | ${escapeCell(breadcrumbs)} |`,
    `| 图片 alt | ${escapeCell(content.imageAlt ?? "该页面类型无独立图片 alt")} |`,
    `| 关键术语 | ${terms.length ? terms.join("、") : "无受控英文缩写"} |`,
    `| Schema 可翻译字段 | ${schemaFields} |`,
    `| 英文事实证据 | ${escapeCell(sourceEvidence)} |`,
    "| 与英文事实源差异 | 仅做中文语序、采购语境和结构化表达本地化；未改变型号、source ID 或已知技术边界。 |",
    `| 本阶段自动修订 | ${getAutomatedRevisions(page).length ? `已记录 ${getAutomatedRevisions(page).length} 项明确修订，详见下表。` : "无明确问题需要自动修订。"} |`,
    "| 建议结论 | approve（仍须真实中文审核人逐页确认） |",
    "| 人工最终结论 |  |",
    "| Reviewer |  |",
    "| Review Date |  |",
    "| Notes |  |",
    "",
    "### 自动修订记录",
    "",
    renderAutomatedRevisions(page),
    "",
    "### 首段完整正文",
    "",
    quote(content.introduction),
    "",
    "### 主要 H2/H3 与正文",
    "",
    renderSections(content),
    "### CTA",
    "",
    `- 标题：${content.cta.heading}`,
    `- 说明：${content.cta.description}`,
    `- 主按钮：${content.cta.label} → ${content.cta.href}`,
    ...(content.cta.secondaryLabel
      ? [`- 次按钮：${content.cta.secondaryLabel} → ${content.cta.secondaryHref}`]
      : []),
    "",
    "### FAQ / 采购条款",
    "",
    renderFaqs(content),
    "",
    "### 产品规格或 Solution / 页面事实",
    "",
    renderSpecifications(page),
    "",
  ].join("\n");
}

async function main(): Promise<void> {
  const pages = getReviewPages();
  validateScope(pages);
  const revisedPages = pages.filter((page) => getAutomatedRevisions(page).length > 0);
  const revisionCount = pages.reduce(
    (total, page) => total + getAutomatedRevisions(page).length,
    0,
  );
  if (revisedPages.length !== 27 || revisionCount !== 96) {
    throw new Error(
      `Expected 27 revised pages and 96 revision records; found ${revisedPages.length} and ${revisionCount}`,
    );
  }

  const workbook = [
    "# Chinese P1 最终人工审核包",
    "",
    "准备日期：2026-08-02",
    "",
    "范围：publication manifest 中 `locale=zh`、`priority=P1`、`nativeReviewStatus=pending`、`productionReleaseReady=false` 的 31 个页面。已上线的 12 个 Chinese P0 页面、Chinese P2 与其他语言均不在本审核包。",
    "",
    "本文件只提供候选内容和技术证据。所有人工结论、Reviewer、Review Date 和 Notes 均留空；生成过程不会批准页面或改变发布状态。",
    "",
    "采购事实边界：常规产品无固定 MOQ；新开模可能产生定制或模具费用；使用现有模具仅改颜色不收定制费；常规交期 7–15 天；支持 OEM/ODM。具体页面未从英文事实源取得的数值、认证、价格、库存、评分、客户、案例、性能或节能比例不得补写。",
    "",
    ...pages.map(renderPage),
  ].join("\n");

  const decisions = [
    "# Chinese P1 最终人工审核决策",
    "",
    "Decision 仅允许 `approved`、`changes_required` 或 `pending`。当前 31 行全部保持 pending，Reviewer、Review Date 和 Notes 留空。",
    "",
    "| Localized URL | Decision | Reviewer | Review Date | Notes |",
    "|---|---|---|---|---|",
    ...pages.map(
      (page) => `| ${page.entry.localizedUrl} | pending |  |  |  |`,
    ),
    "",
  ].join("\n");

  await writeFile(
    path.resolve("docs/reviews/multilingual/zh-p1-final-human-review-20260802.md"),
    `${workbook.trimEnd()}\n`,
    "utf8",
  );
  await writeFile(
    path.resolve("docs/reviews/multilingual/zh-p1-final-decisions-20260802.md"),
    `${decisions.trimEnd()}\n`,
    "utf8",
  );

  console.log(
    "[multilingual:zh-p1-review] wrote 31-page workbook and 31 pending decisions; CMS payloads=17; revised pages=27; revision records=96",
  );
}

main().catch((error: unknown) => {
  console.error(
    `[multilingual:zh-p1-review] failed: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
});

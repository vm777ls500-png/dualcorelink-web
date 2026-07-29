import { access, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  m3aProductCatalog,
  m3aRegionCatalog,
  m3aResourceCatalog,
  m3aSolutionCatalog,
} from "../src/content/locales/m3a-catalog";
import { zhM3aCmsImportPayload } from "../src/content/locales/cms-import/m3a-generated";
import { localizedPublicationPages } from "../src/lib/localized-publication";
import { sixLanguageFullCoveragePaths } from "../src/lib/multilingual-publication-manifest";

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

const generatedProductPaths = new Set(
  zhM3aCmsImportPayload
    .filter((payload) => payload.contentType === "product")
    .map((payload) => `products/${payload.sourceEnglishSlug}`),
);

const technicalTerms = [
  "OEM",
  "ODM",
  "RCU",
  "GRMS",
  "KNX",
  "HVAC",
  "RS485",
] as const;

function escapeCell(value: string): string {
  return value.replace(/\|/g, "\\|").replace(/\r?\n/g, "<br>");
}

function currentIssue(pathname: string): string {
  if (generatedProductPaths.has(pathname)) {
    const titleIssue = pathname.endsWith(
      "/brushed-aluminum-86-base-doorbell-panel",
    )
      ? "；并修正“86 型底盒”的规格表达"
      : "";
    return `已自动修正中文句间多余空格和 CTA 标题两侧空格${titleIssue}；仍待母语审核自然度与行业用语。`;
  }
  if (pathname.startsWith("resources/")) {
    return "已自动修正摘要与首段的中文句间多余空格；仍待母语审核信息表达与检索摘要质量。";
  }
  if (pathname.startsWith("regions/")) {
    return "已自动修正摘要与首段的中文句间多余空格；仍待母语审核区域采购语境。";
  }
  return "自动规则未发现可明确修订的问题；尚未完成人工母语审核。";
}

function suggestedRevision(pathname: string): string {
  if (
    generatedProductPaths.has(pathname) ||
    pathname.startsWith("resources/") ||
    pathname.startsWith("regions/")
  ) {
    return "自动修订已写入内容事实源；请人工确认语气、术语、事实忠实度及是否需要进一步修改。";
  }
  return "不做自动改写；请人工判断是否自然、准确并适合中国酒店工程 B2B 读者。";
}

function pageBlock(
  page: (typeof localizedPublicationPages)[number],
  index: number,
): string {
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
          .map((item) => `${item.label}：${item.value}`)
          .join(" / ")
      : page.content.sections
          .filter((section) =>
            /采购|询价|样品|交付|选型|项目|定制/.test(section.heading),
          )
          .flatMap((section) => [
            section.heading,
            ...section.paragraphs,
            ...(section.bullets ?? []),
          ])
          .join(" / ");
  const pageText = JSON.stringify(page);
  const terms = technicalTerms.filter((term) => pageText.includes(term));

  return [
    `## ${index + 1}. ${page.localizedUrl}`,
    "",
    "| 审核字段 | 内容证据 |",
    "|---|---|",
    `| 英文源 URL | ${page.sourceUrl} |`,
    `| 中文 URL | ${page.localizedUrl} |`,
    `| 页面类型 | ${page.pageType} |`,
    `| 英文标题 | ${escapeCell(englishTitle)} |`,
    `| 中文标题 | ${escapeCell(page.title)} |`,
    `| SEO title | ${escapeCell(page.seoTitle)} |`,
    `| meta description | ${escapeCell(page.metaDescription)} |`,
    `| H1 | ${escapeCell(page.content.h1)} |`,
    `| 主要 H2/H3 | ${escapeCell(page.content.sections.map((section) => section.heading).join(" / "))} |`,
    `| CTA | ${escapeCell(cta)} |`,
    `| 图片 alt | ${escapeCell(page.content.imageAlt ?? "该页面类型无独立图片 alt")} |`,
    `| 面包屑 | ${escapeCell(breadcrumb)} |`,
    `| FAQ | ${escapeCell(faq)} |`,
    `| 产品规格或采购信息 | ${escapeCell(procurement)} |`,
    `| schema 可翻译字段 | name/title、description、Breadcrumb 名称、FAQ 问答${page.content.imageAlt ? "、image/alt 名称" : ""} |`,
    `| 关键术语 | ${terms.length > 0 ? terms.join("、") : "本页无需受控英文缩写"} |`,
    `| 当前问题 | ${escapeCell(currentIssue(page.path))} |`,
    `| 建议修订 | ${escapeCell(suggestedRevision(page.path))} |`,
    "| 人工审核结论 |  |",
    "| 审核人 |  |",
    "| 审核日期 |  |",
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

async function main() {
  const order = sixLanguageFullCoveragePaths.zh;
  const pages = localizedPublicationPages
    .filter((page) => page.locale === "zh")
    .sort(
      (left, right) =>
        order.indexOf(left.path) - order.indexOf(right.path),
    );
  if (pages.length !== 69) {
    throw new Error(`Chinese workbook requires 69 pages; found ${pages.length}`);
  }

  const workbookPath = path.resolve(
    "docs/reviews/multilingual/zh-native-review-workbook-20260729.md",
  );
  const decisionsPath = path.resolve(
    "docs/reviews/multilingual/zh-native-review-decisions-20260729.md",
  );
  const workbook = [
    "# 中文母语审核工作表",
    "",
    "准备日期：2026-07-29",
    "",
    "范围：69/69 个中文本地化候选页面。本文档用于真实中文母语审核，不代表任何页面已获人工批准。",
    "",
    "自动复核已完成 69 页：52 页进行了可明确判断的中文排版或术语修订；所有 69 页仍须由真实审核人填写结论、姓名和日期。",
    "",
    "自动问题统计：中文句间空格 136 处、产品 CTA 空格 32 处、产品标题术语 1 处、全站术语表 1 处；未发现价格、库存、评分、认证、客户或案例等新增事实。",
    "",
    "人工审核必须核对事实源、自然简体中文、酒店工程采购术语、SEO 摘要可读性，以及标题、CTA、面包屑、图片 alt、FAQ 与 schema 字段。",
    "",
    ...pages.map(pageBlock),
  ].join("\n");
  await writeFile(workbookPath, `${workbook}\n`, "utf8");

  if (await fileExists(decisionsPath)) {
    throw new Error(
      "Decisions file already exists; refusing to overwrite human review evidence.",
    );
  }
  const decisions = [
    "# 中文母语审核决策",
    "",
    "填写规则：`Decision` 仅允许 `approved`、`changes_required`、`pending`。`approved` 或 `changes_required` 必须填写真实审核人、有效 ISO 日期（YYYY-MM-DD）和 Notes；`pending` 不得填写审核人或日期。",
    "",
    "| Localized URL | Decision | Reviewer | Review Date | Notes |",
    "|---|---|---|---|---|",
    ...pages.map(
      (page) => `| ${page.localizedUrl} | pending |  |  |  |`,
    ),
    "",
  ].join("\n");
  await writeFile(decisionsPath, decisions, "utf8");
  console.log(
    "[multilingual:zh-review-workbook] wrote 69-page workbook and 69 pending decisions",
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[multilingual:zh-review-workbook] failed: ${message}`);
  process.exitCode = 1;
});

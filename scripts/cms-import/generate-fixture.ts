import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { zhP0ReviewedCmsImportPayload } from "../../src/content/locales/cms-import";
import { zhP0ReleaseUrls } from "../../src/lib/multilingual-release-batches";
import { fixturePath } from "./fixture";
import { canonicalJson, sha256 } from "./model";

async function main(): Promise<void> {
  const approved = new Set(zhP0ReleaseUrls);
  const payload = zhP0ReviewedCmsImportPayload.map((record) => {
    const localizedUrl = `https://dualcorelink.com/zh/${record.contentType}s/${record.sourceEnglishSlug}/`;
    if (!approved.has(localizedUrl as (typeof zhP0ReleaseUrls)[number])) {
      throw new Error(`CMS payload URL is not in Chinese P0: ${localizedUrl}`);
    }
    return {
      ...record,
      localizedSlug: record.sourceEnglishSlug,
      batch: "p0",
      productionReleaseReady: true,
    };
  });

  await mkdir(path.dirname(fixturePath), { recursive: true });
  await writeFile(fixturePath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
  console.log(
    JSON.stringify({
      file: fixturePath,
      records: payload.length,
      canonicalSha256: sha256(payload),
      canonicalBytes: Buffer.byteLength(canonicalJson(payload)),
    }),
  );
}

void main();

import { readFile } from "node:fs/promises";
import path from "node:path";
import {
  InMemoryRepository,
  type ContentType,
  type ImportPayloadRecord,
} from "./model";

export const fixturePath = path.join(
  process.cwd(),
  "tests",
  "fixtures",
  "cms-import",
  "zh-p0-reviewed.json",
);

export async function loadFixture(): Promise<ImportPayloadRecord[]> {
  return JSON.parse(await readFile(fixturePath, "utf8")) as ImportPayloadRecord[];
}

export function buildSourceRepository(
  payload: ImportPayloadRecord[],
): InMemoryRepository {
  const repository = new InMemoryRepository();
  for (const record of payload) {
    repository.sources.set(record.sourceEnglishContentId, {
      id: record.sourceEnglishContentId,
      postType: record.contentType as ContentType,
      slug: record.sourceEnglishSlug,
      status: "publish",
      language: "en",
      core: {
        post_title: `English source ${record.sourceEnglishContentId}`,
        post_name: record.sourceEnglishSlug,
        post_status: "publish",
      },
      acf: {
        source_marker: `source-${record.sourceEnglishContentId}`,
      },
    });
  }
  return repository;
}

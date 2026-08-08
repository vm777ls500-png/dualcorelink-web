import { buildSourceRepository, loadFixture } from "./fixture";
import {
  zhP1ReviewedCmsImportPayload,
  zhRemainingFinalReviewedCmsImportPayload,
} from "../../src/content/locales/cms-import";
import { preflight, type ImportPayloadRecord } from "./model";

async function main(): Promise<void> {
  const payload = await loadFixture();
  const result = preflight(payload, buildSourceRepository(payload));
  const zhP1Payload = structuredClone(
    zhP1ReviewedCmsImportPayload,
  ) as unknown as ImportPayloadRecord[];
  const zhP1Result = preflight(
    zhP1Payload,
    buildSourceRepository(zhP1Payload),
    { locale: "zh", batch: "p1" },
  );
  const zhRemainingPayload = structuredClone(
    zhRemainingFinalReviewedCmsImportPayload,
  ) as unknown as ImportPayloadRecord[];
  const zhRemainingResult = preflight(
    zhRemainingPayload,
    buildSourceRepository(zhRemainingPayload),
    { locale: "zh", batch: "remaining-final" },
  );
  console.log(
    JSON.stringify(
      {
        status: "passed",
        records: result.mapped.length,
        sourceIds: result.mapped.map((record) => record.sourceId),
        payloadSha256: result.payloadHash,
        writes: 0,
        chineseP1: {
          records: zhP1Result.mapped.length,
          sourceIds: zhP1Result.mapped.map((record) => record.sourceId),
          payloadSha256: zhP1Result.payloadHash,
          writes: 0,
        },
        chineseRemainingFinal: {
          records: zhRemainingResult.mapped.length,
          sourceIds: zhRemainingResult.mapped.map((record) => record.sourceId),
          payloadSha256: zhRemainingResult.payloadHash,
          writes: 0,
        },
      },
      null,
      2,
    ),
  );
}

void main();

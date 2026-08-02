import { buildSourceRepository, loadFixture } from "./fixture";
import {
  arP0OwnerWaivedCmsImportPayload,
  zhP1ReviewedCmsImportPayload,
} from "../../src/content/locales/cms-import";
import { preflight, type ImportPayloadRecord } from "./model";

async function main(): Promise<void> {
  const payload = await loadFixture();
  const result = preflight(payload, buildSourceRepository(payload));
  const arabicPayload = structuredClone(
    arP0OwnerWaivedCmsImportPayload,
  ) as unknown as ImportPayloadRecord[];
  const arabicResult = preflight(
    arabicPayload,
    buildSourceRepository(arabicPayload),
    { locale: "ar", batch: "p0", allowOwnerWaiver: true },
  );
  const zhP1Payload = structuredClone(
    zhP1ReviewedCmsImportPayload,
  ) as unknown as ImportPayloadRecord[];
  const zhP1Result = preflight(
    zhP1Payload,
    buildSourceRepository(zhP1Payload),
    { locale: "zh", batch: "p1" },
  );
  console.log(
    JSON.stringify(
      {
        status: "passed",
        records: result.mapped.length,
        sourceIds: result.mapped.map((record) => record.sourceId),
        payloadSha256: result.payloadHash,
        writes: 0,
        arabicOwnerWaiver: {
          records: arabicResult.mapped.length,
          sourceIds: arabicResult.mapped.map((record) => record.sourceId),
          payloadSha256: arabicResult.payloadHash,
          writes: 0,
        },
        chineseP1: {
          records: zhP1Result.mapped.length,
          sourceIds: zhP1Result.mapped.map((record) => record.sourceId),
          payloadSha256: zhP1Result.payloadHash,
          writes: 0,
        },
      },
      null,
      2,
    ),
  );
}

void main();

import { buildSourceRepository, loadFixture } from "./fixture";
import { arP0OwnerWaivedCmsImportPayload } from "../../src/content/locales/cms-import";
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
      },
      null,
      2,
    ),
  );
}

void main();

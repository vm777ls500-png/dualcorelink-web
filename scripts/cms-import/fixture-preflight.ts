import { buildSourceRepository, loadFixture } from "./fixture";
import { preflight } from "./model";

async function main(): Promise<void> {
  const payload = await loadFixture();
  const result = preflight(payload, buildSourceRepository(payload));
  console.log(
    JSON.stringify(
      {
        status: "passed",
        records: result.mapped.length,
        sourceIds: result.mapped.map((record) => record.sourceId),
        payloadSha256: result.payloadHash,
        writes: 0,
      },
      null,
      2,
    ),
  );
}

void main();

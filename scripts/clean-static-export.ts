import { rm } from "node:fs/promises";
import path from "node:path";
import { emptyStaticExportSlug } from "../src/lib/routing/static-export";

async function main() {
  const outputRoot = path.resolve("out", "en");
  const sentinelDirectories = [
    path.join(outputRoot, "products", emptyStaticExportSlug),
    path.join(outputRoot, "solutions", emptyStaticExportSlug),
  ];

  for (const directory of sentinelDirectories) {
    if (!directory.startsWith(`${outputRoot}${path.sep}`)) {
      throw new Error(`Refusing to remove unexpected export path: ${directory}`);
    }

    await rm(directory, { recursive: true, force: true });
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});

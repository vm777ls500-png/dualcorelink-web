import { rm, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { emptyStaticExportSlug } from "../src/lib/routing/static-export";

export async function cleanStaticExport(
  outputRoot = path.resolve("out", "en"),
) {
  const resolvedOutputRoot = path.resolve(outputRoot);
  const outputRootStats = await stat(resolvedOutputRoot);
  if (!outputRootStats.isDirectory()) {
    throw new Error(`Static export root is not a directory: ${resolvedOutputRoot}`);
  }

  const sentinelDirectories = [
    path.join(resolvedOutputRoot, "products", emptyStaticExportSlug),
    path.join(resolvedOutputRoot, "solutions", emptyStaticExportSlug),
  ];

  for (const directory of sentinelDirectories) {
    if (!directory.startsWith(`${resolvedOutputRoot}${path.sep}`)) {
      throw new Error(`Refusing to remove unexpected export path: ${directory}`);
    }

    await rm(directory, { recursive: true, force: true });
  }

  return sentinelDirectories;
}

const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (entryPath && pathToFileURL(entryPath).href === import.meta.url) {
  const outputRoot = process.argv[2] ?? path.resolve("out", "en");
  cleanStaticExport(outputRoot)
    .then((directories) => {
      console.log(
        `[export:clean] checked ${directories.length} sentinel directories`,
      );
    })
    .catch((error: unknown) => {
      console.error("[export:clean] failed", error);
      process.exitCode = 1;
    });
}

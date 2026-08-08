import {
  chmod,
  cp,
  mkdtemp,
  rm,
  utimes,
} from "node:fs/promises";
import { createHash } from "node:crypto";
import os from "node:os";
import path from "node:path";
import {
  approvedRuntimeFiles,
  defaultPackagePaths,
  parseAndVerifyZip,
  verifyCandidatePackage,
  writeCandidatePackage,
} from "./deterministic-package";

async function main(): Promise<void> {
  const defaults = defaultPackagePaths();
  const root = await mkdtemp(path.join(os.tmpdir(), "dualcorelink-repro-"));
  const results: Array<{
    zipSha256: string;
    manifestSha256: string;
    entryMetadata: string;
  }> = [];
  try {
    for (let index = 0; index < 3; index += 1) {
      const staging = path.join(root, `stage-${index}-${"x".repeat(index + 1)}`);
      const sourceRoot = path.join(staging, "plugin-input");
      const output = path.join(root, `output-${index}`);
      await cp(defaults.sourceRoot, sourceRoot, { recursive: true });
      const timestamp = new Date(Date.UTC(2020 + index, index, index + 1));
      for (const file of approvedRuntimeFiles) {
        const absolute = path.join(sourceRoot, ...file.split("/"));
        await utimes(absolute, timestamp, timestamp);
        await chmod(absolute, index % 2 === 0 ? 0o600 : 0o666);
      }
      const archivePath = path.join(output, "candidate.zip");
      const manifestPath = path.join(output, "candidate.manifest.json");
      const result = await writeCandidatePackage({
        sourceRoot,
        archivePath,
        manifestPath,
      });
      await verifyCandidatePackage({
        archivePath,
        manifestPath,
      });
      const archive = await import("node:fs/promises").then(({ readFile }) =>
        readFile(archivePath),
      );
      const parsed = parseAndVerifyZip(archive);
      results.push({
        zipSha256: result.zipSha256,
        manifestSha256: result.manifestSha256,
        entryMetadata: JSON.stringify(
          parsed.entries.map((entry) => ({
            path: entry.path,
            sha256: createHash("sha256").update(entry.bytes).digest("hex"),
            dosTime: entry.dosTime,
            dosDate: entry.dosDate,
            mode: entry.mode,
            compressionMethod: entry.compressionMethod,
          })),
        ),
      });
    }
    const first = results[0];
    if (
      results.some(
        (result) =>
          result.zipSha256 !== first.zipSha256 ||
          result.manifestSha256 !== first.manifestSha256 ||
          result.entryMetadata !== first.entryMetadata,
      )
    ) {
      throw new Error("deterministic package reproducibility failed");
    }
    console.log(
      JSON.stringify({
        status: "passed",
        builds: results.length,
        zipSha256: first.zipSha256,
        manifestSha256: first.manifestSha256,
        hashes: results.map((result) => result.zipSha256),
        temporaryArtifactsRemoved: true,
      }),
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

void main();

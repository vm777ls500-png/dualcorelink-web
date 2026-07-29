import { rm } from "node:fs/promises";
import {
  defaultPackagePaths,
  writeCandidatePackage,
} from "./deterministic-package";

async function main(): Promise<void> {
  const paths = defaultPackagePaths();
  const result = await writeCandidatePackage(paths);
  await rm(`${paths.archivePath}.sha256`, { force: true });
  console.log(
    JSON.stringify({
      archive: paths.archivePath,
      manifest: paths.manifestPath,
      files: result.files.length,
      zipSha256: result.zipSha256,
      manifestSha256: result.manifestSha256,
      approvalUpdated: false,
    }),
  );
}

void main();

import {
  defaultPackagePaths,
  verifyCandidatePackage,
} from "./deterministic-package";

async function main(): Promise<void> {
  const result = await verifyCandidatePackage(defaultPackagePaths());
  console.log(
    JSON.stringify({
      status: "passed",
      files: result.entries.length,
      zipSha256: result.zipSha256,
      manifestSha256: result.manifestSha256,
      approved: false,
      forbiddenFiles: 0,
    }),
  );
}

void main();

import { spawnSync } from "node:child_process";

function run(command: string, args: string[]): void {
  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: "inherit",
    shell: false,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run(process.execPath, [
  "--import",
  "tsx",
  "--test",
  "tests/cms-import-safety.test.ts",
  "tests/cms-import-zh-p1.test.ts",
  "tests/cms-import-zh-remaining-final.test.ts",
  "tests/cms-import-ar-final.test.ts",
  "tests/cms-import-vi-final.test.ts",
  "tests/cms-import-final-three.test.ts",
  "tests/cms-import-package.test.ts",
]);
run(process.execPath, [
  "--import",
  "tsx",
  "scripts/cms-import/generate-payload.ts",
  "--locale=ar",
  "--batch=p0",
]);
run(process.execPath, [
  "--import",
  "tsx",
  "scripts/cms-import/generate-payload.ts",
  "--locale=ar",
  "--batch=remaining-final",
]);
for (const locale of ["de", "es", "fa"]) {
  run(process.execPath, [
    "--import",
    "tsx",
    "scripts/cms-import/generate-payload.ts",
    `--locale=${locale}`,
    "--batch=remaining-final",
  ]);
}
run(process.execPath, [
  "--import",
  "tsx",
  "scripts/cms-import/generate-payload.ts",
  "--locale=vi",
  "--batch=remaining-final",
]);
run(process.execPath, [
  "--import",
  "tsx",
  "scripts/cms-import/generate-payload.ts",
  "--locale=zh",
  "--batch=p1",
]);
run(process.execPath, [
  "--import",
  "tsx",
  "scripts/cms-import/generate-payload.ts",
  "--locale=zh",
  "--batch=remaining-final",
]);
run("docker", [
  "run",
  "--rm",
  "-v",
  `${process.cwd()}:/workspace`,
  "-w",
  "/workspace",
  "php:8.3-cli",
  "php",
  "tests/cms-import-php/run.php",
]);

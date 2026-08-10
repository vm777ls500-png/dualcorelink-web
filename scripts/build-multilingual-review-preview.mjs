import { spawnSync } from "node:child_process";

const locale = process.argv[2];
if (locale !== "ar") {
  console.error("[multilingual:review-preview] supported locale: ar");
  process.exitCode = 1;
} else {
  const command = process.platform === "win32"
    ? (process.env.ComSpec ?? "cmd.exe")
    : "npm";
  const args = process.platform === "win32"
    ? ["/d", "/s", "/c", "npm.cmd run build"]
    : ["run", "build"];
  const result = spawnSync(command, args, {
    env: { ...process.env, MULTILINGUAL_REVIEW_LOCALE: locale },
    stdio: "inherit",
    shell: false,
  });
  if (result.error) {
    console.error(
      `[multilingual:review-preview] unable to start build: ${result.error.message}`,
    );
  }
  process.exitCode = result.status ?? 1;
}

import { spawnSync } from "node:child_process";

const localeSet = process.argv[2];
const supportedLocales = ["ar", "vi", "de", "es", "fa"];
const locales = [...new Set((localeSet ?? "").split(",").map((item) => item.trim()).filter(Boolean))];
if (locales.length === 0 || locales.some((locale) => !supportedLocales.includes(locale))) {
  console.error(
    `[multilingual:review-preview] supported locales: ${supportedLocales.join(", ")}`,
  );
  process.exitCode = 1;
} else {
  const command = process.platform === "win32"
    ? (process.env.ComSpec ?? "cmd.exe")
    : "npm";
  const args = process.platform === "win32"
    ? ["/d", "/s", "/c", "npm.cmd run build"]
    : ["run", "build"];
  const result = spawnSync(command, args, {
    env: {
      ...process.env,
      MULTILINGUAL_REVIEW_LOCALE: locales.join(","),
      NEXT_PUBLIC_MULTILINGUAL_REVIEW_LOCALE: locales.join(","),
    },
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

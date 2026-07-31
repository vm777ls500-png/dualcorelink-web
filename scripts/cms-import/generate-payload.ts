import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { arP0OwnerWaivedCmsImportPayload } from "../../src/content/locales/cms-import";
import { canonicalJson, sha256 } from "./model";

function value(name: string): string | undefined {
  const prefix = `--${name}=`;
  const inline = process.argv.find((argument) => argument.startsWith(prefix));
  if (inline) return inline.slice(prefix.length);
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main(): Promise<void> {
  const locale = value("locale");
  const batch = value("batch");
  if (locale !== "ar" || batch !== "p0") {
    throw new Error(
      "Only the exact owner-waived Arabic P0 payload is supported: --locale=ar --batch=p0",
    );
  }
  const payload = arP0OwnerWaivedCmsImportPayload;
  const canonical = canonicalJson(payload);
  const bytes = Buffer.from(`${canonical}\n`, "utf8");
  const output = path.join(
    process.cwd(),
    "dist",
    "cms-import",
    "ar-p0-owner-waived.json",
  );
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, bytes);
  console.log(
    JSON.stringify({
      status: "generated",
      locale,
      batch,
      records: payload.length,
      file: path.relative(process.cwd(), output).replaceAll("\\", "/"),
      canonicalSha256: sha256(payload),
      fileSha256: createHash("sha256").update(bytes).digest("hex"),
      bytes: bytes.length,
    }),
  );
}

void main();

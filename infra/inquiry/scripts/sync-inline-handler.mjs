import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = path.resolve(import.meta.dirname, "..");
const handlerPath = path.join(root, "src", "handler.cjs");
const templatePath = path.join(root, "template.yaml");
const startMarker = "          // BEGIN GENERATED HANDLER";
const endMarker = "          // END GENERATED HANDLER";

const [handler, template] = await Promise.all([
  readFile(handlerPath, "utf8"),
  readFile(templatePath, "utf8"),
]);
const normalizedTemplate = template.replace(/\r\n/g, "\n");
const start = normalizedTemplate.indexOf(startMarker);
const end = normalizedTemplate.indexOf(endMarker);

if (start < 0 || end < 0 || end <= start) {
  throw new Error("Generated handler markers are missing or invalid");
}

const indentedHandler = handler
  .trimEnd()
  .split(/\r?\n/)
  .map((line) => (line ? `          ${line}` : ""))
  .join("\n");
const generated = `${normalizedTemplate.slice(0, start)}${startMarker}\n${indentedHandler}\n${normalizedTemplate.slice(end)}`;

if (process.argv.includes("--check")) {
  if (generated !== normalizedTemplate) {
    throw new Error("template.yaml inline Lambda code is out of sync");
  }
  console.log("Inline Lambda code is synchronized.");
} else {
  await writeFile(templatePath, generated, "utf8");
  console.log("Updated template.yaml inline Lambda code.");
}

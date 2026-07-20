import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(process.cwd());

async function read(relativePath: string) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

test("link defaults stay below utility classes in the cascade", async () => {
  const css = await read("src/app/globals.css");

  assert.match(
    css,
    /@layer base\s*\{\s*a\s*\{\s*color:\s*inherit;\s*text-decoration:\s*none;/,
  );
  assert.doesNotMatch(css, /\n\s*a\s*\{\s*color:\s*inherit;\s*text-decoration:\s*none;\s*\}\s*\n(?!\s*\})/);
});

test("locale layout provides a keyboard bypass link and focus target", async () => {
  const layout = await read("src/app/[locale]/layout.tsx");

  assert.match(layout, /className="skip-link" href="#main-content"/);
  assert.match(layout, /<main id="main-content" tabIndex=\{-1\}/);
});

test("analytics choice panel uses non-modal region semantics", async () => {
  const consent = await read("src/components/analytics/ga4-consent.tsx");

  assert.match(consent, /role="region"/);
  assert.doesNotMatch(consent, /aria-modal=/);
});

test("contact draft feedback is announced as a polite status", async () => {
  const form = await read("src/components/contact/get-quote-form.tsx");

  assert.match(form, /aria-live="polite"[\s\S]*?role="status"/);
});

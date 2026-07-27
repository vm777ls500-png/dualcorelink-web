import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { createGlobalEntities } from "../src/lib/schema";

const projectRoot = process.cwd();

async function readProjectFile(...segments: string[]) {
  return readFile(path.join(projectRoot, ...segments), "utf8");
}

function normalizeSource(value: string) {
  return value.replace(/\s+/g, " ").toLowerCase();
}

test("Phase 1C corrects root brand capitalization without changing redirect controls", async () => {
  const source = await readProjectFile("src", "app", "page.tsx");

  assert.doesNotMatch(source, /DualcoreLink/);
  assert.match(source, /DualCoreLink \| Smart Hotel & Smart Home Automation/);
  assert.match(source, /Continue to DualCoreLink's English site/);
  assert.match(source, />\s*DualCoreLink\s*</);
  assert.match(source, /canonical:\s*"\/en\/"/);
  assert.match(source, /index:\s*false/);
  assert.match(source, /follow:\s*true/);
  assert.match(source, /httpEquiv="refresh"\s+content="0; url=\/en\/"/);
  assert.match(source, /window\.location\.replace\('\/en\/'\)/);
});

test("Phase 1C aligns About MOQ and lead time with confirmed conditional terms", async () => {
  const source = normalizeSource(
    await readProjectFile("src", "app", "[locale]", "about", "page.tsx"),
  );

  assert.ok(
    source.includes(
      "regular products do not have a fixed minimum order quantity.",
    ),
  );
  assert.ok(
    source.includes(
      "customized products may involve tooling or customization fees when a new mold is required.",
    ),
  );
  assert.ok(
    source.includes(
      "a color-only change using an existing mold does not require a customization fee.",
    ),
  );
  assert.match(source, /typical lead time is 7[–-]15 days\./);
  assert.ok(
    source.includes(
      "actual timing depends on the product, order quantity, customization scope, and project requirements.",
    ),
  );
  assert.equal(source.includes("7-30 days"), false);
  assert.equal(source.includes("7–30 days"), false);
  assert.equal(
    source.includes(
      "moq depends on the product model and customization requirements.",
    ),
    false,
  );
});

test("Phase 1C leaves the unconfirmed About sample and warranty wording unchanged", async () => {
  const source = normalizeSource(
    await readProjectFile("src", "app", "[locale]", "about", "page.tsx"),
  );

  assert.ok(source.includes("samples are available for evaluation."));
  assert.ok(source.includes("customers pay the sample cost and shipping cost."));
  assert.ok(source.includes("the general warranty period is one year"));
  assert.ok(
    source.includes(
      "final terms depending on the product and order requirements.",
    ),
  );
});

test("Phase 1C preserves deferred schema and crawl-policy boundaries", async () => {
  const organization = createGlobalEntities().find(
    (node) => node["@type"] === "Organization",
  );
  assert.ok(organization);
  assert.deepEqual(organization.contactPoint, {
    "@type": "ContactPoint",
    telephone: "+85270390436",
    email: "sales@dualcorelink.com",
    contactType: "sales",
  });
  assert.equal(organization.logo, undefined);
  assert.equal(organization.sameAs, undefined);
  assert.equal(organization.address, undefined);

  const aboutSource = await readProjectFile(
    "src",
    "app",
    "[locale]",
    "about",
    "page.tsx",
  );
  assert.match(aboutSource, /createStaticHreflang\(locales, "about"\)/);

  for (const segments of [
    ["src", "app", "[locale]", "contact", "page.tsx"],
    ["src", "app", "[locale]", "downloads", "page.tsx"],
    ["src", "app", "[locale]", "regions", "page.tsx"],
  ]) {
    const source = await readProjectFile(...segments);
    assert.doesNotMatch(source, /<JsonLd|createSchemaGraph/);
  }

  await assert.rejects(
    access(path.join(projectRoot, "public", "llms.txt")),
  );
});

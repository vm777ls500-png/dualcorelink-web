import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import {
  brand,
  createWhatsAppUrl,
} from "../src/config/brand";
import { priorityProductReinforcements } from "../src/config/product-conversion";
import { regionLandingPages } from "../src/config/region-landing-pages";
import { resources } from "../src/config/resources";
import {
  createGlobalEntities,
  createSchemaGraph,
  organizationId,
} from "../src/lib/schema";

const projectRoot = process.cwd();
const confirmedTelephone = "+8613703333750";
const whatsappOnlyNumber = "+85270390436";

async function readProjectFile(...segments: string[]) {
  return readFile(path.join(projectRoot, ...segments), "utf8");
}

function getOrganization() {
  const organization = createGlobalEntities().find(
    (node) => node["@type"] === "Organization",
  );
  assert.ok(organization);
  return organization;
}

test("Phase 1D maps the confirmed sales phone to ContactPoint telephone", () => {
  const organization = getOrganization();

  assert.deepEqual(organization.contactPoint, {
    "@type": "ContactPoint",
    telephone: confirmedTelephone,
    email: "sales@dualcorelink.com",
    contactType: "sales",
  });
  assert.notEqual(
    organization.contactPoint.telephone,
    whatsappOnlyNumber,
  );
});

test("Phase 1D keeps the WhatsApp-only number in WhatsApp configuration and CTAs", async () => {
  assert.equal(brand.whatsapp.display, "+852 7039 0436");
  assert.equal(brand.whatsapp.international, "85270390436");
  assert.equal(
    createWhatsAppUrl(),
    "https://wa.me/85270390436",
  );

  const contactSource = await readProjectFile(
    "src",
    "app",
    "[locale]",
    "contact",
    "page.tsx",
  );
  const whatsappButtonSource = await readProjectFile(
    "src",
    "components",
    "contact",
    "whatsapp-button.tsx",
  );

  assert.match(contactSource, /brand\.whatsapp\.display/);
  assert.match(contactSource, /<WhatsAppButton/);
  assert.match(whatsappButtonSource, /createWhatsAppUrl\(message\)/);
});

test("Phase 1D keeps the public phone configuration aligned with visible contact details", async () => {
  assert.equal(brand.phone.display, "+86 13703333750");
  assert.equal(brand.phone.international, "8613703333750");

  for (const segments of [
    ["src", "app", "[locale]", "contact", "page.tsx"],
    ["src", "components", "layout", "footer.tsx"],
  ]) {
    const source = await readProjectFile(...segments);
    assert.match(source, /\+86 13703333750/);
    assert.match(source, /tel:\+8613703333750/);
  }
});

test("Phase 1D emits one stable Organization without unrelated entity expansion", () => {
  const graph = createSchemaGraph();
  const organizations = graph["@graph"].filter(
    (node) => node["@type"] === "Organization",
  );

  assert.equal(organizations.length, 1);
  assert.equal(organizations[0]["@id"], organizationId);
  assert.equal(organizations[0].logo, undefined);
  assert.equal(organizations[0].sameAs, undefined);
  assert.equal(organizations[0].address, undefined);
});

test("Phase 1D preserves the eight Phase 3A target configurations", () => {
  for (const slug of [
    "hotel-rcu-buying-guide",
    "smart-hotel-room-control-system-guide",
    "hotel-guest-room-control-interfaces-guide",
  ]) {
    assert.ok(resources.some((resource) => resource.slug === slug));
  }

  for (const slug of ["saudi-arabia", "uae"]) {
    assert.ok(regionLandingPages.some((region) => region.slug === slug));
  }

  for (const slug of [
    "hotel-smart-room-rcu-host-1",
    "86-type-ai-smart-control-display",
    "smart-four-key-scene-control-panel",
  ]) {
    assert.ok(priorityProductReinforcements[slug]);
  }
});

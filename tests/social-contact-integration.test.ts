import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { createWhatsAppUrl } from "../src/config/brand";
import { getDirection, locales } from "../src/config/i18n";
import {
  getSocialLinks,
  socialContactCopy,
  socialPlatforms,
} from "../src/config/social-links";
import { analyticsConsentStorageKey } from "../src/lib/analytics/ga4";
import {
  createSocialContactEvent,
  trackSocialContactClick,
} from "../src/lib/analytics/social-contact";

const projectRoot = process.cwd();
const readProjectFile = (...segments: string[]) =>
  readFile(path.join(projectRoot, ...segments), "utf8");

test("social contact config exposes only the four approved channels", () => {
  assert.deepEqual(socialPlatforms, [
    "facebook",
    "telegram_chat",
    "telegram_updates",
    "whatsapp",
  ]);
  assert.deepEqual(getSocialLinks(), [
    {
      platform: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/dualcorelink/",
    },
    {
      platform: "telegram_chat",
      label: "Telegram Chat",
      href: "https://t.me/dualcorelink",
    },
    {
      platform: "telegram_updates",
      label: "Telegram Updates",
      href: "https://t.me/dualcorelinknews",
    },
    {
      platform: "whatsapp",
      label: "WhatsApp",
      href: createWhatsAppUrl(),
    },
  ]);
  assert.equal(JSON.stringify(getSocialLinks()).toLowerCase().includes("linkedin"), false);
  assert.equal(getSocialLinks().some((link) => link.href.includes("?")), false);
});

test("all seven locales provide social section copy and preserve RTL", () => {
  assert.equal(locales.length, 7);
  for (const locale of locales) {
    assert.ok(socialContactCopy[locale].footerTitle.length > 0);
    assert.ok(socialContactCopy[locale].title.length > 0);
    assert.ok(socialContactCopy[locale].description.length > 0);
  }
  assert.equal(getDirection("ar"), "rtl");
  assert.equal(getDirection("fa"), "rtl");
});

test("social analytics payload contains only approved non-PII dimensions", () => {
  const event = createSocialContactEvent({
    platform: "telegram_chat",
    locale: "zh",
    sourcePage: "/zh/contact/",
    ctaPosition: "contact_social",
  });

  assert.deepEqual(event, {
    event: "social_contact_click",
    platform: "telegram_chat",
    locale: "zh",
    source_page: "/zh/contact/",
    cta_position: "contact_social",
  });
  assert.deepEqual(Object.keys(event).sort(), [
    "cta_position",
    "event",
    "locale",
    "platform",
    "source_page",
  ]);
  assert.doesNotMatch(
    JSON.stringify(event),
    /email|phone|whatsapp_or_phone|company|message|name|user_id/i,
  );
});

test("social analytics emits only after consent with four approved parameters", () => {
  const originalWindow = globalThis.window;
  const calls: unknown[][] = [];
  let consent = "denied";
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: {
      dualcorelinkGa4Configured: true,
      gtag: (...args: unknown[]) => calls.push(args),
      localStorage: {
        getItem: (key: string) =>
          key === analyticsConsentStorageKey ? consent : null,
      },
    },
  });

  try {
    const input = {
      platform: "facebook" as const,
      locale: "en" as const,
      sourcePage: "/en/contact/",
      ctaPosition: "contact_social" as const,
    };
    assert.equal(trackSocialContactClick(input), false);
    assert.equal(calls.length, 0);

    consent = "granted";
    assert.equal(trackSocialContactClick(input), true);
    assert.deepEqual(calls, [
      [
        "event",
        "social_contact_click",
        {
          platform: "facebook",
          locale: "en",
          source_page: "/en/contact/",
          cta_position: "contact_social",
        },
      ],
    ]);
  } finally {
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: originalWindow,
    });
  }
});

test("shared social links are wired into Footer and Contact safely", async () => {
  const [componentSource, footerSource, contactSource] = await Promise.all([
    readProjectFile("src", "components", "contact", "social-contact-links.tsx"),
    readProjectFile("src", "components", "layout", "footer.tsx"),
    readProjectFile("src", "app", "[locale]", "contact", "page.tsx"),
  ]);

  assert.match(componentSource, /target="_blank"/);
  assert.match(componentSource, /rel="noopener noreferrer"/);
  assert.match(componentSource, /trackSocialContactClick/);
  assert.match(componentSource, /<bdi dir="ltr">/);
  assert.match(footerSource, /ctaPosition="footer_social"/);
  assert.match(contactSource, /ctaPosition="contact_social"/);
  assert.equal(footerSource.toLowerCase().includes("linkedin"), false);
  assert.equal(contactSource.toLowerCase().includes("linkedin"), false);
});

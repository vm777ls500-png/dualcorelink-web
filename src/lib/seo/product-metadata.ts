const PRODUCT_SEO_DESCRIPTIONS: Readonly<Record<string, string>> = {
  "hotel-guest-room-doorbell":
    "Hotel guest room doorbell for entrance signaling and service coordination in hotel automation projects for contractors and system integrators.",
  "infrared-repeater":
    "Infrared repeater for extending control signals in hotel guest room and smart home projects for system integrators and project-based device matching.",
  "embedded-human-presence-sensor":
    "Embedded human presence sensor for occupancy detection in hotel guest rooms and smart spaces for automation contractors and integration projects.",
  "hotel-smart-delivery-cabinet":
    "Hotel smart delivery cabinet for secure item handover and delivery robot workflows in hospitality projects for hotels, integrators, and project buyers.",
};

const PRODUCT_SEO_TITLES: Readonly<Record<string, string>> = {
  "hotel-smart-room-rcu-host-1":
    "Hotel RCU Host for Guest Room Control Projects",
  "86-type-ai-smart-control-display":
    "86-Type AI Smart Control Display for Hotel Rooms",
  "smart-four-key-scene-control-panel":
    "Smart Four-Key Scene Control Panel for Hotel Rooms",
  "brushed-aluminum-voice-telephone-information-panel":
    "Brushed Aluminum Voice & Telephone Panel",
  "borui-red-matte-room-status-four-key-switch-panel":
    "Borui Room Status & Four-Key Switch Panel",
};

function removeBrandSuffix(value: string) {
  let result = value.trim();
  let previous = "";

  while (result !== previous) {
    previous = result;
    result = result
      .replace(/\s*\|\s*dualcore\s*link\s*$/i, "")
      .replace(/\s*\|\s*dualcorelink\s*$/i, "")
      .trim();
  }

  return result;
}

export function createProductSeoTitle(
  slug: string,
  productTitle: string,
  configuredTitle?: string,
) {
  if (PRODUCT_SEO_TITLES[slug]) {
    return PRODUCT_SEO_TITLES[slug];
  }

  const candidates = [configuredTitle, productTitle]
    .map((value) => removeBrandSuffix(value || ""))
    .filter(Boolean);

  return candidates.sort((left, right) => left.length - right.length)[0] || "";
}

export function createProductSeoDescription(
  slug: string,
  configuredDescription: string,
  fallbackDescription: string,
) {
  return (
    PRODUCT_SEO_DESCRIPTIONS[slug] ||
    configuredDescription.trim() ||
    fallbackDescription.trim()
  );
}

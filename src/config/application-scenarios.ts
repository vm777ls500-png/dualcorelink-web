export type ApplicationScenarioConfig = {
  slug: string;
  title: string;
  description: string;
  usage: string;
};

export const applicationScenarios: ApplicationScenarioConfig[] = [
  {
    slug: "hotel-guest-room",
    title: "Hotel Guest Room",
    description:
      "Guest room control scenes combining panels, RCU hosts, sensors, HVAC, curtain control, and service indicators.",
    usage: "Homepage, Solutions, and Application Scenarios page",
  },
  {
    slug: "smart-apartment",
    title: "Smart Apartment",
    description:
      "Apartment automation scenes for lighting, power, climate, curtains, sensors, and centralized control.",
    usage: "Solutions and regional market pages",
  },
  {
    slug: "hotel-public-area",
    title: "Hotel Public Area",
    description:
      "Public-area automation scenes for service robots, smart delivery cabinets, gateways, and operational devices.",
    usage: "Homepage scene module and Solution landing pages",
  },
];

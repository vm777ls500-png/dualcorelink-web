export type StaticCaseStudy = {
  title: string;
  slug: string;
  summary: string;
  projectType: string;
  region: string;
  customerType: string;
  background: string;
  requirements: string[];
  recommendedSolution: string[];
  productsInvolved: Array<{ name: string; slug: string }>;
  solutionValue: string[];
  suitableFor: string[];
  relatedSolutions: Array<{ title: string; slug: string }>;
  displayOrder: number;
  schemaEnabled: boolean;
};

export const staticCaseStudies: StaticCaseStudy[] = [
  {
    title: "Middle East Smart Hotel Guest Room Control Project",
    slug: "middle-east-smart-hotel-guest-room-control-project",
    summary:
      "An anonymous smart hotel guest room control reference for overseas hotel projects that need coordinated room panels, RCU planning, sensing, sockets, curtain control, and service panel options.",
    projectType: "Smart hotel guest room control solution",
    region: "Middle East",
    customerType: "Hotel owner, contractor, or system integrator",
    background:
      "The project required a room control direction for hotel guest rooms where the buyer needed a practical product mix for room operation, guest interaction, and system integration planning without exposing customer identity or project location.",
    requirements: [
      "Coordinate guest room control devices for lighting, curtain, power, sensing, and room service workflows.",
      "Prepare a product mix that can support hotel project discussion, sampling, quotation, and technical coordination.",
      "Keep the solution suitable for B2B procurement, contractor review, and system integration planning.",
    ],
    recommendedSolution: [
      "Use an AI smart control display as the guest-facing room control interface.",
      "Use an RCU controller cabinet as the room control planning center where the project requires centralized coordination.",
      "Match sensors, sockets, curtain control panels, and service panels according to room type and wiring requirements.",
      "Confirm electrical, wiring, and integration details during the project evaluation stage.",
    ],
    productsInvolved: [
      {
        name: "86-Type AI Smart Control Display",
        slug: "86-type-ai-smart-control-display",
      },
      { name: "RCU Controller Cabinet", slug: "rcu-controller-cabinet" },
      {
        name: "Embedded Human Presence Sensor",
        slug: "embedded-human-presence-sensor",
      },
      {
        name: "Smart USB Five-Hole Socket",
        slug: "smart-usb-five-hole-socket",
      },
      {
        name: "Smart Four-Key Curtain Control Panel",
        slug: "smart-four-key-curtain-control-panel",
      },
      {
        name: "Brushed Aluminum 86-Base Doorbell Panel",
        slug: "brushed-aluminum-86-base-doorbell-panel",
      },
    ],
    solutionValue: [
      "Helps hotel buyers understand how panels, room control hosts, sensors, and service devices can be grouped for a guest room package.",
      "Supports early product selection before sample evaluation and project-specific technical confirmation.",
      "Keeps procurement discussion focused on product fit, room type, quantity, and OEM/ODM options.",
    ],
    suitableFor: [
      "Hotel guest room upgrades",
      "New smart hotel projects",
      "Contractor and integrator product selection",
      "Distributor solution presentation",
    ],
    relatedSolutions: [
      {
        title: "Hotel Guest Room Control Solution",
        slug: "hotel-guest-room-control-solution",
      },
      {
        title: "RCU Room Control Solution",
        slug: "rcu-room-control-solution",
      },
    ],
    displayOrder: 1,
    schemaEnabled: true,
  },
  {
    title: "Southeast Asia Serviced Apartment & Residential Automation Project",
    slug: "southeast-asia-serviced-apartment-residential-automation-project",
    summary:
      "An anonymous serviced apartment and residential automation reference for buyers planning smart control interfaces, sensors, sockets, curtain panels, and apartment automation product combinations.",
    projectType:
      "Serviced apartment, villa, and residential smart automation solution",
    region: "Southeast Asia",
    customerType: "Distributor, smart home installer, contractor, or project buyer",
    background:
      "The buyer needed a residential automation product direction for apartment and villa-style spaces where product appearance, control convenience, and project supply flexibility were important.",
    requirements: [
      "Provide a practical smart control product mix for serviced apartments, villas, and residential automation projects.",
      "Support buyer discussion around panel style, user interface, socket options, curtain control, and sensing needs.",
      "Leave technical parameters and integration details for project-level confirmation.",
    ],
    recommendedSolution: [
      "Use smart displays and control panels as the main user interaction points.",
      "Match sensors, sockets, and curtain control panels based on room function and installation position.",
      "Prepare OEM/ODM discussion for panel appearance, labeling, packaging, and market positioning when required.",
      "Confirm product models, wiring, and installation details before quotation and sampling.",
    ],
    productsInvolved: [
      { name: "AI Large Smart Display", slug: "ai-large-smart-display" },
      {
        name: "Rotary Knob Smart Control Display",
        slug: "rotary-knob-smart-control-display",
      },
      {
        name: "Embedded Human Presence Sensor",
        slug: "embedded-human-presence-sensor",
      },
      {
        name: "Smart USB Five-Hole Socket",
        slug: "smart-usb-five-hole-socket",
      },
      {
        name: "Smart Four-Key Curtain Control Panel",
        slug: "smart-four-key-curtain-control-panel",
      },
    ],
    solutionValue: [
      "Gives distributors and contractors a clear product direction for residential smart automation packages.",
      "Supports product comparison across control display, socket, sensor, and curtain control categories.",
      "Keeps customization discussion tied to real project needs rather than generic catalog selection.",
    ],
    suitableFor: [
      "Serviced apartments",
      "Villa automation projects",
      "Smart residential product packages",
      "Distributor and installer product planning",
    ],
    relatedSolutions: [
      {
        title: "AI Smart Display Solution",
        slug: "ai-smart-display-solution",
      },
      {
        title: "OEM / ODM Custom Panel Solution",
        slug: "oem-odm-custom-panel-solution",
      },
    ],
    displayOrder: 2,
    schemaEnabled: true,
  },
  {
    title: "Overseas OEM/ODM Smart Panel Customization Project",
    slug: "overseas-oem-odm-smart-panel-customization-project",
    summary:
      "An anonymous OEM/ODM smart panel customization reference for overseas partners that need product appearance planning, private label discussion, panel layout options, and project supply support.",
    projectType: "OEM/ODM smart panel customization",
    region: "Overseas market",
    customerType: "OEM/ODM buyer, distributor, wholesaler, or brand partner",
    background:
      "The partner needed a structured way to discuss customized smart panel products for an overseas market while keeping customer identity, project details, and commercial terms private.",
    requirements: [
      "Support panel appearance, layout, logo, packaging, and product mix discussion for private label cooperation.",
      "Match suitable panel and socket products for market positioning and project supply planning.",
      "Keep quotation, MOQ, lead time, and customization scope dependent on confirmed product type and order requirements.",
    ],
    recommendedSolution: [
      "Start with a defined panel series or product group that matches the target market style.",
      "Confirm which functions, labels, finishes, and packaging elements need customization.",
      "Select sample products for evaluation before final order planning.",
      "Review technical feasibility, order quantity, and production requirements before confirming the customization scope.",
    ],
    productsInvolved: [
      {
        name: "Smart USB Five-Hole Socket",
        slug: "smart-usb-five-hole-socket",
      },
      {
        name: "Smart Key Card Energy Saver Panel",
        slug: "smart-key-card-energy-saver-panel",
      },
      {
        name: "Smart Four-Key Curtain Control Panel",
        slug: "smart-four-key-curtain-control-panel",
      },
      {
        name: "Brushed Aluminum 86-Base Doorbell Panel",
        slug: "brushed-aluminum-86-base-doorbell-panel",
      },
    ],
    solutionValue: [
      "Helps overseas partners turn customization needs into a structured product discussion.",
      "Supports early evaluation of product style, function, logo, packaging, and project supply direction.",
      "Keeps private label cooperation practical by linking design requests with product type, quantity, and technical confirmation.",
    ],
    suitableFor: [
      "Private label product planning",
      "Distributor product line development",
      "Smart panel customization projects",
      "Hotel and smart home channel supply",
    ],
    relatedSolutions: [
      {
        title: "OEM / ODM Custom Panel Solution",
        slug: "oem-odm-custom-panel-solution",
      },
      {
        title: "Hotel Guest Room Control Solution",
        slug: "hotel-guest-room-control-solution",
      },
    ],
    displayOrder: 3,
    schemaEnabled: true,
  },
];

export function getStaticCaseStudy(slug: string): StaticCaseStudy | undefined {
  return staticCaseStudies.find((caseStudy) => caseStudy.slug === slug);
}

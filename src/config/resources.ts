export type ResourceLink = {
  title: string;
  href: string;
  description?: string;
};

export type ResourceSection = {
  id: string;
  heading: string;
  body: string[];
};

export type ResourceGuide = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  category: "Guide";
  primaryKeyword: string;
  secondaryKeywords: string[];
  audience: string[];
  lastReviewed: string;
  sections: ResourceSection[];
  relatedSolutions: ResourceLink[];
  relatedProducts: ResourceLink[];
  relatedRegions: ResourceLink[];
  relatedDownloads: ResourceLink[];
  cta: {
    title: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel: string;
    secondaryHref: string;
    whatsappLabel: string;
    whatsappMessage: string;
  };
  safeClaims: string[];
  forbiddenClaims: string[];
};

export const resources: ResourceGuide[] = [
  {
    slug: "what-is-hotel-rcu-room-control-system",
    title:
      "What Is a Hotel RCU Room Control System? A Practical Guide for B2B Projects",
    seoTitle: "What Is a Hotel RCU Room Control System? B2B Project Guide",
    metaDescription:
      "Learn how hotel RCU room control systems support B2B guest room projects, including devices, wiring, protocols, product selection, and quotation planning.",
    summary:
      "A practical planning guide for hotel owners, contractors, system integrators, distributors, and OEM/ODM buyers evaluating RCU-based guest room control projects.",
    category: "Guide",
    primaryKeyword: "hotel RCU room control system",
    secondaryKeywords: [
      "hotel room control unit",
      "RCU controller for hotel",
      "guest room control system",
      "hotel automation RCU",
    ],
    audience: [
      "Hotel owner",
      "Contractor",
      "System integrator",
      "Distributor",
      "OEM/ODM buyer",
    ],
    lastReviewed: "2026-07-09",
    sections: [
      {
        id: "what-an-rcu-does",
        heading: "What an RCU Does in a Hotel Guest Room",
        body: [
          "An RCU, or room control unit, coordinates the electrical and control devices inside a hotel guest room. In a typical smart hotel project, it can help connect lighting control, curtain control, HVAC control, door status, room status indicators, and selected service functions into one planned room control structure.",
          "For B2B buyers, the important point is that an RCU is not just a single product to price in isolation. It is part of a room-level system that should be matched with the room type, wiring method, control functions, panel layout, voltage, protocol preference, and installation requirements.",
          "The final RCU scope can vary by project. A standard room, suite, serviced apartment, or villa-style unit may use different device combinations, so early product selection should start from the room scenario rather than from a generic device list.",
        ],
      },
      {
        id: "typical-devices",
        heading: "Typical Devices Connected to a Hotel RCU",
        body: [
          "Common device groups include RCU controller cabinets or room control hosts, smart wall panels, AI control displays, thermostat panels, curtain control panels, key card energy saver panels, door magnetic sensors, human presence sensors, doorbells, and room status or service panels.",
          "The RCU can act as the coordination point, while the visible panels and sensors support the guest experience and the hotel operation workflow. Contractors and system integrators should review how each device will be installed, powered, wired, and controlled before finalizing the quotation list.",
          "Not every project needs every device. A renovation project may focus on panels and selected sensors, while a new hotel project may plan the RCU, room panels, HVAC, curtain, service status, and socket modules together from the beginning.",
        ],
      },
      {
        id: "wiring-and-protocol",
        heading: "Wiring and Protocol Questions to Confirm Early",
        body: [
          "Before choosing products, buyers should confirm the project country, voltage, frequency, wiring method, preferred protocol, room type, and expected control functions. These details affect product matching, wiring diagram review, installation planning, and document preparation.",
          "Protocol and wiring requirements should be confirmed by project. A product that is suitable for one hotel layout may still need review before it is used in another market or room design. This is especially important for contractors and integrators preparing a room schedule, BOQ, or device list.",
          "If the project is still at an early stage, it is useful to share the target room functions first. The product selection can then be narrowed down around the RCU, panels, sensors, HVAC control, curtain control, and service indicators that fit the expected guest room workflow.",
        ],
      },
      {
        id: "product-selection",
        heading: "RCU Product Selection for Contractors and Integrators",
        body: [
          "Contractors usually need a practical product mix that can be quoted, installed, and coordinated with the room design. System integrators may also need to review communication requirements, wiring logic, and how room devices are grouped within the control system.",
          "A useful RCU inquiry should include room quantity, room type, product interests, control functions, voltage and frequency requirements, protocol preference, panel finish needs, and required documents. Drawings, BOQ files, or room schedules can make selection more accurate.",
          "Distributors and OEM/ODM buyers can also use the RCU discussion to define a product line for target markets. In those cases, panel appearance, logo needs, button layout, packaging, and document requirements should be discussed together with the room control hardware.",
        ],
      },
      {
        id: "quotation-planning",
        heading: "How RCU Planning Affects Quotation",
        body: [
          "RCU quotations depend on the project scope. A single RCU host inquiry is different from a full room control package that includes panels, sensors, thermostat control, curtain control, socket modules, room status devices, and related document requests.",
          "For faster quotation, prepare the project country, estimated quantity, hotel room type, required device list, voltage, protocol preference, panel finish, logo or OEM/ODM needs, and target delivery time. Regular products have no fixed MOQ, while custom products may require additional review depending on the series and requirements.",
          "Typical lead time is 7-15 days depending on product and order requirements. Customization, document preparation, sample requests, and order quantity can all affect the final schedule, so they should be confirmed before purchase planning.",
        ],
      },
      {
        id: "common-mistakes",
        heading: "Common Mistakes in Early RCU Planning",
        body: [
          "One common mistake is asking for a room control price without sharing room type, quantity, control functions, or wiring needs. This often leads to an incomplete quote and extra clarification rounds.",
          "Another mistake is treating every RCU room control project as the same. Hotel rooms, serviced apartments, villas, and public-area automation projects may use different device combinations and installation assumptions.",
          "Buyers should also avoid leaving document requirements until the end. Datasheets, wiring diagrams, available certificate copies, and other project documents should be reviewed by product and project request, especially when the target market has specific procurement or engineering requirements.",
        ],
      },
      {
        id: "datasheets-and-wiring",
        heading: "When to Request Datasheets or Wiring Diagrams",
        body: [
          "Datasheets and wiring diagrams are most useful after the buyer has identified the product category, estimated quantity, voltage, protocol preference, and room control functions. At that point, the documents can support internal engineering review and quotation confirmation.",
          "Some documents may need product and project confirmation before sharing. Public catalogs can support early selection, while detailed datasheets, wiring references, available certificate copies, and OEM/ODM documents should be reviewed against the requested product and market.",
          "If you are preparing a hotel project, send the room schedule, BOQ, product list, or control function list. The team can review the RCU direction, related smart panels, sensors, and document needs before preparing a focused quotation.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "RCU Room Control Solution",
        href: "/en/solutions/rcu-room-control-solution/",
        description:
          "RCU host, cabinet, sensor, socket, and panel coordination for hotel room control systems.",
      },
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Guest room control planning for lighting, HVAC, curtains, service status, sensing, and room power workflows.",
      },
    ],
    relatedProducts: [
      {
        title: "RCU Controller Cabinet",
        href: "/en/products/rcu-controller-cabinet/",
      },
      {
        title: "Hotel Smart Room RCU Host 1",
        href: "/en/products/hotel-smart-room-rcu-host-1/",
      },
      {
        title: "Hotel Smart Room RCU Host 2",
        href: "/en/products/hotel-smart-room-rcu-host-2/",
      },
      {
        title: "Hotel Smart Room RCU Host 3",
        href: "/en/products/hotel-smart-room-rcu-host-3/",
      },
    ],
    relatedRegions: [
      {
        title: "Middle East",
        href: "/en/regions/middle-east/",
      },
      {
        title: "Saudi Arabia",
        href: "/en/regions/saudi-arabia/",
      },
    ],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Public catalogs are available for early product selection. Project documents can be requested after product and market confirmation.",
      },
    ],
    cta: {
      title: "Plan an RCU room control quotation",
      body: "Send your room type, quantity, voltage, protocol preference, product list, and required documents. Our team can review product selection, datasheets, wiring diagram requests, and quotation details by email or WhatsApp.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to discuss a hotel RCU room control system project.",
    },
    safeClaims: [
      "Supports B2B hotel project inquiries.",
      "Product selection support is available for hotel owners, contractors, system integrators, distributors, and OEM/ODM buyers.",
      "Documents can be reviewed by product and project request.",
      "Voltage and protocol requirements should be confirmed by project.",
      "Regular products have no fixed MOQ.",
      "Typical lead time is 7-15 days depending on product and order requirements.",
    ],
    forbiddenClaims: [
      "Local office",
      "Local stock",
      "Local distributor network",
      "Guaranteed compliance",
      "Certified for Saudi / UAE / Vietnam",
      "Customer names",
      "Hotel brand names",
      "Project numbers",
      "Fake certifications",
      "Fake reviews",
      "Fake price",
      "Guaranteed delivery",
    ],
  },
];

export const resourceSlugs = resources.map((resource) => resource.slug);

export function getResourceBySlug(slug: string): ResourceGuide | undefined {
  return resources.find((resource) => resource.slug === slug);
}

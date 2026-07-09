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
  h1: string;
  seoTitle: string;
  metaDescription: string;
  summary: string;
  category: "Guide";
  topic: string;
  listingGroup:
    | "Buying Guides"
    | "Hotel Automation Guides"
    | "OEM/ODM Guides"
    | "Technical Resources";
  featuredPriority?: number;
  readingTime: string;
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

const commonSafeClaims = [
  "Supports B2B hotel project inquiries.",
  "Product selection support is available for hotel owners, contractors, system integrators, distributors, and OEM/ODM buyers.",
  "Documents can be reviewed by product and project request.",
  "Voltage and protocol requirements should be confirmed by project.",
  "OEM/ODM customization is available depending on product series and project requirements.",
  "Regular products have no fixed MOQ.",
  "Typical lead time is 7-15 days depending on product and order requirements.",
];

const commonForbiddenClaims = [
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
];

export const resources: ResourceGuide[] = [
  {
    slug: "what-is-hotel-rcu-room-control-system",
    title:
      "What Is a Hotel RCU Room Control System? A Practical Guide for B2B Projects",
    h1: "What Is a Hotel RCU Room Control System?",
    seoTitle: "What Is a Hotel RCU Room Control System? B2B Project Guide",
    metaDescription:
      "Learn how hotel RCU room control systems support B2B guest room projects, including devices, wiring, protocols, product selection, and quotation planning.",
    summary:
      "A practical planning guide for hotel owners, contractors, system integrators, distributors, and OEM/ODM buyers evaluating RCU-based guest room control projects.",
    category: "Guide",
    topic: "RCU room control",
    listingGroup: "Technical Resources",
    readingTime: "8 min read",
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
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "hotel-rcu-buying-guide",
    title: "Hotel RCU Buying Guide for Contractors and System Integrators",
    h1: "Hotel RCU Buying Guide",
    seoTitle: "Hotel RCU Buying Guide for B2B Projects",
    metaDescription:
      "Compare hotel RCU buying factors for contractors, integrators, and buyers planning guest room control projects, device lists, wiring, and quote requests.",
    summary:
      "A buyer-focused guide to selecting hotel RCU products, preparing room control requirements, and requesting accurate quotations for B2B projects.",
    category: "Guide",
    topic: "RCU buying",
    listingGroup: "Buying Guides",
    featuredPriority: 1,
    readingTime: "7 min read",
    primaryKeyword: "hotel RCU buying guide",
    secondaryKeywords: [
      "hotel RCU supplier",
      "room control unit buying guide",
      "hotel room control quotation",
      "RCU controller for hotel project",
    ],
    audience: [
      "Contractor",
      "System integrator",
      "Distributor",
      "Hotel owner",
      "OEM/ODM buyer",
    ],
    lastReviewed: "2026-07-09",
    sections: [
      {
        id: "start-with-room-scope",
        heading: "Start with the Guest Room Control Scope",
        body: [
          "A hotel RCU buying process should begin with the room functions, not only with a controller model. Buyers should define lighting circuits, curtain control, HVAC control, room status, door status, key card power, sensors, and service functions before comparing product options.",
          "For contractors and system integrators, this early scope helps create a clearer device list and avoids quoting an RCU without the panels, sensors, and room devices that make the system complete.",
        ],
      },
      {
        id: "check-wiring-protocol",
        heading: "Confirm Wiring, Voltage, and Protocol Requirements",
        body: [
          "Voltage, frequency, wiring method, panel connection method, and protocol preference should be checked before product selection. These details affect compatibility, installation planning, and the documents needed for engineering review.",
          "If the project is still in design, share the expected room layout and control functions first. Product selection can then be reviewed against the target country, room type, and system integration approach.",
        ],
      },
      {
        id: "compare-rcu-products",
        heading: "Compare RCU Hosts, Cabinets, and Room Devices",
        body: [
          "A buying review may include RCU controller cabinets, room control hosts, smart switch panels, thermostat panels, curtain panels, door magnetic sensors, human presence sensors, doorbells, and room status indicators.",
          "The best product mix depends on room category, installation method, desired panel finish, OEM/ODM needs, and whether the buyer needs a complete room package or selected replacement devices.",
        ],
      },
      {
        id: "documents-for-buying",
        heading: "Prepare Documents for a Faster Quotation",
        body: [
          "Useful inquiry details include room quantity, room type, product interests, voltage, protocol preference, panel finish, logo requirements, target market, and required documents.",
          "Datasheets, wiring diagrams, available certificate copies, and catalog files can be reviewed by product and project request. A BOQ or room schedule makes quotation discussion more efficient.",
        ],
      },
      {
        id: "buyer-questions",
        heading: "Buyer Questions Before Ordering",
        body: [
          "Ask whether the RCU selection matches the planned room devices, whether the panel layout can support the required functions, and whether the project needs standard products or OEM/ODM customization.",
          "Also confirm lead time, sample needs, document requirements, packing expectations, and whether the products should be quoted as individual devices or as a room control package.",
        ],
      },
      {
        id: "application-scenarios",
        heading: "Application Scenarios for Hotel RCU Projects",
        body: [
          "RCU products are commonly used in new hotel guest rooms, serviced apartments, renovation projects, villa-style accommodation, and smart room package procurement.",
          "For Middle East and Southeast Asia projects, early confirmation of voltage, room function, panel appearance, and document needs is especially useful before quotation and sample planning.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "RCU Room Control Solution",
        href: "/en/solutions/rcu-room-control-solution/",
      },
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
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
      { title: "Middle East", href: "/en/regions/middle-east/" },
      { title: "Saudi Arabia", href: "/en/regions/saudi-arabia/" },
    ],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Use public catalogs for early selection and request project documents after product confirmation.",
      },
    ],
    cta: {
      title: "Request a hotel RCU quotation",
      body: "Share your room quantity, room functions, voltage, protocol preference, product interests, and document needs. We can help review the RCU direction and prepare a focused quotation.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to request a hotel RCU buying quotation.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "smart-hotel-room-control-system-guide",
    title: "Smart Hotel Room Control System Guide for B2B Buyers",
    h1: "Smart Hotel Room Control System Guide",
    seoTitle: "Smart Hotel Room Control System Guide for B2B Buyers",
    metaDescription:
      "Plan smart hotel room control systems with RCU, panels, sensors, HVAC, curtains, room status, and B2B quotation considerations for hotel projects.",
    summary:
      "A practical guide for planning smart hotel room control systems across guest experience, device selection, integration, and quotation preparation.",
    category: "Guide",
    topic: "Room control system",
    listingGroup: "Hotel Automation Guides",
    featuredPriority: 2,
    readingTime: "8 min read",
    primaryKeyword: "smart hotel room control system",
    secondaryKeywords: [
      "hotel guest room control system",
      "smart hotel automation system",
      "hotel room automation devices",
      "B2B hotel control system",
    ],
    audience: [
      "Hotel owner",
      "Contractor",
      "System integrator",
      "Distributor",
    ],
    lastReviewed: "2026-07-09",
    sections: [
      {
        id: "system-overview",
        heading: "What a Smart Hotel Room Control System Includes",
        body: [
          "A smart hotel room control system can coordinate lighting, curtains, HVAC, power, room status, door status, sensing, and selected service functions inside the guest room.",
          "The system may use an RCU host or cabinet as the coordination layer, with visible smart panels and sensors supporting guest control and hotel operation workflows.",
        ],
      },
      {
        id: "buyer-objectives",
        heading: "Define Buyer Objectives Before Product Selection",
        body: [
          "Hotel owners may focus on guest comfort, room consistency, and maintenance practicality. Contractors often need a clear BOQ, wiring logic, and product availability. System integrators need device compatibility and installation details.",
          "The same product list may not fit every project, so the control scope should be built around room type, target functions, market requirements, and project budget planning.",
        ],
      },
      {
        id: "key-devices",
        heading: "Key Devices in a Guest Room Control Package",
        body: [
          "Common devices include RCU hosts, smart switch panels, AI control displays, thermostat panels, curtain panels, key card energy savers, doorbells, SOS panels, sensors, sockets, and room status panels.",
          "Each device should be checked for installation position, voltage, wiring, protocol needs, appearance, and whether documents are required for project approval.",
        ],
      },
      {
        id: "integration-planning",
        heading: "Integration and Wiring Planning",
        body: [
          "Integration planning should confirm how room devices communicate, how the control logic is grouped, and which functions must be reviewed with the contractor or integrator before installation.",
          "Early wiring and protocol review reduces rework when panels, sensors, HVAC control, curtain control, and room status devices are added to the project list.",
        ],
      },
      {
        id: "procurement-questions",
        heading: "Procurement Questions for B2B Buyers",
        body: [
          "Before requesting a quote, buyers should prepare room quantity, room type, device list, product finish, voltage, protocol preference, and target lead time.",
          "If OEM/ODM customization is needed, confirm logo, button icons, panel material, color, packaging, sample review, and document expectations by product series.",
        ],
      },
      {
        id: "faq-style-questions",
        heading: "Common Buyer Questions",
        body: [
          "Can the system support a full room package or only selected devices? Which documents can be reviewed for the chosen product list? Does the panel finish need to match an interior design requirement?",
          "These questions are best answered after the room functions and target product series are confirmed, because the right answer depends on the project scope.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
      },
      {
        title: "RCU Room Control Solution",
        href: "/en/solutions/rcu-room-control-solution/",
      },
    ],
    relatedProducts: [
      {
        title: "86 Type AI Smart Control Display",
        href: "/en/products/86-type-ai-smart-control-display/",
      },
      {
        title: "Thermostat HVAC Control Panel",
        href: "/en/products/thermostat-hvac-control-panel/",
      },
      {
        title: "Smart Four Key Curtain Control Panel",
        href: "/en/products/smart-four-key-curtain-control-panel/",
      },
      {
        title: "Embedded Human Presence Sensor",
        href: "/en/products/embedded-human-presence-sensor/",
      },
    ],
    relatedRegions: [
      { title: "Middle East", href: "/en/regions/middle-east/" },
      { title: "Southeast Asia", href: "/en/regions/southeast-asia/" },
    ],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Review catalogs for early device selection and request project documents when product scope is clear.",
      },
    ],
    cta: {
      title: "Plan a smart hotel room control package",
      body: "Send your room type, device interests, quantity, voltage, protocol preference, and project market. We can review product selection and quotation direction with your team.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to discuss a smart hotel room control system project.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "hotel-smart-switch-panel-guide",
    title: "Hotel Smart Switch Panel Guide for Project Buyers",
    h1: "Hotel Smart Switch Panel Guide",
    seoTitle: "Hotel Smart Switch Panel Guide for B2B Projects",
    metaDescription:
      "Choose hotel smart switch panels for B2B projects by comparing functions, finish, button layout, wiring, room scenarios, OEM/ODM needs, and quote details.",
    summary:
      "A focused guide to smart switch panel selection for hotel rooms, including appearance, functions, wiring review, OEM/ODM needs, and inquiry preparation.",
    category: "Guide",
    topic: "Smart panels",
    listingGroup: "Buying Guides",
    readingTime: "7 min read",
    primaryKeyword: "hotel smart switch panel",
    secondaryKeywords: [
      "hotel smart wall switch",
      "smart hotel control panel",
      "OEM smart switch panel",
      "hotel room switch panel supplier",
    ],
    audience: [
      "Hotel owner",
      "Contractor",
      "Distributor",
      "OEM/ODM buyer",
      "System integrator",
    ],
    lastReviewed: "2026-07-09",
    sections: [
      {
        id: "panel-role",
        heading: "The Role of Smart Switch Panels in Hotel Rooms",
        body: [
          "Smart switch panels are the guest-facing control points for lighting, scenes, curtains, service functions, and selected room automation workflows.",
          "For B2B projects, panels need to match both the electrical system and the interior design direction, so appearance and wiring should be reviewed together.",
        ],
      },
      {
        id: "function-selection",
        heading: "Choose Functions by Room Scenario",
        body: [
          "A standard room may need lighting, master control, DND/MUR, curtain, and power functions. Suites or serviced apartments may need more scene control and multi-zone combinations.",
          "The panel function list should be confirmed before selecting button quantity, icons, backlight behavior, finish, and communication method.",
        ],
      },
      {
        id: "appearance-material",
        heading: "Compare Finish, Material, and Layout",
        body: [
          "Hotel projects often compare brushed aluminum, matte, glass-like, or series-based panel appearances to match room design and brand standards.",
          "OEM/ODM buyers should confirm logo requirements, icon language, button layout, color, packaging, and sample expectations early in the discussion.",
        ],
      },
      {
        id: "wiring-compatibility",
        heading: "Review Wiring and Compatibility",
        body: [
          "Before ordering, confirm voltage, load requirements, wiring method, back box size, protocol preference, and whether the panel connects to an RCU or works as part of another control structure.",
          "Compatibility should be checked by project. A panel suitable for one room design may still need review before it is used in another market or installation environment.",
        ],
      },
      {
        id: "product-relevance",
        heading: "Relevant Product Categories",
        body: [
          "Common related products include single-key and multi-key smart panels, scene panels, curtain panels, thermostat panels, sockets, key card energy saver panels, and room status panels.",
          "A distributor may build a panel series for a target market, while a contractor may need a room-by-room product list for a specific hotel project.",
        ],
      },
      {
        id: "buyer-questions",
        heading: "Buyer Questions for Smart Panel Projects",
        body: [
          "What functions must each button control? Is the panel part of an RCU system? Which finish and icon style are required? Are samples or OEM/ODM documents needed?",
          "Answering these questions before quotation helps reduce mismatch between design expectation, installation logic, and final product selection.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
      },
      {
        title: "OEM/ODM Custom Panel Solution",
        href: "/en/solutions/oem-odm-custom-panel-solution/",
      },
    ],
    relatedProducts: [
      {
        title: "Smart Single Key Switch Panel",
        href: "/en/products/smart-single-key-switch-panel/",
      },
      {
        title: "Smart Four Key Scene Control Panel",
        href: "/en/products/smart-four-key-scene-control-panel/",
      },
      {
        title: "Vintage Gold Four Key Smart Switch Panel",
        href: "/en/products/vintage-gold-four-key-smart-switch-panel/",
      },
      {
        title: "Borui Red Matte Room Status Four Key Switch Panel",
        href: "/en/products/borui-red-matte-room-status-four-key-switch-panel/",
      },
    ],
    relatedRegions: [
      { title: "Middle East", href: "/en/regions/middle-east/" },
    ],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Use catalogs for panel series review and request project documents after product selection.",
      },
    ],
    cta: {
      title: "Select hotel smart switch panels for your project",
      body: "Share the room functions, panel finish, quantity, voltage, wiring needs, and OEM/ODM requirements. We can review suitable panel series and quote details.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to choose hotel smart switch panels for a project.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "oem-odm-smart-panel-customization-guide",
    title: "OEM/ODM Smart Panel Customization Guide for B2B Buyers",
    h1: "OEM/ODM Smart Panel Customization Guide",
    seoTitle: "OEM/ODM Smart Panel Customization Guide",
    metaDescription:
      "Plan OEM/ODM smart panel customization for hotel and smart home buyers, including logo, layout, finish, packaging, documents, samples, and quotation needs.",
    summary:
      "A customization planning guide for distributors and OEM/ODM buyers evaluating smart panel appearance, functions, documents, samples, and project requirements.",
    category: "Guide",
    topic: "OEM/ODM customization",
    listingGroup: "OEM/ODM Guides",
    featuredPriority: 3,
    readingTime: "7 min read",
    primaryKeyword: "OEM ODM smart panel customization",
    secondaryKeywords: [
      "custom smart switch panel",
      "private label smart panel",
      "OEM hotel control panel",
      "ODM smart home panel",
    ],
    audience: ["OEM/ODM buyer", "Distributor", "Contractor", "Hotel owner"],
    lastReviewed: "2026-07-09",
    sections: [
      {
        id: "customization-scope",
        heading: "Define the Customization Scope",
        body: [
          "OEM/ODM smart panel customization can involve logo, button icons, button layout, color, surface finish, packaging, documentation, and product series selection.",
          "The available options depend on product series and project requirements, so buyers should confirm whether they need minor branding changes or a deeper product configuration review.",
        ],
      },
      {
        id: "buyer-use-cases",
        heading: "Typical B2B Customization Use Cases",
        body: [
          "Distributors may need a consistent panel line for a target market. Hotel project buyers may need panel appearance and button functions to match guest room design.",
          "Contractors and integrators may request customized labels or layouts only when the room control logic has been confirmed.",
        ],
      },
      {
        id: "technical-confirmation",
        heading: "Technical Details to Confirm",
        body: [
          "Buyers should confirm voltage, wiring method, protocol preference, function list, back box requirements, connected room devices, and whether the panel is used with an RCU.",
          "Technical confirmation should happen before logo and packaging review, because electrical and control requirements determine which product series can be considered.",
        ],
      },
      {
        id: "sample-document-review",
        heading: "Sample and Document Review",
        body: [
          "Samples may be useful for appearance, touch feel, function, wiring, and internal approval. Document needs may include catalogs, datasheets, wiring diagrams, and available certificate copies by product request.",
          "For custom requirements, lead time and sample scope should be confirmed by product series, order quantity, and customization details.",
        ],
      },
      {
        id: "quotation-requirements",
        heading: "Information Needed for an OEM/ODM Quotation",
        body: [
          "Prepare target product categories, expected quantity, market, logo needs, panel finish, button layout, packaging requirements, document needs, and target schedule.",
          "Regular products have no fixed MOQ, while customization requests may require project-specific review depending on the product series and requested changes.",
        ],
      },
      {
        id: "buyer-questions",
        heading: "Buyer Questions Before Customization",
        body: [
          "Is the request a standard product with logo, a panel layout adjustment, or a broader OEM/ODM configuration? Which functions and room devices must the panel control?",
          "Clarifying these questions helps the supplier recommend the right product series and avoid quoting a custom requirement that has not yet been technically defined.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "OEM/ODM Custom Panel Solution",
        href: "/en/solutions/oem-odm-custom-panel-solution/",
      },
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
      },
    ],
    relatedProducts: [
      {
        title: "Vintage Gold Four Key Smart Switch Panel",
        href: "/en/products/vintage-gold-four-key-smart-switch-panel/",
      },
      {
        title: "Smart Four Key Scene Control Panel",
        href: "/en/products/smart-four-key-scene-control-panel/",
      },
      {
        title: "Brushed Aluminum 86 Base Doorbell Panel",
        href: "/en/products/brushed-aluminum-86-base-doorbell-panel/",
      },
      {
        title: "Smart Series Dual Vertical Socket Panel",
        href: "/en/products/smart-series-dual-vertical-socket-panel/",
      },
    ],
    relatedRegions: [
      { title: "Southeast Asia", href: "/en/regions/southeast-asia/" },
      { title: "Middle East", href: "/en/regions/middle-east/" },
    ],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Review public catalogs first, then request customization documents after product series confirmation.",
      },
    ],
    cta: {
      title: "Discuss an OEM/ODM smart panel request",
      body: "Send your target product series, logo needs, finish, button layout, quantity, market, and document requirements. We can review customization feasibility by product and project.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to discuss OEM/ODM smart panel customization.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "hotel-guest-room-automation-guide",
    title: "Hotel Guest Room Automation Guide for Project Planning",
    h1: "Hotel Guest Room Automation Guide",
    seoTitle: "Hotel Guest Room Automation Guide for B2B Projects",
    metaDescription:
      "Plan hotel guest room automation with lighting, HVAC, curtains, sensors, room status, RCU control, smart panels, documents, and B2B quotation steps.",
    summary:
      "A project planning guide for hotel guest room automation, covering control functions, devices, application scenarios, documents, and inquiry preparation.",
    category: "Guide",
    topic: "Guest room automation",
    listingGroup: "Hotel Automation Guides",
    readingTime: "8 min read",
    primaryKeyword: "hotel guest room automation",
    secondaryKeywords: [
      "hotel room automation system",
      "smart hotel guest room",
      "guest room control automation",
      "hotel automation products",
    ],
    audience: [
      "Hotel owner",
      "Contractor",
      "System integrator",
      "Distributor",
    ],
    lastReviewed: "2026-07-09",
    sections: [
      {
        id: "automation-scope",
        heading: "What Guest Room Automation Can Cover",
        body: [
          "Hotel guest room automation can include lighting scenes, curtain control, HVAC control, key card power, occupancy sensing, door status, room status indicators, SOS, doorbell, and selected service workflows.",
          "The right scope depends on the hotel category, guest room type, renovation or new-build status, and how the owner wants to balance guest experience with installation practicality.",
        ],
      },
      {
        id: "device-planning",
        heading: "Plan Devices Around the Room Workflow",
        body: [
          "Start with the guest journey: entry, welcome lighting, room power, temperature control, curtain control, service status, sleep mode, and checkout or housekeeping status.",
          "Then map the required devices, such as smart panels, RCU host, thermostat panel, curtain panel, sensors, sockets, doorbell, and room status panel.",
        ],
      },
      {
        id: "project-scenarios",
        heading: "Application Scenarios",
        body: [
          "New hotel projects can plan RCU, panels, sensors, HVAC, and room status devices together from the beginning. Renovation projects may focus on selected controls and panel upgrades.",
          "Serviced apartments, villas, and boutique hotels may use different device combinations, especially when room layouts and guest control expectations vary.",
        ],
      },
      {
        id: "integration-documents",
        heading: "Integration and Document Requirements",
        body: [
          "Contractors and integrators should confirm wiring, voltage, protocol preference, device placement, and room control logic before finalizing the product list.",
          "Datasheets, wiring diagrams, catalogs, and available certificate copies can be reviewed by product and project request after the automation scope is clear.",
        ],
      },
      {
        id: "procurement-steps",
        heading: "Procurement Steps for B2B Buyers",
        body: [
          "Prepare room quantity, room types, function list, target market, voltage, product interests, required documents, and whether samples or OEM/ODM customization are needed.",
          "A clear inquiry helps the supplier recommend a practical product mix and reduces back-and-forth before quotation.",
        ],
      },
      {
        id: "buyer-questions",
        heading: "Common Buyer Questions",
        body: [
          "Does the project need a complete room automation package or selected devices? Are panels required to match a specific interior finish? Is the system expected to connect through an RCU?",
          "These questions should be answered before ordering, because they affect product selection, wiring review, documents, quotation, and lead time.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
      },
      {
        title: "RCU Room Control Solution",
        href: "/en/solutions/rcu-room-control-solution/",
      },
    ],
    relatedProducts: [
      {
        title: "86 Type AI Smart Control Display",
        href: "/en/products/86-type-ai-smart-control-display/",
      },
      {
        title: "Smart Key Card Energy Saver Panel",
        href: "/en/products/smart-key-card-energy-saver-panel/",
      },
      {
        title: "Hotel Room Door Magnetic Sensor",
        href: "/en/products/hotel-room-door-magnetic-sensor/",
      },
      {
        title: "Hotel Guest Room Doorbell",
        href: "/en/products/hotel-guest-room-doorbell/",
      },
    ],
    relatedRegions: [
      { title: "Middle East", href: "/en/regions/middle-east/" },
      { title: "Vietnam", href: "/en/regions/vietnam/" },
    ],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Use public catalogs for early product review and request detailed documents when the room scope is defined.",
      },
    ],
    cta: {
      title: "Plan a guest room automation quotation",
      body: "Share your room type, automation functions, quantity, voltage, product interests, and project documents. We can review the product mix and quotation direction.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to plan a hotel guest room automation project.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
];

export const resourceSlugs = resources.map((resource) => resource.slug);

export function getResourceBySlug(slug: string): ResourceGuide | undefined {
  return resources.find((resource) => resource.slug === slug);
}

export type ResourceLink = {
  title: string;
  href: string;
  description?: string;
};

export type ResourceSection = {
  id: string;
  heading: string;
  body: string[];
  subsections?: Array<{
    id: string;
    heading: string;
    body: string[];
  }>;
  relatedLinks?: ResourceLink[];
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
  conversion?: {
    midCtaAfterSectionId: string;
    continueReadingSlugs: string[];
  };
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
    slug: "hotel-rcu-wiring-system-architecture-guide",
    title: "Hotel RCU Wiring and System Architecture Guide",
    h1: "Hotel RCU Wiring and System Architecture Guide",
    seoTitle: "Hotel RCU Wiring and System Architecture Guide",
    metaDescription:
      "Plan hotel RCU architecture, room devices, strong- and weak-current wiring, integration points, and the documents needed for a qualified project review.",
    summary:
      "A project-planning guide to RCU architecture, room-level devices, wiring responsibilities, integration boundaries, and the information buyers should prepare before engineering review.",
    category: "Guide",
    topic: "RCU wiring and architecture",
    listingGroup: "Technical Resources",
    readingTime: "12 min read",
    primaryKeyword: "hotel RCU wiring system architecture",
    secondaryKeywords: [
      "hotel room control wiring",
      "RCU system architecture",
      "guest room control diagram planning",
      "hotel room automation wiring",
    ],
    audience: ["Hotel owner", "Contractor", "System integrator", "Project buyer"],
    lastReviewed: "2026-07-15",
    sections: [
      {
        id: "what-an-rcu-does",
        heading: "What an RCU Does in a Hotel Guest Room",
        body: [
          "A room control unit coordinates selected electrical loads, guest interfaces, sensors, and service-status devices within a hotel room. It can provide a common control point for lighting circuits, curtains, HVAC interfaces, key-card power logic, door status, and room-service indications, depending on the approved project design and the capabilities of the selected products.",
          "For buyers, an RCU should be evaluated as part of a room architecture rather than as an isolated box. The required inputs, outputs, panel connections, power arrangement, and integration scope all depend on the room type and control schedule. A standard room, suite, and serviced apartment can require different circuit counts and user interfaces even within one property.",
          "The RCU does not replace engineering design, protective devices, or local electrical requirements. It provides a control layer whose exact voltage, load, cable, enclosure, and installation details must be confirmed by qualified electrical and low-voltage professionals for the project location.",
        ],
        relatedLinks: [
          {
            title: "Hotel RCU Buying Guide",
            href: "/en/resources/hotel-rcu-buying-guide/",
          },
        ],
      },
      {
        id: "main-components",
        heading: "Main Components in an RCU-Based Room Control System",
        body: [
          "An RCU-based room normally combines control hardware with guest-facing and sensing devices. The hardware may include an RCU host or controller cabinet, while the visible layer may include scene switches, curtain panels, thermostats, key-card energy saver panels, sockets, doorbells, and room-status displays. Door contacts and presence sensors can provide status inputs for approved room logic.",
          "The device list should follow the room function schedule. Buyers should identify which loads are directly switched, which devices exchange control signals, which interfaces are only status indicators, and which functions belong to another system. This separation helps prevent duplicate hardware and clarifies responsibilities between electrical, HVAC, lock, network, and hotel-management contractors.",
          "Product families should also be reviewed as a coordinated set. Panel finish, back-box requirements, power supply, wiring topology, labeling, and documentation can affect installation consistency across hundreds of rooms. A visually matched panel series is useful only when its electrical and control interfaces also fit the project architecture.",
        ],
      },
      {
        id: "typical-architecture",
        heading: "Typical Hotel Room Control Architecture",
        body: [
          "A practical architecture can be understood as several layers: room-level devices, the RCU or control host, the hotel network or management layer, and optional third-party integration. Not every project uses every layer, and the approved interface should be documented before procurement.",
        ],
        subsections: [
          {
            id: "room-level-devices",
            heading: "Room-Level Devices",
            body: [
              "Room-level devices include switches, displays, thermostats, curtain controls, door contacts, occupancy sensors, doorbells, and status indicators. Some send commands, some report conditions, and others control loads. The wiring schedule should state the role of each device rather than relying on a product name alone.",
            ],
          },
          {
            id: "rcu-control-host",
            heading: "RCU or Control Host",
            body: [
              "The RCU receives selected inputs and applies the programmed room logic to outputs or connected devices. Input and output capacity, expansion method, power requirements, and supported interfaces must be checked against verified product documentation; they should never be inferred from another model in the same category.",
            ],
          },
          {
            id: "hotel-network-platform",
            heading: "Hotel Network or Management Platform",
            body: [
              "Where a management platform is included, the project must define which room events or commands are exchanged, how rooms are addressed, and who supplies the network and commissioning scope. A standalone room-control package and a centrally monitored system have different infrastructure and testing requirements.",
            ],
          },
          {
            id: "pms-third-party-integration",
            heading: "PMS or Third-Party Integration",
            body: [
              "PMS, lock, HVAC, or other third-party integration is project-specific. Buyers should request an interface statement identifying the verified protocol, gateway, data points, and responsible parties. No direct compatibility should be assumed without confirmation from all involved system vendors.",
            ],
          },
        ],
      },
      {
        id: "strong-and-weak-current",
        heading: "Strong-Current and Weak-Current Wiring",
        body: [
          "Hotel room control projects often bring strong-current load wiring and weak-current control or communication wiring into the same coordination process. The two have different safety, routing, segregation, termination, and testing requirements. Drawings should clearly distinguish load circuits, power supplies, dry-contact or sensor inputs, communication buses, and network links.",
          "The RCU cabinet location must allow safe installation, inspection, heat management, and future maintenance. Cable routes and enclosure design should be developed by the project electrical team in accordance with applicable standards. This guide does not provide field wiring instructions, terminal numbers, conductor sizes, breaker ratings, or commissioning procedures.",
          "Before purchasing, ask for verified datasheets and project-relevant wiring references for the exact model. Specific voltage, frequency, load type, circuit capacity, protection, and earthing requirements must be reviewed by a qualified electrical engineer. A generic diagram is not a substitute for approved construction documentation.",
        ],
      },
      {
        id: "typical-wiring-relationships",
        heading: "Typical Wiring Relationships",
        body: [
          "A wiring relationship describes how device groups interact, not how an installer should terminate a specific product. The room schedule should connect each guest function to a device, control point, load, and responsible system.",
        ],
        subsections: [
          {
            id: "lighting-circuits",
            heading: "Lighting Circuits",
            body: [
              "Lighting may be divided by room zone and scene requirement. The design team should confirm circuit quantity, load characteristics, dimming requirements where applicable, and which panels or automation conditions can command each circuit.",
            ],
          },
          {
            id: "curtain-motors",
            heading: "Curtain Motors",
            body: [
              "Curtain control requires confirmation of motor type, direction logic, power arrangement, local panel commands, and any scene behavior. Motor compatibility and interlocking must be verified from the selected equipment documentation.",
            ],
          },
          {
            id: "hvac-thermostat-control",
            heading: "HVAC and Thermostat Control",
            body: [
              "The thermostat may control or interface with fan-coil or other HVAC equipment according to the mechanical design. Fan speeds, valve type, operating voltage, occupancy logic, and third-party boundaries should be agreed with the HVAC supplier before quotation.",
            ],
          },
          {
            id: "door-and-occupancy-inputs",
            heading: "Door Contacts and Occupancy Sensors",
            body: [
              "Door contacts and occupancy or presence sensors provide different information. Their signals can support room logic only when installation position, detection method, timing, and false-trigger handling have been designed for the use case.",
            ],
          },
          {
            id: "doorplates-room-displays",
            heading: "Doorplates and Room Displays",
            body: [
              "Door-side devices may present room number, doorbell, DND, MUR, or other configured status. The project should define which status originates inside the room, which is displayed outside, and whether any hotel platform receives the same event.",
            ],
          },
        ],
      },
      {
        id: "centralized-vs-distributed",
        heading: "Centralized vs Distributed Control Architecture",
        body: [
          "A centralized room architecture places more input and output coordination at one RCU or cabinet. It can simplify the conceptual control point and make room logic easier to document, but it may require more home-run wiring and careful cabinet planning. The effect depends on room layout and the selected hardware.",
          "A distributed architecture places more intelligence or switching closer to individual panels or loads. It may reduce some cable runs or offer modular expansion, while increasing the number of powered or addressed devices. Maintenance strategy, replacement access, programming responsibility, and network dependence should be considered alongside installation cost.",
          "Neither architecture is universally better. New construction, renovation constraints, room repetition, contractor capability, spare strategy, commissioning tools, and integration requirements should guide the decision. Buyers should compare complete architecture proposals rather than controller prices alone.",
        ],
      },
      {
        id: "information-before-design",
        heading: "Information Required Before Wiring Design",
        body: [
          "Prepare architectural room plans, reflected ceiling plans, electrical load schedules, room-type quantities, panel locations, HVAC interface information, curtain requirements, and door-device expectations. A room function matrix should show what the guest, housekeeping team, and management system need to control or observe.",
          "The supplier also needs the project country, voltage and frequency, preferred back-box standard, finish requirements, protocol or integration expectations, and required documentation. If a protocol has not been selected, describe the required outcome instead of naming an interface that may not be necessary or supported.",
          "Identify the approval path: who reviews samples, who issues coordinated drawings, who confirms the software points list, and who commissions each interface. Clear ownership is as important as the device list because many wiring problems originate at the boundary between trades.",
        ],
      },
      {
        id: "common-wiring-mistakes",
        heading: "Common RCU Wiring Mistakes",
        body: [
          "Common early mistakes include selecting an RCU before counting room loads, treating sensor wiring as interchangeable, assuming a panel supports an unverified protocol, and omitting power supplies or gateways from the scope. Another risk is using one typical room drawing without documenting suite and accessible-room variations.",
          "Projects also run into trouble when strong- and weak-current responsibilities are unclear, cabinet space is insufficient, back boxes do not match panels, or HVAC and curtain interfaces are confirmed too late. These issues can create redesign, procurement delays, and inconsistent installation even when the individual products are suitable.",
          "A disciplined review should compare the BOQ, room function schedule, wiring drawings, product datasheets, and interface matrix before orders are released. Any discrepancy should be resolved by the responsible engineers and suppliers rather than improvised on site.",
        ],
      },
      {
        id: "supplier-questions-checklist",
        heading: "Questions to Ask an RCU Supplier and Project Planning Checklist",
        body: [
          "Ask which exact models match the room I/O schedule, what verified wiring and installation documents are available, which interfaces are supported by those models, and what information is required for integration review. Confirm sample availability, labeling, panel finish, replacement strategy, lead time, and the division between hardware supply and commissioning support.",
          "Before quotation, check that every room type has a function list, device schedule, voltage requirement, panel and sensor locations, HVAC and curtain interface notes, door-status logic, and expected management-system scope. Mark all assumptions so they can be reviewed rather than silently becoming procurement requirements.",
          "Finally, submit drawings, room quantities, the proposed BOQ, and document needs with the inquiry. DualCoreLink can support product selection and document review by project request, while final circuit design and site execution remain the responsibility of qualified project professionals.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "RCU Room Control Solution",
        href: "/en/solutions/rcu-room-control-solution/",
        description:
          "Coordinate RCU hosts, controller cabinets, sensors, panels, and room devices within a defined control architecture.",
      },
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Plan guest room lighting, HVAC, curtains, status, sensing, and power workflows as one project scope.",
      },
    ],
    relatedProducts: [
      {
        title: "RCU Controller Cabinet",
        href: "/en/products/rcu-controller-cabinet/",
        description:
          "Strong-current control cabinet for coordinated circuit and RCU architecture review.",
      },
      {
        title: "Hotel Smart Room RCU Host 1",
        href: "/en/products/hotel-smart-room-rcu-host-1/",
        description:
          "Room control host option for matching inputs, outputs, and connected hotel room devices.",
      },
      {
        title: "Thermostat HVAC Control Panel",
        href: "/en/products/thermostat-hvac-control-panel/",
        description:
          "Guest room thermostat interface for HVAC coordination and room control planning.",
      },
      {
        title: "Hotel Room Door Magnetic Sensor",
        href: "/en/products/hotel-room-door-magnetic-sensor/",
        description:
          "Door-status input device for approved occupancy and room automation logic.",
      },
    ],
    relatedRegions: [{ title: "Middle East", href: "/en/regions/middle-east/" }],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Review public catalogs and request model-specific datasheets or wiring references after the room scope is defined.",
      },
    ],
    conversion: {
      midCtaAfterSectionId: "typical-wiring-relationships",
      continueReadingSlugs: [
        "hotel-rcu-buying-guide",
        "smart-hotel-room-control-system-guide",
        "hotel-guest-room-automation-guide",
      ],
    },
    cta: {
      title: "Review an RCU architecture for your hotel project",
      body: "Share room plans, room quantities, a function schedule, voltage, device interests, and integration requirements. We can review suitable products and project document needs before quotation.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to review an RCU wiring and system architecture for a hotel project.",
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
        description:
          "Coordinate the RCU host, cabinet, sensors, panels, and room devices as one project package.",
      },
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Plan lighting, HVAC, curtains, room status, sensing, and power workflows around the guest room.",
      },
    ],
    relatedProducts: [
      {
        title: "RCU Controller Cabinet",
        href: "/en/products/rcu-controller-cabinet/",
        description:
          "Strong-current control cabinet for organizing guest room circuits and RCU project wiring.",
      },
      {
        title: "Hotel Smart Room RCU Host 1",
        href: "/en/products/hotel-smart-room-rcu-host-1/",
        description:
          "Room control host option for coordinating connected hotel room devices.",
      },
      {
        title: "Smart Four Key Scene Control Panel",
        href: "/en/products/smart-four-key-scene-control-panel/",
        description:
          "Guest-facing scene panel for common room control functions and layout planning.",
      },
      {
        title: "Embedded Human Presence Sensor",
        href: "/en/products/embedded-human-presence-sensor/",
        description:
          "Occupancy sensing option for room-status and automation logic review.",
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
    conversion: {
      midCtaAfterSectionId: "compare-rcu-products",
      continueReadingSlugs: [
        "smart-hotel-room-control-system-guide",
        "hotel-guest-room-automation-guide",
        "hotel-rcu-wiring-system-architecture-guide",
      ],
    },
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
        description:
          "Combine lighting, HVAC, curtains, room status, sensing, and power controls for guest rooms.",
      },
      {
        title: "RCU Room Control Solution",
        href: "/en/solutions/rcu-room-control-solution/",
        description:
          "Review the RCU layer and connected room devices as a coordinated system package.",
      },
    ],
    relatedProducts: [
      {
        title: "86 Type AI Smart Control Display",
        href: "/en/products/86-type-ai-smart-control-display/",
        description:
          "Room control interface for consolidating selected guest-facing control functions.",
      },
      {
        title: "Thermostat HVAC Control Panel",
        href: "/en/products/thermostat-hvac-control-panel/",
        description:
          "Dedicated interface for guest room temperature and HVAC control planning.",
      },
      {
        title: "Smart Four Key Curtain Control Panel",
        href: "/en/products/smart-four-key-curtain-control-panel/",
        description:
          "Curtain control panel for open, close, stop, and scene-related room workflows.",
      },
      {
        title: "Embedded Human Presence Sensor",
        href: "/en/products/embedded-human-presence-sensor/",
        description:
          "Occupancy sensing option for room automation and operational status logic.",
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
    conversion: {
      midCtaAfterSectionId: "key-devices",
      continueReadingSlugs: [
        "hotel-rcu-buying-guide",
        "hotel-rcu-wiring-system-architecture-guide",
        "hotel-room-control-system-cost-factors",
      ],
    },
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
        description:
          "Plan guest-facing panels together with lighting, HVAC, curtain, status, and room power functions.",
      },
      {
        title: "OEM/ODM Custom Panel Solution",
        href: "/en/solutions/oem-odm-custom-panel-solution/",
        description:
          "Review panel appearance, labeling, product mix, and private-label requirements by project.",
      },
    ],
    relatedProducts: [
      {
        title: "Smart Single Key Switch Panel",
        href: "/en/products/smart-single-key-switch-panel/",
        description:
          "Single-function smart panel for focused lighting or room control points.",
      },
      {
        title: "Smart Four Key Scene Control Panel",
        href: "/en/products/smart-four-key-scene-control-panel/",
        description:
          "Multi-key scene panel for common hotel room control combinations.",
      },
      {
        title: "Smart Four Key Curtain Control Panel",
        href: "/en/products/smart-four-key-curtain-control-panel/",
        description:
          "Dedicated curtain panel for guest room opening, closing, and stop functions.",
      },
      {
        title: "Thermostat HVAC Control Panel",
        href: "/en/products/thermostat-hvac-control-panel/",
        description:
          "Temperature control panel for coordinating room comfort and HVAC requirements.",
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
    conversion: {
      midCtaAfterSectionId: "appearance-material",
      continueReadingSlugs: [
        "oem-odm-smart-panel-customization-guide",
        "hotel-doorplate-room-display-buying-guide",
        "smart-hotel-room-control-system-guide",
      ],
    },
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
        description:
          "Evaluate appearance, labeling, product mix, packaging, and private-label needs for B2B programs.",
      },
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Keep custom panel decisions aligned with the full guest room control scope and device list.",
      },
    ],
    relatedProducts: [
      {
        title: "Vintage Gold Four Key Smart Switch Panel",
        href: "/en/products/vintage-gold-four-key-smart-switch-panel/",
        description:
          "Panel series example for reviewing finish, color, icons, and key layout requirements.",
      },
      {
        title: "Borui Red Matte Room Status Four Key Switch Panel",
        href: "/en/products/borui-red-matte-room-status-four-key-switch-panel/",
        description:
          "Room status panel example for comparing matte finishes and labeled service functions.",
      },
      {
        title: "Brushed Aluminum 86 Base Doorbell Panel",
        href: "/en/products/brushed-aluminum-86-base-doorbell-panel/",
        description:
          "Brushed aluminum panel example for material, labeling, and hotel service review.",
      },
      {
        title: "Smart Series Dual Vertical Socket Panel",
        href: "/en/products/smart-series-dual-vertical-socket-panel/",
        description:
          "Smart Series socket panel for evaluating coordinated appearance across a room package.",
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
    conversion: {
      midCtaAfterSectionId: "technical-confirmation",
      continueReadingSlugs: [
        "hotel-doorplate-room-display-buying-guide",
        "smart-hotel-room-control-system-guide",
        "hotel-guest-room-automation-guide",
      ],
    },
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
        description:
          "Coordinate guest-facing controls, sensing, room status, HVAC, curtains, and power workflows.",
      },
      {
        title: "Smart Hotel Automation Solution",
        href: "/en/solutions/smart-hotel-automation-solution/",
        description:
          "Plan connected room and hotel automation requirements across devices and operational areas.",
      },
    ],
    relatedProducts: [
      {
        title: "Hotel Smart Room RCU Host 1",
        href: "/en/products/hotel-smart-room-rcu-host-1/",
        description:
          "Room control host option for coordinating connected automation devices.",
      },
      {
        title: "86 Type AI Smart Control Display",
        href: "/en/products/86-type-ai-smart-control-display/",
        description:
          "Guest-facing control interface for selected room scenes and device functions.",
      },
      {
        title: "Embedded Human Presence Sensor",
        href: "/en/products/embedded-human-presence-sensor/",
        description:
          "Occupancy sensing option for automation and room-status logic.",
      },
      {
        title: "Hotel Guest Room Doorbell",
        href: "/en/products/hotel-guest-room-doorbell/",
        description:
          "Guest room service device for door-side communication and arrival workflows.",
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
    conversion: {
      midCtaAfterSectionId: "project-scenarios",
      continueReadingSlugs: [
        "hotel-occupancy-sensor-selection-guide",
        "hotel-doorplate-room-display-buying-guide",
        "smart-hotel-room-control-system-guide",
      ],
    },
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
  {
    slug: "hotel-room-control-system-cost-factors",
    title: "Hotel Room Control System Cost Factors",
    h1: "Hotel Room Control System Cost Factors",
    seoTitle: "Hotel Room Control System Cost Factors",
    metaDescription:
      "Understand the hardware, integration, customization, installation, logistics, and project inputs that shape a hotel room control system quotation.",
    summary:
      "A procurement guide to the factors behind hotel room control system quotations, with a practical framework for comparing scope without relying on fixed per-room pricing.",
    category: "Guide",
    topic: "Room control cost planning",
    listingGroup: "Buying Guides",
    readingTime: "11 min read",
    primaryKeyword: "hotel room control system cost factors",
    secondaryKeywords: [
      "hotel room control system quotation",
      "hotel RCU project cost",
      "smart hotel system procurement",
      "guest room automation budget factors",
    ],
    audience: ["Hotel owner", "Contractor", "System integrator", "Project buyer"],
    lastReviewed: "2026-07-15",
    sections: [
      {
        id: "why-costs-vary",
        heading: "Why Hotel Room Control System Costs Vary",
        body: [
          "A hotel room control system is assembled around a project scope, so there is no responsible fixed cost that applies to every room. Room count, room types, controlled functions, wiring conditions, integration boundaries, panel design, market requirements, and installation responsibilities all change the quotation.",
          "Two projects with the same number of rooms can require very different equipment. One may use a basic RCU, lighting panels, and a thermostat; another may add curtain control, presence detection, door status, service displays, central software, and customized finishes. Renovation constraints can also change labor and interface requirements even when hardware is similar.",
          "Buyers should therefore compare a defined bill of quantities and responsibility matrix rather than headline per-room figures. The goal is to establish what is included, what is excluded, and which assumptions must be validated before a supplier quotation can support a procurement decision.",
        ],
      },
      {
        id: "main-cost-categories",
        heading: "Main Cost Categories",
        body: [
          "A complete review separates the quotation into hardware, software or integration, customization, project services, installation, and logistics. This makes supplier proposals easier to compare and reduces the chance that an essential item is hidden outside the initial equipment list.",
        ],
        subsections: [
          {
            id: "rcu-control-hardware-cost",
            heading: "RCU and Control Hardware",
            body: [
              "The control layer can include an RCU host, controller cabinet, I/O modules, power supplies, gateways, and required accessories. Capacity, circuit quantity, redundancy expectations, enclosure scope, and verified interface requirements affect the selected configuration.",
            ],
          },
          {
            id: "panels-thermostats-cost",
            heading: "Smart Panels and Thermostats",
            body: [
              "Panel quantity, function count, material, finish, icon layout, backlight, mounting format, and thermostat interface all influence the room package. Suites and multi-zone rooms usually need a different panel schedule from standard rooms.",
            ],
          },
          {
            id: "sensors-door-devices-cost",
            heading: "Sensors and Door Devices",
            body: [
              "Door contacts, occupancy or presence sensors, doorbells, and DND/MUR displays add both equipment and coordination scope. Their value depends on the approved room logic, installation position, and connection method rather than on device quantity alone.",
            ],
          },
          {
            id: "software-integration-cost",
            heading: "Software and Integration",
            body: [
              "Central monitoring, room management, PMS or third-party interfaces, gateways, licenses, data-point engineering, and commissioning can form a separate cost category. Compatibility and responsibility must be confirmed before these items are priced.",
            ],
          },
          {
            id: "installation-commissioning-cost",
            heading: "Installation and Commissioning",
            body: [
              "Cabling, containment, back boxes, cabinet installation, device termination, testing, programming, training, and site attendance may be supplied by different parties. A hardware-only quotation should not be mistaken for an installed and commissioned system price.",
            ],
          },
          {
            id: "customization-logistics-cost",
            heading: "OEM/ODM Customization, Logistics, and Support",
            body: [
              "Logo, icon layout, color, finish, packaging, samples, new tooling, documents, freight, duties, and delivery coordination can change the commercial scope. Existing-mold color changes and new-mold development should be identified separately because their review and cost conditions differ.",
            ],
          },
        ],
        relatedLinks: [
          {
            title: "OEM/ODM Smart Panel Customization Guide",
            href: "/en/resources/oem-odm-smart-panel-customization-guide/",
          },
        ],
      },
      {
        id: "project-cost-factors",
        heading: "Project Factors That Affect Cost",
        body: [
          "Room count affects production quantity and project services, but room-type variation is often equally important. A property with many suites, connecting rooms, and accessible rooms may need more engineering and a broader device schedule than a highly repetitive standard-room project.",
          "Required functions define the hardware and software scope. Lighting scenes, curtain motors, fan-coil control, sensing, door status, energy-saving logic, and central monitoring each introduce devices or interfaces. Buyers should separate required functions from optional future ideas so the initial quotation remains comparable.",
          "New construction generally allows the control architecture and cable routes to be coordinated early. Renovation projects may need to work with existing wiring, back boxes, loads, HVAC equipment, and operating-room constraints. A site survey and verified as-built information can be essential before the scope is finalized.",
        ],
        subsections: [
          {
            id: "standards-integration-factors",
            heading: "Local Standards and Integration Requirements",
            body: [
              "Voltage, frequency, electrical rules, required documents, approved materials, and integration expectations vary by market. The quotation should state which requirements have been confirmed and which remain subject to engineering review; compliance should never be assumed from a generic product category.",
            ],
          },
          {
            id: "finish-branding-factors",
            heading: "Custom Finish and Branding",
            body: [
              "Panel colors, materials, hotel or distributor logos, multilingual icons, packaging, and sample approvals can affect development work and production scheduling. Availability depends on the product series and the depth of customization requested.",
            ],
          },
        ],
      },
      {
        id: "hardware-vs-system-quotation",
        heading: "Hardware-Only vs Complete-System Quotations",
        body: [
          "A hardware-only quotation typically covers listed products and agreed accessories. It may exclude cables, containment, network equipment, installation, programming, integration engineering, travel, testing, and local approvals. Buyers should request a clear inclusions and exclusions section rather than infer these services from the phrase room control system.",
          "A complete-system proposal may include more design, software, commissioning, documentation, and coordination, but the exact boundary still varies. One supplier may provide room devices and configuration while a local integrator handles installation; another may include a broader engineering package through project partners.",
          "The comparison should normalize both proposals to the same room schedule and responsibility matrix. If a price difference comes from missing thermostats, gateways, commissioning, or custom panels, it is a scope difference rather than a true cost advantage.",
        ],
      },
      {
        id: "compare-quotations",
        heading: "How to Compare Supplier Quotations",
        body: [
          "Start with the same room-type quantities and function matrix for every bidder. Check model numbers, unit quantities, room allocation, accessories, voltage, finish, documentation, samples, warranty terms, packing, freight basis, and lead-time assumptions. Each line should be traceable to a requirement or clearly marked as optional.",
          "Review technical equivalence before comparing totals. An RCU with different capacity, a panel with a different material, or a sensor using a different detection method may not be interchangeable. Ask suppliers to identify deviations so the project team can decide whether they are acceptable.",
          "Separate one-time customization or tooling, recurring unit costs, project services, and logistics. This helps an OEM/ODM buyer understand what changes with order quantity and helps a contractor avoid carrying a development charge into every room without explanation.",
        ],
      },
      {
        id: "hidden-cost-risks",
        heading: "Common Hidden Cost Risks",
        body: [
          "Frequent omissions include gateways, power supplies, interface modules, back boxes, spare units, sample approval, revised artwork, software points, on-site commissioning, and integration support. Freight, duties, local testing, and installation materials may also sit outside the supplier price.",
          "Late design changes are another risk. Changing panel functions after artwork approval, adding room types, revising HVAC equipment, or introducing a new third-party interface can require new hardware, programming, documents, and testing. A controlled approval process reduces these changes.",
          "Unclear ownership can create duplicated or missing costs. The electrical contractor, low-voltage integrator, HVAC supplier, lock supplier, interior designer, and hotel IT team should each know what they provide and approve before orders are placed.",
        ],
      },
      {
        id: "quotation-information",
        heading: "Information Needed for an Accurate Quotation",
        body: [
          "Provide the project country, room count, room-type schedule, expected functions, drawings, voltage and frequency, panel locations, finish direction, thermostat and curtain requirements, sensor logic, door-device needs, and any verified integration requirement. A BOQ or room function matrix is more useful than a request for a generic per-room price.",
          "State whether the inquiry is for standard products, private labeling, or deeper OEM/ODM development. Regular products have no fixed MOQ. Custom products that require new tooling may involve a customization fee, while a color change using an existing mold does not incur a customization fee; both remain subject to product and project confirmation.",
          "Identify the desired sample and delivery schedule. Typical lead time is 7–15 days depending on product and order requirements, but customization, quantity, artwork approval, documents, and logistics can affect the final schedule. Delivery should not be treated as guaranteed until the order scope is confirmed.",
        ],
      },
      {
        id: "control-cost-reliability",
        heading: "How to Control Cost Without Reducing Reliability",
        body: [
          "Standardize room functions and panel layouts where the guest experience allows it. Reducing unnecessary room-type variations can simplify engineering, spare management, artwork, installation, and commissioning without removing essential functions.",
          "Use verified standard products for core functions and reserve customization for visible elements that support the project brand or workflow. Confirm interfaces early, specify suitable access for maintenance, and include practical spares instead of selecting hardware only by the lowest line-item price.",
          "A phased review can help: approve the architecture, confirm a typical room, validate samples and documents, then release the broader quantity. This approach does not guarantee savings, but it gives buyers better control over scope changes and quotation comparisons.",
        ],
      },
      {
        id: "cost-planning-checklist",
        heading: "Cost Planning Checklist for B2B Buyers",
        body: [
          "Confirm room quantities and variations, required and optional functions, hardware and service boundaries, customization depth, integration points, installation responsibilities, documents, samples, freight basis, and spare requirements. Request assumptions and exclusions in writing for every proposal.",
          "Do not rely on public fixed pricing, lowest-price claims, guaranteed ROI, or a promised energy-saving percentage. A useful quotation is one that can be checked against drawings, a device list, and an agreed responsibility matrix.",
          "Share the prepared scope with the supplier before asking for a final quotation. DualCoreLink can review product selection and document needs by project request, while local installation, standards, and commissioning conditions should be confirmed by the responsible project professionals.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Define the complete lighting, HVAC, curtain, sensing, status, and room-power package before comparing quotations.",
      },
      {
        title: "RCU Room Control Solution",
        href: "/en/solutions/rcu-room-control-solution/",
        description:
          "Review control hosts, cabinets, panels, and connected devices as one technical and commercial scope.",
      },
      {
        title: "OEM/ODM Custom Panel Solution",
        href: "/en/solutions/oem-odm-custom-panel-solution/",
        description:
          "Evaluate branding, finish, layout, samples, and tooling requirements separately from standard hardware.",
      },
    ],
    relatedProducts: [
      {
        title: "Hotel Smart Room RCU Host 1",
        href: "/en/products/hotel-smart-room-rcu-host-1/",
        description:
          "Representative room control host for reviewing the core hardware portion of a package.",
      },
      {
        title: "Smart Four Key Scene Control Panel",
        href: "/en/products/smart-four-key-scene-control-panel/",
        description:
          "Guest-facing scene panel that illustrates function, finish, and layout decisions.",
      },
      {
        title: "Thermostat HVAC Control Panel",
        href: "/en/products/thermostat-hvac-control-panel/",
        description:
          "HVAC control interface whose requirements depend on the mechanical system and room scope.",
      },
      {
        title: "Hotel Guest Room Doorbell",
        href: "/en/products/hotel-guest-room-doorbell/",
        description:
          "Door-side device representing service-status and room-entry equipment in the quotation.",
      },
    ],
    relatedRegions: [{ title: "Southeast Asia", href: "/en/regions/southeast-asia/" }],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Use current catalogs to prepare a comparable device list and request detailed documents by selected product.",
      },
    ],
    conversion: {
      midCtaAfterSectionId: "project-cost-factors",
      continueReadingSlugs: [
        "hotel-rcu-buying-guide",
        "oem-odm-smart-panel-customization-guide",
        "hotel-smart-switch-panel-guide",
      ],
    },
    cta: {
      title: "Prepare a scope-based room control quotation",
      body: "Send room quantities, required functions, drawings, voltage, product interests, customization scope, and service boundaries. We can review the device list and quotation inputs without publishing fixed project pricing.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to prepare a hotel room control system quotation based on my project scope.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "hotel-occupancy-sensor-selection-guide",
    title: "Hotel Occupancy Sensor Selection Guide",
    h1: "Hotel Occupancy Sensor Selection Guide",
    seoTitle: "Hotel Occupancy Sensor Selection Guide",
    metaDescription:
      "Compare hotel occupancy and presence sensor technologies, placement factors, room logic, RCU integration, and supplier questions for project selection.",
    summary:
      "A buyer-focused guide to selecting occupancy and presence sensing for guest rooms, bathrooms, entrances, corridors, and public areas without overstating detection performance.",
    category: "Guide",
    topic: "Occupancy sensor selection",
    listingGroup: "Hotel Automation Guides",
    readingTime: "11 min read",
    primaryKeyword: "hotel occupancy sensor selection guide",
    secondaryKeywords: [
      "hotel presence sensor",
      "guest room occupancy detection",
      "hotel PIR sensor",
      "RCU occupancy sensor integration",
    ],
    audience: ["Hotel owner", "Contractor", "System integrator", "Project buyer"],
    lastReviewed: "2026-07-15",
    sections: [
      {
        id: "what-sensors-do",
        heading: "What Occupancy Sensors Do in Hotels",
        body: [
          "Occupancy sensors help a room control system infer whether a space is in use. Depending on the approved project logic, that information may support lighting scenes, HVAC setback decisions, housekeeping status, or other non-life-safety automation. The sensor provides an input; the RCU or control platform determines how that input is interpreted.",
          "A hotel environment is more complex than a simple office timer. Guests may sleep, read quietly, remain in a bathroom, leave a door open briefly, or enter and exit in groups. Selection should therefore start with the operational question the project needs to answer, not with a claim that one detector can identify every condition without error.",
          "Occupancy sensing must not be presented as a replacement for fire detection, access control, security monitoring, emergency call, or other life-safety systems. Privacy should remain central: room automation should rely on appropriate non-imaging detection and documented status logic rather than intrusive monitoring.",
        ],
      },
      {
        id: "occupancy-vs-presence",
        heading: "Occupancy Detection vs Presence Detection",
        body: [
          "Occupancy detection commonly identifies movement or a combination of room events to determine that a space is likely occupied. Presence detection is generally intended to recognize finer activity or continued human presence, including lower-motion situations. The terms are sometimes used loosely, so buyers should ask what the actual sensing technology and logic can detect.",
          "A PIR detector responds to changes in infrared energy across its detection zones and may be well suited to movement-based occupancy. Microwave sensing uses reflected radio-frequency energy and can detect motion differently, sometimes through or beyond materials depending on installation conditions. Combined devices may use more than one method to balance sensitivity and false-trigger risk.",
          "No technology should be selected by label alone. Detection behavior depends on the exact model, mounting position, room geometry, sensitivity settings, environmental conditions, and control logic. Verified product documentation and a representative-room test are more useful than an unqualified range or angle claim.",
        ],
      },
      {
        id: "common-technologies",
        heading: "Common Sensor Technologies",
        body: [
          "Hotel projects can use a single detector, a door contact combined with a detector, or a multi-sensor sequence. Each method creates different evidence about room use and requires a suitable response from the control system.",
        ],
        subsections: [
          {
            id: "pir-technology",
            heading: "PIR",
            body: [
              "Passive infrared sensing detects changes in heat patterns as a person moves across detection zones. It is widely used for movement-based control, but room layout, partitions, line of sight, mounting, and low-motion occupancy can affect performance.",
            ],
          },
          {
            id: "microwave-technology",
            heading: "Microwave",
            body: [
              "Microwave sensing can respond to movement through reflected energy and may detect subtle motion in suitable conditions. Sensitivity and the possibility of detecting activity outside the intended area must be considered during placement and commissioning.",
            ],
          },
          {
            id: "combined-detection",
            heading: "Combined Detection",
            body: [
              "A combined detector can use multiple sensing methods or fuse several inputs. The project should confirm whether the logic requires both methods, either method, or a configurable sequence, because those choices affect response and nuisance triggers.",
            ],
          },
          {
            id: "door-contact-logic",
            heading: "Door Contact-Based Logic",
            body: [
              "A door contact reports an opening or closing event, not human presence. Used with a room sensor and timing logic, it can help the system interpret entry and exit patterns, but it should not be treated as proof that the room is empty.",
            ],
          },
          {
            id: "multi-sensor-logic",
            heading: "Multi-Sensor Room Logic",
            body: [
              "Multi-sensor logic may combine door events, movement or presence detection, key-card status, panel commands, and time conditions. The sequence should be documented and tested against real guest behavior before broad deployment.",
            ],
          },
        ],
      },
      {
        id: "key-selection-factors",
        heading: "Key Selection Factors",
        body: [
          "Begin with the intended detection area and mounting position. Ceiling height, wall location, furniture, bathroom partitions, curtains, air movement, door swing, and the expected path of travel can all change what a sensor observes. A reflected ceiling plan and room layout should accompany the selection request.",
          "Consider false-trigger sources and missed-detection risks together. Adjacent corridor movement, moving curtains, HVAC airflow, heat sources, reflective surfaces, or activity beyond a lightweight partition may affect certain technologies. The goal is not a promise of zero false alarms but a tested configuration with reasonable behavior for the application.",
          "Also confirm response time, hold time, sensitivity adjustment, integration method, power requirement, operating environment, appearance, maintenance access, and privacy expectations. Do not insert detection distance or angle values unless they come from the verified datasheet for the exact model.",
        ],
      },
      {
        id: "sensor-logic-by-area",
        heading: "Recommended Sensor Logic by Hotel Area",
        body: [
          "Different hotel spaces create different occupancy patterns. The correct approach should be agreed by the project team and tested in context rather than copied from one room type to every area.",
        ],
        subsections: [
          {
            id: "guest-room-sensor-logic",
            heading: "Guest Room",
            body: [
              "Guest rooms need logic that respects sleeping and low-motion activity. Door status, presence sensing, manual guest commands, and conservative timing may be combined so comfort is not interrupted by a single missing motion event.",
            ],
          },
          {
            id: "bathroom-sensor-logic",
            heading: "Bathroom",
            body: [
              "Bathrooms may have partitions, humidity, limited mounting positions, and short periods of low motion. The selected product must be suitable for the actual environment, and the control response should avoid abrupt loss of lighting during normal use.",
            ],
          },
          {
            id: "entrance-sensor-logic",
            heading: "Entrance Area",
            body: [
              "An entrance detector can support welcome scenes or entry sequences when coordinated with the door contact. The project should distinguish a person entering from a door merely being opened for service or inspection.",
            ],
          },
          {
            id: "corridor-sensor-logic",
            heading: "Corridor",
            body: [
              "Corridors require coverage and timing suited to directional movement, intersections, lifts, and service traffic. Guest-room privacy boundaries and unintended detection through doorways should be considered during positioning.",
            ],
          },
          {
            id: "public-area-sensor-logic",
            heading: "Public Area",
            body: [
              "Lobbies, meeting spaces, and service areas have varied occupancy density and operating schedules. Zoning, manual override, event use, cleaning, and maintenance access may be more important than applying a single room-style sensor rule.",
            ],
          },
        ],
      },
      {
        id: "sensors-with-rcu",
        heading: "How Sensors Work with an RCU",
        body: [
          "The sensor sends a verified signal or status to the RCU or another control input. The RCU then evaluates that input with timing, door state, guest commands, room mode, or other project-defined conditions. Buyers should request an input-and-logic description instead of assuming that connecting a sensor automatically creates suitable energy or comfort behavior.",
          "The interface may differ by product and architecture. Power supply, signal type, communication method, address configuration, and supported logic must be checked against the exact sensor and RCU documentation. This guide does not claim that every sensor works with every host or protocol.",
          "A typical-room mockup should test entry, quiet occupancy, sleeping, bathroom use, housekeeping, open-door conditions, repeated movement, and manual override. Results should be reviewed by hotel operations as well as the engineering team before settings are copied to other rooms.",
        ],
        relatedLinks: [
          {
            title: "Hotel Guest Room Automation Guide",
            href: "/en/resources/hotel-guest-room-automation-guide/",
          },
          {
            title: "Hotel RCU Wiring and System Architecture Guide",
            href: "/en/resources/hotel-rcu-wiring-system-architecture-guide/",
          },
        ],
      },
      {
        id: "common-selection-mistakes",
        heading: "Common Selection Mistakes",
        body: [
          "A common mistake is treating PIR, microwave, and presence detection as identical. Another is selecting from a headline range without reviewing mounting, partitions, adjacent spaces, sensitivity, and the behavior of the actual room-control logic.",
          "Projects can also fail when a door contact is used as the only occupancy indicator, sensor timeout is too aggressive, bathroom behavior is ignored, or the same placement is copied to different room layouts. A detector can be technically functional while the resulting guest experience is still unsuitable.",
          "Finally, avoid using occupancy sensors for purposes they were not designed to serve. They should not be represented as fire, security, medical, emergency, or surveillance systems, and they should not drive intrusive monitoring practices in guest spaces.",
        ],
      },
      {
        id: "supplier-questions",
        heading: "Questions to Ask a Sensor Supplier",
        body: [
          "Ask which sensing technology the exact model uses, its intended mounting method and environment, how sensitivity and delay are configured, what power and interface it requires, and which RCU or control inputs have been verified. Request the current datasheet and installation guidance for the specific product.",
          "Describe the room geometry and target logic. Ask how the supplier recommends handling low motion, bathroom separation, adjacent movement, door events, manual override, and representative-room testing. The supplier should identify assumptions instead of promising that the device can never miss presence or trigger incorrectly.",
          "For procurement, confirm finish, quantity, sample review, documentation, packaging, and lead time. Product selection support and documents can be reviewed by project request, while final placement and system logic should be approved by the responsible project professionals.",
        ],
      },
      {
        id: "selection-checklist",
        heading: "Project Selection Checklist",
        body: [
          "Define the area, use case, room layout, mounting options, detection objective, acceptable response, privacy boundary, integration method, power source, operating environment, and maintenance access. Identify which other signals the RCU will use and how a manual command overrides automation.",
          "Shortlist only products with verified documentation for the intended use. Plan a typical-room test, record settings, test realistic guest and housekeeping scenarios, and establish who approves the final logic. Do not publish unverified detection ranges or copy settings between materially different room types.",
          "Send room plans, sensor locations, target automation functions, RCU information, and project requirements with the inquiry. This gives the supplier enough context to recommend a practical sensor direction without overstating performance.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Coordinate occupancy inputs with lighting, HVAC, room status, curtains, and guest controls.",
      },
      {
        title: "Smart Hotel Automation Solution",
        href: "/en/solutions/smart-hotel-automation-solution/",
        description:
          "Plan room and public-area automation logic across sensors, controllers, and operational workflows.",
      },
    ],
    relatedProducts: [
      {
        title: "Embedded Human Presence Sensor",
        href: "/en/products/embedded-human-presence-sensor/",
        description:
          "Presence sensing option for project-specific room automation and occupancy logic review.",
      },
      {
        title: "Hotel Room Door Magnetic Sensor",
        href: "/en/products/hotel-room-door-magnetic-sensor/",
        description:
          "Door-event input that can complement, but not replace, occupancy detection.",
      },
      {
        title: "Hotel Smart Room RCU Host 1",
        href: "/en/products/hotel-smart-room-rcu-host-1/",
        description:
          "Room control host option for coordinating approved sensor and device logic.",
      },
      {
        title: "Smart Four Key Scene Control Panel",
        href: "/en/products/smart-four-key-scene-control-panel/",
        description:
          "Manual guest control interface that can coexist with automated room behavior.",
      },
    ],
    relatedRegions: [{ title: "Vietnam", href: "/en/regions/vietnam/" }],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Review public catalogs and request exact sensor or RCU documents after the application is defined.",
      },
    ],
    conversion: {
      midCtaAfterSectionId: "sensor-logic-by-area",
      continueReadingSlugs: [
        "hotel-guest-room-automation-guide",
        "smart-hotel-room-control-system-guide",
        "hotel-rcu-wiring-system-architecture-guide",
      ],
    },
    cta: {
      title: "Review occupancy sensing for your hotel project",
      body: "Share room plans, mounting locations, target automation logic, RCU information, and project quantity. We can help review suitable products and document needs without making unverified detection claims.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to select occupancy or presence sensors for a hotel project.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "hotel-doorplate-room-display-buying-guide",
    title: "Hotel Doorplate and Room Display Buying Guide",
    h1: "Hotel Doorplate and Room Display Buying Guide",
    seoTitle: "Hotel Doorplate and Room Display Buying Guide",
    metaDescription:
      "Choose hotel doorplates and room displays by comparing DND/MUR logic, doorbell functions, finish, mounting, integration, branding, and quote inputs.",
    summary:
      "A procurement guide to hotel doorplates, room-number displays, doorbells, and configurable DND/MUR indicators for contractors, owners, integrators, and OEM/ODM buyers.",
    category: "Guide",
    topic: "Doorplate and room display buying",
    listingGroup: "Buying Guides",
    readingTime: "11 min read",
    primaryKeyword: "hotel doorplate room display buying guide",
    secondaryKeywords: [
      "hotel DND MUR panel",
      "hotel room number display",
      "hotel doorbell panel",
      "custom hotel doorplate",
    ],
    audience: ["Hotel owner", "Contractor", "System integrator", "OEM/ODM buyer"],
    lastReviewed: "2026-07-15",
    sections: [
      {
        id: "what-doorplates-do",
        heading: "What a Hotel Doorplate or Room Display Does",
        body: [
          "A hotel doorplate or room display identifies the guest room and can present selected service or room-status information at the entrance. Depending on the product and approved project configuration, it may combine a room number, doorbell control, Do Not Disturb indication, Make Up Room indication, branding, or other defined status.",
          "The device sits at an important boundary between guest experience, corridor wayfinding, housekeeping workflow, and the room control system. Buyers should assess visibility and appearance together with the electrical and control interface. A visually suitable panel is not procurement-ready until its mounting, power, input, and status logic are confirmed.",
          "Functions vary by model and project. DND, MUR, occupancy, service, and doorbell features should be described as configurable project logic, not as capabilities that every doorplate includes by default. Direct PMS compatibility should not be assumed without a verified interface design.",
        ],
      },
      {
        id: "common-functions",
        heading: "Common Functions",
        body: [
          "The required functions should come from the hotel operating concept and room-control schedule. Combining more indicators is not automatically better; clarity, guest privacy, maintenance, and integration effort matter.",
        ],
        subsections: [
          {
            id: "room-number-display",
            heading: "Room Number Display",
            body: [
              "A room number may be fixed, illuminated, or digitally presented depending on the selected product. Buyers should confirm legibility, typography, language, numbering format, corridor lighting conditions, and how a changed room number would be maintained.",
            ],
          },
          {
            id: "dnd-function",
            heading: "Do Not Disturb",
            body: [
              "DND normally reflects a guest command from an in-room panel or approved room logic. The project should define how the external indication behaves, whether the doorbell is affected, and which staff systems, if any, receive the status.",
            ],
          },
          {
            id: "mur-function",
            heading: "Make Up Room",
            body: [
              "MUR can communicate a guest request for room service or housekeeping. The display logic, reset method, staff workflow, and any central reporting should be documented so the indication does not become an isolated light without an operational response.",
            ],
          },
          {
            id: "doorbell-function",
            heading: "Doorbell",
            body: [
              "An integrated doorbell can provide a clear call point at the room entrance. Chime location, power, DND behavior, labeling, accessibility, and connection to the room system must be confirmed for the exact model and project design.",
            ],
          },
          {
            id: "occupancy-service-status",
            heading: "Occupancy or Service Status",
            body: [
              "Some projects may display additional approved status, but privacy and operational necessity should be reviewed carefully. Occupancy should not be exposed casually in a corridor, and no status should be represented as a life-safety or security indication unless a separate compliant system provides it.",
            ],
          },
          {
            id: "hotel-branding",
            heading: "Hotel Branding",
            body: [
              "Logo, color, icon style, typography, and finish can align the entrance device with the interior design. Artwork and samples should be approved before production, and branding choices must remain legible under real corridor conditions.",
            ],
          },
        ],
      },
      {
        id: "main-product-types",
        heading: "Main Product Types",
        body: [
          "Basic indicator panels focus on a small set of service states, often paired with a separate room number or doorbell. They can suit projects that value simple operation, but the exact connection and included indicators still require model-level confirmation.",
          "Digital room number displays present room identification electronically and may support a broader visual layout. Buyers should verify the display technology, content method, power, mounting, maintenance, and approved functions rather than assume a particular size, resolution, or management capability.",
          "Touch or smart doorplates and integrated doorbell displays can combine more guest-facing functions in one surface. This may simplify the visual arrangement while increasing requirements for interface coordination, artwork, configuration, spare strategy, and commissioning.",
        ],
      },
      {
        id: "key-buying-factors",
        heading: "Key Buying Factors",
        body: [
          "Display type should suit the information that must be shown and the way it will be updated. Panel material and finish should match the design intent while remaining practical for cleaning and replacement. Do not infer waterproof, fire, weather, or impact ratings unless verified documentation for the exact product states them.",
          "Confirm mounting method, back-box dimensions, wall build-up, cable entry, power supply, corridor visibility, viewing angle, icon contrast, and maintenance access. Products intended for an indoor hotel corridor should not be described as outdoor devices without explicit product support.",
          "Integration requirements may include simple status inputs, a connection to an RCU, or a broader project-specific interface. Buyers should define what the panel receives and sends, what happens during DND or MUR, and which contractor owns testing. No protocol or PMS connection should be assumed.",
        ],
        subsections: [
          {
            id: "custom-branding-factor",
            heading: "Custom Branding and Appearance",
            body: [
              "Logo, panel color, button or icon layout, room-number style, and overall appearance may be reviewed for OEM/ODM projects. Feasibility depends on the product series, existing molds, artwork, quantity, and project requirements; not every appearance change is available without tooling.",
            ],
          },
          {
            id: "maintenance-factor",
            heading: "Maintenance and Replacement",
            body: [
              "Ask how the front panel, electronics, labels, and room number can be serviced or replaced. Standardized mounting and documented room numbering can reduce disruption when a unit needs replacement after the hotel opens.",
            ],
          },
        ],
      },
      {
        id: "connect-room-control",
        heading: "How Doorplates Connect to the Room Control System",
        body: [
          "A doorplate may receive DND or MUR status from an in-room panel through the RCU, use dedicated wiring, or participate in another verified control arrangement. The architecture must identify the status source, display destination, power supply, signal type, and any central system that receives the event.",
          "The doorbell can be a local input, an RCU input, or part of an integrated room device, depending on the product. The design should define chime behavior, DND interaction, service access, and testing responsibility. A generic doorplate image cannot establish these electrical requirements.",
          "Request exact datasheets and project-relevant wiring references after shortlisting a model. Voltage, protocol, terminals, and connection method must be confirmed by the responsible engineers and the supplier; this guide does not provide field installation instructions.",
        ],
        relatedLinks: [
          {
            title: "Hotel RCU Wiring and System Architecture Guide",
            href: "/en/resources/hotel-rcu-wiring-system-architecture-guide/",
          },
        ],
      },
      {
        id: "dnd-mur-logic",
        heading: "DND and MUR Logic",
        body: [
          "A clear status matrix should show what happens when DND is selected, MUR is selected, both commands are attempted, the room is vacant, housekeeping clears a request, or power is restored. The hotel should approve the guest and staff workflow before the indicator behavior is programmed.",
          "DND may suppress or change doorbell behavior in some projects, but that should be an explicit requirement. MUR may appear only at the door or may also be sent to an approved management platform. The available behavior depends on the selected products and integration scope.",
          "Privacy is important. The external panel should expose only the status the hotel has intentionally approved. Occupancy, staff presence, lock state, or other room information should not be added simply because the control system can technically produce an event.",
        ],
      },
      {
        id: "oem-odm-options",
        heading: "OEM/ODM Customization Options",
        body: [
          "Common project discussions include logo, panel color, finish, button or icon layout, room-number style, labeling, packaging, and visual adaptation to the hotel interior. The supplier should confirm which options use an existing product series and which require new artwork, engineering, or tooling.",
          "A buyer should provide vector artwork, color references, icon language, numbering rules, required functions, mounting constraints, and expected quantity. A physical sample or controlled pre-production review helps align appearance and function before broader production.",
          "Regular products have no fixed MOQ. If a custom product requires a new mold, a customization fee may apply; changing color with an existing mold does not incur a customization fee. Final availability, samples, and schedule still depend on the selected series and project requirements.",
        ],
        relatedLinks: [
          {
            title: "OEM/ODM Smart Panel Customization Guide",
            href: "/en/resources/oem-odm-smart-panel-customization-guide/",
          },
          {
            title: "Hotel Smart Switch Panel Guide",
            href: "/en/resources/hotel-smart-switch-panel-guide/",
          },
        ],
      },
      {
        id: "procurement-mistakes",
        heading: "Common Procurement Mistakes",
        body: [
          "One mistake is approving appearance before confirming back boxes, power, wiring, RCU logic, and corridor visibility. Another is calling every door-side panel a smart display without documenting whether it is a fixed indicator, a room-number display, a doorbell, or an integrated control device.",
          "Projects can also assume that DND and MUR are included by default, that a display connects directly to the PMS, or that an indoor panel has unverified environmental ratings. These assumptions can lead to unsuitable samples, missing gateways, or a status workflow that does not match hotel operations.",
          "Late room-number artwork, inconsistent numbering, unclear icon language, and unapproved colors can delay production. Create an approval register for product model, functions, artwork, finish, mounting, wiring, and sample status before the order is released.",
        ],
      },
      {
        id: "supplier-information",
        heading: "Information to Provide to a Supplier",
        body: [
          "Provide room quantity and types, corridor design references, required room-number format, DND/MUR and doorbell behavior, panel dimensions or mounting constraints, voltage, wiring or RCU information, finish direction, logo files, icon language, packaging needs, and required documents.",
          "State whether the doorplate is part of a new room control package or must coordinate with an existing system. Identify any verified third-party interface and the party responsible for it. If compatibility is still under review, describe the required data or status rather than naming an unsupported protocol.",
          "Share the target sample and order schedule. Typical lead time is 7–15 days depending on product and order requirements, while artwork, samples, tooling, project documents, quantity, and logistics can affect the final plan.",
        ],
      },
      {
        id: "buying-checklist",
        heading: "Project Buying Checklist",
        body: [
          "Confirm product type, room-number method, required indicators, DND/MUR sequence, doorbell behavior, display and finish, mounting, power, RCU connection, central-system boundary, privacy rules, artwork, sample approval, documents, spares, packaging, and installation responsibility.",
          "Verify every claim against the exact product. Do not add assumed protocols, display dimensions, resolutions, environmental ratings, outdoor suitability, or direct PMS compatibility. Record open items and assign each to the hotel, consultant, contractor, integrator, or supplier for closure.",
          "Send the completed schedule with drawings and quantities when requesting a quote. DualCoreLink can review relevant doorbell, room-status, smart panel, RCU, and customization options by project request.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Coordinate door-side service status with guest controls, room logic, sensing, and operational workflows.",
      },
      {
        title: "Smart Hotel Automation Solution",
        href: "/en/solutions/smart-hotel-automation-solution/",
        description:
          "Plan connected room and hotel functions across control devices and management requirements.",
      },
      {
        title: "OEM/ODM Custom Panel Solution",
        href: "/en/solutions/oem-odm-custom-panel-solution/",
        description:
          "Review logo, color, icon layout, finish, samples, and project adaptation for entrance panels.",
      },
    ],
    relatedProducts: [
      {
        title: "Borui Red Matte Room Status Four Key Switch Panel",
        href: "/en/products/borui-red-matte-room-status-four-key-switch-panel/",
        description:
          "Room-status panel for reviewing guest service commands and coordinated visual design.",
      },
      {
        title: "Hotel Guest Room Doorbell",
        href: "/en/products/hotel-guest-room-doorbell/",
        description:
          "Door-side call device for approved guest room entrance and DND workflow planning.",
      },
      {
        title: "Brushed Aluminum 86 Base Doorbell Panel",
        href: "/en/products/brushed-aluminum-86-base-doorbell-panel/",
        description:
          "Brushed aluminum doorbell panel for material, mounting, and labeling review.",
      },
      {
        title: "Smart Four Key Scene Control Panel",
        href: "/en/products/smart-four-key-scene-control-panel/",
        description:
          "In-room guest control panel that can provide approved commands to room-status logic.",
      },
    ],
    relatedRegions: [{ title: "Saudi Arabia", href: "/en/regions/saudi-arabia/" }],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Review panel and door-device catalogs, then request model-specific documents after functions are confirmed.",
      },
    ],
    conversion: {
      midCtaAfterSectionId: "key-buying-factors",
      continueReadingSlugs: [
        "hotel-smart-switch-panel-guide",
        "oem-odm-smart-panel-customization-guide",
        "hotel-guest-room-automation-guide",
      ],
    },
    cta: {
      title: "Select doorplates and room displays for your project",
      body: "Share room quantities, required status logic, doorbell behavior, mounting, finish, branding, RCU information, and document needs. We can review suitable existing products and customization scope.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request datasheets or wiring diagrams",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to select hotel doorplates and room displays for a project.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
];

export const resourceSlugs = resources.map((resource) => resource.slug);

export function getResourceBySlug(slug: string): ResourceGuide | undefined {
  return resources.find((resource) => resource.slug === slug);
}

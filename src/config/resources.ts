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
        description:
          "Centralized cabinet option for coordinating room control circuits and project wiring requirements.",
      },
      {
        title: "Hotel Smart Room RCU Host 1",
        href: "/en/products/hotel-smart-room-rcu-host-1/",
        description:
          "Room control host for evaluating lighting, curtain, HVAC, sensing, and service-status functions.",
      },
      {
        title: "Hotel Smart Room RCU Host 2",
        href: "/en/products/hotel-smart-room-rcu-host-2/",
        description:
          "Alternative RCU host option for matching room schedules, device scope, and installation requirements.",
      },
      {
        title: "Hotel Smart Room RCU Host 3",
        href: "/en/products/hotel-smart-room-rcu-host-3/",
        description:
          "RCU host option for project-specific comparison of room functions, wiring, and quotation inputs.",
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
    conversion: {
      midCtaAfterSectionId: "product-selection",
      continueReadingSlugs: [
        "hotel-rcu-buying-guide",
        "hotel-rcu-wiring-system-architecture-guide",
        "smart-hotel-room-control-system-guide",
      ],
    },
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
        "knx-vs-rcu-hotel-room-control",
        "hotel-rcu-buying-guide",
        "hotel-renovation-smart-room-upgrade-guide",
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
        "knx-vs-rcu-hotel-room-control",
        "hotel-rcu-wiring-system-architecture-guide",
        "hotel-room-control-system-cost-factors",
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
        "knx-vs-rcu-hotel-room-control",
        "what-is-hotel-rcu-room-control-system",
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
        "smart-panel-material-finish-selection-guide",
        "oem-odm-smart-panel-customization-guide",
        "hotel-doorplate-room-display-buying-guide",
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
        "oem-odm-hotel-control-panel-development-process",
        "smart-panel-material-finish-selection-guide",
        "hotel-smart-switch-panel-guide",
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
        "hotel-renovation-smart-room-upgrade-guide",
        "hotel-occupancy-sensor-selection-guide",
        "hotel-doorplate-room-display-buying-guide",
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
        "oem-odm-hotel-control-panel-development-process",
        "hotel-renovation-smart-room-upgrade-guide",
        "hotel-rcu-buying-guide",
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
        "hotel-renovation-smart-room-upgrade-guide",
        "hotel-guest-room-automation-guide",
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
        "smart-panel-material-finish-selection-guide",
        "hotel-renovation-smart-room-upgrade-guide",
        "hotel-smart-switch-panel-guide",
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
  {
    slug: "oem-odm-hotel-control-panel-development-process",
    title: "OEM/ODM Hotel Control Panel Development Process",
    h1: "OEM/ODM Hotel Control Panel Development Process",
    seoTitle: "OEM/ODM Hotel Control Panel Development Process",
    metaDescription:
      "Follow the OEM/ODM hotel control panel process from requirements and samples to tooling, pilot production, packaging, and B2B delivery planning.",
    summary:
      "A practical workflow for hotel project buyers, brands, distributors, and integrators taking a custom control panel from requirements through prototype review and production preparation.",
    category: "Guide",
    topic: "OEM/ODM panel development",
    listingGroup: "OEM/ODM Guides",
    readingTime: "15 min read",
    primaryKeyword: "OEM ODM hotel control panel development process",
    secondaryKeywords: [
      "custom hotel control panel manufacturer",
      "OEM smart panel development",
      "ODM hotel switch panel process",
      "hotel panel prototype and tooling",
    ],
    audience: [
      "OEM/ODM buyer",
      "Distributor",
      "System integrator",
      "Contractor",
      "Hotel owner",
    ],
    lastReviewed: "2026-07-15",
    sections: [
      {
        id: "oem-odm-meaning",
        heading: "What OEM and ODM Mean for Hotel Control Panels",
        body: [
          "OEM and ODM projects can cover very different levels of change. An OEM request may focus on applying a buyer's brand, approved color, icons, or packaging to an existing product platform. An ODM request can involve a broader review of appearance, key layout, functions, interfaces, materials, and production feasibility. Buyers should define the expected outcome rather than rely on the label alone, because the required engineering work depends on the actual scope.",
          "For hotel control panels, visible design and electrical behavior must be reviewed together. A panel may need to match the interior concept while also fitting a wall box, wiring method, control host, room function list, voltage, and installation workflow. A realistic development brief therefore covers both the guest-facing experience and the technical boundary of the selected product series.",
          "Customization remains subject to product-series and project review. It should not be assumed that every protocol, function, material, or appearance can be added to every existing model. Early feasibility confirmation protects the buyer from approving artwork that cannot be matched to the intended hardware or installation method.",
        ],
        relatedLinks: [
          {
            title: "OEM/ODM Smart Panel Customization Guide",
            href: "/en/resources/oem-odm-smart-panel-customization-guide/",
            description:
              "Review the scope, documents, and quotation inputs used for smart panel customization.",
          },
        ],
      },
      {
        id: "development-stages",
        heading: "Typical Development Stages",
        body: [
          "A controlled development process turns an initial idea into a reviewable product definition before production commitments are made. The stages may overlap, but each should produce a clear decision or approved record. Skipping requirement confirmation or sample approval usually creates more revisions later, especially when several stakeholders review appearance and engineering separately.",
        ],
        subsections: [
          {
            id: "requirement-collection",
            heading: "Requirement Collection",
            body: [
              "Begin with the target market, hotel type, room functions, expected quantity, installation dimensions, electrical requirements, preferred appearance, branding scope, documents, and target schedule. Reference photos can explain style, but dimensional drawings, function schedules, and known interface requirements are more useful for feasibility review.",
            ],
          },
          {
            id: "product-function-definition",
            heading: "Product and Function Definition",
            body: [
              "Agree which existing platform is being evaluated and list every required key, indicator, socket, thermostat, service-status, or control function. Voltage, wiring, protocol, and host-controller requirements must be confirmed by the project. A function list should distinguish mandatory items from optional ideas so the first sample has a stable target.",
            ],
          },
          {
            id: "appearance-material-selection",
            heading: "Appearance and Material Selection",
            body: [
              "Select a product series, color direction, visible finish, and material option from confirmed choices. Screen images and color codes help communication but do not replace a physical sample, because gloss, texture, edge details, and color can appear different under hotel lighting.",
            ],
          },
          {
            id: "logo-icon-layout",
            heading: "Logo, Icon and Key Layout Design",
            body: [
              "Prepare vector artwork, icon labels, language requirements, key order, indicator behavior, and any printing or engraving references. The layout must remain legible and usable within the real faceplate dimensions. Branding approval should include the hotel or buyer team that owns the artwork rights.",
            ],
          },
          {
            id: "electrical-interface-confirmation",
            heading: "Electrical and Interface Confirmation",
            body: [
              "Confirm supply conditions, loads, terminals, wall-box dimensions, wiring relationships, host or RCU connection, and any integration boundary. Protocol support depends on the exact product and project design; it should be documented rather than inferred from another model in the same visual family.",
            ],
          },
          {
            id: "prototype-development",
            heading: "Prototype Development",
            body: [
              "The prototype should represent the approved scope closely enough to review appearance, dimensions, key labels, basic functions, connection points, and installation fit. A prototype is a decision tool, not automatic evidence that every production detail or external system integration has already been validated.",
            ],
          },
          {
            id: "sample-review-revision",
            heading: "Sample Review and Revision",
            body: [
              "Collect feedback in one revision list with photographs, marked drawings, and clear acceptance criteria. Separate defects from preference changes and identify who can approve the final sample. Repeated informal comments from different teams can extend development and create conflicting instructions.",
            ],
          },
          {
            id: "tooling-confirmation",
            heading: "Tooling or Existing-Mold Confirmation",
            body: [
              "Confirm whether the approved design uses an existing mold or needs new tooling. Existing-mold changes may still require artwork, sample, finish, or function review. New tooling requires its own cost, schedule, ownership, maintenance, and revision discussion before production planning.",
            ],
          },
          {
            id: "pilot-mass-production",
            heading: "Pilot and Mass Production Preparation",
            body: [
              "A pilot quantity can verify the approved bill of materials, assembly flow, appearance control, labels, packaging, and inspection record before the main order. Mass production should start from the signed sample and released specification, with changes controlled rather than introduced through informal messages.",
            ],
          },
          {
            id: "packaging-delivery",
            heading: "Packaging and Delivery Preparation",
            body: [
              "Finalize labels, manuals, accessory lists, carton marks, protective packaging, document requests, and shipment planning. Typical lead time is 7-15 days depending on product type, customization requirements, and order quantity, but development, tooling, sample approval, and pilot stages can add time before an order enters its production window.",
            ],
          },
        ],
      },
      {
        id: "buyer-information",
        heading: "Information a Buyer Should Prepare",
        body: [
          "A useful brief includes company and project context, target country, hotel category, room count, estimated order quantity, target product series, installation dimensions, room functions, voltage, wiring or protocol needs, color and finish direction, logo files, key labels, packaging needs, required documents, sample quantity, and target milestone dates. Unknown items should be marked as open decisions instead of filled with assumptions.",
          "Room elevations, wall-box drawings, reflected ceiling plans, RCU schedules, panel schedules, BOQ files, and interface descriptions can reduce ambiguity. Buyers should also identify whether the request is for a single panel, a coordinated panel family, or a complete guest-room package, because matching several visible devices may require a broader sample and artwork review.",
          "A named technical contact and a named design or brand approver make revisions more efficient. The supplier should know which comments affect electrical behavior, which affect appearance, and which are commercial preferences. This helps keep sample acceptance separate from quotation negotiation.",
        ],
      },
      {
        id: "existing-mold-vs-tooling",
        heading: "Existing Mold vs New Tooling",
        body: [
          "An existing mold is usually the first route to evaluate when dimensions and general appearance meet the project. Under the current purchasing terms, regular products have no fixed MOQ. If an existing mold is used and only the color is changed, no customization fee is required. Other changes can still require review because artwork, function, material, packaging, or sample work may differ from a color-only request.",
          "A new enclosure shape, mounting arrangement, dimension, or structural part may require new tooling. Custom products may then carry a customization or tooling fee, and quantity requirements depend on the specific project. The quotation should state what the tooling covers, whether revisions are included, how samples are approved, and whether the selected design can move into production with the requested quantity.",
          "Choosing between the two routes is not purely a price decision. Existing molds can shorten structural development, while new tooling may better support a distinctive product family. Buyers should compare brand value, technical fit, schedule, quantities, approval capacity, and long-term product plans before asking for a tooling commitment.",
        ],
      },
      {
        id: "customization-options",
        heading: "Customization Options",
        body: [
          "Customization can include color, logo, key layout, icons and labels, material or surface finish, selected product functions, and packaging. Each option should be tied to a confirmed product series. A color or logo change is different from changing terminals, communication behavior, load control, screen content, or enclosure dimensions, so the quotation and schedule should separate visual and functional work.",
          "Panel families often require consistency across switches, thermostats, doorplates, sockets, and service controls. Buyers should review alignment, proportions, visible finish, icon style, label language, and lighting together. A visually coordinated family can still contain different internal hardware, so each model needs its own technical confirmation.",
          "Packaging customization should define product name, model reference, barcode or label needs, accessory list, manual language, carton marking, and artwork approval. No packaging claim should imply certifications or compliance that have not been verified for the exact product and target market.",
        ],
        relatedLinks: [
          {
            title: "Smart Panel Material and Finish Selection Guide",
            href: "/en/resources/smart-panel-material-finish-selection-guide/",
            description:
              "Compare visible materials, finish directions, color review, and sample approval for hotel panels.",
          },
        ],
      },
      {
        id: "development-time",
        heading: "Factors That Affect Development Time",
        body: [
          "Timing depends on requirement quality, existing-platform fit, engineering complexity, artwork readiness, sample material availability, tooling needs, number of revision rounds, integration questions, pilot quantity, packaging scope, and approval speed. A typical 7-15 day lead time applies to production depending on the product and order requirements; it should not be presented as a guarantee for the complete development cycle.",
          "Projects move faster when decisions are sequenced. First freeze dimensions and functions, then review appearance and artwork, then approve the technical and visual sample, and finally release packaging and production records. Changing a key function after artwork or tooling approval can reopen several completed steps.",
        ],
      },
      {
        id: "common-project-mistakes",
        heading: "Common OEM/ODM Project Mistakes",
        body: [
          "Common mistakes include requesting a quote without dimensions or quantities, assuming every visual series shares the same functions, treating reference images as production drawings, approving color only on a screen, and asking production to begin before one sample owner has signed off. Another risk is declaring a protocol or external-system requirement late, after the panel platform has already been selected.",
          "Buyers should also avoid assuming that all customization is free or has no quantity requirement. The current rule is narrower: regular products have no fixed MOQ, color-only changes on an existing mold have no customization fee, and new molds may require customization or tooling fees. Custom quantities and feasibility remain project-specific.",
        ],
      },
      {
        id: "prototype-review",
        heading: "How to Review a Prototype",
        body: [
          "Review the prototype against the approved specification, not memory. Check dimensions, mounting fit, visible gaps, finish under expected lighting, logo placement, icon clarity, key order, tactile or touch behavior, indicators, terminals, wiring labels, and the agreed functions. Photograph the sample in consistent light and keep the marked approval record with the project files.",
          "Technical tests should match the intended product scope and be carried out by qualified personnel. A panel sample cannot by itself prove compatibility with an untested RCU, PMS, BMS, KNX installation, or other external system. Integration acceptance needs the actual devices, interfaces, configuration, and responsible engineering parties defined by the project.",
        ],
      },
      {
        id: "manufacturer-questions",
        heading: "Questions to Ask a Manufacturer",
        body: [
          "Ask which product series supports the requested change, what remains standard, whether an existing mold fits, what artwork format is required, how samples are approved, which functions and interfaces are confirmed, whether new tooling is needed, what quantity assumptions apply, and which files control production. Request separate milestones for sample, tooling, pilot, and order production when those stages are relevant.",
          "Also confirm document availability by product and project request, packaging responsibilities, revision limits, inspection references, and the information needed for quotation. Clear questions create a traceable scope without relying on broad promises about cost, delivery, protocol support, or compliance.",
        ],
      },
      {
        id: "project-checklist",
        heading: "OEM/ODM Project Checklist",
        body: [
          "Before quotation, confirm market, quantities, product family, room functions, dimensions, voltage, wiring and protocol needs, appearance direction, logo, labels, packaging, documents, and schedule. Before sampling, freeze the requirement list and artwork owner. Before production, approve the physical sample, bill of materials reference, packaging, pilot outcome, and delivery assumptions.",
          "This staged checklist helps a buyer compare suppliers on scope clarity and execution readiness rather than on a single headline price. The next practical step is to send the selected series, drawings, quantities, customization list, and approval timeline for a product- and project-specific review.",
        ],
        relatedLinks: [
          {
            title: "Hotel Room Control System Cost Factors",
            href: "/en/resources/hotel-room-control-system-cost-factors/",
            description:
              "Understand how scope, customization, documents, and service boundaries affect comparable quotations.",
          },
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "OEM/ODM Custom Panel Solution",
        href: "/en/solutions/oem-odm-custom-panel-solution/",
        description:
          "Plan color, logo, key layout, finish, sample, and packaging requirements around a confirmed panel series.",
      },
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Coordinate customized panels with the wider guest room control device and function scope.",
      },
    ],
    relatedProducts: [
      {
        title: "Borui Red Matte Room Status Four Key Switch Panel",
        href: "/en/products/borui-red-matte-room-status-four-key-switch-panel/",
        description:
          "Red matte Borui Series reference for reviewing room-status keys, icons, branding, and finish direction.",
      },
      {
        title: "Vintage Gold Four Key Smart Switch Panel",
        href: "/en/products/vintage-gold-four-key-smart-switch-panel/",
        description:
          "Vintage Gold Series panel reference for decorative finish and four-key layout discussions.",
      },
      {
        title: "Brushed Aluminum 86 Base Doorbell Panel",
        href: "/en/products/brushed-aluminum-86-base-doorbell-panel/",
        description:
          "Brushed Aluminum Series reference for metal-finish, icon, and door-device coordination.",
      },
      {
        title: "Smart Series Dual Vertical Socket Panel",
        href: "/en/products/smart-series-dual-vertical-socket-panel/",
        description:
          "Smart Series reference for coordinating socket appearance with a customized panel family.",
      },
    ],
    relatedRegions: [{ title: "Middle East", href: "/en/regions/middle-east/" }],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Review public series catalogs and request model-specific drawings or documents after the customization scope is defined.",
      },
    ],
    conversion: {
      midCtaAfterSectionId: "existing-mold-vs-tooling",
      continueReadingSlugs: [
        "oem-odm-smart-panel-customization-guide",
        "smart-panel-material-finish-selection-guide",
        "hotel-smart-switch-panel-guide",
      ],
    },
    cta: {
      title: "Prepare an OEM/ODM panel development brief",
      body: "Share the product series, drawings, quantity, color, logo, key layout, functions, voltage, wiring or protocol needs, packaging, and approval schedule for a project-specific review.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request panel series documents",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to discuss an OEM/ODM hotel control panel development project.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "hotel-renovation-smart-room-upgrade-guide",
    title: "Hotel Renovation Smart Room Upgrade Guide",
    h1: "Hotel Renovation Smart Room Upgrade Guide",
    seoTitle: "Hotel Renovation Smart Room Upgrade Guide",
    metaDescription:
      "Plan a hotel smart-room renovation through site surveys, upgrade scope, wiring review, pilot rooms, hardware selection, and phased B2B procurement.",
    summary:
      "A renovation-focused guide for surveying existing guest rooms, defining an upgrade scope, reducing construction risk, and preparing a pilot before wider hotel deployment.",
    category: "Guide",
    topic: "Hotel renovation automation",
    listingGroup: "Hotel Automation Guides",
    readingTime: "16 min read",
    primaryKeyword: "hotel renovation smart room upgrade",
    secondaryKeywords: [
      "existing hotel room automation retrofit",
      "hotel guest room control renovation",
      "smart hotel retrofit planning",
      "RCU upgrade for old hotel",
    ],
    audience: [
      "Hotel owner",
      "Contractor",
      "System integrator",
      "Distributor",
      "OEM/ODM buyer",
    ],
    lastReviewed: "2026-07-15",
    sections: [
      {
        id: "renovation-different-approach",
        heading: "Why Hotel Renovation Projects Need a Different Approach",
        body: [
          "A renovation starts with unknowns that a new construction project can usually resolve on drawings. Existing wiring may have been changed during previous repairs, distribution boxes may differ between room types, and installed panels or sensors may no longer match original records. Guest operations, noise limits, access windows, furniture protection, and room release schedules also shape how technical work can proceed.",
          "The objective is not to add the largest possible device list. It is to identify improvements that can be engineered, installed, commissioned, and maintained within the actual building. A useful plan separates cosmetic panel replacement, room-control upgrades, sensor additions, door-device changes, HVAC coordination, and wider automation into clear work packages.",
          "No supplier should assume an old circuit is safe or compatible from photographs alone. Existing wiring, loads, earthing, protective devices, interfaces, and installation conditions need on-site confirmation by qualified engineers before products or reuse decisions are finalized.",
        ],
        relatedLinks: [
          {
            title: "Hotel Guest Room Automation Guide",
            href: "/en/resources/hotel-guest-room-automation-guide/",
            description:
              "Review the room functions and device groups that can form a complete automation scope.",
          },
        ],
      },
      {
        id: "existing-system-survey",
        heading: "Start with an Existing-System Survey",
        body: [
          "Survey a representative sample of every room type and record differences rather than assuming the first room represents the hotel. The survey should produce photographs, dimensions, circuit and device notes, room-type exceptions, known faults, access restrictions, and a list of details that require testing or opening work by qualified personnel.",
        ],
        subsections: [
          {
            id: "survey-wiring",
            heading: "Current Wiring",
            body: [
              "Record available conductors, cable routes, switch drops, neutral availability where relevant, junction locations, circuit labels, and evidence of undocumented alterations. Electrical suitability and load capacity must be verified on site; a visual survey alone is not approval to reuse conductors.",
            ],
          },
          {
            id: "survey-distribution-control",
            heading: "Distribution Boxes and Control Hosts",
            body: [
              "Identify room distribution boards, relay cabinets, existing RCU hosts, power supplies, terminals, protective devices, ventilation, access, and spare space. Record model labels and wiring diagrams when available, but verify that the installed configuration matches the documents.",
            ],
          },
          {
            id: "survey-panels",
            heading: "Switches and Panels",
            body: [
              "Measure faceplates, wall boxes, screw positions, depth, gang arrangement, key labels, indicator behavior, and connected functions. A new panel that fits the visible opening may still require different wiring or control logic.",
            ],
          },
          {
            id: "survey-hvac",
            heading: "HVAC Control",
            body: [
              "Document thermostat type, fan-coil arrangement, valve or actuator interface, operating voltage, sensors, control stages, and current guest behavior. HVAC interfaces vary, so compatibility must be confirmed for the actual equipment and control method.",
            ],
          },
          {
            id: "survey-door-devices",
            heading: "Door Devices",
            body: [
              "Record door contacts, doorbells, DND and MUR indicators, card or lock interfaces, corridor displays, cabling, mounting dimensions, and hotel operating logic. Do not assume a doorplate can reuse the existing conductors without a signal and power review.",
            ],
          },
          {
            id: "survey-sensors",
            heading: "Sensors",
            body: [
              "Map current occupancy, presence, door, temperature, and other sensors, including mounting position and observed blind spots. The intended automation logic should be defined before selecting replacement sensing technology.",
            ],
          },
          {
            id: "survey-network-integration",
            heading: "Network and Integration",
            body: [
              "Identify network availability, room gateways, central software, existing PMS or BMS interfaces, access policies, and the parties responsible for integration. Compatibility cannot be promised until interface specifications, permissions, and test responsibilities are confirmed.",
            ],
          },
        ],
      },
      {
        id: "define-upgrade-scope",
        heading: "Define the Upgrade Scope",
        body: [
          "Convert survey findings into a room-by-room scope with exclusions. The same hotel may need different packages for standard rooms, suites, accessible rooms, and rooms that have already been partially refurbished. Each package should state what is retained, replaced, added, relocated, tested, and commissioned.",
        ],
        subsections: [
          {
            id: "panel-only-upgrade",
            heading: "Panel-Only Upgrade",
            body: [
              "A panel-only scope focuses on visible switches, sockets, thermostats, or service panels while retaining confirmed control infrastructure. This is viable only when dimensions, wiring, loads, signals, and control behavior are compatible with the selected replacements.",
            ],
          },
          {
            id: "rcu-control-upgrade",
            heading: "RCU and Control Upgrade",
            body: [
              "Replacing or adding an RCU can reorganize room functions, but it requires a circuit schedule, input and output list, panel and sensor relationships, enclosure planning, and commissioning responsibility. Existing loads and interfaces must be reviewed against the chosen host or cabinet.",
            ],
          },
          {
            id: "sensor-upgrade",
            heading: "Sensor Upgrade",
            body: [
              "A sensor package should begin with the desired logic, such as occupancy status or room-condition response, then define locations, coverage, delays, manual overrides, and connection to the room controller. Device count alone does not establish reliable room behavior.",
            ],
          },
          {
            id: "doorplate-display-upgrade",
            heading: "Doorplate and Room Display Upgrade",
            body: [
              "Doorplate work can include DND, MUR, doorbell, room number, service indicators, and selected status logic. Confirm corridor appearance, mounting, signal sources, room-side controls, and operational procedures before approving the design.",
            ],
          },
          {
            id: "full-automation-upgrade",
            heading: "Full Guest Room Automation Upgrade",
            body: [
              "A full upgrade coordinates lighting, HVAC, curtains, room status, sensing, panels, power functions, door devices, and any approved central integration. It offers the broadest change but also needs the strongest survey, design, pilot, commissioning, training, and maintenance plan.",
            ],
          },
        ],
      },
      {
        id: "reuse-or-rewire",
        heading: "Reuse Existing Wiring or Rewire",
        body: [
          "Reuse should be a documented engineering decision. Compare conductor type and condition, circuit capacity, insulation and protection findings, topology, spare cores, voltage, signal requirements, separation rules, terminations, accessibility, and future maintenance needs. The selected products must match the verified installation, not an assumed typical hotel layout.",
          "Rewiring may be appropriate when existing circuits are undocumented, damaged, inaccessible, incorrectly sized, or incompatible with the intended control architecture. It can also support a clearer long-term system, but it affects finishes, room downtime, fire-stopping, testing, and coordination with other trades. Qualified local professionals should define the safe method and applicable requirements.",
          "A hybrid plan may retain confirmed power circuits while adding dedicated low-voltage or communication paths. The boundaries should be shown on drawings and tested in the pilot room. No guide can replace an on-site electrical assessment.",
        ],
        relatedLinks: [
          {
            title: "Hotel RCU Wiring and System Architecture Guide",
            href: "/en/resources/hotel-rcu-wiring-system-architecture-guide/",
            description:
              "Review room-level architecture, wiring responsibilities, and the information needed before detailed design.",
          },
        ],
      },
      {
        id: "phased-vs-full-floor",
        heading: "Phased Renovation vs Full-Floor Renovation",
        body: [
          "A phased plan can reduce the number of rooms out of service at one time and provide feedback before later batches. It also creates temporary boundaries between old and new systems, requires strict material and software version control, and can extend the period in which staff maintain two room configurations.",
          "A full-floor plan can simplify access, trade sequencing, testing, and handover for a defined zone, but it requires a larger operational release and stronger readiness before work starts. The hotel should compare occupancy forecasts, contractor capacity, storage, room inspection resources, guest-routing impacts, and recovery time for unexpected conditions.",
          "Whichever method is selected, define a room release checklist, defect process, spare strategy, staff briefing, and escalation route. Do not promise a no-closure renovation without an approved construction and operations plan.",
        ],
      },
      {
        id: "key-hardware",
        heading: "Key Hardware for a Smart Room Upgrade",
        body: [
          "A renovation package may include an RCU host or controller cabinet, smart switch panels, thermostat or HVAC panel, curtain controls, key-card energy saver, door contact, presence sensor, doorbell, room-status panel, sockets, displays, and selected audio or communication devices. The list should follow the approved room workflow rather than a generic bundle.",
          "For each device, record quantity per room, mounting, dimensions, power, signal or protocol, connected function, finish, labels, replacement access, and required documents. A visible family should be reviewed for consistent appearance, while each internal device remains subject to model-specific technical confirmation.",
          "Spare products, tools, configuration records, firmware or parameter ownership where applicable, and replacement procedures should be considered during procurement. Renovation success depends on maintainability after handover as much as on the opening-day appearance.",
        ],
      },
      {
        id: "guest-operations-priorities",
        heading: "Guest Experience and Operational Priorities",
        body: [
          "Prioritize controls that guests can understand quickly: clear lighting scenes, predictable master control, accessible bedside functions, readable thermostat behavior, intuitive curtain controls, and visible service status. More automation is not automatically a better experience if the interface is inconsistent or removes an expected manual option.",
          "Operations teams need reliable room-status logic, straightforward fault isolation, documented overrides, accessible spares, and staff training. Housekeeping, front office, engineering, IT, security, and management should review the pilot because each team sees different failure modes and workflow needs.",
        ],
      },
      {
        id: "existing-system-integration",
        heading: "Integration with Existing Hotel Systems",
        body: [
          "List every intended connection to locks, PMS, BMS, HVAC, network, energy management, or other systems and identify the owner of each interface. Request the actual technical documents and define whether the scope needs status exchange, commands, monitoring, or only independent room operation.",
          "RCU products do not automatically support KNX, BACnet, Modbus, PMS, or another interface. Capability depends on the exact product, gateway, software, project architecture, and engineering work. A pilot should test the approved integration using representative devices and realistic operating scenarios.",
        ],
      },
      {
        id: "renovation-risks",
        heading: "Common Renovation Risks",
        body: [
          "Risks include incomplete surveys, hidden wiring changes, inconsistent room types, unavailable legacy documents, insufficient wall-box depth, unverified loads, late finish selections, access conflicts, long-lead components, missing integration owners, and acceptance criteria that are defined only after installation. A risk register should assign an owner, action, and decision date to each uncertainty.",
          "Another common mistake is scaling from a desk review directly to the whole property. A controlled pilot reveals installation time, fit, wiring exceptions, guest-interface issues, commissioning steps, and handover needs. The pilot does not remove all risk, but it converts assumptions into evidence before wider procurement.",
        ],
      },
      {
        id: "supplier-information",
        heading: "Information to Provide to a Supplier",
        body: [
          "Provide room-type plans, survey photographs, current device list, known wiring information, desired functions, items to retain, room quantities, renovation sequence, voltage, target market, interface requirements, panel finish, branding, sample needs, and document requests. Mark details that still require on-site confirmation.",
          "For a comparable quotation, ask suppliers to identify included hardware, exclusions, assumed wiring, commissioning boundaries, customization scope, sample process, documents, production lead time, and validity of any interface statement. Avoid comparing totals when the device and service scopes differ.",
        ],
      },
      {
        id: "pilot-room",
        heading: "Pilot Room and Sample Approval",
        body: [
          "Choose a representative room with the typical wiring and enough access to inspect work. If room types differ materially, more than one pilot may be necessary. Define the approved device list, drawings, installation method, test script, guest scenarios, operational checks, finish standard, snag process, and who signs acceptance.",
          "Run the pilot long enough to observe normal operation and maintenance access. Confirm panels, HVAC behavior, curtains, sensors, door status, service indicators, manual overrides, fault recovery, and any approved integrations. Record revisions before ordering or releasing the next batch.",
        ],
        relatedLinks: [
          {
            title: "Hotel Occupancy Sensor Selection Guide",
            href: "/en/resources/hotel-occupancy-sensor-selection-guide/",
            description:
              "Define sensing objectives, room logic, placement questions, and controller relationships for the pilot.",
          },
          {
            title: "Hotel Doorplate and Room Display Buying Guide",
            href: "/en/resources/hotel-doorplate-room-display-buying-guide/",
            description:
              "Review DND, MUR, doorbell, room display, finish, and signal requirements.",
          },
        ],
      },
      {
        id: "renovation-checklist",
        heading: "Renovation Project Checklist",
        body: [
          "Before design, complete surveys and confirm room variants, wiring responsibilities, integration owners, operational constraints, and upgrade priorities. Before procurement, approve the pilot scope, product list, finish, quantities, interfaces, documents, spares, and commercial boundaries. Before rollout, close pilot issues, freeze records, train teams, and define room release and support procedures.",
          "A renovation plan should remain evidence-based. Share the survey, room schedule, device interests, drawings, quantities, voltage, integration scope, and phasing assumptions for supplier review, then let qualified project engineers confirm all site electrical and installation decisions.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Plan room functions, panels, HVAC, curtains, sensing, status, and power workflows as one renovation scope.",
      },
      {
        title: "Smart Hotel Automation Solution",
        href: "/en/solutions/smart-hotel-automation-solution/",
        description:
          "Review automation devices and room-level workflows for phased or full guest room upgrades.",
      },
      {
        title: "RCU Room Control Solution",
        href: "/en/solutions/rcu-room-control-solution/",
        description:
          "Coordinate RCU hosts, cabinets, panels, sensors, and verified wiring requirements.",
      },
    ],
    relatedProducts: [
      {
        title: "Hotel Smart Room RCU Host 1",
        href: "/en/products/hotel-smart-room-rcu-host-1/",
        description:
          "Room control host reference for reviewing existing circuits, connected devices, and replacement scope.",
      },
      {
        title: "Smart Four Key Scene Control Panel",
        href: "/en/products/smart-four-key-scene-control-panel/",
        description:
          "Guest-facing scene panel for layout, function, wall-box, and finish review in a pilot room.",
      },
      {
        title: "Thermostat HVAC Control Panel",
        href: "/en/products/thermostat-hvac-control-panel/",
        description:
          "Thermostat reference for confirming actual HVAC interfaces and guest-control requirements.",
      },
      {
        title: "Embedded Human Presence Sensor",
        href: "/en/products/embedded-human-presence-sensor/",
        description:
          "Presence-sensing option for defining room logic, mounting, wiring, and pilot acceptance.",
      },
    ],
    relatedRegions: [{ title: "Southeast Asia", href: "/en/regions/southeast-asia/" }],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Review public catalogs and request model-specific wiring or product documents after the survey scope is defined.",
      },
    ],
    conversion: {
      midCtaAfterSectionId: "reuse-or-rewire",
      continueReadingSlugs: [
        "hotel-guest-room-automation-guide",
        "hotel-rcu-wiring-system-architecture-guide",
        "hotel-occupancy-sensor-selection-guide",
      ],
    },
    cta: {
      title: "Review a hotel renovation room-control scope",
      body: "Share room types, survey findings, existing devices, wiring information, upgrade priorities, quantities, voltage, phasing, and integration questions for a project-specific product review.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request renovation product documents",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to discuss a smart room upgrade for a hotel renovation project.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "smart-panel-material-finish-selection-guide",
    title: "Smart Panel Material and Finish Selection Guide",
    h1: "Smart Panel Material and Finish Selection Guide",
    seoTitle: "Smart Panel Material and Finish Selection Guide",
    metaDescription:
      "Compare smart panel materials, surface finishes, colors, icons, and sample approval factors for hotel design, procurement, and OEM/ODM projects.",
    summary:
      "A buyer and designer guide to comparing panel materials, visible finishes, color behavior, key layouts, maintenance questions, and physical sample approval.",
    category: "Guide",
    topic: "Panel materials and finishes",
    listingGroup: "Buying Guides",
    readingTime: "14 min read",
    primaryKeyword: "smart panel material finish selection",
    secondaryKeywords: [
      "hotel switch panel material guide",
      "smart panel surface finish",
      "custom hotel panel color",
      "OEM panel sample approval",
    ],
    audience: [
      "Hotel owner",
      "OEM/ODM buyer",
      "Distributor",
      "Contractor",
      "System integrator",
    ],
    lastReviewed: "2026-07-15",
    sections: [
      {
        id: "why-material-finish-matter",
        heading: "Why Panel Material and Finish Matter",
        body: [
          "Hotel control panels are both working interfaces and visible interior elements. Guests touch them repeatedly, staff clean around them, contractors install them alongside wall finishes, and designers expect them to support a consistent room language. Material and finish decisions therefore affect appearance, tactile impression, readability, maintenance discussion, sample approval, and the way a family of switches, thermostats, sockets, and door devices looks together.",
          "A finish name is not a complete specification. Two suppliers may use similar words for surfaces that differ in color, gloss, texture, edge detail, substrate, coating, printing, or manufacturing method. Buyers should connect every appearance term to an actual product series, approved sample, drawing, and project requirement.",
          "Visual preference must also remain separate from performance claims. A metal-looking surface is not automatically a confirmed metal grade, and a matte appearance does not prove scratch, chemical, fire, water, antimicrobial, or corrosion performance. Any technical property must be verified for the exact product rather than inferred from photographs or marketing language.",
        ],
      },
      {
        id: "material-categories",
        heading: "Main Panel Material Categories",
        body: [
          "Material categories help organize a shortlist, but the final construction may combine a visible face, frame, carrier, electronics, touch layer, printing, coating, and mounting parts. Ask which material applies to the visible area and which applies to the supporting structure. Product samples and model-specific documents should resolve the final choice.",
        ],
        subsections: [
          {
            id: "glass-panels",
            heading: "Glass",
            body: [
              "Glass can support a smooth, clean visual field and printed or backlit icon treatments. Buyers should review reflections, edge treatment, color layer, icon visibility, touch behavior, mounting, replacement process, cleaning guidance, and the specific product's verified construction. Glass should not be described as universally more premium or durable than other materials.",
            ],
          },
          {
            id: "metal-panels",
            heading: "Metal",
            body: [
              "Metal can provide a distinct tactile and visual character, from contemporary to decorative. The exact metal, thickness, surface process, coating, edges, and environmental suitability need product confirmation. A metallic appearance alone does not establish the substrate or any resistance rating.",
            ],
          },
          {
            id: "aluminum-panels",
            heading: "Aluminum",
            body: [
              "Aluminum is often discussed separately because it can support brushed or other visible finish directions. Buyers should compare grain consistency, color, frame alignment, icon method, cut edges, and matching across devices. Do not assume a generic aluminum grade or performance level unless the exact model documentation confirms it.",
            ],
          },
          {
            id: "polymer-panels",
            heading: "Plastic or Engineering Polymer",
            body: [
              "Polymer construction can support molded shapes, colors, textures, and practical product platforms. Review visible quality, color consistency, joint lines, mounting, cleaning, and the actual resin or performance information only when supplied for that model. It is inaccurate to treat all polymer panels as one material class with identical behavior.",
            ],
          },
          {
            id: "mixed-material-panels",
            heading: "Mixed-Material Construction",
            body: [
              "Many panel families combine materials to balance appearance, structure, electronics, and installation. Ask for an exploded description or sample review when the distinction matters. The buyer should approve the visible result and model-specific construction without converting a design description into an unsupported performance claim.",
            ],
          },
        ],
      },
      {
        id: "surface-finishes",
        heading: "Common Surface Finishes",
        body: [
          "Surface finish changes how a panel reads under daylight, warm bedside lighting, corridor lighting, and photography. It also changes the visibility of fingerprints, dust, cleaning marks, scratches, icons, and edge details. Always review the finish on the intended product shape because the same color can appear different across materials and processes.",
        ],
        subsections: [
          {
            id: "brushed-finish",
            heading: "Brushed Finish",
            body: [
              "A brushed direction creates visible linear texture and can emphasize alignment across a panel family. Review grain direction, consistency, color, icon contrast, joints, and how adjacent products align. The Brushed Aluminum Series provides a real project reference, but final construction and finish remain model-specific.",
            ],
          },
          {
            id: "matte-finish",
            heading: "Matte Finish",
            body: [
              "Matte surfaces reduce strong reflections and can support a quiet visual expression, but fingerprint and cleaning behavior still varies by material and process. The Borui Series is defined by its red matte appearance; buyers should use a physical sample to approve the actual red tone and texture.",
            ],
          },
          {
            id: "gloss-finish",
            heading: "Gloss Finish",
            body: [
              "Gloss surfaces can create depth and clear color but may show reflected light, fingerprints, or fine marks differently. Review them in the room's intended lighting and at typical viewing angles. No universal maintenance or scratch conclusion should be made from gloss level alone.",
            ],
          },
          {
            id: "metallic-finish",
            heading: "Metallic Finish",
            body: [
              "Metallic appearance can come from several materials and processes. Clarify whether the term describes the visible effect or the actual substrate, then approve the exact sample. Icon color and backlighting should be reviewed against the reflective surface.",
            ],
          },
          {
            id: "vintage-decorative-finish",
            heading: "Vintage or Decorative Finish",
            body: [
              "Decorative finishes can support boutique, heritage, or richly detailed interiors. The Vintage Gold Series is a confirmed series direction. Buyers should compare it with other metal, fabric, stone, furniture, and lighting samples rather than rely on a digital color alone.",
            ],
          },
          {
            id: "custom-color-finish",
            heading: "Custom Color Finish",
            body: [
              "Custom color work begins with a product series, mold, material, finish process, color reference, sample method, and approval tolerance. Under current terms, using an existing mold and changing only the color does not require a customization fee. Other changes may add sample, customization, or tooling scope and must be reviewed separately.",
            ],
          },
        ],
      },
      {
        id: "match-hotel-design",
        heading: "How to Match a Panel to Hotel Design",
        body: [
          "Start from the room's materials, lighting, furniture, hardware, wall colors, guest profile, and brand guidelines, then shortlist panel families that fit the overall language. The control should remain easy to find and read; blending it into the wall should not make keys or status indicators ambiguous.",
        ],
        subsections: [
          {
            id: "luxury-hotel",
            heading: "Luxury Hotel",
            body: [
              "Review detail consistency, alignment, tactile quality, icon refinement, finish matching, and how switches, thermostats, sockets, and service panels form one family. A luxury brief still needs technical fit and maintainability, not appearance alone.",
            ],
          },
          {
            id: "business-hotel",
            heading: "Business Hotel",
            body: [
              "Prioritize clear functions, fast recognition, consistent room layouts, straightforward replacement, and a finish that supports frequent operation. Decorative complexity should not reduce usability or spare management.",
            ],
          },
          {
            id: "resort-hotel",
            heading: "Resort",
            body: [
              "Consider the interior palette, daylight, local maintenance conditions, and any environmental requirements identified by the project team. Suitability for humidity, salt, heat, or cleaning regimes must be verified for the exact model; it cannot be assumed from material category.",
            ],
          },
          {
            id: "boutique-hotel",
            heading: "Boutique Hotel",
            body: [
              "A distinctive color, vintage finish, custom icon set, or nonstandard layout can support a strong concept. Check whether the chosen existing mold can deliver the design or whether new tooling is justified by quantity, schedule, and brand value.",
            ],
          },
          {
            id: "extended-stay",
            heading: "Apartment or Extended Stay",
            body: [
              "Review the broader mix of switches, sockets, HVAC, curtains, and information points expected in longer-stay rooms. Consistency, labels, replacement access, and cleaning guidance may be more important than an isolated decorative feature.",
            ],
          },
        ],
      },
      {
        id: "durability-maintenance",
        heading: "Durability and Maintenance Considerations",
        body: [
          "Ask how the visible face, icons, keys, touch surface, frame, and mounting are constructed and replaced. Discuss expected cleaning agents, frequency, staff methods, spare parts, removal access, and whether visible components can be changed without disturbing the wall finish. Use verified model documents for any performance requirement.",
          "Do not rank materials with absolute statements such as metal always lasts longer than glass. Durability depends on design, process, installation, environment, use, cleaning, and the exact product. A physical sample and project-specific document review provide a more reliable basis for selection.",
        ],
      },
      {
        id: "fingerprints-scratches-cleaning",
        heading: "Fingerprints, Scratches and Cleaning",
        body: [
          "Inspect samples after normal handling and under side lighting, because marks that are invisible in a catalog can become prominent in a room. Ask for cleaning guidance and test the hotel's proposed routine on an approved sample when appropriate. Avoid unverified claims about fingerprint resistance, antimicrobial properties, scratch grades, or chemical resistance.",
          "The housekeeping team should review ease of wiping around keys, edges, sockets, and raised details. Maintenance should also consider how damaged faceplates are identified, stored, and replaced while preserving color consistency across rooms.",
        ],
      },
      {
        id: "color-lighting",
        heading: "Color and Lighting Conditions",
        body: [
          "Evaluate color beside the actual wall covering, furniture hardware, stone, timber, fabric, and lighting. Warm and cool light can change perceived red, gold, silver, black, and white tones. Camera settings and screens introduce further differences, so digital approval should be followed by a controlled physical sample review.",
          "Define which sample is the master reference, who approves it, and how later production is compared. For a coordinated family, place several device types together because different shapes and materials can make one nominal color look different.",
        ],
      },
      {
        id: "icons-labels-layout",
        heading: "Icons, Labels and Key Layout",
        body: [
          "Icon size, stroke, contrast, illumination, language, abbreviations, and key order affect usability as much as finish. Review controls at standing, bedside, and corridor distances. Ensure important functions are distinguishable in daylight and at night without assuming every guest understands a custom symbol.",
          "Keep a controlled artwork file and match it to the selected model. Changing key count or layout can affect electronics, molds, and function logic, so it should not be treated as a printing change until the product team confirms feasibility.",
        ],
        relatedLinks: [
          {
            title: "Hotel Smart Switch Panel Guide",
            href: "/en/resources/hotel-smart-switch-panel-guide/",
            description:
              "Connect material and finish choices to room functions, wiring, and panel procurement.",
          },
          {
            title: "Hotel Doorplate and Room Display Buying Guide",
            href: "/en/resources/hotel-doorplate-room-display-buying-guide/",
            description:
              "Review corridor-facing appearance, DND/MUR functions, icons, and room display requirements.",
          },
        ],
      },
      {
        id: "mold-custom-appearance",
        heading: "Existing Mold vs Custom Appearance",
        body: [
          "Use an existing mold when its dimensions, mounting, proportions, and product platform fit the brief. Color, logo, icons, and selected finish changes may provide enough differentiation with less structural development. Confirm each change against the chosen series and current purchasing terms.",
          "New tooling may be needed for a different shape, dimensions, frame, structural arrangement, or other physical change. It can add cost, quantity conditions, samples, and schedule. Buyers should first decide whether the distinctive appearance creates enough project value to justify the added development path.",
        ],
        relatedLinks: [
          {
            title: "OEM/ODM Hotel Control Panel Development Process",
            href: "/en/resources/oem-odm-hotel-control-panel-development-process/",
            description:
              "Follow requirements, artwork, prototype, tooling, pilot, and production preparation in sequence.",
          },
        ],
      },
      {
        id: "sample-approval",
        heading: "Sample Approval and Color Confirmation",
        body: [
          "Approve samples using the final product shape where possible. Record model, material description, finish, color reference, artwork version, lighting conditions, date, and approver. Compare several panel types together if the room uses a family, and include the interior designer, procurement team, engineering team, and hotel operator where their decisions differ.",
          "The approved sample should be retained as a reference for production discussion. A sample confirms the reviewed appearance and functions; it does not create unverified certifications or universal performance guarantees.",
        ],
      },
      {
        id: "selection-mistakes",
        heading: "Common Selection Mistakes",
        body: [
          "Frequent mistakes include selecting from a screen only, using a finish name as a full specification, ignoring room lighting, mixing panel families without a physical comparison, approving icons after the sample, assuming a material property without documentation, and choosing a surface without housekeeping input. Another is focusing on appearance before confirming wall box, wiring, function, and controller compatibility.",
          "Avoid treating one sample as proof for every related product. A switch, thermostat, socket, and doorplate can use different construction even when they share a visual series. Each required model should be included in the approval matrix.",
        ],
      },
      {
        id: "material-finish-checklist",
        heading: "Material and Finish Checklist",
        body: [
          "Confirm product series, visible material, supporting construction where relevant, finish, color, gloss or texture direction, icons, labels, illumination, key layout, wall-box fit, cleaning guidance, replacement method, sample owner, and required model documents. Separate verified performance requirements from visual preferences.",
          "For an OEM/ODM inquiry, send room renderings, material boards, reference photos, color direction, target panel types, quantities, drawings, logo and artwork, market, and schedule. Final material, color, process, and performance decisions should be based on the selected product samples and project confirmation.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "OEM/ODM Custom Panel Solution",
        href: "/en/solutions/oem-odm-custom-panel-solution/",
        description:
          "Coordinate product series, color, logo, key layout, finish, sample, and packaging requirements.",
      },
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Match visible panel choices to the room's control devices, functions, and installation scope.",
      },
    ],
    relatedProducts: [
      {
        title: "Borui Red Matte Room Status Four Key Switch Panel",
        href: "/en/products/borui-red-matte-room-status-four-key-switch-panel/",
        description:
          "Borui Series reference with a confirmed red matte visual direction for sample review.",
      },
      {
        title: "Vintage Gold Four Key Smart Switch Panel",
        href: "/en/products/vintage-gold-four-key-smart-switch-panel/",
        description:
          "Vintage Gold Series reference for decorative color, icon, and key-layout comparison.",
      },
      {
        title: "Brushed Aluminum 86 Base Doorbell Panel",
        href: "/en/products/brushed-aluminum-86-base-doorbell-panel/",
        description:
          "Brushed Aluminum Series reference for grain, icon contrast, and corridor-device coordination.",
      },
      {
        title: "Smart Series Dual Vertical Socket Panel",
        href: "/en/products/smart-series-dual-vertical-socket-panel/",
        description:
          "Smart Series reference for coordinating socket appearance within a wider panel family.",
      },
    ],
    relatedRegions: [{ title: "Middle East", href: "/en/regions/middle-east/" }],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Review current product series and request model-specific material or finish information after shortlisting.",
      },
    ],
    conversion: {
      midCtaAfterSectionId: "match-hotel-design",
      continueReadingSlugs: [
        "oem-odm-smart-panel-customization-guide",
        "oem-odm-hotel-control-panel-development-process",
        "hotel-doorplate-room-display-buying-guide",
      ],
    },
    cta: {
      title: "Compare panel materials and finishes for your project",
      body: "Share room visuals, material references, target panel types, series interests, quantities, color, logo, key layout, market, and sample needs for a project-specific review.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request panel series documents",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to compare smart panel materials and finishes for a hotel project.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
  {
    slug: "knx-vs-rcu-hotel-room-control",
    title: "KNX vs RCU for Hotel Room Control",
    h1: "KNX vs RCU for Hotel Room Control",
    seoTitle: "KNX vs RCU for Hotel Room Control",
    metaDescription:
      "Compare KNX and RCU hotel room control architectures across wiring, commissioning, integration, maintenance, renovation, and project selection factors.",
    summary:
      "A neutral architecture comparison for hotel owners, consultants, contractors, and integrators deciding how KNX and RCU approaches fit project requirements.",
    category: "Guide",
    topic: "KNX and RCU architecture",
    listingGroup: "Technical Resources",
    readingTime: "16 min read",
    primaryKeyword: "KNX vs RCU hotel room control",
    secondaryKeywords: [
      "hotel RCU architecture comparison",
      "KNX hotel room control system",
      "RCU or KNX for hotel",
      "hotel automation architecture selection",
    ],
    audience: [
      "Hotel owner",
      "System integrator",
      "Contractor",
      "Distributor",
      "OEM/ODM buyer",
    ],
    lastReviewed: "2026-07-15",
    sections: [
      {
        id: "rcu-based-system",
        heading: "What Is an RCU-Based Hotel Room Control System",
        body: [
          "An RCU, or room control unit, is a room-level controller or control-host approach commonly used to coordinate guest-room functions. Depending on the product and design, the room scope may include lighting circuits, HVAC, curtains, panels, door status, service indicators, occupancy inputs, and selected power functions. The RCU can centralize room inputs and outputs or participate in a wider distributed design.",
          "RCU is an architecture and product-category description, not one universal communication protocol. Different hosts can use different wiring, panel connections, interfaces, software, gateways, and central monitoring methods. Buyers must review the exact RCU, connected devices, and project design rather than assume that all RCU systems interoperate.",
          "An RCU-based room can also operate with a defined degree of room-level independence. How it reports to central systems, exchanges commands, or integrates with PMS, BMS, KNX, Modbus, BACnet, or another platform depends on confirmed product capability and project engineering. DualCoreLink products should not be described as natively supporting an interface unless the exact model and scope are verified.",
        ],
      },
      {
        id: "knx-in-hotels",
        heading: "What Is KNX in Hotel Room Control",
        body: [
          "KNX is a standardized building automation protocol ecosystem used across residential and commercial applications. In a hotel, a KNX design can connect compatible devices for lighting, shading, HVAC, sensing, room operation, and supervisory functions according to the selected topology, device capabilities, engineering tools, and system design.",
          "A KNX label does not by itself define the complete hotel solution. Device certification or capability, application programs, topology, power supplies, line design, addressing, commissioning, gateways, visualizations, room logic, and integration responsibilities still need to be specified. Local engineering skills and long-term access to project files are important parts of the operating model.",
          "This comparison treats KNX as a protocol ecosystem and RCU as a common hotel room controller or architecture approach. They are not exact opposites: an RCU design may use a gateway or verified interface, and a KNX project can still use room-level controllers or logic modules. The actual architecture matters more than the label.",
        ],
      },
      {
        id: "architectural-differences",
        heading: "Key Architectural Differences",
        body: [
          "Compare a proposed KNX and RCU design from drawings, schedules, product data, and responsibility matrices. Broad claims such as one is always simpler, cheaper, or more flexible are not reliable without a defined project scope.",
        ],
        subsections: [
          {
            id: "control-structure",
            heading: "Control Structure",
            body: [
              "An RCU proposal often organizes functions around a room control host and its connected inputs, outputs, panels, and sensors. A KNX proposal may distribute functions among bus devices and application logic. Either design can include central supervision, room-level logic, gateways, or additional controllers depending on the specification.",
            ],
          },
          {
            id: "wiring-approach",
            heading: "Wiring Approach",
            body: [
              "RCU wiring can bring room circuits and control signals to a cabinet or host, while panel and sensor wiring follows the selected product system. KNX uses its specified bus arrangement alongside power circuits. Cable type, separation, topology, protection, containment, and local rules must be designed by qualified engineers for the actual installation.",
            ],
          },
          {
            id: "device-communication",
            heading: "Device Communication",
            body: [
              "KNX communication follows the KNX ecosystem for compatible devices. RCU-connected devices may use dry contacts, dedicated buses, serial links, network links, or manufacturer-specific methods. The precise interface must be confirmed model by model; visual similarity does not prove communication compatibility.",
            ],
          },
          {
            id: "room-independence",
            heading: "Room-Level Independence",
            body: [
              "Both approaches can be designed so essential room functions continue without a central server, but this depends on where logic resides and how failures are handled. Ask what happens if the network, gateway, central software, room host, bus power, or individual device fails.",
            ],
          },
          {
            id: "central-monitoring",
            heading: "Central Monitoring",
            body: [
              "Central monitoring requires defined points, interfaces, software, network, permissions, and ownership. Neither an RCU nor KNX label guarantees PMS or BMS integration. Confirm whether the hotel needs viewing, alarms, commands, trends, room status, or another data exchange.",
            ],
          },
          {
            id: "engineering-commissioning",
            heading: "Engineering and Commissioning",
            body: [
              "KNX commissioning typically needs appropriate tools, device application knowledge, addressing, and access to project files. RCU commissioning needs the selected host, I/O logic, connected-device setup, room testing, and any gateway or central software configuration. Compare local skills, documentation, test scope, and support ownership for both proposals.",
            ],
          },
        ],
        relatedLinks: [
          {
            title: "Hotel RCU Wiring and System Architecture Guide",
            href: "/en/resources/hotel-rcu-wiring-system-architecture-guide/",
            description:
              "Review room-controller components, wiring boundaries, and design information in more detail.",
          },
        ],
      },
      {
        id: "project-requirement-comparison",
        heading: "Comparison by Project Requirement",
        body: [
          "Architecture selection should start from the hotel brief, not a preferred brand or protocol. Define room types, functions, integration scope, construction stage, maintenance resources, standards, procurement model, and acceptance method before requesting a comparison.",
        ],
        subsections: [
          {
            id: "new-construction",
            heading: "New Construction",
            body: [
              "New construction offers more freedom to coordinate topology, cabinets, wall boxes, bus or control wiring, network, HVAC interfaces, and commissioning. Both KNX and RCU approaches can be evaluated early against the electrical and interior design, provided responsibilities and interfaces are explicit.",
            ],
          },
          {
            id: "renovation-comparison",
            heading: "Renovation",
            body: [
              "Renovation decisions are constrained by existing wiring, room access, installed systems, wall finishes, and phased operations. Neither architecture is automatically easier. Survey the building, identify reusable infrastructure, and test a representative pilot before assuming cost or downtime.",
            ],
          },
          {
            id: "standard-room-types",
            heading: "Standardized Room Types",
            body: [
              "Repeated room types can benefit from a controlled template in either architecture. Compare how drawings, configurations, addresses, I/O schedules, labels, tests, and replacement records are replicated and governed across rooms.",
            ],
          },
          {
            id: "customized-rooms",
            heading: "Highly Customized Rooms",
            body: [
              "Suites and branded rooms may need extra scenes, interfaces, panels, sensors, or individual logic. Evaluate whether the selected devices, engineering tools, controller capacity, and commissioning process can support those differences without making maintenance unclear.",
            ],
          },
          {
            id: "local-integration-resources",
            heading: "Local Integration Resources",
            body: [
              "Local designers, installers, programmers, commissioning engineers, and support partners can strongly influence delivery risk. Confirm available skills for the actual products and tools, not only general experience with a category.",
            ],
          },
          {
            id: "maintenance-capability",
            heading: "Maintenance Capability",
            body: [
              "Compare fault isolation, spare strategy, product replacement, configuration ownership, backups, documentation, training, and access to software or engineering files. The hotel should be able to identify room faults and restore service within its operating model.",
            ],
          },
          {
            id: "budget-structure",
            heading: "Budget Structure",
            body: [
              "Compare devices, panels, controllers, power supplies, gateways, software, engineering, programming, drawings, testing, commissioning, training, spares, and support using the same scope. KNX is not always more expensive, and RCU is not always cheaper. Quantities, brands, design, local labor, integration, and service boundaries determine the quotation.",
            ],
          },
        ],
        relatedLinks: [
          {
            title: "Hotel Room Control System Cost Factors",
            href: "/en/resources/hotel-room-control-system-cost-factors/",
            description:
              "Build comparable quotations around device, engineering, integration, customization, and service scope.",
          },
          {
            title: "Hotel Renovation Smart Room Upgrade Guide",
            href: "/en/resources/hotel-renovation-smart-room-upgrade-guide/",
            description:
              "Apply architecture selection to existing wiring, phased works, pilot rooms, and renovation risk.",
          },
        ],
      },
      {
        id: "hardware-panel-considerations",
        heading: "Hardware and Panel Considerations",
        body: [
          "List RCU hosts or controllers, output devices, KNX devices where specified by the project, panels, thermostats, sensors, door contacts, doorplates, curtain controls, power supplies, gateways, network equipment, cabinets, and accessories. For each item, record interface, mounting, supply, function, configuration, replacement, and documentation.",
          "Guest-facing panels should be selected for room functions, usability, finish, wall-box fit, and verified connection method. A panel's appearance does not prove that it is a KNX device or compatible with a particular RCU. Only link products that actually exist and describe them according to confirmed project review needs.",
        ],
      },
      {
        id: "integration-considerations",
        heading: "Integration Considerations",
        body: [
          "Define required PMS, BMS, HVAC, lock, energy, network, or central-control data points and who supplies each interface. Ask for protocol documents, point lists, gateway scope, licenses, network responsibilities, test environments, and acceptance scenarios. A gateway can connect defined systems, but it does not remove the need for engineering and validation.",
          "RCU support for KNX, Modbus, BACnet, PMS, or another method depends on the exact product and design. Similarly, a KNX installation may need separate gateways or software for non-KNX platforms. Do not turn a planned integration into a product-wide compatibility claim.",
        ],
      },
      {
        id: "maintenance-expansion",
        heading: "Maintenance and Future Expansion",
        body: [
          "Ask how rooms are diagnosed, how configurations are backed up, which files the hotel receives, how replacement devices are commissioned, and what happens when a product generation changes. Keep as-built drawings, addresses, I/O schedules, parameter records, software versions, gateway settings, sample approvals, and spare inventories under controlled ownership.",
          "Future expansion should be evaluated against actual capacity, topology, software, interfaces, and available products. Neither architecture offers unlimited expansion by default. A modular plan with documented boundaries is more useful than a broad flexibility claim.",
        ],
      },
      {
        id: "when-rcu-suitable",
        heading: "When an RCU Architecture May Be Suitable",
        body: [
          "An RCU approach may suit a project that wants a defined room-control package, room-level I/O coordination, repeatable room templates, centralized cabinet or host planning, and panels and sensors selected around that host. It can also be considered where the project team has experience with the selected RCU platform and clear support arrangements.",
          "Suitability still depends on circuit count, loads, devices, wiring, room types, interfaces, central requirements, documentation, and commissioning capacity. Review exact products and a representative room rather than assuming all RCU systems share the same strengths.",
        ],
        relatedLinks: [
          {
            title: "Hotel RCU Buying Guide",
            href: "/en/resources/hotel-rcu-buying-guide/",
            description:
              "Translate an RCU architecture decision into product, room-function, document, and quotation requirements.",
          },
        ],
      },
      {
        id: "when-knx-suitable",
        heading: "When KNX May Be Suitable",
        body: [
          "KNX may suit projects that deliberately specify the KNX ecosystem, have qualified design and commissioning resources, select compatible devices, and want a standards-based bus approach across defined room or building functions. The hotel should plan tool access, application files, addressing, gateways, maintenance skills, and long-term documentation.",
          "This does not imply that every KNX design is the same or that DualCoreLink offers a dedicated KNX product range. If a project requires KNX, each proposed RCU, panel, thermostat, sensor, or gateway relationship must be verified before inclusion.",
        ],
      },
      {
        id: "hybrid-gateway",
        heading: "Hybrid and Gateway-Based Approaches",
        body: [
          "Some hotel designs use room controllers for local I/O and connect selected data to another building platform through a verified gateway. Others combine bus devices with local logic or separate subsystems. A hybrid can preserve appropriate boundaries, but it also adds interface ownership, mapping, testing, fault diagnosis, and version management.",
          "Document which system owns each function, where commands originate, how conflicts are resolved, what happens during communication loss, and who supports the gateway. Use the real project architecture; do not market a conceptual hybrid as confirmed compatibility.",
        ],
      },
      {
        id: "questions-before-choosing",
        heading: "Questions to Ask Before Choosing",
        body: [
          "Ask what room functions are required, where logic resides, which devices and protocols are confirmed, how rooms operate during central outages, how wiring is structured, what engineering tools are needed, who commissions the system, what files the hotel receives, and how replacement devices are restored. Clarify PMS, BMS, HVAC, lock, and central monitoring points individually.",
          "Request two comparable scopes if both architectures remain under consideration. Each should state hardware, software, gateways, engineering, installation assumptions, testing, training, spares, exclusions, and support. Reject claims that one option is always cheaper, faster, or universally compatible.",
        ],
      },
      {
        id: "selection-checklist",
        heading: "Selection Checklist",
        body: [
          "Confirm hotel type, construction stage, room variants, function schedule, wiring strategy, loads, panels, sensors, HVAC, doors, curtains, central monitoring, integrations, local engineering resources, maintenance model, documents, spares, commissioning, and acceptance tests. Score each architecture against the same verified requirements.",
          "The right choice is the one that the project can design, procure, install, commission, document, and maintain with clear responsibility. Share room plans, system requirements, target devices, interfaces, quantities, and project constraints for an RCU product review, while keeping any KNX or external integration statement subject to exact product and engineering confirmation.",
        ],
      },
    ],
    relatedSolutions: [
      {
        title: "RCU Room Control Solution",
        href: "/en/solutions/rcu-room-control-solution/",
        description:
          "Review real RCU hosts, cabinets, panels, sensors, and room-device coordination without implying KNX support.",
      },
      {
        title: "Hotel Guest Room Control Solution",
        href: "/en/solutions/hotel-guest-room-control-solution/",
        description:
          "Define guest-room functions and device relationships before selecting a control architecture.",
      },
      {
        title: "Smart Hotel Automation Solution",
        href: "/en/solutions/smart-hotel-automation-solution/",
        description:
          "Consider room-level automation workflows, system boundaries, and approved integration needs.",
      },
    ],
    relatedProducts: [
      {
        title: "RCU Controller Cabinet",
        href: "/en/products/rcu-controller-cabinet/",
        description:
          "RCU cabinet reference for room circuit, terminal, enclosure, and control-architecture planning.",
      },
      {
        title: "Hotel Smart Room RCU Host 1",
        href: "/en/products/hotel-smart-room-rcu-host-1/",
        description:
          "Room control host reference whose interfaces must be confirmed for the exact project.",
      },
      {
        title: "Thermostat HVAC Control Panel",
        href: "/en/products/thermostat-hvac-control-panel/",
        description:
          "HVAC control interface reference for model-specific wiring and architecture review.",
      },
      {
        title: "Embedded Human Presence Sensor",
        href: "/en/products/embedded-human-presence-sensor/",
        description:
          "Sensing reference for defining room logic and confirmed connection to the selected controller.",
      },
    ],
    relatedRegions: [{ title: "Middle East", href: "/en/regions/middle-east/" }],
    relatedDownloads: [
      {
        title: "Download Center",
        href: "/en/downloads/",
        description:
          "Review current RCU, panel, thermostat, and sensor catalogs before requesting model-specific interface documents.",
      },
    ],
    conversion: {
      midCtaAfterSectionId: "project-requirement-comparison",
      continueReadingSlugs: [
        "hotel-rcu-buying-guide",
        "hotel-rcu-wiring-system-architecture-guide",
        "smart-hotel-room-control-system-guide",
      ],
    },
    cta: {
      title: "Review a hotel room control architecture",
      body: "Share room plans, function schedules, wiring strategy, device interests, integration requirements, quantities, and local engineering constraints for a project-specific RCU review.",
      primaryLabel: "Get a Quote",
      primaryHref: "/en/contact/#get-a-quote",
      secondaryLabel: "Request RCU and device documents",
      secondaryHref: "/en/downloads/",
      whatsappLabel: "Contact on WhatsApp",
      whatsappMessage:
        "Hello DUALCORE LINK, I would like to compare KNX and RCU architecture for a hotel room control project.",
    },
    safeClaims: commonSafeClaims,
    forbiddenClaims: commonForbiddenClaims,
  },
];

export const resourceSlugs = resources.map((resource) => resource.slug);

export function getResourceBySlug(slug: string): ResourceGuide | undefined {
  return resources.find((resource) => resource.slug === slug);
}

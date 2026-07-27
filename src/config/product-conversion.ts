export type ProductConversionLink = {
  title: string;
  href: string;
  description: string;
};

export type ProductConversionProfile = {
  key: "rcu" | "display" | "panel" | "sensor" | "room-status";
  label: string;
  summary: string;
  highlights: Array<{ label: string; value: string }>;
  projectFit: string[];
  selectionChecks: string[];
  quoteChecklist: string[];
  solutions: ProductConversionLink[];
  resources: ProductConversionLink[];
  whatsappPrompt: string;
};

export type PriorityProductReinforcement = {
  heading: string;
  answer: string;
  decisionPoints: string[];
  links: ProductConversionLink[];
};

const rcuProfile: ProductConversionProfile = {
  key: "rcu",
  label: "RCU project planning",
  summary:
    "Evaluate the controller as part of the complete guest room architecture, including connected loads, panels, sensors, HVAC, curtains, service signals, and cabinet planning.",
  highlights: [
    { label: "Project role", value: "Guest room control core" },
    { label: "Buyer fit", value: "Contractors, integrators, hotel project teams" },
    { label: "Confirm first", value: "I/O, voltage, wiring and protocol" },
  ],
  projectFit: [
    "New-build hotel guest room control packages",
    "Room automation renovation or controller replacement",
    "Contractor and system-integrator RCU procurement",
  ],
  selectionChecks: [
    "List every controlled load, panel, sensor and service signal.",
    "Confirm supply voltage, I/O type, load ratings and cabinet location.",
    "Review wiring topology and required protocol with the project team.",
    "Request model-specific diagrams before formal specification or installation.",
  ],
  quoteChecklist: [
    "Room count and typical room types",
    "Point list or room function schedule",
    "Electrical, wiring and protocol requirements",
    "Required drawings, datasheets and target delivery timing",
  ],
  solutions: [
    {
      title: "RCU Room Control Solution",
      href: "/solutions/rcu-room-control-solution/",
      description: "Review the room-control architecture around the RCU.",
    },
    {
      title: "Hotel Guest Room Control Solution",
      href: "/solutions/hotel-guest-room-control-solution/",
      description: "Plan panels, sensors and room workflows as one package.",
    },
  ],
  resources: [
    {
      title: "Hotel RCU Buying Guide",
      href: "/resources/hotel-rcu-buying-guide/",
      description: "Compare RCU scope, documents and supplier questions.",
    },
    {
      title: "RCU Wiring and System Architecture Guide",
      href: "/resources/hotel-rcu-wiring-system-architecture-guide/",
      description: "Prepare the point list, topology and wiring discussion.",
    },
  ],
  whatsappPrompt:
    "Hello DUALCORE LINK, I would like to review this RCU product for a hotel project.",
};

const displayProfile: ProductConversionProfile = {
  key: "display",
  label: "Smart display selection",
  summary:
    "Define the screen's room role, required controls, mounting, power, interface expectations, and visual finish before comparing models.",
  highlights: [
    { label: "Project role", value: "Room control and information interface" },
    { label: "Buyer fit", value: "Hotel teams, integrators, OEM/ODM buyers" },
    { label: "Confirm first", value: "Functions, mounting, power and interface" },
  ],
  projectFit: [
    "Guest room control and information interfaces",
    "Smart apartment, villa and hospitality control projects",
    "OEM/ODM display and panel development requests",
  ],
  selectionChecks: [
    "Define the user functions and room devices the screen must address.",
    "Confirm wall box, mounting depth, power and installation position.",
    "Review interface and integration requirements by exact model.",
    "Confirm language, finish, logo and UI scope for customized projects.",
  ],
  quoteChecklist: [
    "Project type, room count and user scenarios",
    "Required screen functions and control scope",
    "Mounting, power and integration requirements",
    "Finish, branding, sample and schedule needs",
  ],
  solutions: [
    {
      title: "AI Smart Display Solution",
      href: "/solutions/ai-smart-display-solution/",
      description: "Review display roles and project integration planning.",
    },
    {
      title: "Smart Hotel Automation Solution",
      href: "/solutions/smart-hotel-automation-solution/",
      description: "Place the display within a wider room automation scope.",
    },
  ],
  resources: [
    {
      title: "Smart Hotel Room Control System Guide",
      href: "/resources/smart-hotel-room-control-system-guide/",
      description: "Map room devices, interfaces and project responsibilities.",
    },
    {
      title: "Hotel Guest Room Automation Guide",
      href: "/resources/hotel-guest-room-automation-guide/",
      description: "Prepare the broader guest room automation package.",
    },
  ],
  whatsappPrompt:
    "Hello DUALCORE LINK, I would like to review this smart display for a project.",
};

const panelProfile: ProductConversionProfile = {
  key: "panel",
  label: "Panel and room interface selection",
  summary:
    "Match the panel to the room function, wall box, electrical or control requirement, finish, labeling, and wider panel schedule.",
  highlights: [
    { label: "Project role", value: "Room-side control or service interface" },
    { label: "Buyer fit", value: "Hotel contractors, distributors, OEM/ODM buyers" },
    { label: "Confirm first", value: "Function, wiring, wall box and finish" },
  ],
  projectFit: [
    "Hotel bedside, entrance and room-control panel schedules",
    "Renovation or replacement of room-side interfaces",
    "Distributor and OEM/ODM panel programs",
  ],
  selectionChecks: [
    "Confirm the exact button, socket, HVAC or curtain function required.",
    "Review voltage, wiring, load and interface requirements by model.",
    "Confirm wall box, dimensions, finish, legends and language.",
    "Use samples or approved drawings before bulk project ordering.",
  ],
  quoteChecklist: [
    "Panel schedule and quantity by room type",
    "Functions, legends, language and electrical requirements",
    "Wall box, finish, color and branding references",
    "Sample, packaging, documents and delivery target",
  ],
  solutions: [
    {
      title: "OEM / ODM Custom Panel Solution",
      href: "/solutions/oem-odm-custom-panel-solution/",
      description: "Review finish, labels, layout and development inputs.",
    },
    {
      title: "Hotel Guest Room Control Solution",
      href: "/solutions/hotel-guest-room-control-solution/",
      description: "Coordinate panels with the complete room-control package.",
    },
  ],
  resources: [
    {
      title: "Hotel Smart Switch Panel Guide",
      href: "/resources/hotel-smart-switch-panel-guide/",
      description: "Compare panel functions, finishes and project checks.",
    },
    {
      title: "OEM/ODM Smart Panel Customization Guide",
      href: "/resources/oem-odm-smart-panel-customization-guide/",
      description: "Prepare branding, layout, finish and document inputs.",
    },
  ],
  whatsappPrompt:
    "Hello DUALCORE LINK, I would like to review this panel for a hotel or OEM/ODM project.",
};

const sensorProfile: ProductConversionProfile = {
  key: "sensor",
  label: "Sensor and room signal planning",
  summary:
    "Start with the detection or signal objective, installation position, coverage, power, output, and connection to the room-control workflow.",
  highlights: [
    { label: "Project role", value: "Detection or room signal accessory" },
    { label: "Buyer fit", value: "Integrators, contractors, hotel engineering teams" },
    { label: "Confirm first", value: "Placement, power, output and interface" },
  ],
  projectFit: [
    "Occupancy-aware guest room automation",
    "Door status, entrance and room signal workflows",
    "Renovation projects adding room detection points",
  ],
  selectionChecks: [
    "Define the event or condition the project needs to detect or transmit.",
    "Confirm placement, coverage, mounting and environmental constraints.",
    "Review power, signal output and controller connection by exact model.",
    "Validate the sequence of operation with the room-control team.",
  ],
  quoteChecklist: [
    "Room type, quantity and sensor location",
    "Required detection or signal behavior",
    "Power, output and controller interface requirements",
    "Layout drawings, test needs and delivery target",
  ],
  solutions: [
    {
      title: "Smart Hotel Automation Solution",
      href: "/solutions/smart-hotel-automation-solution/",
      description: "Review how sensor events support room automation.",
    },
    {
      title: "Hotel Guest Room Control Solution",
      href: "/solutions/hotel-guest-room-control-solution/",
      description: "Coordinate sensors with panels and room-control logic.",
    },
  ],
  resources: [
    {
      title: "Hotel Occupancy Sensor Selection Guide",
      href: "/resources/hotel-occupancy-sensor-selection-guide/",
      description: "Plan coverage, placement, output and buyer questions.",
    },
    {
      title: "Hotel Guest Room Automation Guide",
      href: "/resources/hotel-guest-room-automation-guide/",
      description: "Place sensor requirements within the room workflow.",
    },
  ],
  whatsappPrompt:
    "Hello DUALCORE LINK, I would like to review this sensor or room signal device for a project.",
};

const roomStatusProfile: ProductConversionProfile = {
  key: "room-status",
  label: "Room status and service panel planning",
  summary:
    "Define the guest and staff workflow, visible legends, service states, mounting, finish, and controller interface before selecting a room display or doorplate.",
  highlights: [
    { label: "Project role", value: "Guest service and room status interface" },
    { label: "Buyer fit", value: "Hotel operators, contractors, panel buyers" },
    { label: "Confirm first", value: "Workflow, legends, mounting and wiring" },
  ],
  projectFit: [
    "Guest room entrance and corridor status indication",
    "DND, MUR, doorbell or service workflow planning",
    "Customized hotel signage and renovation packages",
  ],
  selectionChecks: [
    "List only the guest and staff states required for the exact project.",
    "Confirm legends, language, visibility, finish and mounting position.",
    "Review wiring and controller interface requirements by exact model.",
    "Approve artwork or a sample before project-scale production.",
  ],
  quoteChecklist: [
    "Room count and required service states",
    "Legends, language, finish and artwork reference",
    "Mounting, wiring and controller requirements",
    "Sample, documentation and delivery schedule",
  ],
  solutions: [
    {
      title: "Hotel Guest Room Control Solution",
      href: "/solutions/hotel-guest-room-control-solution/",
      description: "Coordinate room status with panels and service logic.",
    },
    {
      title: "OEM / ODM Custom Panel Solution",
      href: "/solutions/oem-odm-custom-panel-solution/",
      description: "Review artwork, finish, legends and customization inputs.",
    },
  ],
  resources: [
    {
      title: "Hotel Doorplate and Room Display Buying Guide",
      href: "/resources/hotel-doorplate-room-display-buying-guide/",
      description: "Compare status functions, installation and buyer checks.",
    },
    {
      title: "Smart Panel Material and Finish Selection Guide",
      href: "/resources/smart-panel-material-finish-selection-guide/",
      description: "Prepare finish references and approval requirements.",
    },
  ],
  whatsappPrompt:
    "Hello DUALCORE LINK, I would like to review this room status or service panel for a hotel project.",
};

export const productConversionProfilesByCategory: Record<
  string,
  ProductConversionProfile
> = {
  "rcu-room-control-host": rcuProfile,
  "ai-smart-displays": displayProfile,
  "smart-panels-switches": panelProfile,
  "smart-sockets-power-modules": panelProfile,
  "hvac-thermostat-control": panelProfile,
  "curtain-control-panels": panelProfile,
  sensors: sensorProfile,
  "room-status-hotel-service-panels": roomStatusProfile,
};

export const highValueProductCategorySlugs = Object.keys(
  productConversionProfilesByCategory,
);

export function getProductConversionProfile(categorySlugs: string[]) {
  for (const categorySlug of categorySlugs) {
    const profile = productConversionProfilesByCategory[categorySlug];
    if (profile) return profile;
  }
  return null;
}

export const priorityProductReinforcements: Readonly<
  Record<string, PriorityProductReinforcement>
> = {
  "hotel-smart-room-rcu-host-1": {
    heading: "What role does this hotel RCU host play in a guest room?",
    answer:
      "The Hotel Smart Room RCU Host 1 is a room-level control core for project planning. It can coordinate approved lighting scenes, panels, sensors, HVAC control, curtains, and service workflows within a wider guest room architecture. It is intended for hotel contractors, system integrators, and project buyers who can confirm the room function schedule. Exact I/O, voltage, wiring, protocol, and electrical details remain model- and project-specific.",
    decisionPoints: [
      "List controlled loads, sensor inputs, panels, and room-service signals.",
      "Confirm the controller location and responsibility for the room control box or cabinet.",
      "Request model-specific I/O, electrical, wiring, and protocol documents before specification.",
      "Align room logic, third-party interfaces, testing, and handover responsibilities.",
    ],
    links: [
      {
        title: "Smart Hotel Room Control System Guide",
        href: "/resources/smart-hotel-room-control-system-guide/",
        description:
          "Map the RCU to panels, sensors, room devices, and commissioning responsibilities.",
      },
      {
        title: "Saudi Arabia RCU Project Guidance",
        href: "/regions/saudi-arabia/",
        description:
          "Prepare room quantities, electrical requirements, finish needs, and project documents.",
      },
    ],
  },
  "86-type-ai-smart-control-display": {
    heading: "Where does an 86-type smart control display fit in a project?",
    answer:
      "The 86-Type AI Smart Control Display is a wall-mounted room interface designed for a standard 86 box. It can present selected controls for lighting, HVAC, curtains, audio, sensors, and scenes in hotel rooms, apartments, and smart spaces. Buyers should treat it as one interface within the approved automation architecture. Final control scope, wiring, communication, language, and integration logic must be confirmed for the exact project.",
    decisionPoints: [
      "Define the functions that must be visible and accessible at the display location.",
      "Confirm the 86-box position, mounting depth, power, and wiring route.",
      "Review the controller relationship and communication requirements by exact model.",
      "Separate standard interface needs from OEM/ODM language, logo, finish, or UI requests.",
    ],
    links: [
      {
        title: "Hotel Guest Room Control Interfaces Guide",
        href: "/resources/hotel-guest-room-control-interfaces-guide/",
        description:
          "Compare touchscreen, wall-panel, bedside, thermostat, and mobile-control roles.",
      },
      {
        title: "UAE Automation Project Guidance",
        href: "/regions/uae/",
        description:
          "Prepare project type, finish, wiring, branding, and document requirements.",
      },
    ],
  },
  "smart-four-key-scene-control-panel": {
    heading: "When should a project use a four-key scene control panel?",
    answer:
      "The Smart Four-Key Scene Control Panel provides four physical positions for approved lighting, curtain, room-mode, or other project-defined actions. It suits hotel rooms, serviced apartments, and residential automation layouts where frequent controls should remain direct and easy to locate. Buyers should confirm each key function, label, wall position, wiring, protocol relationship, and connection to the room controller before approving the panel schedule or customization scope.",
    decisionPoints: [
      "Assign each key to a confirmed guest action or room scene.",
      "Confirm panel location, wall-box fit, electrical or control relationship, and labels.",
      "Coordinate finish and layout with the wider guest room panel schedule.",
      "Approve artwork or samples before project-scale OEM/ODM production.",
    ],
    links: [
      {
        title: "Hotel Guest Room Control Interfaces Guide",
        href: "/resources/hotel-guest-room-control-interfaces-guide/",
        description:
          "Compare physical panels with touchscreens and other guest room interfaces.",
      },
      {
        title: "UAE Automation Project Guidance",
        href: "/regions/uae/",
        description:
          "Review finish, layout, wiring, branding, and document inputs for UAE inquiries.",
      },
    ],
  },
};

export function getPriorityProductReinforcement(productSlug: string) {
  return priorityProductReinforcements[productSlug] ?? null;
}

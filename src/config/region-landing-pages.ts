export type RegionLandingPage = {
  slug: string;
  market: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  heroTitle: string;
  heroSubtitle: string;
  answerCapsule?: {
    heading: string;
    body: string;
    links: Array<{
      title: string;
      href: string;
      description: string;
    }>;
  };
  primaryCta: string;
  secondaryCta: string;
  catalogNote: string;
  buyerTypes: string[];
  recommendedCategories: string[];
  recommendedSolutions: string[];
  regionalNeeds: string;
  productSelection: string;
  solutionPlanning: string;
  customization: string;
  documentSupport: string;
  inquiryChecklist: string[];
  faqs: Array<{ question: string; answer: string }>;
  finalCtaTitle: string;
  finalCtaText: string;
  safeClaims: string[];
};

const commonSafeClaims = [
  "Supports inquiries from this region.",
  "Suitable for hotel, apartment, distributor, system integrator, and OEM/ODM inquiries where relevant.",
  "Can help prepare product selection and quotation discussion.",
  "Voltage, protocol, document, and customization requirements should be confirmed by project.",
  "Regular products have no fixed MOQ.",
  "Typical lead time is 7-15 days, depending on product and order requirements.",
];

export const regionLandingPages: RegionLandingPage[] = [
  {
    slug: "middle-east",
    market: "Middle East",
    seoTitle: "Smart Hotel Room Control Products for Middle East Projects",
    metaDescription:
      "Smart hotel room control, RCU, smart panels, sensors and OEM/ODM product selection support for Middle East hotel and apartment projects.",
    h1: "Smart Hotel Room Control Products for Middle East Projects",
    heroTitle: "Smart hotel room control planning for Middle East inquiries",
    heroSubtitle:
      "DUALCORE LINK supports Middle East smart hotel, apartment and OEM/ODM buyers with product selection, RCU planning, panel options, catalogs and project document discussion.",
    primaryCta: "Get a Quote",
    secondaryCta: "View English, Arabic & Persian Catalogs",
    catalogNote:
      "English, Arabic and Persian catalogs are available for early product selection. Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request.",
    buyerTypes: [
      "Hotel owners and developers",
      "Hotel contractors",
      "System integrators",
      "Distributors",
      "OEM/ODM buyers",
      "Apartment and villa project buyers",
    ],
    recommendedCategories: [
      "Guest Room Control Host",
      "RCU Controller Cabinet",
      "Smart Panels",
      "Sensors",
      "Smart Sockets / Socket Panels",
      "Curtain Control Panels",
      "Room Status / Service Panels",
      "Background Speaker",
      "Hotel Delivery Robot as optional hotel service automation inquiry",
    ],
    recommendedSolutions: [
      "Hotel Guest Room Control Solution",
      "Smart Hotel Automation Solution",
      "RCU Room Control Solution",
      "OEM/ODM Custom Panel Solution",
    ],
    regionalNeeds:
      "Middle East hotel and apartment projects often need a clear guest room control plan before quotation. Buyers can share room type, quantity, voltage and frequency, preferred protocol, panel finish, logo needs and required documents so product selection can be matched to the project scope.",
    productSelection:
      "Recommended discussions usually start with RCU room control, guest room control hosts, smart panels, sensors, socket panels, curtain control, room status panels and background speakers. Hotel service automation can also be discussed when the project needs optional robot-related inquiry support.",
    solutionPlanning:
      "For hotel projects, RCU and guest room control planning should confirm room scenarios, wiring method, protocol preference and front-panel style. Apartment or villa buyers can focus on smart panels, sensors, sockets and curtain control according to installation requirements.",
    customization:
      "OEM/ODM support can include panel color, logo and button layout discussion depending on product series and project requirements. Regular products have no fixed MOQ. Custom products may require customization or tooling fees when new molds are needed. Color-only changes using existing molds do not require customization fees.",
    documentSupport:
      "Catalogs are available for public download. Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request, and documents should be confirmed by product, market and project requirement.",
    inquiryChecklist: [
      "Country and project type",
      "Hotel room type or apartment/villa scenario",
      "Estimated room or product quantity",
      "Voltage and frequency requirements",
      "Protocol preference and wiring needs",
      "Panel finish, logo or packaging requests",
      "Required documents and target delivery time",
    ],
    faqs: [
      {
        question: "Can you support Middle East hotel guest room control inquiries?",
        answer:
          "Yes. We support inquiries for hotel guest room control, RCU planning, smart panels, sensors, sockets, curtain control, room status panels and related product selection for Middle East projects.",
      },
      {
        question: "Do you provide Arabic, Persian and English catalogs?",
        answer:
          "Yes. English, Arabic and Persian catalog files are available on the Downloads page for early product selection.",
      },
      {
        question: "Can you help with RCU room control planning?",
        answer:
          "Yes. Hotel project RCU requirements are supported. Please share room type, quantity, wiring needs, voltage and frequency, protocol preference and required documents.",
      },
      {
        question: "What is the MOQ for Middle East inquiries?",
        answer:
          "Regular products have no fixed MOQ. Custom products may require customization or tooling fees when new molds are needed. Color-only changes using existing molds do not require customization fees.",
      },
      {
        question: "What is the typical lead time?",
        answer:
          "Typical lead time is 7-15 days, depending on product type, customization requirements and order quantity.",
      },
      {
        question: "Can documents be reviewed for a specific project?",
        answer:
          "Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request. Requirements should be confirmed by product, market and project need.",
      },
    ],
    finalCtaTitle: "Prepare a Middle East project quotation",
    finalCtaText:
      "Send your country, room type, product list, estimated quantity, voltage, protocol preference, customization needs and required documents. Quotation is available by email or WhatsApp.",
    safeClaims: commonSafeClaims,
  },
  {
    slug: "saudi-arabia",
    market: "Saudi Arabia",
    seoTitle: "Smart Hotel RCU & Room Control Products for Saudi Arabia",
    metaDescription:
      "RCU room control, smart panels, sensors, sockets and OEM/ODM inquiry support for Saudi Arabia hotel contractors and B2B project buyers.",
    h1: "Smart Hotel RCU & Room Control Products for Saudi Arabia",
    heroTitle: "RCU and guest room control inquiry support for Saudi Arabia",
    heroSubtitle:
      "Plan hotel room control product selection with RCU hosts, smart panels, sensors, sockets, curtain control and room status panels for Saudi Arabia project inquiries.",
    answerCapsule: {
      heading:
        "What should Saudi Arabia hotel buyers prepare for an RCU quotation?",
      body:
        "Saudi Arabia hotel buyers should prepare the room types and quantities, controlled functions, RCU and panel scope, voltage and frequency, preferred wiring or protocol direction, finish requirements, and required project documents. Contractors and system integrators should also identify installation and integration responsibilities. This information allows the supplier to review the room control package without assuming that one controller, panel, or interface fits every project.",
      links: [
        {
          title: "RCU Room Control Solution",
          href: "/en/solutions/rcu-room-control-solution/",
          description:
            "Review the controller, cabinet, panels, sensors, and room devices as one package.",
        },
        {
          title: "Hotel Smart Room RCU Host 1",
          href: "/en/products/hotel-smart-room-rcu-host-1/",
          description:
            "Use a real RCU product page to begin model-specific confirmation.",
        },
        {
          title: "Smart Four-Key Scene Control Panel",
          href: "/en/products/smart-four-key-scene-control-panel/",
          description:
            "Review a guest-facing panel for project-defined room actions.",
        },
        {
          title: "Hotel RCU Buying Guide",
          href: "/en/resources/hotel-rcu-buying-guide/",
          description:
            "Prepare loads, devices, documents, and supplier questions before procurement.",
        },
      ],
    },
    primaryCta: "Get a Quote",
    secondaryCta: "View Arabic & English Catalogs",
    catalogNote:
      "Arabic and English catalogs are available for early product review. Project documents should be confirmed by product, market and project requirement.",
    buyerTypes: [
      "Hotel contractors",
      "Hotel owners and developers",
      "System integrators",
      "Distributors",
      "OEM/ODM buyers",
    ],
    recommendedCategories: [
      "Guest Room Control Host",
      "RCU Controller Cabinet",
      "Smart Panels",
      "Sensors",
      "Smart Sockets / Socket Panels",
      "Curtain Control Panels",
      "Room Status / Service Panels",
    ],
    recommendedSolutions: [
      "Hotel Guest Room Control Solution",
      "RCU Room Control Solution",
      "Smart Hotel Automation Solution",
      "OEM/ODM Custom Panel Solution",
    ],
    regionalNeeds:
      "Saudi Arabia hotel inquiries often require early coordination between contractors, integrators and procurement teams. A useful quotation request should include room type, room quantity, RCU scope, voltage and frequency, protocol preference, panel finish and document needs.",
    productSelection:
      "Product selection can focus on RCU hosts, controller cabinets, smart panels, sensors, socket panels, curtain control and room status panels for hotel guest room control discussion.",
    solutionPlanning:
      "For contractor-led projects, room control planning should define guest room scenes, service indicators, wiring structure, RCU position, panel locations and integration expectations before final quotation.",
    customization:
      "OEM/ODM is supported for eligible product series. Panel color, logo and button layout customization are supported depending on product series and project requirements. New molds may require customization or tooling fees, while color-only changes using existing molds do not require customization fees.",
    documentSupport:
      "Arabic and English catalogs can support early selection. Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request.",
    inquiryChecklist: [
      "Project country and city if available",
      "Hotel room type and estimated room quantity",
      "RCU scope and panel list",
      "Voltage and frequency requirements",
      "Protocol preference",
      "Panel finish and logo needs",
      "Required documents and delivery timing",
    ],
    faqs: [
      {
        question: "Can Saudi Arabia hotel contractors request RCU product selection?",
        answer:
          "Yes. Contractors and system integrators can send room type, quantity, RCU scope, protocol preference and product interest for RCU room control selection.",
      },
      {
        question: "Are Arabic and English catalogs available?",
        answer:
          "Yes. Arabic and English catalog files are available on the Downloads page for early product review.",
      },
      {
        question: "Can you customize panel color, logo and button layout?",
        answer:
          "Yes. Panel color, logo and button layout customization are supported depending on product series and project requirements.",
      },
      {
        question: "What MOQ applies to regular and customized products?",
        answer:
          "Regular products have no fixed MOQ. Custom products may require customization or tooling fees when new molds are needed. Color-only changes using existing molds do not require customization fees.",
      },
      {
        question: "What lead time should Saudi Arabia buyers expect?",
        answer:
          "Typical lead time is 7-15 days, depending on product type, customization requirements and order quantity.",
      },
      {
        question: "Can I request datasheets or wiring diagrams for hotel rooms?",
        answer:
          "Yes. Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request.",
      },
    ],
    finalCtaTitle: "Send a Saudi Arabia hotel room control inquiry",
    finalCtaText:
      "Share room quantity, RCU scope, panel list, voltage, protocol preference, customization needs and required documents. Quotation is available by email or WhatsApp.",
    safeClaims: commonSafeClaims,
  },
  {
    slug: "uae",
    market: "UAE",
    seoTitle: "Smart Hotel & Apartment Automation Products for UAE",
    metaDescription:
      "Smart panels, AI smart displays, room control products and OEM/ODM customization support for UAE hotel and apartment automation inquiries.",
    h1: "Smart Hotel & Apartment Automation Products for UAE",
    heroTitle: "Smart panel and automation product selection for UAE projects",
    heroSubtitle:
      "DUALCORE LINK supports UAE hotel, apartment, villa, system integrator and OEM/ODM inquiries with smart panels, AI displays, RCU products and catalog support.",
    answerCapsule: {
      heading:
        "What should UAE buyers compare for hotel and apartment automation?",
      body:
        "UAE buyers should compare products against the project type, room functions, interface locations, wall boxes, voltage and wiring requirements, visual finish, branding scope, and required documents. Hotel and apartment projects may need different combinations of RCU hosts, smart displays, physical panels, sensors, and room devices. The quotation should separate standard products from OEM/ODM requests and confirm model-specific integration requirements before selection.",
      links: [
        {
          title: "AI Smart Display Solution",
          href: "/en/solutions/ai-smart-display-solution/",
          description:
            "Review display roles, room functions, and project integration planning.",
        },
        {
          title: "86-Type AI Smart Control Display",
          href: "/en/products/86-type-ai-smart-control-display/",
          description:
            "Review an 86-box display for selected room control functions.",
        },
        {
          title: "Smart Four-Key Scene Control Panel",
          href: "/en/products/smart-four-key-scene-control-panel/",
          description:
            "Compare a physical control panel for frequent guest room actions.",
        },
        {
          title: "Smart Hotel Room Control System Guide",
          href: "/en/resources/smart-hotel-room-control-system-guide/",
          description:
            "Plan controllers, interfaces, devices, and responsibilities as one system.",
        },
      ],
    },
    primaryCta: "Get a Quote",
    secondaryCta: "View Arabic & English Catalogs",
    catalogNote:
      "Arabic and English catalogs are available for early product comparison. Additional documents can be reviewed by product and project request.",
    buyerTypes: [
      "Premium hotel buyers",
      "Apartment and villa project buyers",
      "System integrators",
      "Distributors",
      "OEM/ODM buyers",
    ],
    recommendedCategories: [
      "AI Smart Screen",
      "Smart Panels",
      "Guest Room Control Host",
      "Sensors",
      "Smart Sockets / Socket Panels",
      "Curtain Control Panels",
      "Room Status / Service Panels",
    ],
    recommendedSolutions: [
      "AI Smart Display Solution",
      "Smart Hotel Automation Solution",
      "Hotel Guest Room Control Solution",
      "OEM/ODM Custom Panel Solution",
    ],
    regionalNeeds:
      "UAE hotel and apartment inquiries may focus on visual finish, smart panel layout, AI smart display selection, room scenes and OEM/ODM options. Buyers should confirm project type, product list, quantity, voltage, protocol preference and document requirements.",
    productSelection:
      "Recommended product discussions can include AI smart screens, smart panels, guest room control hosts, sensors, socket panels, curtain control and room status panels.",
    solutionPlanning:
      "Premium hotel and apartment planning should match panel finish, display function, room control needs and wiring requirements with the expected project style and installation conditions.",
    customization:
      "OEM/ODM customization can support panel color, logo and button layout discussion according to product series and project requirements. New molds may require customization or tooling fees. Existing mold color-only changes do not require customization fees.",
    documentSupport:
      "Arabic and English catalogs are available. Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request.",
    inquiryChecklist: [
      "Project type: hotel, apartment, villa, distributor or OEM/ODM",
      "Product categories and model interests",
      "Estimated quantity",
      "Voltage and frequency requirements",
      "Protocol or wiring needs",
      "Panel finish, logo and layout requests",
      "Required documents and delivery timing",
    ],
    faqs: [
      {
        question: "Can UAE buyers request smart panels and AI smart displays?",
        answer:
          "Yes. UAE inquiries can cover smart panels, AI smart displays, guest room control products, sensors, socket panels and related automation product selection.",
      },
      {
        question: "Do you support OEM/ODM for premium hotel or apartment projects?",
        answer:
          "Yes. OEM/ODM is supported. Panel color, logo and button layout customization are supported depending on product series and project requirements.",
      },
      {
        question: "Are Arabic and English catalogs available?",
        answer:
          "Yes. Arabic and English catalog files are available on the Downloads page.",
      },
      {
        question: "What is the typical lead time for UAE inquiries?",
        answer:
          "Typical lead time is 7-15 days, depending on product type, customization requirements and order quantity.",
      },
      {
        question: "Is there a fixed MOQ?",
        answer:
          "Regular products have no fixed MOQ. Custom products may require customization or tooling fees when new molds are needed. Color-only changes using existing molds do not require customization fees.",
      },
      {
        question: "Can project documents be reviewed before ordering?",
        answer:
          "Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request.",
      },
    ],
    finalCtaTitle: "Discuss a UAE automation product inquiry",
    finalCtaText:
      "Send your project type, quantity, product interest, voltage, protocol preference, panel finish, logo needs and required documents. Quotation is available by email or WhatsApp.",
    safeClaims: commonSafeClaims,
  },
  {
    slug: "southeast-asia",
    market: "Southeast Asia",
    seoTitle: "Smart Hotel & Apartment Automation for Southeast Asia",
    metaDescription:
      "Smart hotel, serviced apartment, villa, distributor and OEM/ODM automation product inquiry support for Southeast Asia buyers.",
    h1: "Smart Hotel & Apartment Automation for Southeast Asia",
    heroTitle: "Automation product selection for Southeast Asia projects",
    heroSubtitle:
      "Support for serviced apartment, hotel, villa, distributor and OEM/ODM inquiries across Southeast Asia, including smart displays, sensors, panels, sockets and catalog review.",
    primaryCta: "Get a Quote",
    secondaryCta: "View English & Vietnamese Catalogs",
    catalogNote:
      "English and Vietnamese catalogs are available for early selection. Other document requests can be reviewed by product and project requirement.",
    buyerTypes: [
      "Serviced apartment buyers",
      "Hotel owners and contractors",
      "Villa project buyers",
      "Distributors",
      "System integrators",
      "OEM/ODM buyers",
    ],
    recommendedCategories: [
      "AI Smart Screen",
      "Smart Panels",
      "Sensors",
      "Smart Sockets / Socket Panels",
      "Curtain Control Panels",
      "Guest Room Control Host",
      "Room Status / Service Panels",
    ],
    recommendedSolutions: [
      "Smart Hotel Automation Solution",
      "AI Smart Display Solution",
      "Hotel Guest Room Control Solution",
      "OEM/ODM Custom Panel Solution",
      "Smart Apartment / Residential Automation direction",
    ],
    regionalNeeds:
      "Southeast Asia inquiries may come from serviced apartments, hotels, villas, distributors and OEM/ODM buyers. Product selection should start with project type, target market, product categories, quantity, installation requirements and document needs.",
    productSelection:
      "Common discussion categories include AI smart screens, smart panels, sensors, socket panels, curtain control, guest room control hosts and room status panels.",
    solutionPlanning:
      "Hotel and apartment planning can combine display control, sensor detection, socket panels, curtain scenes and service status functions according to project type and installation conditions.",
    customization:
      "OEM/ODM cooperation can support panel color, logo and button layout discussion depending on product series and project needs. Custom products may require customization or tooling fees when new molds are needed. Color-only changes using existing molds do not require customization fees.",
    documentSupport:
      "English and Vietnamese catalogs are available. Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request.",
    inquiryChecklist: [
      "Country and buyer type",
      "Hotel, apartment, villa, distributor or OEM/ODM project",
      "Product categories and quantity",
      "Voltage and frequency requirements",
      "Protocol or wiring needs",
      "Customization requests",
      "Required documents and target delivery time",
    ],
    faqs: [
      {
        question: "Can Southeast Asia serviced apartment buyers request product selection?",
        answer:
          "Yes. Serviced apartment, hotel, villa, distributor and OEM/ODM buyers can send product interests, quantity, project type and technical needs for selection support.",
      },
      {
        question: "Are English and Vietnamese catalogs available?",
        answer:
          "Yes. English and Vietnamese catalog files are available on the Downloads page for early product selection.",
      },
      {
        question: "Which products are suitable for apartment or villa inquiries?",
        answer:
          "Common discussions include AI smart screens, smart panels, sensors, socket panels, curtain control panels and selected guest room control products according to project needs.",
      },
      {
        question: "Do you support distributors and OEM/ODM buyers?",
        answer:
          "Yes. Distributor and OEM/ODM inquiries are supported. Please share target market, product categories, quantity and customization needs.",
      },
      {
        question: "What MOQ and lead time should buyers expect?",
        answer:
          "Regular products have no fixed MOQ. Custom products may require customization or tooling fees when new molds are needed. Color-only changes using existing molds do not require customization fees. Typical lead time is 7-15 days, depending on product type, customization requirements and order quantity.",
      },
      {
        question: "Can you review documents for Southeast Asia projects?",
        answer:
          "Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request.",
      },
    ],
    finalCtaTitle: "Start a Southeast Asia product selection request",
    finalCtaText:
      "Send country, project type, product interest, quantity, voltage, protocol preference, customization needs and required documents. Quotation is available by email or WhatsApp.",
    safeClaims: commonSafeClaims,
  },
  {
    slug: "vietnam",
    market: "Vietnam",
    seoTitle: "Smart Hotel & Apartment Automation Products for Vietnam",
    metaDescription:
      "Vietnamese catalog support and smart hotel, apartment, distributor and OEM/ODM automation product inquiries for Vietnam B2B buyers.",
    h1: "Smart Hotel & Apartment Automation Products for Vietnam",
    heroTitle: "Vietnam smart hotel and apartment product inquiry support",
    heroSubtitle:
      "DUALCORE LINK supports Vietnam distributor, hotel, apartment and OEM/ODM inquiries with smart panels, AI displays, sensors, sockets, curtain control and Vietnamese catalog access.",
    primaryCta: "Get a Quote",
    secondaryCta: "Download Vietnamese Catalog",
    catalogNote:
      "Vietnamese and English catalogs are available for early product selection. Additional documents can be reviewed by product and project request.",
    buyerTypes: [
      "Distributors",
      "Apartment project buyers",
      "Hotel owners and contractors",
      "System integrators",
      "OEM/ODM buyers",
    ],
    recommendedCategories: [
      "AI Smart Screen",
      "Smart Panels",
      "Sensors",
      "Smart Sockets / Socket Panels",
      "Curtain Control Panels",
      "Guest Room Control Host",
      "Room Status / Service Panels",
    ],
    recommendedSolutions: [
      "Smart Hotel Automation Solution",
      "AI Smart Display Solution",
      "Hotel Guest Room Control Solution",
      "OEM/ODM Custom Panel Solution",
      "Smart Apartment / Residential Automation direction",
    ],
    regionalNeeds:
      "Vietnam inquiries may include distributor product selection, apartment and hotel projects, and OEM/ODM customization discussion. Buyers should share product interest, quantity, target project type, voltage, protocol preference and document needs.",
    productSelection:
      "Recommended categories include AI smart screens, smart panels, sensors, socket panels, curtain control, guest room control hosts and room status panels.",
    solutionPlanning:
      "Apartment and hotel planning can start with user scenarios, panel functions, sensor needs, socket placement, curtain control and room status requirements before final product selection.",
    customization:
      "OEM/ODM support is available depending on product series and project requirements. Panel color, logo and button layout can be discussed. New molds may require customization or tooling fees; color-only changes using existing molds do not require customization fees.",
    documentSupport:
      "Vietnamese and English catalogs are available. Datasheets, available certificates or compliance documents, and wiring diagrams can be reviewed by product and project request.",
    inquiryChecklist: [
      "Vietnam project type or distributor inquiry",
      "Product categories and model interest",
      "Estimated quantity",
      "Voltage and frequency requirements",
      "Protocol or wiring needs",
      "Panel finish, logo and layout requests",
      "Required documents and target delivery time",
    ],
    faqs: [
      {
        question: "Is a Vietnamese product catalog available?",
        answer:
          "Yes. The Vietnamese catalog is available on the Downloads page, with English catalog support also available for comparison.",
      },
      {
        question: "Can Vietnam distributors request product selection support?",
        answer:
          "Yes. Distributor inquiries are supported. Please share target product categories, estimated quantity, market focus and document needs.",
      },
      {
        question: "Can apartment and hotel buyers request smart automation products?",
        answer:
          "Yes. Vietnam apartment and hotel inquiries can cover smart panels, AI smart screens, sensors, sockets, curtain control and guest room control products.",
      },
      {
        question: "Do you support OEM/ODM customization for Vietnam inquiries?",
        answer:
          "Yes. OEM/ODM is supported. Panel color, logo and button layout customization are supported depending on product series and project requirements.",
      },
      {
        question: "What are the MOQ and customization fee rules?",
        answer:
          "Regular products have no fixed MOQ. Custom products may require customization or tooling fees when new molds are needed. Color-only changes using existing molds do not require customization fees.",
      },
      {
        question: "What is the typical lead time?",
        answer:
          "Typical lead time is 7-15 days, depending on product type, customization requirements and order quantity.",
      },
    ],
    finalCtaTitle: "Send a Vietnam project or distributor inquiry",
    finalCtaText:
      "Share product categories, quantity, project type, voltage, protocol preference, customization needs and required documents. Quotation is available by email or WhatsApp.",
    safeClaims: commonSafeClaims,
  },
];

export const regionLandingPageSlugs = regionLandingPages.map(
  (page) => page.slug,
);

export function getRegionLandingPage(
  slug: string,
): RegionLandingPage | undefined {
  return regionLandingPages.find((page) => page.slug === slug);
}

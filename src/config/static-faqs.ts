export type StaticFaqItem = {
  question: string;
  answer: string;
};

export type StaticFaqCategory = {
  title: string;
  slug: string;
  items: StaticFaqItem[];
};

export const staticFaqCategories: StaticFaqCategory[] = [
  {
    title: "Company & Business",
    slug: "company-business",
    items: [
      {
        question: "What type of company is DualCoreLink?",
        answer:
          "DualCoreLink is a professional smart hotel and smart home solution provider. We design our own product concepts, system structures, and project solutions, and work with qualified manufacturing partners to produce products according to our technical and design requirements.",
      },
      {
        question: "Are you a factory or a trading company?",
        answer:
          "We are not a simple trading company. Our strength is solution design, product planning, project matching, and system integration support. Our products are designed according to our requirements and manufactured by selected OEM partners.",
      },
      {
        question: "What markets do you mainly serve?",
        answer:
          "Our main target markets are the Middle East and Southeast Asia. We also support overseas hotel projects, distributors, system integrators, and smart home solution partners in other regions.",
      },
      {
        question: "Who are your typical customers?",
        answer:
          "Our customers include hotel owners, hotel project contractors, system integrators, smart home distributors, engineering companies, and OEM/ODM partners.",
      },
    ],
  },
  {
    title: "Products & Solutions",
    slug: "products-solutions",
    items: [
      {
        question: "What products do you provide?",
        answer:
          "We provide smart hotel and smart home automation products, including AI smart control displays, RCU room control hosts, smart panels, sensors, curtain control panels, smart sockets, hotel service panels, and hotel delivery robot related solutions.",
      },
      {
        question: "Can you provide a complete hotel room control solution?",
        answer:
          "Yes. We can provide complete smart hotel room control solutions, including RCU control, smart panels, sensors, lighting control, curtain control, HVAC control, room status display, and other related hotel automation functions.",
      },
      {
        question: "Can your products be used in hotel projects?",
        answer:
          "Yes. Our products and solutions are suitable for hotel rooms, serviced apartments, villas, smart residences, and commercial automation projects.",
      },
      {
        question: "Can you help match products for a specific project?",
        answer:
          "Yes. Customers can send us their project requirements, room type, control functions, quantity, and market region. We can recommend suitable products and solution combinations based on the project needs.",
      },
    ],
  },
  {
    title: "OEM / ODM Customization",
    slug: "oem-odm-customization",
    items: [
      {
        question: "Do you support OEM and ODM?",
        answer:
          "Yes. We support both OEM and ODM cooperation for smart panels, control devices, room control products, and related smart hotel solution products.",
      },
      {
        question: "What can be customized?",
        answer:
          "Customization may include product appearance, panel finish, panel layout, button functions, logo, packaging, software interface, project function configuration, and solution matching. The final customization scope depends on the product type and project requirements.",
      },
      {
        question: "Can you design products according to our requirements?",
        answer:
          "Yes. As a solution-oriented company, we can help customers develop product concepts and system solutions based on project requirements, market positioning, and application scenarios.",
      },
      {
        question: "Can you provide private label products?",
        answer:
          "Yes. Private label cooperation can be supported depending on the product, order quantity, and customization requirements.",
      },
    ],
  },
  {
    title: "Ordering & Delivery",
    slug: "ordering-delivery",
    items: [
      {
        question: "What information should I provide to get a quotation?",
        answer:
          "For faster quotation, please share the product type, project country, estimated quantity, voltage or frequency requirements, protocol or wiring needs, panel finish, logo or packaging requests, and target delivery time.",
      },
      {
        question: "What is your MOQ?",
        answer:
          "MOQ depends on product type, customization scope, and order quantity. Please contact us with the product model, project market, and estimated quantity so we can confirm the suitable order requirement.",
      },
      {
        question: "Can I request samples before bulk orders?",
        answer:
          "Yes. Samples can be discussed for evaluation before bulk orders. Sample availability, sample cost, shipping cost, and preparation time depend on the product type and current project requirements.",
      },
      {
        question: "What is the lead time?",
        answer:
          "MOQ and lead time depend on product type, customization scope, and order quantity. We will confirm the schedule after reviewing the product list, customization needs, and project delivery target.",
      },
      {
        question: "Can I send project drawings, BOM, or product lists?",
        answer:
          "Yes. You can send room schedules, product lists, BOM files, drawings, or function requirements. Our team can review them and help match smart panels, RCU hosts, sensors, sockets, thermostats, and related devices.",
      },
      {
        question: "Can you ship to the Middle East and Southeast Asia?",
        answer:
          "Yes. We support shipments to the Middle East and Southeast Asia. We can also support other overseas markets depending on the destination and order requirements.",
      },
    ],
  },
  {
    title: "Technical Support & After-Sales",
    slug: "technical-support-after-sales",
    items: [
      {
        question: "What protocols or wiring details should I confirm before ordering?",
        answer:
          "Please confirm the project voltage and frequency, wiring method, control functions, communication protocol preference, RCU or gateway requirements, and any hotel system integration needs before final product selection.",
      },
      {
        question: "Do you provide installation and wiring support?",
        answer:
          "Yes. We can provide installation guidance, wiring reference, product information, and technical support according to the project requirements.",
      },
      {
        question: "Can you support hotel project commissioning?",
        answer:
          "Yes. We can support hotel project communication, product matching, wiring guidance, and technical coordination. The specific support method can be confirmed based on the project scope.",
      },
      {
        question: "Can you provide RCU, thermostat, curtain, service panel, and sensor combinations?",
        answer:
          "Yes. For hotel guest room control projects, we can help match RCU hosts, smart panels, thermostats, curtain control panels, service panels, sensors, sockets, and related automation devices according to the room control requirements.",
      },
      {
        question: "What is the warranty period?",
        answer:
          "Warranty and after-sales terms depend on the product type, order terms, and project requirements. Please share the product model and project scope so we can confirm the applicable support terms.",
      },
      {
        question: "How can customers contact you?",
        answer:
          "Customers can contact us by email or WhatsApp. For product inquiries, quotation requests, OEM/ODM cooperation, or project solutions, please contact us through the website inquiry form, email, or WhatsApp.",
      },
    ],
  },
  {
    title: "Catalogs, Documents & Regional Projects",
    slug: "catalogs-documents-regional-projects",
    items: [
      {
        question: "Where can I download the product catalog?",
        answer:
          "Public multilingual product catalogs are available on the Downloads page. The catalog files support early product selection for smart hotel panels, RCU hosts, sensors, sockets, thermostats, robot systems, and OEM/ODM automation projects.",
      },
      {
        question: "How can I request datasheets, certificates, or wiring references?",
        answer:
          "Please contact us through the inquiry form or WhatsApp with the product model, target market, project type, and required documents. Datasheets, wiring references, and certificate or test report copies can be shared when verified and relevant to the requested product or market.",
      },
      {
        question: "Are certificate or test report copies publicly downloadable?",
        answer:
          "Not all documents are public downloads. Certificate or test report copies can be shared when verified and relevant to the requested product or market, especially when the project requires product and market confirmation.",
      },
      {
        question: "Do you support Middle East or Southeast Asia hotel projects?",
        answer:
          "We support inquiries from the Middle East and Southeast Asia. Please share the country, voltage and frequency requirements, protocol preference, product quantity, project type, and required documents so we can review the project needs.",
      },
      {
        question: "Do you work with distributors, contractors, and system integrators?",
        answer:
          "Yes. We support communication with distributors, contractors, system integrators, hotel project teams, and OEM/ODM partners. Cooperation details depend on the product scope, market needs, and project requirements.",
      },
      {
        question: "Can you help match a hotel project BOM or room schedule?",
        answer:
          "Yes. You can send a hotel room schedule, BOM, device list, or control function list. We can help review the required smart panels, RCU hosts, sensors, sockets, thermostats, service panels, and related automation devices.",
      },
    ],
  },
];

export const staticFaqItems = staticFaqCategories.flatMap(
  (category) => category.items,
);

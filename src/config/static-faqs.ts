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
        question: "Do you support OEM/ODM?",
        answer:
          "Yes. We support OEM/ODM requests for smart panels, hotel room control products and related automation devices.",
      },
      {
        question: "Can you customize panel color, logo and button layout?",
        answer:
          "Yes. Panel color, logo and button layout can be customized based on the product series, mold availability and project requirements. Please share drawings, reference photos or customization details for evaluation.",
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
        question: "How can I get a quotation?",
        answer:
          "You can request a quotation by email or WhatsApp. For faster quotation, please include the product list, country, estimated quantity, voltage, protocol or wiring needs, customization requirements and target delivery time.",
      },
      {
        question: "What is your MOQ for regular and customized products?",
        answer:
          "For regular products, there is no fixed MOQ. Custom products may require a customization or tooling fee when new molds are needed. If an existing mold is used and only the color is changed, no customization fee is required.",
      },
      {
        question: "Can I request samples before bulk orders?",
        answer:
          "Yes. Samples can be discussed for evaluation before bulk orders. Sample availability, sample cost, shipping cost, and preparation time depend on the product type and current project requirements.",
      },
      {
        question: "What is the typical lead time?",
        answer:
          "Typical lead time is 7-15 days, depending on product type, customization requirements and order quantity. For hotel projects or OEM/ODM orders, please share your target delivery schedule when requesting a quote.",
      },
      {
        question: "Can I send project drawings, BOM or product lists?",
        answer:
          "Yes. You can send project drawings, BOM, room schedules or product lists by email or through the inquiry form. These documents help us match smart panels, RCU hosts, sensors, sockets and accessories for your project.",
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
        question: "Do you support hotel project RCU requirements?",
        answer:
          "Yes. We support hotel project RCU requirements, including RCU hosts, smart panels, sensors, thermostats, curtain control and service panels.",
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
        question: "Can you provide datasheets, certificates or wiring diagrams?",
        answer:
          "Yes. Product datasheets, certificate copies and wiring diagrams can be provided. Some documents may require product, market or project confirmation before sharing.",
      },
      {
        question: "Are certificate or test report copies publicly downloadable?",
        answer:
          "Not all documents are public downloads. Certificate or test report copies can be shared when verified and relevant to the requested product or market, especially when the project requires product and market confirmation.",
      },
      {
        question: "Are your products suitable for Middle East and Southeast Asia projects?",
        answer:
          "Yes. Our smart hotel and smart home automation products are suitable for Middle East and Southeast Asia project inquiries. Please share the country, voltage/frequency, protocol preference, quantity and required documents.",
      },
      {
        question: "Do you work with distributors, contractors and system integrators?",
        answer:
          "Yes. We support inquiries from distributors, contractors and system integrators for smart hotel and smart home automation projects. Please share your target market, product interests and required documents.",
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

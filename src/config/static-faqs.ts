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
          "Customization may include product appearance, panel layout, button functions, logo, packaging, software interface, project function configuration, and solution matching. The final customization scope depends on the product type and project requirements.",
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
        question: "What is your MOQ?",
        answer:
          "The MOQ depends on the product model, customization level, and order requirements. Please contact us with the product type and estimated quantity, and we will confirm the MOQ for you.",
      },
      {
        question: "Do you provide samples?",
        answer:
          "Yes. Samples can be provided for evaluation. Customers need to pay the sample cost and shipping cost.",
      },
      {
        question: "What is the lead time?",
        answer:
          "The lead time depends on the order quantity, product type, and customization requirements. In general, the delivery time is about 7 to 30 days after order confirmation.",
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
        question: "What is the warranty period?",
        answer:
          "The general warranty period is one year. The final warranty terms may depend on the product type, order terms, and project requirements.",
      },
      {
        question: "How can customers contact you?",
        answer:
          "Customers can contact us by email or WhatsApp. For product inquiries, quotation requests, OEM/ODM cooperation, or project solutions, please contact us through the website inquiry form, email, or WhatsApp.",
      },
    ],
  },
];

export const staticFaqItems = staticFaqCategories.flatMap(
  (category) => category.items,
);

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

export const chineseStaticFaqCategories: StaticFaqCategory[] = [
  {
    title: "公司与业务",
    slug: "company-business",
    items: [
      {
        question: "DUALCORE LINK 是什么类型的公司？",
        answer:
          "DUALCORE LINK 是专业的智能酒店与智能家居解决方案提供商。我们设计产品概念、系统结构和项目方案，并与合格的生产伙伴合作，按照我们的技术与设计要求完成生产。",
      },
      {
        question: "你们是工厂还是贸易公司？",
        answer:
          "我们不是单纯的贸易公司。我们的核心能力是解决方案设计、产品规划、项目匹配和系统集成支持；产品按照我们的要求设计，并由经过选择的 OEM 合作伙伴生产。",
      },
      {
        question: "你们主要服务哪些市场？",
        answer:
          "我们的重点市场是中东和东南亚，同时也支持其他地区的海外酒店项目、分销商、系统集成商和智能家居解决方案合作伙伴。",
      },
      {
        question: "你们的典型客户有哪些？",
        answer:
          "客户包括酒店业主、酒店项目承包商、系统集成商、智能家居分销商、工程公司和 OEM/ODM 合作伙伴。",
      },
    ],
  },
  {
    title: "产品与解决方案",
    slug: "products-solutions",
    items: [
      {
        question: "你们提供哪些产品？",
        answer:
          "我们提供智能酒店与智能家居自动化产品，包括 AI 智能控制显示屏、RCU 客房控制主机、智能面板、传感器、窗帘控制面板、智能插座、酒店服务面板及酒店配送机器人相关解决方案。",
      },
      {
        question: "你们能提供完整的酒店客房控制解决方案吗？",
        answer:
          "可以。方案可包括 RCU 控制、智能面板、传感器、照明控制、窗帘控制、HVAC 控制、房态显示及其他相关酒店自动化功能，具体范围需按项目确认。",
      },
      {
        question: "你们的产品可以用于酒店项目吗？",
        answer:
          "可以。我们的产品与解决方案适用于酒店客房、服务式公寓、别墅、智能住宅和商业自动化项目。",
      },
      {
        question: "你们能为具体项目匹配产品吗？",
        answer:
          "可以。客户可提供项目要求、房型、控制功能、数量和市场地区，我们会根据项目需求推荐适合的产品与解决方案组合。",
      },
    ],
  },
  {
    title: "OEM/ODM 定制",
    slug: "oem-odm-customization",
    items: [
      {
        question: "你们支持 OEM/ODM 吗？",
        answer:
          "支持。我们可讨论智能面板、酒店客房控制产品及相关自动化设备的 OEM/ODM 需求。",
      },
      {
        question: "可以定制面板颜色、标识和按键布局吗？",
        answer:
          "可以根据产品系列、模具条件和项目要求讨论面板颜色、标识和按键布局。请提供图纸、参考照片或具体定制要求以便评估。",
      },
      {
        question: "可以按照我们的要求设计产品吗？",
        answer:
          "可以。作为解决方案导向的团队，我们可根据项目要求、市场定位和应用场景协助客户规划产品概念与系统方案。",
      },
      {
        question: "可以提供自有品牌产品吗？",
        answer:
          "可以根据产品、订单数量和定制要求讨论自有品牌合作。",
      },
    ],
  },
  {
    title: "订购与交付",
    slug: "ordering-delivery",
    items: [
      {
        question: "如何获取报价？",
        answer:
          "可通过电子邮件或 WhatsApp 申请报价。为提高报价效率，请提供产品清单、国家或地区、预计数量、电压、协议或布线需求、定制要求和目标交付时间。",
      },
      {
        question: "标准产品和定制产品的最低起订量是多少？",
        answer:
          "标准产品不设固定最低起订量。需要新模具时，定制产品可能产生定制或模具费用；使用现有模具且仅改变颜色时，不收取定制费。",
      },
      {
        question: "批量订购前可以申请样品吗？",
        answer:
          "可以在批量订购前讨论样品评估。样品是否可用、样品费用、运输费用和准备时间取决于产品类型及当前项目要求。",
      },
      {
        question: "常规交付周期是多久？",
        answer:
          "常规交付周期通常为 7–15 天，具体取决于产品类型、定制要求和订单数量。酒店项目或 OEM/ODM 订单询价时，请同时提供目标交付计划。",
      },
      {
        question: "可以发送项目图纸、BOM 或产品清单吗？",
        answer:
          "可以。您可通过电子邮件或询盘表单提供项目图纸、BOM、房型表或产品清单，帮助我们为项目匹配智能面板、RCU 主机、传感器、插座和配件。网站本身不上传附件，文件需在邮件应用中手动添加。",
      },
      {
        question: "可以发货到中东和东南亚吗？",
        answer:
          "可以。我们支持发货到中东和东南亚，也可根据目的地和订单要求支持其他海外市场。",
      },
    ],
  },
  {
    title: "技术支持与售后",
    slug: "technical-support-after-sales",
    items: [
      {
        question: "下单前需要确认哪些协议或布线信息？",
        answer:
          "最终选型前请确认项目电压与频率、布线方式、控制功能、通信协议偏好、RCU 或网关需求，以及酒店系统集成要求。",
      },
      {
        question: "你们提供安装和接线支持吗？",
        answer:
          "可以。我们可根据项目要求提供安装指导、接线参考、产品信息和技术支持。",
      },
      {
        question: "你们支持酒店项目调试吗？",
        answer:
          "可以。我们可支持酒店项目沟通、产品匹配、接线指导和技术协调，具体支持方式需根据项目范围确认。",
      },
      {
        question: "你们支持酒店项目的 RCU 需求吗？",
        answer:
          "支持。酒店项目 RCU 范围可包括 RCU 主机、智能面板、传感器、温控器、窗帘控制和服务面板。",
      },
      {
        question: "质保期是多久？",
        answer:
          "质保与售后条款取决于产品类型、订单条款和项目要求。请提供产品型号和项目范围，以便确认适用的支持条款。",
      },
      {
        question: "客户如何联系你们？",
        answer:
          "客户可通过电子邮件或 WhatsApp 联系我们。产品询盘、报价、OEM/ODM 合作或项目解决方案，可通过网站询盘表单、电子邮件或 WhatsApp 提交。",
      },
    ],
  },
  {
    title: "目录、资料与区域项目",
    slug: "catalogs-documents-regional-projects",
    items: [
      {
        question: "在哪里下载产品目录？",
        answer:
          "公开的多语言产品目录可在下载页面获取，可用于智能酒店面板、RCU 主机、传感器、插座、温控器、机器人系统和 OEM/ODM 自动化项目的前期选型。",
      },
      {
        question: "可以提供数据表、证书或接线图吗？",
        answer:
          "可以提供产品数据表、证书副本和接线图。部分资料在分享前可能需要确认产品、市场或项目。",
      },
      {
        question: "证书或测试报告副本可以公开下载吗？",
        answer:
          "并非所有资料都公开下载。经核实且与所需产品或市场相关的证书或测试报告副本，可在确认产品和市场要求后提供。",
      },
      {
        question: "你们的产品适合中东和东南亚项目吗？",
        answer:
          "我们接受中东和东南亚的智能酒店与智能家居自动化项目询盘。请提供国家、电压与频率、协议偏好、数量和所需资料，以便按具体型号核对。",
      },
      {
        question: "你们与分销商、承包商和系统集成商合作吗？",
        answer:
          "合作。我们支持分销商、承包商和系统集成商的智能酒店与智能家居自动化项目询盘，请提供目标市场、关注产品和所需资料。",
      },
      {
        question: "你们能协助匹配酒店项目 BOM 或房型表吗？",
        answer:
          "可以。您可提供酒店房型表、BOM、设备清单或控制功能清单，我们可协助核对所需的智能面板、RCU 主机、传感器、插座、温控器、服务面板及相关自动化设备。",
      },
    ],
  },
];

export const chineseStaticFaqItems = chineseStaticFaqCategories.flatMap(
  (category) => category.items,
);

export function getStaticFaqCategories(locale: string) {
  return locale === "zh" ? chineseStaticFaqCategories : staticFaqCategories;
}

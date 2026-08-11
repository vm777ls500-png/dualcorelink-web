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

export const arabicStaticFaqCategories: StaticFaqCategory[] = [
  {
    title: "الشركة والأعمال",
    slug: "company-business",
    items: [
      { question: "ما نوع شركة DUALCORE LINK؟", answer: "DUALCORE LINK مزود لحلول الفنادق والمنازل الذكية. نخطط المنتجات والأنظمة والمشروعات ونتعاون مع شركاء تصنيع مؤهلين وفق متطلباتنا الفنية والتصميمية." },
      { question: "هل أنتم مصنع أم شركة تجارية؟", answer: "لا يقتصر دورنا على التجارة؛ بل نركز على تصميم الحلول وتخطيط المنتجات وملاءمتها للمشروع ودعم التكامل، بينما يتم التصنيع لدى شركاء OEM مختارين." },
      { question: "ما الأسواق التي تخدمونها؟", answer: "نركز على الشرق الأوسط وجنوب شرق آسيا، وندعم كذلك مشروعات الفنادق والموزعين ومتكاملي الأنظمة في أسواق أخرى." },
      { question: "من هم عملاؤكم المعتادون؟", answer: "يشمل العملاء مالكي الفنادق والمقاولين ومتكاملي الأنظمة والموزعين والشركات الهندسية وشركاء OEM/ODM." },
    ],
  },
  {
    title: "المنتجات والحلول",
    slug: "products-solutions",
    items: [
      { question: "ما المنتجات التي توفرونها؟", answer: "نوفر شاشات تحكم ذكية ووحدات تحكم RCU ولوحات ذكية ومستشعرات ولوحات ستائر ومقابس ولوحات خدمة فندقية وحلول روبوتات التوصيل." },
      { question: "هل توفرون حلاً كاملاً للتحكم في غرفة الفندق؟", answer: "نعم، ويمكن أن يشمل RCU واللوحات والمستشعرات والإضاءة والستائر وHVAC وحالة الغرفة، وفق نطاق المشروع المؤكد." },
      { question: "هل تصلح المنتجات لمشروعات الفنادق؟", answer: "يمكن تقييمها لغرف الفنادق والشقق الفندقية والفلل والمساكن الذكية ومشروعات الأتمتة التجارية." },
      { question: "هل تساعدون في مطابقة المنتجات لمشروع محدد؟", answer: "نعم. أرسل متطلبات المشروع ونوع الغرفة والوظائف والكمية والسوق لنقترح مجموعة منتجات وحلول مناسبة." },
    ],
  },
  {
    title: "تخصيص OEM/ODM",
    slug: "oem-odm-customization",
    items: [
      { question: "هل تدعمون OEM/ODM؟", answer: "نعم، يمكن مناقشة طلبات OEM/ODM للوحات الذكية ومنتجات التحكم في غرف الفنادق وأجهزة الأتمتة ذات الصلة." },
      { question: "هل يمكن تخصيص اللون والشعار وتوزيع الأزرار؟", answer: "يمكن ذلك حسب سلسلة المنتج وتوفر القالب ومتطلبات المشروع. أرسل الرسومات أو الصور المرجعية للتقييم." },
      { question: "هل يمكن تصميم منتج وفق متطلباتنا؟", answer: "يمكننا المساعدة في تخطيط مفهوم المنتج والحل وفق متطلبات المشروع والسوق وسيناريو الاستخدام، مع اعتماد النطاق كتابةً." },
      { question: "هل تتوفر منتجات بعلامة خاصة؟", answer: "يمكن دعم العلامة الخاصة بحسب المنتج والكمية ونطاق التخصيص." },
    ],
  },
  {
    title: "الطلب والتسليم",
    slug: "ordering-delivery",
    items: [
      { question: "كيف أحصل على عرض سعر؟", answer: "استخدم البريد الإلكتروني أو WhatsApp، وأرفق قائمة المنتجات والدولة والكمية والجهد ومتطلبات البروتوكول أو الأسلاك والتخصيص وموعد التسليم." },
      { question: "ما الحد الأدنى للطلب MOQ؟", answer: "لا يوجد حد أدنى ثابت للمنتجات القياسية. قد تتطلب المنتجات المخصصة رسوماً عند الحاجة إلى قالب جديد، ولا تُفرض رسوم تخصيص لتغيير اللون فقط باستخدام قالب قائم." },
      { question: "هل يمكن طلب عينات قبل الطلب بالجملة؟", answer: "نعم، وتُحدد إتاحة العينة وتكلفتها والشحن ووقت التجهيز حسب نوع المنتج ومتطلبات المشروع." },
      { question: "ما مدة التسليم المعتادة؟", answer: "المدة المعتادة 7–15 يوماً، وقد تختلف حسب المنتج والكمية والتخصيص. أرسل الموعد المستهدف عند طلب السعر." },
      { question: "هل يمكن إرسال الرسومات أو BOM أو قائمة المنتجات؟", answer: "نعم، ويمكن إرفاقها يدوياً في تطبيق البريد بعد فتح المسودة؛ الموقع لا يرفع الملفات مباشرة." },
      { question: "هل تشحنون إلى الشرق الأوسط وجنوب شرق آسيا؟", answer: "نعم، وندعم أسواقاً أخرى وفق الوجهة ومتطلبات الطلب." },
    ],
  },
  {
    title: "الدعم الفني وما بعد البيع",
    slug: "technical-support-after-sales",
    items: [
      { question: "ما تفاصيل البروتوكول والأسلاك المطلوبة قبل الطلب؟", answer: "أكد الجهد والتردد وطريقة الأسلاك والوظائف والبروتوكول ومتطلبات RCU أو البوابة وأي تكامل فندقي قبل الاختيار النهائي." },
      { question: "هل توفرون دعم التركيب والتوصيل؟", answer: "يمكن توفير إرشادات التركيب ومراجع التوصيل ومعلومات المنتج والدعم الفني وفق المشروع." },
      { question: "هل تقدمون دعماً لتنفيذ مشروع الفندق؟", answer: "يمكن دعم تنسيق المشروع ومطابقة المنتجات وإرشادات التوصيل، ويُحدد أسلوب الدعم حسب النطاق." },
      { question: "هل تدعمون متطلبات RCU للفنادق؟", answer: "نعم، ويمكن أن تشمل وحدات تحكم RCU واللوحات والمستشعرات والثرموستات والستائر ولوحات الخدمة." },
      { question: "ما مدة الضمان؟", answer: "تعتمد شروط الضمان وما بعد البيع على المنتج وشروط الطلب والمشروع، ويجب تأكيدها للطراز والنطاق المحددين." },
      { question: "كيف يتواصل العملاء معكم؟", answer: "يمكن التواصل عبر نموذج الاستفسار أو البريد الإلكتروني أو WhatsApp لطلبات المنتجات والأسعار وOEM/ODM والحلول." },
    ],
  },
  {
    title: "الكتالوجات والوثائق والمشروعات الإقليمية",
    slug: "catalogs-documents-regional-projects",
    items: [
      { question: "أين يمكن تنزيل كتالوج المنتج؟", answer: "تتوفر الكتالوجات العامة متعددة اللغات في صفحة التنزيلات لدعم الاختيار الأولي." },
      { question: "هل توفرون أوراق البيانات والشهادات ومخططات التوصيل؟", answer: "يمكن توفيرها، وقد تتطلب بعض الوثائق تأكيد المنتج والسوق والمشروع قبل المشاركة." },
      { question: "هل نسخ الشهادات وتقارير الاختبار متاحة للعامة؟", answer: "ليست كل الوثائق عامة؛ تُشارك النسخ المتحققة والمرتبطة بالمنتج أو السوق بعد التأكيد المناسب." },
      { question: "هل المنتجات مناسبة للشرق الأوسط وجنوب شرق آسيا؟", answer: "يمكن تقييمها لهذه المشروعات بعد تحديد الدولة والجهد والتردد والبروتوكول والكمية والوثائق المطلوبة." },
      { question: "هل تتعاملون مع الموزعين والمقاولين ومتكاملي الأنظمة؟", answer: "نعم، وندعم استفساراتهم لمشروعات الفنادق والمنازل الذكية وفق السوق والمنتجات والوثائق المطلوبة." },
      { question: "هل تساعدون في مطابقة BOM أو جدول غرف الفندق؟", answer: "نعم، أرسل جدول الغرف أو BOM أو قائمة الأجهزة والوظائف لمراجعة اللوحات وRCU والمستشعرات والمقابس والثرموستات والأجهزة المرتبطة." },
    ],
  },
];

export const arabicStaticFaqItems = arabicStaticFaqCategories.flatMap(
  (category) => category.items,
);

export const vietnameseStaticFaqCategories: StaticFaqCategory[] = [
  {
    title: "Doanh nghiệp và hoạt động kinh doanh",
    slug: "company-business",
    items: [
      {
        question: "DUALCORE LINK là doanh nghiệp như thế nào?",
        answer:
          "DUALCORE LINK cung cấp giải pháp khách sạn và nhà thông minh. Chúng tôi lập kế hoạch sản phẩm, hệ thống và dự án, đồng thời phối hợp với các đối tác sản xuất đủ năng lực theo yêu cầu kỹ thuật và thiết kế đã xác nhận.",
      },
      {
        question: "Các bạn là nhà sản xuất hay công ty thương mại?",
        answer:
          "Vai trò của chúng tôi không chỉ là thương mại. DUALCORE LINK tập trung vào thiết kế giải pháp, lập kế hoạch sản phẩm, lựa chọn theo dự án và hỗ trợ tích hợp; hoạt động sản xuất do các đối tác OEM được chọn thực hiện.",
      },
      {
        question: "DUALCORE LINK phục vụ những thị trường nào?",
        answer:
          "Chúng tôi tập trung vào Trung Đông và Đông Nam Á, đồng thời hỗ trợ dự án khách sạn, nhà phân phối và đơn vị tích hợp hệ thống tại các thị trường khác.",
      },
      {
        question: "Khách hàng điển hình của các bạn là ai?",
        answer:
          "Khách hàng gồm chủ đầu tư khách sạn, nhà thầu, đơn vị tích hợp hệ thống, nhà phân phối, công ty kỹ thuật và đối tác OEM/ODM.",
      },
    ],
  },
  {
    title: "Sản phẩm và giải pháp",
    slug: "products-solutions",
    items: [
      {
        question: "DUALCORE LINK cung cấp những sản phẩm nào?",
        answer:
          "Danh mục gồm màn hình điều khiển thông minh, bộ điều khiển RCU, bảng điều khiển thông minh, cảm biến, bảng điều khiển rèm, ổ cắm, bảng dịch vụ khách sạn và giải pháp robot giao hàng.",
      },
      {
        question: "Các bạn có cung cấp giải pháp điều khiển phòng khách sạn hoàn chỉnh không?",
        answer:
          "Có. Phạm vi có thể gồm RCU, bảng điều khiển, cảm biến, chiếu sáng, rèm, HVAC và trạng thái phòng, tùy theo yêu cầu dự án đã xác nhận.",
      },
      {
        question: "Sản phẩm có phù hợp với dự án khách sạn không?",
        answer:
          "Sản phẩm có thể được đánh giá cho phòng khách sạn, căn hộ dịch vụ, biệt thự, nhà thông minh và dự án tự động hóa thương mại.",
      },
      {
        question: "Các bạn có hỗ trợ lựa chọn sản phẩm cho dự án cụ thể không?",
        answer:
          "Có. Hãy gửi yêu cầu dự án, loại phòng, chức năng, số lượng và thị trường để chúng tôi đề xuất danh mục sản phẩm và giải pháp phù hợp.",
      },
    ],
  },
  {
    title: "Tùy chỉnh OEM/ODM",
    slug: "oem-odm-customization",
    items: [
      {
        question: "Các bạn có hỗ trợ OEM/ODM không?",
        answer:
          "Có. Có thể trao đổi yêu cầu OEM/ODM cho bảng điều khiển thông minh, sản phẩm điều khiển phòng khách sạn và thiết bị tự động hóa liên quan.",
      },
      {
        question: "Có thể tùy chỉnh màu sắc, logo và bố trí phím không?",
        answer:
          "Có thể, tùy dòng sản phẩm, khuôn hiện có và yêu cầu dự án. Hãy gửi bản vẽ hoặc hình ảnh tham khảo để đánh giá.",
      },
      {
        question: "Có thể phát triển sản phẩm theo yêu cầu riêng không?",
        answer:
          "Chúng tôi có thể hỗ trợ lập kế hoạch ý tưởng sản phẩm và giải pháp theo yêu cầu dự án, thị trường và tình huống sử dụng; phạm vi cuối cùng phải được xác nhận bằng văn bản.",
      },
      {
        question: "Có hỗ trợ nhãn hiệu riêng không?",
        answer:
          "Có thể hỗ trợ nhãn hiệu riêng tùy sản phẩm, số lượng và phạm vi tùy chỉnh.",
      },
    ],
  },
  {
    title: "Đặt hàng và giao hàng",
    slug: "ordering-delivery",
    items: [
      {
        question: "Làm thế nào để nhận báo giá?",
        answer:
          "Hãy liên hệ qua email hoặc WhatsApp và cung cấp danh mục sản phẩm, quốc gia, số lượng, điện áp, yêu cầu giao thức hoặc dây dẫn, phạm vi tùy chỉnh và thời gian giao hàng mục tiêu.",
      },
      {
        question: "Số lượng đặt hàng tối thiểu MOQ là bao nhiêu?",
        answer:
          "Sản phẩm tiêu chuẩn không có MOQ cố định. Sản phẩm tùy chỉnh có thể phát sinh phí khi cần khuôn mới; đổi màu trên khuôn hiện có không tính phí tùy chỉnh.",
      },
      {
        question: "Có thể đặt mẫu trước khi mua số lượng lớn không?",
        answer:
          "Có. Tình trạng mẫu, chi phí, vận chuyển và thời gian chuẩn bị được xác nhận theo loại sản phẩm và yêu cầu dự án.",
      },
      {
        question: "Thời gian giao hàng thông thường là bao lâu?",
        answer:
          "Thời gian giao hàng thông thường là 7–15 ngày và có thể thay đổi theo sản phẩm, số lượng và phạm vi tùy chỉnh. Hãy cung cấp thời gian mục tiêu khi yêu cầu báo giá.",
      },
      {
        question: "Có thể gửi bản vẽ, BOM hoặc danh mục sản phẩm không?",
        answer:
          "Có. Sau khi bản nháp email mở, bạn có thể đính kèm thủ công bản vẽ, BOM, danh mục thiết bị hoặc yêu cầu dự án; website không trực tiếp tải tệp lên.",
      },
      {
        question: "Các bạn có giao hàng đến Trung Đông và Đông Nam Á không?",
        answer:
          "Có. Chúng tôi cũng hỗ trợ các thị trường khác tùy điểm đến và yêu cầu đơn hàng.",
      },
    ],
  },
  {
    title: "Hỗ trợ kỹ thuật và hậu mãi",
    slug: "technical-support-after-sales",
    items: [
      {
        question: "Cần xác nhận thông tin giao thức và dây dẫn nào trước khi đặt hàng?",
        answer:
          "Cần xác nhận điện áp, tần số, phương thức dây dẫn, chức năng, giao thức, yêu cầu RCU hoặc gateway và mọi tích hợp khách sạn trước khi lựa chọn cuối cùng.",
      },
      {
        question: "Các bạn có hỗ trợ lắp đặt và đấu nối không?",
        answer:
          "Có thể cung cấp hướng dẫn lắp đặt, tài liệu đấu nối, thông tin sản phẩm và hỗ trợ kỹ thuật theo phạm vi dự án.",
      },
      {
        question: "Các bạn có hỗ trợ triển khai dự án khách sạn không?",
        answer:
          "Có thể hỗ trợ phối hợp dự án, lựa chọn sản phẩm và hướng dẫn đấu nối; hình thức hỗ trợ được xác định theo phạm vi công việc.",
      },
      {
        question: "Các bạn có hỗ trợ yêu cầu RCU cho khách sạn không?",
        answer:
          "Có. Phạm vi có thể gồm bộ điều khiển RCU, bảng điều khiển, cảm biến, bộ điều nhiệt, rèm và bảng dịch vụ khách sạn.",
      },
      {
        question: "Thời hạn bảo hành là bao lâu?",
        answer:
          "Điều kiện bảo hành và hậu mãi phụ thuộc vào sản phẩm, điều khoản đơn hàng và yêu cầu dự án; cần xác nhận theo đúng mẫu và phạm vi cụ thể.",
      },
      {
        question: "Khách hàng có thể liên hệ bằng cách nào?",
        answer:
          "Khách hàng có thể dùng biểu mẫu yêu cầu, email hoặc WhatsApp cho báo giá sản phẩm, hợp tác OEM/ODM và giải pháp dự án.",
      },
    ],
  },
  {
    title: "Danh mục, tài liệu và dự án theo khu vực",
    slug: "catalogs-documents-regional-projects",
    items: [
      {
        question: "Có thể tải danh mục sản phẩm ở đâu?",
        answer:
          "Các danh mục đa ngôn ngữ công khai có trên trang tải xuống để hỗ trợ bước lựa chọn ban đầu.",
      },
      {
        question: "Các bạn có cung cấp datasheet, chứng nhận hoặc sơ đồ dây không?",
        answer:
          "Có thể cung cấp. Một số tài liệu cần xác nhận sản phẩm, thị trường hoặc dự án trước khi chia sẻ.",
      },
      {
        question: "Bản sao chứng nhận hoặc báo cáo thử nghiệm có được tải công khai không?",
        answer:
          "Không phải mọi tài liệu đều công khai. Bản sao đã xác minh và phù hợp với sản phẩm hoặc thị trường sẽ được cung cấp sau khi xác nhận yêu cầu.",
      },
      {
        question: "Sản phẩm có phù hợp với dự án tại Trung Đông và Đông Nam Á không?",
        answer:
          "Sản phẩm có thể được đánh giá sau khi xác định quốc gia, điện áp, tần số, giao thức, số lượng và tài liệu cần thiết.",
      },
      {
        question: "Các bạn có làm việc với nhà phân phối, nhà thầu và đơn vị tích hợp hệ thống không?",
        answer:
          "Có. Chúng tôi hỗ trợ yêu cầu cho dự án khách sạn và nhà thông minh theo thị trường, sản phẩm và tài liệu cần thiết.",
      },
      {
        question: "Các bạn có thể hỗ trợ đối chiếu BOM hoặc bảng loại phòng khách sạn không?",
        answer:
          "Có. Hãy gửi bảng loại phòng, BOM, danh mục thiết bị hoặc chức năng để rà soát bảng điều khiển, RCU, cảm biến, ổ cắm, bộ điều nhiệt và thiết bị liên quan.",
      },
    ],
  },
];

export const vietnameseStaticFaqItems = vietnameseStaticFaqCategories.flatMap(
  (category) => category.items,
);

export function getStaticFaqCategories(locale: string) {
  if (locale === "zh") return chineseStaticFaqCategories;
  if (locale === "ar") return arabicStaticFaqCategories;
  if (locale === "vi") return vietnameseStaticFaqCategories;
  return staticFaqCategories;
}

import {
  defineLocalizedFileContent,
  type LocalizedFileContent,
  type LocalizedStructuredContent,
} from "../types";

function zhPage(input: {
  pageType: LocalizedFileContent["pageType"];
  slug: string;
  sourceUrl: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  structuredContent: LocalizedStructuredContent;
}): LocalizedFileContent {
  return defineLocalizedFileContent({
    ...input,
    locale: "zh",
    translationStatus: "approved",
    reviewStatus: "approved",
  });
}

export const zhStaticPages: readonly LocalizedFileContent[] = [
  zhPage({
    pageType: "static",
    slug: "about",
    sourceUrl: "https://dualcorelink.com/en/about/",
    title: "关于 DUALCORE LINK 酒店智能客控产品与解决方案",
    seoTitle: "关于 DUALCORE LINK｜酒店智能客控产品与 OEM/ODM 服务",
    metaDescription:
      "了解 DUALCORE LINK 如何为酒店业主、工程承包商、系统集成商和渠道客户提供 RCU、智能控制面板及 OEM/ODM 项目支持。",
    structuredContent: {
      eyebrow: "关于我们",
      h1: "面向酒店工程的智能客控产品与项目支持",
      introduction:
        "DUALCORE LINK 为海外酒店与智能建筑项目提供客房控制产品选型、设备组合、样品确认和 OEM/ODM 定制协调。服务对象包括酒店业主、工程承包商、系统集成商与渠道客户。我们围绕客房类型、控制点位、安装条件、系统接口和交付计划整理需求，帮助采购团队在下单前确认产品边界与项目责任。",
      breadcrumbLabel: "关于我们",
      sections: [
        {
          heading: "我们提供什么",
          paragraphs: [
            "产品范围涵盖客房控制主机与控制箱、智能开关面板、触控屏、温控器、人体与门磁传感器、门牌房态显示、窗帘控制及相关配套设备。不同设备是否能够组成同一套系统，取决于实际型号、接口、供电、布线和项目配置，不能仅凭产品类别判断。",
            "DUALCORE LINK 负责与客户确认功能、外观、数量、样品和资料要求，并协调符合条件的 OEM 生产伙伴。最终规格、协议和电气条件以经双方确认的型号资料和项目文件为准。",
          ],
        },
        {
          heading: "从需求确认到项目交付",
          paragraphs: [
            "项目通常从房型、控制功能、安装方式和集成范围开始。完成初步产品匹配后，可进入样品评估、修改意见记录、报价确认、生产安排和包装交付。对于需要系统联动的项目，还应提前明确 RCU、HVAC、窗帘、传感器、门锁或上层系统之间的责任界面。",
          ],
          bullets: [
            "整理房型、控制点位和应用场景。",
            "确认产品型号、安装尺寸与接线条件。",
            "评估面板外观、按键文字、图标和品牌需求。",
            "通过样品和书面规格确认关键要求。",
            "确定数量、包装、文件和交期。",
            "保留项目变更与技术确认记录。",
          ],
        },
        {
          heading: "OEM/ODM 定制边界",
          paragraphs: [
            "可讨论的定制项目包括面板颜色与表面效果、按键布局、图标文字、品牌标识、语言、包装和产品组合。具体可行性受产品结构、模具、数量与生产条件影响，并非所有型号都支持同样的改动。",
            "样品可用于项目评估，样品及运输费用由客户承担。标准产品通常不设固定最低起订量；如需新模具或专用工具，可能产生相应费用。常规交付周期通常为 7–15 天，实际时间取决于产品、数量和定制范围。",
          ],
        },
        {
          heading: "技术支持与质保",
          paragraphs: [
            "支持内容可包括安装与接线资料、产品信息、系统匹配讨论和项目技术沟通。通用质保期为一年，最终质保条件仍以具体产品和订单文件为准。任何协议兼容性、认证或性能要求，都应在下单前取得书面确认。",
          ],
        },
      ],
      faqs: [
        {
          question: "DUALCORE LINK 是酒店运营公司吗？",
          answer:
            "不是。DUALCORE LINK 专注于酒店与智能建筑项目所需的客控产品、自动化设备和 OEM/ODM 项目支持。",
        },
        {
          question: "可以先申请样品再决定批量采购吗？",
          answer:
            "可以。样品用于验证外观、安装、功能和系统匹配，样品与运输费用由客户承担，具体安排按产品确认。",
        },
        {
          question: "询价前需要准备哪些资料？",
          answer:
            "建议提供房型、控制功能、数量、安装条件、接口或协议要求、目标市场、交期以及可用的图纸或品牌文件。",
        },
      ],
      relatedLinks: [
        {
          label: "查看酒店客控产品",
          description: "浏览 RCU、智能面板和酒店客房配套设备。",
          href: "/zh/products/",
        },
        {
          label: "查看项目解决方案",
          description: "从系统范围和工程采购角度选择解决方案。",
          href: "/zh/solutions/",
        },
        {
          label: "提交项目需求",
          description: "向团队说明房型、数量、功能和定制范围。",
          href: "/zh/contact/",
        },
      ],
      cta: {
        heading: "讨论您的酒店客控项目",
        description:
          "请提供房型、设备清单、数量、安装条件和定制要求，我们将据此进行初步产品与项目范围评估。",
        label: "提交项目询盘",
        href: "/zh/contact/#get-a-quote",
        secondaryLabel: "浏览解决方案",
        secondaryHref: "/zh/solutions/",
      },
    },
  }),
  zhPage({
    pageType: "static",
    slug: "contact",
    sourceUrl: "https://dualcorelink.com/en/contact/",
    title: "联系 DUALCORE LINK 酒店智能客控团队",
    seoTitle: "联系 DUALCORE LINK｜酒店客控产品询价与项目咨询",
    metaDescription:
      "联系 DUALCORE LINK，咨询酒店 RCU、智能面板、客房控制系统及 OEM/ODM 项目，获取选型、样品和报价支持。",
    structuredContent: {
      eyebrow: "项目联系",
      h1: "提交酒店客控产品与工程需求",
      introduction:
        "为便于快速判断产品和项目范围，请提供目标市场、酒店或建筑类型、房型、数量、控制功能、安装条件、接口要求、定制内容和期望交期。DUALCORE LINK 将根据资料把询盘分配给销售或技术人员，并说明下一步需要确认的样品、图纸或规格。",
      breadcrumbLabel: "联系我们",
      sections: [
        {
          heading: "销售与项目联系方式",
          paragraphs: [
            "电子邮箱：sales@dualcorelink.com。公司联系电话：+86 137 0333 3750。WhatsApp：+852 7039 0436。WeChat：a13703333750。电话用于销售咨询，WhatsApp 号码用于即时通讯，请根据所需沟通方式选择。",
            "供应链办公室地址：Unit 1-2202, Building 19, Yuhe Xincheng East District, Yuhe Road, Yunhe District, Cangzhou City, Hebei Province, China。",
          ],
        },
        {
          heading: "询价信息清单",
          paragraphs: [
            "只有产品名称通常不足以形成准确报价。酒店客控设备的配置会随房型、控制逻辑、安装方式和系统接口变化。资料越完整，越容易避免样品与批量方案之间出现偏差。",
          ],
          bullets: [
            "酒店、服务式公寓或其他项目类型。",
            "房间数量、房型和每类房间的设备数量。",
            "照明、HVAC、窗帘、服务按键和传感器需求。",
            "RCU、KNX、RS485 或其他接口要求；如未确定请明确说明。",
            "面板材质、颜色、文字、图标、品牌和包装要求。",
            "项目所在国家、交付地点和期望时间。",
          ],
        },
        {
          heading: "样品与技术确认",
          paragraphs: [
            "如项目需要验证外观、安装或接口，可先申请样品。对于 RCU 或系统级项目，请同时提供接线图、点位表、房型图或集成要求。任何协议、认证、电气参数和兼容性要求都应在订单前书面确认。",
          ],
        },
      ],
      faqs: [
        {
          question: "多久可以收到回复？",
          answer:
            "回复时间取决于资料完整程度和项目复杂度。提供清晰的房型、数量、功能及交期信息，有助于团队更快完成初步评估。",
        },
        {
          question: "可以通过 WhatsApp 直接询价吗？",
          answer:
            "可以。WhatsApp 号码为 +852 7039 0436。涉及规格、图纸和正式报价时，建议同时通过电子邮箱保留完整资料。",
        },
        {
          question: "可以讨论 OEM/ODM 项目吗？",
          answer:
            "可以。请说明需要修改的外观、文字、图标、功能、包装或产品组合，并提供预计数量和目标时间。",
        },
      ],
      relatedLinks: [
        {
          label: "先浏览产品",
          description: "确认拟采购的 RCU、面板或客房设备。",
          href: "/zh/products/",
        },
        {
          label: "查看解决方案",
          description: "按系统和应用场景梳理项目范围。",
          href: "/zh/solutions/",
        },
        {
          label: "常见问题",
          description: "了解样品、定制、交期与技术确认方式。",
          href: "/zh/faqs/",
        },
      ],
      cta: {
        heading: "发送项目资料",
        description:
          "请附上房型、设备数量、功能、安装方式、接口、定制和交付要求。",
        label: "发送邮件",
        href: "mailto:sales@dualcorelink.com",
        secondaryLabel: "WhatsApp 联系",
        secondaryHref: "https://wa.me/85270390436",
      },
    },
  }),
  zhPage({
    pageType: "static",
    slug: "faqs",
    sourceUrl: "https://dualcorelink.com/en/faqs/",
    title: "酒店智能客控产品采购常见问题",
    seoTitle: "酒店客控产品常见问题｜RCU、智能面板与 OEM/ODM",
    metaDescription:
      "了解酒店 RCU、智能控制面板、样品、起订量、交期、OEM/ODM、安装和系统兼容性的常见采购问题。",
    structuredContent: {
      eyebrow: "采购与技术问答",
      h1: "酒店 RCU、智能面板与客控项目常见问题",
      introduction:
        "本页面向酒店业主、工程承包商、系统集成商和渠道采购人员，集中说明产品选型、样品、定制、交期、安装和技术确认。具体型号的电气参数、协议、认证和兼容性必须以书面规格为准，不能用通用回答替代项目确认。",
      breadcrumbLabel: "常见问题",
      sections: [
        {
          heading: "产品与系统选型",
          paragraphs: [
            "选型应从房型和控制目标开始，而不是先决定单一面板。照明、HVAC、窗帘、取电、房态、服务按键和传感器是否由同一 RCU 或上层系统管理，会直接影响设备组合、布线和调试责任。",
          ],
          bullets: [
            "确认每个房型的控制点位和使用场景。",
            "确认设备安装盒、弱电箱和电源条件。",
            "确认 RCU 与面板、传感器及第三方系统的接口。",
            "在样板间测试后再扩大到批量房间。",
          ],
        },
        {
          heading: "样品、起订量与交期",
          paragraphs: [
            "可以提供样品供评估，样品及运输费用由客户承担。标准产品通常不设固定最低起订量；定制项目是否有数量要求，取决于外观、结构、模具、包装和生产条件。常规交付周期通常为 7–15 天，实际时间以产品、数量和定制范围为准。",
          ],
        },
        {
          heading: "OEM/ODM 与品牌定制",
          paragraphs: [
            "可讨论面板颜色、表面效果、图标文字、按键布局、品牌标识、语言、包装和产品组合。若使用现有模具改变颜色，通常不产生新模具费用；新结构或新模具需要单独评估。所有修改都应通过样品或书面文件确认。",
          ],
        },
        {
          heading: "安装、协议与售后",
          paragraphs: [
            "安装应由具备相应资质的工程人员按照项目图纸和产品资料完成。KNX、RS485、RCU、HVAC 或其他接口是否可用，必须针对具体型号确认。通用质保期为一年，最终条件以产品和订单文件为准。",
          ],
        },
      ],
      faqs: [
        {
          question: "RCU 和普通开关面板有什么区别？",
          answer:
            "RCU 是客房控制系统中的控制单元或控制主机，负责接收输入并执行照明、HVAC、窗帘等逻辑；面板主要是住客或工作人员的操作界面。具体职责会随系统设计变化。",
        },
        {
          question: "所有产品都支持 KNX 或 RS485 吗？",
          answer:
            "不能这样假设。协议与接口属于具体型号和项目配置，必须在选型及下单前通过技术资料确认。",
        },
        {
          question: "可以按酒店品牌定制图标和文字吗？",
          answer:
            "可讨论图标、文字、语言和品牌标识，能否实施取决于型号、数量、工艺和经确认的生产条件。",
        },
        {
          question: "是否提供安装和接线资料？",
          answer:
            "可根据已确认产品提供相应资料。系统级项目仍需由项目工程方完成点位、供电、接线和调试方案。",
        },
        {
          question: "如何开始询价？",
          answer:
            "请发送房型、数量、功能、安装条件、接口要求、定制范围、目标市场和交期，并附上已有图纸或参考图片。",
        },
      ],
      relatedLinks: [
        {
          label: "浏览产品目录",
          description: "查看 RCU、智能面板和酒店客房设备。",
          href: "/zh/products/",
        },
        {
          label: "选择系统方案",
          description: "按酒店自动化和客房控制范围比较方案。",
          href: "/zh/solutions/",
        },
        {
          label: "联系项目团队",
          description: "提交规格、数量、图纸和定制要求。",
          href: "/zh/contact/",
        },
      ],
      cta: {
        heading: "仍有具体项目问题？",
        description:
          "把产品型号、房型、数量和技术要求发送给团队，我们将按实际项目范围回复。",
        label: "提交问题",
        href: "/zh/contact/#get-a-quote",
      },
    },
  }),
  zhPage({
    pageType: "product-listing",
    slug: "products",
    sourceUrl: "https://dualcorelink.com/en/products/",
    title: "酒店智能客控产品目录",
    seoTitle: "酒店智能客控产品｜RCU、智能面板与客房设备",
    metaDescription:
      "浏览酒店 RCU 控制主机、控制箱、智能触控屏和四键场景面板，按房型、安装与集成要求规划工程采购。",
    structuredContent: {
      eyebrow: "产品目录",
      h1: "酒店 RCU、智能控制面板与客房设备",
      introduction:
        "本目录用于酒店客房控制和智能建筑项目的初步选型。本阶段中文页面包括 RCU 控制主机、RCU 控制箱、86 型 AI 智能控制屏和四键场景控制面板。采购时应把产品放入具体房型和系统关系中评估，并在下单前确认接口、供电、安装、接线和定制要求。",
      breadcrumbLabel: "产品",
      sections: [
        {
          heading: "RCU 控制与设备集中",
          paragraphs: [
            "RCU 控制主机和控制箱用于组织客房内的照明、HVAC、窗帘、服务信号或其他控制点。不同项目的 I/O、回路、电源、通信和安装条件差异较大，因此产品页只说明真实用途，不代替项目图纸和型号规格。",
          ],
          bullets: [
            "酒店智能客房 RCU 控制主机",
            "RCU 客房控制箱",
          ],
        },
        {
          heading: "住客控制界面",
          paragraphs: [
            "86 型 AI 智能控制屏可作为房间内的集中操作界面；四键场景控制面板可配置为照明、窗帘、房间模式或项目指定功能。按键或屏幕功能应与 RCU 和系统逻辑共同确认。",
          ],
          bullets: [
            "86 型 AI 智能控制屏",
            "四键酒店场景控制面板",
          ],
        },
        {
          heading: "项目选型顺序",
          paragraphs: [
            "先确定房型、控制对象和住客操作方式，再确认安装盒、布线、供电与协议，最后评估外观、语言、品牌和包装。需要 OEM/ODM 时，应把标准产品需求和定制需求分别列明。",
          ],
        },
      ],
      faqs: [
        {
          question: "可以只采购面板，不采购整套系统吗？",
          answer:
            "是否可行取决于面板型号、接口和现有系统。请提供现有控制器、接线和协议资料，以便确认匹配条件。",
        },
        {
          question: "产品页没有列出的参数如何确认？",
          answer:
            "请提交目标型号和项目要求。未公开的回路、供电、协议、尺寸或接线信息应通过正式资料确认，不能推测。",
        },
        {
          question: "可以定制中文文字和图标吗？",
          answer:
            "可按型号和数量讨论中文文字、图标、品牌和界面内容，最终以确认样品或书面规格为准。",
        },
      ],
      relatedLinks: [
        {
          label: "酒店 RCU 控制主机",
          description: "查看客房控制主机的项目用途与采购信息。",
          href: "/zh/products/hotel-smart-room-rcu-host-1/",
        },
        {
          label: "RCU 客房控制箱",
          description: "了解集中安装与系统集成的控制箱选项。",
          href: "/zh/products/rcu-controller-cabinet/",
        },
        {
          label: "86 型 AI 智能控制屏",
          description: "查看适配 86 型墙盒的客房触控界面。",
          href: "/zh/products/86-type-ai-smart-control-display/",
        },
        {
          label: "四键场景控制面板",
          description: "了解可配置按键与客房场景控制用途。",
          href: "/zh/products/smart-four-key-scene-control-panel/",
        },
      ],
      cta: {
        heading: "需要按房型整理产品清单？",
        description:
          "提供房间类型、控制功能、设备数量和系统要求，获取初步选型讨论。",
        label: "提交产品需求",
        href: "/zh/contact/#get-a-quote",
        secondaryLabel: "查看解决方案",
        secondaryHref: "/zh/solutions/",
      },
    },
  }),
  zhPage({
    pageType: "solution-listing",
    slug: "solutions",
    sourceUrl: "https://dualcorelink.com/en/solutions/",
    title: "酒店智能客控与 OEM/ODM 解决方案",
    seoTitle: "酒店客房控制解决方案｜RCU、智能酒店自动化与 OEM/ODM",
    metaDescription:
      "面向酒店工程采购的 RCU 客房控制、智能酒店自动化及 OEM/ODM 定制面板解决方案，明确设备、接口和交付范围。",
    structuredContent: {
      eyebrow: "解决方案",
      h1: "面向酒店工程采购的客房控制解决方案",
      introduction:
        "解决方案页用于界定系统范围，而不是把多个产品简单组合。中文内容覆盖 OEM/ODM 定制面板、酒店配送机器人、RCU 客房控制、AI 智能显示、宾客房控制和智能酒店自动化六类需求。每个项目都应进一步确认房型、控制功能、设备关系、安装环境、接口责任、样板间测试和交付文件。",
      breadcrumbLabel: "解决方案",
      sections: [
        {
          heading: "OEM/ODM 定制面板",
          paragraphs: [
            "适用于需要统一面板外观、文字、图标、品牌、语言、包装或产品组合的酒店与渠道项目。可行范围取决于现有产品结构、数量、工艺和模具条件，最终以样品和书面规格为准。",
          ],
        },
        {
          heading: "RCU 客房控制",
          paragraphs: [
            "围绕 RCU 主机或控制箱规划照明、HVAC、窗帘、取电、服务按键和传感器等客房功能。项目应明确 I/O、回路、供电、通信、接线和调试责任，不能用通用方案替代工程设计。",
          ],
        },
        {
          heading: "智能酒店自动化",
          paragraphs: [
            "适用于跨越客房设备、公共区域设备或服务流程的综合需求。规划时需提供平面图、设备位置、网络或通信条件、第三方系统接口和项目阶段，以便区分可供产品与现场集成责任。",
          ],
        },
        {
          heading: "如何确定方案范围",
          paragraphs: [
            "从业务目标和房型开始，列出每项功能的输入、输出和操作界面，再确认设备型号与技术条件。建议先完成样板间或样品验证，记录修改意见后再确定批量生产和交付。",
          ],
        },
      ],
      faqs: [
        {
          question: "解决方案是否包含现场安装？",
          answer:
            "页面说明产品与项目配合范围，不应默认包含现场施工。安装、布线、调试和第三方集成责任需在项目文件中明确。",
        },
        {
          question: "可以直接采用通用 RCU 方案吗？",
          answer:
            "可用通用结构做初步讨论，但最终配置必须依据房型、回路、I/O、供电、接口和控制逻辑确认。",
        },
        {
          question: "什么时候需要 OEM/ODM？",
          answer:
            "当标准产品无法满足品牌、外观、文字、按键布局、包装或产品组合要求时，可进入 OEM/ODM 可行性评估。",
        },
      ],
      relatedLinks: [
        {
          label: "OEM/ODM 定制面板方案",
          description: "规划面板外观、品牌、文字和产品组合。",
          href: "/zh/solutions/oem-odm-custom-panel-solution/",
        },
        {
          label: "RCU 客房控制方案",
          description: "界定客房控制主机、面板、传感器和系统接口。",
          href: "/zh/solutions/rcu-room-control-solution/",
        },
        {
          label: "智能酒店自动化方案",
          description: "从客房设备到系统协同规划自动化范围。",
          href: "/zh/solutions/smart-hotel-automation-solution/",
        },
      ],
      cta: {
        heading: "先确认项目范围，再选择设备",
        description:
          "提供房型、控制功能、系统接口、数量、定制和交付要求，便于形成可核对的方案。",
        label: "提交解决方案需求",
        href: "/zh/contact/#get-a-quote",
        secondaryLabel: "浏览产品",
        secondaryHref: "/zh/products/",
      },
    },
  }),
];

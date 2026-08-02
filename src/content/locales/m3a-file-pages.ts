import {
  defineLocalizedFileContent,
  type LocalizedFileContent,
  type LocalizedStructuredContent,
} from "./types";
import {
  m3aRegionCatalog,
  m3aResourceCatalog,
} from "./m3a-catalog";

type SupportedLocale = "ar" | "zh";

function filePage(
  locale: SupportedLocale,
  input: {
    pageType: LocalizedFileContent["pageType"];
    slug: string;
    sourceUrl: string;
    title: string;
    seoTitle: string;
    metaDescription: string;
    structuredContent: LocalizedStructuredContent;
  },
): LocalizedFileContent {
  return defineLocalizedFileContent({
    ...input,
    locale,
    translationStatus: "approved",
    reviewStatus: "approved",
  });
}

function resourceListing(locale: SupportedLocale): LocalizedFileContent {
  if (locale === "ar") {
    return filePage(locale, {
      pageType: "resource-listing",
      slug: "resources",
      sourceUrl: "https://dualcorelink.com/en/resources/",
      title: "أدلة شراء وتقنية لمشروعات الفنادق الذكية",
      seoTitle: "أدلة RCU والتحكم الذكي في غرف الفنادق | DUALCORE LINK",
      metaDescription:
        "أدلة عربية لشراء RCU ولوحات التحكم والمستشعرات وتخطيط الأسلاك وOEM/ODM وتجديد غرف الفنادق.",
      structuredContent: {
        eyebrow: "مركز المعرفة للمشروعات",
        h1: "أدلة شراء وتقنية لمشروعات الفنادق الذكية",
        introduction:
          "تجمع هذه المكتبة خمسة عشر دليلاً عربياً مستقلاً لمساعدة مالك الفندق والمقاول ومتكامل الأنظمة والمشتري على اتخاذ قرارات RCU واللوحات والمستشعرات والأسلاك وOEM/ODM والتجديد. يبدأ كل دليل من سؤال شراء أو قرار هندسي، ويبيّن المعلومات التي يجب تأكيدها من دون اختراع مواصفات أو نتائج.",
        breadcrumbLabel: "الموارد",
        sections: [
          {
            heading: "أدلة RCU وبنية الغرفة",
            paragraphs: [
              "ابدأ بتعريف دور RCU وبنية الأسلاك وجدول النقاط وعلاقة المضيف أو الخزانة باللوحات وHVAC والستائر والمستشعرات قبل اختيار الأجهزة.",
            ],
          },
          {
            heading: "أدلة اللوحات والواجهات",
            paragraphs: [
              "راجع وظيفة المفاتيح والشاشات ومنظّم الحرارة والتحكم بجانب السرير والخامة والتشطيب ومسار OEM/ODM بناءً على رحلة النزيل وظروف التركيب.",
            ],
          },
          {
            heading: "أدلة الشراء والتكلفة والتجديد",
            paragraphs: [
              "توضح الأدلة مدخلات طلب العرض وعوامل التكلفة ومسح الموقع والعينة والوثائق من دون عرض أسعار أو نسب توفير أو شهادات غير مؤكدة.",
            ],
          },
          {
            heading: "استخدم الدليل مع وثائق المشروع",
            paragraphs: [
              "حوّل الاستنتاجات إلى قائمة تحقق للرسومات والكمية والجهد والواجهات والوظائف والمسؤوليات، ثم ناقش المنتج أو الحل المناسب مع الفريق.",
            ],
          },
        ],
        faqs: [
          {
            question: "هل هذه الأدلة بديل عن التصميم الكهربائي؟",
            answer: "لا. هي مواد قرار وشراء، ويجب أن يعتمد المهندسون المؤهلون التصميم والأسلاك والتنفيذ للمشروع.",
          },
          {
            question: "من أين أبدأ في مشروع RCU؟",
            answer: "ابدأ بدليل تعريف RCU ودليل الأسلاك ودليل الشراء، ثم جهّز أنواع الغرف والنقاط والواجهات.",
          },
          {
            question: "هل تحتوي الأدلة على أسعار أو شهادات؟",
            answer: "لا تعرض أسعاراً أو شهادات عامة؛ تُراجع الوثائق والشروط حسب المنتج والمشروع.",
          },
        ],
        relatedLinks: [
          {
            label: "منتجات الفندق",
            description: "انتقل من قرار الدليل إلى فئة المنتج المناسبة.",
            href: "/ar/products/",
          },
          {
            label: "حلول التحكم والأتمتة",
            description: "راجع نطاق النظام ومسؤوليات التكامل.",
            href: "/ar/solutions/",
          },
          {
            label: "إرسال سؤال المشروع",
            description: "شارك الرسومات والكمية والوظائف المطلوب مراجعتها.",
            href: "/ar/contact/",
          },
        ],
        cta: {
          heading: "حوّل البحث إلى قائمة متطلبات قابلة للتسعير",
          description:
            "أرسل نوع المشروع والغرف والوظائف والمنتجات والكمية والوثائق لمراجعة قرار الشراء.",
          label: "مناقشة متطلبات المشروع",
          href: "/ar/contact/#get-a-quote",
          secondaryLabel: "عرض المنتجات",
          secondaryHref: "/ar/products/",
        },
        imageAlt: "أدلة عربية لمشروعات RCU والتحكم الذكي في غرف الفنادق",
      },
    });
  }

  return filePage(locale, {
    pageType: "resource-listing",
    slug: "resources",
    sourceUrl: "https://dualcorelink.com/en/resources/",
    title: "智能酒店工程采购与技术指南",
    seoTitle: "酒店 RCU、智能面板与客房控制指南｜DUALCORE LINK",
    metaDescription:
      "简体中文酒店工程指南，覆盖 RCU、控制面板、传感器、布线、OEM/ODM、成本与客房改造。",
    structuredContent: {
      eyebrow: "酒店工程知识中心",
      h1: "智能酒店工程采购与技术指南",
      introduction:
        "本资料库提供十五篇可独立阅读的简体中文指南，帮助酒店业主、承包商、系统集成商和采购人员判断 RCU、控制面板、传感器、布线、OEM/ODM 与客房改造问题。每篇内容都从具体采购或技术决策出发，不虚构参数、价格、认证或效果。",
      breadcrumbLabel: "资源指南",
      sections: [
        {
          heading: "RCU 与客房系统架构",
          paragraphs: [
            "先理解 RCU 职责、布线架构、点表，以及主机或控制箱与面板、HVAC、窗帘和传感器之间的关系，再进入设备选型。",
          ],
        },
        {
          heading: "控制面板与住客界面",
          paragraphs: [
            "围绕住客旅程和安装条件审核开关、显示屏、温控器、床头控制、材料表面及 OEM/ODM 开发流程。",
          ],
        },
        {
          heading: "采购、成本与改造",
          paragraphs: [
            "指南说明询价资料、成本构成、现场勘查、样品和技术文件，但不提供虚构报价、节能比例或通用认证结论。",
          ],
        },
        {
          heading: "把阅读结果转成项目资料",
          paragraphs: [
            "将结论整理为图纸、数量、电压、接口、功能和责任清单，再与产品或解决方案进行对应。",
          ],
        },
      ],
      faqs: [
        {
          question: "这些指南可以代替电气设计吗？",
          answer: "不可以。指南用于决策和采购，实际设计、接线与施工必须由项目合格工程人员确认。",
        },
        {
          question: "RCU 项目应该从哪篇开始？",
          answer: "可先阅读 RCU 定义、布线架构和采购指南，再准备房型、点位与接口资料。",
        },
        {
          question: "指南是否包含价格或认证承诺？",
          answer: "不包含通用价格或认证承诺；资料和商务条件需要按产品及项目审核。",
        },
      ],
      relatedLinks: [
        {
          label: "酒店产品",
          description: "把指南结论对应到具体产品类别。",
          href: "/zh/products/",
        },
        {
          label: "客控与自动化解决方案",
          description: "审核系统范围和集成责任。",
          href: "/zh/solutions/",
        },
        {
          label: "提交项目问题",
          description: "发送图纸、数量和待审核功能。",
          href: "/zh/contact/",
        },
      ],
      cta: {
        heading: "把调研结果整理成可报价的需求",
        description:
          "请提供项目、房型、功能、产品、数量和资料要求，以便审核采购方向。",
        label: "讨论项目需求",
        href: "/zh/contact/#get-a-quote",
        secondaryLabel: "查看产品",
        secondaryHref: "/zh/products/",
      },
      imageAlt: "酒店 RCU 与智能客房控制中文采购技术指南",
    },
  });
}

const zhP1ResourceSlugs = new Set([
  "hotel-rcu-wiring-system-architecture-guide",
  "hotel-smart-switch-panel-guide",
  "oem-odm-smart-panel-customization-guide",
  "hotel-guest-room-automation-guide",
  "hotel-room-control-system-cost-factors",
  "hotel-occupancy-sensor-selection-guide",
  "oem-odm-hotel-control-panel-development-process",
  "hotel-renovation-smart-room-upgrade-guide",
  "knx-vs-rcu-hotel-room-control",
  "hotel-guest-room-control-interfaces-guide",
]);

function resourcePage(
  locale: SupportedLocale,
  resource: (typeof m3aResourceCatalog)[number],
): LocalizedFileContent {
  const title = locale === "ar" ? resource.arTitle : resource.zhTitle;
  const summary = locale === "ar" ? resource.arSummary : resource.zhSummary;
  const focus = locale === "ar" ? resource.arFocus : resource.zhFocus;
  const resourcesHref = `/${locale}/resources/`;
  const productsHref = `/${locale}/products/`;
  const solutionsHref = `/${locale}/solutions/`;
  const contactHref = `/${locale}/contact/`;
  const isZhP1 = locale === "zh" && zhP1ResourceSlugs.has(resource.slug);
  const zhInlineFocus = (value: string) =>
    /^[A-Za-z0-9]/.test(value) ? ` ${value}` : value;

  if (locale === "ar") {
    return filePage(locale, {
      pageType: "resource",
      slug: resource.slug,
      sourceUrl: `https://dualcorelink.com/en/resources/${resource.slug}/`,
      title,
      seoTitle: `${title} | دليل شراء وتقنية B2B`,
      metaDescription: `${summary} مناسب لمالك الفندق والمقاول ومتكامل الأنظمة والمشتري.`,
      structuredContent: {
        eyebrow: "دليل شراء وتقنية للفنادق",
        h1: title,
        introduction: `${summary} يقدّم الدليل إطاراً لاتخاذ القرار قبل طلب عرض السعر أو اعتماد الجهاز، ويربط السؤال بوظيفة الفندق والرسومات والأجهزة والواجهات والمسؤوليات. لا يحل محل التصميم الهندسي ولا يضيف مواصفات أو شهادات أو نتائج غير موجودة في مصدر المشروع.`,
        breadcrumbLabel: title,
        parentBreadcrumb: { label: "الموارد", href: resourcesHref },
        sections: [
          {
            heading: "ما الذي يجيب عنه هذا الدليل؟",
            paragraphs: [
              `يركز الدليل على أربعة محاور عملية: ${focus.join("، ")}. استخدمها لفصل قرار المعلومات عن اختيار المنتج ونطاق الحل التجاري.`,
            ],
          },
          {
            heading: "قرارات يجب توثيقها قبل الشراء",
            paragraphs: [
              `حوّل ${focus[0]} و${focus[1]} إلى متطلبات مكتوبة مرتبطة بنوع الغرفة أو المساحة. ثم حدّد الكمية والجهد والرسومات والواجهات والوثائق المطلوبة حتى تكون عروض الموردين قابلة للمقارنة.`,
            ],
          },
          {
            heading: "حدود الهندسة والتكامل",
            paragraphs: [
              `راجع ${focus[2]} و${focus[3]} مع المقاول ومتكامل الأنظمة والجهات الأخرى. لا تفترض بروتوكولاً أو حملاً أو توافقاً أو نسبة أداء؛ يجب اعتماد كل نقطة من وثائق الطراز والتصميم الفعلي.`,
            ],
          },
          {
            heading: "العينة والتحقق وطلب العرض",
            paragraphs: [
              "استخدم عينة أو غرفة نموذجية عند الحاجة، وسجّل نتائج التركيب والواجهة والمنطق والتشغيل قبل تجميد الكمية. يجب أن يتضمن الطلب الوظائف الإلزامية والخيارات والكمية والموعد والتخصيص والوثائق ومسؤولية الاختبار.",
            ],
          },
        ],
        faqs: [
          {
            question: `لمن يناسب ${title}؟`,
            answer: "يناسب مالك الفندق والمقاول ومتكامل الأنظمة والموزع والمشتري الذي يحتاج إلى قرار موثق قبل الشراء.",
          },
          {
            question: "هل يحدد الدليل طرازاً أو بروتوكولاً إلزامياً؟",
            answer: "لا. يوضح أسئلة الاختيار، أما الطراز والبروتوكول والكهرباء فتُعتمد حسب المشروع.",
          },
          {
            question: "ما البيانات المطلوبة بعد قراءة الدليل؟",
            answer: `جهّز نوع المشروع والرسومات والكمية، وسجّل ${focus.join("، ")}.`,
          },
        ],
        relatedLinks: [
          {
            label: "كل الأدلة",
            description: "تابع القراءة ضمن موضوعات RCU واللوحات والاستشعار والتجديد.",
            href: resourcesHref,
          },
          {
            label: "منتجات الفندق",
            description: "انتقل من قرار الدليل إلى تقييم منتج محدد.",
            href: productsHref,
          },
          {
            label: "حلول المشروع",
            description: "راجع نطاق النظام ومسؤوليات التكامل.",
            href: solutionsHref,
          },
        ],
        cta: {
          heading: "طبّق الدليل على مشروعك",
          description: "أرسل الرسومات والكمية والوظائف والواجهات والوثائق المطلوبة لمراجعة قرار الشراء.",
          label: "إرسال متطلبات المشروع",
          href: `${contactHref}#get-a-quote`,
          secondaryLabel: "عرض المنتجات",
          secondaryHref: productsHref,
        },
        imageAlt: `${title} لمشروعات غرف الفنادق`,
      },
    });
  }

  return filePage(locale, {
    pageType: "resource",
    slug: resource.slug,
    sourceUrl: `https://dualcorelink.com/en/resources/${resource.slug}/`,
    title,
    seoTitle: `${title}｜B2B 采购与技术决策`,
    metaDescription: `${summary}适合酒店业主、承包商、系统集成商和项目采购人员。`,
    structuredContent: {
      eyebrow: "酒店工程采购与技术指南",
      h1: title,
      introduction: `${summary}本指南提供在询价或设备确认前使用的决策框架，把问题与酒店功能、图纸、设备、接口和责任对应起来。内容不代替工程设计，也不增加英文事实源或项目资料中没有的参数、认证和效果。`,
      breadcrumbLabel: title,
      parentBreadcrumb: { label: "资源指南", href: resourcesHref },
      sections: [
        {
          heading: "本指南回答什么问题？",
          paragraphs: [
            `内容围绕四项实际任务展开：${focus.join("、")}。阅读时应区分信息判断、产品选型和商业方案，避免让一个页面承担相互冲突的职责。`,
          ],
        },
        {
          heading: "采购前需要形成的决策",
          paragraphs: [
            isZhP1
              ? `将${zhInlineFocus(focus[0])}和${focus[1]}写成与房型或空间对应的需求，再补充数量、电压、图纸、接口和资料要求，使不同供应范围可以比较。`
              : `把${focus[0]}和${focus[1]}写成与房型或空间对应的需求，再补充数量、电压、图纸、接口和资料要求，使不同供应范围可以比较。`,
          ],
        },
        {
          heading: "工程与系统边界",
          paragraphs: [
            isZhP1
              ? `由承包商、系统集成商和相关专业共同审核${zhInlineFocus(focus[2])}及${focus[3]}。不能假设协议、负载、兼容性或性能比例，每个结论都应来自具体型号资料和真实设计。`
              : `由承包商、系统集成商和相关专业共同审核${focus[2]}及${focus[3]}。不能假设协议、负载、兼容性或性能比例，每个结论都应来自具体型号资料和真实设计。`,
          ],
        },
        {
          heading: "样品验证与询价",
          paragraphs: [
            "需要时先通过样品或样板间验证安装、界面、控制逻辑和运营流程，再冻结批量配置。询价文件应区分必需功能和可选项，并说明数量、时间、定制、资料与测试责任。",
          ],
        },
      ],
      faqs: [
        {
          question: isZhP1 ? `${title}适合哪些读者？` : `${title} 适合哪些读者？`,
          answer: "适合需要在采购前形成明确决策的酒店业主、承包商、系统集成商、渠道和项目采购人员。",
        },
        {
          question: "指南是否规定必须使用某个型号或协议？",
          answer: "不规定。指南说明选型问题，型号、协议和电气条件必须按项目确认。",
        },
        {
          question: "阅读后应准备哪些资料？",
          answer: isZhP1
            ? `请准备项目类型、图纸、数量，并记录${zhInlineFocus(focus.join("、"))}。`
            : `请准备项目类型、图纸、数量，并记录${focus.join("、")}。`,
        },
      ],
      relatedLinks: [
        {
          label: "全部指南",
          description: "继续阅读 RCU、面板、传感器和改造主题。",
          href: resourcesHref,
        },
        {
          label: "酒店产品",
          description: "把指南结论用于具体产品评估。",
          href: productsHref,
        },
        {
          label: "项目解决方案",
          description: "审核系统范围和集成责任。",
          href: solutionsHref,
        },
      ],
      cta: {
        heading: "把指南应用到实际项目",
        description: "提供图纸、数量、功能、接口和资料要求，以便审核采购方向。",
        label: "提交项目需求",
        href: `${contactHref}#get-a-quote`,
        secondaryLabel: "查看产品",
        secondaryHref: productsHref,
      },
      imageAlt: isZhP1 ? `${title}：酒店工程指南` : `${title}酒店工程指南`,
    },
  });
}

function regionListing(locale: SupportedLocale): LocalizedFileContent {
  if (locale === "ar") {
    throw new Error("Arabic region listing already exists in the M2A content set");
  }
  return filePage(locale, {
    pageType: "region-listing",
    slug: "regions",
    sourceUrl: "https://dualcorelink.com/en/regions/",
    title: "酒店智能客控区域项目支持",
    seoTitle: "酒店 RCU 与智能客控区域项目｜中东、沙特、阿联酋、东南亚和越南",
    metaDescription:
      "面向中东、沙特、阿联酋、东南亚和越南酒店工程采购，规划 RCU、面板、传感器、定制和交付。",
    structuredContent: {
      eyebrow: "区域 B2B 项目",
      h1: "酒店智能客控区域项目支持",
      introduction:
        "区域页面不是国家概况，而是酒店工程采购入口。它们帮助业主、承包商、系统集成商和渠道客户按项目所在地确认电气条件、房型、产品范围、接口、定制、文件和交付责任，不虚构当地办公室、库存、客户或认证。",
      breadcrumbLabel: "区域市场",
      sections: [
        {
          heading: "按项目条件选择产品",
          paragraphs: [
            "同一类 RCU、面板或传感器在不同市场仍需核对电压、频率、底盒、布线、语言、表面和项目文件。",
          ],
        },
        {
          heading: "保持 B2B 工程语境",
          paragraphs: [
            "区域内容围绕采购、集成、OEM/ODM、样品和交付，不把国家介绍或未经验证的市场统计当作项目证据。",
          ],
        },
        {
          heading: "明确接口和责任",
          paragraphs: [
            "需要列明 RCU、HVAC、门锁、窗帘、传感器及第三方平台之间的接口和负责方。",
          ],
        },
        {
          heading: "准备询价资料",
          paragraphs: [
            "请提供国家、酒店类型、房间数量、图纸、功能、产品、电气条件、定制和时间要求，并说明业主、承包商、系统集成商与设备供应方之间的审核和交付责任。资料应能支持样品、选型和报价复核。",
          ],
        },
      ],
      faqs: [
        {
          question: "区域页面是否代表当地有办公室或库存？",
          answer: "不代表。页面仅说明项目支持方向，不声明未验证的办公室、库存或分销网络。",
        },
        {
          question: "不同地区能否使用同一套产品配置？",
          answer: "不能直接假定，必须按电气、安装、接口和项目要求逐项审核。",
        },
        {
          question: "区域询价需要什么资料？",
          answer: "请提供国家、房型、数量、图纸、功能、电压、接口、定制和交期。",
        },
      ],
      relatedLinks: [
        { label: "酒店产品", description: "查看 RCU、面板、传感器和其他设备。", href: "/zh/products/" },
        { label: "解决方案", description: "审核系统和集成范围。", href: "/zh/solutions/" },
        { label: "提交区域项目", description: "发送地点、图纸和采购要求。", href: "/zh/contact/" },
      ],
      cta: {
        heading: "按项目所在地审核客控产品",
        description: "提供国家、房型、设备、接口、数量和时间，形成可核对的采购范围。",
        label: "提交区域项目需求",
        href: "/zh/contact/#get-a-quote",
      },
      imageAlt: "中东与东南亚酒店 RCU 智能客控区域项目",
    },
  });
}

function regionPage(
  locale: SupportedLocale,
  region: (typeof m3aRegionCatalog)[number],
): LocalizedFileContent {
  const title = locale === "ar" ? region.arTitle : region.zhTitle;
  const summary = locale === "ar" ? region.arSummary : region.zhSummary;
  const focus = locale === "ar" ? region.arFocus : region.zhFocus;
  const regionsHref = `/${locale}/regions/`;
  const productsHref = `/${locale}/products/`;
  const solutionsHref = `/${locale}/solutions/`;
  const contactHref = `/${locale}/contact/`;

  if (locale === "ar") {
    return filePage(locale, {
      pageType: "region",
      slug: region.slug,
      sourceUrl: `https://dualcorelink.com/en/regions/${region.slug}/`,
      title,
      seoTitle: `${title} | دعم شراء وتكامل B2B`,
      metaDescription: `${summary} راجع الغرف والأجهزة والتخصيص والوثائق والتسليم حسب المشروع.`,
      structuredContent: {
        eyebrow: "دعم إقليمي لمشروعات الفنادق",
        h1: title,
        introduction: `${summary} تركز الصفحة على سياق B2B للمشروع: أنواع الغرف ووظائف التحكم وRCU واللوحات والمستشعرات والواجهات وOEM/ODM والوثائق والتسليم. لا تعلن مكتباً أو مخزوناً أو موزعاً أو اعتماداً محلياً من دون دليل.`,
        breadcrumbLabel: title,
        parentBreadcrumb: { label: "الأسواق الإقليمية", href: regionsHref },
        sections: [
          {
            heading: "أولوية المشروع والشراء",
            paragraphs: [
              `ابدأ بـ${focus[0]}، ثم حدد الوظائف الإلزامية والكمية والمرحلة والميزانية والنطاق الذي سيورده كل طرف.`,
            ],
          },
          {
            heading: "الهندسة والتكامل",
            paragraphs: [
              `راجع ${focus[1]} مع المقاول ومتكامل الأنظمة. يجب تأكيد الجهد والتردد والعلب والأسلاك وHVAC والواجهات والبروتوكولات حسب المشروع.`,
            ],
          },
          {
            heading: "التخصيص والوثائق",
            paragraphs: [
              `خطط ${focus[2]} مع وظائف اللوحات والأيقونات واللغة والتشطيب والعلامة والتغليف والرسومات وقائمة الوثائق المطلوبة.`,
            ],
          },
          {
            heading: "العينة والتسليم",
            paragraphs: [
              "استخدم عينة أو غرفة نموذجية عند الحاجة، وسجّل الموافقات قبل الكمية. يجب أن يوضح الطلب مكان المشروع والمنتجات والكمية والموعد ومسؤولية الشحن والتركيب والاختبار.",
            ],
          },
        ],
        faqs: [
          {
            question: "هل تعني الصفحة وجود مخزون أو مكتب محلي؟",
            answer: "لا. هي صفحة دعم مشروع ولا تعلن مخزوناً أو مكتباً أو موزعاً غير موثق.",
          },
          {
            question: "هل يمكن اعتماد منتج من دون مراجعة كهرباء المشروع؟",
            answer: "لا. يجب تأكيد الجهد والتردد والتركيب والأسلاك والواجهات حسب المشروع.",
          },
          {
            question: "ما المطلوب لمراجعة مشروع المنطقة؟",
            answer: `أرسل الموقع والرسومات والكمية، ووضح ${focus.join("، ")}.`,
          },
        ],
        relatedLinks: [
          { label: "الأسواق الإقليمية", description: "قارن سياقات المشروع الأخرى.", href: regionsHref },
          { label: "منتجات الفندق", description: "راجع RCU واللوحات والمستشعرات.", href: productsHref },
          { label: "حلول المشروع", description: "حدد نطاق النظام والتكامل.", href: solutionsHref },
        ],
        cta: {
          heading: `ناقش ${title}`,
          description: "شارك الموقع والغرف والوظائف والمنتجات والكمية والتخصيص والموعد.",
          label: "إرسال استفسار إقليمي",
          href: `${contactHref}#get-a-quote`,
        },
        imageAlt: `${title} لمشروع فندقي`,
      },
    });
  }

  return filePage(locale, {
    pageType: "region",
    slug: region.slug,
    sourceUrl: `https://dualcorelink.com/en/regions/${region.slug}/`,
    title,
    seoTitle: `${title}｜B2B 采购与系统集成`,
    metaDescription: `${summary}按项目核对房型、设备、定制、资料和交付。`,
    structuredContent: {
      eyebrow: "酒店工程区域支持",
      h1: title,
      introduction: `${summary}本页保持 B2B 项目语境，围绕房型、控制功能、RCU、面板、传感器、接口、OEM/ODM、资料和交付展开，不在没有证据时声明当地办公室、库存、代理、客户或认证。`,
      breadcrumbLabel: title,
      parentBreadcrumb: { label: "区域市场", href: regionsHref },
      sections: [
        {
          heading: "项目与采购重点",
          paragraphs: [
            `先确认${focus[0]}，再明确必需功能、数量、项目阶段、预算和各方供货范围。`,
          ],
        },
        {
          heading: "工程与系统接口",
          paragraphs: [
            `由承包商和系统集成商共同审核${focus[1]}，并按项目确认电压、频率、底盒、布线、HVAC、协议和第三方接口。`,
          ],
        },
        {
          heading: "定制与技术资料",
          paragraphs: [
            `把${focus[2]}与面板功能、图标、语言、表面、品牌、包装、图纸和所需文件一并规划。`,
          ],
        },
        {
          heading: "样品和交付",
          paragraphs: [
            "需要时先完成样品或样板间审核，并在批量前记录批准结果。询价应说明项目地点、产品、数量、时间以及运输、安装和测试责任。",
          ],
        },
      ],
      faqs: [
        {
          question: "区域页面是否代表当地有库存或办公室？",
          answer: "不代表。页面仅提供项目支持信息，不声明没有验证的库存、办公室或代理。",
        },
        {
          question: "能否不审核项目电气条件就直接选型？",
          answer: "不能。电压、频率、安装、布线和接口都必须按项目确认。",
        },
        {
          question: "区域项目审核需要哪些资料？",
          answer: `请提供地点、图纸、数量，并说明${focus.join("、")}。`,
        },
      ],
      relatedLinks: [
        { label: "区域市场", description: "比较其他项目市场。", href: regionsHref },
        { label: "酒店产品", description: "查看 RCU、面板和传感器。", href: productsHref },
        { label: "解决方案", description: "明确系统和集成范围。", href: solutionsHref },
      ],
      cta: {
        heading: `讨论${title}`,
        description: "请提供地点、房型、功能、产品、数量、定制和时间。",
        label: "提交区域项目询盘",
        href: `${contactHref}#get-a-quote`,
      },
      imageAlt: `${title}酒店工程`,
    },
  });
}

const existingArRegions = new Set(["middle-east", "saudi-arabia", "uae"]);

export const arM3aResourcePages = [
  resourceListing("ar"),
  ...m3aResourceCatalog.map((resource) => resourcePage("ar", resource)),
] as const;

export const zhM3aResourcePages = [
  resourceListing("zh"),
  ...m3aResourceCatalog.map((resource) => resourcePage("zh", resource)),
] as const;

export const arM3aRegionPages = m3aRegionCatalog
  .filter((region) => !existingArRegions.has(region.slug))
  .map((region) => regionPage("ar", region));

export const zhM3aRegionPages = [
  regionListing("zh"),
  ...m3aRegionCatalog.map((region) => regionPage("zh", region)),
] as const;

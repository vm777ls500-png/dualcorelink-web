export const panelConfigurationSeries = [
  "Smart Series",
  "Vintage Gold Series",
  "Borui Series",
  "Brushed Aluminum Series",
] as const;

export type PanelConfigurationSeries =
  (typeof panelConfigurationSeries)[number];

export type PanelConfigurationImage = {
  id: string;
  series: PanelConfigurationSeries;
  title: string;
  image: string;
  alt: string;
  modules: readonly string[];
  useCase: string;
};

export const panelConfigurationCopy = {
  moduleId: "custom-panel-configuration-options",
  eyebrow: "OEM/ODM configuration",
  title: "Custom Room Panel Configuration Options",
  subtitle:
    "Coordinate panel finishes and selectable modules for hotel guest room and OEM/ODM projects.",
  intro:
    "Review representative panel layouts for lighting, curtain control, room status, key-card power, thermostat control, sockets, USB, and low-voltage functions. Each layout is a project configuration example rather than a fixed stock SKU.",
  primaryCta: "Request OEM/ODM Configuration",
  secondaryCta: "Send Your Room Layout",
  whatsappCta: "Get a Quote on WhatsApp",
  cardNote:
    "Configuration example. Final module selection and production scope require project confirmation.",
  disclaimer:
    "Images show OEM/ODM configuration examples, not standard stock SKUs. Modules, colors, panel layouts, functions, and quantities can be adapted to project requirements. Final configuration, compatibility, MOQ, lead time, and quotation are subject to project review and written confirmation.",
} as const;

export const panelConfigurations: readonly PanelConfigurationImage[] = [
  {
    id: "smart-key-card-room-service",
    series: "Smart Series",
    title: "Key Card and Room Service Controls",
    image:
      "/media/oem-odm-configurations/smart-series-key-card-room-service-configuration.png",
    alt: "Smart Series key card and room service panel configuration for hotel projects",
    modules: ["Key-card power", "Room service status", "Guest controls"],
    useCase: "Hotel guest room entry and service panel planning",
  },
  {
    id: "smart-key-card-room-status-lighting",
    series: "Smart Series",
    title: "Key Card, Room Status and Lighting Controls",
    image:
      "/media/oem-odm-configurations/smart-series-key-card-room-status-lighting-configuration.png",
    alt: "Smart Series key card room status and lighting control configuration",
    modules: [
      "Key-card power",
      "Room status",
      "Lighting and service controls",
    ],
    useCase: "Coordinated guest room control layouts",
  },
  {
    id: "vintage-dual-usb-socket",
    series: "Vintage Gold Series",
    title: "Dual Socket Configuration",
    image:
      "/media/oem-odm-configurations/vintage-gold-dual-usb-socket-configuration.png",
    alt: "Vintage Gold Series dual socket configuration for hospitality projects",
    modules: ["Power socket", "USB connection", "Vintage Gold finish"],
    useCase: "Bedside and work-area power layouts",
  },
  {
    id: "vintage-four-gang-socket-switch",
    series: "Vintage Gold Series",
    title: "Four-gang Socket and Switch Configuration",
    image:
      "/media/oem-odm-configurations/vintage-gold-four-gang-socket-switch-configuration.png",
    alt: "Vintage Gold Series multi-gang socket and switch configuration",
    modules: ["Lighting controls", "USB sockets", "Curtain controls"],
    useCase: "Coordinated multi-gang room panel layouts",
  },
  {
    id: "vintage-lighting-usb-curtain",
    series: "Vintage Gold Series",
    title: "Lighting, USB and Curtain Configuration",
    image:
      "/media/oem-odm-configurations/vintage-gold-lighting-usb-curtain-configuration.png",
    alt: "Vintage Gold Series lighting USB and curtain control configuration",
    modules: ["Lighting scenes", "USB socket", "Curtain controls"],
    useCase: "Guest room bedside and control panel planning",
  },
  {
    id: "borui-room-status-lighting",
    series: "Borui Series",
    title: "Room Status and Lighting Configuration",
    image:
      "/media/oem-odm-configurations/borui-series-room-status-lighting-configuration.png",
    alt: "Borui Series room status and lighting control configuration",
    modules: ["Room status", "Lighting controls", "Service controls"],
    useCase: "Hotel service and lighting panel coordination",
  },
  {
    id: "borui-multi-gang-socket",
    series: "Borui Series",
    title: "Multi-gang Socket Configuration",
    image:
      "/media/oem-odm-configurations/borui-series-multi-gang-socket-configuration.png",
    alt: "Borui Series multi-gang socket configuration for room projects",
    modules: ["Power sockets", "USB connection", "Borui finish"],
    useCase: "Project-specific power access layouts",
  },
  {
    id: "borui-lighting-curtain-socket",
    series: "Borui Series",
    title: "Lighting, Curtain and Socket Configuration",
    image:
      "/media/oem-odm-configurations/borui-series-lighting-curtain-socket-configuration.png",
    alt: "Borui Series lighting curtain and socket panel configuration",
    modules: ["Lighting scenes", "Curtain controls", "Power and USB"],
    useCase: "Mixed control and power panel planning",
  },
  {
    id: "brushed-key-card-service-front",
    series: "Brushed Aluminum Series",
    title: "Key Card, Service and Lighting Configuration",
    image:
      "/media/oem-odm-configurations/brushed-aluminum-key-card-service-lighting-configuration.png",
    alt: "Brushed Aluminum Series key card service and lighting configuration",
    modules: ["Key-card power", "Service controls", "Lighting controls"],
    useCase: "Brushed metal guest room panel coordination",
  },
];

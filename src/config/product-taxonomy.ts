export type ProductCategoryConfig = {
  slug: string;
  title: string;
  chineseTitle: string;
  description: string;
  termId?: number;
};

export const productCategories: ProductCategoryConfig[] = [
  {
    slug: "smart-panels-switches",
    title: "Smart Panels & Switches",
    chineseTitle: "智能面板与智能开关",
    description:
      "Touch panels, smart switches, and control interfaces for guest rooms and smart home projects.",
  },
  {
    slug: "ai-smart-displays",
    title: "AI Smart Displays",
    chineseTitle: "AI智能屏",
    termId: 2,
    description:
      "86-type AI central displays, large AI screens, thermostat controllers, and music controllers.",
  },
  {
    slug: "rcu-room-control-host",
    title: "RCU Room Control Host",
    chineseTitle: "客控主机",
    termId: 5,
    description:
      "Room control cabinets, gateways, and RCU hosts for hotel guest room control systems.",
  },
  {
    slug: "sensors",
    title: "Sensors",
    chineseTitle: "传感器",
    termId: 4,
    description:
      "Presence sensors, door magnets, infrared forwarding devices, doorbells, and background speakers.",
  },
  {
    slug: "smart-sockets-power-modules",
    title: "Smart Sockets & Power Modules",
    chineseTitle: "智能插座与电源模块",
    termId: 6,
    description:
      "USB sockets, power sockets, and smart power modules for hotel and smart home installations.",
  },
  {
    slug: "hvac-thermostat-control",
    title: "HVAC & Thermostat Control",
    chineseTitle: "空调温控控制",
    description:
      "Thermostat panels and HVAC control interfaces for room comfort management.",
  },
  {
    slug: "curtain-control-panels",
    title: "Curtain Control Panels",
    chineseTitle: "窗帘控制面板",
    termId: 7,
    description:
      "Curtain control panels for hotel rooms, apartments, villas, and customized smart home scenes.",
  },
  {
    slug: "room-status-hotel-service-panels",
    title: "Room Status & Hotel Service Panels",
    chineseTitle: "房态与酒店服务面板",
    termId: 8,
    description:
      "DND, MUR, doorbell, and hotel service panels for guest room operation workflows.",
  },
  {
    slug: "hotel-delivery-robot-system",
    title: "Hotel Delivery Robot System",
    chineseTitle: "酒店送货智能机器人",
    termId: 3,
    description:
      "Robot charging bases, smart hotel delivery cabinets, and intelligent service robots.",
  },
];

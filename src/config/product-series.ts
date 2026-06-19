export type ProductSeriesConfig = {
  slug: string;
  title: string;
  chineseTitle: string;
  description: string;
  rule: string;
  productSlugs: string[];
};

export const productSeries: ProductSeriesConfig[] = [
  {
    slug: "smart-series",
    title: "Smart Series",
    chineseTitle: "智慧系列",
    description: "Black smart series intelligent panels.",
    rule: "黑色智慧系列智能面板",
    productSlugs: [
      "smart-usb-five-hole-socket",
      "smart-key-card-energy-saver-panel",
      "smart-four-key-curtain-control-panel",
    ],
  },
  {
    slug: "borui-series",
    title: "Borui Series",
    chineseTitle: "铂锐系列",
    description: "Red matte smart hotel and smart home products.",
    rule: "所有红色磨砂产品",
    productSlugs: [],
  },
  {
    slug: "vintage-series",
    title: "Vintage Series",
    chineseTitle: "复古系列",
    description: "Vintage gold products for decorative hotel and home interiors.",
    rule: "所有复古金色产品",
    productSlugs: [],
  },
  {
    slug: "brushed-aluminum-series",
    title: "Brushed Aluminum Series",
    chineseTitle: "铝拉丝系列",
    description: "Metal brushed products for premium project finishes.",
    rule: "所有金属拉丝产品",
    productSlugs: ["brushed-aluminum-86-base-doorbell-panel"],
  },
];

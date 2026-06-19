export const brand = {
  name: "DUALCORE LINK",
  legalEntity: "DUALCORE LINK LIMITED",
  supplyChainEntity: "Cangzhou Yitai Trading Co., Ltd.",
  business:
    "Smart hotel room control systems, smart switches, sockets, thermostats, hotel automation, and OEM/ODM smart home solutions.",
  emails: {
    general: "hello@dualcorelink.com",
    sales: "sales@dualcorelink.com",
    support: "support@dualcorelink.com",
  },
  emailPurposes: {
    general: "General contact, brand inquiries, and cooperation",
    sales: "Inquiries, quotations, purchasing, orders, and OEM/ODM cooperation",
    support: "After-sales, technical support, installation, and product resources",
  },
  whatsapp: {
    display: "+852 7039 0436",
    international: "85270390436",
    label: "Get a Quote on WhatsApp",
  },
  targetMarkets: [
    "Saudi Arabia",
    "United Arab Emirates",
    "Vietnam",
    "Middle East",
    "Southeast Asia",
  ],
} as const;

export const customerTypeOptions = [
  "Hotel Owner / Developer",
  "Contractor",
  "System Integrator",
  "Distributor / Wholesaler",
  "OEM / ODM Buyer",
  "Smart Home Installer",
  "Other",
] as const;

export const productInterestOptions = [
  "Smart Panels & Switches",
  "AI Smart Displays",
  "RCU Room Control Host",
  "Sensors",
  "Smart Sockets & Power Modules",
  "HVAC & Thermostat Control",
  "Curtain Control Panels",
  "Room Status & Hotel Service Panels",
  "Hotel Delivery Robot System",
  "OEM / ODM Custom Products",
  "Other",
] as const;

export function createWhatsAppUrl(message?: string): string {
  const url = new URL(`https://wa.me/${brand.whatsapp.international}`);
  if (message) {
    url.searchParams.set("text", message);
  }
  return url.toString();
}

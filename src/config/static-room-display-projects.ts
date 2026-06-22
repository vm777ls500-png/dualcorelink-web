export const roomDisplayGroups = [
  {
    id: "86-base-wide-display-references",
    title: "86-Base Wide Display References",
  },
  {
    id: "brushed-silver-doorplate-references",
    title: "Brushed Silver Doorplate References",
  },
  {
    id: "dark-glass-room-status-references",
    title: "Dark Glass Room Status Display References",
  },
  {
    id: "brushed-aluminum-doorplate-references",
    title: "Brushed Aluminum Doorplate References",
  },
] as const;

export type RoomDisplayGroup = (typeof roomDisplayGroups)[number]["title"];

export type RoomDisplayProjectReference = {
  id: string;
  group: RoomDisplayGroup;
  title: string;
  image: string;
  alt: string;
  displayType: string;
  visibleContext: string;
};

export const roomDisplayProjectCopy = {
  moduleId: "room-signage-door-display-project-references",
  eyebrow: "Project display references",
  title: "Room Signage & Door Display Project References",
  subtitle:
    "Reference formats for hotel room identification, doorbell, service status, and guest-facing display planning.",
  intro:
    "Review representative hospitality room-signage formats across dark glass, brushed silver, and brushed aluminum finishes. These images illustrate project-style layouts and visible interface treatments for discussion; they are not standardized product models or customer endorsements.",
  cardLabel: "Project display reference",
  primaryCta: "Discuss Your Hotel Room Display Requirements",
  secondaryCta: "Request Room Signage Customization",
  whatsappCta: "Get a Quote on WhatsApp",
  disclaimer:
    "Images are project-style references for hotel room signage and door display configurations. Visible room numbers, hotel names, interface labels, or project-style details are shown only to illustrate application context and configuration form. They do not indicate a public endorsement, fixed SKU, stock availability, or standardized product model. Actual appearance, text, icons, functions, materials, dimensions, networking method, MOQ, lead time, and compatibility should be confirmed based on each project and quotation.",
} as const;

export const roomDisplayProjectReferences: readonly RoomDisplayProjectReference[] =
  [
    {
      id: "86-base-front",
      group: "86-Base Wide Display References",
      title: "Wide Room Number and Service Display",
      image:
        "/media/room-display-projects/hotel-room-door-display-project-reference-01.png",
      alt: "Wide black hotel room door display with room number and service status icons",
      displayType: "Room identification, doorbell, and service-status display",
      visibleContext: "Project-style room door display reference",
    },
    {
      id: "86-base-angle",
      group: "86-Base Wide Display References",
      title: "Angled Wide Door Display",
      image:
        "/media/room-display-projects/hotel-room-door-display-angle-reference-02.png",
      alt: "Angled black room signage display with doorbell and service icons",
      displayType: "Wide room signage and service interface",
      visibleContext: "Project-style room door display reference",
    },
    {
      id: "brushed-silver-angle-a",
      group: "Brushed Silver Doorplate References",
      title: "Brushed Silver Recessed Number Display",
      image:
        "/media/room-display-projects/brushed-silver-room-signage-display-reference-01.png",
      alt: "Brushed silver hotel room signage reference with number window and status icons",
      displayType: "Recessed room-number and service-status display",
      visibleContext: "Project-style brushed metal room signage reference",
    },
    {
      id: "brushed-silver-angle-b",
      group: "Brushed Silver Doorplate References",
      title: "Angled Brushed Silver Doorplate",
      image:
        "/media/room-display-projects/brushed-silver-room-signage-angle-reference-02.png",
      alt: "Angled brushed silver room display housing for hospitality projects",
      displayType: "Brushed silver room identification display",
      visibleContext: "Project-style brushed metal room signage reference",
    },
    {
      id: "hotel-room-display-front",
      group: "Dark Glass Room Status Display References",
      title: "Dark Glass Room Status Display",
      image:
        "/media/room-display-projects/hotel-room-status-doorplate-display-reference-01.png",
      alt: "Dark glass hotel room status display with service and doorbell icons",
      displayType: "Guest-service, room-status, and doorbell interface",
      visibleContext: "Project-style hotel room status display reference",
    },
    {
      id: "hotel-room-display-angle",
      group: "Dark Glass Room Status Display References",
      title: "Angled Dark Glass Door Display",
      image:
        "/media/room-display-projects/hotel-room-status-doorplate-angle-reference-02.png",
      alt: "Angled hotel room display reference with status icon layout",
      displayType: "Dark glass guest-service display interface",
      visibleContext: "Project-style hotel room status display reference",
    },
    {
      id: "brushed-aluminum-front",
      group: "Brushed Aluminum Doorplate References",
      title: "Wide Brushed Aluminum Doorplate",
      image:
        "/media/room-display-projects/brushed-aluminum-room-signage-display-reference-01.png",
      alt: "Brushed aluminum hotel room door display with number window and service controls",
      displayType: "Room identification, doorbell, and service-control display",
      visibleContext: "Project-style brushed aluminum door display reference",
    },
    {
      id: "brushed-aluminum-angle",
      group: "Brushed Aluminum Doorplate References",
      title: "Angled Brushed Aluminum Room Signage",
      image:
        "/media/room-display-projects/brushed-aluminum-room-signage-angle-reference-02.png",
      alt: "Angled brushed aluminum room signage project reference",
      displayType: "Wide brushed-metal room signage display",
      visibleContext: "Project-style brushed aluminum door display reference",
    },
  ];

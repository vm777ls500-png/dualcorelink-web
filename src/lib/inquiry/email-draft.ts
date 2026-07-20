import { brand } from "@/config/brand";
import type { InquiryAttribution } from "@/lib/inquiry/attribution";

export type InquiryDraftFields = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  country: string;
  customerType: string;
  projectStage?: string;
  productInterests: string[];
  quantity?: string;
  targetDelivery?: string;
  message: string;
};

export type InquiryDraftFieldError =
  | "name"
  | "email"
  | "country"
  | "customerType"
  | "productInterests"
  | "message";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: string | undefined) {
  return value?.trim() ?? "";
}

export function validateInquiryDraftFields(
  fields: InquiryDraftFields,
): InquiryDraftFieldError[] {
  const errors: InquiryDraftFieldError[] = [];
  if (!clean(fields.name)) errors.push("name");
  if (!emailPattern.test(clean(fields.email))) errors.push("email");
  if (!clean(fields.country)) errors.push("country");
  if (!clean(fields.customerType)) errors.push("customerType");
  if (!fields.productInterests.some((value) => clean(value))) {
    errors.push("productInterests");
  }
  if (!clean(fields.message)) errors.push("message");
  return errors;
}

function presentLines(entries: Array<[string, string | undefined]>) {
  return entries.flatMap(([label, rawValue]) => {
    const value = clean(rawValue);
    return value ? [`${label}: ${value}`] : [];
  });
}

export function buildInquiryEmailDraft(
  fields: InquiryDraftFields,
  attribution: InquiryAttribution,
) {
  const errors = validateInquiryDraftFields(fields);
  if (errors.length) {
    throw new Error(`Invalid inquiry draft fields: ${errors.join(", ")}`);
  }

  const detailLines = presentLines([
    ["Name", fields.name],
    ["Company", fields.company],
    ["Email", fields.email],
    ["WhatsApp / Phone", fields.phone],
    ["Country / Region", fields.country],
    ["Customer Type", fields.customerType],
    ["Project Stage", fields.projectStage],
    ["Product Interest", fields.productInterests.map(clean).filter(Boolean).join(", ")],
    ["Estimated Quantity", fields.quantity],
    ["Target Delivery Timing", fields.targetDelivery],
  ]);
  const sourceLines = presentLines([
    ["Source Page", attribution.sourcePage],
    ["Content Type", attribution.contentType],
    ["Content Slug", attribution.contentSlug],
    ["Source Title", attribution.sourceTitle],
    ["CTA Position", attribution.ctaPosition],
  ]);
  const lines = [
    ...detailLines,
    "",
    "Message:",
    clean(fields.message),
    "",
    "Inquiry source:",
    ...sourceLines,
    "",
    "Project files:",
    "Please attach project files manually in your email client if needed.",
  ];
  const mailto = new URL(`mailto:${brand.emails.sales}`);
  mailto.searchParams.set(
    "subject",
    attribution.sourceTitle
      ? `Website Inquiry: ${attribution.sourceTitle}`
      : "New Inquiry from Website",
  );
  mailto.searchParams.set("body", lines.join("\n"));
  return mailto.toString();
}

export function createInquiryDraftLaunchGate() {
  let active = false;
  return {
    tryStart() {
      if (active) return false;
      active = true;
      return true;
    },
    release() {
      active = false;
    },
  };
}

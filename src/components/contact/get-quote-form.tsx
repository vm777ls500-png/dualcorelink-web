"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import {
  brand,
  customerTypeOptions,
  productInterestOptions,
} from "@/config/brand";
import {
  parseInquiryAttribution,
  type InquiryAttribution,
} from "@/lib/inquiry/attribution";
import { trackInquiryEvent } from "@/lib/inquiry/events";

type GetQuoteFormProps = {
  productName?: string;
};

type FormStatus = "idle" | "mailto";

const defaultAttribution: InquiryAttribution = {
  sourcePage: "/en/contact/",
  contentType: "contact",
  ctaPosition: "contact_page",
};

const projectStageOptions = [
  "Early research",
  "Specification and design",
  "Quotation and supplier selection",
  "Sample evaluation",
  "Procurement",
  "Renovation or replacement",
] as const;

export function GetQuoteForm({ productName }: GetQuoteFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [attribution, setAttribution] =
    useState<InquiryAttribution>(defaultAttribution);
  const [message, setMessage] = useState(
    productName
      ? `I am interested in ${productName}. Please send quotation details.`
      : "",
  );

  useEffect(() => {
    const nextAttribution = parseInquiryAttribution(
      window.location.search,
      window.location.pathname,
    );
    setAttribution(nextAttribution);
    if (!productName && nextAttribution.sourceTitle) {
      setMessage((current) =>
        current ||
        `I would like to discuss a project related to ${nextAttribution.sourceTitle}.`,
      );
    }
  }, [productName]);

  const contextLabel = useMemo(() => {
    if (attribution.sourceTitle) return attribution.sourceTitle;
    if (attribution.contentSlug) {
      return attribution.contentSlug.replaceAll("-", " ");
    }
    return "Direct contact inquiry";
  }, [attribution]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const interests = data.getAll("productInterest").join(", ");
    if (!interests) {
      event.currentTarget
        .querySelector<HTMLInputElement>('input[name="productInterest"]')
        ?.setCustomValidity("Select at least one product interest.");
      event.currentTarget.reportValidity();
      return;
    }
    const detailLines = [
      ["Name", data.get("name")],
      ["Company", data.get("company")],
      ["Email", data.get("email")],
      ["WhatsApp / Phone", data.get("phone")],
      ["Country / Region", data.get("country")],
      ["Customer Type", data.get("customerType")],
      ["Project Stage", data.get("projectStage")],
      ["Product Interest", interests],
      ["Estimated Quantity", data.get("quantity")],
      ["Target Delivery Timing", data.get("targetDelivery")],
    ].flatMap(([label, rawValue]) => {
      const value = String(rawValue ?? "").trim();
      return value ? [`${label}: ${value}`] : [];
    });
    const sourceLines = [
      ["Source Page", attribution.sourcePage],
      ["Content Type", attribution.contentType],
      ["Content Slug", attribution.contentSlug],
      ["Source Title", attribution.sourceTitle],
      ["CTA Position", attribution.ctaPosition],
    ].flatMap(([label, rawValue]) => {
      const value = String(rawValue ?? "").trim();
      return value ? [`${label}: ${value}`] : [];
    });
    const lines = [
      ...detailLines,
      "",
      "Message:",
      `${data.get("message") ?? ""}`,
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
    trackInquiryEvent("form_submit", "form", attribution);
    setStatus("mailto");
    window.location.href = mailto.toString();
  }

  const inputClass =
    "contact-field mt-2 min-h-11 w-full border border-line bg-white px-3 py-2 text-foreground";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={handleSubmit} className="contact-inquiry-form border border-line bg-surface p-6">
      <div className="mb-6 border-s-4 border-brand bg-background px-4 py-3">
        <p className="text-xs font-semibold uppercase text-brand">
          Inquiry context
        </p>
        <p className="mt-1 font-semibold text-foreground">{contextLabel}</p>
        <p className="mt-1 text-sm leading-6 text-muted">
          Source: {attribution.contentType.replaceAll("_", " ")} /{" "}
          {attribution.ctaPosition.replaceAll("_", " ")}
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          Name *
          <input name="name" required className={inputClass} />
        </label>
        <label className={labelClass}>
          Company
          <input name="company" className={inputClass} />
        </label>
        <label className={labelClass}>
          Email *
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className={labelClass}>
          WhatsApp / Phone
          <input name="phone" className={inputClass} />
        </label>
        <label className={labelClass}>
          Country / Region *
          <input name="country" required className={inputClass} />
        </label>
        <label className={labelClass}>
          Customer Type *
          <select name="customerType" required className={inputClass} defaultValue="">
            <option value="" disabled>
              Select customer type
            </option>
            {customerTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Project Stage
          <select name="projectStage" className={inputClass} defaultValue="">
            <option value="">Select project stage</option>
            {projectStageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Target Delivery Timing
          <input
            name="targetDelivery"
            placeholder="Example: October 2026"
            className={inputClass}
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-foreground">
          Product Interest *
        </legend>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {productInterestOptions.map((option) => (
            <label key={option} className="contact-check-option flex gap-3 text-sm text-muted">
              <input
                name="productInterest"
                value={option}
                type="checkbox"
                onChange={(event) =>
                  event.currentTarget.form
                    ?.querySelector<HTMLInputElement>(
                      'input[name="productInterest"]',
                    )
                    ?.setCustomValidity("")
                }
                className="mt-1"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={`${labelClass} mt-5`}>
        Estimated Quantity
        <input
          name="quantity"
          placeholder="Example: 100 sets / 300 rooms / 1 hotel project"
          className={inputClass}
        />
      </label>

      <label className={`${labelClass} mt-5`}>
        Message *
        <textarea
          name="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          className="contact-field mt-2 w-full border border-line bg-white px-3 py-2 text-foreground"
        />
      </label>

      <label className={`${labelClass} mt-5`}>
        Upload Project Files
        <input
          name="projectFiles"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.zip"
          className={inputClass}
        />
      </label>
      <p className="mt-2 text-sm leading-6 text-muted">
        Upload drawings, product lists, BOQ, or project requirements to help us
        prepare a faster quotation.
      </p>

      <button
        type="submit"
        className="contact-submit-button mt-6 inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
      >
        Send Inquiry
      </button>

      <p className="mt-4 border-s-4 border-accent ps-4 text-sm leading-6 text-muted">
        Email sending is not configured yet. This form opens an email draft to{" "}
        <TrackedInquiryLink
          href={`mailto:${brand.emails.sales}`}
          channel="email"
          attribution={{
            ...attribution,
            ctaPosition: "form_email_fallback",
          }}
          className="font-semibold text-brand"
        >
          {brand.emails.sales}
        </TrackedInquiryLink>
        . Attach project files manually before sending, or use WhatsApp.
      </p>
      {status === "mailto" ? (
        <p className="mt-3 text-sm font-semibold text-brand">
          Your email client should open with the inquiry details. We will reply
          within 24 hours on business days.
        </p>
      ) : null}
    </form>
  );
}

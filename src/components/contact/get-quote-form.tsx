"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import {
  brand,
  customerTypeOptions,
  productInterestOptions,
} from "@/config/brand";

type GetQuoteFormProps = {
  productName?: string;
};

type FormStatus = "idle" | "mailto";

export function GetQuoteForm({ productName }: GetQuoteFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const defaultMessage = useMemo(
    () =>
      productName
        ? `I am interested in ${productName}. Please send quotation details.`
        : "",
    [productName],
  );

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
    const lines = [
      `Name: ${data.get("name") ?? ""}`,
      `Company: ${data.get("company") ?? ""}`,
      `Email: ${data.get("email") ?? ""}`,
      `WhatsApp / Phone: ${data.get("phone") ?? ""}`,
      `Country / Region: ${data.get("country") ?? ""}`,
      `Customer Type: ${data.get("customerType") ?? ""}`,
      `Product Interest: ${interests}`,
      `Estimated Quantity: ${data.get("quantity") ?? ""}`,
      "",
      "Message:",
      `${data.get("message") ?? ""}`,
      "",
      "Project files:",
      "Please attach project files manually in your email client if needed.",
    ];
    const mailto = new URL(`mailto:${brand.emails.sales}`);
    mailto.searchParams.set("subject", "New Inquiry from Website");
    mailto.searchParams.set("body", lines.join("\n"));
    setStatus("mailto");
    window.location.href = mailto.toString();
  }

  const inputClass =
    "mt-2 min-h-11 w-full border border-line bg-white px-3 py-2 text-foreground";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={handleSubmit} className="border border-line bg-surface p-6">
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
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-foreground">
          Product Interest *
        </legend>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {productInterestOptions.map((option) => (
            <label key={option} className="flex gap-3 text-sm text-muted">
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
          defaultValue={defaultMessage}
          className="mt-2 w-full border border-line bg-white px-3 py-2 text-foreground"
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
        className="mt-6 inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white"
      >
        Send Inquiry
      </button>

      <p className="mt-4 border-s-4 border-accent ps-4 text-sm leading-6 text-muted">
        Email sending is not configured yet. This form opens an email draft to{" "}
        <a href={`mailto:${brand.emails.sales}`} className="font-semibold text-brand">
          {brand.emails.sales}
        </a>
        . Attach project files manually before sending, or use WhatsApp.
      </p>
      {status === "mailto" ? (
        <p className="mt-3 text-sm font-semibold text-brand">
          Your email client should open with the inquiry details.
        </p>
      ) : null}
    </form>
  );
}

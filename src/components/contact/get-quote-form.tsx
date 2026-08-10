"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import {
  brand,
  createWhatsAppUrl,
} from "@/config/brand";
import {
  chineseContactFormCopy,
  contactFormOptions,
} from "@/config/contact-form-copy";
import type { Locale } from "@/config/i18n";
import {
  cleanContactHistoryUrl,
  parseInquiryAttribution,
  parseLegacyInquiryAttribution,
  readInquiryAttributionFromSession,
  writeInquiryAttributionToSession,
  type InquiryAttribution,
} from "@/lib/inquiry/attribution";
import {
  buildInquiryEmailDraft,
  createInquiryDraftLaunchGate,
  type InquiryDraftFields,
} from "@/lib/inquiry/email-draft";
import { trackInquiryEvent } from "@/lib/inquiry/events";
import {
  createInquirySubmissionPayload,
  InquirySubmissionError,
  inquiryEndpointPath,
  isServerInquirySubmissionEnabled,
  submitInquiry,
  type InquirySubmissionErrorCategory,
} from "@/lib/inquiry/submission";

type GetQuoteFormProps = {
  productName?: string;
  locale?: Locale;
};

type FormStatus =
  | "idle"
  | "preparing"
  | "submitting"
  | "accepted"
  | "draft_ready"
  | "error";

const serverSubmissionEnabled = isServerInquirySubmissionEnabled(
  process.env.NEXT_PUBLIC_INQUIRY_SUBMISSION_ENABLED,
  process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT,
);

const submissionErrorMessages: Record<InquirySubmissionErrorCategory, string> = {
  invalid_request:
    "Review the form fields and try again. Your entries are still here.",
  origin_rejected:
    "This submission origin was not accepted. Use the email or WhatsApp fallback below.",
  duplicate:
    "This inquiry was already submitted. Your entries remain available for review.",
  payload_too_large:
    "The inquiry is too large. Shorten the message and try again, or use email.",
  rate_limited:
    "Too many attempts were received. Wait a moment and try again, or use email.",
  server_error:
    "The inquiry service is temporarily unavailable. Your entries are still here.",
  delivery_unavailable:
    "The delivery service is temporarily unavailable. Your entries are still here.",
  timeout:
    "The request timed out. Your entries are still here; retry once or use email.",
  network_error:
    "The request could not reach the inquiry service. Your entries are still here.",
  unexpected_response:
    "The inquiry service returned an unexpected response. Use email or WhatsApp below.",
};

const chineseSubmissionErrorMessages: Record<
  InquirySubmissionErrorCategory,
  string
> = {
  invalid_request: "请检查表单字段后重试，您填写的内容仍保留在页面上。",
  origin_rejected: "当前提交来源未被接受，请使用下方邮件或 WhatsApp 备用方式。",
  duplicate: "该询盘已提交，您填写的内容仍保留供检查。",
  payload_too_large: "询盘内容过长，请缩短留言后重试，或改用电子邮件。",
  rate_limited: "提交次数过多，请稍后再试，或改用电子邮件。",
  server_error: "询盘服务暂时不可用，您填写的内容仍保留在页面上。",
  delivery_unavailable: "投递服务暂时不可用，您填写的内容仍保留在页面上。",
  timeout: "请求超时，您填写的内容仍保留；请仅重试一次，或改用电子邮件。",
  network_error: "无法连接询盘服务，您填写的内容仍保留在页面上。",
  unexpected_response: "询盘服务返回异常响应，请使用下方电子邮件或 WhatsApp。",
};

export function GetQuoteForm({ productName, locale = "en" }: GetQuoteFormProps) {
  const isChinese = locale === "zh";
  const defaultAttribution: InquiryAttribution = {
    sourcePage: `/${locale}/contact/`,
    contentType: "contact",
    ctaPosition: "contact_page",
  };
  const [status, setStatus] = useState<FormStatus>("idle");
  const launchGate = useRef<ReturnType<typeof createInquiryDraftLaunchGate> | null>(
    null,
  );
  const releaseTimer = useRef<number | undefined>(undefined);
  const formStartedAt = useRef(Date.now());
  const idempotencyKey = useRef<string | undefined>(undefined);
  launchGate.current ??= createInquiryDraftLaunchGate();
  const [attribution, setAttribution] =
    useState<InquiryAttribution>(defaultAttribution);
  const [message, setMessage] = useState(
    productName
      ? isChinese
        ? chineseContactFormCopy.productMessage(productName)
        : `I am interested in ${productName}. Please send quotation details.`
      : "",
  );
  const [submissionError, setSubmissionError] =
    useState<InquirySubmissionErrorCategory>();

  useEffect(() => {
    const legacyAttribution = parseLegacyInquiryAttribution(
      window.location.search,
    );
    if (legacyAttribution) {
      writeInquiryAttributionToSession(legacyAttribution);
    }
    const nextAttribution =
      legacyAttribution ??
      readInquiryAttributionFromSession() ??
      parseInquiryAttribution("", window.location.pathname);

    if (window.location.search) {
      window.history.replaceState(
        window.history.state,
        "",
        cleanContactHistoryUrl(
          window.location.pathname,
          window.location.hash,
        ),
      );
    }

    setAttribution(nextAttribution);
    if (!productName && nextAttribution.sourceTitle) {
      const sourceTitle = nextAttribution.sourceTitle;
      setMessage((current) =>
        current ||
        (isChinese
          ? chineseContactFormCopy.attributedMessage(sourceTitle)
          : `I would like to discuss a project related to ${sourceTitle}.`),
      );
    }
  }, [isChinese, productName]);

  useEffect(
    () => () => {
      if (releaseTimer.current !== undefined) {
        window.clearTimeout(releaseTimer.current);
      }
    },
    [],
  );

  const contextLabel = useMemo(() => {
    if (attribution.sourceTitle) return attribution.sourceTitle;
    if (attribution.contentSlug) {
      return attribution.contentSlug.replaceAll("-", " ");
    }
    return isChinese
      ? chineseContactFormCopy.directContext
      : "Direct contact inquiry";
  }, [attribution, isChinese]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const interests = data.getAll("productInterest").join(", ");
    if (!interests) {
      form
        .querySelector<HTMLInputElement>('input[name="productInterest"]')
        ?.setCustomValidity(
          isChinese
            ? chineseContactFormCopy.selectProductInterest
            : "Select at least one product interest.",
        );
      event.currentTarget.reportValidity();
      return;
    }
    if (!launchGate.current?.tryStart()) return;

    const fields: InquiryDraftFields = {
      name: String(data.get("name") ?? ""),
      company: String(data.get("company") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      country: String(data.get("country") ?? ""),
      customerType: String(data.get("customerType") ?? ""),
      projectStage: String(data.get("projectStage") ?? ""),
      productInterests: data
        .getAll("productInterest")
        .map((value) => String(value)),
      quantity: String(data.get("quantity") ?? ""),
      targetDelivery: String(data.get("targetDelivery") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    setSubmissionError(undefined);

    if (serverSubmissionEnabled) {
      setStatus("submitting");
      trackInquiryEvent("form_submit_attempt", "form", attribution);
      try {
        const payload = createInquirySubmissionPayload(
          fields,
          attribution,
          formStartedAt.current,
          String(data.get("website") ?? ""),
        );
        idempotencyKey.current ??= crypto.randomUUID();
        await submitInquiry(payload, idempotencyKey.current, {
          endpoint: inquiryEndpointPath,
        });
        trackInquiryEvent("form_submit_success", "form", attribution);
        form.reset();
        setMessage("");
        formStartedAt.current = Date.now();
        idempotencyKey.current = undefined;
        setStatus("accepted");
      } catch (error) {
        const category =
          error instanceof InquirySubmissionError
            ? error.category
            : "unexpected_response";
        setSubmissionError(category);
        setStatus("error");
        trackInquiryEvent(
          "form_submit_failure",
          "form",
          attribution,
          category,
        );
      } finally {
        launchGate.current.release();
      }
      return;
    }

    setStatus("preparing");
    try {
      const mailto = buildInquiryEmailDraft(fields, attribution);
      window.location.assign(mailto);
      trackInquiryEvent("email_draft_open", "email", attribution);
      releaseTimer.current = window.setTimeout(() => {
        launchGate.current?.release();
        setStatus("draft_ready");
      }, 1200);
    } catch {
      launchGate.current.release();
      setStatus("error");
    }
  }

  const inputClass =
    "contact-field mt-2 min-h-11 w-full border border-line bg-white px-3 py-2 text-foreground";
  const labelClass = "block text-sm font-semibold text-foreground";

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="contact-inquiry-form border border-line bg-surface p-6">
      <div className="mb-6 border-s-4 border-brand bg-background px-4 py-3">
        <p className="text-xs font-semibold uppercase text-brand">
          {isChinese ? chineseContactFormCopy.contextEyebrow : "Inquiry context"}
        </p>
        <p className="mt-1 font-semibold text-foreground">{contextLabel}</p>
        <p className="mt-1 text-sm leading-6 text-muted">
          {isChinese ? chineseContactFormCopy.sourceLabel : "Source"}: {attribution.contentType.replaceAll("_", " ")} /{" "}
          {attribution.ctaPosition.replaceAll("_", " ")}
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          {isChinese ? chineseContactFormCopy.name : "Name *"}
          <input name="name" required className={inputClass} />
        </label>
        <label className={labelClass}>
          {isChinese ? chineseContactFormCopy.company : "Company"}
          <input name="company" className={inputClass} />
        </label>
        <label className={labelClass}>
          {isChinese ? chineseContactFormCopy.email : "Email *"}
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className={labelClass}>
          {isChinese ? chineseContactFormCopy.phone : "WhatsApp / Phone"}
          <input name="phone" className={inputClass} />
        </label>
        <label className={labelClass}>
          {isChinese ? chineseContactFormCopy.country : "Country / Region *"}
          <input name="country" required className={inputClass} />
        </label>
        <label className={labelClass}>
          {isChinese ? chineseContactFormCopy.customerType : "Customer Type *"}
          <select name="customerType" required className={inputClass} defaultValue="">
            <option value="" disabled>
              {isChinese
                ? chineseContactFormCopy.selectCustomerType
                : "Select customer type"}
            </option>
            {contactFormOptions.customerTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {isChinese ? option.zhLabel : option.value}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          {isChinese ? chineseContactFormCopy.projectStage : "Project Stage"}
          <select name="projectStage" className={inputClass} defaultValue="">
            <option value="">
              {isChinese
                ? chineseContactFormCopy.selectProjectStage
                : "Select project stage"}
            </option>
            {contactFormOptions.projectStages.map((option) => (
              <option key={option.value} value={option.value}>
                {isChinese ? option.zhLabel : option.value}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          {isChinese
            ? chineseContactFormCopy.targetDelivery
            : "Target Delivery Timing"}
          <input
            name="targetDelivery"
            placeholder={
              isChinese
                ? chineseContactFormCopy.targetDeliveryPlaceholder
                : "Example: October 2026"
            }
            className={inputClass}
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-foreground">
          {isChinese
            ? chineseContactFormCopy.productInterest
            : "Product Interest *"}
        </legend>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {contactFormOptions.productInterests.map((option) => (
            <label key={option.value} className="contact-check-option flex gap-3 text-sm text-muted">
              <input
                name="productInterest"
                value={option.value}
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
              <span>{isChinese ? option.zhLabel : option.value}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={`${labelClass} mt-5`}>
        {isChinese ? chineseContactFormCopy.quantity : "Estimated Quantity"}
        <input
          name="quantity"
          placeholder={
            isChinese
              ? chineseContactFormCopy.quantityPlaceholder
              : "Example: 100 sets / 300 rooms / 1 hotel project"
          }
          className={inputClass}
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        {isChinese ? chineseContactFormCopy.website : "Website"}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>

      <label className={`${labelClass} mt-5`}>
        {isChinese ? chineseContactFormCopy.message : "Message *"}
        <textarea
          name="message"
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.currentTarget.value)}
          className="contact-field mt-2 w-full border border-line bg-white px-3 py-2 text-foreground"
        />
      </label>

      <div className="mt-5 border border-line bg-background px-4 py-3" role="note">
        <p className={labelClass}>
          {isChinese
            ? chineseContactFormCopy.filesTitle
            : "Project Files (optional)"}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          {isChinese
            ? chineseContactFormCopy.filesHelp
            : "This website does not upload files. After your email draft opens, attach drawings, product lists, BOQ, or project requirements manually in your email app. File type and size limits are set by your email provider."}
        </p>
      </div>

      <button
        type="submit"
        disabled={status === "preparing" || status === "submitting"}
        aria-disabled={status === "preparing" || status === "submitting"}
        className="contact-submit-button mt-6 inline-flex min-h-11 items-center justify-center border border-brand bg-brand px-5 py-3 font-semibold text-white disabled:cursor-wait disabled:opacity-70"
      >
        {status === "submitting"
          ? isChinese
            ? chineseContactFormCopy.submitting
            : "Submitting Inquiry..."
          : status === "preparing"
            ? isChinese
              ? chineseContactFormCopy.preparing
              : "Preparing Email Draft..."
            : serverSubmissionEnabled
              ? isChinese
                ? chineseContactFormCopy.submit
                : "Submit Project Inquiry"
              : isChinese
                ? chineseContactFormCopy.prepare
                : "Prepare Email Draft"}
      </button>

      <p className="mt-4 border-s-4 border-accent ps-4 text-sm leading-6 text-muted">
        {serverSubmissionEnabled
          ? isChinese
            ? `${chineseContactFormCopy.fallbackServer} `
            : "If server submission is unavailable, use "
          : isChinese
            ? `${chineseContactFormCopy.fallbackMailto} `
            : "Email sending is not configured yet. This form opens an email draft to "}
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
        {isChinese
          ? chineseContactFormCopy.fallbackReview
          : ". Review and send the draft yourself, attach project files manually if needed, or use "}
        <TrackedInquiryLink
          href={createWhatsAppUrl(
            isChinese
              ? chineseContactFormCopy.whatsappMessage
              : `Hello ${brand.name}, I would like to discuss a B2B project.`,
          )}
          channel="whatsapp"
          attribution={{
            ...attribution,
            ctaPosition: "form_whatsapp_fallback",
          }}
          className="font-semibold text-brand"
        >
          {isChinese ? chineseContactFormCopy.whatsappLabel : "WhatsApp"}
        </TrackedInquiryLink>
        .
      </p>
      {status === "draft_ready" ? (
        <p
          aria-live="polite"
          className="mt-3 text-sm font-semibold text-brand"
          role="status"
        >
          {isChinese
            ? chineseContactFormCopy.draftReady
            : "Email draft handoff requested. Review the draft, attach any files, and press Send in your email app. This website has not sent or delivered your inquiry."}
        </p>
      ) : null}
      {status === "accepted" ? (
        <p
          aria-live="polite"
          className="mt-3 text-sm font-semibold text-brand"
          role="status"
        >
          {isChinese
            ? chineseContactFormCopy.accepted
            : "Your inquiry was accepted for delivery. This confirms server acceptance, not inbox delivery. We will follow up through the contact details you provided."}
        </p>
      ) : null}
      {status === "error" ? (
        <p
          aria-live="assertive"
          className="mt-3 text-sm font-semibold text-red-700"
          role="alert"
        >
          {submissionError
            ? isChinese
              ? chineseSubmissionErrorMessages[submissionError]
              : submissionErrorMessages[submissionError]
            : isChinese
              ? chineseContactFormCopy.genericError
              : "We could not open your email app. Your entries are still here. Use the sales email or WhatsApp link above, or try preparing the draft again."}
        </p>
      ) : null}
    </form>
  );
}

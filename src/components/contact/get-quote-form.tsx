"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { FormEvent } from "react";
import { TrackedInquiryLink } from "@/components/contact/tracked-inquiry-link";
import {
  brand,
  createWhatsAppUrl,
} from "@/config/brand";
import {
  arabicContactFormCopy,
  chineseContactFormCopy,
  contactFormOptions,
  vietnameseContactFormCopy,
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

const arabicSubmissionErrorMessages: Record<
  InquirySubmissionErrorCategory,
  string
> = {
  invalid_request: "راجع حقول النموذج ثم حاول مرة أخرى؛ ما زالت البيانات محفوظة.",
  origin_rejected: "لم يُقبل مصدر الإرسال؛ استخدم البريد أو WhatsApp أدناه.",
  duplicate: "أُرسل هذا الاستفسار من قبل، وما زالت البيانات متاحة للمراجعة.",
  payload_too_large: "الاستفسار طويل جداً؛ اختصر الرسالة أو استخدم البريد.",
  rate_limited: "حدثت محاولات كثيرة؛ انتظر قليلاً أو استخدم البريد.",
  server_error: "خدمة الاستفسار غير متاحة مؤقتاً؛ ما زالت البيانات محفوظة.",
  delivery_unavailable: "خدمة التسليم غير متاحة مؤقتاً؛ ما زالت البيانات محفوظة.",
  timeout: "انتهت مهلة الطلب؛ حاول مرة واحدة أو استخدم البريد.",
  network_error: "تعذر الوصول إلى خدمة الاستفسار؛ ما زالت البيانات محفوظة.",
  unexpected_response: "أعادت الخدمة استجابة غير متوقعة؛ استخدم البريد أو WhatsApp.",
};

const vietnameseSubmissionErrorMessages: Record<
  InquirySubmissionErrorCategory,
  string
> = {
  invalid_request: "Kiểm tra các trường trong biểu mẫu rồi thử lại; nội dung đã nhập vẫn được giữ lại.",
  origin_rejected: "Nguồn gửi không được chấp nhận; hãy dùng email hoặc WhatsApp bên dưới.",
  duplicate: "Yêu cầu này đã được gửi; nội dung vẫn được giữ lại để bạn kiểm tra.",
  payload_too_large: "Nội dung yêu cầu quá dài; hãy rút gọn hoặc dùng email.",
  rate_limited: "Có quá nhiều lần gửi; hãy chờ một lúc hoặc dùng email.",
  server_error: "Dịch vụ tiếp nhận yêu cầu tạm thời không khả dụng; nội dung vẫn được giữ lại.",
  delivery_unavailable: "Dịch vụ chuyển tiếp tạm thời không khả dụng; nội dung vẫn được giữ lại.",
  timeout: "Yêu cầu đã hết thời gian chờ; chỉ thử lại một lần hoặc dùng email.",
  network_error: "Không thể kết nối dịch vụ tiếp nhận; nội dung vẫn được giữ lại.",
  unexpected_response: "Dịch vụ trả về phản hồi không mong đợi; hãy dùng email hoặc WhatsApp.",
};

export function GetQuoteForm({ productName, locale = "en" }: GetQuoteFormProps) {
  const isChinese = locale === "zh";
  const isArabic = locale === "ar";
  const isVietnamese = locale === "vi";
  const localizedCopy = isArabic
    ? arabicContactFormCopy
    : isChinese
      ? chineseContactFormCopy
      : isVietnamese
        ? vietnameseContactFormCopy
        : null;
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
      ? localizedCopy
        ? localizedCopy.productMessage(productName)
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
        (localizedCopy
          ? localizedCopy.attributedMessage(sourceTitle)
          : `I would like to discuss a project related to ${sourceTitle}.`),
      );
    }
  }, [localizedCopy, productName]);

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
    return localizedCopy
      ? localizedCopy.directContext
      : "Direct contact inquiry";
  }, [attribution, localizedCopy]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const interests = data.getAll("productInterest").join(", ");
    if (!interests) {
      form
        .querySelector<HTMLInputElement>('input[name="productInterest"]')
        ?.setCustomValidity(
          localizedCopy
            ? localizedCopy.selectProductInterest
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
          {localizedCopy?.contextEyebrow ?? "Inquiry context"}
        </p>
        <p className="mt-1 font-semibold text-foreground">{contextLabel}</p>
        <p className="mt-1 text-sm leading-6 text-muted">
          {localizedCopy?.sourceLabel ?? "Source"}: {attribution.contentType.replaceAll("_", " ")} /{" "}
          {attribution.ctaPosition.replaceAll("_", " ")}
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClass}>
          {localizedCopy?.name ?? "Name *"}
          <input name="name" required className={inputClass} />
        </label>
        <label className={labelClass}>
          {localizedCopy?.company ?? "Company"}
          <input name="company" className={inputClass} />
        </label>
        <label className={labelClass}>
          {localizedCopy?.email ?? "Email *"}
          <input name="email" type="email" required className={inputClass} />
        </label>
        <label className={labelClass}>
          {localizedCopy?.phone ?? "WhatsApp / Phone"}
          <input name="phone" className={inputClass} />
        </label>
        <label className={labelClass}>
          {localizedCopy?.country ?? "Country / Region *"}
          <input name="country" required className={inputClass} />
        </label>
        <label className={labelClass}>
          {localizedCopy?.customerType ?? "Customer Type *"}
          <select name="customerType" required className={inputClass} defaultValue="">
            <option value="" disabled>
              {localizedCopy
                ? localizedCopy.selectCustomerType
                : "Select customer type"}
            </option>
            {contactFormOptions.customerTypes.map((option) => (
              <option key={option.value} value={option.value}>
                {isArabic
                  ? option.arLabel
                  : isChinese
                    ? option.zhLabel
                    : isVietnamese
                      ? option.viLabel
                      : option.value}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          {localizedCopy?.projectStage ?? "Project Stage"}
          <select name="projectStage" className={inputClass} defaultValue="">
            <option value="">
              {localizedCopy
                ? localizedCopy.selectProjectStage
                : "Select project stage"}
            </option>
            {contactFormOptions.projectStages.map((option) => (
              <option key={option.value} value={option.value}>
                {isArabic
                  ? option.arLabel
                  : isChinese
                    ? option.zhLabel
                    : isVietnamese
                      ? option.viLabel
                      : option.value}
              </option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          {localizedCopy?.targetDelivery ?? "Target Delivery Timing"}
          <input
            name="targetDelivery"
            placeholder={
              localizedCopy
                ? localizedCopy.targetDeliveryPlaceholder
                : "Example: October 2026"
            }
            className={inputClass}
          />
        </label>
      </div>

      <fieldset className="mt-5">
        <legend className="text-sm font-semibold text-foreground">
          {localizedCopy?.productInterest ?? "Product Interest *"}
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
              <span>
                {isArabic
                  ? option.arLabel
                  : isChinese
                    ? option.zhLabel
                    : isVietnamese
                      ? option.viLabel
                      : option.value}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={`${labelClass} mt-5`}>
        {localizedCopy?.quantity ?? "Estimated Quantity"}
        <input
          name="quantity"
          placeholder={
            localizedCopy
              ? localizedCopy.quantityPlaceholder
              : "Example: 100 sets / 300 rooms / 1 hotel project"
          }
          className={inputClass}
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        {localizedCopy?.website ?? "Website"}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </label>

      <label className={`${labelClass} mt-5`}>
        {localizedCopy?.message ?? "Message *"}
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
          {localizedCopy?.filesTitle ?? "Project Files (optional)"}
        </p>
        <p className="mt-2 text-sm leading-6 text-muted">
          {localizedCopy
            ? localizedCopy.filesHelp
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
          ? localizedCopy
            ? localizedCopy.submitting
            : "Submitting Inquiry..."
          : status === "preparing"
            ? localizedCopy
              ? localizedCopy.preparing
              : "Preparing Email Draft..."
            : serverSubmissionEnabled
              ? localizedCopy
                ? localizedCopy.submit
                : "Submit Project Inquiry"
              : localizedCopy
                ? localizedCopy.prepare
                : "Prepare Email Draft"}
      </button>

      <p className="mt-4 border-s-4 border-accent ps-4 text-sm leading-6 text-muted">
        {serverSubmissionEnabled
          ? localizedCopy
            ? `${localizedCopy.fallbackServer} `
            : "If server submission is unavailable, use "
          : localizedCopy
            ? `${localizedCopy.fallbackMailto} `
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
        {localizedCopy
          ? localizedCopy.fallbackReview
          : ". Review and send the draft yourself, attach project files manually if needed, or use "}
        <TrackedInquiryLink
          href={createWhatsAppUrl(
            localizedCopy
              ? localizedCopy.whatsappMessage
              : `Hello ${brand.name}, I would like to discuss a B2B project.`,
          )}
          channel="whatsapp"
          attribution={{
            ...attribution,
            ctaPosition: "form_whatsapp_fallback",
          }}
          className="font-semibold text-brand"
        >
          {localizedCopy?.whatsappLabel ?? "WhatsApp"}
        </TrackedInquiryLink>
        .
      </p>
      {status === "draft_ready" ? (
        <p
          aria-live="polite"
          className="mt-3 text-sm font-semibold text-brand"
          role="status"
        >
          {localizedCopy
            ? localizedCopy.draftReady
            : "Email draft handoff requested. Review the draft, attach any files, and press Send in your email app. This website has not sent or delivered your inquiry."}
        </p>
      ) : null}
      {status === "accepted" ? (
        <p
          aria-live="polite"
          className="mt-3 text-sm font-semibold text-brand"
          role="status"
        >
          {localizedCopy
            ? localizedCopy.accepted
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
            ? isArabic
              ? arabicSubmissionErrorMessages[submissionError]
              : isChinese
                ? chineseSubmissionErrorMessages[submissionError]
                : isVietnamese
                  ? vietnameseSubmissionErrorMessages[submissionError]
                  : submissionErrorMessages[submissionError]
            : localizedCopy
              ? localizedCopy.genericError
              : "We could not open your email app. Your entries are still here. Use the sales email or WhatsApp link above, or try preparing the draft again."}
        </p>
      ) : null}
    </form>
  );
}

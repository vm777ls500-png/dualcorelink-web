import type { InquiryAttribution } from "@/lib/inquiry/attribution";
import type { InquiryDraftFields } from "@/lib/inquiry/email-draft";

export const inquiryEndpointPath = "/api/inquiry";
export const inquirySubmissionTimeoutMs = 10_000;

export type InquirySubmissionPayload = InquiryDraftFields & {
  website: string;
  formStartedAt: number;
  attribution: {
    sourceType: InquiryAttribution["contentType"];
    sourceSlug?: string;
    ctaLocation: string;
    category: "form";
    pagePath: string;
  };
};

export type InquirySubmissionErrorCategory =
  | "invalid_request"
  | "origin_rejected"
  | "duplicate"
  | "payload_too_large"
  | "rate_limited"
  | "server_error"
  | "delivery_unavailable"
  | "timeout"
  | "network_error"
  | "unexpected_response";

type FetchLike = typeof fetch;

type SubmitInquiryOptions = {
  endpoint?: string;
  fetchImpl?: FetchLike;
  timeoutMs?: number;
};

export class InquirySubmissionError extends Error {
  constructor(
    public readonly category: InquirySubmissionErrorCategory,
    public readonly status?: number,
  ) {
    super(category);
    this.name = "InquirySubmissionError";
  }
}
export function isServerInquirySubmissionEnabled(
  flag: string | undefined,
  endpoint: string | undefined,
) {
  return flag === "true" && endpoint === inquiryEndpointPath;
}

export function createInquirySubmissionPayload(
  fields: InquiryDraftFields,
  attribution: InquiryAttribution,
  formStartedAt: number,
  website = "",
): InquirySubmissionPayload {
  return {
    ...fields,
    website,
    formStartedAt,
    attribution: {
      sourceType: attribution.contentType,
      sourceSlug: attribution.contentSlug,
      ctaLocation: attribution.ctaPosition,
      category: "form",
      pagePath: attribution.sourcePage,
    },
  };
}

function categoryForStatus(status: number): InquirySubmissionErrorCategory {
  if (status === 400) return "invalid_request";
  if (status === 403) return "origin_rejected";
  if (status === 409) return "duplicate";
  if (status === 413) return "payload_too_large";
  if (status === 429) return "rate_limited";
  if (status === 500) return "server_error";
  if (status === 502 || status === 503 || status === 504) {
    return "delivery_unavailable";
  }
  return "unexpected_response";
}

export async function submitInquiry(
  payload: InquirySubmissionPayload,
  idempotencyKey: string,
  options: SubmitInquiryOptions = {},
) {
  const endpoint = options.endpoint ?? inquiryEndpointPath;
  if (endpoint !== inquiryEndpointPath) {
    throw new InquirySubmissionError("unexpected_response");
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? inquirySubmissionTimeoutMs,
  );

  try {
    const result = await (options.fetchImpl ?? fetch)(endpoint, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-idempotency-key": idempotencyKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
      credentials: "same-origin",
      signal: controller.signal,
    });

    if (result.status !== 202) {
      throw new InquirySubmissionError(categoryForStatus(result.status), result.status);
    }

    const body = (await result.json()) as {
      submissionId?: unknown;
      status?: unknown;
    };
    if (
      typeof body.submissionId !== "string" ||
      !["accepted", "dry_run"].includes(String(body.status))
    ) {
      throw new InquirySubmissionError("unexpected_response", result.status);
    }
    return {
      submissionId: body.submissionId,
      status: body.status as "accepted" | "dry_run",
    };
  } catch (error) {
    if (error instanceof InquirySubmissionError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new InquirySubmissionError("timeout");
    }
    throw new InquirySubmissionError("network_error");
  } finally {
    clearTimeout(timeout);
  }
}

export type DownloadAccessInput = {
  isPublic: unknown;
  leadCaptureRequired: unknown;
  directDownloadEnabled: unknown;
};

export type DownloadAccessDecision = {
  exposeFile: boolean;
  reason:
    | "public_direct_download"
    | "not_public"
    | "lead_capture_required"
    | "direct_download_disabled";
};

function enabled(value: unknown): boolean {
  return value === true || value === 1 || value === "1";
}

export function evaluateDownloadAccess(
  input: DownloadAccessInput,
): DownloadAccessDecision {
  if (!enabled(input.isPublic)) {
    return { exposeFile: false, reason: "not_public" };
  }

  if (enabled(input.leadCaptureRequired)) {
    return { exposeFile: false, reason: "lead_capture_required" };
  }

  if (!enabled(input.directDownloadEnabled)) {
    return { exposeFile: false, reason: "direct_download_disabled" };
  }

  return { exposeFile: true, reason: "public_direct_download" };
}

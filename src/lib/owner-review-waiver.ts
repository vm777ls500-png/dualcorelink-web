import { ownerReviewWaiverEvidenceOverrides } from "@/content/locales/owner-review-waivers";

export const ownerReviewWaiverStatuses = [
  "not_requested",
  "approved",
] as const;

export type OwnerReviewWaiverStatus =
  (typeof ownerReviewWaiverStatuses)[number];

export type OwnerReviewWaiverEvidence = {
  ownerReviewWaiverStatus: OwnerReviewWaiverStatus;
  ownerReviewWaiverBy: string | null;
  ownerReviewWaiverDate: string | null;
  ownerReviewWaiverReason: string;
};

export type OwnerReviewWaiverEvidenceOverride = OwnerReviewWaiverEvidence & {
  localizedUrl: string;
  ownerReviewWaiverStatus: "approved";
  ownerReviewWaiverBy: string;
  ownerReviewWaiverDate: string;
};

const noWaiverEvidence: OwnerReviewWaiverEvidence = {
  ownerReviewWaiverStatus: "not_requested",
  ownerReviewWaiverBy: null,
  ownerReviewWaiverDate: null,
  ownerReviewWaiverReason: "",
};

export function getOwnerReviewWaiverEvidence(
  localizedUrl: string,
): OwnerReviewWaiverEvidence {
  return (
    ownerReviewWaiverEvidenceOverrides.find(
      (entry) => entry.localizedUrl === localizedUrl,
    ) ?? noWaiverEvidence
  );
}

function isValidIsoDate(value: string | null): boolean {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00Z`);
  return (
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value
  );
}

export function hasApprovedOwnerReviewWaiver(
  evidence: OwnerReviewWaiverEvidence,
): boolean {
  return (
    evidence.ownerReviewWaiverStatus === "approved" &&
    Boolean(evidence.ownerReviewWaiverBy?.trim()) &&
    isValidIsoDate(evidence.ownerReviewWaiverDate) &&
    Boolean(evidence.ownerReviewWaiverReason.trim())
  );
}

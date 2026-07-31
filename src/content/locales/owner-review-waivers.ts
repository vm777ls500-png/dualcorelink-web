import type { OwnerReviewWaiverEvidenceOverride } from "@/lib/owner-review-waiver";

export const arabicP0OwnerReviewWaiverUrls = [
  "https://dualcorelink.com/ar/about/",
  "https://dualcorelink.com/ar/contact/",
  "https://dualcorelink.com/ar/faqs/",
  "https://dualcorelink.com/ar/products/",
  "https://dualcorelink.com/ar/solutions/",
  "https://dualcorelink.com/ar/regions/",
  "https://dualcorelink.com/ar/solutions/rcu-room-control-solution/",
  "https://dualcorelink.com/ar/solutions/smart-hotel-automation-solution/",
  "https://dualcorelink.com/ar/solutions/hotel-guest-room-control-solution/",
  "https://dualcorelink.com/ar/regions/middle-east/",
  "https://dualcorelink.com/ar/regions/saudi-arabia/",
  "https://dualcorelink.com/ar/regions/uae/",
  "https://dualcorelink.com/ar/products/hotel-smart-room-rcu-host-1/",
  "https://dualcorelink.com/ar/products/rcu-controller-cabinet/",
  "https://dualcorelink.com/ar/products/86-type-ai-smart-control-display/",
] as const;

export const arabicP0OwnerReviewWaiver = {
  status: "approved",
  by: "Allan",
  date: "2026-07-31",
  reason:
    "Business owner explicitly waived Arabic native-language review and accepted localization risk.",
  warning:
    "WARNING: Arabic P0 was released under owner review waiver and was not approved by an independent native Arabic reviewer.",
} as const;

export const ownerReviewWaiverEvidenceOverrides: readonly OwnerReviewWaiverEvidenceOverride[] =
  arabicP0OwnerReviewWaiverUrls.map((localizedUrl) => ({
    localizedUrl,
    ownerReviewWaiverStatus: arabicP0OwnerReviewWaiver.status,
    ownerReviewWaiverBy: arabicP0OwnerReviewWaiver.by,
    ownerReviewWaiverDate: arabicP0OwnerReviewWaiver.date,
    ownerReviewWaiverReason: arabicP0OwnerReviewWaiver.reason,
  }));

import type { MultilingualLocale } from "./multilingual-publication-manifest";
import {
  arabicP0OwnerReviewWaiver,
  arabicP0OwnerReviewWaiverUrls,
} from "@/content/locales/owner-review-waivers";

export const zhP0ReleaseUrls = [
  "https://dualcorelink.com/zh/about/",
  "https://dualcorelink.com/zh/contact/",
  "https://dualcorelink.com/zh/faqs/",
  "https://dualcorelink.com/zh/products/",
  "https://dualcorelink.com/zh/solutions/",
  "https://dualcorelink.com/zh/solutions/oem-odm-custom-panel-solution/",
  "https://dualcorelink.com/zh/solutions/rcu-room-control-solution/",
  "https://dualcorelink.com/zh/solutions/smart-hotel-automation-solution/",
  "https://dualcorelink.com/zh/products/hotel-smart-room-rcu-host-1/",
  "https://dualcorelink.com/zh/products/rcu-controller-cabinet/",
  "https://dualcorelink.com/zh/products/86-type-ai-smart-control-display/",
  "https://dualcorelink.com/zh/products/smart-four-key-scene-control-panel/",
] as const;

export type MultilingualReleaseBatch = {
  locale: MultilingualLocale;
  batch: string;
  localizedUrls: readonly string[];
  ownerReviewWaiver?: {
    status: "approved";
    by: string;
    date: string;
    reason: string;
    warning: string;
    localizedUrls: readonly string[];
  };
};

const releaseBatches: readonly MultilingualReleaseBatch[] = [
  {
    locale: "ar",
    batch: "p0",
    localizedUrls: arabicP0OwnerReviewWaiverUrls,
    ownerReviewWaiver: {
      ...arabicP0OwnerReviewWaiver,
      localizedUrls: arabicP0OwnerReviewWaiverUrls,
    },
  },
  {
    locale: "zh",
    batch: "p0",
    localizedUrls: zhP0ReleaseUrls,
  },
];

export function getMultilingualReleaseBatch(
  locale: string,
  batch: string,
): MultilingualReleaseBatch {
  const match = releaseBatches.find(
    (candidate) =>
      candidate.locale === locale && candidate.batch === batch,
  );
  if (!match) {
    throw new Error(
      `Unsupported multilingual release batch: ${locale}:${batch}`,
    );
  }
  return match;
}

import {
  arabicP0OwnerReviewWaiver,
  arabicP0OwnerReviewWaiverUrls,
} from "../owner-review-waivers";
import { arCmsImportPayload } from "./ar";

export const arP0CmsSourceIds = [48, 47, 6, 140, 138, 137] as const;

export const arP0OwnerWaiverScopeSha256 =
  "92eae81730ac445455385ff5f3811394dbb866d6f333dc6a290f5df60e4dc193";

const approvedSourceIds = new Set<number>(arP0CmsSourceIds);

export const arP0OwnerWaivedCmsImportPayload = arCmsImportPayload
  .filter((record) => approvedSourceIds.has(record.sourceEnglishContentId))
  .map((record) => ({
    ...record,
    localizedSlug: record.sourceEnglishSlug,
    batch: "p0" as const,
    productionReleaseReady: true,
    ownerReviewWaiverSchemaVersion: 1 as const,
    ownerReviewWaiverStatus: arabicP0OwnerReviewWaiver.status,
    ownerReviewWaiverBy: arabicP0OwnerReviewWaiver.by,
    ownerReviewWaiverDate: arabicP0OwnerReviewWaiver.date,
    ownerReviewWaiverReason: arabicP0OwnerReviewWaiver.reason,
    ownerReviewWaiverScopeCount: arabicP0OwnerReviewWaiverUrls.length,
    ownerReviewWaiverScopeSha256: arP0OwnerWaiverScopeSha256,
  }));

if (
  arP0OwnerWaivedCmsImportPayload.length !== 6 ||
  arP0OwnerWaivedCmsImportPayload.some(
    (record) =>
      record.locale !== "ar" ||
      record.nativeReviewStatus !== "pending" ||
      record.nativeReviewer !== null ||
      record.nativeReviewDate !== null ||
      record.ownerReviewWaiverStatus !== "approved" ||
      record.ownerReviewWaiverBy !== "Allan" ||
      record.ownerReviewWaiverDate !== "2026-07-31",
  )
) {
  throw new Error(
    "Arabic P0 owner-waived CMS payload must contain six pending-native-review records with exact owner-waiver evidence.",
  );
}

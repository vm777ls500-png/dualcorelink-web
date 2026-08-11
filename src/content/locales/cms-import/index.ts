import { arCmsImportPayload } from "./ar";
import {
  arFinalCmsApprovedIdentities,
  arFinalReviewedCmsImportPayload,
} from "./ar-final-reviewed";
import {
  arP0CmsSourceIds,
  arP0OwnerWaivedCmsImportPayload,
  arP0OwnerWaiverScopeSha256,
} from "./ar-p0-owner-waived";
import {
  arM3aCmsImportPayload,
  zhM3aCmsImportPayload,
} from "./m3a-generated";
import {
  m4aCmsImportPayload,
  m4aCmsImportPayloadByLocale,
} from "./m4a-generated";
import { zhP0ReviewedCmsImportPayload } from "./zh-p0-reviewed";
import {
  zhP1CmsApprovedIdentities,
  zhP1ReviewedCmsImportPayload,
} from "./zh-p1-reviewed";
import {
  zhRemainingFinalCmsApprovedIdentities,
  zhRemainingFinalReviewedCmsImportPayload,
} from "./zh-remaining-final-reviewed";
import { zhCmsImportPayload } from "./zh";

export const cmsTranslationImportPayload = [
  ...arFinalReviewedCmsImportPayload,
  ...zhCmsImportPayload,
  ...zhM3aCmsImportPayload,
  ...m4aCmsImportPayload,
] as const;

export {
  arCmsImportPayload,
  arFinalCmsApprovedIdentities,
  arFinalReviewedCmsImportPayload,
  arP0CmsSourceIds,
  arP0OwnerWaivedCmsImportPayload,
  arP0OwnerWaiverScopeSha256,
  arM3aCmsImportPayload,
  zhCmsImportPayload,
  zhP0ReviewedCmsImportPayload,
  zhP1CmsApprovedIdentities,
  zhP1ReviewedCmsImportPayload,
  zhRemainingFinalCmsApprovedIdentities,
  zhRemainingFinalReviewedCmsImportPayload,
  zhM3aCmsImportPayload,
  m4aCmsImportPayload,
  m4aCmsImportPayloadByLocale,
};

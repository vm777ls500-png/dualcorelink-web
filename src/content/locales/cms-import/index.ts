import { arCmsImportPayload } from "./ar";
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
import { zhCmsImportPayload } from "./zh";

export const cmsTranslationImportPayload = [
  ...arCmsImportPayload,
  ...arM3aCmsImportPayload,
  ...zhCmsImportPayload,
  ...zhM3aCmsImportPayload,
  ...m4aCmsImportPayload,
] as const;

export {
  arCmsImportPayload,
  arP0CmsSourceIds,
  arP0OwnerWaivedCmsImportPayload,
  arP0OwnerWaiverScopeSha256,
  arM3aCmsImportPayload,
  zhCmsImportPayload,
  zhP0ReviewedCmsImportPayload,
  zhM3aCmsImportPayload,
  m4aCmsImportPayload,
  m4aCmsImportPayloadByLocale,
};

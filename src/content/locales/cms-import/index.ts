import { arCmsImportPayload } from "./ar";
import {
  arM3aCmsImportPayload,
  zhM3aCmsImportPayload,
} from "./m3a-generated";
import {
  m4aCmsImportPayload,
  m4aCmsImportPayloadByLocale,
} from "./m4a-generated";
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
  arM3aCmsImportPayload,
  zhCmsImportPayload,
  zhM3aCmsImportPayload,
  m4aCmsImportPayload,
  m4aCmsImportPayloadByLocale,
};

import { defineLocaleContent } from "../types";
import {
  arM3aRegionPages,
  arM3aResourcePages,
} from "../m3a-file-pages";
import { arRegionPages, arStaticPages } from "./pages";

export const arLocaleContent = defineLocaleContent("ar", {
  resources: arM3aResourcePages,
  regions: [...arRegionPages, ...arM3aRegionPages],
  staticPages: arStaticPages,
});

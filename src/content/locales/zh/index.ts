import { defineLocaleContent } from "../types";
import {
  zhM3aRegionPages,
  zhM3aResourcePages,
} from "../m3a-file-pages";
import { zhStaticPages } from "./pages";

export const zhLocaleContent = defineLocaleContent("zh", {
  resources: zhM3aResourcePages,
  regions: zhM3aRegionPages,
  staticPages: zhStaticPages,
});

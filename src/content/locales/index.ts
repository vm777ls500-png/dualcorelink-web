import { arLocaleContent } from "./ar";
import { deLocaleContent } from "./de";
import { esLocaleContent } from "./es";
import { faLocaleContent } from "./fa";
import { viLocaleContent } from "./vi";
import { zhLocaleContent } from "./zh";
import type {
  LocaleContentRegistry,
  LocalizedFileContent,
} from "./types";
import type { MultilingualLocale } from "@/lib/multilingual-publication-manifest";

export type {
  LocaleContentRegistry,
  LocalizedFileContent,
} from "./types";

export const localizedFileContentByLocale: Readonly<
  Record<MultilingualLocale, LocaleContentRegistry>
> = {
  ar: arLocaleContent,
  zh: zhLocaleContent,
  de: deLocaleContent,
  es: esLocaleContent,
  vi: viLocaleContent,
  fa: faLocaleContent,
};

export const localizedFileContent: readonly LocalizedFileContent[] =
  Object.values(localizedFileContentByLocale).flatMap((registry) => [
    ...registry.resources,
    ...registry.regions,
    ...registry.staticPages,
  ]);

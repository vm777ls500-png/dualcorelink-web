import {
  readFile,
  readdir,
  rm,
  stat,
  writeFile,
} from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { localizedRenderablePublicationPages } from "../src/lib/localized-publication";
import { emptyStaticExportSlug } from "../src/lib/routing/static-export";
import {
  multilingualLocales,
  type MultilingualLocale,
} from "../src/lib/multilingual-publication-manifest";

async function pruneLocalizedDirectory(input: {
  root: string;
  directory: string;
  locale: MultilingualLocale;
  approvedPaths: readonly string[];
  removed: string[];
}) {
  const entries = await readdir(input.directory, { withFileTypes: true });
  const relativeDirectory = path
    .relative(input.root, input.directory)
    .split(path.sep)
    .join("/");
  const isApprovedPage = input.approvedPaths.includes(relativeDirectory);

  for (const entry of entries) {
    const absolutePath = path.join(input.directory, entry.name);
    if (entry.isDirectory()) {
      const relativeChild = path
        .relative(input.root, absolutePath)
        .split(path.sep)
        .join("/");
      const isApprovedBranch = input.approvedPaths.some(
        (approvedPath) =>
          approvedPath === relativeChild ||
          approvedPath.startsWith(`${relativeChild}/`),
      );
      if (isApprovedBranch) {
        await pruneLocalizedDirectory({
          ...input,
          directory: absolutePath,
        });
      } else {
        await rm(absolutePath, { recursive: true, force: true });
        input.removed.push(absolutePath);
      }
      continue;
    }

    if (!isApprovedPage) {
      await rm(absolutePath, { force: true });
      input.removed.push(absolutePath);
      continue;
    }

    if (entry.name.endsWith(".html")) {
      const html = await readFile(absolutePath, "utf8");
      const direction =
        input.locale === "ar" || input.locale === "fa" ? "rtl" : "ltr";
      const localizedHtml = html.replace(
        /<html\s+lang="en"([^>]*)>/,
        `<html lang="${input.locale}" dir="${direction}"$1>`,
      );
      if (localizedHtml === html) {
        throw new Error(
          `Unable to localize root html attributes: ${absolutePath}`,
        );
      }
      await writeFile(absolutePath, localizedHtml, "utf8");
    }
  }
}

export async function cleanStaticExport(
  outputRoot = path.resolve("out"),
) {
  const resolvedOutputRoot = path.resolve(outputRoot);
  const outputRootStats = await stat(resolvedOutputRoot);
  if (!outputRootStats.isDirectory()) {
    throw new Error(`Static export root is not a directory: ${resolvedOutputRoot}`);
  }

  const sentinelDirectories = [
    path.join(resolvedOutputRoot, "en", "products", emptyStaticExportSlug),
    path.join(resolvedOutputRoot, "en", "solutions", emptyStaticExportSlug),
  ];
  const approvedPathsByLocale = Object.fromEntries(
    multilingualLocales.map((locale) => [
      locale,
      localizedRenderablePublicationPages
        .filter((page) => page.locale === locale)
        .map((page) => page.path),
    ]),
  ) as Record<MultilingualLocale, string[]>;
  const fullyRetiredLocales = multilingualLocales.filter(
    (locale) => approvedPathsByLocale[locale].length === 0,
  );
  const retiredLocaleDirectories = fullyRetiredLocales.map((locale) =>
    path.join(resolvedOutputRoot, locale),
  );
  const removableDirectories = [...sentinelDirectories, ...retiredLocaleDirectories];

  for (const directory of removableDirectories) {
    if (!directory.startsWith(`${resolvedOutputRoot}${path.sep}`)) {
      throw new Error(`Refusing to remove unexpected export path: ${directory}`);
    }

    await rm(directory, { recursive: true, force: true });
  }

  const removedLocalizedArtifacts: string[] = [];
  for (const locale of multilingualLocales) {
    const localeRoot = path.join(resolvedOutputRoot, locale);
    try {
      const localeStats = await stat(localeRoot);
      if (!localeStats.isDirectory()) continue;
      await pruneLocalizedDirectory({
        root: localeRoot,
        directory: localeRoot,
        locale,
        approvedPaths: approvedPathsByLocale[locale],
        removed: removedLocalizedArtifacts,
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
    }

    for (const extension of [".html", ".txt"]) {
      const rootArtifact = path.join(resolvedOutputRoot, `${locale}${extension}`);
      await rm(rootArtifact, { force: true });
      removedLocalizedArtifacts.push(rootArtifact);
    }
  }

  return [...removableDirectories, ...removedLocalizedArtifacts];
}

const entryPath = process.argv[1] ? path.resolve(process.argv[1]) : null;
if (entryPath && pathToFileURL(entryPath).href === import.meta.url) {
  const outputRoot = process.argv[2] ?? path.resolve("out");
  cleanStaticExport(outputRoot)
    .then((directories) => {
      console.log(
        `[export:clean] checked ${directories.length} sentinel directories`,
      );
    })
    .catch((error: unknown) => {
      console.error("[export:clean] failed", error);
      process.exitCode = 1;
    });
}

import { evaluateDownloadAccess } from "@/lib/downloads/access";
import type { DownloadModel } from "@/types/content";
import type { WordPressPost } from "@/types/wordpress";
import { normalizeMediaId, normalizeRelationshipIds } from "../relationships";
import {
  adaptContentIdentity,
  adaptSchemaModel,
  adaptSeoModel,
  readAcfBoolean,
  readAcfString,
} from "./shared";

export function adaptDownload(
  post: WordPressPost,
): Omit<DownloadModel, "coverImage"> & { fileId: number | null } {
  const fields = post.acf;
  const decision = evaluateDownloadAccess({
    isPublic: fields.download_is_public,
    leadCaptureRequired: fields.download_lead_capture_required,
    directDownloadEnabled: fields.download_direct_enabled,
  });
  const externalUrl = readAcfString(fields, "download_external_url");

  return {
    ...adaptContentIdentity(post),
    title: post.title.rendered,
    description:
      readAcfString(fields, "download_description") || post.excerpt.rendered,
    fileName:
      readAcfString(fields, "download_file_name") || post.title.rendered,
    fileType: readAcfString(fields, "download_file_type"),
    fileVersion: readAcfString(fields, "download_file_version") || undefined,
    fileLanguage: readAcfString(fields, "download_file_language"),
    fileSizeLabel:
      readAcfString(fields, "download_file_size_label") || undefined,
    releaseDate:
      readAcfString(fields, "download_release_date") || undefined,
    coverImageId: normalizeMediaId(fields.download_cover_image),
    fileId: normalizeMediaId(fields.download_file),
    access: {
      isPublic: readAcfBoolean(fields, "download_is_public"),
      leadCaptureRequired: readAcfBoolean(
        fields,
        "download_lead_capture_required",
      ),
      directEnabled: readAcfBoolean(fields, "download_direct_enabled"),
      exposeFile: decision.exposeFile,
      reason: decision.reason,
    },
    publicFileUrl:
      decision.exposeFile && externalUrl ? externalUrl : undefined,
    relatedProductIds: normalizeRelationshipIds(
      fields.download_related_products,
    ),
    seo: adaptSeoModel(post, "download"),
    schema: adaptSchemaModel(post, "download"),
  };
}

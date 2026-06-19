const explicitInternalFields = new Set([
  "internal_sku",
  "product_internal_notes",
  "internal_solution_code",
  "solution_sales_notes",
  "technical_review_status",
  "case_internal_code",
  "case_client_approval_status",
  "case_internal_notes",
  "case_evidence_review_status",
  "faq_internal_code",
  "faq_review_status",
  "faq_internal_notes",
  "resource_internal_code",
  "resource_editorial_status",
  "resource_internal_notes",
  "resource_source_verification_status",
  "partner_private_contact_name",
  "partner_private_contact_email",
  "partner_private_contact_phone",
  "partner_internal_code",
  "partner_account_manager",
  "partner_internal_status",
  "partner_internal_notes",
  "partner_crm_company_id",
  "partner_hubspot_company_id",
  "partner_last_crm_sync",
  "download_internal_code",
  "download_storage_notes",
  "download_review_status",
  "download_source_file_path",
  "download_access_count_internal",
  "download_internal_notes",
  "region_internal_code",
  "region_market_owner",
  "region_sales_notes",
  "region_content_status",
  "region_legal_review_status",
  "region_internal_notes",
]);

const sensitiveFieldPattern =
  /(^|_)(internal|private|crm|hubspot|inquiry|sales_notes|review_status|source_file_path|access_count)(_|$)/i;

export function isInternalFieldName(name: string): boolean {
  return explicitInternalFields.has(name) || sensitiveFieldPattern.test(name);
}

export function discardInternalFields(
  fields: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(fields).filter(([name]) => !isInternalFieldName(name)),
  );
}

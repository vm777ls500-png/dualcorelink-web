import type { NativeReviewEvidenceOverride } from "@/lib/native-review-evidence";

/**
 * Human native-review evidence imported from the controlled review decisions
 * workbooks. Pending rows are intentionally omitted because pending is the
 * publication model's fail-closed default.
 */
export const nativeReviewEvidenceOverrides: readonly NativeReviewEvidenceOverride[] = [];

export function normalizeRelationshipIds(value: unknown): number[] {
  const candidates = Array.isArray(value) ? value : [value];
  const ids = candidates
    .map((candidate) => {
      if (typeof candidate === "number") {
        return candidate;
      }

      if (
        typeof candidate === "string" &&
        candidate.trim() !== "" &&
        /^\d+$/.test(candidate)
      ) {
        return Number(candidate);
      }

      if (
        typeof candidate === "object" &&
        candidate !== null &&
        "ID" in candidate &&
        typeof candidate.ID === "number"
      ) {
        return candidate.ID;
      }

      if (
        typeof candidate === "object" &&
        candidate !== null &&
        "id" in candidate &&
        typeof candidate.id === "number"
      ) {
        return candidate.id;
      }

      return 0;
    })
    .filter((id) => Number.isSafeInteger(id) && id > 0);

  return [...new Set(ids)];
}

export function normalizeMediaId(value: unknown): number | null {
  const [id] = normalizeRelationshipIds(value);
  return id ?? null;
}

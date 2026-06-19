export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readString(
  record: Record<string, unknown>,
  key: string,
  fallback = "",
): string {
  return typeof record[key] === "string" ? record[key] : fallback;
}

export function readNumber(
  record: Record<string, unknown>,
  key: string,
  fallback = 0,
): number {
  return typeof record[key] === "number" && Number.isFinite(record[key])
    ? record[key]
    : fallback;
}

export function readBoolean(
  record: Record<string, unknown>,
  key: string,
  fallback = false,
): boolean {
  const value = record[key];

  if (typeof value === "boolean") {
    return value;
  }

  if (value === 1 || value === "1") {
    return true;
  }

  if (value === 0 || value === "0") {
    return false;
  }

  return fallback;
}

export function readRecord(
  record: Record<string, unknown>,
  key: string,
): Record<string, unknown> {
  return isRecord(record[key]) ? record[key] : {};
}

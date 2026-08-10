export type BidiTextSegment = {
  value: string;
  direction: "auto" | "ltr";
};

const technicalTokenPattern =
  /(?:https?:\/\/[^\s]+|[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|\+?\d[\d\s()+./-]{4,}\d|\b[A-Z]{1,6}[-/]?\d[A-Z0-9./-]*\b|\b(?:RCU|KNX|HVAC|RS485|OEM\s*\/\s*ODM|I\s*\/\s*O|USB)\b|\b\d+(?:[.,]\d+)?\s*(?:V|A|W|kW|Hz|mm|cm|m|kg|MB|GB|ms|s)\b)/gi;

export function splitBidiTechnicalText(value: string): BidiTextSegment[] {
  const result: BidiTextSegment[] = [];
  let cursor = 0;

  for (const match of value.matchAll(technicalTokenPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      result.push({ value: value.slice(cursor, index), direction: "auto" });
    }
    result.push({ value: match[0], direction: "ltr" });
    cursor = index + match[0].length;
  }
  if (cursor < value.length) {
    result.push({ value: value.slice(cursor), direction: "auto" });
  }
  return result.length > 0 ? result : [{ value, direction: "auto" }];
}

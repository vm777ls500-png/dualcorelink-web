import { Fragment } from "react";
import { splitBidiTechnicalText } from "@/lib/bidi-technical-text";

export function BidiTechnicalText({ text }: { text: string }) {
  return splitBidiTechnicalText(text).map((segment, index) =>
    segment.direction === "ltr" ? (
      <bdi key={`${segment.value}-${index}`} dir="ltr">
        {segment.value}
      </bdi>
    ) : (
      <Fragment key={`${segment.value}-${index}`}>{segment.value}</Fragment>
    ),
  );
}

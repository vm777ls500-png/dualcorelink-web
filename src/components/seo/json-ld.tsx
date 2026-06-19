import type { JsonLdGraph } from "@/lib/schema";

type JsonLdProps = {
  graph: JsonLdGraph;
};

function serializeJsonLd(graph: JsonLdGraph): string {
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}

export function JsonLd({ graph }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(graph) }}
    />
  );
}

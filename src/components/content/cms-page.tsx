import { PageHeading } from "./page-heading";
import { stripHtml } from "@/lib/text";
import type { PageModel } from "@/types/content";

type CmsPageProps = {
  page: PageModel | null;
  eyebrow: string;
  fallbackTitle: string;
  fallbackDescription: string;
  children?: React.ReactNode;
};

export function CmsPage({
  page,
  eyebrow,
  fallbackTitle,
  fallbackDescription,
  children,
}: CmsPageProps) {
  const body = stripHtml(page?.content || "");
  return (
    <main className="mx-auto max-w-5xl px-5 py-12 sm:px-8 lg:px-12">
      <PageHeading
        eyebrow={eyebrow}
        title={stripHtml(page?.title || fallbackTitle)}
        description={stripHtml(page?.excerpt || fallbackDescription)}
      />
      {body ? (
        <p className="mt-10 whitespace-pre-line border-t border-line pt-8 leading-8 text-muted">
          {body}
        </p>
      ) : null}
      {children}
    </main>
  );
}

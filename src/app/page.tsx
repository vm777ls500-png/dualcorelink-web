import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DualCoreLink | Smart Hotel & Smart Home Automation",
  description:
    "Continue to DualCoreLink's English site for smart hotel room control and smart home automation products.",
  alternates: {
    canonical: "/en/",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootRedirectPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <meta httpEquiv="refresh" content="0; url=/en/" />
      <script
        dangerouslySetInnerHTML={{
          __html: "window.location.replace('/en/');",
        }}
      />
      <section className="max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-200">
          DualCoreLink
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Smart Hotel & Smart Home Automation
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-200">
          Redirecting to the English site for smart hotel room control products,
          solutions, and inquiry options.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
          href="/en/"
        >
          Enter site
        </Link>
      </section>
    </main>
  );
}

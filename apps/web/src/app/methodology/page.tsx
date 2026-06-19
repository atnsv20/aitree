import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/api";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How the Capability Index is calculated: a 0-100 score blending benchmarks, adoption, cost, reliability, and research momentum — not a percentage to AGI.",
  alternates: { canonical: `${SITE_URL}/methodology` },
};

const factors = [
  {
    title: "Benchmark progress",
    body: "Measured gains on credible, real-world-relevant benchmarks.",
  },
  {
    title: "Real-world adoption",
    body: "Evidence that the capability is used in production at meaningful scale.",
  },
  {
    title: "Accessibility & cost",
    body: "Falling cost and rising availability of the capability.",
  },
  {
    title: "Reliability improvement",
    body: "Higher success and error-recovery rates on representative tasks.",
  },
  {
    title: "Research momentum",
    body: "The pace and quality of relevant research advances.",
  },
  {
    title: "Safety & reliability concerns",
    body: "Subtracts from the score when incidents or regressions appear.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Methodology", href: "/methodology" },
        ]}
      />

      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold sm:text-4xl">Methodology</h1>
        <p className="mt-4 text-lg text-slate-500">
          The AI Progress Map scores each route with a{" "}
          <strong className="text-slate-900">Capability Index</strong> — a
          0&ndash;100 measure of how far a development route has progressed. It
          is deliberately <em>not</em> framed as a percentage toward AGI.
        </p>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">What the score blends</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {factors.map((f) => (
              <div key={f.title} className="panel p-4">
                <h3 className="font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">The conceptual formula</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-surface-muted p-4 font-mono text-sm text-slate-700">
{`Capability Index =
    benchmark progress
  + real-world adoption
  + accessibility / cost improvement
  + reliability improvement
  + research momentum
  - safety / reliability concerns`}
          </pre>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Events and score deltas</h2>
          <p className="mt-3 text-slate-700">
            Every entry on a route&apos;s evidence timeline is an{" "}
            <strong className="text-slate-900">event</strong>: a model release,
            benchmark result, research paper, product launch, adoption signal,
            regulation change, or safety incident. Each event carries a{" "}
            <strong className="text-slate-900">score delta</strong> for the
            routes it affects, for example:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-line bg-surface-muted p-4 font-mono text-sm text-slate-700">
{`scoreImpact: {
  routeSlug: "ai-coding",
  delta: 3.8
}`}
          </pre>
          <p className="mt-3 text-slate-700">
            For this MVP, each route&apos;s headline Capability Index is
            maintained manually while event deltas are tracked separately to
            show the direction and magnitude of recent change. A future version
            will compute the index directly from accumulated event deltas.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-bold">Confidence grades</h2>
          <p className="mt-3 text-slate-700">
            Each route and event carries a confidence grade from{" "}
            <strong>A</strong> (strong, well-corroborated evidence) to{" "}
            <strong>D</strong> (weak or speculative). Grades make the
            uncertainty behind a score explicit.
          </p>
        </section>

        <div className="mt-12">
          <Link
            href="/routes"
            className="inline-block rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition-colors hover:bg-slate-700"
          >
            Explore the routes →
          </Link>
        </div>
      </div>
    </div>
  );
}

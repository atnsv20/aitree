import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api, SITE_URL } from "@/lib/api";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { StatusBadge } from "@/components/ui/Badges";

export async function generateStaticParams() {
  const terms = await api.glossary();
  return terms.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const term = await api.glossaryTerm(slug);
  if (!term) return { title: "Term not found" };
  return {
    title: `${term.term} — Glossary`,
    description: term.definition,
    alternates: { canonical: `${SITE_URL}/glossary/${term.slug}` },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = await api.glossaryTerm(slug);
  if (!term) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: term.term,
    description: term.definition,
    url: `${SITE_URL}/glossary/${term.slug}`,
    inDefinedTermSet: `${SITE_URL}/glossary`,
  };

  return (
    <div className="container-page py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Glossary", href: "/glossary" },
          { label: term.term, href: `/glossary/${term.slug}` },
        ]}
      />

      <article className="max-w-3xl">
        <h1 className="text-3xl font-bold sm:text-4xl">{term.term}</h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-700">
          {term.definition}
        </p>

        {(term.relatedRoutes.length > 0 || term.relatedNodes.length > 0) && (
          <div className="mt-10 border-t border-line pt-6">
            <h2 className="text-lg font-semibold">Related</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {term.relatedRoutes.map((r) => (
                <Link
                  key={r.slug}
                  href={`/routes/${r.slug}`}
                  className="rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-sm text-accent-700 hover:bg-accent-100"
                >
                  {r.shortTitle}
                </Link>
              ))}
              {term.relatedNodes.map((n) => (
                <Link
                  key={n.slug}
                  href={`/nodes/${n.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-subtle px-3 py-1 text-sm text-slate-600 hover:text-slate-900"
                >
                  {n.title}
                  <StatusBadge status={n.status} className="px-1.5 py-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

import type { Metadata } from "next";
import { api, SITE_URL } from "@/lib/api";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { GlossaryCard } from "@/components/content/GlossaryCard";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Definitions of key AI progress terms: Capability Index, test-time compute, long-horizon tasks, agents, and more.",
  alternates: { canonical: `${SITE_URL}/glossary` },
};

export default async function GlossaryIndexPage() {
  const terms = await api.glossary();

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Glossary", href: "/glossary" },
        ]}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">Glossary</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-500">
        Key terms used across the AI Progress Map.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {terms.map((term) => (
          <GlossaryCard key={term.slug} term={term} />
        ))}
      </div>
    </div>
  );
}

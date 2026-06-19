import Link from "next/link";
import type { GlossaryTerm } from "@aitree/types";

export function GlossaryCard({ term }: { term: GlossaryTerm }) {
  return (
    <Link
      href={`/glossary/${term.slug}`}
      className="panel panel-hover flex flex-col gap-2 p-5"
    >
      <h3 className="text-lg font-semibold text-accent-700">{term.term}</h3>
      <p className="line-clamp-3 text-sm text-slate-500">{term.definition}</p>
    </Link>
  );
}

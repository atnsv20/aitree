import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { SITE_URL } from "@/lib/api";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-400">
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => (
          <li key={c.href} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden className="text-slate-300">/</span>}
            {i === items.length - 1 ? (
              <span className="text-slate-700">{c.label}</span>
            ) : (
              <Link href={c.href} className="hover:text-accent-700">
                {c.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

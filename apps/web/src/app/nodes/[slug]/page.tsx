import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api, SITE_URL } from "@/lib/api";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { StatusBadge } from "@/components/ui/Badges";
import { BlogCard } from "@/components/content/BlogCard";
import { statusStyles } from "@/lib/theme";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const routes = await api.routes();
  return routes.flatMap((r) => r.nodeSlugs.map((slug) => ({ slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const node = await api.node(slug);
  if (!node) return { title: "Node not found" };
  return {
    title: `${node.title} — ${statusStyles[node.status].label}`,
    description: node.description,
    alternates: { canonical: `${SITE_URL}/nodes/${node.slug}` },
  };
}

export default async function NodeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const node = await api.node(slug);
  if (!node) notFound();

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Routes", href: "/routes" },
          { label: node.route.shortTitle, href: `/routes/${node.route.slug}` },
          { label: node.title, href: `/nodes/${node.slug}` },
        ]}
      />

      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-bold sm:text-4xl">{node.title}</h1>
        <StatusBadge status={node.status} />
      </div>
      <p className="mt-3 max-w-3xl text-lg text-slate-500">{node.description}</p>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="panel p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Route
          </div>
          <Link
            href={`/routes/${node.route.slug}`}
            className="mt-1 block font-semibold text-accent-600 hover:text-accent-700"
          >
            {node.route.title}
          </Link>
        </div>
        <div className="panel p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Score contribution
          </div>
          <div className="mt-1 text-lg font-semibold text-slate-900">
            +{node.scoreContribution.toFixed(1)}
          </div>
        </div>
        <div className="panel p-4">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Prerequisites
          </div>
          <div className="mt-1 text-sm text-slate-700">
            {node.parentSlugs.length === 0 ? (
              <span className="text-slate-500">Root capability</span>
            ) : (
              <span className="flex flex-wrap gap-2">
                {node.parentSlugs.map((p) => (
                  <Link
                    key={p}
                    href={`/nodes/${p}`}
                    className="text-accent-600 hover:text-accent-700"
                  >
                    {p}
                  </Link>
                ))}
              </span>
            )}
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">Related Evidence Events</h2>
        {node.events.length === 0 ? (
          <p className="mt-3 text-slate-500">No related events yet.</p>
        ) : (
          <ul className="mt-4 flex flex-col gap-3">
            {node.events.map((event) => (
              <li key={event.slug}>
                <Link
                  href={`/events/${event.slug}`}
                  className="panel panel-hover block p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-slate-900">
                      {event.title}
                    </span>
                    <time
                      dateTime={event.date}
                      className="shrink-0 text-xs text-slate-500"
                    >
                      {formatDate(event.date)}
                    </time>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{event.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      {node.blogPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold">Related Articles</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {node.blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

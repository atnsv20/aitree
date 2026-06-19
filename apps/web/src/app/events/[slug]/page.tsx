import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api, SITE_URL } from "@/lib/api";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import {
  ConfidenceGrade,
  EventTypeBadge,
  StatusBadge,
} from "@/components/ui/Badges";
import { SourceList } from "@/components/content/SourceList";
import { JsonLd } from "@/components/ui/JsonLd";
import { cn, formatDate, formatDelta } from "@/lib/format";

export async function generateStaticParams() {
  const events = await api.events();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await api.event(slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.summary,
    alternates: { canonical: `${SITE_URL}/events/${event.slug}` },
    openGraph: {
      type: "article",
      title: event.title,
      description: event.summary,
      publishedTime: event.date,
      url: `${SITE_URL}/events/${event.slug}`,
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await api.event(slug);
  if (!event) notFound();

  const routeName = new Map(event.routes.map((r) => [r.slug, r.title]));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: event.title,
    datePublished: event.date,
    description: event.summary,
    articleBody: event.whyItMatters,
    url: `${SITE_URL}/events/${event.slug}`,
  };

  return (
    <div className="container-page py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
          { label: event.title, href: `/events/${event.slug}` },
        ]}
      />

      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <time dateTime={event.date}>{formatDate(event.date)}</time>
        <EventTypeBadge eventType={event.eventType} />
        <span className="flex items-center gap-1.5">
          Confidence <ConfidenceGrade confidence={event.confidence} />
        </span>
      </div>

      <h1 className="mt-3 text-3xl font-bold sm:text-4xl">{event.title}</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-500">{event.summary}</p>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h2 className="text-2xl font-bold">Why it matters</h2>
            <p className="mt-3 text-slate-700">{event.whyItMatters}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">Score impact</h2>
            <ul className="mt-4 flex flex-col gap-2">
              {event.affectedRoutes.map((impact) => (
                <li
                  key={impact.routeSlug}
                  className="panel flex items-center justify-between p-4"
                >
                  <Link
                    href={`/routes/${impact.routeSlug}`}
                    className="font-medium text-accent-600 hover:text-accent-700"
                  >
                    {routeName.get(impact.routeSlug) ?? impact.routeSlug}
                  </Link>
                  <span
                    className={cn(
                      "rounded-md border px-3 py-1 text-sm font-bold",
                      impact.delta >= 0
                        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                        : "border-rose-200 bg-rose-50 text-rose-700"
                    )}
                  >
                    {formatDelta(impact.delta)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {event.nodes.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold">Affected capabilities</h2>
              <ul className="mt-4 flex flex-col gap-2">
                {event.nodes.map((node) => (
                  <li key={node.slug}>
                    <Link
                      href={`/nodes/${node.slug}`}
                      className="panel panel-hover flex items-center justify-between gap-3 p-3"
                    >
                      <span className="font-medium text-slate-700">
                        {node.title}
                      </span>
                      <StatusBadge status={node.status} />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside>
          <h2 className="text-xl font-bold">Sources</h2>
          <div className="mt-3">
            <SourceList urls={event.sourceUrls} />
          </div>
        </aside>
      </div>
    </div>
  );
}

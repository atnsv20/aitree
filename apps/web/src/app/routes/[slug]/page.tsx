import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { AINode } from "@aitree/types";
import { api, SITE_URL } from "@/lib/api";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { StatusBadge } from "@/components/ui/Badges";
import { SourceList } from "@/components/content/SourceList";
import { RouteHeader } from "@/components/routes/RouteHeader";
import { CapabilityIndexCard } from "@/components/routes/CapabilityIndexCard";
import { RouteExplorer } from "@/components/routes/RouteExplorer";
import { formatDate } from "@/lib/format";

export async function generateStaticParams() {
  const routes = await api.routes();
  return routes.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const route = await api.route(slug);
  if (!route) return { title: "Route not found" };
  return {
    title: route.title,
    description: route.description,
    alternates: { canonical: `${SITE_URL}/routes/${route.slug}` },
    openGraph: {
      title: route.title,
      description: route.description,
      url: `${SITE_URL}/routes/${route.slug}`,
    },
  };
}

function NodeList({ nodes }: { nodes: AINode[] }) {
  if (nodes.length === 0)
    return <p className="text-sm text-slate-500">None.</p>;
  return (
    <ul className="flex flex-col gap-2">
      {nodes.map((node) => (
        <li key={node.slug}>
          <Link
            href={`/nodes/${node.slug}`}
            className="panel panel-hover flex items-center justify-between gap-3 p-3"
          >
            <span className="font-medium text-slate-700">{node.title}</span>
            <StatusBadge status={node.status} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-20">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-3 text-slate-600">{children}</div>
    </section>
  );
}

export default async function RouteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [route, allRoutes] = await Promise.all([api.route(slug), api.routes()]);
  if (!route) notFound();

  const routeNames: Record<string, string> = Object.fromEntries(
    allRoutes.map((r) => [r.slug, r.shortTitle])
  );

  const unlockedNodes = route.nodes.filter(
    (n) => n.status === "achieved" || n.status === "active"
  );
  const lockedNodes = route.nodes.filter(
    (n) => n.status !== "achieved" && n.status !== "active"
  );
  const recentEvents = route.events.slice(0, 5);
  const allSources = Array.from(
    new Set(route.events.flatMap((e) => e.sourceUrls))
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${route.title} — evidence timeline`,
    description: route.description,
    numberOfItems: route.events.length,
    itemListElement: route.events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.title,
      url: `${SITE_URL}/events/${e.slug}`,
    })),
  };

  return (
    <div className="container-page py-10">
      <JsonLd data={jsonLd} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Routes", href: "/routes" },
          { label: route.shortTitle, href: `/routes/${route.slug}` },
        ]}
      />

      <RouteHeader route={route} />

      <div className="mt-6">
        <CapabilityIndexCard route={route} />
      </div>

      {/* Interactive tree + timeline */}
      <div className="mt-10">
        <RouteExplorer
          routeSlug={route.slug}
          nodes={route.nodes}
          events={route.events}
          routeNames={routeNames}
        />
      </div>

      {/* GEO-friendly crawlable sections */}
      <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
        <div className="space-y-12 lg:col-span-2">
          <Section id="definition" title="Definition">
            <p>{route.description}</p>
          </Section>

          <Section id="unlocked-nodes" title="Unlocked Nodes">
            <p className="mb-3 text-slate-500">
              Capabilities that mostly exist today or are progressing quickly.
            </p>
            <NodeList nodes={unlockedNodes} />
          </Section>

          <Section id="locked-nodes" title="Locked &amp; Emerging Nodes">
            <p className="mb-3 text-slate-500">
              Capabilities that are not yet meaningfully available, are only
              emerging, or have contested evidence.
            </p>
            <NodeList nodes={lockedNodes} />
          </Section>

          <Section id="recent-events" title="Recent Timeline Events">
            <ul className="flex flex-col gap-3">
              {recentEvents.map((event) => (
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
                    <p className="mt-1 text-sm text-slate-500">
                      {event.summary}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="why-it-matters" title="Why This Route Matters">
            <p>
              {route.title} captures one of the most consequential frontiers of
              AI progress. Tracking it as an evidence-based Capability Index —
              rather than a vague countdown to AGI — makes it possible to see
              which concrete capabilities have been unlocked, which remain
              locked, and what specific evidence is moving the score in either
              direction.
            </p>
          </Section>

          <Section id="limitations" title="Limitations">
            <p>
              The Capability Index for this route is currently maintained
              manually and reflects a curated set of {route.events.length}{" "}
              tracked events. It is a directional indicator, not a precise
              forecast. Confidence is graded{" "}
              <span className="font-semibold">{route.confidence}</span>, and
              individual event deltas are estimates that may be revised as more
              evidence emerges.
            </p>
          </Section>
        </div>

        <aside className="space-y-12">
          <Section id="methodology" title="Methodology">
            <p className="text-slate-500">
              Learn how the Capability Index is calculated and how each evidence
              event contributes a score delta.
            </p>
            <Link
              href="/methodology"
              className="mt-3 inline-block text-sm font-medium text-accent-600 hover:text-accent-700"
            >
              Read the full methodology →
            </Link>
          </Section>

          <Section id="sources" title="Sources">
            <SourceList urls={allSources} />
          </Section>
        </aside>
      </div>
    </div>
  );
}

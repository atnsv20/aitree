import Link from "next/link";
import { api } from "@/lib/api";
import { RadialRouteSelector } from "@/components/home/RadialRouteSelector";
import { RouteCard } from "@/components/home/RouteCard";
import { LatestEvents } from "@/components/home/LatestEvents";
import { BlogCard } from "@/components/content/BlogCard";
import { SectionHeading } from "@/components/ui/Section";

export default async function HomePage() {
  const [routes, events, posts] = await Promise.all([
    api.routes(),
    api.events(),
    api.blog(),
  ]);

  const featured = routes.filter((r) => r.capabilityIndex >= 60).slice(0, 4);
  const featuredRoutes = featured.length > 0 ? featured : routes.slice(0, 4);
  const latestEvents = events.slice(0, 5);
  const latestPosts = posts.slice(0, 3);

  return (
    <div className="container-page py-12">
      {/* 1. Hero + 2. Radial selector */}
      <section className="relative overflow-hidden rounded-2xl border border-line bg-surface-subtle px-6 py-14 grid-bg">
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent-200 bg-accent-50 px-3 py-1 text-xs font-medium text-accent-700">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-600" />
            Evidence-based AI capability tracking
          </span>
          <h1 className="mt-5 text-balance text-4xl font-bold sm:text-5xl">
            The AI Progress Map
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg text-slate-500">
            A tech tree for substrate-independent intelligence. Explore
            development routes, track a{" "}
            <strong className="text-slate-900">Capability Index</strong> for
            each, and follow the evidence behind every move &mdash; not a
            percentage to AGI.
          </p>
        </div>

        <div className="relative mt-12">
          <RadialRouteSelector routes={routes} />
        </div>
      </section>

      {/* 3. Latest events */}
      <section className="mt-16">
        <SectionHeading
          title="Latest AI progress events"
          subtitle="Recent evidence that moved the Capability Index."
          href="/routes"
          linkLabel="Explore routes"
        />
        <LatestEvents events={latestEvents} routes={routes} />
      </section>

      {/* 4. Featured routes */}
      <section className="mt-16">
        <SectionHeading
          title="Featured routes"
          subtitle="The fastest-moving frontiers right now."
          href="/routes"
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredRoutes.map((route) => (
            <RouteCard key={route.slug} route={route} />
          ))}
        </div>
      </section>

      {/* 5. Methodology preview */}
      <section className="mt-16">
        <div className="panel flex flex-col gap-4 p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold">How scoring works</h2>
            <p className="mt-2 text-slate-500">
              The Capability Index blends benchmark progress, real-world
              adoption, accessibility and cost, reliability, and research
              momentum &mdash; and subtracts for safety and reliability
              concerns. Each event on a route&apos;s timeline carries a
              transparent score delta.
            </p>
          </div>
          <Link
            href="/methodology"
            className="shrink-0 rounded-lg bg-slate-900 px-5 py-3 font-medium text-white transition-colors hover:bg-slate-700"
          >
            Read the methodology →
          </Link>
        </div>
      </section>

      {/* 6. Latest blog posts */}
      {latestPosts.length > 0 && (
        <section className="mt-16">
          <SectionHeading
            title="Latest from the blog"
            subtitle="Analysis of where AI progress is heading."
            href="/blog"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

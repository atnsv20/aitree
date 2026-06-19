import type { Metadata } from "next";
import { api, SITE_URL } from "@/lib/api";
import { RouteCard } from "@/components/home/RouteCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "All AI Routes",
  description:
    "Browse every tracked AI development route and its Capability Index, momentum, and confidence grade.",
  alternates: { canonical: `${SITE_URL}/routes` },
};

export default async function RoutesIndexPage() {
  const routes = await api.routes();

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Routes", href: "/routes" },
        ]}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">AI Development Routes</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-500">
        Each route tracks progress toward a distinct AI capability frontier with
        an evidence-based Capability Index. Select a route to explore its tech
        tree and chronological evidence timeline.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route) => (
          <RouteCard key={route.slug} route={route} />
        ))}
      </div>
    </div>
  );
}

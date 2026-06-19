import type { Metadata } from "next";
import { api, SITE_URL } from "@/lib/api";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LatestEvents } from "@/components/home/LatestEvents";

export const metadata: Metadata = {
  title: "AI Progress Events",
  description:
    "A chronological feed of evidence events — model releases, benchmarks, research, launches, and regulation — that move the Capability Index.",
  alternates: { canonical: `${SITE_URL}/events` },
};

export default async function EventsIndexPage() {
  const [events, routes] = await Promise.all([api.events(), api.routes()]);

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Events", href: "/events" },
        ]}
      />
      <h1 className="text-3xl font-bold sm:text-4xl">AI Progress Events</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-500">
        Every tracked evidence event, newest first. Each carries a transparent
        score impact on one or more routes.
      </p>
      <div className="mt-8">
        <LatestEvents events={events} routes={routes} />
      </div>
    </div>
  );
}

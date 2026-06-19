import Link from "next/link";
import type { AIEvent, AIRoute } from "@aitree/types";
import { cn, formatDate, formatDelta } from "@/lib/format";
import { EventTypeBadge } from "@/components/ui/Badges";

export function LatestEvents({
  events,
  routes,
}: {
  events: AIEvent[];
  routes: AIRoute[];
}) {
  const routeName = new Map(routes.map((r) => [r.slug, r.shortTitle]));
  return (
    <div className="flex flex-col gap-3">
      {events.map((event) => (
        <Link
          key={event.slug}
          href={`/events/${event.slug}`}
          className="panel panel-hover flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <time dateTime={event.date}>{formatDate(event.date)}</time>
              <EventTypeBadge eventType={event.eventType} />
            </div>
            <h3 className="mt-1 truncate font-medium text-slate-900">
              {event.title}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-sm text-slate-500">
              {event.summary}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-1.5">
            {event.affectedRoutes.map((impact) => (
              <span
                key={impact.routeSlug}
                className={cn(
                  "rounded-md border px-2 py-1 text-xs font-medium",
                  impact.delta >= 0
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-rose-200 bg-rose-50 text-rose-700"
                )}
              >
                {routeName.get(impact.routeSlug) ?? impact.routeSlug}{" "}
                {formatDelta(impact.delta)}
              </span>
            ))}
          </div>
        </Link>
      ))}
    </div>
  );
}

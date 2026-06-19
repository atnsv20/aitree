"use client";

import Link from "next/link";
import type { AIEvent } from "@aitree/types";
import { cn, formatDate, formatDelta } from "@/lib/format";
import { ConfidenceGrade, EventTypeBadge } from "@/components/ui/Badges";

type Props = {
  event: AIEvent;
  routeSlug: string;
  routeNames: Map<string, string>;
  related: boolean;
  onHover: (slugs: string[] | null) => void;
};

export function EventTimelineCard({
  event,
  routeSlug,
  routeNames,
  related,
  onHover,
}: Props) {
  const ownDelta = event.affectedRoutes.find(
    (r) => r.routeSlug === routeSlug
  )?.delta;

  return (
    <div
      onMouseEnter={() => onHover(event.affectedNodeSlugs)}
      onMouseLeave={() => onHover(null)}
      className="relative ml-10 mb-4"
    >
      {/* timeline dot */}
      <span
        className={cn(
          "absolute -left-[33px] top-4 h-3 w-3 rounded-full border-2 border-white",
          ownDelta === undefined
            ? "bg-slate-400"
            : ownDelta >= 0
              ? "bg-emerald-500"
              : "bg-rose-500"
        )}
      />
      <article
        className={cn(
          "panel p-4 transition-all duration-200",
          related ? "border-accent-300 shadow-soft-md" : "panel-hover"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <time dateTime={event.date} className="text-xs text-slate-400">
            {formatDate(event.date)}
          </time>
          <div className="flex items-center gap-2">
            <EventTypeBadge eventType={event.eventType} />
            <ConfidenceGrade confidence={event.confidence} />
          </div>
        </div>

        <h3 className="mt-2 font-semibold text-slate-900">
          <Link href={`/events/${event.slug}`} className="hover:text-accent-700">
            {event.title}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-slate-500">{event.summary}</p>

        {/* impacts */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {event.affectedRoutes.map((impact) => (
            <span
              key={impact.routeSlug}
              className={cn(
                "rounded-md border px-2 py-0.5 text-xs font-medium",
                impact.delta >= 0
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-rose-200 bg-rose-50 text-rose-700"
              )}
            >
              {routeNames.get(impact.routeSlug) ?? impact.routeSlug}{" "}
              {formatDelta(impact.delta)}
            </span>
          ))}
        </div>

        <p className="mt-3 border-t border-line pt-3 text-sm text-slate-500">
          <span className="font-medium text-slate-700">Why it matters: </span>
          {event.whyItMatters}
        </p>
      </article>
    </div>
  );
}

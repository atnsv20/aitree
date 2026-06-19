"use client";

import { useMemo, useState } from "react";
import type { AIEvent, EventType } from "@aitree/types";
import { cn } from "@/lib/format";
import { EventTimelineCard } from "./EventTimelineCard";

type FilterKey = "all" | "positive" | "negative" | EventType;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "positive", label: "Positive" },
  { key: "negative", label: "Negative" },
  { key: "benchmark", label: "Benchmarks" },
  { key: "model-release", label: "Model releases" },
  { key: "research-paper", label: "Research" },
  { key: "product-launch", label: "Launches" },
  { key: "regulation", label: "Regulation" },
  { key: "safety-incident", label: "Safety" },
];

type Props = {
  events: AIEvent[];
  routeSlug: string;
  routeNames: Map<string, string>;
  selectedNode: string | null;
  selectedNodeTitle: string | null;
  onClearNode: () => void;
  onHoverEvent: (slugs: string[] | null) => void;
};

export function EventTimeline({
  events,
  routeSlug,
  routeNames,
  selectedNode,
  selectedNodeTitle,
  onClearNode,
  onHoverEvent,
}: Props) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [onlyNode, setOnlyNode] = useState(false);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const own = e.affectedRoutes.find((r) => r.routeSlug === routeSlug)?.delta;
      if (filter === "positive" && !(own !== undefined && own > 0)) return false;
      if (filter === "negative" && !(own !== undefined && own < 0)) return false;
      if (
        filter !== "all" &&
        filter !== "positive" &&
        filter !== "negative" &&
        e.eventType !== filter
      ) {
        return false;
      }
      if (onlyNode && selectedNode && !e.affectedNodeSlugs.includes(selectedNode)) {
        return false;
      }
      return true;
    });
  }, [events, filter, onlyNode, selectedNode, routeSlug]);

  return (
    <div className="flex flex-col">
      {/* filter bar */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              filter === f.key
                ? "border-accent-200 bg-accent-50 text-accent-700"
                : "border-line bg-white text-slate-500 hover:text-slate-900"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* selected-node filter toggle */}
      {selectedNode && (
        <div className="mb-4 flex items-center justify-between rounded-lg border border-accent-200 bg-accent-50 px-3 py-2 text-sm">
          <span className="text-accent-700">
            Selected node:{" "}
            <span className="font-semibold">{selectedNodeTitle}</span>
          </span>
          <div className="flex items-center gap-3">
            <label className="flex cursor-pointer items-center gap-1.5 text-accent-700">
              <input
                type="checkbox"
                checked={onlyNode}
                onChange={(e) => setOnlyNode(e.target.checked)}
                className="accent-accent-600"
              />
              Only this node
            </label>
            <button
              type="button"
              onClick={() => {
                setOnlyNode(false);
                onClearNode();
              }}
              className="text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* vertical timeline */}
      <div className="relative">
        <div className="absolute bottom-2 left-1.5 top-2 w-px bg-line" />
        {filtered.length === 0 ? (
          <p className="ml-10 text-sm text-slate-400">
            No events match this filter.
          </p>
        ) : (
          filtered.map((event) => (
            <EventTimelineCard
              key={event.slug}
              event={event}
              routeSlug={routeSlug}
              routeNames={routeNames}
              related={
                selectedNode
                  ? event.affectedNodeSlugs.includes(selectedNode)
                  : false
              }
              onHover={onHoverEvent}
            />
          ))
        )}
      </div>
    </div>
  );
}

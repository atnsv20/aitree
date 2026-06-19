"use client";

import { cn } from "@/lib/format";

export type RouteTab = "tree" | "timeline";

export function RouteTabs({
  active,
  onChange,
  eventCount,
  nodeCount,
}: {
  active: RouteTab;
  onChange: (tab: RouteTab) => void;
  eventCount: number;
  nodeCount: number;
}) {
  const base =
    "flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors";
  return (
    <div className="mb-4 flex gap-2 lg:hidden">
      <button
        type="button"
        onClick={() => onChange("tree")}
        className={cn(
          base,
          active === "tree"
            ? "border-accent-200 bg-accent-50 text-accent-700"
            : "border-line bg-white text-slate-500"
        )}
      >
        Tree ({nodeCount})
      </button>
      <button
        type="button"
        onClick={() => onChange("timeline")}
        className={cn(
          base,
          active === "timeline"
            ? "border-accent-200 bg-accent-50 text-accent-700"
            : "border-line bg-white text-slate-500"
        )}
      >
        Timeline ({eventCount})
      </button>
    </div>
  );
}

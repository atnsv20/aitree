"use client";

import type { AINode } from "@aitree/types";
import { cn } from "@/lib/format";
import { statusStyles } from "@/lib/theme";
import { toLeftPct, toTopPct } from "./TreeConstants";

type Props = {
  node: AINode;
  selected: boolean;
  highlighted: boolean;
  dimmed: boolean;
  onSelect: (slug: string) => void;
};

export function TreeNodeCard({
  node,
  selected,
  highlighted,
  dimmed,
  onSelect,
}: Props) {
  const s = statusStyles[node.status];
  return (
    <button
      type="button"
      onClick={() => onSelect(node.slug)}
      aria-pressed={selected}
      className={cn(
        "absolute z-10 w-40 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white p-3 text-left shadow-soft transition-all duration-200",
        s.ring,
        "hover:shadow-soft-md",
        selected && "scale-105 border-accent-600 ring-2 ring-accent-600/40",
        highlighted && !selected && "border-accent-200 ring-2 ring-accent-200",
        dimmed && "opacity-40"
      )}
      style={{
        left: `${toLeftPct(node.position.x)}%`,
        top: `${toTopPct(node.position.y)}%`,
      }}
    >
      <div className="flex items-center gap-1.5">
        <span className={cn("h-2 w-2 shrink-0 rounded-full", s.dot)} />
        <span className="truncate text-sm font-semibold text-slate-900">
          {node.title}
        </span>
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-wide text-slate-400">
        {s.label}
      </div>
    </button>
  );
}

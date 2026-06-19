"use client";

import { useMemo, useState } from "react";
import type { AIEvent, AINode } from "@aitree/types";
import { cn } from "@/lib/format";
import { RouteTree } from "./RouteTree";
import { EventTimeline } from "./EventTimeline";
import { RouteTabs, type RouteTab } from "./RouteTabs";

type Props = {
  routeSlug: string;
  nodes: AINode[];
  events: AIEvent[];
  routeNames: Record<string, string>;
};

export function RouteExplorer({
  routeSlug,
  nodes,
  events,
  routeNames,
}: Props) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredEventNodes, setHoveredEventNodes] = useState<string[] | null>(
    null
  );
  const [tab, setTab] = useState<RouteTab>("tree");

  const routeNameMap = useMemo(
    () => new Map(Object.entries(routeNames)),
    [routeNames]
  );
  const highlightedSlugs = useMemo(
    () => new Set(hoveredEventNodes ?? []),
    [hoveredEventNodes]
  );
  const selectedNodeTitle =
    nodes.find((n) => n.slug === selectedNode)?.title ?? null;

  const onSelect = (slug: string) =>
    setSelectedNode((cur) => (cur === slug ? null : slug));

  return (
    <div>
      <RouteTabs
        active={tab}
        onChange={setTab}
        eventCount={events.length}
        nodeCount={nodes.length}
      />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: tree */}
        <div className={cn(tab === "tree" ? "block" : "hidden", "lg:block")}>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Route Tree</h2>
            <span className="text-xs text-slate-500">
              Click a node to highlight its evidence
            </span>
          </div>
          <RouteTree
            nodes={nodes}
            selectedSlug={selectedNode}
            highlightedSlugs={highlightedSlugs}
            onSelect={onSelect}
          />
        </div>

        {/* Right: timeline */}
        <div
          className={cn(tab === "timeline" ? "block" : "hidden", "lg:block")}
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Evidence Timeline</h2>
            <span className="text-xs text-slate-500">
              {events.length} tracked events
            </span>
          </div>
          <EventTimeline
            events={events}
            routeSlug={routeSlug}
            routeNames={routeNameMap}
            selectedNode={selectedNode}
            selectedNodeTitle={selectedNodeTitle}
            onClearNode={() => setSelectedNode(null)}
            onHoverEvent={setHoveredEventNodes}
          />
        </div>
      </div>
    </div>
  );
}

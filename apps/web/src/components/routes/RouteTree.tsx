"use client";

import type { AINode } from "@aitree/types";
import { TreeConnectionLines } from "./TreeConnectionLines";
import { TreeNodeCard } from "./TreeNodeCard";

type Props = {
  nodes: AINode[];
  selectedSlug: string | null;
  highlightedSlugs: Set<string>;
  onSelect: (slug: string) => void;
};

export function RouteTree({
  nodes,
  selectedSlug,
  highlightedSlugs,
  onSelect,
}: Props) {
  const hasHighlight = highlightedSlugs.size > 0;
  return (
    <div className="panel relative h-[480px] w-full overflow-hidden bg-surface-subtle grid-bg sm:h-[560px]">
      <TreeConnectionLines
        nodes={nodes}
        selectedSlug={selectedSlug}
        highlightedSlugs={highlightedSlugs}
      />
      {nodes.map((node) => (
        <TreeNodeCard
          key={node.slug}
          node={node}
          selected={selectedSlug === node.slug}
          highlighted={highlightedSlugs.has(node.slug)}
          dimmed={hasHighlight && !highlightedSlugs.has(node.slug)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

import type { AINode } from "@aitree/types";
import { TREE_LOGICAL_H, TREE_LOGICAL_W } from "./TreeConstants";

type Props = {
  nodes: AINode[];
  selectedSlug: string | null;
  highlightedSlugs: Set<string>;
};

export function TreeConnectionLines({
  nodes,
  selectedSlug,
  highlightedSlugs,
}: Props) {
  const bySlug = new Map(nodes.map((n) => [n.slug, n]));

  const edges: { from: AINode; to: AINode; emphasized: boolean }[] = [];
  for (const node of nodes) {
    for (const parentSlug of node.parentSlugs) {
      const parent = bySlug.get(parentSlug);
      if (!parent) continue;
      const emphasized =
        selectedSlug === node.slug ||
        selectedSlug === parent.slug ||
        highlightedSlugs.has(node.slug) ||
        highlightedSlugs.has(parent.slug);
      edges.push({ from: parent, to: node, emphasized });
    }
  }

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox={`0 0 ${TREE_LOGICAL_W} ${TREE_LOGICAL_H}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.from.position.x}
          y1={e.from.position.y}
          x2={e.to.position.x}
          y2={e.to.position.y}
          stroke={e.emphasized ? "rgba(79,70,229,0.7)" : "rgba(148,163,184,0.6)"}
          strokeWidth={e.emphasized ? 2 : 1.25}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

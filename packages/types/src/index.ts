/**
 * Shared domain DTOs and enums for the AI Progress Tech Tree.
 *
 * These describe the JSON shape returned by the Express API and consumed by the
 * Next.js web app. Dates are serialized as ISO strings.
 */

export type Momentum = "slow" | "medium" | "fast" | "very-fast";

export type Confidence = "A" | "B" | "C" | "D";

export type NodeStatus =
  | "locked"
  | "emerging"
  | "active"
  | "achieved"
  | "contested"
  | "dangerous";

export type EventType =
  | "model-release"
  | "benchmark"
  | "research-paper"
  | "product-launch"
  | "adoption"
  | "regulation"
  | "safety-incident"
  | "expert-analysis";

/** A capability node positioned on a route's tech tree. */
export type AINode = {
  slug: string;
  routeSlug: string;
  title: string;
  description: string;
  status: NodeStatus;
  position: {
    x: number;
    y: number;
  };
  scoreContribution: number;
  parentSlugs: string[];
  relatedEventSlugs: string[];
  relatedBlogSlugs: string[];
};

/** Per-route score impact of an event. */
export type RouteImpact = {
  routeSlug: string;
  delta: number;
};

/** A dated evidence event that affects one or more routes. */
export type AIEvent = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  whyItMatters: string;
  eventType: EventType;
  confidence: Confidence;
  sourceUrls: string[];
  affectedRoutes: RouteImpact[];
  affectedNodeSlugs: string[];
};

/** A development route tracked by a Capability Index. */
export type AIRoute = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  capabilityIndex: number;
  momentum: Momentum;
  confidence: Confidence;
  lastUpdated: string;
  colorToken: string;
  nodeSlugs: string[];
  relatedEventSlugs: string[];
  relatedBlogSlugs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  routeSlugs: string[];
  nodeSlugs: string[];
  eventSlugs: string[];
  content: string;
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  definition: string;
  relatedRouteSlugs: string[];
  relatedNodeSlugs: string[];
};

/**
 * Expanded route payload returned by GET /api/routes/:slug, with the related
 * nodes, events and blog posts hydrated for the detail page.
 */
export type RouteDetail = AIRoute & {
  nodes: AINode[];
  events: AIEvent[];
  blogPosts: BlogPost[];
};

/** Expanded node payload returned by GET /api/nodes/:slug. */
export type NodeDetail = AINode & {
  route: AIRoute;
  events: AIEvent[];
  blogPosts: BlogPost[];
};

/** Expanded event payload returned by GET /api/events/:slug. */
export type EventDetail = AIEvent & {
  routes: AIRoute[];
  nodes: AINode[];
};

/** Expanded blog payload returned by GET /api/blog/:slug. */
export type BlogDetail = BlogPost & {
  routes: AIRoute[];
  nodes: AINode[];
  events: AIEvent[];
};

/** Expanded glossary payload returned by GET /api/glossary/:slug. */
export type GlossaryDetail = GlossaryTerm & {
  relatedRoutes: AIRoute[];
  relatedNodes: AINode[];
};

export const MOMENTUM_LABELS: Record<Momentum, string> = {
  slow: "Slow",
  medium: "Medium",
  fast: "Fast",
  "very-fast": "Very Fast",
};

export const MOMENTUM_ARROWS: Record<Momentum, string> = {
  slow: "↓",
  medium: "→",
  fast: "↑",
  "very-fast": "↑↑",
};

export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  "model-release": "Model Release",
  benchmark: "Benchmark",
  "research-paper": "Research Paper",
  "product-launch": "Product Launch",
  adoption: "Adoption",
  regulation: "Regulation",
  "safety-incident": "Safety Incident",
  "expert-analysis": "Expert Analysis",
};

export const NODE_STATUS_LABELS: Record<NodeStatus, string> = {
  locked: "Locked",
  emerging: "Emerging",
  active: "Active",
  achieved: "Achieved",
  contested: "Contested",
  dangerous: "Dangerous",
};

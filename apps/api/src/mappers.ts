import { Prisma } from "@prisma/client";
import type {
  AIEvent,
  AINode,
  AIRoute,
  BlogPost,
  GlossaryTerm,
} from "@aitree/types";
import {
  toConfidenceDto,
  toEventTypeDto,
  toMomentumDto,
  toStatusDto,
} from "./lib/enums.js";

// ---- Include shapes (reused by services) ----

export const routeInclude = {
  nodes: { select: { slug: true } },
  eventImpacts: { select: { event: { select: { slug: true } } } },
  blogPosts: { select: { slug: true } },
} satisfies Prisma.RouteInclude;

export const nodeInclude = {
  parents: { select: { slug: true } },
  events: { select: { slug: true } },
  blogPosts: { select: { slug: true } },
} satisfies Prisma.NodeInclude;

export const eventInclude = {
  routeImpacts: {
    select: { delta: true, route: { select: { slug: true } } },
  },
  nodes: { select: { slug: true } },
} satisfies Prisma.EventInclude;

export const blogInclude = {
  routes: { select: { slug: true } },
  nodes: { select: { slug: true } },
  events: { select: { slug: true } },
} satisfies Prisma.BlogPostInclude;

export const glossaryInclude = {
  routes: { select: { slug: true } },
  nodes: { select: { slug: true } },
} satisfies Prisma.GlossaryTermInclude;

type RouteRow = Prisma.RouteGetPayload<{ include: typeof routeInclude }>;
type NodeRow = Prisma.NodeGetPayload<{ include: typeof nodeInclude }>;
type EventRow = Prisma.EventGetPayload<{ include: typeof eventInclude }>;
type BlogRow = Prisma.BlogPostGetPayload<{ include: typeof blogInclude }>;
type GlossaryRow = Prisma.GlossaryTermGetPayload<{
  include: typeof glossaryInclude;
}>;

// ---- Mappers ----

export function mapRoute(r: RouteRow): AIRoute {
  return {
    slug: r.slug,
    title: r.title,
    shortTitle: r.shortTitle,
    description: r.description,
    capabilityIndex: r.capabilityIndex,
    momentum: toMomentumDto(r.momentum),
    confidence: toConfidenceDto(r.confidence),
    lastUpdated: r.lastUpdated.toISOString(),
    colorToken: r.colorToken,
    nodeSlugs: r.nodes.map((n) => n.slug),
    relatedEventSlugs: r.eventImpacts.map((i) => i.event.slug),
    relatedBlogSlugs: r.blogPosts.map((b) => b.slug),
  };
}

export function mapNode(n: NodeRow): AINode {
  return {
    slug: n.slug,
    routeSlug: n.routeSlug,
    title: n.title,
    description: n.description,
    status: toStatusDto(n.status),
    position: { x: n.positionX, y: n.positionY },
    scoreContribution: n.scoreContribution,
    parentSlugs: n.parents.map((p) => p.slug),
    relatedEventSlugs: n.events.map((e) => e.slug),
    relatedBlogSlugs: n.blogPosts.map((b) => b.slug),
  };
}

export function mapEvent(e: EventRow): AIEvent {
  return {
    slug: e.slug,
    title: e.title,
    date: e.date.toISOString(),
    summary: e.summary,
    whyItMatters: e.whyItMatters,
    eventType: toEventTypeDto(e.eventType),
    confidence: toConfidenceDto(e.confidence),
    sourceUrls: e.sourceUrls,
    affectedRoutes: e.routeImpacts.map((i) => ({
      routeSlug: i.route.slug,
      delta: i.delta,
    })),
    affectedNodeSlugs: e.nodes.map((n) => n.slug),
  };
}

export function mapBlog(b: BlogRow): BlogPost {
  return {
    slug: b.slug,
    title: b.title,
    description: b.description,
    date: b.date.toISOString(),
    content: b.content,
    routeSlugs: b.routes.map((r) => r.slug),
    nodeSlugs: b.nodes.map((n) => n.slug),
    eventSlugs: b.events.map((e) => e.slug),
  };
}

export function mapGlossary(g: GlossaryRow): GlossaryTerm {
  return {
    slug: g.slug,
    term: g.term,
    definition: g.definition,
    relatedRouteSlugs: g.routes.map((r) => r.slug),
    relatedNodeSlugs: g.nodes.map((n) => n.slug),
  };
}

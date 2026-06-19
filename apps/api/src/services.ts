import type {
  BlogDetail,
  BlogPost,
  EventDetail,
  GlossaryDetail,
  GlossaryTerm,
  NodeDetail,
  RouteDetail,
} from "@aitree/types";
import type { AIEvent, AINode, AIRoute } from "@aitree/types";
import { prisma } from "./db.js";
import {
  blogInclude,
  eventInclude,
  glossaryInclude,
  mapBlog,
  mapEvent,
  mapGlossary,
  mapNode,
  mapRoute,
  nodeInclude,
  routeInclude,
} from "./mappers.js";

export async function listRoutes(): Promise<AIRoute[]> {
  const rows = await prisma.route.findMany({
    include: routeInclude,
    orderBy: { orderIndex: "asc" },
  });
  return rows.map(mapRoute);
}

export async function getRoute(slug: string): Promise<RouteDetail | null> {
  const route = await prisma.route.findUnique({
    where: { slug },
    include: routeInclude,
  });
  if (!route) return null;

  const [nodeRows, eventRows, blogRows] = await Promise.all([
    prisma.node.findMany({
      where: { routeSlug: slug },
      include: nodeInclude,
      orderBy: [{ positionY: "asc" }, { positionX: "asc" }],
    }),
    prisma.event.findMany({
      where: { routeImpacts: { some: { route: { slug } } } },
      include: eventInclude,
      orderBy: { date: "desc" },
    }),
    prisma.blogPost.findMany({
      where: { routes: { some: { slug } } },
      include: blogInclude,
      orderBy: { date: "desc" },
    }),
  ]);

  return {
    ...mapRoute(route),
    nodes: nodeRows.map(mapNode),
    events: eventRows.map(mapEvent),
    blogPosts: blogRows.map(mapBlog),
  };
}

export async function getNode(slug: string): Promise<NodeDetail | null> {
  const node = await prisma.node.findUnique({
    where: { slug },
    include: nodeInclude,
  });
  if (!node) return null;

  const [route, eventRows, blogRows] = await Promise.all([
    prisma.route.findUnique({
      where: { slug: node.routeSlug },
      include: routeInclude,
    }),
    prisma.event.findMany({
      where: { nodes: { some: { slug } } },
      include: eventInclude,
      orderBy: { date: "desc" },
    }),
    prisma.blogPost.findMany({
      where: { nodes: { some: { slug } } },
      include: blogInclude,
      orderBy: { date: "desc" },
    }),
  ]);

  return {
    ...mapNode(node),
    route: route ? mapRoute(route) : (null as unknown as AIRoute),
    events: eventRows.map(mapEvent),
    blogPosts: blogRows.map(mapBlog),
  };
}

export async function listEvents(): Promise<AIEvent[]> {
  const rows = await prisma.event.findMany({
    include: eventInclude,
    orderBy: { date: "desc" },
  });
  return rows.map(mapEvent);
}

export async function getEvent(slug: string): Promise<EventDetail | null> {
  const event = await prisma.event.findUnique({
    where: { slug },
    include: eventInclude,
  });
  if (!event) return null;

  const routeSlugs = event.routeImpacts.map((i) => i.route.slug);
  const nodeSlugs = event.nodes.map((n) => n.slug);

  const [routeRows, nodeRows] = await Promise.all([
    prisma.route.findMany({
      where: { slug: { in: routeSlugs } },
      include: routeInclude,
    }),
    prisma.node.findMany({
      where: { slug: { in: nodeSlugs } },
      include: nodeInclude,
    }),
  ]);

  return {
    ...mapEvent(event),
    routes: routeRows.map(mapRoute),
    nodes: nodeRows.map(mapNode),
  };
}

export async function listBlog(): Promise<BlogPost[]> {
  const rows = await prisma.blogPost.findMany({
    include: blogInclude,
    orderBy: { date: "desc" },
  });
  return rows.map(mapBlog);
}

export async function getBlog(slug: string): Promise<BlogDetail | null> {
  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: blogInclude,
  });
  if (!post) return null;

  const [routeRows, nodeRows, eventRows] = await Promise.all([
    prisma.route.findMany({
      where: { slug: { in: post.routes.map((r) => r.slug) } },
      include: routeInclude,
    }),
    prisma.node.findMany({
      where: { slug: { in: post.nodes.map((n) => n.slug) } },
      include: nodeInclude,
    }),
    prisma.event.findMany({
      where: { slug: { in: post.events.map((e) => e.slug) } },
      include: eventInclude,
      orderBy: { date: "desc" },
    }),
  ]);

  return {
    ...mapBlog(post),
    routes: routeRows.map(mapRoute),
    nodes: nodeRows.map(mapNode),
    events: eventRows.map(mapEvent),
  };
}

export async function listGlossary(): Promise<GlossaryTerm[]> {
  const rows = await prisma.glossaryTerm.findMany({
    include: glossaryInclude,
    orderBy: { term: "asc" },
  });
  return rows.map(mapGlossary);
}

export async function getGlossary(slug: string): Promise<GlossaryDetail | null> {
  const term = await prisma.glossaryTerm.findUnique({
    where: { slug },
    include: glossaryInclude,
  });
  if (!term) return null;

  const [routeRows, nodeRows] = await Promise.all([
    prisma.route.findMany({
      where: { slug: { in: term.routes.map((r) => r.slug) } },
      include: routeInclude,
    }),
    prisma.node.findMany({
      where: { slug: { in: term.nodes.map((n) => n.slug) } },
      include: nodeInclude,
    }),
  ]);

  return {
    ...mapGlossary(term),
    relatedRoutes: routeRows.map(mapRoute),
    relatedNodes: nodeRows.map(mapNode),
  };
}

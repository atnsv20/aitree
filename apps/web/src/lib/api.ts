import type {
  AIEvent,
  AIRoute,
  BlogDetail,
  BlogPost,
  EventDetail,
  GlossaryDetail,
  GlossaryTerm,
  NodeDetail,
  RouteDetail,
} from "@aitree/types";

const API_URL = process.env.API_URL ?? "http://localhost:4000";

type FetchOpts = { revalidate?: number };

async function getJson<T>(path: string, opts: FetchOpts = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: opts.revalidate ?? 60 },
    headers: { accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`API ${path} failed: ${res.status}`);
  }
  return (await res.json()) as T;
}

/** Returns null on 404 instead of throwing (for notFound() handling). */
async function getJsonOrNull<T>(
  path: string,
  opts: FetchOpts = {}
): Promise<T | null> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: opts.revalidate ?? 60 },
    headers: { accept: "application/json" },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`API ${path} failed: ${res.status}`);
  return (await res.json()) as T;
}

export const api = {
  routes: () => getJson<AIRoute[]>("/api/routes"),
  route: (slug: string) => getJsonOrNull<RouteDetail>(`/api/routes/${slug}`),
  node: (slug: string) => getJsonOrNull<NodeDetail>(`/api/nodes/${slug}`),
  events: () => getJson<AIEvent[]>("/api/events"),
  event: (slug: string) => getJsonOrNull<EventDetail>(`/api/events/${slug}`),
  blog: () => getJson<BlogPost[]>("/api/blog"),
  blogPost: (slug: string) => getJsonOrNull<BlogDetail>(`/api/blog/${slug}`),
  glossary: () => getJson<GlossaryTerm[]>("/api/glossary"),
  glossaryTerm: (slug: string) =>
    getJsonOrNull<GlossaryDetail>(`/api/glossary/${slug}`),
};

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

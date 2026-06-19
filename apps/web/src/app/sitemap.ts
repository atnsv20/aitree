import type { MetadataRoute } from "next";
import { api, SITE_URL } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [routes, events, posts, terms] = await Promise.all([
    api.routes(),
    api.events(),
    api.blog(),
    api.glossary(),
  ]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/routes",
    "/events",
    "/blog",
    "/glossary",
    "/methodology",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const routePages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${SITE_URL}/routes/${r.slug}`,
    lastModified: new Date(r.lastUpdated),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const nodePages: MetadataRoute.Sitemap = routes
    .flatMap((r) => r.nodeSlugs)
    .map((slug) => ({
      url: `${SITE_URL}/nodes/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    }));

  const eventPages: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${SITE_URL}/events/${e.slug}`,
    lastModified: new Date(e.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const glossaryPages: MetadataRoute.Sitemap = terms.map((t) => ({
    url: `${SITE_URL}/glossary/${t.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [
    ...staticPages,
    ...routePages,
    ...nodePages,
    ...eventPages,
    ...blogPages,
    ...glossaryPages,
  ];
}

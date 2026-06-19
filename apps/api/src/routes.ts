import { Router } from "express";
import { z } from "zod";
import { asyncHandler, notFound } from "./lib/http.js";
import {
  getBlog,
  getEvent,
  getGlossary,
  getNode,
  getRoute,
  listBlog,
  listEvents,
  listGlossary,
  listRoutes,
} from "./services.js";

const slugParam = z.object({ slug: z.string().min(1).max(200) });

export const apiRouter: Router = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

apiRouter.get(
  "/routes",
  asyncHandler(async (_req, res) => {
    res.json(await listRoutes());
  })
);

apiRouter.get(
  "/routes/:slug",
  asyncHandler(async (req, res) => {
    const { slug } = slugParam.parse(req.params);
    const route = await getRoute(slug);
    if (!route) throw notFound("Route");
    res.json(route);
  })
);

apiRouter.get(
  "/nodes/:slug",
  asyncHandler(async (req, res) => {
    const { slug } = slugParam.parse(req.params);
    const node = await getNode(slug);
    if (!node) throw notFound("Node");
    res.json(node);
  })
);

apiRouter.get(
  "/events",
  asyncHandler(async (_req, res) => {
    res.json(await listEvents());
  })
);

apiRouter.get(
  "/events/:slug",
  asyncHandler(async (req, res) => {
    const { slug } = slugParam.parse(req.params);
    const event = await getEvent(slug);
    if (!event) throw notFound("Event");
    res.json(event);
  })
);

apiRouter.get(
  "/blog",
  asyncHandler(async (_req, res) => {
    res.json(await listBlog());
  })
);

apiRouter.get(
  "/blog/:slug",
  asyncHandler(async (req, res) => {
    const { slug } = slugParam.parse(req.params);
    const post = await getBlog(slug);
    if (!post) throw notFound("Blog post");
    res.json(post);
  })
);

apiRouter.get(
  "/glossary",
  asyncHandler(async (_req, res) => {
    res.json(await listGlossary());
  })
);

apiRouter.get(
  "/glossary/:slug",
  asyncHandler(async (req, res) => {
    const { slug } = slugParam.parse(req.params);
    const term = await getGlossary(slug);
    if (!term) throw notFound("Glossary term");
    res.json(term);
  })
);

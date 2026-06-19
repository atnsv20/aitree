"use client";

import Link from "next/link";
import { useState } from "react";
import type { AIRoute } from "@aitree/types";
import { cn } from "@/lib/format";
import { routeColor } from "@/lib/theme";
import { MomentumIndicator, ConfidenceGrade } from "@/components/ui/Badges";
import { RouteCard } from "./RouteCard";

const RADIUS = 268;
const CONTAINER = 660;

export function RadialRouteSelector({ routes }: { routes: AIRoute[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = routes.find((r) => r.slug === hovered) ?? null;
  const avg =
    routes.length > 0
      ? Math.round(
          routes.reduce((s, r) => s + r.capabilityIndex, 0) / routes.length
        )
      : 0;

  return (
    <div>
      {/* Desktop: radial layout */}
      <div className="relative hidden lg:block">
        <div
          className="relative mx-auto"
          style={{ width: CONTAINER, height: CONTAINER }}
        >
          {/* concentric guide rings */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[560px] w-[560px] rounded-full border border-line" />
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[380px] w-[380px] rounded-full border border-line" />
          </div>

          {/* spokes */}
          <svg
            className="pointer-events-none absolute inset-0"
            width={CONTAINER}
            height={CONTAINER}
            aria-hidden
          >
            {routes.map((route, i) => {
              const angle = -Math.PI / 2 + (i / routes.length) * Math.PI * 2;
              const x = CONTAINER / 2 + Math.cos(angle) * RADIUS;
              const y = CONTAINER / 2 + Math.sin(angle) * RADIUS;
              return (
                <line
                  key={route.slug}
                  x1={CONTAINER / 2}
                  y1={CONTAINER / 2}
                  x2={x}
                  y2={y}
                  stroke={
                    hovered === route.slug
                      ? "rgba(79,70,229,0.45)"
                      : "rgba(15,23,42,0.07)"
                  }
                  strokeWidth={hovered === route.slug ? 1.5 : 1}
                />
              );
            })}
          </svg>

          {/* central hub */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <CenterHub active={active} avg={avg} routeCount={routes.length} />
          </div>

          {/* orbs */}
          {routes.map((route, i) => {
            const angle = -Math.PI / 2 + (i / routes.length) * Math.PI * 2;
            const x = Math.cos(angle) * RADIUS;
            const y = Math.sin(angle) * RADIUS;
            const c = routeColor(route.colorToken);
            return (
              <Link
                key={route.slug}
                href={`/routes/${route.slug}`}
                onMouseEnter={() => setHovered(route.slug)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(route.slug)}
                onBlur={() => setHovered(null)}
                className={cn(
                  "absolute z-20 flex w-36 flex-col items-center gap-1 rounded-xl border bg-white p-3 text-center shadow-soft",
                  "transition-all duration-200 hover:shadow-soft-md",
                  c.border,
                  c.hoverBorder,
                  hovered === route.slug && "scale-105"
                )}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className={cn("text-sm font-semibold", c.text)}>
                  {route.shortTitle}
                </span>
                <span className="text-2xl font-bold text-slate-900">
                  {route.capabilityIndex}
                </span>
                <MomentumIndicator
                  momentum={route.momentum}
                  className="text-xs"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile / tablet: card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden">
        {routes.map((route) => (
          <RouteCard key={route.slug} route={route} />
        ))}
      </div>
    </div>
  );
}

function CenterHub({
  active,
  avg,
  routeCount,
}: {
  active: AIRoute | null;
  avg: number;
  routeCount: number;
}) {
  if (active) {
    const c = routeColor(active.colorToken);
    return (
      <div
        className={cn(
          "flex h-52 w-52 flex-col items-center justify-center gap-2 rounded-full border bg-white p-6 text-center shadow-soft-md",
          c.border
        )}
      >
        <span className={cn("text-sm font-semibold", c.text)}>
          {active.title}
        </span>
        <p className="line-clamp-3 text-xs text-slate-500">
          {active.description}
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ConfidenceGrade confidence={active.confidence} className="h-5 w-5" />
          <MomentumIndicator momentum={active.momentum} />
        </div>
      </div>
    );
  }
  return (
    <div className="flex h-52 w-52 flex-col items-center justify-center gap-1 rounded-full border border-slate-200 bg-white p-6 text-center shadow-soft-md">
      <span className="text-xs uppercase tracking-widest text-accent-600">
        AI Progress Map
      </span>
      <span className="text-4xl font-bold text-slate-900">{avg}</span>
      <span className="text-xs text-slate-400">avg capability index</span>
      <span className="mt-1 text-xs text-slate-400">
        {routeCount} routes tracked
      </span>
    </div>
  );
}

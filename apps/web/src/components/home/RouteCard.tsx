import Link from "next/link";
import type { AIRoute } from "@aitree/types";
import { cn } from "@/lib/format";
import { routeColor } from "@/lib/theme";
import { MomentumIndicator, ConfidenceGrade } from "@/components/ui/Badges";

export function RouteCard({ route }: { route: AIRoute }) {
  const c = routeColor(route.colorToken);
  return (
    <Link
      href={`/routes/${route.slug}`}
      className={cn(
        "panel panel-hover group flex flex-col gap-3 p-5",
        c.hoverBorder
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className={cn("text-lg font-semibold", c.text)}>{route.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
            {route.description}
          </p>
        </div>
        <ConfidenceGrade confidence={route.confidence} />
      </div>
      <div className="mt-auto flex items-end justify-between pt-2">
        <div>
          <div className="text-xs uppercase tracking-wide text-slate-400">
            Capability Index
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-slate-900">
              {route.capabilityIndex}
            </span>
            <span className="text-sm text-slate-400">/ 100</span>
          </div>
        </div>
        <MomentumIndicator momentum={route.momentum} className="text-sm" />
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={cn("h-full rounded-full", c.bar)}
          style={{ width: `${route.capabilityIndex}%` }}
        />
      </div>
    </Link>
  );
}

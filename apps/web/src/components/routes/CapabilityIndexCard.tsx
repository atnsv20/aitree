import type { AIRoute } from "@aitree/types";
import { cn } from "@/lib/format";
import { routeColor } from "@/lib/theme";

export function CapabilityIndexCard({ route }: { route: AIRoute }) {
  const c = routeColor(route.colorToken);
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - route.capabilityIndex / 100);

  return (
    <div className="panel flex items-center gap-5 p-6">
      <div className="relative h-32 w-32 shrink-0">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#e7e7ea"
            strokeWidth="10"
          />
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={c.text}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-slate-900">
            {route.capabilityIndex}
          </span>
          <span className="text-xs text-slate-400">/ 100</span>
        </div>
      </div>
      <div>
        <h2 className={cn("text-sm font-semibold uppercase tracking-wide", c.text)}>
          Capability Index
        </h2>
        <p className="mt-1 max-w-xs text-sm text-slate-500">
          A 0&ndash;100 measure of how far this route has progressed across
          benchmarks, adoption, cost, reliability, and research momentum. Not a
          percentage to AGI.
        </p>
      </div>
    </div>
  );
}

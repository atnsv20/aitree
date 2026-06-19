import type { RouteDetail } from "@aitree/types";
import { formatMonthYear } from "@/lib/format";
import {
  ConfidenceGrade,
  MomentumIndicator,
} from "@/components/ui/Badges";

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-line bg-surface-subtle px-4 py-3">
      <div className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </div>
      <div className="mt-1 text-lg font-semibold text-slate-900">{value}</div>
    </div>
  );
}

export function RouteHeader({ route }: { route: RouteDetail }) {
  const unlocked = route.nodes.filter(
    (n) => n.status === "achieved" || n.status === "active"
  ).length;

  return (
    <header>
      <h1 className="text-3xl font-bold sm:text-4xl">{route.title}</h1>
      <p className="mt-3 max-w-3xl text-lg text-slate-500">
        {route.description}
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat
          label="Capability Index"
          value={`${route.capabilityIndex} / 100`}
        />
        <Stat
          label="Momentum"
          value={<MomentumIndicator momentum={route.momentum} className="text-lg" />}
        />
        <Stat
          label="Confidence"
          value={<ConfidenceGrade confidence={route.confidence} />}
        />
        <Stat label="Last updated" value={formatMonthYear(route.lastUpdated)} />
        <Stat label="Tracked events" value={route.events.length} />
        <Stat label="Unlocked nodes" value={`${unlocked} of ${route.nodes.length}`} />
      </div>
    </header>
  );
}

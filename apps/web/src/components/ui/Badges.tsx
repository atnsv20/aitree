import type { Confidence, EventType, Momentum, NodeStatus } from "@aitree/types";
import { cn } from "@/lib/format";
import {
  confidenceStyles,
  eventTypeStyles,
  momentumStyles,
  statusStyles,
} from "@/lib/theme";

export function StatusBadge({
  status,
  className,
}: {
  status: NodeStatus;
  className?: string;
}) {
  const s = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        s.badge,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", s.dot)} />
      {s.label}
    </span>
  );
}

export function MomentumIndicator({
  momentum,
  className,
}: {
  momentum: Momentum;
  className?: string;
}) {
  const m = momentumStyles[momentum];
  return (
    <span className={cn("inline-flex items-center gap-1 font-medium", m.text, className)}>
      {m.label}
      <span aria-hidden>{m.arrow}</span>
    </span>
  );
}

export function ConfidenceGrade({
  confidence,
  className,
}: {
  confidence: Confidence;
  className?: string;
}) {
  const c = confidenceStyles[confidence];
  return (
    <span
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-md border text-xs font-bold",
        c.bg,
        c.text,
        className
      )}
      title={`Confidence grade ${confidence}`}
    >
      {confidence}
    </span>
  );
}

export function EventTypeBadge({
  eventType,
  className,
}: {
  eventType: EventType;
  className?: string;
}) {
  const e = eventTypeStyles[eventType];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        e.badge,
        className
      )}
    >
      {e.label}
    </span>
  );
}

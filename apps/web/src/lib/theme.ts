import type { Confidence, EventType, Momentum, NodeStatus } from "@aitree/types";

/**
 * Static class maps for the white minimalist theme. Tailwind only keeps classes
 * that appear as complete strings in source, so every variant is spelled out
 * here (never interpolated).
 */

export const statusStyles: Record<
  NodeStatus,
  { label: string; badge: string; dot: string; ring: string }
> = {
  locked: {
    label: "Locked",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    dot: "bg-slate-400",
    ring: "border-slate-200",
  },
  emerging: {
    label: "Emerging",
    badge: "bg-sky-50 text-sky-700 border-sky-200",
    dot: "bg-sky-500",
    ring: "border-sky-200",
  },
  active: {
    label: "Active",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    ring: "border-blue-200",
  },
  achieved: {
    label: "Achieved",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500",
    ring: "border-emerald-200",
  },
  contested: {
    label: "Contested",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    ring: "border-amber-200",
  },
  dangerous: {
    label: "Dangerous",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
    dot: "bg-rose-500",
    ring: "border-rose-200",
  },
};

export const momentumStyles: Record<
  Momentum,
  { label: string; arrow: string; text: string }
> = {
  slow: { label: "Slow", arrow: "↓", text: "text-slate-500" },
  medium: { label: "Medium", arrow: "→", text: "text-amber-600" },
  fast: { label: "Fast", arrow: "↑", text: "text-blue-600" },
  "very-fast": { label: "Very Fast", arrow: "↑↑", text: "text-emerald-600" },
};

export const confidenceStyles: Record<Confidence, { text: string; bg: string }> = {
  A: { text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
  B: { text: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
  C: { text: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  D: { text: "text-rose-700", bg: "bg-rose-50 border-rose-200" },
};

export const eventTypeStyles: Record<EventType, { label: string; badge: string }> = {
  "model-release": {
    label: "Model Release",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  benchmark: {
    label: "Benchmark",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  "research-paper": {
    label: "Research Paper",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  "product-launch": {
    label: "Product Launch",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  adoption: {
    label: "Adoption",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
  },
  regulation: {
    label: "Regulation",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  "safety-incident": {
    label: "Safety Incident",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  "expert-analysis": {
    label: "Expert Analysis",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

export const routeColors: Record<
  string,
  { text: string; border: string; hoverBorder: string; bar: string; softBg: string }
> = {
  cyan: {
    text: "text-cyan-700",
    border: "border-cyan-200",
    hoverBorder: "hover:border-cyan-300",
    bar: "bg-cyan-500",
    softBg: "bg-cyan-50",
  },
  emerald: {
    text: "text-emerald-700",
    border: "border-emerald-200",
    hoverBorder: "hover:border-emerald-300",
    bar: "bg-emerald-500",
    softBg: "bg-emerald-50",
  },
  violet: {
    text: "text-violet-700",
    border: "border-violet-200",
    hoverBorder: "hover:border-violet-300",
    bar: "bg-violet-500",
    softBg: "bg-violet-50",
  },
  amber: {
    text: "text-amber-700",
    border: "border-amber-200",
    hoverBorder: "hover:border-amber-300",
    bar: "bg-amber-500",
    softBg: "bg-amber-50",
  },
  teal: {
    text: "text-teal-700",
    border: "border-teal-200",
    hoverBorder: "hover:border-teal-300",
    bar: "bg-teal-500",
    softBg: "bg-teal-50",
  },
  lime: {
    text: "text-lime-700",
    border: "border-lime-200",
    hoverBorder: "hover:border-lime-300",
    bar: "bg-lime-500",
    softBg: "bg-lime-50",
  },
  rose: {
    text: "text-rose-700",
    border: "border-rose-200",
    hoverBorder: "hover:border-rose-300",
    bar: "bg-rose-500",
    softBg: "bg-rose-50",
  },
  fuchsia: {
    text: "text-fuchsia-700",
    border: "border-fuchsia-200",
    hoverBorder: "hover:border-fuchsia-300",
    bar: "bg-fuchsia-500",
    softBg: "bg-fuchsia-50",
  },
};

export function routeColor(token: string) {
  return routeColors[token] ?? routeColors.cyan!;
}

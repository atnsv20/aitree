import {
  Confidence as PrismaConfidence,
  EventType as PrismaEventType,
  Momentum as PrismaMomentum,
  NodeStatus as PrismaNodeStatus,
} from "@prisma/client";
import type {
  Confidence,
  EventType,
  Momentum,
  NodeStatus,
} from "@aitree/types";

// ---- Momentum ----
const momentumToDto: Record<PrismaMomentum, Momentum> = {
  SLOW: "slow",
  MEDIUM: "medium",
  FAST: "fast",
  VERY_FAST: "very-fast",
};
const momentumToDb: Record<Momentum, PrismaMomentum> = {
  slow: "SLOW",
  medium: "MEDIUM",
  fast: "FAST",
  "very-fast": "VERY_FAST",
};

// ---- NodeStatus ----
const statusToDto: Record<PrismaNodeStatus, NodeStatus> = {
  LOCKED: "locked",
  EMERGING: "emerging",
  ACTIVE: "active",
  ACHIEVED: "achieved",
  CONTESTED: "contested",
  DANGEROUS: "dangerous",
};
const statusToDb: Record<NodeStatus, PrismaNodeStatus> = {
  locked: "LOCKED",
  emerging: "EMERGING",
  active: "ACTIVE",
  achieved: "ACHIEVED",
  contested: "CONTESTED",
  dangerous: "DANGEROUS",
};

// ---- EventType ----
const eventTypeToDto: Record<PrismaEventType, EventType> = {
  MODEL_RELEASE: "model-release",
  BENCHMARK: "benchmark",
  RESEARCH_PAPER: "research-paper",
  PRODUCT_LAUNCH: "product-launch",
  ADOPTION: "adoption",
  REGULATION: "regulation",
  SAFETY_INCIDENT: "safety-incident",
  EXPERT_ANALYSIS: "expert-analysis",
};
const eventTypeToDb: Record<EventType, PrismaEventType> = {
  "model-release": "MODEL_RELEASE",
  benchmark: "BENCHMARK",
  "research-paper": "RESEARCH_PAPER",
  "product-launch": "PRODUCT_LAUNCH",
  adoption: "ADOPTION",
  regulation: "REGULATION",
  "safety-incident": "SAFETY_INCIDENT",
  "expert-analysis": "EXPERT_ANALYSIS",
};

// ---- Confidence (identical letters) ----
export const toMomentumDto = (v: PrismaMomentum): Momentum => momentumToDto[v];
export const toMomentumDb = (v: Momentum): PrismaMomentum => momentumToDb[v];
export const toStatusDto = (v: PrismaNodeStatus): NodeStatus => statusToDto[v];
export const toStatusDb = (v: NodeStatus): PrismaNodeStatus => statusToDb[v];
export const toEventTypeDto = (v: PrismaEventType): EventType => eventTypeToDto[v];
export const toEventTypeDb = (v: EventType): PrismaEventType => eventTypeToDb[v];
export const toConfidenceDto = (v: PrismaConfidence): Confidence => v as Confidence;
export const toConfidenceDb = (v: Confidence): PrismaConfidence => v as PrismaConfidence;

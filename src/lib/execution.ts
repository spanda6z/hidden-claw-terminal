export type ExecutionStrategy = {
  enabled: boolean;
  mode: "manual_confirm" | "rules_only" | "auto";
  buyAmountSol: number;
  maxBuyAmountSol: number;
  maxOpenPositions: number;
  maxDailyTrades: number;
  maxDailyLossSol: number;
  takeProfitPercent: number;
  stopLossPercent: number;
  trailingStopPercent: number;
  minSignal: "CRITICAL" | "HIGH" | "WATCH";
  minCurvePercent: number;
  maxAgeSec: number;
  requireCreatorKnown: boolean;
  slippageBps: number;
  updatedAt: string;
};

export const DEFAULT_STRATEGY: ExecutionStrategy = {
  enabled: false,
  mode: "manual_confirm",
  buyAmountSol: 0.1,
  maxBuyAmountSol: 0.5,
  maxOpenPositions: 3,
  maxDailyTrades: 10,
  maxDailyLossSol: 1,
  takeProfitPercent: 100,
  stopLossPercent: 25,
  trailingStopPercent: 20,
  minSignal: "HIGH",
  maxAgeSec: 600,
  minCurvePercent: 0,
  requireCreatorKnown: false,
  slippageBps: 500,
  updatedAt: new Date().toISOString(),
};

const KEY = "hc_execution_strategy";

export function loadStrategy(): ExecutionStrategy {
  if (typeof window === "undefined") return DEFAULT_STRATEGY;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULT_STRATEGY };
    return { ...DEFAULT_STRATEGY, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STRATEGY };
  }
}

export function saveStrategy(s: ExecutionStrategy) {
  const next = { ...s, updatedAt: new Date().toISOString() };
  localStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

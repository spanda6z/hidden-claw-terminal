export type WalletTier = "ELITE" | "SHARP" | "WATCH" | "MEH" | "DUMPER";
export type DeveloperTier = "PROVEN" | "WATCH" | "RISKY" | "BLACKLISTED";
export type SecurityStatus = "PASS" | "WARNING" | "FAIL" | "UNKNOWN";
export type AlertSeverity = "INFO" | "WATCH" | "HIGH" | "CRITICAL";
export type SignalType =
  | "NEW_TOKEN"
  | "ELITE_ENTRY"
  | "TICKER_CLUSTER"
  | "SECURITY"
  | "BONDING_CURVE"
  | "DEVELOPER"
  | "SOCIAL";

export interface Token {
  symbol: string;
  mint: string;
  developer: string;
  developerTier: DeveloperTier;
  price: number;
  marketCap: number;
  liquidity: number;
  ageSeconds: number;
  bondingCurve: number;
  eliteBuyers: number;
  socialMentions: number;
  uniqueSources: number;
  trustedSources: number;
  security: SecurityStatus;
  platform: string;
}

export interface Wallet {
  address: string;
  tier: WalletTier;
  winRate: number;
  pnlSol: number;
  tokensTraded: number;
  avgEntrySeconds: number;
  recentAction: string;
  recentToken: string;
}

export interface Developer {
  id: string;
  tier: DeveloperTier;
  launches: number;
  successful: number;
  rugs: number;
  successRate: number;
  lastLaunch: string;
  firstLaunch: string;
  linkedWallets: string[];
}

export interface FeedEvent {
  id: string;
  time: string;
  type: SignalType;
  token?: string;
  wallet?: string;
  developer?: string;
  message: string;
  severity: AlertSeverity;
  detail?: string;
}

export interface SecurityReport {
  mintAuthority: SecurityStatus;
  freezeAuthority: SecurityStatus;
  transferHook: string;
  top10Holders: number;
  liquidity: number;
  sellSimulation: SecurityStatus;
  developerRisk: "LOW" | "MEDIUM" | "HIGH";
  overall: SecurityStatus;
}

export interface TickerCluster {
  ticker: string;
  mentions: number;
  uniqueSources: number;
  trustedSources: number;
  velocity: string;
  tokenMatch: boolean;
  status: "FIRE" | "WATCH" | "NONE";
}

export interface BondingCurveEntry {
  token: string;
  curve: number;
  mcap: number;
  buys: number;
  sells: number;
  developer: DeveloperTier;
  status: "IMMINENT" | "EARLY" | "GRADUATED";
}

export interface ExecutionConfig {
  fixedBuySol: number;
  maxTradesPerDay: number;
  tradesToday: number;
  capitalToday: number;
  capitalLimit: number;
  dailyPnl: number;
  profitTarget: number;
  maxDailyLoss: number;
  openPositions: number;
  maxOpenPositions: number;
  autoExecution: boolean;
}

export interface Position {
  token: string;
  sizeSol: number;
  entryTime: string;
  pnlSol: number;
  status: "OPEN" | "CLOSED";
}

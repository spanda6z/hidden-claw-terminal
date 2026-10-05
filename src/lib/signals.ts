/**
 * HIDDEN CLAW — Live signal layer (Pump.fun public API + DexScreener)
 */

export type SignalTier = "CRITICAL" | "HIGH" | "WATCH" | "INFO";
export type DevTier = "PROVEN" | "WATCH" | "RISKY" | "UNKNOWN";
export type SecurityStatus = "PASS" | "WARNING" | "PENDING" | "FAIL";

export interface LaunchSignal {
  id: string;
  mint: string;
  symbol: string;
  name: string;
  description?: string;
  imageUri?: string;
  creator: string;
  createdAt: number;
  ageSec: number;
  mcapUsd: number | null;
  volumeUsd: number | null;
  liquidityUsd: number | null;
  holders: number | null;
  curvePercent: number | null;
  complete: boolean;
  virtualSolReserves: number | null;
  realSolReserves: number | null;
  virtualTokenReserves: number | null;
  replyCount: number | null;
  lastTradeAt: number | null;
  signal: SignalTier;
  security: SecurityStatus;
  devTier: DevTier;
  note: string;
  source: "pump.fun";
  twitter?: string;
  website?: string;
}

const FULL_CURVE_SOL = 85;
const START_VIRTUAL_SOL = 30;

function lamportsToSol(lamports: number): number {
  return lamports / 1e9;
}

function scoreSignal(raw: {
  ageSec: number;
  curvePercent: number | null;
  mcapUsd: number | null;
  complete: boolean;
  name: string;
  symbol: string;
  realSol: number | null;
}): { signal: SignalTier; security: SecurityStatus; note: string } {
  const { ageSec, curvePercent, mcapUsd, complete, name, symbol, realSol } = raw;
  if (!name || !symbol || symbol.length > 16) {
    return { signal: "INFO", security: "WARNING", note: "Suspicious or incomplete metadata" };
  }
  if (complete) {
    return { signal: "WATCH", security: "PASS", note: "Bonding curve complete / graduated path" };
  }
  const curve = curvePercent ?? 0;
  const mcap = mcapUsd ?? 0;
  if (ageSec < 180 && curve > 35 && mcap > 15000) {
    return { signal: "CRITICAL", security: "PENDING", note: "Early acceleration \u00b7 elevated curve + mcap" };
  }
  if (ageSec < 600 && curve > 70) {
    return { signal: "HIGH", security: "PENDING", note: "High curve progress \u00b7 near graduation zone" };
  }
  if (ageSec < 900 && mcap > 40000) {
    return { signal: "HIGH", security: "PENDING", note: "Material early market cap" };
  }
  if (realSol != null && realSol > 20) {
    return { signal: "HIGH", security: "PENDING", note: "Significant real SOL reserves on curve" };
  }
  if (ageSec < 1800 && curve > 15) {
    return { signal: "WATCH", security: "PENDING", note: "Active bonding curve" };
  }
  return { signal: "INFO", security: "PENDING", note: "New launch \u00b7 monitoring" };
}

function mapPumpCoin(coin: Record<string, unknown>): LaunchSignal {
  const created = Number(coin.created_timestamp ?? Date.now());
  const createdMs = created < 1e12 ? created * 1000 : created;
  const ageSec = Math.max(0, Math.floor((Date.now() - createdMs) / 1000));
  const virtualSol =
    coin.virtual_sol_reserves != null ? lamportsToSol(Number(coin.virtual_sol_reserves)) : null;
  const realSol =
    coin.real_sol_reserves != null ? lamportsToSol(Number(coin.real_sol_reserves)) : null;
  let curvePercent: number | null = null;
  if (virtualSol != null) {
    const progress = Math.min(
      100,
      Math.max(0, ((virtualSol - START_VIRTUAL_SOL) / (FULL_CURVE_SOL - START_VIRTUAL_SOL)) * 100)
    );
    curvePercent = Math.round(progress * 10) / 10;
  }
  if (coin.complete === true) curvePercent = 100;
  const usdMarketCap =
    coin.usd_market_cap != null
      ? Number(coin.usd_market_cap)
      : coin.market_cap != null
        ? Number(coin.market_cap)
        : null;
  const mint = String(coin.mint ?? "");
  const symbol = String(coin.symbol ?? "?").replace(/^\$/, "");
  const name = String(coin.name ?? symbol);
  const lastTrade = coin.last_trade_timestamp != null ? Number(coin.last_trade_timestamp) : null;
  const lastTradeMs =
    lastTrade != null ? (lastTrade < 1e12 ? lastTrade * 1000 : lastTrade) : null;
  const scored = scoreSignal({
    ageSec,
    curvePercent,
    mcapUsd: usdMarketCap,
    complete: Boolean(coin.complete),
    name,
    symbol,
    realSol,
  });
  return {
    id: mint || `pf-${createdMs}`,
    mint,
    symbol: symbol.startsWith("$") ? symbol : `$${symbol}`,
    name,
    description: coin.description ? String(coin.description).slice(0, 240) : undefined,
    imageUri: coin.image_uri ? String(coin.image_uri) : undefined,
    creator: String(coin.creator ?? ""),
    createdAt: createdMs,
    ageSec,
    mcapUsd: usdMarketCap,
    volumeUsd: null,
    liquidityUsd: realSol != null ? realSol * 120 : virtualSol != null ? virtualSol * 50 : null,
    holders: coin.holder_count != null ? Number(coin.holder_count) : null,
    curvePercent,
    complete: Boolean(coin.complete),
    virtualSolReserves: virtualSol,
    realSolReserves: realSol,
    virtualTokenReserves:
      coin.virtual_token_reserves != null ? Number(coin.virtual_token_reserves) : null,
    replyCount: coin.reply_count != null ? Number(coin.reply_count) : null,
    lastTradeAt: lastTradeMs,
    signal: scored.signal,
    security: scored.security,
    devTier: "UNKNOWN",
    note: scored.note,
    source: "pump.fun",
    twitter: coin.twitter ? String(coin.twitter) : undefined,
    website: coin.website ? String(coin.website) : undefined,
  };
}

async function fetchPump(
  sort: string,
  limit: number
): Promise<{ signals: LaunchSignal[]; error?: string }> {
  try {
    const url = `https://frontend-api-v3.pump.fun/coins?offset=0&limit=${limit}&sort=${sort}&order=DESC&includeNsfw=false`;
    const res = await fetch(url, {
      headers: { Accept: "application/json", "User-Agent": "HiddenClaw/1.0" },
      next: { revalidate: 8 },
    });
    if (!res.ok) return { signals: [], error: `Pump.fun ${res.status}` };
    const data = await res.json();
    const list = Array.isArray(data) ? data : [];
    return { signals: list.map(mapPumpCoin) };
  } catch (e) {
    return { signals: [], error: e instanceof Error ? e.message : "Fetch failed" };
  }
}

export async function fetchPumpFunLaunches(limit = 40) {
  const r = await fetchPump("created_timestamp", limit);
  return { ...r, source: "pump.fun" as const };
}

export async function fetchPumpFunTrending(limit = 30) {
  const r = await fetchPump("last_trade_timestamp", limit);
  return { ...r, source: "pump.fun" as const };
}

export async function fetchSolPrice(): Promise<{
  usd: number | null;
  change24h: number | null;
  error?: string;
}> {
  try {
    const res = await fetch(
      "https://api.dexscreener.com/latest/dex/tokens/So11111111111111111111111111111111111111112",
      { next: { revalidate: 30 } }
    );
    if (!res.ok) return { usd: null, change24h: null, error: `Dex ${res.status}` };
    const data = await res.json();
    const pair = data?.pairs?.[0];
    return {
      usd: pair?.priceUsd != null ? Number(pair.priceUsd) : null,
      change24h: pair?.priceChange?.h24 != null ? Number(pair.priceChange.h24) : null,
    };
  } catch (e) {
    return {
      usd: null,
      change24h: null,
      error: e instanceof Error ? e.message : "SOL price failed",
    };
  }
}

export function buildCreatorStats(signals: LaunchSignal[]) {
  const map = new Map<
    string,
    { creator: string; count: number; tokens: { symbol: string; mint: string; mcap: number | null }[] }
  >();
  for (const s of signals) {
    if (!s.creator) continue;
    const cur = map.get(s.creator) || { creator: s.creator, count: 0, tokens: [] };
    cur.count += 1;
    cur.tokens.push({ symbol: s.symbol, mint: s.mint, mcap: s.mcapUsd });
    map.set(s.creator, cur);
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export function formatUsd(n: number | null): string {
  if (n == null || Number.isNaN(n)) return "\u2014";
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  if (n >= 1) return `$${n.toFixed(0)}`;
  return `$${n.toFixed(2)}`;
}

export function formatAge(sec: number): string {
  if (sec < 60) return `${sec}s`;
  if (sec < 3600) return `${Math.floor(sec / 60)}m`;
  return `${Math.floor(sec / 3600)}h`;
}

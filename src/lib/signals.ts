/**
 * HIDDEN CLAW — Real signal layer
 * Primary: Pump.fun frontend API (no key)
 * Optional: HELIUS_API_KEY, SOLANA_TRACKER_API_KEY in env
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
  virtualTokenReserves: number | null;
  signal: SignalTier;
  security: SecurityStatus;
  devTier: DevTier;
  note: string;
  source: "pump.fun" | "helius" | "simulation";
  usdMarketCap?: number | null;
}

const FULL_CURVE_SOL = 85;

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
}): { signal: SignalTier; security: SecurityStatus; note: string } {
  const { ageSec, curvePercent, mcapUsd, complete, name, symbol } = raw;

  if (!name || !symbol || symbol.length > 12) {
    return { signal: "INFO", security: "WARNING", note: "Suspicious metadata" };
  }

  if (complete) {
    return { signal: "WATCH", security: "PASS", note: "Graduated / complete curve" };
  }

  const curve = curvePercent ?? 0;
  const mcap = mcapUsd ?? 0;

  if (ageSec < 120 && curve > 40 && mcap > 20000) {
    return { signal: "CRITICAL", security: "PENDING", note: "Hot launch · early curve acceleration" };
  }

  if (ageSec < 300 && curve > 70) {
    return { signal: "HIGH", security: "PENDING", note: "High curve progress · approaching graduation" };
  }

  if (ageSec < 600 && mcap > 50000) {
    return { signal: "HIGH", security: "PENDING", note: "Material early mcap" };
  }

  if (ageSec < 900 && curve > 20) {
    return { signal: "WATCH", security: "PENDING", note: "Active bonding curve" };
  }

  return { signal: "INFO", security: "PENDING", note: "New launch · monitoring" };
}

function mapPumpCoin(coin: Record<string, unknown>): LaunchSignal {
  const created = Number(coin.created_timestamp ?? coin.createdTimestamp ?? Date.now());
  const createdMs = created < 1e12 ? created * 1000 : created;
  const ageSec = Math.max(0, Math.floor((Date.now() - createdMs) / 1000));

  const virtualSol =
    coin.virtual_sol_reserves != null ? lamportsToSol(Number(coin.virtual_sol_reserves)) : null;

  let curvePercent: number | null = null;
  if (virtualSol != null) {
    const progress = Math.min(100, Math.max(0, ((virtualSol - 30) / (FULL_CURVE_SOL - 30)) * 100));
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

  const scored = scoreSignal({
    ageSec,
    curvePercent,
    mcapUsd: usdMarketCap,
    complete: Boolean(coin.complete),
    name,
    symbol,
  });

  return {
    id: mint || `pf-${createdMs}`,
    mint,
    symbol: symbol.startsWith("$") ? symbol : `$${symbol}`,
    name,
    description: coin.description ? String(coin.description).slice(0, 200) : undefined,
    imageUri: coin.image_uri ? String(coin.image_uri) : undefined,
    creator: String(coin.creator ?? ""),
    createdAt: createdMs,
    ageSec,
    mcapUsd: usdMarketCap,
    volumeUsd: null,
    liquidityUsd: virtualSol != null ? virtualSol * 180 : null,
    holders: coin.holder_count != null ? Number(coin.holder_count) : null,
    curvePercent,
    complete: Boolean(coin.complete),
    virtualSolReserves: virtualSol,
    virtualTokenReserves:
      coin.virtual_token_reserves != null ? Number(coin.virtual_token_reserves) : null,
    signal: scored.signal,
    security: scored.security,
    devTier: "UNKNOWN",
    note: scored.note,
    source: "pump.fun",
    usdMarketCap,
  };
}

export async function fetchPumpFunLaunches(limit = 30): Promise<{
  signals: LaunchSignal[];
  source: string;
  error?: string;
}> {
  try {
    const url = `https://frontend-api-v3.pump.fun/coins?offset=0&limit=${limit}&sort=created_timestamp&order=DESC&includeNsfw=false`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "HiddenClaw/1.0",
      },
      next: { revalidate: 5 },
    });

    if (!res.ok) {
      return { signals: [], source: "pump.fun", error: `Pump.fun API ${res.status}` };
    }

    const data = await res.json();
    const list = Array.isArray(data) ? data : data?.coins ?? data?.data ?? [];
    const signals = (list as Record<string, unknown>[]).map(mapPumpCoin);

    return { signals, source: "pump.fun" };
  } catch (e) {
    return {
      signals: [],
      source: "pump.fun",
      error: e instanceof Error ? e.message : "Fetch failed",
    };
  }
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

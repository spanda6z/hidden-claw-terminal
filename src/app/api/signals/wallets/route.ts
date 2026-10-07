import { NextResponse } from "next/server";
import { fetchPumpFunLaunches, fetchPumpFunTrending } from "@/lib/signals";

export const dynamic = "force-dynamic";

export async function GET() {
  const [newest, active] = await Promise.all([
    fetchPumpFunLaunches(50),
    fetchPumpFunTrending(40),
  ]);

  const byMint = new Map<string, (typeof newest.signals)[0]>();
  for (const s of [...newest.signals, ...active.signals]) {
    byMint.set(s.mint, s);
  }
  const signals = [...byMint.values()];

  type WalletEvent = {
    creator: string;
    firstSeenAt: number;
    ageSec: number;
    launchCount: number;
    tokens: {
      symbol: string;
      mint: string;
      mcap: number | null;
      createdAt: number;
      signal: string;
    }[];
    latestSymbol: string;
    latestMint: string;
  };

  const map = new Map<string, WalletEvent>();
  for (const s of signals) {
    if (!s.creator) continue;
    const cur = map.get(s.creator);
    const token = {
      symbol: s.symbol,
      mint: s.mint,
      mcap: s.mcapUsd,
      createdAt: s.createdAt,
      signal: s.signal,
    };
    if (!cur) {
      map.set(s.creator, {
        creator: s.creator,
        firstSeenAt: s.createdAt,
        ageSec: s.ageSec,
        launchCount: 1,
        tokens: [token],
        latestSymbol: s.symbol,
        latestMint: s.mint,
      });
    } else {
      cur.launchCount += 1;
      cur.tokens.push(token);
      if (s.createdAt < cur.firstSeenAt) {
        cur.firstSeenAt = s.createdAt;
        cur.ageSec = s.ageSec;
      }
      if (s.createdAt >= Math.max(...cur.tokens.map((t) => t.createdAt))) {
        cur.latestSymbol = s.symbol;
        cur.latestMint = s.mint;
      }
    }
  }

  const wallets = [...map.values()].sort((a, b) => b.firstSeenAt - a.firstSeenAt);

  return NextResponse.json({
    ok: true,
    source: "pump.fun",
    sampleSize: signals.length,
    count: wallets.length,
    mode: "live",
    updatedAt: new Date().toISOString(),
    note: "Deployer wallets observed launching tokens in the live sample. Full on-chain wallet birth requires an indexer (e.g. Helius).",
    wallets,
  });
}

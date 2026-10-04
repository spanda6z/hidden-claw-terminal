import { NextResponse } from "next/server";
import { fetchPumpFunLaunches } from "@/lib/signals";

export const dynamic = "force-dynamic";

export async function GET() {
  const pump = await fetchPumpFunLaunches(3);
  return NextResponse.json({
    pumpfun: {
      ok: !pump.error && pump.signals.length > 0,
      count: pump.signals.length,
      error: pump.error ?? null,
      sample: pump.signals[0]?.symbol ?? null,
    },
    helius: {
      configured: Boolean(process.env.HELIUS_API_KEY),
      note: "Optional — set HELIUS_API_KEY for deeper wallet/tx signals",
    },
    solanaTracker: {
      configured: Boolean(process.env.SOLANA_TRACKER_API_KEY),
      note: "Optional — set SOLANA_TRACKER_API_KEY for enhanced analytics",
    },
    mode: !pump.error && pump.signals.length > 0 ? "LIVE" : "DEGRADED",
    timestamp: new Date().toISOString(),
  });
}

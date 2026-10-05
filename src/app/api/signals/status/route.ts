import { NextResponse } from "next/server";
import { fetchPumpFunLaunches, fetchSolPrice } from "@/lib/signals";

export const dynamic = "force-dynamic";

export async function GET() {
  const [pump, sol] = await Promise.all([fetchPumpFunLaunches(5), fetchSolPrice()]);
  return NextResponse.json({
    pumpfun: {
      ok: !pump.error && pump.signals.length > 0,
      count: pump.signals.length,
      error: pump.error ?? null,
      sample: pump.signals[0]?.symbol ?? null,
    },
    sol: {
      ok: sol.usd != null,
      usd: sol.usd,
      change24h: sol.change24h,
    },
    mode: !pump.error && pump.signals.length > 0 ? "LIVE" : "DEGRADED",
    timestamp: new Date().toISOString(),
  });
}

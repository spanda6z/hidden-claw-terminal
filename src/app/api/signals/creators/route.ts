import { NextResponse } from "next/server";
import { buildCreatorStats, fetchPumpFunLaunches, fetchPumpFunTrending } from "@/lib/signals";

export const dynamic = "force-dynamic";

export async function GET() {
  const [newest, active] = await Promise.all([
    fetchPumpFunLaunches(50),
    fetchPumpFunTrending(50),
  ]);
  const byMint = new Map<string, (typeof newest.signals)[0]>();
  for (const s of [...newest.signals, ...active.signals]) {
    byMint.set(s.mint, s);
  }
  const all = [...byMint.values()];
  const creators = buildCreatorStats(all);
  return NextResponse.json({
    ok: true,
    source: "pump.fun",
    sampleSize: all.length,
    creators: creators.slice(0, 40),
    updatedAt: new Date().toISOString(),
  });
}

import { NextResponse } from "next/server";
import { fetchPumpFunTrending } from "@/lib/signals";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const limit = Math.min(Number(new URL(request.url).searchParams.get("limit") || 30), 50);
  const result = await fetchPumpFunTrending(limit);
  return NextResponse.json({
    ok: !result.error,
    source: result.source,
    count: result.signals.length,
    mode: result.error ? "degraded" : "live",
    error: result.error ?? null,
    updatedAt: new Date().toISOString(),
    signals: result.signals,
  });
}

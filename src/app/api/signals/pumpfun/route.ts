import { NextResponse } from "next/server";
import { fetchPumpFunLaunches } from "@/lib/signals";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Number(searchParams.get("limit") || 40), 50);

  const result = await fetchPumpFunLaunches(limit);

  return NextResponse.json(
    {
      ok: !result.error,
      source: result.source,
      count: result.signals.length,
      updatedAt: new Date().toISOString(),
      mode: result.error ? "degraded" : "live",
      error: result.error ?? null,
      signals: result.signals,
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

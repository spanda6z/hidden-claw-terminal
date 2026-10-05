import { NextResponse } from "next/server";
import { fetchSolPrice } from "@/lib/signals";

export const dynamic = "force-dynamic";

export async function GET() {
  const price = await fetchSolPrice();
  return NextResponse.json({
    ok: price.usd != null,
    ...price,
    updatedAt: new Date().toISOString(),
  });
}

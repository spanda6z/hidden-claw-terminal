"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Payment gate removed — terminal is open. */
export default function PayRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/access");
  }, [router]);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-[12px] text-[var(--text-dim)] tracking-wider mono">Opening terminal\u2026</div>
    </div>
  );
}

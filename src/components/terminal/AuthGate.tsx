"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession, hasPaidAccess } from "@/lib/auth";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/signup");
      return;
    }
    if (!hasPaidAccess()) {
      router.replace("/pay");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="h-screen flex items-center justify-center bg-[var(--bg-deep)]">
        <div className="text-[12px] tracking-wider text-[var(--text-dim)] mono">Verifying access\u2026</div>
      </div>
    );
  }
  return <>{children}</>;
}

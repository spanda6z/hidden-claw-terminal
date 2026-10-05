"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, hasPaidAccess, setAccess } from "@/lib/auth";

const X_ACCESS = "https://x.com/chainpulseoffi?s=11";

export default function AccessRequestPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [note, setNote] = useState("");

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/signup");
      return;
    }
    setEmail(session.email);
    if (hasPaidAccess()) router.replace("/access");
  }, [router]);

  function openDm() {
    window.open(X_ACCESS, "_blank", "noopener,noreferrer");
  }

  function unlockWithCode(code: string) {
    if (!email) return;
    const key = code.trim().toUpperCase();
    if (key === "PULSE" || key === "CHAINPULSE" || key === "GRANTED") {
      setAccess({
        email: email.toLowerCase(),
        paid: true,
        paidAt: new Date().toISOString(),
        amountSol: 0,
        txSignature: `dm_access_${Date.now()}`,
      });
      router.push("/access");
    } else {
      setNote("Invalid access code. DM @chainpulseoffi for access.");
    }
  }

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <header className="px-8 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <Link href="/" className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</Link>
        <span className="badge badge-cyan">PRIVATE ACCESS</span>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <div className="label mb-3">TERMINAL ACCESS</div>
          <h1 className="h-title text-2xl mb-2">Request access via DM</h1>
          <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-8">
            HIDDEN CLAW is private. After signup, message us on X to unlock the intelligence terminal. Access is granted manually.
          </p>

          <div className="card p-6 mb-6 space-y-5">
            <div>
              <div className="label mb-1">Account</div>
              <div className="mono text-[14px] text-[var(--text)]">{email ?? "\u2014"}</div>
            </div>

            <div className="border-t border-[var(--border)] pt-4">
              <div className="label mb-2">How to get in</div>
              <ol className="space-y-2 text-[13px] text-[var(--text-muted)] list-decimal list-inside">
                <li>Sign up (done if you see this page)</li>
                <li>
                  DM{" "}
                  <a href={X_ACCESS} target="_blank" rel="noopener noreferrer" className="text-[var(--cyan)] hover:underline mono">
                    @chainpulseoffi
                  </a>{" "}
                  on X
                </li>
                <li>Include your account email so we can match access</li>
                <li>When approved, enter the access code you receive below</li>
              </ol>
            </div>

            <button type="button" className="btn-primary w-full" onClick={openDm}>
              DM @chainpulseoffi FOR ACCESS \u2192
            </button>

            <div className="border-t border-[var(--border)] pt-4 space-y-3">
              <div className="label">Access code (after approval)</div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget);
                  unlockWithCode(String(fd.get("code") || ""));
                }}
                className="flex gap-2"
              >
                <input
                  name="code"
                  type="text"
                  autoComplete="off"
                  placeholder="Enter code from DM"
                  className="flex-1 bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2.5 text-[13px] mono outline-none focus:border-[var(--cyan)]/50"
                />
                <button type="submit" className="btn-ghost shrink-0">Unlock</button>
              </form>
              {note && (
                <div className="text-[12px] text-[var(--amber)] border border-[var(--amber)]/25 rounded-md px-3 py-2">{note}</div>
              )}
            </div>
          </div>

          <p className="text-[11px] text-[var(--text-dim)]">
            Contact:{" "}
            <a href={X_ACCESS} target="_blank" rel="noopener noreferrer" className="text-[var(--cyan)] hover:underline">
              x.com/chainpulseoffi
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}

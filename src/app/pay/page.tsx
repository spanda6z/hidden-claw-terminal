"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ACCESS_FEE_SOL,
  TREASURY_ADDRESS,
  getSession,
  hasPaidAccess,
  setAccess,
} from "@/lib/auth";

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      signAndSendTransaction?: (tx: unknown) => Promise<{ signature: string }>;
    };
  }
}

export default function PayPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "connecting" | "paying" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [txSig, setTxSig] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/signup");
      return;
    }
    setEmail(session.email);
    if (hasPaidAccess()) router.replace("/access");
  }, [router]);

  async function connectWallet() {
    setError(null);
    setStatus("connecting");
    try {
      const provider = window.solana;
      if (!provider?.isPhantom) {
        setError("Install Phantom (or another Solana wallet) to pay the access fee.");
        setStatus("error");
        return;
      }
      const res = await provider.connect();
      setWallet(res.publicKey.toString());
      setStatus("idle");
    } catch {
      setError("Wallet connection rejected.");
      setStatus("error");
    }
  }

  async function payWithSolana() {
    if (!email || !wallet) return;
    setError(null);
    setStatus("paying");
    try {
      const solana = window.solana;
      if (!solana) {
        setError("Wallet not available.");
        setStatus("error");
        return;
      }
      let signature: string | null = null;
      try {
        const web3 = await import("@solana/web3.js");
        const connection = new web3.Connection(
          process.env.NEXT_PUBLIC_SOLANA_RPC || "https://api.mainnet-beta.solana.com",
          "confirmed"
        );
        const fromPubkey = new web3.PublicKey(wallet);
        const toPubkey = new web3.PublicKey(TREASURY_ADDRESS);
        const lamports = ACCESS_FEE_SOL * web3.LAMPORTS_PER_SOL;
        const { blockhash } = await connection.getLatestBlockhash();
        const tx = new web3.Transaction().add(
          web3.SystemProgram.transfer({ fromPubkey, toPubkey, lamports })
        );
        tx.recentBlockhash = blockhash;
        tx.feePayer = fromPubkey;
        if (solana.signAndSendTransaction) {
          const result = await solana.signAndSendTransaction(tx);
          signature = result.signature;
        } else {
          setError("Wallet does not support signAndSendTransaction. Use Phantom.");
          setStatus("error");
          return;
        }
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Transaction failed";
        if (msg.includes("Cannot find module") || msg.includes("@solana/web3.js")) {
          signature = `pending_${Date.now()}`;
          setError("Set NEXT_PUBLIC_TREASURY_WALLET and ensure @solana/web3.js is installed for live payments.");
        } else {
          setError(msg);
          setStatus("error");
          return;
        }
      }
      if (signature) {
        setAccess({
          email: email.toLowerCase(),
          paid: true,
          paidAt: new Date().toISOString(),
          txSignature: signature,
          wallet,
          amountSol: ACCESS_FEE_SOL,
        });
        setTxSig(signature);
        setStatus("done");
        setTimeout(() => router.push("/access"), 1600);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Payment failed");
      setStatus("error");
    }
  }

  return (
    <div className="min-h-screen flex flex-col grid-bg">
      <header className="px-8 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <Link href="/" className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</Link>
        <span className="badge badge-amber">ONE-TIME ACCESS</span>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg">
          <div className="label mb-3">TERMINAL ACCESS</div>
          <h1 className="h-title text-2xl mb-2">Unlock the intelligence terminal</h1>
          <p className="text-[13px] text-[var(--text-muted)] leading-relaxed mb-8">
            After signup, a one-time fee of <span className="text-[var(--text)] font-semibold mono">3 SOL</span> grants full terminal access. Not a subscription.
          </p>
          <div className="card p-6 mb-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="label">ACCESS FEE</div>
                <div className="mono text-3xl font-semibold mt-1 tracking-tight">{ACCESS_FEE_SOL} <span className="text-lg text-[var(--text-muted)]">SOL</span></div>
              </div>
              <div className="text-right">
                <div className="label">TYPE</div>
                <div className="text-[13px] font-medium mt-1">One-time</div>
              </div>
            </div>
            <div className="border-t border-[var(--border)] pt-4 space-y-2 text-[12px] text-[var(--text-muted)]">
              <div className="flex justify-between"><span>Account</span><span className="mono text-[var(--text)]">{email ?? "\u2014"}</span></div>
              <div className="flex justify-between"><span>Treasury</span><span className="mono text-[10px] text-[var(--text-dim)]">{TREASURY_ADDRESS.slice(0, 6)}\u2026{TREASURY_ADDRESS.slice(-6)}</span></div>
              <div className="flex justify-between"><span>Wallet</span><span className="mono text-[var(--text)]">{wallet ? `${wallet.slice(0, 4)}\u2026${wallet.slice(-4)}` : "Not connected"}</span></div>
            </div>
            {error && <div className="text-[12px] text-[var(--amber)] border border-[var(--amber)]/25 rounded-md px-3 py-2 leading-relaxed">{error}</div>}
            {status === "done" && (
              <div className="text-[12px] text-[var(--green)] border border-[var(--green)]/30 rounded-md px-3 py-2">
                Access granted{txSig ? ` \u00b7 ${txSig.slice(0, 12)}\u2026` : ""}. Opening terminal\u2026
              </div>
            )}
            <div className="flex flex-col gap-2">
              {!wallet ? (
                <button type="button" className="btn-primary w-full" onClick={connectWallet} disabled={status === "connecting"}>
                  {status === "connecting" ? "CONNECTING\u2026" : "CONNECT WALLET"}
                </button>
              ) : (
                <button type="button" className="btn-primary w-full" onClick={payWithSolana} disabled={status === "paying" || status === "done"}>
                  {status === "paying" ? "CONFIRM IN WALLET\u2026" : status === "done" ? "PAID \u2713" : `PAY ${ACCESS_FEE_SOL} SOL \u2192`}
                </button>
              )}
              <button type="button" className="btn-ghost w-full" onClick={() => router.push("/signup")}>Back to account</button>
            </div>
          </div>
          <ul className="space-y-2 text-[12px] text-[var(--text-dim)]">
            <li className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> Scanner, detection, smart wallets, dev reputation</li>
            <li className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> Live Pump.fun signal stream</li>
            <li className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> Investigation workspace</li>
            <li className="flex gap-2"><span className="text-[var(--cyan)]">\u2192</span> Execution remains optional</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

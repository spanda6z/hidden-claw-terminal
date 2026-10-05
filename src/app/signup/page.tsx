"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser, registerUser, setSession } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"signup" | "signin">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [notBot, setNotBot] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!notBot) {
      setError("Confirm you are not a bot to continue.");
      return;
    }
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signup") {
        const res = registerUser(email, password, name || undefined);
        if (!res.ok) {
          setError(res.error || "Signup failed");
          setLoading(false);
          return;
        }
        setSession({ email: email.toLowerCase(), name: name || undefined, createdAt: new Date().toISOString(), remember });
      } else {
        const res = loginUser(email, password);
        if (!res.ok) {
          setError(res.error || "Sign in failed");
          setLoading(false);
          return;
        }
        setSession({ email: email.toLowerCase(), name: res.name, createdAt: new Date().toISOString(), remember });
      }
      router.push("/access");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="px-8 py-4 border-b border-[var(--border)] flex items-center justify-between">
        <Link href="/" className="text-[12px] font-semibold tracking-[0.14em]">HIDDEN CLAW</Link>
        <span className="text-[10px] text-[var(--text-dim)] tracking-wider">ACCOUNT REQUIRED</span>
      </header>
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          <div className="text-[10px] tracking-[0.2em] text-[var(--cyan)] mb-3">{mode === "signup" ? "CREATE ACCESS" : "RETURN ACCESS"}</div>
          <h1 className="text-2xl font-semibold tracking-tight mb-2">{mode === "signup" ? "Sign up to enter the terminal" : "Sign in to continue"}</h1>
          <p className="text-[13px] text-[var(--text-muted)] mb-8 leading-relaxed">HIDDEN CLAW is a private intelligence environment. An account is required before terminal access.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-[11px] tracking-wider text-[var(--text-dim)] mb-1.5">DISPLAY NAME (OPTIONAL)</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[var(--cyan)]/50" placeholder="Operator name" />
              </div>
            )}
            <div>
              <label className="block text-[11px] tracking-wider text-[var(--text-dim)] mb-1.5">EMAIL</label>
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[var(--cyan)]/50" placeholder="you@domain.com" autoComplete="email" />
            </div>
            <div>
              <label className="block text-[11px] tracking-wider text-[var(--text-dim)] mb-1.5">PASSWORD</label>
              <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[var(--bg-elevated)] border border-[var(--border)] rounded-md px-3 py-2.5 text-[13px] outline-none focus:border-[var(--cyan)]/50" placeholder="Min. 6 characters" minLength={6} />
            </div>
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={notBot} onChange={(e) => setNotBot(e.target.checked)} className="mt-0.5" />
              <span className="text-[12px] text-[var(--text-muted)]">I confirm I am not a bot and I will use HIDDEN CLAW as intelligence tooling only.</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
              <span className="text-[12px] text-[var(--text-muted)]">Remember me on this device</span>
            </label>
            {error && <div className="text-[12px] text-[var(--red)] border border-[var(--red)]/30 rounded-md px-3 py-2">{error}</div>}
            <button type="submit" disabled={loading} className="w-full bg-[var(--cyan)] text-[var(--bg-deep)] text-[12px] font-semibold tracking-wider py-3 rounded-md hover:opacity-90 disabled:opacity-50">
              {loading ? "PROCESSING\u2026" : mode === "signup" ? "CREATE ACCOUNT \u2192" : "SIGN IN \u2192"}
            </button>
          </form>
          <div className="mt-6 text-center text-[12px] text-[var(--text-muted)]">
            {mode === "signup" ? (
              <>Already have access? <button type="button" onClick={() => { setMode("signin"); setError(null); }} className="text-[var(--cyan)] hover:underline">Sign in</button></>
            ) : (
              <>New here? <button type="button" onClick={() => { setMode("signup"); setError(null); }} className="text-[var(--cyan)] hover:underline">Create account</button></>
            )}
          </div>
          <p className="mt-8 text-[10px] text-[var(--text-dim)] text-center">Demo auth is stored locally in this browser only.</p>
        </div>
      </main>
    </div>
  );
}

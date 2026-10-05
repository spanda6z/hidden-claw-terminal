"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  { label: "SCANNER", status: "ONLINE" },
  { label: "DETECTION", status: "ONLINE" },
  { label: "PUMP.FUN", status: "STREAMING" },
  { label: "INTELLIGENCE", status: "READY" },
];

export default function AccessPage() {
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (visible < STEPS.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 500);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] mono grid-bg">
      <div className="text-[10px] tracking-[0.2em] text-[var(--text-dim)] mb-2">SYSTEM ONLINE</div>
      <div className="text-[11px] tracking-[0.15em] text-[var(--cyan)] mb-1">PRIVATE SYSTEM</div>
      <div className="text-xl font-semibold tracking-[0.12em] mb-8">HIDDEN CLAW</div>
      <div className="text-[11px] text-[var(--text-muted)] mb-6 tracking-wider">INITIALIZING INTELLIGENCE\u2026</div>
      <div className="space-y-2 w-72 mb-10 card p-5">
        {STEPS.map((s, i) => (
          <div
            key={s.label}
            className={`flex justify-between text-[11px] transition-opacity duration-300 ${
              i < visible ? "opacity-100" : "opacity-20"
            }`}
          >
            <span className="text-[var(--text-muted)]">{s.label}</span>
            <span className="text-[var(--green)]">{i < visible ? s.status : "\u00b7\u00b7\u00b7\u00b7\u00b7\u00b7"}</span>
          </div>
        ))}
      </div>
      {done && (
        <button onClick={() => router.push("/terminal")} className="btn-primary">
          ENTER TERMINAL \u2192
        </button>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = [
  { label: "ON-CHAIN", status: "ONLINE" },
  { label: "SMART MONEY", status: "ONLINE" },
  { label: "DEVELOPER DB", status: "ONLINE" },
  { label: "SECURITY", status: "ONLINE" },
  { label: "SOCIAL", status: "ONLINE" },
  { label: "EXECUTION", status: "STANDBY" },
];

export default function AccessPage() {
  const [visible, setVisible] = useState(0);
  const [done, setDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (visible < STEPS.length) {
      const t = setTimeout(() => setVisible((v) => v + 1), 400);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone(true), 600);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg)] mono">
      <div className="text-[10px] tracking-[0.2em] text-[var(--text-dim)] mb-2">ACCESS VERIFIED</div>
      <div className="text-[11px] tracking-[0.15em] text-[var(--cyan)] mb-1">PRIVATE SYSTEM</div>
      <div className="text-xl font-semibold tracking-[0.12em] mb-8">HIDDEN CLAW</div>
      <div className="text-[11px] text-[var(--text-muted)] mb-6 tracking-wider">INITIALIZING INTELLIGENCE...</div>
      <div className="space-y-2 w-64 mb-10">
        {STEPS.map((s, i) => (
          <div key={s.label} className={`flex justify-between text-[11px] transition-opacity duration-300 ${i < visible ? "opacity-100" : "opacity-20"}`}>
            <span className="text-[var(--text-muted)]">{s.label}</span>
            <span className={s.status === "STANDBY" ? "text-[var(--amber)]" : "text-[var(--green)]"}>
              {i < visible ? s.status : "······"}
            </span>
          </div>
        ))}
      </div>
      {done && (
        <button onClick={() => router.push("/terminal")} className="bg-[var(--cyan)] text-black text-[12px] font-semibold tracking-wider px-8 py-3 hover:opacity-90">
          ENTER TERMINAL →
        </button>
      )}
      <p className="text-[10px] text-[var(--text-dim)] mt-8 tracking-wider">SIMULATION · DEMO DATA ONLY</p>
    </div>
  );
}

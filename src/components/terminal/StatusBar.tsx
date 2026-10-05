export function StatusBar() {
  return (
    <footer className="bg-[var(--bg-elevated)] border-t border-[var(--border)] flex items-center px-4 gap-5 text-[10px] mono h-full text-[var(--text-dim)]">
      <span>SCANNER <span className="text-[var(--green)]">ACTIVE</span></span>
      <span>DETECTION <span className="text-[var(--green)]">ACTIVE</span></span>
      <span>PUMP.FUN <span className="text-[var(--green)]">STREAMING</span></span>
      <span>EXECUTION <span className="text-[var(--amber)]">OPTIONAL</span></span>
      <span className="ml-auto">Evidence over prediction</span>
    </footer>
  );
}

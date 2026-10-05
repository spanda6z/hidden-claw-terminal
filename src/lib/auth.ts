const SESSION_KEY = "hc_session";
const USERS_KEY = "hc_users";
const ACCESS_KEY = "hc_access";

export type Session = {
  email: string;
  name?: string;
  createdAt: string;
  remember: boolean;
};

export type AccessRecord = {
  email: string;
  paid: boolean;
  paidAt?: string;
  txSignature?: string;
  wallet?: string;
  amountSol?: number;
};

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Session;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function getAccess(email?: string): AccessRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ACCESS_KEY);
    if (!raw) return null;
    const rec = JSON.parse(raw) as AccessRecord;
    if (email && rec.email !== email.toLowerCase()) return null;
    return rec;
  } catch {
    return null;
  }
}

export function setAccess(record: AccessRecord) {
  localStorage.setItem(ACCESS_KEY, JSON.stringify(record));
}

export function hasPaidAccess(): boolean {
  const session = getSession();
  if (!session) return false;
  const access = getAccess(session.email);
  return Boolean(access?.paid);
}

type StoredUser = { email: string; password: string; name?: string };

export function registerUser(email: string, password: string, name?: string): { ok: boolean; error?: string } {
  const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "An account with this email already exists." };
  }
  if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
  users.push({ email: email.toLowerCase(), password, name });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { ok: true };
}

export function loginUser(email: string, password: string): { ok: boolean; error?: string; name?: string } {
  const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const user = users.find((u) => u.email === email.toLowerCase() && u.password === password);
  if (!user) return { ok: false, error: "Invalid email or password." };
  return { ok: true, name: user.name };
}

export const ACCESS_FEE_SOL = 3;
export const TREASURY_ADDRESS =
  process.env.NEXT_PUBLIC_TREASURY_WALLET ||
  "HCLaw1111111111111111111111111111111111111";

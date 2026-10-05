const SESSION_KEY = "hc_session";
const USERS_KEY = "hc_users";

export type Session = {
  email: string;
  name?: string;
  createdAt: string;
  remember: boolean;
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

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

type StoredUser = {
  email: string;
  password: string;
  name?: string;
};

export function registerUser(email: string, password: string, name?: string): { ok: boolean; error?: string } {
  const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, error: "An account with this email already exists." };
  }
  if (password.length < 6) {
    return { ok: false, error: "Password must be at least 6 characters." };
  }
  users.push({ email: email.toLowerCase(), password, name });
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { ok: true };
}

export function loginUser(email: string, password: string): { ok: boolean; error?: string; name?: string } {
  const users: StoredUser[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  const user = users.find((u) => u.email === email.toLowerCase() && u.password === password);
  if (!user) {
    return { ok: false, error: "Invalid email or password." };
  }
  return { ok: true, name: user.name };
}

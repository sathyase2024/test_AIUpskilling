const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const USER_KEY = 'skillforge_user';

// ─── Auth types ─────────────────────────────────────────────────────────────────

export interface StoredUser {
  id: number | string;
  name: string;
  email: string;
  xp?: number;
  level?: number;
  streak?: number;
  hobbies?: string[];
}

interface AuthResponse {
  accessToken: string;
  user: StoredUser;
}

// ─── Token helpers ──────────────────────────────────────────────────────────────

export function getToken(): string | null {
  return null;
}

export function setToken(_token: string): void {
  // JWT is set as httpOnly cookie by the backend. We only set a flag cookie
  // so Next.js middleware can detect auth state server-side.
  if (typeof document !== 'undefined') {
    document.cookie = 'skillforge_token=1; path=/; SameSite=Lax; max-age=604800';
  }
}

export function clearToken(): void {
  if (typeof document !== 'undefined') {
    document.cookie = 'skillforge_token=; path=/; max-age=0';
    document.cookie = 'access_token=; path=/; max-age=0';
  }
}

// ─── User helpers ───────────────────────────────────────────────────────────────

export function getStoredUser(): StoredUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: StoredUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function isAuthenticated(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.split(';').some((c) => c.trim().startsWith('skillforge_token='));
}

export async function logout(): Promise<void> {
  clearToken();
  if (typeof window !== 'undefined') localStorage.removeItem(USER_KEY);
  try { await apiPost('/auth/logout', {}); } catch { /* ignore */ }
}

// ─── Auth actions ───────────────────────────────────────────────────────────────

/** Log in, persist the token + user, and return the user. */
export async function login(email: string, password: string): Promise<StoredUser> {
  const data = await apiPost<AuthResponse>('/auth/login', { email, password });
  setToken(data.accessToken);
  setStoredUser(data.user);
  return data.user;
}

/** Register, persist the token + user, and return the user. */
export async function register(payload: {
  name: string;
  email: string;
  password: string;
  hobbies?: string[];
}): Promise<StoredUser> {
  const data = await apiPost<AuthResponse>('/auth/register', payload);
  setToken(data.accessToken);
  setStoredUser(data.user);
  return data.user;
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

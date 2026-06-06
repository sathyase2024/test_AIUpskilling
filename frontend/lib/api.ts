const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const TOKEN_KEY = 'skillforge_token';
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
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
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
  return !!getToken();
}

export function logout(): void {
  clearToken();
  if (typeof window !== 'undefined') localStorage.removeItem(USER_KEY);
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
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function apiPatch<T>(path: string, body: unknown): Promise<T> {
  const token = getToken();
  const res = await fetch(`${API_URL}${path}`, {
    method: 'PATCH',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

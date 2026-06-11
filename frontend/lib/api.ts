// All API calls go through the Next.js proxy route (/api/proxy/*).
// The proxy reads BACKEND_URL at runtime — no rebuild needed to change the backend URL.
const API_URL = '/api/proxy'

const USER_KEY = 'skillforge_user';

// ─── Auth types ─────────────────────────────────────────────────────────────────

export interface StoredUser {
  id: number | string;
  name: string;
  username?: string;
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
  username: string;
  email: string;
  password: string;
  hobbies?: string[];
}): Promise<StoredUser> {
  const data = await apiPost<AuthResponse>('/auth/register', payload);
  setToken(data.accessToken);
  setStoredUser(data.user);
  return data.user;
}

/** Request a one-time sign-in code by email. */
export async function requestOtp(email: string): Promise<{ message: string }> {
  return apiPost<{ message: string }>('/auth/otp/request', { email });
}

/** Verify a one-time code, persist the token + user, and return the user. */
export async function verifyOtp(email: string, code: string): Promise<StoredUser> {
  const data = await apiPost<AuthResponse>('/auth/otp/verify', { email, code });
  setToken(data.accessToken);
  setStoredUser(data.user);
  return data.user;
}

// ─── Assessment types ────────────────────────────────────────────────────────

// Correct answers and explanations are never sent with the questions — they
// arrive per-question in SubmitResult.review after an attempt is graded.
export interface AssessmentQuestion {
  question: string;
  options: string[];
  lessonOrder: number;
  moduleIndex?: number;
}

export interface QuestionReview {
  correctAnswer: number;
  explanation: string;
  correct: boolean;
}

export interface AssessmentModuleBank {
  index: number;
  title: string;
  lessonOrders: number[];
  questions: AssessmentQuestion[];
}

export interface Assessment {
  courseSlug: string;
  passThreshold: number;
  modules: AssessmentModuleBank[];
  finalExam: {
    passThreshold: number;
    questions: AssessmentQuestion[];
  };
}

export interface SubmitResult {
  score: number;
  passed: boolean;
  correct: number;
  total: number;
  wrongLessonOrders: number[];
  review: QuestionReview[];
}

export interface AssessmentResultsResponse {
  moduleResults: Record<number, { score: number; passed: boolean; wrongLessonOrders: number[] }>;
  finalResult: { score: number; passed: boolean; wrongLessonOrders: number[] } | null;
  wrongLessonOrders: number[];
}

// ─── Assessment actions ──────────────────────────────────────────────────────

export async function getAssessment(courseSlug: string): Promise<Assessment> {
  return apiGet<Assessment>(`/assessment/${courseSlug}`);
}

export async function getAssessmentResults(courseSlug: string): Promise<AssessmentResultsResponse> {
  return apiGet<AssessmentResultsResponse>(`/assessment/${courseSlug}/results`);
}

export async function submitModuleAssessment(
  courseSlug: string,
  moduleIndex: number,
  answers: number[],
): Promise<SubmitResult> {
  return apiPost<SubmitResult>(`/assessment/${courseSlug}/module/${moduleIndex}/submit`, { answers });
}

export async function submitFinalAssessment(
  courseSlug: string,
  answers: number[],
): Promise<SubmitResult> {
  return apiPost<SubmitResult>(`/assessment/${courseSlug}/final/submit`, { answers });
}

/** Grade an attempt without persisting it (signed-out users). */
export async function gradeAssessment(
  courseSlug: string,
  type: 'module' | 'final',
  answers: number[],
  moduleIndex?: number,
): Promise<SubmitResult> {
  return apiPost<SubmitResult>(`/assessment/${courseSlug}/grade`, { type, moduleIndex, answers });
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    cache: 'no-store',
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

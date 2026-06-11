'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, Users, KeyRound } from 'lucide-react'
import BrandLogo from '@/components/BrandLogo'
import { login, requestOtp, verifyOtp } from '@/lib/api'

type Mode = 'password' | 'otp'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const router = useRouter()

  const [mode, setMode]           = useState<Mode>('password')
  const [email, setEmail]         = useState('')
  const [password, setPassword]   = useState('')
  const [showPass, setShowPass]   = useState(false)
  const [code, setCode]           = useState('')
  const [codeSent, setCodeSent]   = useState(false)
  const [info, setInfo]           = useState<string | null>(null)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)

  function parseError(err: unknown, fallback: string): string {
    const message = err instanceof Error ? err.message : fallback
    try {
      return JSON.parse(message).message ?? fallback
    } catch {
      return fallback
    }
  }

  function switchMode(next: Mode) {
    setMode(next)
    setError(null)
    setInfo(null)
    setCodeSent(false)
    setCode('')
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err: unknown) {
      setError(parseError(err, 'Invalid email or password. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  async function handleRequestCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setInfo(null)
    setLoading(true)
    try {
      const res = await requestOtp(email)
      setCodeSent(true)
      setInfo(res.message ?? 'Check your email for a sign-in code.')
    } catch (err: unknown) {
      setError(parseError(err, 'Could not send a code. Please try again.'))
    } finally {
      setLoading(false)
    }
  }

  async function handleVerifyCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await verifyOtp(email, code)
      router.push('/dashboard')
    } catch (err: unknown) {
      setError(parseError(err, 'Invalid or expired code.'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        background:
          'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(245,158,11,0.08) 0%, transparent 60%), #f7f8fa',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="fixed -top-40 -left-40 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed -bottom-40 -right-40 h-[500px] w-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.07) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-2xl p-8 shadow-xl"
        style={{
          background: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <BrandLogo size="lg" tagline className="mb-6" />

          <h1 className="text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to continue your learning journey</p>
        </div>

        {/* Error banner */}
        {error && (
          <div
            className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl"
            style={{ background: '#fef2f2', border: '1px solid #fecaca' }}
            role="alert"
          >
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Info banner */}
        {info && !error && (
          <div
            className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl"
            style={{ background: '#ecfdf5', border: '1px solid #a7f3d0' }}
            role="status"
          >
            <Mail className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-emerald-700 text-sm">{info}</p>
          </div>
        )}

        {/* Mode toggle */}
        <div
          className="flex p-1 mb-5 rounded-xl"
          style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}
        >
          {(['password', 'otp'] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all"
              style={
                mode === m
                  ? { background: '#ffffff', color: '#b45309', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }
                  : { color: '#64748b' }
              }
            >
              {m === 'password' ? <Lock className="w-3.5 h-3.5" /> : <KeyRound className="w-3.5 h-3.5" />}
              {m === 'password' ? 'Password' : 'Email code'}
            </button>
          ))}
        </div>

        {/* Email field (shared style helper) */}
        {/* ── Password mode ── */}
        {mode === 'password' && (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                  style={{ background: '#ffffff', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
                <Link href="/forgot-password" className="text-xs font-medium transition-colors" style={{ color: '#d97706' }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                <input
                  id="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-11 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                  style={{ background: '#ffffff', border: '1px solid #cbd5e1' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? <EyeOff className="w-4 h-4" aria-hidden="true" /> : <Eye className="w-4 h-4" aria-hidden="true" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: loading ? 'rgba(245,158,11,0.6)' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(245,158,11,0.3)',
              }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        )}

        {/* ── Email-code (OTP) mode ── */}
        {mode === 'otp' && (
          <form onSubmit={codeSent ? handleVerifyCode : handleRequestCode} noValidate className="space-y-4">
            <div>
              <label htmlFor="otp-email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                <input
                  id="otp-email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={codeSent}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm outline-none transition-all disabled:opacity-60"
                  style={{ background: '#ffffff', border: '1px solid #cbd5e1' }}
                />
              </div>
            </div>

            {codeSent && (
              <div>
                <label htmlFor="otp-code" className="block text-sm font-medium text-slate-700 mb-1.5">
                  6-digit code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" aria-hidden="true" />
                  <input
                    id="otp-code"
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    required
                    maxLength={6}
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-lg tracking-[0.4em] outline-none transition-all"
                    style={{ background: '#ffffff', border: '1px solid #cbd5e1' }}
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { setCodeSent(false); setCode(''); setInfo(null) }}
                  className="mt-2 text-xs text-slate-500 hover:text-slate-700 transition-colors"
                >
                  Use a different email
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              style={{
                background: loading ? 'rgba(245,158,11,0.6)' : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(245,158,11,0.3)',
              }}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
              {loading ? 'Please wait…' : codeSent ? 'Verify & Sign In' : 'Email me a code'}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
          <span className="text-slate-400 text-xs font-medium">or</span>
          <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold transition-colors"
            style={{ color: '#d97706' }}
          >
            Sign up
          </Link>
        </p>

        {/* Social proof */}
        <div
          className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl"
          style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
        >
          <Users className="w-4 h-4 text-amber-600" aria-hidden="true" />
          <p className="text-slate-500 text-xs">
            Join{' '}
            <span className="text-slate-700 font-semibold">10K+</span>{' '}
            learners already on SkillVeris
          </p>
        </div>
      </div>
    </div>
  )
}

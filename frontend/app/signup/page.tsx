'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { register } from '@/lib/api'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  User,
  Gamepad2,
  Music,
  Dumbbell,
  Camera,
  Plane,
  TrendingUp,
  UtensilsCrossed,
  Trophy,
} from 'lucide-react'
import BrandLogo from '@/components/BrandLogo'

// ─── Types ────────────────────────────────────────────────────────────────────

type PasswordStrength = 'empty' | 'weak' | 'medium' | 'strong'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) return 'empty'
  const hasLength = password.length >= 8
  const hasUpper = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  if (hasLength && hasUpper && hasNumber && hasSpecial) return 'strong'
  if (hasLength && (hasUpper || hasNumber)) return 'medium'
  if (hasLength) return 'weak'
  return 'weak'
}

function strengthLabel(s: PasswordStrength) {
  if (s === 'empty') return ''
  if (s === 'weak') return 'Weak'
  if (s === 'medium') return 'Medium'
  return 'Strong'
}

function strengthColor(s: PasswordStrength) {
  if (s === 'weak') return '#dc2626'
  if (s === 'medium') return '#ca8a04'
  return '#16a34a'
}

function strengthWidth(s: PasswordStrength) {
  if (s === 'empty') return '0%'
  if (s === 'weak') return '33%'
  if (s === 'medium') return '66%'
  return '100%'
}

// ─── Hobby data ───────────────────────────────────────────────────────────────

const HOBBIES = [
  { label: 'Gaming', icon: Gamepad2 },
  { label: 'Cricket', icon: Trophy },
  { label: 'Music', icon: Music },
  { label: 'Fitness', icon: Dumbbell },
  { label: 'Photography', icon: Camera },
  { label: 'Travel', icon: Plane },
  { label: 'Finance', icon: TrendingUp },
  { label: 'Cooking', icon: UtensilsCrossed },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SignupPage() {
  const router = useRouter()

  const [name, setName]               = useState('')
  const [username, setUsername]       = useState('')
  const [email, setEmail]             = useState('')
  const [password, setPassword]       = useState('')
  const [confirmPassword, setConfirm] = useState('')
  const [showPass, setShowPass]       = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [selectedHobbies, setHobbies] = useState<Set<string>>(new Set())
  const [agreedTerms, setTerms]       = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState<string | null>(null)

  const strength = getPasswordStrength(password)

  function toggleHobby(label: string) {
    setHobbies((prev) => {
      const next = new Set(prev)
      next.has(label) ? next.delete(label) : next.add(label)
      return next
    })
  }

  const inputStyle = {
    background: '#ffffff',
    border: '1px solid #cbd5e1',
  }
  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = '1px solid #f59e0b'
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(245,158,11,0.15)'
  }
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = '1px solid #cbd5e1'
    e.currentTarget.style.boxShadow = 'none'
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!agreedTerms) {
      setError('Please accept the terms and conditions.')
      return
    }

    setLoading(true)
    try {
      await register({
        name,
        username,
        email,
        password,
        hobbies: [...selectedHobbies],
      })
      router.push('/dashboard')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      // Backend errors arrive as a JSON string body — surface the message field if present.
      try {
        const parsed = JSON.parse(message)
        setError(parsed.message ?? 'Registration failed. Please try again.')
      } catch {
        setError(message)
      }
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

          <h1 className="text-2xl font-bold text-slate-900">Start learning today</h1>
          <p className="text-slate-500 text-sm mt-1">Join 10,000+ developers upskilling with AI</p>
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

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-700 mb-1.5">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-sm">@</span>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value.replace(/[^a-zA-Z0-9_-]/g, ''))}
                placeholder="johndoe"
                minLength={3}
                maxLength={30}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">Letters, numbers, _ and - only</p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="password"
                type={showPass ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass
                  ? <EyeOff className="w-4 h-4" aria-hidden="true" />
                  : <Eye className="w-4 h-4" aria-hidden="true" />
                }
              </button>
            </div>

            {/* Strength bar */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: strengthWidth(strength),
                      background: strengthColor(strength),
                    }}
                  />
                </div>
                <p className="text-xs" style={{ color: strengthColor(strength) }}>
                  {strengthLabel(strength)} password
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-slate-700 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="confirm-password"
                type={showConfirm ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 rounded-xl text-slate-900 placeholder-slate-400 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm
                  ? <EyeOff className="w-4 h-4" aria-hidden="true" />
                  : <Eye className="w-4 h-4" aria-hidden="true" />
                }
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
            )}
          </div>

          {/* Hobby Selector */}
          <div
            className="rounded-2xl p-4"
            style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}
          >
            <p className="text-sm font-semibold text-slate-700 mb-1">Personalize your learning</p>
            <p className="text-xs text-slate-500 mb-3">
              AI tailors examples to your interests
            </p>
            <div className="grid grid-cols-4 gap-2">
              {HOBBIES.map(({ label, icon: Icon }) => {
                const selected = selectedHobbies.has(label)
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleHobby(label)}
                    className="flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl text-[11px] font-medium transition-all duration-200"
                    style={
                      selected
                        ? {
                            background: '#fffbeb',
                            border: '1px solid #f59e0b',
                            color: '#b45309',
                          }
                        : {
                            background: '#ffffff',
                            border: '1px solid #cbd5e1',
                            color: '#64748b',
                          }
                    }
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Terms checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div
              className={`mt-0.5 w-4 h-4 rounded border transition-all flex items-center justify-center shrink-0 ${
                agreedTerms
                  ? 'bg-amber-500 border-amber-500'
                  : 'border-slate-300 group-hover:border-slate-400'
              }`}
              onClick={() => setTerms((v) => !v)}
            >
              {agreedTerms && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-xs text-slate-600 leading-relaxed" onClick={() => setTerms((v) => !v)}>
              I agree to the{' '}
              <Link
                href="/terms"
                className="font-semibold transition-colors"
                style={{ color: '#d97706' }}
                onClick={(e) => e.stopPropagation()}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="font-semibold transition-colors"
                style={{ color: '#d97706' }}
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </Link>
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition-all mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              background: loading
                ? 'rgba(245,158,11,0.6)'
                : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(245,158,11,0.3)',
            }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
          <span className="text-slate-400 text-xs font-medium">or</span>
          <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold transition-colors"
            style={{ color: '#d97706' }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

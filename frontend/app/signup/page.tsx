'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { register } from '@/lib/api'
import {
  Sparkles,
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
  if (s === 'weak') return '#ef4444'
  if (s === 'medium') return '#eab308'
  return '#22c55e'
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
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
  }
  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = '1px solid rgba(124,58,237,0.5)'
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124,58,237,0.1)'
  }
  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'
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
          'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(124,58,237,0.22) 0%, transparent 60%), #0a0a0f',
      }}
    >
      {/* Ambient orbs */}
      <div
        className="fixed -top-40 -left-40 h-[600px] w-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.14) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
        aria-hidden="true"
      />
      <div
        className="fixed -bottom-40 -right-40 h-[500px] w-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
          filter: 'blur(48px)',
        }}
        aria-hidden="true"
      />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
        style={{
          background: 'rgba(18,18,26,0.85)',
          border: '1px solid rgba(139,92,246,0.2)',
          backdropFilter: 'blur(24px)',
        }}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 group mb-6"
            aria-label="SkillForge AI — home"
          >
            <div
              className="p-2.5 rounded-xl transition-all duration-300 group-hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}
            >
              <Sparkles className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <span className="font-bold text-xl tracking-tight select-none">
              <span className="text-white">Skill</span>
              <span
                style={{
                  background: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Forge
              </span>
              <span className="text-white/60 font-normal text-base ml-1">AI</span>
            </span>
          </Link>

          <h1 className="text-2xl font-bold text-white">Start learning today</h1>
          <p className="text-white/50 text-sm mt-1">Join 10,000+ developers upskilling with AI</p>
        </div>

        {/* Error banner */}
        {error && (
          <div
            className="flex items-start gap-3 mb-5 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}
            role="alert"
          >
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
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
                className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-white/70 mb-1.5">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none text-sm">@</span>
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
                className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
            <p className="mt-1 text-xs text-white/30">Letters, numbers, _ and - only</p>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
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
                className="w-full pl-10 pr-4 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
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
                className="w-full pl-10 pr-11 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
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
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
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
            <label htmlFor="confirm-password" className="block text-sm font-medium text-white/70 mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none"
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
                className="w-full pl-10 pr-11 py-3 rounded-xl text-white placeholder-white/30 text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={inputFocus}
                onBlur={inputBlur}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                aria-label={showConfirm ? 'Hide password' : 'Show password'}
              >
                {showConfirm
                  ? <EyeOff className="w-4 h-4" aria-hidden="true" />
                  : <Eye className="w-4 h-4" aria-hidden="true" />
                }
              </button>
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="mt-1 text-xs text-red-400">Passwords do not match</p>
            )}
          </div>

          {/* Hobby Selector */}
          <div
            className="rounded-2xl p-4"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <p className="text-sm font-semibold text-white/70 mb-1">Personalize your learning</p>
            <p className="text-xs text-white/30 mb-3">
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
                            background: 'rgba(124,58,237,0.2)',
                            border: '1px solid rgba(124,58,237,0.5)',
                            color: '#c4b5fd',
                          }
                        : {
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: 'rgba(255,255,255,0.4)',
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
                  ? 'bg-purple-500 border-purple-500'
                  : 'border-white/20 group-hover:border-white/40'
              }`}
              onClick={() => setTerms((v) => !v)}
            >
              {agreedTerms && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-xs text-white/50 leading-relaxed" onClick={() => setTerms((v) => !v)}>
              I agree to the{' '}
              <Link
                href="/terms"
                className="font-semibold transition-colors"
                style={{ color: '#a78bfa' }}
                onClick={(e) => e.stopPropagation()}
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="font-semibold transition-colors"
                style={{ color: '#a78bfa' }}
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
                ? 'rgba(124,58,237,0.5)'
                : 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)',
              boxShadow: loading ? 'none' : '0 4px 20px rgba(124,58,237,0.35)',
            }}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />}
            {loading ? 'Creating account…' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <span className="text-white/30 text-xs font-medium">or</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
        </div>

        {/* Sign in link */}
        <p className="text-center text-sm text-white/50">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold transition-colors"
            style={{ color: '#a78bfa' }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

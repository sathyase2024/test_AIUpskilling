'use client'

import Link from 'next/link'
import { Sparkles, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(245,158,11,0.08) 0%, transparent 60%), #f7f8fa' }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-xl"
        style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">Skill<span style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span> <span className="text-slate-500 font-normal text-base">AI</span></span>
          </Link>
          <div className="p-3 rounded-2xl mb-4" style={{ background: '#fffbeb' }}>
            <Mail className="w-6 h-6 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Reset your password</h1>
          <p className="text-slate-500 text-sm mt-1 text-center">Password reset is coming soon. Contact support if you need access.</p>
        </div>

        <div
          className="p-4 rounded-xl text-center mb-6"
          style={{ background: '#fffbeb', border: '1px solid #fde68a' }}
        >
          <p className="text-amber-700 text-sm">This feature is not yet available.</p>
          <p className="text-slate-500 text-xs mt-1">We&apos;re working on it. Check back soon.</p>
        </div>

        <p className="text-center text-sm text-slate-500">
          Remember your password?{' '}
          <Link href="/login" className="font-semibold" style={{ color: '#d97706' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

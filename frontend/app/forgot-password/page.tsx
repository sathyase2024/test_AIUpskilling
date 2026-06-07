'use client'

import Link from 'next/link'
import { Sparkles, Mail } from 'lucide-react'

export default function ForgotPasswordPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'radial-gradient(ellipse 120% 80% at 50% -10%, rgba(124,58,237,0.22) 0%, transparent 60%), #0a0a0f' }}
    >
      <div
        className="w-full max-w-md rounded-3xl p-8 shadow-2xl"
        style={{ background: 'rgba(18,18,26,0.85)', border: '1px solid rgba(139,92,246,0.2)', backdropFilter: 'blur(24px)' }}
      >
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="flex items-center gap-2.5 mb-6">
            <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}>
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">Skill<span style={{ background: 'linear-gradient(135deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Forge</span> <span className="text-white/60 font-normal text-base">AI</span></span>
          </Link>
          <div className="p-3 rounded-2xl mb-4" style={{ background: 'rgba(124,58,237,0.15)' }}>
            <Mail className="w-6 h-6 text-purple-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">Reset your password</h1>
          <p className="text-white/50 text-sm mt-1 text-center">Password reset is coming soon. Contact support if you need access.</p>
        </div>

        <div
          className="p-4 rounded-xl text-center mb-6"
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}
        >
          <p className="text-purple-300 text-sm">This feature is not yet available.</p>
          <p className="text-white/40 text-xs mt-1">We&apos;re working on it. Check back soon.</p>
        </div>

        <p className="text-center text-sm text-white/50">
          Remember your password?{' '}
          <Link href="/login" className="font-semibold" style={{ color: '#a78bfa' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import AuthGuard from '@/components/AuthGuard'
import { apiGet } from '@/lib/api'
import { TrendingUp, CheckCircle, Clock, Loader2 } from 'lucide-react'

interface Overview {
  totalCompleted: number
  totalLessons: number
  streak: number
  xp: number
  level: number
}

export default function ProgressPage() {
  const [overview, setOverview] = useState<Overview | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiGet<Overview>('/progress/overview')
      .then(setOverview)
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <AuthGuard>
      <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
        <Navbar />
        <div className="pt-24 max-w-3xl mx-auto px-4 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">My Progress</h1>
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
            </div>
          )}

          {!loading && overview && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Lessons Done', value: overview.totalCompleted, icon: CheckCircle, color: '#22d3ee' },
                { label: 'Streak', value: `${overview.streak}d`, icon: Clock, color: '#f97316' },
                { label: 'Total XP', value: overview.xp, icon: TrendingUp, color: '#a78bfa' },
                { label: 'Level', value: overview.level, icon: TrendingUp, color: '#4ade80' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="p-5 rounded-2xl" style={{ background: 'rgba(18,18,26,0.85)', border: '1px solid rgba(139,92,246,0.2)' }}>
                  <Icon className="w-5 h-5 mb-3" style={{ color }} />
                  <p className="text-2xl font-bold text-white">{value}</p>
                  <p className="text-white/40 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          )}

          {!loading && !overview && (
            <div className="text-center py-16 text-white/40">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Complete your first lesson to start tracking progress.</p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}

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
      <div className="min-h-screen" style={{ backgroundColor: '#f7f8fa' }}>
        <Navbar />
        <div className="pt-24 max-w-3xl mx-auto px-4 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">My Progress</h1>
          </div>

          {loading && (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            </div>
          )}

          {!loading && overview && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Lessons Done', value: overview.totalCompleted, icon: CheckCircle, color: '#059669' },
                { label: 'Streak', value: `${overview.streak}d`, icon: Clock, color: '#f97316' },
                { label: 'Total XP', value: overview.xp, icon: TrendingUp, color: '#d97706' },
                { label: 'Level', value: overview.level, icon: TrendingUp, color: '#2563eb' },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="p-5 rounded-2xl shadow-sm" style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}>
                  <Icon className="w-5 h-5 mb-3" style={{ color }} />
                  <p className="text-2xl font-bold text-slate-900">{value}</p>
                  <p className="text-slate-500 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          )}

          {!loading && !overview && (
            <div className="text-center py-16 text-slate-500">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Complete your first lesson to start tracking progress.</p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}

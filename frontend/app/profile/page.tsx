'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import AuthGuard from '@/components/AuthGuard'
import { getStoredUser, apiGet, apiPatch, StoredUser } from '@/lib/api'
import { User, Save, Loader2 } from 'lucide-react'

export default function ProfilePage() {
  const [user, setUser] = useState<StoredUser | null>(null)
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = getStoredUser()
    if (stored) { setUser(stored); setName(stored.name) }
    apiGet<StoredUser>('/users/me').then((u) => { setUser(u); setName(u.name) }).catch(() => {})
  }, [])

  async function handleSave() {
    setSaving(true)
    try {
      const updated = await apiPatch<StoredUser>('/users/me', { name })
      setUser(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AuthGuard>
      <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
        <Navbar />
        <div className="pt-24 max-w-2xl mx-auto px-4 pb-12">
          <div className="rounded-2xl p-8" style={{ background: 'rgba(18,18,26,0.85)', border: '1px solid rgba(139,92,246,0.2)' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}>
                <User className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Profile</h1>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Display name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-white text-sm outline-none"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/60 mb-1.5">Email</label>
                <input
                  value={user?.email ?? ''}
                  disabled
                  className="w-full px-4 py-3 rounded-xl text-white/40 text-sm"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                />
              </div>
              <div className="flex items-center gap-4 pt-2">
                <div className="flex gap-4 text-sm text-white/50">
                  <span>Level <span className="text-white font-semibold">{user?.level ?? 1}</span></span>
                  <span>XP <span className="text-white font-semibold">{user?.xp ?? 0}</span></span>
                  <span>Streak <span className="text-white font-semibold">{user?.streak ?? 0}</span></span>
                </div>
              </div>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saved ? 'Saved!' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

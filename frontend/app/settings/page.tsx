'use client'

import Navbar from '@/components/Navbar'
import AuthGuard from '@/components/AuthGuard'
import { Settings, Bell, Shield, Palette } from 'lucide-react'

const sections = [
  { icon: Bell, label: 'Notifications', description: 'Email and in-app notification preferences', comingSoon: true },
  { icon: Shield, label: 'Security', description: 'Password, 2FA, and active sessions', comingSoon: true },
  { icon: Palette, label: 'Appearance', description: 'Theme and display preferences', comingSoon: true },
]

export default function SettingsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
        <Navbar />
        <div className="pt-24 max-w-2xl mx-auto px-4 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)' }}>
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Settings</h1>
          </div>
          <div className="space-y-3">
            {sections.map(({ icon: Icon, label, description, comingSoon }) => (
              <div
                key={label}
                className="flex items-center justify-between p-5 rounded-2xl"
                style={{ background: 'rgba(18,18,26,0.85)', border: '1px solid rgba(139,92,246,0.2)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(124,58,237,0.15)' }}>
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{label}</p>
                    <p className="text-white/40 text-xs mt-0.5">{description}</p>
                  </div>
                </div>
                {comingSoon && (
                  <span className="text-xs px-2.5 py-1 rounded-full text-purple-300 font-medium" style={{ background: 'rgba(124,58,237,0.15)' }}>
                    Coming soon
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}

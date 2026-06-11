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
      <div className="min-h-screen" style={{ backgroundColor: '#f7f8fa' }}>
        <Navbar />
        <div className="pt-24 max-w-2xl mx-auto px-4 pb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl" style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)' }}>
              <Settings className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
          </div>
          <div className="space-y-3">
            {sections.map(({ icon: Icon, label, description, comingSoon }) => (
              <div
                key={label}
                className="flex items-center justify-between p-5 rounded-2xl"
                style={{ background: '#ffffff', border: '1px solid #e2e8f0' }}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg" style={{ background: '#fffbeb' }}>
                    <Icon className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-slate-900 font-medium text-sm">{label}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{description}</p>
                  </div>
                </div>
                {comingSoon && (
                  <span className="text-xs px-2.5 py-1 rounded-full text-amber-700 font-medium" style={{ background: '#fffbeb', border: '1px solid #fde68a' }}>
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

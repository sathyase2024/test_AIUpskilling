import Navbar from '@/components/Navbar'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-white mb-6">Privacy Policy</h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 text-white/70 text-sm leading-relaxed">
          <p>
            SkillForge AI collects your name, email address, and learning progress data (completed
            lessons, XP, streaks) in order to provide a personalised learning experience.
          </p>
          <p>
            Your data is stored securely and is never sold or shared with third parties. It is used
            solely to operate and improve the SkillForge AI platform.
          </p>
          <p>
            This is an MVP and research preview. A full privacy policy will be published before any
            general availability release.
          </p>
          <p className="text-white/40 text-xs">Last updated: June 2026</p>
        </div>
      </main>
    </div>
  )
}

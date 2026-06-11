import Navbar from '@/components/Navbar'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f8fa' }}>
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 text-slate-600 text-sm leading-relaxed">
          <p>
            SkillVeris collects your name, email address, and learning progress data (completed
            lessons, XP, streaks) in order to provide a personalised learning experience.
          </p>
          <p>
            Your data is stored securely and is never sold or shared with third parties. It is used
            solely to operate and improve the SkillVeris platform.
          </p>
          <p>
            This is an MVP and research preview. A full privacy policy will be published before any
            general availability release.
          </p>
          <p className="text-slate-500 text-xs">Last updated: June 2026</p>
        </div>
      </main>
    </div>
  )
}

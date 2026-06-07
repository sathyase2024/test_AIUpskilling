import Navbar from '@/components/Navbar'

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0a0a0f' }}>
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-white mb-6">Terms of Service</h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4 text-white/70 text-sm leading-relaxed">
          <p>
            SkillForge AI is currently an MVP and research preview. Full terms of service are coming
            soon.
          </p>
          <p>
            By using this platform you agree to use it for personal, non-commercial learning
            purposes only. We reserve the right to modify or discontinue the service at any time
            during this preview period.
          </p>
          <p className="text-white/40 text-xs">Last updated: June 2026</p>
        </div>
      </main>
    </div>
  )
}

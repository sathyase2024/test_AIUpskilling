import Navbar from '@/components/Navbar'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] dark:bg-transparent">
      <Navbar />
      <main className="pt-24 pb-16 max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Terms of Service</h1>
        <div className="bg-white dark:bg-[#12121a] border border-slate-200 dark:border-white/10 rounded-2xl p-8 space-y-4 text-slate-600 dark:text-white/70 text-sm leading-relaxed">
          <p>
            SkillVeris is currently an MVP and research preview. Full terms of service are coming
            soon.
          </p>
          <p>
            By using this platform you agree to use it for personal, non-commercial learning
            purposes only. We reserve the right to modify or discontinue the service at any time
            during this preview period.
          </p>
          <p className="text-slate-500 dark:text-white/50 text-xs">Last updated: June 2026</p>
        </div>
      </main>
    </div>
  )
}

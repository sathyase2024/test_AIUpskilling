import Link from 'next/link'

/**
 * SkillVeris brand lockup: shield mark (network-of-skills + learner motif)
 * with the two-tone wordmark and the "powered by Sri Hayavadhana" tagline.
 * Single source of truth for the logo — use everywhere the brand appears.
 */

export function BrandMark({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sv-shield" x1="10" y1="6" x2="54" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FBBF24" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Shield outline */}
      <path
        d="M32 4 L54 12 V31 C54 45 45 55 32 60 C19 55 10 45 10 31 V12 Z"
        stroke="url(#sv-shield)"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Check accent along the bottom-right shield edge */}
      <path
        d="M24 50 L32 56 L46 41"
        stroke="url(#sv-shield)"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Skill network nodes */}
      <circle cx="21" cy="19" r="2.6" fill="#F59E0B" />
      <circle cx="32" cy="14" r="2.6" fill="#F59E0B" />
      <circle cx="43" cy="19" r="2.6" fill="#F59E0B" />
      <circle cx="32" cy="25" r="3.2" fill="#FBBF24" />
      <path
        d="M21 19 L32 25 M32 14 L32 25 M43 19 L32 25"
        stroke="#F59E0B"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Learner: head + shoulders */}
      <circle cx="32" cy="35" r="4.4" fill="#F59E0B" />
      <path d="M23.5 49 C23.5 42.5 40.5 42.5 40.5 49" fill="#F59E0B" />
    </svg>
  )
}

export function BrandWordmark({
  size = 'md',
  tagline = true,
}: {
  size?: 'md' | 'lg'
  tagline?: boolean
}) {
  const text = size === 'lg' ? 'text-xl' : 'text-lg'
  return (
    <span className="flex flex-col leading-none select-none">
      <span className={`font-bold ${text} tracking-tight`}>
        <span style={{ color: '#F59E0B' }}>Skill</span>
        <span className="text-slate-700 dark:text-white">Veris</span>
      </span>
      {tagline && (
        <span className="text-[9px] text-slate-500 dark:text-white/50 font-normal tracking-wide mt-1">
          powered by Sri Hayavadhana
        </span>
      )}
    </span>
  )
}

export default function BrandLogo({
  size = 'md',
  tagline = true,
  href = '/',
  className = '',
}: {
  size?: 'md' | 'lg'
  tagline?: boolean
  href?: string
  className?: string
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2.5 group flex-shrink-0 ${className}`}
      aria-label="SkillVeris — home"
    >
      <span className="transition-transform duration-300 group-hover:scale-105">
        <BrandMark className={size === 'lg' ? 'w-11 h-11' : 'w-9 h-9'} />
      </span>
      <BrandWordmark size={size} tagline={tagline} />
    </Link>
  )
}

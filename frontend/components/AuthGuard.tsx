'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { isAuthenticated } from '@/lib/api'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace('/login?next=' + encodeURIComponent(window.location.pathname))
    }
  }, [router])

  if (typeof window !== 'undefined' && !isAuthenticated()) return null

  return <>{children}</>
}

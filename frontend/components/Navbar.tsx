'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Brain, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-400">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              AI<span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Upskill</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/topics" className="text-sm text-white/70 hover:text-white transition-colors">
              Topics
            </Link>
            <Link href="/paths" className="text-sm text-white/70 hover:text-white transition-colors">
              Career Paths
            </Link>
            <Link href="/learn" className="text-sm text-white/70 hover:text-white transition-colors">
              Learn
            </Link>
            <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors">
              About
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-white/70 hover:text-white transition-colors px-4 py-2"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-md">
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link href="/topics" className="text-sm text-white/70 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
              Topics
            </Link>
            <Link href="/paths" className="text-sm text-white/70 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
              Career Paths
            </Link>
            <Link href="/learn" className="text-sm text-white/70 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
              Learn
            </Link>
            <Link href="/about" className="text-sm text-white/70 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
              <Link href="/login" className="text-sm text-center text-white/70 hover:text-white transition-colors py-2">
                Sign In
              </Link>
              <Link
                href="/signup"
                className="text-sm font-medium text-center text-white py-2 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

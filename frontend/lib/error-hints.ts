import hintsRaw from './error-hints.json'

export interface ErrorHint {
  title: string
  cause: string
  fix: string
  example?: string
}

interface HintEntry {
  pattern: string
  title: string
  cause: string
  fix: string
  example?: string
}

const hints = hintsRaw as HintEntry[]

export function matchErrorHint(stderr: string): ErrorHint | null {
  if (!stderr || !stderr.trim()) return null
  for (const h of hints) {
    try {
      if (new RegExp(h.pattern, 'i').test(stderr)) {
        return { title: h.title, cause: h.cause, fix: h.fix, example: h.example }
      }
    } catch {
      // skip malformed pattern
    }
  }
  return null
}

// Sandbox capabilities — sourced from the backend (GET /code/capabilities),
// which is the single source of truth for what the code playground can run.
// A static fallback (mirroring the backend defaults) keeps everything working
// if the request fails, so the UI never hard-depends on the network call.
import { apiGet } from './api'

export interface SandboxCapabilities {
  languages: { id: string; label: string; aliases: string[]; available: boolean }[]
  python: { available: string[]; unavailable: string[] }
}

// Mirror of backend/src/code/sandbox.config.ts defaults. Kept only as a
// fallback; the live values come from the backend at runtime.
export const DEFAULT_CAPABILITIES: SandboxCapabilities = {
  languages: [
    { id: 'python',     label: 'Python',     aliases: ['python', 'py', 'python3'],            available: true },
    { id: 'javascript', label: 'JavaScript', aliases: ['javascript', 'js', 'node', 'nodejs'], available: true },
    { id: 'typescript', label: 'TypeScript', aliases: ['typescript', 'ts'],                   available: true },
    { id: 'java',       label: 'Java',       aliases: ['java'],                               available: true },
    { id: 'cpp',        label: 'C++',        aliases: ['cpp', 'c++', 'cxx', 'cc'],            available: true },
    { id: 'go',         label: 'Go',         aliases: ['go', 'golang'],                       available: true },
  ],
  python: {
    available: ['numpy', 'pandas', 'sklearn', 'scipy', 'matplotlib', 'seaborn', 'psutil'],
    unavailable: [
      'torch', 'tensorflow', 'keras', 'transformers', 'sentence_transformers',
      'datasets', 'peft', 'faiss', 'langchain', 'anthropic', 'openai',
      'pydantic', 'accelerate', 'bitsandbytes', 'trl', 'vllm',
    ],
  },
}

export async function fetchCapabilities(): Promise<SandboxCapabilities> {
  try {
    return await apiGet<SandboxCapabilities>('/code/capabilities')
  } catch {
    return DEFAULT_CAPABILITIES
  }
}

/** Resolve a lesson/client language string to a canonical editor language id. */
export function toEditorLang(
  raw: string | undefined,
  caps: SandboxCapabilities = DEFAULT_CAPABILITIES,
): string | null {
  const l = (raw ?? '').toLowerCase().trim()
  if (!l) return null
  for (const lang of caps.languages) {
    if (lang.aliases.includes(l)) return lang.id
  }
  return null
}

/** True if Python code imports a library the sandbox can't run. */
export function pythonNeedsUnavailableLib(
  code: string,
  caps: SandboxCapabilities = DEFAULT_CAPABILITIES,
): boolean {
  const unavailable = new Set(caps.python.unavailable)
  const re = /^\s*(?:import|from)\s+([a-zA-Z0-9_]+)/gm
  let m: RegExpExecArray | null
  while ((m = re.exec(code)) !== null) {
    if (unavailable.has(m[1])) return true
  }
  return false
}

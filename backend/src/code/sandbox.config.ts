/**
 * SINGLE SOURCE OF TRUTH for the code-execution sandbox.
 *
 * When you add a new program/course that needs the playground to run a new
 * language or library, update THIS file (and keep backend/Dockerfile in sync).
 * The backend dispatches execution from here, and the frontend reads the same
 * definitions via GET /code/capabilities — so the UI never drifts from what is
 * actually installed.
 *
 * ── Checklist: add a new LANGUAGE ────────────────────────────────────────────
 *   1. Add an entry to LANGUAGES below (id, label, aliases, available: true).
 *   2. Add a runner for it in code.service.ts and register it in `runners`.
 *   3. Install its runtime in backend/Dockerfile.
 *   4. (Optional) Add starter code + a Monaco language id in the frontend's
 *      EmbeddedEditor LANGUAGES map so it gets a toolbar button.
 *
 * ── Checklist: add a Python LIBRARY ──────────────────────────────────────────
 *   1. Add the import name to PYTHON_AVAILABLE_LIBRARIES below.
 *   2. Install it in backend/Dockerfile (prefer Alpine py3-* packages).
 *   3. Remove it from PYTHON_UNAVAILABLE_LIBRARIES if it was listed there.
 */

export interface LanguageConfig {
  /** Canonical id used by the API and the run dispatcher. */
  id: string;
  /** Human-readable name. */
  label: string;
  /** Language strings (from clients or lesson metadata) that map to this id. */
  aliases: string[];
  /** Whether the runtime is installed in the sandbox image. */
  available: boolean;
}

export const LANGUAGES: LanguageConfig[] = [
  { id: 'python',     label: 'Python',     aliases: ['python', 'py', 'python3'],            available: true },
  { id: 'javascript', label: 'JavaScript', aliases: ['javascript', 'js', 'node', 'nodejs'], available: true },
  { id: 'typescript', label: 'TypeScript', aliases: ['typescript', 'ts'],                   available: true },
  { id: 'java',       label: 'Java',       aliases: ['java'],                               available: true },
  { id: 'cpp',        label: 'C++',        aliases: ['cpp', 'c++', 'cxx', 'cc'],            available: true },
  { id: 'go',         label: 'Go',         aliases: ['go', 'golang'],                       available: true },
];

/**
 * Python libraries installed in the backend sandbox image (py3-* Alpine packages).
 * Used as fallback when CODE_RUNNER_URL is not set.
 */
export const PYTHON_AVAILABLE_LIBRARIES = [
  'numpy', 'pandas', 'sklearn', 'scipy', 'matplotlib', 'seaborn', 'psutil',
];

/**
 * Additional Python libraries available only in the code-runner service.
 * When CODE_RUNNER_URL is configured, these are added to the available list.
 */
export const CODE_RUNNER_EXTRA_LIBRARIES = [
  'torch', 'tensorflow', 'keras', 'transformers', 'datasets',
  'sentence_transformers', 'pydantic',
];

/**
 * Libraries that remain unavailable even with the code-runner (API keys,
 * network access, or incompatible with a short-lived sandbox).
 */
export const PYTHON_UNAVAILABLE_LIBRARIES = [
  'faiss', 'langchain', 'anthropic', 'openai',
  'accelerate', 'bitsandbytes', 'trl', 'vllm', 'peft',
];

const ALIAS_TO_ID = new Map<string, string>(
  LANGUAGES.flatMap((l) => l.aliases.map((a) => [a.toLowerCase(), l.id] as const)),
);

/** Resolve a client/lesson language string to a canonical language id, or null. */
export function resolveLanguageId(raw?: string): string | null {
  if (!raw) return null;
  return ALIAS_TO_ID.get(raw.toLowerCase().trim()) ?? null;
}

/** Capabilities payload returned by GET /code/capabilities. */
export function getCapabilities(codeRunnerActive = false) {
  const available = codeRunnerActive
    ? [...PYTHON_AVAILABLE_LIBRARIES, ...CODE_RUNNER_EXTRA_LIBRARIES]
    : PYTHON_AVAILABLE_LIBRARIES;
  return {
    languages: LANGUAGES.map(({ id, label, aliases, available: avail }) => ({ id, label, aliases, available: avail })),
    python: {
      available,
      unavailable: PYTHON_UNAVAILABLE_LIBRARIES,
    },
    codeRunnerActive,
  };
}

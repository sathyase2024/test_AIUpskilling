'use client'

import { useState } from 'react'
import { Lightbulb, AlertTriangle, CheckCircle, Code2, BookOpen, HelpCircle, Sparkles, Copy, Check } from 'lucide-react'
import PersonalizationCard from '@/components/PersonalizationCard'
import type { InterestDomain } from '@/lib/personalization/engine'

interface LessonSection {
  type: 'heading' | 'paragraph' | 'code' | 'info_box' | 'warning_box' | 'quiz' | 'exercise' | 'key_points' | 'analogy'
  content: string
  language?: string
  level?: number
  items?: string[]
  answer?: number
  explanation?: string
}

interface LessonContent {
  title: string
  type: string
  topicName: string
  sections: LessonSection[]
  estimatedMinutes?: number
  xpReward?: number
}

interface Props {
  content: LessonContent
  courseSlug?: string
  activeDomain?: InterestDomain
}

interface SectionProps {
  section: LessonSection
  index: number
  quizAnswers: Map<number, number>
  onQuizAnswer: (sectionIndex: number, optionIndex: number) => void
}

// ─── Syntax Highlighter ───────────────────────────────────────────────────────

const PY_KW = new Set([
  'def', 'class', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
  'True', 'False', 'None', 'import', 'from', 'with', 'as', 'try', 'except', 'finally',
  'raise', 'pass', 'break', 'continue', 'yield', 'lambda', 'self', 'cls', 'global',
  'nonlocal', 'del', 'is', 'assert', 'async', 'await',
])

const JS_KW = new Set([
  'const', 'let', 'var', 'function', 'class', 'return', 'if', 'else', 'for', 'while',
  'do', 'switch', 'case', 'break', 'continue', 'import', 'export', 'default', 'from',
  'new', 'this', 'typeof', 'instanceof', 'null', 'undefined', 'true', 'false', 'throw',
  'try', 'catch', 'finally', 'async', 'await', 'interface', 'type', 'enum', 'extends',
  'implements', 'of', 'in', 'delete', 'void', 'static', 'public', 'private', 'protected',
  'readonly', 'abstract', 'override',
])

const BUILTINS = new Set([
  'print', 'len', 'range', 'list', 'dict', 'set', 'tuple', 'str', 'int', 'float', 'bool',
  'type', 'isinstance', 'hasattr', 'getattr', 'setattr', 'super', 'object', 'property',
  'classmethod', 'staticmethod', 'enumerate', 'zip', 'map', 'filter', 'sorted', 'reversed',
  'open', 'input', 'any', 'all', 'max', 'min', 'sum', 'abs', 'round', 'next', 'iter',
  'callable', 'repr', 'id', 'dir', 'vars', 'help', 'hash', 'hex', 'oct', 'bin',
  'console', 'Math', 'Array', 'Object', 'Promise', 'JSON', 'Number', 'String', 'Boolean',
  'Error', 'TypeError', 'ValueError', 'KeyError', 'IndexError', 'Exception', 'RuntimeError',
])

type Token = { text: string; color: string }

function tokenizeLine(line: string, kw: Set<string>): Token[] {
  const tokens: Token[] = []
  let pos = 0

  while (pos < line.length) {
    const rest = line.slice(pos)

    // Single-line comment
    if (rest.startsWith('#') || rest.startsWith('//')) {
      tokens.push({ text: rest, color: '#6b7280' })
      break
    }

    // Triple-quoted string (simplified — single-line only for safety)
    const tripleMatch = rest.match(/^(""".*?"""|'''.*?''')/)
    if (tripleMatch) {
      tokens.push({ text: tripleMatch[0], color: '#34d399' })
      pos += tripleMatch[0].length
      continue
    }

    // Regular string
    const strMatch = rest.match(/^("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/)
    if (strMatch) {
      tokens.push({ text: strMatch[0], color: '#34d399' })
      pos += strMatch[0].length
      continue
    }

    // Decorator (@name)
    const decorMatch = rest.match(/^@[a-zA-Z_]\w*/)
    if (decorMatch) {
      tokens.push({ text: decorMatch[0], color: '#fb923c' })
      pos += decorMatch[0].length
      continue
    }

    // Number
    const numMatch = rest.match(/^\d+\.?\d*(?:e[+-]?\d+)?/)
    if (numMatch) {
      tokens.push({ text: numMatch[0], color: '#f59e0b' })
      pos += numMatch[0].length
      continue
    }

    // Identifier or keyword
    const wordMatch = rest.match(/^[a-zA-Z_]\w*/)
    if (wordMatch) {
      const word = wordMatch[0]
      let color: string
      if (kw.has(word)) {
        color = '#c084fc'   // keyword: purple-400
      } else if (BUILTINS.has(word)) {
        color = '#fcd34d'   // builtin: amber-300
      } else if (/^[A-Z]/.test(word)) {
        color = '#67e8f9'   // class/type: cyan-300
      } else {
        const after = line.slice(pos + word.length).trimStart()
        color = after.startsWith('(') ? '#93c5fd' : '#e2e8f0'  // fn: blue-300, ident: slate-200
      }
      tokens.push({ text: word, color })
      pos += word.length
      continue
    }

    // Operator/punctuation
    tokens.push({ text: rest[0], color: '#94a3b8' })
    pos++
  }

  return tokens
}

function SyntaxCode({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = useState(false)
  const lang = (language ?? '').toLowerCase()
  const kw = lang === 'python' || lang === 'py' ? PY_KW : JS_KW
  const lines = code.split('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161622] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="w-px h-3.5 bg-white/10 mx-1" />
          <Code2 size={12} className="text-purple-400" />
          <span className="text-xs text-white/40 font-mono">{language || 'code'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors px-2 py-1 rounded-md hover:bg-white/5"
          title="Copy code"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>

      {/* Code */}
      <pre className="p-4 bg-[#0d0d14] text-sm font-mono leading-relaxed overflow-x-auto">
        <code>
          {lines.map((line, lineIdx) => (
            <span key={lineIdx}>
              {tokenizeLine(line, kw).map((token, i) => (
                <span key={i} style={{ color: token.color }}>{token.text}</span>
              ))}
              {lineIdx < lines.length - 1 && '\n'}
            </span>
          ))}
        </code>
      </pre>
    </div>
  )
}

// ─── Section Renderer ─────────────────────────────────────────────────────────

function SectionRenderer({ section, index, quizAnswers, onQuizAnswer }: SectionProps) {
  switch (section.type) {
    case 'heading': {
      const level = section.level ?? 2
      if (level === 2) {
        return (
          <h2 className="text-[18px] font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/10 pb-3 mt-12 mb-5">
            {section.content}
          </h2>
        )
      }
      return (
        <h3 className="text-[15px] font-semibold text-slate-800 dark:text-white/90 mt-8 mb-2.5 tracking-tight">
          {section.content}
        </h3>
      )
    }

    case 'paragraph':
      return (
        <p className="text-[15px] text-slate-600 dark:text-white/65 leading-[1.85] mb-5">
          {section.content}
        </p>
      )

    case 'code':
      return <SyntaxCode code={section.content} language={section.language} />

    case 'info_box':
      return (
        <div className="my-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25 flex gap-3">
          <Lightbulb size={18} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-900 dark:text-blue-300 text-sm leading-relaxed">{section.content}</p>
        </div>
      )

    case 'warning_box':
      return (
        <div className="my-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 flex gap-3">
          <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-900 dark:text-amber-200 text-sm leading-relaxed">{section.content}</p>
        </div>
      )

    case 'analogy':
      // Replaced by PersonalizationCard in the parent — rendered inline per-domain.
      // This case only runs when courseSlug is not provided (no personalization context).
      return (
        <div className="my-6 p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 border border-amber-200 dark:border-amber-500/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Analogy</span>
          </div>
          <p className="text-slate-700 dark:text-white/75 text-sm leading-relaxed whitespace-pre-wrap">{section.content}</p>
        </div>
      )

    case 'key_points':
      return (
        <ul className="my-5 space-y-2.5">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle size={15} className="text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-[3px]" />
              <span className="text-[14px] text-slate-600 dark:text-white/70 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      )

    case 'quiz': {
      const question = section.content
      const options = section.items ?? []
      const selectedAnswer = quizAnswers.get(index)
      const hasAnswered = selectedAnswer !== undefined
      const correctAnswer = section.answer ?? 0

      return (
        <div className="my-6 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/10 dark:to-orange-500/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={18} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Knowledge Check</span>
          </div>
          <p className="text-sm font-medium text-slate-900 dark:text-white mb-4">{question}</p>
          <div className="space-y-2">
            {(options.length > 0 ? options : ['Option A', 'Option B', 'Option C', 'Option D']).map((option, i) => {
              const isSelected = selectedAnswer === i
              const isCorrect = i === correctAnswer
              let cls = 'w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all '
              if (!hasAnswered) {
                cls += 'border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-700 dark:text-white/90 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-amber-400 dark:hover:border-amber-500/50 cursor-pointer'
              } else if (isCorrect) {
                cls += 'border-emerald-200 dark:border-emerald-500/25 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 cursor-default'
              } else if (isSelected && !isCorrect) {
                cls += 'border-red-200 dark:border-red-500/25 bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-300 cursor-default'
              } else {
                cls += 'border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 text-slate-400 dark:text-white/40 cursor-default'
              }
              return (
                <button
                  key={i}
                  onClick={() => !hasAnswered && onQuizAnswer(index, i)}
                  disabled={hasAnswered}
                  className={cls}
                >
                  <span className="font-mono text-slate-400 dark:text-white/40 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </button>
              )
            })}
          </div>
          {hasAnswered && (
            <div className="mt-4 p-3 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <p className="text-xs text-slate-600 dark:text-white/70 leading-relaxed">
                {selectedAnswer === correctAnswer
                  ? <span className="text-emerald-700 dark:text-emerald-300 font-semibold">Correct! </span>
                  : <span className="text-red-700 dark:text-red-300 font-semibold">Incorrect. </span>}
                {section.explanation && section.explanation}
              </p>
            </div>
          )}
        </div>
      )
    }

    case 'exercise': {
      const steps = section.content.includes('\n')
        ? section.content.split('\n').filter(Boolean)
        : null

      return (
        <div className="my-6 rounded-xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-amber-700 dark:text-amber-300">Exercise</span>
          </div>
          {steps ? (
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-mono flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-slate-700 dark:text-white/75 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-slate-700 dark:text-white/75 text-sm leading-relaxed">{section.content}</p>
          )}
        </div>
      )
    }

    default:
      return null
  }
}

type RenderItem =
  | { kind: 'section'; section: LessonSection; index: number }
  | { kind: 'card'; conceptId: string; conceptName: string; fallbackText: string | undefined; analogyIndex: number }

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

/** Build an ordered list of things to render.
 *
 *  Two lesson shapes are handled:
 *  1. Lesson generated with hobby="cricket" → has explicit `analogy` sections.
 *     Each analogy section becomes a PersonalizationCard (with fallbackText).
 *  2. Lesson generated without hobby → no `analogy` sections.
 *     A PersonalizationCard is injected after the first paragraph that follows
 *     each level-3 concept heading (no fallbackText — analogy comes from DB).
 */
function buildRenderItems(content: LessonContent, courseSlug: string | undefined): RenderItem[] {
  const items: RenderItem[] = []
  if (!courseSlug) {
    return content.sections.map((section, index) => ({ kind: 'section', section, index }))
  }

  const seen = new Set<string>()   // dedup: one card per conceptId
  let l3Heading: { name: string; id: string } | null = null
  let analogyIndex = 0

  for (let i = 0; i < content.sections.length; i++) {
    const s = content.sections[i]

    if (s.type === 'heading') {
      // Level-3 headings are concept names; level-2 headings are major sections
      if ((s.level ?? 2) === 3 && s.content) {
        l3Heading = { name: s.content, id: slugify(s.content) }
      } else {
        l3Heading = null
      }
      items.push({ kind: 'section', section: s, index: i })

    } else if (s.type === 'analogy') {
      // Explicit analogy section — replace with PersonalizationCard
      const name = l3Heading?.name ?? content.title
      const id   = l3Heading?.id   ?? slugify(content.title)
      if (!seen.has(id)) {
        seen.add(id)
        items.push({ kind: 'card', conceptId: id, conceptName: name, fallbackText: s.content || undefined, analogyIndex: analogyIndex++ })
        l3Heading = null   // consumed
      }
      // Skip rendering the raw analogy section — card replaces it

    } else if (s.type === 'paragraph' && l3Heading) {
      items.push({ kind: 'section', section: s, index: i })
      // If the very next section is NOT an analogy, inject a card here
      // (lesson has no analogy sections — relies entirely on DB cache)
      const next = content.sections[i + 1]
      if (next?.type !== 'analogy' && !seen.has(l3Heading.id)) {
        seen.add(l3Heading.id)
        items.push({ kind: 'card', conceptId: l3Heading.id, conceptName: l3Heading.name, fallbackText: undefined, analogyIndex: analogyIndex++ })
        l3Heading = null   // consumed — don't inject again for subsequent paragraphs
      }

    } else {
      items.push({ kind: 'section', section: s, index: i })
    }
  }

  return items
}

export default function LessonRenderer({ content, courseSlug, activeDomain }: Props) {
  const [quizAnswers, setQuizAnswers] = useState<Map<number, number>>(new Map())

  const handleQuizAnswer = (sectionIndex: number, optionIndex: number) => {
    setQuizAnswers(prev => {
      const next = new Map(prev)
      next.set(sectionIndex, optionIndex)
      return next
    })
  }

  const renderItems = buildRenderItems(content, courseSlug)

  return (
    <article className="prose-custom max-w-none">
      {renderItems.map((item, i) => {
        if (item.kind === 'card') {
          return (
            <PersonalizationCard
              key={`card-${item.conceptId}-${i}`}
              courseSlug={courseSlug!}
              conceptId={item.conceptId}
              conceptName={item.conceptName}
              fallbackText={item.fallbackText}
              sectionIndex={item.analogyIndex}
              activeDomain={activeDomain}
            />
          )
        }
        return (
          <SectionRenderer
            key={item.index}
            section={item.section}
            index={item.index}
            quizAnswers={quizAnswers}
            onQuizAnswer={handleQuizAnswer}
          />
        )
      })}
    </article>
  )
}

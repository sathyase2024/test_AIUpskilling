'use client'

import { useState } from 'react'
import { Lightbulb, AlertTriangle, CheckCircle, Code2, BookOpen, HelpCircle, Sparkles } from 'lucide-react'

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
}

interface SectionProps {
  section: LessonSection
  index: number
  quizAnswers: Map<number, number>
  onQuizAnswer: (sectionIndex: number, optionIndex: number) => void
}

function SectionRenderer({ section, index, quizAnswers, onQuizAnswer }: SectionProps) {
  switch (section.type) {
    case 'heading': {
      const level = section.level ?? 2
      if (level === 2) {
        return (
          <h2 className="text-xl font-bold text-white border-b border-white/10 pb-2 mt-8 mb-4">
            {section.content}
          </h2>
        )
      }
      return (
        <h3 className="text-lg font-bold text-white border-b border-white/10 pb-2 mt-8 mb-4">
          {section.content}
        </h3>
      )
    }

    case 'paragraph':
      return (
        <p className="text-white/80 leading-relaxed mb-4">
          {section.content}
        </p>
      )

    case 'code':
      return (
        <div className="my-6 rounded-xl overflow-hidden border border-white/10">
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border-b border-white/10">
            <Code2 size={14} className="text-purple-400" />
            <span className="text-xs text-white/40 font-mono">{section.language || 'code'}</span>
          </div>
          <pre className="p-4 bg-[#0d0d14] text-sm font-mono leading-relaxed overflow-x-auto text-green-300">
            <code>{section.content}</code>
          </pre>
        </div>
      )

    case 'info_box':
      return (
        <div className="my-4 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3">
          <Lightbulb size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-200/80 text-sm leading-relaxed">{section.content}</p>
        </div>
      )

    case 'warning_box':
      return (
        <div className="my-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
          <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-200/80 text-sm leading-relaxed">{section.content}</p>
        </div>
      )

    case 'analogy':
      return (
        <div className="my-6 p-5 rounded-2xl bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5 border border-violet-500/25">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-violet-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-violet-300">Analogy</span>
          </div>
          <p className="text-violet-100/80 text-sm leading-relaxed whitespace-pre-wrap">{section.content}</p>
        </div>
      )

    case 'key_points':
      return (
        <ul className="my-4 space-y-2">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-white/75 text-sm">{item}</span>
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
        <div className="my-6 rounded-2xl border border-purple-500/25 bg-gradient-to-br from-purple-900/20 to-violet-900/10 p-6">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={18} className="text-purple-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-purple-300">Knowledge Check</span>
          </div>
          <p className="text-sm font-medium text-white/90 mb-4">{question}</p>
          <div className="space-y-2">
            {(options.length > 0 ? options : ['Option A', 'Option B', 'Option C', 'Option D']).map((option, i) => {
              const isSelected = selectedAnswer === i
              const isCorrect = i === correctAnswer
              let buttonClass = 'w-full text-left px-4 py-2.5 rounded-lg border text-sm transition-all '
              if (!hasAnswered) {
                buttonClass += 'border-white/10 bg-white/5 text-white/60 hover:bg-white/8 hover:border-white/20 cursor-pointer'
              } else if (isCorrect) {
                buttonClass += 'border-green-500/40 bg-green-500/10 text-green-300 cursor-default'
              } else if (isSelected && !isCorrect) {
                buttonClass += 'border-red-500/40 bg-red-500/10 text-red-300 cursor-default'
              } else {
                buttonClass += 'border-white/5 bg-white/3 text-white/30 cursor-default'
              }
              return (
                <button
                  key={i}
                  onClick={() => !hasAnswered && onQuizAnswer(index, i)}
                  disabled={hasAnswered}
                  className={buttonClass}
                >
                  <span className="font-mono text-white/30 mr-2">{String.fromCharCode(65 + i)}.</span>
                  {option}
                </button>
              )
            })}
          </div>
          {hasAnswered && section.explanation && (
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/60 leading-relaxed">
                <span className="font-semibold text-white/80">Explanation: </span>
                {section.explanation}
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
        <div className="my-6 rounded-xl border border-cyan-500/20 bg-cyan-900/10 p-5">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={16} className="text-cyan-400 flex-shrink-0" />
            <span className="text-sm font-semibold text-cyan-300">Exercise</span>
          </div>
          {steps ? (
            <ol className="space-y-2">
              {steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-white/75 text-sm leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-white/75 text-sm leading-relaxed">{section.content}</p>
          )}
        </div>
      )
    }

    default:
      return null
  }
}

export default function LessonRenderer({ content }: Props) {
  const [quizAnswers, setQuizAnswers] = useState<Map<number, number>>(new Map())

  const handleQuizAnswer = (sectionIndex: number, optionIndex: number) => {
    setQuizAnswers(prev => {
      const next = new Map(prev)
      next.set(sectionIndex, optionIndex)
      return next
    })
  }

  return (
    <article className="prose-custom max-w-none">
      {content.sections.map((section, i) => (
        <SectionRenderer
          key={i}
          section={section}
          index={i}
          quizAnswers={quizAnswers}
          onQuizAnswer={handleQuizAnswer}
        />
      ))}
    </article>
  )
}

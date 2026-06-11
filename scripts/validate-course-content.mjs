#!/usr/bin/env node
/**
 * Course content validator — the single source of truth for the course
 * content standards described in docs/COURSE_BLUEPRINT.md.
 *
 * Validates every course directory under generated_lessons/:
 *   - curriculum.json present
 *   - contiguous lesson_NN_*.json files starting at 00
 *   - assessment.json present and conforming to the assessment schema
 *     (module quizzes partition all lessons; final exam covers the course)
 *
 * Usage:  node scripts/validate-course-content.mjs [courseSlug ...]
 * Exit 0 when every checked course passes; prints per-course errors otherwise.
 * The backend Jest suite (assessment/course-content.spec.ts) runs the same
 * checks via validateCourseDir().
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'fs'
import { join, resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/
const MIN_LESSONS = 20
const MIN_MODULE_QUESTIONS = 4
const MIN_FINAL_QUESTIONS = 20
const MAX_FINAL_QUESTIONS = 40
const MIN_FINAL_MODULE_COVERAGE = 4
const THRESHOLD_RANGE = [50, 100]

export function validateCourseDir(dir, slug) {
  const errors = []
  const err = (m) => errors.push(m)

  if (!SLUG_RE.test(slug)) err(`invalid course slug: ${slug}`)

  if (!existsSync(join(dir, 'curriculum.json'))) err('curriculum.json missing')

  // Lessons: lesson_NN_*.json, contiguous from 00
  const lessonFiles = readdirSync(dir).filter((f) => /^lesson_\d{2}_.*\.json$/.test(f)).sort()
  const lessonCount = lessonFiles.length
  if (lessonCount < MIN_LESSONS) err(`only ${lessonCount} lessons (minimum ${MIN_LESSONS})`)
  lessonFiles.forEach((f, i) => {
    const n = Number(f.slice(7, 9))
    if (n !== i) err(`lesson files not contiguous: expected index ${i}, found ${f}`)
  })

  const assessmentPath = join(dir, 'assessment.json')
  if (!existsSync(assessmentPath)) {
    err('assessment.json missing — every course must ship module quizzes and a final exam')
    return { slug, errors }
  }

  let a
  try {
    a = JSON.parse(readFileSync(assessmentPath, 'utf8'))
  } catch (e) {
    err(`assessment.json is not valid JSON: ${e.message}`)
    return { slug, errors }
  }

  if (a.courseSlug !== slug) err(`assessment.courseSlug "${a.courseSlug}" != directory "${slug}"`)
  const checkThreshold = (v, where) => {
    if (!Number.isInteger(v) || v < THRESHOLD_RANGE[0] || v > THRESHOLD_RANGE[1])
      err(`${where} passThreshold must be an integer in [${THRESHOLD_RANGE}], got ${v}`)
  }
  checkThreshold(a.passThreshold, 'assessment')

  const validQuestion = (q, where, allowedOrders, moduleIndices) => {
    if (typeof q.question !== 'string' || q.question.trim().length < 20)
      err(`${where}: question text too short`)
    if (!Array.isArray(q.options) || q.options.length !== 4)
      err(`${where}: must have exactly 4 options`)
    else {
      if (q.options.some((o) => typeof o !== 'string' || !o.trim())) err(`${where}: empty option`)
      if (new Set(q.options.map((o) => String(o).trim())).size !== 4) err(`${where}: duplicate options`)
    }
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer > 3)
      err(`${where}: answer must be an integer 0-3, got ${q.answer}`)
    if (typeof q.explanation !== 'string' || q.explanation.trim().length < 20)
      err(`${where}: explanation too short`)
    if (!allowedOrders.has(q.lessonOrder))
      err(`${where}: lessonOrder ${q.lessonOrder} not in allowed range`)
    if (moduleIndices && !moduleIndices.has(q.moduleIndex))
      err(`${where}: moduleIndex ${q.moduleIndex} does not reference a module`)
  }

  // Modules: must partition lesson orders 1..lessonCount exactly
  if (!Array.isArray(a.modules) || a.modules.length < 1) {
    err('modules missing')
    return { slug, errors }
  }
  const allOrders = new Set(Array.from({ length: lessonCount }, (_, i) => i + 1))
  const seenOrders = new Set()
  const moduleIndices = new Set()
  a.modules.forEach((m, pos) => {
    const where = `module[${pos}]`
    if (m.index !== pos) err(`${where}: index must equal its position (${pos}), got ${m.index}`)
    moduleIndices.add(m.index)
    if (typeof m.title !== 'string' || !m.title.trim()) err(`${where}: title missing`)
    if (!Array.isArray(m.lessonOrders) || m.lessonOrders.length === 0)
      err(`${where}: lessonOrders missing`)
    else {
      for (const ord of m.lessonOrders) {
        if (!allOrders.has(ord)) err(`${where}: lessonOrder ${ord} out of range 1..${lessonCount}`)
        if (seenOrders.has(ord)) err(`${where}: lessonOrder ${ord} appears in multiple modules`)
        seenOrders.add(ord)
      }
    }
    if (!Array.isArray(m.questions) || m.questions.length < MIN_MODULE_QUESTIONS)
      err(`${where}: needs at least ${MIN_MODULE_QUESTIONS} questions`)
    else m.questions.forEach((q, qi) => validQuestion(q, `${where}.questions[${qi}]`, new Set(m.lessonOrders), null))
  })
  for (const ord of allOrders)
    if (!seenOrders.has(ord)) err(`lessonOrder ${ord} not covered by any module quiz`)

  // Final exam: breadth across modules, sane size
  const fe = a.finalExam
  if (!fe || !Array.isArray(fe.questions)) {
    err('finalExam missing — the Take Final Exam feature requires it')
    return { slug, errors }
  }
  checkThreshold(fe.passThreshold ?? a.passThreshold, 'finalExam')
  if (fe.questions.length < MIN_FINAL_QUESTIONS || fe.questions.length > MAX_FINAL_QUESTIONS)
    err(`finalExam needs ${MIN_FINAL_QUESTIONS}-${MAX_FINAL_QUESTIONS} questions, got ${fe.questions.length}`)
  fe.questions.forEach((q, qi) => validQuestion(q, `finalExam.questions[${qi}]`, allOrders, moduleIndices))
  const coveredModules = new Set(fe.questions.map((q) => q.moduleIndex))
  if (coveredModules.size < Math.min(MIN_FINAL_MODULE_COVERAGE, a.modules.length))
    err(`finalExam covers only ${coveredModules.size} modules — must span at least ${MIN_FINAL_MODULE_COVERAGE}`)

  return { slug, errors }
}

export function validateAll(baseDir, only = []) {
  const slugs = readdirSync(baseDir).filter((f) => {
    try { return statSync(join(baseDir, f)).isDirectory() } catch { return false }
  })
  const selected = only.length ? slugs.filter((s) => only.includes(s)) : slugs
  return selected.map((slug) => validateCourseDir(join(baseDir, slug), slug))
}

const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)
if (isMain) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const baseDir = process.env.GENERATED_LESSONS_DIR || join(root, 'generated_lessons')
  const results = validateAll(baseDir, process.argv.slice(2))
  let failed = 0
  for (const { slug, errors } of results) {
    if (errors.length) {
      failed++
      console.log(`✗ ${slug}`)
      for (const e of errors) console.log(`    - ${e}`)
    } else {
      console.log(`✓ ${slug}`)
    }
  }
  console.log(`\n${results.length - failed}/${results.length} courses pass the content standards`)
  process.exit(failed ? 1 : 0)
}

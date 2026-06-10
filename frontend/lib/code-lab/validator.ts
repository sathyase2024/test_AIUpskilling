import { matchErrorHint } from '@/lib/error-hints'
import type { ValidationResult, TestResult } from './types'

export function validateOutput(
  stdout: string,
  stderr: string,
  exitCode: number,
): ValidationResult {
  // parse test result lines
  const results: TestResult[] = []
  for (const line of stdout.split('\n')) {
    const pass = line.match(/^✓\s+Test\s+(\d+)(.*)/)
    if (pass) results.push({ num: +pass[1], passed: true, description: line.slice(2).trim() })
    const fail = line.match(/^✗\s+Test\s+(\d+)(.*)/)
    if (fail) results.push({ num: +fail[1], passed: false, description: line.slice(2).trim() })
  }
  // summary line: "X/Y tests passed"
  const summary = stdout.match(/(\d+)\/(\d+)\s+tests?\s+passed/)
  const passedTests = summary ? +summary[1] : results.filter(r => r.passed).length
  const totalTests  = summary ? +summary[2] : results.length

  const score = totalTests > 0 ? Math.round((passedTests / totalTests) * 100) : 0
  const passed = passedTests === totalTests && totalTests > 0 && exitCode === 0

  let feedback: string
  if (exitCode !== 0 || stderr) {
    feedback = 'Your code raised an error. Check the error message and fix the issue.'
  } else if (score === 100) {
    feedback = '🎉 All tests passed! Great work.'
  } else if (score >= 66) {
    feedback = `${passedTests}/${totalTests} tests passed. You're close — check the failing cases.`
  } else if (score > 0) {
    feedback = `${passedTests}/${totalTests} tests passed. Review the examples and edge cases.`
  } else if (totalTests === 0) {
    feedback = 'No test results detected. Make sure you haven\'t removed the test harness.'
  } else {
    feedback = 'No tests passed. Re-read the problem and check your logic.'
  }

  const hint = matchErrorHint(stderr || '')

  return {
    passed, score, passedTests, totalTests,
    testResults: results,
    feedback,
    errorHint: hint ? { title: hint.title, cause: hint.cause, fix: hint.fix, example: hint.example } : undefined,
  }
}

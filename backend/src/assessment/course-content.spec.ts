import { execFileSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Course content standards — every course shipped under generated_lessons/
 * must satisfy docs/COURSE_BLUEPRINT.md. The single source of truth for the
 * rules is scripts/validate-course-content.mjs; this spec runs it per course
 * so a violation fails CI with a precise, per-course message.
 */
const ROOT = path.resolve(__dirname, '..', '..', '..');
const GENERATED = process.env.GENERATED_LESSONS_DIR ?? path.join(ROOT, 'generated_lessons');
const VALIDATOR = path.join(ROOT, 'scripts', 'validate-course-content.mjs');

const courseDirs = fs.existsSync(GENERATED)
  ? fs
      .readdirSync(GENERATED)
      .filter((f) => fs.statSync(path.join(GENERATED, f)).isDirectory())
  : [];

describe('course content standards (docs/COURSE_BLUEPRINT.md)', () => {
  it('has at least one course to validate', () => {
    expect(courseDirs.length).toBeGreaterThan(0);
  });

  it.each(courseDirs)(
    '%s passes the blueprint validator (lessons + module quizzes + final exam)',
    (slug) => {
      let output = '';
      try {
        output = execFileSync('node', [VALIDATOR, slug], {
          env: { ...process.env, GENERATED_LESSONS_DIR: GENERATED },
          encoding: 'utf8',
        });
      } catch (err: any) {
        throw new Error(`Course "${slug}" violates the blueprint:\n${err.stdout || err.message}`);
      }
      expect(output).toContain(`✓ ${slug}`);
    },
  );

  it('every course exposes a final exam (Take Final Exam must work on all courses)', () => {
    for (const slug of courseDirs) {
      const file = path.join(GENERATED, slug, 'assessment.json');
      expect(fs.existsSync(file)).toBe(true);
      const a = JSON.parse(fs.readFileSync(file, 'utf8'));
      expect(Array.isArray(a.finalExam?.questions)).toBe(true);
      expect(a.finalExam.questions.length).toBeGreaterThanOrEqual(20);
    }
  });
});

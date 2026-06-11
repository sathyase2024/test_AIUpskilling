import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { AssessmentService } from './assessment.service';

/**
 * Unit tests for the assessment engine: slug hardening, answer stripping,
 * grading semantics, best-score retention, and the empty-lessonOrders guard.
 * Repositories are mocked; assessment data comes from a fixture written to a
 * temp dir referenced via GENERATED_LESSONS_DIR.
 */

const FIXTURE = {
  courseSlug: 'fixture-course',
  passThreshold: 80,
  modules: [
    {
      index: 0,
      title: 'Foundations',
      lessonOrders: [1, 2],
      questions: [
        { question: 'Q1?', options: ['a', 'b', 'c', 'd'], answer: 1, explanation: 'because b', lessonOrder: 1 },
        { question: 'Q2?', options: ['a', 'b', 'c', 'd'], answer: 2, explanation: 'because c', lessonOrder: 2 },
      ],
    },
  ],
  finalExam: {
    passThreshold: 80,
    questions: [
      { question: 'F1?', options: ['a', 'b', 'c', 'd'], answer: 0, explanation: 'because a', lessonOrder: 1, moduleIndex: 0 },
      { question: 'F2?', options: ['a', 'b', 'c', 'd'], answer: 3, explanation: 'because d', lessonOrder: 2, moduleIndex: 0 },
    ],
  },
};

describe('AssessmentService', () => {
  let dir: string;
  let service: AssessmentService;
  let resultRepo: any;
  let topicRepo: any;
  let lessonRepo: any;
  let progressService: any;

  beforeAll(() => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'assess-'));
    fs.mkdirSync(path.join(dir, 'fixture-course'));
    fs.writeFileSync(path.join(dir, 'fixture-course', 'assessment.json'), JSON.stringify(FIXTURE));
    process.env.GENERATED_LESSONS_DIR = dir;
  });

  afterAll(() => {
    delete process.env.GENERATED_LESSONS_DIR;
    fs.rmSync(dir, { recursive: true, force: true });
  });

  beforeEach(() => {
    resultRepo = {
      findOne: jest.fn().mockResolvedValue(null),
      save: jest.fn().mockImplementation(async (x: any) => x),
      create: jest.fn().mockImplementation((x: any) => x),
      find: jest.fn().mockResolvedValue([]),
    };
    topicRepo = { findOne: jest.fn().mockResolvedValue({ id: 'topic-1', slug: 'fixture-course' }) };
    lessonRepo = { find: jest.fn().mockResolvedValue([]) };
    progressService = { markLessonComplete: jest.fn().mockResolvedValue(undefined) };
    service = new AssessmentService(resultRepo, topicRepo, lessonRepo, progressService);
  });

  describe('getAssessment (public payload)', () => {
    it('never exposes correct answers or explanations', () => {
      const pub = service.getAssessment('fixture-course');
      const allQuestions = [
        ...pub.modules.flatMap((m) => m.questions),
        ...pub.finalExam.questions,
      ];
      expect(allQuestions.length).toBe(4);
      for (const q of allQuestions) {
        expect(q).not.toHaveProperty('answer');
        expect(q).not.toHaveProperty('explanation');
        expect(q.options).toHaveLength(4);
      }
    });

    it('rejects slugs that are not kebab-case (path traversal hardening)', () => {
      for (const bad of ['../etc', 'a/../b', 'UPPER', 'spa ce', 'dot.dot', '']) {
        expect(() => service.getAssessment(bad)).toThrow(BadRequestException);
      }
    });

    it('404s for unknown courses', () => {
      expect(() => service.getAssessment('no-such-course')).toThrow(NotFoundException);
    });

    it('caches the parsed file after the first read', () => {
      const file = path.join(dir, 'fixture-course', 'assessment.json');
      service.getAssessment('fixture-course'); // populates the cache
      const raw = fs.readFileSync(file);
      fs.rmSync(file);
      try {
        // Served from cache even though the file is gone
        expect(service.getAssessment('fixture-course').courseSlug).toBe('fixture-course');
      } finally {
        fs.writeFileSync(file, raw);
      }
    });
  });

  describe('grading', () => {
    it('grades a perfect module attempt as passed with full review', () => {
      const r = service.gradeAttempt('fixture-course', 'module', 0, [1, 2]);
      expect(r).toMatchObject({ score: 100, passed: true, correct: 2, total: 2 });
      expect(r.review).toEqual([
        { correctAnswer: 1, explanation: 'because b', correct: true },
        { correctAnswer: 2, explanation: 'because c', correct: true },
      ]);
    });

    it('grades wrong answers against the threshold and reports lessons to revisit', () => {
      const r = service.gradeAttempt('fixture-course', 'module', 0, [1, 0]);
      expect(r).toMatchObject({ score: 50, passed: false, correct: 1 });
      expect(r.wrongLessonOrders).toEqual([2]);
      expect(r.review[1]).toEqual({ correctAnswer: 2, explanation: 'because c', correct: false });
    });

    it('grades the final exam', () => {
      const r = service.gradeAttempt('fixture-course', 'final', undefined, [0, 3]);
      expect(r).toMatchObject({ score: 100, passed: true });
    });

    it('rejects an answers array of the wrong length', () => {
      expect(() => service.gradeAttempt('fixture-course', 'module', 0, [1])).toThrow(
        BadRequestException,
      );
      expect(() => service.gradeAttempt('fixture-course', 'final', undefined, [0, 3, 1])).toThrow(
        BadRequestException,
      );
    });

    it('404s for a module index that does not exist', () => {
      expect(() => service.gradeAttempt('fixture-course', 'module', 9, [1, 2])).toThrow(
        NotFoundException,
      );
    });
  });

  describe('submit attempts', () => {
    it('persists a new module result and marks lessons complete on pass', async () => {
      lessonRepo.find.mockResolvedValue([{ id: 'l1' }, { id: 'l2' }]);
      const r = await service.submitModuleAttempt('user-1', 'fixture-course', 0, { answers: [1, 2] });
      expect(r.passed).toBe(true);
      expect(resultRepo.save).toHaveBeenCalled();
      expect(progressService.markLessonComplete).toHaveBeenCalledTimes(2);
    });

    it('keeps the best score: a worse retake never downgrades a stored result', async () => {
      resultRepo.findOne.mockResolvedValue({ score: 100, passed: true, wrongLessonOrders: [] });
      const r = await service.submitModuleAttempt('user-1', 'fixture-course', 0, { answers: [0, 0] });
      expect(r.score).toBe(0); // the attempt itself is reported honestly
      expect(resultRepo.save).not.toHaveBeenCalled(); // but the stored best is untouched
    });

    it('a passing final marks the whole course complete', async () => {
      lessonRepo.find.mockResolvedValue([{ id: 'l1' }, { id: 'l2' }, { id: 'l3' }]);
      const r = await service.submitFinalAttempt('user-1', 'fixture-course', { answers: [0, 3] });
      expect(r.passed).toBe(true);
      expect(progressService.markLessonComplete).toHaveBeenCalledTimes(3);
    });

    it('a failing attempt never marks lessons complete', async () => {
      await service.submitFinalAttempt('user-1', 'fixture-course', { answers: [1, 1] });
      expect(progressService.markLessonComplete).not.toHaveBeenCalled();
    });

    it('an empty lessonOrders list never queries the lesson table (mass-completion guard)', async () => {
      await (service as any).markLessonsComplete('user-1', 'fixture-course', []);
      expect(lessonRepo.find).not.toHaveBeenCalled();
    });
  });
});

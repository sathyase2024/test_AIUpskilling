/**
 * Course assessment data model.
 *
 * assessment.json files under generated_lessons/<courseSlug>/ follow this
 * shape; scripts/validate-course-content.mjs enforces it and
 * docs/COURSE_BLUEPRINT.md documents the authoring standards.
 */

export interface AssessmentQuestion {
  question: string;
  options: string[]; // exactly 4
  answer: number; // index 0-3 — never sent to the client before grading
  explanation: string;
  lessonOrder: number; // 1-based lesson the question tests
  moduleIndex?: number; // final-exam questions: which module it covers
}

export interface AssessmentModule {
  index: number;
  title: string;
  lessonOrders: number[];
  questions: AssessmentQuestion[];
}

export interface Assessment {
  courseSlug: string;
  generatedWith?: string;
  passThreshold: number;
  modules: AssessmentModule[];
  finalExam: {
    passThreshold?: number;
    questions: AssessmentQuestion[];
  };
}

/** Question as exposed to the client: no answer, no explanation. */
export type PublicQuestion = Omit<AssessmentQuestion, 'answer' | 'explanation'>;

export interface PublicAssessment {
  courseSlug: string;
  passThreshold: number;
  modules: Array<Omit<AssessmentModule, 'questions'> & { questions: PublicQuestion[] }>;
  finalExam: {
    passThreshold?: number;
    questions: PublicQuestion[];
  };
}

/** Per-question review data returned after grading, for the results UI. */
export interface QuestionReview {
  correctAnswer: number;
  explanation: string;
  correct: boolean;
}

export interface GradeResult {
  score: number;
  passed: boolean;
  correct: number;
  total: number;
  wrongLessonOrders: number[];
  review: QuestionReview[];
}

import { z } from "zod";

export const experienceLevelSchema = z.enum([
  "Beginner",
  "Intermediate",
  "Advanced",
]);
export const goalSchema = z.enum([
  "Job prep",
  "Upskilling",
  "Certification",
  "Project",
]);

export const intakeSchema = z.object({
  interest: z.string().min(2).max(120),
  experience_level: experienceLevelSchema,
  goal: goalSchema,
  time_commitment: z.number().int().min(1).max(60),
});

export type ExperienceLevel = z.infer<typeof experienceLevelSchema>;
export type LearningGoal = z.infer<typeof goalSchema>;
export type IntakeProfile = z.infer<typeof intakeSchema>;
export type UserProfile = IntakeProfile;

export type LearningPathModule = {
  title: string;
  objective: string;
};

export type LearningPath = {
  title: string;
  reasoning: string;
  difficultyAdaptation: string;
  modules: LearningPathModule[];
};

export type QuizItem = {
  question: string;
  options: string[];
  answer: string;
};

export type ModuleContent = {
  concept: string;
  analogy: string;
  example: string;
  exercise: string;
  quiz: QuizItem[];
  notes: string;
};

export type ModuleValidation = {
  score: number;
  feedback: string;
};

export type GeneratedModule = {
  id: string;
  title: string;
  objective: string;
  concept: string;
  analogy: string;
  example: string;
  exercise: string;
  quiz: QuizItem[];
  notes: string;
  validation: ModuleValidation;
  iterations: number;
  fromCache: boolean;
};

export type GeneratedCourse = {
  id: string;
  userId: string;
  profile: UserProfile;
  learningPath: LearningPath;
  modules: GeneratedModule[];
  qualityScore: number;
  metadata: {
    cacheHit: boolean;
    generatedAt: string;
    totalIterationsUsed: number;
    provider: string;
    model: string;
  };
};

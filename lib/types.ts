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

export const roleSchema = z.enum([
  "Software Engineer",
  "Data Analyst",
  "Product Manager",
  "Designer",
  "Student",
  "Founder",
  "Other",
]);

export const intakeSchema = z.object({
  first_name: z.string().min(2).max(40),
  last_name: z.string().min(2).max(40),
  email: z.email(),
  current_role: roleSchema,
  interest: z.string().min(2).max(120),
  experience_level: experienceLevelSchema,
  goal: goalSchema,
  time_commitment: z.number().int().min(1).max(60),
});

export type ExperienceLevel = z.infer<typeof experienceLevelSchema>;
export type LearningGoal = z.infer<typeof goalSchema>;
export type CurrentRole = z.infer<typeof roleSchema>;
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

export type TutorMessageRole = "user" | "assistant";

export type TutorMessage = {
  role: TutorMessageRole;
  content: string;
  createdAt: string;
};

export const tutorRequestSchema = z.object({
  profile: intakeSchema,
  moduleTitle: z.string().min(2).max(160),
  moduleConcept: z.string().min(8),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(4000),
      }),
    )
    .max(30)
    .optional(),
  question: z.string().min(2).max(4000),
});

export type TutorRequest = z.infer<typeof tutorRequestSchema>;

import { randomUUID } from "crypto";
import { z } from "zod";

import { AIProvider } from "@/lib/ai/providers/base";
import { buildContentPrompt } from "@/lib/agents/prompts";
import {
  GeneratedModule,
  LearningPathModule,
  ModuleContent,
  UserProfile,
} from "@/lib/types";

const contentSchema = z.object({
  concept: z.string().min(20),
  analogy: z.string().min(10),
  example: z.string().min(15),
  exercise: z.string().min(10),
  quiz: z
    .array(
      z.object({
        question: z.string().min(6),
        options: z.array(z.string().min(1)).min(2),
        answer: z.string().min(1),
      }),
    )
    .min(1),
  notes: z.string().min(10),
});

export async function generateModuleContent(
  provider: AIProvider,
  profile: UserProfile,
  module: LearningPathModule,
  feedback?: string,
): Promise<ModuleContent> {
  const prompt = buildContentPrompt(profile, module, feedback);
  const response = await provider.generateJSON<unknown>({
    systemPrompt: "You are Agent 2: Content Generation Agent.",
    userPrompt: prompt,
    temperature: 0.6,
  });
  const parsed = contentSchema.parse(response);
  return parsed;
}

export async function runContentGenerationAgent(
  provider: AIProvider,
  profile: UserProfile,
  module: LearningPathModule,
  feedback?: string,
): Promise<ModuleContent> {
  return generateModuleContent(provider, profile, module, feedback);
}

export function toGeneratedModule(
  module: LearningPathModule,
  content: ModuleContent,
  iterations: number,
  score: number,
  feedback: string,
  fromCache: boolean,
): GeneratedModule {
  return {
    id: randomUUID(),
    title: module.title,
    objective: module.objective,
    ...content,
    validation: {
      score,
      feedback,
    },
    iterations,
    fromCache,
  };
}

import { z } from "zod";
import { buildValidationPrompt } from "@/lib/agents/prompts";
import { AIProvider } from "@/lib/ai/providers/base";
import { GeneratedModule, ModuleValidation, UserProfile } from "@/lib/types";

const validationSchema = z.object({
  score: z.number().min(0).max(100),
  feedback: z.string().min(1),
});

export async function runValidationAgent(
  provider: AIProvider,
  profile: UserProfile,
  moduleTitle: string,
  module: Omit<GeneratedModule, "id" | "objective" | "title" | "fromCache" | "iterations" | "validation">,
): Promise<ModuleValidation> {
  const prompt = buildValidationPrompt(profile, moduleTitle, module);
  const parsed = validationSchema.parse(
    await provider.generateJSON<unknown>({
      systemPrompt: "You are Agent 3: Validation Agent.",
      userPrompt: prompt,
      temperature: 0.2,
    }),
  );
  return parsed;
}

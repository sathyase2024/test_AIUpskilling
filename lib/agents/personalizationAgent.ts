import { z } from "zod";
import type { AIProvider } from "@/lib/ai/providers/base";
import { buildPersonalizationPrompt } from "@/lib/agents/prompts";
import type { LearningPath, UserProfile } from "@/lib/types";

const PersonalizationSchema = z.object({
  title: z.string().min(3),
  reasoning: z.string().min(10),
  difficultyAdaptation: z.string().min(10),
  modules: z
    .array(
      z.object({
        title: z.string().min(3),
        objective: z.string().min(10),
      }),
    )
    .min(2),
});

const BASE_MODULE_COUNT: Record<UserProfile["experience_level"], number> = {
  Beginner: 4,
  Intermediate: 5,
  Advanced: 6,
};

export class PersonalizationAgent {
  constructor(private readonly provider: AIProvider) {}

  async run(profile: UserProfile, requestedModuleCount?: number): Promise<LearningPath> {
    const targetCount = requestedModuleCount ?? this.pickModuleCount(profile);
    const prompt = buildPersonalizationPrompt(profile, targetCount);
    const response = await this.provider.generateJSON<unknown>({
      systemPrompt: "You are Agent 1: Personalization Agent.",
      userPrompt: prompt,
      temperature: 0.3,
    });
    const parsed = PersonalizationSchema.parse(response);

    return {
      ...parsed,
      modules: this.ensureModuleCount(parsed.modules, targetCount, profile.interest),
    };
  }

  private pickModuleCount(profile: UserProfile): number {
    const base = BASE_MODULE_COUNT[profile.experience_level];
    const bonus = profile.time_commitment >= 8 ? 1 : 0;
    return Math.min(8, base + bonus);
  }

  private ensureModuleCount(
    modules: LearningPath["modules"],
    targetCount: number,
    interest: string,
  ): LearningPath["modules"] {
    const output = modules.slice(0, targetCount);
    while (output.length < targetCount) {
      const index = output.length + 1;
      output.push({
        title: `${interest} module ${index}`,
        objective: `Develop practical skills in ${interest} through guided application.`,
      });
    }
    return output;
  }
}

export async function runPersonalizationAgent(
  provider: AIProvider,
  profile: UserProfile,
  moduleCount?: number,
): Promise<LearningPath> {
  const agent = new PersonalizationAgent(provider);
  return agent.run(profile, moduleCount);
}

import { randomUUID } from "crypto";
import { createAIProvider } from "@/lib/ai/providers/factory";
import { runPersonalizationAgent } from "@/lib/agents/personalizationAgent";
import {
  generateModuleContent,
  toGeneratedModule,
} from "@/lib/agents/contentGenerationAgent";
import { runValidationAgent } from "@/lib/agents/validationAgent";
import type { GeneratedCourse, GeneratedModule, UserProfile } from "@/lib/types";

export type GenerateCourseOptions = {
  moduleCount?: number;
  moduleCache?: Record<string, GeneratedModule>;
};

export type ModuleProgressEvent =
  | {
      type: "module:start";
      moduleIndex: number;
      moduleTitle: string;
      totalModules: number;
    }
  | {
      type: "module:iteration";
      moduleIndex: number;
      moduleTitle: string;
      iteration: number;
      score: number;
      feedback: string;
      done: boolean;
    }
  | { type: "module:done"; moduleIndex: number; module: GeneratedModule };

export type CourseProgressCallback = (event: ModuleProgressEvent) => void | Promise<void>;

const TARGET_SCORE = 85;
const MAX_ITERATIONS = 3;

function normalizeModuleCount(requested: number | undefined, available: number): number {
  if (!requested) {
    return available;
  }
  return Math.max(1, Math.min(requested, available));
}

function computeQuality(modules: GeneratedModule[]): number {
  if (!modules.length) {
    return 0;
  }
  const total = modules.reduce((acc, module) => acc + module.validation.score, 0);
  return Math.round(total / modules.length);
}

export async function generateCourse(
  userId: string,
  profile: UserProfile,
  options: GenerateCourseOptions = {},
  onProgress?: CourseProgressCallback,
): Promise<GeneratedCourse> {
  const provider = createAIProvider();
  const learningPath = await runPersonalizationAgent(provider, profile, options.moduleCount);
  const moduleCount = normalizeModuleCount(options.moduleCount, learningPath.modules.length);
  const selectedModules = learningPath.modules.slice(0, moduleCount);

  const modules: GeneratedModule[] = [];
  let totalIterationsUsed = 0;

  for (let moduleIndex = 0; moduleIndex < selectedModules.length; moduleIndex += 1) {
    const modulePlan = selectedModules[moduleIndex];
    await onProgress?.({
      type: "module:start",
      moduleIndex,
      moduleTitle: modulePlan.title,
      totalModules: selectedModules.length,
    });

    const cacheKey = modulePlan.title.trim().toLowerCase();
    const cached = options.moduleCache?.[cacheKey];
    if (cached) {
      const hydrated = { ...cached, fromCache: true };
      modules.push(hydrated);
      totalIterationsUsed += hydrated.iterations;
      await onProgress?.({ type: "module:done", moduleIndex, module: hydrated });
      continue;
    }

    let iteration = 1;
    let content = await generateModuleContent(provider, profile, modulePlan);
    let validation = await runValidationAgent(provider, profile, modulePlan.title, content);

    await onProgress?.({
      type: "module:iteration",
      moduleIndex,
      moduleTitle: modulePlan.title,
      iteration,
      score: validation.score,
      feedback: validation.feedback,
      done: validation.score >= TARGET_SCORE,
    });

    while (validation.score < TARGET_SCORE && iteration < MAX_ITERATIONS) {
      iteration += 1;
      content = await generateModuleContent(
        provider,
        profile,
        modulePlan,
        validation.feedback,
      );
      validation = await runValidationAgent(provider, profile, modulePlan.title, content);
      await onProgress?.({
        type: "module:iteration",
        moduleIndex,
        moduleTitle: modulePlan.title,
        iteration,
        score: validation.score,
        feedback: validation.feedback,
        done: validation.score >= TARGET_SCORE || iteration >= MAX_ITERATIONS,
      });
    }

    const finalized = toGeneratedModule(
      modulePlan,
      content,
      iteration,
      validation.score,
      validation.feedback,
      false,
    );
    modules.push(finalized);
    totalIterationsUsed += iteration;
    await onProgress?.({ type: "module:done", moduleIndex, module: finalized });
  }

  return {
    id: randomUUID(),
    userId,
    profile,
    learningPath: {
      ...learningPath,
      modules: selectedModules,
    },
    modules,
    qualityScore: computeQuality(modules),
    metadata: {
      cacheHit: modules.every((module) => module.fromCache),
      generatedAt: new Date().toISOString(),
      totalIterationsUsed,
      provider: provider.name,
      model: provider.defaultModel,
    },
  };
}

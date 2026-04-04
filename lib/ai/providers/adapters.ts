import { PromptRequest, AIProvider, tryParseJson } from "@/lib/ai/providers/base";

type OpenAIChatCompletionsPayload = {
  choices?: Array<{ message?: { content?: string } }>;
};

export class OpenAICompatibleProvider implements AIProvider {
  constructor(
    public readonly name: string,
    private readonly apiKey: string,
    public readonly defaultModel: string,
    private readonly baseUrl: string,
  ) {}

  async generateJSON<T>(request: PromptRequest): Promise<T> {
    const response = await fetch(`${this.baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: request.model ?? this.defaultModel,
        temperature: request.temperature ?? 0.3,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: request.systemPrompt },
          { role: "user", content: request.userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`${this.name} provider request failed (${response.status}): ${details}`);
    }

    const payload = (await response.json()) as OpenAIChatCompletionsPayload;
    const content = payload.choices?.[0]?.message?.content ?? "";
    return tryParseJson<T>(content);
  }
}

const feedbackSummary = (feedback?: string): string =>
  feedback?.slice(0, 120) ?? "No feedback supplied";

const safeFirstNameFromPrompt = (prompt: string): string => {
  const match =
    /"first_name":\s*"([^"]+)"/i.exec(prompt) ??
    /Learner Name:\s*([^\n]+)/i.exec(prompt);
  if (!match?.[1]) {
    return "Learner";
  }
  return match[1].trim().split(/\s+/)[0] ?? "Learner";
};

const safeRoleFromPrompt = (prompt: string): string => {
  const match = /"current_role":\s*"([^"]+)"/i.exec(prompt);
  return match?.[1]?.trim() || "professional";
};

export class MockAIProvider implements AIProvider {
  readonly name = "mock";
  readonly defaultModel = "mock-v1";

  async generateJSON<T>(request: PromptRequest): Promise<T> {
    const system = request.systemPrompt.toLowerCase();
    const prompt = request.userPrompt;

    if (system.includes("personalization")) {
      const interest = /"interest":\s*"([^"]+)"/i.exec(prompt)?.[1] ?? "AI Engineering";
      const level = /"experience_level":\s*"([^"]+)"/i.exec(prompt)?.[1] ?? "Beginner";
      const firstName = safeFirstNameFromPrompt(prompt);
      const role = safeRoleFromPrompt(prompt);
      const targetModules = Number(/exactly (\d+) modules/i.exec(prompt)?.[1] ?? "4");
      const timeCommitment = Number(/"time_commitment":\s*(\d+)/i.exec(prompt)?.[1] ?? "4");
      const pace = timeCommitment >= 8 ? "accelerated" : "steady";

      const result = {
        title: `${interest} Roadmap for ${firstName}`,
        reasoning: `Structured ${pace} progression for a ${level.toLowerCase()} ${role} to build practical competency in ${interest}.`,
        difficultyAdaptation:
          level === "Beginner"
            ? "Simple language, slower pacing, and guided exercises."
            : level === "Intermediate"
              ? "Balanced theory with realistic implementation examples."
              : "Advanced architecture depth with optimization and edge cases.",
        modules: Array.from({ length: targetModules }, (_, index) => ({
          title:
            index === targetModules - 1
              ? `${interest} Capstone for ${role}`
              : `${interest} Module ${index + 1}`,
          objective:
            index === targetModules - 1
              ? `Deliver a portfolio-ready ${interest} project aligned with ${role} workflows.`
              : `Build practical skill ${index + 1} for ${interest} with ${role}-relevant tasks.`,
        })),
      };
      return result as T;
    }

    if (system.includes("validation")) {
      const hasPreviousFeedback = prompt.toLowerCase().includes("previous feedback");
      const result = {
        score: hasPreviousFeedback ? 90 : 83,
        feedback: hasPreviousFeedback
          ? "Good quality. Strengthen one more concrete real-world detail."
          : "Improve clarity and personalization; add a more specific exercise outcome.",
      };
      return result as T;
    }

    const moduleTitle = /Module Title:\s*(.*)/i.exec(prompt)?.[1]?.trim() ?? "Untitled Module";
    const interest = /Topic:\s*(.*)/i.exec(prompt)?.[1]?.trim() ?? "AI";
    const level = /User Level:\s*(.*)/i.exec(prompt)?.[1]?.trim() ?? "Beginner";
    const goal = /Goal:\s*(.*)/i.exec(prompt)?.[1]?.trim() ?? "Upskilling";
    const learnerName = safeFirstNameFromPrompt(prompt);
    const role = safeRoleFromPrompt(prompt);
    const feedback = /Validation feedback from previous draft:\s*([\s\S]*)/i.exec(prompt)?.[1];
    const result = {
      concept:
        level === "Beginner"
          ? `${learnerName}, ${moduleTitle} introduces ${interest} in plain language and shows where it fits in a ${role} workflow. ${feedbackSummary(feedback)}`
          : `${moduleTitle} explains how ${interest} supports ${role} outcomes through practical patterns and trade-offs. ${feedbackSummary(feedback)}`,
      analogy: `${interest} is like building a high-performing team: clear roles, repeatable processes, and feedback loops create reliable outcomes.`,
      example: `A ${role} team applies ${moduleTitle} to improve a critical KPI tied to ${goal.toLowerCase()} goals, shipping measurable improvements in two iterations.`,
      exercise: `Build a mini ${interest} artifact for ${moduleTitle}: define success criteria, implement a first version, collect feedback, and improve it.`,
      quiz: [
        {
        question: `Which action best demonstrates understanding of ${moduleTitle}?`,
        options: [
          "Memorize terms only",
          "Apply it to a realistic role-specific task",
          "Skip practice and focus on theory",
          "Ignore feedback after delivery",
        ],
        answer: "Apply it to a realistic role-specific task",
        },
        {
          question: `For a ${role}, what is the highest-value outcome of this module?`,
          options: [
            "Documentation with no implementation",
            "A deployable workflow with measurable impact",
            "Avoiding real-world constraints",
            "Copying examples without adaptation",
          ],
          answer: "A deployable workflow with measurable impact",
        },
      ],
      notes: `Key takeaway for ${learnerName}: connect each concept to your ${role} responsibilities, practice with realistic scenarios, and iterate using feedback.`,
    };
    return result as T;
  }
}

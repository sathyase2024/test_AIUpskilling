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

export class MockAIProvider implements AIProvider {
  readonly name = "mock";
  readonly defaultModel = "mock-v1";

  async generateJSON<T>(request: PromptRequest): Promise<T> {
    const system = request.systemPrompt.toLowerCase();
    const prompt = request.userPrompt;

    if (system.includes("personalization")) {
      const interest = /"interest":\s*"([^"]+)"/i.exec(prompt)?.[1] ?? "AI Engineering";
      const level = /"experience_level":\s*"([^"]+)"/i.exec(prompt)?.[1] ?? "Beginner";
      const targetModules = Number(/exactly (\d+) modules/i.exec(prompt)?.[1] ?? "4");

      const result = {
        title: `${interest} Personalized Learning Path`,
        reasoning: `Structured progression for ${level} learners focused on practical competency.`,
        difficultyAdaptation:
          level === "Beginner"
            ? "Simple language, slower pacing, and guided exercises."
            : level === "Intermediate"
              ? "Balanced theory with realistic implementation examples."
              : "Advanced architecture depth with optimization and edge cases.",
        modules: Array.from({ length: targetModules }, (_, index) => ({
          title: `${interest} Module ${index + 1}`,
          objective: `Build practical skill ${index + 1} for ${interest}.`,
        })),
      };
      return result as T;
    }

    if (system.includes("validation")) {
      const hasPreviousFeedback = prompt.toLowerCase().includes("previous feedback");
      const result = {
        score: hasPreviousFeedback ? 89 : 81,
        feedback: hasPreviousFeedback
          ? "Good quality. Strengthen one more concrete real-world detail."
          : "Improve clarity and personalization; add a more specific exercise outcome.",
      };
      return result as T;
    }

    const moduleTitle = /Module Title:\s*(.*)/i.exec(prompt)?.[1]?.trim() ?? "Untitled Module";
    const interest = /Topic:\s*(.*)/i.exec(prompt)?.[1]?.trim() ?? "AI";
    const feedback = /Validation feedback from previous draft:\s*([\s\S]*)/i.exec(prompt)?.[1];
    const result = {
      concept: `${moduleTitle} explains key ideas in ${interest} using clear, step-by-step language. ${feedbackSummary(
        feedback,
      )}`,
      analogy: `${interest} is like planning a road trip: define destination, map routes, and adjust as conditions change.`,
      example: `A team applies ${moduleTitle} to deliver an internal productivity feature with measurable impact.`,
      exercise: `Create a small project for ${moduleTitle}, run it end-to-end, and document one improvement you observed.`,
      quiz: [
        {
          question: `What is the best use of ${moduleTitle}?`,
          options: [
            "Memorizing terms only",
            "Applying concepts to practical outcomes",
            "Ignoring constraints",
            "Skipping feedback loops",
          ],
          answer: "Applying concepts to practical outcomes",
        },
      ],
      notes: "Key takeaway: practice, validate outcomes, and iterate using feedback.",
    };
    return result as T;
  }
}

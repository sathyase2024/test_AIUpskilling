import { createAIProvider } from "@/lib/ai/providers/factory";
import type { TutorRequest, TutorMessage } from "@/lib/types";

const SYSTEM_PROMPT = `
You are a live AI tutor for a personalized upskilling platform.
Teach in real time and adapt to the learner profile and current module.

Your response must:
1) Explain clearly in simple terms first
2) Add one analogy
3) Add one role-relevant practical example
4) Provide one immediate exercise
5) End with one short check question

Use markdown headings:
### Concept
### Analogy
### Example
### Exercise
### Quick Check
`.trim();

function serializeHistory(history: Array<Pick<TutorMessage, "role" | "content">>): string {
  return history
    .slice(-12)
    .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
    .join("\n");
}

export async function runTutorTurn(input: TutorRequest): Promise<string> {
  const provider = createAIProvider();
  const history = input.history ?? [];

  const userPrompt = [
    "Learner Profile:",
    JSON.stringify(input.profile, null, 2),
    "",
    "Current Module:",
    JSON.stringify(
      {
        title: input.moduleTitle,
        concept: input.moduleConcept,
      },
      null,
      2,
    ),
    "",
    "Conversation so far:",
    serializeHistory(history),
    "",
    `Learner question: ${input.question}`,
  ].join("\n");

  const response = await provider.generateText({
    systemPrompt: SYSTEM_PROMPT,
    userPrompt,
    temperature: 0.5,
  });
  return response.text;
}


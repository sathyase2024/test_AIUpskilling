import { LearningPathModule, ModuleContent, UserProfile } from "@/lib/types";

export const PERSONALIZATION_PROMPT_TEMPLATE = `
You are Agent 1: Personalization Agent.

Generate a personalized learning path for this learner profile.
Return ONLY strict JSON.

Output schema:
{
  "title": "string",
  "reasoning": "string",
  "difficulty_adaptation": "string",
  "module_breakdown": [
    {
      "title": "string",
      "objective": "string"
    }
  ]
}
`.trim();

export const CONTENT_PROMPT_TEMPLATE = `
Generate a learning module for:

Learner: {{first_name}} {{last_name}}
Role: {{current_role}}
Topic: {{interest}}
User Level: {{experience_level}}
Goal: {{goal}}
Time Commitment: {{time_commitment}} hours/week
Module Title: {{module_title}}
Module Objective: {{module_objective}}

Rules:
- Keep explanation simple and structured
- Provide real-world analogy
- Include actionable exercise
- Ensure quiz tests understanding (not memory)
- Tailor depth based on User Level
- Use real-world industry examples

Return ONLY strict JSON:
{
  "concept": "Clear explanation",
  "analogy": "Relatable real-world comparison",
  "example": "Practical real-world example",
  "exercise": "Hands-on task",
  "quiz": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "answer": "one option exactly"
    }
  ],
  "notes": "Summary + key takeaways"
}
`.trim();

export const VALIDATION_PROMPT_TEMPLATE = `
You are Agent 3: Validation Agent.

Evaluate this module:
{{module_content}}

For learner context:
Learner: {{first_name}} {{last_name}}
Role: {{current_role}}
Topic: {{interest}}
User level: {{experience_level}}
Goal: {{goal}}
Module title: {{module_title}}

Score (0-100) based on:
- Clarity
- Relevance
- Personalization
- Practical usefulness

Return ONLY strict JSON:
{
  "score": 0,
  "feedback": "What to improve"
}
`.trim();

export function buildPersonalizationPrompt(
  profile: UserProfile,
  moduleCount: number
): string {
  return [
    PERSONALIZATION_PROMPT_TEMPLATE,
    "",
    "Constraints:",
    `- Return exactly ${moduleCount} modules.`,
    "- Keep modules ordered from foundation to advanced application.",
    "",
    "User profile:",
    JSON.stringify(profile, null, 2),
  ].join("\n");
}

export function buildContentPrompt(
  profile: UserProfile,
  module: LearningPathModule,
  feedback?: string
): string {
  const prompt = CONTENT_PROMPT_TEMPLATE.replace("{{first_name}}", profile.first_name)
    .replace("{{last_name}}", profile.last_name)
    .replace("{{current_role}}", profile.current_role)
    .replace("{{interest}}", profile.interest)
    .replace("{{experience_level}}", profile.experience_level)
    .replace("{{goal}}", profile.goal)
    .replace("{{time_commitment}}", String(profile.time_commitment))
    .replace("{{module_title}}", module.title)
    .replace("{{module_objective}}", module.objective);

  if (!feedback) {
    return prompt;
  }

  return `${prompt}\n\nValidation feedback from previous draft:\n${feedback}`;
}

export function buildValidationPrompt(
  profile: UserProfile,
  moduleTitle: string,
  moduleContent: ModuleContent
): string {
  return VALIDATION_PROMPT_TEMPLATE.replace(
    "{{module_content}}",
    JSON.stringify(moduleContent, null, 2)
  )
    .replace("{{first_name}}", profile.first_name)
    .replace("{{last_name}}", profile.last_name)
    .replace("{{current_role}}", profile.current_role)
    .replace("{{interest}}", profile.interest)
    .replace("{{experience_level}}", profile.experience_level)
    .replace("{{goal}}", profile.goal)
    .replace("{{module_title}}", moduleTitle);
}

export type PromptRequest = {
  systemPrompt: string;
  userPrompt: string;
  temperature?: number;
  model?: string;
};

export type ProviderMetadata = {
  provider: string;
  model: string;
};

export interface AIProvider {
  readonly name: string;
  readonly defaultModel: string;
  generateJSON<T>(request: PromptRequest): Promise<T>;
}

export type AIProviderMetadata = {
  provider: string;
  model: string;
};

export function getProviderMetadata(provider: AIProvider): AIProviderMetadata {
  return {
    provider: provider.name,
    model: provider.defaultModel,
  };
}

export function tryParseJson<T>(text: string): T {
  const trimmed = text.trim();
  if (!trimmed) {
    throw new Error("AI response was empty.");
  }

  try {
    return JSON.parse(trimmed) as T;
  } catch {
    // Helps with models that wrap JSON in markdown fences.
    const withoutFence = trimmed
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "");
    return JSON.parse(withoutFence) as T;
  }
}

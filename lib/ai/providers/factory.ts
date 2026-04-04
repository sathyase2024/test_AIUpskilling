import { env } from "@/lib/env";
import { AIProvider } from "@/lib/ai/providers/base";
import {
  MockAIProvider,
  OpenAICompatibleProvider,
} from "@/lib/ai/providers/adapters";

export const isRealProviderReady = (): boolean => {
  if (env.AI_PROVIDER === "openai") {
    return Boolean(env.OPENAI_API_KEY ?? env.AI_API_KEY);
  }
  if (env.AI_PROVIDER === "claude") {
    return Boolean(env.CLAUDE_API_KEY ?? env.AI_API_KEY);
  }
  return false;
};

export const createAIProvider = (): AIProvider => {
  const enforceRealModel = env.AI_PROVIDER !== "mock";

  if (env.AI_PROVIDER === "openai") {
    const apiKey = env.OPENAI_API_KEY ?? env.AI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "AI_PROVIDER=openai but no API key found. Set OPENAI_API_KEY or AI_API_KEY.",
      );
    }
    return new OpenAICompatibleProvider(
      "openai",
      apiKey,
      env.OPENAI_MODEL,
      env.OPENAI_BASE_URL,
    );
  }

  if (env.AI_PROVIDER === "claude") {
    const apiKey = env.CLAUDE_API_KEY ?? env.AI_API_KEY;
    if (!apiKey) {
      throw new Error(
        "AI_PROVIDER=claude but no API key found. Set CLAUDE_API_KEY or AI_API_KEY.",
      );
    }
    return new OpenAICompatibleProvider(
      "claude",
      apiKey,
      env.CLAUDE_MODEL,
      env.CLAUDE_BASE_URL,
    );
  }

  if (enforceRealModel) {
    throw new Error("Unsupported AI_PROVIDER value. Use mock, openai, or claude.");
  }
  return new MockAIProvider();
};

import { env } from "@/lib/env";
import { AIProvider } from "@/lib/ai/providers/base";
import {
  MockAIProvider,
  OpenAICompatibleProvider,
} from "@/lib/ai/providers/adapters";

export const createAIProvider = (): AIProvider => {
  if (env.AI_PROVIDER === "openai") {
    return new OpenAICompatibleProvider(
      "openai",
      env.OPENAI_API_KEY ?? env.AI_API_KEY ?? "",
      env.OPENAI_MODEL,
      env.OPENAI_BASE_URL,
    );
  }

  if (env.AI_PROVIDER === "claude") {
    return new OpenAICompatibleProvider(
      "claude",
      env.CLAUDE_API_KEY ?? env.AI_API_KEY ?? "",
      env.CLAUDE_MODEL,
      env.CLAUDE_BASE_URL,
    );
  }

  return new MockAIProvider();
};

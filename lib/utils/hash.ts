import { createHash } from "crypto";
import type { UserProfile } from "@/lib/types";

export const hashProfileInput = (input: string): string =>
  createHash("sha256").update(input).digest("hex");

export const buildFingerprint = (profile: UserProfile): string => {
  const normalized = JSON.stringify({
    interest: profile.interest.trim().toLowerCase(),
    experience_level: profile.experience_level.toLowerCase(),
    goal: profile.goal.toLowerCase(),
    time_commitment: profile.time_commitment,
  });
  return hashProfileInput(normalized);
};

export const buildModuleCacheKey = (
  userId: string,
  profile: UserProfile,
  moduleTitle: string,
): string => {
  const normalized = JSON.stringify({
    userId: userId.trim().toLowerCase(),
    interest: profile.interest.trim().toLowerCase(),
    experience_level: profile.experience_level.toLowerCase(),
    goal: profile.goal.toLowerCase(),
    time_commitment: profile.time_commitment,
    moduleTitle: moduleTitle.trim().toLowerCase(),
  });
  return hashProfileInput(normalized);
};

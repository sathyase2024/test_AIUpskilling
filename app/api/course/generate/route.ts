import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getCourseByFingerprint, saveCourseGeneration } from "@/lib/courseRepository";
import { buildFingerprint } from "@/lib/utils/hash";
import { generateCourse } from "@/lib/agents/courseOrchestrator";
import { intakeSchema } from "@/lib/types";

const requestSchema = z.object({
  userId: z.string().min(1).optional(),
  profile: intakeSchema.optional(),
  interest: z.string().min(2).max(120).optional(),
  experience_level: z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  goal: z.enum(["Job prep", "Upskilling", "Certification", "Project"]).optional(),
  time_commitment: z.number().int().min(1).max(60).optional(),
  first_name: z.string().min(1).max(60).optional(),
  last_name: z.string().min(1).max(60).optional(),
  email: z.string().email().optional(),
  current_role: z.string().min(2).max(80).optional(),
  moduleCount: z.number().int().min(2).max(8).optional(),
  forceRegenerate: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request payload", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const payload = parsed.data;
  const userId = payload.userId ?? "anonymous";
  const profile =
    payload.profile ??
    intakeSchema.parse({
      interest: payload.interest,
      experience_level: payload.experience_level,
      goal: payload.goal,
      time_commitment: payload.time_commitment,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
      current_role: payload.current_role,
    });
  const { moduleCount, forceRegenerate } = payload;
  const fingerprint = buildFingerprint(profile);

  if (!forceRegenerate) {
    const cached = await getCourseByFingerprint(userId, fingerprint);
    if (cached) {
      return NextResponse.json({
        source: "cache",
        generatedCourse: cached,
      });
    }
  }

  const generatedCourse = await generateCourse(userId, profile, { moduleCount });
  const saved = await saveCourseGeneration(generatedCourse, fingerprint);

  return NextResponse.json({
    source: "generated",
    generatedCourse: saved,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { runTutorTurn } from "@/lib/ai/tutorEngine";
import { tutorRequestSchema } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const payload = tutorRequestSchema.safeParse(await request.json());
    if (!payload.success) {
      return NextResponse.json(
        { error: "Invalid tutor payload", details: payload.error.flatten() },
        { status: 400 },
      );
    }

    const answer = await runTutorTurn(payload.data);
    return NextResponse.json({ answer });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Tutor request failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}

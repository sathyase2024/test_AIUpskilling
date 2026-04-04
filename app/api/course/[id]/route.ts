import { NextRequest, NextResponse } from "next/server";
import { getCourseById } from "@/lib/courseRepository";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: NextRequest, context: RouteContext) {
  const { id } = await context.params;
  const userId = _req.headers.get("x-user-id") ?? undefined;
  const course = await getCourseById(id, userId);

  if (!course) {
    return NextResponse.json({ error: "Course not found." }, { status: 404 });
  }

  return NextResponse.json({ course }, { status: 200 });
}

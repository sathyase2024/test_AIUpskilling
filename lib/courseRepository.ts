import { prisma } from "@/lib/prisma";
import type { GeneratedCourse } from "@/lib/types";

const TTL_MS = 1000 * 60 * 60 * 24;

export async function getCourseByFingerprint(
  userId: string,
  fingerprint: string,
): Promise<GeneratedCourse | null> {
  const record = await prisma.course.findFirst({
    where: {
      userId,
      profileHash: fingerprint,
      updatedAt: {
        gte: new Date(Date.now() - TTL_MS),
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  if (!record) {
    return null;
  }

  return record.course as GeneratedCourse;
}

export async function saveCourseGeneration(
  course: GeneratedCourse,
  profileHash: string,
): Promise<GeneratedCourse> {
  await prisma.course.create({
    data: {
      userId: course.userId,
      profileHash,
      course,
    },
  });

  return course;
}

export async function upsertModuleCache(
  userId: string,
  profileHash: string,
  moduleTitle: string,
  modulePayload: GeneratedCourse["modules"][number],
): Promise<void> {
  const existing = await prisma.moduleCache.findFirst({
    where: {
      userId,
      profileHash,
      moduleTitle,
    },
    select: { id: true },
  });

  if (existing) {
    await prisma.moduleCache.update({
      where: { id: existing.id },
      data: {
        payload: modulePayload,
      },
    });
    return;
  }

  await prisma.moduleCache.create({
    data: {
      userId,
      profileHash,
      moduleTitle,
      payload: modulePayload,
    },
  });
}

export async function getCachedModule(
  userId: string,
  profileHash: string,
  moduleTitle: string,
): Promise<GeneratedCourse["modules"][number] | null> {
  const record = await prisma.moduleCache.findFirst({
    where: {
      userId,
      profileHash,
      moduleTitle,
    },
    orderBy: { updatedAt: "desc" },
  });
  return (record?.payload as GeneratedCourse["modules"][number] | undefined) ?? null;
}

export async function getCourseById(
  id: string,
  userId?: string,
): Promise<GeneratedCourse | null> {
  const record = await prisma.course.findUnique({
    where: {
      id,
    },
  });

  if (!record) {
    return null;
  }
  if (userId && record.userId !== userId) {
    return null;
  }
  return record.course as GeneratedCourse;
}

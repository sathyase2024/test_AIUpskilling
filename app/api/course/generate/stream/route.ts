import { NextRequest } from "next/server";
import { intakeSchema, type GeneratedModule } from "@/lib/types";
import { generateCourse } from "@/lib/agents/courseOrchestrator";
import {
  getCachedModule,
  getCourseByFingerprint,
  saveCourseGeneration,
  upsertModuleCache,
} from "@/lib/courseRepository";
import { buildFingerprint } from "@/lib/utils/hash";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const parsed = intakeSchema.safeParse(await req.json());
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: "Invalid request body", details: parsed.error.flatten() }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const profile = parsed.data;
  const userId = req.headers.get("x-user-id") ?? "stream-user";
  const fingerprint = buildFingerprint(profile);

  const cachedCourse = await getCourseByFingerprint(userId, fingerprint);
  if (cachedCourse) {
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        const send = (event: string, data: unknown) => {
          controller.enqueue(encoder.encode(`event: ${event}\n`));
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };
        send("status", { message: "Serving cached course" });
        send("done", cachedCourse);
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  }

  const modulesFromCache: Record<string, GeneratedModule> = {};
  const profileHash = buildFingerprint(profile);
  const moduleTitles = Array.from(
    { length: 8 },
    (_, index) => `${profile.interest} module ${index + 1}`,
  );
  for (const title of moduleTitles) {
    const cachedModule = await getCachedModule(userId, profileHash, title);
    if (cachedModule) {
      modulesFromCache[title.toLowerCase()] = cachedModule;
    }
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      try {
        send("status", { message: "Initializing AI agents" });
        const course = await generateCourse(
          userId,
          profile,
          { moduleCache: modulesFromCache },
          async (event) => {
            if (event.type === "module:start") {
              send("status", {
                message: `Generating module ${event.moduleIndex + 1}/${event.totalModules}: ${event.moduleTitle}`,
              });
            }
            if (event.type === "module:iteration") {
              send("status", {
                message: `Module ${event.moduleIndex + 1} iteration ${event.iteration} scored ${event.score}`,
              });
            }
          },
        );

        await saveCourseGeneration(course, fingerprint);
        await Promise.all(
          course.modules.map((module) =>
            upsertModuleCache(
              userId,
              profileHash,
              module.title,
              module,
            ),
          ),
        );

        send("done", course);
      } catch (error) {
        send("error", { message: error instanceof Error ? error.message : "Unknown error" });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}

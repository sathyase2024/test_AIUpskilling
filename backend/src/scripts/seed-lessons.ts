#!/usr/bin/env ts-node
/**
 * Lesson Pre-generation Script
 * Usage: cd backend && npx ts-node src/scripts/seed-lessons.ts
 *
 * Fetches all topics+lessons from the backend API, then calls the AI worker
 * to generate structured JSON content for each ungenerated lesson.
 */

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';
const AI_WORKER_URL = process.env.AI_WORKER_URL || 'http://localhost:8000';

interface Lesson {
  id: string;
  title: string;
  type: string;
  isGenerated: boolean;
  orderIndex: number;
}

interface Topic {
  id: string;
  name: string;
  slug: string;
  category: string;
  difficulty: string;
  lessons: Lesson[];
}

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  return res.json();
}

async function postJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}: ${await res.text()}`);
  return res.json();
}

async function patchJson(url: string, body: unknown) {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

async function generateAndSave(topic: Topic, lesson: Lesson): Promise<boolean> {
  try {
    const generated = await postJson(`${AI_WORKER_URL}/generate/lesson`, {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      lessonType: lesson.type,
      topicName: topic.name,
      topicCategory: topic.category,
      difficulty: topic.difficulty,
    });

    await patchJson(`${BACKEND_URL}/ai/lessons/${lesson.id}/content`, {
      contentJson: generated,
      isGenerated: true,
    });

    return true;
  } catch (err: any) {
    console.error(`  ✗ Failed: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('🚀 SkillForge AI — Lesson Pre-generation Script');
  console.log(`   Backend:   ${BACKEND_URL}`);
  console.log(`   AI Worker: ${AI_WORKER_URL}\n`);

  // Fetch all topics
  let topicsData: any;
  try {
    topicsData = await fetchJson(`${BACKEND_URL}/topics?limit=100`);
  } catch (e: any) {
    console.error('❌ Cannot reach backend:', e.message);
    console.error('   Make sure backend is running: npm run start:dev');
    process.exit(1);
  }

  const topics: any[] = topicsData.data || [];
  console.log(`📚 Found ${topics.length} topics\n`);

  let generated = 0;
  let skipped = 0;
  let failed = 0;

  for (const topicSummary of topics) {
    console.log(`\n📖 ${topicSummary.name} (${topicSummary.category})`);

    let topicDetail: any;
    try {
      topicDetail = await fetchJson(`${BACKEND_URL}/topics/${topicSummary.slug}`);
    } catch (e: any) {
      console.error(`  ✗ Cannot fetch topic detail: ${e.message}`);
      continue;
    }

    const lessons: Lesson[] = topicDetail.lessons || [];

    for (const lesson of lessons) {
      if (lesson.isGenerated) {
        console.log(`  ⏭  Skip (already generated): ${lesson.title}`);
        skipped++;
        continue;
      }

      process.stdout.write(`  ⚡ Generating: ${lesson.title} ... `);
      const ok = await generateAndSave(topicDetail, lesson);
      if (ok) {
        console.log('✓');
        generated++;
      } else {
        failed++;
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 500));
    }
  }

  console.log('\n' + '═'.repeat(50));
  console.log(`✅ Generated: ${generated}`);
  console.log(`⏭  Skipped:   ${skipped}`);
  console.log(`❌ Failed:    ${failed}`);
  console.log('═'.repeat(50));
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});

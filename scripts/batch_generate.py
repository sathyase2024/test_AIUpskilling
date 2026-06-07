#!/usr/bin/env python3
"""
SkillForge — Async batch lesson generation script.

Usage:
  python scripts/batch_generate.py --batch 1               # generate courses 0-9
  python scripts/batch_generate.py --batch 3 --concurrency 8
  python scripts/batch_generate.py --all                   # all 36 courses
  python scripts/batch_generate.py --all --output-dir /tmp/lessons
"""

import argparse
import asyncio
import json
import os
import re
import smtplib
import sys
import time
from datetime import datetime, timezone
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path
from typing import Optional

import anthropic

# ---------------------------------------------------------------------------
# Repo-root detection (script lives in scripts/, catalogue at root)
# ---------------------------------------------------------------------------
SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT = SCRIPT_DIR.parent
CATALOGUE_PATH = REPO_ROOT / "courses_catalogue.json"
PROGRESS_PATH = REPO_ROOT / "generation_progress.json"
AI_WORKER_PATH = REPO_ROOT / "ai-worker"

MODEL = "claude-haiku-4-5-20251001"
MAX_TOKENS = 16000
HOBBY = "cricket"

# Cost per million tokens (USD)
INPUT_COST_PER_MTOK = 0.80
OUTPUT_COST_PER_MTOK = 4.00

# ---------------------------------------------------------------------------
# Rate limiter — org limit is 50 RPM; stay at 40 to leave headroom
# ---------------------------------------------------------------------------

class _RateLimiter:
    """Sliding-window rate limiter: at most `rate` requests per `period` seconds."""
    def __init__(self, rate: int = 40, period: float = 60.0):
        self._sem = asyncio.Semaphore(rate)
        self._period = period

    async def acquire(self) -> None:
        await self._sem.acquire()
        asyncio.get_running_loop().call_later(self._period, self._sem.release)


# ---------------------------------------------------------------------------
# Import prompt helpers from ai-worker, with inline fallback
# ---------------------------------------------------------------------------
_build_lesson_prompt_fn = None
_schema_fn = None

try:
    sys.path.insert(0, str(AI_WORKER_PATH))
    # Patch config so it doesn't fail on missing .env during import
    import types
    fake_config = types.ModuleType("config")
    fake_config.MODEL = MODEL
    fake_config.MAX_TOKENS = MAX_TOKENS
    fake_config.get_client = lambda: None
    sys.modules.setdefault("config", fake_config)

    from routers.generate import _build_lesson_prompt as _imported_build, _schema as _imported_schema  # type: ignore
    _build_lesson_prompt_fn = _imported_build
    _schema_fn = _imported_schema
    print("[import] Loaded prompt helpers from ai-worker/routers/generate.py")
except Exception as exc:
    print(f"[import] Could not import ai-worker prompt helpers ({exc}); using inline fallback.")


# ---------------------------------------------------------------------------
# Inline fallback prompt helpers (mirrors generate.py exactly)
# ---------------------------------------------------------------------------
class _FakeLessonRequest:
    """Minimal duck-type for LessonRequest used by the imported prompt builder."""
    def __init__(self, *, lessonId, lessonTitle, lessonType, topicName, topicCategory, difficulty, hobby):
        self.lessonId = lessonId
        self.lessonTitle = lessonTitle
        self.lessonType = lessonType
        self.topicName = topicName
        self.topicCategory = topicCategory
        self.difficulty = difficulty
        self.hobby = hobby


def _inline_schema() -> str:
    return (
        "Return a JSON object with this exact schema:\n"
        "{\n"
        '  "lessonId": "<provided lessonId>",\n'
        '  "title": "<lesson title>",\n'
        '  "type": "<lesson type>",\n'
        '  "topicName": "<topic name>",\n'
        '  "estimatedMinutes": <integer>,\n'
        '  "xpReward": <integer>,\n'
        '  "generated": true,\n'
        '  "sections": [ { "type": "...", "content": "...", "language": "...", "level": 2, "items": [], "answer": -1, "explanation": "" } ]\n'
        "}\n\n"
        "Section types and their required fields:\n"
        '- "heading": content=heading text, level=2 or 3\n'
        '- "paragraph": content=rich explanatory text (minimum 80 words per paragraph, explain WHY not just WHAT)\n'
        '- "analogy": content=interest-based analogy starting with "🏏 Think of it like [interest]:" that maps the concept just explained to the learner\'s interest domain. Only used when a hobby is specified.\n'
        '- "code": content=full working code, language=language name (e.g. "python","java","typescript","bash")\n'
        '- "info_box": content=pro tip or important note starting with "Pro Tip:" or "Note:"\n'
        '- "warning_box": content=common mistake or pitfall starting with "Warning:" or "Common Mistake:"\n'
        '- "key_points": items=array of 5-7 detailed bullet strings (each 15-25 words)\n'
        '- "quiz": content=question, items=4 answer options, answer=correct index (0-3), explanation=why correct (30+ words)\n\n'
        "QUALITY REQUIREMENTS:\n"
        "- Every paragraph must be at least 80 words with real technical depth\n"
        "- Every code block must be complete, runnable, and well-commented\n"
        "- Include real-world context: where is this used in production, why does it matter\n"
        "- Do NOT use vague phrases like 'this is important' — explain WHY with specifics\n"
        "- Use precise technical language appropriate for the difficulty level\n\n"
        "Return only valid JSON. No markdown fences. No text outside the JSON.\n\n"
    )


def _inline_build_lesson_prompt(req) -> str:
    hobby = req.hobby.strip() if req.hobby and req.hobby.lower() not in ("general", "", "none") else ""

    analogy_rule = (
        f"\n=== PERSONALISATION RULE (interest: {hobby}) ===\n"
        f"The learning pattern for EVERY concept must follow this exact 3-step sequence:\n"
        f"  STEP 1 — PARAGRAPH: Explain the technical concept precisely. Pure technical content. No {hobby} in the paragraph.\n"
        f"  STEP 2 — ANALOGY: Immediately after the paragraph, add an 'analogy' section. This is the most important step.\n"
        f"             The analogy must be DEEP and DETAILED — not a one-liner. Follow this structure:\n"
        f"             a) First, describe the {hobby} scenario in specific detail (2-3 sentences). Name real players, real situations, real mechanics.\n"
        f"             b) Then explicitly draw the parallel — map EACH part of the technical concept to its {hobby} equivalent (3-4 sentences).\n"
        f"             c) End with the insight — what does understanding this {hobby} parallel reveal about the technical concept? (1-2 sentences).\n"
        f"             Total length: 6-10 sentences. Start with '🏏 Think of it like {hobby}:'.\n"
        f"             Use precise {hobby} terminology: innings, over, delivery, wicket, run rate, economy, DRS, powerplay,\n"
        f"             fielding positions, batting order, bowling spell, maiden over, scorecard, duckworth-lewis, etc.\n"
        f"             The analogy must make someone say 'oh NOW I understand why it works that way' — not just 'that's a bit like cricket'.\n"
        f"  STEP 3 — CODE: The code example that follows uses {hobby}-themed class names, variable names, and sample data\n"
        f"             (e.g. CricketPlayer, innings_count, match_id, Rohit Sharma, Jasprit Bumrah) to reinforce BOTH the concept and the analogy.\n"
        f"The paragraph teaches the concept. The analogy makes it click. The code makes it concrete.\n"
        f"Do NOT mix {hobby} into the paragraph text — keep the 3 steps cleanly separated.\n"
        f"=== END PERSONALISATION RULE ===\n"
    ) if hobby else ""

    ctx = (
        f"Topic: {req.topicName}\n"
        f"Category: {req.topicCategory}\n"
        f"Lesson Title: {req.lessonTitle}\n"
        f"Lesson ID: {req.lessonId}\n"
        f"Difficulty: {req.difficulty}\n"
        + analogy_rule + "\n"
    )

    schema = _inline_schema()

    if req.lessonType == "reading":
        analogy_instruction = (
            f"6-10 sentences following the 3-part structure in the PERSONALISATION RULE: "
            f"(a) specific {hobby} scenario with real names/situations, "
            f"(b) map each part of the concept to its {hobby} equivalent explicitly, "
            f"(c) state the insight this parallel reveals."
        ) if hobby else ""

        if hobby:
            sections = f"""Include ALL of the following sections in EXACTLY this order:

1.  heading (level 2): Overview
2.  paragraph: Motivating context — the problem this topic solves, why it was invented, what breaks without it. Minimum 100 words. Pure technical.
3.  analogy: {analogy_instruction}
4.  heading (level 2): Core Concepts
    IMPORTANT: Do NOT write one paragraph covering all concepts together.
    Instead, for EACH individual concept in this topic:
      a. heading (level 3): [Concept Name]
      b. paragraph: Explain THIS concept only. Minimum 80 words. Pure technical.
      c. analogy: Map THIS specific concept to {hobby}. {analogy_instruction}
    Repeat a/b/c for each concept. Typically 3-4 concepts = 9-12 sections here.
5.  code: A single complete, commented code example demonstrating ALL the concepts above together, using {hobby}-themed class/variable names.
6.  paragraph: Walk through the code — explain how each concept appears, runtime behaviour. Minimum 80 words.
7.  heading (level 2): How It Works Under the Hood
8.  paragraph: Internal mechanics — runtime/compiler/framework. Performance, memory, execution flow. Minimum 120 words. Pure technical.
9.  analogy: {analogy_instruction}
10. code: Second code example — advanced usage, using {hobby}-themed data.
11. info_box: Pro Tip — a non-obvious production insight. Start with "Pro Tip:".
12. heading (level 2): Common Patterns & Best Practices
13. paragraph: 2-3 established patterns with reasoning. Minimum 100 words. Pure technical.
14. analogy: {analogy_instruction}
15. code: Third code example — best practice vs anti-pattern, using {hobby}-themed objects.
16. warning_box: Most common beginner mistake and exactly how to avoid it. Start with "Warning:".
17. heading (level 2): Real-World Application
18. paragraph: How this is used in production at scale — specific companies, frameworks, systems. Minimum 80 words.
19. key_points: 6-7 detailed takeaway bullets — complete, specific insights.
20. quiz: Conceptual question on one of the core concepts. 4 options, correct index, 40+ word explanation.
21. quiz: Applied scenario question. 4 options, correct index, 40+ word explanation."""
        else:
            sections = """Include ALL of the following sections in order:

1.  heading (level 2): Overview
2.  paragraph: Motivating context — the problem this topic solves, why it was invented. Minimum 100 words.
3.  heading (level 2): Core Concepts
    For EACH individual concept:
      a. heading (level 3): [Concept Name]
      b. paragraph: Explain THIS concept only. Minimum 80 words.
    Repeat a/b for each concept. Typically 3-4 concepts.
4.  code: Complete, commented code example demonstrating ALL the concepts above.
5.  paragraph: Walk through the code. Minimum 80 words.
6.  heading (level 2): How It Works Under the Hood
7.  paragraph: Internal mechanics. Minimum 120 words.
8.  code: Second code example — advanced usage.
9.  info_box: Pro Tip. Start with "Pro Tip:".
10. heading (level 2): Common Patterns & Best Practices
11. paragraph: 2-3 established patterns with reasoning. Minimum 100 words.
12. code: Third code example — best practice vs anti-pattern.
13. warning_box: Most common beginner mistake. Start with "Warning:".
14. heading (level 2): Real-World Application
15. paragraph: Production usage. Minimum 80 words.
16. key_points: 6-7 detailed takeaway bullets.
17. quiz: Conceptual question. 4 options, correct index, 40+ word explanation.
18. quiz: Applied scenario question. 4 options, correct index, 40+ word explanation."""

        return ctx + schema + f"""Generate a DEEP, comprehensive reading lesson on "{req.lessonTitle}" for the topic "{req.topicName}".

This lesson must be equivalent to a high-quality textbook chapter.
{sections}

Set estimatedMinutes to 30-40. Set xpReward to 75."""

    elif req.lessonType == "exercise":
        if hobby:
            sections = f"""Include ALL sections in EXACTLY this order:

1.  heading (level 2): What You'll Build
2.  paragraph: What the learner builds — a {hobby}-themed project. Minimum 80 words. Pure technical.
3.  analogy: Why this project maps to {hobby}. 6-10 sentences.
4.  heading (level 2): Prerequisites
5.  key_points: 4-5 specific prerequisites.
6.  heading (level 2): Setup & Project Structure
7.  paragraph: Project setup, directory structure, dependencies. Minimum 60 words.
8.  code: Setup commands / file structure (language: bash) — use {hobby}-themed project names.
9.  heading (level 2): Step 1 — Foundation
10. paragraph: What Step 1 accomplishes. Minimum 60 words. Pure technical.
11. analogy: Map Step 1's concept to {hobby}. 6-10 sentences.
12. code: Complete code for Step 1 — use {hobby}-themed class/variable names.
13. heading (level 2): Step 2 — Core Logic
14. paragraph: What Step 2 builds. Minimum 60 words. Pure technical.
15. analogy: Map Step 2's concept to {hobby}. 6-10 sentences.
16. code: Complete code for Step 2 with {hobby}-themed data.
17. heading (level 2): Step 3 — Integration & Enhancement
18. paragraph: How Step 3 brings everything together. Minimum 60 words. Pure technical.
19. analogy: Map Step 3's integration to {hobby}. 6-10 sentences.
20. code: Complete code for Step 3.
21. heading (level 2): Step 4 — Testing & Verification
22. paragraph: How to run and verify the solution. Minimum 40 words.
23. code: Run commands + expected output using {hobby} data (language: bash).
24. warning_box: Most common error and fix. Start with "Warning:".
25. info_box: Extension challenge. Start with "Extension Challenge:".
26. key_points: 5-6 key concepts reinforced."""
        else:
            sections = """Include ALL sections in order:

1. heading (level 2): What You'll Build
2. paragraph: What the learner builds. Minimum 80 words.
3. heading (level 2): Prerequisites
4. key_points: 4-5 specific prerequisites.
5. heading (level 2): Setup & Project Structure
6. paragraph: Project setup. Minimum 60 words.
7. code: Setup commands (language: bash).
8. heading (level 2): Step 1 — Foundation
9. paragraph: What Step 1 accomplishes. Minimum 60 words.
10. code: Complete code for Step 1.
11. heading (level 2): Step 2 — Core Logic
12. paragraph: What Step 2 builds. Minimum 60 words.
13. code: Complete code for Step 2.
14. heading (level 2): Step 3 — Integration & Enhancement
15. paragraph: How Step 3 brings everything together. Minimum 60 words.
16. code: Complete code for Step 3.
17. heading (level 2): Step 4 — Testing & Verification
18. paragraph: How to run and verify. Minimum 40 words.
19. code: Run commands + expected output (language: bash).
20. warning_box: Most common error and fix. Start with "Warning:".
21. info_box: Extension challenge. Start with "Extension Challenge:".
22. key_points: 5-6 key concepts reinforced."""

        return ctx + schema + f"""Generate a DETAILED hands-on exercise for "{req.lessonTitle}" in "{req.topicName}".
{sections}

Set estimatedMinutes to 50-60. Set xpReward to 100."""

    elif req.lessonType == "project":
        if hobby:
            sections = f"""Include ALL sections in EXACTLY this order:

1.  heading (level 2): Project Overview
2.  paragraph: The project — a {hobby}-themed app. Purpose, portfolio value. Minimum 100 words. Pure technical.
3.  analogy: Why this project fits the {hobby} domain. 6-10 sentences.
4.  heading (level 2): Learning Objectives
5.  key_points: 5-6 specific skills demonstrated.
6.  heading (level 2): Technical Requirements
7.  key_points: 7-8 specific requirements grounded in the {hobby} use case.
8.  heading (level 2): Architecture & Design
9.  paragraph: Architecture — components, interactions, data flow, design decisions. Minimum 120 words. Pure technical.
10. analogy: Map the architecture to {hobby}. 6-10 sentences.
11. code: Architecture skeleton / project structure with {hobby}-themed file/class names.
12. heading (level 2): Phase 1 — Core Implementation
13. paragraph: What Phase 1 builds. Minimum 60 words. Pure technical.
14. analogy: Map Phase 1's core concept to {hobby}. 6-10 sentences.
15. code: Phase 1 implementation — use {hobby}-themed class names and realistic sample data.
16. heading (level 2): Phase 2 — Feature Completion
17. paragraph: What Phase 2 adds. Minimum 60 words. Pure technical.
18. analogy: Map Phase 2's new feature to {hobby}. 6-10 sentences.
19. code: Phase 2 code with {hobby}-themed data.
20. heading (level 2): Phase 3 — Polish & Production Readiness
21. paragraph: Error handling, testing, production considerations. Minimum 60 words.
22. code: Error handling / test code.
23. heading (level 2): Evaluation Rubric
24. key_points: 6-7 evaluation criteria.
25. info_box: Extension challenges. Start with "Extension Challenges:"."""
        else:
            sections = """Include ALL sections in order:

1. heading (level 2): Project Overview
2. paragraph: The project, purpose, portfolio value. Minimum 100 words.
3. heading (level 2): Learning Objectives
4. key_points: 5-6 specific skills demonstrated.
5. heading (level 2): Technical Requirements
6. key_points: 7-8 specific requirements.
7. heading (level 2): Architecture & Design
8. paragraph: Architecture — components, interactions, data flow. Minimum 120 words.
9. code: Architecture skeleton.
10. heading (level 2): Phase 1 — Core Implementation
11. paragraph: What Phase 1 builds. Minimum 60 words.
12. code: Phase 1 implementation.
13. heading (level 2): Phase 2 — Feature Completion
14. paragraph: What Phase 2 adds. Minimum 60 words.
15. code: Phase 2 code.
16. heading (level 2): Phase 3 — Polish & Production Readiness
17. paragraph: Error handling, testing, production. Minimum 60 words.
18. code: Error handling / test code.
19. heading (level 2): Evaluation Rubric
20. key_points: 6-7 evaluation criteria.
21. info_box: Extension challenges. Start with "Extension Challenges:"."""

        return ctx + schema + f"""Generate a COMPREHENSIVE capstone mini-project for "{req.lessonTitle}" in "{req.topicName}".
{sections}

Set estimatedMinutes to 60. Set xpReward to 150."""

    else:
        return ctx + schema + f"""Generate educational content for "{req.lessonTitle}" in "{req.topicName}".
Include: heading, a detailed 100-word paragraph{f", analogy mapping it to {hobby}" if hobby else ""}, a complete code example{f" with {hobby}-themed variable names" if hobby else ""}, an info_box, and key_points with 5 detailed bullets.
Set estimatedMinutes to 20. Set xpReward to 50."""


def build_lesson_prompt(lesson_id: str, lesson_title: str, lesson_type: str,
                        course_name: str, category: str, difficulty: str,
                        hobby: str = HOBBY) -> str:
    """Route to imported or inline prompt builder."""
    req = _FakeLessonRequest(
        lessonId=lesson_id,
        lessonTitle=lesson_title,
        lessonType=lesson_type,
        topicName=course_name,
        topicCategory=category,
        difficulty=difficulty,
        hobby=hobby,
    )
    if _build_lesson_prompt_fn is not None:
        return _build_lesson_prompt_fn(req)
    return _inline_build_lesson_prompt(req)


# ---------------------------------------------------------------------------
# Progress tracking
# ---------------------------------------------------------------------------

def load_progress() -> dict:
    if PROGRESS_PATH.exists():
        try:
            return json.loads(PROGRESS_PATH.read_text())
        except Exception:
            pass
    return {
        "completed": [],
        "failed": [],
        "started_at": datetime.now(timezone.utc).isoformat(),
        "last_updated": datetime.now(timezone.utc).isoformat(),
    }


def save_progress(progress: dict) -> None:
    progress["last_updated"] = datetime.now(timezone.utc).isoformat()
    PROGRESS_PATH.write_text(json.dumps(progress, indent=2))


# ---------------------------------------------------------------------------
# Email notifications
# ---------------------------------------------------------------------------

def _send_email(subject: str, body: str) -> None:
    gmail_user = os.environ.get("GMAIL_USER", "")
    gmail_password = os.environ.get("GMAIL_APP_PASSWORD", "")
    notify_email = os.environ.get("NOTIFY_EMAIL", "")

    if not all([gmail_user, gmail_password, notify_email]):
        print(f"[email] Skipping — GMAIL_USER / GMAIL_APP_PASSWORD / NOTIFY_EMAIL not set.")
        return

    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = subject
        msg["From"] = f"SkillForge Generator <{gmail_user}>"
        msg["To"] = notify_email

        msg.attach(MIMEText(body, "plain"))

        with smtplib.SMTP("smtp.gmail.com", 587, timeout=30) as server:
            server.ehlo()
            server.starttls()
            server.login(gmail_user, gmail_password)
            server.sendmail(gmail_user, notify_email, msg.as_string())
        print(f"[email] Sent: {subject}")
    except Exception as exc:
        print(f"[email] Failed to send email: {exc}")


def notify_course_complete(
    course: dict,
    lessons_generated: int,
    elapsed: float,
    input_tokens: int,
    output_tokens: int,
    course_num: int,
    total_in_batch: int,
    next_course: Optional[str],
) -> None:
    cost = (input_tokens / 1_000_000 * INPUT_COST_PER_MTOK
            + output_tokens / 1_000_000 * OUTPUT_COST_PER_MTOK)
    subject = f"✅ SkillForge: {course['name']} complete ({course_num}/{total_in_batch} in batch)"
    body = (
        f"Course: {course['name']} ({course['category']}, {course['difficulty']})\n"
        f"Slug: {course['slug']}\n"
        f"Lessons generated: {lessons_generated}\n"
        f"Time taken: {elapsed:.1f}s ({elapsed/60:.1f}m)\n"
        f"Tokens — input: {input_tokens:,}  output: {output_tokens:,}\n"
        f"Cost estimate: ${cost:.4f}\n"
        f"Next course: {next_course or 'None (batch complete)'}\n"
    )
    _send_email(subject, body)


def notify_batch_complete(
    batch_label: str,
    courses: list,
    course_stats: list,
    total_elapsed: float,
    total_input: int,
    total_output: int,
) -> None:
    total_lessons = sum(s["lessons"] for s in course_stats)
    total_cost = (total_input / 1_000_000 * INPUT_COST_PER_MTOK
                  + total_output / 1_000_000 * OUTPUT_COST_PER_MTOK)
    subject = f"🎉 SkillForge Batch {batch_label} complete — {total_lessons} lessons generated"

    lines = [
        f"Batch {batch_label} generation complete!",
        f"",
        f"Total lessons:  {total_lessons}",
        f"Total time:     {total_elapsed:.1f}s ({total_elapsed/60:.1f}m)",
        f"Total tokens:   input={total_input:,}  output={total_output:,}",
        f"Total cost:     ${total_cost:.4f}",
        f"",
        f"{'Course':<45} {'Lessons':>7} {'Time(s)':>8} {'Cost($)':>9}",
        "-" * 75,
    ]
    for s in course_stats:
        c = (s["input_tokens"] / 1_000_000 * INPUT_COST_PER_MTOK
             + s["output_tokens"] / 1_000_000 * OUTPUT_COST_PER_MTOK)
        lines.append(f"{s['name']:<45} {s['lessons']:>7} {s['elapsed']:>8.1f} {c:>9.4f}")

    body = "\n".join(lines)
    _send_email(subject, body)


def notify_error(course_slug: str, lesson_idx: int, error: str) -> None:
    subject = "❌ SkillForge generation failed"
    body = (
        f"Unrecoverable error during lesson generation.\n\n"
        f"Course slug: {course_slug}\n"
        f"Lesson index: {lesson_idx}\n"
        f"Error: {error}\n\n"
        f"To resume, run:\n"
        f"  python scripts/batch_generate.py --batch <N>\n"
        f"Already-completed lessons will be skipped automatically.\n"
    )
    _send_email(subject, body)


# ---------------------------------------------------------------------------
# JSON parsing helper
# ---------------------------------------------------------------------------

def _parse_json_response(raw: str) -> dict:
    text = raw.strip()
    if text.startswith("```"):
        lines = text.split("\n")
        text = "\n".join(lines[1:-1]) if len(lines) > 2 else text
        text = text.strip()

    # Direct parse
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        pass

    # Extract outermost {...} in case there's surrounding text
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end > start:
        try:
            return json.loads(text[start:end + 1])
        except json.JSONDecodeError:
            pass

    # json_repair as last resort — try on extracted block first, then full text
    try:
        from json_repair import repair_json
        block = text[start:end + 1] if (start != -1 and end > start) else text
        for candidate in (block, text):
            try:
                repaired = repair_json(candidate, return_objects=True)
                if isinstance(repaired, dict):
                    return repaired
            except Exception:
                pass
    except ImportError:
        pass

    # Salvage truncated output: walk back from end to find last complete section,
    # then close the sections array and root object
    if start != -1:
        src = text[start:]
        for i in range(len(src) - 1, -1, -1):
            if src[i] == '}':
                for suffix in (']}', ']}  }', ']\n}'):
                    candidate = src[:i + 1] + suffix
                    try:
                        result = json.loads(candidate)
                        if isinstance(result, dict):
                            return result
                    except json.JSONDecodeError:
                        pass
                    try:
                        from json_repair import repair_json
                        result = repair_json(candidate, return_objects=True)
                        if isinstance(result, dict):
                            return result
                    except Exception:
                        pass

    return json.loads(text)  # re-raise original error


def _slugify(title: str) -> str:
    s = title.lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = s.strip("-")
    return s


# ---------------------------------------------------------------------------
# Lesson title generation
# ---------------------------------------------------------------------------

async def generate_lesson_titles(
    client: anthropic.AsyncAnthropic,
    sem: asyncio.Semaphore,
    rate_limiter: "_RateLimiter",
    course: dict,
) -> list:
    """Call Haiku to generate 35 lesson titles for a course."""
    prompt = (
        f'Generate exactly 35 lesson titles for a comprehensive "{course["name"]}" course ({course["difficulty"]} level).\n'
        f"Cover beginner to advanced: foundation concepts (lessons 1-10), core skills (11-25), advanced topics (26-35).\n"
        f'Return a JSON array of 35 objects: [{{"title": "...", "type": "reading"}}, ...]\n'
        f"Types: 28 reading, 5 exercise, 2 project. Place exercises at lessons 10, 18, 25, 30, 35 "
        f"and projects at lessons 20 and 35 (change lesson 35 type to \"project\").\n"
        f"Return only valid JSON array, no markdown."
    )

    system_prompt = (
        "You are an expert curriculum designer. Return only valid JSON arrays, no markdown, no extra text."
    )

    for attempt in range(3):
        try:
            await rate_limiter.acquire()
            async with sem:
                response = await client.messages.create(
                    model=MODEL,
                    max_tokens=4096,
                    system=system_prompt,
                    messages=[{"role": "user", "content": prompt}],
                )
            raw = response.content[0].text.strip()
            titles = _parse_json_response(raw)
            if isinstance(titles, list) and len(titles) == 35:
                return titles
            # Wrong length — retry
            print(f"  [titles] Got {len(titles)} titles instead of 35, retrying...")
        except json.JSONDecodeError as exc:
            if attempt < 2:
                retry_note = "\nReturn ONLY valid JSON"
                prompt_retry = prompt + retry_note
                print(f"  [titles] JSON parse error ({exc}), retrying with JSON reminder...")
                prompt = prompt_retry
                await asyncio.sleep(2 ** attempt * 2)
                continue
            raise
        except anthropic.RateLimitError as exc:
            wait = 20 * (attempt + 1)
            print(f"  [titles] Rate limit hit, retrying in {wait}s...")
            await asyncio.sleep(wait)
        except anthropic.APIError as exc:
            wait = 2 ** attempt * 2
            print(f"  [titles] API error ({exc}), retrying in {wait}s...")
            await asyncio.sleep(wait)

    # Final attempt failed — return minimal fallback
    print(f"  [titles] Failed to generate titles for {course['name']}; using numbered fallback.")
    lesson_types = []
    for i in range(1, 36):
        if i in (10, 18, 25, 30):
            t = "exercise"
        elif i == 35:
            t = "project"
        elif i == 20:
            t = "project"
        else:
            t = "reading"
        lesson_types.append({"title": f"Lesson {i}: {course['name']} Part {i}", "type": t})
    return lesson_types


# ---------------------------------------------------------------------------
# Single-lesson generation with retry
# ---------------------------------------------------------------------------

async def generate_single_lesson(
    client: anthropic.AsyncAnthropic,
    sem: asyncio.Semaphore,
    rate_limiter: "_RateLimiter",
    course: dict,
    lesson_idx: int,
    lesson_title: str,
    lesson_type: str,
) -> tuple[dict, int, int]:
    """
    Generate one lesson. Returns (lesson_data, input_tokens, output_tokens).
    Raises on persistent failure.
    """
    lesson_id = f"{course['slug']}-{lesson_idx:02d}"
    system_prompt = (
        "You are an expert technical educator. Generate structured lesson content as valid JSON only. "
        "No markdown outside JSON."
    )
    user_prompt = build_lesson_prompt(
        lesson_id=lesson_id,
        lesson_title=lesson_title,
        lesson_type=lesson_type,
        course_name=course["name"],
        category=course["category"],
        difficulty=course["difficulty"],
        hobby=HOBBY,
    )
    json_reminder = "\n\nReturn ONLY valid JSON"
    # Prompt suffix used when the model hits the token limit (output truncated)
    brevity_suffix = (
        "\n\nCRITICAL: Your previous response was cut off at the token limit. "
        "You MUST include ALL sections (Overview, Core Concepts, How It Works Under the Hood, "
        "Common Patterns & Best Practices, Real-World Application, and 2 quiz sections) — "
        "do NOT drop any section. Instead, make each section MORE CONCISE: "
        "paragraphs under 80 words, analogies under 60 words, code blocks under 10 lines, "
        "key_points max 5 bullets. Return ONLY valid JSON."
    )

    last_exc = None
    truncated = False
    for attempt in range(5):
        if attempt == 0:
            current_prompt = user_prompt
        elif truncated:
            current_prompt = user_prompt + brevity_suffix
        else:
            current_prompt = user_prompt + json_reminder
        try:
            await rate_limiter.acquire()
            async with sem:
                response = await client.messages.create(
                    model=MODEL,
                    max_tokens=MAX_TOKENS,
                    system=[
                        {
                            "type": "text",
                            "text": system_prompt,
                            "cache_control": {"type": "ephemeral"},
                        }
                    ],
                    messages=[{"role": "user", "content": current_prompt}],
                )

            raw = response.content[0].text.strip()
            in_tok = response.usage.input_tokens
            out_tok = response.usage.output_tokens
            truncated = out_tok >= MAX_TOKENS - 10

            try:
                lesson_data = _parse_json_response(raw)
                if not isinstance(lesson_data, dict):
                    raise json.JSONDecodeError(
                        f"Expected JSON object, got {type(lesson_data).__name__}", raw, 0
                    )
            except json.JSONDecodeError as exc:
                if attempt < 4:
                    reason = "output truncated (hit token limit)" if truncated else str(exc)
                    print(f"    [lesson {lesson_idx}] JSON parse error ({reason}), retrying{'  with brevity hint' if truncated else ''}...")
                    await asyncio.sleep(2 ** attempt * 2)
                    last_exc = exc
                    continue
                raise

            # Normalise defaults
            lesson_data.setdefault("lessonId", lesson_id)
            lesson_data.setdefault("title", lesson_title)
            lesson_data.setdefault("type", lesson_type)
            lesson_data.setdefault("topicName", course["name"])
            lesson_data.setdefault("generated", True)
            lesson_data.setdefault("estimatedMinutes", 20)
            lesson_data.setdefault("xpReward", 50)
            for section in lesson_data.get("sections", []):
                section.setdefault("language", "")
                section.setdefault("level", 2)
                section.setdefault("items", [])
                section.setdefault("answer", -1)
                section.setdefault("explanation", "")

            return lesson_data, in_tok, out_tok

        except anthropic.RateLimitError as exc:
            wait = 20 * (attempt + 1)  # 20s, 40s, 60s, 80s, 100s
            print(f"    [lesson {lesson_idx}] Rate limit hit (attempt {attempt+1}/5), retrying in {wait}s...")
            await asyncio.sleep(wait)
            last_exc = exc
        except (anthropic.APIConnectionError,
                anthropic.APITimeoutError, anthropic.InternalServerError) as exc:
            wait = 2 ** attempt * 2
            print(f"    [lesson {lesson_idx}] API error ({type(exc).__name__}), retrying in {wait}s...")
            await asyncio.sleep(wait)
            last_exc = exc
        except anthropic.AuthenticationError:
            raise  # Don't retry auth errors
        except Exception as exc:
            wait = 2 ** attempt * 2
            print(f"    [lesson {lesson_idx}] Unexpected error ({exc}), retrying in {wait}s...")
            await asyncio.sleep(wait)
            last_exc = exc

    raise RuntimeError(f"Persistent failure after 5 attempts: {last_exc}") from last_exc


# ---------------------------------------------------------------------------
# Course generation
# ---------------------------------------------------------------------------

async def generate_course(
    client: anthropic.AsyncAnthropic,
    sem: asyncio.Semaphore,
    rate_limiter: "_RateLimiter",
    course: dict,
    output_dir: Path,
    progress: dict,
    lessons_per_course: int = 35,
) -> dict:
    """
    Generate all lessons for one course. Returns stats dict.
    """
    slug = course["slug"]
    course_dir = output_dir / slug
    course_dir.mkdir(parents=True, exist_ok=True)

    ts_start = time.time()
    print(f"\n{'='*70}")
    print(f"[{_ts()}] Course: {course['name']} (index {course['index']}, {course['difficulty']})")
    print(f"  Output: {course_dir}")

    # --- Step 1: Get or generate lesson titles ---
    curriculum_path = course_dir / "curriculum.json"
    titles = None
    if curriculum_path.exists():
        try:
            titles = json.loads(curriculum_path.read_text())
            print(f"  [titles] Loaded from curriculum.json ({len(titles)} lessons)")
        except Exception:
            titles = None

    if titles is None:
        print(f"  [titles] Generating 35 lesson titles via Haiku...")
        titles = await generate_lesson_titles(client, sem, rate_limiter, course)
        curriculum_path.write_text(json.dumps(titles, indent=2))
        print(f"  [titles] Saved curriculum.json")

    # Ensure we have exactly lessons_per_course entries
    if len(titles) < lessons_per_course:
        for i in range(len(titles), lessons_per_course):
            titles.append({"title": f"Advanced Topic {i+1}", "type": "reading"})
    titles = titles[:lessons_per_course]

    # --- Step 2: Generate lessons concurrently ---
    total_input = 0
    total_output = 0
    lessons_done = 0
    failed_lessons = []

    async def _gen_lesson(idx: int, title_entry: dict):
        nonlocal total_input, total_output, lessons_done

        lesson_key = f"{slug}/{idx}"
        if lesson_key in progress["completed"]:
            print(f"  [skip] Lesson {idx:02d} already completed.")
            lessons_done += 1
            return

        lesson_title = title_entry["title"]
        lesson_type = title_entry.get("type", "reading")
        lesson_slug = _slugify(lesson_title)
        lesson_path = course_dir / f"lesson_{idx:02d}_{lesson_slug}.json"

        print(f"  [{_ts()}] Generating lesson {idx:02d}/{lessons_per_course-1}: {lesson_title} [{lesson_type}]")

        try:
            lesson_data, in_tok, out_tok = await generate_single_lesson(
                client, sem, rate_limiter, course, idx, lesson_title, lesson_type
            )
            lesson_path.write_text(json.dumps(lesson_data, indent=2, ensure_ascii=False))

            total_input += in_tok
            total_output += out_tok
            lessons_done += 1

            progress["completed"].append(lesson_key)
            save_progress(progress)

            cost = in_tok / 1_000_000 * INPUT_COST_PER_MTOK + out_tok / 1_000_000 * OUTPUT_COST_PER_MTOK
            print(f"    [ok] Lesson {idx:02d} done — {in_tok}+{out_tok} tokens, ${cost:.4f}")

        except Exception as exc:
            print(f"    [FAIL] Lesson {idx:02d} FAILED: {exc}")
            failed_lessons.append(idx)
            lesson_key_fail = f"{slug}/{idx}"
            if lesson_key_fail not in progress["failed"]:
                progress["failed"].append(lesson_key_fail)
            save_progress(progress)
            notify_error(slug, idx, str(exc))

    # Run all lessons concurrently (semaphore + rate limiter control throughput)
    tasks = [_gen_lesson(i, titles[i]) for i in range(lessons_per_course)]
    await asyncio.gather(*tasks)

    elapsed = time.time() - ts_start
    cost = (total_input / 1_000_000 * INPUT_COST_PER_MTOK
            + total_output / 1_000_000 * OUTPUT_COST_PER_MTOK)

    print(f"\n  [course done] {course['name']}: {lessons_done} lessons in {elapsed:.1f}s"
          f" — tokens: {total_input}+{total_output}, cost: ${cost:.4f}"
          f" — {len(failed_lessons)} failed")

    return {
        "name": course["name"],
        "slug": slug,
        "lessons": lessons_done,
        "failed": len(failed_lessons),
        "elapsed": elapsed,
        "input_tokens": total_input,
        "output_tokens": total_output,
    }


# ---------------------------------------------------------------------------
# Main batch runner
# ---------------------------------------------------------------------------

async def run_batch(
    courses: list,
    output_dir: Path,
    concurrency: int,
    batch_label: str,
    lessons_per_course: int = 35,
) -> None:
    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY environment variable is not set.")
        sys.exit(1)

    client = anthropic.AsyncAnthropic(api_key=api_key)
    sem = asyncio.Semaphore(concurrency)
    rate_limiter = _RateLimiter(rate=40, period=60.0)
    output_dir.mkdir(parents=True, exist_ok=True)

    progress = load_progress()
    if "started_at" not in progress:
        progress["started_at"] = datetime.now(timezone.utc).isoformat()

    batch_start = time.time()
    total_input = 0
    total_output = 0
    course_stats = []

    print(f"\n{'#'*70}")
    print(f"[{_ts()}] SkillForge Batch {batch_label} — {len(courses)} courses × {lessons_per_course} lessons")
    print(f"  Concurrency: {concurrency} | Model: {MODEL} | Hobby: {HOBBY}")
    print(f"  Output dir: {output_dir}")
    print(f"{'#'*70}\n")

    for i, course in enumerate(courses):
        stats = await generate_course(
            client, sem, rate_limiter, course, output_dir, progress, lessons_per_course
        )
        course_stats.append(stats)
        total_input += stats["input_tokens"]
        total_output += stats["output_tokens"]

        next_course = courses[i + 1]["name"] if i + 1 < len(courses) else None
        notify_course_complete(
            course=course,
            lessons_generated=stats["lessons"],
            elapsed=stats["elapsed"],
            input_tokens=stats["input_tokens"],
            output_tokens=stats["output_tokens"],
            course_num=i + 1,
            total_in_batch=len(courses),
            next_course=next_course,
        )

    total_elapsed = time.time() - batch_start
    total_cost = (total_input / 1_000_000 * INPUT_COST_PER_MTOK
                  + total_output / 1_000_000 * OUTPUT_COST_PER_MTOK)
    total_lessons = sum(s["lessons"] for s in course_stats)

    print(f"\n{'#'*70}")
    print(f"[{_ts()}] BATCH {batch_label} COMPLETE")
    print(f"  Courses:    {len(courses)}")
    print(f"  Lessons:    {total_lessons}")
    print(f"  Time:       {total_elapsed:.1f}s ({total_elapsed/60:.1f}m)")
    print(f"  Tokens:     input={total_input:,}  output={total_output:,}")
    print(f"  Cost:       ${total_cost:.4f}")
    print(f"{'#'*70}\n")

    notify_batch_complete(
        batch_label=batch_label,
        courses=courses,
        course_stats=course_stats,
        total_elapsed=total_elapsed,
        total_input=total_input,
        total_output=total_output,
    )


def _ts() -> str:
    return datetime.now().strftime("%H:%M:%S")


# ---------------------------------------------------------------------------
# CLI entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="SkillForge async batch lesson generator"
    )
    parser.add_argument(
        "--batch", type=int, choices=range(1, 5), default=1, metavar="N",
        help="Batch number 1-4 (generates 10 courses, except batch 4 which has 6). Default: 1"
    )
    parser.add_argument(
        "--all", action="store_true",
        help="Generate all 36 courses (overrides --batch)"
    )
    parser.add_argument(
        "--course", type=int, metavar="N",
        help="Single course index 0-35. Overrides --batch and --all."
    )
    parser.add_argument(
        "--concurrency", type=int, default=3, metavar="N",
        help="Number of parallel workers. Default: 3"
    )
    parser.add_argument(
        "--output-dir", type=str, default=str(REPO_ROOT / "generated_lessons"),
        help="Directory to save generated lessons. Default: generated_lessons/"
    )
    args = parser.parse_args()

    # Load catalogue
    if not CATALOGUE_PATH.exists():
        print(f"ERROR: courses_catalogue.json not found at {CATALOGUE_PATH}")
        sys.exit(1)

    catalogue = json.loads(CATALOGUE_PATH.read_text())
    all_courses = catalogue["courses"]
    lessons_per_course = catalogue.get("lessons_per_course", 35)
    batches = catalogue.get("batches", {})

    if args.course is not None:
        selected_courses = [c for c in all_courses if c["index"] == args.course]
        if not selected_courses:
            print(f"ERROR: Course {args.course} not found (valid: 0-{len(all_courses)-1}).")
            sys.exit(1)
        batch_label = f"course-{args.course}"
    elif args.all:
        selected_courses = all_courses
        batch_label = "all"
    else:
        batch_key = str(args.batch)
        if batch_key not in batches:
            print(f"ERROR: Batch {args.batch} not found. Available: {list(batches.keys())}")
            sys.exit(1)
        batch_range = batches[batch_key]
        selected_courses = [
            c for c in all_courses
            if batch_range["start"] <= c["index"] <= batch_range["end"]
        ]
        batch_label = str(args.batch)

    output_dir = Path(args.output_dir)

    asyncio.run(run_batch(
        courses=selected_courses,
        output_dir=output_dir,
        concurrency=args.concurrency,
        batch_label=batch_label,
        lessons_per_course=lessons_per_course,
    ))


if __name__ == "__main__":
    main()

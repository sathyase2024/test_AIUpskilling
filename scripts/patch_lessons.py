#!/usr/bin/env python3
"""
Patch missing second-half sections into existing lessons.
Generates only what's missing: Under the Hood, Patterns, Real-World, Quizzes.

Usage:
  python scripts/patch_lessons.py                              # all courses
  python scripts/patch_lessons.py --course large-language-models
  python scripts/patch_lessons.py --dry-run                   # count only
"""

import argparse
import asyncio
import json
from pathlib import Path

import anthropic

SCRIPT_DIR    = Path(__file__).resolve().parent
REPO_ROOT     = SCRIPT_DIR.parent
GENERATED_DIR = REPO_ROOT / "generated_lessons"

MODEL       = "claude-haiku-4-5-20251001"
MAX_TOKENS  = 3000
HOBBY       = "cricket"
CONCURRENCY = 4

INPUT_COST  = 0.80 / 1_000_000
OUTPUT_COST = 4.00 / 1_000_000

SUPPORTED = {
    "heading", "paragraph", "code", "info_box",
    "warning_box", "quiz", "exercise", "key_points", "analogy",
}


# ─── What's missing ──────────────────────────────────────────────────────────

def get_missing(sections: list) -> list:
    headings = [s.get("content", "").lower() for s in sections if s.get("type") == "heading"]
    types    = {s.get("type") for s in sections}
    missing  = []
    if not any("under the hood" in h or "how it works" in h for h in headings):
        missing.append("under_hood")
    if not any("pattern" in h or "best practice" in h for h in headings):
        missing.append("patterns")
    if not any("real" in h or "application" in h or "production" in h for h in headings):
        missing.append("real_world")
    if "quiz" not in types:
        missing.append("quiz")
    return missing


# ─── Prompt builder ───────────────────────────────────────────────────────────

def build_prompt(d: dict, missing: list) -> str:
    title    = d.get("title", "")
    topic    = d.get("topicName", "")
    sections = d.get("sections", [])
    existing = [s.get("content", "") for s in sections if s.get("type") == "heading"]

    parts = []

    if "under_hood" in missing:
        parts.append(
            "=== SECTION: How It Works Under the Hood ===\n"
            "1. heading level 2: 'How It Works Under the Hood'\n"
            "2. paragraph: Internal mechanics — runtime behaviour, memory model, execution flow, "
            "performance characteristics. Minimum 120 words. Pure technical, no cricket.\n"
            "3. analogy: '🏏 Think of it like cricket:' — 6-8 sentences: (a) specific cricket scenario "
            "with real player names (Rohit Sharma, Jasprit Bumrah, Virat Kohli), "
            "(b) map EACH technical mechanic explicitly to its cricket counterpart, "
            "(c) state what this parallel reveals about the concept.\n"
            "4. code: Advanced/internal usage example with cricket-themed variable names."
        )

    if "patterns" in missing:
        parts.append(
            "=== SECTION: Common Patterns & Best Practices ===\n"
            "1. heading level 2: 'Common Patterns & Best Practices'\n"
            "2. paragraph: 2-3 established production patterns — WHEN to use each and WHY, "
            "trade-offs and costs. Minimum 100 words. Pure technical.\n"
            "3. analogy: '🏏 Think of it like cricket:' — map each pattern to a cricket "
            "strategy decision (field placement, bowling rotation, DRS usage). 6-8 sentences.\n"
            "4. code: Best practice vs anti-pattern comparison with cricket-themed objects.\n"
            "5. warning_box: 'Warning: [most common beginner mistake and exactly how to fix it]'"
        )

    if "real_world" in missing:
        parts.append(
            "=== SECTION: Real-World Application ===\n"
            "1. heading level 2: 'Real-World Application'\n"
            "2. paragraph: How this is used in production at scale — name specific companies "
            "(Google, Netflix, Uber, OpenAI, Meta, Airbnb), real frameworks, actual systems. "
            "What scale? What breaks when done wrong? Minimum 80 words.\n"
            "3. key_points: 6-7 bullet strings (each 15-25 words) — most important takeaways "
            "from the ENTIRE lesson."
        )

    if "quiz" in missing:
        parts.append(
            "=== SECTION: Knowledge Checks (2 quizzes) ===\n"
            "Quiz 1 — Conceptual: test understanding of a core mechanism from this lesson.\n"
            "Quiz 2 — Applied: a real scenario ('given situation X, what would you do?').\n"
            "Each: content=question, items=[4 options], answer=correct index 0-3, "
            "explanation=40+ words explaining WHY correct and why others are wrong."
        )

    schema = (
        '{"sections": ['
        '{"type":"heading","content":"...","level":2,"language":"","items":[],"answer":-1,"explanation":""},'
        '{"type":"paragraph","content":"...","level":2,"language":"","items":[],"answer":-1,"explanation":""},'
        '{"type":"analogy","content":"🏏 Think of it like cricket: ...","level":2,"language":"","items":[],"answer":-1,"explanation":""},'
        '{"type":"code","content":"...","language":"python","level":2,"items":[],"answer":-1,"explanation":""},'
        '{"type":"warning_box","content":"Warning: ...","level":2,"language":"","items":[],"answer":-1,"explanation":""},'
        '{"type":"key_points","items":["...","..."],"content":"","level":2,"language":"","answer":-1,"explanation":""},'
        '{"type":"quiz","content":"Question?","items":["A","B","C","D"],"answer":0,"explanation":"...","level":2,"language":""}'
        "]}"
    )

    return (
        f"Complete a half-finished lesson for SkillForge AI educational platform.\n\n"
        f"Topic: {topic}\n"
        f"Lesson: {title}\n"
        f"Learner interest: {HOBBY} (use for analogies and variable names)\n"
        f"Existing sections: {', '.join(existing)}\n\n"
        f"Generate ONLY these missing sections:\n\n"
        + "\n\n".join(parts)
        + f"\n\nReturn a JSON object with this schema:\n{schema}\n\n"
        f"Return ONLY valid JSON. No markdown fences. No text outside JSON."
    )


# ─── Response parsing ─────────────────────────────────────────────────────────

def parse_response(text: str) -> list:
    text = text.strip()
    # Strip markdown fences
    if "```" in text:
        for block in text.split("```"):
            block = block.strip()
            if block.startswith("json"):
                block = block[4:].strip()
            try:
                d = json.loads(block)
                if isinstance(d, dict) and "sections" in d:
                    return d["sections"]
            except Exception:
                pass

    # Direct parse
    try:
        d = json.loads(text)
        if isinstance(d, dict) and "sections" in d:
            return d["sections"]
    except Exception:
        pass

    # Find first {
    idx = text.find("{")
    if idx >= 0:
        try:
            d = json.loads(text[idx:])
            if isinstance(d, dict) and "sections" in d:
                return d["sections"]
        except Exception:
            pass

    return []


def filter_sections(sections: list) -> list:
    valid = []
    for s in sections:
        t = s.get("type")
        if t not in SUPPORTED:
            continue
        if t == "key_points":
            if s.get("items"):
                valid.append(s)
        elif t == "quiz":
            if s.get("content") and s.get("items") and len(s["items"]) >= 2:
                valid.append(s)
        else:
            if str(s.get("content", "")).strip():
                valid.append(s)
    return valid


# ─── Per-lesson worker ────────────────────────────────────────────────────────

async def patch_one(
    client: anthropic.AsyncAnthropic,
    sem: asyncio.Semaphore,
    path: Path,
) -> dict:
    async with sem:
        with open(path) as f:
            d = json.load(f)

        sections = d.get("sections", [])
        missing  = get_missing(sections)

        if not missing:
            return {"skipped": True}

        prompt = build_prompt(d, missing)

        try:
            resp = await client.messages.create(
                model=MODEL,
                max_tokens=MAX_TOKENS,
                messages=[{"role": "user", "content": prompt}],
            )

            in_tok  = resp.usage.input_tokens
            out_tok = resp.usage.output_tokens
            cost    = in_tok * INPUT_COST + out_tok * OUTPUT_COST

            raw_sections = parse_response(resp.content[0].text)
            valid        = filter_sections(raw_sections)

            if valid:
                d["sections"] = sections + valid
                with open(path, "w") as f:
                    json.dump(d, f, indent=2, ensure_ascii=False)

            return {
                "ok":      True,
                "name":    f"{path.parent.name}/{path.name}",
                "missing": missing,
                "added":   len(valid),
                "in_tok":  in_tok,
                "out_tok": out_tok,
                "cost":    cost,
            }

        except Exception as e:
            return {"error": str(e), "name": f"{path.parent.name}/{path.name}", "missing": missing}


# ─── Main ─────────────────────────────────────────────────────────────────────

async def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--course",   help="Only patch this course slug")
    parser.add_argument("--dry-run",  action="store_true")
    args = parser.parse_args()

    lessons: list[Path] = []
    for course_dir in sorted(GENERATED_DIR.iterdir()):
        if not course_dir.is_dir():
            continue
        if args.course and course_dir.name != args.course:
            continue
        for f in sorted(course_dir.glob("lesson_*.json")):
            lessons.append(f)

    if args.dry_run:
        need = 0
        for path in lessons:
            with open(path) as f:
                d = json.load(f)
            missing = get_missing(d.get("sections", []))
            if missing:
                need += 1
                print(f"  {path.parent.name}/{path.name}: {missing}")
        print(f"\n{need}/{len(lessons)} lessons need patching")
        return

    aclient = anthropic.AsyncAnthropic()
    sem     = asyncio.Semaphore(CONCURRENCY)

    print(f"Patching up to {len(lessons)} lessons (concurrency={CONCURRENCY})…\n")

    tasks   = [patch_one(aclient, sem, p) for p in lessons]
    results = await asyncio.gather(*tasks)

    ok = errors = skipped = total_added = 0
    total_cost = 0.0

    for r in results:
        if r.get("skipped"):
            skipped += 1
        elif r.get("error"):
            errors += 1
            print(f"  ✗ {r['name']}: {r['error']}")
        else:
            ok         += 1
            total_added += r["added"]
            total_cost  += r["cost"]
            mark = "✓" if r["added"] > 0 else "⚠ (0 added)"
            print(f"  {mark} {r['name']}: +{r['added']} sections  ${r['cost']:.4f}")

    print(f"\n{'='*55}")
    print(f"Patched:         {ok}")
    print(f"Already complete:{skipped}")
    print(f"Errors:          {errors}")
    print(f"Sections added:  {total_added}")
    print(f"Total cost:      ${total_cost:.2f}")


if __name__ == "__main__":
    asyncio.run(main())

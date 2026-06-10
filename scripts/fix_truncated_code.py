#!/usr/bin/env python3
"""
Fix truncated code blocks in generated lessons.

Root cause: Haiku emits Python method signatures with literal newlines that break
JSON string encoding. json_repair saves the file with the content field cut off
and the remaining parameters turned into junk keys on the section object.

Two strategies:
  LOCAL (~29 sections)  — the junk keys still hold the missing tail; stitch them back.
  MODEL (~184 sections) — json_repair discarded the tail; regenerate via tool-use.

Usage:
  python scripts/fix_truncated_code.py                 # dry-run: count & list broken sections
  python scripts/fix_truncated_code.py --fix            # apply fixes (needs ANTHROPIC_API_KEY)
  python scripts/fix_truncated_code.py --fix --course python-for-ai-ml
"""

import argparse
import ast
import asyncio
import json
import os
import sys
from pathlib import Path

import anthropic

SCRIPT_DIR = Path(__file__).resolve().parent
REPO_ROOT   = SCRIPT_DIR.parent
GEN         = REPO_ROOT / "generated_lessons"

MODEL       = "claude-haiku-4-5-20251001"  # all batch scripts run Haiku for cost
MAX_TOKENS  = 2048   # one code block fits comfortably; caps output cost per call
CONCURRENCY = 5

INPUT_COST  = 0.80 / 1_000_000
OUTPUT_COST = 4.00 / 1_000_000

KNOWN = {"type", "content", "language", "level", "items", "answer", "explanation"}

# Tool-use guarantees valid JSON — no risk of the same encoding bug recurring.
CODE_TOOL = {
    "name": "write_code_block",
    "description": "Write the complete, runnable code block for this lesson section",
    "input_schema": {
        "type": "object",
        "properties": {
            "code": {
                "type": "string",
                "description": "Complete, well-commented, runnable code using cricket-themed variable names",
            },
            "language": {
                "type": "string",
                "description": "Programming language: python, javascript, java, typescript, bash, go, or cpp",
            },
        },
        "required": ["code", "language"],
    },
}


# ─── Detection ────────────────────────────────────────────────────────────────

def _is_truncated(section: dict) -> bool:
    code = str(section.get("content", ""))
    if not code.strip():
        return False
    try:
        ast.parse(code)
        return False
    except SyntaxError:
        pass
    opens  = sum(code.count(c) for c in "([{")
    closes = sum(code.count(c) for c in ")]}")
    return opens != closes


def _junk_keys(section: dict) -> list[tuple[str, str]]:
    return [(k, str(v)) for k, v in section.items() if k not in KNOWN]


# ─── Strategy 1: local reconstruction ────────────────────────────────────────

def _reconstruct_local(section: dict) -> str | None:
    extra = _junk_keys(section)
    if not extra:
        return None
    rebuilt = str(section.get("content", "")) + "".join(f", {k}: {v}" for k, v in extra)
    try:
        ast.parse(rebuilt)
        return rebuilt
    except SyntaxError:
        return None


# ─── Strategy 2: model regeneration ──────────────────────────────────────────

def _preceding_paragraph(sections: list, idx: int) -> str:
    for s in reversed(sections[:idx]):
        if s.get("type") in ("paragraph", "analogy") and s.get("content"):
            return str(s["content"])[:600]
    return ""


async def _regen_code(
    client: anthropic.AsyncAnthropic,
    title: str,
    topic: str,
    paragraph: str,
    language: str,
    broken_prefix: str,
) -> tuple[str, str] | None:
    prompt = (
        f"Regenerate a broken code block from an AI/ML lesson.\n\n"
        f"Topic: {topic}\n"
        f"Lesson: {title}\n"
        f"Language: {language}\n\n"
        f"Preceding explanation:\n{paragraph}\n\n"
        f"The code block starts with (the rest was lost due to a JSON encoding bug):\n"
        f"```{language}\n{broken_prefix[:500]}\n```\n\n"
        f"Write a complete, runnable replacement. Use cricket-themed variable names "
        f"(CricketPlayer, innings_count, match_id, Rohit Sharma, Jasprit Bumrah, etc.). "
        f"The code must directly demonstrate the concept from the preceding explanation."
    )
    try:
        resp = await client.messages.create(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            tools=[CODE_TOOL],
            tool_choice={"type": "tool", "name": "write_code_block"},
            messages=[{"role": "user", "content": prompt}],
        )
        block = next((b for b in resp.content if b.type == "tool_use"), None)
        if block:
            return block.input.get("code", ""), block.input.get("language", language)
        return None
    except Exception as exc:
        print(f"    [regen error] {exc}")
        return None


# ─── Per-lesson worker ────────────────────────────────────────────────────────

async def fix_lesson(
    client: anthropic.AsyncAnthropic,
    sem: asyncio.Semaphore,
    path: Path,
) -> dict:
    async with sem:
        d = json.loads(path.read_text())
        sections = d.get("sections", [])

        broken = [(i, s) for i, s in enumerate(sections)
                  if s.get("type") == "code" and _is_truncated(s)]
        if not broken:
            return {"skipped": True}

        local = regen = failed = 0
        total_cost = 0.0
        changed = False

        for idx, sec in broken:
            rebuilt = _reconstruct_local(sec)
            if rebuilt:
                for k, _ in _junk_keys(sec):
                    del sections[idx][k]
                sections[idx]["content"] = rebuilt
                changed = True
                local += 1
                continue

            lang = str(sec.get("language") or "python")
            para = _preceding_paragraph(sections, idx)
            result = await _regen_code(
                client,
                title=d.get("title", ""),
                topic=d.get("topicName", ""),
                paragraph=para,
                language=lang,
                broken_prefix=str(sec.get("content", "")),
            )
            if result:
                code, lang_out = result
                for k, _ in _junk_keys(sec):
                    del sections[idx][k]
                sections[idx]["content"]  = code
                sections[idx]["language"] = lang_out
                changed = True
                regen += 1
            else:
                failed += 1

        if changed:
            path.write_text(json.dumps(d, indent=2, ensure_ascii=False))

        return {
            "name":   f"{path.parent.name}/{path.name}",
            "local":  local,
            "regen":  regen,
            "failed": failed,
            "cost":   total_cost,
        }


# ─── Main ─────────────────────────────────────────────────────────────────────

async def main() -> None:
    parser = argparse.ArgumentParser(description="Fix truncated code blocks in generated lessons")
    parser.add_argument("--fix",    action="store_true", help="Apply fixes (requires ANTHROPIC_API_KEY)")
    parser.add_argument("--course", help="Only fix this course slug")
    args = parser.parse_args()

    lessons: list[Path] = []
    for course_dir in sorted(GEN.iterdir()):
        if not course_dir.is_dir():
            continue
        if args.course and course_dir.name != args.course:
            continue
        for f in sorted(course_dir.glob("lesson_*.json")):
            lessons.append(f)

    print(f"Scanning {len(lessons)} lessons...\n")

    if not args.fix:
        local_n = regen_n = 0
        for path in lessons:
            d = json.loads(path.read_text())
            sections = d.get("sections", [])
            for i, s in enumerate(sections):
                if s.get("type") == "code" and _is_truncated(s):
                    rebuilt = _reconstruct_local(s)
                    tag = "LOCAL" if rebuilt else "REGEN"
                    print(f"  {tag}  {path.parent.name}/{path.name}  sec{i}")
                    if rebuilt:
                        local_n += 1
                    else:
                        regen_n += 1
        # Haiku 4.5: output $4.00/Mtok dominates. ~MAX_TOKENS output + ~1.5k input per call.
        per_call = (MAX_TOKENS * 4.00 + 1500 * 0.80) / 1_000_000
        print(f"\n{local_n} local reconstructions (free), {regen_n} need model regeneration (Haiku)")
        print(f"Estimated API cost: ~${regen_n * per_call:.2f}  ({regen_n} calls × ~${per_call:.4f} each)")
        print("\nRun with --fix to apply.")
        return

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY is not set.")
        sys.exit(1)

    client = anthropic.AsyncAnthropic(api_key=api_key)
    sem    = asyncio.Semaphore(CONCURRENCY)

    tasks   = [fix_lesson(client, sem, p) for p in lessons]
    results = await asyncio.gather(*tasks)

    total_local = total_regen = total_failed = 0
    for r in results:
        if r.get("skipped"):
            continue
        total_local  += r["local"]
        total_regen  += r["regen"]
        total_failed += r["failed"]
        if r["local"] + r["regen"] + r["failed"] > 0:
            print(f"  {r['name']}: +{r['local']} local, +{r['regen']} regen, {r['failed']} failed")

    print(f"\nDone: {total_local} local, {total_regen} regenerated, {total_failed} failed")


if __name__ == "__main__":
    asyncio.run(main())

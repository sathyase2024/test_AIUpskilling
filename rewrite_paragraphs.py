"""
Rewrite paragraph sections in a course's lessons for professional readability.
Uses the `claude` CLI (Claude Code) — no separate API key required.

Usage:
    BACKEND_URL=https://your-backend.com \
    python rewrite_paragraphs.py --course python-for-ai-ml [--dry-run] [--lesson-limit N]

Rewrite rules applied to every `paragraph` section:
- Each paragraph covers exactly ONE idea
- Logical transitions between paragraphs
- Concise sentences — no walls of text
- Professional, encouraging tone
- ALL technical information is preserved

The script:
1. Fetches all lessons via GET /topics/{slug}
2. For each lesson fetches content via GET /ai/lessons/{id}/content
3. Sends paragraphs to `claude -p` for rewriting
4. PATCHes updated contentJson back via PATCH /ai/lessons/{id}/content

Pass --dry-run to preview without saving.
Pass --lesson-limit N to process only the first N lessons.
"""

import argparse
import copy
import json
import os
import re
import subprocess
import sys
import time

import requests

# ─── Config ──────────────────────────────────────────────────────────────────

BACKEND = os.environ.get("BACKEND_URL", "http://localhost:3001").rstrip("/")
CLAUDE_MODEL = "sonnet"   # resolves to claude-sonnet-4-6 in Claude Code

SYSTEM_PROMPT = """You are an expert technical writer editing AI-generated lesson content.
Your task: rewrite the given paragraphs for professional readability.

Rules:
- Each paragraph must cover exactly ONE idea. Split any paragraph that covers multiple ideas.
- Use logical transitions at the start of each paragraph (e.g. "This means…", "In practice…", "As a result…").
- Keep sentences concise — prefer 1–3 sentences per paragraph.
- Preserve ALL technical details, names, examples, and code references. Never omit information.
- Maintain a professional, clear, encouraging tone suited to a developer learning platform.
- Output only paragraph strings — no bullet lists, no headings.

Output format: a JSON array of strings, one string per paragraph.
You may return MORE strings than you received (by splitting), but never fewer."""

USER_TMPL = """Lesson title: {title}

Original paragraphs (JSON array — rewrite each one):
{paragraphs_json}

Return ONLY a JSON array of rewritten paragraph strings. No extra text."""

# ─── Backend helpers ──────────────────────────────────────────────────────────

def get_json(path: str) -> dict:
    r = requests.get(f"{BACKEND}{path}", timeout=30)
    r.raise_for_status()
    return r.json()

def patch_json(path: str, payload: dict) -> dict:
    r = requests.patch(f"{BACKEND}{path}", json=payload, timeout=30)
    r.raise_for_status()
    return r.json()

# ─── Claude CLI helper ────────────────────────────────────────────────────────

def call_claude(user_prompt: str) -> str:
    """Run `claude -p <prompt>` and return the text response."""
    cmd = [
        "claude", "-p", user_prompt,
        "--model", CLAUDE_MODEL,
        "--output-format", "text",
        "--system-prompt", SYSTEM_PROMPT,
        "--no-session-persistence",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "claude CLI returned non-zero")
    return result.stdout.strip()

# ─── Paragraph rewriting ──────────────────────────────────────────────────────

def extract_paragraphs(sections: list) -> list[tuple[int, str]]:
    return [(i, s["content"]) for i, s in enumerate(sections) if s.get("type") == "paragraph"]

def rewrite_paragraphs(title: str, paragraphs: list[tuple[int, str]]) -> list[str]:
    texts = [t for _, t in paragraphs]
    prompt = USER_TMPL.format(
        title=title,
        paragraphs_json=json.dumps(texts, ensure_ascii=False, indent=2),
    )
    raw = call_claude(prompt)
    # Strip markdown code fences if Claude wraps the JSON
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw.rstrip())
    return json.loads(raw)

def apply_rewrites(sections: list, orig_paragraphs: list[tuple[int, str]], new_texts: list[str]) -> list:
    """
    Splice rewritten paragraph strings back into the sections list.
    Claude may split one paragraph into multiple — handled by expanding the list.
    """
    orig_indices = [i for i, _ in orig_paragraphs]
    n_orig = len(orig_indices)
    n_new = len(new_texts)

    if n_new >= n_orig:
        base, remainder = divmod(n_new, n_orig)
        assignments: list[list[str]] = []
        cursor = 0
        for k in range(n_orig):
            count = base + (1 if k < remainder else 0)
            assignments.append(new_texts[cursor:cursor + count])
            cursor += count
    else:
        # Fewer paragraphs returned — keep originals for any missing
        assignments = [[t] for t in new_texts]
        assignments += [[t] for _, t in orig_paragraphs[n_new:]]

    result: list = []
    para_iter = iter(zip(orig_indices, assignments))
    next_para = next(para_iter, None)

    for idx, section in enumerate(sections):
        if next_para and idx == next_para[0]:
            orig_idx, chunks = next_para
            for chunk in chunks:
                result.append({**section, "content": chunk})
            next_para = next(para_iter, None)
        else:
            result.append(section)

    return result

# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Rewrite lesson paragraphs via Claude Code CLI.")
    parser.add_argument("--course", required=True, help="Course slug, e.g. python-for-ai-ml")
    parser.add_argument("--dry-run", action="store_true", help="Preview rewrites without saving")
    parser.add_argument("--lesson-limit", type=int, default=0, help="Only process first N lessons (0 = all)")
    args = parser.parse_args()

    print(f"Fetching course '{args.course}' from {BACKEND}")
    try:
        topic = get_json(f"/topics/{args.course}")
    except Exception as e:
        sys.exit(f"Failed to fetch course: {e}")

    lessons = sorted(topic.get("lessons", []), key=lambda l: l["orderIndex"])
    if args.lesson_limit:
        lessons = lessons[:args.lesson_limit]

    print(f"Lessons to process: {len(lessons)}\n")

    for lesson in lessons:
        lid = lesson["id"]
        title = lesson["title"]
        print(f"── {title}")

        if not lesson.get("isGenerated"):
            print("   skip: not generated yet\n")
            continue

        try:
            resp = get_json(f"/ai/lessons/{lid}/content")
        except Exception as e:
            print(f"   skip: failed to fetch — {e}\n")
            continue

        content_json = resp if isinstance(resp, dict) else resp.get("contentJson")
        if not content_json:
            print("   skip: no contentJson\n")
            continue

        sections = content_json.get("sections", [])
        paragraphs = extract_paragraphs(sections)
        if not paragraphs:
            print("   skip: no paragraphs\n")
            continue

        print(f"   {len(paragraphs)} paragraphs → rewriting via claude {CLAUDE_MODEL}…")
        try:
            new_texts = rewrite_paragraphs(title, paragraphs)
        except Exception as e:
            print(f"   ERROR: {e}\n")
            continue

        print(f"   → {len(new_texts)} paragraphs after rewrite")

        if args.dry_run:
            for (_, orig), new_t in zip(paragraphs[:2], new_texts[:2]):
                print(f"   ORIG: {orig[:100]}…")
                print(f"   NEW : {new_t[:100]}…")
            print()
            continue

        updated = copy.deepcopy(content_json)
        updated["sections"] = apply_rewrites(sections, paragraphs, new_texts)

        try:
            patch_json(f"/ai/lessons/{lid}/content", {"contentJson": updated, "isGenerated": True})
            print("   saved.\n")
        except Exception as e:
            print(f"   ERROR saving: {e}\n")

        time.sleep(0.3)

    print("Done.")

if __name__ == "__main__":
    main()

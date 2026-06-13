"""
Rewrite paragraph sections in a course's lessons for professional readability.

Usage:
    BACKEND_URL=https://your-backend.com \
    ANTHROPIC_API_KEY=sk-ant-... \
    python rewrite_paragraphs.py --course python-for-ai-ml [--dry-run] [--lesson-limit N]

Rewrite rules (injected into the prompt):
- Each paragraph covers exactly ONE idea
- Logical transitions between paragraphs
- No walls of text — split long paragraphs at natural idea boundaries
- Professional, concise tone
- Preserve ALL information — never omit technical details
- Output same number of paragraph strings (split is allowed, merge is not)

The script:
1. Fetches all lessons for the course via GET /topics/{slug}
2. For each lesson, fetches full content via GET /ai/lessons/{id}/content
3. Collects all `paragraph` sections, rewrites them in one Claude call per lesson
4. PATCHes the updated contentJson back via PATCH /ai/lessons/{id}/content
   (uses the existing saveLessonContent endpoint)

Pass --dry-run to preview rewrites without saving.
"""

import argparse
import json
import os
import sys
import time
import copy
import re
import anthropic
import requests

# ─── Config ──────────────────────────────────────────────────────────────────

BACKEND = os.environ.get("BACKEND_URL", "http://localhost:3001").rstrip("/")
ANTHROPIC_API_KEY = os.environ.get("ANTHROPIC_API_KEY", "")

REWRITE_SYSTEM = """You are an expert technical writer editing AI-generated lesson content.
Your task: rewrite the given paragraphs for professional readability.

Rules:
- Each paragraph must cover exactly ONE idea. If a paragraph covers multiple ideas, split it.
- Use logical transitions at the start of each paragraph (e.g. "This means…", "As a result…", "In practice…").
- Keep sentences concise — aim for 1–2 sentences per paragraph when possible.
- Preserve ALL technical details, names, and examples. Never omit information.
- Maintain a professional, clear, encouraging tone suited to a developer learning platform.
- Do NOT add bullet lists — output only paragraph strings.
- Do NOT add headings.

Output format: a JSON array of strings, one string per paragraph.
You may output MORE paragraphs than you received (by splitting), but never fewer.
"""

REWRITE_USER_TMPL = """Lesson title: {title}

Original paragraphs (JSON array — rewrite each one):
{paragraphs_json}

Return ONLY a JSON array of rewritten paragraph strings. No extra text."""

# ─── Helpers ─────────────────────────────────────────────────────────────────

def get_json(path: str) -> dict:
    r = requests.get(f"{BACKEND}{path}", timeout=30)
    r.raise_for_status()
    return r.json()

def patch_json(path: str, payload: dict) -> dict:
    r = requests.patch(f"{BACKEND}{path}", json=payload, timeout=30)
    r.raise_for_status()
    return r.json()

def extract_paragraphs(sections: list) -> list[tuple[int, str]]:
    """Return [(index, text), ...] for all paragraph sections."""
    return [(i, s["content"]) for i, s in enumerate(sections) if s.get("type") == "paragraph"]

def rewrite_lesson_paragraphs(client: anthropic.Anthropic, title: str, paragraphs: list[tuple[int, str]]) -> list[str]:
    """Call Claude to rewrite the given paragraph texts. Returns rewritten strings."""
    texts = [t for _, t in paragraphs]
    msg = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=4096,
        system=REWRITE_SYSTEM,
        messages=[{
            "role": "user",
            "content": REWRITE_USER_TMPL.format(
                title=title,
                paragraphs_json=json.dumps(texts, ensure_ascii=False, indent=2),
            )
        }]
    )
    raw = msg.content[0].text.strip()
    # Strip markdown code fences if present
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw)
    return json.loads(raw)

def apply_rewrites(sections: list, orig_paragraphs: list[tuple[int, str]], new_texts: list[str]) -> list:
    """
    Replace paragraph sections with rewritten text.
    If Claude split one paragraph into N, expand the sections list accordingly.
    """
    # Build a map: original index → list of new texts (may be 1-to-many)
    # We match by order: orig_paragraphs[0] → first chunk of new_texts, etc.
    # Since Claude may split, we need to distribute. We do a simple proportional assignment
    # by grouping the extras onto the last paragraph if counts differ.

    orig_indices = [i for i, _ in orig_paragraphs]
    n_orig = len(orig_indices)
    n_new = len(new_texts)

    # Build a list of (new_text_chunks) per original paragraph.
    # Distribute extras (splits) by detecting natural groupings — just assign them
    # one-to-one and append extras after the last original paragraph.
    if n_new >= n_orig:
        base = n_new // n_orig
        remainder = n_new % n_orig
        assignments: list[list[str]] = []
        cursor = 0
        for k in range(n_orig):
            count = base + (1 if k < remainder else 0)
            assignments.append(new_texts[cursor:cursor + count])
            cursor += count
    else:
        # Fewer paragraphs returned — pad with originals for safety
        assignments = [[t] for t in new_texts]
        assignments += [[t] for _, t in orig_paragraphs[n_new:]]

    # Now rebuild sections, expanding where needed
    result: list = []
    para_iter = iter(zip(orig_indices, assignments))
    next_para = next(para_iter, None)

    for idx, section in enumerate(sections):
        if next_para and idx == next_para[0]:
            orig_idx, new_chunks = next_para
            for chunk in new_chunks:
                result.append({**section, "content": chunk})
            next_para = next(para_iter, None)
        else:
            result.append(section)

    return result

# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Rewrite lesson paragraphs for professional readability.")
    parser.add_argument("--course", required=True, help="Course slug, e.g. python-for-ai-ml")
    parser.add_argument("--dry-run", action="store_true", help="Preview rewrites without saving")
    parser.add_argument("--lesson-limit", type=int, default=0, help="Only rewrite first N lessons (0 = all)")
    args = parser.parse_args()

    if not ANTHROPIC_API_KEY:
        sys.exit("Set ANTHROPIC_API_KEY environment variable.")

    client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)

    print(f"Fetching course: {args.course} from {BACKEND}")
    try:
        topic = get_json(f"/topics/{args.course}")
    except Exception as e:
        sys.exit(f"Failed to fetch course: {e}")

    lessons = sorted(topic.get("lessons", []), key=lambda l: l["orderIndex"])
    if args.lesson_limit:
        lessons = lessons[:args.lesson_limit]

    print(f"Lessons to process: {len(lessons)}")

    for lesson in lessons:
        lid = lesson["id"]
        title = lesson["title"]
        print(f"\n── {title} ({lid})")

        if not lesson.get("isGenerated"):
            print("  skip: not yet generated")
            continue

        try:
            content_resp = get_json(f"/ai/lessons/{lid}/content")
        except Exception as e:
            print(f"  skip: failed to fetch content — {e}")
            continue

        content_json = content_resp if isinstance(content_resp, dict) else content_resp.get("contentJson")
        if not content_json:
            print("  skip: no contentJson")
            continue

        sections = content_json.get("sections", [])
        paragraphs = extract_paragraphs(sections)

        if not paragraphs:
            print("  skip: no paragraphs")
            continue

        print(f"  {len(paragraphs)} paragraphs → rewriting…")

        try:
            new_texts = rewrite_lesson_paragraphs(client, title, paragraphs)
        except Exception as e:
            print(f"  ERROR rewriting: {e}")
            continue

        print(f"  → {len(new_texts)} paragraphs after rewrite")

        if args.dry_run:
            print("  [dry-run] sample rewrite:")
            for orig, new_t in zip([t for _, t in paragraphs[:2]], new_texts[:2]):
                print(f"    ORIG: {orig[:120]}…")
                print(f"    NEW : {new_t[:120]}…")
            continue

        updated_content = copy.deepcopy(content_json)
        updated_content["sections"] = apply_rewrites(sections, paragraphs, new_texts)

        try:
            patch_json(f"/ai/lessons/{lid}/content", {"contentJson": updated_content, "isGenerated": True})
            print("  saved.")
        except Exception as e:
            print(f"  ERROR saving: {e}")

        time.sleep(0.5)   # gentle rate limiting

    print("\nDone.")

if __name__ == "__main__":
    main()

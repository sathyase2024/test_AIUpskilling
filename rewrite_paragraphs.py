"""
Rewrite paragraph and analogy sections in lessons for professional readability.
Uses the `claude` CLI (Claude Code) — no separate API key required.

Usage:
    BACKEND_URL=https://your-backend.com \
    python rewrite_paragraphs.py [--course SLUG | --all-courses] [--sections paragraphs|analogies|both] [--dry-run] [--lesson-limit N]

Paragraph rewrite rules:
- Each paragraph covers exactly ONE idea (split if needed)
- Logical transitions between paragraphs
- Concise sentences — 2-4 per paragraph, no walls of text
- Professional, encouraging tone; all technical info preserved

Analogy rewrite rules:
- 4-6 crisp sentences in 3 parts: Setup → Parallel → Insight
- One clear mapping per sentence in the Parallel
- Punchy and concrete — no padding
- Preserves the domain emoji and opening format

The script:
1. Fetches lessons via GET /topics/{slug} (or all topics via GET /topics)
2. For each lesson, fetches content via GET /ai/lessons/{id}/content
3. Sends sections to `claude -p` for rewriting
4. PATCHes updated contentJson back via PATCH /ai/lessons/{id}/content

Pass --dry-run to preview without saving.
Pass --lesson-limit N to process only the first N lessons per course.
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

BACKEND = os.environ.get("BACKEND_URL", "").rstrip("/")
CLAUDE_MODEL = "sonnet"

PARAGRAPH_SYSTEM = """You are an expert technical writer editing AI-generated lesson content.
Rewrite the given paragraphs for professional readability.

Rules:
- Each paragraph must cover exactly ONE idea. Split any paragraph that covers multiple ideas.
- Use logical transitions at the start of each paragraph (e.g. "This means…", "In practice…", "As a result…").
- Write 2-4 concise sentences per paragraph.
- Preserve ALL technical details, names, examples, and code references. Never omit information.
- Professional, clear, encouraging tone suited to a developer learning platform.
- Output only paragraph strings — no bullet lists, no headings.

Output format: a JSON array of strings, one string per paragraph.
You may return MORE strings than you received (by splitting), but never fewer."""

PARAGRAPH_USER = """Lesson title: {title}

Original paragraphs (JSON array — rewrite each one):
{json}

Return ONLY a JSON array of rewritten paragraph strings. No extra text."""

ANALOGY_SYSTEM = """You are an expert technical writer editing AI-generated lesson analogies.
Rewrite the given analogy to be punchy, concrete, and immediately clear.

Rules:
- Write exactly 4-6 sentences total in this 3-part structure:
  • Setup (1-2 sentences): Name a specific, concrete scenario with real terminology/names. Immersive.
  • Parallel (2-3 sentences): Map each key aspect using "just as [X in domain], [Y in concept]" — one mapping per sentence.
  • Insight (1 sentence): State the "aha" — what this parallel reveals about WHY the concept works this way.
- Preserve the opening format: keep the domain emoji and "Think of it like [domain]:" opening.
- Be punchy — every sentence earns its place. No padding, no vague comparisons.
- Preserve the technical concept being explained.

Output format: a JSON array with exactly ONE string — the rewritten analogy.
No extra text."""

ANALOGY_USER = """Concept: {concept}
Lesson: {title}

Original analogy:
{json}

Return ONLY a JSON array with one rewritten analogy string. No extra text."""

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

def call_claude(system: str, user_prompt: str) -> str:
    cmd = [
        "claude", "-p", user_prompt,
        "--model", CLAUDE_MODEL,
        "--output-format", "text",
        "--system-prompt", system,
        "--no-session-persistence",
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=180)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or "claude CLI returned non-zero")
    raw = result.stdout.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw.rstrip())
    return raw

# ─── Paragraph rewriting ──────────────────────────────────────────────────────

def extract_sections_by_type(sections: list, type_: str) -> list[tuple[int, str]]:
    return [(i, s["content"]) for i, s in enumerate(sections) if s.get("type") == type_]

def rewrite_paragraphs(title: str, paragraphs: list[tuple[int, str]]) -> list[str]:
    texts = [t for _, t in paragraphs]
    prompt = PARAGRAPH_USER.format(title=title, json=json.dumps(texts, ensure_ascii=False, indent=2))
    return json.loads(call_claude(PARAGRAPH_SYSTEM, prompt))

def rewrite_analogy(title: str, concept: str, text: str) -> str:
    prompt = ANALOGY_USER.format(
        concept=concept, title=title,
        json=json.dumps([text], ensure_ascii=False)
    )
    result = json.loads(call_claude(ANALOGY_SYSTEM, prompt))
    return result[0] if result else text

def apply_rewrites(sections: list, orig: list[tuple[int, str]], new_texts: list[str]) -> list:
    """Splice rewrites back; Claude may split one paragraph into multiple."""
    n_orig, n_new = len(orig), len(new_texts)
    if n_new >= n_orig:
        base, rem = divmod(n_new, n_orig)
        assignments, cursor = [], 0
        for k in range(n_orig):
            count = base + (1 if k < rem else 0)
            assignments.append(new_texts[cursor:cursor + count])
            cursor += count
    else:
        assignments = [[t] for t in new_texts] + [[t] for _, t in orig[n_new:]]

    result, para_iter = [], iter(zip([i for i, _ in orig], assignments))
    next_p = next(para_iter, None)
    for idx, section in enumerate(sections):
        if next_p and idx == next_p[0]:
            for chunk in next_p[1]:
                result.append({**section, "content": chunk})
            next_p = next(para_iter, None)
        else:
            result.append(section)
    return result

def apply_analogy_rewrites(sections: list, orig: list[tuple[int, str]], new_texts: list[str]) -> list:
    """Replace each analogy section content in-place."""
    mapping = {i: t for (i, _), t in zip(orig, new_texts)}
    return [{**s, "content": mapping[idx]} if idx in mapping else s
            for idx, s in enumerate(sections)]

# ─── Per-lesson processor ─────────────────────────────────────────────────────

def _guess_concept(sections: list, analogy_idx: int, lesson_title: str) -> str:
    """Walk back from the analogy to find the nearest L3 heading."""
    for i in range(analogy_idx - 1, -1, -1):
        s = sections[i]
        if s.get("type") == "heading" and s.get("level") == 3:
            return s.get("content", lesson_title)
    return lesson_title

def process_lesson(lesson: dict, sections_mode: str, dry_run: bool) -> bool:
    lid, title = lesson["id"], lesson["title"]
    print(f"  ── {title}")

    if not lesson.get("isGenerated"):
        print("     skip: not generated")
        return False

    try:
        resp = get_json(f"/ai/lessons/{lid}/content")
    except Exception as e:
        print(f"     skip: fetch failed — {e}")
        return False

    content_json = resp if isinstance(resp, dict) else resp.get("contentJson")
    if not content_json:
        print("     skip: no contentJson")
        return False

    sections = content_json.get("sections", [])
    updated = copy.deepcopy(content_json)
    changed = False

    # ── Paragraphs ──────────────────────────────────────────────────────────
    if sections_mode in ("paragraphs", "both"):
        paras = extract_sections_by_type(sections, "paragraph")
        if paras:
            print(f"     {len(paras)} paragraphs → rewriting…")
            try:
                new_p = rewrite_paragraphs(title, paras)
                print(f"     → {len(new_p)} paragraphs")
                if dry_run:
                    for (_, orig), new in zip(paras[:2], new_p[:2]):
                        print(f"     ORIG: {orig[:90]}…")
                        print(f"     NEW : {new[:90]}…")
                else:
                    updated["sections"] = apply_rewrites(updated["sections"], paras, new_p)
                    changed = True
            except Exception as e:
                print(f"     paragraph ERROR: {e}")

    # ── Analogies ───────────────────────────────────────────────────────────
    if sections_mode in ("analogies", "both"):
        analogies = extract_sections_by_type(sections, "analogy")
        if analogies:
            print(f"     {len(analogies)} analogies → rewriting…")
            new_a_texts = []
            for idx, text in analogies:
                concept = _guess_concept(sections, idx, title)
                try:
                    new_a_texts.append(rewrite_analogy(title, concept, text))
                except Exception as e:
                    print(f"     analogy {idx} ERROR: {e}")
                    new_a_texts.append(text)  # keep original on error

            if dry_run:
                for (_, orig), new in zip(analogies[:1], new_a_texts[:1]):
                    print(f"     ORIG: {orig[:90]}…")
                    print(f"     NEW : {new[:90]}…")
            else:
                updated["sections"] = apply_analogy_rewrites(updated["sections"], analogies, new_a_texts)
                changed = True

    if dry_run or not changed:
        return False

    try:
        patch_json(f"/ai/lessons/{lid}/content", {"contentJson": updated, "isGenerated": True})
        print("     saved.")
        return True
    except Exception as e:
        print(f"     save ERROR: {e}")
        return False

# ─── Main ────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(description="Rewrite lesson content via Claude Code CLI.")
    group = parser.add_mutually_exclusive_group(required=True)
    group.add_argument("--course", help="Single course slug, e.g. python-for-ai-ml")
    group.add_argument("--all-courses", action="store_true", help="Process every course")
    parser.add_argument("--sections", choices=["paragraphs", "analogies", "both"], default="both",
                        help="Which section types to rewrite (default: both)")
    parser.add_argument("--dry-run", action="store_true", help="Preview without saving")
    parser.add_argument("--lesson-limit", type=int, default=0, help="Max lessons per course (0=all)")
    args = parser.parse_args()

    if not BACKEND:
        sys.exit("Set BACKEND_URL environment variable, e.g. BACKEND_URL=https://your-backend.com")

    print(f"Backend: {BACKEND}")
    print(f"Mode: {'dry-run' if args.dry_run else 'LIVE'} | sections: {args.sections}\n")

    if args.all_courses:
        print("Fetching all courses…")
        try:
            topics_resp = get_json("/topics")
            # /topics may return a list directly or {data: [...]}
            topics = topics_resp if isinstance(topics_resp, list) else topics_resp.get("data", [])
        except Exception as e:
            sys.exit(f"Failed to fetch /topics: {e}")
        slugs = [t["slug"] for t in topics]
        print(f"Found {len(slugs)} courses: {', '.join(slugs)}\n")
    else:
        slugs = [args.course]

    total_saved = 0
    for slug in slugs:
        print(f"{'='*60}")
        print(f"Course: {slug}")
        try:
            topic = get_json(f"/topics/{slug}")
        except Exception as e:
            print(f"  skip: failed to fetch — {e}\n")
            continue

        lessons = sorted(topic.get("lessons", []), key=lambda l: l["orderIndex"])
        if args.lesson_limit:
            lessons = lessons[:args.lesson_limit]
        print(f"  {len(lessons)} lessons to process\n")

        for lesson in lessons:
            saved = process_lesson(lesson, args.sections, args.dry_run)
            if saved:
                total_saved += 1
            time.sleep(0.3)
        print()

    print(f"Done. {total_saved} lessons updated.")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""
Rewrite paragraph sections in generated_lessons/*.json for professional readability.

Uses the local `claude` CLI (subscription auth) — NOT the developer API key — so it
incurs no ANTHROPIC_API_KEY billing. Run this from the repo root in an environment
where `claude` is installed and logged in (e.g. Claude Code).

Only `paragraph` sections are touched. Headings, analogies, code, quizzes, key_points
and every other section type are preserved byte-for-byte. The rewrite uses a strict
positional contract: Claude returns N groups aligned 1:1 to the N input paragraphs,
each group holding one or more single-idea rewrites that expand in place — so a split
paragraph can never land under the wrong heading.

Usage:
    python3 scripts/rewrite-generated-lessons.py --course python-for-ai-ml
    python3 scripts/rewrite-generated-lessons.py --all-courses
    python3 scripts/rewrite-generated-lessons.py --course python-for-ai-ml --dry-run
    python3 scripts/rewrite-generated-lessons.py --course python-for-ai-ml --limit 2
"""

import argparse
import glob
import json
import os
import re
import subprocess
import sys

SYSTEM = """You are an expert technical writer editing AI-generated lesson content.
Rewrite the paragraph content into well-structured paragraphs for professional readability.
Ensure each paragraph covers a single idea, use logical transitions, preserve all information,
and maintain a professional tone.

Rules:
- Each rewritten paragraph must cover exactly ONE idea. Split any original paragraph that
  covers multiple ideas into multiple focused paragraphs.
- Use logical transitions (e.g. "This means...", "In practice...", "As a result...").
- Preserve ALL technical details, names, examples, and code references. Never omit information.
- Professional, clear tone suited to a developer learning platform.
- Output only paragraph prose — no bullet lists, no headings, no code fences inside strings.

INPUT/OUTPUT CONTRACT (critical):
You receive a JSON array of N original paragraphs.
Return a JSON array of EXACTLY N elements, positionally aligned to the input.
Element i corresponds to input paragraph i and is ITSELF an array of one or more rewritten
paragraph strings:
- If input paragraph i covers a single idea, return a 1-element array (tightened prose).
- If it covers multiple ideas, return multiple strings — each a single-idea paragraph.
Never merge content across different input paragraphs. Never drop a paragraph (no empty arrays).
Output JSON only — no prose, no markdown fences around the JSON."""


def call_claude(model: str, title: str, texts: list) -> str:
    prompt = (
        f"{SYSTEM}\n\n"
        f"Lesson title: {title}\n\n"
        f"Original paragraphs ({len(texts)} items, JSON array):\n"
        f"{json.dumps(texts, ensure_ascii=False, indent=2)}\n\n"
        f"Return ONLY a JSON array of EXACTLY {len(texts)} elements, each an array of one or "
        "more rewritten paragraph strings, positionally aligned to the input."
    )
    proc = subprocess.run(
        ["claude", "-p", "--model", model, "--output-format", "text",
         "--no-session-persistence"],
        input=prompt, capture_output=True, text=True, timeout=300,
    )
    if proc.returncode != 0:
        raise RuntimeError(f"claude CLI failed: {proc.stderr.strip()[:300]}")
    return proc.stdout


def parse_json_array(raw: str):
    raw = raw.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw.rstrip())
    # Be tolerant: grab the outermost [...] if there is surrounding prose
    start, end = raw.find("["), raw.rfind("]")
    if start != -1 and end != -1 and end > start:
        raw = raw[start:end + 1]
    return json.loads(raw)


def coerce_groups(result, texts: list) -> list:
    n = len(texts)
    if not isinstance(result, list) or len(result) != n:
        raise ValueError(
            f"expected {n} elements, got "
            f"{type(result).__name__} len={len(result) if isinstance(result, list) else 'NA'}"
        )
    groups = []
    for i, elem in enumerate(result):
        if isinstance(elem, str):
            groups.append([elem])
        elif isinstance(elem, list) and elem and all(isinstance(s, str) for s in elem):
            groups.append([s for s in elem])
        else:
            groups.append([texts[i]])  # malformed element → keep original
    return groups


def apply_groups(sections: list, para_indices: list, groups: list) -> list:
    mapping = {idx: grp for idx, grp in zip(para_indices, groups)}
    out = []
    for idx, section in enumerate(sections):
        grp = mapping.get(idx)
        if grp is not None:
            for chunk in grp:
                out.append({**section, "content": chunk})
        else:
            out.append(section)
    return out


def process_file(path: str, model: str, dry_run: bool) -> str:
    data = json.load(open(path, encoding="utf-8"))
    sections = data.get("sections", [])
    para_indices = [i for i, s in enumerate(sections) if s.get("type") == "paragraph"]
    if not para_indices:
        return "no paragraphs"

    texts = [sections[i]["content"] for i in para_indices]
    raw = call_claude(model, data.get("title", ""), texts)
    groups = coerce_groups(parse_json_array(raw), texts)
    new_sections = apply_groups(sections, para_indices, groups)

    added = len(new_sections) - len(sections)
    if dry_run:
        return f"OK (dry-run) {len(texts)} paras -> {sum(len(g) for g in groups)} (+{added})"

    data["sections"] = new_sections
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    return f"saved {len(texts)} paras -> {sum(len(g) for g in groups)} (+{added})"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default="generated_lessons")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--course", help="course slug (directory name under --dir)")
    g.add_argument("--all-courses", action="store_true")
    ap.add_argument("--model", default="sonnet")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0, help="max lessons (0 = no limit)")
    args = ap.parse_args()

    courses = ([args.course] if args.course
               else sorted(d for d in os.listdir(args.dir)
                           if os.path.isdir(os.path.join(args.dir, d))))

    total_ok = total_fail = 0
    for course in courses:
        files = sorted(glob.glob(os.path.join(args.dir, course, "lesson_*.json")))
        if args.limit:
            files = files[:args.limit]
        print(f"\n=== {course} — {len(files)} lessons ===", flush=True)
        for path in files:
            name = os.path.basename(path)
            try:
                result = process_file(path, args.model, args.dry_run)
                print(f"  {name:55} {result}", flush=True)
                total_ok += 1
            except Exception as e:
                print(f"  {name:55} ERROR: {e}", flush=True)
                total_fail += 1

    print(f"\n--- done: {total_ok} ok, {total_fail} failed ---")
    sys.exit(1 if total_fail else 0)


if __name__ == "__main__":
    main()

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
import random
import subprocess
import sys
import tempfile
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

_print_lock = threading.Lock()
_manifest_lock = threading.Lock()


def log(msg: str):
    with _print_lock:
        print(msg, flush=True)

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


# These env vars route a nested `claude -p` back into the PARENT Claude Code
# session (it would answer with the parent's conversation context and return
# empty/garbage under concurrency). Stripping them gives each call a clean,
# independent subscription-authenticated session.
_HIJACK_VARS = (
    "CLAUDE_SESSION_INGRESS_TOKEN_FILE",
    "CLAUDE_CODE_SESSION_ID",
    "CLAUDE_CODE_REMOTE_SESSION_ID",
)


def _clean_env() -> dict:
    env = os.environ.copy()
    for v in _HIJACK_VARS:
        env.pop(v, None)
    return env


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
        input=prompt, capture_output=True, text=True, timeout=600, env=_clean_env(),
    )
    if proc.returncode != 0:
        raise RuntimeError(f"claude CLI failed: {proc.stderr.strip()[:300]}")
    out = proc.stdout.strip()
    if not out:
        raise RuntimeError("claude CLI returned empty output")
    return out


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


def atomic_write_json(path: str, data) -> None:
    """Write JSON to a temp file in the same dir, then atomically rename.
    A kill mid-write leaves the original file untouched (never a partial file)."""
    d = os.path.dirname(path) or "."
    fd, tmp = tempfile.mkstemp(dir=d, suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(tmp, path)
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def process_file(path: str, model: str, dry_run: bool, retries: int = 6) -> str:
    data = json.load(open(path, encoding="utf-8"))
    sections = data.get("sections", [])
    para_indices = [i for i, s in enumerate(sections) if s.get("type") == "paragraph"]
    if not para_indices:
        return "no paragraphs"

    texts = [sections[i]["content"] for i in para_indices]

    # Stagger the very first attempt so a pool of workers doesn't fire simultaneously.
    time.sleep(random.uniform(0, 8))

    for attempt in range(1, retries + 1):
        try:
            raw = call_claude(model, data.get("title", ""), texts)
            groups = coerce_groups(parse_json_array(raw), texts)
            break
        except Exception as e:
            if attempt < retries:
                # Long, jittered backoff — empty output means the subscription is
                # rate-limiting concurrent sessions; give the window time to clear.
                time.sleep(min(30 * attempt, 120) + random.uniform(0, 20))
            else:
                raise RuntimeError(f"{type(e).__name__}: {e} (after {retries} attempts)")

    new_sections = apply_groups(sections, para_indices, groups)
    added = len(new_sections) - len(sections)
    if dry_run:
        return f"OK (dry-run) {len(texts)} paras -> {sum(len(g) for g in groups)} (+{added})"

    data["sections"] = new_sections
    atomic_write_json(path, data)
    return f"saved {len(texts)} paras -> {sum(len(g) for g in groups)} (+{added})"


def load_manifest(mpath: str) -> set:
    if not os.path.exists(mpath):
        return set()
    with open(mpath, encoding="utf-8") as f:
        return {ln.strip() for ln in f if ln.strip()}


def mark_done(mpath: str, rel: str) -> None:
    with _manifest_lock:
        with open(mpath, "a", encoding="utf-8") as f:
            f.write(rel + "\n")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default="generated_lessons")
    g = ap.add_mutually_exclusive_group(required=True)
    g.add_argument("--course", help="course slug (directory name under --dir)")
    g.add_argument("--all-courses", action="store_true")
    ap.add_argument("--model", default="sonnet")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=0, help="max lessons per course (0 = no limit)")
    ap.add_argument("--workers", type=int, default=1, help="concurrent claude CLI calls")
    ap.add_argument("--manifest", default=None,
                    help="resume file of completed lesson paths (default <dir>/.rewrite-done)")
    args = ap.parse_args()

    mpath = args.manifest or os.path.join(args.dir, ".rewrite-done")
    done = load_manifest(mpath)

    courses = ([args.course] if args.course
               else sorted(d for d in os.listdir(args.dir)
                           if os.path.isdir(os.path.join(args.dir, d))))

    # Build the full work list, skipping already-completed lessons
    work = []  # (course, path, rel)
    for course in courses:
        files = sorted(glob.glob(os.path.join(args.dir, course, "lesson_*.json")))
        if args.limit:
            files = files[:args.limit]
        for path in files:
            rel = os.path.relpath(path, args.dir)
            if rel in done:
                continue
            work.append((course, path, rel))

    log(f"=== {len(work)} lessons to process ({len(done)} already done) "
        f"across {len(courses)} course(s), workers={args.workers} ===")

    total_ok = total_fail = 0

    def run_one(item):
        course, path, rel = item
        name = os.path.basename(path)
        try:
            result = process_file(path, args.model, args.dry_run)
            if not args.dry_run and result.startswith("saved"):
                mark_done(mpath, rel)
            return (True, f"  {course}/{name:55} {result}")
        except Exception as e:
            return (False, f"  {course}/{name:55} ERROR: {e}")

    if args.workers <= 1:
        results = (run_one(it) for it in work)
        for ok, line in results:
            log(line)
            total_ok += ok
            total_fail += (not ok)
    else:
        with ThreadPoolExecutor(max_workers=args.workers) as ex:
            futs = {ex.submit(run_one, it): it for it in work}
            for fut in as_completed(futs):
                ok, line = fut.result()
                log(line)
                total_ok += ok
                total_fail += (not ok)

    log(f"--- done: {total_ok} ok, {total_fail} failed ---")
    sys.exit(1 if total_fail else 0)


if __name__ == "__main__":
    main()

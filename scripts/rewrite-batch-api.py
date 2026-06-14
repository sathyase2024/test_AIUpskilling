#!/usr/bin/env python3
"""
Rewrite lesson paragraphs using Anthropic Messages Batch API (50% off regular pricing).
Submits all remaining lessons in one batch, polls until complete, applies results, commits.

Cost ceiling: $15. Estimated actual cost: ~$6 for 227 lessons.

Usage:
    ANTHROPIC_API_KEY=sk-ant-... python3 scripts/rewrite-batch-api.py
    ANTHROPIC_API_KEY=sk-ant-... python3 scripts/rewrite-batch-api.py --estimate-only
    ANTHROPIC_API_KEY=sk-ant-... python3 scripts/rewrite-batch-api.py --resume <batch-id>
"""

import argparse
import json
import os
import re
import subprocess
import sys
import tempfile
import time
from pathlib import Path

import anthropic

REPO = Path(__file__).resolve().parent.parent
LESSONS_DIR = REPO / "generated_lessons"
MANIFEST = LESSONS_DIR / ".rewrite-done"
BATCH_ID_FILE = Path("/tmp/rewrite_batch_id.txt")
BATCH_MAP_FILE = Path("/tmp/rewrite_batch_map.json")

MODEL = "claude-sonnet-4-6"
MAX_TOKENS = 8192
COST_CEILING = 15.0

# Batch API pricing: 50% off regular Sonnet 4.6
INPUT_PRICE_PER_MTOK = 1.50   # $1.50/MTok (regular $3.00)
OUTPUT_PRICE_PER_MTOK = 7.50  # $7.50/MTok (regular $15.00)

BRANCH = "claude/nice-ritchie-VInwe"
GH_USER = "sathyase2024"
GH_REPO = "sathyase2024/test_AIUpskilling"

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


def load_manifest():
    if not MANIFEST.exists():
        return set()
    return {ln.strip() for ln in MANIFEST.read_text().splitlines() if ln.strip()}


def mark_done(rel: str):
    with open(MANIFEST, "a") as f:
        f.write(rel + "\n")


def get_remaining_lessons():
    done = load_manifest()
    lessons = []
    for path in sorted(LESSONS_DIR.glob("*/lesson_*.json")):
        rel = path.relative_to(LESSONS_DIR).as_posix()
        if rel not in done:
            lessons.append(path)
    return lessons


def load_batch_map() -> dict:
    if BATCH_MAP_FILE.exists():
        return json.loads(BATCH_MAP_FILE.read_text())
    return {}


def build_user_prompt(path: Path):
    data = json.loads(path.read_text(encoding="utf-8"))
    sections = data.get("sections", [])
    para_indices = [i for i, s in enumerate(sections) if s.get("type") == "paragraph"]
    if not para_indices:
        return None, None, None
    texts = [sections[i]["content"] for i in para_indices]
    prompt = (
        f"Lesson title: {data.get('title', '')}\n\n"
        f"Original paragraphs ({len(texts)} items, JSON array):\n"
        f"{json.dumps(texts, ensure_ascii=False, indent=2)}\n\n"
        f"Return ONLY a JSON array of EXACTLY {len(texts)} elements, each an array of one or "
        "more rewritten paragraph strings, positionally aligned to the input."
    )
    return prompt, para_indices, texts


def parse_json_array(raw: str):
    raw = raw.strip()
    raw = re.sub(r"^```(?:json)?\s*", "", raw)
    raw = re.sub(r"\s*```$", "", raw.rstrip())
    start, end = raw.find("["), raw.rfind("]")
    if start != -1 and end != -1 and end > start:
        raw = raw[start:end + 1]
    return json.loads(raw)


def coerce_groups(result, texts):
    n = len(texts)
    if not isinstance(result, list) or len(result) != n:
        raise ValueError(
            f"expected {n} elements, got "
            f"{len(result) if isinstance(result, list) else type(result).__name__}"
        )
    groups = []
    for i, elem in enumerate(result):
        if isinstance(elem, str):
            groups.append([elem])
        elif isinstance(elem, list) and elem and all(isinstance(s, str) for s in elem):
            groups.append(list(elem))
        else:
            groups.append([texts[i]])
    return groups


def apply_groups(sections, para_indices, groups):
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


def atomic_write_json(path: Path, data):
    fd, tmp = tempfile.mkstemp(dir=str(path.parent), suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        os.replace(tmp, str(path))
    finally:
        if os.path.exists(tmp):
            os.remove(tmp)


def git(cmd: str):
    return subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=str(REPO))


def commit_and_push(count: int):
    pat = os.environ.get("GH_PAT", "")
    if pat:
        remote = f"https://{GH_USER}:{pat}@github.com/{GH_REPO}.git"
        git(f"git remote set-url origin {remote}")
    git("git add generated_lessons/")
    msg = f"Rewrite batch API: {count} lessons\n\nhttps://claude.ai/code/session_017bSmjPFtThsvxnJxNUs3d9"
    r = git(f'git commit -m "{msg}"')
    if r.returncode != 0:
        print(f"Commit failed: {r.stderr[:200]}")
        return False
    for attempt in range(4):
        r = git(f"git push -u origin {BRANCH}")
        if r.returncode == 0:
            print(f"Pushed {count} lessons to {BRANCH}")
            return True
        wait = 2 ** (attempt + 1)
        print(f"Push failed (attempt {attempt+1}/4), retrying in {wait}s: {r.stderr[:80]}")
        time.sleep(wait)
    print(f"Push failed after 4 attempts: {r.stderr[:200]}")
    return False


def poll_batch(client: anthropic.Anthropic, batch_id: str):
    print(f"Polling batch {batch_id} (every 60s)...")
    while True:
        batch = client.beta.messages.batches.retrieve(batch_id)
        status = batch.processing_status
        c = batch.request_counts
        print(f"  [{time.strftime('%H:%M:%S')}] {status} | "
              f"processing={c.processing} succeeded={c.succeeded} "
              f"errored={c.errored} canceled={c.canceled}")
        if status == "ended":
            return batch
        time.sleep(60)


def apply_batch_results(client: anthropic.Anthropic, batch_id: str, dry_run: bool):
    cid_map = load_batch_map()
    ok = fail = skipped = 0
    for result in client.beta.messages.batches.results(batch_id):
        cid = result.custom_id
        rel = cid_map.get(cid, cid.replace("__", "/", 1))
        path = LESSONS_DIR / rel

        if not path.exists():
            print(f"  MISSING  {rel}")
            skipped += 1
            continue

        data = json.loads(path.read_text(encoding="utf-8"))
        sections = data.get("sections", [])
        para_indices = [i for i, s in enumerate(sections) if s.get("type") == "paragraph"]
        texts = [sections[i]["content"] for i in para_indices]

        rtype = result.result.type
        if rtype == "succeeded":
            raw = result.result.message.content[0].text
            try:
                parsed = parse_json_array(raw)
                groups = coerce_groups(parsed, texts)
                new_sections = apply_groups(sections, para_indices, groups)
                data["sections"] = new_sections
                if not dry_run:
                    atomic_write_json(path, data)
                    mark_done(rel)
                added = sum(len(g) for g in groups) - len(texts)
                ok += 1
                print(f"  OK   {rel} ({len(texts)} paras -> {sum(len(g) for g in groups)}, +{added})")
            except Exception as e:
                fail += 1
                print(f"  ERR  {rel}: {e}")
        elif rtype == "errored":
            fail += 1
            err = getattr(result.result, "error", "unknown error")
            print(f"  ERR  {rel}: {err}")
        else:
            skipped += 1
            print(f"  SKP  {rel}: {rtype}")

    print(f"\n=== Batch results: {ok} OK, {fail} failed, {skipped} skipped ===")
    return ok, fail


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--estimate-only", action="store_true",
                    help="Show cost estimate and exit without submitting")
    ap.add_argument("--dry-run", action="store_true",
                    help="Submit batch and apply results but don't write files or commit")
    ap.add_argument("--resume", metavar="BATCH_ID",
                    help="Skip submission, resume polling an in-progress batch")
    args = ap.parse_args()

    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    if not api_key:
        print("ERROR: ANTHROPIC_API_KEY not set", file=sys.stderr)
        print("  export ANTHROPIC_API_KEY=sk-ant-...", file=sys.stderr)
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    # Resume mode: skip straight to polling
    if args.resume:
        batch_id = args.resume
        BATCH_ID_FILE.write_text(batch_id)
        if not BATCH_MAP_FILE.exists():
            print(f"WARNING: {BATCH_MAP_FILE} missing — custom_id→path mapping unavailable")
        print(f"Resuming batch {batch_id}")
        poll_batch(client, batch_id)
        ok, _ = apply_batch_results(client, batch_id, args.dry_run)
        if ok > 0 and not args.dry_run:
            commit_and_push(ok)
        BATCH_ID_FILE.unlink(missing_ok=True)
        return

    # Warn if a batch is already in flight
    if BATCH_ID_FILE.exists():
        stored = BATCH_ID_FILE.read_text().strip()
        print(f"WARNING: Found existing batch ID {stored} in {BATCH_ID_FILE}")
        print(f"  Use --resume {stored} to continue it, or delete {BATCH_ID_FILE} to start fresh")
        sys.exit(0)

    # Collect remaining lessons
    lessons = get_remaining_lessons()
    print(f"Lessons remaining: {len(lessons)}")

    requests = []
    cid_map = {}  # cid -> rel path
    for idx, path in enumerate(lessons):
        prompt, para_indices, texts = build_user_prompt(path)
        if prompt is None:
            rel = path.relative_to(LESSONS_DIR).as_posix()
            print(f"  No paragraphs — marking done: {rel}")
            mark_done(rel)
            continue

        rel = path.relative_to(LESSONS_DIR).as_posix()
        cid = f"lesson-{idx:04d}"  # ≤12 chars, well within 64 limit
        cid_map[cid] = rel
        requests.append({
            "custom_id": cid,
            "params": {
                "model": MODEL,
                "max_tokens": MAX_TOKENS,
                "system": SYSTEM,
                "messages": [{"role": "user", "content": prompt}],
            },
        })

    if not requests:
        print("Nothing to do — all lessons already complete.")
        return

    # Cost estimate
    est_in_tok = len(requests) * 2500
    est_out_tok = len(requests) * 3000
    est_cost = (est_in_tok / 1_000_000 * INPUT_PRICE_PER_MTOK
                + est_out_tok / 1_000_000 * OUTPUT_PRICE_PER_MTOK)

    print(f"\nCost estimate (Batch API — 50% off Sonnet 4.6):")
    print(f"  Requests : {len(requests)}")
    print(f"  Input    : ~{est_in_tok/1000:.0f}K tokens × ${INPUT_PRICE_PER_MTOK}/MTok = ${est_in_tok/1_000_000*INPUT_PRICE_PER_MTOK:.2f}")
    print(f"  Output   : ~{est_out_tok/1000:.0f}K tokens × ${OUTPUT_PRICE_PER_MTOK}/MTok = ${est_out_tok/1_000_000*OUTPUT_PRICE_PER_MTOK:.2f}")
    print(f"  TOTAL    : ~${est_cost:.2f}  (ceiling: ${COST_CEILING})")

    if est_cost > COST_CEILING:
        print(f"\nERROR: Estimated ${est_cost:.2f} exceeds ${COST_CEILING} ceiling. Aborting.")
        sys.exit(1)

    if args.estimate_only:
        print("\n--estimate-only: exiting without submitting.")
        return

    if args.dry_run:
        print("\n--dry-run: skipping submission.")
        return

    # Save mapping so we can recover after container restart
    BATCH_MAP_FILE.write_text(json.dumps(cid_map))

    # Submit batch
    print(f"\nSubmitting {len(requests)} requests to Anthropic Messages Batch API...")
    batch = client.beta.messages.batches.create(requests=requests)
    batch_id = batch.id
    BATCH_ID_FILE.write_text(batch_id)
    c = batch.request_counts
    print(f"Batch submitted: {batch_id}")
    print(f"  status={batch.processing_status} processing={c.processing}")
    print(f"  Batch ID saved to {BATCH_ID_FILE}")
    print(f"  Resume after restart: python3 scripts/rewrite-batch-api.py --resume {batch_id}")

    # Poll until ended
    poll_batch(client, batch_id)

    # Apply results to lesson files
    print("\nApplying results to lesson files...")
    ok, _ = apply_batch_results(client, batch_id, args.dry_run)

    # Commit + push
    if ok > 0:
        commit_and_push(ok)

    BATCH_ID_FILE.unlink(missing_ok=True)
    print("Done.")


if __name__ == "__main__":
    main()

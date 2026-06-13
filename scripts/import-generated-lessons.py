#!/usr/bin/env python3
"""
Import generated_lessons/*.json content into the live DB via the backend's
internal endpoint. Run this ON THE VPS, inside a container on the internal
Docker network (the ai-worker container works well — it has Python and can
reach http://backend:3001).

It matches each file to a DB lesson by topic slug + orderIndex (cross-checked
against the lesson title) and PATCHes contentJson. It uses the INTERNAL_SECRET
shared secret (read from the environment) — no JWT, no throttle.

Stdlib only (urllib/json) so no pip install is needed inside the container.

Typical run on the VPS:
    docker cp scripts/import-generated-lessons.py skillforge-ai-worker-1:/tmp/imp.py
    docker cp generated_lessons skillforge-ai-worker-1:/tmp/generated_lessons
    docker exec skillforge-ai-worker-1 \
        python3 /tmp/imp.py --dir /tmp/generated_lessons --course python-for-ai-ml

Omit --course to import every course directory found under --dir.
"""

import argparse
import json
import glob
import os
import re
import sys
import urllib.request


def http_json(method: str, url: str, key: str, body=None):
    data = json.dumps(body).encode() if body is not None else None
    headers = {"Content-Type": "application/json"}
    if key:
        headers["x-internal-key"] = key
    req = urllib.request.Request(url, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=60) as r:
        raw = r.read().decode()
        return json.loads(raw) if raw else None


def norm(s: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", (s or "").lower())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--backend", default="http://backend:3001")
    ap.add_argument("--dir", default="generated_lessons")
    ap.add_argument("--course", help="single course slug; omit for all")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    backend = args.backend.rstrip("/")
    key = os.getenv("INTERNAL_SECRET", "")
    if not key:
        print("ERROR: INTERNAL_SECRET not set in environment", file=sys.stderr)
        sys.exit(2)

    courses = ([args.course] if args.course
               else sorted(d for d in os.listdir(args.dir)
                           if os.path.isdir(os.path.join(args.dir, d))))

    total_ok = total_skip = total_fail = 0
    for slug in courses:
        try:
            topic = http_json("GET", f"{backend}/topics/{slug}", key)
        except Exception as e:
            print(f"[{slug}] cannot fetch topic: {e}")
            continue
        lessons = topic.get("lessons", [])
        by_order = {l.get("orderIndex"): l for l in lessons}
        by_title = {norm(l.get("title")): l for l in lessons}
        print(f"\n=== {slug} — {len(lessons)} DB lessons ===")

        for path in sorted(glob.glob(os.path.join(args.dir, slug, "lesson_*.json"))):
            fname = os.path.basename(path)
            content = json.load(open(path, encoding="utf-8"))
            m = re.match(r"lesson_(\d+)_", fname)
            order = int(m.group(1)) if m else None

            lesson = by_order.get(order) or by_title.get(norm(content.get("title")))
            if not lesson:
                print(f"  {fname:55} SKIP (no matching DB lesson)")
                total_skip += 1
                continue

            # Cross-check title; warn but still import on orderIndex match
            if norm(lesson.get("title")) != norm(content.get("title")):
                print(f"  {fname:55} WARN title mismatch: "
                      f"db='{lesson.get('title')}' file='{content.get('title')}'")

            if args.dry_run:
                print(f"  {fname:55} OK (dry-run) -> {lesson['id']}")
                total_ok += 1
                continue

            try:
                http_json("PATCH", f"{backend}/ai/internal/lessons/{lesson['id']}/content",
                          key, {"contentJson": content, "isGenerated": True})
                print(f"  {fname:55} imported -> {lesson['id']}")
                total_ok += 1
            except Exception as e:
                print(f"  {fname:55} FAIL: {e}")
                total_fail += 1

    print(f"\n--- done: {total_ok} ok, {total_skip} skipped, {total_fail} failed ---")
    sys.exit(1 if total_fail else 0)


if __name__ == "__main__":
    main()

"""
Content rewrite router — rewrites paragraph and analogy sections in all
generated lessons for professional readability.

Triggered via:
    curl -X POST http://localhost:8000/rewrite/content \
         -H 'Content-Type: application/json' \
         -d '{"sections": "both"}'

Runs as a FastAPI BackgroundTask so the HTTP request returns immediately
(job ID + status) while the rewrite proceeds in the background.
Progress is logged to the ai-worker stdout (docker logs skillforge-ai-worker-1 -f).

Query params / body fields:
  backend_url  — default http://backend:3001 (Docker-internal service name)
  course       — optional slug to limit to one course; omit for all courses
  sections     — "paragraphs" | "analogies" | "both" (default "both")
"""

import asyncio
import copy
import json
import logging
import os
import re
import uuid
from typing import Optional

import httpx
from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel

from config import get_client

INTERNAL_SECRET = os.getenv("INTERNAL_SECRET", "")

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/rewrite", tags=["rewrite"])

# ─── Prompts ─────────────────────────────────────────────────────────────────

PARAGRAPH_SYSTEM = """You are an expert technical writer editing AI-generated lesson content.
Rewrite the paragraph content into well-structured paragraphs for professional readability.
Ensure each paragraph covers a single idea, use logical transitions, preserve all information,
and maintain a professional tone.

Rules:
- Each rewritten paragraph must cover exactly ONE idea. Split any original paragraph that covers
  multiple ideas into multiple focused paragraphs.
- Use logical transitions (e.g. "This means…", "In practice…", "As a result…") so paragraphs flow.
- Preserve ALL technical details, names, examples, and code references. Never omit information.
- Professional, clear tone suited to a developer learning platform.
- Output only paragraph prose — no bullet lists, no headings, no code fences.

INPUT/OUTPUT CONTRACT (critical):
You receive a JSON array of N original paragraphs.
Return a JSON array of EXACTLY N elements, positionally aligned to the input.
Element i corresponds to input paragraph i and is ITSELF an array of one or more rewritten
paragraph strings:
- If input paragraph i covers a single idea, return a 1-element array (tightened prose).
- If it covers multiple ideas, return multiple strings — each a single-idea paragraph.
Never merge content across different input paragraphs. Never drop a paragraph (no empty arrays).
Output JSON only — no prose around it.

Example: input ["A big multi-idea para", "A focused para"]
         output [["First idea rewritten", "Second idea rewritten"], ["Focused para rewritten"]]"""

ANALOGY_SYSTEM = """You are an expert technical writer editing AI-generated lesson analogies.
Rewrite the given analogy to be punchy, concrete, and immediately clear.

Rules:
- Write exactly 4-6 sentences total in this 3-part structure:
  • Setup (1-2 sentences): Name a specific, concrete scenario with real terminology/names.
  • Parallel (2-3 sentences): Map each key aspect using "just as [X in domain], [Y in concept]" — one mapping per sentence.
  • Insight (1 sentence): State the "aha" — what this parallel reveals about WHY the concept works this way.
- Preserve the opening format: keep the domain emoji and "Think of it like [domain]:" opening.
- Be punchy — every sentence earns its place. No padding, no vague comparisons.
- Preserve the technical concept being explained.

Output format: a JSON array with exactly ONE string — the rewritten analogy.
No extra text."""

# ─── Claude helpers ───────────────────────────────────────────────────────────

def _parse_json_array(raw: str) -> list[str]:
    raw = re.sub(r"^```(?:json)?\s*", "", raw.strip())
    raw = re.sub(r"\s*```$", "", raw.rstrip())
    return json.loads(raw)

def _call_rewrite(system: str, user_msg: str) -> list[str]:
    client = get_client()
    response = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=4096,
        system=system,
        messages=[{"role": "user", "content": user_msg}],
    )
    return _parse_json_array(response.content[0].text)

def _coerce_groups(result, texts: list[str]) -> list[list[str]]:
    """Validate Claude's response into N positionally-aligned groups of paragraphs.

    Accepts the expected nested shape (list of N lists of strings). Tolerates a
    flat list of N strings as a 1:1 fallback. Anything else raises, so the caller
    skips the lesson unchanged rather than risking misaligned content.
    """
    n = len(texts)
    if not isinstance(result, list) or len(result) != n:
        raise ValueError(f"expected {n} elements, got {type(result).__name__} "
                         f"len={len(result) if isinstance(result, list) else 'NA'}")

    groups: list[list[str]] = []
    for i, elem in enumerate(result):
        if isinstance(elem, str):                       # flat 1:1 fallback
            groups.append([elem])
        elif isinstance(elem, list) and elem and all(isinstance(s, str) for s in elem):
            groups.append([s for s in elem])
        else:                                           # empty/malformed → keep original
            groups.append([texts[i]])
    return groups

async def _rewrite_paragraphs(title: str, texts: list[str]) -> list[list[str]]:
    user_msg = (
        f"Lesson title: {title}\n\n"
        f"Original paragraphs ({len(texts)} items, JSON array):\n"
        f"{json.dumps(texts, ensure_ascii=False, indent=2)}\n\n"
        f"Return ONLY a JSON array of EXACTLY {len(texts)} elements, each an array of one or "
        "more rewritten paragraph strings, positionally aligned to the input. No extra text."
    )
    result = await asyncio.to_thread(_call_rewrite, PARAGRAPH_SYSTEM, user_msg)
    return _coerce_groups(result, texts)

async def _rewrite_analogy(title: str, concept: str, text: str) -> str:
    user_msg = (
        f"Concept: {concept}\nLesson: {title}\n\n"
        f"Original analogy:\n{json.dumps([text], ensure_ascii=False)}\n\n"
        "Return ONLY a JSON array with one rewritten analogy string. No extra text."
    )
    result = await asyncio.to_thread(_call_rewrite, ANALOGY_SYSTEM, user_msg)
    return result[0] if result else text

# ─── Section helpers ──────────────────────────────────────────────────────────

def _extract(sections: list, type_: str) -> list[tuple[int, str]]:
    return [(i, s["content"]) for i, s in enumerate(sections) if s.get("type") == type_]

def _guess_concept(sections: list, analogy_idx: int, fallback: str) -> str:
    for i in range(analogy_idx - 1, -1, -1):
        s = sections[i]
        if s.get("type") == "heading" and s.get("level") == 3:
            return s.get("content", fallback)
    return fallback

def _apply_paragraph_rewrites(sections: list, orig: list[tuple[int, str]], new_groups: list[list[str]]) -> list:
    """Replace each original paragraph section with its aligned group of rewritten
    paragraphs. Mapping is unambiguous: group k belongs to orig[k]'s section index,
    so a split paragraph expands in place and never lands under a different heading.
    Non-paragraph sections (headings, analogies, code) are preserved untouched.
    """
    mapping = {idx: group for (idx, _), group in zip(orig, new_groups)}
    result = []
    for idx, section in enumerate(sections):
        group = mapping.get(idx)
        if group is not None:
            for chunk in group:
                result.append({**section, "content": chunk})
        else:
            result.append(section)
    return result

def _apply_analogy_rewrites(sections: list, orig: list[tuple[int, str]], new_texts: list[str]) -> list:
    mapping = {i: t for (i, _), t in zip(orig, new_texts)}
    return [{**s, "content": mapping[idx]} if idx in mapping else s
            for idx, s in enumerate(sections)]

# ─── Per-lesson worker ────────────────────────────────────────────────────────

def _internal_headers() -> dict:
    h = {"Content-Type": "application/json"}
    if INTERNAL_SECRET:
        h["x-internal-key"] = INTERNAL_SECRET
    return h

async def _process_lesson(http: httpx.AsyncClient, backend: str, lesson: dict, mode: str) -> str:
    lid, title = lesson["id"], lesson["title"]

    if not lesson.get("isGenerated"):
        return f"  {title} — skip (not generated)"

    try:
        r = await http.get(
            f"{backend}/ai/internal/lessons/{lid}/content",
            headers=_internal_headers(),
        )
        r.raise_for_status()
    except Exception as e:
        return f"  {title} — fetch error: {e}"

    data = r.json()
    content_json = data.get("contentJson") if isinstance(data, dict) else None
    if not content_json:
        return f"  {title} — no contentJson"

    updated = copy.deepcopy(content_json)
    changed = False

    if mode in ("paragraphs", "both"):
        paras = _extract(updated["sections"], "paragraph")
        if paras:
            try:
                new_p = await _rewrite_paragraphs(title, [t for _, t in paras])
                updated["sections"] = _apply_paragraph_rewrites(updated["sections"], paras, new_p)
                changed = True
            except Exception as e:
                logger.warning(f"  {title} — paragraph rewrite error: {e}")

    if mode in ("analogies", "both"):
        # CRITICAL: re-extract against the CURRENT sections. The paragraph pass
        # above can split one paragraph into several, growing the array and
        # shifting every later index. Extracting analogy indices from the
        # original sections here would write analogy text onto the wrong
        # (shifted) section — corrupting paragraphs with analogy content.
        analogs = _extract(updated["sections"], "analogy")
        if analogs:
            new_a = []
            for idx, text in analogs:
                concept = _guess_concept(updated["sections"], idx, title)
                try:
                    new_a.append(await _rewrite_analogy(title, concept, text))
                except Exception as e:
                    logger.warning(f"  {title} analogy {idx} error: {e}")
                    new_a.append(text)
            updated["sections"] = _apply_analogy_rewrites(updated["sections"], analogs, new_a)
            changed = True

    if not changed:
        return f"  {title} — nothing to rewrite"

    try:
        r = await http.patch(
            f"{backend}/ai/internal/lessons/{lid}/content",
            json={"contentJson": updated, "isGenerated": True},
            headers=_internal_headers(),
        )
        r.raise_for_status()
        return f"  {title} — saved"
    except Exception as e:
        return f"  {title} — save error: {e}"

# ─── Background job ───────────────────────────────────────────────────────────

async def _run_rewrite_job(job_id: str, backend: str, course: Optional[str], mode: str):
    logger.info(f"[rewrite:{job_id}] starting — backend={backend} course={course or 'ALL'} mode={mode}")

    async with httpx.AsyncClient(timeout=60.0) as http:
        if course:
            try:
                r = await http.get(f"{backend}/topics/{course}")
                r.raise_for_status()
                topics = [r.json()]
            except Exception as e:
                logger.error(f"[rewrite:{job_id}] failed to fetch course '{course}': {e}")
                return
        else:
            try:
                r = await http.get(f"{backend}/topics")
                r.raise_for_status()
                raw = r.json()
                topics = raw if isinstance(raw, list) else raw.get("data", [])
                # Fetch full topic details (including lessons) for each slug
                slugs = [t["slug"] for t in topics]
                topics = []
                for slug in slugs:
                    try:
                        r2 = await http.get(f"{backend}/topics/{slug}")
                        r2.raise_for_status()
                        topics.append(r2.json())
                    except Exception as e:
                        logger.warning(f"[rewrite:{job_id}] skipping {slug}: {e}")
            except Exception as e:
                logger.error(f"[rewrite:{job_id}] failed to fetch topics: {e}")
                return

        total_saved = 0
        for topic in topics:
            slug = topic.get("slug", "?")
            lessons = sorted(topic.get("lessons", []), key=lambda l: l.get("orderIndex", 0))
            logger.info(f"[rewrite:{job_id}] course '{slug}' — {len(lessons)} lessons")
            for lesson in lessons:
                result = await _process_lesson(http, backend, lesson, mode)
                logger.info(f"[rewrite:{job_id}]{result}")
                if result.endswith("saved"):
                    total_saved += 1
                await asyncio.sleep(0.3)  # gentle pacing

    logger.info(f"[rewrite:{job_id}] DONE — {total_saved} lessons updated")

# ─── Endpoint ─────────────────────────────────────────────────────────────────

class RewriteRequest(BaseModel):
    backend_url: str = "http://backend:3001"
    course: Optional[str] = None
    sections: str = "both"   # "paragraphs" | "analogies" | "both"

@router.post("/content")
async def rewrite_content(req: RewriteRequest, background_tasks: BackgroundTasks):
    """
    Trigger a background rewrite of all lesson paragraph and/or analogy sections.

    Returns immediately. Tail logs with:
        docker logs skillforge-ai-worker-1 -f | grep rewrite
    """
    if req.sections not in ("paragraphs", "analogies", "both"):
        return {"error": "sections must be 'paragraphs', 'analogies', or 'both'"}

    job_id = uuid.uuid4().hex[:8]
    background_tasks.add_task(
        _run_rewrite_job,
        job_id=job_id,
        backend=req.backend_url.rstrip("/"),
        course=req.course or None,
        mode=req.sections,
    )
    return {
        "status": "started",
        "job_id": job_id,
        "course": req.course or "ALL",
        "sections": req.sections,
        "tail_logs": "docker logs skillforge-ai-worker-1 -f | grep rewrite",
    }

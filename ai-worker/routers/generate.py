import json
import anthropic
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

from config import MODEL, MAX_TOKENS, get_client

router = APIRouter(prefix="/generate", tags=["generate"])


class LessonRequest(BaseModel):
    lessonId: str
    lessonTitle: str
    lessonType: str  # reading/exercise/quiz/project
    topicName: str
    topicCategory: str
    difficulty: str
    hobby: str = "general"


class LessonSection(BaseModel):
    type: str  # "heading" | "paragraph" | "code" | "info_box" | "warning_box" | "quiz" | "exercise" | "key_points"
    content: str
    language: str = ""  # for code blocks
    level: int = 2      # for headings (h2/h3)
    items: list = []    # for key_points lists and quiz options
    answer: int = -1    # for quiz correct answer index
    explanation: str = ""  # for quiz explanations


class LessonContentResponse(BaseModel):
    lessonId: str
    title: str
    type: str
    topicName: str
    sections: List[LessonSection]
    estimatedMinutes: int
    xpReward: int
    generated: bool = True


class BulkGenerateRequest(BaseModel):
    backend_url: str = "http://localhost:3001"


class CurriculumRequest(BaseModel):
    topicName: str
    category: str
    difficulty: str


class LessonLesson(BaseModel):
    title: str
    type: str
    durationMinutes: int


class CurriculumModule(BaseModel):
    title: str
    lessons: List[LessonLesson]


class CurriculumResponse(BaseModel):
    modules: List[CurriculumModule]


def _schema() -> str:
    return (
        "Return a JSON object with this exact schema:\n"
        "{\n"
        '  "lessonId": "<provided lessonId>",\n'
        '  "title": "<lesson title>",\n'
        '  "type": "<lesson type>",\n'
        '  "topicName": "<topic name>",\n'
        '  "estimatedMinutes": <integer>,\n'
        '  "xpReward": <integer>,\n'
        '  "generated": true,\n'
        '  "sections": [ { "type": "...", "content": "...", "language": "...", "level": 2, "items": [], "answer": -1, "explanation": "" } ]\n'
        "}\n\n"
        "Section types and their required fields:\n"
        '- "heading": content=heading text, level=2 or 3\n'
        '- "paragraph": content=rich explanatory text (minimum 80 words per paragraph, explain WHY not just WHAT)\n'
        '- "code": content=full working code, language=language name (e.g. "python","java","typescript","bash")\n'
        '- "info_box": content=pro tip or important note starting with "Pro Tip:" or "Note:"\n'
        '- "warning_box": content=common mistake or pitfall starting with "Warning:" or "Common Mistake:"\n'
        '- "key_points": items=array of 5-7 detailed bullet strings (each 15-25 words)\n'
        '- "quiz": content=question, items=4 answer options, answer=correct index (0-3), explanation=why correct (30+ words)\n\n'
        "QUALITY REQUIREMENTS:\n"
        "- Every paragraph must be at least 80 words with real technical depth\n"
        "- Every code block must be complete, runnable, and well-commented\n"
        "- Include real-world context: where is this used in production, why does it matter\n"
        "- Do NOT use vague phrases like 'this is important' — explain WHY with specifics\n"
        "- Use precise technical language appropriate for the difficulty level\n\n"
        "Return only valid JSON. No markdown fences. No text outside the JSON.\n\n"
    )


def _build_lesson_prompt(req: LessonRequest) -> str:
    ctx = (
        f"Topic: {req.topicName}\n"
        f"Category: {req.topicCategory}\n"
        f"Lesson Title: {req.lessonTitle}\n"
        f"Lesson ID: {req.lessonId}\n"
        f"Difficulty: {req.difficulty}\n\n"
    )

    if req.lessonType == "reading":
        return ctx + _schema() + f"""Generate a DEEP, comprehensive reading lesson on "{req.lessonTitle}" for the topic "{req.topicName}".

This lesson must be equivalent to a high-quality textbook chapter. Include ALL of the following sections in order:

1. heading (level 2): Overview — what this lesson covers and why it matters in the real world
2. paragraph: Motivating context — explain the problem this topic solves, with a real-world analogy. Minimum 100 words.
3. heading (level 2): Core Concepts
4. paragraph: Explain the first core concept in depth — the theory, the mechanics, the mental model. Minimum 120 words.
5. code: First complete, commented code example demonstrating the core concept. Use real {req.topicCategory} code.
6. paragraph: Walk through the code — explain each important part, why it was written that way, and what happens at runtime. Minimum 80 words.
7. heading (level 2): How It Works Under the Hood
8. paragraph: Explain the internal mechanics — what the runtime/compiler/framework is actually doing. Include performance implications, memory model, or execution flow as relevant. Minimum 120 words.
9. code: Second code example showing a more advanced or real-world usage pattern.
10. info_box: Pro Tip with a non-obvious insight that experienced engineers use in production.
11. heading (level 2): Common Patterns & Best Practices
12. paragraph: Explain 2-3 established patterns or best practices with reasoning. Why is pattern A preferred over pattern B? Minimum 100 words.
13. code: Third code example showing best practice vs anti-pattern comparison OR a complete real-world snippet.
14. warning_box: The most common mistake beginners make with this concept and exactly how to avoid it.
15. heading (level 2): Real-World Application
16. paragraph: Describe how this is used in production systems at scale — mention specific companies, frameworks, or systems where relevant. Minimum 80 words.
17. key_points: 6-7 detailed takeaway bullets — each bullet must be a complete, specific insight (not vague summaries).
18. quiz (question 1): Conceptual question testing understanding of the core mechanism.
19. quiz (question 2): Applied question — given a scenario, what is the correct approach?

Set estimatedMinutes to 25-35. Set xpReward to 75."""

    elif req.lessonType == "exercise":
        return ctx + _schema() + f"""Generate a DETAILED hands-on exercise for "{req.lessonTitle}" in "{req.topicName}".

This must be a fully guided, step-by-step exercise that builds a real, functional piece of software. Include ALL sections:

1. heading (level 2): What You'll Build
2. paragraph: Describe exactly what the learner will build — the finished product, its purpose, and what skills it reinforces. Be specific. Minimum 80 words.
3. heading (level 2): Prerequisites
4. key_points: 4-5 specific prerequisites with what the learner needs to already know or have installed.
5. heading (level 2): Setup & Project Structure
6. paragraph: Explain the project setup, directory structure, and any dependencies to install. Minimum 60 words.
7. code: Setup commands / initial file structure / dependency installation.
8. heading (level 2): Step 1 — Foundation
9. paragraph: Explain what Step 1 accomplishes and the concept behind it. Minimum 60 words.
10. code: Complete code for Step 1 with comments explaining each key line.
11. heading (level 2): Step 2 — Core Logic
12. paragraph: Explain what Step 2 builds on from Step 1 and what new concept it introduces. Minimum 60 words.
13. code: Complete code for Step 2.
14. heading (level 2): Step 3 — Integration & Enhancement
15. paragraph: Explain Step 3 and how it brings everything together. Minimum 60 words.
16. code: Complete code for Step 3.
17. heading (level 2): Step 4 — Testing & Verification
18. paragraph: How to run and verify the solution works correctly. Minimum 40 words.
19. code: How to run the code + expected output.
20. warning_box: The most common error learners hit in this exercise and how to fix it.
21. info_box: Extension challenge — one way to take this exercise further to deepen understanding.
22. key_points: 5-6 key concepts reinforced by this exercise.

Set estimatedMinutes to 50-60. Set xpReward to 100."""

    elif req.lessonType == "quiz":
        return ctx + _schema() + f"""Generate a RIGOROUS quiz for "{req.lessonTitle}" in "{req.topicName}".

The quiz must test genuine understanding — not just recall. Mix conceptual, applied, and tricky questions. Include:

1. heading (level 2): Knowledge Check — {req.lessonTitle}
2. paragraph: Intro explaining what this quiz covers and how it will test their understanding. 40+ words.
3-10. Eight quiz sections, progressing from foundational to advanced:
   - Questions 1-2: Foundational conceptual understanding
   - Questions 3-4: How things work mechanically / under the hood
   - Questions 5-6: Applied scenarios — "given X situation, what should you do?"
   - Questions 7-8: Tricky edge cases or common misconceptions

   Each quiz section must have:
   - content: A clear, specific question (not trivially obvious)
   - items: Exactly 4 answer options (plausible distractors, not obviously wrong)
   - answer: Integer 0-3 (correct option index)
   - explanation: 40+ word explanation of WHY the correct answer is right and why the others are wrong

11. key_points: 6 detailed summary bullets of the key concepts tested in this quiz.

Set estimatedMinutes to 20. Set xpReward to 50."""

    elif req.lessonType == "project":
        return ctx + _schema() + f"""Generate a COMPREHENSIVE capstone mini-project for "{req.lessonTitle}" in "{req.topicName}".

This must be a real, non-trivial project that would be impressive in a portfolio. Include ALL sections:

1. heading (level 2): Project Overview
2. paragraph: Describe the project, its real-world purpose, what it demonstrates, and why it's valuable. Minimum 100 words.
3. heading (level 2): Learning Objectives
4. key_points: 5-6 specific skills and concepts the learner will demonstrate by completing this project.
5. heading (level 2): Technical Requirements
6. key_points: 7-8 specific functional and non-functional requirements (be precise — "must handle X", "must implement Y").
7. heading (level 2): Architecture & Design
8. paragraph: Explain the architecture — components, how they interact, data flow, design decisions and trade-offs. Minimum 120 words.
9. code: Architecture skeleton / project structure with key files and their responsibilities.
10. heading (level 2): Phase 1 — Core Implementation
11. paragraph: What to build in Phase 1 and why this foundation matters. Minimum 60 words.
12. code: Starter code / core implementation for Phase 1 with detailed comments.
13. heading (level 2): Phase 2 — Feature Completion
14. paragraph: What Phase 2 adds and how it builds on Phase 1. Minimum 60 words.
15. code: Key code for Phase 2.
16. heading (level 2): Phase 3 — Polish & Production Readiness
17. paragraph: Error handling, edge cases, testing, and production considerations. Minimum 60 words.
18. code: Error handling, validation, or test code example.
19. heading (level 2): Evaluation Rubric
20. key_points: 6-7 specific evaluation criteria with what "excellent" looks like for each.
21. info_box: Extension challenges — 3 ways to take the project to the next level.

Set estimatedMinutes to 60. Set xpReward to 150."""

    else:
        return ctx + _schema() + f"""Generate educational content for "{req.lessonTitle}" in "{req.topicName}".
Include: heading, a detailed 100-word paragraph, a complete code example, an info_box with a pro tip, and key_points with 5 detailed bullets.
Set estimatedMinutes to 20. Set xpReward to 50."""


@router.post("/lesson", response_model=LessonContentResponse)
async def generate_lesson(req: LessonRequest) -> LessonContentResponse:
    """Generate structured lesson content as JSON using Claude with prompt caching."""
    system_prompt = (
        "You are an expert technical educator. Generate structured lesson content as valid JSON only. "
        "No markdown outside JSON."
    )

    user_prompt = _build_lesson_prompt(req)

    try:
        response = get_client().messages.create(
            model="claude-sonnet-4-6",
            max_tokens=MAX_TOKENS,
            system=[
                {
                    "type": "text",
                    "text": system_prompt,
                    # Cache the system prompt since it's reused across many lessons
                    "cache_control": {"type": "ephemeral"},
                }
            ],
            messages=[{"role": "user", "content": user_prompt}],
        )

        raw_text = ""
        for block in response.content:
            if block.type == "text":
                raw_text = block.text.strip()
                break

        # Strip markdown fences if present
        if raw_text.startswith("```"):
            lines = raw_text.split("\n")
            # Remove first line (```json or ```) and last line (```)
            raw_text = "\n".join(lines[1:-1]) if len(lines) > 2 else raw_text

        lesson_data = json.loads(raw_text)

        # Ensure required fields are present
        lesson_data.setdefault("lessonId", req.lessonId)
        lesson_data.setdefault("title", req.lessonTitle)
        lesson_data.setdefault("type", req.lessonType)
        lesson_data.setdefault("topicName", req.topicName)
        lesson_data.setdefault("generated", True)
        lesson_data.setdefault("estimatedMinutes", 15)
        lesson_data.setdefault("xpReward", 50)

        # Normalise each section to ensure default fields
        for section in lesson_data.get("sections", []):
            section.setdefault("language", "")
            section.setdefault("level", 2)
            section.setdefault("items", [])
            section.setdefault("answer", -1)
            section.setdefault("explanation", "")

        return LessonContentResponse(**lesson_data)

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse lesson JSON from Claude: {str(e)}")
    except anthropic.AuthenticationError:
        raise HTTPException(status_code=401, detail="Invalid Anthropic API key")
    except anthropic.RateLimitError:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please retry later.")
    except anthropic.APIStatusError as e:
        raise HTTPException(status_code=502, detail=f"Anthropic API error: {e.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate lesson: {str(e)}")


@router.post("/all-lessons")
async def generate_all_lessons(req: BulkGenerateRequest):
    """Fetch all ungenerated lessons from backend, generate each, and PATCH the content back."""
    import httpx

    results = {"generated": 0, "failed": 0, "errors": []}

    async with httpx.AsyncClient(timeout=120.0) as client_http:
        topics_resp = await client_http.get(f"{req.backend_url}/topics?limit=100")
        topics = topics_resp.json().get("data", [])

        for topic in topics:
            detail = await client_http.get(f"{req.backend_url}/topics/{topic['slug']}")
            topic_data = detail.json()

            for lesson in topic_data.get("lessons", []):
                if lesson.get("isGenerated"):
                    continue

                try:
                    gen = await generate_lesson(LessonRequest(
                        lessonId=lesson["id"],
                        lessonTitle=lesson["title"],
                        lessonType=lesson["type"],
                        topicName=topic_data["name"],
                        topicCategory=topic_data["category"],
                        difficulty=topic_data["difficulty"],
                    ))
                    await client_http.patch(
                        f"{req.backend_url}/ai/lessons/{lesson['id']}/content",
                        json={"contentJson": gen.dict(), "isGenerated": True}
                    )
                    results["generated"] += 1
                except Exception as e:
                    results["failed"] += 1
                    results["errors"].append(str(e))

    return results


@router.post("/curriculum")
async def generate_curriculum(req: CurriculumRequest):
    """Generate a curriculum outline with 5 modules."""
    system_prompt = (
        "You are a curriculum designer who creates structured learning paths. "
        "Always respond with valid JSON only — no additional text."
    )

    user_prompt = (
        f"Create a curriculum for: {req.topicName}\n"
        f"Category: {req.category}\n"
        f"Difficulty: {req.difficulty}\n\n"
        "Return a JSON object with a 'modules' array. Each module should have:\n"
        '  - "title": module title string\n'
        '  - "lessons": array of 3-5 lesson objects, each with:\n'
        '      - "title": lesson title\n'
        '      - "type": one of "reading", "exercise", "quiz", or "project"\n'
        '      - "durationMinutes": integer (15-60)\n'
        "Create exactly 5 modules that progress logically from beginner to advanced. "
        "Return only the JSON, no markdown fences."
    )

    try:
        response = get_client().messages.create(
            model=MODEL,
            max_tokens=MAX_TOKENS,
            system=[
                {
                    "type": "text",
                    "text": system_prompt,
                    "cache_control": {"type": "ephemeral"},
                }
            ],
            messages=[{"role": "user", "content": user_prompt}],
        )

        raw_text = ""
        for block in response.content:
            if block.type == "text":
                raw_text = block.text.strip()
                break

        # Strip markdown fences if present
        if raw_text.startswith("```"):
            lines = raw_text.split("\n")
            raw_text = "\n".join(lines[1:-1]) if len(lines) > 2 else raw_text

        curriculum_data = json.loads(raw_text)
        return curriculum_data

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse curriculum JSON: {str(e)}")
    except anthropic.AuthenticationError:
        raise HTTPException(status_code=401, detail="Invalid Anthropic API key")
    except anthropic.RateLimitError:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please retry later.")
    except anthropic.APIStatusError as e:
        raise HTTPException(status_code=502, detail=f"Anthropic API error: {e.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate curriculum: {str(e)}")

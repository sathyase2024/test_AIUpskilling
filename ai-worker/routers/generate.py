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
        '- "analogy": content=interest-based analogy starting with "🏏 Think of it like [interest]:" that maps the concept just explained to the learner\'s interest domain. Only used when a hobby is specified.\n'
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
    hobby = req.hobby.strip() if req.hobby and req.hobby.lower() not in ("general", "", "none") else ""

    # The golden rule: concept → analogy → code (when hobby is set).
    # Every technical paragraph is immediately followed by an analogy box,
    # then the code example uses hobby-themed variable names/data to reinforce both.
    analogy_rule = (
        f"\n=== PERSONALISATION RULE (interest: {hobby}) ===\n"
        f"The learning pattern for EVERY concept must follow this exact 3-step sequence:\n"
        f"  STEP 1 — PARAGRAPH: Explain the technical concept precisely. Pure technical content. No {hobby} in the paragraph.\n"
        f"  STEP 2 — ANALOGY: Immediately after the paragraph, add an 'analogy' section. This is the most important step.\n"
        f"             The analogy must be DEEP and DETAILED — not a one-liner. Follow this structure:\n"
        f"             a) First, describe the {hobby} scenario in specific detail (2-3 sentences). Name real players, real situations, real mechanics.\n"
        f"             b) Then explicitly draw the parallel — map EACH part of the technical concept to its {hobby} equivalent (3-4 sentences).\n"
        f"             c) End with the insight — what does understanding this {hobby} parallel reveal about the technical concept? (1-2 sentences).\n"
        f"             Total length: 6-10 sentences. Start with '🏏 Think of it like {hobby}:'.\n"
        f"             Use precise {hobby} terminology: innings, over, delivery, wicket, run rate, economy, DRS, powerplay,\n"
        f"             fielding positions, batting order, bowling spell, maiden over, scorecard, duckworth-lewis, etc.\n"
        f"             The analogy must make someone say 'oh NOW I understand why it works that way' — not just 'that's a bit like cricket'.\n"
        f"  STEP 3 — CODE: The code example that follows uses {hobby}-themed class names, variable names, and sample data\n"
        f"             (e.g. CricketPlayer, innings_count, match_id, Rohit Sharma, Jasprit Bumrah) to reinforce BOTH the concept and the analogy.\n"
        f"The paragraph teaches the concept. The analogy makes it click. The code makes it concrete.\n"
        f"Do NOT mix {hobby} into the paragraph text — keep the 3 steps cleanly separated.\n"
        f"=== END PERSONALISATION RULE ===\n"
    ) if hobby else ""

    ctx = (
        f"Topic: {req.topicName}\n"
        f"Category: {req.topicCategory}\n"
        f"Lesson Title: {req.lessonTitle}\n"
        f"Lesson ID: {req.lessonId}\n"
        f"Difficulty: {req.difficulty}\n"
        + analogy_rule + "\n"
    )

    if req.lessonType == "reading":
        analogy_instruction = (
            f"6-10 sentences following the 3-part structure in the PERSONALISATION RULE: "
            f"(a) specific {hobby} scenario with real names/situations, "
            f"(b) map each part of the concept to its {hobby} equivalent explicitly, "
            f"(c) state the insight this parallel reveals."
        ) if hobby else ""

        if hobby:
            sections = f"""Include ALL of the following sections in EXACTLY this order:

1.  heading (level 2): Overview
2.  paragraph: Motivating context — the problem this topic solves, why it was invented, what breaks without it. Minimum 100 words. Pure technical.
3.  analogy: {analogy_instruction}
4.  heading (level 2): Core Concepts
    IMPORTANT: Do NOT write one paragraph covering all concepts together.
    Instead, for EACH individual concept in this topic (e.g. Encapsulation, Inheritance, Polymorphism, Abstraction — or whatever the 3-4 key concepts are for THIS lesson):
      a. heading (level 3): [Concept Name] — e.g. "Encapsulation", "Inheritance"
      b. paragraph: Explain THIS concept only — definition, how it works, why it exists, what problem it solves. Minimum 80 words. Pure technical.
      c. analogy: Map THIS specific concept to {hobby}. {analogy_instruction}
    Repeat a/b/c for each concept. Typically 3-4 concepts = 9-12 sections here.
5.  code: A single complete, commented code example that demonstrates ALL the concepts above together, using {hobby}-themed class/variable names and realistic sample data.
6.  paragraph: Walk through the code — explain how each concept appears in the code, why it was written that way, runtime behaviour. Minimum 80 words.
7.  heading (level 2): How It Works Under the Hood
8.  paragraph: Internal mechanics — what the runtime/compiler/framework actually does. Performance, memory model, execution flow. Minimum 120 words. Pure technical.
9.  analogy: {analogy_instruction}
10. code: Second code example — advanced usage pattern, using {hobby}-themed data.
11. info_box: Pro Tip — a non-obvious production insight. Start with "Pro Tip:".
12. heading (level 2): Common Patterns & Best Practices
13. paragraph: 2-3 established patterns with reasoning — why pattern A over B. Minimum 100 words. Pure technical.
14. analogy: {analogy_instruction}
15. code: Third code example — best practice vs anti-pattern, using {hobby}-themed objects.
16. warning_box: Most common beginner mistake and exactly how to avoid it. Start with "Warning:".
17. heading (level 2): Real-World Application
18. paragraph: How this is used in production at scale — specific companies, frameworks, systems. Minimum 80 words.
19. key_points: 6-7 detailed takeaway bullets — complete, specific insights (not vague summaries).
20. quiz: Conceptual question on one of the core concepts. 4 options, correct index, 40+ word explanation.
21. quiz: Applied scenario question — given a real situation, what is the correct approach? 4 options, correct index, 40+ word explanation."""
        else:
            sections = """Include ALL of the following sections in order:

1.  heading (level 2): Overview
2.  paragraph: Motivating context — the problem this topic solves, why it was invented. Minimum 100 words.
3.  heading (level 2): Core Concepts
    IMPORTANT: Do NOT write one paragraph covering all concepts together.
    Instead, for EACH individual concept in this topic (e.g. Encapsulation, Inheritance, Polymorphism, Abstraction — or whatever the 3-4 key concepts are for THIS lesson):
      a. heading (level 3): [Concept Name] — e.g. "Encapsulation", "Inheritance"
      b. paragraph: Explain THIS concept only — definition, how it works, why it exists, what problem it solves. Minimum 80 words.
    Repeat a/b for each concept. Typically 3-4 concepts = 6-8 sections here.
4.  code: A single complete, commented code example demonstrating ALL the concepts above together.
5.  paragraph: Walk through the code — explain how each concept appears, runtime behaviour. Minimum 80 words.
6.  heading (level 2): How It Works Under the Hood
7.  paragraph: Internal mechanics — runtime/compiler/framework internals. Performance, memory, execution flow. Minimum 120 words.
8.  code: Second code example — advanced usage.
9.  info_box: Pro Tip — a non-obvious production insight. Start with "Pro Tip:".
10. heading (level 2): Common Patterns & Best Practices
11. paragraph: 2-3 established patterns with reasoning — why pattern A over B. Minimum 100 words.
12. code: Third code example — best practice vs anti-pattern.
13. warning_box: Most common beginner mistake and exactly how to avoid it. Start with "Warning:".
14. heading (level 2): Real-World Application
15. paragraph: How this is used in production at scale — specific companies, frameworks, systems. Minimum 80 words.
16. key_points: 6-7 detailed takeaway bullets — complete, specific insights.
17. quiz: Conceptual question on one of the core concepts. 4 options, correct index, 40+ word explanation.
18. quiz: Applied scenario question. 4 options, correct index, 40+ word explanation."""

        return ctx + _schema() + f"""Generate a DEEP, comprehensive reading lesson on "{req.lessonTitle}" for the topic "{req.topicName}".

This lesson must be equivalent to a high-quality textbook chapter. Each core concept MUST get its own named heading (level 3) and dedicated paragraph — never group multiple concepts into a single paragraph.
{sections}

Set estimatedMinutes to 30-40. Set xpReward to 75."""

    elif req.lessonType == "exercise":
        if hobby:
            sections = f"""Include ALL sections in EXACTLY this order:

1.  heading (level 2): What You'll Build
2.  paragraph: What the learner builds — a {hobby}-themed project, its purpose, skills reinforced. Minimum 80 words. Pure technical.
3.  analogy: Why this project maps perfectly to {hobby} — the domain connection. 6-10 sentences following the 3-part structure in the PERSONALISATION RULE above: (a) describe the specific cricket scenario, (b) map each technical part to its cricket equivalent, (c) state the insight.
4.  heading (level 2): Prerequisites
5.  key_points: 4-5 specific prerequisites.
6.  heading (level 2): Setup & Project Structure
7.  paragraph: Project setup, directory structure, dependencies. Minimum 60 words.
8.  code: Setup commands / file structure (language: bash) — use {hobby}-themed project/file names.
9.  heading (level 2): Step 1 — Foundation
10. paragraph: What Step 1 accomplishes and the concept behind it. Minimum 60 words. Pure technical.
11. analogy: Map Step 1's concept to {hobby}. 6-10 sentences following the 3-part structure in the PERSONALISATION RULE above: (a) describe the specific cricket scenario, (b) map each technical part to its cricket equivalent, (c) state the insight.
12. code: Complete code for Step 1 — use {hobby}-themed class/variable names and real sample data.
13. heading (level 2): Step 2 — Core Logic
14. paragraph: What Step 2 builds on Step 1 and what new concept it introduces. Minimum 60 words. Pure technical.
15. analogy: Map Step 2's concept to {hobby}. 6-10 sentences following the 3-part structure in the PERSONALISATION RULE above: (a) describe the specific cricket scenario, (b) map each technical part to its cricket equivalent, (c) state the insight.
16. code: Complete code for Step 2 with {hobby}-themed data.
17. heading (level 2): Step 3 — Integration & Enhancement
18. paragraph: How Step 3 brings everything together. Minimum 60 words. Pure technical.
19. analogy: Map Step 3's integration to {hobby}. 6-10 sentences following the 3-part structure in the PERSONALISATION RULE above: (a) describe the specific cricket scenario, (b) map each technical part to its cricket equivalent, (c) state the insight.
20. code: Complete code for Step 3.
21. heading (level 2): Step 4 — Testing & Verification
22. paragraph: How to run and verify the solution. Minimum 40 words.
23. code: Run commands + expected output using realistic {hobby} data (language: bash).
24. warning_box: Most common error and fix. Start with "Warning:".
25. info_box: Extension challenge specific to {hobby} domain. Start with "Extension Challenge:".
26. key_points: 5-6 key concepts reinforced."""
        else:
            sections = """Include ALL sections in order:

1. heading (level 2): What You'll Build
2. paragraph: What the learner builds, its purpose, skills reinforced. Minimum 80 words.
3. heading (level 2): Prerequisites
4. key_points: 4-5 specific prerequisites.
5. heading (level 2): Setup & Project Structure
6. paragraph: Project setup, directory structure, dependencies. Minimum 60 words.
7. code: Setup commands / file structure (language: bash).
8. heading (level 2): Step 1 — Foundation
9. paragraph: What Step 1 accomplishes and the concept behind it. Minimum 60 words.
10. code: Complete code for Step 1 with comments.
11. heading (level 2): Step 2 — Core Logic
12. paragraph: What Step 2 builds and what new concept it introduces. Minimum 60 words.
13. code: Complete code for Step 2.
14. heading (level 2): Step 3 — Integration & Enhancement
15. paragraph: How Step 3 brings everything together. Minimum 60 words.
16. code: Complete code for Step 3.
17. heading (level 2): Step 4 — Testing & Verification
18. paragraph: How to run and verify the solution. Minimum 40 words.
19. code: Run commands + expected output (language: bash).
20. warning_box: Most common error and fix. Start with "Warning:".
21. info_box: Extension challenge. Start with "Extension Challenge:".
22. key_points: 5-6 key concepts reinforced."""

        return ctx + _schema() + f"""Generate a DETAILED hands-on exercise for "{req.lessonTitle}" in "{req.topicName}".

This must be a fully guided, step-by-step exercise building real, functional software.
{sections}

Set estimatedMinutes to 50-60. Set xpReward to 100."""

    elif req.lessonType == "quiz":
        applied_framing = (
            f"Questions 5-6: Applied scenarios framed as decisions a developer building a {hobby} app must make"
        ) if hobby else "Questions 5-6: Applied scenarios — given X situation, what should you do?"
        return ctx + _schema() + f"""Generate a RIGOROUS quiz for "{req.lessonTitle}" in "{req.topicName}".

The quiz must test genuine understanding — not just recall. Include:

1. heading (level 2): Knowledge Check — {req.lessonTitle}
2. paragraph: Intro — what this quiz covers and how it tests understanding{f", mention applied questions use {hobby} scenarios" if hobby else ""}. 40+ words.
3-10. Eight quiz sections progressing from foundational to advanced:
   - Questions 1-2: Foundational conceptual understanding
   - Questions 3-4: How things work mechanically / under the hood
   - {applied_framing}
   - Questions 7-8: Tricky edge cases or common misconceptions

   Each quiz section must have:
   - content: A clear, specific question (not trivially obvious)
   - items: Exactly 4 answer options (plausible distractors)
   - answer: Integer 0-3 (correct option index)
   - explanation: 40+ word explanation of WHY the correct answer is right and the others wrong

11. key_points: 6 detailed summary bullets of key concepts tested.

Set estimatedMinutes to 20. Set xpReward to 50."""

    elif req.lessonType == "project":
        if hobby:
            sections = f"""Include ALL sections in EXACTLY this order:

1.  heading (level 2): Project Overview
2.  paragraph: The project — a {hobby}-themed app showcasing {req.topicName} skills. Purpose, what it demonstrates, portfolio value. Minimum 100 words. Pure technical.
3.  analogy: Why building this in the {hobby} domain is a great fit for these technologies. 6-10 sentences following the 3-part structure in the PERSONALISATION RULE above: (a) describe the specific cricket scenario, (b) map each technical part to its cricket equivalent, (c) state the insight.
4.  heading (level 2): Learning Objectives
5.  key_points: 5-6 specific skills the learner will demonstrate.
6.  heading (level 2): Technical Requirements
7.  key_points: 7-8 specific requirements grounded in the {hobby} use case.
8.  heading (level 2): Architecture & Design
9.  paragraph: Architecture — components, interactions, data flow, design decisions. Minimum 120 words. Pure technical.
10. analogy: Map the architecture to {hobby} — e.g. how API Gateway is like the stadium entrance turnstile. 6-10 sentences following the 3-part structure in the PERSONALISATION RULE above: (a) describe the specific cricket scenario, (b) map each technical part to its cricket equivalent, (c) state the insight.
11. code: Architecture skeleton / project structure with {hobby}-themed file/class names.
12. heading (level 2): Phase 1 — Core Implementation
13. paragraph: What Phase 1 builds and why this foundation matters. Minimum 60 words. Pure technical.
14. analogy: Map Phase 1's core concept to {hobby}. 6-10 sentences following the 3-part structure in the PERSONALISATION RULE above: (a) describe the specific cricket scenario, (b) map each technical part to its cricket equivalent, (c) state the insight.
15. code: Phase 1 implementation — use {hobby}-themed class names and realistic sample data.
16. heading (level 2): Phase 2 — Feature Completion
17. paragraph: What Phase 2 adds and how it builds on Phase 1. Minimum 60 words. Pure technical.
18. analogy: Map Phase 2's new feature to {hobby}. 6-10 sentences following the 3-part structure in the PERSONALISATION RULE above: (a) describe the specific cricket scenario, (b) map each technical part to its cricket equivalent, (c) state the insight.
19. code: Phase 2 code with {hobby}-themed data.
20. heading (level 2): Phase 3 — Polish & Production Readiness
21. paragraph: Error handling, edge cases, testing, production considerations. Minimum 60 words.
22. code: Error handling / validation / test code.
23. heading (level 2): Evaluation Rubric
24. key_points: 6-7 specific evaluation criteria — what "excellent" looks like for each.
25. info_box: Extension challenges — 3 {hobby}-specific ways to extend the project. Start with "Extension Challenges:"."""
        else:
            sections = """Include ALL sections in order:

1. heading (level 2): Project Overview
2. paragraph: The project, its real-world purpose, what it demonstrates, portfolio value. Minimum 100 words.
3. heading (level 2): Learning Objectives
4. key_points: 5-6 specific skills demonstrated.
5. heading (level 2): Technical Requirements
6. key_points: 7-8 specific requirements — precise ("must handle X").
7. heading (level 2): Architecture & Design
8. paragraph: Architecture — components, interactions, data flow, trade-offs. Minimum 120 words.
9. code: Architecture skeleton / project structure.
10. heading (level 2): Phase 1 — Core Implementation
11. paragraph: What Phase 1 builds and why it matters. Minimum 60 words.
12. code: Phase 1 implementation with detailed comments.
13. heading (level 2): Phase 2 — Feature Completion
14. paragraph: What Phase 2 adds. Minimum 60 words.
15. code: Phase 2 code.
16. heading (level 2): Phase 3 — Polish & Production Readiness
17. paragraph: Error handling, testing, production considerations. Minimum 60 words.
18. code: Error handling / test code.
19. heading (level 2): Evaluation Rubric
20. key_points: 6-7 evaluation criteria.
21. info_box: Extension challenges. Start with "Extension Challenges:"."""

        return ctx + _schema() + f"""Generate a COMPREHENSIVE capstone mini-project for "{req.lessonTitle}" in "{req.topicName}".

This must be a real, non-trivial project impressive in a portfolio.
{sections}

Set estimatedMinutes to 60. Set xpReward to 150."""

    else:
        return ctx + _schema() + f"""Generate educational content for "{req.lessonTitle}" in "{req.topicName}".
Include: heading, a detailed 100-word paragraph{f", analogy mapping it to {hobby}" if hobby else ""}, a complete code example{f" with {hobby}-themed variable names" if hobby else ""}, an info_box with a pro tip, and key_points with 5 detailed bullets.
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
            model=MODEL,
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

    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
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

    except RuntimeError as e:
        raise HTTPException(status_code=503, detail=str(e))
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

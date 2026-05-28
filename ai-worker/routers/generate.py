import json
import anthropic
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

from config import ANTHROPIC_API_KEY, MODEL, MAX_TOKENS

router = APIRouter(prefix="/generate", tags=["generate"])

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)


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


def _build_lesson_prompt(req: LessonRequest) -> str:
    """Build a lesson-type-specific prompt requesting JSON output."""
    base_context = (
        f"Topic: {req.topicName}\n"
        f"Category: {req.topicCategory}\n"
        f"Lesson Title: {req.lessonTitle}\n"
        f"Lesson ID: {req.lessonId}\n"
        f"Difficulty: {req.difficulty}\n\n"
    )

    schema_description = (
        "Return a JSON object matching this schema exactly:\n"
        "{\n"
        '  "lessonId": "<the lessonId provided>",\n'
        '  "title": "<lesson title>",\n'
        '  "type": "<lesson type>",\n'
        '  "topicName": "<topic name>",\n'
        '  "estimatedMinutes": <integer>,\n'
        '  "xpReward": <integer>,\n'
        '  "generated": true,\n'
        '  "sections": [\n'
        "    {\n"
        '      "type": "<section type>",\n'
        '      "content": "<text content>",\n'
        '      "language": "<optional: programming language for code blocks>",\n'
        '      "level": <optional: heading level, default 2>,\n'
        '      "items": [<optional: list of strings for key_points, or list of option strings for quiz>],\n'
        '      "answer": <optional: integer index of correct answer for quiz, default -1>,\n'
        '      "explanation": "<optional: explanation for quiz answers>"\n'
        "    }\n"
        "  ]\n"
        "}\n\n"
        'Section types: "heading", "paragraph", "code", "info_box", "warning_box", "quiz", "exercise", "key_points"\n\n'
    )

    if req.lessonType == "reading":
        return (
            base_context
            + "Generate a comprehensive reading lesson as JSON.\n\n"
            + schema_description
            + f"Include these sections in order:\n"
            f'1. heading (level 2): "What is {req.topicName}?"\n'
            f"2. paragraph: 2-3 sentence explanation of {req.lessonTitle}\n"
            f'3. heading (level 2): "Key Concepts"\n'
            f"4. paragraph: detailed explanation of key concepts\n"
            f"5. code: relevant code example (set language field appropriately)\n"
            f'6. info_box: content starting with "Pro Tip:" followed by practical advice\n'
            f'7. heading (level 2): "How It Works"\n'
            f"8. paragraph: deeper explanation of the mechanics\n"
            f"9. code: second illustrative example (set language field)\n"
            f'10. key_points: items array with 4-5 key takeaway bullet points\n\n'
            f"Set estimatedMinutes to 10-15 and xpReward to 50-100.\n"
            f"Return only valid JSON, no markdown fences."
        )
    elif req.lessonType == "exercise":
        return (
            base_context
            + "Generate a hands-on exercise lesson as JSON.\n\n"
            + schema_description
            + "Include these sections in order:\n"
            '1. heading (level 2): "Exercise Overview"\n'
            f"2. paragraph: description of what the learner will build related to {req.lessonTitle}\n"
            '3. heading (level 2): "Prerequisites"\n'
            "4. key_points: items array listing 3-4 prerequisite skills/knowledge\n"
            '5. heading (level 2): "Step-by-Step Instructions"\n'
            "6. paragraph: introduction to step 1 with instructions\n"
            "7. code: code for step 1 (set language field)\n"
            "8. paragraph: introduction to step 2 with instructions\n"
            "9. code: code for step 2 (set language field)\n"
            "10. paragraph: introduction to step 3 with instructions\n"
            "11. code: code for step 3 (set language field)\n"
            '12. heading (level 2): "Expected Output"\n'
            "13. code: the expected output when running the completed exercise\n"
            "14. info_box: a helpful hint for completing the exercise\n\n"
            "Set estimatedMinutes to 20-30 and xpReward to 75-150.\n"
            "Return only valid JSON, no markdown fences."
        )
    elif req.lessonType == "quiz":
        return (
            base_context
            + "Generate a quiz lesson as JSON.\n\n"
            + schema_description
            + "Include these sections in order:\n"
            '1. heading (level 2): "Test Your Knowledge"\n'
            f"2. paragraph: brief intro explaining this quiz tests understanding of {req.lessonTitle}\n"
            "3-7. Five quiz sections (type: \"quiz\"), each with:\n"
            "   - content: the question text\n"
            "   - items: array of exactly 4 answer option strings\n"
            "   - answer: integer 0-3 indicating the correct option index\n"
            "   - explanation: brief explanation of why the answer is correct\n"
            '8. key_points: items array summarizing the 4-5 main topics that were tested\n\n'
            "Make questions progressively harder. Set estimatedMinutes to 10-15, xpReward to 60-100.\n"
            "Return only valid JSON, no markdown fences."
        )
    elif req.lessonType == "project":
        return (
            base_context
            + "Generate a mini-project lesson as JSON.\n\n"
            + schema_description
            + "Include these sections in order:\n"
            f'1. heading (level 2): "Project: {req.lessonTitle}"\n'
            f"2. paragraph: description of the project and its learning goals\n"
            '3. heading (level 2): "Requirements"\n'
            "4. key_points: items array with 5-6 functional requirements\n"
            '5. heading (level 2): "Architecture"\n'
            "6. paragraph: overview of the key components and how they fit together\n"
            "7. code: starter code / skeleton structure (set language field)\n"
            '8. heading (level 2): "Implementation Steps"\n'
            "9. key_points: items array with 5-7 implementation checklist items\n"
            '10. heading (level 2): "Evaluation Criteria"\n'
            "11. key_points: items array with 4-5 criteria for a good solution\n\n"
            "Set estimatedMinutes to 45-60, xpReward to 150-200.\n"
            "Return only valid JSON, no markdown fences."
        )
    else:
        return (
            base_context
            + "Generate educational lesson content as JSON.\n\n"
            + schema_description
            + "Include a heading, paragraph with an explanation, a code example, and key_points.\n"
            "Set estimatedMinutes to 15 and xpReward to 50.\n"
            "Return only valid JSON, no markdown fences."
        )


@router.post("/lesson", response_model=LessonContentResponse)
async def generate_lesson(req: LessonRequest) -> LessonContentResponse:
    """Generate structured lesson content as JSON using Claude with prompt caching."""
    system_prompt = (
        "You are an expert technical educator. Generate structured lesson content as valid JSON only. "
        "No markdown outside JSON."
    )

    user_prompt = _build_lesson_prompt(req)

    try:
        response = client.messages.create(
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
        response = client.messages.create(
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

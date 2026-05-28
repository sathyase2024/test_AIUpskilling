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
    """Build a lesson-type-specific prompt."""
    base_context = (
        f"Topic: {req.topicName}\n"
        f"Category: {req.topicCategory}\n"
        f"Lesson Title: {req.lessonTitle}\n"
        f"Difficulty: {req.difficulty}\n"
        f"Context/Hobby: {req.hobby}\n\n"
    )

    if req.lessonType == "reading":
        return (
            base_context
            + "Generate a comprehensive reading lesson in Markdown format. Include:\n"
            "- An engaging introduction\n"
            "- Multiple ## sections with clear H2 headings\n"
            "- Detailed explanations of key concepts\n"
            "- Code examples in fenced markdown blocks with the appropriate language tag\n"
            "- A 'Key Takeaways' section with bullet points\n"
            "- A brief summary at the end\n"
            "Target length: 600-900 words. Make the content specific to the topic and category."
        )
    elif req.lessonType == "exercise":
        return (
            base_context
            + "Generate a hands-on exercise in Markdown format. Include:\n"
            "- A clear problem statement\n"
            "- Step-by-step instructions (numbered)\n"
            "- Starter code in a fenced markdown block with the appropriate language\n"
            "- Expected outcome/output description\n"
            "- At least 2-3 hints in a collapsible or clearly marked section\n"
            "Target length: 400-600 words. Make it practical and achievable."
        )
    elif req.lessonType == "quiz":
        return (
            base_context
            + "Generate exactly 5 multiple-choice quiz questions in Markdown format.\n"
            "Return the questions as a JSON array embedded in a fenced ```json code block.\n"
            "Each question object must have:\n"
            '  - "question": the question text\n'
            '  - "options": an array of exactly 4 answer strings\n'
            '  - "correctIndex": integer 0-3 indicating the correct option\n'
            '  - "explanation": a brief explanation of why the answer is correct\n'
            "Make questions specific to the topic and vary difficulty."
        )
    elif req.lessonType == "project":
        return (
            base_context
            + "Generate a mini-project specification in Markdown format. Include:\n"
            "- Project overview and goals\n"
            "- Requirements list (functional and non-functional)\n"
            "- Architecture overview with key components\n"
            "- Implementation steps (numbered)\n"
            "- Evaluation criteria / rubric\n"
            "Target length: 500-800 words. Make it achievable but challenging."
        )
    else:
        return (
            base_context
            + "Generate educational content for this lesson in Markdown format. "
            "Include explanations, examples, and actionable takeaways."
        )


@router.post("/lesson")
async def generate_lesson(req: LessonRequest):
    """Generate rich lesson content using Claude with prompt caching."""
    system_prompt = (
        "You are an expert educational content creator specializing in technical and "
        "practical learning. You create engaging, accurate, and well-structured lesson "
        "content that helps learners understand and apply new concepts. Always format "
        "your responses in clean Markdown. Include practical examples and make the "
        "content relevant to the learner's context."
    )

    user_prompt = _build_lesson_prompt(req)

    try:
        response = client.messages.create(
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

        content = ""
        for block in response.content:
            if block.type == "text":
                content = block.text
                break

        return {"content": content, "lessonId": req.lessonId, "generated": True}

    except anthropic.AuthenticationError:
        raise HTTPException(status_code=401, detail="Invalid Anthropic API key")
    except anthropic.RateLimitError:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please retry later.")
    except anthropic.APIStatusError as e:
        raise HTTPException(status_code=502, detail=f"Anthropic API error: {e.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate lesson: {str(e)}")


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

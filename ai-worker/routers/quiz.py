import json
import anthropic
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Any

from config import MODEL, MAX_TOKENS, get_client

router = APIRouter(prefix="/quiz", tags=["quiz"])


class QuizGenerateRequest(BaseModel):
    topicName: str
    lessonTitle: str
    difficulty: str
    count: int = 5


class QuizEvaluateRequest(BaseModel):
    questions: List[Any]
    answers: List[int]


@router.post("/generate")
async def generate_quiz(req: QuizGenerateRequest):
    """Generate quiz questions as a JSON array using Claude."""
    system_prompt = (
        "You are an expert quiz creator who writes clear, accurate, and pedagogically "
        "sound multiple-choice questions. Always respond with valid JSON only — "
        "no additional text or markdown fences."
    )

    count = max(1, min(req.count, 20))  # Clamp between 1 and 20

    user_prompt = (
        f"Generate {count} multiple-choice quiz questions about: {req.topicName}\n"
        f"Lesson: {req.lessonTitle}\n"
        f"Difficulty: {req.difficulty}\n\n"
        "Return a JSON array where each element is an object with:\n"
        '  - "question": the question text\n'
        '  - "options": array of exactly 4 answer strings (A, B, C, D options)\n'
        '  - "correctIndex": integer 0-3 (0=first option is correct)\n'
        '  - "explanation": brief explanation of why the answer is correct\n'
        "Vary question styles (conceptual, practical, code-based if applicable). "
        "Return only the JSON array, no markdown fences or extra text."
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

        questions = json.loads(raw_text)
        if not isinstance(questions, list):
            raise ValueError("Expected a JSON array of questions")

        return questions

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse quiz JSON: {str(e)}")
    except anthropic.AuthenticationError:
        raise HTTPException(status_code=401, detail="Invalid Anthropic API key")
    except anthropic.RateLimitError:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please retry later.")
    except anthropic.APIStatusError as e:
        raise HTTPException(status_code=502, detail=f"Anthropic API error: {e.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz: {str(e)}")


@router.post("/evaluate")
async def evaluate_quiz(req: QuizEvaluateRequest):
    """Evaluate quiz answers and return score with per-question feedback."""
    if not req.questions:
        raise HTTPException(status_code=400, detail="No questions provided.")
    if len(req.answers) != len(req.questions):
        raise HTTPException(
            status_code=400,
            detail=f"Number of answers ({len(req.answers)}) must match "
                   f"number of questions ({len(req.questions)}).",
        )

    total = len(req.questions)
    score = 0
    feedback: List[str] = []

    for idx, (question, user_answer) in enumerate(zip(req.questions, req.answers)):
        correct_index = question.get("correctIndex", -1)
        options = question.get("options", [])
        explanation = question.get("explanation", "")
        question_text = question.get("question", f"Question {idx + 1}")

        is_correct = user_answer == correct_index

        if is_correct:
            score += 1
            correct_option = options[correct_index] if 0 <= correct_index < len(options) else "N/A"
            feedback.append(
                f"Q{idx + 1}: Correct! '{correct_option}' — {explanation}"
            )
        else:
            user_option = options[user_answer] if 0 <= user_answer < len(options) else "Invalid"
            correct_option = options[correct_index] if 0 <= correct_index < len(options) else "N/A"
            feedback.append(
                f"Q{idx + 1}: Incorrect. You chose '{user_option}', "
                f"but the correct answer is '{correct_option}'. {explanation}"
            )

    percentage = round((score / total) * 100, 1) if total > 0 else 0.0

    return {
        "score": score,
        "total": total,
        "percentage": percentage,
        "feedback": feedback,
    }

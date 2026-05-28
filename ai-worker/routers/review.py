import json
import subprocess
import tempfile
import os
import time
import anthropic
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

from config import ANTHROPIC_API_KEY, MODEL, MAX_TOKENS

router = APIRouter(prefix="/review", tags=["review"])

client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)


class CodeReviewRequest(BaseModel):
    code: str
    language: str
    context: str = ""


class CodeReviewResponse(BaseModel):
    quality: str        # "excellent" / "good" / "needs-improvement"
    timeComplexity: str
    spaceComplexity: str
    issues: List[str]
    suggestions: List[str]
    improvedCode: str
    explanation: str


class ExecuteRequest(BaseModel):
    code: str
    language: str  # "python" or "javascript"
    stdin: str = ""


@router.post("/code", response_model=CodeReviewResponse)
async def review_code(req: CodeReviewRequest):
    """Review code for correctness, complexity, style, and best practices."""
    system_prompt = (
        "You are an expert code reviewer with deep knowledge of software engineering "
        "best practices, algorithms, and multiple programming languages. "
        "Always respond with valid JSON only — no additional text or markdown fences."
    )

    context_section = f"\nContext: {req.context}" if req.context else ""

    user_prompt = (
        f"Review the following {req.language} code:{context_section}\n\n"
        f"```{req.language}\n{req.code}\n```\n\n"
        "Analyze it for correctness, time/space complexity, style, and best practices.\n"
        "Return a JSON object with exactly these fields:\n"
        '  - "quality": one of "excellent", "good", or "needs-improvement"\n'
        '  - "timeComplexity": string like "O(n)", "O(n log n)", "O(1)", etc.\n'
        '  - "spaceComplexity": string like "O(n)", "O(1)", etc.\n'
        '  - "issues": array of strings describing problems found (empty array if none)\n'
        '  - "suggestions": array of strings with improvement suggestions\n'
        '  - "improvedCode": string with the improved/refactored code\n'
        '  - "explanation": string with overall analysis summary\n'
        "Return only the JSON, no markdown fences or extra text."
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

        review_data = json.loads(raw_text)

        # Normalise quality value
        quality = review_data.get("quality", "good").lower()
        if quality not in ("excellent", "good", "needs-improvement"):
            quality = "good"

        return CodeReviewResponse(
            quality=quality,
            timeComplexity=review_data.get("timeComplexity", "Unknown"),
            spaceComplexity=review_data.get("spaceComplexity", "Unknown"),
            issues=review_data.get("issues", []),
            suggestions=review_data.get("suggestions", []),
            improvedCode=review_data.get("improvedCode", req.code),
            explanation=review_data.get("explanation", ""),
        )

    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse review JSON: {str(e)}")
    except anthropic.AuthenticationError:
        raise HTTPException(status_code=401, detail="Invalid Anthropic API key")
    except anthropic.RateLimitError:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Please retry later.")
    except anthropic.APIStatusError as e:
        raise HTTPException(status_code=502, detail=f"Anthropic API error: {e.message}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to review code: {str(e)}")


@router.post("/execute")
async def execute_code(req: ExecuteRequest):
    """Execute Python or JavaScript code in a subprocess (no Docker, MVP)."""
    language = req.language.lower().strip()
    if language not in ("python", "javascript"):
        raise HTTPException(
            status_code=400,
            detail="Only 'python' and 'javascript' execution is supported.",
        )

    suffix = ".py" if language == "python" else ".js"
    cmd_base = ["python3"] if language == "python" else ["node"]

    try:
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=suffix, delete=False, encoding="utf-8"
        ) as tmp:
            tmp.write(req.code)
            tmp_path = tmp.name

        start_ms = time.monotonic()
        result = subprocess.run(
            cmd_base + [tmp_path],
            input=req.stdin if req.stdin else None,
            capture_output=True,
            text=True,
            timeout=5,
            encoding="utf-8",
        )
        elapsed_ms = int((time.monotonic() - start_ms) * 1000)

        return {
            "output": result.stdout,
            "error": result.stderr,
            "exitCode": result.returncode,
            "executionTimeMs": elapsed_ms,
        }

    except subprocess.TimeoutExpired:
        return {
            "output": "",
            "error": "Execution timed out after 5 seconds.",
            "exitCode": -1,
            "executionTimeMs": 5000,
        }
    except FileNotFoundError as e:
        raise HTTPException(
            status_code=501,
            detail=f"Runtime not found: {str(e)}. Ensure python3/node is installed.",
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Execution failed: {str(e)}")
    finally:
        try:
            os.unlink(tmp_path)
        except Exception:
            pass

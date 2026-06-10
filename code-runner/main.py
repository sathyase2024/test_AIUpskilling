"""
SkillForge Code Runner — isolated execution service for the playground.

Runs as a separate Docker container so ML libraries (torch, tensorflow,
transformers, etc.) are pre-loaded and cached here without bloating the
backend image. The backend proxies Python requests here when CODE_RUNNER_URL
is configured; it falls back to local execution when not.
"""

import asyncio
import os
import tempfile
from typing import Optional

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="SkillForge Code Runner", docs_url=None, redoc_url=None)

MAX_CODE_BYTES = 50_000   # 50 KB — same limit as backend
TIMEOUT_SECS   = 15.0

# ── Language dispatch ─────────────────────────────────────────────────────────

RUNNERS: dict[str, tuple[list[str], str]] = {
    # language_id → (command_prefix, file_extension)
    "python":     (["python3"],                                       ".py"),
    "javascript": (["node"],                                          ".js"),
    "typescript": (["node", "--experimental-strip-types"],            ".ts"),
}

# ── Pydantic models ───────────────────────────────────────────────────────────

class ExecRequest(BaseModel):
    language: str
    code: str

class ExecResult(BaseModel):
    stdout: str
    stderr: str
    exitCode: int

# ── Available Python libraries ────────────────────────────────────────────────
# Keep this list in sync with requirements.txt so the capabilities endpoint
# is always truthful.

PYTHON_AVAILABLE = [
    "numpy", "pandas", "sklearn", "scipy", "matplotlib", "seaborn",
    "psutil", "torch", "tensorflow", "keras", "transformers", "datasets",
    "sentence_transformers", "pydantic",
]

# ── Endpoints ─────────────────────────────────────────────────────────────────

@app.get("/health")
def health():
    return {"status": "ok", "service": "code-runner"}


@app.get("/capabilities")
def capabilities():
    """
    Returns the extended Python library list.
    The backend merges this with its own capabilities when CODE_RUNNER_URL is set.
    """
    return {
        "python": {
            "available": PYTHON_AVAILABLE,
            "unavailable": [],
        },
        "languages": list(RUNNERS.keys()),
    }


@app.post("/execute", response_model=ExecResult)
async def execute(req: ExecRequest) -> ExecResult:
    lang = req.language.lower()

    if lang not in RUNNERS:
        return ExecResult(
            stdout="", exitCode=1,
            stderr=f"Language '{lang}' not supported by code-runner. Supported: {', '.join(RUNNERS)}.",
        )

    if len(req.code.encode("utf-8")) > MAX_CODE_BYTES:
        return ExecResult(stdout="", stderr="Code exceeds the 50 KB size limit.", exitCode=1)

    cmd_prefix, ext = RUNNERS[lang]

    # Strip stray markdown fences that lesson JSON may include
    code = req.code
    if lang == "python":
        import re
        code = re.sub(r"^```[a-z]*\n?", "", code, flags=re.MULTILINE)
        code = re.sub(r"^```$", "", code, flags=re.MULTILINE)

    fd, tmp_path = tempfile.mkstemp(suffix=ext, dir="/tmp")
    try:
        with os.fdopen(fd, "w") as f:
            f.write(code)

        cmd = cmd_prefix + [tmp_path]
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )

        try:
            out_bytes, err_bytes = await asyncio.wait_for(
                proc.communicate(), timeout=TIMEOUT_SECS
            )
            return ExecResult(
                stdout=out_bytes.decode("utf-8", errors="replace"),
                stderr=err_bytes.decode("utf-8", errors="replace"),
                exitCode=proc.returncode if proc.returncode is not None else 0,
            )
        except asyncio.TimeoutError:
            try:
                proc.kill()
                await proc.communicate()
            except Exception:
                pass
            return ExecResult(
                stdout="",
                stderr=f"Execution timed out ({int(TIMEOUT_SECS)}s limit).",
                exitCode=124,
            )
    finally:
        try:
            os.unlink(tmp_path)
        except OSError:
            pass

import logging
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import generate, review, quiz, rewrite
from config import get_client

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Fail fast if API key is missing
    try:
        get_client()
        logger.info("AI Worker ready — Anthropic client initialised")
    except RuntimeError as e:
        logger.error(f"Startup failed: {e}")
        raise
    yield


app = FastAPI(
    title="AI Worker Service",
    description="AI-Powered Upskilling Platform — lesson generation, code review, and quizzes",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS — restrict to configured frontend origin(s)
_raw_origins = os.getenv("ALLOWED_ORIGINS", os.getenv("FRONTEND_URL", "http://localhost:3000"))
_allowed_origins = [o.strip() for o in _raw_origins.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

# Include routers
app.include_router(generate.router)
app.include_router(review.router)
app.include_router(quiz.router)
app.include_router(rewrite.router)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "ai-worker"}


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

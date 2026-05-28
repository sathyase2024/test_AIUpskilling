import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import generate, review, quiz

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("AI Worker ready")
    yield


app = FastAPI(
    title="AI Worker Service",
    description="AI-Powered Upskilling Platform — lesson generation, code review, and quizzes",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS middleware — allow all origins for MVP
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(generate.router)
app.include_router(review.router)
app.include_router(quiz.router)


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "model": "claude-sonnet-4-6"}


if __name__ == "__main__":
    import os
    import uvicorn

    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

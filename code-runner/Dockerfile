# ── Build stage: install heavy ML libraries ───────────────────────────────────
# Use python:3.11-slim (Debian-based) — Alpine has poor binary wheel support
# for PyTorch and TensorFlow, forcing slow source compilation.
FROM python:3.11-slim AS builder

WORKDIR /build

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc g++ && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements first so Docker layer cache is reused on code-only changes.
COPY requirements.txt .

# Install into a prefix we can copy to the runner stage.
# --no-cache-dir keeps the layer small.
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM python:3.11-slim AS runner

WORKDIR /app

# Bring in the installed packages from the builder stage.
COPY --from=builder /install /usr/local

# Application code.
COPY main.py .

# Non-root user: prevents code running as root inside the container.
RUN useradd -m -u 1001 coderunner && \
    chown coderunner:coderunner /app

USER coderunner

EXPOSE 8001

# 2 workers: handles concurrent executions without blocking the event loop.
# Increase to 4 on multi-core hosts.
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001", "--workers", "2"]

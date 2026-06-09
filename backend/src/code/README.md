# Code Execution Sandbox

The playground that runs lesson code. Its capabilities are defined in **one
place** — [`sandbox.config.ts`](./sandbox.config.ts) — and surfaced to the
frontend via `GET /code/capabilities`, so the UI never drifts from what is
actually installed.

## Architecture

```
sandbox.config.ts ─── single source of truth (languages, aliases, Python libs)
      │
      ├─► code.service.ts      dispatches execution per language id
      ├─► code.controller.ts   GET /code/capabilities exposes the config
      │
      └─► frontend/lib/sandbox.ts  fetches /code/capabilities (static fallback)
              │
              ├─► LearnClient.tsx     decides which lesson code is runnable
              └─► EmbeddedEditor.tsx  the playground UI
```

When a new program/course needs the compiler to support new languages or
libraries, you update the config + Dockerfile and everything else follows.

## Add support for a new course's language

1. **`sandbox.config.ts`** — add a `LANGUAGES` entry: `id`, `label`,
   `aliases` (every string lessons/clients might send), `available: true`.
2. **`code.service.ts`** — add a `runXxx(code)` runner and register it in the
   `runners` map under the same `id`.
3. **`../../Dockerfile`** (`backend/Dockerfile`) — install the runtime in the
   `runner` stage (`apk add ...`).
4. **Frontend (optional UI polish)** — add starter code + a Monaco language id
   to the `LANGUAGES` map in `frontend/components/EmbeddedEditor.tsx` so the
   language gets a toolbar button. Availability/alias logic needs no change —
   it reads `/code/capabilities`.

## Add a Python library

1. **`sandbox.config.ts`** — add the import name to
   `PYTHON_AVAILABLE_LIBRARIES` (and remove it from
   `PYTHON_UNAVAILABLE_LIBRARIES` if present).
2. **`backend/Dockerfile`** — install it, preferring Alpine `py3-*` packages
   (pip would compile from source on musl).

That's it — the frontend will stop treating that library's lesson code as
"unrunnable" automatically, and the missing-module hint stays accurate.

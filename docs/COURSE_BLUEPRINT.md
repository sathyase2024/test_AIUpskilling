# Course Architecture Blueprint

The contract every course must follow. `scripts/validate-course-content.mjs`
enforces it mechanically and `backend/src/assessment/course-content.spec.ts`
runs it in CI — a course that violates this document fails the build.

## 1. Anatomy of a course

```
generated_lessons/<course-slug>/
├── curriculum.json            # ordered lesson plan
├── lesson_00_<slug>.json      # lessons, contiguous from 00
├── lesson_01_<slug>.json
│   ...                        # ≥ 20 lessons (standard: 35)
└── assessment.json            # module quizzes + final exam (REQUIRED)
```

- **Course slug** — kebab-case (`^[a-z0-9]+(-[a-z0-9]+)*$`). It is the
  directory name, the `Topic.slug` in the database, the URL segment
  (`/learn/<slug>`), and `assessment.json#courseSlug`. They must all match.
- **Lessons** — files named `lesson_NN_<kebab-title>.json` with `NN`
  contiguous from `00`. A lesson's **order** (used everywhere else) is
  `NN + 1` (1-based): `lesson_00` ⇒ `lessonOrder 1`.
- **Registration** — add the course to `GENERATED_TOPIC_META` in
  `backend/src/topics/topics.service.ts` and to `courses_catalogue.json` so it
  is seeded and listed.

## 2. Assessment contract (`assessment.json`)

Every course ships module quizzes **and a final exam** — the Take Final Exam
button renders for any course whose assessment includes `finalExam`, so a
missing file silently removes the feature. That is a build failure now.

```jsonc
{
  "courseSlug": "<course-slug>",       // must equal the directory name
  "generatedWith": "claude",
  "passThreshold": 80,                  // integer 50–100
  "modules": [                          // partition of ALL lessons
    {
      "index": 0,                       // == array position
      "title": "Foundations",
      "lessonOrders": [1, 2, 3, 4, 5, 6],
      "questions": [ /* ≥ 4, standard 5 */ ]
    }
    // standard split for 35 lessons: 6 modules —
    // Foundations [1-6], Core Skills [7-12], Applied Practice [13-18],
    // Advanced Topics [19-24], Production & Scale [25-30],
    // Mastery & Capstone [31-35]
  ],
  "finalExam": {
    "passThreshold": 80,
    "questions": [ /* 20–40, standard 24, spanning ≥ 4 modules */ ]
  }
}
```

Question shape (module and final; final additionally carries `moduleIndex`):

```jsonc
{
  "question": "...",        // ≥ 20 chars; scenario-based preferred
  "options": ["...", "...", "...", "..."],  // exactly 4, unique, non-empty
  "answer": 2,               // index 0–3 (kept server-side; see §4)
  "explanation": "...",      // ≥ 20 chars; teaches, not just restates
  "lessonOrder": 14,         // the lesson this question tests
  "moduleIndex": 2           // final-exam questions only
}
```

Hard rules the validator enforces:

- `modules[*].lessonOrders` **partition** `1..lessonCount` — every lesson in
  exactly one module.
- Module question `lessonOrder` must belong to that module's `lessonOrders`.
- Final exam: 20–40 questions, every `moduleIndex` references a real module,
  and questions span at least 4 modules.
- Thresholds are integers in 50–100.

Authoring quality bar (reviewed, not machine-checked): questions must be
grounded in actual lesson content; distractors plausible; correct answers
spread across option positions; final-exam questions more integrative than
module questions.

## 3. Runtime architecture

```
Next.js LearnClient ──► /api/proxy ──► NestJS AssessmentController
                                            │
                       GET  /assessment/:slug            → PublicAssessment (no answers)
                       POST /assessment/:slug/grade      → grade only, no persistence (guests)
                       POST /assessment/:slug/module/:i/submit  (JWT)
                       POST /assessment/:slug/final/submit      (JWT)
                       GET  /assessment/:slug/results           (JWT)
                                            │
                                  AssessmentService
                                  ├─ slug allow-list regex (no path traversal)
                                  ├─ in-memory assessment cache (files are immutable)
                                  ├─ grade(): score, wrongLessonOrders, per-question review
                                  ├─ best-score retention on retakes (module AND final)
                                  └─ pass ⇒ ProgressService marks lessons complete
```

Design rules:

1. **Answers never leave the server before grading.** `GET /assessment/:slug`
   strips `answer` and `explanation`; the submit/grade response carries a
   per-question `review` (`correctAnswer`, `explanation`, `correct`) for the
   results UI. Do not add any endpoint that returns raw assessment JSON.
2. **Course slugs are validated** against the kebab-case regex before any
   filesystem access.
3. **Signed-out users grade via `POST /grade`** — same engine, nothing
   persisted. Never grade client-side.
4. **Retakes keep the best stored score** for both module and final results;
   the response still reports the actual attempt honestly.
5. **`markLessonsComplete` must never run with an empty `lessonOrders`** — an
   empty TypeORM `where: []` matches every row.
6. The frontend renders modules with `groupLessonsIntoModules()`
   (`frontend/lib/modules.ts`); `assessment.json` module boundaries must use
   the same split so quiz buttons line up with sidebar modules.

## 4. Checklist for shipping a new course

1. Create `generated_lessons/<slug>/` with `curriculum.json` and
   `lesson_00..lesson_NN` (standard 35 lessons).
2. Author `assessment.json` per §2 (6 modules × 5 questions + 24-question
   final exam at threshold 80, unless the course size dictates otherwise).
3. Register the course in `GENERATED_TOPIC_META` and `courses_catalogue.json`.
4. Run `node scripts/validate-course-content.mjs <slug>` → must print `✓`.
5. Run `cd backend && npm test` → course-content and assessment-service
   suites must pass.
6. Manual smoke: open `/learn/<slug>` — module test-out buttons appear per
   module, the **Take Final Exam** button shows in the sidebar footer, and a
   passing final flips the course to "Course Complete!".

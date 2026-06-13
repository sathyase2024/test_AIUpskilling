-- =============================================================================
-- Restore lesson contentJson from the untouched `content` backup column.
--
-- WHY THIS EXISTS
-- ---------------
-- The ai-worker rewrite job (/rewrite/content) had an index-misalignment bug:
-- when rewriting paragraphs AND analogies together, splitting a paragraph grew
-- the sections array and shifted later indices, so analogy text was written onto
-- paragraph-type sections. Result: analogies appeared as body text inside
-- paragraphs (notably in "Python for AI & ML" and "PyTorch Deep Learning").
--
-- WHY THIS IS SAFE
-- ----------------
-- `AiService.saveLessonContent()` (the only path the rewrite job used) updates
-- ONLY the `contentJson` column. It never touches `content`. At generation time
-- `generateLesson()` sets `content = JSON.stringify(response.data)` — i.e. the
-- `content` text column still holds the pristine, pre-rewrite lesson JSON.
--
-- This script copies that pristine backup back into `contentJson`. It is a
-- no-op for any lesson that was never rewritten (its content already matches),
-- and it only runs on rows whose `content` is a valid JSON object containing a
-- `sections` array (guards against legacy/markdown/null content rows).
--
-- Postgres 16 `IS JSON OBJECT` + a CASE guard ensure the ::jsonb cast is only
-- evaluated for rows that are actually JSON objects, so no row can abort the run.
--
-- HOW TO RUN (on the VPS, against the postgres container)
-- -------------------------------------------------------
--   docker exec -i skillforge-postgres-1 \
--     psql -U skillforge -d skillforge < scripts/restore-original-lesson-content.sql
-- =============================================================================

\echo '--- BEFORE: lessons with analogy text leaked into a paragraph section ---'
SELECT count(*) AS corrupted_lessons
FROM lessons
WHERE jsonb_path_exists(
  "contentJson",
  '$.sections[*] ? (@.type == "paragraph" && @.content like_regex "Think of it like")'
);

\echo '--- Restoring contentJson from the content backup column ---'
BEGIN;

UPDATE lessons AS l
SET "contentJson" = c.j
FROM (
  SELECT id,
         CASE WHEN content IS JSON OBJECT THEN content::jsonb END AS j
  FROM lessons
  WHERE "isGenerated" = true
) c
WHERE l.id = c.id
  AND c.j IS NOT NULL
  AND c.j ? 'sections';

COMMIT;

\echo '--- AFTER: should be 0 ---'
SELECT count(*) AS corrupted_lessons
FROM lessons
WHERE jsonb_path_exists(
  "contentJson",
  '$.sections[*] ? (@.type == "paragraph" && @.content like_regex "Think of it like")'
);

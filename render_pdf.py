"""Render sample lessons to a styled PDF for validation."""
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

import sample_lessons
from weasyprint import HTML

LESSON_TYPE_COLORS = {
    "reading": "#3b82f6",
    "exercise": "#10b981",
    "quiz": "#8b5cf6",
    "project": "#f59e0b",
}

LESSON_TYPE_LABELS = {
    "reading": "📖 Reading",
    "exercise": "⚡ Exercise",
    "quiz": "🧠 Quiz",
    "project": "🚀 Project",
}

def html_escape(s):
    return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def render_section(sec):
    t = sec.get("type", "")
    content = sec.get("content", "")
    language = sec.get("language", "") or "text"
    level = sec.get("level", 2)
    items = sec.get("items", [])
    answer = sec.get("answer", -1)
    explanation = sec.get("explanation", "")

    if t == "heading":
        tag = f"h{level}"
        cls = "h2" if level == 2 else "h3"
        return f'<{tag} class="{cls}">{html_escape(content)}</{tag}>'

    elif t == "paragraph":
        return f'<p>{html_escape(content)}</p>'

    elif t == "code":
        return (
            f'<div class="code-block">'
            f'<div class="code-lang">{html_escape(language)}</div>'
            f'<pre><code>{html_escape(content)}</code></pre>'
            f'</div>'
        )

    elif t == "info_box":
        return f'<div class="info-box"><strong>💡 </strong>{html_escape(content)}</div>'

    elif t == "warning_box":
        return f'<div class="warning-box"><strong>⚠️ </strong>{html_escape(content)}</div>'

    elif t == "key_points":
        lis = "".join(f"<li>{html_escape(item)}</li>" for item in items)
        return f'<div class="key-points"><strong>Key Points</strong><ul>{lis}</ul></div>'

    elif t == "quiz":
        opts_html = ""
        for i, opt in enumerate(items):
            marker = "correct" if i == answer else ""
            label = ["A", "B", "C", "D"][i] if i < 4 else str(i)
            opts_html += (
                f'<div class="quiz-option {marker}">'
                f'<span class="quiz-label">{label}</span> {html_escape(opt)}'
                f'</div>'
            )
        exp_html = f'<div class="quiz-explanation"><strong>Explanation:</strong> {html_escape(explanation)}</div>' if explanation else ""
        return (
            f'<div class="quiz-block">'
            f'<p class="quiz-question"><strong>Q:</strong> {html_escape(content)}</p>'
            f'{opts_html}'
            f'{exp_html}'
            f'</div>'
        )

    else:
        return f'<p>{html_escape(content)}</p>'


def render_lesson(lesson, index):
    color = LESSON_TYPE_COLORS.get(lesson["type"], "#6366f1")
    type_label = LESSON_TYPE_LABELS.get(lesson["type"], lesson["type"].title())
    sections_html = "\n".join(render_section(s) for s in lesson.get("sections", []))

    return f"""
    <div class="lesson" style="border-top: 4px solid {color};">
        <div class="lesson-header">
            <div class="lesson-meta">
                <span class="type-badge" style="background:{color};">{type_label}</span>
                <span class="meta-item">⏱ {lesson.get("estimatedMinutes", 0)} min</span>
                <span class="meta-item">⭐ {lesson.get("xpReward", 0)} XP</span>
            </div>
            <h1 class="lesson-title">{html_escape(lesson.get("title", ""))}</h1>
            <p class="topic-name">Topic: {html_escape(lesson.get("topicName", ""))}</p>
        </div>
        <div class="lesson-body">
            {sections_html}
        </div>
    </div>
    """


CSS = """
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 10.5pt;
    line-height: 1.65;
    color: #1e293b;
    background: #fff;
}

@page {
    margin: 18mm 16mm;
    @bottom-center {
        content: "AI Upskilling Platform — Sample Lesson Validation • Page " counter(page) " of " counter(pages);
        font-size: 8pt;
        color: #94a3b8;
    }
}

/* Cover page */
.cover {
    page-break-after: always;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 240mm;
    text-align: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%);
    color: white;
    margin: -18mm -16mm;
    padding: 40mm 20mm;
}
.cover h1 { font-size: 28pt; font-weight: 700; margin-bottom: 8mm; letter-spacing: -0.5px; }
.cover h2 { font-size: 14pt; font-weight: 400; opacity: 0.8; margin-bottom: 16mm; }
.cover .toc { text-align: left; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 6mm 10mm; width: 100%; max-width: 140mm; }
.cover .toc h3 { font-size: 10pt; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6; margin-bottom: 4mm; }
.cover .toc-item { display: flex; align-items: center; gap: 8px; padding: 2mm 0; font-size: 10pt; border-bottom: 1px solid rgba(255,255,255,0.1); }
.cover .toc-item:last-child { border-bottom: none; }
.cover .toc-badge { padding: 1px 8px; border-radius: 4px; font-size: 8pt; font-weight: 600; white-space: nowrap; }
.cover .date { margin-top: 10mm; font-size: 9pt; opacity: 0.5; }

/* Lesson container */
.lesson {
    page-break-before: always;
    padding-bottom: 8mm;
}

.lesson-header {
    padding: 6mm 0 5mm;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 6mm;
}

.lesson-meta { display: flex; gap: 12px; align-items: center; margin-bottom: 3mm; flex-wrap: wrap; }

.type-badge {
    color: white;
    padding: 2px 10px;
    border-radius: 4px;
    font-size: 8.5pt;
    font-weight: 600;
    letter-spacing: 0.3px;
}

.meta-item { font-size: 9pt; color: #64748b; }

.lesson-title {
    font-size: 18pt;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.25;
    margin-bottom: 2mm;
}

.topic-name { font-size: 9pt; color: #64748b; }

/* Section styles */
.lesson-body { padding-top: 2mm; }

h2.h2 {
    font-size: 13pt;
    font-weight: 700;
    color: #0f172a;
    margin: 6mm 0 3mm;
    padding-bottom: 2mm;
    border-bottom: 2px solid #e2e8f0;
}

h3.h3 {
    font-size: 11pt;
    font-weight: 600;
    color: #334155;
    margin: 4mm 0 2mm;
}

p {
    margin: 0 0 3.5mm;
    color: #334155;
    text-align: justify;
}

/* Code blocks */
.code-block {
    background: #0f172a;
    border-radius: 6px;
    margin: 4mm 0;
    overflow: hidden;
    page-break-inside: avoid;
}

.code-lang {
    background: #1e293b;
    color: #94a3b8;
    font-size: 7.5pt;
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    padding: 2mm 4mm;
    text-transform: lowercase;
    letter-spacing: 0.5px;
    border-bottom: 1px solid #334155;
}

pre {
    margin: 0;
    padding: 4mm;
    overflow-x: auto;
}

code {
    font-family: 'JetBrains Mono', 'Courier New', monospace;
    font-size: 8.5pt;
    color: #e2e8f0;
    line-height: 1.55;
    white-space: pre-wrap;
    word-break: break-word;
}

/* Info / warning boxes */
.info-box {
    background: #eff6ff;
    border-left: 4px solid #3b82f6;
    padding: 3mm 4mm;
    margin: 4mm 0;
    border-radius: 0 6px 6px 0;
    font-size: 10pt;
    color: #1e3a5f;
    page-break-inside: avoid;
}

.warning-box {
    background: #fefce8;
    border-left: 4px solid #eab308;
    padding: 3mm 4mm;
    margin: 4mm 0;
    border-radius: 0 6px 6px 0;
    font-size: 10pt;
    color: #713f12;
    page-break-inside: avoid;
}

/* Key points */
.key-points {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    padding: 3mm 4mm;
    margin: 4mm 0;
    page-break-inside: avoid;
}

.key-points strong {
    display: block;
    font-size: 9pt;
    text-transform: uppercase;
    letter-spacing: 0.8px;
    color: #64748b;
    margin-bottom: 2mm;
}

.key-points ul {
    padding-left: 5mm;
}

.key-points li {
    margin-bottom: 1.5mm;
    color: #334155;
    font-size: 10pt;
}

/* Quiz */
.quiz-block {
    background: #faf5ff;
    border: 1px solid #e9d5ff;
    border-radius: 6px;
    padding: 3mm 4mm;
    margin: 4mm 0;
    page-break-inside: avoid;
}

.quiz-question {
    color: #1e1b4b;
    margin-bottom: 2mm !important;
    font-size: 10.5pt;
}

.quiz-option {
    display: flex;
    gap: 6px;
    padding: 1.5mm 2mm;
    margin: 1mm 0;
    border-radius: 4px;
    font-size: 9.5pt;
    color: #4c1d95;
    align-items: flex-start;
}

.quiz-option.correct {
    background: #dcfce7;
    color: #14532d;
    font-weight: 500;
}

.quiz-label {
    font-weight: 700;
    min-width: 14px;
    flex-shrink: 0;
}

.quiz-explanation {
    margin-top: 2mm;
    padding-top: 2mm;
    border-top: 1px solid #e9d5ff;
    font-size: 9pt;
    color: #4c1d95;
    font-style: italic;
}
"""


def build_html(lessons):
    cover_items = ""
    colors = LESSON_TYPE_COLORS
    for i, l in enumerate(lessons, 1):
        c = colors.get(l["type"], "#6366f1")
        label = LESSON_TYPE_LABELS.get(l["type"], l["type"])
        cover_items += (
            f'<div class="toc-item">'
            f'<span class="toc-badge" style="background:{c};">{label}</span>'
            f' {html_escape(l["title"])}'
            f'</div>'
        )

    cover = f"""
    <div class="cover">
        <h1>AI Upskilling Platform</h1>
        <h2>Sample Lesson Validation — 5 Lessons Across Types</h2>
        <div class="toc">
            <h3>Contents</h3>
            {cover_items}
        </div>
        <p class="date">Generated 2026-05-29 · Powered by Claude claude-sonnet-4-6</p>
    </div>
    """

    lessons_html = "\n".join(render_lesson(l, i) for i, l in enumerate(lessons, 1))
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>{CSS}</style>
</head>
<body>
{cover}
{lessons_html}
</body>
</html>"""


if __name__ == "__main__":
    lessons = sample_lessons.lessons
    html = build_html(lessons)

    html_path = "/home/user/test_AIUpskilling/sample_lessons_validation.html"
    pdf_path = "/home/user/test_AIUpskilling/sample_lessons_validation.pdf"

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)

    print("Rendering PDF…")
    HTML(filename=html_path).write_pdf(pdf_path)
    print(f"Done → {pdf_path}")

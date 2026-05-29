"""Haiku full-prompt validation — includes Under the Hood + Common Patterns."""
import json, os, sys
sys.path.insert(0, "/home/user/test_AIUpskilling/ai-worker")
import anthropic

HAIKU = "claude-haiku-4-5-20251001"

def _schema():
    return (
        "Return a JSON object with this exact schema:\n"
        "{\n"
        '  "lessonId": "<provided lessonId>",\n'
        '  "title": "<lesson title>",\n'
        '  "type": "<lesson type>",\n'
        '  "topicName": "<topic name>",\n'
        '  "estimatedMinutes": <integer>,\n'
        '  "xpReward": <integer>,\n'
        '  "generated": true,\n'
        '  "sections": [ { "type": "...", "content": "...", "language": "...", "level": 2, "items": [], "answer": -1, "explanation": "" } ]\n'
        "}\n\n"
        "Section types:\n"
        '- "heading": content=heading text, level=2 or 3\n'
        '- "paragraph": content=rich explanatory text (minimum 80 words, explain WHY not just WHAT)\n'
        '- "analogy": content=cricket analogy starting with "🏏 Think of it like cricket:"\n'
        '- "code": content=full working code, language=language name\n'
        '- "info_box": content=pro tip starting with "Pro Tip:"\n'
        '- "warning_box": content=common mistake starting with "Warning:"\n'
        '- "key_points": items=array of 5-7 detailed bullet strings\n'
        '- "quiz": content=question, items=4 options, answer=correct index (0-3), explanation=40+ words\n\n'
        "Return only valid JSON. No markdown fences.\n\n"
    )

def _build_prompt():
    hobby = "cricket"
    ai = (
        f"6-10 sentences: (a) specific {hobby} scenario with real player names/situations, "
        f"(b) map each part of the concept to its {hobby} equivalent explicitly, "
        f"(c) state the insight this parallel reveals."
    )
    analogy_rule = (
        f"\n=== PERSONALISATION RULE (interest: {hobby}) ===\n"
        f"STEP 1 — PARAGRAPH: Pure technical. No {hobby}.\n"
        f"STEP 2 — ANALOGY: Deep, 6-10 sentences. Start '🏏 Think of it like {hobby}:'. "
        f"Use real player names (Rohit Sharma, Bumrah, Kohli), real match situations, precise {hobby} terminology.\n"
        f"STEP 3 — CODE: Uses {hobby}-themed class names and sample data.\n"
        f"=== END PERSONALISATION RULE ===\n"
    )

    ctx = (
        "Topic: Java Mastery\nCategory: Backend Development\n"
        "Lesson Title: Object-Oriented Programming — Core Concepts\n"
        "Lesson ID: haiku-full-1\nDifficulty: beginner\n"
        + analogy_rule + "\n"
    )

    sections = f"""Include ALL sections in EXACTLY this order:

1.  heading (level 2): Overview
2.  paragraph: Why OOP was invented, what breaks without it. Min 100 words. Pure technical.
3.  analogy: {ai}
4.  heading (level 2): Core Concepts
    For EACH concept (Encapsulation, Inheritance, Polymorphism, Abstraction):
      a. heading (level 3): [Concept Name]
      b. paragraph: This concept only — definition, mechanics, why it exists. Min 80 words. Pure technical.
      c. analogy: Map THIS concept to {hobby}. {ai}
    4 concepts = 12 sections.
5.  code: Single complete Java example using ALL 4 concepts with {hobby}-themed names/data.
6.  paragraph: Code walkthrough — how each concept appears, runtime behaviour. Min 80 words.
7.  heading (level 2): How It Works Under the Hood
8.  paragraph: JVM internals — vtable dispatch, object layout, memory model. Min 120 words. Pure technical.
9.  analogy: {ai}
10. code: Advanced usage pattern with {hobby}-themed data.
11. heading (level 2): Common Patterns & Best Practices
12. paragraph: 2-3 OOP design patterns with reasoning — why pattern A over B. Min 100 words. Pure technical.
13. analogy: {ai}
14. code: Best practice vs anti-pattern with {hobby}-themed objects.
15. info_box: Non-obvious production insight. Start "Pro Tip:".
16. warning_box: Most common beginner mistake. Start "Warning:".
17. heading (level 2): Real-World Application
18. paragraph: OOP in production — Spring, Hibernate, real systems. Min 80 words.
19. key_points: 6-7 detailed takeaway bullets.
20. quiz: Conceptual question on one OOP concept. 4 options, correct index, 40+ word explanation.
21. quiz: Applied scenario question. 4 options, correct index, 40+ word explanation."""

    return ctx + _schema() + f"""Generate a DEEP reading lesson on "Object-Oriented Programming — Core Concepts" for "Java Mastery".
{sections}
Set estimatedMinutes to 35. Set xpReward to 75."""

def generate():
    client = anthropic.Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
    resp = client.messages.create(
        model=HAIKU,
        max_tokens=16000,
        system=[{"type":"text","text":"You are an expert technical educator. Generate structured lesson content as valid JSON only. No markdown outside JSON.","cache_control":{"type":"ephemeral"}}],
        messages=[{"role":"user","content":_build_prompt()}],
    )
    raw = resp.content[0].text.strip()
    if raw.startswith("```"):
        lines = raw.split("\n")
        raw = "\n".join(lines[1:-1]) if len(lines) > 2 else raw
    u = resp.usage
    print(f"  stop={resp.stop_reason} | input={u.input_tokens} output={u.output_tokens}")
    print(f"  chars={len(raw)}")
    return json.loads(raw)

if __name__ == "__main__":
    print("Generating full Haiku lesson (with Under the Hood + Patterns)...")
    lesson = generate()
    secs = lesson["sections"]
    h2s = [s for s in secs if s["type"]=="heading" and s.get("level")==2]
    h3s = [s for s in secs if s["type"]=="heading" and s.get("level")==3]
    analogies = [s for s in secs if s["type"]=="analogy"]
    codes = [s for s in secs if s["type"]=="code"]
    print(f"  Sections={len(secs)} H2={len(h2s)} H3={len(h3s)} Analogies={len(analogies)} Code={len(codes)}")
    for i,a in enumerate(analogies,1):
        print(f"  Analogy {i}: {len(a['content'].split())} words")

    with open("haiku_lesson_full.json","w") as f:
        json.dump(lesson, f, indent=2)

    from render_pdf import build_html
    from weasyprint import HTML
    HTML(string=build_html([lesson]), base_url=".").write_pdf("sample_lessons_haiku_full.pdf")
    print("PDF saved: sample_lessons_haiku_full.pdf")

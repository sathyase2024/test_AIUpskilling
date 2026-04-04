"use client";

import { useMemo, useState } from "react";
import type { GeneratedModule } from "@/lib/types";

const tabs = ["Concept", "Analogy", "Example", "Exercise", "Quiz", "Notes"] as const;
type TabKey = (typeof tabs)[number];

type Props = {
  module: GeneratedModule;
};

export function ModuleViewer({ module }: Props) {
  const [activeTab, setActiveTab] = useState<TabKey>("Concept");
  const [revealed, setRevealed] = useState<TabKey[]>(["Concept"]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const sectionOrder: TabKey[] = [
    "Concept",
    "Analogy",
    "Example",
    "Exercise",
    "Quiz",
    "Notes",
  ];

  const allAnswered = module.quiz.every((_, index) => Boolean(answers[index]));
  const score = useMemo(() => {
    if (!submitted) {
      return null;
    }
    const correct = module.quiz.reduce((acc, item, index) => {
      return acc + (answers[index] === item.answer ? 1 : 0);
    }, 0);
    return {
      correct,
      total: module.quiz.length,
      percent: module.quiz.length
        ? Math.round((correct / module.quiz.length) * 100)
        : 0,
    };
  }, [answers, module.quiz, submitted]);

  const revealNext = () => {
    const currentIndex = sectionOrder.indexOf(activeTab);
    const next = sectionOrder[currentIndex + 1];
    if (!next) {
      return;
    }
    setRevealed((prev) => (prev.includes(next) ? prev : [...prev, next]));
    setActiveTab(next);
  };

  return (
    <article className="panel">
      <header className="panel-header">
        <div>
          <h3>{module.title}</h3>
          <p>{module.objective}</p>
        </div>
        <span className="quality-pill">Validation: {module.validation.score}/100</span>
      </header>

      <nav className="tabs">
        {tabs.map((tab) => {
          const isUnlocked = revealed.includes(tab);
          return (
            <button
              key={tab}
              type="button"
              disabled={!isUnlocked}
              className={activeTab === tab ? "tab active" : "tab"}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          );
        })}
      </nav>

      <section className="tab-panel">
        {activeTab === "Concept" && <p>{module.concept}</p>}
        {activeTab === "Analogy" && <p>{module.analogy}</p>}
        {activeTab === "Example" && <p>{module.example}</p>}
        {activeTab === "Exercise" && <p>{module.exercise}</p>}
        {activeTab === "Notes" && <p>{module.notes}</p>}
        {activeTab === "Quiz" && (
          <div className="quiz-block">
            {module.quiz.map((item, index) => (
              <div key={`${module.id}-q-${index}`} className="quiz-card">
                <h4>
                  Q{index + 1}. {item.question}
                </h4>
                <div className="quiz-options">
                  {item.options.map((option) => {
                    const active = answers[index] === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        className={active ? "option active" : "option"}
                        onClick={() =>
                          setAnswers((prev) => ({
                            ...prev,
                            [index]: option,
                          }))
                        }
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="quiz-footer">
              <button
                type="button"
                className="primary"
                disabled={!allAnswered}
                onClick={() => setSubmitted(true)}
              >
                Submit Quiz
              </button>
              {score ? (
                <p className="score-card">
                  Score: {score.correct}/{score.total} ({score.percent}%)
                </p>
              ) : null}
            </div>
          </div>
        )}
      </section>

      <footer className="actions">
        <button type="button" className="primary" onClick={revealNext}>
          Reveal next section
        </button>
        <p className="muted">
          Quality score: {module.validation.score}/100 (iterations: {module.iterations})
        </p>
      </footer>

    </article>
  );
}

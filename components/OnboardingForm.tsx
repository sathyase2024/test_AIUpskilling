"use client";

import { useMemo, useState } from "react";
import type { IntakeProfile } from "@/lib/types";

type Props = {
  onGenerate: (profile: IntakeProfile) => Promise<void>;
  loading: boolean;
};

const interests = [
  "AI Engineering",
  "Data Analytics",
  "Product Management",
  "Backend Development",
  "Cloud Architecture",
  "Cybersecurity",
];

const levels = ["Beginner", "Intermediate", "Advanced"] as const;
const goals = ["Job prep", "Upskilling", "Certification", "Project"] as const;

export function OnboardingForm({ onGenerate, loading }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<IntakeProfile>({
    interest: "",
    experience_level: "Beginner",
    goal: "Upskilling",
    time_commitment: 4,
  });

  const canContinue = useMemo(() => {
    if (step === 1) return form.interest.trim().length > 2;
    if (step === 4) return form.time_commitment > 0;
    return true;
  }, [form.interest, form.time_commitment, step]);

  const update = <K extends keyof IntakeProfile>(key: K, value: IntakeProfile[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => setStep((s) => Math.min(4, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    await onGenerate(form);
  };

  return (
    <section className="panel">
      <header className="panel-header">
        <h2>Tell us about your learning journey</h2>
        <p>Step {step} of 4</p>
      </header>

      {step === 1 && (
        <div className="flow">
          <label htmlFor="interest">What do you want to learn?</label>
          <input
            id="interest"
            value={form.interest}
            onChange={(e) => update("interest", e.target.value)}
            placeholder="e.g., Prompt engineering for AI products"
          />
          <div className="chips">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                className="chip"
                onClick={() => update("interest", interest)}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="flow">
          <label>Experience level</label>
          <div className="grid-select">
            {levels.map((level) => (
              <button
                key={level}
                type="button"
                className={form.experience_level === level ? "select active" : "select"}
                onClick={() => update("experience_level", level)}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flow">
          <label>Primary goal</label>
          <div className="grid-select">
            {goals.map((goal) => (
              <button
                key={goal}
                type="button"
                className={form.goal === goal ? "select active" : "select"}
                onClick={() => update("goal", goal)}
              >
                {goal}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flow">
          <label htmlFor="hours">Hours per week</label>
          <input
            id="hours"
            type="number"
            min={1}
            max={30}
            value={form.time_commitment}
            onChange={(e) => update("time_commitment", Number(e.target.value))}
          />
        </div>
      )}

      <footer className="actions">
        <button type="button" onClick={back} disabled={step === 1 || loading}>
          Back
        </button>
        {step < 4 ? (
          <button type="button" onClick={next} disabled={!canContinue || loading}>
            Continue
          </button>
        ) : (
          <button type="button" onClick={submit} disabled={!canContinue || loading}>
            {loading ? "Generating..." : "Generate personalized course"}
          </button>
        )}
      </footer>
    </section>
  );
}

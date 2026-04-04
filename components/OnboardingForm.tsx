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
    first_name: "",
    last_name: "",
    email: "",
    current_role: "Software Engineer",
    interest: "",
    experience_level: "Beginner",
    goal: "Upskilling",
    time_commitment: 4,
  });

  const canContinue = useMemo(() => {
    if (step === 1) {
      return (
        form.first_name.trim().length >= 2 &&
        form.last_name.trim().length >= 2 &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
        form.current_role.trim().length >= 2
      );
    }
    if (step === 2) return form.interest.trim().length > 2;
    if (step === 5) return form.time_commitment > 0;
    return true;
  }, [form, step]);

  const update = <K extends keyof IntakeProfile>(key: K, value: IntakeProfile[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const submit = async () => {
    await onGenerate(form);
  };

  return (
    <section className="panel">
      <header className="brand-header">
        <div className="logo-block">
          <div className="logo-mark">SV</div>
          <div>
            <h2 className="brand-title">
              Skill<span>Veris</span>
            </h2>
            <p className="brand-caption">powered by Sri Hayavadhana</p>
          </div>
        </div>
        <h3 className="welcome-title">Let's get you started</h3>
        <p className="welcome-subtitle">
          Tell us a bit about yourself. This helps personalize your AI-powered skill journey.
        </p>
        <p className="step-label">Step {step} of 5</p>
      </header>

      {step === 1 && (
        <div className="flow">
          <label htmlFor="first-name">First name</label>
          <input
            id="first-name"
            value={form.first_name}
            onChange={(e) => update("first_name", e.target.value)}
            placeholder="e.g., Rahul"
          />
          <label htmlFor="last-name">Last name</label>
          <input
            id="last-name"
            value={form.last_name}
            onChange={(e) => update("last_name", e.target.value)}
            placeholder="e.g., Sharma"
          />
          <label htmlFor="email">Work or personal email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@example.com"
          />
          <small className="helper-text">We'll only use this to enhance your learning.</small>
          <label>Current role</label>
          <div className="grid-select">
            {(
              [
                "Software Engineer",
                "Data Analyst",
                "Product Manager",
                "Designer",
                "Student",
                "Founder",
                "Other",
              ] as const
            ).map((role) => (
              <button
                key={role}
                type="button"
                className={form.current_role === role ? "select active" : "select"}
                onClick={() => update("current_role", role)}
              >
                {role}
              </button>
            ))}
          </div>
          <small className="helper-text">Helps us tailor skills to your role.</small>
        </div>
      )}

      {step === 2 && (
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

      {step === 3 && (
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

      {step === 4 && (
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

      {step === 5 && (
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
        {step < 5 ? (
          <button type="button" onClick={next} disabled={!canContinue || loading}>
            Continue
          </button>
        ) : (
          <button type="button" className="cta" onClick={submit} disabled={!canContinue || loading}>
            {loading ? "Generating..." : "Next: Build My Skill Profile"}
          </button>
        )}
      </footer>
      <p className="privacy-note">Your data stays private and secure.</p>
    </section>
  );
}

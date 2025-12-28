// src/App.tsx
import React, { useState } from "react";
import {
  createSkill,
  addValidation,
  getSkills,
  executeSkill,
  manualApprove,
} from "./Nova";

const initial = (() => {
  if (getSkills().length === 0) {
    createSkill("memory-rollback", 2);
  }
  return getSkills();
})();

export default function App() {
  const [skills, setSkills] = useState(initial);

  const refresh = () => setSkills(getSkills());

  const handleAIApprove = (skillName: string, agent = "AI-1") => {
    try {
      addValidation(skillName, agent, "approved");
      refresh();
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleExecute = (skillName: string) => {
    try {
      executeSkill(skillName);
      refresh();
    } catch (e) {
      alert((e as Error).message);
    }
  };

  const handleManualApprove = (skillName: string) => {
    manualApprove(skillName, "you");
    refresh();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Skills</h1>
      <ul>
        {skills.map((s) => (
          <li key={s.name} style={{ marginBottom: 10 }}>
            <strong>{s.name}</strong> — {s.status}
            <div style={{ marginTop: 6 }}>
              <button onClick={() => handleAIApprove(s.name, "AI-1")}>
                AI-1 Approve
              </button>{" "}
              <button onClick={() => handleAIApprove(s.name, "AI-2")}>
                AI-2 Approve
              </button>{" "}
              <button onClick={() => handleManualApprove(s.name)}>
                Manual Approve
              </button>{" "}
              <button onClick={() => handleExecute(s.name)}>Execute</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

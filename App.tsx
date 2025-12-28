import React, { useState } from "react";

type Status = "pending" | "approved" | "executed";

export default function App(): JSX.Element {
  const [ai1Approved, setAi1Approved] = useState(false);
  const [ai2Approved, setAi2Approved] = useState(false);
  const [status, setStatus] = useState<Status>("pending");

  const tryApprove = (which: 1 | 2) => {
    if (which === 1) setAi1Approved(true);
    if (which === 2) setAi2Approved(true);
    if ((which === 1 && ai2Approved) || (which === 2 && ai1Approved)) {
      setStatus("approved");
    }
  };

  const execute = () => {
    if (status !== "approved") return alert("Both AIs must approve first.");
    setStatus("executed");
  };

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Multi-AI Validation Demo</h1>

      <div style={{ marginBottom: 12 }}>
        <strong>Skill status:</strong>{" "}
        <span style={{ textTransform: "capitalize" }}>{status}</span>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button
          onClick={() => tryApprove(1)}
          disabled={ai1Approved}
          style={{ padding: "8px 12px" }}
        >
          {ai1Approved ? "AI-1 Approved" : "AI-1 Approve"}
        </button>

        <button
          onClick={() => tryApprove(2)}
          disabled={ai2Approved}
          style={{ padding: "8px 12px" }}
        >
          {ai2Approved ? "AI-2 Approved" : "AI-2 Approve"}
        </button>

        <button
          onClick={execute}
          disabled={status !== "approved"}
          style={{ padding: "8px 12px" }}
        >
          Execute
        </button>
      </div>

      <div>
        <strong>Approvals:</strong>{" "}
        <span>AI-1: {ai1Approved ? "✅" : "❌"}; AI-2: {ai2Approved ? "✅" : "❌"}</span>
      </div>
    </div>
  );
        }      alert((e as Error).message);
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

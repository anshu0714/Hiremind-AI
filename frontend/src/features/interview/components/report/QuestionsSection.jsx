import { useState } from "react";
import QuestionAccordion from "./QuestionAccordion";

const QuestionsSection = ({ questions }) => {
  const [tab, setTab] = useState("technical");

  return (
    <div className="questions glass">
      <h3>Interview Questions ({questions[tab]?.length || 0})</h3>

      <div className="tabs">
        <button
          className={tab === "technical" ? "active" : ""}
          onClick={() => setTab("technical")}
        >
          Technical
        </button>
        <button
          className={tab === "behavioral" ? "active" : ""}
          onClick={() => setTab("behavioral")}
        >
          Behavioral
        </button>
      </div>

      <div className="accordion-list">
        {questions?.[tab]?.length ? (
          questions?.[tab].map((q, i) => <QuestionAccordion key={i} item={q} />)
        ) : (
          <p style={{ color: "var(--muted)" }}>No questions available</p>
        )}
      </div>
    </div>
  );
};

export default QuestionsSection;

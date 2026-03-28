import { useState } from "react";

const QuestionAccordion = ({ item }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <p>{item.question}</p>
        <span>{open ? "-" : "+"}</span>
      </div>

      {open && (
        <div className="accordion-body">
          <p><strong>Intention:</strong> {item.intention}</p>
          <p><strong>Expected Answer:</strong> {item.answer}</p>
        </div>
      )}
    </div>
  );
};

export default QuestionAccordion;
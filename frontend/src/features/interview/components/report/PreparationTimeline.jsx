const PreparationTimeline = ({ plan }) => {
  return (
    <div className="prep glass">
      <h3>Preparation Plan</h3>

      <div className="prep-grid">
        {plan.map((day, i) => (
          <div key={i} className="prep-card">
            <div className="prep-header">
              <span className="day-badge">Day {day.day}</span>
              <h4>{day.title}</h4>
            </div>

            <ul className="task-list">
              {(day.task || "").split(", ").map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreparationTimeline;

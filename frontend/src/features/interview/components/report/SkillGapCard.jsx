const getSeverityClass = (level) => {
  switch (level) {
    case "HIGH":
      return "high";
    case "MEDIUM":
      return "medium";
    case "LOW":
      return "low";
    default:
      return "";
  }
};

const SkillGapCard = ({ skills = [] }) => {
  return (
    <div className="skill-gap glass">
      <h3>Skill Gap Analysis</h3>

      <div className="skill-grid">
        {skills.map((skill, i) => (
          <div key={i} className="skill-card">
            <p>{skill.name}</p>
            <span className={`badge ${getSeverityClass(skill.severity)}`}>
              {skill.severity}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillGapCard;
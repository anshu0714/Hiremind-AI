const MatchSummaryCard = ({ score, summary }) => {
  return (
    <div className="match-card glass">
      <div
        className="score-circle"
        style={{
          background: `conic-gradient(var(--accent) ${score}%, rgba(255,255,255,0.08) ${score}%)`,
        }}
      >
        <div className="inner-circle">
          <span>{score}%</span>
        </div>
      </div>

      <div className="content">
        <h3>Match Score: {score}%</h3>
        <p>{summary}</p>
      </div>
    </div>
  );
};

export default MatchSummaryCard;

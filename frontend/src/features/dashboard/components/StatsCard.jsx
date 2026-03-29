const StatsCard = ({ label, value, type = "percentage" }) => {
  const numericValue = parseFloat(value);
  const isNumeric = !isNaN(numericValue);

  const isNegative = numericValue < 0;
  const isPositive = numericValue > 0;

  const progress = Math.min(Math.abs(numericValue), 100);

  return (
    <div
      className={`stats-card glass ${
        isNegative ? "negative" : isPositive ? "positive" : ""
      }`}
    >
      <p className="stats-label">{label}</p>

      <h2
        className={`${
          isNegative ? "negative-text" : isPositive ? "positive-text" : ""
        }`}
      >
        {isNumeric && type !== "text" ? `${progress}%` : value}
      </h2>

      {/* Progress */}
      {isNumeric && type === "percentage" && !isNegative && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
};

export default StatsCard;

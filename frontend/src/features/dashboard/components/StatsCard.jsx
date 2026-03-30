const StatsCard = ({ label, value, type = "percentage" }) => {
  const isRange = type === "range";
  const isText = type === "text";

  // Range handling
  if (isRange && value) {
    const { min = 0, max = 0 } = value;

    return (
      <div className="stats-card glass">
        <p className="stats-label">{label}</p>

        <h2 className="range-text">
          {min}% - {max}%
        </h2>

        <div className="range-bar">
          <div
            className="range-fill"
            style={{
              left: `${min}%`,
              width: `${max - min}%`,
            }}
          />
        </div>
      </div>
    );
  }

  // Numeric handling
  const numericValue = !isText ? parseFloat(value) : null;
  const isNumeric = !isText && !isNaN(numericValue);

  const isNegative = isNumeric && numericValue < 0;
  const isPositive = isNumeric && numericValue > 0;

  const progress = isNumeric ? Math.min(Math.abs(numericValue), 100) : 0;

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
        {isText ? value : `${progress}%`}
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

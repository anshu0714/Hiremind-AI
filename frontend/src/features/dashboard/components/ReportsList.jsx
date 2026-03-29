const ReportsList = ({ reports = [] }) => {
  const sortedReports = [...reports]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="reports-list glass">
      <h3>Recent Reports</h3>

      {sortedReports.map((r) => {
        const dateObj = new Date(r.createdAt);

        return (
          <div key={r._id} className="report-item">
            <div className="score">{r.matchScore}%</div>

            <div>
              <h4>{r.title || "Interview"}</h4>

              <p className="meta">
                {dateObj.toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportsList;

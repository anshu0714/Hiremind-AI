const ReportsSkeleton = () => {
  return (
    <div className="reports-table glass">
      <div className="table-header">
        <span>Report Name</span>
        <span>Created</span>
        <span>Score</span>
        <span></span>
      </div>

      {[...Array(5)].map((_, i) => (
        <div key={i} className="table-row skeleton-row">
          <div className="skeleton-box w-lg" />
          <div className="skeleton-box w-md" />
          <div className="skeleton-box w-sm" />
          <div className="skeleton-box w-sm" />
        </div>
      ))}
    </div>
  );
};

export default ReportsSkeleton;

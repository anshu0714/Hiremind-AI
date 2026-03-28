import { useMemo } from "react";

const getColorFromName = (name = "") => {
  const colors = [
    "#6366f1",
    "#9333ea",
    "#22d3ee",
    "#f43f5e",
    "#10b981",
    "#f59e0b",
  ];

  let hash = 0;

  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

const ReportHeader = ({ user, onOpenDrawer }) => {
  const name = user?.username || "User";
  const initial = name.charAt(0).toUpperCase();
  const bgColor = useMemo(() => getColorFromName(name), [name]);

  return (
    <div className="report-header glass">
      <div className="left">
        <div className="avatar" style={{ background: bgColor }}>
          {initial}
        </div>

        <div>
          <h2>{name}</h2>
          <p>Candidate</p>
        </div>
      </div>

      <div className="right">
        <button className="btn ghost" onClick={onOpenDrawer}>
          View Resume / JD
        </button>

        <button className="btn">Download Report</button>

        <button className="btn secondary">Re-run Analysis</button>
      </div>
    </div>
  );
};

export default ReportHeader;

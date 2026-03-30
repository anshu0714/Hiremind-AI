import { useNavigate } from "react-router-dom";

const ReportsHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="reports-header">
      <div>
        <h2>Reports</h2>
        <p>View and manage all your generated reports.</p>
      </div>

      {/* RIGHT SIDE BUTTONS */}
      <div className="header-actions">
        <button className="btn ghost" onClick={() => navigate("/")}>
          ⬅ Dashboard
        </button>

        <button
          className="btn primary"
          onClick={() => navigate("/interview-form")}
        >
          + New Report
        </button>
      </div>
    </div>
  );
};

export default ReportsHeader;

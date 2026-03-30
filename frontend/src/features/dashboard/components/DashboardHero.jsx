import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DashboardHero = ({ stats = {} }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const name = user?.username || "User";

  const totalReports = stats?.totalReports || 0;
  const reportsThisWeek = stats?.reportsThisWeek || 0;

  return (
    <div className="dashboard-hero glass">
      {/* LEFT */}
      <div className="hero-left">
        <h2>
          Welcome back, <span>{name}</span>
        </h2>

        <p>Keep practicing to improve your interview performance 🚀</p>

        <div className="hero-actions">
          <button
            className="btn primary"
            onClick={() => navigate("/interview-form")}
          >
            Create Report
          </button>

          <button
            className="btn ghost"
            onClick={() => window.scrollTo({ top: 500, behavior: "smooth" })}
          >
            View Reports
          </button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-right">
        <div className="hero-card">
          <p>📊 Reports</p>
          <h3>{totalReports}</h3>
        </div>

        <div className="hero-card secondary">
          <p>📅 This Week</p>
          <h3>{reportsThisWeek}</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardHero;

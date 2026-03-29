import useDashboard from "../hooks/useDashboard";
import DashboardHero from "../components/DashboardHero";
import StatsCard from "../components/StatsCard";
import ReportsList from "../components/ReportsList";
import PerformanceChart from "../components/PerformanceChart";
import DashboardHeader from "../components/DashboardHeader";
import LoadingScreen from "@/components/LoadingScreen";
import "../styles/dashboard.scss";

const Dashboard = () => {
  const { reports, stats, chartData, loading } = useDashboard();

  if (loading) return <LoadingScreen />;

  return (
    <div className="dashboard-page">
      <DashboardHeader />

      {/* Hero */}
      <DashboardHero stats={stats} />

      {/* Stats */}
      <div className="stats-grid">
        <StatsCard label="Avg Score" value={stats.avgScore} />
        <StatsCard label="Best Score" value={stats.bestScore} />
        <StatsCard label="Range" value={stats.scoreRange} type="text" />
      </div>

      {/* Main Grid */}
      <div className="dashboard-grid">
        <ReportsList reports={reports} />
        <PerformanceChart data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;

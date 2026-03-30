import useReports from "../hooks/useReports";
import ReportsHeader from "../components/ReportsHeader";
import ReportsFilters from "../components/ReportsFilters";
import ReportsGrid from "../components/ReportsGrid";
import ReportsSkeleton from "../components/ReportsSkeleton";
import Pagination from "../components/Pagination";
import "../styles/reports.page.scss";

const ReportsPage = () => {
  const {
    reports,
    setReports,
    page,
    setPage,
    pagination,
    filters,
    setFilters,
    loading,
  } = useReports();

  return (
    <div className="reports-page">
      <div className="reports-container">
        <ReportsHeader setFilters={setFilters} setPage={setPage} />

        <ReportsFilters filters={filters} setFilters={setFilters} />

        <div className="reports-content">
          {loading ? (
            <ReportsSkeleton />
          ) : (
            <ReportsGrid reports={reports} setReports={setReports} />
          )}
        </div>

        <Pagination page={page} setPage={setPage} pagination={pagination} />
      </div>
    </div>
  );
};

export default ReportsPage;

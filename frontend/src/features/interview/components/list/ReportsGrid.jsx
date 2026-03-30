import { useNavigate } from "react-router-dom";
import { Eye, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import {
  deleteInterviewReport,
  getAllInterviewReports,
  regenerateInterviewReport,
} from "../../services/interview.api";
import { showToast } from "@/utils/toast.util";
import { logger } from "@/utils/logger.util";

const ReportsGrid = ({ reports, setReports }) => {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      setLoadingId(id);
      await deleteInterviewReport(id);

      setReports((prev) => prev.filter((r) => r._id !== id));
      showToast.success("Report deleted");
    } catch (err) {
      logger.error("Failed to delete report", err);
      showToast.error("Failed to delete report");
    } finally {
      setLoadingId(null);
      setOpenMenu(null);
    }
  };

  const handleRegenerate = async (id) => {
    if (loadingId) return;

    try {
      setLoadingId(id);
      await regenerateInterviewReport(id);

      const res = await getAllInterviewReports();
      setReports(res.data.reports);

      showToast.success("Report regenerated");
    } catch (err) {
      logger.error("Failed to regenerate report", err);
      showToast.error("Failed to regenerate");
    } finally {
      setLoadingId(null);
      setOpenMenu(null);
    }
  };

  useEffect(() => {
    const handleClick = () => setOpenMenu(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  if (!reports.length) {
    return <p className="empty">No reports found</p>;
  }

  return (
    <div className="reports-table glass">
      <div className="table-header">
        <span>Report Name</span>
        <span>Date</span>
        <span>Time</span>
        <span>Score</span>
        <span></span>
      </div>

      {reports.map((r) => {
        const date = new Date(r.createdAt);

        const isLoading = loadingId === r._id;

        return (
          <div key={r._id} className="table-row">
            <div className="name">
              <h4>{r.title || "Interview Report"}</h4>
            </div>

            <div>
              {date.toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>

            <div className="time">
              {date.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>

            <div className="score">{r.matchScore}%</div>

            <div className="actions">
              <Eye
                size={16}
                onClick={() => navigate(`/interview-report/${r._id}`)}
              />

              <div className="menu-wrapper">
                <MoreVertical
                  size={16}
                  className="menu-trigger"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenu(openMenu === r._id ? null : r._id);
                  }}
                />

                {openMenu === r._id && (
                  <div
                    className="menu glass"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="menu-info mobile-only">
                      <p>
                        <strong>Date:</strong>{" "}
                        {date.toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>

                      <p>
                        <strong>Time:</strong>{" "}
                        {date.toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                    </div>

                    <div
                      onClick={() => handleRegenerate(r._id)}
                      style={{ opacity: isLoading ? 0.5 : 1 }}
                    >
                      {isLoading ? "Processing..." : "Regenerate"}
                    </div>

                    <div className="danger" onClick={() => handleDelete(r._id)}>
                      Delete
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReportsGrid;

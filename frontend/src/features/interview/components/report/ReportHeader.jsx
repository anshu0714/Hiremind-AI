import { useMemo, useState } from "react";
import {
  downloadInterviewReport,
  regenerateInterviewReport,
} from "../../services/interview.api";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "@/utils/toast.util";
import { logger } from "@/utils/logger.util";

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

const ReportHeader = ({ user, title, onOpenDrawer }) => {
  const name = user?.username || "User";
  const initial = name.charAt(0).toUpperCase();
  const bgColor = useMemo(() => getColorFromName(name), [name]);
  const { reportId } = useParams();
  const navigate = useNavigate();

  const [isDownloading, setIsDownloading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);

      const blob = await downloadInterviewReport(reportId);

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = url;
      a.download = `${title || "report"}.pdf`;
      a.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      logger.error("Failed to download report", err);
      showToast.error("Failed to download report");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleRegenerate = async () => {
    try {
      setIsRegenerating(true);

      const res = await regenerateInterviewReport(reportId);
      const newId = res?.data?._id;

      if (newId) {
        navigate(`/interview-report/${newId}`);
      }
    } catch (err) {
      logger.error("Failed to regenerate report", err);
      showToast.error("Failed to regenerate report");
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="report-header glass">
      <div className="left">
        <div className="avatar" style={{ background: bgColor }}>
          {initial}
        </div>

        <div>
          <h2>{name}</h2>
          <p>{title}</p>
        </div>
      </div>

      <div className="right">
        <button className="btn ghost" onClick={onOpenDrawer}>
          View Resume / JD
        </button>

        <button
          className="btn"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? "Downloading..." : "Download Report"}
        </button>

        <button
          className="btn secondary"
          onClick={handleRegenerate}
          disabled={isRegenerating}
        >
          {isRegenerating ? "Regenerating..." : "Regenerate Report"}
        </button>
      </div>
    </div>
  );
};

export default ReportHeader;

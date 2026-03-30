import { useEffect, useState } from "react";
import { getInterviewReportById } from "../services/interview.api";
import { normalizeReport } from "../utils/normalizeReport";
import { logger } from "@/utils/logger.util";

const useInterviewReport = (reportId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reportId) return;

    const fetchReport = async () => {
      try {
        setLoading(true);

        const res = await getInterviewReportById(reportId);

        if (!res) throw new Error("No data received");

        const normalized = normalizeReport(res.data);

        setData(normalized);
      } catch (err) {
        logger.error("REPORT_FETCH_ERROR", err.message);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportId]);

  return { data, loading, error };
};

export default useInterviewReport;

import { useEffect, useState } from "react";
import { getReports } from "../services/reports.api";
import toast from "react-hot-toast";
import { logger } from "@/utils/logger.util";

const useReports = () => {
  const [reports, setReports] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    minScore: "",
    sort: "latest",
  });

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        const res = await getReports({
          page,
          limit: 10,
          search: filters.search,
          minScore: filters.minScore,
          sort: filters.sort,
        });

        setReports(res.data.reports);
        setPagination(res.data.pagination);
      } catch (err) {
        logger.error("Failed to load reports", err);
        toast.error("Failed to load reports");
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [page, filters]);

  return {
    reports,
    setReports,
    page,
    setPage,
    pagination,
    filters,
    setFilters,
    loading,
  };
};

export default useReports;

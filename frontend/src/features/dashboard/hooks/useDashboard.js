import { useEffect, useState } from "react";
import { getDashboardData } from "../services/dashboard.api";

const useDashboard = () => {
  const [data, setData] = useState({
    stats: {},
    chartData: [],
    reports: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getDashboardData();

        const d = res?.data;

        setData({
          stats: d.stats,
          chartData: d.chartData,
          reports: d.recentReports,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { ...data, loading };
};

export default useDashboard;

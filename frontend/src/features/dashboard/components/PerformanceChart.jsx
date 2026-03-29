import { XAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const PerformanceChart = ({ data = [] }) => {
  const formattedData = [...data]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((d) => {
      const dateObj = new Date(d.date);

      const date = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });

      const time = dateObj.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return {
        ...d,
        fullDate: d.date,
        label: `${date}, ${time}`,
      };
    });

  return (
    <div className="chart glass">
      <h3>Performance Overview</h3>

      {!data.length ? (
        <p>No data available</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={formattedData}>
              {/* Gradient */}
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              {/* X Axis */}
              <XAxis dataKey="label" stroke="#94a3b8" />

              {/* Tooltip */}
              <Tooltip
                formatter={(value) => [`${value}%`, "Score"]}
                contentStyle={{
                  background: "#020617",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  padding: "8px 10px",
                }}
                labelStyle={{
                  color: "#cbd5f5",
                  fontSize: "12px",
                }}
                itemStyle={{
                  color: "#6366f1",
                  fontWeight: 500,
                }}
              />

              {/* Area */}
              <Area
                type="monotone"
                dataKey="score"
                stroke="#6366f1"
                fill="url(#colorScore)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>

          <p className="info">Performance trend over the last 7 reports</p>
        </>
      )}
    </div>
  );
};

export default PerformanceChart;

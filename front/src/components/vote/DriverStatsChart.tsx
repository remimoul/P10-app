import { DriverStatsChartProps } from "@/lib/types/vote";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export const DriverStatsChart = ({ driver }: DriverStatsChartProps) => {
  const lineChartData = driver.stats.previousRaces.map((position, index) => ({
    name: `Course ${index + 1}`,
    position,
  }));

  return (
    <div className="space-y-6">
      <div className="h-64">
        <h3 className="text-lg font-semibold mb-2">
          Positions in previous races
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lineChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis reversed={true} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="position"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ fill: "#ef4444" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

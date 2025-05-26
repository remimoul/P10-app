import { useState } from "react";
import { DriverComparisonProps } from "@/lib/types/vote";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const DriverComparison = ({
  drivers,
  onClose,
}: DriverComparisonProps) => {
  const [season, setSeason] = useState<string>("2024");

  const comparisonData = [
    {
      name: "Points",
      driver1: drivers[0]?.stats.points ?? 0,
      driver2: drivers[1]?.stats.points ?? 0,
      ...(drivers[2] && { driver3: drivers[2].stats.points ?? 0 }),
    },
    {
      name: "Wins",
      driver1: drivers[0]?.stats.wins ?? 0,
      driver2: drivers[1]?.stats.wins ?? 0,
      ...(drivers[2] && { driver3: drivers[2].stats.wins ?? 0 }),
    },
    {
      name: "Podiums",
      driver1: drivers[0]?.stats.podiums ?? 0,
      driver2: drivers[1]?.stats.podiums ?? 0,
      ...(drivers[2] && { driver3: drivers[2].stats.podiums ?? 0 }),
    },
    {
      name: "Fastest laps",
      driver1: drivers[0]?.stats.fastestLaps ?? 0,
      driver2: drivers[1]?.stats.fastestLaps ?? 0,
      ...(drivers[2] && { driver3: drivers[2].stats.fastestLaps ?? 0 }),
    },
    {
      name: "Average position",
      driver1: Number(drivers[0]?.stats.averagePosition ?? 0).toFixed(1),
      driver2: Number(drivers[1]?.stats.averagePosition ?? 0).toFixed(1),
      ...(drivers[2] && {
        driver3: Number(drivers[2].stats.averagePosition ?? 0).toFixed(1),
      }),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Driver Comparison</h2>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Season</label>
          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger>
              <SelectValue placeholder="Select a season" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="driver1"
                name={drivers[0]?.name ?? "Driver 1"}
                fill="#ef4444"
              />
              <Bar
                dataKey="driver2"
                name={drivers[1]?.name ?? "Driver 2"}
                fill="#3b82f6"
              />
              {drivers[2] && (
                <Bar
                  dataKey="driver3"
                  name={drivers[2].name ?? "Driver 3"}
                  fill="#22c55e"
                />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          className={`grid gap-6 mt-6 ${
            drivers.length === 3 ? "grid-cols-3" : "grid-cols-2"
          }`}
        >
          {drivers.map((driver) => (
            <div key={driver.driverId} className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-4">{driver.name}</h3>
              <div className="space-y-2">
                <p>Team: {driver.team}</p>
                <p>Points: {driver.stats.points ?? 0}</p>
                <p>Wins: {driver.stats.wins ?? 0}</p>
                <p>Podiums: {driver.stats.podiums ?? 0}</p>
                <p>Fastest laps: {driver.stats.fastestLaps ?? 0}</p>
                <p>
                  Average position: {Number(driver.stats.averagePosition ?? 0).toFixed(1)}
                </p>
                <p>
                  Team performance: {Number(driver.stats.teamPerformance ?? 0 * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
import { useState, useEffect } from "react";
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
import { RiCloseLine } from "react-icons/ri";
import { driverService } from "@/lib/services/driverService";
import { DriverStats } from "@/lib/types/drivers";

export const DriverComparison = ({
  drivers,
  onClose,
}: DriverComparisonProps) => {
  const [season, setSeason] = useState<string>("2024");
  const [seasonData, setSeasonData] = useState<DriverStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeasonData = async () => {
      setLoading(true);
      try {
        const stats = await driverService.getAllDriversStats();
        setSeasonData(stats);
      } catch (error) {
        console.error("Error fetching driver stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeasonData();
  }, [season]);

  const getDriverSeasonData = (driverId: string) => {
    return seasonData.find(d => d.driverId === driverId)?.stats || {
      points: 0,
      wins: 0,
      podiums: 0,
      fastestLaps: 0,
      averagePosition: 0,
      teamPerformance: 0
    };
  };

  const comparisonData = [
    {
      name: "Points",
      driver1: getDriverSeasonData(drivers[0]?.driverId).points,
      driver2: getDriverSeasonData(drivers[1]?.driverId).points,
      ...(drivers[2] && { driver3: getDriverSeasonData(drivers[2]?.driverId).points }),
    },
    {
      name: "Wins",
      driver1: getDriverSeasonData(drivers[0]?.driverId).wins,
      driver2: getDriverSeasonData(drivers[1]?.driverId).wins,
      ...(drivers[2] && { driver3: getDriverSeasonData(drivers[2]?.driverId).wins }),
    },
    {
      name: "Podiums",
      driver1: getDriverSeasonData(drivers[0]?.driverId).podiums,
      driver2: getDriverSeasonData(drivers[1]?.driverId).podiums,
      ...(drivers[2] && { driver3: getDriverSeasonData(drivers[2]?.driverId).podiums }),
    },
    {
      name: "Fastest laps",
      driver1: getDriverSeasonData(drivers[0]?.driverId).fastestLaps,
      driver2: getDriverSeasonData(drivers[1]?.driverId).fastestLaps,
      ...(drivers[2] && { driver3: getDriverSeasonData(drivers[2]?.driverId).fastestLaps }),
    },
    {
      name: "Average position",
      driver1: Number(getDriverSeasonData(drivers[0]?.driverId).averagePosition).toFixed(1),
      driver2: Number(getDriverSeasonData(drivers[1]?.driverId).averagePosition).toFixed(1),
      ...(drivers[2] && {
        driver3: Number(getDriverSeasonData(drivers[2]?.driverId).averagePosition).toFixed(1),
      }),
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Driver Comparison</h2>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-2"
          >
            <RiCloseLine className="text-2xl text-gray-600" />
          </Button>
        </div>

        <div className="mb-8">
          <label className="block text-lg font-medium mb-2 text-gray-700">Season</label>
          <Select value={season} onValueChange={setSeason}>
            <SelectTrigger className="w-full max-w-xs border-2 border-gray-200 rounded-full
              focus:border-[var(--primary-red)] focus:ring-2 focus:ring-[var(--primary-red)]/20
              hover:border-[var(--primary-red)]/50 transition-all duration-200
              shadow-sm hover:shadow-md">
              <SelectValue placeholder="Select a season" />
            </SelectTrigger>
            <SelectContent className="border-2 border-gray-200 rounded-2xl shadow-lg bg-white">
              <SelectItem value="2024" className="hover:bg-[var(--primary-red)]/10 focus:bg-[var(--primary-red)]/10 text-gray-800">2024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-red)]"></div>
          </div>
        ) : (
          <>
            <div className="h-[400px] mb-8 bg-gray-50 rounded-2xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fill: '#4b5563' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#4b5563' }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '2px solid #e5e7eb',
                      borderRadius: '0.75rem',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                  <Bar
                    dataKey="driver1"
                    name={drivers[0]?.name ?? "Driver 1"}
                    fill="#D90429"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="driver2"
                    name={drivers[1]?.name ?? "Driver 2"}
                    fill="#2B2D42"
                    radius={[4, 4, 0, 0]}
                  />
                  {drivers[2] && (
                    <Bar
                      dataKey="driver3"
                      name={drivers[2].name ?? "Driver 3"}
                      fill="#8D99AE"
                      radius={[4, 4, 0, 0]}
                    />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div
              className={`grid gap-6 ${
                drivers.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"
              }`}
            >
              {drivers.map((driver) => {
                const stats = getDriverSeasonData(driver.driverId);
                return (
                  <div 
                    key={driver.driverId} 
                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <h3 className="text-xl font-bold mb-6 text-gray-900">{driver.name}</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                        <span className="text-gray-600">Team</span>
                        <span className="font-semibold text-gray-900">{driver.team}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                        <span className="text-gray-600">Points</span>
                        <span className="font-semibold text-gray-900">{stats.points}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                        <span className="text-gray-600">Wins</span>
                        <span className="font-semibold text-gray-900">{stats.wins}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                        <span className="text-gray-600">Podiums</span>
                        <span className="font-semibold text-gray-900">{stats.podiums}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                        <span className="text-gray-600">Fastest laps</span>
                        <span className="font-semibold text-gray-900">{stats.fastestLaps}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                        <span className="text-gray-600">Average position</span>
                        <span className="font-semibold text-gray-900">
                          {Number(stats.averagePosition).toFixed(1)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white rounded-xl shadow-sm">
                        <span className="text-gray-600">Team performance</span>
                        <span className="font-semibold text-gray-900">
                          {(Number(stats.teamPerformance) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
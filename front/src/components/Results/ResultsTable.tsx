import { ViewMode, DriverTableData } from "@/lib/types/racing";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal } from "react-icons/fa";
import { useEffect, useState } from "react";
import { ergastService } from "@/lib/services/ergastService";
import { ErgastResult } from "@/lib/types/ergast";

interface ResultsTableProps {
  drivers: DriverTableData[];
  viewMode: ViewMode;
  season?: string;
  round?: string;
}

const ResultsTable = ({
  drivers,
  viewMode,
  season,
  round,
}: ResultsTableProps) => {
  const [ergastResults, setErgastResults] = useState<ErgastResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchErgastData = async () => {
      if (!season || !round) return;
      setIsLoading(true);
      try {
        const raceData = await ergastService.getRaceResults(season, round);
        if (raceData?.results) {
          setErgastResults(raceData.results);
        }
      } catch (error) {
        console.error("Error fetching Ergast data:", error);
      }
      setIsLoading(false);
    };

    fetchErgastData();
  }, [season, round]);

  const getErgastResult = (driverNumber: number, driverName: string) => {
    return ergastResults.find((result) => {
      if (result.Driver.permanentNumber === driverNumber.toString()) {
        return true;
      }
      if (result.number === driverNumber.toString()) {
        return true;
      }
      const fullName = `${result.Driver.givenName} ${result.Driver.familyName}`.toLowerCase();
      return fullName === driverName.toLowerCase();
    });
  };

  const combineDriverData = (driver: DriverTableData) => {
    const ergastResult = getErgastResult(driver.number, driver.name);
    
    const position = ergastResult?.position ? parseInt(ergastResult.position) : driver.position;
    const points = ergastResult?.points ? parseFloat(ergastResult.points) : driver.points || 0;
    const laps = ergastResult?.laps || driver.laps || "-";
    
    const driverName = ergastResult?.Driver 
      ? `${ergastResult.Driver.givenName} ${ergastResult.Driver.familyName}`
      : driver.name;
    
    const teamName = ergastResult?.Constructor?.name || driver.team || "-";
    const carName = ergastResult?.Constructor?.name || driver.car || "-";

    return {
      ...driver,
      position,
      points,
      laps,
      name: driverName,
      team: teamName,
      car: carName,
      driverDetails: ergastResult?.Driver,
      constructorDetails: ergastResult?.Constructor,
    };
  };

  const sortedDrivers = [...drivers].sort((a, b) => {
    const aErgast = getErgastResult(a.number, a.name);
    const bErgast = getErgastResult(b.number, b.name);
    
    if (aErgast && bErgast) {
      const aPoints = parseFloat(aErgast.points);
      const bPoints = parseFloat(bErgast.points);
      if (aPoints !== bPoints) {
        return bPoints - aPoints;
      }
      
      const aPosition = parseInt(aErgast.position);
      const bPosition = parseInt(bErgast.position);
      if (aPosition !== bPosition) {
        return aPosition - bPosition;
      }
      
      return a.number - b.number;
    }
    
    if (aErgast) return -1;
    if (bErgast) return 1;
    
    if (a.points !== b.points) {
      return b.points - a.points;
    }
    if (a.position !== b.position) {
      return a.position - b.position;
    }
    return a.number - b.number;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-100 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50/20 to-transparent opacity-30" />
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-red-100 rounded-full opacity-20" />
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-red-100 rounded-full opacity-20" />

      <div className="relative z-10">
        <div className="overflow-x-auto">
          <div className="min-w-[1000px]">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Pos
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    No
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Driver
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Car
                  </th>
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Team
                  </th>
                  {viewMode === "race" && (
                    <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                      Laps
                    </th>
                  )}
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {sortedDrivers.map((driver) => {
                  const combinedData = combineDriverData(driver);
                  return (
                    <motion.tr
                      key={driver.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="group hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all duration-300"
                    >
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {combinedData.position === 1 && (
                            <div className="relative mr-3">
                              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur-sm opacity-60" />
                              <div className="relative bg-gradient-to-br from-yellow-400 to-yellow-600 w-10 h-10 rounded-full flex items-center justify-center">
                                <FaTrophy className="text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  1
                                </span>
                              </div>
                            </div>
                          )}
                          {combinedData.position === 2 && (
                            <div className="relative mr-3">
                              <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full blur-sm opacity-60" />
                              <div className="relative bg-gradient-to-br from-gray-300 to-gray-400 w-10 h-10 rounded-full flex items-center justify-center">
                                <FaMedal className="text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  2
                                </span>
                              </div>
                            </div>
                          )}
                          {combinedData.position === 3 && (
                            <div className="relative mr-3">
                              <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-amber-700 rounded-full blur-sm opacity-60" />
                              <div className="relative bg-gradient-to-br from-amber-500 to-amber-700 w-10 h-10 rounded-full flex items-center justify-center">
                                <FaMedal className="text-white text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-300" />
                              </div>
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-600 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold text-white">
                                  3
                                </span>
                              </div>
                            </div>
                          )}
                          {combinedData.position > 3 && (
                            <div className="relative mr-3">
                              <div
                                className={`relative ${
                                  combinedData.position <= 10
                                    ? "bg-gradient-to-br from-gray-200 to-gray-300"
                                    : "bg-gradient-to-br from-gray-100 to-gray-200"
                                } w-10 h-10 rounded-full flex items-center justify-center`}
                              >
                                <span
                                  className={`text-sm font-bold ${
                                    combinedData.position <= 10
                                      ? "text-gray-900 group-hover:text-red-600"
                                      : "text-gray-500 group-hover:text-gray-700"
                                  } transition-colors duration-300`}
                                >
                                  {combinedData.position}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500 font-medium group-hover:text-gray-900 transition-colors duration-300">
                        {combinedData.number || "-"}
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                              {combinedData.driverDetails
                                ? `${combinedData.driverDetails.givenName} ${combinedData.driverDetails.familyName}`
                                : combinedData.name || "-"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                          {combinedData.car || "-"}
                        </span>
                      </td>
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                          {combinedData.constructorDetails?.name ||
                            combinedData.team ||
                            "-"}
                        </span>
                      </td>
                      {viewMode === "race" && (
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
                          {combinedData.laps}
                        </td>
                      )}
                      <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                        <span className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                          {combinedData.points}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;

import { ResultsTableProps } from "@/lib/types";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal } from "react-icons/fa";

const ResultsTable = ({ drivers, viewMode }: ResultsTableProps) => {
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
                    <>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Grid
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Laps
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Time/Gap
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Fastest Lap
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                    </>
                  )}
                  <th className="px-4 sm:px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {drivers.map((driver) => (
                  <motion.tr
                    key={driver.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all duration-300"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {driver.position === 1 && (
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
                        {driver.position === 2 && (
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
                        {driver.position === 3 && (
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
                        {driver.position > 3 && (
                          <div className="relative mr-3">
                            <div
                              className={`relative ${
                                driver.position <= 10
                                  ? "bg-gradient-to-br from-gray-200 to-gray-300"
                                  : "bg-gradient-to-br from-gray-100 to-gray-200"
                              } w-10 h-10 rounded-full flex items-center justify-center`}
                            >
                              <span
                                className={`text-sm font-bold ${
                                  driver.position <= 10
                                    ? "text-gray-900 group-hover:text-red-600"
                                    : "text-gray-500 group-hover:text-gray-700"
                                } transition-colors duration-300`}
                              >
                                {driver.position}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500 font-medium group-hover:text-gray-900 transition-colors duration-300">
                      {driver.number}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                            {driver.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                        {driver.car}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="font-medium text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                        {driver.team}
                      </span>
                    </td>
                    {viewMode === "race" && (
                      <>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
                          {driver.grid}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
                          {driver.laps}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
                          {driver.time}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-500 group-hover:text-gray-900 transition-colors duration-300">
                          {driver.fastestLap}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                              driver.status === "Finished"
                                ? "bg-green-100 text-green-800 group-hover:bg-green-200 group-hover:text-green-900"
                                : "bg-red-100 text-red-800 group-hover:bg-red-200 group-hover:text-red-900"
                            } transition-colors duration-300`}
                          >
                            {driver.status}
                          </span>
                        </td>
                      </>
                    )}
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                        {driver.points}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;

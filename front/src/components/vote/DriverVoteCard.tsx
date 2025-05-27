import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DriverVoteCardProps } from "@/lib/types/drivers";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { MdHowToVote } from "react-icons/md";
import { DriverStatsChart } from "./DriverStatsChart";

export const DriverVoteCard = ({
  driver,
  selectedDriver,
  handleVote,
  handleCancelVote,
  timeLeft,
  isInComparison,
  onComparisonSelect,
}: DriverVoteCardProps) => {
  const [chartExpanded, setChartExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl p-4 sm:p-6 shadow-xl hover:shadow-2xl transition-all w-full max-w-xs mx-auto
        ${
          selectedDriver === driver.driverId
            ? "border-2 border-[var(--primary-red)] ring-4 ring-[var(--primary-red)]/30"
            : "border border-gray-200 hover:border-[var(--primary-red)]/50"
        }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,4,41,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(217,4,41,0.08)_50%,transparent_75%)] bg-[length:250%_250%] animate-gradient-shift" />
      
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-red)]/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--primary-red)]/40 to-transparent" />
      <div className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[var(--primary-red)]/40 to-transparent" />
      <div className="absolute right-0 top-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[var(--primary-red)]/40 to-transparent" />

      <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-[var(--primary-red)]/50 rounded-tl-3xl" />
      <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-[var(--primary-red)]/50 rounded-tr-3xl" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-[var(--primary-red)]/50 rounded-bl-3xl" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[var(--primary-red)]/50 rounded-br-3xl" />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900 break-words drop-shadow-[0_0_8px_rgba(217,4,41,0.2)]">
              {driver.name}
            </h2>
            <p className="text-sm sm:text-base text-gray-600">{driver.team}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-sm text-gray-600">Compare</span>
            <Checkbox
              id={`compare-${driver.driverId}`}
              checked={isInComparison}
              onCheckedChange={() => onComparisonSelect(driver.driverId)}
              className="
                h-5 w-5 rounded-md border-2 border-gray-300
                data-[state=checked]:bg-[var(--primary-red)] data-[state=checked]:border-[var(--primary-red)]
                transition-all duration-200
                hover:border-[var(--primary-red)]/30 hover:bg-gray-50
                focus:ring-2 focus:ring-[var(--primary-red)]/20 focus:ring-offset-2
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            />
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          <div className="flex justify-between items-center text-xs sm:text-base bg-white/80 p-2 rounded-lg backdrop-blur-sm border border-gray-200 shadow-sm">
            <span className="text-gray-600">Average position</span>
            <span className="font-semibold text-gray-900">
              {driver.stats.averagePosition.toFixed(1)}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-base bg-white/80 p-2 rounded-lg backdrop-blur-sm border border-gray-200 shadow-sm">
            <span className="text-gray-600">Team performance</span>
            <span className="font-semibold text-gray-900">
              {(driver.stats.teamPerformance * 100).toFixed(1)}%
            </span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-base bg-white/80 p-2 rounded-lg backdrop-blur-sm border border-gray-200 shadow-sm">
            <span className="text-gray-600">Points</span>
            <span className="font-semibold text-gray-900">{driver.stats.points}</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-base bg-white/80 p-2 rounded-lg backdrop-blur-sm border border-gray-200 shadow-sm">
            <span className="text-gray-600">Wins</span>
            <span className="font-semibold text-gray-900">{driver.stats.wins}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
          {selectedDriver === driver.driverId ? (
            <Button
              onClick={handleCancelVote}
              disabled={timeLeft === 0}
              className={`
                w-full px-4 py-2 text-sm rounded-full font-semibold
                bg-white border-2 border-[#D90429] text-[#D90429]
                transition-all duration-200
                hover:bg-[var(--primary-red)] hover:text-white
                disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200
              `}
            >
              <span className="flex items-center justify-center gap-2">
                <span>CANCEL BET</span>
              </span>
            </Button>
          ) : (
            <Button
              onClick={() => handleVote(driver.driverId)}
              disabled={timeLeft === 0}
              title={timeLeft > 0 ? 'You can change your vote until the timer ends.' : 'Voting is closed.'}
              className={`
                w-full px-4 py-2 text-sm rounded-full font-semibold
                bg-white border-2 border-[#D90429] text-[#D90429]
                transition-all duration-200
                hover:bg-[var(--primary-red)] hover:text-white
                disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200
                ${timeLeft > 0 ? 'cursor-pointer' : 'cursor-not-allowed'}
              `}
            >
              <span className="flex items-center justify-center gap-2">
                <span>BET</span>
                <MdHowToVote className="text-lg sm:text-2xl text-[#D90429] hover:text-white" />
              </span>
            </Button>
          )}
          <Button
            onClick={() => setChartExpanded(!chartExpanded)}
            className={`
              w-full px-4 py-2 text-sm rounded-full font-semibold
              bg-white border-2 border-gray-200 text-gray-600
              transition-all duration-200
              hover:bg-gray-100 hover:text-gray-800
            `}
          >
            <span className="flex items-center justify-center gap-2">
              <span>STATS</span>
              {chartExpanded ? (
                <RiArrowUpSLine className="text-lg" />
              ) : (
                <RiArrowDownSLine className="text-lg" />
              )}
            </span>
          </Button>
        </div>

        {chartExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 w-full overflow-x-auto"
          >
            <div className="w-full">
              <DriverStatsChart driver={driver} />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DriverStats } from "@/lib/types/drivers";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { DriverStatsChart } from "./DriverStatsChart";

interface DriverVoteCardProps {
  driver: DriverStats;
  selectedDriver: string | null;
  handleVote: (driverId: string) => void;
  handleCancelVote: () => void;
  timeLeft: number;
  isInComparison: boolean;
  onComparisonSelect: (driverId: string) => void;
}

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
      className={`group relative bg-white border rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-all w-full max-w-xs mx-auto
        ${selectedDriver === driver.driverId
          ? "border-[var(--primary-red)] ring-2 ring-[var(--primary-red)]"
          : "border-gray-200 hover:border-[var(--primary-red)]"
        }`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 break-words">{driver.name}</h2>
          <p className="text-sm sm:text-base text-gray-600">{driver.team}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs sm:text-sm text-gray-600">Comparer</span>
          <Checkbox
            id={`compare-${driver.driverId}`}
            checked={isInComparison}
            onCheckedChange={() => onComparisonSelect(driver.driverId)}
          />
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
        <div className="flex justify-between items-center text-xs sm:text-base">
          <span className="text-gray-600">Position moyenne</span>
          <span className="font-semibold">{driver.stats.averagePosition.toFixed(1)}</span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-base">
          <span className="text-gray-600">Performance écurie</span>
          <span className="font-semibold">{(driver.stats.teamPerformance * 100).toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-base">
          <span className="text-gray-600">Points</span>
          <span className="font-semibold">{driver.stats.points}</span>
        </div>
        <div className="flex justify-between items-center text-xs sm:text-base">
          <span className="text-gray-600">Victoires</span>
          <span className="font-semibold">{driver.stats.wins}</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-2">
        {selectedDriver === driver.driverId ? (
          <Button
            onClick={handleCancelVote}
            variant="destructive"
            className="w-full sm:w-auto bg-[var(--primary-red)] hover:bg-[var(--primary-red)]/90"
            disabled={timeLeft === 0}
          >
            Annuler mon vote
          </Button>
        ) : (
          <Button
            onClick={() => handleVote(driver.driverId)}
            variant="outline"
            className="w-full sm:w-auto hover:bg-[var(--primary-red)]/10"
            disabled={timeLeft === 0}
          >
            Voter
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => setChartExpanded(!chartExpanded)}
          className="w-full sm:w-auto hover:bg-gray-100 flex items-center gap-2"
        >
          <span className="text-sm">Statistiques</span>
          {chartExpanded ? (
            <RiArrowUpSLine className="text-lg" />
          ) : (
            <RiArrowDownSLine className="text-lg" />
          )}
        </Button>
      </div>

      {chartExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 sm:mt-6 w-full overflow-x-auto"
        >
          <div className="w-full max-w-full">
            <DriverStatsChart driver={driver} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

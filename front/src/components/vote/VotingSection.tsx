import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiUserAddLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import { DriverStats } from "@/lib/types/drivers";
import { Vote, FilterOptions } from "@/lib/types/vote";
import { DriverVoteCard } from "./DriverVoteCard";
import { Pagination } from "@/components/Racings/Pagination";
import { FilterSort } from "./FilterSort";

interface VotingSectionProps {
  userVote: Vote | null;
  confirmedVote: string | null;
  handleConfirmVote: () => void;
  handleCancelVote: () => void;
  handleVote: (driverId: string) => void;
  selectedDriver: string | null;
  paginatedDrivers: DriverStats[];
  comparisonDrivers: string[];
  handleComparisonSelect: (driverId: string) => void;
  handleOpenComparison: () => void;
  timeLeft: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filters: FilterOptions) => void;
  resetFilters: () => void;
  teams: string[];
}

export const VotingSection = ({
  userVote,
  confirmedVote,
  handleConfirmVote,
  handleCancelVote,
  handleVote,
  selectedDriver,
  paginatedDrivers,
  comparisonDrivers,
  handleComparisonSelect,
  handleOpenComparison,
  timeLeft,
  currentPage,
  totalPages,
  onPageChange,
  onFilterChange,
  resetFilters,
  teams,
}: VotingSectionProps) => {
  return (
    <div>
      {userVote && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-r from-green-50 to-green-100 border border-green-300 text-green-700 p-4 sm:p-6 rounded-2xl text-center mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                <RiUserAddLine className="text-2xl text-green-600" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-base sm:text-lg font-semibold">Votre vote actuel</p>
                <p className="text-lg sm:text-xl font-bold break-words max-w-[120px] sm:max-w-none mx-auto sm:mx-0">
                  {
                    paginatedDrivers.find(
                      (d) => d.driverId === userVote.driverId
                    )?.name
                  }
                </p>
              </div>
            </div>
            {confirmedVote === userVote.driverId && (
              <span className="px-3 py-1 bg-green-200 rounded-full text-xs sm:text-sm font-medium mt-2 sm:mt-0">
                Vote confirmé
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            {!confirmedVote && (
              <Button
                onClick={handleConfirmVote}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 text-sm sm:text-base rounded-xl shadow-md hover:scale-[1.03] transition-all duration-200 focus:ring-2 focus:ring-green-400"
              >
                <RiCheckLine className="text-lg sm:text-xl" />
                <span>Confirmer le vote</span>
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleCancelVote}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-red-500 border-red-300 hover:text-white hover:bg-red-500 px-4 sm:px-6 py-2 text-sm sm:text-base rounded-xl shadow-md hover:scale-[1.03] transition-all duration-200 focus:ring-2 focus:ring-red-300"
            >
              <RiCloseLine className="text-lg sm:text-xl" />
              <span>Annuler le vote</span>
            </Button>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleOpenComparison}
            className="w-full sm:w-auto flex items-center gap-2 bg-white hover:bg-gray-50"
            disabled={comparisonDrivers.length < 2}
          >
            <span className="text-[var(--primary-red)]">
              Comparer les pilotes
            </span>
            <span className="bg-[var(--primary-red)] text-white px-2 py-0.5 rounded-full text-sm">
              {comparisonDrivers.length}/3
            </span>
          </Button>
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="w-full sm:w-auto text-sm text-[var(--primary-red)] hover:text-[var(--primary-red)]/80"
          >
            Réinitialiser les filtres
          </Button>
        </div>
        <div className="w-full sm:w-auto min-w-0">
          <FilterSort onFilterChange={onFilterChange} teams={teams} />
        </div>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {paginatedDrivers.map((driver) => (
          <DriverVoteCard
            key={driver.driverId}
            driver={driver}
            selectedDriver={selectedDriver}
            handleVote={handleVote}
            handleCancelVote={handleCancelVote}
            timeLeft={timeLeft}
            isInComparison={comparisonDrivers.includes(driver.driverId)}
            onComparisonSelect={handleComparisonSelect}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

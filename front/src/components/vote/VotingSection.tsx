import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiUserAddLine } from "react-icons/ri";
import { DriverStats } from "@/lib/types/drivers";
import { Vote } from "@/lib/types/vote";
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
  onFilterChange: (filters: Record<string, unknown>) => void;
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
          className="bg-gradient-to-r from-green-50 to-green-100 border border-green-300 text-green-700 p-6 rounded-2xl text-center mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                <RiUserAddLine className="text-2xl text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-lg font-semibold">Votre vote actuel</p>
                <p className="text-xl font-bold">
                  {
                    paginatedDrivers.find(
                      (d) => d.driverId === userVote.driverId
                    )?.name
                  }
                </p>
              </div>
            </div>
            {confirmedVote === userVote.driverId && (
              <span className="px-4 py-2 bg-green-200 rounded-full text-sm font-medium">
                Vote confirmé
              </span>
            )}
          </div>
          <div className="flex gap-3">
            {!confirmedVote && (
              <Button
                onClick={handleConfirmVote}
                className="bg-green-600 hover:bg-green-700 text-white px-6"
              >
                Confirmer le vote
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleCancelVote}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-300"
            >
              Annuler le vote
            </Button>
          </div>
        </motion.div>
      )}

      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={handleOpenComparison}
            className="flex items-center gap-2 bg-white hover:bg-gray-50"
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
            className="text-sm text-[var(--primary-red)] hover:text-[var(--primary-red)]/80"
          >
            Réinitialiser les filtres
          </Button>
        </div>
        <FilterSort onFilterChange={onFilterChange} teams={teams} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

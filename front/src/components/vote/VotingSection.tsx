import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RiUserAddLine, RiCheckLine, RiCloseLine } from "react-icons/ri";
import { VotingSectionProps } from "@/lib/types/vote";
import { DriverVoteCard } from "./DriverVoteCard";
import { Pagination } from "@/components/Racings/Pagination";
import { FilterSort } from "./FilterSort";

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
                <p className="text-base sm:text-lg font-semibold">
                  Your current vote
                </p>
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
                Vote confirmed
              </span>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            {!confirmedVote && (
              <Button
                onClick={handleConfirmVote}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 sm:px-7 py-2.5 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-green-400 font-semibold border-none"
              >
                <RiCheckLine className="text-lg sm:text-xl" />
                <span>Confirm vote</span>
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleCancelVote}
              className="w-full sm:w-auto flex items-center justify-center gap-2 text-red-600 border-2 border-red-300 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-700 hover:border-red-500 px-5 sm:px-7 py-2.5 text-base sm:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:ring-2 focus:ring-red-300 font-semibold"
            >
              <RiCloseLine className="text-lg sm:text-xl" />
              <span>Cancel vote</span>
            </Button>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={handleOpenComparison}
            className="w-full sm:w-auto flex items-center gap-2 bg-gradient-to-r from-white via-red-50 to-white border-2 border-[var(--primary-red)]/60 hover:border-[var(--primary-red)] text-[var(--primary-red)] font-semibold rounded-full px-5 py-2.5 text-base shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={comparisonDrivers.length < 2}
          >
            <span className="font-medium">Compare drivers</span>
            <span className="bg-[var(--primary-red)] text-white px-2.5 py-0.5 rounded-full text-sm font-semibold shadow-md">
              {comparisonDrivers.length}/3
            </span>
          </Button>
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="w-full sm:w-auto text-base text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-[var(--primary-red)] hover:to-red-400 rounded-full px-5 py-2.5 transition-all duration-200 font-semibold shadow-sm hover:shadow-md"
          >
            Reset filters
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

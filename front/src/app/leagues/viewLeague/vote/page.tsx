"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { VoteTabs } from "@/components/vote/VoteTabs";
import { DriverComparison } from "@/components/vote/DriverComparison";
import { CancelVoteDialog } from "@/components/vote/pop-up/CancelVoteDialog";
import { VotingSection } from "@/components/vote/VotingSection";
import { InfoSection } from "@/components/vote/InfoSection";
import { useVote } from "@/lib/hooks/useVote";
import { useDriverData } from "@/lib/hooks/useDriverData";
import { useNextRace } from "@/lib/hooks/useNextRace";
import VotePageHeader from "@/components/vote/VotePageHeader";
import VoteTimer from "@/components/vote/VoteTimer";
import VotePageLayout from "@/components/vote/VotePageLayout";
import {
  Loading,
  Error,
  NotAuthenticated,
} from "@/components/vote/LoadingStates";

interface RaceInfo {
  grandPrix: string;
  country: string;
  circuit: string;
  location: string;
  date: string;
  startTime: string;
}

const VotePage = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const [tab, setTab] = useState<"Info" | "Vote">("Info");
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [comparisonDrivers, setComparisonDrivers] = useState<string[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [topVotedDrivers, setTopVotedDrivers] = useState<
    { driverId: string; votes: number }[]
  >([]);
  const [nextRaceInfo, setNextRaceInfo] = useState<RaceInfo | null>(null);

  const { nextRace, loading: nextRaceLoading, error: nextRaceError } = useNextRace();

  const {
    selectedDriver,
    confirmedVote,
    userVote,
    showCancelDialog,
    setShowCancelDialog,
    timeLeft,
    voteDeadline,
    setVoteDeadline,
    totalParticipants,
    voteModified,
    handleVote,
    handleConfirmVote,
    handleCancelVote,
    confirmCancelVote,
  } = useVote();

  const {
    drivers,
    loading: driversLoading,
    error: driversError,
    setFilters,
    resetFilters,
    currentPage,
    setCurrentPage,
    paginatedDrivers,
    totalPages,
    uniqueTeams,
  } = useDriverData();

  useEffect(() => {
    if (nextRace.date && nextRace.time) {
      const raceDateTime = new Date(`${nextRace.date}T${nextRace.time}`);
      const deadline = new Date(raceDateTime);
      deadline.setHours(deadline.getHours() - 2);
      setVoteDeadline(deadline);

      setNextRaceInfo({
        grandPrix: nextRace.name || "",
        country: nextRace.circuit?.location.country || "",
        circuit: nextRace.circuit?.name || "",
        location: `${nextRace.circuit?.location.locality || ""}, ${nextRace.circuit?.location.country || ""}`,
        date: nextRace.date,
        startTime: nextRace.time,
      });
    }
  }, [nextRace, setVoteDeadline]);

  useEffect(() => {
    if (userLoaded) {
      try {
        // Load vote data (mock for now)
        setTotalVotes(150);
        setTopVotedDrivers([
          { driverId: "hamilton", votes: 45 },
          { driverId: "alonso", votes: 30 },
          { driverId: "norris", votes: 25 },
        ]);
      } catch (err) {
        console.error("Error loading additional data:", err);
      }
    }
  }, [userLoaded]);

  const handleComparisonSelect = (driverId: string) => {
    setComparisonDrivers((prev) => {
      if (prev.includes(driverId)) return prev.filter((id) => id !== driverId);
      if (prev.length >= 3) return [prev[1], prev[2], driverId];
      return [...prev, driverId];
    });
  };

  const handleOpenComparison = () => {
    if (comparisonDrivers.length < 2) {
      toast.error("Please select at least 2 drivers to compare");
      return;
    }
    setIsComparisonOpen(true);
  };

  const loading = driversLoading || !userLoaded || nextRaceLoading;
  const error = driversError || nextRaceError;

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!user) return <NotAuthenticated />;

  return (
    <VotePageLayout voteModified={voteModified}>
      <VotePageHeader />

      <VoteTimer
        timeLeft={timeLeft}
        voteDeadline={voteDeadline}
        totalParticipants={totalParticipants}
      />
      <div className="my-4 sm:my-6 md:my-8" />
      <VoteTabs activeTab={tab} onTabChange={setTab} />
      <div className="mb-4 sm:mb-6 md:mb-8" />

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {tab === "Info" ? (
            <InfoSection
              drivers={drivers}
              raceInfo={nextRaceInfo || {
                grandPrix: "",
                country: "",
                circuit: "",
                location: "",
                date: "",
                startTime: "",
                weather: "",
                temperature: "",
                humidity: ""
              }}
              totalVotes={totalVotes}
              totalParticipants={totalParticipants}
              topVotedDrivers={topVotedDrivers}
            />
          ) : (
            <VotingSection
              userVote={userVote}
              confirmedVote={confirmedVote}
              handleConfirmVote={handleConfirmVote}
              handleCancelVote={handleCancelVote}
              handleVote={handleVote}
              selectedDriver={selectedDriver}
              paginatedDrivers={paginatedDrivers}
              comparisonDrivers={comparisonDrivers}
              handleComparisonSelect={handleComparisonSelect}
              handleOpenComparison={handleOpenComparison}
              timeLeft={timeLeft}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onFilterChange={setFilters}
              resetFilters={resetFilters}
              teams={uniqueTeams}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {isComparisonOpen && (
        <DriverComparison
          drivers={drivers.filter((d) =>
            comparisonDrivers.includes(d.driverId)
          )}
          onClose={() => setIsComparisonOpen(false)}
        />
      )}

      <CancelVoteDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        onConfirm={confirmCancelVote}
      />
    </VotePageLayout>
  );
};

export default VotePage;

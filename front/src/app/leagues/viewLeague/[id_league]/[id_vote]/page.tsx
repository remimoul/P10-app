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
import { useParams, useRouter } from "next/navigation";
import { RiLoader2Fill } from "react-icons/ri";
import { useQuery, gql } from "@apollo/client";

interface RaceInfo {
  grandPrix: string;
  country: string;
  circuit: string;
  location: string;
  date: string;
  startTime: string;
}

const GET_LEAGUE = gql`
  query ExampleQuery($input: GetLeagueInput!) {
    getLeague(input: $input) {
      name
    }
  }
`;

const VotePage = () => {
  const { id_league } = useParams();
  const router = useRouter();
  const { isLoaded: userLoaded } = useUser();
  const [tab, setTab] = useState<"Info" | "Vote">("Info");
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [comparisonDrivers, setComparisonDrivers] = useState<string[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [topVotedDrivers, setTopVotedDrivers] = useState<
    { driverId: string; votes: number }[]
  >([]);
  const [nextRaceInfo, setNextRaceInfo] = useState<RaceInfo | null>(null);

  const {
    nextRace,
    loading: nextRaceLoading,
    error: nextRaceError,
  } = useNextRace();

  const {
    selectedDriver,
    confirmedVote,
    userVote,
    showCancelDialog,
    setShowCancelDialog,
    timeLeft,
    voteDeadline,
    setVoteDeadline,
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

  // Fetch league name
  const {
    data: leagueData,
    loading: leagueLoading,
    error: leagueError,
  } = useQuery(GET_LEAGUE, {
    variables: { input: { id: id_league } },
    skip: !id_league,
  });

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
        location: `${nextRace.circuit?.location.locality || ""}, ${
          nextRace.circuit?.location.country || ""
        }`,
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

  const onConfirmVote = async () => {
    await handleConfirmVote();
    router.push(`/leagues/viewLeague/${id_league}`);
  };

  if (!userLoaded || driversLoading || nextRaceLoading || leagueLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
        <RiLoader2Fill className="text-6xl text-red-500 animate-spin" />
        <p className="mt-4 text-xl font-medium text-black">Loading...</p>
      </div>
    );
  }

  if (driversError || nextRaceError || leagueError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
        <p className="text-xl font-medium text-red-500">
          Error loading data:{" "}
          {driversError || nextRaceError || leagueError?.message}
        </p>
        <p className="mt-2 text-gray-600">
          Please try again later or contact support if the issue persists.
        </p>
      </div>
    );
  }

  const leagueName = leagueData?.getLeague?.name || `League #${id_league}`;
  const totalParticipants = leagueData?.getLeague?.members?.length ?? 0;

  return (
    <VotePageLayout voteModified={voteModified}>
      <VotePageHeader leagueName={leagueName} />

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
              raceInfo={
                nextRaceInfo || {
                  grandPrix: "",
                  country: "",
                  circuit: "",
                  location: "",
                  date: "",
                  startTime: "",
                }
              }
              totalVotes={totalVotes}
              totalParticipants={totalParticipants}
              topVotedDrivers={topVotedDrivers}
            />
          ) : (
            <VotingSection
              userVote={userVote}
              confirmedVote={confirmedVote}
              handleConfirmVote={onConfirmVote}
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

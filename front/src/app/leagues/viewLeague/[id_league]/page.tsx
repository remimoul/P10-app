"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Participant } from "@/lib/types/leagues";
import { GiRaceCar } from "react-icons/gi";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { RiLoader2Fill } from "react-icons/ri";
import { useUser } from "@clerk/nextjs";
import { useQuery, gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import Header from "@/components/Leagues/ViewLeagues/Header";
import Ranking from "@/components/Leagues/ViewLeagues/Ranking";
import UserCard from "@/components/Leagues/ViewLeagues/UserCard";
import AddMember from "@/components/Leagues/ViewLeagues/pop-up/AddMember";
import ExitLeague from "@/components/Leagues/ViewLeagues/pop-up/ExitLeague";
import EditLeagueName from "@/components/Leagues/ViewLeagues/pop-up/EditLeagueName";
import ParticipantsList from "@/components/Leagues/ViewLeagues/ParticipantsList";
import { useNextRace } from "@/lib/hooks/useNextRace";

const GET_LEAGUE = gql`
  query ExampleQuery($input: GetLeagueInput!) {
    getLeague(input: $input) {
      name
      members {
        username
      }
    }
  }
`;

const ViewLeague = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const router = useRouter();
  const params = useParams();
  const leagueId = params.id_league as string;
  const { nextRace, loading: nextRaceLoading, error: nextRaceError } = useNextRace();

  // GraphQL query
  const {
    data: leagueData,
    loading: leagueLoading,
    error: leagueError,
  } = useQuery(GET_LEAGUE, {
    variables: {
      input: {
        id: leagueId,
      },
    },
    skip: !leagueId,
  });

  const [timeLeft, setTimeLeft] = useState(3600);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isExitLeagueModalOpen, setIsExitLeagueModalOpen] = useState(false);
  const [isEditLeagueNameModalOpen, setIsEditLeagueNameModalOpen] =
    useState(false);

  const calculateTimeLeft = useCallback(() => {
    if (!nextRace?.date) {
      console.error("No nextRace.date provided");
      return 0;
    }

    try {
      console.log('DEBUG nextRace.date:', nextRace.date, 'nextRace.time:', nextRace.time);

      // Vérification du format de la date
      if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(nextRace.date)) {
        console.error("nextRace.date is not in YYYY-MM-DD format:", nextRace.date);
        return 0;
      }

      let timeStr = nextRace.time;

      if (!timeStr || !/^[0-9]{2}:[0-9]{2}(:[0-9]{2})?$/.test(timeStr)) {
        timeStr = "00:00:00";
      } else if (timeStr.length === 5) {
        timeStr = timeStr + ":00";
      }

      const raceDateTime = new Date(`${nextRace.date}T${timeStr}Z`);
      const now = new Date();

      console.log('raceDateTime:', raceDateTime, 'now:', now);

      if (isNaN(raceDateTime.getTime())) {
        console.error("Invalid race date/time:", { date: nextRace.date, time: timeStr });
        return 0;
      }

      const diff = Math.max(0, Math.floor((raceDateTime.getTime() - now.getTime()) / 1000));
      return diff;
    } catch (error) {
      console.error("Error calculating time left:", error);
      return 0;
    }
  }, [nextRace?.date, nextRace?.time]);

  // Update timer every second
  useEffect(() => {
    const initialTimeLeft = calculateTimeLeft();
    setTimeLeft(initialTimeLeft);
    
    const interval = setInterval(() => {
      setTimeLeft(() => {
        const newTimeLeft = calculateTimeLeft();
        return newTimeLeft > 0 ? newTimeLeft : 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return "0d 0h 0m 0s";
    
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  useEffect(() => {
    if (leagueData && userLoaded && user) {
      // Transformer les membres de la league en participants
      const leagueParticipants: Participant[] =
        leagueData.getLeague.members.map(
          (member: { username: string }, index: number) => ({
            id: `${index + 1}`,
            name: member.username,
            score: Math.floor(Math.random() * 300), // Score temporaire
            hasVoted: false,
            avatar: "", // Avatar par défaut
          })
        );

      // Ajouter l'utilisateur actuel s'il n'est pas déjà dans la liste
      const currentUserExists = leagueParticipants.some(
        (p) => p.name === (user.username || "Racer")
      );
      if (!currentUserExists) {
        leagueParticipants.unshift({
          id: user.id,
          name: user.username || "Racer",
          score: 0,
          hasVoted: false,
          avatar: user.imageUrl,
        });
      }

      setParticipants(leagueParticipants);
    }
  }, [leagueData, userLoaded, user]);

  const handleVote = () => {
    if (leagueId) {
      router.push(`/leagues/viewLeague/${encodeURIComponent(leagueId)}/vote/1`);
    } else {
      toast.error("Aucune league sélectionnée !");
    }
  };

  const handleAddMembers = () => {
    setIsAddMemberModalOpen(true);
  };

  const handleLeaveLeague = () => {
    setIsExitLeagueModalOpen(true);
  };

  const handleEditLeagueName = () => {
    setIsEditLeagueNameModalOpen(true);
  };

  const handleSaveLeagueName = (newName: string) => {
    toast.success(`League name updated to ${newName}`);
    setIsEditLeagueNameModalOpen(false);
  };

  // Gestion des états de chargement et d'erreur
  if (!userLoaded || leagueLoading || nextRaceLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
        <RiLoader2Fill className="text-6xl text-red-500 animate-spin" />
        <p className="mt-4 text-xl font-medium text-black">Loading league...</p>
      </div>
    );
  }

  if (leagueError || nextRaceError) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
        <p className="text-xl font-medium text-red-500">
          Error loading league: {leagueError?.message || nextRaceError}
        </p>
      </div>
    );
  }

  if (!leagueId) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
        <p className="text-xl font-medium text-red-500">
          No league ID provided
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-28 px-8">
      <Header
        league={{
          name: leagueData?.getLeague?.name || "Racing League",
          type: "public",
        }}
        timeLeft={timeLeft}
        formatTime={formatTime}
        handleAddMembers={handleAddMembers}
        handleLeaveLeague={handleLeaveLeague}
        handleEditLeagueName={handleEditLeagueName}
      />

      {nextRace?.name && (
        <div className="flex justify-center items-center mb-6">
          <div className="bg-white/90 border border-red-200 rounded-2xl px-6 py-3 shadow text-center">
            <span className="text-lg font-semibold text-red-700">
              Next race :{" "}
            </span>
            <span className="text-lg font-semibold text-gray-900">
              {nextRace.name}
            </span>
            {nextRace.date && (
              <span className="ml-4 text-gray-600 text-sm">
                ({nextRace.date})
              </span>
            )}
            {timeLeft > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Time until race: {formatTime(timeLeft)}
              </div>
            )}
          </div>
        </div>
      )}

      {participants.length === 1 && (
        <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-xl text-center text-lg mb-6">
          If no new members join within 48 hours, this league will be deleted.
        </div>
      )}

      {user ? (
        <>
          <UserCard
            participant={participants.find((p) => p.id === user.id)}
            timeLeft={timeLeft}
            rank={
              user
                ? [...participants]
                    .sort((a, b) => b.score - a.score)
                    .findIndex((p) => p.id === user.id) + 1
                : null
            }
            handleVote={handleVote}
          />
          <ParticipantsList participants={participants} currentUser={user.id} />
          <Ranking participants={participants} />
        </>
      ) : (
        <div className="text-center py-20">
          <GiRaceCar className="text-6xl text-red-500 mx-auto mb-6" />
          <Button asChild variant="destructive" size="lg">
            <Link href="/sign-in">Login to Join League(s)</Link>
          </Button>
        </div>
      )}

      {isAddMemberModalOpen && (
        <AddMember
          isOpen={isAddMemberModalOpen}
          onClose={() => setIsAddMemberModalOpen(false)}
          onSendInvitation={() => {
            setIsAddMemberModalOpen(false);
          }}
        />
      )}
      {isExitLeagueModalOpen && (
        <ExitLeague
          isOpen={isExitLeagueModalOpen}
          onClose={() => setIsExitLeagueModalOpen(false)}
          onConfirmExit={() => {
            toast.success(
              `Left ${leagueData?.getLeague?.name || "league"} successfully`
            );
            setIsExitLeagueModalOpen(false);
          }}
        />
      )}

      {isEditLeagueNameModalOpen && (
        <EditLeagueName
          isOpen={isEditLeagueNameModalOpen}
          onClose={() => setIsEditLeagueNameModalOpen(false)}
          onSave={handleSaveLeagueName}
        />
      )}
    </div>
  );
};

export default ViewLeague;

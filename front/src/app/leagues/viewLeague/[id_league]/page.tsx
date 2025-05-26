"use client";

import Link from "next/link";
import toast from "react-hot-toast";
import { Participant } from "@/lib/types/leagues";
import { GiRaceCar } from "react-icons/gi";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiLoader2Fill } from "react-icons/ri";
import { useUser, useOrganization } from "@clerk/nextjs";
import { useNextRace } from "@/lib/hooks/useNextRace";

import { Button } from "@/components/ui/button";
import Header from "@/components/Leagues/ViewLeagues/Header";
import Ranking from "@/components/Leagues/ViewLeagues/Ranking";
import UserCard from "@/components/Leagues/ViewLeagues/UserCard";
import AddMember from "@/components/Leagues/ViewLeagues/pop-up/AddMember";
import ExitLeague from "@/components/Leagues/ViewLeagues/pop-up/ExitLeague";
import EditLeagueName from "@/components/Leagues/ViewLeagues/pop-up/EditLeagueName";
import ParticipantsList from "@/components/Leagues/ViewLeagues/ParticipantsList";

const ViewLeague = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const { organization } = useOrganization();
  const router = useRouter();
  const nextRace = useNextRace();
  const [timeLeft, setTimeLeft] = useState(3600);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isExitLeagueModalOpen, setIsExitLeagueModalOpen] = useState(false);
  const [isEditLeagueNameModalOpen, setIsEditLeagueNameModalOpen] =
    useState(false);

  const calculateTimeLeft = () => {
    if (!nextRace.date) return 0;
    const raceDate = new Date(nextRace.date + (nextRace.time ? 'T' + nextRace.time : ''));
    const now = new Date();
    const diff = Math.max(0, Math.floor((raceDate.getTime() - now.getTime()) / 1000));
    return diff;
  };

  useEffect(() => {
    if (userLoaded && user) {
      const displayName = user.username || "Racer";
      setParticipants([
        {
          id: user.id,
          name: displayName,
          score: 0,
          hasVoted: false,
          avatar: user.imageUrl,
        },
        { id: "2", name: "Max Verstappen", score: 245, hasVoted: false },
        { id: "4", name: "Charles Leclerc", score: 150, hasVoted: false },
        { id: "5", name: "Carlos Sainz", score: 120, hasVoted: false },
        { id: "3", name: "Lewis Hamilton", score: 198, hasVoted: false },
      ]);
    }
  }, [userLoaded, user]);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, [nextRace.date, nextRace.time]);

  const handleVote = () => {
    router.push('/leagues/viewLeague/vote')
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
    // API call to update the league name
    toast.success(`League name updated to ${newName}`);
    setIsEditLeagueNameModalOpen(false);
  };

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
  };

  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
        <RiLoader2Fill className="text-6xl text-red-500 animate-spin" />
        <p className="mt-4 text-xl font-medium text-black">Loading ...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-24 px-8">
      <Header
        league={{
          name: organization?.name || "Racing League",
          type: "public",
        }}
        timeLeft={timeLeft}
        formatTime={formatTime}
        handleAddMembers={handleAddMembers}
        handleLeaveLeague={handleLeaveLeague}
        handleEditLeagueName={handleEditLeagueName}
      />

      {nextRace.name && (
        <div className="flex justify-center items-center mb-6">
          <div className="bg-white/90 border border-red-200 rounded-2xl px-6 py-3 shadow text-center">
            <span className="text-lg font-semibold text-red-700">Next race : </span>
            <span className="text-lg font-semibold text-gray-900">{nextRace.name}</span>
            {nextRace.date && (
              <span className="ml-4 text-gray-600 text-sm">({nextRace.date})</span>
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
              `Left ${organization?.name || "league"} successfully`
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

"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Participant } from "@/lib/types";

import { RiLoader2Fill } from "react-icons/ri";
import RaceRanking from "@/components/Racings/Ranking/RaceRanking";
import RaceInfo from "@/components/Racings/Ranking/RaceInfo";

export default function LeagueRankingPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (userLoaded && user) {
      setParticipants([
        {
          id: user.id,
          name: user.username || "Moi",
          score: 145,
          hasVoted: true,
        },
        {
          id: "2",
          name: "Matlav",
          score: 130,
          hasVoted: true,
        },
        {
          id: "3",
          name: "Alice",
          score: 125,
          hasVoted: true,
        },
        {
          id: "4",
          name: "Zoe",
          score: 110,
          hasVoted: true,
        },
      ]);
    }
  }, [userLoaded, user]);

  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
        <RiLoader2Fill className="text-6xl text-red-500 animate-spin" />
        <p className="mt-4 text-xl font-medium text-black">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <RaceInfo
          raceName="Grand Prix de Monaco"
          date="28 Mai 2024"
          circuit="Circuit de Monaco"
          podium={{
            first: "Max Verstappen",
            ten: "Charles Leclerc",
          }}
        />

        <RaceRanking participants={participants} />
      </div>
    </div>
  );
}

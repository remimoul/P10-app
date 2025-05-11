"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Participant } from "@/types";

import { RiLoader2Fill } from "react-icons/ri";

import Header from "@/components/Ranking/Header";

import Ranking from "@/components/Leagues/ViewLeagues/Ranking";

export default function LeagueRankingPage({
  params,
}: {
  params: { id_gp: string; id_league: string };
}) {
  const { user, isLoaded: userLoaded } = useUser();
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(3600);
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (userLoaded && user) {
      setParticipants([
        {
          id: user.id,
          name: user.username || "Moi",
          score: 145,
          hasVoted: true,
          avatar: user.imageUrl,
        },
        {
          id: "2",
          name: "Matlav",
          score: 130,
          hasVoted: true,
          avatar: "/avatars/matlav.png",
        },
        {
          id: "3",
          name: "Alice",
          score: 125,
          hasVoted: true,
          avatar: "/avatars/alice.png",
        },
        {
          id: "4",
          name: "Zoe",
          score: 110,
          hasVoted: true,
          avatar: "/avatars/zoe.png",
        },
      ]);
    }
  }, [userLoaded, user]);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d}d ${h}h ${m}m ${s}s`;
  };

  if (!userLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
        <RiLoader2Fill className="text-6xl text-red-500 animate-spin" />
        <p className="mt-4 text-xl font-medium text-black">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <Header
          league={{
            name: "Red Racing",
            type: "private",
          }}
          timeLeft={timeLeft}
          formatTime={formatTime}
          handleAddMembers={() => {}}
          handleLeaveLeague={() => {}}
          participant={participants.find((p) => p.id === user?.id)}
          rank={
            user
              ? [...participants]
                  .sort((a, b) => b.score - a.score)
                  .findIndex((p) => p.id === user.id) + 1
              : null
          }
          handleVote={() => {}}
        />

        <Ranking participants={participants} />
      </div>
    </div>
  );
}

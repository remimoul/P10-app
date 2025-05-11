"use client";

import { use } from "react";
import { Podium } from "@/components/Ranking/Podium";
import { ParticipantsList } from "@/components/Ranking/ParticipantsList";
import { LeagueRankingData } from "@/lib/types";

export default function LeagueRankingPage({
  params,
}: {
  params: Promise<{ id_gp: string; id_league: string }>;
}) {
  const { id_gp, id_league } = use(params);

  const mockRanking: LeagueRankingData = {
    grandPrixName: "Brazil",
    leagueName: "Red Racing",
    participants: [
      { id: "1", name: "Alice", avatar: "/avatars/alice.png", points: 145 },
      { id: "2", name: "Matlav", avatar: "/avatars/matlav.png", points: 130 },
      { id: "3", name: "Bob", avatar: "/avatars/bob.png", points: 125 },
      { id: "4", name: "Lina", avatar: "/avatars/lina.png", points: 110 },
      { id: "5", name: "Max", avatar: "/avatars/max.png", points: 100 },
    ],
  };

  const top3 = mockRanking.participants.slice(0, 3);
  const rest = mockRanking.participants.slice(3);

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {" "}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-black text-center text-gray-800 mb-2">
            {mockRanking.leagueName}
          </h1>
          <h2 className="text-xl text-center text-gray-500 mb-6">
            Grand Prix de {mockRanking.grandPrixName}
          </h2>

          <Podium top3={top3} />
          <ParticipantsList participants={rest} />
        </div>
      </main>
    </div>
  );
}

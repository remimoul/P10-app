"use client";

import { useRouter } from "next/navigation";
import { use } from "react";
import LeagueSection from "@/components/Leagues/LeagueSection";
import { League } from "@/lib/types";

interface PageProps {
  params: Promise<{ id_gp: string }>;
}

export default function SelectLeaguePage({ params }: PageProps) {
  const router = useRouter();
  const { id_gp } = use(params);

  // 👤 MOCK - Ligues auxquelles l'utilisateur est membre
  const userLeagues: League[] = [
    {
      name: "RED RACING",
      members: 6,
      points: 328,
      position: 1,
      type: "private",
    },
    {
      name: "BLUE LIGHTNING",
      members: 6,
      points: 245,
      position: 4,
      type: "private",
    },
  ];

  // Navigation vers le classement de la ligue sélectionnée
  const handleViewLeagueRanking = (index: number) => {
    router.push(`/racing/${id_gp}/ranking/${index + 1}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-black text-center text-gray-900 mb-12">
          Choisissez une ligue pour voir le classement
        </h1>

        {userLeagues.length > 0 ? (
          <LeagueSection
            title="Mes Ligues"
            leagues={userLeagues.map((league, index) => ({
              ...league,
              onClick: () => handleViewLeagueRanking(index),
            }))}
            isPublic={false}
          />
        ) : (
          <p className="text-center text-gray-500">
            Vous n&apos;êtes membre d&apos;aucune ligue pour cette course.
          </p>
        )}
      </main>
    </div>
  );
}

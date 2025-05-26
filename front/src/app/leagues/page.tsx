"use client";

import { useMemo } from "react";
import { useQuery, gql } from "@apollo/client";
import type { League } from "@/lib/types/leagues";
import Header from "@/components/Leagues/Header";
import ReadyToRace from "@/components/Leagues/ReadyToRace";
import LeagueSection from "@/components/Leagues/LeagueSection";
import { useRouter } from "next/navigation";

// Requête GraphQL
const GET_ALL_LEAGUES = gql`
  query GetAllLeagues {
    getAllLeagues {
      id
      name
      private
      members {
        username
      }
    }
  }
`;

// Interface pour les données GraphQL
interface GraphQLLeague {
  id: string;
  name: string;
  private: boolean;
  members: Array<{
    username: string;
  }>;
}

export default function Leagues() {
  const router = useRouter();

  // Requête GraphQL avec Apollo Client
  const { data, loading, error, refetch } = useQuery(GET_ALL_LEAGUES, {
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  // Transformation des données GraphQL vers le format League
  const leagues: League[] = useMemo(() => {
    if (!data?.getAllLeagues) return [];

    return data.getAllLeagues.map((gqlLeague: GraphQLLeague, index: number) => ({
      id: gqlLeague.id,
      name: gqlLeague.name,
      members: gqlLeague.members.length,
      points: 0, // À ajuster selon vos besoins
      position: index + 1, // Position basée sur l'ordre
      type: gqlLeague.private ? "private" : "public",
    }));
  }, [data]);

  const publicLeagues = useMemo(() => leagues.filter((l) => l.type === "public"), [leagues]);
  const privateLeagues = useMemo(() => leagues.filter((l) => l.type === "private"), [leagues]);

  const publicLeaguesWithClick = publicLeagues.map((league) => ({
    ...league,
    onClick: () => router.push(`/leagues/viewLeague/${encodeURIComponent(league.id || league.name)}`),
  }));

  const privateLeaguesWithClick = privateLeagues.map((league) => ({
    ...league,
    onClick: () => router.push(`/leagues/viewLeague/${encodeURIComponent(league.id || league.name)}`),
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
        <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600">Chargement des leagues...</p>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
        <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <p className="text-lg font-semibold">Erreur lors du chargement</p>
              <p className="text-sm">{error.message}</p>
            </div>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <Header />

        <div className="space-y-20 pb-12">
          <LeagueSection title="Public Leagues" leagues={publicLeaguesWithClick} isPublic={true} />
          <LeagueSection title="Private Leagues" leagues={privateLeaguesWithClick} isPublic={false} />
        </div>

        <ReadyToRace />
      </main>
    </div>
  );
}

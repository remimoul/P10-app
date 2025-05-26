"use client";

import { useMemo, useEffect, useState } from "react";
import type { League } from "@/lib/types/leagues";
import Header from "@/components/Leagues/Header";
import ReadyToRace from "@/components/Leagues/ReadyToRace";
import LeagueSection from "@/components/Leagues/LeagueSection";
import { useRouter } from "next/navigation";

// Interface pour les données de l'API
interface ApiLeague {
  id: string;
  name: string;
  private: boolean;
  joinCode: string;
  avatar: string | null;
  admin: {
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
  };
  members: Array<{
    id: string;
    username: string;
    firstName: string | null;
    lastName: string | null;
    email: string;
  }>;
}

export default function Leagues() {
  const router = useRouter();
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:4500/leagues", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const apiLeagues: ApiLeague[] = await response.json();

        // Transformation des données API vers le format League
        const transformedLeagues: League[] = apiLeagues.map((apiLeague, index) => ({
          id: apiLeague.id,
          name: apiLeague.name,
          members: apiLeague.members.length,
          points: 0, // À ajuster selon vos besoins
          position: index + 1, // Position basée sur l'ordre
          type: apiLeague.private ? "private" : "public",
        }));

        setLeagues(transformedLeagues);
        setError(null);
      } catch (err) {
        console.error("Erreur lors de la récupération des leagues:", err);

        // Message d'erreur plus détaillé
        if (err instanceof TypeError && err.message.includes("fetch")) {
          setError("Impossible de se connecter au serveur. Vérifiez que l'API est démarrée sur localhost:4500");
        } else {
          setError(err instanceof Error ? err.message : "Une erreur est survenue");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

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
          <div className="text-center">Chargement des leagues...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
        <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
          <div className="text-center text-red-500">Erreur: {error}</div>
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

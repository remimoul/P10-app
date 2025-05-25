"use client";

import { useMemo } from "react";
import type { League } from "@/lib/types/leagues";
import Header from "@/components/Leagues/Header";
import ReadyToRace from "@/components/Leagues/ReadyToRace";
import LeagueSection from "@/components/Leagues/LeagueSection";
import { useRouter } from "next/navigation";

const leagues: League[] = []; // simulate when no leagues

// const leagues: League[] = [
//   {
//     name: "RED RACING",
//     members: 6,
//     points: 328,
//     position: 1,
//     type: "public",
//     id: "1",
//   },
//   {
//     name: "POKEMON",
//     members: 6,
//     points: 295,
//     position: 2,
//     type: "private",
//     id: "2",
//   },
//   {
//     name: "THE NEW AVENGERS",
//     members: 6,
//     points: 267,
//     position: 3,
//     type: "public",
//     id: "3",
//   },
//   {
//     name: "AVENGERS",
//     members: 6,
//     points: 245,
//     position: 4,
//     type: "private",
//     id: "4",
//   },
// ];

export default function Leagues() {
  const router = useRouter();
  const publicLeagues = useMemo(
    () => leagues.filter((l) => l.type === "public"),
    []
  );
  const privateLeagues = useMemo(
    () => leagues.filter((l) => l.type === "private"),
    []
  );

  const publicLeaguesWithClick = publicLeagues.map((league) => ({
    ...league,
    onClick: () =>
      router.push(
        `/leagues/viewLeague/${encodeURIComponent(league.id || league.name)}`
      ),
  }));
  const privateLeaguesWithClick = privateLeagues.map((league) => ({
    ...league,
    onClick: () =>
      router.push(
        `/leagues/viewLeague/${encodeURIComponent(league.id || league.name)}`
      ),
  }));

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <Header />

        <div className="space-y-20 pb-12">
          <LeagueSection
            title="Public Leagues"
            leagues={publicLeaguesWithClick}
            isPublic={true}
          />
          <LeagueSection
            title="Private Leagues"
            leagues={privateLeaguesWithClick}
            isPublic={false}
          />
        </div>

        <ReadyToRace />
      </main>
    </div>
  );
}

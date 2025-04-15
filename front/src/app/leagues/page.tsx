"use client";

import { useMemo } from "react";
import type { League } from "@/lib/types";

import Header from "@/components/Leagues/Header";
import { ReadyToRace } from "@/components/Leagues/ReadyToRace";
import LeagueSection from "@/components/Leagues/LeagueSection";

// const leagues: League[] = []; // simulate when no leagues

const leagues: League[] = [
  { name: "RED RACING", members: 6, points: 328, position: 1, type: "public" },
  {
    name: "ELECTRON RACING",
    members: 6,
    points: 295,
    position: 2,
    type: "private",
  },
  { name: "SILVERBOLT", members: 6, points: 267, position: 3, type: "public" },
  {
    name: "BLUE LIGHTNING",
    members: 6,
    points: 245,
    position: 4,
    type: "private",
  },
];

export const Leagues = () => {
  const publicLeagues = useMemo(
    () => leagues.filter((l) => l.type === "public"),
    []
  );
  const privateLeagues = useMemo(
    () => leagues.filter((l) => l.type === "private"),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <Header />

        <div className="space-y-20">
          <LeagueSection
            title="Public Leagues"
            leagues={publicLeagues}
            isPublic={true}
          />
          <LeagueSection
            title="Private Leagues"
            leagues={privateLeagues}
            isPublic={false}
          />
        </div>

        <ReadyToRace />
      </main>
    </div>
  );
};

export default Leagues;

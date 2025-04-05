"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { League, LeagueSectionProps } from "@/types";
import { LeagueCard } from "@/components/Leagues/LeagueCard";
import { ReadyToRace } from "@/components/Leagues/ReadyToRace";
import { SectionHeader } from "@/components/Leagues/SectionHeader";

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

const Header = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center mb-16"
  >
    <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent mb-4">
      F1 LEAGUES
    </h1>
    <div className="flex items-center justify-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
      <p className="text-gray-600 uppercase tracking-widest text-lg">
        Join the ultimate racing competition
      </p>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
    </div>
  </motion.div>
);

const LeagueSection = ({ title, leagues, isPublic }: LeagueSectionProps) => (
  <section className="relative">
    <SectionHeader title={title} isPublic={isPublic} />

    {leagues.length === 0 ? (
      <p className="text-center text-gray-500 text-lg">
        No league for the moment.
      </p>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {leagues.map((league, idx) => (
          <LeagueCard
            key={idx}
            league={league}
            index={idx}
            isPublic={isPublic}
          />
        ))}
      </div>
    )}
  </section>
);

export default Leagues;

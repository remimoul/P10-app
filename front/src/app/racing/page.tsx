"use client";

import { useState } from "react";
import { GrandPrix } from "@/types";
import { RacingTabs } from "@/components/Racings/RacingTabs";
import { RacingList } from "@/components/Racings/RacingList";

const mockGrandPrix: GrandPrix[] = [
  {
    id: "1",
    season: "2025",
    date: "2025-11-03",
    time: "14:00",
    track: {
      id: "1",
      countryName: "Brazil",
      trackName: "Interlagos",
    },
    ranking: [
      {
        id: "r1",
        position: 10,
        isDNF: false,
        pilot: {
          id: "p1",
          name: "Charles Leclerc",
          acronym: "LEC",
        },
      },
      {
        id: "r2",
        position: 5,
        isDNF: false,
        pilot: {
          id: "p2",
          name: "Esteban Ocon",
          acronym: "OCO",
        },
      },
    ],
  },
  {
    id: "2",
    season: "2025",
    date: "2025-12-01",
    time: "15:00",
    track: {
      id: "2",
      countryName: "USA",
      trackName: "Las Vegas",
    },
  },
  {
    id: "3",
    season: "2024",
    date: "2024-12-01",
    time: "15:00",
    track: {
      id: "3",
      countryName: "France",
      trackName: "Paul Ricard",
    },
    ranking: [
      {
        id: "r3",
        position: 10,
        isDNF: false,
        pilot: {
          id: "p3",
          name: "Fernando Alonso",
          acronym: "ALO",
        },
      },
      {
        id: "r4",
        position: 2,
        isDNF: false,
        pilot: {
          id: "p4",
          name: "Carlos Sainz",
          acronym: "SAI",
        },
      },
    ],
  },
  {
    id: "4",
    season: "2024",
    date: "2024-11-01",
    time: "15:00",
    track: {
      id: "4",
      countryName: "Japon",
      trackName: "Suzuka",
    },
    ranking: [
      {
        id: "r5",
        position: 0,
        isDNF: true,
        pilot: {
          id: "p5",
          name: "Max Verstappen",
          acronym: "VER",
        },
      },
      {
        id: "r6",
        position: 10,
        isDNF: false,
        pilot: {
          id: "p6",
          name: "Lando Norris",
          acronym: "NOR",
        },
      },
    ],
  },
];


export default function RacingPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");

  const today = new Date();

  const filteredRaces = mockGrandPrix.filter((gp) =>
    tab === "past" ? new Date(gp.date) < today : new Date(gp.date) >= today
  );

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <RacingTabs activeTab={tab} onTabChange={setTab} />
        <RacingList grandPrixList={filteredRaces} isPast={tab === "past"} />
      </main>
    </div>
  );
}

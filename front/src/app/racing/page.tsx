"use client";

import { useState } from "react";
import { GrandPrix } from "@/types";
import { RacingTabs } from "@/components/Racings/RacingTabs";
import { RacingList } from "@/components/Racings/RacingList";
import { Pagination } from "@/components/Racings/Pagination";
import { SearchInput } from "@/components/Racings/SearchInput";
import { SeasonFilter } from "@/components/Racings/SeasonFilter";

const ITEMS_PER_PAGE = 2;

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
        pilot: { id: "p1", name: "Charles Leclerc", acronym: "LEC" },
      },
      {
        id: "r2",
        position: 5,
        isDNF: false,
        pilot: { id: "p2", name: "Esteban Ocon", acronym: "OCO" },
      },
    ],
  },
  {
    id: "45",
    season: "2023",
    date: "2023-11-03",
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
        pilot: { id: "p1", name: "Charles Leclerc", acronym: "LEC" },
      },
      {
        id: "r2",
        position: 5,
        isDNF: false,
        pilot: { id: "p2", name: "Esteban Ocon", acronym: "OCO" },
      },
    ],
  },
  {
    id: "2",
    season: "2025",
    date: "2025-12-01",
    time: "15:00",
    track: { id: "2", countryName: "USA", trackName: "Las Vegas" },
  },
  {
    id: "3",
    season: "2024",
    date: "2024-12-01",
    time: "15:00",
    track: { id: "3", countryName: "France", trackName: "Paul Ricard" },
    ranking: [
      {
        id: "r3",
        position: 10,
        isDNF: false,
        pilot: { id: "p3", name: "Fernando Alonso", acronym: "ALO" },
      },
      {
        id: "r4",
        position: 2,
        isDNF: false,
        pilot: { id: "p4", name: "Carlos Sainz", acronym: "SAI" },
      },
    ],
  },
  {
    id: "4",
    season: "2024",
    date: "2024-11-01",
    time: "15:00",
    track: { id: "4", countryName: "Japon", trackName: "Suzuka" },
    ranking: [
      {
        id: "r5",
        position: 0,
        isDNF: true,
        pilot: { id: "p5", name: "Max Verstappen", acronym: "VER" },
      },
      {
        id: "r6",
        position: 10,
        isDNF: false,
        pilot: { id: "p6", name: "Lando Norris", acronym: "NOR" },
      },
    ],
  },
];

export default function Racing() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("");

  const today = new Date();

  const tabFiltered = mockGrandPrix.filter((gp) =>
    tab === "past" ? new Date(gp.date) < today : new Date(gp.date) >= today
  );

  const searchFiltered = tabFiltered.filter((gp) => {
    const target =
      `${gp.track.countryName} ${gp.track.trackName}`.toLowerCase();
    return target.includes(search.toLowerCase());
  });

  const filteredRaces =
    tab === "past" && season
      ? searchFiltered.filter((gp) => gp.season === season)
      : searchFiltered;

  const totalPages = Math.ceil(filteredRaces.length / ITEMS_PER_PAGE);
  const paginatedRaces = filteredRaces.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (newTab: "upcoming" | "past") => {
    setTab(newTab);
    setCurrentPage(1);
    setSearch("");
    setSeason("");
  };

  const availableSeasons = [
    ...new Set(
      mockGrandPrix
        .filter((gp) => new Date(gp.date) < today)
        .map((gp) => gp.season)
    ),
  ]
    .sort()
    .reverse();

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-14 lg:py-16 sm:py-18">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 space-y-8">
        <h1
          className="text-5xl sm:text-6xl font-extrabold text-center tracking-tighter mb-6 
    bg-gradient-to-r from-red-600 to-red-300 bg-clip-text text-transparent 
    drop-shadow-md"
        >
          Racing
        </h1>

        <RacingTabs activeTab={tab} onTabChange={handleTabChange} />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap">
          <div className="w-full flex justify-center">
            <div className="w-[90%] max-w-sm">
              <SearchInput value={search} onChange={setSearch} />
            </div>
          </div>

          {tab === "past" && (
            <div className="w-auto sm:w-auto">
              <SeasonFilter
                seasons={availableSeasons}
                selected={season}
                onChange={setSeason}
              />
            </div>
          )}
        </div>

        <RacingList grandPrixList={paginatedRaces} isPast={tab === "past"} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </main>
    </div>
  );
}

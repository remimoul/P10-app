"use client";

import { useState } from "react";
import { RacingTabs } from "@/components/Racings/RacingTabs";
import { RacingList } from "@/components/Racings/RacingList";
import { Pagination } from "@/components/Racings/Pagination";
import { SearchInput } from "@/components/Racings/SearchInput";
import { SeasonFilter } from "@/components/Racings/SeasonFilter";
import { mockGrandPrix } from "@/lib/data/mockGrandPrix";

const ITEMS_PER_PAGE = 2;

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
        <h1 className="text-5xl font-bold bg-gradient-to-r from-red-900 to-red-600 bg-clip-text text-transparent mb-4">
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

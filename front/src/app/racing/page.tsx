"use client";

import { useState, useEffect } from "react";
import { RacingTabs } from "@/components/Racings/RacingTabs";
import { RacingList } from "@/components/Racings/RacingList";
import { Pagination } from "@/components/Racings/Pagination";
import { SearchInput } from "@/components/Racings/SearchInput";
import { SeasonFilter } from "@/components/Racings/SeasonFilter";
import { ergastService } from "@/lib/services/ergastService";
import { GrandPrix } from "@/lib/types/racing";

const ITEMS_PER_PAGE = 12;

export default function Racing() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [season, setSeason] = useState("");
  const [grandPrixList, setGrandPrixList] = useState<GrandPrix[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (tab === "upcoming") {
          const ergastRaces = await ergastService.getRaces(season || undefined);
          const currentDate = new Date();

          const upcomingRaces = ergastRaces
            .filter((race) => new Date(race.date) >= currentDate)
            .map((race) => ({
              id: race.round,
              date: race.date,
              time: "TBD",
              season: race.season,
              track: {
                id: race.Circuit.circuitId,
                name: race.Circuit.circuitName,
                country: race.Circuit.Location.country,
                city: race.Circuit.Location.locality,
                length: Number(race.circuitInfo?.length) || 0,
                numberOfLaps: Number(race.circuitInfo?.numberOfLaps) || 0,
                recordLap: race.circuitInfo?.lapRecord?.time || "",
                recordHolder: race.circuitInfo?.lapRecord?.driver || "",
                firstGrandPrix: 0,
                lapRecord: race.circuitInfo?.lapRecord?.time || "",
                circuitLength: race.circuitInfo?.length || "",
                raceDistance: "",
                imageUrl: "",
              },
              status: "Scheduled",
              type: "Race",
            }));

          setGrandPrixList(upcomingRaces);
        } else {
          setGrandPrixList([]);
        }
      } catch (err) {
        setError("Failed to fetch racing data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tab, season]);

  const allPastSeasons = Array.from(
    new Set(
      grandPrixList
        .filter((gp) => new Date(gp.date) < new Date())
        .map((gp) => gp.season)
    )
  )
    .sort()
    .reverse();

  const searchFiltered = grandPrixList.filter((gp) => {
    const target =
      `${gp.track.country} ${gp.track.name}`.toLowerCase();
    return target.includes(search.toLowerCase());
  });

  const filteredRaces = season
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden py-18 lg:py-18 sm:py-18">
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 space-y-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
            RACING
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-800 mt-2 rounded-full" />
        </div>

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
                seasons={allPastSeasons}
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

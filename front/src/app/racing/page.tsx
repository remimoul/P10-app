"use client";

import { useState, useEffect } from "react";
import { RacingTabs } from "@/components/Racings/RacingTabs";
import { RacingList } from "@/components/Racings/RacingList";
import { Pagination } from "@/components/Racings/Pagination";
import { SearchInput } from "@/components/Racings/SearchInput";
import { SeasonFilter } from "@/components/Racings/SeasonFilter";
import { f1Service } from "@/lib/services/f1Service";
import { GrandPrix } from "@/types/racing";

const ITEMS_PER_PAGE = 10;

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

        const [sessions, meetings] = await Promise.all([
          f1Service.getSessions(season || undefined),
          f1Service.getMeetings(season || undefined),
        ]);

        const meetingsMap = new Map(meetings.map((m) => [m.meeting_key, m]));

        const grandPrixData = sessions
          .filter((session) => {
            const sessionDate = new Date(session.date_start);
            return tab === "past"
              ? sessionDate < new Date()
              : sessionDate >= new Date();
          })
          .map((session) =>
            f1Service.transformToGrandPrix(
              session,
              meetingsMap.get(session.meeting_key)!
            )
          )
          .filter((gp) => gp !== null);

        setGrandPrixList(grandPrixData);
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
      `${gp.track.countryName} ${gp.track.trackName}`.toLowerCase();
    return target.includes(search.toLowerCase());
  });

  const filteredRaces =
    tab === "past" && season
      ? searchFiltered.filter(
          (gp) => new Date(gp.date) < new Date() && gp.season === season
        )
      : tab === "past"
      ? searchFiltered.filter((gp) => new Date(gp.date) < new Date())
      : tab === "upcoming" && season
      ? searchFiltered.filter(
          (gp) => new Date(gp.date) >= new Date() && gp.season === season
        )
      : searchFiltered.filter((gp) => new Date(gp.date) >= new Date());

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

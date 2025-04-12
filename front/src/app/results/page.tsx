"use client";

import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ViewMode } from "@/types";
import { races, drivers, seasons } from "@/lib/data/resultData";
import Filters from "@/components/Results/Filters";
import RaceInfo from "@/components/Results/RaceInfo";
import ResultsTable from "@/components/Results/ResultsTable";
import NoRacesMessage from "@/components/Results/NoRacesMessage";

const Ranking = () => {
  const [selectedSeason, setSelectedSeason] = useState(seasons[0]);
  const [selectedRace, setSelectedRace] = useState(races[0].id);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("race");

  const filteredRaces = races.filter((race) => race.season === selectedSeason);

  useEffect(() => {
    if (!filteredRaces.some((race) => race.id === selectedRace)) {
      setSelectedRace(filteredRaces[0]?.id || 0);
    }
  }, [selectedSeason, filteredRaces, selectedRace]);

  const selectedRaceData = races.find((race) => race.id === selectedRace);

  const filteredDrivers = drivers
    .filter((driver) => {
      if (selectedCountry) {
        return driver.country === selectedCountry;
      }
      return true;
    })
    .map((driver) => {
      const raceResult = driver.raceResults?.[selectedRace];
      if (raceResult) {
        return {
          ...driver,
          position: raceResult.position,
          status: raceResult.status,
          time: raceResult.time,
          laps: raceResult.laps,
        };
      }
      return driver;
    })
    .sort((a, b) => {
      if (a.status === "Finished" && b.status !== "Finished") return -1;
      if (a.status !== "Finished" && b.status === "Finished") return 1;
      return a.position - b.position;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                RACES RESULTS
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-800 mt-2 rounded-full" />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setViewMode("race")}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden group text-xl ${
                  viewMode === "race"
                    ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-200"
                    : "bg-white text-gray-700 border border-gray-200 hover:shadow-lg hover:shadow-red-100"
                }`}
              >
                <span className="relative z-10 flex items-center">
                  Race
                  {viewMode !== "race" && (
                    <span className="ml-2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <FaArrowRight />
                    </span>
                  )}
                </span>
                {viewMode !== "race" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </>
                )}
              </button>
              <button
                onClick={() => setViewMode("championship")}
                className={`px-6 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden group text-xl ${
                  viewMode === "championship"
                    ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-200"
                    : "bg-white text-gray-700 border border-gray-200 hover:shadow-lg hover:shadow-red-100"
                }`}
              >
                <span className="relative z-10 flex items-center">
                  Championship
                  {viewMode !== "championship" && (
                    <span className="ml-2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <FaArrowRight />
                    </span>
                  )}
                </span>
                {viewMode !== "championship" && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </>
                )}
              </button>
            </div>
          </div>

          <Filters
            selectedSeason={selectedSeason}
            selectedRace={selectedRace}
            selectedCountry={selectedCountry}
            filteredRaces={filteredRaces}
            onSeasonChange={setSelectedSeason}
            onRaceChange={setSelectedRace}
            onCountryChange={setSelectedCountry}
          />

          {viewMode === "race" && selectedRaceData && (
            <RaceInfo race={selectedRaceData} />
          )}

          {filteredRaces.length > 0 ? (
            <ResultsTable drivers={filteredDrivers} viewMode={viewMode} />
          ) : (
            <NoRacesMessage season={selectedSeason} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ranking;

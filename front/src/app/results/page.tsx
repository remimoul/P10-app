"use client";

import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import Filters from "@/components/Results/Filters";
import RaceInfo from "@/components/Results/RaceInfo";
import ResultsTable from "@/components/Results/ResultsTable";
import NoRacesMessage from "@/components/Results/NoRacesMessage";
import { useRaces } from "@/lib/hooks/useRaces";
import { useDrivers } from "@/lib/hooks/useDrivers";
import { formatDate } from "@/lib/utils/dateAndTime";

const Ranking = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [viewMode, setViewMode] = useState<'race' | 'championship'>('race');

  const {
    races,
    selectedSeason,
    selectedRace,
    selectedDate,
    loading: racesLoading,
    setSelectedSeason,
    setSelectedRace,
    setSelectedDate,
    filteredRaces,
    uniqueDates,
  } = useRaces();

  const selectedRaceData = races.find(
    (race) => Number(race.id) === selectedRace
  );

  const { loading: driversLoading, filteredDrivers } = useDrivers(
    selectedRace,
    selectedCountry,
    false
  );

  const racesForFilters = filteredRaces
    .filter(
      (session) =>
        !selectedDate || formatDate(session.startTime) === selectedDate
    )
    .map((session) => {
      return {
        id: Number(session.id),
        name: session.name,
        country: '',
        date: formatDate(session.startTime),
        season: '',
        circuit: '',
        laps: 0,
        length: '0',
        lapRecord: '',
        recordHolder: '',
        recordYear: '',
        ergastData: undefined,
      };
    });

  const selectedRaceInfo = selectedRaceData
    ? {
        id: Number(selectedRaceData.id),
        name: selectedRaceData.name,
        country: '',
        date: formatDate(selectedRaceData.startTime),
        season: '',
        circuit: '',
        laps: 0,
        length: '0',
        lapRecord: '',
        recordHolder: '',
        recordYear: '',
      }
    : null;

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    const filtered = filteredRaces.filter(
      (session) => !date || formatDate(session.startTime) === date
    );
    if (filtered.length === 1) {
      setSelectedRace(Number(filtered[0].id));
    }
  };

  if (racesLoading || driversLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-14 px-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                RACES RESULTS
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-800 mt-2 rounded-full" />
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs sm:max-w-none">
              <button
                onClick={() => setViewMode('race')}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden group text-xl ${
                  viewMode === 'race'
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:shadow-lg hover:shadow-red-100'
                }`}
              >
                <span className="relative z-10 flex items-center">
                  Race
                  {viewMode !== 'race' && (
                    <span className="ml-2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <FaArrowRight />
                    </span>
                  )}
                </span>
                {viewMode !== 'race' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </>
                )}
              </button>
              <button
                onClick={() => setViewMode('championship')}
                className={`w-full sm:w-auto px-6 py-2.5 rounded-full transition-all duration-300 relative overflow-hidden group text-xl ${
                  viewMode === 'championship'
                    ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-200'
                    : 'bg-white text-gray-700 border border-gray-200 hover:shadow-lg hover:shadow-red-100'
                }`}
              >
                <span className="relative z-10 flex items-center">
                  Championship
                  {viewMode !== 'championship' && (
                    <span className="ml-2 text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                      <FaArrowRight />
                    </span>
                  )}
                </span>
                {viewMode !== 'championship' && (
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
            selectedRace={selectedRace ?? 0}
            selectedCountry={selectedCountry}
            filteredRaces={racesForFilters}
            uniqueDates={uniqueDates}
            selectedDate={selectedDate}
            onSeasonChange={setSelectedSeason}
            onRaceChange={setSelectedRace}
            onCountryChange={setSelectedCountry}
            onDateChange={handleDateChange}
          />

          {viewMode === 'race' && selectedRaceInfo && (
            <RaceInfo race={{
              ...selectedRaceInfo
            }} />
          )}

          {filteredRaces.length > 0 ? (
            <ResultsTable drivers={filteredDrivers} viewMode={viewMode} />
          ) : (
            <NoRacesMessage message="No races found" season={selectedSeason?.toString() ?? ''} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ranking;

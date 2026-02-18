"use client";

import React, { useMemo, useEffect } from "react";
import Filters from "@/components/Results/Filters";
import RaceInfo from "@/components/Results/RaceInfo";
import ResultsTable from "@/components/Results/ResultsTable";
import NoRacesMessage from "@/components/Results/NoRacesMessage";
import { useRaces } from "@/lib/hooks/useRaces";
import { useDrivers } from "@/lib/hooks/useDrivers";
import { formatDate } from "@/lib/utils/dateAndTime";
import LoadingScreen from "@/components/common/LoadingScreen";
import ErrorBoundary from "@/components/common/ErrorBoundary";
// import { FaArrowRight } from "react-icons/fa";

const Ranking = () => {
  const {
    selectedSeason,
    selectedRace,
    selectedDate,
    loading: racesLoading,
    setSelectedSeason,
    setSelectedRace,
    setSelectedDate,
    filteredRaces,
    uniqueDates,
    ergastRaces,
    meetingsMap,
    availableSeasons,
  } = useRaces();

  const selectedCountry = "";
  const isSprint = false; // You can add logic to determine if it's a sprint

  const { filteredDrivers, loading: driversLoading } = useDrivers(
    selectedRace,
    selectedCountry,
    isSprint
  );

  // Don't show loading if there's no selected race
  const shouldShowLoading = racesLoading || (driversLoading && selectedRace !== null);

  // Find the round for the selected race by matching date
  const selectedRound = useMemo(() => {
    if (!selectedRace || !ergastRaces.length) return undefined;

    const selectedRaceData = filteredRaces.find(
      (race) => Number(race.id) === selectedRace
    );
    if (!selectedRaceData) return undefined;

    const raceDate = new Date(selectedRaceData.startTime);
    const matchingErgastRace = ergastRaces.find((ergastRace) => {
      const ergastDate = new Date(ergastRace.date);
      return (
        ergastDate.getFullYear() === raceDate.getFullYear() &&
        ergastDate.getMonth() === raceDate.getMonth() &&
        ergastDate.getDate() === raceDate.getDate()
      );
    });

    return matchingErgastRace?.round;
  }, [selectedRace, filteredRaces, ergastRaces]);

  // Filter races by selected date
  const dateFilteredRaces = useMemo(() => {
    if (!selectedDate) return filteredRaces;
    return filteredRaces.filter(
      (race) => formatDate(race.startTime) === selectedDate
    );
  }, [filteredRaces, selectedDate]);

  // Convert Session[] to Race[] format for Filters component
  const racesForFilters = useMemo(() => {
    return dateFilteredRaces.map((session) => ({
      id: Number(session.id),
      name: session.name,
      country: "",
      date: session.startTime,
      circuit: "",
      season: selectedSeason,
    }));
  }, [dateFilteredRaces, selectedSeason]);

  // Get selected race data for RaceInfo component
  const selectedRaceData = useMemo(() => {
    try {
      if (!selectedRace) return null;

      const session = filteredRaces.find(
        (race) => Number(race.id) === selectedRace
      );
      if (!session) return null;

      // Find matching Ergast race
      const raceDate = new Date(session.startTime);
      const matchingErgastRace = ergastRaces.find((ergastRace) => {
        const ergastDate = new Date(ergastRace.date);
        return (
          ergastDate.getFullYear() === raceDate.getFullYear() &&
          ergastDate.getMonth() === raceDate.getMonth() &&
          ergastDate.getDate() === raceDate.getDate()
        );
      });

      // Get meeting data for circuit info - find by session ID
      const meeting = meetingsMap.get(selectedRace);

      return {
        id: Number(session.id),
        name: session.name,
        country: matchingErgastRace?.Circuit?.Location?.country || meeting?.track?.country || "",
        date: formatDate(session.startTime),
        circuit: matchingErgastRace?.Circuit?.circuitName || meeting?.track?.name || "",
        laps: matchingErgastRace?.circuitInfo?.numberOfLaps 
          ? parseInt(matchingErgastRace.circuitInfo.numberOfLaps) 
          : meeting?.track?.numberOfLaps,
        length: matchingErgastRace?.circuitInfo?.length || meeting?.track?.circuitLength || "",
        lapRecord: matchingErgastRace?.circuitInfo?.lapRecord?.time || meeting?.track?.lapRecord || "",
        recordHolder: matchingErgastRace?.circuitInfo?.lapRecord?.driver || meeting?.track?.recordHolder || "",
        recordYear: matchingErgastRace?.circuitInfo?.lapRecord?.year || "",
        season: selectedSeason,
        ergastData: matchingErgastRace
          ? {
              round: matchingErgastRace.round,
              raceName: matchingErgastRace.raceName,
              circuitId: matchingErgastRace.Circuit.circuitId,
              circuitUrl: matchingErgastRace.Circuit.url,
              location: matchingErgastRace.Circuit.Location,
            }
          : undefined,
      };
    } catch (error) {
      console.error("Error building selectedRaceData:", error);
      return null;
    }
  }, [selectedRace, filteredRaces, ergastRaces, selectedSeason, meetingsMap]);

  // Check for errors - monitor for unexpected states
  useEffect(() => {
    // Check if we're stuck in loading for too long (potential error)
    const timeout = setTimeout(() => {
      if (racesLoading && !selectedSeason) {
        // If we've been loading for a while without getting data, might be an error
        console.warn("Results page loading timeout - potential error");
      }
    }, 10000); // 10 seconds timeout

    return () => clearTimeout(timeout);
  }, [racesLoading, selectedSeason]);

  if (shouldShowLoading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 relative overflow-hidden py-18 lg:py-18 sm:py-18">
        <main className="relative z-10 max-w-7xl mx-auto px-4 py-12 space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              RESULTS
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-800 mt-2 rounded-full" />
          </div>

          <Filters
            selectedSeason={selectedSeason}
            selectedRace={selectedRace || 0}
            selectedCountry={selectedCountry}
            filteredRaces={racesForFilters}
            uniqueDates={uniqueDates}
            selectedDate={selectedDate}
            onSeasonChange={setSelectedSeason}
            onRaceChange={setSelectedRace}
            onCountryChange={() => {}}
            onDateChange={setSelectedDate}
            availableSeasons={availableSeasons}
          />

          {selectedRaceData && <RaceInfo race={selectedRaceData} />}

          {filteredRaces.length === 0 ? (
            <NoRacesMessage 
              season={selectedSeason}
              message="No races available for this season"
            />
          ) : selectedSeason && selectedRound ? (
            <ResultsTable
              drivers={filteredDrivers}
              season={selectedSeason}
              round={selectedRound}
            />
          ) : (
            <ResultsTable
              drivers={filteredDrivers}
              season={undefined}
              round={undefined}
            />
          )}
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default Ranking;

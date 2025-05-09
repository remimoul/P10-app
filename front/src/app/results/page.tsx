"use client";

import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { ViewMode, DriverTableData } from "@/lib/types/racing";
import {
  RACE_POINTS,
  SPRINT_POINTS,
  FASTEST_LAP_POINTS,
} from "@/lib/types/racing";
import Filters from "@/components/Results/Filters";
import RaceInfo from "@/components/Results/RaceInfo";
import ResultsTable from "@/components/Results/ResultsTable";
import NoRacesMessage from "@/components/Results/NoRacesMessage";
import { f1Service } from "@/lib/services/f1Service";
import {
  Session,
  Meeting,
  Driver,
  Position,
  Lap,
  Grid,
  LapTime,
  Stint,
} from "@/lib/types/racing";
import { formatDate } from "@/lib/utils/date";

const Ranking = () => {
  const [races, setRaces] = useState<Session[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [grid, setGrid] = useState<Grid[]>([]);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);
  const [stints, setStints] = useState<Stint[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedRace, setSelectedRace] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("race");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const sessions = await f1Service.getSessions();
        const meetingsData = await f1Service.getMeetings();
        setRaces(sessions);
        setMeetings(meetingsData);
        const allSeasons = Array.from(
          new Set(sessions.map((s) => s.year.toString()))
        )
          .sort()
          .reverse();
        setSelectedSeason(allSeasons[0] || "");
        setSelectedRace(sessions[0]?.session_key || null);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchRaceData = async () => {
      if (!selectedRace) return;
      setLoading(true);
      try {
        const [
          driversData,
          positionsData,
          lapsData,
          gridData,
          lapTimesData,
          stintsData,
        ] = await Promise.all([
          f1Service.getDrivers(selectedRace.toString()),
          f1Service.getPositions(selectedRace.toString()),
          f1Service.getLaps(selectedRace.toString()),
          f1Service.getGrid(selectedRace.toString()),
          f1Service.getLapTimes(selectedRace.toString()),
          f1Service.getStints(selectedRace.toString()),
        ]);
        setDrivers(driversData);
        setPositions(positionsData);
        setLaps(lapsData);
        setGrid(gridData);
        setLapTimes(lapTimesData);
        setStints(stintsData);
      } catch (error) {
        console.error("Error fetching race data:", error);
        setDrivers([]);
        setPositions([]);
        setLaps([]);
        setGrid([]);
        setLapTimes([]);
        setStints([]);
      }
      setLoading(false);
    };
    fetchRaceData();
  }, [selectedRace]);

  const filteredRaces = races.filter(
    (race: Session) => race.year.toString() === selectedSeason
  );

  const meetingsMap = new Map(meetings.map((m: Meeting) => [m.meeting_key, m]));

  const racesForFilters = filteredRaces.map((session) => {
    const meeting = meetingsMap.get(session.meeting_key);
    return {
      id: session.session_key,
      name: meeting?.circuit_short_name || `Session ${session.session_key}`,
      country: meeting?.country_code || "",
      date: formatDate(session.date_start),
      season: session.year.toString(),
      circuit: meeting?.circuit_short_name || "",
      laps: 0,
      length: "",
      lapRecord: "",
      recordHolder: "",
      recordYear: "",
    };
  });

  useEffect(() => {
    if (
      !filteredRaces.some((race: Session) => race.session_key === selectedRace)
    ) {
      setSelectedRace(filteredRaces[0]?.session_key || null);
    }
  }, [selectedSeason, filteredRaces]);

  const selectedRaceData = races.find(
    (race: Session) => race.session_key === selectedRace
  );

  const findFastestLap = (lapTimes: LapTime[]) => {
    return lapTimes.reduce((fastest, current) => {
      if (!fastest || current.lap_time < fastest.lap_time) {
        return current;
      }
      return fastest;
    }, undefined as LapTime | undefined);
  };

  const calculatePoints = (
    position: number,
    isSprint: boolean,
    hasFastestLap: boolean
  ) => {
    const points = isSprint
      ? SPRINT_POINTS[position as keyof typeof SPRINT_POINTS] || 0
      : RACE_POINTS[position as keyof typeof RACE_POINTS] || 0;
    return points + (hasFastestLap ? FASTEST_LAP_POINTS : 0);
  };

  const filteredDrivers: DriverTableData[] = drivers
    .filter(
      (driver: Driver) =>
        !selectedCountry || driver.country_code === selectedCountry
    )
    .map((driver: Driver) => {
      const result = positions.find(
        (pos: Position) => pos.driver_number === driver.driver_number
      );
      const driverGrid = grid.find(
        (g: Grid) => g.driver_number === driver.driver_number
      );
      console.log(`Driver ${driver.driver_number} grid position:`, driverGrid); // Debug log
      const driverLaps = laps.filter(
        (l: Lap) => l.driver_number === driver.driver_number
      );
      const driverLapTimes = lapTimes.filter(
        (lt: LapTime) => lt.driver_number === driver.driver_number
      );
      const driverStints = stints.filter(
        (s: Stint) => s.driver_number === driver.driver_number
      );

      // Trouver le meilleur tour
      const fastestLap = driverLapTimes.reduce((fastest, current) => {
        if (!fastest || current.lap_time < fastest.lap_time) {
          return current;
        }
        return fastest;
      }, undefined as LapTime | undefined);

      const totalLaps = driverLaps.length;

      const lastStint = driverStints[driverStints.length - 1];

      const raceFastestLap = findFastestLap(lapTimes);
      const hasFastestLap = fastestLap?.lap_time === raceFastestLap?.lap_time;

      const isSprint = selectedRaceData?.session_type === "Sprint";
      const points = calculatePoints(
        result?.position || 0,
        isSprint,
        hasFastestLap
      );

      const positionChange = driverGrid
        ? driverGrid.position - (result?.position || 0)
        : 0;

      return {
        id: driver.driver_number,
        name: `${driver.first_name} ${driver.last_name}`,
        team: driver.team_name,
        points,
        position: result?.position || 0,
        country: driver.country_code,
        number: driver.driver_number,
        fastestLap: fastestLap?.lap_time || "",
        grid: driverGrid?.position || 0,
        status: (result?.status as "Finished" | "DNF") || "DNF",
        laps: totalLaps,
        time: result?.time || "",
        gap: "",
        bestLap: 0,
        teamColor: "",
        previousPosition: driverGrid?.position || 0,
        positionChange,
        car: driver.team_name,
        compound: lastStint?.compound || "Unknown",
      };
    })
    .sort((a, b) => {
      if (a.status === "Finished" && b.status !== "Finished") return -1;
      if (a.status !== "Finished" && b.status === "Finished") return 1;
      return (a.position || 99) - (b.position || 99);
    });

  const selectedRaceInfo = selectedRaceData
    ? {
        id: selectedRaceData.session_key,
        name:
          meetingsMap.get(selectedRaceData.meeting_key)?.circuit_short_name ||
          `Session ${selectedRaceData.session_key}`,
        country:
          meetingsMap.get(selectedRaceData.meeting_key)?.country_code || "",
        date: formatDate(selectedRaceData.date_start),
        season: selectedRaceData.year.toString(),
        circuit:
          meetingsMap.get(selectedRaceData.meeting_key)?.circuit_short_name ||
          "",
        laps: Math.max(...laps.map((l) => l.lap_number)),
        length: "5.303 km",
        lapRecord: "1:24.356",
        recordHolder: "Max Verstappen",
        recordYear: "2023",
      }
    : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Chargement...
      </div>
    );
  }

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
            selectedRace={selectedRace ?? 0}
            selectedCountry={selectedCountry}
            filteredRaces={racesForFilters}
            onSeasonChange={setSelectedSeason}
            onRaceChange={setSelectedRace}
            onCountryChange={setSelectedCountry}
          />

          {viewMode === "race" && selectedRaceInfo && (
            <RaceInfo race={selectedRaceInfo} />
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

import { useState, useEffect, useMemo, useRef } from "react";
import { Session, Meeting, UseRacesReturn } from "@/lib/types/racing";
import { ErgastRace } from "@/lib/types/ergast";
import { f1Service } from "@/lib/services/f1Service";
import { ergastService } from "@/lib/services/ergastService";
import { formatDate } from "@/lib/utils/dateAndTime";

export const useRaces = (): UseRacesReturn => {
  const [races, setRaces] = useState<Session[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [ergastRaces, setErgastRaces] = useState<ErgastRace[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [selectedRace, setSelectedRace] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const lastSeasonRef = useRef<string>("");
  const filteredRacesRef = useRef<Session[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [sessions, meetingsData] = await Promise.all([
          f1Service.getSessions(),
          f1Service.getMeetings(),
        ]);
        setRaces(sessions);
        setMeetings(meetingsData);

        const allSeasons = Array.from(
          new Set(sessions.map((s) => new Date(s.startTime).getFullYear().toString()))
        )
          .sort()
          .reverse();

        const currentSeason = allSeasons[0] || "";
        setSelectedSeason(currentSeason);
        // Only set selectedRace if we have a valid session ID
        const firstSessionId = sessions[0]?.id;
        if (firstSessionId && firstSessionId !== "0") {
          setSelectedRace(Number(firstSessionId));
        } else {
          setSelectedRace(null);
        }

        const ergastData = await ergastService.getLatestResults();
        setErgastRaces(ergastData);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchErgastData = async () => {
      if (!selectedSeason || selectedSeason.trim() === "") return;
      try {
        const races = await ergastService.getRaces(selectedSeason);
        setErgastRaces(races);
      } catch (error) {
        console.error("Error fetching Ergast races:", error);
        setErgastRaces([]);
      }
    };
    fetchErgastData();
  }, [selectedSeason]);

  const filteredRaces = useMemo(
    () =>
      races.filter(
        (race: Session) => {
          const isCorrectYear = new Date(race.startTime).getFullYear().toString() === selectedSeason;
          const isCompleted = race.status === "completed";
          const isRace = race.type === "race";
          return isCorrectYear && isCompleted && isRace;
        }
      ),
    [races, selectedSeason]
  );

  const meetingsMap = useMemo(
    () => new Map(meetings.map((m: Meeting) => [Number(m.id), m])),
    [meetings]
  );

  const uniqueDates = useMemo(
    () =>
      Array.from(
        new Set(filteredRaces.map((session) => formatDate(session.startTime)))
      ),
    [filteredRaces]
  );

  // Update ref when filteredRaces changes
  useEffect(() => {
    filteredRacesRef.current = filteredRaces;
  }, [filteredRaces]);

  // Create a stable identifier for filtered races (length + first ID)
  const filteredRacesKey = useMemo(
    () => `${filteredRaces.length}-${filteredRaces[0] ? Number(filteredRaces[0].id) : "none"}`,
    [filteredRaces]
  );

  // Update selectedRace when season changes
  useEffect(() => {
    if (lastSeasonRef.current !== selectedSeason) {
      lastSeasonRef.current = selectedSeason;
      const currentFiltered = filteredRacesRef.current;
      if (currentFiltered.length > 0) {
        const firstRaceId = currentFiltered[0]?.id;
        if (firstRaceId && firstRaceId !== "0") {
          setSelectedRace(Number(firstRaceId));
        } else {
          setSelectedRace(null);
        }
      } else {
        setSelectedRace(null);
      }
    }
  }, [selectedSeason]);

  // Validate selectedRace is still in filtered list
  useEffect(() => {
    const currentFiltered = filteredRacesRef.current;
    if (currentFiltered.length === 0) {
      if (selectedRace !== null) {
        setSelectedRace(null);
      }
      return;
    }

    // Check if current selectedRace exists in filtered list
    const raceExists = currentFiltered.some(
      (race: Session) => Number(race.id) === selectedRace
    );
    if (!raceExists && selectedRace !== null) {
      const firstRaceId = currentFiltered[0]?.id;
      if (firstRaceId && firstRaceId !== "0") {
        setSelectedRace(Number(firstRaceId));
      } else {
        setSelectedRace(null);
      }
    }
  }, [filteredRacesKey, selectedRace]);

  // Get all available seasons from races
  const availableSeasons = useMemo(
    () =>
      Array.from(
        new Set(races.map((s) => new Date(s.startTime).getFullYear().toString()))
      )
        .sort()
        .reverse(),
    [races]
  );

  return {
    races,
    ergastRaces,
    selectedSeason,
    selectedRace,
    selectedDate,
    loading,
    setSelectedSeason,
    setSelectedRace,
    setSelectedDate,
    filteredRaces,
    uniqueDates,
    meetingsMap,
    availableSeasons,
  };
};

import { useState, useEffect } from "react";
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
        setSelectedRace(sessions[0] ? Number(sessions[0].id) : null);

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
      if (!selectedSeason) return;
      try {
        const races = await ergastService.getRaces(selectedSeason);
        setErgastRaces(races);
      } catch (error) {
        console.error("Error fetching Ergast races:", error);
      }
    };
    fetchErgastData();
  }, [selectedSeason]);

  const filteredRaces = races.filter(
    (race: Session) => new Date(race.startTime).getFullYear().toString() === selectedSeason
  );

  const meetingsMap = new Map(meetings.map((m: Meeting) => [Number(m.id), m]));

  const uniqueDates = Array.from(
    new Set(filteredRaces.map((session) => formatDate(session.startTime)))
  );

  useEffect(() => {
    if (
      !filteredRaces.some((race: Session) => Number(race.id) === selectedRace)
    ) {
      setSelectedRace(filteredRaces[0] ? Number(filteredRaces[0].id) : null);
    }
  }, [selectedSeason, filteredRaces, selectedRace]);

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
  };
};

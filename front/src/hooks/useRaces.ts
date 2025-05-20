import { useState, useEffect } from 'react';
import { Session, Meeting } from '@/lib/types/racing';
import { ErgastRace } from '@/lib/types/ergast';
import { f1Service } from '@/lib/services/f1Service';
import { ergastService } from '@/lib/services/ergastService';
import { formatDate } from '@/lib/utils/dateAndTime';

interface UseRacesReturn {
  races: Session[];
  ergastRaces: ErgastRace[];
  selectedSeason: string;
  selectedRace: number | null;
  selectedDate: string;
  loading: boolean;
  setSelectedSeason: (season: string) => void;
  setSelectedRace: (race: number | null) => void;
  setSelectedDate: (date: string) => void;
  filteredRaces: Session[];
  uniqueDates: string[];
  meetingsMap: Map<number, Meeting>;
}

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
          new Set(sessions.map((s) => s.year.toString()))
        )
          .sort()
          .reverse();
        
        const currentSeason = allSeasons[0] || "";
        setSelectedSeason(currentSeason);
        setSelectedRace(sessions[0]?.session_key || null);

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
    (race: Session) => race.year.toString() === selectedSeason
  );

  const meetingsMap = new Map(meetings.map((m: Meeting) => [m.meeting_key, m]));

  const uniqueDates = Array.from(
    new Set(filteredRaces.map((session) => formatDate(session.date_start)))
  );

  useEffect(() => {
    if (
      !filteredRaces.some((race: Session) => race.session_key === selectedRace)
    ) {
      setSelectedRace(filteredRaces[0]?.session_key || null);
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
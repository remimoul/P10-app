import { useState, useEffect } from "react";
import { f1Service } from "@/lib/services/f1Service";

export function useRaceInfo() {
  const [raceInfo, setRaceInfo] = useState({
    grandPrix: "",
    country: "",
    circuit: "",
    location: "",
    date: "",
    startTime: "",
    weather: "",
    temperature: "",
    humidity: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voteDeadline, setVoteDeadline] = useState<Date | null>(null);

  useEffect(() => {
    const loadRaceInfo = async () => {
      try {
        setLoading(true);
        setError(null);

        const sessions = await f1Service.getSessions("2025");
        const raceSession = sessions.find((s) => s.session_type === "Race");

        if (raceSession) {
          const meetings = await f1Service.getMeetings("2025");
          const meeting = meetings.find(
            (m) => String(m.meeting_key) === String(raceSession.meeting_key)
          );

          setVoteDeadline(new Date(raceSession.date_start));
          setRaceInfo({
            grandPrix: meeting?.circuit_short_name || "",
            country: meeting?.country_code || "",
            circuit: meeting?.circuit_short_name || "",
            location: meeting?.location || "",
            date: raceSession.date_start,
            startTime: raceSession.date_start,
            weather: "",
            temperature: "",
            humidity: "",
          });
        }
      } catch (err) {
        setError("Erreur lors du chargement des informations de course.");
        console.error("Error loading race info:", err);
      } finally {
        setLoading(false);
      }
    };

    loadRaceInfo();
  }, []);

  return {
    raceInfo,
    loading,
    error,
    voteDeadline,
    setVoteDeadline,
  };
}

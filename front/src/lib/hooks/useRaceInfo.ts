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
        const raceSession = sessions.find((s) => s.type === "race");

        if (raceSession) {
          const meetings = await f1Service.getMeetings("2025");
          const meeting = meetings.find((m) => m.sessions.some((s) => s.id === raceSession.id));

          setVoteDeadline(new Date(raceSession.startTime));
          setRaceInfo({
            grandPrix: meeting?.track.name || "",
            country: meeting?.track.country || "",
            circuit: meeting?.track.name || "",
            location: meeting?.track.city || "",
            date: raceSession.startTime,
            startTime: raceSession.startTime,
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

import { useEffect, useState } from "react";
import { ergastService } from "@/lib/services/ergastService";

export type NextRace = {
  name?: string;
  date?: string;
  time?: string;
  circuit?: {
    name: string;
    location: {
      locality: string;
      country: string;
    };
  };
};

export function useNextRace() {
  const [nextRace, setNextRace] = useState<NextRace>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNextRace = async () => {
      try {
        setLoading(true);
        const race = await ergastService.getNextRace();
        if (race) {
          setNextRace({
            name: race.raceName,
            date: race.date,
            time: race.time,
            circuit: {
              name: race.Circuit.circuitName,
              location: {
                locality: race.Circuit.Location.locality,
                country: race.Circuit.Location.country,
              },
            },
          });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch next race");
      } finally {
        setLoading(false);
      }
    };

    fetchNextRace();
  }, []);

  return { nextRace, loading, error };
}

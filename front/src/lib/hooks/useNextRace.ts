import { useEffect, useState } from "react";
import { ergastService } from "@/lib/services/ergastService";

export type NextRace = {
  name?: string;
  date?: string;
  time?: string;
};

export function useNextRace() {
  const [nextRace, setNextRace] = useState<NextRace>({});
  useEffect(() => {
    ergastService.getNextRace().then((race) => {
      if (race) {
        setNextRace({
          name: race.raceName,
          date: race.date,
          time: race.time,
        });
      }
    });
  }, []);
  return nextRace;
} 
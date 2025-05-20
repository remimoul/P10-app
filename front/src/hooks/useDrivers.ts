import { useState, useEffect } from 'react';
import { Driver, Position, Lap, Grid, LapTime, Stint, DriverTableData } from '@/lib/types/racing';
import { f1Service } from '@/lib/services/f1Service';
import { formatLapTime } from '@/lib/utils/dateAndTime';
import { RACE_POINTS, SPRINT_POINTS, FASTEST_LAP_POINTS } from '@/lib/types/racing';

interface UseDriversReturn {
  drivers: Driver[];
  positions: Position[];
  laps: Lap[];
  grid: Grid[];
  lapTimes: LapTime[];
  stints: Stint[];
  loading: boolean;
  filteredDrivers: DriverTableData[];
}

export const useDrivers = (
  selectedRace: number | null,
  selectedCountry: string,
  isSprint: boolean
): UseDriversReturn => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [positions, setPositions] = useState<Position[]>([]);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [grid, setGrid] = useState<Grid[]>([]);
  const [lapTimes, setLapTimes] = useState<LapTime[]>([]);
  const [stints, setStints] = useState<Stint[]>([]);
  const [loading, setLoading] = useState(true);

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
      const driverLaps = laps.filter(
        (l: Lap) => l.driver_number === driver.driver_number
      );
      const driverLapTimes = lapTimes.filter(
        (lt: LapTime) => lt.driver_number === driver.driver_number
      );
      const driverStints = stints.filter(
        (s: Stint) => s.driver_number === driver.driver_number
      );

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
      const points = calculatePoints(
        result?.position || 0,
        isSprint,
        hasFastestLap
      );

      const positionChange =
        driverGrid && result?.position
          ? driverGrid.position - result.position
          : 0;

      return {
        id: driver.driver_number,
        name: `${driver.first_name} ${driver.last_name}`,
        team: driver.team_name,
        points,
        position: result?.position ?? 0,
        country: driver.country_code,
        number: driver.driver_number,
        fastestLap: fastestLap?.lap_time
          ? formatLapTime(fastestLap.lap_time)
          : "",
        grid: driverGrid?.position ?? 0,
        status: (result?.status as "Finished" | "DNF") || "DNF",
        laps: totalLaps || 0,
        time: result?.time || "",
        gap: "",
        bestLap: 0,
        teamColor: "",
        previousPosition: driverGrid?.position ?? 0,
        positionChange,
        car: driver.team_name,
        compound: lastStint?.compound || "",
      };
    })
    .sort((a, b) => {
      if (a.status === "Finished" && b.status !== "Finished") return -1;
      if (a.status !== "Finished" && b.status === "Finished") return 1;
      return (a.position ?? 99) - (b.position ?? 99);
    });

  return {
    drivers,
    positions,
    laps,
    grid,
    lapTimes,
    stints,
    loading,
    filteredDrivers,
  };
}; 
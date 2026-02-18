import { useState, useEffect, useMemo } from "react";
import {
  Driver,
  Position,
  Lap,
  Grid,
  LapTime,
  Stint,
  DriverTableData,
  UseDriversReturn,
} from "@/lib/types/racing";
import { f1Service } from "@/lib/services/f1Service";
import { formatLapTime } from "@/lib/utils/dateAndTime";
import {
  RACE_POINTS,
  SPRINT_POINTS,
  FASTEST_LAP_POINTS,
} from "@/lib/types/racing";

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
      if (selectedRace === null || selectedRace === undefined) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const sessionKey = selectedRace.toString();
        if (!sessionKey || sessionKey === "0") {
          setLoading(false);
          return;
        }
        const [
          driversData,
          positionsData,
          lapsData,
          gridData,
          lapTimesData,
          stintsData,
        ] = await Promise.all([
          f1Service.getDrivers(sessionKey),
          f1Service.getPositions(sessionKey),
          f1Service.getLaps(sessionKey),
          f1Service.getGrid(sessionKey),
          f1Service.getLapTimes(sessionKey),
          f1Service.getStints(sessionKey),
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
      if (!fastest || current.time < fastest.time) {
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
      ? SPRINT_POINTS[position] || 0
      : RACE_POINTS[position] || 0;
    return points + (hasFastestLap ? FASTEST_LAP_POINTS : 0);
  };

  const raceFastestLap = useMemo(
    () => findFastestLap(lapTimes),
    [lapTimes]
  );

  const filteredDrivers = useMemo(
    (): DriverTableData[] =>
      drivers
        .filter(
          (driver: Driver) =>
            !selectedCountry || driver.country === selectedCountry
        )
        .map((driver: Driver) => {
          const result = positions.find(
            (pos: Position) => pos.driverId === driver.id
          );
          const driverGrid = grid.find(
            (g: Grid) => g.driverId === driver.id
          );
          const driverLaps = laps.filter(
            (l: Lap) => l.driverId === driver.id
          );
          const driverLapTimes = lapTimes.filter(
            (lt: LapTime) => lt.driverId === driver.id
          );
          const driverStints = stints.filter(
            (s: Stint) => s.driverId === driver.id
          );

          const fastestLap = driverLapTimes.reduce((fastest, current) => {
            if (!fastest || current.time < fastest.time) {
              return current;
            }
            return fastest;
          }, undefined as LapTime | undefined);

          const totalLaps = driverLaps.length;
          const lastStint = driverStints[driverStints.length - 1];
          const hasFastestLap = fastestLap?.time === raceFastestLap?.time;
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
            id: Number(driver.id),
            name: driver.name,
            team: driver.team,
            points,
            position: result?.position ?? 0,
            country: driver.country,
            number: driver.number,
            fastestLap: fastestLap?.time
              ? formatLapTime(Number(fastestLap.time))
              : "",
            grid: driverGrid?.position ?? 0,
            status: ((): "DNF" => "DNF")(),
            laps: totalLaps || 0,
            time: "",
            gap: "",
            bestLap: 0,
            teamColor: "",
            previousPosition: driverGrid?.position ?? 0,
            positionChange,
            car: driver.team,
            compound: lastStint?.compound || "",
          };
        })
        .sort((a, b) => (a.position ?? 99) - (b.position ?? 99)),
    [
      drivers,
      positions,
      laps,
      grid,
      lapTimes,
      stints,
      selectedCountry,
      isSprint,
      raceFastestLap,
    ]
  );

  const driversMap = useMemo(
    () => Object.fromEntries(drivers.map((d) => [d.id, d])),
    [drivers]
  );

  return {
    drivers: driversMap,
    positions,
    laps,
    grid,
    lapTimes,
    stints,
    loading,
    filteredDrivers,
  };
};

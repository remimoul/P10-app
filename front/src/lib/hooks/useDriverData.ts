import { useState, useEffect, useMemo } from "react";
import { DriverStats } from "@/lib/types/drivers";
import { FilterOptions } from "@/lib/types/vote";
import { driverService } from "@/lib/services/driverService";
import { f1Service } from "@/lib/services/f1Service";
import { Driver, Position } from "@/lib/types/racing";

export function useDriverData() {
  const [drivers, setDrivers] = useState<DriverStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    sortBy: "averagePosition",
    sortOrder: "asc",
    teamFilter: "all",
    minPoints: 0,
    maxPoints: 500,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 6;

  useEffect(() => {
    const loadDrivers = async () => {
      try {
        setLoading(true);
        setError(null);

        const driversStats = await driverService.getAllDriversStats();

        const sessions = await f1Service.getSessions("2025");
        const raceSession = sessions.find((s) => s.session_type === "Race");
        let positions: Position[] = [];
        let f1Drivers: Driver[] = [];

        if (raceSession) {
          positions = await f1Service.getPositions(String(raceSession.session_key));
          f1Drivers = await f1Service.getDrivers(String(raceSession.session_key));
        }

        const driverIdToNumber: Record<string, number> = {};
        f1Drivers.forEach((d) => {
          const fullName = `${d.first_name} ${d.last_name}`;
          const ergastDriver = driversStats.find((ds) => ds.name === fullName);
          if (ergastDriver) {
            driverIdToNumber[ergastDriver.driverId] = d.driver_number;
          }
        });

        const enrichedDrivers = driversStats.map((driver) => {
          const driverNumber = driverIdToNumber[driver.driverId];
          const pos = positions.find((p) => p.driver_number === driverNumber);
          return {
            ...driver,
            racePosition: pos ? pos.position : null,
          };
        });

        setDrivers(enrichedDrivers);
      } catch (err) {
        setError("Erreur lors du chargement des données des pilotes.");
        console.error("Error loading driver data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDrivers();
  }, []);

  const filteredAndSortedDrivers = useMemo(() => {
    return drivers
      .filter((driver) => {
        const searchMatch = driver.name
          .toLowerCase()
          .includes(filters.search.toLowerCase());

        const teamMatch =
          filters.teamFilter === "all" ||
          driver.team.toLowerCase().includes(filters.teamFilter.toLowerCase());

        const pointsMatch =
          driver.stats.points >= filters.minPoints &&
          driver.stats.points <= filters.maxPoints;

        return searchMatch && teamMatch && pointsMatch;
      })
      .sort((a, b) => {
        const aValue = a.stats[filters.sortBy as keyof typeof a.stats];
        const bValue = b.stats[filters.sortBy as keyof typeof b.stats];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return filters.sortOrder === "asc"
            ? aValue - bValue
            : bValue - aValue;
        }
        return 0;
      });
  }, [drivers, filters]);

  const paginatedDrivers = useMemo(() => {
    const startIndex = (currentPage - 1) * driversPerPage;
    const endIndex = startIndex + driversPerPage;
    return filteredAndSortedDrivers.slice(startIndex, endIndex);
  }, [filteredAndSortedDrivers, currentPage]);

  const totalPages = Math.ceil(
    filteredAndSortedDrivers.length / driversPerPage
  );
  const uniqueTeams = Array.from(new Set(drivers.map((d) => d.team))).sort();

  const resetFilters = () => {
    setFilters({
      search: "",
      sortBy: "averagePosition",
      sortOrder: "asc",
      teamFilter: "all",
      minPoints: 0,
      maxPoints: 500,
    });
  };

  return {
    drivers,
    loading,
    error,
    filters,
    setFilters,
    resetFilters,
    currentPage,
    setCurrentPage,
    paginatedDrivers,
    filteredAndSortedDrivers,
    totalPages,
    uniqueTeams,
  };
}

"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { RiLoader2Fill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { DriverStats } from "@/lib/types/drivers";
import { driverService } from "@/lib/services/driverService";
import { FilterSort, FilterOptions } from "@/components/vote/FilterSort";
import { DriverStatsChart } from "@/components/vote/DriverStatsChart";
import { DriverComparison } from "@/components/vote/DriverComparison";

interface Vote {
  driverId: string;
  timestamp: number;
}

const VotePage = () => {
  const { user, isLoaded: userLoaded } = useUser();
  const [drivers, setDrivers] = useState<DriverStats[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    sortBy: "averagePosition",
    sortOrder: "asc",
    teamFilter: "all",
    minPoints: 0,
    maxPoints: 500,
  });
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [comparisonDrivers, setComparisonDrivers] = useState<string[]>([]);

  useEffect(() => {
    const loadDriversData = async () => {
      if (userLoaded && user) {
        try {
          const driversStats = await driverService.getAllDriversStats();
          setDrivers(driversStats);
        } catch (error) {
          console.error("Error loading drivers data:", error);
          toast.error("Erreur lors du chargement des données des pilotes");
        } finally {
          setLoading(false);
        }
      }
    };

    loadDriversData();
  }, [userLoaded, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = (driverId: string) => {
    if (timeLeft === 0) {
      toast.error("Le temps de vote est écoulé!");
      return;
    }

    setSelectedDriver(driverId);
    setUserVote({
      driverId,
      timestamp: Date.now(),
    });
    toast.success("Vote enregistré avec succès!");
  };

  const handleCancelVote = () => {
    setSelectedDriver(null);
    setUserVote(null);
    toast.success("Vote annulé avec succès!");
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

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

  const handleComparisonSelect = (driverId: string) => {
    setComparisonDrivers((prev) => {
      if (prev.includes(driverId)) {
        return prev.filter((id) => id !== driverId);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], driverId];
      }
      return [...prev, driverId];
    });
  };

  const handleOpenComparison = () => {
    if (comparisonDrivers.length < 2) {
      toast.error("Veuillez sélectionner au moins 2 pilotes à comparer");
      return;
    }
    setIsComparisonOpen(true);
  };

  if (!userLoaded || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center">
        <RiLoader2Fill className="text-6xl text-red-500 animate-spin" />
        <p className="mt-4 text-xl font-medium text-black">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Vote pour le 10ème pilote</h1>
            <Button
              variant="outline"
              onClick={handleOpenComparison}
              className="flex items-center gap-2"
              disabled={comparisonDrivers.length < 2}
            >
              Comparer les pilotes ({comparisonDrivers.length}/3)
            </Button>
          </div>

          <p className="text-center text-gray-600 mb-4">
            Temps restant pour voter: {formatTime(timeLeft)}
          </p>

          {userVote && (
            <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-xl text-center mb-6 flex items-center justify-between">
              <span>
                Votre vote actuel:{" "}
                {drivers.find((d) => d.driverId === userVote.driverId)?.name}
              </span>
              <Button
                variant="outline"
                onClick={handleCancelVote}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                Annuler le vote
              </Button>
            </div>
          )}

          <FilterSort onFilterChange={setFilters} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedDrivers.map((driver) => (
              <div
                key={driver.driverId}
                className={`bg-white border rounded-xl p-6 shadow-md transition-all ${
                  selectedDriver === driver.driverId
                    ? "border-red-500 ring-2 ring-red-500"
                    : "border-gray-200 hover:border-red-300"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-bold">{driver.name}</h2>
                    <p className="text-gray-600">{driver.team}</p>
                  </div>
                  <Checkbox
                    id={`compare-${driver.driverId}`}
                    checked={comparisonDrivers.includes(driver.driverId)}
                    onCheckedChange={() =>
                      handleComparisonSelect(driver.driverId)
                    }
                    className="ml-2"
                  />
                </div>

                <div className="space-y-2 mb-4">
                  <p>
                    Position moyenne: {driver.stats.averagePosition.toFixed(1)}
                  </p>
                  <p>
                    Performance de l&apos;écurie:{" "}
                    {(driver.stats.teamPerformance * 100).toFixed(1)}%
                  </p>
                  <p>Points: {driver.stats.points}</p>
                  <p>Victoires: {driver.stats.wins}</p>
                  <p>
                    Dernières courses: {driver.stats.previousRaces.join(", ")}
                  </p>
                </div>

                <Button
                  onClick={() => handleVote(driver.driverId)}
                  variant={
                    selectedDriver === driver.driverId
                      ? "destructive"
                      : "outline"
                  }
                  className="w-full"
                  disabled={timeLeft === 0}
                >
                  {selectedDriver === driver.driverId
                    ? "Vote enregistré"
                    : "Voter"}
                </Button>

                <div className="mt-6">
                  <DriverStatsChart driver={driver} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isComparisonOpen && (
        <DriverComparison
          drivers={drivers.filter((d) =>
            comparisonDrivers.includes(d.driverId)
          )}
          onClose={() => setIsComparisonOpen(false)}
        />
      )}
    </div>
  );
};

export default VotePage;

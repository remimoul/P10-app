"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { RiLoader2Fill, RiTimeLine } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import { DriverStats } from "@/lib/types/drivers";
import { Vote, FilterOptions } from "@/lib/types/vote";
import { driverService } from "@/lib/services/driverService";
import { FilterSort } from "@/components/vote/FilterSort";
import { DriverStatsChart } from "@/components/vote/DriverStatsChart";
import { DriverComparison } from "@/components/vote/DriverComparison";
import { motion, AnimatePresence } from "framer-motion";
import { formatRemainingTime } from "@/lib/utils/dateAndTime";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RiErrorWarningLine, RiInformationLine } from "react-icons/ri";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const VotePage = () => {
  const router = useRouter();
  const { user, isLoaded: userLoaded } = useUser();
  const [drivers, setDrivers] = useState<DriverStats[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<string | null>(null);
  const [confirmedVote, setConfirmedVote] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userVote, setUserVote] = useState<Vote | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [voteDeadline, setVoteDeadline] = useState<Date | null>(null);
  const [totalParticipants] = useState(0);
  const [voteModified] = useState(false);
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
  const [expandedCharts, setExpandedCharts] = useState<Set<string>>(new Set());
  const [totalVotes, setTotalVotes] = useState(0);
  const [topVotedDrivers, setTopVotedDrivers] = useState<
    { driverId: string; votes: number }[]
  >([]);
  const [activeSection, setActiveSection] = useState<"info" | "vote">("info");

  useEffect(() => {
    const loadInitialData = async () => {
      if (userLoaded) {
        try {
          setLoading(true);
          setError(null);

          const driversStats = await driverService.getAllDriversStats();
          setDrivers(driversStats);

          setTotalVotes(150);
          setTopVotedDrivers([
            { driverId: "hamilton", votes: 45 },
            { driverId: "alonso", votes: 30 },
            { driverId: "norris", votes: 25 },
          ]);

          const raceStart = new Date("2024-05-26T15:00:00");
          const deadline = new Date(raceStart.getTime() - 5 * 60000);
          setVoteDeadline(deadline);

          if (user) {
            //chargement du vote de l'utilisateur
          }
        } catch (err) {
          setError(
            "Erreur lors du chargement des données. Veuillez réessayer."
          );
          console.error("Error loading data:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    loadInitialData();
  }, [userLoaded, user]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVote = async (driverId: string) => {
    if (!user) {
      toast.error("Vous devez être connecté pour voter");
      return;
    }

    if (timeLeft === 0) {
      toast.error("Le temps de vote est écoulé!");
      return;
    }

    try {
      // appel API pour enregistrer le vote

      setSelectedDriver(driverId);
      setUserVote({
        driverId,
        timestamp: Date.now(),
      });
      toast.success("Vote enregistré avec succès!");
    } catch (err) {
      toast.error("Erreur lors de l'enregistrement du vote");
      console.error("Error submitting vote:", err);
    }
  };

  const handleConfirmVote = () => {
    if (!selectedDriver) {
      toast.error("Veuillez d'abord sélectionner un pilote");
      return;
    }
    setConfirmedVote(selectedDriver);
    toast.success(
      "Vote confirmé ! Vous pouvez toujours le modifier jusqu'à la fin du temps imparti."
    );

    setTimeout(() => {
      router.push("/leagues");
    }, 2000);
  };

  const handleCancelVote = () => {
    setShowCancelDialog(true);
  };

  const confirmCancelVote = async () => {
    if (!user) return;

    try {
      // appel API pour annuler le vote
      setSelectedDriver(null);
      setUserVote(null);
      setShowCancelDialog(false);
      toast.success("Vote annulé avec succès!");
    } catch (err) {
      toast.error("Erreur lors de l'annulation du vote");
      console.error("Error canceling vote:", err);
    }
  };

  const formatTime = (seconds: number) => {
    return formatRemainingTime(seconds);
  };

  const toggleChart = (driverId: string) => {
    setExpandedCharts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(driverId)) {
        newSet.delete(driverId);
      } else {
        newSet.add(driverId);
      }
      return newSet;
    });
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

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <RiErrorWarningLine className="h-4 w-4" />
          <AlertTitle>Erreur</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col items-center justify-center p-4">
        <Alert className="max-w-md">
          <RiInformationLine className="h-4 w-4" />
          <AlertTitle>Connexion requise</AlertTitle>
          <AlertDescription>
            Vous devez être connecté pour participer au vote.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col items-center mb-6">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                Qui va finir 10ᵉ ?
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-red-600 to-red-800 mt-2 rounded-full mx-auto" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 mt-4">
              Parie sur le bon et vote maintenant !
            </h2>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <RiTimeLine className="text-red-500" />
              <span className="text-sm font-medium">
                {voteDeadline
                  ? `Clôture des votes : ${voteDeadline.toLocaleString()}`
                  : "Temps restant : "}
                {formatTime(timeLeft)}
              </span>
            </div>
            <div className="text-sm text-gray-500">
              {totalParticipants} participants
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Button
              variant={activeSection === "info" ? "default" : "outline"}
              onClick={() => setActiveSection("info")}
              className="flex-1 relative overflow-hidden group"
            >
              <span className="relative z-10">Informations</span>
              <motion.div
                className="absolute inset-0 bg-red-100"
                initial={false}
                animate={{
                  x: activeSection === "info" ? "0%" : "-100%",
                }}
                transition={{ duration: 0.3 }}
              />
            </Button>
            <Button
              variant={activeSection === "vote" ? "default" : "outline"}
              onClick={() => setActiveSection("vote")}
              className="flex-1 relative overflow-hidden group"
            >
              <span className="relative z-10">Vote</span>
              <motion.div
                className="absolute inset-0 bg-red-100"
                initial={false}
                animate={{
                  x: activeSection === "vote" ? "0%" : "-100%",
                }}
                transition={{ duration: 0.3 }}
              />
            </Button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeSection === "info" ? (
                <div className="space-y-6">
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-gray-900">
                        Informations sur la course
                      </CardTitle>
                      <CardDescription>
                        Détails et statistiques de la course
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Statistiques globales
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-600">
                                Total des votes : {totalVotes}
                              </p>
                              <p className="text-gray-600">
                                Participants : {totalParticipants}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Top 3 des votes
                            </h3>
                            <div className="space-y-2">
                              {topVotedDrivers.map((driver, index) => (
                                <div
                                  key={driver.driverId}
                                  className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                                >
                                  <span className="text-gray-700">
                                    {index + 1}.{" "}
                                    {drivers.find(
                                      (d) => d.driverId === driver.driverId
                                    )?.name || "Inconnu"}
                                  </span>
                                  <span className="text-gray-500">
                                    {driver.votes} votes
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Informations sur la course
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-600">
                                Date de la course :{" "}
                                {voteDeadline
                                  ? new Date(
                                      voteDeadline.getTime() + 5 * 60000
                                    ).toLocaleDateString()
                                  : "Non définie"}
                              </p>
                              <p className="text-gray-600">
                                Heure de la course :{" "}
                                {voteDeadline
                                  ? new Date(
                                      voteDeadline.getTime() + 5 * 60000
                                    ).toLocaleTimeString()
                                  : "Non définie"}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              Temps restant
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                              <p className="text-gray-600">
                                {formatTime(timeLeft)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div>
                  {userVote && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-xl text-center mb-6 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <span>
                          Votre vote actuel:{" "}
                          {
                            drivers.find(
                              (d) => d.driverId === userVote.driverId
                            )?.name
                          }
                        </span>
                        {confirmedVote === userVote.driverId && (
                          <span className="text-sm font-medium bg-green-200 px-2 py-1 rounded">
                            Vote confirmé
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {!confirmedVote && (
                          <Button
                            onClick={handleConfirmVote}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Confirmer le vote
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={handleCancelVote}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          Annuler le vote
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-end mb-4">
                    <Button
                      variant="outline"
                      onClick={handleOpenComparison}
                      className="flex items-center gap-2"
                      disabled={comparisonDrivers.length < 2}
                    >
                      Comparer les pilotes ({comparisonDrivers.length}/3)
                    </Button>
                  </div>

                  <FilterSort onFilterChange={setFilters} />

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAndSortedDrivers.map((driver) => (
                      <motion.div
                        key={driver.driverId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
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
                            checked={comparisonDrivers.includes(
                              driver.driverId
                            )}
                            onCheckedChange={() =>
                              handleComparisonSelect(driver.driverId)
                            }
                            className="ml-2"
                          />
                        </div>

                        <div className="space-y-2 mb-4">
                          <p>
                            Position moyenne:{" "}
                            {driver.stats.averagePosition.toFixed(1)}
                          </p>
                          <p>
                            Performance de l&apos;écurie:{" "}
                            {(driver.stats.teamPerformance * 100).toFixed(1)}%
                          </p>
                          <p>Points: {driver.stats.points}</p>
                          <p>Victoires: {driver.stats.wins}</p>
                          <p>
                            Dernières courses:{" "}
                            {driver.stats.previousRaces.join(", ")}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleVote(driver.driverId)}
                            variant={
                              selectedDriver === driver.driverId
                                ? "destructive"
                                : "outline"
                            }
                            className="flex-1"
                            disabled={timeLeft === 0}
                          >
                            {selectedDriver === driver.driverId
                              ? "Vote enregistré"
                              : "Voter"}
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => toggleChart(driver.driverId)}
                            className="shrink-0"
                          >
                            {expandedCharts.has(driver.driverId) ? "▼" : "▶"}
                          </Button>
                        </div>

                        {expandedCharts.has(driver.driverId) && (
                          <div className="mt-6">
                            <DriverStatsChart driver={driver} />
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
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

      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Annuler le vote</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir annuler votre vote ? Cette action est
              irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
            >
              Non, garder mon vote
            </Button>
            <Button variant="destructive" onClick={confirmCancelVote}>
              Oui, annuler mon vote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {voteModified && (
        <Alert className="mb-4">
          <RiInformationLine className="h-4 w-4" />
          <AlertTitle>Temps de vote écoulé</AlertTitle>
          <AlertDescription>
            Le temps de vote est écoulé. Les résultats seront disponibles après
            la course.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default VotePage;

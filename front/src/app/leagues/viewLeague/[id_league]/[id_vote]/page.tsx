"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { RiLoader2Fill, RiTimeLine, RiUserAddLine, RiTrophyLine, RiTimerLine } from "react-icons/ri";
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
import { VoteTabs } from "@/components/vote/VoteTabs";

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
  const [tab, setTab] = useState<"Info" | "Vote">("Info");

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

  const handleTabChange = (newTab: "Info" | "Vote") => {
    setTab(newTab);
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
        <div className="p-6 mb-8">
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

          <VoteTabs activeTab={tab} onTabChange={handleTabChange} />

          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-[var(--primary-red)]">Clôture des votes :</span>
                <span className="text-xl font-bold text-gray-800">
                  {voteDeadline
                    ? new Date(voteDeadline.getTime() + 5 * 60000).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })
                    : "Non définie"}
                </span>
              </div>
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 bg-gradient-to-br from-white/80 to-white/30 px-4 py-2 xs:px-6 xs:py-3 rounded-full border border-[#D90429] whitespace-nowrap w-fit">
                <div className="flex items-center gap-1">
                  <RiTimerLine className="text-xl xs:text-2xl text-[#D90429]" />
                  <span className="font-mono text-lg xs:text-2xl text-gray-800 font-bold tracking-wider">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-xs xs:text-sm text-gray-600 font-mono">LAP</span>
                </div>
              </div>
            </div>
            <div className="text-2xl text-gray-700 font-semibold">
              {totalParticipants} participants
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {tab === "Info" ? (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-lg border border-red-500/30 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
                      <div className="relative z-10">
                        <h3 className="text-3xl font-black text-[var(--primary-red)] mb-8">
                          Statistiques globales
                        </h3>
                        <div className="space-y-6">
                          <div className="group relative p-4 rounded-2xl bg-white/80 backdrop-blur-sm flex justify-between items-center hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-xl font-medium text-black group-hover:text-[var(--secondary-red)] transition-colors">
                              Total des votes
                            </span>
                            <span className="text-2xl font-bold text-[var(--primary-red)]">
                              {totalVotes}
                            </span>
                          </div>
                          <div className="group relative p-4 rounded-2xl bg-white/80 backdrop-blur-sm flex justify-between items-center hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-xl font-medium text-black group-hover:text-[var(--secondary-red)] transition-colors">
                              Participants
                            </span>
                            <span className="text-2xl font-bold text-[var(--primary-red)]">
                              {totalParticipants}
                            </span>
                          </div>
                          <div className="group relative p-4 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <span className="text-xl font-medium text-black group-hover:text-[var(--secondary-red)] transition-colors mb-4">
                              Pilotes les plus votés
                            </span>
                            <div className="space-y-3">
                              {topVotedDrivers.map((driver, index) => (
                                <div key={driver.driverId} className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-[var(--primary-red)]">#{index + 1}</span>
                                    <span className="text-gray-700">
                                      {drivers.find(d => d.driverId === driver.driverId)?.name}
                                    </span>
                                  </div>
                                  <span className="text-lg font-bold text-[var(--primary-red)]">
                                    {driver.votes} votes
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-lg border border-red-500/30 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
                      <div className="relative z-10">
                        <h3 className="text-3xl font-black text-[var(--primary-red)] mb-8">
                          Informations sur la course
                        </h3>
                        <div className="space-y-6">
                          <div className="group relative p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 border border-transparent hover:border-red-500/20">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <div className="flex items-center gap-2 mb-4">
                                  <RiTimeLine className="text-xl text-[var(--primary-red)]" />
                                  <span className="text-lg font-semibold text-gray-900">Date et heure</span>
                                </div>
                                <p className="text-gray-700">
                                  {voteDeadline
                                    ? new Date(
                                        voteDeadline.getTime() + 5 * 60000
                                      ).toLocaleDateString()
                                    : "Non définie"}
                                </p>
                                <p className="text-gray-700">
                                  {voteDeadline
                                    ? new Date(
                                        voteDeadline.getTime() + 5 * 60000
                                      ).toLocaleTimeString()
                                    : "Non définie"}
                                </p>
                              </div>

                              <div>
                                <div className="flex items-center gap-2 mb-4">
                                  <RiTimeLine className="text-xl text-[var(--primary-red)]" />
                                  <span className="text-lg font-semibold text-gray-900">Circuit</span>
                                </div>
                                <p className="text-gray-700">Monaco</p>
                                <p className="text-gray-700">Circuit de Monaco</p>
                                <p className="text-gray-700">Monte-Carlo, Monaco</p>
                                <p className="text-gray-700">Longueur : 3.337 km</p>
                                <p className="text-gray-700">Nombre de tours : 78</p>
                              </div>

                              <div>
                                <div className="flex items-center gap-2 mb-4">
                                  <RiTimeLine className="text-xl text-[var(--primary-red)]" />
                                  <span className="text-lg font-semibold text-gray-900">Conditions</span>
                                </div>
                                <p className="text-gray-700">Météo : Ensoleillé</p>
                                <p className="text-gray-700">Température : 24°C</p>
                                <p className="text-gray-700">Humidité : 45%</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative bg-gradient-to-br from-white to-red-50 rounded-3xl p-8 shadow-lg border border-red-500/30 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent" />
                    <div className="relative z-10">
                      <h3 className="text-3xl font-black text-[var(--primary-red)] mb-8">
                        Règles du vote
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-red-50/50 backdrop-blur-sm hover:from-white hover:to-red-50 transition-all duration-300 border border-red-500/20 hover:border-red-500/40 hover:shadow-lg">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
                              <RiUserAddLine className="text-3xl text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-6">Comment voter ?</h4>
                            <ul className="space-y-4 text-gray-700">
                              <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-sm font-bold text-[var(--primary-red)]">1</span>
                                </span>
                                <span>Sélectionne le pilote que tu penses finir 10ème</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-sm font-bold text-[var(--primary-red)]">2</span>
                                </span>
                                <span>Clique sur le bouton &quot;Voter&quot;</span>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-sm font-bold text-[var(--primary-red)]">3</span>
                                </span>
                                <span>Tu peux modifier ton vote jusqu&apos;à la clôture</span>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-red-50/50 backdrop-blur-sm hover:from-white hover:to-red-50 transition-all duration-300 border border-red-500/20 hover:border-red-500/40 hover:shadow-lg">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
                              <RiTimeLine className="text-3xl text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-6">Clôture des votes</h4>
                            <div className="flex flex-col items-center gap-4 text-gray-700">
                              <div className="flex items-center gap-3 bg-red-50/50 px-6 py-4 rounded-xl">
                                <RiTimeLine className="text-2xl text-[var(--primary-red)]" />
                                <p className="text-lg">Les votes sont clôturés 5 minutes avant le départ de la course</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="group relative p-8 rounded-2xl bg-gradient-to-br from-white to-red-50/50 backdrop-blur-sm hover:from-white hover:to-red-50 transition-all duration-300 border border-red-500/20 hover:border-red-500/40 hover:shadow-lg">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform">
                              <RiTrophyLine className="text-3xl text-white" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-6">Attribution des points</h4>
                            <ul className="space-y-4 text-gray-700">
                              <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-sm font-bold text-[var(--primary-red)]">3</span>
                                </span>
                                <div>
                                  <span className="font-bold text-[var(--primary-red)]">3 points</span>
                                  <p>pour le bon pilote</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-sm font-bold text-[var(--primary-red)]">1</span>
                                </span>
                                <div>
                                  <span className="font-bold text-[var(--primary-red)]">1 point</span>
                                  <p>si le pilote finit dans les 3 positions autour (8-12)</p>
                                </div>
                              </li>
                              <li className="flex items-start gap-3">
                                <span className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                                  <span className="text-sm font-bold text-[var(--primary-red)]">0</span>
                                </span>
                                <div>
                                  <span className="font-bold text-[var(--primary-red)]">0 point</span>
                                  <p>dans les autres cas</p>
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
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

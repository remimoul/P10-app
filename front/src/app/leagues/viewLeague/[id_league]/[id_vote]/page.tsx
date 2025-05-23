"use client";

import { useState, useEffect, useMemo } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { RiLoader2Fill, RiTimeLine, RiUserAddLine, RiTrophyLine, RiTimerLine, RiArrowUpSLine, RiArrowDownSLine } from "react-icons/ri";
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
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RiErrorWarningLine, RiInformationLine } from "react-icons/ri";
import { VoteTabs } from "@/components/vote/VoteTabs";
import { Pagination } from "@/components/Racings/Pagination";
import { IoClose } from "react-icons/io5";
import { f1Service } from "@/lib/services/f1Service";
import { Position, Driver as F1Driver } from "@/lib/types/racing";

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
  const [currentPage, setCurrentPage] = useState(1);
  const driversPerPage = 6;
  const [raceInfo, setRaceInfo] = useState({
    country: "",
    circuit: "",
    location: "",
    date: "",
  });

  useEffect(() => {
    const loadInitialData = async () => {
      if (userLoaded) {
        try {
          setLoading(true);
          setError(null);

          const driversStats = await driverService.getAllDriversStats();

          const sessions = await f1Service.getSessions("2024");
          const raceSession = sessions.find(s => s.session_type === "Race");
          let positions: Position[] = [];
          let meeting = null;
          let f1Drivers: F1Driver[] = [];
          if (raceSession) {
            positions = await f1Service.getPositions(String(raceSession.session_key));
            f1Drivers = await f1Service.getDrivers(String(raceSession.session_key));
            const meetings = await f1Service.getMeetings("2024");
            meeting = meetings.find(m => String(m.meeting_key) === String(raceSession.meeting_key));
            setVoteDeadline(new Date(raceSession.date_start));
            setRaceInfo({
              country: meeting?.country_code || "",
              circuit: meeting?.circuit_short_name || "",
              location: meeting?.location || "",
              date: raceSession.date_start,
            });
          }

          const driverIdToNumber: Record<string, number> = {};
          f1Drivers.forEach(d => {
            const fullName = `${d.first_name} ${d.last_name}`;
            const ergastDriver = driversStats.find(ds => ds.name === fullName);
            if (ergastDriver) {
              driverIdToNumber[ergastDriver.driverId] = d.driver_number;
            }
          });

          const enrichedDrivers = driversStats.map(driver => {
            const driverNumber = driverIdToNumber[driver.driverId];
            const pos = positions.find(p => p.driver_number === driverNumber);
            return {
              ...driver,
              racePosition: pos ? pos.position : null,
            };
          });

          setDrivers(enrichedDrivers);

          setTotalVotes(150);
          setTopVotedDrivers([
            { driverId: "hamilton", votes: 45 },
            { driverId: "alonso", votes: 30 },
            { driverId: "norris", votes: 25 },
          ]);

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

  const paginatedDrivers = useMemo(() => {
    const startIndex = (currentPage - 1) * driversPerPage;
    const endIndex = startIndex + driversPerPage;
    return filteredAndSortedDrivers.slice(startIndex, endIndex);
  }, [filteredAndSortedDrivers, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedDrivers.length / driversPerPage);

  const uniqueTeams = Array.from(new Set(drivers.map(d => d.team))).sort();

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

          <div className="flex items-center justify-between mb-12">
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

          <div className="h-8" />

          {tab === "Vote" && (
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={handleOpenComparison}
                    className="flex items-center gap-2 bg-white hover:bg-gray-50"
                    disabled={comparisonDrivers.length < 2}
                  >
                    <span className="text-[var(--primary-red)]">Comparer les pilotes</span>
                    <span className="bg-[var(--primary-red)] text-white px-2 py-0.5 rounded-full text-sm">
                      {comparisonDrivers.length}/3
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setFilters({
                      search: "",
                      sortBy: "averagePosition",
                      sortOrder: "asc",
                      teamFilter: "all",
                      minPoints: 0,
                      maxPoints: 500,
                    })}
                    className="text-sm text-[var(--primary-red)] hover:text-[var(--primary-red)]/80"
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
                <FilterSort onFilterChange={setFilters} teams={uniqueTeams} />
              </div>
            </div>
          )}

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
                                <p className="text-gray-700">{raceInfo.circuit}</p>
                                <p className="text-gray-700">{raceInfo.location}</p>
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
                      className="bg-gradient-to-r from-green-50 to-green-100 border border-green-300 text-green-700 p-6 rounded-2xl text-center mb-8 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
                            <RiUserAddLine className="text-2xl text-green-600" />
                          </div>
                          <div className="text-left">
                            <p className="text-lg font-semibold">Votre vote actuel</p>
                            <p className="text-xl font-bold">
                              {drivers.find((d) => d.driverId === userVote.driverId)?.name}
                            </p>
                          </div>
                        </div>
                        {confirmedVote === userVote.driverId && (
                          <span className="px-4 py-2 bg-green-200 rounded-full text-sm font-medium">
                            Vote confirmé
                          </span>
                        )}
                      </div>
                      <div className="flex gap-3">
                        {!confirmedVote && (
                          <Button
                            onClick={handleConfirmVote}
                            className="bg-green-600 hover:bg-green-700 text-white px-6"
                          >
                            Confirmer le vote
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          onClick={handleCancelVote}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 border-red-300"
                        >
                          Annuler le vote
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedDrivers.map((driver) => (
                      <motion.div
                        key={driver.driverId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`group relative bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all ${
                          selectedDriver === driver.driverId
                            ? "border-[var(--primary-red)] ring-2 ring-[var(--primary-red)]"
                            : "border-gray-200 hover:border-[var(--primary-red)]"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-900">{driver.name}</h2>
                            <p className="text-gray-600">{driver.team}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Comparer</span>
                            <Checkbox
                              id={`compare-${driver.driverId}`}
                              checked={comparisonDrivers.includes(driver.driverId)}
                              onCheckedChange={() => handleComparisonSelect(driver.driverId)}
                            />
                          </div>
                        </div>

                        <div className="space-y-3 mb-6">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Position moyenne</span>
                            <span className="font-semibold">{driver.stats.averagePosition.toFixed(1)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Performance écurie</span>
                            <span className="font-semibold">{(driver.stats.teamPerformance * 100).toFixed(1)}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Points</span>
                            <span className="font-semibold">{driver.stats.points}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Victoires</span>
                            <span className="font-semibold">{driver.stats.wins}</span>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          {selectedDriver === driver.driverId ? (
                            <Button
                              onClick={handleCancelVote}
                              variant="destructive"
                              className="flex-1 bg-[var(--primary-red)] hover:bg-[var(--primary-red)]/90"
                              disabled={timeLeft === 0}
                            >
                              Annuler mon vote
                            </Button>
                          ) : (
                            <Button
                              onClick={() => handleVote(driver.driverId)}
                              variant="outline"
                              className="flex-1 hover:bg-[var(--primary-red)]/10"
                              disabled={timeLeft === 0}
                            >
                              Voter
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            onClick={() => toggleChart(driver.driverId)}
                            className="shrink-0 hover:bg-gray-100 flex items-center gap-2"
                          >
                            <span className="text-sm">Statistiques</span>
                            {expandedCharts.has(driver.driverId) ? (
                              <RiArrowUpSLine className="text-lg" />
                            ) : (
                              <RiArrowDownSLine className="text-lg" />
                            )}
                          </Button>
                        </div>

                        {expandedCharts.has(driver.driverId) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6"
                          >
                            <DriverStatsChart driver={driver} />
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
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
        <DialogContent className="sm:max-w-[425px] bg-gray-50 rounded-3xl border border-gray-50 shadow-xl p-0 overflow-visible">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 relative"
          >
            <button
              onClick={() => setShowCancelDialog(false)}
              className="absolute top-0 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-[var(--primary-red)] hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary-red)]/40"
              aria-label="Fermer la pop-up"
              type="button"
            >
              <IoClose size={36} />
            </button>
            <DialogHeader className="text-center">
              <DialogTitle className="text-4xl font-extrabold bg-gradient-to-r from-[var(--primary-red)] to-gray-800 bg-clip-text text-transparent font-racing tracking-wider">
                Annuler le vote
              </DialogTitle>
            </DialogHeader>
            <div className="mt-8 space-y-6">
              <p className="text-2xl font-medium text-gray-600 text-center">
                Êtes-vous sûr de vouloir annuler votre vote ?<br />
                <span className="text-red-500 font-semibold">Cette action est irréversible.</span>
              </p>
              <div className="flex justify-center gap-6 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowCancelDialog(false)}
                  variant="outline"
                  className="px-8 py-6 border border-gray-200/80 text-gray-600 hover:border-gray-300 hover:bg-gray-50/80 rounded-full text-xl transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Non, garder mon vote
                </Button>
                <Button
                  type="button"
                  onClick={confirmCancelVote}
                  className="px-8 py-6 bg-gradient-to-r from-[var(--primary-red)] to-[#A60321] hover:from-gray-600 hover:to-gray-900 text-white rounded-full text-xl transition-colors duration-200 shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  Oui, annuler mon vote
                </Button>
              </div>
            </div>
          </motion.div>
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

import { DriverStats } from "./drivers";

export interface Vote {
  driverId: string;
  timestamp: number;
}

export interface FilterOptions {
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  teamFilter: string;
  minPoints: number;
  maxPoints: number;
}

export interface DriverComparisonProps {
  drivers: DriverStats[];
  onClose: () => void;
}

export interface DriverStatsChartProps {
  driver: DriverStats;
} 

export interface VoteTabsProps {
  activeTab: "Info" | "Vote";
  onTabChange: (tab: "Info" | "Vote") => void;
}

export interface TopVotedDriver {
  driverId: string;
  votes: number;
}

export interface VoteStats {
  totalVotes: number;
  topVotedDrivers: TopVotedDriver[];
  totalParticipants: number;
}

export interface VotingSectionProps {
  userVote: Vote | null;
  confirmedVote: string | null;
  handleConfirmVote: () => void;
  handleCancelVote: () => void;
  handleVote: (driverId: string) => void;
  selectedDriver: string | null;
  paginatedDrivers: DriverStats[];
  comparisonDrivers: string[];
  handleComparisonSelect: (driverId: string) => void;
  handleOpenComparison: () => void;
  timeLeft: number;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onFilterChange: (filters: FilterOptions) => void;
  resetFilters: () => void;
  teams: string[];
}
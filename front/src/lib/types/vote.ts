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
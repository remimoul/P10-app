import { ErgastRace } from "./ergast";

export interface Track {
  id: string;
  name: string;
  country: string;
  city: string;
  length: number;
  numberOfLaps: number;
  recordLap: string;
  recordHolder: string;
  firstGrandPrix: number;
  lapRecord: string;
  circuitLength: string;
  raceDistance: string;
  imageUrl: string;
}

export interface ErgastDriver {
  name: string;
  number: string;
  nationality: string;
}

export interface ErgastResult {
  position: string;
  driver: ErgastDriver;
  constructor: string;
  grid: string;
  status: string;
  points: string;
  time?: string;
  fastestLap?: {
    time: string;
    rank: string;
  };
}

export interface ErgastCircuitInfo {
  name: string;
  location: {
    locality: string;
    country: string;
  };
  length: string;
  numberOfLaps: string;
  lapRecord: {
    time: string;
    driver: string;
    year: string;
  };
}

export interface ErgastData {
  round: string;
  raceName: string;
  date: string;
  circuit: ErgastCircuitInfo;
  results?: ErgastResult[];
}

export interface GrandPrix {
  id: string;
  date: string;
  time: string;
  season: string;
  track: Track;
  status: string;
  type: string;
  ranking?: GrandPrixRanking[];
  ergastData?: ErgastData;
}

export interface GrandPrixRanking {
  id: string;
  position: number;
  isDNF: boolean;
  pilot: {
    id: string;
    name: string;
    acronym: string;
  };
  time?: string;
  laps?: number;
}

export interface Session {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  type: "practice" | "qualifying" | "race";
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
}

export interface Meeting {
  id: string;
  name: string;
  date: string;
  track: Track;
  sessions: Session[];
}

export interface Driver {
  id: string;
  name: string;
  team: string;
  number: number;
  points: number;
  position: number;
  country: string;
  fastestLap: string;
  grid: number;
  status: "Finished" | "DNF";
  laps: number;
  time: string;
  gap: string;
  bestLap: number;
  teamColor: string;
  previousPosition: number;
  positionChange: number;
  car: string;
  raceResults?: Record<number, RaceResult>;
}

export interface Position {
  driverId: string;
  position: number;
  points: number;
}

export interface Lap {
  number: number;
  driverId: string;
  time: string;
  position: number;
}

export interface Grid {
  driverId: string;
  position: number;
}

export interface Race {
  id: number;
  name: string;
  country: string;
  date: string;
  circuit: string;
  season: string;
  ergastData?: ErgastRaceData;
}

export interface Stint {
  driverId: string;
  compound: string;
  laps: number;
}

export interface RaceResult {
  driverId: string;
  position: number;
  points: number;
  grid: number;
  status: string;
  fastestLap: boolean;
  fastestLapTime?: string;
  fastestLapRank?: number;
  fastestLapPoints?: number;
  totalPoints: number;
}

export interface RacingCardProps {
  grandPrix: GrandPrix;
  isPast: boolean;
}

export interface RacingListProps {
  grandPrixList: GrandPrix[];
  isPast: boolean;
}

export interface RacingTabsProps {
  activeTab: "upcoming" | "past";
  onTabChange: (tab: "upcoming" | "past") => void;
}

export interface RaceInfoProps {
  race: Race;
}

export interface ResultsTableProps {
  results: RaceResult[];
  drivers: { [key: string]: Driver };
  viewMode: "race" | "championship";
}

// page results
export interface Race {
  id: number;
  name: string;
  country: string;
  date: string;
  circuit: string;
}

export interface UseRacesReturn {
  races: Session[];
  ergastRaces: ErgastRace[];
  selectedSeason: string;
  selectedRace: number | null;
  selectedDate: string;
  loading: boolean;
  setSelectedSeason: (season: string) => void;
  setSelectedRace: (race: number | null) => void;
  setSelectedDate: (date: string) => void;
  filteredRaces: Session[];
  uniqueDates: string[];
  meetingsMap: Map<number, Meeting>;
}

export interface UseDriversReturn {
  drivers: { [key: string]: Driver };
  positions: Position[];
  laps: Lap[];
  grid: Grid[];
  stints: Stint[];
  loading: boolean;
  filteredDrivers: DriverTableData[];
}

export interface DriverTableData {
  id: number;
  name: string;
  team: string;
  points: number;
  position: number;
  country: string;
  number: number;
  fastestLap: string | number;
  grid: number;
  status: "Finished" | "DNF";
  laps: number;
  time: string;
  gap: string;
  bestLap: number;
  teamColor: string;
  previousPosition: number;
  positionChange: number;
  car: string;
  compound: string;
}

export interface ErgastLocation {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

export interface Race {
  id: number;
  name: string;
  country: string;
  date: string;
  season: string;
  circuit: string;
  laps: number;
  length: string;
  lapRecord: string;
  recordHolder: string;
  recordYear: string;
  ergastData?: ErgastRaceData;
}

export interface FiltersProps {
  selectedSeason: string;
  selectedRace: number;
  selectedCountry: string;
  filteredRaces: Race[];
  onSeasonChange: (season: string) => void;
  onRaceChange: (raceId: number) => void;
  onCountryChange: (country: string) => void;
  uniqueDates: string[];
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export interface SeasonFilterProps {
  seasons: string[];
  selected: string;
  onChange: (value: string) => void;
}

export interface ViewMode {
  race: string;
  championship: string;
}

export const RACE_POINTS = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1];
export const SPRINT_POINTS = [8, 7, 6, 5, 4, 3, 2, 1];
export const FASTEST_LAP_POINTS = 1;

export interface ErgastRaceData {
  round: string;
  raceName: string;
  circuitId: string;
  circuitUrl: string;
  location: ErgastLocation;
}

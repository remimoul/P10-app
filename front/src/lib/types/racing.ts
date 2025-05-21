import { ErgastRace } from "./ergast";

export interface Track {
  id: string;
  trackName: string;
  countryName: string;
  location: string;
  pictureCountry?: string;
  pictureTrack?: string;
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
  session_key: number;
  date_start: string;
  year: number;
  session_status: string;
  session_type: string;
  meeting_key: number;
}

export interface Meeting {
  meeting_key: number;
  circuit_short_name: string;
  country_code: string;
  location: string;
}

export interface Driver {
  driver_number: number;
  first_name: string;
  last_name: string;
  team_name: string;
  country_code: string;
  name_acronym: string;
  headshot_url?: string;
}

export interface Position {
  driver_number: number;
  position: number;
  status: string;
  time?: string;
  laps?: number;
  is_dnf?: boolean;
}

export interface Lap {
  driver_number: number;
  lap_number: number;
  lap_time: number;
  compound: string;
}

export interface Grid {
  driver_number: number;
  position: number;
  compound: string;
}

export interface LapTime {
  driver_number: number;
  lap_number: number;
  lap_time: number;
  compound: string;
}

export interface Stint {
  driver_number: number;
  compound: string;
  lap_start: number;
  lap_end: number;
}

export const RACE_POINTS = {
  1: 25,
  2: 18,
  3: 15,
  4: 12,
  5: 10,
  6: 8,
  7: 6,
  8: 4,
  9: 2,
  10: 1,
} as const;

export const SPRINT_POINTS = {
  1: 8,
  2: 7,
  3: 6,
  4: 5,
  5: 4,
  6: 3,
  7: 2,
  8: 1,
} as const;

export const FASTEST_LAP_POINTS = 1;

export type ViewMode = "race" | "championship";

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

export interface ErgastCircuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: ErgastLocation;
}

export interface ErgastRaceData {
  round: string;
  raceName: string;
  circuitId: string;
  circuitUrl: string;
  location: ErgastLocation;
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

// page racing
export interface Track {
  id: string;
  countryName: string;
  trackName: string;
  pictureCountry?: string;
  pictureTrack?: string;
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
}

export interface GrandPrix {
  id: string;
  season: string;
  date: string;
  time: string;
  track: Track;
  ranking?: GrandPrixRanking[];
  ergastData?: ErgastData;
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

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}
export interface SeasonFilterProps {
  seasons: string[];
  selected: string;
  onChange: (value: string) => void;
}

export interface RacingListProps {
  grandPrixList: RacingCardProps["grandPrix"][];
  isPast: boolean;
}

// page results
export interface Race {
  id: number;
  name: string;
  country: string;
  date: string;
  circuit: string;
  laps: number;
  length: string;
  lapRecord: string;
  recordHolder: string;
  recordYear: string;
  season: string;
  ergastData?: ErgastRaceData;
}

export interface RaceResult {
  position: number;
  status: "Finished" | "DNF";
  time: string;
  laps: number;
}

export interface Driver {
  id: number;
  name: string;
  team: string;
  points: number;
  position: number;
  country: string;
  number: number;
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

export interface NoRacesMessageProps {
  season: string;
}

export interface RaceInfoProps {
  race: Race;
}

export interface ResultsTableProps {
  drivers: Driver[];
  viewMode: ViewMode;
}

//hooks
export interface RacingData {
  season: string;
  races: {
    round: string;
    raceName: string;
    date: string;
    circuit: {
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
    };
    results?: {
      position: string;
      driver: {
        name: string;
        number: string;
        nationality: string;
      };
      constructor: string;
      grid: string;
      status: string;
      points: string;
      time?: string;
      fastestLap?: {
        time: string;
        rank: string;
      };
    }[];
  }[];
  loading: boolean;
  error: string | null;
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
  drivers: Driver[];
  positions: Position[];
  laps: Lap[];
  grid: Grid[];
  lapTimes: LapTime[];
  stints: Stint[];
  loading: boolean;
  filteredDrivers: DriverTableData[];
}

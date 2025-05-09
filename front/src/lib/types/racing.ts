export interface Track {
  id: string;
  trackName: string;
  countryName: string;
  location: string;
  pictureCountry?: string;
  pictureTrack?: string;
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
  10: 1
} as const;

export const SPRINT_POINTS = {
  1: 8,
  2: 7,
  3: 6,
  4: 5,
  5: 4,
  6: 3,
  7: 2,
  8: 1
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
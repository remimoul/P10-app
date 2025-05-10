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
} 
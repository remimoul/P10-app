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
  length?: string;
  numberOfLaps?: string;
  lapRecord?: {
    time: string;
    driver: string;
    year: string;
  };
}

export interface CircuitInfo {
  length: string;
  numberOfLaps: string;
  lapRecord: {
    time: string;
    driver: string;
    year: string;
  };
}

export interface ErgastRace {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: ErgastCircuit;
  date: string;
  results?: ErgastResult[];
  circuitInfo?: CircuitInfo;
}

export interface ErgastResult {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructor: {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
  };
  grid: string;
  laps: string;
  status: string;
  Time?: {
    millis: string;
    time: string;
  };
  FastestLap?: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed: {
      units: string;
      speed: string;
    };
  };
}

export interface ErgastResponse {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    RaceTable: {
      Races: ErgastRace[];
    };
  };
}

export interface ErgastRaceData {
  round: string;
  raceName: string;
  circuitId: string;
  circuitUrl: string;
  location: ErgastLocation;
} 
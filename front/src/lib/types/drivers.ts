export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Constructor {
  constructorId: string;
  url: string;
  name: string;
  nationality: string;
}

export interface DriverStanding {
  position: string;
  points: string;
  wins: string;
  Driver: Driver;
  Constructors: Constructor[];
}

export interface DriverStats {
  driverId: string;
  name: string;
  team: string;
  stats: {
    previousRaces: number[];
    averagePosition: number;
    teamPerformance: number;
    points: number;
    wins: number;
    podiums: number;
    fastestLaps: number;
  };
}

export interface TeamStats {
  constructorId: string;
  name: string;
  stats: {
    points: number;
    wins: number;
    podiums: number;
    fastestLaps: number;
    averagePosition: number;
    reliability: number;
  };
} 